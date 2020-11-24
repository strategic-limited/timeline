"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Marker = function Marker(props) {
  var height = props.height,
      left = props.left,
      top = props.top;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "rct9k-marker-overlay",
    style: {
      height: height,
      left: left,
      top: top
    }
  });
};

Marker.propTypes = {
  height: _propTypes["default"].number.isRequired,
  left: _propTypes["default"].number.isRequired,
  top: _propTypes["default"].number.isRequired
};
var _default = Marker;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcmtlci5qcyJdLCJuYW1lcyI6WyJNYXJrZXIiLCJwcm9wcyIsImhlaWdodCIsImxlZnQiLCJ0b3AiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJudW1iZXIiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxDQUFBQyxLQUFLLEVBQUk7QUFBQSxNQUNmQyxNQURlLEdBQ01ELEtBRE4sQ0FDZkMsTUFEZTtBQUFBLE1BQ1BDLElBRE8sR0FDTUYsS0FETixDQUNQRSxJQURPO0FBQUEsTUFDREMsR0FEQyxHQUNNSCxLQUROLENBQ0RHLEdBREM7QUFFdEIsc0JBQU87QUFBSyxJQUFBLFNBQVMsRUFBQyxzQkFBZjtBQUFzQyxJQUFBLEtBQUssRUFBRTtBQUFDRixNQUFBQSxNQUFNLEVBQU5BLE1BQUQ7QUFBU0MsTUFBQUEsSUFBSSxFQUFKQSxJQUFUO0FBQWVDLE1BQUFBLEdBQUcsRUFBSEE7QUFBZjtBQUE3QyxJQUFQO0FBQ0QsQ0FIRDs7QUFLQUosTUFBTSxDQUFDSyxTQUFQLEdBQW1CO0FBQ2pCSCxFQUFBQSxNQUFNLEVBQUVJLHNCQUFVQyxNQUFWLENBQWlCQyxVQURSO0FBRWpCTCxFQUFBQSxJQUFJLEVBQUVHLHNCQUFVQyxNQUFWLENBQWlCQyxVQUZOO0FBR2pCSixFQUFBQSxHQUFHLEVBQUVFLHNCQUFVQyxNQUFWLENBQWlCQztBQUhMLENBQW5CO2VBTWVSLE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5cclxuY29uc3QgTWFya2VyID0gcHJvcHMgPT4ge1xyXG4gIGNvbnN0IHtoZWlnaHQsIGxlZnQsIHRvcH0gPSBwcm9wcztcclxuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJyY3Q5ay1tYXJrZXItb3ZlcmxheVwiIHN0eWxlPXt7aGVpZ2h0LCBsZWZ0LCB0b3B9fSAvPjtcclxufTtcclxuXHJcbk1hcmtlci5wcm9wVHlwZXMgPSB7XHJcbiAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgbGVmdDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gIHRvcDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXJrZXI7XHJcbiJdfQ==