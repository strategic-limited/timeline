'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowItemsRenderer = rowItemsRenderer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9pdGVtVXRpbHMuanMiXSwibmFtZXMiOlsicm93SXRlbXNSZW5kZXJlciIsIml0ZW1zIiwidmlzX3N0YXJ0IiwidmlzX2VuZCIsInRvdGFsX3dpZHRoIiwiaXRlbUhlaWdodCIsIml0ZW1SZW5kZXJlciIsInNlbGVjdGVkSXRlbXMiLCJpc1Njcm9sbCIsInN0YXJ0X2VuZF9taW4iLCJkaWZmIiwicGl4ZWxzX3Blcl9taW4iLCJmaWx0ZXJlZF9pdGVtcyIsIl8iLCJzb3J0QnkiLCJmaWx0ZXIiLCJpIiwiZW5kIiwiaXNCZWZvcmUiLCJzdGFydCIsImlzQWZ0ZXIiLCJ1bml4IiwiZGlzcGxheUl0ZW1zIiwicm93T2Zmc2V0IiwibGVuZ3RoIiwibGFzdEVuZCIsIml0ZW0iLCJjbG9uZSIsInB1c2giLCJzcGxpY2UiLCJtYXAiLCJjb2xvciIsImlzUmVzaXphYmxlIiwiQ29tcCIsInRvcCIsIml0ZW1fb2Zmc2V0X21pbnMiLCJpdGVtX2R1cmF0aW9uX21pbnMiLCJsZWZ0IiwiTWF0aCIsInJvdW5kIiwid2lkdGgiLCJjb21wQ2xhc3NuYW1lcyIsIm91dGVyQ2xhc3NuYW1lcyIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiaXNTZWxlY3RlZCIsImluZGV4T2YiLCJOdW1iZXIiLCJrZXkiLCJyZXNpemFibGUiLCJ1bmRlZmluZWQiLCJyb3dMYXllclJlbmRlcmVyIiwibGF5ZXJzIiwicm93TnVtYmVyIiwiaGVpZ2h0IiwiZ2V0TmVhcmVzdFJvd09iamVjdCIsIngiLCJ5IiwidG9wRGl2IiwiZG9jdW1lbnQiLCJlbGVtZW50c0F0UGl4ZWwiLCJlbGVtZW50c0Zyb21Qb2ludCIsImZpbmQiLCJlIiwiaW5EaXYiLCJjb250YWlucyIsImhhc0F0dHJpYnV0ZSIsImdldFJvd09iamVjdFJvd051bWJlciIsImVsZW0iLCJnZXRBdHRyaWJ1dGUiLCJnZXRWZXJ0aWNhbE1hcmdpbkJvcmRlciIsImNvbXB1dGVkU3R5bGVzIiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInJvd01hcmdpbnMiLCJjZWlsIiwicGFyc2VGbG9hdCIsInJvd0JvcmRlcnMiLCJnZXRUcnVlQm90dG9tIiwiYm91bmQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3R0b20iLCJmbG9vciIsImdldE5lYXJlc3RSb3dOdW1iZXIiLCJjdXJyZW50Um93Tm8iLCJ0YXJnZXRSb3ciLCJnZXRNYXhPdmVybGFwcGluZ0l0ZW1zIiwibWF4Iiwic29ydGVkX2l0ZW1zIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTQSxnQkFBVCxDQUNMQyxLQURLLEVBRUxDLFNBRkssRUFHTEMsT0FISyxFQUlMQyxXQUpLLEVBS0xDLFVBTEssRUFNTEMsWUFOSyxFQVNMO0FBQUEsTUFGQUMsYUFFQSx1RUFGZ0IsRUFFaEI7QUFBQSxNQURBQyxRQUNBLHVFQURXLEtBQ1g7QUFDQSxNQUFNQyxhQUFhLEdBQUdOLE9BQU8sQ0FBQ08sSUFBUixDQUFhUixTQUFiLEVBQXdCLElBQXhCLENBQXRCO0FBQ0EsTUFBTVMsY0FBYyxHQUFHUCxXQUFXLEdBQUdLLGFBQXJDOztBQUNBLE1BQUlHLGNBQWMsR0FBR0MsbUJBQUVDLE1BQUYsQ0FDbkJELG1CQUFFRSxNQUFGLENBQVNkLEtBQVQsRUFBZ0IsVUFBQWUsQ0FBQyxFQUFJO0FBQ25CO0FBQ0EsV0FBTyxDQUFDQSxDQUFDLENBQUNDLEdBQUYsQ0FBTUMsUUFBTixDQUFlaEIsU0FBZixDQUFELElBQThCLENBQUNjLENBQUMsQ0FBQ0csS0FBRixDQUFRQyxPQUFSLENBQWdCakIsT0FBaEIsQ0FBdEM7QUFDRCxHQUhELENBRG1CLEVBS25CLFVBQUFhLENBQUM7QUFBQSxXQUFJLENBQUNBLENBQUMsQ0FBQ0csS0FBRixDQUFRRSxJQUFSLEVBQUw7QUFBQSxHQUxrQixDQUFyQixDQUhBLENBU0c7OztB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QUFkOztBQUNBLFNBQUssSUFBSVQsQ0FBQyxHQUFHd0UsWUFBWSxDQUFDaEUsTUFBYixHQUFzQixDQUFuQyxFQUFzQ1IsQ0FBQyxJQUFJLENBQTNDLEVBQThDQSxDQUFDLEVBQS9DLEVBQW1EO0FBQ2pELFVBQUlTLE9BQU8sS0FBSyxJQUFaLElBQW9CK0QsWUFBWSxDQUFDeEUsQ0FBRCxDQUFaLENBQWdCRyxLQUFoQixJQUF5Qk0sT0FBakQsRUFBMEQ7QUFDeERBLFFBQUFBLE9BQU8sR0FBRytELFlBQVksQ0FBQ3hFLENBQUQsQ0FBWixDQUFnQkMsR0FBMUI7QUFDQXVFLFFBQUFBLFlBQVksQ0FBQzNELE1BQWIsQ0FBb0JiLENBQXBCLEVBQXVCLENBQXZCO0FBQ0Q7QUFDRjs7QUFDRHVFLElBQUFBLEdBQUc7QUFDSjs7QUFDRCxTQUFPakQsSUFBSSxDQUFDaUQsR0FBTCxDQUFTQSxHQUFULEVBQWMsQ0FBZCxDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHttaW5FbGVtZW50RHVyYXRpb259IGZyb20gJy4uL2NvbnN0cy90aW1lYmFyQ29uc3RzJztcblxuLyoqXG4gKiBSZW5kZXIgYWxsIGl0ZW1zIGluIGEgcm93XG4gKiBAZXh0ZXJuYWwge21vbWVudH0gaHR0cDovL21vbWVudGpzLmNvbS9cbiAqIEBwYXJhbSAge09iamVjdFtdfSBpdGVtcyBMaXN0IG9mIGl0ZW1zIHRvIHJlbmRlciBmb3IgdGhpcyByb3dcbiAqIEBwYXJhbSAge21vbWVudH0gdmlzX3N0YXJ0IFRoZSB2aXNpYmxlIHN0YXJ0IG9mIHRoZSB0aW1lbGluZVxuICogQHBhcmFtICB7bW9tZW50fSB2aXNfZW5kIFRoZSB2aXNpYmxlIGVuZCBvZiB0aGUgdGltZWxpbmVcbiAqIEBwYXJhbSAge251bWJlcn0gdG90YWxfd2lkdGggcGl4ZWwgd2lkdGggb2YgdGhlIHRpbWVsaW5lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3dJdGVtc1JlbmRlcmVyKFxuICBpdGVtcyxcbiAgdmlzX3N0YXJ0LFxuICB2aXNfZW5kLFxuICB0b3RhbF93aWR0aCxcbiAgaXRlbUhlaWdodCxcbiAgaXRlbVJlbmRlcmVyLFxuICBzZWxlY3RlZEl0ZW1zID0gW10sXG4gIGlzU2Nyb2xsID0gZmFsc2Vcbikge1xuICBjb25zdCBzdGFydF9lbmRfbWluID0gdmlzX2VuZC5kaWZmKHZpc19zdGFydCwgJ21zJyk7XG4gIGNvbnN0IHBpeGVsc19wZXJfbWluID0gdG90YWxfd2lkdGggLyBzdGFydF9lbmRfbWluO1xuICBsZXQgZmlsdGVyZWRfaXRlbXMgPSBfLnNvcnRCeShcbiAgICBfLmZpbHRlcihpdGVtcywgaSA9PiB7XG4gICAgICAvLyBpZiBlbmQgbm90IGJlZm9yZSB3aW5kb3cgJiYgc3RhcnQgbm90IGFmdGVyIHdpbmRvd1xuICAgICAgcmV0dXJuICFpLmVuZC5pc0JlZm9yZSh2aXNfc3RhcnQpICYmICFpLnN0YXJ0LmlzQWZ0ZXIodmlzX2VuZCk7XG4gICAgfSksXG4gICAgaSA9PiAtaS5zdGFydC51bml4KClcbiAgKTsgLy8gc29ydGVkIGluIHJldmVyc2Ugb3JkZXIgYXMgd2UgaXRlcmF0ZSBvdmVyIHRoZSBhcnJheSBiYWNrd2FyZHNcbiAgbGV0IGRpc3BsYXlJdGVtcyA9IFtdO1xuICBsZXQgcm93T2Zmc2V0ID0gMDtcbiAgd2hpbGUgKGZpbHRlcmVkX2l0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgbGFzdEVuZCA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IGZpbHRlcmVkX2l0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBpZiAobGFzdEVuZCA9PT0gbnVsbCB8fCBmaWx0ZXJlZF9pdGVtc1tpXS5zdGFydCA+PSBsYXN0RW5kKSB7XG4gICAgICAgIGxldCBpdGVtID0gXy5jbG9uZShmaWx0ZXJlZF9pdGVtc1tpXSk7XG4gICAgICAgIGl0ZW0ucm93T2Zmc2V0ID0gcm93T2Zmc2V0O1xuICAgICAgICBkaXNwbGF5SXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgZmlsdGVyZWRfaXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICBsYXN0RW5kID0gaXRlbS5lbmQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd09mZnNldCsrO1xuICB9XG4gIHJldHVybiBfLm1hcChkaXNwbGF5SXRlbXMsIGkgPT4ge1xuICAgIGNvbnN0IHtjb2xvciwgaXNSZXNpemFibGV9ID0gaTtcbiAgICBjb25zdCBDb21wID0gaXRlbVJlbmRlcmVyO1xuICAgIC8vIGxldCB0b3AgPSBpdGVtSGVpZ2h0ICogaVsncm93T2Zmc2V0J107XG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IGl0ZW1fb2Zmc2V0X21pbnMgPSBpLnN0YXJ0LmRpZmYodmlzX3N0YXJ0LCAnbXMnKTtcbiAgICBsZXQgaXRlbV9kdXJhdGlvbl9taW5zID0gaS5lbmQuZGlmZihpLnN0YXJ0LCAnbXMnKTtcbiAgICBsZXQgbGVmdCA9IE1hdGgucm91bmQoaXRlbV9vZmZzZXRfbWlucyAqIHBpeGVsc19wZXJfbWluKTtcbiAgICBsZXQgd2lkdGggPSBNYXRoLnJvdW5kKGl0ZW1fZHVyYXRpb25fbWlucyAqIHBpeGVsc19wZXJfbWluKTtcbiAgICBsZXQgY29tcENsYXNzbmFtZXMgPSAncmN0OWstaXRlbXMtaW5uZXInO1xuICAgIGxldCBvdXRlckNsYXNzbmFtZXMgPSAncmN0OWstaXRlbXMtb3V0ZXIgaXRlbV9kcmFnZ2FibGUnO1xuICAgIGxldCBzdHlsZSA9IHtiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yfTtcbiAgICBsZXQgaXNTZWxlY3RlZCA9IHNlbGVjdGVkSXRlbXMuaW5kZXhPZihOdW1iZXIoaS5rZXkpKSA+IC0xO1xuICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICBjb21wQ2xhc3NuYW1lcyArPSAnIHJjdDlrLWl0ZW1zLXNlbGVjdGVkJztcbiAgICAgIG91dGVyQ2xhc3NuYW1lcyArPSAnIHJjdDlrLWl0ZW1zLW91dGVyLXNlbGVjdGVkJztcbiAgICAgIGlmIChpc1Njcm9sbCkge1xuICAgICAgICBvdXRlckNsYXNzbmFtZXMgKz0gJyByY3Q5ay1pdGVtcy1vdXRlci1zY3JvbGwnO1xuICAgICAgfVxuICAgICAgc3R5bGUgPSB7fTtcbiAgICB9XG5cbiAgICBjb25zdCByZXNpemFibGUgPSBpc1Jlc2l6YWJsZSAhPT0gdW5kZWZpbmVkID8gaXNSZXNpemFibGUgOiB0cnVlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIGtleT17aS5rZXl9XG4gICAgICAgIGRhdGEtaXRlbS1pbmRleD17aS5rZXl9XG4gICAgICAgIGRhdGEtaXMtcmVzaXphYmxlPXtyZXNpemFibGV9XG4gICAgICAgIGNsYXNzTmFtZT17b3V0ZXJDbGFzc25hbWVzfVxuICAgICAgICBzdHlsZT17e2xlZnQsIHdpZHRoLCB0b3B9fT5cbiAgICAgICAgeyFpc1Njcm9sbCAmJiA8Q29tcCBrZXk9e2kua2V5fSBpdGVtPXtpfSBjbGFzc05hbWU9e2NvbXBDbGFzc25hbWVzfSBzdHlsZT17c3R5bGV9IC8+fVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFJlbmRlciByb3cgbGF5ZXJzXG4gKiBAcGFyYW0gIHtPYmplY3RbXX0gbGF5ZXJzIExpc3Qgb2YgbGF5ZXJzIHRvIHJlbmRlciBmb3IgdGhpcyByb3dcbiAqIEBwYXJhbSAge21vbWVudH0gdmlzX3N0YXJ0IFRoZSB2aXNpYmxlIHN0YXJ0IG9mIHRoZSB0aW1lbGluZVxuICogQHBhcmFtICB7bW9tZW50fSB2aXNfZW5kIFRoZSB2aXNpYmxlIGVuZCBvZiB0aGUgdGltZWxpbmVcbiAqIEBwYXJhbSAge251bWJlcn0gdG90YWxfd2lkdGggcGl4ZWwgd2lkdGggb2YgdGhlIHRpbWVsaW5lXG4gKiBAcGFyYW0gIHtudW1iZXJ9IGl0ZW1IZWlnaHQgVGhlIGxheWVyIGhlaWdodCBpbiBweFxuICovXG5leHBvcnQgZnVuY3Rpb24gcm93TGF5ZXJSZW5kZXJlcihsYXllcnMsIHZpc19zdGFydCwgdmlzX2VuZCwgdG90YWxfd2lkdGgsIGl0ZW1IZWlnaHQpIHtcbiAgY29uc3Qgc3RhcnRfZW5kX21pbiA9IHZpc19lbmQuZGlmZih2aXNfc3RhcnQsICdtcycpO1xuICBjb25zdCBwaXhlbHNfcGVyX21pbiA9IHRvdGFsX3dpZHRoIC8gc3RhcnRfZW5kX21pbjtcbiAgbGV0IGZpbHRlcmVkX2l0ZW1zID0gXy5zb3J0QnkoXG4gICAgXy5maWx0ZXIobGF5ZXJzLCBpID0+IHtcbiAgICAgIHJldHVybiAhaS5lbmQuaXNCZWZvcmUodmlzX3N0YXJ0KSAmJiAhaS5zdGFydC5pc0FmdGVyKHZpc19lbmQpO1xuICAgIH0pLFxuICAgIGkgPT4gLWkuc3RhcnQudW5peCgpXG4gICk7IC8vIHNvcnRlZCBpbiByZXZlcnNlIG9yZGVyIGFzIHdlIGl0ZXJhdGUgb3ZlciB0aGUgYXJyYXkgYmFja3dhcmRzXG4gIGxldCBkaXNwbGF5SXRlbXMgPSBbXTtcbiAgbGV0IHJvd09mZnNldCA9IDA7XG4gIHdoaWxlIChmaWx0ZXJlZF9pdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IGxhc3RFbmQgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSBmaWx0ZXJlZF9pdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWYgKGxhc3RFbmQgPT09IG51bGwgfHwgZmlsdGVyZWRfaXRlbXNbaV0uc3RhcnQgPj0gbGFzdEVuZCkge1xuICAgICAgICBsZXQgaXRlbSA9IF8uY2xvbmUoZmlsdGVyZWRfaXRlbXNbaV0pO1xuICAgICAgICBpdGVtLnJvd09mZnNldCA9IHJvd09mZnNldDtcbiAgICAgICAgZGlzcGxheUl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIGZpbHRlcmVkX2l0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgbGFzdEVuZCA9IGl0ZW0uZW5kO1xuICAgICAgfVxuICAgIH1cbiAgICByb3dPZmZzZXQrKztcbiAgfVxuICByZXR1cm4gXy5tYXAoZGlzcGxheUl0ZW1zLCBpID0+IHtcbiAgICBjb25zdCB7c3R5bGUsIHJvd051bWJlcn0gPSBpO1xuICAgIGxldCB0b3AgPSBpdGVtSGVpZ2h0ICogaVsncm93T2Zmc2V0J107XG4gICAgbGV0IGl0ZW1fb2Zmc2V0X21pbnMgPSBpLnN0YXJ0LmRpZmYodmlzX3N0YXJ0LCAnbXMnKTtcbiAgICBsZXQgaXRlbV9kdXJhdGlvbl9taW5zID0gaS5lbmQuZGlmZihpLnN0YXJ0LCAnbXMnKTtcbiAgICBsZXQgbGVmdCA9IE1hdGgucm91bmQoaXRlbV9vZmZzZXRfbWlucyAqIHBpeGVsc19wZXJfbWluKTtcbiAgICBsZXQgd2lkdGggPSBNYXRoLnJvdW5kKGl0ZW1fZHVyYXRpb25fbWlucyAqIHBpeGVsc19wZXJfbWluKTtcbiAgICBsZXQgaGVpZ2h0ID0gaXRlbUhlaWdodCAtIChyb3dOdW1iZXIgPT09IDAgPyAyIDogMSk7IC8vIGZvciBib3JkZXJcbiAgICBsZXQgb3V0ZXJDbGFzc25hbWVzID0gJ3JjdDlrLXJvdy1sYXllcic7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9e2ByLSR7cm93TnVtYmVyfS0ke2kuc3RhcnQudW5peCgpfWB9XG4gICAgICAgIGRhdGEtaXRlbS1pbmRleD17aS5rZXl9XG4gICAgICAgIGNsYXNzTmFtZT17b3V0ZXJDbGFzc25hbWVzfVxuICAgICAgICBzdHlsZT17ey4uLnN0eWxlLCBsZWZ0LCB3aWR0aCwgdG9wLCBoZWlnaHR9fVxuICAgICAgLz5cbiAgICApO1xuICB9KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSByb3cgb2JqZWN0IGZvciBhIGdpdmVuIHggYW5kIHkgcGl4ZWwgbG9jYXRpb25cbiAqIEBwYXJhbSAge251bWJlcn0geCBUaGUgeCBjb29yZGluYXRlIG9mIHRoZSBwaXhlbCBsb2NhdGlvblxuICogQHBhcmFtICB7bnVtYmVyfSB5IFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIHBpeGVsIGxvY2F0aW9uXG4gKiBAcGFyYW0gIHtPYmplY3R9IHRvcERpdiBEaXYgdG8gc2VhcmNoIHVuZGVyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcm93IG9iamVjdCBhdCB0aGF0IGNvb3JkaW5hdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5lYXJlc3RSb3dPYmplY3QoeCwgeSwgdG9wRGl2ID0gZG9jdW1lbnQpIHtcbiAgbGV0IGVsZW1lbnRzQXRQaXhlbCA9IGRvY3VtZW50LmVsZW1lbnRzRnJvbVBvaW50KHgsIHkpO1xuICByZXR1cm4gXy5maW5kKGVsZW1lbnRzQXRQaXhlbCwgZSA9PiB7XG4gICAgY29uc3QgaW5EaXYgPSB0b3BEaXYuY29udGFpbnMoZSk7XG4gICAgcmV0dXJuIGluRGl2ICYmIGUuaGFzQXR0cmlidXRlKCdkYXRhLXJvdy1pbmRleCcpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSByb3cgbnVtYmVyIGZvciBhIGdpdmVuIHJvdyBvYmplY3RcbiAqIEBwYXJhbSAge09iamVjdH0gZWxlbSBUaGUgcm93IG9iamVjdFxuICogQHJldHVybnMge251bWJlcn0gVGhlIHJvdyBudW1iZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvd09iamVjdFJvd051bWJlcihlbGVtKSB7XG4gIHJldHVybiBOdW1iZXIoZWxlbSA/IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXJvdy1pbmRleCcpIDogMCk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmVydGljYWwgbWFyZ2lucyBhbmQgYm9yZGVycyBnaXZlbiBhbiBvYmplY3RcbiAqIEBwYXJhbSAge09iamVjdH0gZWxlbSBUaGUgcm93IG9iamVjdFxuICogQHJldHVybnMge251bWJlcn0gdGhlIHBpeGVsIHBvc2l0aW9uIG9mIHRoZSBib3R0b20gb2YgdGhlIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFZlcnRpY2FsTWFyZ2luQm9yZGVyKGVsZW0pIHtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcbiAgLy8gdG9wIG1hcmdpbiBwbHVzIGJvdHRvbSBtYXJnaW4gaGFsdmVkXG4gIGNvbnN0IHJvd01hcmdpbnMgPVxuICAgIChNYXRoLmNlaWwocGFyc2VGbG9hdChjb21wdXRlZFN0eWxlc1snbWFyZ2luVG9wJ10pICsgcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlc1snbWFyZ2luQm90dG9tJ10pKSB8fCAxKSAvIDI7XG4gIC8vIGhhbGYgdGhlIHNpemUgb2YgdGhlIGJvcmRlciBzZWVtcyBpbXBvcnRhbnRcbiAgY29uc3Qgcm93Qm9yZGVycyA9XG4gICAgKE1hdGguY2VpbChwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGVzWydib3JkZXJUb3BXaWR0aCddKSArIHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZXNbJ2JvcmRlckJvdHRvbVdpZHRoJ10pKSB8fCAxKSAvXG4gICAgMjtcbiAgcmV0dXJuIE51bWJlcihyb3dNYXJnaW5zICsgcm93Qm9yZGVycyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdHJ1ZSBib3R0b20gbG9jYXRpb24gZ2l2ZW4gYW4gb2JqZWN0XG4gKiBAcGFyYW0gIHtPYmplY3R9IGVsZW0gYW4gZWxlbWVudFxuICogQHJldHVybnMge251bWJlcn0gdGhlIHBpeGVsIHBvc2l0aW9uIG9mIHRoZSBib3R0b20gb2YgdGhlIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRydWVCb3R0b20oZWxlbSkge1xuICAvKlxuICBAYmVuZG9nOiBsZWF2aW5nIHRoaXMgaGVyZSBhcyBhIGhlbHBlciwgaWYgdGhlcmUncyBldmVyIGEgYnVnIGFyb3VuZCBpbm5lciBpdGVtcyBzaXplXG4gIC8vIGdldCBvYmplY3Qgc2hhcGVcbiAgY29uc3QgcmVjdHMgPSBlbGVtLmdldENsaWVudFJlY3RzKCk7XG4gIGNvbnN0IGJvdHRvbSA9IE1hdGgubWF4KE9iamVjdC52YWx1ZXMocmVjdHMpLm1hcChvID0+IG8uYm90dG9tKSwgMCk7XG4gICAqL1xuICAvLyBjYWxjdWxhdGUgdGhlIHRydWUgYm90dG9tXG4gIGNvbnN0IGJvdW5kID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgYm90dG9tID0gTWF0aC5mbG9vcihib3VuZC50b3AgKyBib3VuZC5oZWlnaHQpO1xuICByZXR1cm4gTnVtYmVyKGJvdHRvbSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgcm93IG51bWJlciBmb3IgYSBnaXZlbiB4IGFuZCB5IHBpeGVsIGxvY2F0aW9uXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHggVGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgcGl4ZWwgbG9jYXRpb25cbiAqIEBwYXJhbSAge251bWJlcn0geSBUaGUgeSBjb29yZGluYXRlIG9mIHRoZSBwaXhlbCBsb2NhdGlvblxuICogQHBhcmFtICB7T2JqZWN0fSB0b3BEaXYgRGl2IHRvIHNlYXJjaCB1bmRlclxuICogQHJldHVybnMge251bWJlcn0gVGhlIHJvdyBudW1iZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5lYXJlc3RSb3dOdW1iZXIoeCwgeSwgdG9wRGl2ID0gZG9jdW1lbnQsIGN1cnJlbnRSb3dObykge1xuICBsZXQgZWxlbWVudHNBdFBpeGVsID0gZG9jdW1lbnQuZWxlbWVudHNGcm9tUG9pbnQoeCwgeSk7XG4gIGxldCB0YXJnZXRSb3cgPSBfLmZpbmQoZWxlbWVudHNBdFBpeGVsLCBlID0+IHtcbiAgICBjb25zdCBpbkRpdiA9IHRvcERpdi5jb250YWlucyhlKTtcbiAgICByZXR1cm4gaW5EaXYgJiYgZS5oYXNBdHRyaWJ1dGUoJ2RhdGEtcm93LWluZGV4Jyk7XG4gIH0pO1xuXG4gIGlmICh0YXJnZXRSb3cpIHtcbiAgICByZXR1cm4gdGFyZ2V0Um93LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3ctaW5kZXgnKTtcbiAgfSBlbHNlIGlmIChjdXJyZW50Um93Tm8gJiYgIXRhcmdldFJvdykge1xuICAgIHJldHVybiBjdXJyZW50Um93Tm87XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBVc2UgdG8gZmluZCB0aGUgaGVpZ2h0IG9mIGEgcm93LCBnaXZlbiBhIHNldCBvZiBpdGVtc1xuICogQHBhcmFtICB7T2JqZWN0W119IGl0ZW1zIExpc3Qgb2YgaXRlbXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IE1heCByb3cgaGVpZ2h0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXhPdmVybGFwcGluZ0l0ZW1zKGl0ZW1zKSB7XG4gIGxldCBtYXggPSAwO1xuICBsZXQgc29ydGVkX2l0ZW1zID0gXy5zb3J0QnkoaXRlbXMsIGkgPT4gLWkuc3RhcnQudW5peCgpKTtcblxuICB3aGlsZSAoc29ydGVkX2l0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgbGFzdEVuZCA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IHNvcnRlZF9pdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWYgKGxhc3RFbmQgPT09IG51bGwgfHwgc29ydGVkX2l0ZW1zW2ldLnN0YXJ0ID49IGxhc3RFbmQpIHtcbiAgICAgICAgbGFzdEVuZCA9IHNvcnRlZF9pdGVtc1tpXS5lbmQ7XG4gICAgICAgIHNvcnRlZF9pdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIG1heCsrO1xuICB9XG4gIHJldHVybiBNYXRoLm1heChtYXgsIDEpO1xufVxuIl19