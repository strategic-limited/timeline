'use strict';

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _chai = require("chai");

var _setupTests = _interopRequireDefault(require("setupTests"));

var _renderers = require("./renderers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Item renderer', function () {
  it('should render the item', function () {
    var item = {
      title: 'my_test'
    };
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_renderers.DefaultItemRenderer, {
      item: item
    }));
    (0, _chai.expect)(component.text()).to.contain('my_test');
  });
});
describe('Group renderer', function () {
  it('should render the group', function () {
    var group = {
      title: 'my_test'
    };
    var component = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_renderers.DefaultGroupRenderer, {
      group: group
    }));
    (0, _chai.expect)(component.text()).to.contain('my_test');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3JlbmRlcmVycy50ZXN0LmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiaXQiLCJpdGVtIiwidGl0bGUiLCJjb21wb25lbnQiLCJ0ZXh0IiwidG8iLCJjb250YWluIiwiZ3JvdXAiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUFBLFFBQVEsQ0FBQyxlQUFELEVBQWtCLFlBQU07QUFDOUJDLEVBQUFBLEVBQUUsQ0FBQyx3QkFBRCxFQUEyQixZQUFNO0FBQ2pDLFFBQU1DLElBQUksR0FBRztBQUFDQyxNQUFBQSxLQUFLLEVBQUU7QUFBUixLQUFiO0FBQ0EsUUFBTUMsU0FBUyxHQUFHLG1DQUFRLGdDQUFDLDhCQUFEO0FBQXFCLE1BQUEsSUFBSSxFQUFFRjtBQUEzQixNQUFSLENBQWxCO0FBQ0Esc0JBQU9FLFNBQVMsQ0FBQ0MsSUFBVixFQUFQLEVBQXlCQyxFQUF6QixDQUE0QkMsT0FBNUIsQ0FBb0MsU0FBcEM7QUFDRCxHQUpDLENBQUY7QUFLRCxDQU5PLENBQVI7QUFPQVAsUUFBUSxDQUFDLGdCQUFELEVBQW1CLFlBQU07QUFDL0JDLEVBQUFBLEVBQUUsQ0FBQyx5QkFBRCxFQUE0QixZQUFNO0FBQ2xDLFFBQU1PLEtBQUssR0FBRztBQUFDTCxNQUFBQSxLQUFLLEVBQUU7QUFBUixLQUFkO0FBQ0EsUUFBTUMsU0FBUyxHQUFHLG1DQUFRLGdDQUFDLCtCQUFEO0FBQXNCLE1BQUEsS0FBSyxFQUFFSTtBQUE3QixNQUFSLENBQWxCO0FBQ0Esc0JBQU9KLFNBQVMsQ0FBQ0MsSUFBVixFQUFQLEVBQXlCQyxFQUF6QixDQUE0QkMsT0FBNUIsQ0FBb0MsU0FBcEM7QUFDRCxHQUpDLENBQUY7QUFLRCxDQU5PLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7c2hhbGxvdywgbW91bnR9IGZyb20gJ2VuenltZSc7XHJcbmltcG9ydCB7ZXhwZWN0fSBmcm9tICdjaGFpJztcclxuXHJcbmltcG9ydCBzZXR1cCBmcm9tICdzZXR1cFRlc3RzJztcclxuaW1wb3J0IHtEZWZhdWx0SXRlbVJlbmRlcmVyLCBEZWZhdWx0R3JvdXBSZW5kZXJlcn0gZnJvbSAnLi9yZW5kZXJlcnMnO1xyXG5cclxuZGVzY3JpYmUoJ0l0ZW0gcmVuZGVyZXInLCAoKSA9PiB7XHJcbiAgaXQoJ3Nob3VsZCByZW5kZXIgdGhlIGl0ZW0nLCAoKSA9PiB7XHJcbiAgICBjb25zdCBpdGVtID0ge3RpdGxlOiAnbXlfdGVzdCd9O1xyXG4gICAgY29uc3QgY29tcG9uZW50ID0gc2hhbGxvdyg8RGVmYXVsdEl0ZW1SZW5kZXJlciBpdGVtPXtpdGVtfSAvPik7XHJcbiAgICBleHBlY3QoY29tcG9uZW50LnRleHQoKSkudG8uY29udGFpbignbXlfdGVzdCcpO1xyXG4gIH0pO1xyXG59KTtcclxuZGVzY3JpYmUoJ0dyb3VwIHJlbmRlcmVyJywgKCkgPT4ge1xyXG4gIGl0KCdzaG91bGQgcmVuZGVyIHRoZSBncm91cCcsICgpID0+IHtcclxuICAgIGNvbnN0IGdyb3VwID0ge3RpdGxlOiAnbXlfdGVzdCd9O1xyXG4gICAgY29uc3QgY29tcG9uZW50ID0gc2hhbGxvdyg8RGVmYXVsdEdyb3VwUmVuZGVyZXIgZ3JvdXA9e2dyb3VwfSAvPik7XHJcbiAgICBleHBlY3QoY29tcG9uZW50LnRleHQoKSkudG8uY29udGFpbignbXlfdGVzdCcpO1xyXG4gIH0pO1xyXG59KTtcclxuIl19