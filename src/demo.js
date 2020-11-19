// 'use strict';
//
// import React, {Component, Fragment} from 'react';
// import moment from 'moment';
// import _ from 'lodash';
//
// import Timeline from './timeline';
// import {customItemRenderer, customGroupRenderer} from 'demo/customRenderers';
//
// import 'antd/dist/antd.css';
// import './style.css';
//
// const {TIMELINE_MODES} = Timeline;
//
// const ITEM_DURATIONS = moment.duration(5, 'minutes');
//
// export default class DemoTimeline extends Component {
//   constructor(props) {
//     super(props);
//
//     const startDate = moment('2018-08-01 00:00:00');
//     const endDate = moment('2018-08-01 00:00:30');
//     const zoom = 1;
//     const startDateWithZoom = startDate;
//     const endDateWithZoom = endDate;
//     this.state = {
//       selectedItems: [],
//       rows: 4,
//       items_per_row: 1,
//       snap: 0.01,
//       startDate,
//       endDate,
//       startDateWithZoom,
//       endDateWithZoom,
//       zoom,
//       timelineMode: TIMELINE_MODES.SELECT | TIMELINE_MODES.DRAG | TIMELINE_MODES.RESIZE
//     };
//     this.reRender = this.reRender.bind(this);
//     this.zoomIn = this.zoomIn.bind(this);
//     this.zoomOut = this.zoomOut.bind(this);
//     this.toggleCustomRenderers = this.toggleCustomRenderers.bind(this);
//     this.handleRowClick = this.handleRowClick.bind(this);
//   }
//
//   componentWillMount() {
//     this.reRender();
//   }
//
//   reRender() {
//     const list = [];
//     const groups = [];
//     const {snap} = this.state;
//
//     this.key = 0;
//     for (let i = 0; i < this.state.rows; i++) {
//       groups.push({id: i, title: `Row ${i}`});
//       for (let j = 0; j < this.state.items_per_row; j++) {
//         this.key += 1;
//
//         let start = moment('2018-08-01 00:00:00:00');
//         let end = moment('2018-08-01 00:00:05');
//
//         list.push({
//           key: this.key,
//           title: this.key + " element",
//           color: '#363651',
//           row: i,
//           start,
//           end,
//           // minDuration: 2000,
//           // isResizable: false,
//         });
//       }
//     }
//
//     this.forceUpdate();
//     this.setState({items: list, groups});
//   }
//
//   handleRowClick = (e, rowNumber, clickedTime, snappedClickedTime) => {
//     this.setState({selectedItems: []});
//   };
//
//   zoomIn() {
//     let currentMs = this.state.endDate.diff(this.state.startDate, 'ms');
//     let newMs = currentMs * 0.5;
//     const newValue = this.state.startDate.clone().add(newMs, 'ms');
//     if (newValue.diff(this.state.startDate) > 1) {
//       // this.setState({endDate: newValue});
//       this.setState(state => ({zoom: state.zoom * 0.5}));
//     }
//   }
//
//   zoomOut() {
//     // let currentMs = this.state.endDate.diff(this.state.startDate, 'ms');
//     // let newMs = currentMs * 2;
//     // this.setState({endDate: this.state.startDate.clone().add(newMs, 'ms')});
//     this.setState(state => ({zoom: state.zoom * 2}));
//   }
//
//   toggleCustomRenderers(checked) {
//     this.setState({useCustomRenderers: checked});
//   }
//
//   handleItemClick = (e, key) => {
//     const {selectedItems} = this.state;
//
//     let newSelection = selectedItems.slice();
//
//     // If the item is already selected, then unselected
//     const idx = selectedItems.indexOf(key);
//     if (idx > -1) {
//       newSelection.splice(idx, 1);
//     } else {
//       newSelection.push(Number(key));
//     }
//
//     this.setState({selectedItems: newSelection});
//   };
//
//   handleInteraction = (type, changes, items) => {
//     function absorbChange(itemList, selectedItems) {
//       itemList.forEach(item => {
//         let i = selectedItems.find(i => {
//           return i.key == item.key;
//         });
//         if (i) {
//           item = i;
//         }
//       });
//     }
//
//     switch (type) {
//       case Timeline.changeTypes.dragStart: {
//         return this.state.selectedItems;
//       }
//       case Timeline.changeTypes.dragEnd: {
//         const newItems = _.clone(this.state.items);
//
//         absorbChange(newItems, items);
//         this.setState({items: newItems});
//         break;
//       }
//       case Timeline.changeTypes.resizeStart: {
//         return this.state.selectedItems;
//       }
//       case Timeline.changeTypes.resizeEnd: {
//         const newItems = _.clone(this.state.items);
//
//         // Fold the changes into the item list
//         absorbChange(newItems, items);
//
//         this.setState({items: newItems});
//         break;
//       }
//       case Timeline.changeTypes.itemsSelected: {
//         this.setState({selectedItems: _.map(changes, 'key')});
//         break;
//       }
//       default:
//         return changes;
//     }
//   };
//
//   render() {
//     const {
//       selectedItems,
//       rows,
//       items_per_row,
//       snap,
//       startDate,
//       endDate,
//       items,
//       groups,
//       useCustomRenderers,
//       timelineMode,
//       zoom,
//     } = this.state;
//     const rangeValue = [startDate, endDate];
//
//     const selectable = (TIMELINE_MODES.SELECT & timelineMode) === TIMELINE_MODES.SELECT;
//     const draggable = (TIMELINE_MODES.DRAG & timelineMode) === TIMELINE_MODES.DRAG;
//     const resizeable = (TIMELINE_MODES.RESIZE & timelineMode) === TIMELINE_MODES.RESIZE;
//
//     // const endDateWithZoom = moment(startDate.diff(0) + (endDate.diff(startDate) * zoom));
//
//     const rowLayers = [];
//     for (let i = 0; i < rows; i += 1) {
//       if (i % 5 === 0 && i !== 0) {
//         continue;
//       }
//       let curDate = startDate.clone();
//       while (curDate.isSameOrBefore(endDate)) {
//         const dayOfWeek = Number(curDate.format('d')); // 0 -> 6: Sun -> Sat
//         let bandDuration = 0; // days
//         let color = '';
//         if (dayOfWeek % 6 === 0) {
//           color = 'blue';
//           bandDuration = dayOfWeek === 6 ? 2 : 1; // 2 if sat, 1 if sun
//         } else {
//           color = 'green';
//           bandDuration = 6 - dayOfWeek;
//         }
//
//         rowLayers.push({
//           start: curDate.clone(),
//           end: curDate.clone().add(bandDuration, 'days'),
//           style: {backgroundColor: color, opacity: '0.3'},
//           rowNumber: i
//         });
//         curDate.add(bandDuration, 'days');
//       }
//     }
//
//     return (
//       <Fragment>
//         <button onClick={this.zoomIn}>Zoom In</button>
//         <button onClick={this.zoomOut}>Zoom Out</button>
//         <div className="timeline-grid">
//           <Timeline
//             shallowUpdateCheck
//             items={items}
//             groups={groups}
//             startDate={startDate}
//             endDate={endDate}
//             // rowLayers={rowLayers}
//             selectedItems={selectedItems}
//             snapMinutes={snap}
//             onItemClick={this.handleItemClick}
//             showCursorTime
//             itemHeight={35}
//             groupOffset={0} // important
//             // onItemDoubleClick={this.handleItemDoubleClick}
//             // onItemContextClick={this.handleItemContextClick}
//             onInteraction={this.handleInteraction}
//             onRowClick={this.handleRowClick}
//             // onRowContextClick={this.handleRowContextClick}
//             // onRowDoubleClick={this.handleRowDoubleClick}
//             // itemRenderer={useCustomRenderers ? customItemRenderer : undefined}
//             // groupRenderer={useCustomRenderers ? customGroupRenderer : undefined}
//             // groupTitleRenderer={useCustomRenderers ? () => <div>Group title</div> : undefined}
//           />
//         </div>
//       </Fragment>
//     );
//   }
// }

import React, {Fragment, useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import Timeline from './timeline';
import Scroll from './scroll';
import {customItemRenderer, customGroupRenderer} from 'demo/customRenderers';

import 'antd/dist/antd.css';
import './style.css';

const { TIMELINE_MODES } = Timeline;
const list = [
  {
    key: 1,
    title: 1 + " element",
    color: '#363651',
    row: 0,
    start: moment('2018-08-01 00:00:00:00'),
    end: moment('2018-08-01 00:00:05'),
  },
  {
    key: 2,
    title: 2 + " element",
    color: '#363651',
    row: 1,
    start: moment('2018-08-01 00:00:00:00'),
    end: moment('2018-08-01 00:00:05'),
  },
  {
    key: 3,
    title: 3 + " element",
    color: '#363651',
    row: 2,
    start: moment('2018-08-01 00:00:00:00'),
    end: moment('2018-08-01 00:00:05'),
  },
  {
    key: 4,
    title: 4 + " element",
    color: '#363651',
    row: 3,
    start: moment('2018-08-01 00:00:00:00'),
    end: moment('2018-08-01 00:00:05'),
  },
];

const groups = [
  {
    id: 0,
    title: 'Row' + 0,
  },
  {
    id: 1,
    title: 'Row' + 1,
  },
  {
    id: 2,
    title: 'Row' + 2,
  },
  {
    id: 3,
    title: 'Row' + 3,
  },
];

const DemoTimeline = () => {
  const startDate = moment('2018-08-01 00:00:00');
  // const endDate = moment('2018-08-01 00:00:30');

  const [endDate, setEndDate] = useState(moment('2018-08-01 00:00:30'));
  const [items, setItems] = useState(list);
  const [zoom, setZoom] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [startDateWithZoom, setStartDateWithZoom] = useState(startDate);
  const [endDateWithZoom, setEndDateWithZoom] = useState(null);

  const [isShowScroll, setIsShowScroll] = useState(false);

  // update endDateWithZoom
  useEffect(() => {
    let newEnd = moment(startDateWithZoom.diff(0) + (endDate.diff(startDate) * zoom));
    if (!endDateWithZoom || (endDateWithZoom.diff(0) !== newEnd.diff(0))) {
      if (endDate.diff(newEnd) <= 0) {
        setStartDateWithZoom(moment(startDateWithZoom.diff(0) - newEnd.diff(endDate)));
        setEndDateWithZoom(endDate);
      }
      setEndDateWithZoom(newEnd);
      if (+zoom !== 1) {
        setIsShowScroll(true);
      } else {
        setStartDateWithZoom(startDate);
        setEndDateWithZoom(endDate);
        setIsShowScroll(false);
      }
    }
  }, [endDate, zoom, startDateWithZoom]);

  // zoomIn
  const zoomIn = () => {
    if (zoom > 0.1) {
      setZoom((zoom - 0.1).toFixed(1));
    }
  };

  // zoomOut
  const zoomOut = () => {
    const newValue = (+zoom + 0.1).toFixed(1);
    if (newValue <= 1) {
      setZoom(newValue);
    }
  };

  // zoomReset
  const zoomReset = () => {
    setZoom(1);
  };

  const handleItemClick = (e, key) => {
    let newSelection = selectedItems.slice();
    // If the item is already selected, then unselected
    const idx = selectedItems.indexOf(key);
    if (idx > -1) {
      newSelection.splice(idx, 1);
    } else {
      newSelection.push(Number(key));
    }
    setSelectedItems(newSelection);
  };

  const handleRowClick = () => {
    setSelectedItems([]);
  };

  const handleInteraction = (type, changes, elements) => {
    const absorbChange = (itemList, selectedItems) => {
      itemList.forEach(item => {
        let i = selectedItems.find(i => {
          return i.key == item.key;
        });
        if (i) {
          item = i;
        }
      });
    };

    switch (type) {
      case Timeline.changeTypes.dragStart:
      case Timeline.changeTypes.resizeStart: {
        return selectedItems;
      }
      case Timeline.changeTypes.dragEnd:
      case Timeline.changeTypes.resizeEnd: {
        const newItems = _.clone(items);

        absorbChange(newItems, elements);
        // ToDo исправить под нужды проекта
        setItems(newItems);
        break;
      }
      case Timeline.changeTypes.itemsSelected: {
        setSelectedItems(_.map(changes, 'key'));
        break;
      }
      default:
        return changes;
    }
  };

  if (startDateWithZoom && endDateWithZoom) {
    return (
      <Fragment>
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomReset}>Reset</button>
        <button onClick={zoomOut}>Zoom Out</button>
        <div>
          <Timeline
            shallowUpdateCheck
            items={items}
            groups={groups}
            startDate={startDateWithZoom}
            endDate={endDateWithZoom}
            originalStartDate={startDate}
            originalEndDate={endDate}
            selectedItems={selectedItems}
            onItemClick={handleItemClick}
            showCursorTime
            itemHeight={35}
            groupOffset={0} // important
            onInteraction={handleInteraction}
            onRowClick={handleRowClick}
            componentId="timeline-block"
            updateEndDate={setEndDate} // ToDo поменять функцию для изменения end видео ролика
          />
        </div>
        {isShowScroll && (
          <Scroll
            startDate={startDate}
            endDate={endDate}
            scrollBarStart={startDateWithZoom}
            scrollBarEnd={endDateWithZoom}
            setStartDateWithZoom={setStartDateWithZoom}
            setEndDateWithZoom={setEndDateWithZoom}
            zoom={zoom}
          />
        )}
      </Fragment>
    );
  }
  return null;
};

DemoTimeline.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string,
    row: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    start: PropTypes.shape().isRequired,
    end: PropTypes.shape().isRequired,
    minDuration: PropTypes.number, // in ms
    isResizable: PropTypes.bool,
  })),
};

export default DemoTimeline;
