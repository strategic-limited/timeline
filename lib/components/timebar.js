'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _timebarConsts = require("../consts/timebarConsts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

// Timebar component - displays the current time on top of the timeline
var Timebar = /*#__PURE__*/function (_React$Component) {
  _inherits(Timebar, _React$Component);

  var _super = _createSuper(Timebar);

  function Timebar(props) {
    var _this;

    _classCallCheck(this, Timebar);

    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  _createClass(Timebar, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rct9k-timebar"
      });
    }
  }]);

  return Timebar;
}(_react["default"].Component);

exports["default"] = Timebar;
Timebar.propTypes = {
  cursorTime: _propTypes["default"].any,
  groupTitleRenderer: _propTypes["default"].func,
  start: _propTypes["default"].object.isRequired,
  //moment
  end: _propTypes["default"].object.isRequired,
  //moment
  width: _propTypes["default"].number.isRequired,
  leftOffset: _propTypes["default"].number,
  top_resolution: _propTypes["default"].string,
  bottom_resolution: _propTypes["default"].string,
  selectedRanges: _propTypes["default"].arrayOf(_propTypes["default"].object),
  // [start: moment ,end: moment (end)]
  timeFormats: _propTypes["default"].object
};
Timebar.defaultProps = {
  selectedRanges: [],
  groupTitleRenderer: function groupTitleRenderer() {
    return /*#__PURE__*/_react["default"].createElement("div", null);
  },
  leftOffset: 0,
  timeFormats: _timebarConsts.timebarFormat
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3RpbWViYXIuanMiXSwibmFtZXMiOlsiVGltZWJhciIsInByb3BzIiwic3RhdGUiLCJSZWFjdCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsImN1cnNvclRpbWUiLCJQcm9wVHlwZXMiLCJhbnkiLCJncm91cFRpdGxlUmVuZGVyZXIiLCJmdW5jIiwic3RhcnQiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiZW5kIiwid2lkdGgiLCJudW1iZXIiLCJsZWZ0T2Zmc2V0IiwidG9wX3Jlc29sdXRpb24iLCJzdHJpbmciLCJib3R0b21fcmVzb2x1dGlvbiIsInNlbGVjdGVkUmFuZ2VzIiwiYXJyYXlPZiIsInRpbWVGb3JtYXRzIiwiZGVmYXVsdFByb3BzIiwiZGVmYXVsdFRpbWViYXJGb3JtYXQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7SUFDcUJBLE87Ozs7O0FBQ25CLG1CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsS0FBTCxHQUFhLEVBQWI7QUFGaUI7QUFHbEI7Ozs7NkJBRVE7QUFDUCwwQkFDRTtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsUUFERjtBQUdEOzs7O0VBVmtDQyxrQkFBTUMsUzs7O0FBYTNDSixPQUFPLENBQUNLLFNBQVIsR0FBb0I7QUFDbEJDLEVBQUFBLFVBQVUsRUFBRUMsc0JBQVVDLEdBREo7QUFFbEJDLEVBQUFBLGtCQUFrQixFQUFFRixzQkFBVUcsSUFGWjtBQUdsQkMsRUFBQUEsS0FBSyxFQUFFSixzQkFBVUssTUFBVixDQUFpQkMsVUFITjtBQUdrQjtBQUNwQ0MsRUFBQUEsR0FBRyxFQUFFUCxzQkFBVUssTUFBVixDQUFpQkMsVUFKSjtBQUlnQjtBQUNsQ0UsRUFBQUEsS0FBSyxFQUFFUixzQkFBVVMsTUFBVixDQUFpQkgsVUFMTjtBQU1sQkksRUFBQUEsVUFBVSxFQUFFVixzQkFBVVMsTUFOSjtBQU9sQkUsRUFBQUEsY0FBYyxFQUFFWCxzQkFBVVksTUFQUjtBQVFsQkMsRUFBQUEsaUJBQWlCLEVBQUViLHNCQUFVWSxNQVJYO0FBU2xCRSxFQUFBQSxjQUFjLEVBQUVkLHNCQUFVZSxPQUFWLENBQWtCZixzQkFBVUssTUFBNUIsQ0FURTtBQVNtQztBQUNyRFcsRUFBQUEsV0FBVyxFQUFFaEIsc0JBQVVLO0FBVkwsQ0FBcEI7QUFZQVosT0FBTyxDQUFDd0IsWUFBUixHQUF1QjtBQUNyQkgsRUFBQUEsY0FBYyxFQUFFLEVBREs7QUFFckJaLEVBQUFBLGtCQUFrQixFQUFFO0FBQUEsd0JBQU0sNENBQU47QUFBQSxHQUZDO0FBR3JCUSxFQUFBQSxVQUFVLEVBQUUsQ0FIUztBQUlyQk0sRUFBQUEsV0FBVyxFQUFFRTtBQUpRLENBQXZCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IHt0aW1lYmFyRm9ybWF0IGFzIGRlZmF1bHRUaW1lYmFyRm9ybWF0fSBmcm9tICcuLi9jb25zdHMvdGltZWJhckNvbnN0cyc7XHJcblxyXG4vLyBUaW1lYmFyIGNvbXBvbmVudCAtIGRpc3BsYXlzIHRoZSBjdXJyZW50IHRpbWUgb24gdG9wIG9mIHRoZSB0aW1lbGluZVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyY3Q5ay10aW1lYmFyXCI+PC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuVGltZWJhci5wcm9wVHlwZXMgPSB7XHJcbiAgY3Vyc29yVGltZTogUHJvcFR5cGVzLmFueSxcclxuICBncm91cFRpdGxlUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gIHN0YXJ0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIC8vbW9tZW50XHJcbiAgZW5kOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIC8vbW9tZW50XHJcbiAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICBsZWZ0T2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gIHRvcF9yZXNvbHV0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGJvdHRvbV9yZXNvbHV0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHNlbGVjdGVkUmFuZ2VzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSwgLy8gW3N0YXJ0OiBtb21lbnQgLGVuZDogbW9tZW50IChlbmQpXVxyXG4gIHRpbWVGb3JtYXRzOiBQcm9wVHlwZXMub2JqZWN0XHJcbn07XHJcblRpbWViYXIuZGVmYXVsdFByb3BzID0ge1xyXG4gIHNlbGVjdGVkUmFuZ2VzOiBbXSxcclxuICBncm91cFRpdGxlUmVuZGVyZXI6ICgpID0+IDxkaXYgLz4sXHJcbiAgbGVmdE9mZnNldDogMCxcclxuICB0aW1lRm9ybWF0czogZGVmYXVsdFRpbWViYXJGb3JtYXRcclxufTtcclxuIl19