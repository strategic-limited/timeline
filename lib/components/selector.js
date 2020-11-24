'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

/**
 * Component to show a selection box (like on windows desktop)
 */
var SelectBox = /*#__PURE__*/function (_React$Component) {
  _inherits(SelectBox, _React$Component);

  var _super = _createSuper(SelectBox);

  function SelectBox(props) {
    var _this;

    _classCallCheck(this, SelectBox);

    _this = _super.call(this, props);
    _this.curX = 0;
    _this.curY = 0;
    _this.startX = 0;
    _this.startY = 0;
    return _this;
  }
  /**
   * Create the selection box
   * @param {number} x Starting x coordinate for selection box
   * @param {number} y Starting y coordinate for selection box
   */


  _createClass(SelectBox, [{
    key: "start",
    value: function start(x, y) {
      this.startX = x;
      this.startY = y;
      this.curX = 0;
      this.curY = 0;
    }
    /**
     * Update the selection box as the mouse moves
     * @param {number} x The current X coordinate of the mouse
     * @param {number} y The current Y coordinate of the mouse
     */

  }, {
    key: "move",
    value: function move(x, y) {
      this.curX = x;
      this.curY = y;
      this.forceUpdate();
    }
    /**
     * Generally on mouse up.
     * Finish the selection box and return the rectangle created
     * @returns {Object} The selection rectangle
     * @property {number} top The top y coordinate
     * @property {number} left The left x coordinate
     * @property {number} width The width of the box
     * @property {number} height The height of the box
     */

  }, {
    key: "end",
    value: function end() {
      var startX = this.startX,
          startY = this.startY,
          curX = this.curX,
          curY = this.curY;
      var left = Math.min(startX, curX);
      var top = Math.min(startY, curY);
      var width = Math.abs(startX - curX);
      var height = Math.abs(startY - curY);
      var toReturn = {
        left: left,
        top: top,
        width: width,
        height: height
      };
      this.startX = 0;
      this.startY = 0;
      this.curX = 0;
      this.curY = 0;
      this.forceUpdate();
      return toReturn;
    }
    /**
     * @ignore
     */

  }, {
    key: "render",
    value: function render() {
      var startX = this.startX,
          startY = this.startY,
          curX = this.curX,
          curY = this.curY;
      var left = Math.min(startX, curX);
      var top = Math.min(startY, curY);
      var width = Math.abs(startX - curX);
      var height = Math.abs(startY - curY);
      var style = {
        left: left,
        top: top,
        width: width,
        height: height
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rct9k-selector-outer",
        style: style
      });
    }
  }]);

  return SelectBox;
}(_react["default"].Component);

exports["default"] = SelectBox;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdG9yLmpzIl0sIm5hbWVzIjpbIlNlbGVjdEJveCIsInByb3BzIiwiY3VyWCIsImN1clkiLCJzdGFydFgiLCJzdGFydFkiLCJ4IiwieSIsImZvcmNlVXBkYXRlIiwibGVmdCIsIk1hdGgiLCJtaW4iLCJ0b3AiLCJ3aWR0aCIsImFicyIsImhlaWdodCIsInRvUmV0dXJuIiwic3R5bGUiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7SUFDcUJBLFM7Ozs7O0FBQ25CLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxVQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFVBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsVUFBS0MsTUFBTCxHQUFjLENBQWQ7QUFMaUI7QUFNbEI7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7OzswQkFDUUMsQyxFQUFHQyxDLEVBQUc7QUFDVixXQUFLSCxNQUFMLEdBQWNFLENBQWQ7QUFDQSxXQUFLRCxNQUFMLEdBQWNFLENBQWQ7QUFDQSxXQUFLTCxJQUFMLEdBQVksQ0FBWjtBQUNBLFdBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O3lCQUNPRyxDLEVBQUdDLEMsRUFBRztBQUNULFdBQUtMLElBQUwsR0FBWUksQ0FBWjtBQUNBLFdBQUtILElBQUwsR0FBWUksQ0FBWjtBQUNBLFdBQUtDLFdBQUw7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzswQkFDUTtBQUFBLFVBQ0dKLE1BREgsR0FDaUMsSUFEakMsQ0FDR0EsTUFESDtBQUFBLFVBQ1dDLE1BRFgsR0FDaUMsSUFEakMsQ0FDV0EsTUFEWDtBQUFBLFVBQ21CSCxJQURuQixHQUNpQyxJQURqQyxDQUNtQkEsSUFEbkI7QUFBQSxVQUN5QkMsSUFEekIsR0FDaUMsSUFEakMsQ0FDeUJBLElBRHpCO0FBRUosVUFBTU0sSUFBSSxHQUFHQyxJQUFJLENBQUNDLEdBQUwsQ0FBU1AsTUFBVCxFQUFpQkYsSUFBakIsQ0FBYjtBQUNBLFVBQU1VLEdBQUcsR0FBR0YsSUFBSSxDQUFDQyxHQUFMLENBQVNOLE1BQVQsRUFBaUJGLElBQWpCLENBQVo7QUFDQSxVQUFNVSxLQUFLLEdBQUdILElBQUksQ0FBQ0ksR0FBTCxDQUFTVixNQUFNLEdBQUdGLElBQWxCLENBQWQ7QUFDQSxVQUFNYSxNQUFNLEdBQUdMLElBQUksQ0FBQ0ksR0FBTCxDQUFTVCxNQUFNLEdBQUdGLElBQWxCLENBQWY7QUFDQSxVQUFJYSxRQUFRLEdBQUc7QUFBQ1AsUUFBQUEsSUFBSSxFQUFKQSxJQUFEO0FBQU9HLFFBQUFBLEdBQUcsRUFBSEEsR0FBUDtBQUFZQyxRQUFBQSxLQUFLLEVBQUxBLEtBQVo7QUFBbUJFLFFBQUFBLE1BQU0sRUFBTkE7QUFBbkIsT0FBZjtBQUVBLFdBQUtYLE1BQUwsR0FBYyxDQUFkO0FBQ0EsV0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxXQUFLSCxJQUFMLEdBQVksQ0FBWjtBQUNBLFdBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBS0ssV0FBTDtBQUNBLGFBQU9RLFFBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTs7Ozs2QkFDVztBQUFBLFVBQ0FaLE1BREEsR0FDOEIsSUFEOUIsQ0FDQUEsTUFEQTtBQUFBLFVBQ1FDLE1BRFIsR0FDOEIsSUFEOUIsQ0FDUUEsTUFEUjtBQUFBLFVBQ2dCSCxJQURoQixHQUM4QixJQUQ5QixDQUNnQkEsSUFEaEI7QUFBQSxVQUNzQkMsSUFEdEIsR0FDOEIsSUFEOUIsQ0FDc0JBLElBRHRCO0FBRVAsVUFBTU0sSUFBSSxHQUFHQyxJQUFJLENBQUNDLEdBQUwsQ0FBU1AsTUFBVCxFQUFpQkYsSUFBakIsQ0FBYjtBQUNBLFVBQU1VLEdBQUcsR0FBR0YsSUFBSSxDQUFDQyxHQUFMLENBQVNOLE1BQVQsRUFBaUJGLElBQWpCLENBQVo7QUFDQSxVQUFNVSxLQUFLLEdBQUdILElBQUksQ0FBQ0ksR0FBTCxDQUFTVixNQUFNLEdBQUdGLElBQWxCLENBQWQ7QUFDQSxVQUFNYSxNQUFNLEdBQUdMLElBQUksQ0FBQ0ksR0FBTCxDQUFTVCxNQUFNLEdBQUdGLElBQWxCLENBQWY7QUFDQSxVQUFJYyxLQUFLLEdBQUc7QUFBQ1IsUUFBQUEsSUFBSSxFQUFKQSxJQUFEO0FBQU9HLFFBQUFBLEdBQUcsRUFBSEEsR0FBUDtBQUFZQyxRQUFBQSxLQUFLLEVBQUxBLEtBQVo7QUFBbUJFLFFBQUFBLE1BQU0sRUFBTkE7QUFBbkIsT0FBWjtBQUNBLDBCQUFPO0FBQUssUUFBQSxTQUFTLEVBQUMsc0JBQWY7QUFBc0MsUUFBQSxLQUFLLEVBQUVFO0FBQTdDLFFBQVA7QUFDRDs7OztFQXBFb0NDLGtCQUFNQyxTIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCB0byBzaG93IGEgc2VsZWN0aW9uIGJveCAobGlrZSBvbiB3aW5kb3dzIGRlc2t0b3ApXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RCb3ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLmN1clggPSAwO1xyXG4gICAgdGhpcy5jdXJZID0gMDtcclxuICAgIHRoaXMuc3RhcnRYID0gMDtcclxuICAgIHRoaXMuc3RhcnRZID0gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgc2VsZWN0aW9uIGJveFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFN0YXJ0aW5nIHggY29vcmRpbmF0ZSBmb3Igc2VsZWN0aW9uIGJveFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFN0YXJ0aW5nIHkgY29vcmRpbmF0ZSBmb3Igc2VsZWN0aW9uIGJveFxyXG4gICAqL1xyXG4gIHN0YXJ0KHgsIHkpIHtcclxuICAgIHRoaXMuc3RhcnRYID0geDtcclxuICAgIHRoaXMuc3RhcnRZID0geTtcclxuICAgIHRoaXMuY3VyWCA9IDA7XHJcbiAgICB0aGlzLmN1clkgPSAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBzZWxlY3Rpb24gYm94IGFzIHRoZSBtb3VzZSBtb3Zlc1xyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBjdXJyZW50IFggY29vcmRpbmF0ZSBvZiB0aGUgbW91c2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgY3VycmVudCBZIGNvb3JkaW5hdGUgb2YgdGhlIG1vdXNlXHJcbiAgICovXHJcbiAgbW92ZSh4LCB5KSB7XHJcbiAgICB0aGlzLmN1clggPSB4O1xyXG4gICAgdGhpcy5jdXJZID0geTtcclxuICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyYWxseSBvbiBtb3VzZSB1cC5cclxuICAgKiBGaW5pc2ggdGhlIHNlbGVjdGlvbiBib3ggYW5kIHJldHVybiB0aGUgcmVjdGFuZ2xlIGNyZWF0ZWRcclxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgc2VsZWN0aW9uIHJlY3RhbmdsZVxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0b3AgVGhlIHRvcCB5IGNvb3JkaW5hdGVcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gbGVmdCBUaGUgbGVmdCB4IGNvb3JkaW5hdGVcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGggVGhlIHdpZHRoIG9mIHRoZSBib3hcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGJveFxyXG4gICAqL1xyXG4gIGVuZCgpIHtcclxuICAgIGNvbnN0IHtzdGFydFgsIHN0YXJ0WSwgY3VyWCwgY3VyWX0gPSB0aGlzO1xyXG4gICAgY29uc3QgbGVmdCA9IE1hdGgubWluKHN0YXJ0WCwgY3VyWCk7XHJcbiAgICBjb25zdCB0b3AgPSBNYXRoLm1pbihzdGFydFksIGN1clkpO1xyXG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLmFicyhzdGFydFggLSBjdXJYKTtcclxuICAgIGNvbnN0IGhlaWdodCA9IE1hdGguYWJzKHN0YXJ0WSAtIGN1clkpO1xyXG4gICAgbGV0IHRvUmV0dXJuID0ge2xlZnQsIHRvcCwgd2lkdGgsIGhlaWdodH07XHJcblxyXG4gICAgdGhpcy5zdGFydFggPSAwO1xyXG4gICAgdGhpcy5zdGFydFkgPSAwO1xyXG4gICAgdGhpcy5jdXJYID0gMDtcclxuICAgIHRoaXMuY3VyWSA9IDA7XHJcbiAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICByZXR1cm4gdG9SZXR1cm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAaWdub3JlXHJcbiAgICovXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge3N0YXJ0WCwgc3RhcnRZLCBjdXJYLCBjdXJZfSA9IHRoaXM7XHJcbiAgICBjb25zdCBsZWZ0ID0gTWF0aC5taW4oc3RhcnRYLCBjdXJYKTtcclxuICAgIGNvbnN0IHRvcCA9IE1hdGgubWluKHN0YXJ0WSwgY3VyWSk7XHJcbiAgICBjb25zdCB3aWR0aCA9IE1hdGguYWJzKHN0YXJ0WCAtIGN1clgpO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5hYnMoc3RhcnRZIC0gY3VyWSk7XHJcbiAgICBsZXQgc3R5bGUgPSB7bGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0fTtcclxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInJjdDlrLXNlbGVjdG9yLW91dGVyXCIgc3R5bGU9e3N0eWxlfSAvPjtcclxuICB9XHJcbn1cclxuIl19