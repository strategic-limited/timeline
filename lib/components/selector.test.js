'use strict';

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _chai = require("chai");

var _setupTests = _interopRequireDefault(require("setupTests"));

var _selector = _interopRequireDefault(require("./selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Selector', function () {
  it('should initialize to 0,0', function () {
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_selector["default"], null));
    var instance = component.instance();
    (0, _chai.expect)(instance.startX).to.equal(0);
    (0, _chai.expect)(instance.startY).to.equal(0);
    (0, _chai.expect)(instance.curX).to.equal(0);
    (0, _chai.expect)(instance.curY).to.equal(0);
  });
  it('should set start coordinates correctly', function () {
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_selector["default"], null));
    var instance = component.instance();
    instance.start(33, 44);
    (0, _chai.expect)(instance.startX).to.equal(33);
    (0, _chai.expect)(instance.startY).to.equal(44);
    (0, _chai.expect)(instance.curX).to.equal(0);
    (0, _chai.expect)(instance.curY).to.equal(0);
  });
  it('should set move coordinates correctly', function () {
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_selector["default"], null));
    var instance = component.instance();
    instance.start(33, 44);
    instance.move(55, 66);
    (0, _chai.expect)(instance.startX).to.equal(33);
    (0, _chai.expect)(instance.startY).to.equal(44);
    (0, _chai.expect)(instance.curX).to.equal(55);
    (0, _chai.expect)(instance.curY).to.equal(66);
  });
  it('should return correct coordinates on end', function () {
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_selector["default"], null));
    var instance = component.instance();
    instance.start(33, 44);
    instance.move(55, 45);
    var endReturn = instance.end();
    (0, _chai.expect)(endReturn).to.deep.equal({
      left: 33,
      top: 44,
      width: 22,
      height: 1
    });
  });
  it('should reset coordinates on end', function () {
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_selector["default"], null));
    var instance = component.instance();
    instance.start(33, 44);
    instance.move(55, 45);
    var endReturn = instance.end();
    (0, _chai.expect)(instance.startX).to.equal(0);
    (0, _chai.expect)(instance.startY).to.equal(0);
    (0, _chai.expect)(instance.curX).to.equal(0);
    (0, _chai.expect)(instance.curY).to.equal(0);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdG9yLnRlc3QuanMiXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJpdCIsImNvbXBvbmVudCIsImluc3RhbmNlIiwic3RhcnRYIiwidG8iLCJlcXVhbCIsInN0YXJ0WSIsImN1clgiLCJjdXJZIiwic3RhcnQiLCJtb3ZlIiwiZW5kUmV0dXJuIiwiZW5kIiwiZGVlcCIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFFQUEsUUFBUSxDQUFDLFVBQUQsRUFBYSxZQUFNO0FBQ3pCQyxFQUFBQSxFQUFFLENBQUMsMEJBQUQsRUFBNkIsWUFBTTtBQUNuQyxRQUFNQyxTQUFTLEdBQUcsbUNBQVEsZ0NBQUMsb0JBQUQsT0FBUixDQUFsQjtBQUNBLFFBQU1DLFFBQVEsR0FBR0QsU0FBUyxDQUFDQyxRQUFWLEVBQWpCO0FBQ0Esc0JBQU9BLFFBQVEsQ0FBQ0MsTUFBaEIsRUFBd0JDLEVBQXhCLENBQTJCQyxLQUEzQixDQUFpQyxDQUFqQztBQUNBLHNCQUFPSCxRQUFRLENBQUNJLE1BQWhCLEVBQXdCRixFQUF4QixDQUEyQkMsS0FBM0IsQ0FBaUMsQ0FBakM7QUFDQSxzQkFBT0gsUUFBUSxDQUFDSyxJQUFoQixFQUFzQkgsRUFBdEIsQ0FBeUJDLEtBQXpCLENBQStCLENBQS9CO0FBQ0Esc0JBQU9ILFFBQVEsQ0FBQ00sSUFBaEIsRUFBc0JKLEVBQXRCLENBQXlCQyxLQUF6QixDQUErQixDQUEvQjtBQUNELEdBUEMsQ0FBRjtBQVFBTCxFQUFBQSxFQUFFLENBQUMsd0NBQUQsRUFBMkMsWUFBTTtBQUNqRCxRQUFNQyxTQUFTLEdBQUcsbUNBQVEsZ0NBQUMsb0JBQUQsT0FBUixDQUFsQjtBQUNBLFFBQU1DLFFBQVEsR0FBR0QsU0FBUyxDQUFDQyxRQUFWLEVBQWpCO0FBQ0FBLElBQUFBLFFBQVEsQ0FBQ08sS0FBVCxDQUFlLEVBQWYs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SixFQUF0QixDQUF5QkMsS0FBekIsQ0FBK0IsQ0FBL0I7QUFDRCxHQVZDLENBQUY7QUFXRCxDQS9DTyxDQUFSIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge3NoYWxsb3csIG1vdW50fSBmcm9tICdlbnp5bWUnO1xyXG5pbXBvcnQge2V4cGVjdH0gZnJvbSAnY2hhaSc7XHJcblxyXG5pbXBvcnQgc2V0dXAgZnJvbSAnc2V0dXBUZXN0cyc7XHJcbmltcG9ydCBTZWxlY3RCb3ggZnJvbSAnLi9zZWxlY3Rvcic7XHJcblxyXG5kZXNjcmliZSgnU2VsZWN0b3InLCAoKSA9PiB7XHJcbiAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHRvIDAsMCcsICgpID0+IHtcclxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHNoYWxsb3coPFNlbGVjdEJveCAvPik7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IGNvbXBvbmVudC5pbnN0YW5jZSgpO1xyXG4gICAgZXhwZWN0KGluc3RhbmNlLnN0YXJ0WCkudG8uZXF1YWwoMCk7XHJcbiAgICBleHBlY3QoaW5zdGFuY2Uuc3RhcnRZKS50by5lcXVhbCgwKTtcclxuICAgIGV4cGVjdChpbnN0YW5jZS5jdXJYKS50by5lcXVhbCgwKTtcclxuICAgIGV4cGVjdChpbnN0YW5jZS5jdXJZKS50by5lcXVhbCgwKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIHNldCBzdGFydCBjb29yZGluYXRlcyBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSBzaGFsbG93KDxTZWxlY3RCb3ggLz4pO1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSBjb21wb25lbnQuaW5zdGFuY2UoKTtcclxuICAgIGluc3RhbmNlLnN0YXJ0KDMzLCA0NCk7XHJcbiAgICBleHBlY3QoaW5zdGFuY2Uuc3RhcnRYKS50by5lcXVhbCgzMyk7XHJcbiAgICBleHBlY3QoaW5zdGFuY2Uuc3RhcnRZKS50by5lcXVhbCg0NCk7XHJcbiAgICBleHBlY3QoaW5zdGFuY2UuY3VyWCkudG8uZXF1YWwoMCk7XHJcbiAgICBleHBlY3QoaW5zdGFuY2UuY3VyWSkudG8uZXF1YWwoMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBzZXQgbW92ZSBjb29yZGluYXRlcyBjb3JyZWN0bHknLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSBzaGFsbG93KDxTZWxlY3RCb3ggLz4pO1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSBjb21wb25lbnQuaW5zdGFuY2UoKTtcclxuICAgIGluc3RhbmNlLnN0YXJ0KDMzLCA0NCk7XHJcbiAgICBpbnN0YW5jZS5tb3ZlKDU1LCA2Nik7XHJcbiAgICBleHBlY3QoaW5zdGFuY2Uuc3RhcnRYKS50by5lcXVhbCgzMyk7XHJcbiAgICBleHBlY3QoaW5zdGFuY2Uuc3RhcnRZKS50by5lcXVhbCg0NCk7XHJcbiAgICBleHBlY3QoaW5zdGFuY2UuY3VyWCkudG8uZXF1YWwoNTUpO1xyXG4gICAgZXhwZWN0KGluc3RhbmNlLmN1clkpLnRvLmVxdWFsKDY2KTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIHJldHVybiBjb3JyZWN0IGNvb3JkaW5hdGVzIG9uIGVuZCcsICgpID0+IHtcclxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHNoYWxsb3coPFNlbGVjdEJveCAvPik7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IGNvbXBvbmVudC5pbnN0YW5jZSgpO1xyXG4gICAgaW5zdGFuY2Uuc3RhcnQoMzMsIDQ0KTtcclxuICAgIGluc3RhbmNlLm1vdmUoNTUsIDQ1KTtcclxuICAgIGNvbnN0IGVuZFJldHVybiA9IGluc3RhbmNlLmVuZCgpO1xyXG4gICAgZXhwZWN0KGVuZFJldHVybikudG8uZGVlcC5lcXVhbCh7bGVmdDogMzMsIHRvcDogNDQsIHdpZHRoOiAyMiwgaGVpZ2h0OiAxfSk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCByZXNldCBjb29yZGluYXRlcyBvbiBlbmQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSBzaGFsbG93KDxTZWxlY3RCb3ggLz4pO1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSBjb21wb25lbnQuaW5zdGFuY2UoKTtcclxuICAgIGluc3RhbmNlLnN0YXJ0KDMzLCA0NCk7XHJcbiAgICBpbnN0YW5jZS5tb3ZlKDU1LCA0NSk7XHJcbiAgICBjb25zdCBlbmRSZXR1cm4gPSBpbnN0YW5jZS5lbmQoKTtcclxuICAgIGV4cGVjdChpbnN0YW5jZS5zdGFydFgpLnRvLmVxdWFsKDApO1xyXG4gICAgZXhwZWN0KGluc3RhbmNlLnN0YXJ0WSkudG8uZXF1YWwoMCk7XHJcbiAgICBleHBlY3QoaW5zdGFuY2UuY3VyWCkudG8uZXF1YWwoMCk7XHJcbiAgICBleHBlY3QoaW5zdGFuY2UuY3VyWSkudG8uZXF1YWwoMCk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXX0=