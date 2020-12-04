import React, {useEffect, useState} from 'react';
import _ from 'lodash';

import Timeline from './timeline';
import ScrollBar from './components/scrollBar';

const groups = [{id: 0}];

const Scroll = ({startDate, endDate, scrollBarStart, scrollBarEnd, setStartDateWithZoom, setEndDateWithZoom}) => {
  const [isStartDrag, setIsStartDrag] = useState(false);
  const [items, setItems] = useState([
    {
      key: 1,
      color: '#363651',
      row: 0,
      start: startDate,
      end: endDate,
      isResizable: false
    }
  ]);
  const [selectedItems, setSelectedItems] = useState(['1']);

  useEffect(() => {
    if (!isStartDrag) {
      setItems([
        {
          key: 1,
          color: '#363651',
          row: 0,
          start: scrollBarStart,
          end: scrollBarEnd,
          isResizable: false
        }
      ]);
    }
  }, [scrollBarStart, scrollBarEnd]);

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
        document.querySelector('.rct9k-items-outer-scroll').style.transition = 'none';
        setIsStartDrag(true);
        return selectedItems;
      }
      case Timeline.changeTypes.dragEnd:
      case Timeline.changeTypes.resizeEnd: {
        document.querySelector('.rct9k-items-outer-scroll').style.transition = '0.3s all';
        const newItems = _.clone(items);

        absorbChange(newItems, elements);
        setItems(newItems);
        setIsStartDrag(false);
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

  return (
    <ScrollBar
      shallowUpdateCheck
      items={items}
      groups={groups}
      startDate={startDate}
      endDate={endDate}
      originalStartDate={startDate}
      originalEndDate={endDate}
      selectedItems={selectedItems}
      showCursorTime
      onInteraction={handleInteraction}
      componentId="timeline-scroll"
      setStartDateWithZoom={setStartDateWithZoom}
      setEndDateWithZoom={setEndDateWithZoom}
    />
  );
};

export default Scroll;
