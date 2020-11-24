"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultGroupRenderer = exports.DefaultItemRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Default item renderer class
 * @param {object} props - Component props
 * @param {object} props.item - The item to be rendered
 * @param {string} props.item.title - The item's title
 * @param {?...object} props.rest - Any other arguments for the span tag
 */
var DefaultItemRenderer = function DefaultItemRenderer(props) {
  var item = props.item,
      rest = _objectWithoutProperties(props, ["item"]);

  return /*#__PURE__*/_react["default"].createElement("span", rest, /*#__PURE__*/_react["default"].createElement("span", {
    className: "rct9k-item-renderer-inner"
  }, item.title));
};
/**
 * Default group (row) renderer class
 * @param {object} props - Component props
 * @param {object} props.group - The group to be rendered
 * @param {string} props.group.title - The group's title
 * @param {string} props.group.id - The group's id
 * @param {?...object} props.rest - Any other arguments for the span tag
 */


exports.DefaultItemRenderer = DefaultItemRenderer;

var DefaultGroupRenderer = function DefaultGroupRenderer(props) {
  var group = props.group,
      rest = _objectWithoutProperties(props, ["group"]);

  return /*#__PURE__*/_react["default"].createElement("span", _extends({
    "data-group-index": group.id
  }, rest), /*#__PURE__*/_react["default"].createElement("span", null, group.title));
};

exports.DefaultGroupRenderer = DefaultGroupRenderer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3JlbmRlcmVycy5qcyJdLCJuYW1lcyI6WyJEZWZhdWx0SXRlbVJlbmRlcmVyIiwicHJvcHMiLCJpdGVtIiwicmVzdCIsInRpdGxlIiwiRGVmYXVsdEdyb3VwUmVuZGVyZXIiLCJncm91cCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU1BLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQUMsS0FBSyxFQUFJO0FBQUEsTUFDbkNDLElBRG1DLEdBQ2xCRCxLQURrQixDQUNuQ0MsSUFEbUM7QUFBQSxNQUMxQkMsSUFEMEIsNEJBQ2xCRixLQURrQjs7QUFHMUMsc0JBQ0Usd0NBQVVFLElBQVYsZUFDRTtBQUFNLElBQUEsU0FBUyxFQUFDO0FBQWhCLEtBQTZDRCxJQUFJLENBQUNFLEtBQWxELENBREYsQ0FERjtBQUtELENBUk07QUFVUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUNPLElBQU1DLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsQ0FBQUosS0FBSyxFQUFJO0FBQUEsTUFDcENLLEtBRG9DLEdBQ2xCTCxLQURrQixDQUNwQ0ssS0FEb0M7QUFBQSxNQUMxQkgsSUFEMEIsNEJBQ2xCRixLQURrQjs7QUFHM0Msc0JBQ0U7QUFBTSx3QkFBa0JLLEtBQUssQ0FBQ0M7QUFBOUIsS0FBc0NKLElBQXRDLGdCQUNFLDhDQUFPRyxLQUFLLENBQUNGLEtBQWIsQ0FERixDQURGO0FBS0QsQ0FSTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG4vKipcclxuICogRGVmYXVsdCBpdGVtIHJlbmRlcmVyIGNsYXNzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyAtIENvbXBvbmVudCBwcm9wc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvcHMuaXRlbSAtIFRoZSBpdGVtIHRvIGJlIHJlbmRlcmVkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wcy5pdGVtLnRpdGxlIC0gVGhlIGl0ZW0ncyB0aXRsZVxyXG4gKiBAcGFyYW0gez8uLi5vYmplY3R9IHByb3BzLnJlc3QgLSBBbnkgb3RoZXIgYXJndW1lbnRzIGZvciB0aGUgc3BhbiB0YWdcclxuICovXHJcbmV4cG9ydCBjb25zdCBEZWZhdWx0SXRlbVJlbmRlcmVyID0gcHJvcHMgPT4ge1xyXG4gIGNvbnN0IHtpdGVtLCAuLi5yZXN0fSA9IHByb3BzO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNwYW4gey4uLnJlc3R9PlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyY3Q5ay1pdGVtLXJlbmRlcmVyLWlubmVyXCI+e2l0ZW0udGl0bGV9PC9zcGFuPlxyXG4gICAgPC9zcGFuPlxyXG4gICk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVmYXVsdCBncm91cCAocm93KSByZW5kZXJlciBjbGFzc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgLSBDb21wb25lbnQgcHJvcHNcclxuICogQHBhcmFtIHtvYmplY3R9IHByb3BzLmdyb3VwIC0gVGhlIGdyb3VwIHRvIGJlIHJlbmRlcmVkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wcy5ncm91cC50aXRsZSAtIFRoZSBncm91cCdzIHRpdGxlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wcy5ncm91cC5pZCAtIFRoZSBncm91cCdzIGlkXHJcbiAqIEBwYXJhbSB7Py4uLm9iamVjdH0gcHJvcHMucmVzdCAtIEFueSBvdGhlciBhcmd1bWVudHMgZm9yIHRoZSBzcGFuIHRhZ1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IERlZmF1bHRHcm91cFJlbmRlcmVyID0gcHJvcHMgPT4ge1xyXG4gIGNvbnN0IHtncm91cCwgLi4ucmVzdH0gPSBwcm9wcztcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzcGFuIGRhdGEtZ3JvdXAtaW5kZXg9e2dyb3VwLmlkfSB7Li4ucmVzdH0+XHJcbiAgICAgIDxzcGFuPntncm91cC50aXRsZX08L3NwYW4+XHJcbiAgICA8L3NwYW4+XHJcbiAgKTtcclxufTtcclxuIl19