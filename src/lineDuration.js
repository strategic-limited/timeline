import React, {useEffect, useState} from 'react';

import Timeline from './timeline';

const groups = [{id: 0}];

const Scroll = ({startDate, endDate, originalStartDate, originalEndDate}) => {
  const [items, setItems] = useState([
    {
      key: 1,
      row: 0,
      start: startDate,
      end: endDate,
      isResizable: false,
      title: 'title'
    }
  ]);
  const [selectedItems, setSelectedItems] = useState(['1']);

  return (
    <Timeline
      shallowUpdateCheck
      items={items}
      groups={groups}
      startDate={startDate}
      endDate={endDate}
      originalStartDate={originalStartDate}
      originalEndDate={originalEndDate}
      selectedItems={selectedItems}
      itemHeight={29}
      componentId="timeline-line"
      layersNumber={1} // ToDo здесь должно быть количество слоев на timeline
    />
  );
};

export default Scroll;
