"use strict";

var _chai = require("chai");

var _commonUtils = require("./commonUtils");

describe('Common Utils', function () {
  describe('intToPix', function () {
    it('should convert an int to a pixel string', function () {
      (0, _chai.expect)((0, _commonUtils.intToPix)(1)).to.equal('1px');
    });
    it('should leave already converted strings as is', function () {
      (0, _chai.expect)((0, _commonUtils.intToPix)('1px')).to.equal('1px');
    });
  });
  describe('pixToInt', function () {
    it('should convert a string to an int', function () {
      (0, _chai.expect)((0, _commonUtils.pixToInt)('1px')).to.equal(1);
    });
    it('should convert a string to an int (2)', function () {
      (0, _chai.expect)((0, _commonUtils.pixToInt)('1 px')).to.equal(1);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jb21tb25VdGlscy50ZXN0LmpzIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiaXQiLCJ0byIsImVxdWFsIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUVBQSxRQUFRLENBQUMsY0FBRCxFQUFpQixZQUFXO0FBQ2xDQSxFQUFBQSxRQUFRLENBQUMsVUFBRCxFQUFhLFlBQVc7QUFDOUJDLElBQUFBLEVBQUUsQ0FBQyx5Q0FBRCxFQUE0QyxZQUFXO0FBQ3ZELHdCQUFPLDJCQUFTLENBQVQsQ0FBUCxFQUFvQkMsRUFBcEIsQ0FBdUJDLEtBQXZCLENBQTZCLEtBQTdCO0FBQ0QsS0FGQyxDQUFGO0FBR0FGLElBQUFBLEVBQUUsQ0FBQyw4Q0FBRCxFQUFpRCxZQUFXO0FBQzVELHdCQUFPLDJCQUFTLEtBQVQsQ0FBUCxFQUF3QkMsRUFBeEIsQ0FBMkJDLEtBQTNCLENBQWlDLEtBQWpDO0FBQ0QsS0FGQyxDQUFGO0FBR0QsR0FQTyxDQUFSO0FBUUFILEVBQUFBLFFBQVEsQ0FBQyxVQUFELEVBQWEsWUFBVztBQUM5QkMsSUFBQUEsRUFBRSxDQUFDLG1DQUFELEVBQXNDLFlBQVc7QUFDakQsd0JBQU8sMkJBQVMsS0FBVCxDQUFQLEVBQXdCQyxFQUF4QixDQUEyQkMsS0FBM0IsQ0FBaUMsQ0FBakM7QUFDRCxLQUZDLENBQUY7QUFHQUYsSUFBQUEsRUFBRSxDQUFDLHVDQUFELEVBQTBDLFlBQVc7QUFDckQsd0JBQU8sMkJBQVMsTUFBVCxDQUFQLEVBQXlCQyxFQUF6QixDQUE0QkMsS0FBNUIsQ0FBa0MsQ0FBbEM7QUFDRCxLQUZDLENBQUY7QUFHRCxHQVBPLENBQVI7QUFRRCxDQWpCTyxDQUFSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtleHBlY3R9IGZyb20gJ2NoYWknO1xyXG5cclxuaW1wb3J0IHtpbnRUb1BpeCwgcGl4VG9JbnR9IGZyb20gJy4vY29tbW9uVXRpbHMnO1xyXG5cclxuZGVzY3JpYmUoJ0NvbW1vbiBVdGlscycsIGZ1bmN0aW9uKCkge1xyXG4gIGRlc2NyaWJlKCdpbnRUb1BpeCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBjb252ZXJ0IGFuIGludCB0byBhIHBpeGVsIHN0cmluZycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBleHBlY3QoaW50VG9QaXgoMSkpLnRvLmVxdWFsKCcxcHgnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBsZWF2ZSBhbHJlYWR5IGNvbnZlcnRlZCBzdHJpbmdzIGFzIGlzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGV4cGVjdChpbnRUb1BpeCgnMXB4JykpLnRvLmVxdWFsKCcxcHgnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdwaXhUb0ludCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgaXQoJ3Nob3VsZCBjb252ZXJ0IGEgc3RyaW5nIHRvIGFuIGludCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBleHBlY3QocGl4VG9JbnQoJzFweCcpKS50by5lcXVhbCgxKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBjb252ZXJ0IGEgc3RyaW5nIHRvIGFuIGludCAoMiknLCBmdW5jdGlvbigpIHtcclxuICAgICAgZXhwZWN0KHBpeFRvSW50KCcxIHB4JykpLnRvLmVxdWFsKDEpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXX0=