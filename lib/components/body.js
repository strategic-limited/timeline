"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactVirtualized = require("react-virtualized");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TimelineBody = /*#__PURE__*/function (_Component) {
  _inherits(TimelineBody, _Component);

  var _super = _createSuper(TimelineBody);

  function TimelineBody() {
    _classCallCheck(this, TimelineBody);

    return _super.apply(this, arguments);
  }

  _createClass(TimelineBody, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.forceUpdate();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var props = this.props;

      if (!props.shallowUpdateCheck) {
        return true;
      } // prettier-ignore


      var shallowChange = props.height !== nextProps.height || props.width !== nextProps.width || props.rowCount !== nextProps.rowCount;

      if (props.forceRedrawFunc) {
        return shallowChange || props.forceRedrawFunc(props, nextProps);
      }

      return shallowChange;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          width = _this$props.width,
          columnWidth = _this$props.columnWidth,
          height = _this$props.height,
          rowHeight = _this$props.rowHeight,
          rowCount = _this$props.rowCount;
      var _this$props2 = this.props,
          grid_ref_callback = _this$props2.grid_ref_callback,
          cellRenderer = _this$props2.cellRenderer;
      return /*#__PURE__*/_react["default"].createElement(_reactVirtualized.Grid, {
        ref: grid_ref_callback,
        autoContainerWidth: true,
        cellRenderer: cellRenderer,
        columnCount: 2,
        columnWidth: columnWidth,
        height: height,
        rowCount: rowCount,
        rowHeight: rowHeight,
        width: width
      });
    }
  }]);

  return TimelineBody;
}(_react.Component);

TimelineBody.propTypes = {
  width: _propTypes["default"].number.isRequired,
  columnWidth: _propTypes["default"].func.isRequired,
  height: _propTypes["default"].number.isRequired,
  rowHeight: _propTypes["default"].func.isRequired,
  rowCount: _propTypes["default"].number.isRequired,
  grid_ref_callback: _propTypes["default"].func.isRequired,
  cellRenderer: _propTypes["default"].func.isRequired,
  shallowUpdateCheck: _propTypes["default"].bool,
  forceRedrawFunc: _propTypes["default"].func
};
TimelineBody.defaultProps = {
  shallowUpdateCheck: false,
  forceRedrawFunc: null
};
var _default = TimelineBody;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2JvZHkuanMiXSwibmFtZXMiOlsiVGltZWxpbmVCb2R5IiwiZm9yY2VVcGRhdGUiLCJuZXh0UHJvcHMiLCJwcm9wcyIsInNoYWxsb3dVcGRhdGVDaGVjayIsInNoYWxsb3dDaGFuZ2UiLCJoZWlnaHQiLCJ3aWR0aCIsInJvd0NvdW50IiwiZm9yY2VSZWRyYXdGdW5jIiwiY29sdW1uV2lkdGgiLCJyb3dIZWlnaHQiLCJncmlkX3JlZl9jYWxsYmFjayIsImNlbGxSZW5kZXJlciIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJmdW5jIiwiYm9vbCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsWTs7Ozs7Ozs7Ozs7Ozt3Q0FDZ0I7QUFDbEIsV0FBS0MsV0FBTDtBQUNEOzs7MENBQ3FCQyxTLEVBQVc7QUFBQSxVQUN4QkMsS0FEd0IsR0FDZixJQURlLENBQ3hCQSxLQUR3Qjs7QUFFL0IsVUFBSSxDQUFDQSxLQUFLLENBQUNDLGtCQUFYLEVBQStCO0FBQzdCLGVBQU8sSUFBUDtBQUNELE9BSjhCLENBTS9COzs7QUFDQSxVQUFNQyxhQUFhLEdBQUdGLEtBQUssQ0FBQ0csTUFBTixLQUFpQkosU0FBUyxDQUFDSSxNQUEzQixJQUNqQkgsS0FBSyxDQUFDSSxLQUFOLEtBQWdCTCxTQUFTLENBQUNLLEtBRFQsSUFFakJKLEtBQUssQ0FBQ0ssUUFBTixLQUFtQk4sU0FBUyxDQUFDTSxRQUZsQzs7QUFJQSxVQUFJTCxLQUFLLENBQUNNLGVBQVYsRUFBMkI7QUFDekIsZUFBT0osYUFBYSxJQUFJRixLQUFLLENBQUNNLGVBQU4sQ0FBc0JOLEtBQXRCLEVBQTZCRCxTQUE3QixDQUF4QjtBQUNEOztBQUVELGFBQU9HLGFBQVA7QUFDRDs7OzZCQUNRO0FBQUEsd0JBQ21ELEtBQUtGLEtBRHhEO0FBQUEsVUFDQUksS0FEQSxlQUNBQSxLQURBO0FBQUEsVUFDT0csV0FEUCxlQUNPQSxXQURQO0FBQUEsVUFDb0JKLE1BRHBCLGVBQ29CQSxNQURwQjtBQUFBLFVBQzRCSyxTQUQ1QixlQUM0QkEsU0FENUI7QUFBQSxVQUN1Q0gsUUFEdkMsZUFDdUNBLFFBRHZDO0FBQUEseUJBRW1DLEtBQUtMLEtBRnhDO0FBQUEsVUFFQVMsaUJBRkEsZ0JBRUFBLGlCQUZBO0FBQUEsVUFFbUJDLFlBRm5CLGdCQUVtQkEsWUFGbkI7QUFJUCwwQkFDRSxnQ0FBQyxzQkFBRDtBQUNFLFFBQUEsR0FBRyxFQUFFRCxpQkFEUDtBQUVFLFFBQUEsa0JBQWtCLE1BRnBCO0FBR0UsUUFBQSxZQUFZLEVBQUVDLFlBSGhCO0FBSUUsUUFBQSxXQUFXLEVBQUUsQ0FKZjtBQUtFLFFBQUEsV0FBVyxFQUFFSCxXQUxmO0FBTUUsUUFBQSxNQUFNLEVBQUVKLE1BTlY7QUFPRSxRQUFBLFFBQVEsRUFBRUUsUUFQWjtBQVFFLFFBQUEsU0FBUyxFQUFFRyxTQVJiO0FBU0UsUUFBQSxLQUFLLEVBQUVKO0FBVFQsUUFERjtBQWFEOzs7O0VBdEN3Qk8sZ0I7O0FBeUMzQmQsWUFBWSxDQUFDZSxTQUFiLEdBQXlCO0FBQ3ZCUixFQUFBQSxLQUFLLEVBQUVTLHNCQUFVQyxNQUFWLENBQWlCQyxVQUREO0FBRXZCUixFQUFBQSxXQUFXLEVBQUVNLHNCQUFVRyxJQUFWLENBQWVELFVBRkw7QUFHdkJaLEVBQUFBLE1BQU0sRUFBRVUsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBSEY7QUFJdkJQLEVBQUFBLFNBQVMsRUFBRUssc0JBQVVHLElBQVYsQ0FBZUQsVUFKSDtBQUt2QlYsRUFBQUEsUUFBUSxFQUFFUSxzQkFBVUMsTUFBVixDQUFpQkMsVUFMSjtBQU12Qk4sRUFBQUEsaUJBQWlCLEVBQUVJLHNCQUFVRyxJQUFWLENBQWVELFVBTlg7QUFPdkJMLEVBQUFBLFlBQVksRUFBRUcsc0JBQVVHLElBQVYsQ0FBZUQsVUFQTjtBQVF2QmQsRUFBQUEsa0JBQWtCLEVBQUVZLHNCQUFVSSxJQVJQO0FBU3ZCWCxFQUFBQSxlQUFlLEVBQUVPLHNCQUFVRztBQVRKLENBQXpCO0FBWUFuQixZQUFZLENBQUNxQixZQUFiLEdBQTRCO0FBQzFCakIsRUFBQUEsa0JBQWtCLEVBQUUsS0FETTtBQUUxQkssRUFBQUEsZUFBZSxFQUFFO0FBRlMsQ0FBNUI7ZUFJZVQsWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaW1lbGluZSBib2R5L2dyaWRcclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuXHJcbmltcG9ydCB7R3JpZH0gZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQnO1xyXG5cclxuY2xhc3MgVGltZWxpbmVCb2R5IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuICB9XHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xyXG4gICAgY29uc3Qge3Byb3BzfSA9IHRoaXM7XHJcbiAgICBpZiAoIXByb3BzLnNoYWxsb3dVcGRhdGVDaGVjaykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IHNoYWxsb3dDaGFuZ2UgPSBwcm9wcy5oZWlnaHQgIT09IG5leHRQcm9wcy5oZWlnaHRcclxuICAgICAgfHwgcHJvcHMud2lkdGggIT09IG5leHRQcm9wcy53aWR0aFxyXG4gICAgICB8fCBwcm9wcy5yb3dDb3VudCAhPT0gbmV4dFByb3BzLnJvd0NvdW50O1xyXG5cclxuICAgIGlmIChwcm9wcy5mb3JjZVJlZHJhd0Z1bmMpIHtcclxuICAgICAgcmV0dXJuIHNoYWxsb3dDaGFuZ2UgfHwgcHJvcHMuZm9yY2VSZWRyYXdGdW5jKHByb3BzLCBuZXh0UHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzaGFsbG93Q2hhbmdlO1xyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7d2lkdGgsIGNvbHVtbldpZHRoLCBoZWlnaHQsIHJvd0hlaWdodCwgcm93Q291bnR9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHtncmlkX3JlZl9jYWxsYmFjaywgY2VsbFJlbmRlcmVyfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEdyaWRcclxuICAgICAgICByZWY9e2dyaWRfcmVmX2NhbGxiYWNrfVxyXG4gICAgICAgIGF1dG9Db250YWluZXJXaWR0aFxyXG4gICAgICAgIGNlbGxSZW5kZXJlcj17Y2VsbFJlbmRlcmVyfVxyXG4gICAgICAgIGNvbHVtbkNvdW50PXsyfVxyXG4gICAgICAgIGNvbHVtbldpZHRoPXtjb2x1bW5XaWR0aH1cclxuICAgICAgICBoZWlnaHQ9e2hlaWdodH1cclxuICAgICAgICByb3dDb3VudD17cm93Q291bnR9XHJcbiAgICAgICAgcm93SGVpZ2h0PXtyb3dIZWlnaHR9XHJcbiAgICAgICAgd2lkdGg9e3dpZHRofVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblRpbWVsaW5lQm9keS5wcm9wVHlwZXMgPSB7XHJcbiAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICBjb2x1bW5XaWR0aDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICByb3dIZWlnaHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgcm93Q291bnQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICBncmlkX3JlZl9jYWxsYmFjazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICBjZWxsUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgc2hhbGxvd1VwZGF0ZUNoZWNrOiBQcm9wVHlwZXMuYm9vbCxcclxuICBmb3JjZVJlZHJhd0Z1bmM6IFByb3BUeXBlcy5mdW5jXHJcbn07XHJcblxyXG5UaW1lbGluZUJvZHkuZGVmYXVsdFByb3BzID0ge1xyXG4gIHNoYWxsb3dVcGRhdGVDaGVjazogZmFsc2UsXHJcbiAgZm9yY2VSZWRyYXdGdW5jOiBudWxsXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IFRpbWVsaW5lQm9keTtcclxuIl19