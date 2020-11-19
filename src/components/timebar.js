'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {timebarFormat as defaultTimebarFormat} from '../consts/timebarConsts';

// Timebar component - displays the current time on top of the timeline
export default class Timebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="rct9k-timebar"></div>
    );
  }
}

Timebar.propTypes = {
  cursorTime: PropTypes.any,
  groupTitleRenderer: PropTypes.func,
  start: PropTypes.object.isRequired, //moment
  end: PropTypes.object.isRequired, //moment
  width: PropTypes.number.isRequired,
  leftOffset: PropTypes.number,
  top_resolution: PropTypes.string,
  bottom_resolution: PropTypes.string,
  selectedRanges: PropTypes.arrayOf(PropTypes.object), // [start: moment ,end: moment (end)]
  timeFormats: PropTypes.object
};
Timebar.defaultProps = {
  selectedRanges: [],
  groupTitleRenderer: () => <div />,
  leftOffset: 0,
  timeFormats: defaultTimebarFormat
};
