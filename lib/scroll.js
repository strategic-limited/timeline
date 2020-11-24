"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _timeline = _interopRequireDefault(require("./timeline"));

var _scrollBar = _interopRequireDefault(require("./components/scrollBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var groups = [{
  id: 0
}];

var Scroll = function Scroll(_ref) {
  var startDate = _ref.startDate,
      endDate = _ref.endDate,
      scrollBarStart = _ref.scrollBarStart,
      scrollBarEnd = _ref.scrollBarEnd,
      setStartDateWithZoom = _ref.setStartDateWithZoom,
      setEndDateWithZoom = _ref.setEndDateWithZoom;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isStartDrag = _useState2[0],
      setIsStartDrag = _useState2[1];

  var _useState3 = (0, _react.useState)([{
    key: 1,
    color: '#363651',
    row: 0,
    start: startDate,
    end: endDate,
    isResizable: false
  }]),
      _useState4 = _slicedToArray(_useState3, 2),
      items = _useState4[0],
      setItems = _useState4[1];

  var _useState5 = (0, _react.useState)([1]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedItems = _useState6[0],
      setSelectedItems = _useState6[1];

  (0, _react.useEffect)(function () {
    if (!isStartDrag) {
      setItems([{
        key: 1,
        color: '#363651',
        row: 0,
        start: scrollBarStart,
        end: scrollBarEnd,
        isResizable: false
      }]);
    }
  }, [scrollBarStart, scrollBarEnd]);

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
          setIsStartDrag(true);
          return selectedItems;
        }

      case _timeline["default"].changeTypes.dragEnd:
      case _timeline["default"].changeTypes.resizeEnd:
        {
          var newItems = _lodash["default"].clone(items);

          absorbChange(newItems, elements);
          setItems(newItems);
          setIsStartDrag(false);
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

  return /*#__PURE__*/_react["default"].createElement(_scrollBar["default"], {
    shallowUpdateCheck: true,
    items: items,
    groups: groups,
    startDate: startDate,
    endDate: endDate,
    originalStartDate: startDate,
    originalEndDate: endDate,
    selectedItems: selectedItems,
    showCursorTime: true,
    onInteraction: handleInteraction,
    componentId: "timeline-scroll",
    setStartDateWithZoom: setStartDateWithZoom,
    setEndDateWithZoom: setEndDateWithZoom
  });
};

var _default = Scroll;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY3JvbGwuanMiXSwibmFtZXMiOlsiZ3JvdXBzIiwiaWQiLCJTY3JvbGwiLCJzdGFydERhdGUiLCJlbmREYXRlIiwic2Nyb2xsQmFyU3RhcnQiLCJzY3JvbGxCYXJFbmQiLCJzZXRTdGFydERhdGVXaXRoWm9vbSIsInNldEVuZERhdGVXaXRoWm9vbSIsImlzU3RhcnREcmFnIiwic2V0SXNTdGFydERyYWciLCJrZXkiLCJjb2xvciIsInJvdyIsInN0YXJ0IiwiZW5kIiwiaXNSZXNpemFibGUiLCJpdGVtcyIsInNldEl0ZW1zIiwic2VsZWN0ZWRJdGVtcyIsInNldFNlbGVjdGVkSXRlbXMiLCJoYW5kbGVJbnRlcmFjdGlvbiIsInR5cGUiLCJjaGFuZ2VzIiwiZWxlbWVudHMiLCJhYnNvcmJDaGFuZ2UiLCJpdGVtTGlzdCIsImZvckVhY2giLCJpdGVtIiwiaSIsImZpbmQiLCJUaW1lbGluZSIsImNoYW5nZVR5cGVzIiwiZHJhZ1N0YXJ0IiwicmVzaXplU3RhcnQiLCJkcmFnRW5kIiwicmVzaXplRW5kIiwibmV3SXRlbXMiLCJfIiwiY2xvbmUiLCJpdGVtc1NlbGVjdGVkIiwibWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsQ0FBQztBQUFDQyxFQUFBQSxFQUFFLEVBQUU7QUFBTCxDQUFELENBQWY7O0FBRUEsSUFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsT0FBa0c7QUFBQSxNQUFoR0MsU0FBZ0csUUFBaEdBLFNBQWdHO0FBQUEsTUFBckZDLE9BQXFGLFFBQXJGQSxPQUFxRjtBQUFBLE1BQTVFQyxjQUE0RSxRQUE1RUEsY0FBNEU7QUFBQSxNQUE1REMsWUFBNEQsUUFBNURBLFlBQTREO0FBQUEsTUFBOUNDLG9CQUE4QyxRQUE5Q0Esb0JBQThDO0FBQUEsTUFBeEJDLGtCQUF3QixRQUF4QkEsa0JBQXdCOztBQUFBLGtCQUN6RSxxQkFB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QyxPQUxYO0FBTUUsSUFBQSxpQkFBaUIsRUFBRUQsU0FOckI7QUFPRSxJQUFBLGVBQWUsRUFBRUMsT0FQbkI7QUFRRSxJQUFBLGFBQWEsRUFBRWUsYUFSakI7QUFTRSxJQUFBLGNBQWMsTUFUaEI7QUFVRSxJQUFBLGFBQWEsRUFBRUUsaUJBVmpCO0FBV0UsSUFBQSxXQUFXLEVBQUMsaUJBWGQ7QUFZRSxJQUFBLG9CQUFvQixFQUFFZCxvQkFaeEI7QUFhRSxJQUFBLGtCQUFrQixFQUFFQztBQWJ0QixJQURGO0FBaUJELENBbEZEOztlQW9GZU4sTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZUVmZmVjdCwgdXNlU3RhdGV9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCBUaW1lbGluZSBmcm9tICcuL3RpbWVsaW5lJztcbmltcG9ydCBTY3JvbGxCYXIgZnJvbSAnLi9jb21wb25lbnRzL3Njcm9sbEJhcic7XG5cbmNvbnN0IGdyb3VwcyA9IFt7aWQ6IDB9XTtcblxuY29uc3QgU2Nyb2xsID0gKHtzdGFydERhdGUsIGVuZERhdGUsIHNjcm9sbEJhclN0YXJ0LCBzY3JvbGxCYXJFbmQsIHNldFN0YXJ0RGF0ZVdpdGhab29tLCBzZXRFbmREYXRlV2l0aFpvb219KSA9PiB7XG4gIGNvbnN0IFtpc1N0YXJ0RHJhZywgc2V0SXNTdGFydERyYWddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXRlbXMsIHNldEl0ZW1zXSA9IHVzZVN0YXRlKFtcbiAgICB7XG4gICAgICBrZXk6IDEsXG4gICAgICBjb2xvcjogJyMzNjM2NTEnLFxuICAgICAgcm93OiAwLFxuICAgICAgc3RhcnQ6IHN0YXJ0RGF0ZSxcbiAgICAgIGVuZDogZW5kRGF0ZSxcbiAgICAgIGlzUmVzaXphYmxlOiBmYWxzZVxuICAgIH1cbiAgXSk7XG4gIGNvbnN0IFtzZWxlY3RlZEl0ZW1zLCBzZXRTZWxlY3RlZEl0ZW1zXSA9IHVzZVN0YXRlKFsxXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzU3RhcnREcmFnKSB7XG4gICAgICBzZXRJdGVtcyhbXG4gICAgICAgIHtcbiAgICAgICAgICBrZXk6IDEsXG4gICAgICAgICAgY29sb3I6ICcjMzYzNjUxJyxcbiAgICAgICAgICByb3c6IDAsXG4gICAgICAgICAgc3RhcnQ6IHNjcm9sbEJhclN0YXJ0LFxuICAgICAgICAgIGVuZDogc2Nyb2xsQmFyRW5kLFxuICAgICAgICAgIGlzUmVzaXphYmxlOiBmYWxzZVxuICAgICAgICB9XG4gICAgICBdKTtcbiAgICB9XG4gIH0sIFtzY3JvbGxCYXJTdGFydCwgc2Nyb2xsQmFyRW5kXSk7XG5cbiAgY29uc3QgaGFuZGxlSW50ZXJhY3Rpb24gPSAodHlwZSwgY2hhbmdlcywgZWxlbWVudHMpID0+IHtcbiAgICBjb25zdCBhYnNvcmJDaGFuZ2UgPSAoaXRlbUxpc3QsIHNlbGVjdGVkSXRlbXMpID0+IHtcbiAgICAgIGl0ZW1MaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGxldCBpID0gc2VsZWN0ZWRJdGVtcy5maW5kKGkgPT4ge1xuICAgICAgICAgIHJldHVybiBpLmtleSA9PSBpdGVtLmtleTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgaXRlbSA9IGk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgVGltZWxpbmUuY2hhbmdlVHlwZXMuZHJhZ1N0YXJ0OlxuICAgICAgY2FzZSBUaW1lbGluZS5jaGFuZ2VUeXBlcy5yZXNpemVTdGFydDoge1xuICAgICAgICBzZXRJc1N0YXJ0RHJhZyh0cnVlKTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkSXRlbXM7XG4gICAgICB9XG4gICAgICBjYXNlIFRpbWVsaW5lLmNoYW5nZVR5cGVzLmRyYWdFbmQ6XG4gICAgICBjYXNlIFRpbWVsaW5lLmNoYW5nZVR5cGVzLnJlc2l6ZUVuZDoge1xuICAgICAgICBjb25zdCBuZXdJdGVtcyA9IF8uY2xvbmUoaXRlbXMpO1xuXG4gICAgICAgIGFic29yYkNoYW5nZShuZXdJdGVtcywgZWxlbWVudHMpO1xuICAgICAgICBzZXRJdGVtcyhuZXdJdGVtcyk7XG4gICAgICAgIHNldElzU3RhcnREcmFnKGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIFRpbWVsaW5lLmNoYW5nZVR5cGVzLml0ZW1zU2VsZWN0ZWQ6IHtcbiAgICAgICAgc2V0U2VsZWN0ZWRJdGVtcyhfLm1hcChjaGFuZ2VzLCAna2V5JykpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxTY3JvbGxCYXJcbiAgICAgIHNoYWxsb3dVcGRhdGVDaGVja1xuICAgICAgaXRlbXM9e2l0ZW1zfVxuICAgICAgZ3JvdXBzPXtncm91cHN9XG4gICAgICBzdGFydERhdGU9e3N0YXJ0RGF0ZX1cbiAgICAgIGVuZERhdGU9e2VuZERhdGV9XG4gICAgICBvcmlnaW5hbFN0YXJ0RGF0ZT17c3RhcnREYXRlfVxuICAgICAgb3JpZ2luYWxFbmREYXRlPXtlbmREYXRlfVxuICAgICAgc2VsZWN0ZWRJdGVtcz17c2VsZWN0ZWRJdGVtc31cbiAgICAgIHNob3dDdXJzb3JUaW1lXG4gICAgICBvbkludGVyYWN0aW9uPXtoYW5kbGVJbnRlcmFjdGlvbn1cbiAgICAgIGNvbXBvbmVudElkPVwidGltZWxpbmUtc2Nyb2xsXCJcbiAgICAgIHNldFN0YXJ0RGF0ZVdpdGhab29tPXtzZXRTdGFydERhdGVXaXRoWm9vbX1cbiAgICAgIHNldEVuZERhdGVXaXRoWm9vbT17c2V0RW5kRGF0ZVdpdGhab29tfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGw7XG4iXX0=