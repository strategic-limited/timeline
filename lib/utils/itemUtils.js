'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowItemsRenderer = rowItemsRenderer;
exports.scrollItemRenderer = scrollItemRenderer;
exports.rowLayerRenderer = rowLayerRenderer;
exports.getNearestRowObject = getNearestRowObject;
exports.getRowObjectRowNumber = getRowObjectRowNumber;
exports.getVerticalMarginBorder = getVerticalMarginBorder;
exports.getTrueBottom = getTrueBottom;
exports.getNearestRowNumber = getNearestRowNumber;
exports.getMaxOverlappingItems = getMaxOverlappingItems;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _timebarConsts = require("../consts/timebarConsts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Render all items in a row
 * @external {moment} http://momentjs.com/
 * @param  {Object[]} items List of items to render for this row
 * @param  {moment} vis_start The visible start of the timeline
 * @param  {moment} vis_end The visible end of the timeline
 * @param  {number} total_width pixel width of the timeline
 */
function rowItemsRenderer(items, vis_start, vis_end, total_width, itemHeight, itemRenderer) {
  var selectedItems = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
  var isScroll = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var start_end_min = vis_end.diff(vis_start, 'ms');
  var pixels_per_min = total_width / start_end_min;

  var filtered_items = _lodash["default"].sortBy(_lodash["default"].filter(items, function (i) {
    // if end not before window && start not after window
    return !i.end.isBefore(vis_start) && !i.start.isAfter(vis_end);
  }), function (i) {
    return -i.start.unix();
  }); // sorted in reverse order as we iterate over the array backwards


  var displayItems = [];
  var rowOffset = 0;

  while (filtered_items.length > 0) {
    var lastEnd = null;

    for (var i = filtered_items.length - 1; i >= 0; i--) {
      if (lastEnd === null || filtered_items[i].start >= lastEnd) {
        var item = _lodash["default"].clone(filtered_items[i]);

        item.rowOffset = rowOffset;
        displayItems.push(item);
        filtered_items.splice(i, 1);
        lastEnd = item.end;
      }
    }

    rowOffset++;
  }

  return _lodash["default"].map(displayItems, function (i) {
    var color = i.color,
        isResizable = i.isResizable;
    var Comp = itemRenderer; // let top = itemHeight * i['rowOffset'];

    var top = 0;
    var item_offset_mins = i.start.diff(vis_start, 'ms');
    var item_duration_mins = i.end.diff(i.start, 'ms');
    var left = Math.round(item_offset_mins * pixels_per_min);
    var width = Math.round(item_duration_mins * pixels_per_min);
    var compClassnames = 'rct9k-items-inner';
    var outerClassnames = 'rct9k-items-outer item_draggable';
    var style = {
      backgroundColor: color
    };
    var isSelected = selectedItems.indexOf(Number(i.key)) > -1;

    if (isSelected) {
      compClassnames += ' rct9k-items-selected';
      outerClassnames += ' rct9k-items-outer-selected';

      if (isScroll) {
        outerClassnames += ' rct9k-items-outer-scroll';
      }

      style = {};
    }

    var resizable = isResizable !== undefined ? isResizable : true;
    return /*#__PURE__*/_react["default"].createElement("span", {
      key: i.key,
      "data-item-index": i.key,
      "data-is-resizable": resizable,
      className: outerClassnames,
      style: {
        left: left,
        width: width,
        top: top
      }
    }, !isScroll && /*#__PURE__*/_react["default"].createElement(Comp, {
      key: i.key,
      item: i,
      className: compClassnames,
      style: style
    }));
  });
}

function scrollItemRenderer(item, vis_start, vis_end, total_width, itemHeight, itemRenderer) {
  var start_end_min = vis_end.diff(vis_start, 'ms');
  var pixels_per_min = total_width / start_end_min;
  var color = item.color,
      isResizable = item.isResizable;
  var Comp = itemRenderer;
  var top = 0;
  var item_offset_mins = item.start.diff(vis_start, 'ms');
  var item_duration_mins = item.end.diff(item.start, 'ms');
  var left = Math.round(item_offset_mins * pixels_per_min);
  var width = Math.round(item_duration_mins * pixels_per_min);
  var compClassnames = 'rct9k-items-inner';
  var outerClassnames = 'rct9k-item-scroll';
  var resizable = isResizable !== undefined ? isResizable : true;
  return /*#__PURE__*/_react["default"].createElement("span", {
    key: item.key,
    "data-item-index": item.key,
    "data-is-resizable": resizable,
    className: outerClassnames,
    style: {
      left: left,
      width: width,
      top: top
    }
  });
}
/**
 * Render row layers
 * @param  {Object[]} layers List of layers to render for this row
 * @param  {moment} vis_start The visible start of the timeline
 * @param  {moment} vis_end The visible end of the timeline
 * @param  {number} total_width pixel width of the timeline
 * @param  {number} itemHeight The layer height in px
 */


function rowLayerRenderer(layers, vis_start, vis_end, total_width, itemHeight) {
  var start_end_min = vis_end.diff(vis_start, 'ms');
  var pixels_per_min = total_width / start_end_min;

  var filtered_items = _lodash["default"].sortBy(_lodash["default"].filter(layers, function (i) {
    return !i.end.isBefore(vis_start) && !i.start.isAfter(vis_end);
  }), function (i) {
    return -i.start.unix();
  }); // sorted in reverse order as we iterate over the array backwards


  var displayItems = [];
  var rowOffset = 0;

  while (filtered_items.length > 0) {
    var lastEnd = null;

    for (var i = filtered_items.length - 1; i >= 0; i--) {
      if (lastEnd === null || filtered_items[i].start >= lastEnd) {
        var item = _lodash["default"].clone(filtered_items[i]);

        item.rowOffset = rowOffset;
        displayItems.push(item);
        filtered_items.splice(i, 1);
        lastEnd = item.end;
      }
    }

    rowOffset++;
  }

  return _lodash["default"].map(displayItems, function (i) {
    var style = i.style,
        rowNumber = i.rowNumber;
    var top = itemHeight * i['rowOffset'];
    var item_offset_mins = i.start.diff(vis_start, 'ms');
    var item_duration_mins = i.end.diff(i.start, 'ms');
    var left = Math.round(item_offset_mins * pixels_per_min);
    var width = Math.round(item_duration_mins * pixels_per_min);
    var height = itemHeight - (rowNumber === 0 ? 2 : 1); // for border

    var outerClassnames = 'rct9k-row-layer';
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "r-".concat(rowNumber, "-").concat(i.start.unix()),
      "data-item-index": i.key,
      className: outerClassnames,
      style: _objectSpread(_objectSpread({}, style), {}, {
        left: left,
        width: width,
        top: top,
        height: height
      })
    });
  });
}
/**
 * Gets the row object for a given x and y pixel location
 * @param  {number} x The x coordinate of the pixel location
 * @param  {number} y The y coordinate of the pixel location
 * @param  {Object} topDiv Div to search under
 * @returns {Object} The row object at that coordinate
 */


function getNearestRowObject(x, y) {
  var topDiv = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  var elementsAtPixel = document.elementsFromPoint(x, y);
  return _lodash["default"].find(elementsAtPixel, function (e) {
    var inDiv = topDiv.contains(e);
    return inDiv && e.hasAttribute('data-row-index');
  });
}
/**
 * Gets the row number for a given row object
 * @param  {Object} elem The row object
 * @returns {number} The row number
 */


function getRowObjectRowNumber(elem) {
  return Number(elem ? elem.getAttribute('data-row-index') : 0);
}
/**
 * Gets the vertical margins and borders given an object
 * @param  {Object} elem The row object
 * @returns {number} the pixel position of the bottom of the element
 */


function getVerticalMarginBorder(elem) {
  var computedStyles = window.getComputedStyle(elem); // top margin plus bottom margin halved

  var rowMargins = (Math.ceil(parseFloat(computedStyles['marginTop']) + parseFloat(computedStyles['marginBottom'])) || 1) / 2; // half the size of the border seems important

  var rowBorders = (Math.ceil(parseFloat(computedStyles['borderTopWidth']) + parseFloat(computedStyles['borderBottomWidth'])) || 1) / 2;
  return Number(rowMargins + rowBorders);
}
/**
 * Gets the true bottom location given an object
 * @param  {Object} elem an element
 * @returns {number} the pixel position of the bottom of the element
 */


function getTrueBottom(elem) {
  /*
  @bendog: leaving this here as a helper, if there's ever a bug around inner items size
  // get object shape
  const rects = elem.getClientRects();
  const bottom = Math.max(Object.values(rects).map(o => o.bottom), 0);
   */
  // calculate the true bottom
  var bound = elem.getBoundingClientRect();
  var bottom = Math.floor(bound.top + bound.height);
  return Number(bottom);
}
/**
 * Gets the row number for a given x and y pixel location
 * @param  {number} x The x coordinate of the pixel location
 * @param  {number} y The y coordinate of the pixel location
 * @param  {Object} topDiv Div to search under
 * @returns {number} The row number
 */


function getNearestRowNumber(x, y) {
  var topDiv = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  var currentRowNo = arguments.length > 3 ? arguments[3] : undefined;
  var elementsAtPixel = document.elementsFromPoint(x, y);

  var targetRow = _lodash["default"].find(elementsAtPixel, function (e) {
    var inDiv = topDiv.contains(e);
    return inDiv && e.hasAttribute('data-row-index');
  });

  if (targetRow) {
    return targetRow.getAttribute('data-row-index');
  } else if (currentRowNo && !targetRow) {
    return currentRowNo;
  } else {
    return 0;
  }
}
/**
 * Use to find the height of a row, given a set of items
 * @param  {Object[]} items List of items
 * @returns {number} Max row height
 */


function getMaxOverlappingItems(items) {
  var max = 0;

  var sorted_items = _lodash["default"].sortBy(items, function (i) {
    return -i.start.unix();
  });

  while (sorted_items.length > 0) {
    var lastEnd = null;

    for (var i = sorted_items.length - 1; i >= 0; i--) {
      if (lastEnd === null || sorted_items[i].start >= lastEnd) {
        lastEnd = sorted_items[i].end;
        sorted_items.splice(i, 1);
      }
    }

    max++;
  }

  return Math.max(max, 1);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9pdGVtVXRpbHMuanMiXSwibmFtZXMiOlsicm93SXRlbXNSZW5kZXJlciIsIml0ZW1zIiwidmlzX3N0YXJ0IiwidmlzX2VuZCIsInRvdGFsX3dpZHRoIiwiaXRlbUhlaWdodCIsIml0ZW1SZW5kZXJlciIsInNlbGVjdGVkSXRlbXMiLCJpc1Njcm9sbCIsInN0YXJ0X2VuZF9taW4iLCJkaWZmIiwicGl4ZWxzX3Blcl9taW4iLCJmaWx0ZXJlZF9pdGVtcyIsIl8iLCJzb3J0QnkiLCJmaWx0ZXIiLCJpIiwiZW5kIiwiaXNCZWZvcmUiLCJzdGFydCIsImlzQWZ0ZXIiLCJ1bml4IiwiZGlzcGxheUl0ZW1zIiwicm93T2Zmc2V0IiwibGVuZ3RoIiwibGFzdEVuZCIsIml0ZW0iLCJjbG9uZSIsInB1c2giLCJzcGxpY2UiLCJtYXAiLCJjb2xvciIsImlzUmVzaXphYmxlIiwiQ29tcCIsInRvcCIsIml0ZW1fb2Zmc2V0X21pbnMiLCJpdGVtX2R1cmF0aW9uX21pbnMiLCJsZWZ0IiwiTWF0aCIsInJvdW5kIiwid2lkdGgiLCJjb21wQ2xhc3NuYW1lcyIsIm91dGVyQ2xhc3NuYW1lcyIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiaXNTZWxlY3RlZCIsImluZGV4T2YiLCJOdW1iZXIiLCJrZXkiLCJyZXNpemFibGUiLCJ1bmRlZmluZWQiLCJzY3JvbGxJdGVtUmVuZGVyZXIiLCJyb3dMYXllclJlbmRlcmVyIiwibGF5ZXJzIiwicm93TnVtYmVyIiwiaGVpZ2h0IiwiZ2V0TmVhcmVzdFJvd09iamVjdCIsIngiLCJ5IiwidG9wRGl2IiwiZG9jdW1lbnQiLCJlbGVtZW50c0F0UGl4ZWwiLCJlbGVtZW50c0Zyb21Qb2ludCIsImZpbmQiLCJlIiwiaW5EaXYiLCJjb250YWlucyIsImhhc0F0dHJpYnV0ZSIsImdldFJvd09iamVjdFJvd051bWJlciIsImVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJnZXRWZXJ0aWNhbE1hcmdpbkJvcmRlciIsImNvbXB1dGVkU3R5bGVzIiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInJvd01hcmdpbnMiLCJjZWlsIiwicGFyc2VGbG9hdCIsInJvd0JvcmRlcnMiLCJnZXRUcnVlQm90dG9tIiwiYm91bmQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3R0b20iLCJmbG9vciIsImdldE5lYXJlc3RSb3dOdW1iZXIiLCJjdXJyZW50Um93Tm8iLCJ0YXJnZXRSb3ciLCJnZXRNYXhPdmVybGFwcGluZ0l0ZW1zIiwibWF4Iiwic29ydGVkX2l0ZW1zIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU0EsZ0JBQVQsQ0FBMEJDLEtBQTFCLEVBQWlDQyxTQUFqQyxFQUE0Q0MsT0FBNUMsRUFBcURDLFdBQXJELEVBQWtFQyxVQUFsRSxFQUE4RUMsWUFBOUUsRUFBa0k7QUFBQSxNQUF0Q0MsYUFBc0MsdUVBQXRCLEVBQXNCO0FBQUEsTUFBbEJDLFFBQWtCLHVFQUFQLEtBQU87QUFDdkksTUFBTUMsYUFBYSxHQUFHTixPQUFPLENBQUNPLElBQVIsQ0FBYVIsU0FBYixFQUF3QixJQUF4QixDQUF0QjtBQUNBLE1BQU1TLGNBQWMsR0FBR1AsV0FBVyxHQUFHSyxhQUFyQzs7QUFDQSxNQUFJRyxjQUFjLEdBQUdDLG1CQUFFQyxNQUFGLENBQ25CRCxtQkFBRUUsTUFBRixDQUFTZCxLQUFULEVBQWdCLFVBQUFlLENBQUMsRUFBSTtBQUNuQjtBQUNBLFdBQU8sQ0FBQ0EsQ0FBQyxDQUFDQyxHQUFGLENBQU1DLFFBQU4sQ0FBZWhCLFNBQWYsQ0FBRCxJQUE4QixDQUFDYyxDQUFDLENBQUNHLEtBQUYsQ0FBUUMsT0FBUixDQUFnQmpCLE9BQWhCLENBQXRDO0FBQ0QsR0FIRCxDQURtQixFQUtuQixVQUFBYSxDQUFDO0FBQUEsV0FBSSxDQUFDQSxDQUFDLENBQUNHLEtBQUYsQ0FBUUUs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WSxHQUFHNUUsbUJBQUVDLE1BQUYsQ0FBU2IsS0FBVCxFQUFnQixVQUFBZSxDQUFDO0FBQUEsV0FBSSxDQUFDQSxDQUFDLENBQUNHLEtBQUYsQ0FBUUUsSUFBUixFQUFMO0FBQUEsR0FBakIsQ0FBbkI7O0FBRUEsU0FBT29FLFlBQVksQ0FBQ2pFLE1BQWIsR0FBc0IsQ0FBN0IsRUFBZ0M7QUFDOUIsUUFBSUMsT0FBTyxHQUFHLElBQWQ7O0FBQ0EsU0FBSyxJQUFJVCxDQUFDLEdBQUd5RSxZQUFZLENBQUNqRSxNQUFiLEdBQXNCLENBQW5DLEVBQXNDUixDQUFDLElBQUksQ0FBM0MsRUFBOENBLENBQUMsRUFBL0MsRUFBbUQ7QUFDakQsVUFBSVMsT0FBTyxLQUFLLElBQVosSUFBb0JnRSxZQUFZLENBQUN6RSxDQUFELENBQVosQ0FBZ0JHLEtBQWhCLElBQXlCTSxPQUFqRCxFQUEwRDtBQUN4REEsUUFBQUEsT0FBTyxHQUFHZ0UsWUFBWSxDQUFDekUsQ0FBRCxDQUFaLENBQWdCQyxHQUExQjtBQUNBd0UsUUFBQUEsWUFBWSxDQUFDNUQsTUFBYixDQUFvQmIsQ0FBcEIsRUFBdUIsQ0FBdkI7QUFDRDtBQUNGOztBQUNEd0UsSUFBQUEsR0FBRztBQUNKOztBQUNELFNBQU9sRCxJQUFJLENBQUNrRCxHQUFMLENBQVNBLEdBQVQsRUFBYyxDQUFkLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgbWluRWxlbWVudER1cmF0aW9uIH0gZnJvbSAnLi4vY29uc3RzL3RpbWViYXJDb25zdHMnO1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlciBhbGwgaXRlbXMgaW4gYSByb3dcclxuICogQGV4dGVybmFsIHttb21lbnR9IGh0dHA6Ly9tb21lbnRqcy5jb20vXHJcbiAqIEBwYXJhbSAge09iamVjdFtdfSBpdGVtcyBMaXN0IG9mIGl0ZW1zIHRvIHJlbmRlciBmb3IgdGhpcyByb3dcclxuICogQHBhcmFtICB7bW9tZW50fSB2aXNfc3RhcnQgVGhlIHZpc2libGUgc3RhcnQgb2YgdGhlIHRpbWVsaW5lXHJcbiAqIEBwYXJhbSAge21vbWVudH0gdmlzX2VuZCBUaGUgdmlzaWJsZSBlbmQgb2YgdGhlIHRpbWVsaW5lXHJcbiAqIEBwYXJhbSAge251bWJlcn0gdG90YWxfd2lkdGggcGl4ZWwgd2lkdGggb2YgdGhlIHRpbWVsaW5lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcm93SXRlbXNSZW5kZXJlcihpdGVtcywgdmlzX3N0YXJ0LCB2aXNfZW5kLCB0b3RhbF93aWR0aCwgaXRlbUhlaWdodCwgaXRlbVJlbmRlcmVyLCBzZWxlY3RlZEl0ZW1zID0gW10sIGlzU2Nyb2xsID0gZmFsc2UpIHtcclxuICBjb25zdCBzdGFydF9lbmRfbWluID0gdmlzX2VuZC5kaWZmKHZpc19zdGFydCwgJ21zJyk7XHJcbiAgY29uc3QgcGl4ZWxzX3Blcl9taW4gPSB0b3RhbF93aWR0aCAvIHN0YXJ0X2VuZF9taW47XHJcbiAgbGV0IGZpbHRlcmVkX2l0ZW1zID0gXy5zb3J0QnkoXHJcbiAgICBfLmZpbHRlcihpdGVtcywgaSA9PiB7XHJcbiAgICAgIC8vIGlmIGVuZCBub3QgYmVmb3JlIHdpbmRvdyAmJiBzdGFydCBub3QgYWZ0ZXIgd2luZG93XHJcbiAgICAgIHJldHVybiAhaS5lbmQuaXNCZWZvcmUodmlzX3N0YXJ0KSAmJiAhaS5zdGFydC5pc0FmdGVyKHZpc19lbmQpO1xyXG4gICAgfSksXHJcbiAgICBpID0+IC1pLnN0YXJ0LnVuaXgoKVxyXG4gICk7IC8vIHNvcnRlZCBpbiByZXZlcnNlIG9yZGVyIGFzIHdlIGl0ZXJhdGUgb3ZlciB0aGUgYXJyYXkgYmFja3dhcmRzXHJcbiAgbGV0IGRpc3BsYXlJdGVtcyA9IFtdO1xyXG4gIGxldCByb3dPZmZzZXQgPSAwO1xyXG4gIHdoaWxlIChmaWx0ZXJlZF9pdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICBsZXQgbGFzdEVuZCA9IG51bGw7XHJcbiAgICBmb3IgKGxldCBpID0gZmlsdGVyZWRfaXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgaWYgKGxhc3RFbmQgPT09IG51bGwgfHwgZmlsdGVyZWRfaXRlbXNbaV0uc3RhcnQgPj0gbGFzdEVuZCkge1xyXG4gICAgICAgIGxldCBpdGVtID0gXy5jbG9uZShmaWx0ZXJlZF9pdGVtc1tpXSk7XHJcbiAgICAgICAgaXRlbS5yb3dPZmZzZXQgPSByb3dPZmZzZXQ7XHJcbiAgICAgICAgZGlzcGxheUl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgZmlsdGVyZWRfaXRlbXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIGxhc3RFbmQgPSBpdGVtLmVuZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcm93T2Zmc2V0Kys7XHJcbiAgfVxyXG4gIHJldHVybiBfLm1hcChkaXNwbGF5SXRlbXMsIGkgPT4ge1xyXG4gICAgY29uc3Qge2NvbG9yLCBpc1Jlc2l6YWJsZX0gPSBpO1xyXG4gICAgY29uc3QgQ29tcCA9IGl0ZW1SZW5kZXJlcjtcclxuICAgIC8vIGxldCB0b3AgPSBpdGVtSGVpZ2h0ICogaVsncm93T2Zmc2V0J107XHJcbiAgICBsZXQgdG9wID0gMDtcclxuICAgIGxldCBpdGVtX29mZnNldF9taW5zID0gaS5zdGFydC5kaWZmKHZpc19zdGFydCwgJ21zJyk7XHJcbiAgICBsZXQgaXRlbV9kdXJhdGlvbl9taW5zID0gaS5lbmQuZGlmZihpLnN0YXJ0LCAnbXMnKTtcclxuICAgIGxldCBsZWZ0ID0gTWF0aC5yb3VuZChpdGVtX29mZnNldF9taW5zICogcGl4ZWxzX3Blcl9taW4pO1xyXG4gICAgbGV0IHdpZHRoID0gTWF0aC5yb3VuZChpdGVtX2R1cmF0aW9uX21pbnMgKiBwaXhlbHNfcGVyX21pbik7XHJcbiAgICBsZXQgY29tcENsYXNzbmFtZXMgPSAncmN0OWstaXRlbXMtaW5uZXInO1xyXG4gICAgbGV0IG91dGVyQ2xhc3NuYW1lcyA9ICdyY3Q5ay1pdGVtcy1vdXRlciBpdGVtX2RyYWdnYWJsZSc7XHJcbiAgICBsZXQgc3R5bGUgPSB7YmFja2dyb3VuZENvbG9yOiBjb2xvcn07XHJcbiAgICBsZXQgaXNTZWxlY3RlZCA9IHNlbGVjdGVkSXRlbXMuaW5kZXhPZihOdW1iZXIoaS5rZXkpKSA+IC0xO1xyXG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcclxuICAgICAgY29tcENsYXNzbmFtZXMgKz0gJyByY3Q5ay1pdGVtcy1zZWxlY3RlZCc7XHJcbiAgICAgIG91dGVyQ2xhc3NuYW1lcyArPSAnIHJjdDlrLWl0ZW1zLW91dGVyLXNlbGVjdGVkJztcclxuICAgICAgaWYgKGlzU2Nyb2xsKSB7XHJcbiAgICAgICAgb3V0ZXJDbGFzc25hbWVzICs9ICcgcmN0OWstaXRlbXMtb3V0ZXItc2Nyb2xsJztcclxuICAgICAgfVxyXG4gICAgICBzdHlsZSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc2l6YWJsZSA9IGlzUmVzaXphYmxlICE9PSB1bmRlZmluZWQgPyBpc1Jlc2l6YWJsZSA6IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNwYW5cclxuICAgICAgICBrZXk9e2kua2V5fVxyXG4gICAgICAgIGRhdGEtaXRlbS1pbmRleD17aS5rZXl9XHJcbiAgICAgICAgZGF0YS1pcy1yZXNpemFibGU9e3Jlc2l6YWJsZX1cclxuICAgICAgICBjbGFzc05hbWU9e291dGVyQ2xhc3NuYW1lc31cclxuICAgICAgICBzdHlsZT17e2xlZnQsIHdpZHRoLCB0b3B9fT5cclxuICAgICAgICB7IWlzU2Nyb2xsICYmIDxDb21wIGtleT17aS5rZXl9IGl0ZW09e2l9IGNsYXNzTmFtZT17Y29tcENsYXNzbmFtZXN9IHN0eWxlPXtzdHlsZX0gLz59XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxJdGVtUmVuZGVyZXIoaXRlbSwgdmlzX3N0YXJ0LCB2aXNfZW5kLCB0b3RhbF93aWR0aCwgaXRlbUhlaWdodCwgaXRlbVJlbmRlcmVyKSB7XHJcbiAgY29uc3Qgc3RhcnRfZW5kX21pbiA9IHZpc19lbmQuZGlmZih2aXNfc3RhcnQsICdtcycpO1xyXG4gIGNvbnN0IHBpeGVsc19wZXJfbWluID0gdG90YWxfd2lkdGggLyBzdGFydF9lbmRfbWluO1xyXG5cclxuICBjb25zdCB7Y29sb3IsIGlzUmVzaXphYmxlfSA9IGl0ZW07XHJcbiAgY29uc3QgQ29tcCA9IGl0ZW1SZW5kZXJlcjtcclxuICBsZXQgdG9wID0gMDtcclxuICBsZXQgaXRlbV9vZmZzZXRfbWlucyA9IGl0ZW0uc3RhcnQuZGlmZih2aXNfc3RhcnQsICdtcycpO1xyXG4gIGxldCBpdGVtX2R1cmF0aW9uX21pbnMgPSBpdGVtLmVuZC5kaWZmKGl0ZW0uc3RhcnQsICdtcycpO1xyXG4gIGxldCBsZWZ0ID0gTWF0aC5yb3VuZChpdGVtX29mZnNldF9taW5zICogcGl4ZWxzX3Blcl9taW4pO1xyXG4gIGxldCB3aWR0aCA9IE1hdGgucm91bmQoaXRlbV9kdXJhdGlvbl9taW5zICogcGl4ZWxzX3Blcl9taW4pO1xyXG4gIGxldCBjb21wQ2xhc3NuYW1lcyA9ICdyY3Q5ay1pdGVtcy1pbm5lcic7XHJcbiAgbGV0IG91dGVyQ2xhc3NuYW1lcyA9ICdyY3Q5ay1pdGVtLXNjcm9sbCc7XHJcblxyXG4gIGNvbnN0IHJlc2l6YWJsZSA9IGlzUmVzaXphYmxlICE9PSB1bmRlZmluZWQgPyBpc1Jlc2l6YWJsZSA6IHRydWU7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c3BhblxyXG4gICAgICBrZXk9e2l0ZW0ua2V5fVxyXG4gICAgICBkYXRhLWl0ZW0taW5kZXg9e2l0ZW0ua2V5fVxyXG4gICAgICBkYXRhLWlzLXJlc2l6YWJsZT17cmVzaXphYmxlfVxyXG4gICAgICBjbGFzc05hbWU9e291dGVyQ2xhc3NuYW1lc31cclxuICAgICAgc3R5bGU9e3tsZWZ0LCB3aWR0aCwgdG9wfX0+XHJcbiAgICAgIDwvc3Bhbj5cclxuICApO1xyXG59XHJcblxyXG4vKipcclxuICogUmVuZGVyIHJvdyBsYXllcnNcclxuICogQHBhcmFtICB7T2JqZWN0W119IGxheWVycyBMaXN0IG9mIGxheWVycyB0byByZW5kZXIgZm9yIHRoaXMgcm93XHJcbiAqIEBwYXJhbSAge21vbWVudH0gdmlzX3N0YXJ0IFRoZSB2aXNpYmxlIHN0YXJ0IG9mIHRoZSB0aW1lbGluZVxyXG4gKiBAcGFyYW0gIHttb21lbnR9IHZpc19lbmQgVGhlIHZpc2libGUgZW5kIG9mIHRoZSB0aW1lbGluZVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHRvdGFsX3dpZHRoIHBpeGVsIHdpZHRoIG9mIHRoZSB0aW1lbGluZVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGl0ZW1IZWlnaHQgVGhlIGxheWVyIGhlaWdodCBpbiBweFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJvd0xheWVyUmVuZGVyZXIobGF5ZXJzLCB2aXNfc3RhcnQsIHZpc19lbmQsIHRvdGFsX3dpZHRoLCBpdGVtSGVpZ2h0KSB7XHJcbiAgY29uc3Qgc3RhcnRfZW5kX21pbiA9IHZpc19lbmQuZGlmZih2aXNfc3RhcnQsICdtcycpO1xyXG4gIGNvbnN0IHBpeGVsc19wZXJfbWluID0gdG90YWxfd2lkdGggLyBzdGFydF9lbmRfbWluO1xyXG4gIGxldCBmaWx0ZXJlZF9pdGVtcyA9IF8uc29ydEJ5KFxyXG4gICAgXy5maWx0ZXIobGF5ZXJzLCBpID0+IHtcclxuICAgICAgcmV0dXJuICFpLmVuZC5pc0JlZm9yZSh2aXNfc3RhcnQpICYmICFpLnN0YXJ0LmlzQWZ0ZXIodmlzX2VuZCk7XHJcbiAgICB9KSxcclxuICAgIGkgPT4gLWkuc3RhcnQudW5peCgpXHJcbiAgKTsgLy8gc29ydGVkIGluIHJldmVyc2Ugb3JkZXIgYXMgd2UgaXRlcmF0ZSBvdmVyIHRoZSBhcnJheSBiYWNrd2FyZHNcclxuICBsZXQgZGlzcGxheUl0ZW1zID0gW107XHJcbiAgbGV0IHJvd09mZnNldCA9IDA7XHJcbiAgd2hpbGUgKGZpbHRlcmVkX2l0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgIGxldCBsYXN0RW5kID0gbnVsbDtcclxuICAgIGZvciAobGV0IGkgPSBmaWx0ZXJlZF9pdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBpZiAobGFzdEVuZCA9PT0gbnVsbCB8fCBmaWx0ZXJlZF9pdGVtc1tpXS5zdGFydCA+PSBsYXN0RW5kKSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBfLmNsb25lKGZpbHRlcmVkX2l0ZW1zW2ldKTtcclxuICAgICAgICBpdGVtLnJvd09mZnNldCA9IHJvd09mZnNldDtcclxuICAgICAgICBkaXNwbGF5SXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICBmaWx0ZXJlZF9pdGVtcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgbGFzdEVuZCA9IGl0ZW0uZW5kO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByb3dPZmZzZXQrKztcclxuICB9XHJcbiAgcmV0dXJuIF8ubWFwKGRpc3BsYXlJdGVtcywgaSA9PiB7XHJcbiAgICBjb25zdCB7c3R5bGUsIHJvd051bWJlcn0gPSBpO1xyXG4gICAgbGV0IHRvcCA9IGl0ZW1IZWlnaHQgKiBpWydyb3dPZmZzZXQnXTtcclxuICAgIGxldCBpdGVtX29mZnNldF9taW5zID0gaS5zdGFydC5kaWZmKHZpc19zdGFydCwgJ21zJyk7XHJcbiAgICBsZXQgaXRlbV9kdXJhdGlvbl9taW5zID0gaS5lbmQuZGlmZihpLnN0YXJ0LCAnbXMnKTtcclxuICAgIGxldCBsZWZ0ID0gTWF0aC5yb3VuZChpdGVtX29mZnNldF9taW5zICogcGl4ZWxzX3Blcl9taW4pO1xyXG4gICAgbGV0IHdpZHRoID0gTWF0aC5yb3VuZChpdGVtX2R1cmF0aW9uX21pbnMgKiBwaXhlbHNfcGVyX21pbik7XHJcbiAgICBsZXQgaGVpZ2h0ID0gaXRlbUhlaWdodCAtIChyb3dOdW1iZXIgPT09IDAgPyAyIDogMSk7IC8vIGZvciBib3JkZXJcclxuICAgIGxldCBvdXRlckNsYXNzbmFtZXMgPSAncmN0OWstcm93LWxheWVyJztcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAga2V5PXtgci0ke3Jvd051bWJlcn0tJHtpLnN0YXJ0LnVuaXgoKX1gfVxyXG4gICAgICAgIGRhdGEtaXRlbS1pbmRleD17aS5rZXl9XHJcbiAgICAgICAgY2xhc3NOYW1lPXtvdXRlckNsYXNzbmFtZXN9XHJcbiAgICAgICAgc3R5bGU9e3suLi5zdHlsZSwgbGVmdCwgd2lkdGgsIHRvcCwgaGVpZ2h0fX1cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSByb3cgb2JqZWN0IGZvciBhIGdpdmVuIHggYW5kIHkgcGl4ZWwgbG9jYXRpb25cclxuICogQHBhcmFtICB7bnVtYmVyfSB4IFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIHBpeGVsIGxvY2F0aW9uXHJcbiAqIEBwYXJhbSAge251bWJlcn0geSBUaGUgeSBjb29yZGluYXRlIG9mIHRoZSBwaXhlbCBsb2NhdGlvblxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IHRvcERpdiBEaXYgdG8gc2VhcmNoIHVuZGVyXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByb3cgb2JqZWN0IGF0IHRoYXQgY29vcmRpbmF0ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5lYXJlc3RSb3dPYmplY3QoeCwgeSwgdG9wRGl2ID0gZG9jdW1lbnQpIHtcclxuICBsZXQgZWxlbWVudHNBdFBpeGVsID0gZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoeCwgeSk7XHJcbiAgcmV0dXJuIF8uZmluZChlbGVtZW50c0F0UGl4ZWwsIGUgPT4ge1xyXG4gICAgY29uc3QgaW5EaXYgPSB0b3BEaXYuY29udGFpbnMoZSk7XHJcbiAgICByZXR1cm4gaW5EaXYgJiYgZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtcm93LWluZGV4Jyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSByb3cgbnVtYmVyIGZvciBhIGdpdmVuIHJvdyBvYmplY3RcclxuICogQHBhcmFtICB7T2JqZWN0fSBlbGVtIFRoZSByb3cgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSByb3cgbnVtYmVyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um93T2JqZWN0Um93TnVtYmVyKGVsZW0pIHtcclxuICByZXR1cm4gTnVtYmVyKGVsZW0gPyBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1yb3ctaW5kZXgnKSA6IDApO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgdmVydGljYWwgbWFyZ2lucyBhbmQgYm9yZGVycyBnaXZlbiBhbiBvYmplY3RcclxuICogQHBhcmFtICB7T2JqZWN0fSBlbGVtIFRoZSByb3cgb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBwaXhlbCBwb3NpdGlvbiBvZiB0aGUgYm90dG9tIG9mIHRoZSBlbGVtZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmVydGljYWxNYXJnaW5Cb3JkZXIoZWxlbSkge1xyXG4gIGNvbnN0IGNvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSk7XHJcbiAgLy8gdG9wIG1hcmdpbiBwbHVzIGJvdHRvbSBtYXJnaW4gaGFsdmVkXHJcbiAgY29uc3Qgcm93TWFyZ2lucyA9XHJcbiAgICAoTWF0aC5jZWlsKHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZXNbJ21hcmdpblRvcCddKSArIHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZXNbJ21hcmdpbkJvdHRvbSddKSkgfHwgMSkgLyAyO1xyXG4gIC8vIGhhbGYgdGhlIHNpemUgb2YgdGhlIGJvcmRlciBzZWVtcyBpbXBvcnRhbnRcclxuICBjb25zdCByb3dCb3JkZXJzID1cclxuICAgIChNYXRoLmNlaWwocGFyc2VGbG9hdChjb21wdXRlZFN0eWxlc1snYm9yZGVyVG9wV2lkdGgnXSkgKyBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGVzWydib3JkZXJCb3R0b21XaWR0aCddKSkgfHwgMSkgL1xyXG4gICAgMjtcclxuICByZXR1cm4gTnVtYmVyKHJvd01hcmdpbnMgKyByb3dCb3JkZXJzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHRydWUgYm90dG9tIGxvY2F0aW9uIGdpdmVuIGFuIG9iamVjdFxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IGVsZW0gYW4gZWxlbWVudFxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgcGl4ZWwgcG9zaXRpb24gb2YgdGhlIGJvdHRvbSBvZiB0aGUgZWxlbWVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRydWVCb3R0b20oZWxlbSkge1xyXG4gIC8qXHJcbiAgQGJlbmRvZzogbGVhdmluZyB0aGlzIGhlcmUgYXMgYSBoZWxwZXIsIGlmIHRoZXJlJ3MgZXZlciBhIGJ1ZyBhcm91bmQgaW5uZXIgaXRlbXMgc2l6ZVxyXG4gIC8vIGdldCBvYmplY3Qgc2hhcGVcclxuICBjb25zdCByZWN0cyA9IGVsZW0uZ2V0Q2xpZW50UmVjdHMoKTtcclxuICBjb25zdCBib3R0b20gPSBNYXRoLm1heChPYmplY3QudmFsdWVzKHJlY3RzKS5tYXAobyA9PiBvLmJvdHRvbSksIDApO1xyXG4gICAqL1xyXG4gIC8vIGNhbGN1bGF0ZSB0aGUgdHJ1ZSBib3R0b21cclxuICBjb25zdCBib3VuZCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgY29uc3QgYm90dG9tID0gTWF0aC5mbG9vcihib3VuZC50b3AgKyBib3VuZC5oZWlnaHQpO1xyXG4gIHJldHVybiBOdW1iZXIoYm90dG9tKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHJvdyBudW1iZXIgZm9yIGEgZ2l2ZW4geCBhbmQgeSBwaXhlbCBsb2NhdGlvblxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHggVGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgcGl4ZWwgbG9jYXRpb25cclxuICogQHBhcmFtICB7bnVtYmVyfSB5IFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIHBpeGVsIGxvY2F0aW9uXHJcbiAqIEBwYXJhbSAge09iamVjdH0gdG9wRGl2IERpdiB0byBzZWFyY2ggdW5kZXJcclxuICogQHJldHVybnMge251bWJlcn0gVGhlIHJvdyBudW1iZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXROZWFyZXN0Um93TnVtYmVyKHgsIHksIHRvcERpdiA9IGRvY3VtZW50LCBjdXJyZW50Um93Tm8pIHtcclxuICBsZXQgZWxlbWVudHNBdFBpeGVsID0gZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoeCwgeSk7XHJcbiAgbGV0IHRhcmdldFJvdyA9IF8uZmluZChlbGVtZW50c0F0UGl4ZWwsIGUgPT4ge1xyXG4gICAgY29uc3QgaW5EaXYgPSB0b3BEaXYuY29udGFpbnMoZSk7XHJcbiAgICByZXR1cm4gaW5EaXYgJiYgZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtcm93LWluZGV4Jyk7XHJcbiAgfSk7XHJcblxyXG4gIGlmICh0YXJnZXRSb3cpIHtcclxuICAgIHJldHVybiB0YXJnZXRSb3cuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdy1pbmRleCcpO1xyXG4gIH0gZWxzZSBpZiAoY3VycmVudFJvd05vICYmICF0YXJnZXRSb3cpIHtcclxuICAgIHJldHVybiBjdXJyZW50Um93Tm87XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBmaW5kIHRoZSBoZWlnaHQgb2YgYSByb3csIGdpdmVuIGEgc2V0IG9mIGl0ZW1zXHJcbiAqIEBwYXJhbSAge09iamVjdFtdfSBpdGVtcyBMaXN0IG9mIGl0ZW1zXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE1heCByb3cgaGVpZ2h0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF4T3ZlcmxhcHBpbmdJdGVtcyhpdGVtcykge1xyXG4gIGxldCBtYXggPSAwO1xyXG4gIGxldCBzb3J0ZWRfaXRlbXMgPSBfLnNvcnRCeShpdGVtcywgaSA9PiAtaS5zdGFydC51bml4KCkpO1xyXG5cclxuICB3aGlsZSAoc29ydGVkX2l0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgIGxldCBsYXN0RW5kID0gbnVsbDtcclxuICAgIGZvciAobGV0IGkgPSBzb3J0ZWRfaXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgaWYgKGxhc3RFbmQgPT09IG51bGwgfHwgc29ydGVkX2l0ZW1zW2ldLnN0YXJ0ID49IGxhc3RFbmQpIHtcclxuICAgICAgICBsYXN0RW5kID0gc29ydGVkX2l0ZW1zW2ldLmVuZDtcclxuICAgICAgICBzb3J0ZWRfaXRlbXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBtYXgrKztcclxuICB9XHJcbiAgcmV0dXJuIE1hdGgubWF4KG1heCwgMSk7XHJcbn1cclxuIl19