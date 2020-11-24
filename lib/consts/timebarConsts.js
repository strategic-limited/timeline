"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minElementDuration = exports.timebarFormat = void 0;

/**
 * Default timebar format
 */
var timebarFormat = {
  majorLabels: {
    minute: {
      "short": 'mm',
      //01
      "long": 'HH:mm' //12:01

    },
    hour: {
      "short": 'HH',
      //13
      "long": 'HH:mm' //13:00

    },
    day: {
      "short": 'Do',
      //1st
      "long": 'ddd, LL' //Sun, July 3, 2018

    },
    month: {
      "short": 'MMM',
      //Jan
      "long": 'MMMM YYYY' //January 2018

    },
    year: {
      "short": 'YYYY',
      //2018
      "long": 'YYYY' //2018

    }
  },
  minorLabels: {
    minute: {
      "short": 'mm',
      //01
      "long": 'HH:mm' //12:01

    },
    hour: {
      "short": 'HH',
      //13
      "long": 'HH:mm' //13:00

    },
    day: {
      "short": 'D',
      //1
      "long": 'ddd Do' //Sun 1st

    },
    month: {
      "short": 'MM',
      //02
      "long": 'MMMM' //January

    },
    year: {
      "short": 'YYYY',
      //2018
      "long": 'YYYY' //2018

    }
  }
};
exports.timebarFormat = timebarFormat;
var minElementDuration = 100; // in ms

exports.minElementDuration = minElementDuration;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdHMvdGltZWJhckNvbnN0cy5qcyJdLCJuYW1lcyI6WyJ0aW1lYmFyRm9ybWF0IiwibWFqb3JMYWJlbHMiLCJtaW51dGUiLCJob3VyIiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwibWlub3JMYWJlbHMiLCJtaW5FbGVtZW50RHVyYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDTyxJQUFNQSxhQUFhLEdBQUc7QUFDM0JDLEVBQUFBLFdBQVcsRUFBRTtBQUNYQyxJQUFBQSxNQUFNLEVBQUU7QUFDTixlQUFPLElBREQ7QUFDTztBQUNiLGNBQU0sT0FGQSxDQUVROztBQUZSLEtBREc7QUFLWEMsSUFBQUEsSUFBSSxFQUFFO0FBQ0osZUFBTyxJQURIO0FBQ1M7QUFDYixjQUFNLE9BRkYsQ0FFVTs7QUFGVixLQUxLO0FBU1hDLElBQUFBLEdBQUcsRUFBRTtBQUNILGVBQU8sSUFESjtBQUNVO0FBQ2IsY0FBTSxTQUZILENBRWE7O0FBRmIsS0FUTTtBQWFYQyxJQUFBQSxLQUFLLEVBQUU7QUFDTCxlQUFPLEtBREY7QUFDUztBQUNkLGNBQU0sV0FGRCxDQUVhOztBQUZiLEtBYkk7QUFpQlhDLElBQUFBLElBQUksRUFBRTtBQUNKLGVBQU8sTUFESDtBQUNXO0FBQ2YsY0FBTSxNQUZGLENBRVM7O0FBRlQ7QUFqQkssR0FEYztBQXVCM0JDLEVBQUFBLFdBQVcsRUFBRTtBQUNYTCxJQUFBQSxNQUFNLEVBQUU7QUFDTixlQUFPLElBREQ7QUFDTztBQUNiLGNBQU0sT0FGQSxDQUVROztBQUZSLEtBREc7QUFLWEMsSUFBQUEsSUFBSSxFQUFFO0FBQ0osZUFBTyxJQURIO0FBQ1M7QUFDYixjQUFNLE9BRkYsQ0FFVTs7QUFGVixLQUxLO0FBU1hDLElBQUFBLEdBQUcsRUFBRTtBQUNILGVBQU8sR0FESjtBQUNTO0FBQ1osY0FBTSxRQUZILENBRVk7O0FBRlosS0FUTTtBQWFYQyxJQUFBQSxLQUFLLEVBQUU7QUFDTCxlQUFPLElBREY7QUFDUTtBQUNiLGNBQU0sTUFGRCxDQUVROztBQUZSLEtBYkk7QUFpQlhDLElBQUFBLElBQUksRUFBRTtBQUNKLGVBQU8sTUFESDtBQUNXO0FBQ2YsY0FBTSxNQUZGLENBRVM7O0FBRlQ7QUFqQks7QUF2QmMsQ0FBdEI7O0FBK0NBLElBQU1FLGtCQUFrQixHQUFHLEdBQTNCLEMsQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRGVmYXVsdCB0aW1lYmFyIGZvcm1hdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRpbWViYXJGb3JtYXQgPSB7XHJcbiAgbWFqb3JMYWJlbHM6IHtcclxuICAgIG1pbnV0ZToge1xyXG4gICAgICBzaG9ydDogJ21tJywgLy8wMVxyXG4gICAgICBsb25nOiAnSEg6bW0nIC8vMTI6MDFcclxuICAgIH0sXHJcbiAgICBob3VyOiB7XHJcbiAgICAgIHNob3J0OiAnSEgnLCAvLzEzXHJcbiAgICAgIGxvbmc6ICdISDptbScgLy8xMzowMFxyXG4gICAgfSxcclxuICAgIGRheToge1xyXG4gICAgICBzaG9ydDogJ0RvJywgLy8xc3RcclxuICAgICAgbG9uZzogJ2RkZCwgTEwnIC8vU3VuLCBKdWx5IDMsIDIwMThcclxuICAgIH0sXHJcbiAgICBtb250aDoge1xyXG4gICAgICBzaG9ydDogJ01NTScsIC8vSmFuXHJcbiAgICAgIGxvbmc6ICdNTU1NIFlZWVknIC8vSmFudWFyeSAyMDE4XHJcbiAgICB9LFxyXG4gICAgeWVhcjoge1xyXG4gICAgICBzaG9ydDogJ1lZWVknLCAvLzIwMThcclxuICAgICAgbG9uZzogJ1lZWVknIC8vMjAxOFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbWlub3JMYWJlbHM6IHtcclxuICAgIG1pbnV0ZToge1xyXG4gICAgICBzaG9ydDogJ21tJywgLy8wMVxyXG4gICAgICBsb25nOiAnSEg6bW0nIC8vMTI6MDFcclxuICAgIH0sXHJcbiAgICBob3VyOiB7XHJcbiAgICAgIHNob3J0OiAnSEgnLCAvLzEzXHJcbiAgICAgIGxvbmc6ICdISDptbScgLy8xMzowMFxyXG4gICAgfSxcclxuICAgIGRheToge1xyXG4gICAgICBzaG9ydDogJ0QnLCAvLzFcclxuICAgICAgbG9uZzogJ2RkZCBEbycgLy9TdW4gMXN0XHJcbiAgICB9LFxyXG4gICAgbW9udGg6IHtcclxuICAgICAgc2hvcnQ6ICdNTScsIC8vMDJcclxuICAgICAgbG9uZzogJ01NTU0nIC8vSmFudWFyeVxyXG4gICAgfSxcclxuICAgIHllYXI6IHtcclxuICAgICAgc2hvcnQ6ICdZWVlZJywgLy8yMDE4XHJcbiAgICAgIGxvbmc6ICdZWVlZJyAvLzIwMThcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbWluRWxlbWVudER1cmF0aW9uID0gMTAwOyAvLyBpbiBtc1xyXG4iXX0=