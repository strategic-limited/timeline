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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbImxpc3QiLCJrZXkiLCJ0aXRsZSIsImNvbG9yIiwicm93Iiwic3RhcnQiLCJlbmQiLCJncm91cHMiLCJpZCIsIkRlbW9UaW1lbGluZSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJzZXRFbmREYXRlIiwiaXRlbXMiLCJzZXRJdGVtcyIsInpvb20iLCJzZXRab29tIiwic2VsZWN0ZWRJdGVtcyIsInNldFNlbGVjdGVkSXRlbXMiLCJzdGFydERhdGVXaXRoWm9vbSIsInNldFN0YXJ0RGF0ZVdpdGhab29tIiwiZW5kRGF0ZVdpdGhab29tIiwic2V0RW5kRGF0ZVdpdGhab29tIiwiaXNTaG93U2Nyb2xsIiwic2V0SXNTaG93U2Nyb2xsIiwibmV3RW5kIiwiZGlmZiIsInpvb21JbiIsInRvRml4ZWQiLCJ6b29tT3V0IiwibmV3VmFsdWUiLCJ6b29tUmVzZXQiLCJoYW5kbGVJdGVtQ2xpY2siLCJlIiwibmV3U2VsZWN0aW9uIiwic2xpY2UiLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwicHVzaCIsIk51bWJlciIsImhhbmRsZVJvd0NsaWNrIiwiaGFuZGxlSW50ZXJhY3Rpb24iLCJ0eXBlIiwiY2hhbmdlcyIsImVsZW1lbnRzIiwiYWJzb3JiQ2hhbmdlIiwiaXRlbUxpc3QiLCJmb3JFYWNoIiwiaXRlbSIsImkiLCJmaW5kIiwiVGltZWxpbmUiLCJjaGFuZ2VUeXBlcyIsImRyYWdTdGFydCIsInJlc2l6ZVN0YXJ0IiwiZHJhZ0VuZCIsInJlc2l6ZUVuZCIsIm5ld0l0ZW1zIiwiXyIsImNsb25lIiwiaXRlbXNTZWxlY3RlZCIsIm1hcCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJzaGFwZSIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJtaW5EdXJhdGlvbiIsImlzUmVzaXphYmxlIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7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QUFVRSxLQUFWLENBQWdCO0FBQ3ZDakUsSUFBQUEsR0FBRyxFQUFFK0Qsc0JBQVVHLE1BQVYsQ0FBaUJDLFVBRGlCO0FBRXZDbEUsSUFBQUEsS0FBSyxFQUFFOEQsc0JBQVVHLE1BRnNCO0FBR3ZDL0QsSUFBQUEsR0FBRyxFQUFFNEQsc0JBQVVLLFNBQVYsQ0FBb0IsQ0FDdkJMLHNCQUFVRyxNQURhLEVBRXZCSCxzQkFBVU0sTUFGYSxDQUFwQixFQUdGRixVQU5vQztBQU92Qy9ELElBQUFBLEtBQUssRUFBRTJELHNCQUFVRSxLQUFWLEdBQWtCRSxVQVBjO0FBUXZDOUQsSUFBQUEsR0FBRyxFQUFFMEQsc0JBQVVFLEtBQVYsR0FBa0JFLFVBUmdCO0FBU3ZDRyxJQUFBQSxXQUFXLEVBQUVQLHNCQUFVTSxNQVRnQjtBQVNSO0FBQy9CRSxJQUFBQSxXQUFXLEVBQUVSLHNCQUFVUztBQVZnQixHQUFoQixDQUFsQjtBQURnQixDQUF6QjtlQWVlaEUsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0ZyYWdtZW50LCB1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IFRpbWVsaW5lIGZyb20gJy4vdGltZWxpbmUnO1xuaW1wb3J0IFNjcm9sbCBmcm9tICcuL3Njcm9sbCc7XG5pbXBvcnQge2N1c3RvbUl0ZW1SZW5kZXJlciwgY3VzdG9tR3JvdXBSZW5kZXJlcn0gZnJvbSAnZGVtby9jdXN0b21SZW5kZXJlcnMnO1xuXG5pbXBvcnQgJ2FudGQvZGlzdC9hbnRkLmNzcyc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuY29uc3QgbGlzdCA9IFtcbiAge1xuICAgIGtleTogMSxcbiAgICB0aXRsZTogMSArIFwiIGVsZW1lbnRcIixcbiAgICBjb2xvcjogJyMzNjM2NTEnLFxuICAgIHJvdzogMCxcbiAgICBzdGFydDogbW9tZW50KCcyMDE4LTA4LTAxIDAwOjAwOjAwOjAwJyksXG4gICAgZW5kOiBtb21lbnQoJzIwMTgtMDgtMDEgMDA6MDA6MDUnKSxcbiAgfSxcbiAge1xuICAgIGtleTogMixcbiAgICB0aXRsZTogMiArIFwiIGVsZW1lbnRcIixcbiAgICBjb2xvcjogJyMzNjM2NTEnLFxuICAgIHJvdzogMSxcbiAgICBzdGFydDogbW9tZW50KCcyMDE4LTA4LTAxIDAwOjAwOjAwOjAwJyksXG4gICAgZW5kOiBtb21lbnQoJzIwMTgtMDgtMDEgMDA6MDA6MDUnKSxcbiAgfSxcbiAge1xuICAgIGtleTogMyxcbiAgICB0aXRsZTogMyArIFwiIGVsZW1lbnRcIixcbiAgICBjb2xvcjogJyMzNjM2NTEnLFxuICAgIHJvdzogMixcbiAgICBzdGFydDogbW9tZW50KCcyMDE4LTA4LTAxIDAwOjAwOjAwOjAwJyksXG4gICAgZW5kOiBtb21lbnQoJzIwMTgtMDgtMDEgMDA6MDA6MDUnKSxcbiAgfSxcbiAge1xuICAgIGtleTogNCxcbiAgICB0aXRsZTogNCArIFwiIGVsZW1lbnRcIixcbiAgICBjb2xvcjogJyMzNjM2NTEnLFxuICAgIHJvdzogMyxcbiAgICBzdGFydDogbW9tZW50KCcyMDE4LTA4LTAxIDAwOjAwOjAwOjAwJyksXG4gICAgZW5kOiBtb21lbnQoJzIwMTgtMDgtMDEgMDA6MDA6MDUnKSxcbiAgfSxcbl07XG5cbmNvbnN0IGdyb3VwcyA9IFtcbiAge1xuICAgIGlkOiAwLFxuICAgIHRpdGxlOiAnUm93JyArIDAsXG4gIH0sXG4gIHtcbiAgICBpZDogMSxcbiAgICB0aXRsZTogJ1JvdycgKyAxLFxuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgdGl0bGU6ICdSb3cnICsgMixcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIHRpdGxlOiAnUm93JyArIDMsXG4gIH0sXG5dO1xuXG5jb25zdCBEZW1vVGltZWxpbmUgPSAoKSA9PiB7XG4gIGNvbnN0IHN0YXJ0RGF0ZSA9IG1vbWVudCgnMjAxOC0wOC0wMSAwMDowMDowMCcpO1xuICAvLyBjb25zdCBlbmREYXRlID0gbW9tZW50KCcyMDE4LTA4LTAxIDAwOjAwOjMwJyk7XG5cbiAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGUobW9tZW50KCcyMDE4LTA4LTAxIDAwOjAwOjMwJykpO1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlKGxpc3QpO1xuICBjb25zdCBbem9vbSwgc2V0Wm9vbV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW3NlbGVjdGVkSXRlbXMsIHNldFNlbGVjdGVkSXRlbXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc3RhcnREYXRlV2l0aFpvb20sIHNldFN0YXJ0RGF0ZVdpdGhab29tXSA9IHVzZVN0YXRlKHN0YXJ0RGF0ZSk7XG4gIGNvbnN0IFtlbmREYXRlV2l0aFpvb20sIHNldEVuZERhdGVXaXRoWm9vbV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICBjb25zdCBbaXNTaG93U2Nyb2xsLCBzZXRJc1Nob3dTY3JvbGxdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIHVwZGF0ZSBlbmREYXRlV2l0aFpvb21cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgbmV3RW5kID0gbW9tZW50KHN0YXJ0RGF0ZVdpdGhab29tLmRpZmYoMCkgKyAoZW5kRGF0ZS5kaWZmKHN0YXJ0RGF0ZSkgKiB6b29tKSk7XG4gICAgaWYgKCFlbmREYXRlV2l0aFpvb20gfHwgKGVuZERhdGVXaXRoWm9vbS5kaWZmKDApICE9PSBuZXdFbmQuZGlmZigwKSkpIHtcbiAgICAgIGlmIChlbmREYXRlLmRpZmYobmV3RW5kKSA8PSAwKSB7XG4gICAgICAgIHNldFN0YXJ0RGF0ZVdpdGhab29tKG1vbWVudChzdGFydERhdGVXaXRoWm9vbS5kaWZmKDApIC0gbmV3RW5kLmRpZmYoZW5kRGF0ZSkpKTtcbiAgICAgICAgc2V0RW5kRGF0ZVdpdGhab29tKGVuZERhdGUpO1xuICAgICAgfVxuICAgICAgc2V0RW5kRGF0ZVdpdGhab29tKG5ld0VuZCk7XG4gICAgICBpZiAoK3pvb20gIT09IDEpIHtcbiAgICAgICAgc2V0SXNTaG93U2Nyb2xsKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U3RhcnREYXRlV2l0aFpvb20oc3RhcnREYXRlKTtcbiAgICAgICAgc2V0RW5kRGF0ZVdpdGhab29tKGVuZERhdGUpO1xuICAgICAgICBzZXRJc1Nob3dTY3JvbGwoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW2VuZERhdGUsIHpvb20sIHN0YXJ0RGF0ZVdpdGhab29tXSk7XG5cbiAgLy8gem9vbUluXG4gIGNvbnN0IHpvb21JbiA9ICgpID0+IHtcbiAgICBpZiAoem9vbSA+IDAuMSkge1xuICAgICAgc2V0Wm9vbSgoem9vbSAtIDAuMSkudG9GaXhlZCgxKSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIHpvb21PdXRcbiAgY29uc3Qgem9vbU91dCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9ICgrem9vbSArIDAuMSkudG9GaXhlZCgxKTtcbiAgICBpZiAobmV3VmFsdWUgPD0gMSkge1xuICAgICAgc2V0Wm9vbShuZXdWYWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIHpvb21SZXNldFxuICBjb25zdCB6b29tUmVzZXQgPSAoKSA9PiB7XG4gICAgc2V0Wm9vbSgxKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVJdGVtQ2xpY2sgPSAoZSwga2V5KSA9PiB7XG4gICAgbGV0IG5ld1NlbGVjdGlvbiA9IHNlbGVjdGVkSXRlbXMuc2xpY2UoKTtcbiAgICAvLyBJZiB0aGUgaXRlbSBpcyBhbHJlYWR5IHNlbGVjdGVkLCB0aGVuIHVuc2VsZWN0ZWRcbiAgICBjb25zdCBpZHggPSBzZWxlY3RlZEl0ZW1zLmluZGV4T2Yoa2V5KTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIG5ld1NlbGVjdGlvbi5zcGxpY2UoaWR4LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U2VsZWN0aW9uLnB1c2goTnVtYmVyKGtleSkpO1xuICAgIH1cbiAgICBzZXRTZWxlY3RlZEl0ZW1zKG5ld1NlbGVjdGlvbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUm93Q2xpY2sgPSAoKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRJdGVtcyhbXSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlSW50ZXJhY3Rpb24gPSAodHlwZSwgY2hhbmdlcywgZWxlbWVudHMpID0+IHtcbiAgICBjb25zdCBhYnNvcmJDaGFuZ2UgPSAoaXRlbUxpc3QsIHNlbGVjdGVkSXRlbXMpID0+IHtcbiAgICAgIGl0ZW1MaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGxldCBpID0gc2VsZWN0ZWRJdGVtcy5maW5kKGkgPT4ge1xuICAgICAgICAgIHJldHVybiBpLmtleSA9PSBpdGVtLmtleTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgaXRlbSA9IGk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgVGltZWxpbmUuY2hhbmdlVHlwZXMuZHJhZ1N0YXJ0OlxuICAgICAgY2FzZSBUaW1lbGluZS5jaGFuZ2VUeXBlcy5yZXNpemVTdGFydDoge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtcztcbiAgICAgIH1cbiAgICAgIGNhc2UgVGltZWxpbmUuY2hhbmdlVHlwZXMuZHJhZ0VuZDpcbiAgICAgIGNhc2UgVGltZWxpbmUuY2hhbmdlVHlwZXMucmVzaXplRW5kOiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW1zID0gXy5jbG9uZShpdGVtcyk7XG5cbiAgICAgICAgYWJzb3JiQ2hhbmdlKG5ld0l0ZW1zLCBlbGVtZW50cyk7XG4gICAgICAgIC8vIFRvRG8g0LjRgdC/0YDQsNCy0LjRgtGMINC/0L7QtCDQvdGD0LbQtNGLINC/0YDQvtC10LrRgtCwXG4gICAgICAgIHNldEl0ZW1zKG5ld0l0ZW1zKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFRpbWVsaW5lLmNoYW5nZVR5cGVzLml0ZW1zU2VsZWN0ZWQ6IHtcbiAgICAgICAgc2V0U2VsZWN0ZWRJdGVtcyhfLm1hcChjaGFuZ2VzLCAna2V5JykpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgIH1cbiAgfTtcblxuICBpZiAoc3RhcnREYXRlV2l0aFpvb20gJiYgZW5kRGF0ZVdpdGhab29tKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt6b29tSW59Plpvb20gSW48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt6b29tUmVzZXR9PlJlc2V0PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gb25DbGljaz17em9vbU91dH0+Wm9vbSBPdXQ8L2J1dHRvbj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8VGltZWxpbmVcbiAgICAgICAgICAgIHNoYWxsb3dVcGRhdGVDaGVja1xuICAgICAgICAgICAgaXRlbXM9e2l0ZW1zfVxuICAgICAgICAgICAgZ3JvdXBzPXtncm91cHN9XG4gICAgICAgICAgICBzdGFydERhdGU9e3N0YXJ0RGF0ZVdpdGhab29tfVxuICAgICAgICAgICAgZW5kRGF0ZT17ZW5kRGF0ZVdpdGhab29tfVxuICAgICAgICAgICAgb3JpZ2luYWxTdGFydERhdGU9e3N0YXJ0RGF0ZX1cbiAgICAgICAgICAgIG9yaWdpbmFsRW5kRGF0ZT17ZW5kRGF0ZX1cbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e3NlbGVjdGVkSXRlbXN9XG4gICAgICAgICAgICBvbkl0ZW1DbGljaz17aGFuZGxlSXRlbUNsaWNrfVxuICAgICAgICAgICAgc2hvd0N1cnNvclRpbWVcbiAgICAgICAgICAgIGl0ZW1IZWlnaHQ9ezM1fVxuICAgICAgICAgICAgb25JbnRlcmFjdGlvbj17aGFuZGxlSW50ZXJhY3Rpb259XG4gICAgICAgICAgICBvblJvd0NsaWNrPXtoYW5kbGVSb3dDbGlja31cbiAgICAgICAgICAgIGNvbXBvbmVudElkPVwidGltZWxpbmUtYmxvY2tcIlxuICAgICAgICAgICAgdXBkYXRlRW5kRGF0ZT17c2V0RW5kRGF0ZX0gLy8gVG9EbyDQv9C+0LzQtdC90Y/RgtGMINGE0YPQvdC60YbQuNGOINC00LvRjyDQuNC30LzQtdC90LXQvdC40Y8gZW5kINCy0LjQtNC10L4g0YDQvtC70LjQutCwXG4gICAgICAgICAgICBsYXllcnNOdW1iZXI9ezR9IC8vIFRvRG8g0LfQtNC10YHRjCDQtNC+0LvQttC90L4g0LHRi9GC0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4g0YHQu9C+0LXQsiDQvdCwIHRpbWVsaW5lXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtpc1Nob3dTY3JvbGwgJiYgKFxuICAgICAgICAgIDxTY3JvbGxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZT17c3RhcnREYXRlfVxuICAgICAgICAgICAgZW5kRGF0ZT17ZW5kRGF0ZX1cbiAgICAgICAgICAgIHNjcm9sbEJhclN0YXJ0PXtzdGFydERhdGVXaXRoWm9vbX1cbiAgICAgICAgICAgIHNjcm9sbEJhckVuZD17ZW5kRGF0ZVdpdGhab29tfVxuICAgICAgICAgICAgc2V0U3RhcnREYXRlV2l0aFpvb209e3NldFN0YXJ0RGF0ZVdpdGhab29tfVxuICAgICAgICAgICAgc2V0RW5kRGF0ZVdpdGhab29tPXtzZXRFbmREYXRlV2l0aFpvb219XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbkRlbW9UaW1lbGluZS5wcm9wVHlwZXMgPSB7XG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGtleTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJvdzogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICBdKS5pc1JlcXVpcmVkLFxuICAgIHN0YXJ0OiBQcm9wVHlwZXMuc2hhcGUoKS5pc1JlcXVpcmVkLFxuICAgIGVuZDogUHJvcFR5cGVzLnNoYXBlKCkuaXNSZXF1aXJlZCxcbiAgICBtaW5EdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlciwgLy8gaW4gbXNcbiAgICBpc1Jlc2l6YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gIH0pKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERlbW9UaW1lbGluZTtcbiJdfQ==