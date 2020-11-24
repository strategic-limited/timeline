"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _lodash = _interopRequireDefault(require("lodash"));

var _timeline = _interopRequireDefault(require("./timeline"));

var _scroll = _interopRequireDefault(require("./scroll"));

var _customRenderers = require("demo/customRenderers");

require("antd/dist/antd.css");

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var list = [{
  key: 1,
  title: 1 + " element",
  color: '#363651',
  row: 0,
  start: (0, _moment["default"])('2018-08-01 00:00:00:00'),
  end: (0, _moment["default"])('2018-08-01 00:00:05')
}, {
  key: 2,
  title: 2 + " element",
  color: '#363651',
  row: 1,
  start: (0, _moment["default"])('2018-08-01 00:00:00:00'),
  end: (0, _moment["default"])('2018-08-01 00:00:05')
}, {
  key: 3,
  title: 3 + " element",
  color: '#363651',
  row: 2,
  start: (0, _moment["default"])('2018-08-01 00:00:00:00'),
  end: (0, _moment["default"])('2018-08-01 00:00:05')
}, {
  key: 4,
  title: 4 + " element",
  color: '#363651',
  row: 3,
  start: (0, _moment["default"])('2018-08-01 00:00:00:00'),
  end: (0, _moment["default"])('2018-08-01 00:00:05')
}];
var groups = [{
  id: 0,
  title: 'Row' + 0
}, {
  id: 1,
  title: 'Row' + 1
}, {
  id: 2,
  title: 'Row' + 2
}, {
  id: 3,
  title: 'Row' + 3
}];

var DemoTimeline = function DemoTimeline() {
  var startDate = (0, _moment["default"])('2018-08-01 00:00:00'); // const endDate = moment('2018-08-01 00:00:30');

  var _useState = (0, _react.useState)((0, _moment["default"])('2018-08-01 00:00:30')),
      _useState2 = _slicedToArray(_useState, 2),
      endDate = _useState2[0],
      setEndDate = _useState2[1];

  var _useState3 = (0, _react.useState)(list),
      _useState4 = _slicedToArray(_useState3, 2),
      items = _useState4[0],
      setItems = _useState4[1];

  var _useState5 = (0, _react.useState)(1),
      _useState6 = _slicedToArray(_useState5, 2),
      zoom = _useState6[0],
      setZoom = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedItems = _useState8[0],
      setSelectedItems = _useState8[1];

  var _useState9 = (0, _react.useState)(startDate),
      _useState10 = _slicedToArray(_useState9, 2),
      startDateWithZoom = _useState10[0],
      setStartDateWithZoom = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      endDateWithZoom = _useState12[0],
      setEndDateWithZoom = _useState12[1];

  var _useState13 = (0, _react.useState)(false),
      _useState14 = _slicedToArray(_useState13, 2),
      isShowScroll = _useState14[0],
      setIsShowScroll = _useState14[1]; // update endDateWithZoom


  (0, _react.useEffect)(function () {
    var newEnd = (0, _moment["default"])(startDateWithZoom.diff(0) + endDate.diff(startDate) * zoom);

    if (!endDateWithZoom || endDateWithZoom.diff(0) !== newEnd.diff(0)) {
      if (endDate.diff(newEnd) <= 0) {
        setStartDateWithZoom((0, _moment["default"])(startDateWithZoom.diff(0) - newEnd.diff(endDate)));
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
  }, [endDate, zoom, startDateWithZoom]); // zoomIn

  var zoomIn = function zoomIn() {
    if (zoom > 0.1) {
      setZoom((zoom - 0.1).toFixed(1));
    }
  }; // zoomOut


  var zoomOut = function zoomOut() {
    var newValue = (+zoom + 0.1).toFixed(1);

    if (newValue <= 1) {
      setZoom(newValue);
    }
  }; // zoomReset


  var zoomReset = function zoomReset() {
    setZoom(1);
  };

  var handleItemClick = function handleItemClick(e, key) {
    var newSelection = selectedItems.slice(); // If the item is already selected, then unselected

    var idx = selectedItems.indexOf(key);

    if (idx > -1) {
      newSelection.splice(idx, 1);
    } else {
      newSelection.push(Number(key));
    }

    setSelectedItems(newSelection);
  };

  var handleRowClick = function handleRowClick() {
    setSelectedItems([]);
  };

  var handleInteraction = function handleInteraction(type, changes, elements) {
    var absorbChange = function absorbChange(itemList, selectedItems) {
      itemList.forEach(function (item) {
        var i = selectedItems.find(function (i) {
          return i.key == item.key;
        });

        if (i) {
          item = i;
        }
      });
    };

    switch (type) {
      case _timeline["default"].changeTypes.dragStart:
      case _timeline["default"].changeTypes.resizeStart:
        {
          return selectedItems;
        }

      case _timeline["default"].changeTypes.dragEnd:
      case _timeline["default"].changeTypes.resizeEnd:
        {
          var newItems = _lodash["default"].clone(items);

          absorbChange(newItems, elements); // ToDo исправить под нужды проекта

          setItems(newItems);
          break;
        }

      case _timeline["default"].changeTypes.itemsSelected:
        {
          setSelectedItems(_lodash["default"].map(changes, 'key'));
          break;
        }

      default:
        return changes;
    }
  };

  if (startDateWithZoom && endDateWithZoom) {
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: zoomIn
    }, "Zoom In"), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: zoomReset
    }, "Reset"), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: zoomOut
    }, "Zoom Out"), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_timeline["default"], {
      shallowUpdateCheck: true,
      items: items,
      groups: groups,
      startDate: startDateWithZoom,
      endDate: endDateWithZoom,
      originalStartDate: startDate,
      originalEndDate: endDate,
      selectedItems: selectedItems,
      onItemClick: handleItemClick,
      showCursorTime: true,
      itemHeight: 35,
      onInteraction: handleInteraction,
      onRowClick: handleRowClick,
      componentId: "timeline-block",
      updateEndDate: setEndDate // ToDo поменять функцию для изменения end видео ролика
      ,
      layersNumber: 4 // ToDo здесь должно быть количество слоев на timeline

    })), isShowScroll && /*#__PURE__*/_react["default"].createElement(_scroll["default"], {
      startDate: startDate,
      endDate: endDate,
      scrollBarStart: startDateWithZoom,
      scrollBarEnd: endDateWithZoom,
      setStartDateWithZoom: setStartDateWithZoom,
      setEndDateWithZoom: setEndDateWithZoom
    }));
  }

  return null;
};

DemoTimeline.propTypes = {
  items: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    key: _propTypes["default"].string.isRequired,
    title: _propTypes["default"].string,
    row: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]).isRequired,
    start: _propTypes["default"].shape().isRequired,
    end: _propTypes["default"].shape().isRequired,
    minDuration: _propTypes["default"].number,
    // in ms
    isResizable: _propTypes["default"].bool
  }))
};
var _default = DemoTimeline;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbImxpc3QiLCJrZXkiLCJ0aXRsZSIsImNvbG9yIiwicm93Iiwic3RhcnQiLCJlbmQiLCJncm91cHMiLCJpZCIsIkRlbW9UaW1lbGluZSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJzZXRFbmREYXRlIiwiaXRlbXMiLCJzZXRJdGVtcyIsInpvb20iLCJzZXRab29tIiwic2VsZWN0ZWRJdGVtcyIsInNldFNlbGVjdGVkSXRlbXMiLCJzdGFydERhdGVXaXRoWm9vbSIsInNldFN0YXJ0RGF0ZVdpdGhab29tIiwiZW5kRGF0ZVdpdGhab29tIiwic2V0RW5kRGF0ZVdpdGhab29tIiwiaXNTaG93U2Nyb2xsIiwic2V0SXNTaG93U2Nyb2xsIiwibmV3RW5kIiwiZGlmZiIsInpvb21JbiIsInRvRml4ZWQiLCJ6b29tT3V0IiwibmV3VmFsdWUiLCJ6b29tUmVzZXQiLCJoYW5kbGVJdGVtQ2xpY2siLCJlIiwibmV3U2VsZWN0aW9uIiwic2xpY2UiLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwicHVzaCIsIk51bWJlciIsImhhbmRsZVJvd0NsaWNrIiwiaGFuZGxlSW50ZXJhY3Rpb24iLCJ0eXBlIiwiY2hhbmdlcyIsImVsZW1lbnRzIiwiYWJzb3JiQ2hhbmdlIiwiaXRlbUxpc3QiLCJmb3JFYWNoIiwiaXRlbSIsImkiLCJmaW5kIiwiVGltZWxpbmUiLCJjaGFuZ2VUeXBlcyIsImRyYWdTdGFydCIsInJlc2l6ZVN0YXJ0IiwiZHJhZ0VuZCIsInJlc2l6ZUVuZCIsIm5ld0l0ZW1zIiwiXyIsImNsb25lIiwiaXRlbXNTZWxlY3RlZCIsIm1hcCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJzaGFwZSIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJtaW5EdXJhdGlvbiIsImlzUmVzaXphYmxlIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7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QUFVRSxLQUFWLENBQWdCO0FBQ3ZDakUsSUFBQUEsR0FBRyxFQUFFK0Qsc0JBQVVHLE1BQVYsQ0FBaUJDLFVBRGlCO0FBRXZDbEUsSUFBQUEsS0FBSyxFQUFFOEQsc0JBQVVHLE1BRnNCO0FBR3ZDL0QsSUFBQUEsR0FBRyxFQUFFNEQsc0JBQVVLLFNBQVYsQ0FBb0IsQ0FDdkJMLHNCQUFVRyxNQURhLEVBRXZCSCxzQkFBVU0sTUFGYSxDQUFwQixFQUdGRixVQU5vQztBQU92Qy9ELElBQUFBLEtBQUssRUFBRTJELHNCQUFVRSxLQUFWLEdBQWtCRSxVQVBjO0FBUXZDOUQsSUFBQUEsR0FBRyxFQUFFMEQsc0JBQVVFLEtBQVYsR0FBa0JFLFVBUmdCO0FBU3ZDRyxJQUFBQSxXQUFXLEVBQUVQLHNCQUFVTSxNQVRnQjtBQVNSO0FBQy9CRSxJQUFBQSxXQUFXLEVBQUVSLHNCQUFVUztBQVZnQixHQUFoQixDQUFsQjtBQURnQixDQUF6QjtlQWVlaEUsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0ZyYWdtZW50LCB1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCBUaW1lbGluZSBmcm9tICcuL3RpbWVsaW5lJztcclxuaW1wb3J0IFNjcm9sbCBmcm9tICcuL3Njcm9sbCc7XHJcbmltcG9ydCB7Y3VzdG9tSXRlbVJlbmRlcmVyLCBjdXN0b21Hcm91cFJlbmRlcmVyfSBmcm9tICdkZW1vL2N1c3RvbVJlbmRlcmVycyc7XHJcblxyXG5pbXBvcnQgJ2FudGQvZGlzdC9hbnRkLmNzcyc7XHJcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xyXG5cclxuY29uc3QgbGlzdCA9IFtcclxuICB7XHJcbiAgICBrZXk6IDEsXHJcbiAgICB0aXRsZTogMSArIFwiIGVsZW1lbnRcIixcclxuICAgIGNvbG9yOiAnIzM2MzY1MScsXHJcbiAgICByb3c6IDAsXHJcbiAgICBzdGFydDogbW9tZW50KCcyMDE4LTA4LTAxIDAwOjAwOjAwOjAwJyksXHJcbiAgICBlbmQ6IG1vbWVudCgnMjAxOC0wOC0wMSAwMDowMDowNScpLFxyXG4gIH0sXHJcbiAge1xyXG4gICAga2V5OiAyLFxyXG4gICAgdGl0bGU6IDIgKyBcIiBlbGVtZW50XCIsXHJcbiAgICBjb2xvcjogJyMzNjM2NTEnLFxyXG4gICAgcm93OiAxLFxyXG4gICAgc3RhcnQ6IG1vbWVudCgnMjAxOC0wOC0wMSAwMDowMDowMDowMCcpLFxyXG4gICAgZW5kOiBtb21lbnQoJzIwMTgtMDgtMDEgMDA6MDA6MDUnKSxcclxuICB9LFxyXG4gIHtcclxuICAgIGtleTogMyxcclxuICAgIHRpdGxlOiAzICsgXCIgZWxlbWVudFwiLFxyXG4gICAgY29sb3I6ICcjMzYzNjUxJyxcclxuICAgIHJvdzogMixcclxuICAgIHN0YXJ0OiBtb21lbnQoJzIwMTgtMDgtMDEgMDA6MDA6MDA6MDAnKSxcclxuICAgIGVuZDogbW9tZW50KCcyMDE4LTA4LTAxIDAwOjAwOjA1JyksXHJcbiAgfSxcclxuICB7XHJcbiAgICBrZXk6IDQsXHJcbiAgICB0aXRsZTogNCArIFwiIGVsZW1lbnRcIixcclxuICAgIGNvbG9yOiAnIzM2MzY1MScsXHJcbiAgICByb3c6IDMsXHJcbiAgICBzdGFydDogbW9tZW50KCcyMDE4LTA4LTAxIDAwOjAwOjAwOjAwJyksXHJcbiAgICBlbmQ6IG1vbWVudCgnMjAxOC0wOC0wMSAwMDowMDowNScpLFxyXG4gIH0sXHJcbl07XHJcblxyXG5jb25zdCBncm91cHMgPSBbXHJcbiAge1xyXG4gICAgaWQ6IDAsXHJcbiAgICB0aXRsZTogJ1JvdycgKyAwLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IDEsXHJcbiAgICB0aXRsZTogJ1JvdycgKyAxLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IDIsXHJcbiAgICB0aXRsZTogJ1JvdycgKyAyLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6IDMsXHJcbiAgICB0aXRsZTogJ1JvdycgKyAzLFxyXG4gIH0sXHJcbl07XHJcblxyXG5jb25zdCBEZW1vVGltZWxpbmUgPSAoKSA9PiB7XHJcbiAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KCcyMDE4LTA4LTAxIDAwOjAwOjAwJyk7XHJcbiAgLy8gY29uc3QgZW5kRGF0ZSA9IG1vbWVudCgnMjAxOC0wOC0wMSAwMDowMDozMCcpO1xyXG5cclxuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZShtb21lbnQoJzIwMTgtMDgtMDEgMDA6MDA6MzAnKSk7XHJcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZShsaXN0KTtcclxuICBjb25zdCBbem9vbSwgc2V0Wm9vbV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbc2VsZWN0ZWRJdGVtcywgc2V0U2VsZWN0ZWRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW3N0YXJ0RGF0ZVdpdGhab29tLCBzZXRTdGFydERhdGVXaXRoWm9vbV0gPSB1c2VTdGF0ZShzdGFydERhdGUpO1xyXG4gIGNvbnN0IFtlbmREYXRlV2l0aFpvb20sIHNldEVuZERhdGVXaXRoWm9vbV0gPSB1c2VTdGF0ZShudWxsKTtcclxuXHJcbiAgY29uc3QgW2lzU2hvd1Njcm9sbCwgc2V0SXNTaG93U2Nyb2xsXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgLy8gdXBkYXRlIGVuZERhdGVXaXRoWm9vbVxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsZXQgbmV3RW5kID0gbW9tZW50KHN0YXJ0RGF0ZVdpdGhab29tLmRpZmYoMCkgKyAoZW5kRGF0ZS5kaWZmKHN0YXJ0RGF0ZSkgKiB6b29tKSk7XHJcbiAgICBpZiAoIWVuZERhdGVXaXRoWm9vbSB8fCAoZW5kRGF0ZVdpdGhab29tLmRpZmYoMCkgIT09IG5ld0VuZC5kaWZmKDApKSkge1xyXG4gICAgICBpZiAoZW5kRGF0ZS5kaWZmKG5ld0VuZCkgPD0gMCkge1xyXG4gICAgICAgIHNldFN0YXJ0RGF0ZVdpdGhab29tKG1vbWVudChzdGFydERhdGVXaXRoWm9vbS5kaWZmKDApIC0gbmV3RW5kLmRpZmYoZW5kRGF0ZSkpKTtcclxuICAgICAgICBzZXRFbmREYXRlV2l0aFpvb20oZW5kRGF0ZSk7XHJcbiAgICAgIH1cclxuICAgICAgc2V0RW5kRGF0ZVdpdGhab29tKG5ld0VuZCk7XHJcbiAgICAgIGlmICgrem9vbSAhPT0gMSkge1xyXG4gICAgICAgIHNldElzU2hvd1Njcm9sbCh0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRTdGFydERhdGVXaXRoWm9vbShzdGFydERhdGUpO1xyXG4gICAgICAgIHNldEVuZERhdGVXaXRoWm9vbShlbmREYXRlKTtcclxuICAgICAgICBzZXRJc1Nob3dTY3JvbGwoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW2VuZERhdGUsIHpvb20sIHN0YXJ0RGF0ZVdpdGhab29tXSk7XHJcblxyXG4gIC8vIHpvb21JblxyXG4gIGNvbnN0IHpvb21JbiA9ICgpID0+IHtcclxuICAgIGlmICh6b29tID4gMC4xKSB7XHJcbiAgICAgIHNldFpvb20oKHpvb20gLSAwLjEpLnRvRml4ZWQoMSkpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIHpvb21PdXRcclxuICBjb25zdCB6b29tT3V0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSAoK3pvb20gKyAwLjEpLnRvRml4ZWQoMSk7XHJcbiAgICBpZiAobmV3VmFsdWUgPD0gMSkge1xyXG4gICAgICBzZXRab29tKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyB6b29tUmVzZXRcclxuICBjb25zdCB6b29tUmVzZXQgPSAoKSA9PiB7XHJcbiAgICBzZXRab29tKDEpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUl0ZW1DbGljayA9IChlLCBrZXkpID0+IHtcclxuICAgIGxldCBuZXdTZWxlY3Rpb24gPSBzZWxlY3RlZEl0ZW1zLnNsaWNlKCk7XHJcbiAgICAvLyBJZiB0aGUgaXRlbSBpcyBhbHJlYWR5IHNlbGVjdGVkLCB0aGVuIHVuc2VsZWN0ZWRcclxuICAgIGNvbnN0IGlkeCA9IHNlbGVjdGVkSXRlbXMuaW5kZXhPZihrZXkpO1xyXG4gICAgaWYgKGlkeCA+IC0xKSB7XHJcbiAgICAgIG5ld1NlbGVjdGlvbi5zcGxpY2UoaWR4LCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ld1NlbGVjdGlvbi5wdXNoKE51bWJlcihrZXkpKTtcclxuICAgIH1cclxuICAgIHNldFNlbGVjdGVkSXRlbXMobmV3U2VsZWN0aW9uKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVSb3dDbGljayA9ICgpID0+IHtcclxuICAgIHNldFNlbGVjdGVkSXRlbXMoW10pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUludGVyYWN0aW9uID0gKHR5cGUsIGNoYW5nZXMsIGVsZW1lbnRzKSA9PiB7XHJcbiAgICBjb25zdCBhYnNvcmJDaGFuZ2UgPSAoaXRlbUxpc3QsIHNlbGVjdGVkSXRlbXMpID0+IHtcclxuICAgICAgaXRlbUxpc3QuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBsZXQgaSA9IHNlbGVjdGVkSXRlbXMuZmluZChpID0+IHtcclxuICAgICAgICAgIHJldHVybiBpLmtleSA9PSBpdGVtLmtleTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaSkge1xyXG4gICAgICAgICAgaXRlbSA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgVGltZWxpbmUuY2hhbmdlVHlwZXMuZHJhZ1N0YXJ0OlxyXG4gICAgICBjYXNlIFRpbWVsaW5lLmNoYW5nZVR5cGVzLnJlc2l6ZVN0YXJ0OiB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkSXRlbXM7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBUaW1lbGluZS5jaGFuZ2VUeXBlcy5kcmFnRW5kOlxyXG4gICAgICBjYXNlIFRpbWVsaW5lLmNoYW5nZVR5cGVzLnJlc2l6ZUVuZDoge1xyXG4gICAgICAgIGNvbnN0IG5ld0l0ZW1zID0gXy5jbG9uZShpdGVtcyk7XHJcblxyXG4gICAgICAgIGFic29yYkNoYW5nZShuZXdJdGVtcywgZWxlbWVudHMpO1xyXG4gICAgICAgIC8vIFRvRG8g0LjRgdC/0YDQsNCy0LjRgtGMINC/0L7QtCDQvdGD0LbQtNGLINC/0YDQvtC10LrRgtCwXHJcbiAgICAgICAgc2V0SXRlbXMobmV3SXRlbXMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgVGltZWxpbmUuY2hhbmdlVHlwZXMuaXRlbXNTZWxlY3RlZDoge1xyXG4gICAgICAgIHNldFNlbGVjdGVkSXRlbXMoXy5tYXAoY2hhbmdlcywgJ2tleScpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBjaGFuZ2VzO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGlmIChzdGFydERhdGVXaXRoWm9vbSAmJiBlbmREYXRlV2l0aFpvb20pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxGcmFnbWVudD5cclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3pvb21Jbn0+Wm9vbSBJbjwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gb25DbGljaz17em9vbVJlc2V0fT5SZXNldDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gb25DbGljaz17em9vbU91dH0+Wm9vbSBPdXQ8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPFRpbWVsaW5lXHJcbiAgICAgICAgICAgIHNoYWxsb3dVcGRhdGVDaGVja1xyXG4gICAgICAgICAgICBpdGVtcz17aXRlbXN9XHJcbiAgICAgICAgICAgIGdyb3Vwcz17Z3JvdXBzfVxyXG4gICAgICAgICAgICBzdGFydERhdGU9e3N0YXJ0RGF0ZVdpdGhab29tfVxyXG4gICAgICAgICAgICBlbmREYXRlPXtlbmREYXRlV2l0aFpvb219XHJcbiAgICAgICAgICAgIG9yaWdpbmFsU3RhcnREYXRlPXtzdGFydERhdGV9XHJcbiAgICAgICAgICAgIG9yaWdpbmFsRW5kRGF0ZT17ZW5kRGF0ZX1cclxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcz17c2VsZWN0ZWRJdGVtc31cclxuICAgICAgICAgICAgb25JdGVtQ2xpY2s9e2hhbmRsZUl0ZW1DbGlja31cclxuICAgICAgICAgICAgc2hvd0N1cnNvclRpbWVcclxuICAgICAgICAgICAgaXRlbUhlaWdodD17MzV9XHJcbiAgICAgICAgICAgIG9uSW50ZXJhY3Rpb249e2hhbmRsZUludGVyYWN0aW9ufVxyXG4gICAgICAgICAgICBvblJvd0NsaWNrPXtoYW5kbGVSb3dDbGlja31cclxuICAgICAgICAgICAgY29tcG9uZW50SWQ9XCJ0aW1lbGluZS1ibG9ja1wiXHJcbiAgICAgICAgICAgIHVwZGF0ZUVuZERhdGU9e3NldEVuZERhdGV9IC8vIFRvRG8g0L/QvtC80LXQvdGP0YLRjCDRhNGD0L3QutGG0LjRjiDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPIGVuZCDQstC40LTQtdC+INGA0L7Qu9C40LrQsFxyXG4gICAgICAgICAgICBsYXllcnNOdW1iZXI9ezR9IC8vIFRvRG8g0LfQtNC10YHRjCDQtNC+0LvQttC90L4g0LHRi9GC0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4g0YHQu9C+0LXQsiDQvdCwIHRpbWVsaW5lXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtpc1Nob3dTY3JvbGwgJiYgKFxyXG4gICAgICAgICAgPFNjcm9sbFxyXG4gICAgICAgICAgICBzdGFydERhdGU9e3N0YXJ0RGF0ZX1cclxuICAgICAgICAgICAgZW5kRGF0ZT17ZW5kRGF0ZX1cclxuICAgICAgICAgICAgc2Nyb2xsQmFyU3RhcnQ9e3N0YXJ0RGF0ZVdpdGhab29tfVxyXG4gICAgICAgICAgICBzY3JvbGxCYXJFbmQ9e2VuZERhdGVXaXRoWm9vbX1cclxuICAgICAgICAgICAgc2V0U3RhcnREYXRlV2l0aFpvb209e3NldFN0YXJ0RGF0ZVdpdGhab29tfVxyXG4gICAgICAgICAgICBzZXRFbmREYXRlV2l0aFpvb209e3NldEVuZERhdGVXaXRoWm9vbX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9GcmFnbWVudD5cclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuRGVtb1RpbWVsaW5lLnByb3BUeXBlcyA9IHtcclxuICBpdGVtczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgIGtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICByb3c6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgXSkuaXNSZXF1aXJlZCxcclxuICAgIHN0YXJ0OiBQcm9wVHlwZXMuc2hhcGUoKS5pc1JlcXVpcmVkLFxyXG4gICAgZW5kOiBQcm9wVHlwZXMuc2hhcGUoKS5pc1JlcXVpcmVkLFxyXG4gICAgbWluRHVyYXRpb246IFByb3BUeXBlcy5udW1iZXIsIC8vIGluIG1zXHJcbiAgICBpc1Jlc2l6YWJsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgfSkpLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGVtb1RpbWVsaW5lO1xyXG4iXX0=