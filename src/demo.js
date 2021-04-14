import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import Timeline from './timeline';
import Scroll from './scroll';

import 'antd/dist/antd.css';
import './style.css';

const list = [
  {
    key: '1',
    title: 1 + ' element',
    row: 0,
    start: moment('2018-08-01 00:00:00'),
    end: moment('2018-08-01 00:00:05')
  },
  {
    key: '2',
    title: 2 + ' element',
    row: 1,
    start: moment('2018-08-01 00:00:00'),
    end: moment('2018-08-01 00:00:05')
  },
  {
    key: '3',
    title: 3 + ' element',
    row: 2,
    start: moment('2018-08-01 00:00:00'),
    end: moment('2018-08-01 00:00:05')
  },
  {
    key: '4',
    title: 4 + ' element',
    row: 3,
    start: moment('2018-08-01 00:00:00'),
    end: moment('2018-08-01 00:00:05')
  },
  {
    key: '5',
    title: 5 + ' element',
    row: 4,
    start: moment('2018-08-01 00:00:00'),
    end: moment('2018-08-01 00:00:05')
  },
  {
    key: '6',
    title: 6 + ' element',
    row: 5,
    start: moment('2018-08-01 00:00:00'),
    end: moment('2018-08-01 00:00:05')
  }
];

const groups = [
  {
    id: 0,
    title: 'Row' + 0
  },
  {
    id: 1,
    title: 'Row' + 1
  },
  {
    id: 2,
    title: 'Row' + 2
  },
  {
    id: 3,
    title: 'Row' + 3
  },
  {
    id: 4,
    title: 'Row' + 4
  },
  {
    id: 5,
    title: 'Row' + 5
  }
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
    let newEnd = moment(startDateWithZoom.diff(0) + endDate.diff(startDate) * zoom);
    if (!endDateWithZoom || endDateWithZoom.diff(0) !== newEnd.diff(0)) {
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
      case Timeline.changeTypes.oneItemSelected: {
        changes.e.stopPropagation();
        let newSelection = selectedItems.slice();
        // If the item is already selected, then unselected
        const idx = selectedItems.indexOf(changes.item.key);

        if (idx > -1) {
          newSelection.splice(idx, 1);
        } else {
          newSelection.push(changes.item.key);
        }
        setSelectedItems(newSelection);
        break;
      }
      case Timeline.changeTypes.dragStart:
      case Timeline.changeTypes.resizeStart: {
        return selectedItems;
      }
      case Timeline.changeTypes.dragEnd:
      case Timeline.changeTypes.resizeEnd: {
        const newItems = _.clone(items);

        absorbChange(newItems, elements);

        const returnSelectedItems = [];
        elements.forEach(item => {
          returnSelectedItems.push(item.key);
        });
        setSelectedItems([...selectedItems, ...returnSelectedItems]);
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
            // onItemClick={handleItemClick}
            showCursorTime
            itemHeight={35}
            multiselectMaxRow={4}
            onInteraction={handleInteraction}
            onRowClick={handleRowClick}
            componentId="timeline-block"
            updateEndDate={setEndDate} // ToDo поменять функцию для изменения end видео ролика
            layersNumber={4} // ToDo здесь должно быть количество слоев на timeline
            offsetLeft={0} // Отступ слева (от timeline до начала окна). Это нужно для правильного multiselect.
            onItemContextClick={(e, key, currentTime) => console.log('Item', key)}
            onRowContextClick={(e, row, currentTime) => console.log('Row', currentTime.diff(startDate))}
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
            scrollEffect={() => console.log('Scroll move')}
          />
        )}
      </Fragment>
    );
  }
  return null;
};

DemoTimeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string,
      row: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      start: PropTypes.shape().isRequired,
      end: PropTypes.shape().isRequired,
      minDuration: PropTypes.number, // in ms
      isResizable: PropTypes.bool
    })
  )
};

export default DemoTimeline;
