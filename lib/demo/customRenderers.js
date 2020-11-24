"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customItemRenderer = customItemRenderer;
exports.customGroupRenderer = customGroupRenderer;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function customItemRenderer(props) {
  var item = props.item,
      rest = _objectWithoutProperties(props, ["item"]);

  var text = "".concat(item.start.format('HH:mm'), " - ").concat(item.end.format('HH:mm'));
  return /*#__PURE__*/_react["default"].createElement("span", rest, " ", text, " ");
}

function customGroupRenderer(props) {
  var group = props.group,
      rest = _objectWithoutProperties(props, ["group"]);

  return /*#__PURE__*/_react["default"].createElement("span", _extends({
    "data-group-index": group.id
  }, rest), "Custom ", group.title);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZW1vL2N1c3RvbVJlbmRlcmVycy5qcyJdLCJuYW1lcyI6WyJjdXN0b21JdGVtUmVuZGVyZXIiLCJwcm9wcyIsIml0ZW0iLCJyZXN0IiwidGV4dCIsInN0YXJ0IiwiZm9ybWF0IiwiZW5kIiwiY3VzdG9tR3JvdXBSZW5kZXJlciIsImdyb3VwIiwiaWQiLCJ0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFTyxTQUFTQSxrQkFBVCxDQUE0QkMsS0FBNUIsRUFBbUM7QUFBQSxNQUNqQ0MsSUFEaUMsR0FDaEJELEtBRGdCLENBQ2pDQyxJQURpQztBQUFBLE1BQ3hCQyxJQUR3Qiw0QkFDaEJGLEtBRGdCOztBQUV4QyxNQUFNRyxJQUFJLGFBQU1GLElBQUksQ0FBQ0csS0FBTCxDQUFXQyxNQUFYLENBQWtCLE9BQWxCLENBQU4sZ0JBQXNDSixJQUFJLENBQUNLLEdBQUwsQ0FBU0QsTUFBVCxDQUFnQixPQUFoQixDQUF0QyxDQUFWO0FBQ0Esc0JBQU8sd0NBQVVILElBQVYsT0FBa0JDLElBQWxCLE1BQVA7QUFDRDs7QUFFTSxTQUFTSSxtQkFBVCxDQUE2QlAsS0FBN0IsRUFBb0M7QUFBQSxNQUNsQ1EsS0FEa0MsR0FDaEJSLEtBRGdCLENBQ2xDUSxLQURrQztBQUFBLE1BQ3hCTixJQUR3Qiw0QkFDaEJGLEtBRGdCOztBQUd6QyxzQkFDRTtBQUFNLHdCQUFrQlEsS0FBSyxDQUFDQztBQUE5QixLQUFzQ1AsSUFBdEMsY0FDVU0sS0FBSyxDQUFDRSxLQURoQixDQURGO0FBS0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21JdGVtUmVuZGVyZXIocHJvcHMpIHtcclxuICBjb25zdCB7aXRlbSwgLi4ucmVzdH0gPSBwcm9wcztcclxuICBjb25zdCB0ZXh0ID0gYCR7aXRlbS5zdGFydC5mb3JtYXQoJ0hIOm1tJyl9IC0gJHtpdGVtLmVuZC5mb3JtYXQoJ0hIOm1tJyl9YDtcclxuICByZXR1cm4gPHNwYW4gey4uLnJlc3R9PiB7dGV4dH0gPC9zcGFuPjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGN1c3RvbUdyb3VwUmVuZGVyZXIocHJvcHMpIHtcclxuICBjb25zdCB7Z3JvdXAsIC4uLnJlc3R9ID0gcHJvcHM7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c3BhbiBkYXRhLWdyb3VwLWluZGV4PXtncm91cC5pZH0gey4uLnJlc3R9PlxyXG4gICAgICBDdXN0b20ge2dyb3VwLnRpdGxlfVxyXG4gICAgPC9zcGFuPlxyXG4gICk7XHJcbn1cclxuIl19