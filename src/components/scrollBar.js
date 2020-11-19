'use strict';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {AutoSizer} from 'react-virtualized';

import moment from 'moment';
import interact from 'interactjs';
import _ from 'lodash';

import {pixToInt, intToPix, sumStyle} from '../utils/commonUtils';
import {
  rowItemsRenderer,
  rowLayerRenderer,
  getNearestRowNumber,
  getMaxOverlappingItems,
} from '../utils/itemUtils';
import {timeSnap, getTimeAtPixel, getSnapPixelFromDelta} from '../utils/timeUtils';
import Timebar from '../components/timebar';
import SelectBox from '../components/selector';
import {DefaultGroupRenderer, DefaultItemRenderer} from '../components/renderers';
import TimelineBody from '../components/body';

// startsWith polyfill for IE11 support
import 'core-js/fn/string/starts-with';

export default class Timeline extends React.Component {
  static TIMELINE_MODES = Object.freeze({
    SELECT: 1,
    DRAG: 2,
    RESIZE: 4
  });

  static propTypes = {
    setStartDateWithZoom: PropTypes.func.isRequired,
    setEndDateWithZoom: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    groupOffset: PropTypes.number.isRequired,
    rowLayers: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.object.isRequired,
        end: PropTypes.object.isRequired,
        rowNumber: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired
      })
    ),
    selectedItems: PropTypes.arrayOf(PropTypes.number),
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    originalStartDate: PropTypes.object.isRequired,
    originalEndDate: PropTypes.object.isRequired,
    snapMinutes: PropTypes.number,
    showCursorTime: PropTypes.bool,
    cursorTimeFormat: PropTypes.string,
    componentId: PropTypes.string, // A unique key to identify the component. Only needed when 2 grids are mounted
    itemHeight: PropTypes.number,
    timelineMode: PropTypes.number,
    timebarFormat: PropTypes.object,
    onItemClick: PropTypes.func,
    onItemDoubleClick: PropTypes.func,
    onItemContext: PropTypes.func,
    onInteraction: PropTypes.func.isRequired,
    onRowClick: PropTypes.func,
    onRowContext: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    onItemHover: PropTypes.func,
    onItemLeave: PropTypes.func,
    itemRenderer: PropTypes.func,
    groupRenderer: PropTypes.func,
    groupTitleRenderer: PropTypes.func,
    shallowUpdateCheck: PropTypes.bool,
    forceRedrawFunc: PropTypes.func,
    bottomResolution: PropTypes.string,
    topResolution: PropTypes.string,
    minItemDuration: PropTypes.number, // in ms
  };

  static defaultProps = {
    rowLayers: [],
    groupOffset: 150,
    itemHeight: 10,
    snapMinutes: 0.01,
    cursorTimeFormat: 'mm:ss:ms',
    componentId: 'r9k1',
    showCursorTime: true,
    groupRenderer: DefaultGroupRenderer,
    itemRenderer: DefaultItemRenderer,
    groupTitleRenderer: () => <div />,
    timelineMode: Timeline.TIMELINE_MODES.SELECT | Timeline.TIMELINE_MODES.DRAG | Timeline.TIMELINE_MODES.RESIZE,
    shallowUpdateCheck: false,
    forceRedrawFunc: null,
    minItemDuration: 1, // in ms
  };

  static changeTypes = {
    resizeStart: 'resizeStart',
    resizeEnd: 'resizeEnd',
    dragEnd: 'dragEnd',
    dragStart: 'dragStart',
    itemsSelected: 'itemsSelected',
    snappedMouseMove: 'snappedMouseMove'
  };

  static isBitSet(bit, mask) {
    return (bit & mask) === bit;
  }

  static no_op = () => {};

  constructor(props) {
    super(props);
    this.selecting = false;
    this.state = {selection: [], cursorTime: null};
    this.setTimeMap(this.props.items);

    this.cellRenderer = this.cellRenderer.bind(this);
    this.rowHeight = this.rowHeight.bind(this);
    this.setTimeMap = this.setTimeMap.bind(this);
    this.getItem = this.getItem.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.getTimelineWidth = this.getTimelineWidth.bind(this);
    this.itemFromElement = this.itemFromElement.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.grid_ref_callback = this.grid_ref_callback.bind(this);
    this.select_ref_callback = this.select_ref_callback.bind(this);
    this.throttledMouseMoveFunc = _.throttle(this.throttledMouseMoveFunc.bind(this), 20);

    const canSelect = Timeline.isBitSet(Timeline.TIMELINE_MODES.SELECT, this.props.timelineMode);
    const canDrag = Timeline.isBitSet(Timeline.TIMELINE_MODES.DRAG, this.props.timelineMode);
    const canResize = Timeline.isBitSet(Timeline.TIMELINE_MODES.RESIZE, this.props.timelineMode);
    this.setUpDragging(canSelect, canDrag, canResize);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    this.setTimeMap(nextProps.items, nextProps.startDate, nextProps.endDate);
    this.refreshGrid();
  }

  componentWillUnmount() {
    if (this._itemInteractable) this._itemInteractable.unset();
    if (this._selectRectangleInteractable) this._selectRectangleInteractable.unset();
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidUpdate(prevProps, prevState) {
    const {timelineMode, selectedItems} = this.props;
    const selectionChange = !_.isEqual(prevProps.selectedItems, selectedItems);
    const timelineModeChange = !_.isEqual(prevProps.timelineMode, timelineMode);

    if (timelineModeChange || selectionChange) {
      const canSelect = Timeline.isBitSet(Timeline.TIMELINE_MODES.SELECT, timelineMode);
      const canDrag = Timeline.isBitSet(Timeline.TIMELINE_MODES.DRAG, timelineMode);
      const canResize = Timeline.isBitSet(Timeline.TIMELINE_MODES.RESIZE, timelineMode);
      this.setUpDragging(canSelect, canDrag, canResize);
    }
  }

  updateDimensions() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.forceUpdate();
      this._grid.recomputeGridSize();
    }, 100);
  }

  setTimeMap(items, startDate, endDate) {
    if (!startDate || !endDate) {
      startDate = this.props.startDate;
      endDate = this.props.endDate;
    }
    this.itemRowMap = {}; // timeline elements (key) => (rowNo).
    this.rowItemMap = {}; // (rowNo) => timeline elements
    this.rowHeightCache = {}; // (rowNo) => max number of stacked items
    let visibleItems = _.filter(items, i => {
      return i.end > startDate && i.start < endDate;
    });
    let itemRows = _.groupBy(visibleItems, 'row');

    _.forEach(itemRows, (visibleItems, row) => {
      const rowInt = parseInt(row);
      if (this.rowItemMap[rowInt] === undefined) this.rowItemMap[rowInt] = [];
      _.forEach(visibleItems, item => {
        this.itemRowMap[item.key] = rowInt;
        this.rowItemMap[rowInt].push(item);
      });
      this.rowHeightCache[rowInt] = getMaxOverlappingItems(visibleItems);
    });
  }

  itemFromElement(e) {
    const index = e.getAttribute('data-item-index');
    const rowNo = this.itemRowMap[index];
    const itemIndex = _.findIndex(this.rowItemMap[rowNo], i => i.key == index);
    const item = this.rowItemMap[rowNo][itemIndex];
    return {index, rowNo, itemIndex, item};
  }

  getItem(id) {
    // This is quite stupid and shouldn't really be needed
    const rowNo = this.itemRowMap[id];
    const itemIndex = _.findIndex(this.rowItemMap[rowNo], i => i.key == id);
    return this.rowItemMap[rowNo][itemIndex];
  }

  changeGroup(item, curRow, newRow) {
    item.row = newRow;
    this.itemRowMap[item.key] = newRow;
    this.rowItemMap[curRow] = this.rowItemMap[curRow].filter(i => i.key !== item.key);
    this.rowItemMap[newRow].push(item);
  }

  setSelection(selections) {
    let newSelection = _.map(selections, s => {
      return {start: s[0].clone(), end: s[1].clone()};
    });
    this.setState({selection: newSelection});
  }

  clearSelection() {
    this.setState({selection: []});
  }

  getTimelineWidth(totalWidth) {
    const {groupOffset} = this.props;
    if (totalWidth !== undefined) return totalWidth - groupOffset;
    return this._grid.props.width - groupOffset;
  }

  refreshGrid = (config = {}) => {
    this._grid.recomputeGridSize(config);
  };

  setUpDragging(canSelect, canDrag) {
    const topDivClassId = `rct9k-id-${this.props.componentId}`;
    const selectedItemSelector = '.rct9k-items-outer-selected';
    if (this._itemInteractable) this._itemInteractable.unset();
    if (this._selectRectangleInteractable) this._selectRectangleInteractable.unset();

    this._itemInteractable = interact(`.${topDivClassId} .item_draggable`);
    this._selectRectangleInteractable = interact(`.${topDivClassId} .parent-div`);

    this._itemInteractable.on('tap', e => {
      this._handleItemRowEvent(e, this.props.onItemClick, this.props.onRowClick);
    });

    if (canDrag) {
      this._itemInteractable
        .draggable({
          enabled: true,
          allowFrom: selectedItemSelector,
          restrict: {
            restriction: `.${topDivClassId}`,
            elementRect: {left: 0, right: 1, top: 0, bottom: 1}
          }
        })
        .on('dragstart', e => {
          let selections = [];
          const animatedItems = this.props.onInteraction(
            Timeline.changeTypes.dragStart,
            null,
            this.props.selectedItems
          );

          _.forEach(animatedItems, id => {
            let domItem = this._gridDomNode.querySelector("span[data-item-index='" + id + "'");
            if (domItem) {
              selections.push([this.getItem(id).start, this.getItem(id).end]);
              domItem.setAttribute('isDragging', 'True');
              domItem.setAttribute('drag-x', 0);
              domItem.setAttribute('drag-y', 0);
              domItem.style['z-index'] = 4;
            }
          });
          this.setSelection(selections);
        })
        .on('dragmove', e => {
          const target = e.target;
          let animatedItems = this._gridDomNode.querySelectorAll("span[isDragging='True'") || [];

          let dx = (parseFloat(target.getAttribute('drag-x')) || 0) + e.dx;
          let selections = [];

          // Snap the movement to the current snap interval
          const snapDx = getSnapPixelFromDelta(
            dx,
            this.props.startDate,
            this.props.endDate,
            this.getTimelineWidth(),
            this.props.snapMinutes
          );

          _.forEach(animatedItems, domItem => {
            const {item} = this.itemFromElement(domItem);
            let itemDuration = item.end.diff(item.start, 'ms');

            let newPixelOffset = (pixToInt(domItem.style.left) + snapDx).toFixed(3);

            let newStart = getTimeAtPixel(
              newPixelOffset,
              this.props.startDate,
              this.props.endDate,
              this.getTimelineWidth(),
              this.props.snapMinutes
            );

            let newEnd = newStart.clone().add(itemDuration, 'ms');

            if (newStart.diff(this.props.startDate) <= 0) {
              newStart = this.props.startDate;
              this.props.setStartDateWithZoom(this.props.startDate);
            } else {
              this.props.setStartDateWithZoom(newStart);
            }

            if (this.props.endDate.diff(newEnd) <= 0) {
              newEnd = this.props.endDate;
              this.props.setEndDateWithZoom(this.props.endDate);
            } else {
              this.props.setEndDateWithZoom(newEnd);
            }

            selections.push([newStart, newEnd]);

            // Translate the new start time back to pixels, so we can animate the snap
            domItem.style.webkitTransform = domItem.style.transform = 'translate(' + snapDx + 'px, ' + 0 + 'px)';
          });

          target.setAttribute('drag-x', dx);

          this.setSelection(selections);
        })
        .on('dragend', e => {
          const {item, rowNo} = this.itemFromElement(e.target);
          let animatedItems = this._gridDomNode.querySelectorAll("span[isDragging='True'") || [];

          let animatedItemsKeys = [];
          _.forEach(animatedItems, domItem => {
            animatedItemsKeys.push(this.itemFromElement(domItem).item.key);
          });

          this.setSelection([[item.start, item.end]]);
          this.clearSelection();

          // Change row
          let newRow = getNearestRowNumber(e.clientX, e.clientY);

          let rowChangeDelta = newRow - rowNo;

          // Update time
          let newPixelOffset = (
            pixToInt(e.target.style.left) + (parseFloat(e.target.getAttribute('drag-x')) || 0)
          ).toFixed(3);

          let newStart = getTimeAtPixel(
            newPixelOffset,
            this.props.startDate,
            this.props.endDate,
            this.getTimelineWidth(),
            this.props.snapMinutes
          );

          const timeDelta = newStart.clone().diff(item.start, 'ms');
          const changes = {rowChangeDelta, timeDelta};
          let items = [];

          _.forEach(animatedItems, domItem => {
            const {item} = this.itemFromElement(domItem);
            let itemDuration = item.end.diff(item.start);
            let newStart = item.start.clone().add(timeDelta, 'ms');
            let newEnd = newStart.clone().add(itemDuration);

            const newStartInMs = newStart.clone().diff(0, 'ms');
            const newEndInMs = newEnd.clone().diff(0, 'ms');
            const currentItemNewRow = item.row + rowChangeDelta;

            const itemsOnNewRow = this.props.items.filter(element => element.row === currentItemNewRow);
            itemsOnNewRow.sort((a, b) => {
              return a - b;
            });

            let itemAboveElement = false;

            // Checking whether the dragged item is above other items.
            for (let i = 0; i < itemsOnNewRow.length; i++) {
              const element = itemsOnNewRow[i];
              if (animatedItemsKeys.some(key => key === element.key)) {
                continue;
              }
              const elementStartInMs = element.start.clone().diff(0, 'ms');
              const elementEndInMs = element.end.clone().diff(0, 'ms');

              if ((newStartInMs > elementStartInMs && newStartInMs < elementEndInMs) || (newEndInMs > elementStartInMs && newEndInMs < elementEndInMs)) {
                itemAboveElement = true;
                break;
              }
            }

            item.start = newStart;
            item.end = newEnd;

            items.push(item);
          });

          this.props.onInteraction(Timeline.changeTypes.dragEnd, changes, items);

          // Reset the styles
          animatedItems.forEach(domItem => {
            domItem.style.webkitTransform = domItem.style.transform = 'translate(0px, 0px)';
            domItem.setAttribute('drag-x', 0);
            domItem.setAttribute('drag-y', 0);
            domItem.style['z-index'] = 3;
            domItem.style['top'] = intToPix(
              this.props.itemHeight * Math.round(pixToInt(domItem.style['top']) / this.props.itemHeight)
            );
            domItem.removeAttribute('isDragging');
          });

          this._grid.recomputeGridSize({rowIndex: 0});
        });
    }
  }

  _handleItemRowEvent = (e, itemCallback, rowCallback) => {
    e.preventDefault();
    // Skip click handler if selecting with selection box
    if (this.selecting) {
      return;
    }
    if (e.target.hasAttribute('data-item-index') || e.target.parentElement.hasAttribute('data-item-index')) {
      let itemKey = e.target.getAttribute('data-item-index') || e.target.parentElement.getAttribute('data-item-index');
      itemCallback && itemCallback(e, Number(itemKey));
    } else {
      let row = e.target.getAttribute('data-row-index');
      let clickedTime = getTimeAtPixel(
        e.clientX - this.props.groupOffset,
        this.props.startDate,
        this.props.endDate,
        this.getTimelineWidth()
      );

      //const roundedStartMinutes = Math.round(clickedTime.minute() / this.props.snapMinutes) * this.props.snapMinutes; // I dont know what this does
      let snappedClickedTime = timeSnap(clickedTime, this.props.snapMinutes);
      rowCallback && rowCallback(e, row, clickedTime, snappedClickedTime);
    }
  };

  cellRenderer(width) {
    const {timelineMode, rowLayers} = this.props;
    const canSelect = Timeline.isBitSet(Timeline.TIMELINE_MODES.SELECT, timelineMode);
    return ({columnIndex, key, parent, rowIndex, style}) => {
      let itemCol = 1;
      if (itemCol == columnIndex) {
        let itemsInRow = this.rowItemMap[rowIndex];
        const layersInRow = rowLayers.filter(r => r.rowNumber === rowIndex);
        let rowHeight = this.props.itemHeight;
        if (this.rowHeightCache[rowIndex]) {
          rowHeight = rowHeight * this.rowHeightCache[rowIndex];
        }
        return (
          <div
            key={key}
            style={style}
            data-row-index={rowIndex}
            className="rct9k-row"
            onClick={e => this._handleItemRowEvent(e, Timeline.no_op, this.props.onRowClick)}
          >
            {rowItemsRenderer(
              itemsInRow,
              this.props.startDate,
              this.props.endDate,
              width,
              this.props.itemHeight,
              this.props.itemRenderer,
              canSelect ? this.props.selectedItems : [],
              true,
            )}
            {rowLayerRenderer(layersInRow, this.props.startDate, this.props.endDate, width, rowHeight)}
          </div>
        );
      }
    };
  }

  rowHeight() {
    const rh = 1;
    return rh * this.props.itemHeight;
  }

  grid_ref_callback(reactComponent) {
    this._grid = reactComponent;
    this._gridDomNode = ReactDOM.findDOMNode(this._grid);
  }

  select_ref_callback(reactComponent) {
    this._selectBox = reactComponent;
  }

  throttledMouseMoveFunc(e) {
    const {componentId} = this.props;
    const leftOffset = document.querySelector(`.rct9k-id-${componentId} .parent-div`).getBoundingClientRect().left;
    const cursorSnappedTime = getTimeAtPixel(
      e.clientX - this.props.groupOffset - leftOffset,
      this.props.startDate,
      this.props.endDate,
      this.getTimelineWidth(),
      this.props.snapMinutes
    );
    if (!this.mouse_snapped_time || this.mouse_snapped_time.unix() !== cursorSnappedTime.unix()) {
      if (cursorSnappedTime.isSameOrAfter(this.props.startDate)) {
        this.mouse_snapped_time = cursorSnappedTime;
        this.setState({cursorTime: this.mouse_snapped_time});
        this.props.onInteraction(
          Timeline.changeTypes.snappedMouseMove,
          {snappedTime: this.mouse_snapped_time.clone()},
          null
        );
      }
    }
  }

  render() {
    const {
      timebarFormat,
      componentId,
      shallowUpdateCheck,
      forceRedrawFunc,
      bottomResolution,
      topResolution,
    } = this.props;

    const divCssClass = `rct9k-timeline-div rct9k-timeline-scroll rct9k-id-${componentId}`;
    let varTimebarProps = {};
    if (timebarFormat) varTimebarProps['timeFormats'] = timebarFormat;
    if (bottomResolution) varTimebarProps['bottom_resolution'] = bottomResolution;
    if (topResolution) varTimebarProps['top_resolution'] = topResolution;

    function columnWidth(width) {
      return ({index}) => {
        if (index === 0) return 0;
        return width;
      };
    }

    function calculateHeight(height) {
      // when this function is called for the first time, the timebar is not yet rendered
      let timebar = document.querySelector(`.rct9k-id-${componentId} .rct9k-timebar`);
      if (!timebar) {
        return 0;
      }
      // substract timebar height from total height
      const timebarHeight = timebar.getBoundingClientRect().height;
      return Math.max(height - timebarHeight, 0);
    }

    return (
      <Fragment>
        <div className={divCssClass}>
          <AutoSizer className="rct9k-autosizer" onResize={this.refreshGrid}>
            {({width}) => (
              <div className="parent-div">
                <SelectBox ref={this.select_ref_callback} />
                <Timebar start={this.props.startDate} end={this.props.endDate} width={width} {...varTimebarProps} />
                <TimelineBody
                  width={width}
                  columnWidth={columnWidth(width)}
                  height={calculateHeight(this.props.itemHeight)}
                  rowHeight={this.rowHeight}
                  rowCount={this.props.groups.length}
                  cellRenderer={this.cellRenderer(this.getTimelineWidth(width))}
                  grid_ref_callback={this.grid_ref_callback}
                  shallowUpdateCheck={shallowUpdateCheck}
                  forceRedrawFunc={forceRedrawFunc}
                />
              </div>
            )}
          </AutoSizer>
        </div>
      </Fragment>
    );
  }
}
