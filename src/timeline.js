'use strict';

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {AutoSizer} from 'react-virtualized';

import moment from 'moment';
import interact from 'interactjs';
import _ from 'lodash';

import {minElementDuration} from './consts/timebarConsts';
import {pixToInt, intToPix, sumStyle} from './utils/commonUtils';
import {
  rowItemsRenderer,
  rowLayerRenderer,
  getNearestRowNumber,
  getNearestRowObject,
  getMaxOverlappingItems,
  getTrueBottom,
  getVerticalMarginBorder,
  getRowObjectRowNumber
} from './utils/itemUtils';
import {timeSnap, getTimeAtPixel, getPixelAtTime, getSnapPixelFromDelta, pixelsPerMinute} from './utils/timeUtils';
import Timebar from './components/timebar';
import SelectBox from './components/selector';
import {DefaultGroupRenderer, DefaultItemRenderer} from './components/renderers';
import TimelineBody from './components/body';

// startsWith polyfill for IE11 support
import 'core-js/fn/string/starts-with';

const scrollHeight = 7;

export default class Timeline extends React.Component {
  static TIMELINE_MODES = Object.freeze({
    SELECT: 1,
    DRAG: 2,
    RESIZE: 4
  });

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        row: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        start: PropTypes.object.isRequired,
        end: PropTypes.object.isRequired,
        minDuration: PropTypes.number,
        maxDuration: PropTypes.number,
        isResizable: PropTypes.bool
      })
    ).isRequired,
    layersNumber: PropTypes.number.isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    groupOffset: PropTypes.number,
    offsetLeft: PropTypes.number,
    rowLayers: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.object.isRequired,
        end: PropTypes.object.isRequired,
        rowNumber: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired
      })
    ),
    selectedItems: PropTypes.arrayOf(PropTypes.string),
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
    updateEndDate: PropTypes.func.isRequired
  };

  static defaultProps = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        minDuration: minElementDuration,
        isResizable: true
      })
    ).isRequired,
    rowLayers: [],
    groupOffset: 0,
    offsetLeft: 0,
    itemHeight: 40,
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
    onItemHover() {},
    onItemLeave() {},
    minItemDuration: minElementDuration // in ms
  };

  static changeTypes = {
    resizeStart: 'resizeStart',
    resizeEnd: 'resizeEnd',
    dragEnd: 'dragEnd',
    dragStart: 'dragStart',
    itemsSelected: 'itemsSelected',
    snappedMouseMove: 'snappedMouseMove',
    oneItemSelected: 'oneItemSelected'
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
    this.mouseMoveFunc = this.mouseMoveFunc.bind(this);

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

  setUpDragging(canSelect, canDrag, canResize) {
    const topDivClassId = `rct9k-id-${this.props.componentId}`;
    const selectedItemSelector = '.rct9k-items-outer-selected';
    if (this._itemInteractable) this._itemInteractable.unset();
    if (this._selectRectangleInteractable) this._selectRectangleInteractable.unset();

    this._itemInteractable = interact(`.${topDivClassId} .item_draggable`);
    this._selectRectangleInteractable = interact(`.${topDivClassId} .parent-div`);

    this._itemInteractable.on('tap', e => {
      this._handleItemRowEvent(e);
    });

    if (canDrag) {
      this._itemInteractable
        .draggable({
          enabled: true,
          allowFrom: selectedItemSelector,
          restrict: {
            restriction: `.${topDivClassId}`,
            elementRect: {left: 1, right: 0, top: 0, bottom: 1}
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
          let dy = (parseFloat(target.getAttribute('drag-y')) || 0) + e.dy;
          let selections = [];

          // Snap the movement to the current snap interval
          const snapDx = getSnapPixelFromDelta(
            dx,
            this.props.originalStartDate,
            this.props.originalEndDate,
            this.getTimelineWidth(),
            this.props.snapMinutes
          );

          _.forEach(animatedItems, domItem => {
            const {item} = this.itemFromElement(domItem);
            let itemDuration = item.end.diff(item.start, 'ms');

            let newPixelOffset = (pixToInt(domItem.style.left) + snapDx).toFixed(3);

            let newStart = getTimeAtPixel(
              newPixelOffset,
              this.props.originalStartDate,
              this.props.originalEndDate,
              this.getTimelineWidth(),
              this.props.snapMinutes
            );

            let newEnd = newStart.clone().add(itemDuration, 'ms');
            selections.push([newStart, newEnd]);

            // Translate the new start time back to pixels, so we can animate the snap
            domItem.style.webkitTransform = domItem.style.transform = 'translate(' + snapDx + 'px, ' + dy + 'px)';
          });

          target.setAttribute('drag-x', dx);
          target.setAttribute('drag-y', dy);

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
          let newRow = getNearestRowNumber(e.clientX, e.clientY, document, rowNo);

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

          // Check - whether the clamped element is being dragged to a new layer and it is located above another element.
          // ===========================================================================================================
          const itemsOnNewRowForTarget = this.props.items.filter(element => element.row === +newRow);
          let targetDuration = item.end.diff(item.start);
          let targetNewEnd = newStart.clone().add(targetDuration);
          const newTargetStartInMs = newStart.clone().diff(0, 'ms');
          const newTargetEndInMs = targetNewEnd.clone().diff(0, 'ms');
          let targetAboveElement = false;

          itemsOnNewRowForTarget.sort((a, b) => {
            return a - b;
          });

          // Checking whether the dragged item is above other items.
          if (rowNo !== +newRow) {
            for (let i = 0; i < itemsOnNewRowForTarget.length; i++) {
              const element = itemsOnNewRowForTarget[i];
              if (animatedItemsKeys.some(key => key === element.key)) {
                continue;
              }
              const elementStartInMs = element.start.clone().diff(0, 'ms');
              const elementEndInMs = element.end.clone().diff(0, 'ms');

              if (
                (newTargetStartInMs > elementStartInMs && newTargetStartInMs < elementEndInMs) ||
                (newTargetEndInMs > elementStartInMs && newTargetEndInMs < elementEndInMs)
              ) {
                targetAboveElement = true;
                break;
              }
            }
          }
          // ===========================================================================================================
          // end Check - whether the clamped element is being dragged to a new layer and it is located above another element.

          // Checking. Whether one of the dragged array elements is over an element on a new layer.
          // ======================================================================================
          let oneOfItemAboveElement = false;
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

            for (let i = 0; i < itemsOnNewRow.length; i++) {
              const element = itemsOnNewRow[i];
              if (animatedItemsKeys.some(key => key === element.key)) {
                continue;
              }
              const elementStartInMs = element.start.clone().diff(0, 'ms');
              const elementEndInMs = element.end.clone().diff(0, 'ms');

              if (
                (newStartInMs > elementStartInMs && newStartInMs < elementEndInMs) ||
                (newEndInMs > elementStartInMs && newEndInMs < elementEndInMs)
              ) {
                oneOfItemAboveElement = true;
                break;
              }
            }
          });
          // ======================================================================================
          // Checking. Whether one of the dragged array elements is over an element on a new layer.

          // ======================================================================================
          // ======================================================================================
          // ======================================================================================
          const mewRowsWithNewItems = {};

          _.forEach(animatedItems, domItem => {
            const {item} = this.itemFromElement(domItem);
            let timelineStartInMs = item.end.diff(item.start);
            let newStart = item.start.clone().add(timeDelta, 'ms');
            let newEnd = newStart.clone().add(timelineStartInMs);
            let newRow = item.row + rowChangeDelta >= 0 ? item.row + rowChangeDelta : 0;
            if (newRow + 1 > this.props.layersNumber) {
              newRow = this.props.layersNumber - 1;
            }

            const itemsOnNewRow = this.props.items.filter(element => {
              if (element.row === newRow && !animatedItemsKeys.some(key => key === element.key)) {
                return element;
              }
            });
            itemsOnNewRow.sort((a, b) => {
              return a - b;
            });

            if (!mewRowsWithNewItems[newRow]) {
              mewRowsWithNewItems[newRow] = {items: [...itemsOnNewRow]};
            }
            if (newEnd.diff(0) !== item.end.diff(0)) {
              if (item.start.diff(0) !== newStart.diff(0)) {
                item.start = newStart;
                item.isUpdatedStartEnd = true;
              }
              if (item.end.diff(0) !== newEnd.diff(0)) {
                item.end = newEnd;
                item.isUpdatedStartEnd = true;
              }
              if (item.row !== newRow) {
                item.row = newRow;
                item.isUpdatedRow = true;
              }
              mewRowsWithNewItems[newRow].items.push(item);
            }
          });

          if (mewRowsWithNewItems) {
            Object.keys(mewRowsWithNewItems).forEach(el => {
              mewRowsWithNewItems[el].items.sort((a, b) => a.start.diff(0) - b.start.diff(0));
            });

            let itemEndMoreEndDate = null;

            Object.keys(mewRowsWithNewItems).forEach((el, i) => {
              mewRowsWithNewItems[el].items.forEach((element, k) => {
                const elDuration = element.end.diff(element.start);
                if (k === 0 && this.props.originalStartDate.diff(0) > element.start.diff(0)) {
                  element.start = this.props.originalStartDate;
                  element.end = this.props.originalStartDate.clone().add(elDuration);
                  element.isUpdatedStartEnd = true;
                  element.notSelected = true;
                  items.push(element);
                } else if (
                  mewRowsWithNewItems[el].items[k - 1] &&
                  element.start.diff(0) <= mewRowsWithNewItems[el].items[k - 1].end.diff(0)
                ) {
                  element.start = mewRowsWithNewItems[el].items[k - 1].end;
                  element.end = mewRowsWithNewItems[el].items[k - 1].end.clone().add(elDuration);
                  element.isUpdatedStartEnd = true;
                  element.notSelected = true;
                  items.push(element);
                }
                if (element.end.diff(0) > this.props.originalEndDate) {
                  if (!itemEndMoreEndDate) {
                    itemEndMoreEndDate = element.end;
                  } else if (element.end.diff(0) > itemEndMoreEndDate.diff(0)) {
                    itemEndMoreEndDate = element.end;
                  }
                }
              });
            });

            if (itemEndMoreEndDate) {
              this.props.updateEndDate(itemEndMoreEndDate);
            }
          }

          // ======================================================================================
          // ======================================================================================
          // ======================================================================================

          const changedItems = [];
          Object.keys(mewRowsWithNewItems).forEach(i => {
            mewRowsWithNewItems[i].items.forEach(el => {
              if (animatedItemsKeys.some(j => j === el.key)) {
                changedItems.push(el);
              }
            });
          });

          this.props.onInteraction(Timeline.changeTypes.dragEnd, changes, [...changedItems, ...items]);

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
    if (canResize) {
      this._itemInteractable
        .resizable({
          allowFrom: selectedItemSelector,
          edges: {left: true, right: true, bottom: false, top: false}
        })
        .on('resizestart', e => {
          if (e.target.getAttribute('data-is-resizable') === 'false') {
            return;
          }
          const selected = this.props.onInteraction(Timeline.changeTypes.resizeStart, null, this.props.selectedItems);
          _.forEach(selected, id => {
            let domItem = this._gridDomNode.querySelector("span[data-item-index='" + id + "'");
            if (domItem) {
              domItem.setAttribute('isResizing', 'True');
              domItem.setAttribute('initialWidth', pixToInt(domItem.style.width));
              domItem.style['z-index'] = 4;
            }
          });
        })
        .on('resizemove', e => {
          let animatedItems = this._gridDomNode.querySelectorAll("span[isResizing='True'") || [];

          let dx = parseFloat(e.target.getAttribute('delta-x')) || 0;
          dx += e.deltaRect.left;

          let dw = e.rect.width - Number(e.target.getAttribute('initialWidth'));

          const snappedDx = getSnapPixelFromDelta(
            dx,
            this.props.startDate,
            this.props.endDate,
            this.getTimelineWidth(),
            this.props.snapMinutes
          );

          const snappedDw = getSnapPixelFromDelta(
            dw,
            this.props.startDate,
            this.props.endDate,
            this.getTimelineWidth(),
            this.props.snapMinutes
          );

          _.forEach(animatedItems, item => {
            const itemData = this.itemFromElement(item).item;
            if (itemData.isResizable === false) {
              return;
            }
            let itemWidth = item.offsetWidth;
            const minimumDuration = itemData.minDuration || this.props.minItemDuration;
            const maximumDuration = itemData.maxDuration;

            const minimumWidth =
              pixelsPerMinute(this.props.startDate, this.props.endDate, this.getTimelineWidth()) * minimumDuration;
            let maximumWidth;
            if (maximumDuration) {
              maximumWidth =
                pixelsPerMinute(this.props.startDate, this.props.endDate, this.getTimelineWidth()) * maximumDuration;
            }

            let nearbyElementLeft;
            let nearbyElementRight;
            this.props.items.forEach(el => {
              if (
                el.key !== itemData.key &&
                el.row === itemData.row &&
                el.end.diff(0, 'ms') < itemData.start.diff(0, 'ms') &&
                (!nearbyElementLeft || el.end.diff(0, 'ms') > nearbyElementLeft.end.diff(0, 'ms'))
              ) {
                nearbyElementLeft = el;
              }
              if (
                el.key !== itemData.key &&
                el.start.diff(0, 'ms') > itemData.end.diff(0, 'ms') &&
                (!nearbyElementRight || el.end.diff(0, 'ms') < nearbyElementRight.end.diff(0, 'ms'))
              ) {
                nearbyElementRight = el;
              }
            });

            // free space from the element to the start of the timeline + element duration in px
            let spaceLeftInPx = getPixelAtTime(
              itemData.end,
              this.props.startDate,
              this.props.endDate,
              this.getTimelineWidth()
            );
            let spaceRightInPx = getPixelAtTime(
              itemData.start,
              this.props.endDate,
              this.props.startDate,
              this.getTimelineWidth()
            );
            if (nearbyElementLeft && e.deltaRect.left <= 0 && e.deltaRect.right === 0) {
              spaceLeftInPx =
                spaceLeftInPx -
                getPixelAtTime(
                  nearbyElementLeft.end,
                  this.props.startDate,
                  this.props.endDate,
                  this.getTimelineWidth()
                );
              // spaceLeftInPx = spaceLeftInPx - getPixelAtTime(nearbyElementLeft.end, this.props.startDate, this.props.endDate, this.getTimelineWidth()) + 10;
              // itemWidth = itemWidth + 10;
            }
            if (nearbyElementRight && e.deltaRect.right >= 0 && e.deltaRect.left === 0) {
              spaceRightInPx =
                spaceRightInPx -
                getPixelAtTime(
                  nearbyElementRight.start,
                  this.props.endDate,
                  this.props.startDate,
                  this.getTimelineWidth()
                );
              // spaceRightInPx = spaceRightInPx - getPixelAtTime(nearbyElementRight.start, this.props.endDate, this.props.startDate, this.getTimelineWidth()) + 10;
              // itemWidth = itemWidth + 10;
            }

            // resize left
            // if (spaceLeftInPx - itemWidth <= 0 && e.deltaRect.left <= 0 && e.deltaRect.right === 0) {
            //   return;
            // }
            // resize right
            // if (spaceRightInPx - itemWidth <= 0 && e.deltaRect.right >= 0 && e.deltaRect.left === 0) {
            //   return;
            // }
            // check min and max
            let newWidth = intToPix(Number(item.getAttribute('initialWidth')) + snappedDw);
            // if (+(newWidth.replace('px', '')) < minimumWidth
            //   || +(newWidth.replace('px', '')) > maximumWidth) {
            //   return;
            // }
            item.style.width = newWidth;
            item.style.webkitTransform = item.style.transform = 'translate(' + snappedDx + 'px, 0px)';
            e.target.setAttribute('delta-x', dx);
          });
        })
        .on('resizeend', e => {
          let animatedItems = this._gridDomNode.querySelectorAll("span[isResizing='True'") || [];
          // Update time
          const dx = parseFloat(e.target.getAttribute('delta-x')) || 0;
          const isStartTimeChange = dx != 0;

          let items = [];
          let minRowNo = Infinity;

          let durationChange = null;
          // Calculate the default item positions
          _.forEach(animatedItems, domItem => {
            let startPixelOffset = pixToInt(domItem.style.left) + dx;
            const {item, rowNo} = this.itemFromElement(domItem);
            const minimumDuration = item.minDuration || this.props.minItemDuration;
            const maximumDuration = item.maxDuration;

            minRowNo = Math.min(minRowNo, rowNo);

            let nearbyElement;
            const itemsOnNewRow = this.props.items.filter(element => element.row === rowNo);
            itemsOnNewRow.sort((a, b) => {
              return a - b;
            });

            if (isStartTimeChange) {
              let newStart = getTimeAtPixel(
                startPixelOffset,
                this.props.startDate,
                this.props.endDate,
                this.getTimelineWidth(),
                this.props.snapMinutes
              );
              if (durationChange === null) durationChange = item.start.diff(newStart, 'ms');
              itemsOnNewRow.forEach(el => {
                if (
                  el.key !== item.key &&
                  el.end.diff(0, 'ms') <= item.start.diff(0, 'ms') &&
                  (!nearbyElement || el.end.diff(0, 'ms') > nearbyElement.end.diff(0, 'ms'))
                ) {
                  nearbyElement = el;
                }
              });

              // if has nearby element from left side
              if (nearbyElement && nearbyElement.end.diff(0, 'ms') > newStart.diff(0, 'ms')) {
                newStart = moment(nearbyElement.end.diff(0, 'ms') + 10);
              }

              // resize left
              if (!nearbyElement && this.props.startDate.diff(0, 'ms') >= newStart.diff(0, 'ms')) {
                newStart = this.props.startDate;
              }

              // check item minimum size
              if (
                minimumDuration &&
                item.end.diff(newStart, 'ms') < minimumDuration &&
                this.props.startDate.diff(0, 'ms') < newStart.diff(0, 'ms')
              ) {
                newStart = moment(item.end.diff(0, 'ms') - minimumDuration);
              }

              // check item maximum size
              if (
                maximumDuration &&
                item.end.diff(newStart, 'ms') > maximumDuration &&
                this.props.startDate.diff(0, 'ms') < newStart.diff(0, 'ms')
              ) {
                newStart = moment(item.end.diff(0, 'ms') - maximumDuration);
              }

              const widthInPxToEnd = getPixelAtTime(
                item.end,
                this.props.startDate,
                this.props.endDate,
                this.getTimelineWidth()
              );
              const widthInPxToStart = getPixelAtTime(
                newStart,
                this.props.startDate,
                this.props.endDate,
                this.getTimelineWidth()
              );
              const itemWidthInPx = widthInPxToEnd - widthInPxToStart;

              item.start = newStart;
              domItem.style.width = `${itemWidthInPx}px`;
            } else {
              let endPixelOffset = startPixelOffset + pixToInt(domItem.style.width);
              let newEnd = getTimeAtPixel(
                endPixelOffset,
                this.props.startDate,
                this.props.endDate,
                this.getTimelineWidth(),
                this.props.snapMinutes
              );
              if (durationChange === null) durationChange = item.end.diff(newEnd, 'ms');

              itemsOnNewRow.forEach(el => {
                if (
                  el.key !== item.key &&
                  el.start.diff(0, 'ms') >= item.end.diff(0, 'ms') &&
                  (!nearbyElement || el.end.diff(0, 'ms') < nearbyElement.end.diff(0, 'ms'))
                ) {
                  nearbyElement = el;
                }
              });

              // if has nearby element from right side
              if (nearbyElement && nearbyElement.start.diff(0, 'ms') < newEnd.diff(0, 'ms')) {
                newEnd = moment(nearbyElement.start.diff(0, 'ms') - 10);
              }

              // resize right
              if (!nearbyElement && this.props.endDate.diff(0, 'ms') <= newEnd.diff(0, 'ms')) {
                newEnd = this.props.endDate;
              }

              // check item minimum size
              if (
                minimumDuration &&
                newEnd.diff(item.start, 'ms') < minimumDuration &&
                this.props.endDate.diff(0, 'ms') > newEnd.diff(0, 'ms')
              ) {
                newEnd = moment(item.start.diff(0, 'ms') + minimumDuration);
              }

              // check item maximum size
              if (
                maximumDuration &&
                newEnd.diff(item.start, 'ms') > maximumDuration &&
                this.props.endDate.diff(0, 'ms') > newEnd.diff(0, 'ms')
              ) {
                newEnd = moment(item.start.diff(0, 'ms') + maximumDuration);
              }

              const widthInPxToEnd = getPixelAtTime(
                newEnd,
                this.props.startDate,
                this.props.endDate,
                this.getTimelineWidth()
              );
              const widthInPxToStart = getPixelAtTime(
                item.start,
                this.props.startDate,
                this.props.endDate,
                this.getTimelineWidth()
              );
              const itemWidthInPx = widthInPxToEnd - widthInPxToStart;

              item.end = newEnd;
              domItem.style.width = `${itemWidthInPx}px`;
            }

            // Check row height doesn't need changing
            let new_row_height = getMaxOverlappingItems(
              this.rowItemMap[rowNo],
              this.props.startDate,
              this.props.endDate
            );
            if (new_row_height !== this.rowHeightCache[rowNo]) {
              this.rowHeightCache[rowNo] = new_row_height;
            }

            //Reset styles
            domItem.removeAttribute('isResizing');
            domItem.removeAttribute('initialWidth');
            domItem.style['z-index'] = 3;
            domItem.style.webkitTransform = domItem.style.transform = 'translate(0px, 0px)';

            item.isUpdatedStartEnd = true;
            items.push(item);
          });
          if (durationChange === null) durationChange = 0;
          const changes = {isStartTimeChange, timeDelta: -durationChange};

          this.props.onInteraction(Timeline.changeTypes.resizeEnd, changes, items);

          e.target.setAttribute('delta-x', 0);
          this._grid.recomputeGridSize({rowIndex: minRowNo});
        });
    }

    if (canSelect) {
      this._selectRectangleInteractable
        .draggable({
          enabled: true,
          ignoreFrom: '.item_draggable, .rct9k-group'
        })
        .styleCursor(false)
        .on('dragstart', e => {
          const nearestRowObject = getNearestRowObject(e.clientX, e.clientY);

          // this._selectBox.start(e.clientX, e.clientY);
          // this._selectBox.start(e.clientX, topRowObj.style.top);
          this._selectBox.start(e.clientX, nearestRowObject.getBoundingClientRect().y);
          // const bottomRow = Number(getNearestRowNumber(left + width, top + height));
        })
        .on('dragmove', e => {
          const magicalConstant = 2;
          // I added this magical constant to solve the issue of selection bleed,
          // I don't understand why it works, but if frequentist statisticians can use imaginary numbers, so can i.
          const {startX, startY} = this._selectBox;
          const startRowObject = getNearestRowObject(startX, startY);
          const {clientX, clientY} = e;
          const currentRowObject = getNearestRowObject(clientX, clientY);
          if (currentRowObject !== undefined && startRowObject !== undefined) {
            // only run if you can detect the top row
            const startRowNumber = getRowObjectRowNumber(startRowObject);
            const currentRowNumber = getRowObjectRowNumber(currentRowObject);
            // const numRows = 1 + Math.abs(startRowNumber - currentRowNumber);
            const rowMarginBorder = getVerticalMarginBorder(currentRowObject);
            if (startRowNumber <= currentRowNumber) {
              // select box for selection going down
              // get the first selected rows top
              const startTop = Math.ceil(startRowObject.getBoundingClientRect().top + rowMarginBorder);
              // get the currently selected rows bottom
              const currentBottom = Math.floor(getTrueBottom(currentRowObject) - magicalConstant - rowMarginBorder);
              this._selectBox.start(startX, startTop);
              this._selectBox.move(clientX, currentBottom);
            } else {
              // select box for selection going up
              // get the currently selected rows top
              const currentTop = Math.ceil(currentRowObject.getBoundingClientRect().top + rowMarginBorder);
              // get the first selected rows bottom
              const startBottom = Math.floor(getTrueBottom(startRowObject) - magicalConstant - rowMarginBorder * 2);
              // the bottom will bleed south unless you counter the margins and boreders from the above rows
              this._selectBox.start(startX, startBottom);
              this._selectBox.move(clientX, currentTop);
            }
          }
        })
        .on('dragend', e => {
          let {top, left, width, height} = this._selectBox.end();
          //Get the start and end row of the selection rectangle
          const topRowObject = getNearestRowObject(left, top);

          if (topRowObject !== undefined) {
            // only confirm the end of a drag if the selection box is valid
            const topRowNumber = Number(getNearestRowNumber(left, top));
            const topRowLoc = topRowObject.getBoundingClientRect();
            const rowMarginBorder = getVerticalMarginBorder(topRowObject);
            const bottomRow = Number(
              getNearestRowNumber(
                left + width,
                Math.floor(topRowLoc.top - rowMarginBorder) + Math.floor(height - rowMarginBorder)
              )
            );

            //Get the start and end time of the selection rectangle
            left = left - this.props.offsetLeft;
            let startOffset = width > 0 ? left : left + width;
            let endOffset = width > 0 ? left + width : left;
            const startTime = getTimeAtPixel(
              startOffset,
              this.props.startDate,
              this.props.endDate,
              this.getTimelineWidth(),
              this.props.snapMinutes
            );
            const endTime = getTimeAtPixel(
              endOffset,
              this.props.startDate,
              this.props.endDate,
              this.getTimelineWidth(),
              this.props.snapMinutes
            );

            //Get items in these ranges
            let selectedItems = [];
            for (let r = Math.min(topRowNumber, bottomRow); r <= Math.max(topRowNumber, bottomRow); r++) {
              selectedItems.push(
                ..._.filter(this.rowItemMap[r], i => {
                  return i.start.isBefore(endTime) && i.end.isAfter(startTime);
                })
              );
            }
            this.props.onInteraction(Timeline.changeTypes.itemsSelected, selectedItems);
          }
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
      itemCallback && itemCallback(e, itemKey);
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
    const {timelineMode, onItemHover, onItemLeave, rowLayers} = this.props;
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
            onClick={this.props.onRowClick}
            onMouseDown={e => (this.selecting = false)}
            onMouseMove={e => (this.selecting = true)}
            onMouseOver={e => {
              this.selecting = false;
              return this._handleItemRowEvent(e, onItemHover, null);
            }}
            onMouseLeave={e => {
              this.selecting = false;
              return this._handleItemRowEvent(e, onItemLeave, null);
            }}
            onContextMenu={e =>
              this._handleItemRowEvent(e, this.props.onItemContextClick, this.props.onRowContextClick)
            }
            onDoubleClick={e => this._handleItemRowEvent(e, this.props.onItemDoubleClick, this.props.onRowDoubleClick)}>
            {rowItemsRenderer(
              itemsInRow,
              this.props.startDate,
              this.props.endDate,
              width,
              this.props.itemHeight,
              this.props.itemRenderer,
              canSelect ? this.props.selectedItems : [],
              false,
              (e, key) => this.props.onInteraction(Timeline.changeTypes.oneItemSelected, {e, key})
            )}
            {rowLayerRenderer(layersInRow, this.props.startDate, this.props.endDate, width, rowHeight)}
          </div>
        );
      }
    };
  }

  rowHeight({index}) {
    // let rh = this.rowHeightCache[index] ? this.rowHeightCache[index] : 1;
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

  mouseMoveFunc(e) {
    e.persist();
    this.throttledMouseMoveFunc(e);
  }

  render() {
    const {
      timebarFormat,
      componentId,
      shallowUpdateCheck,
      forceRedrawFunc,
      bottomResolution,
      topResolution
    } = this.props;

    const divCssClass = `rct9k-timeline-div rct9k-id-${componentId}`;
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
        <div className={divCssClass} style={{height: this.props.itemHeight * this.props.layersNumber + 'px'}}>
          <AutoSizer className="rct9k-autosizer" onResize={this.refreshGrid}>
            {({height, width}) => (
              <div className="parent-div" onMouseMove={this.mouseMoveFunc}>
                <SelectBox ref={this.select_ref_callback} />
                <Timebar start={this.props.startDate} end={this.props.endDate} width={width} {...varTimebarProps} />
                <TimelineBody
                  width={width}
                  columnWidth={columnWidth(width)}
                  height={calculateHeight(height)}
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
