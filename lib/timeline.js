'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactVirtualized = require("react-virtualized");

var _moment = _interopRequireDefault(require("moment"));

var _interactjs = _interopRequireDefault(require("interactjs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _timebarConsts = require("./consts/timebarConsts");

var _commonUtils = require("./utils/commonUtils");

var _itemUtils = require("./utils/itemUtils");

var _timeUtils = require("./utils/timeUtils");

var _timebar = _interopRequireDefault(require("./components/timebar"));

var _selector = _interopRequireDefault(require("./components/selector"));

var _renderers = require("./components/renderers");

var _body = _interopRequireDefault(require("./components/body"));

require("core-js/fn/string/starts-with");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var scrollHeight = 7;

var Timeline = /*#__PURE__*/function (_React$Component) {
  _inherits(Timeline, _React$Component);

  var _super = _createSuper(Timeline);

  _createClass(Timeline, null, [{
    key: "isBitSet",
    value: function isBitSet(bit, mask) {
      return (bit & mask) === bit;
    }
  }]);

  function Timeline(props) {
    var _this;

    _classCallCheck(this, Timeline);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "refreshGrid", function () {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this._grid.recomputeGridSize(config);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleItemRowEvent", function (e, itemCallback, rowCallback) {
      e.preventDefault(); // Skip click handler if selecting with selection box

      if (_this.selecting) {
        return;
      }

      if (e.target.hasAttribute('data-item-index') || e.target.parentElement.hasAttribute('data-item-index')) {
        var itemKey = e.target.getAttribute('data-item-index') || e.target.parentElement.getAttribute('data-item-index');
        itemCallback && itemCallback(e, Number(itemKey));
      } else {
        var row = e.target.getAttribute('data-row-index');
        var clickedTime = (0, _timeUtils.getTimeAtPixel)(e.clientX - _this.props.groupOffset, _this.props.startDate, _this.props.endDate, _this.getTimelineWidth()); //const roundedStartMinutes = Math.round(clickedTime.minute() / this.props.snapMinutes) * this.props.snapMinutes; // I dont know what this does

        var snappedClickedTime = (0, _timeUtils.timeSnap)(clickedTime, _this.props.snapMinutes);
        rowCallback && rowCallback(e, row, clickedTime, snappedClickedTime);
      }
    });

    _this.selecting = false;
    _this.state = {
      selection: [],
      cursorTime: null
    };

    _this.setTimeMap(_this.props.items);

    _this.cellRenderer = _this.cellRenderer.bind(_assertThisInitialized(_this));
    _this.rowHeight = _this.rowHeight.bind(_assertThisInitialized(_this));
    _this.setTimeMap = _this.setTimeMap.bind(_assertThisInitialized(_this));
    _this.getItem = _this.getItem.bind(_assertThisInitialized(_this));
    _this.changeGroup = _this.changeGroup.bind(_assertThisInitialized(_this));
    _this.setSelection = _this.setSelection.bind(_assertThisInitialized(_this));
    _this.clearSelection = _this.clearSelection.bind(_assertThisInitialized(_this));
    _this.getTimelineWidth = _this.getTimelineWidth.bind(_assertThisInitialized(_this));
    _this.itemFromElement = _this.itemFromElement.bind(_assertThisInitialized(_this));
    _this.updateDimensions = _this.updateDimensions.bind(_assertThisInitialized(_this));
    _this.grid_ref_callback = _this.grid_ref_callback.bind(_assertThisInitialized(_this));
    _this.select_ref_callback = _this.select_ref_callback.bind(_assertThisInitialized(_this));
    _this.throttledMouseMoveFunc = _lodash["default"].throttle(_this.throttledMouseMoveFunc.bind(_assertThisInitialized(_this)), 20);
    _this.mouseMoveFunc = _this.mouseMoveFunc.bind(_assertThisInitialized(_this));
    var canSelect = Timeline.isBitSet(Timeline.TIMELINE_MODES.SELECT, _this.props.timelineMode);
    var canDrag = Timeline.isBitSet(Timeline.TIMELINE_MODES.DRAG, _this.props.timelineMode);
    var canResize = Timeline.isBitSet(Timeline.TIMELINE_MODES.RESIZE, _this.props.timelineMode);

    _this.setUpDragging(canSelect, canDrag, canResize);

    return _this;
  }

  _createClass(Timeline, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setTimeMap(nextProps.items, nextProps.startDate, nextProps.endDate);
      this.refreshGrid();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._itemInteractable) this._itemInteractable.unset();
      if (this._selectRectangleInteractable) this._selectRectangleInteractable.unset();
      window.removeEventListener('resize', this.updateDimensions);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props = this.props,
          timelineMode = _this$props.timelineMode,
          selectedItems = _this$props.selectedItems;
      var selectionChange = !_lodash["default"].isEqual(prevProps.selectedItems, selectedItems);
      var timelineModeChange = !_lodash["default"].isEqual(prevProps.timelineMode, timelineMode);

      if (timelineModeChange || selectionChange) {
        var canSelect = Timeline.isBitSet(Timeline.TIMELINE_MODES.SELECT, timelineMode);
        var canDrag = Timeline.isBitSet(Timeline.TIMELINE_MODES.DRAG, timelineMode);
        var canResize = Timeline.isBitSet(Timeline.TIMELINE_MODES.RESIZE, timelineMode);
        this.setUpDragging(canSelect, canDrag, canResize);
      }
    }
  }, {
    key: "updateDimensions",
    value: function updateDimensions() {
      var _this2 = this;

      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(function () {
        _this2.forceUpdate();

        _this2._grid.recomputeGridSize();
      }, 100);
    }
  }, {
    key: "setTimeMap",
    value: function setTimeMap(items, startDate, endDate) {
      var _this3 = this;

      if (!startDate || !endDate) {
        startDate = this.props.startDate;
        endDate = this.props.endDate;
      }

      this.itemRowMap = {}; // timeline elements (key) => (rowNo).

      this.rowItemMap = {}; // (rowNo) => timeline elements

      this.rowHeightCache = {}; // (rowNo) => max number of stacked items

      var visibleItems = _lodash["default"].filter(items, function (i) {
        return i.end > startDate && i.start < endDate;
      });

      var itemRows = _lodash["default"].groupBy(visibleItems, 'row');

      _lodash["default"].forEach(itemRows, function (visibleItems, row) {
        var rowInt = parseInt(row);
        if (_this3.rowItemMap[rowInt] === undefined) _this3.rowItemMap[rowInt] = [];

        _lodash["default"].forEach(visibleItems, function (item) {
          _this3.itemRowMap[item.key] = rowInt;

          _this3.rowItemMap[rowInt].push(item);
        });

        _this3.rowHeightCache[rowInt] = (0, _itemUtils.getMaxOverlappingItems)(visibleItems);
      });
    }
  }, {
    key: "itemFromElement",
    value: function itemFromElement(e) {
      var index = e.getAttribute('data-item-index');
      var rowNo = this.itemRowMap[index];

      var itemIndex = _lodash["default"].findIndex(this.rowItemMap[rowNo], function (i) {
        return i.key == index;
      });

      var item = this.rowItemMap[rowNo][itemIndex];
      return {
        index: index,
        rowNo: rowNo,
        itemIndex: itemIndex,
        item: item
      };
    }
  }, {
    key: "getItem",
    value: function getItem(id) {
      // This is quite stupid and shouldn't really be needed
      var rowNo = this.itemRowMap[id];

      var itemIndex = _lodash["default"].findIndex(this.rowItemMap[rowNo], function (i) {
        return i.key == id;
      });

      return this.rowItemMap[rowNo][itemIndex];
    }
  }, {
    key: "changeGroup",
    value: function changeGroup(item, curRow, newRow) {
      item.row = newRow;
      this.itemRowMap[item.key] = newRow;
      this.rowItemMap[curRow] = this.rowItemMap[curRow].filter(function (i) {
        return i.key !== item.key;
      });
      this.rowItemMap[newRow].push(item);
    }
  }, {
    key: "setSelection",
    value: function setSelection(selections) {
      var newSelection = _lodash["default"].map(selections, function (s) {
        return {
          start: s[0].clone(),
          end: s[1].clone()
        };
      });

      this.setState({
        selection: newSelection
      });
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      this.setState({
        selection: []
      });
    }
  }, {
    key: "getTimelineWidth",
    value: function getTimelineWidth(totalWidth) {
      var groupOffset = this.props.groupOffset;
      if (totalWidth !== undefined) return totalWidth - groupOffset;
      return this._grid.props.width - groupOffset;
    }
  }, {
    key: "setUpDragging",
    value: function setUpDragging(canSelect, canDrag, canResize) {
      var _this4 = this;

      var topDivClassId = "rct9k-id-".concat(this.props.componentId);
      var selectedItemSelector = '.rct9k-items-outer-selected';
      if (this._itemInteractable) this._itemInteractable.unset();
      if (this._selectRectangleInteractable) this._selectRectangleInteractable.unset();
      this._itemInteractable = (0, _interactjs["default"])(".".concat(topDivClassId, " .item_draggable"));
      this._selectRectangleInteractable = (0, _interactjs["default"])(".".concat(topDivClassId, " .parent-div"));

      this._itemInteractable.on('tap', function (e) {
        _this4._handleItemRowEvent(e, _this4.props.onItemClick, _this4.props.onRowClick);
      });

      if (canDrag) {
        this._itemInteractable.draggable({
          enabled: true,
          allowFrom: selectedItemSelector,
          restrict: {
            restriction: ".".concat(topDivClassId),
            elementRect: {
              left: 1,
              right: 0,
              top: 0,
              bottom: 1
            }
          }
        }).on('dragstart', function (e) {
          var selections = [];

          var animatedItems = _this4.props.onInteraction(Timeline.changeTypes.dragStart, null, _this4.props.selectedItems);

          _lodash["default"].forEach(animatedItems, function (id) {
            var domItem = _this4._gridDomNode.querySelector("span[data-item-index='" + id + "'");

            if (domItem) {
              selections.push([_this4.getItem(id).start, _this4.getItem(id).end]);
              domItem.setAttribute('isDragging', 'True');
              domItem.setAttribute('drag-x', 0);
              domItem.setAttribute('drag-y', 0);
              domItem.style['z-index'] = 4;
            }
          });

          _this4.setSelection(selections);
        }).on('dragmove', function (e) {
          var target = e.target;
          var animatedItems = _this4._gridDomNode.querySelectorAll("span[isDragging='True'") || [];
          var dx = (parseFloat(target.getAttribute('drag-x')) || 0) + e.dx;
          var dy = (parseFloat(target.getAttribute('drag-y')) || 0) + e.dy;
          var selections = []; // Snap the movement to the current snap interval

          var snapDx = (0, _timeUtils.getSnapPixelFromDelta)(dx, _this4.props.originalStartDate, _this4.props.originalEndDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);

          _lodash["default"].forEach(animatedItems, function (domItem) {
            var _this4$itemFromElemen = _this4.itemFromElement(domItem),
                item = _this4$itemFromElemen.item;

            var itemDuration = item.end.diff(item.start, 'ms');
            var newPixelOffset = ((0, _commonUtils.pixToInt)(domItem.style.left) + snapDx).toFixed(3);
            var newStart = (0, _timeUtils.getTimeAtPixel)(newPixelOffset, _this4.props.originalStartDate, _this4.props.originalEndDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);
            var newEnd = newStart.clone().add(itemDuration, 'ms');
            selections.push([newStart, newEnd]); // Translate the new start time back to pixels, so we can animate the snap

            domItem.style.webkitTransform = domItem.style.transform = 'translate(' + snapDx + 'px, ' + dy + 'px)';
          });

          target.setAttribute('drag-x', dx);
          target.setAttribute('drag-y', dy);

          _this4.setSelection(selections);
        }).on('dragend', function (e) {
          var _this4$itemFromElemen2 = _this4.itemFromElement(e.target),
              item = _this4$itemFromElemen2.item,
              rowNo = _this4$itemFromElemen2.rowNo;

          var animatedItems = _this4._gridDomNode.querySelectorAll("span[isDragging='True'") || [];
          var animatedItemsKeys = [];

          _lodash["default"].forEach(animatedItems, function (domItem) {
            animatedItemsKeys.push(_this4.itemFromElement(domItem).item.key);
          });

          _this4.setSelection([[item.start, item.end]]);

          _this4.clearSelection(); // Change row


          var newRow = (0, _itemUtils.getNearestRowNumber)(e.clientX, e.clientY, document, rowNo);
          var rowChangeDelta = newRow - rowNo; // Update time

          var newPixelOffset = ((0, _commonUtils.pixToInt)(e.target.style.left) + (parseFloat(e.target.getAttribute('drag-x')) || 0)).toFixed(3);
          var newStart = (0, _timeUtils.getTimeAtPixel)(newPixelOffset, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);
          var timeDelta = newStart.clone().diff(item.start, 'ms');
          var changes = {
            rowChangeDelta: rowChangeDelta,
            timeDelta: timeDelta
          };
          var items = []; // Check - whether the clamped element is being dragged to a new layer and it is located above another element.
          // ===========================================================================================================

          var itemsOnNewRowForTarget = _this4.props.items.filter(function (element) {
            return element.row === +newRow;
          });

          var targetDuration = item.end.diff(item.start);
          var targetNewEnd = newStart.clone().add(targetDuration);
          var newTargetStartInMs = newStart.clone().diff(0, 'ms');
          var newTargetEndInMs = targetNewEnd.clone().diff(0, 'ms');
          var targetAboveElement = false;
          itemsOnNewRowForTarget.sort(function (a, b) {
            return a - b;
          }); // Checking whether the dragged item is above other items.

          if (rowNo !== +newRow) {
            var _loop = function _loop(i) {
              var element = itemsOnNewRowForTarget[i];

              if (animatedItemsKeys.some(function (key) {
                return key === element.key;
              })) {
                return "continue";
              }

              var elementStartInMs = element.start.clone().diff(0, 'ms');
              var elementEndInMs = element.end.clone().diff(0, 'ms');

              if (newTargetStartInMs > elementStartInMs && newTargetStartInMs < elementEndInMs || newTargetEndInMs > elementStartInMs && newTargetEndInMs < elementEndInMs) {
                targetAboveElement = true;
                return "break";
              }
            };

            for (var i = 0; i < itemsOnNewRowForTarget.length; i++) {
              var _ret = _loop(i);

              if (_ret === "continue") continue;
              if (_ret === "break") break;
            }
          } // ===========================================================================================================
          // end Check - whether the clamped element is being dragged to a new layer and it is located above another element.
          // Checking. Whether one of the dragged array elements is over an element on a new layer.
          // ======================================================================================


          var oneOfItemAboveElement = false;

          _lodash["default"].forEach(animatedItems, function (domItem) {
            var _this4$itemFromElemen3 = _this4.itemFromElement(domItem),
                item = _this4$itemFromElemen3.item;

            var itemDuration = item.end.diff(item.start);
            var newStart = item.start.clone().add(timeDelta, 'ms');
            var newEnd = newStart.clone().add(itemDuration);
            var newStartInMs = newStart.clone().diff(0, 'ms');
            var newEndInMs = newEnd.clone().diff(0, 'ms');
            var currentItemNewRow = item.row + rowChangeDelta;

            var itemsOnNewRow = _this4.props.items.filter(function (element) {
              return element.row === currentItemNewRow;
            });

            itemsOnNewRow.sort(function (a, b) {
              return a - b;
            });

            var _loop2 = function _loop2(_i) {
              var element = itemsOnNewRow[_i];

              if (animatedItemsKeys.some(function (key) {
                return key === element.key;
              })) {
                return "continue";
              }

              var elementStartInMs = element.start.clone().diff(0, 'ms');
              var elementEndInMs = element.end.clone().diff(0, 'ms');

              if (newStartInMs > elementStartInMs && newStartInMs < elementEndInMs || newEndInMs > elementStartInMs && newEndInMs < elementEndInMs) {
                oneOfItemAboveElement = true;
                return "break";
              }
            };

            for (var _i = 0; _i < itemsOnNewRow.length; _i++) {
              var _ret2 = _loop2(_i);

              if (_ret2 === "continue") continue;
              if (_ret2 === "break") break;
            }
          }); // ======================================================================================
          // Checking. Whether one of the dragged array elements is over an element on a new layer.
          // ======================================================================================
          // ======================================================================================
          // ======================================================================================


          var mewRowsWithNewItems = {};

          _lodash["default"].forEach(animatedItems, function (domItem) {
            var _this4$itemFromElemen4 = _this4.itemFromElement(domItem),
                item = _this4$itemFromElemen4.item;

            var timelineStartInMs = item.end.diff(item.start);
            var newStart = item.start.clone().add(timeDelta, 'ms');
            var newEnd = newStart.clone().add(timelineStartInMs);
            var newRow = item.row + rowChangeDelta >= 0 ? item.row + rowChangeDelta : 0;

            if (newRow > _this4.props.layersNumber) {
              newRow = _this4.props.layersNumber;
            }

            var itemsOnNewRow = _this4.props.items.filter(function (element) {
              if (element.row === newRow && !animatedItemsKeys.some(function (key) {
                return key === element.key;
              })) {
                return element;
              }
            });

            itemsOnNewRow.sort(function (a, b) {
              return a - b;
            });

            if (!mewRowsWithNewItems[newRow]) {
              mewRowsWithNewItems[newRow] = {
                items: _toConsumableArray(itemsOnNewRow)
              };
            }

            if (newEnd.diff(0) !== item.end.diff(0)) {
              item.start = newStart;
              item.end = newEnd;
              item.row = newRow;
              mewRowsWithNewItems[newRow].items.push(item);
            }
          });

          if (mewRowsWithNewItems) {
            Object.keys(mewRowsWithNewItems).forEach(function (el) {
              mewRowsWithNewItems[el].items.sort(function (a, b) {
                return a.start.diff(0) - b.start.diff(0);
              });
            });
            Object.keys(mewRowsWithNewItems).forEach(function (el, i) {
              mewRowsWithNewItems[el].items.forEach(function (element, k) {
                var elDuration = element.end.diff(element.start);

                if (k === 0 && _this4.props.originalStartDate.diff(0) > element.start.diff(0)) {
                  element.start = _this4.props.originalStartDate;
                  element.end = _this4.props.originalStartDate.clone().add(elDuration);
                  items.push(element);
                } else if (mewRowsWithNewItems[el].items[k - 1] && element.start.diff(0) <= mewRowsWithNewItems[el].items[k - 1].end.diff(0)) {
                  element.start = mewRowsWithNewItems[el].items[k - 1].end;
                  element.end = mewRowsWithNewItems[el].items[k - 1].end.clone().add(elDuration);
                  items.push(element);
                }

                if (element.end.diff(0) > _this4.props.originalEndDate) {
                  _this4.props.updateEndDate(element.end);
                }
              });
            });
          } // ======================================================================================
          // ======================================================================================
          // ======================================================================================
          // Default, all items move by the same offset during a drag


          _this4.props.onInteraction(Timeline.changeTypes.dragEnd, changes, items); // Reset the styles


          animatedItems.forEach(function (domItem) {
            domItem.style.webkitTransform = domItem.style.transform = 'translate(0px, 0px)';
            domItem.setAttribute('drag-x', 0);
            domItem.setAttribute('drag-y', 0);
            domItem.style['z-index'] = 3;
            domItem.style['top'] = (0, _commonUtils.intToPix)(_this4.props.itemHeight * Math.round((0, _commonUtils.pixToInt)(domItem.style['top']) / _this4.props.itemHeight));
            domItem.removeAttribute('isDragging');
          });

          _this4._grid.recomputeGridSize({
            rowIndex: 0
          });
        });
      }

      if (canResize) {
        this._itemInteractable.resizable({
          allowFrom: selectedItemSelector,
          edges: {
            left: true,
            right: true,
            bottom: false,
            top: false
          }
        }).on('resizestart', function (e) {
          if (e.target.getAttribute('data-is-resizable') === 'false') {
            return;
          }

          var selected = _this4.props.onInteraction(Timeline.changeTypes.resizeStart, null, _this4.props.selectedItems);

          _lodash["default"].forEach(selected, function (id) {
            var domItem = _this4._gridDomNode.querySelector("span[data-item-index='" + id + "'");

            if (domItem) {
              domItem.setAttribute('isResizing', 'True');
              domItem.setAttribute('initialWidth', (0, _commonUtils.pixToInt)(domItem.style.width));
              domItem.style['z-index'] = 4;
            }
          });
        }).on('resizemove', function (e) {
          var animatedItems = _this4._gridDomNode.querySelectorAll("span[isResizing='True'") || [];
          var dx = parseFloat(e.target.getAttribute('delta-x')) || 0;
          dx += e.deltaRect.left;
          var dw = e.rect.width - Number(e.target.getAttribute('initialWidth'));
          var snappedDx = (0, _timeUtils.getSnapPixelFromDelta)(dx, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);
          var snappedDw = (0, _timeUtils.getSnapPixelFromDelta)(dw, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);

          _lodash["default"].forEach(animatedItems, function (item) {
            var itemData = _this4.itemFromElement(item).item;

            if (itemData.isResizable === false) {
              return;
            }

            var itemWidth = item.offsetWidth;
            var minimumDuration = itemData.minDuration || _this4.props.minItemDuration;
            var maximumDuration = itemData.maxDuration;
            var minimumWidth = (0, _timeUtils.pixelsPerMinute)(_this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth()) * minimumDuration;
            var maximumWidth;

            if (maximumDuration) {
              maximumWidth = (0, _timeUtils.pixelsPerMinute)(_this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth()) * maximumDuration;
            }

            var nearbyElementLeft;
            var nearbyElementRight;

            _this4.props.items.forEach(function (el) {
              if (el.key !== itemData.key && el.row === itemData.row && el.end.diff(0, 'ms') < itemData.start.diff(0, 'ms') && (!nearbyElementLeft || el.end.diff(0, 'ms') > nearbyElementLeft.end.diff(0, 'ms'))) {
                nearbyElementLeft = el;
              }

              if (el.key !== itemData.key && el.start.diff(0, 'ms') > itemData.end.diff(0, 'ms') && (!nearbyElementRight || el.end.diff(0, 'ms') < nearbyElementRight.end.diff(0, 'ms'))) {
                nearbyElementRight = el;
              }
            }); // free space from the element to the start of the timeline + element duration in px


            var spaceLeftInPx = (0, _timeUtils.getPixelAtTime)(itemData.end, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth());
            var spaceRightInPx = (0, _timeUtils.getPixelAtTime)(itemData.start, _this4.props.endDate, _this4.props.startDate, _this4.getTimelineWidth());

            if (nearbyElementLeft && e.deltaRect.left <= 0 && e.deltaRect.right === 0) {
              spaceLeftInPx = spaceLeftInPx - (0, _timeUtils.getPixelAtTime)(nearbyElementLeft.end, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth()); // spaceLeftInPx = spaceLeftInPx - getPixelAtTime(nearbyElementLeft.end, this.props.startDate, this.props.endDate, this.getTimelineWidth()) + 10;
              // itemWidth = itemWidth + 10;
            }

            if (nearbyElementRight && e.deltaRect.right >= 0 && e.deltaRect.left === 0) {
              spaceRightInPx = spaceRightInPx - (0, _timeUtils.getPixelAtTime)(nearbyElementRight.start, _this4.props.endDate, _this4.props.startDate, _this4.getTimelineWidth()); // spaceRightInPx = spaceRightInPx - getPixelAtTime(nearbyElementRight.start, this.props.endDate, this.props.startDate, this.getTimelineWidth()) + 10;
              // itemWidth = itemWidth + 10;
            } // resize left
            // if (spaceLeftInPx - itemWidth <= 0 && e.deltaRect.left <= 0 && e.deltaRect.right === 0) {
            //   return;
            // }
            // resize right
            // if (spaceRightInPx - itemWidth <= 0 && e.deltaRect.right >= 0 && e.deltaRect.left === 0) {
            //   return;
            // }
            // check min and max


            var newWidth = (0, _commonUtils.intToPix)(Number(item.getAttribute('initialWidth')) + snappedDw); // if (+(newWidth.replace('px', '')) < minimumWidth
            //   || +(newWidth.replace('px', '')) > maximumWidth) {
            //   return;
            // }

            item.style.width = newWidth;
            item.style.webkitTransform = item.style.transform = 'translate(' + snappedDx + 'px, 0px)';
            e.target.setAttribute('delta-x', dx);
          });
        }).on('resizeend', function (e) {
          var animatedItems = _this4._gridDomNode.querySelectorAll("span[isResizing='True'") || []; // Update time

          var dx = parseFloat(e.target.getAttribute('delta-x')) || 0;
          var isStartTimeChange = dx != 0;
          var items = [];
          var minRowNo = Infinity;
          var durationChange = null; // Calculate the default item positions

          _lodash["default"].forEach(animatedItems, function (domItem) {
            var startPixelOffset = (0, _commonUtils.pixToInt)(domItem.style.left) + dx;

            var _this4$itemFromElemen5 = _this4.itemFromElement(domItem),
                item = _this4$itemFromElemen5.item,
                rowNo = _this4$itemFromElemen5.rowNo;

            var minimumDuration = item.minDuration || _this4.props.minItemDuration;
            var maximumDuration = item.maxDuration;
            minRowNo = Math.min(minRowNo, rowNo);
            var nearbyElement;

            var itemsOnNewRow = _this4.props.items.filter(function (element) {
              return element.row === rowNo;
            });

            itemsOnNewRow.sort(function (a, b) {
              return a - b;
            });

            if (isStartTimeChange) {
              var newStart = (0, _timeUtils.getTimeAtPixel)(startPixelOffset, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);
              if (durationChange === null) durationChange = item.start.diff(newStart, 'ms');
              itemsOnNewRow.forEach(function (el) {
                if (el.key !== item.key && el.end.diff(0, 'ms') <= item.start.diff(0, 'ms') && (!nearbyElement || el.end.diff(0, 'ms') > nearbyElement.end.diff(0, 'ms'))) {
                  nearbyElement = el;
                }
              }); // if has nearby element from left side

              if (nearbyElement && nearbyElement.end.diff(0, 'ms') > newStart.diff(0, 'ms')) {
                newStart = (0, _moment["default"])(nearbyElement.end.diff(0, 'ms') + 10);
              } // resize left


              if (!nearbyElement && _this4.props.startDate.diff(0, 'ms') >= newStart.diff(0, 'ms')) {
                newStart = _this4.props.startDate;
              } // check item minimum size


              if (item.end.diff(newStart, 'ms') < minimumDuration && _this4.props.startDate.diff(0, 'ms') < newStart.diff(0, 'ms')) {
                newStart = (0, _moment["default"])(item.end.diff(0, 'ms') - minimumDuration);
              } // check item maximum size


              if (item.end.diff(newStart, 'ms') > maximumDuration && _this4.props.startDate.diff(0, 'ms') < newStart.diff(0, 'ms')) {
                newStart = (0, _moment["default"])(item.end.diff(0, 'ms') - maximumDuration);
              }

              var widthInPxToEnd = (0, _timeUtils.getPixelAtTime)(item.end, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth());
              var widthInPxToStart = (0, _timeUtils.getPixelAtTime)(newStart, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth());
              var itemWidthInPx = widthInPxToEnd - widthInPxToStart;
              item.start = newStart;
              domItem.style.width = "".concat(itemWidthInPx, "px");
            } else {
              var endPixelOffset = startPixelOffset + (0, _commonUtils.pixToInt)(domItem.style.width);
              var newEnd = (0, _timeUtils.getTimeAtPixel)(endPixelOffset, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);
              if (durationChange === null) durationChange = item.end.diff(newEnd, 'ms');
              itemsOnNewRow.forEach(function (el) {
                if (el.key !== item.key && el.start.diff(0, 'ms') >= item.end.diff(0, 'ms') && (!nearbyElement || el.end.diff(0, 'ms') < nearbyElement.end.diff(0, 'ms'))) {
                  nearbyElement = el;
                }
              }); // if has nearby element from right side

              if (nearbyElement && nearbyElement.start.diff(0, 'ms') < newEnd.diff(0, 'ms')) {
                newEnd = (0, _moment["default"])(nearbyElement.start.diff(0, 'ms') - 10);
              } // resize right


              if (!nearbyElement && _this4.props.endDate.diff(0, 'ms') <= newEnd.diff(0, 'ms')) {
                newEnd = _this4.props.endDate;
              } // check item minimum size


              if (newEnd.diff(item.start, 'ms') < minimumDuration && _this4.props.endDate.diff(0, 'ms') > newEnd.diff(0, 'ms')) {
                newEnd = (0, _moment["default"])(item.start.diff(0, 'ms') + minimumDuration);
              } // check item maximum size


              if (newEnd.diff(item.start, 'ms') > maximumDuration && _this4.props.endDate.diff(0, 'ms') > newEnd.diff(0, 'ms')) {
                newEnd = (0, _moment["default"])(item.start.diff(0, 'ms') + maximumDuration);
              }

              var _widthInPxToEnd = (0, _timeUtils.getPixelAtTime)(newEnd, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth());

              var _widthInPxToStart = (0, _timeUtils.getPixelAtTime)(item.start, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth());

              var _itemWidthInPx = _widthInPxToEnd - _widthInPxToStart;

              item.end = newEnd;
              domItem.style.width = "".concat(_itemWidthInPx, "px");
            } // Check row height doesn't need changing


            var new_row_height = (0, _itemUtils.getMaxOverlappingItems)(_this4.rowItemMap[rowNo], _this4.props.startDate, _this4.props.endDate);

            if (new_row_height !== _this4.rowHeightCache[rowNo]) {
              _this4.rowHeightCache[rowNo] = new_row_height;
            } //Reset styles


            domItem.removeAttribute('isResizing');
            domItem.removeAttribute('initialWidth');
            domItem.style['z-index'] = 3;
            domItem.style.webkitTransform = domItem.style.transform = 'translate(0px, 0px)';
            items.push(item);
          });

          if (durationChange === null) durationChange = 0;
          var changes = {
            isStartTimeChange: isStartTimeChange,
            timeDelta: -durationChange
          };

          _this4.props.onInteraction(Timeline.changeTypes.resizeEnd, changes, items);

          e.target.setAttribute('delta-x', 0);

          _this4._grid.recomputeGridSize({
            rowIndex: minRowNo
          });
        });
      }

      if (canSelect) {
        this._selectRectangleInteractable.draggable({
          enabled: true,
          ignoreFrom: '.item_draggable, .rct9k-group'
        }).styleCursor(false).on('dragstart', function (e) {
          var nearestRowObject = (0, _itemUtils.getNearestRowObject)(e.clientX, e.clientY); // this._selectBox.start(e.clientX, e.clientY);
          // this._selectBox.start(e.clientX, topRowObj.style.top);

          _this4._selectBox.start(e.clientX, nearestRowObject.getBoundingClientRect().y); // const bottomRow = Number(getNearestRowNumber(left + width, top + height));

        }).on('dragmove', function (e) {
          var magicalConstant = 2; // I added this magical constant to solve the issue of selection bleed,
          // I don't understand why it works, but if frequentist statisticians can use imaginary numbers, so can i.

          var _this4$_selectBox = _this4._selectBox,
              startX = _this4$_selectBox.startX,
              startY = _this4$_selectBox.startY;
          var startRowObject = (0, _itemUtils.getNearestRowObject)(startX, startY);
          var clientX = e.clientX,
              clientY = e.clientY;
          var currentRowObject = (0, _itemUtils.getNearestRowObject)(clientX, clientY);

          if (currentRowObject !== undefined && startRowObject !== undefined) {
            // only run if you can detect the top row
            var startRowNumber = (0, _itemUtils.getRowObjectRowNumber)(startRowObject);
            var currentRowNumber = (0, _itemUtils.getRowObjectRowNumber)(currentRowObject); // const numRows = 1 + Math.abs(startRowNumber - currentRowNumber);

            var rowMarginBorder = (0, _itemUtils.getVerticalMarginBorder)(currentRowObject);

            if (startRowNumber <= currentRowNumber) {
              // select box for selection going down
              // get the first selected rows top
              var startTop = Math.ceil(startRowObject.getBoundingClientRect().top + rowMarginBorder); // get the currently selected rows bottom

              var currentBottom = Math.floor((0, _itemUtils.getTrueBottom)(currentRowObject) - magicalConstant - rowMarginBorder);

              _this4._selectBox.start(startX, startTop);

              _this4._selectBox.move(clientX, currentBottom);
            } else {
              // select box for selection going up
              // get the currently selected rows top
              var currentTop = Math.ceil(currentRowObject.getBoundingClientRect().top + rowMarginBorder); // get the first selected rows bottom

              var startBottom = Math.floor((0, _itemUtils.getTrueBottom)(startRowObject) - magicalConstant - rowMarginBorder * 2); // the bottom will bleed south unless you counter the margins and boreders from the above rows

              _this4._selectBox.start(startX, startBottom);

              _this4._selectBox.move(clientX, currentTop);
            }
          }
        }).on('dragend', function (e) {
          var _this4$_selectBox$end = _this4._selectBox.end(),
              top = _this4$_selectBox$end.top,
              left = _this4$_selectBox$end.left,
              width = _this4$_selectBox$end.width,
              height = _this4$_selectBox$end.height; //Get the start and end row of the selection rectangle


          var topRowObject = (0, _itemUtils.getNearestRowObject)(left, top);

          if (topRowObject !== undefined) {
            (function () {
              // only confirm the end of a drag if the selection box is valid
              var topRowNumber = Number((0, _itemUtils.getNearestRowNumber)(left, top));
              var topRowLoc = topRowObject.getBoundingClientRect();
              var rowMarginBorder = (0, _itemUtils.getVerticalMarginBorder)(topRowObject);
              var bottomRow = Number((0, _itemUtils.getNearestRowNumber)(left + width, Math.floor(topRowLoc.top - rowMarginBorder) + Math.floor(height - rowMarginBorder))); //Get the start and end time of the selection rectangle

              left = left - _this4.props.groupOffset;
              var startOffset = width > 0 ? left : left + width;
              var endOffset = width > 0 ? left + width : left;
              var startTime = (0, _timeUtils.getTimeAtPixel)(startOffset, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);
              var endTime = (0, _timeUtils.getTimeAtPixel)(endOffset, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth(), _this4.props.snapMinutes); //Get items in these ranges

              var selectedItems = [];

              for (var r = Math.min(topRowNumber, bottomRow); r <= Math.max(topRowNumber, bottomRow); r++) {
                selectedItems.push.apply(selectedItems, _toConsumableArray(_lodash["default"].filter(_this4.rowItemMap[r], function (i) {
                  return i.start.isBefore(endTime) && i.end.isAfter(startTime);
                })));
              }

              _this4.props.onInteraction(Timeline.changeTypes.itemsSelected, selectedItems);
            })();
          }
        });
      }
    }
  }, {
    key: "cellRenderer",
    value: function cellRenderer(width) {
      var _this5 = this;

      var _this$props2 = this.props,
          timelineMode = _this$props2.timelineMode,
          onItemHover = _this$props2.onItemHover,
          onItemLeave = _this$props2.onItemLeave,
          rowLayers = _this$props2.rowLayers;
      var canSelect = Timeline.isBitSet(Timeline.TIMELINE_MODES.SELECT, timelineMode);
      return function (_ref) {
        var columnIndex = _ref.columnIndex,
            key = _ref.key,
            parent = _ref.parent,
            rowIndex = _ref.rowIndex,
            style = _ref.style;
        var itemCol = 1;

        if (itemCol == columnIndex) {
          var itemsInRow = _this5.rowItemMap[rowIndex];
          var layersInRow = rowLayers.filter(function (r) {
            return r.rowNumber === rowIndex;
          });
          var rowHeight = _this5.props.itemHeight;

          if (_this5.rowHeightCache[rowIndex]) {
            rowHeight = rowHeight * _this5.rowHeightCache[rowIndex];
          }

          return /*#__PURE__*/_react["default"].createElement("div", {
            key: key,
            style: style,
            "data-row-index": rowIndex,
            className: "rct9k-row",
            onClick: function onClick(e) {
              return _this5._handleItemRowEvent(e, Timeline.no_op, _this5.props.onRowClick);
            },
            onMouseDown: function onMouseDown(e) {
              return _this5.selecting = false;
            },
            onMouseMove: function onMouseMove(e) {
              return _this5.selecting = true;
            },
            onMouseOver: function onMouseOver(e) {
              _this5.selecting = false;
              return _this5._handleItemRowEvent(e, onItemHover, null);
            },
            onMouseLeave: function onMouseLeave(e) {
              _this5.selecting = false;
              return _this5._handleItemRowEvent(e, onItemLeave, null);
            },
            onContextMenu: function onContextMenu(e) {
              return _this5._handleItemRowEvent(e, _this5.props.onItemContextClick, _this5.props.onRowContextClick);
            },
            onDoubleClick: function onDoubleClick(e) {
              return _this5._handleItemRowEvent(e, _this5.props.onItemDoubleClick, _this5.props.onRowDoubleClick);
            }
          }, (0, _itemUtils.rowItemsRenderer)(itemsInRow, _this5.props.startDate, _this5.props.endDate, width, _this5.props.itemHeight, _this5.props.itemRenderer, canSelect ? _this5.props.selectedItems : []), (0, _itemUtils.rowLayerRenderer)(layersInRow, _this5.props.startDate, _this5.props.endDate, width, rowHeight));
        }
      };
    }
  }, {
    key: "rowHeight",
    value: function rowHeight(_ref2) {
      var index = _ref2.index;
      // let rh = this.rowHeightCache[index] ? this.rowHeightCache[index] : 1;
      var rh = 1;
      return rh * this.props.itemHeight;
    }
  }, {
    key: "grid_ref_callback",
    value: function grid_ref_callback(reactComponent) {
      this._grid = reactComponent;
      this._gridDomNode = _reactDom["default"].findDOMNode(this._grid);
    }
  }, {
    key: "select_ref_callback",
    value: function select_ref_callback(reactComponent) {
      this._selectBox = reactComponent;
    }
  }, {
    key: "throttledMouseMoveFunc",
    value: function throttledMouseMoveFunc(e) {
      var componentId = this.props.componentId;
      var leftOffset = document.querySelector(".rct9k-id-".concat(componentId, " .parent-div")).getBoundingClientRect().left;
      var cursorSnappedTime = (0, _timeUtils.getTimeAtPixel)(e.clientX - this.props.groupOffset - leftOffset, this.props.startDate, this.props.endDate, this.getTimelineWidth(), this.props.snapMinutes);

      if (!this.mouse_snapped_time || this.mouse_snapped_time.unix() !== cursorSnappedTime.unix()) {
        if (cursorSnappedTime.isSameOrAfter(this.props.startDate)) {
          this.mouse_snapped_time = cursorSnappedTime;
          this.setState({
            cursorTime: this.mouse_snapped_time
          });
          this.props.onInteraction(Timeline.changeTypes.snappedMouseMove, {
            snappedTime: this.mouse_snapped_time.clone()
          }, null);
        }
      }
    }
  }, {
    key: "mouseMoveFunc",
    value: function mouseMoveFunc(e) {
      e.persist();
      this.throttledMouseMoveFunc(e);
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props3 = this.props,
          timebarFormat = _this$props3.timebarFormat,
          componentId = _this$props3.componentId,
          shallowUpdateCheck = _this$props3.shallowUpdateCheck,
          forceRedrawFunc = _this$props3.forceRedrawFunc,
          bottomResolution = _this$props3.bottomResolution,
          topResolution = _this$props3.topResolution;
      var divCssClass = "rct9k-timeline-div rct9k-id-".concat(componentId);
      var varTimebarProps = {};
      if (timebarFormat) varTimebarProps['timeFormats'] = timebarFormat;
      if (bottomResolution) varTimebarProps['bottom_resolution'] = bottomResolution;
      if (topResolution) varTimebarProps['top_resolution'] = topResolution;

      function columnWidth(width) {
        return function (_ref3) {
          var index = _ref3.index;
          if (index === 0) return 0;
          return width;
        };
      }

      function calculateHeight(height) {
        // when this function is called for the first time, the timebar is not yet rendered
        var timebar = document.querySelector(".rct9k-id-".concat(componentId, " .rct9k-timebar"));

        if (!timebar) {
          return 0;
        } // substract timebar height from total height


        var timebarHeight = timebar.getBoundingClientRect().height;
        return Math.max(height - timebarHeight, 0);
      }

      return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: divCssClass
      }, /*#__PURE__*/_react["default"].createElement(_reactVirtualized.AutoSizer, {
        className: "rct9k-autosizer",
        onResize: this.refreshGrid
      }, function (_ref4) {
        var height = _ref4.height,
            width = _ref4.width;
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "parent-div",
          onMouseMove: _this6.mouseMoveFunc
        }, /*#__PURE__*/_react["default"].createElement(_selector["default"], {
          ref: _this6.select_ref_callback
        }), /*#__PURE__*/_react["default"].createElement(_timebar["default"], _extends({
          start: _this6.props.startDate,
          end: _this6.props.endDate,
          width: width
        }, varTimebarProps)), /*#__PURE__*/_react["default"].createElement(_body["default"], {
          width: width,
          columnWidth: columnWidth(width),
          height: calculateHeight(height),
          rowHeight: _this6.rowHeight,
          rowCount: _this6.props.groups.length,
          cellRenderer: _this6.cellRenderer(_this6.getTimelineWidth(width)),
          grid_ref_callback: _this6.grid_ref_callback,
          shallowUpdateCheck: shallowUpdateCheck,
          forceRedrawFunc: forceRedrawFunc
        }));
      })));
    }
  }]);

  return Timeline;
}(_react["default"].Component);

exports["default"] = Timeline;

_defineProperty(Timeline, "TIMELINE_MODES", Object.freeze({
  SELECT: 1,
  DRAG: 2,
  RESIZE: 4
}));

_defineProperty(Timeline, "propTypes", {
  items: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    key: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]).isRequired,
    title: _propTypes["default"].string,
    row: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
    start: _propTypes["default"].object.isRequired,
    end: _propTypes["default"].object.isRequired,
    minDuration: _propTypes["default"].number,
    maxDuration: _propTypes["default"].number,
    isResizable: _propTypes["default"].bool
  })).isRequired,
  layersNumber: _propTypes["default"].number.isRequired,
  groups: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  groupOffset: _propTypes["default"].number,
  rowLayers: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    start: _propTypes["default"].object.isRequired,
    end: _propTypes["default"].object.isRequired,
    rowNumber: _propTypes["default"].number.isRequired,
    style: _propTypes["default"].object.isRequired
  })),
  selectedItems: _propTypes["default"].arrayOf(_propTypes["default"].number),
  startDate: _propTypes["default"].object.isRequired,
  endDate: _propTypes["default"].object.isRequired,
  originalStartDate: _propTypes["default"].object.isRequired,
  originalEndDate: _propTypes["default"].object.isRequired,
  snapMinutes: _propTypes["default"].number,
  showCursorTime: _propTypes["default"].bool,
  cursorTimeFormat: _propTypes["default"].string,
  componentId: _propTypes["default"].string,
  // A unique key to identify the component. Only needed when 2 grids are mounted
  itemHeight: _propTypes["default"].number,
  timelineMode: _propTypes["default"].number,
  timebarFormat: _propTypes["default"].object,
  onItemClick: _propTypes["default"].func,
  onItemDoubleClick: _propTypes["default"].func,
  onItemContext: _propTypes["default"].func,
  onInteraction: _propTypes["default"].func.isRequired,
  onRowClick: _propTypes["default"].func,
  onRowContext: _propTypes["default"].func,
  onRowDoubleClick: _propTypes["default"].func,
  onItemHover: _propTypes["default"].func,
  onItemLeave: _propTypes["default"].func,
  itemRenderer: _propTypes["default"].func,
  groupRenderer: _propTypes["default"].func,
  groupTitleRenderer: _propTypes["default"].func,
  shallowUpdateCheck: _propTypes["default"].bool,
  forceRedrawFunc: _propTypes["default"].func,
  bottomResolution: _propTypes["default"].string,
  topResolution: _propTypes["default"].string,
  minItemDuration: _propTypes["default"].number,
  // in ms
  updateEndDate: _propTypes["default"].func.isRequired
});

_defineProperty(Timeline, "defaultProps", {
  items: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    minDuration: _timebarConsts.minElementDuration,
    isResizable: true
  })).isRequired,
  rowLayers: [],
  groupOffset: 0,
  itemHeight: 40,
  snapMinutes: 0.01,
  cursorTimeFormat: 'mm:ss:ms',
  componentId: 'r9k1',
  showCursorTime: true,
  groupRenderer: _renderers.DefaultGroupRenderer,
  itemRenderer: _renderers.DefaultItemRenderer,
  groupTitleRenderer: function groupTitleRenderer() {
    return /*#__PURE__*/_react["default"].createElement("div", null);
  },
  timelineMode: Timeline.TIMELINE_MODES.SELECT | Timeline.TIMELINE_MODES.DRAG | Timeline.TIMELINE_MODES.RESIZE,
  shallowUpdateCheck: false,
  forceRedrawFunc: null,
  onItemHover: function onItemHover() {},
  onItemLeave: function onItemLeave() {},
  minItemDuration: _timebarConsts.minElementDuration // in ms

});

_defineProperty(Timeline, "changeTypes", {
  resizeStart: 'resizeStart',
  resizeEnd: 'resizeEnd',
  dragEnd: 'dragEnd',
  dragStart: 'dragStart',
  itemsSelected: 'itemsSelected',
  snappedMouseMove: 'snappedMouseMove'
});

_defineProperty(Timeline, "no_op", function () {});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lbGluZS5qcyJdLCJuYW1lcyI6WyJzY3JvbGxIZWlnaHQiLCJUaW1lbGluZSIsImJpdCIsIm1hc2siLCJwcm9wcyIsImNvbmZpZyIsIl9ncmlkIiwicmVjb21wdXRlR3JpZFNpemUiLCJlIiwiaXRlbUNhbGxiYWNrIiwicm93Q2FsbGJhY2siLCJwcmV2ZW50RGVmYXVsdCIsInNlbGVjdGluZyIsInRhcmdldCIsImhhc0F0dHJpYnV0ZSIsInBhcmVudEVsZW1lbnQiLCJpdGVtS2V5IiwiZ2V0QXR0cmlidXRlIiwiTnVtYmVyIiwicm93IiwiY2xpY2tlZFRpbWUiLCJjbGllbnRYIiwiZ3JvdXBPZmZzZXQiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiZ2V0VGltZWxpbmVXaWR0aCIsInNuYXBwZWRDbGlja2VkVGltZSIsInNuYXBNaW51dGVzIiwic3RhdGUiLCJzZWxlY3Rpb24iLCJjdXJzb3JUaW1lIiwic2V0VGltZU1hcCIsIml0ZW1zIiwiY2VsbFJlbmRlcmVyIiwiYmluZCIsInJvd0hlaWdodCIsImdldEl0ZW0iLCJjaGFuZ2VHcm91cCIsInNldFNlbGVjdGlvbiIsImNsZWFyU2VsZWN0aW9uIiwiaXRlbUZyb21FbGVtZW50IiwidXBkYXRlRGltZW5zaW9ucyIsImdyaWRfcmVmX2NhbGxiYWNrIiwic2VsZWN0X3JlZl9jYWxsYmFjayIsInRocm90dGxlZE1vdXNlTW92ZUZ1bmMiLCJfIiwidGhyb3R0bGUiLCJtb3VzZU1vdmVGdW5jIiwiY2FuU2VsZWN0IiwiaXNCaXRTZXQiLCJUSU1FTElORV9NT0RFUyIsIlNFTEVDVCIsInRpbWVsaW5lTW9kZSIsImNhbkRyYWciLCJEUkFHIiwiY2FuUmVzaXplIiwiUkVTSVpFIiwic2V0VXBEcmFnZ2luZyIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJuZXh0UHJvcHMiLCJyZWZyZXNoR3JpZCIsIl9pdGVtSW50ZXJhY3RhYmxlIiwidW5zZXQiLCJfc2VsZWN0UmVjdGFuZ2xlSW50ZXJhY3RhYmxlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsInNlbGVjdGVkSXRlbXMiLCJzZWxlY3Rpb25DaGFuZ2UiLCJpc0VxdWFsIiwidGltZWxpbmVNb2RlQ2hhbmdlIiwiY2xlYXJUaW1lb3V0IiwicmVzaXplVGltZW91dCIsInNldFRpbWVvdXQiLCJmb3JjZVVwZGF0ZSIsIml0ZW1Sb3dNYXAiLCJyb3dJdGVtTWFwIiwicm93SGVpZ2h0Q2FjaGUiLCJ2aXNpYmxlSXRlbXMiLCJmaWx0ZXIiLCJpIiwiZW5kIiwic3RhcnQiLCJpdGVtUm93cyIsImdyb3VwQnkiLCJmb3JFYWNoIiwicm93SW50IiwicGFyc2VJbnQiLCJ1bmRlZmluZWQiLCJpdGVtIiwia2V5IiwicHVzaCIsImluZGV4Iiwicm93Tm8iLCJpdGVtSW5kZXgiLCJmaW5kSW5kZXgiLCJpZCIsImN1clJvdyIsIm5ld1JvdyIsInNlbGVjdGlvbnMiLCJuZXdTZWxlY3Rpb24iLCJtYXAiLCJzIiwiY2xvbmUiLCJzZXRTdGF0ZSIsInRvdGFsV2lkdGgiLCJ3aWR0aCIsInRvcERpdkNsYXNzSWQiLCJjb21wb25lbnRJZCIsInNlbGVjdGVkSXRlbVNlbGVjdG9yIiwib24iLCJfaGFuZGxlSXRlbVJvd0V2ZW50Iiwib25JdGVtQ2xpY2siLCJvblJvd0NsaWNrIiwiZHJhZ2dhYmxlIiwiZW5hYmxlZCIsImFsbG93RnJvbSIsInJlc3RyaWN0IiwicmVzdHJpY3Rpb24iLCJlbGVtZW50UmVjdCIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsImFuaW1hdGVkSXRlbXMiLCJvbkludGVyYWN0aW9uIiwiY2hhbmdlVHlwZXMiLCJkcmFnU3RhcnQiLCJkb21JdGVtIiwiX2dyaWREb21Ob2RlIiwicXVlcnlTZWxlY3RvciIsInNldEF0dHJpYnV0ZSIsInN0eWxlIiwicXVlcnlTZWxlY3RvckFsbCIsImR4IiwicGFyc2VGbG9hdCIsImR5Iiwic25hcER4Iiwib3JpZ2luYWxTdGFydERhdGUiLCJvcmlnaW5hbEVuZERhdGUiLCJpdGVtRHVyYXRpb24iLCJkaWZmIiwibmV3UGl4ZWxPZmZzZXQiLCJ0b0ZpeGVkIiwibmV3U3RhcnQiLCJuZXdFbmQiLCJhZGQiLCJ3ZWJraXRUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm0iLCJhbmltYXRlZEl0ZW1zS2V5cyIsImNsaWVudFkiLCJkb2N1bWVudCIsInJvd0NoYW5nZURlbHRhIiwidGltZURlbHRhIiwiY2hhbmdlcyIsIml0ZW1zT25OZXdSb3dGb3JUYXJnZXQiLCJlbGVtZW50IiwidGFyZ2V0RHVyYXRpb24iLCJ0YXJnZXROZXdFbmQiLCJuZXdUYXJnZXRTdGFydEluTXMiLCJuZXdUYXJnZXRFbmRJbk1zIiwidGFyZ2V0QWJvdmVFbGVtZW50Iiwic29ydCIsImEiLCJiIiwic29tZSIsImVsZW1lbnRTdGFydEluTXMiLCJlbGVtZW50RW5kSW5NcyIsImxlbmd0aCIsIm9uZU9mSXRlbUFib3ZlRWxlbWVudCIsIm5ld1N0YXJ0SW5NcyIsIm5ld0VuZEluTXMiLCJjdXJyZW50SXRlbU5ld1JvdyIsIml0ZW1zT25OZXdSb3ciLCJtZXdSb3dzV2l0aE5ld0l0ZW1zIiwidGltZWxpbmVTdGFydEluTXMiLCJsYXllcnNOdW1iZXIiLCJPYmplY3QiLCJrZXlzIiwiZWwiLCJrIiwiZWxEdXJhdGlvbiIsInVwZGF0ZUVuZERhdGUiLCJkcmFnRW5kIiwiaXRlbUhlaWdodCIsIk1hdGgiLCJyb3VuZCIsInJlbW92ZUF0dHJpYnV0ZSIsInJvd0luZGV4IiwicmVzaXphYmxlIiwiZWRnZXMiLCJzZWxlY3RlZCIsInJlc2l6ZVN0YXJ0IiwiZGVsdGFSZWN0IiwiZHciLCJyZWN0Iiwic25hcHBlZER4Iiwic25hcHBlZER3IiwiaXRlbURhdGEiLCJpc1Jlc2l6YWJsZSIsIml0ZW1XaWR0aCIsIm9mZnNldFdpZHRoIiwibWluaW11bUR1cmF0aW9uIiwibWluRHVyYXRpb24iLCJtaW5JdGVtRHVyYXRpb24iLCJtYXhpbXVtRHVyYXRpb24iLCJtYXhEdXJhdGlvbiIsIm1pbmltdW1XaWR0aCIsIm1heGltdW1XaWR0aCIsIm5lYXJieUVsZW1lbnRMZWZ0IiwibmVhcmJ5RWxlbWVudFJpZ2h0Iiwic3BhY2VMZWZ0SW5QeCIsInNwYWNlUmlnaHRJblB4IiwibmV3V2lkdGgiLCJpc1N0YXJ0VGltZUNoYW5nZSIsIm1pblJvd05vIiwiSW5maW5pdHkiLCJkdXJhdGlvbkNoYW5nZSIsInN0YXJ0UGl4ZWxPZmZzZXQiLCJtaW4iLCJuZWFyYnlFbGVtZW50Iiwid2lkdGhJblB4VG9FbmQiLCJ3aWR0aEluUHhUb1N0YXJ0IiwiaXRlbVdpZHRoSW5QeCIsImVuZFBpeGVsT2Zmc2V0IiwibmV3X3Jvd19oZWlnaHQiLCJyZXNpemVFbmQiLCJpZ25vcmVGcm9tIiwic3R5bGVDdXJzb3IiLCJuZWFyZXN0Um93T2JqZWN0IiwiX3NlbGVjdEJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInkiLCJtYWdpY2FsQ29uc3RhbnQiLCJzdGFydFgiLCJzdGFydFkiLCJzdGFydFJvd09iamVjdCIsImN1cnJlbnRSb3dPYmplY3QiLCJzdGFydFJvd051bWJlciIsImN1cnJlbnRSb3dOdW1iZXIiLCJyb3dNYXJnaW5Cb3JkZXIiLCJzdGFydFRvcCIsImNlaWwiLCJjdXJyZW50Qm90dG9tIiwiZmxvb3IiLCJtb3ZlIiwiY3VycmVudFRvcCIsInN0YXJ0Qm90dG9tIiwiaGVpZ2h0IiwidG9wUm93T2JqZWN0IiwidG9wUm93TnVtYmVyIiwidG9wUm93TG9jIiwiYm90dG9tUm93Iiwic3RhcnRPZmZzZXQiLCJlbmRPZmZzZXQiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiciIsIm1heCIsImlzQmVmb3JlIiwiaXNBZnRlciIsIml0ZW1zU2VsZWN0ZWQiLCJvbkl0ZW1Ib3ZlciIsIm9uSXRlbUxlYXZlIiwicm93TGF5ZXJzIiwiY29sdW1uSW5kZXgiLCJwYXJlbnQiLCJpdGVtQ29sIiwiaXRlbXNJblJvdyIsImxheWVyc0luUm93Iiwicm93TnVtYmVyIiwibm9fb3AiLCJvbkl0ZW1Db250ZXh0Q2xpY2siLCJvblJvd0NvbnRleHRDbGljayIsIm9uSXRlbURvdWJsZUNsaWNrIiwib25Sb3dEb3VibGVDbGljayIsIml0ZW1SZW5kZXJlciIsInJoIiwicmVhY3RDb21wb25lbnQiLCJSZWFjdERPTSIsImZpbmRET01Ob2RlIiwibGVmdE9mZnNldCIsImN1cnNvclNuYXBwZWRUaW1lIiwibW91c2Vfc25hcHBlZF90aW1lIiwidW5peCIsImlzU2FtZU9yQWZ0ZXIiLCJzbmFwcGVkTW91c2VNb3ZlIiwic25hcHBlZFRpbWUiLCJwZXJzaXN0IiwidGltZWJhckZvcm1hdCIsInNoYWxsb3dVcGRhdGVDaGVjayIsImZvcmNlUmVkcmF3RnVuYyIsImJvdHRvbVJlc29sdXRpb24iLCJ0b3BSZXNvbHV0aW9uIiwiZGl2Q3NzQ2xhc3MiLCJ2YXJUaW1lYmFyUHJvcHMiLCJjb2x1bW5XaWR0aCIsImNhbGN1bGF0ZUhlaWdodCIsInRpbWViYXIiLCJ0aW1lYmFySGVpZ2h0IiwiZ3JvdXBzIiwiUmVhY3QiLCJDb21wb25lbnQiLCJmcmVlemUiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwic2hhcGUiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwidGl0bGUiLCJvYmplY3QiLCJib29sIiwic2hvd0N1cnNvclRpbWUiLCJjdXJzb3JUaW1lRm9ybWF0IiwiZnVuYyIsIm9uSXRlbUNvbnRleHQiLCJvblJvd0NvbnRleHQiLCJncm91cFJlbmRlcmVyIiwiZ3JvdXBUaXRsZVJlbmRlcmVyIiwibWluRWxlbWVudER1cmF0aW9uIiwiRGVmYXVsdEdyb3VwUmVuZGVyZXIiLCJEZWZhdWx0SXRlbVJlbmRlcmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBV0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxHQUFHLENBQXJC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cEI3USxFQUFBQSxZQUFZLEVBQUVuRCxRQUFRLENBQUNpRCxjQUFULENBQXdCQyxNQUF4QixHQUFpQ2xELFFBQVEsQ0FBQ2lELGNBQVQsQ0FBd0JJLElBQXpELEdBQWdFckQsUUFBUSxDQUFDaUQsY0FBVCxDQUF3Qk0sTUFqQmxGO0FBa0JwQjJPLEVBQUFBLGtCQUFrQixFQUFFLEtBbEJBO0FBbUJwQkMsRUFBQUEsZUFBZSxFQUFFLElBbkJHO0FBb0JwQjdCLEVBQUFBLFdBcEJvQix5QkFvQk4sQ0FBRSxDQXBCSTtBQXFCcEJDLEVBQUFBLFdBckJvQix5QkFxQk4sQ0FBRSxDQXJCSTtBQXNCcEIzRCxFQUFBQSxlQUFlLEVBQUVxSCxpQ0F0QkcsQ0FzQmdCOztBQXRCaEIsQzs7Z0JBL0RIalUsUSxpQkF3RkU7QUFDbkJnTSxFQUFBQSxXQUFXLEVBQUUsYUFETTtBQUVuQmtDLEVBQUFBLFNBQVMsRUFBRSxXQUZRO0FBR25CM0MsRUFBQUEsT0FBTyxFQUFFLFNBSFU7QUFJbkJ4RCxFQUFBQSxTQUFTLEVBQUUsV0FKUTtBQUtuQnNJLEVBQUFBLGFBQWEsRUFBRSxlQUxJO0FBTW5CeUIsRUFBQUEsZ0JBQWdCLEVBQUU7QUFOQyxDOztnQkF4RkY5UixRLFdBcUdKLFlBQU0sQ0FBRSxDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7RnJhZ21lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7QXV0b1NpemVyfSBmcm9tICdyZWFjdC12aXJ0dWFsaXplZCc7XHJcblxyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBpbnRlcmFjdCBmcm9tICdpbnRlcmFjdGpzJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7bWluRWxlbWVudER1cmF0aW9ufSBmcm9tICcuL2NvbnN0cy90aW1lYmFyQ29uc3RzJztcclxuaW1wb3J0IHtwaXhUb0ludCwgaW50VG9QaXgsIHN1bVN0eWxlfSBmcm9tICcuL3V0aWxzL2NvbW1vblV0aWxzJztcclxuaW1wb3J0IHtcclxuICByb3dJdGVtc1JlbmRlcmVyLFxyXG4gIHNjcm9sbEl0ZW1SZW5kZXJlcixcclxuICByb3dMYXllclJlbmRlcmVyLFxyXG4gIGdldE5lYXJlc3RSb3dOdW1iZXIsXHJcbiAgZ2V0TmVhcmVzdFJvd09iamVjdCxcclxuICBnZXRNYXhPdmVybGFwcGluZ0l0ZW1zLFxyXG4gIGdldFRydWVCb3R0b20sXHJcbiAgZ2V0VmVydGljYWxNYXJnaW5Cb3JkZXIsXHJcbiAgZ2V0Um93T2JqZWN0Um93TnVtYmVyXHJcbn0gZnJvbSAnLi91dGlscy9pdGVtVXRpbHMnO1xyXG5pbXBvcnQge3RpbWVTbmFwLCBnZXRUaW1lQXRQaXhlbCwgZ2V0UGl4ZWxBdFRpbWUsIGdldFNuYXBQaXhlbEZyb21EZWx0YSwgcGl4ZWxzUGVyTWludXRlfSBmcm9tICcuL3V0aWxzL3RpbWVVdGlscyc7XHJcbmltcG9ydCBUaW1lYmFyIGZyb20gJy4vY29tcG9uZW50cy90aW1lYmFyJztcclxuaW1wb3J0IFNlbGVjdEJveCBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0b3InO1xyXG5pbXBvcnQge0RlZmF1bHRHcm91cFJlbmRlcmVyLCBEZWZhdWx0SXRlbVJlbmRlcmVyfSBmcm9tICcuL2NvbXBvbmVudHMvcmVuZGVyZXJzJztcclxuaW1wb3J0IFRpbWVsaW5lQm9keSBmcm9tICcuL2NvbXBvbmVudHMvYm9keSc7XHJcblxyXG4vLyBzdGFydHNXaXRoIHBvbHlmaWxsIGZvciBJRTExIHN1cHBvcnRcclxuaW1wb3J0ICdjb3JlLWpzL2ZuL3N0cmluZy9zdGFydHMtd2l0aCc7XHJcblxyXG5jb25zdCBzY3JvbGxIZWlnaHQgPSA3O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZWxpbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHN0YXRpYyBUSU1FTElORV9NT0RFUyA9IE9iamVjdC5mcmVlemUoe1xyXG4gICAgU0VMRUNUOiAxLFxyXG4gICAgRFJBRzogMixcclxuICAgIFJFU0laRTogNFxyXG4gIH0pO1xyXG5cclxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFxyXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgIGtleTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgcm93OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXHJcbiAgICAgICAgc3RhcnQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICBtaW5EdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICBtYXhEdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICBpc1Jlc2l6YWJsZTogUHJvcFR5cGVzLmJvb2xcclxuICAgICAgfSlcclxuICAgICkuaXNSZXF1aXJlZCxcclxuICAgIGxheWVyc051bWJlcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgZ3JvdXBzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxyXG4gICAgZ3JvdXBPZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICByb3dMYXllcnM6IFByb3BUeXBlcy5hcnJheU9mKFxyXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgcm93TnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIHNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxyXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBvcmlnaW5hbFN0YXJ0RGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgb3JpZ2luYWxFbmREYXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBzbmFwTWludXRlczogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHNob3dDdXJzb3JUaW1lOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGN1cnNvclRpbWVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBjb21wb25lbnRJZDogUHJvcFR5cGVzLnN0cmluZywgLy8gQSB1bmlxdWUga2V5IHRvIGlkZW50aWZ5IHRoZSBjb21wb25lbnQuIE9ubHkgbmVlZGVkIHdoZW4gMiBncmlkcyBhcmUgbW91bnRlZFxyXG4gICAgaXRlbUhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHRpbWVsaW5lTW9kZTogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHRpbWViYXJGb3JtYXQ6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBvbkl0ZW1DbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkl0ZW1Eb3VibGVDbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkl0ZW1Db250ZXh0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uSW50ZXJhY3Rpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBvblJvd0NsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uUm93Q29udGV4dDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvblJvd0RvdWJsZUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uSXRlbUhvdmVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uSXRlbUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGl0ZW1SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBncm91cFJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGdyb3VwVGl0bGVSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBzaGFsbG93VXBkYXRlQ2hlY2s6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZm9yY2VSZWRyYXdGdW5jOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGJvdHRvbVJlc29sdXRpb246IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0b3BSZXNvbHV0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbWluSXRlbUR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLCAvLyBpbiBtc1xyXG4gICAgdXBkYXRlRW5kRGF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBpdGVtczogUHJvcFR5cGVzLmFycmF5T2YoXHJcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICAgICAgbWluRHVyYXRpb246IG1pbkVsZW1lbnREdXJhdGlvbixcclxuICAgICAgICBpc1Jlc2l6YWJsZTogdHJ1ZVxyXG4gICAgICB9KVxyXG4gICAgKS5pc1JlcXVpcmVkLFxyXG4gICAgcm93TGF5ZXJzOiBbXSxcclxuICAgIGdyb3VwT2Zmc2V0OiAwLFxyXG4gICAgaXRlbUhlaWdodDogNDAsXHJcbiAgICBzbmFwTWludXRlczogMC4wMSxcclxuICAgIGN1cnNvclRpbWVGb3JtYXQ6ICdtbTpzczptcycsXHJcbiAgICBjb21wb25lbnRJZDogJ3I5azEnLFxyXG4gICAgc2hvd0N1cnNvclRpbWU6IHRydWUsXHJcbiAgICBncm91cFJlbmRlcmVyOiBEZWZhdWx0R3JvdXBSZW5kZXJlcixcclxuICAgIGl0ZW1SZW5kZXJlcjogRGVmYXVsdEl0ZW1SZW5kZXJlcixcclxuICAgIGdyb3VwVGl0bGVSZW5kZXJlcjogKCkgPT4gPGRpdiAvPixcclxuICAgIHRpbWVsaW5lTW9kZTogVGltZWxpbmUuVElNRUxJTkVfTU9ERVMuU0VMRUNUIHwgVGltZWxpbmUuVElNRUxJTkVfTU9ERVMuRFJBRyB8IFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlJFU0laRSxcclxuICAgIHNoYWxsb3dVcGRhdGVDaGVjazogZmFsc2UsXHJcbiAgICBmb3JjZVJlZHJhd0Z1bmM6IG51bGwsXHJcbiAgICBvbkl0ZW1Ib3ZlcigpIHt9LFxyXG4gICAgb25JdGVtTGVhdmUoKSB7fSxcclxuICAgIG1pbkl0ZW1EdXJhdGlvbjogbWluRWxlbWVudER1cmF0aW9uIC8vIGluIG1zXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGNoYW5nZVR5cGVzID0ge1xyXG4gICAgcmVzaXplU3RhcnQ6ICdyZXNpemVTdGFydCcsXHJcbiAgICByZXNpemVFbmQ6ICdyZXNpemVFbmQnLFxyXG4gICAgZHJhZ0VuZDogJ2RyYWdFbmQnLFxyXG4gICAgZHJhZ1N0YXJ0OiAnZHJhZ1N0YXJ0JyxcclxuICAgIGl0ZW1zU2VsZWN0ZWQ6ICdpdGVtc1NlbGVjdGVkJyxcclxuICAgIHNuYXBwZWRNb3VzZU1vdmU6ICdzbmFwcGVkTW91c2VNb3ZlJ1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBpc0JpdFNldChiaXQsIG1hc2spIHtcclxuICAgIHJldHVybiAoYml0ICYgbWFzaykgPT09IGJpdDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBub19vcCA9ICgpID0+IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc3RhdGUgPSB7c2VsZWN0aW9uOiBbXSwgY3Vyc29yVGltZTogbnVsbH07XHJcbiAgICB0aGlzLnNldFRpbWVNYXAodGhpcy5wcm9wcy5pdGVtcyk7XHJcblxyXG4gICAgdGhpcy5jZWxsUmVuZGVyZXIgPSB0aGlzLmNlbGxSZW5kZXJlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5yb3dIZWlnaHQgPSB0aGlzLnJvd0hlaWdodC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5zZXRUaW1lTWFwID0gdGhpcy5zZXRUaW1lTWFwLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmdldEl0ZW0gPSB0aGlzLmdldEl0ZW0uYmluZCh0aGlzKTtcclxuICAgIHRoaXMuY2hhbmdlR3JvdXAgPSB0aGlzLmNoYW5nZUdyb3VwLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnNldFNlbGVjdGlvbiA9IHRoaXMuc2V0U2VsZWN0aW9uLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmNsZWFyU2VsZWN0aW9uID0gdGhpcy5jbGVhclNlbGVjdGlvbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoID0gdGhpcy5nZXRUaW1lbGluZVdpZHRoLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLml0ZW1Gcm9tRWxlbWVudCA9IHRoaXMuaXRlbUZyb21FbGVtZW50LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMgPSB0aGlzLnVwZGF0ZURpbWVuc2lvbnMuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZ3JpZF9yZWZfY2FsbGJhY2sgPSB0aGlzLmdyaWRfcmVmX2NhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnNlbGVjdF9yZWZfY2FsbGJhY2sgPSB0aGlzLnNlbGVjdF9yZWZfY2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgIHRoaXMudGhyb3R0bGVkTW91c2VNb3ZlRnVuYyA9IF8udGhyb3R0bGUodGhpcy50aHJvdHRsZWRNb3VzZU1vdmVGdW5jLmJpbmQodGhpcyksIDIwKTtcclxuICAgIHRoaXMubW91c2VNb3ZlRnVuYyA9IHRoaXMubW91c2VNb3ZlRnVuYy5iaW5kKHRoaXMpO1xyXG5cclxuICAgIGNvbnN0IGNhblNlbGVjdCA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlNFTEVDVCwgdGhpcy5wcm9wcy50aW1lbGluZU1vZGUpO1xyXG4gICAgY29uc3QgY2FuRHJhZyA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLkRSQUcsIHRoaXMucHJvcHMudGltZWxpbmVNb2RlKTtcclxuICAgIGNvbnN0IGNhblJlc2l6ZSA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlJFU0laRSwgdGhpcy5wcm9wcy50aW1lbGluZU1vZGUpO1xyXG4gICAgdGhpcy5zZXRVcERyYWdnaW5nKGNhblNlbGVjdCwgY2FuRHJhZywgY2FuUmVzaXplKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudXBkYXRlRGltZW5zaW9ucyk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgdGhpcy5zZXRUaW1lTWFwKG5leHRQcm9wcy5pdGVtcywgbmV4dFByb3BzLnN0YXJ0RGF0ZSwgbmV4dFByb3BzLmVuZERhdGUpO1xyXG4gICAgdGhpcy5yZWZyZXNoR3JpZCgpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICBpZiAodGhpcy5faXRlbUludGVyYWN0YWJsZSkgdGhpcy5faXRlbUludGVyYWN0YWJsZS51bnNldCgpO1xyXG4gICAgaWYgKHRoaXMuX3NlbGVjdFJlY3RhbmdsZUludGVyYWN0YWJsZSkgdGhpcy5fc2VsZWN0UmVjdGFuZ2xlSW50ZXJhY3RhYmxlLnVuc2V0KCk7XHJcblxyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudXBkYXRlRGltZW5zaW9ucyk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuICAgIGNvbnN0IHt0aW1lbGluZU1vZGUsIHNlbGVjdGVkSXRlbXN9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHNlbGVjdGlvbkNoYW5nZSA9ICFfLmlzRXF1YWwocHJldlByb3BzLnNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgY29uc3QgdGltZWxpbmVNb2RlQ2hhbmdlID0gIV8uaXNFcXVhbChwcmV2UHJvcHMudGltZWxpbmVNb2RlLCB0aW1lbGluZU1vZGUpO1xyXG5cclxuICAgIGlmICh0aW1lbGluZU1vZGVDaGFuZ2UgfHwgc2VsZWN0aW9uQ2hhbmdlKSB7XHJcbiAgICAgIGNvbnN0IGNhblNlbGVjdCA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlNFTEVDVCwgdGltZWxpbmVNb2RlKTtcclxuICAgICAgY29uc3QgY2FuRHJhZyA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLkRSQUcsIHRpbWVsaW5lTW9kZSk7XHJcbiAgICAgIGNvbnN0IGNhblJlc2l6ZSA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlJFU0laRSwgdGltZWxpbmVNb2RlKTtcclxuICAgICAgdGhpcy5zZXRVcERyYWdnaW5nKGNhblNlbGVjdCwgY2FuRHJhZywgY2FuUmVzaXplKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZURpbWVuc2lvbnMoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lb3V0KTtcclxuICAgIHRoaXMucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICAgIHRoaXMuX2dyaWQucmVjb21wdXRlR3JpZFNpemUoKTtcclxuICAgIH0sIDEwMCk7XHJcbiAgfVxyXG5cclxuICBzZXRUaW1lTWFwKGl0ZW1zLCBzdGFydERhdGUsIGVuZERhdGUpIHtcclxuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XHJcbiAgICAgIHN0YXJ0RGF0ZSA9IHRoaXMucHJvcHMuc3RhcnREYXRlO1xyXG4gICAgICBlbmREYXRlID0gdGhpcy5wcm9wcy5lbmREYXRlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pdGVtUm93TWFwID0ge307IC8vIHRpbWVsaW5lIGVsZW1lbnRzIChrZXkpID0+IChyb3dObykuXHJcbiAgICB0aGlzLnJvd0l0ZW1NYXAgPSB7fTsgLy8gKHJvd05vKSA9PiB0aW1lbGluZSBlbGVtZW50c1xyXG4gICAgdGhpcy5yb3dIZWlnaHRDYWNoZSA9IHt9OyAvLyAocm93Tm8pID0+IG1heCBudW1iZXIgb2Ygc3RhY2tlZCBpdGVtc1xyXG4gICAgbGV0IHZpc2libGVJdGVtcyA9IF8uZmlsdGVyKGl0ZW1zLCBpID0+IHtcclxuICAgICAgcmV0dXJuIGkuZW5kID4gc3RhcnREYXRlICYmIGkuc3RhcnQgPCBlbmREYXRlO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgaXRlbVJvd3MgPSBfLmdyb3VwQnkodmlzaWJsZUl0ZW1zLCAncm93Jyk7XHJcblxyXG4gICAgXy5mb3JFYWNoKGl0ZW1Sb3dzLCAodmlzaWJsZUl0ZW1zLCByb3cpID0+IHtcclxuICAgICAgY29uc3Qgcm93SW50ID0gcGFyc2VJbnQocm93KTtcclxuICAgICAgaWYgKHRoaXMucm93SXRlbU1hcFtyb3dJbnRdID09PSB1bmRlZmluZWQpIHRoaXMucm93SXRlbU1hcFtyb3dJbnRdID0gW107XHJcbiAgICAgIF8uZm9yRWFjaCh2aXNpYmxlSXRlbXMsIGl0ZW0gPT4ge1xyXG4gICAgICAgIHRoaXMuaXRlbVJvd01hcFtpdGVtLmtleV0gPSByb3dJbnQ7XHJcbiAgICAgICAgdGhpcy5yb3dJdGVtTWFwW3Jvd0ludF0ucHVzaChpdGVtKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucm93SGVpZ2h0Q2FjaGVbcm93SW50XSA9IGdldE1heE92ZXJsYXBwaW5nSXRlbXModmlzaWJsZUl0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaXRlbUZyb21FbGVtZW50KGUpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaXRlbS1pbmRleCcpO1xyXG4gICAgY29uc3Qgcm93Tm8gPSB0aGlzLml0ZW1Sb3dNYXBbaW5kZXhdO1xyXG4gICAgY29uc3QgaXRlbUluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5yb3dJdGVtTWFwW3Jvd05vXSwgaSA9PiBpLmtleSA9PSBpbmRleCk7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5yb3dJdGVtTWFwW3Jvd05vXVtpdGVtSW5kZXhdO1xyXG5cclxuICAgIHJldHVybiB7aW5kZXgsIHJvd05vLCBpdGVtSW5kZXgsIGl0ZW19O1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbShpZCkge1xyXG4gICAgLy8gVGhpcyBpcyBxdWl0ZSBzdHVwaWQgYW5kIHNob3VsZG4ndCByZWFsbHkgYmUgbmVlZGVkXHJcbiAgICBjb25zdCByb3dObyA9IHRoaXMuaXRlbVJvd01hcFtpZF07XHJcbiAgICBjb25zdCBpdGVtSW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLnJvd0l0ZW1NYXBbcm93Tm9dLCBpID0+IGkua2V5ID09IGlkKTtcclxuICAgIHJldHVybiB0aGlzLnJvd0l0ZW1NYXBbcm93Tm9dW2l0ZW1JbmRleF07XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VHcm91cChpdGVtLCBjdXJSb3csIG5ld1Jvdykge1xyXG4gICAgaXRlbS5yb3cgPSBuZXdSb3c7XHJcbiAgICB0aGlzLml0ZW1Sb3dNYXBbaXRlbS5rZXldID0gbmV3Um93O1xyXG4gICAgdGhpcy5yb3dJdGVtTWFwW2N1clJvd10gPSB0aGlzLnJvd0l0ZW1NYXBbY3VyUm93XS5maWx0ZXIoaSA9PiBpLmtleSAhPT0gaXRlbS5rZXkpO1xyXG4gICAgdGhpcy5yb3dJdGVtTWFwW25ld1Jvd10ucHVzaChpdGVtKTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb25zKSB7XHJcbiAgICBsZXQgbmV3U2VsZWN0aW9uID0gXy5tYXAoc2VsZWN0aW9ucywgcyA9PiB7XHJcbiAgICAgIHJldHVybiB7c3RhcnQ6IHNbMF0uY2xvbmUoKSwgZW5kOiBzWzFdLmNsb25lKCl9O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3Rpb246IG5ld1NlbGVjdGlvbn0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTZWxlY3Rpb24oKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3Rpb246IFtdfSk7XHJcbiAgfVxyXG5cclxuICBnZXRUaW1lbGluZVdpZHRoKHRvdGFsV2lkdGgpIHtcclxuICAgIGNvbnN0IHtncm91cE9mZnNldH0gPSB0aGlzLnByb3BzO1xyXG4gICAgaWYgKHRvdGFsV2lkdGggIT09IHVuZGVmaW5lZCkgcmV0dXJuIHRvdGFsV2lkdGggLSBncm91cE9mZnNldDtcclxuICAgIHJldHVybiB0aGlzLl9ncmlkLnByb3BzLndpZHRoIC0gZ3JvdXBPZmZzZXQ7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoR3JpZCA9IChjb25maWcgPSB7fSkgPT4ge1xyXG4gICAgdGhpcy5fZ3JpZC5yZWNvbXB1dGVHcmlkU2l6ZShjb25maWcpO1xyXG4gIH07XHJcblxyXG4gIHNldFVwRHJhZ2dpbmcoY2FuU2VsZWN0LCBjYW5EcmFnLCBjYW5SZXNpemUpIHtcclxuICAgIGNvbnN0IHRvcERpdkNsYXNzSWQgPSBgcmN0OWstaWQtJHt0aGlzLnByb3BzLmNvbXBvbmVudElkfWA7XHJcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1TZWxlY3RvciA9ICcucmN0OWstaXRlbXMtb3V0ZXItc2VsZWN0ZWQnO1xyXG4gICAgaWYgKHRoaXMuX2l0ZW1JbnRlcmFjdGFibGUpIHRoaXMuX2l0ZW1JbnRlcmFjdGFibGUudW5zZXQoKTtcclxuICAgIGlmICh0aGlzLl9zZWxlY3RSZWN0YW5nbGVJbnRlcmFjdGFibGUpIHRoaXMuX3NlbGVjdFJlY3RhbmdsZUludGVyYWN0YWJsZS51bnNldCgpO1xyXG5cclxuICAgIHRoaXMuX2l0ZW1JbnRlcmFjdGFibGUgPSBpbnRlcmFjdChgLiR7dG9wRGl2Q2xhc3NJZH0gLml0ZW1fZHJhZ2dhYmxlYCk7XHJcbiAgICB0aGlzLl9zZWxlY3RSZWN0YW5nbGVJbnRlcmFjdGFibGUgPSBpbnRlcmFjdChgLiR7dG9wRGl2Q2xhc3NJZH0gLnBhcmVudC1kaXZgKTtcclxuXHJcbiAgICB0aGlzLl9pdGVtSW50ZXJhY3RhYmxlLm9uKCd0YXAnLCBlID0+IHtcclxuICAgICAgdGhpcy5faGFuZGxlSXRlbVJvd0V2ZW50KGUsIHRoaXMucHJvcHMub25JdGVtQ2xpY2ssIHRoaXMucHJvcHMub25Sb3dDbGljayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY2FuRHJhZykge1xyXG4gICAgICB0aGlzLl9pdGVtSW50ZXJhY3RhYmxlXHJcbiAgICAgICAgLmRyYWdnYWJsZSh7XHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgYWxsb3dGcm9tOiBzZWxlY3RlZEl0ZW1TZWxlY3RvcixcclxuICAgICAgICAgIHJlc3RyaWN0OiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0aW9uOiBgLiR7dG9wRGl2Q2xhc3NJZH1gLFxyXG4gICAgICAgICAgICBlbGVtZW50UmVjdDoge2xlZnQ6IDEsIHJpZ2h0OiAwLCB0b3A6IDAsIGJvdHRvbTogMX1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignZHJhZ3N0YXJ0JywgZSA9PiB7XHJcbiAgICAgICAgICBsZXQgc2VsZWN0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgY29uc3QgYW5pbWF0ZWRJdGVtcyA9IHRoaXMucHJvcHMub25JbnRlcmFjdGlvbihcclxuICAgICAgICAgICAgVGltZWxpbmUuY2hhbmdlVHlwZXMuZHJhZ1N0YXJ0LFxyXG4gICAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXNcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgXy5mb3JFYWNoKGFuaW1hdGVkSXRlbXMsIGlkID0+IHtcclxuICAgICAgICAgICAgbGV0IGRvbUl0ZW0gPSB0aGlzLl9ncmlkRG9tTm9kZS5xdWVyeVNlbGVjdG9yKFwic3BhbltkYXRhLWl0ZW0taW5kZXg9J1wiICsgaWQgKyBcIidcIik7XHJcbiAgICAgICAgICAgIGlmIChkb21JdGVtKSB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0aW9ucy5wdXNoKFt0aGlzLmdldEl0ZW0oaWQpLnN0YXJ0LCB0aGlzLmdldEl0ZW0oaWQpLmVuZF0pO1xyXG4gICAgICAgICAgICAgIGRvbUl0ZW0uc2V0QXR0cmlidXRlKCdpc0RyYWdnaW5nJywgJ1RydWUnKTtcclxuICAgICAgICAgICAgICBkb21JdGVtLnNldEF0dHJpYnV0ZSgnZHJhZy14JywgMCk7XHJcbiAgICAgICAgICAgICAgZG9tSXRlbS5zZXRBdHRyaWJ1dGUoJ2RyYWcteScsIDApO1xyXG4gICAgICAgICAgICAgIGRvbUl0ZW0uc3R5bGVbJ3otaW5kZXgnXSA9IDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb24oc2VsZWN0aW9ucyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2RyYWdtb3ZlJywgZSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgICAgIGxldCBhbmltYXRlZEl0ZW1zID0gdGhpcy5fZ3JpZERvbU5vZGUucXVlcnlTZWxlY3RvckFsbChcInNwYW5baXNEcmFnZ2luZz0nVHJ1ZSdcIikgfHwgW107XHJcblxyXG4gICAgICAgICAgbGV0IGR4ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZHJhZy14JykpIHx8IDApICsgZS5keDtcclxuICAgICAgICAgIGxldCBkeSA9IChwYXJzZUZsb2F0KHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RyYWcteScpKSB8fCAwKSArIGUuZHk7XHJcbiAgICAgICAgICBsZXQgc2VsZWN0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICAgIC8vIFNuYXAgdGhlIG1vdmVtZW50IHRvIHRoZSBjdXJyZW50IHNuYXAgaW50ZXJ2YWxcclxuICAgICAgICAgIGNvbnN0IHNuYXBEeCA9IGdldFNuYXBQaXhlbEZyb21EZWx0YShcclxuICAgICAgICAgICAgZHgsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub3JpZ2luYWxTdGFydERhdGUsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub3JpZ2luYWxFbmREYXRlLFxyXG4gICAgICAgICAgICB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKSxcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zbmFwTWludXRlc1xyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBfLmZvckVhY2goYW5pbWF0ZWRJdGVtcywgZG9tSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHtpdGVtfSA9IHRoaXMuaXRlbUZyb21FbGVtZW50KGRvbUl0ZW0pO1xyXG4gICAgICAgICAgICBsZXQgaXRlbUR1cmF0aW9uID0gaXRlbS5lbmQuZGlmZihpdGVtLnN0YXJ0LCAnbXMnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdQaXhlbE9mZnNldCA9IChwaXhUb0ludChkb21JdGVtLnN0eWxlLmxlZnQpICsgc25hcER4KS50b0ZpeGVkKDMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld1N0YXJ0ID0gZ2V0VGltZUF0UGl4ZWwoXHJcbiAgICAgICAgICAgICAgbmV3UGl4ZWxPZmZzZXQsXHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vcmlnaW5hbFN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLm9yaWdpbmFsRW5kRGF0ZSxcclxuICAgICAgICAgICAgICB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKSxcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNuYXBNaW51dGVzXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3RW5kID0gbmV3U3RhcnQuY2xvbmUoKS5hZGQoaXRlbUR1cmF0aW9uLCAnbXMnKTtcclxuICAgICAgICAgICAgc2VsZWN0aW9ucy5wdXNoKFtuZXdTdGFydCwgbmV3RW5kXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUcmFuc2xhdGUgdGhlIG5ldyBzdGFydCB0aW1lIGJhY2sgdG8gcGl4ZWxzLCBzbyB3ZSBjYW4gYW5pbWF0ZSB0aGUgc25hcFxyXG4gICAgICAgICAgICBkb21JdGVtLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGRvbUl0ZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgc25hcER4ICsgJ3B4LCAnICsgZHkgKyAncHgpJztcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RyYWcteCcsIGR4KTtcclxuICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RyYWcteScsIGR5KTtcclxuXHJcbiAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbihzZWxlY3Rpb25zKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignZHJhZ2VuZCcsIGUgPT4ge1xyXG4gICAgICAgICAgY29uc3Qge2l0ZW0sIHJvd05vfSA9IHRoaXMuaXRlbUZyb21FbGVtZW50KGUudGFyZ2V0KTtcclxuICAgICAgICAgIGxldCBhbmltYXRlZEl0ZW1zID0gdGhpcy5fZ3JpZERvbU5vZGUucXVlcnlTZWxlY3RvckFsbChcInNwYW5baXNEcmFnZ2luZz0nVHJ1ZSdcIikgfHwgW107XHJcblxyXG4gICAgICAgICAgbGV0IGFuaW1hdGVkSXRlbXNLZXlzID0gW107XHJcbiAgICAgICAgICBfLmZvckVhY2goYW5pbWF0ZWRJdGVtcywgZG9tSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGFuaW1hdGVkSXRlbXNLZXlzLnB1c2godGhpcy5pdGVtRnJvbUVsZW1lbnQoZG9tSXRlbSkuaXRlbS5rZXkpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb24oW1tpdGVtLnN0YXJ0LCBpdGVtLmVuZF1dKTtcclxuICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAvLyBDaGFuZ2Ugcm93XHJcbiAgICAgICAgICBsZXQgbmV3Um93ID0gZ2V0TmVhcmVzdFJvd051bWJlcihlLmNsaWVudFgsIGUuY2xpZW50WSwgZG9jdW1lbnQsIHJvd05vKTtcclxuXHJcbiAgICAgICAgICBsZXQgcm93Q2hhbmdlRGVsdGEgPSBuZXdSb3cgLSByb3dObztcclxuXHJcbiAgICAgICAgICAvLyBVcGRhdGUgdGltZVxyXG4gICAgICAgICAgbGV0IG5ld1BpeGVsT2Zmc2V0ID0gKFxyXG4gICAgICAgICAgICBwaXhUb0ludChlLnRhcmdldC5zdHlsZS5sZWZ0KSArIChwYXJzZUZsb2F0KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZHJhZy14JykpIHx8IDApXHJcbiAgICAgICAgICApLnRvRml4ZWQoMyk7XHJcblxyXG4gICAgICAgICAgbGV0IG5ld1N0YXJ0ID0gZ2V0VGltZUF0UGl4ZWwoXHJcbiAgICAgICAgICAgIG5ld1BpeGVsT2Zmc2V0LFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxyXG4gICAgICAgICAgICB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKSxcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zbmFwTWludXRlc1xyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBjb25zdCB0aW1lRGVsdGEgPSBuZXdTdGFydC5jbG9uZSgpLmRpZmYoaXRlbS5zdGFydCwgJ21zJyk7XHJcbiAgICAgICAgICBjb25zdCBjaGFuZ2VzID0ge3Jvd0NoYW5nZURlbHRhLCB0aW1lRGVsdGF9O1xyXG4gICAgICAgICAgbGV0IGl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgLy8gQ2hlY2sgLSB3aGV0aGVyIHRoZSBjbGFtcGVkIGVsZW1lbnQgaXMgYmVpbmcgZHJhZ2dlZCB0byBhIG5ldyBsYXllciBhbmQgaXQgaXMgbG9jYXRlZCBhYm92ZSBhbm90aGVyIGVsZW1lbnQuXHJcbiAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgY29uc3QgaXRlbXNPbk5ld1Jvd0ZvclRhcmdldCA9IHRoaXMucHJvcHMuaXRlbXMuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5yb3cgPT09ICtuZXdSb3cpO1xyXG4gICAgICAgICAgbGV0IHRhcmdldER1cmF0aW9uID0gaXRlbS5lbmQuZGlmZihpdGVtLnN0YXJ0KTtcclxuICAgICAgICAgIGxldCB0YXJnZXROZXdFbmQgPSBuZXdTdGFydC5jbG9uZSgpLmFkZCh0YXJnZXREdXJhdGlvbik7XHJcbiAgICAgICAgICBjb25zdCBuZXdUYXJnZXRTdGFydEluTXMgPSBuZXdTdGFydC5jbG9uZSgpLmRpZmYoMCwgJ21zJyk7XHJcbiAgICAgICAgICBjb25zdCBuZXdUYXJnZXRFbmRJbk1zID0gdGFyZ2V0TmV3RW5kLmNsb25lKCkuZGlmZigwLCAnbXMnKTtcclxuICAgICAgICAgIGxldCB0YXJnZXRBYm92ZUVsZW1lbnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICBpdGVtc09uTmV3Um93Rm9yVGFyZ2V0LnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gQ2hlY2tpbmcgd2hldGhlciB0aGUgZHJhZ2dlZCBpdGVtIGlzIGFib3ZlIG90aGVyIGl0ZW1zLlxyXG4gICAgICAgICAgaWYgKHJvd05vICE9PSArbmV3Um93KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXNPbk5ld1Jvd0ZvclRhcmdldC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBpdGVtc09uTmV3Um93Rm9yVGFyZ2V0W2ldO1xyXG4gICAgICAgICAgICAgIGlmIChhbmltYXRlZEl0ZW1zS2V5cy5zb21lKGtleSA9PiBrZXkgPT09IGVsZW1lbnQua2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTdGFydEluTXMgPSBlbGVtZW50LnN0YXJ0LmNsb25lKCkuZGlmZigwLCAnbXMnKTtcclxuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50RW5kSW5NcyA9IGVsZW1lbnQuZW5kLmNsb25lKCkuZGlmZigwLCAnbXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKG5ld1RhcmdldFN0YXJ0SW5NcyA+IGVsZW1lbnRTdGFydEluTXMgJiYgbmV3VGFyZ2V0U3RhcnRJbk1zIDwgZWxlbWVudEVuZEluTXMpIHx8XHJcbiAgICAgICAgICAgICAgICAobmV3VGFyZ2V0RW5kSW5NcyA+IGVsZW1lbnRTdGFydEluTXMgJiYgbmV3VGFyZ2V0RW5kSW5NcyA8IGVsZW1lbnRFbmRJbk1zKVxyXG4gICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0QWJvdmVFbGVtZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgIC8vIGVuZCBDaGVjayAtIHdoZXRoZXIgdGhlIGNsYW1wZWQgZWxlbWVudCBpcyBiZWluZyBkcmFnZ2VkIHRvIGEgbmV3IGxheWVyIGFuZCBpdCBpcyBsb2NhdGVkIGFib3ZlIGFub3RoZXIgZWxlbWVudC5cclxuXHJcbiAgICAgICAgICAvLyBDaGVja2luZy4gV2hldGhlciBvbmUgb2YgdGhlIGRyYWdnZWQgYXJyYXkgZWxlbWVudHMgaXMgb3ZlciBhbiBlbGVtZW50IG9uIGEgbmV3IGxheWVyLlxyXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgIGxldCBvbmVPZkl0ZW1BYm92ZUVsZW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgIF8uZm9yRWFjaChhbmltYXRlZEl0ZW1zLCBkb21JdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3Qge2l0ZW19ID0gdGhpcy5pdGVtRnJvbUVsZW1lbnQoZG9tSXRlbSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtRHVyYXRpb24gPSBpdGVtLmVuZC5kaWZmKGl0ZW0uc3RhcnQpO1xyXG4gICAgICAgICAgICBsZXQgbmV3U3RhcnQgPSBpdGVtLnN0YXJ0LmNsb25lKCkuYWRkKHRpbWVEZWx0YSwgJ21zJyk7XHJcbiAgICAgICAgICAgIGxldCBuZXdFbmQgPSBuZXdTdGFydC5jbG9uZSgpLmFkZChpdGVtRHVyYXRpb24pO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdTdGFydEluTXMgPSBuZXdTdGFydC5jbG9uZSgpLmRpZmYoMCwgJ21zJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0VuZEluTXMgPSBuZXdFbmQuY2xvbmUoKS5kaWZmKDAsICdtcycpO1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SXRlbU5ld1JvdyA9IGl0ZW0ucm93ICsgcm93Q2hhbmdlRGVsdGE7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpdGVtc09uTmV3Um93ID0gdGhpcy5wcm9wcy5pdGVtcy5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50LnJvdyA9PT0gY3VycmVudEl0ZW1OZXdSb3cpO1xyXG4gICAgICAgICAgICBpdGVtc09uTmV3Um93LnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtc09uTmV3Um93Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGl0ZW1zT25OZXdSb3dbaV07XHJcbiAgICAgICAgICAgICAgaWYgKGFuaW1hdGVkSXRlbXNLZXlzLnNvbWUoa2V5ID0+IGtleSA9PT0gZWxlbWVudC5rZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudFN0YXJ0SW5NcyA9IGVsZW1lbnQuc3RhcnQuY2xvbmUoKS5kaWZmKDAsICdtcycpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRFbmRJbk1zID0gZWxlbWVudC5lbmQuY2xvbmUoKS5kaWZmKDAsICdtcycpO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAobmV3U3RhcnRJbk1zID4gZWxlbWVudFN0YXJ0SW5NcyAmJiBuZXdTdGFydEluTXMgPCBlbGVtZW50RW5kSW5NcykgfHxcclxuICAgICAgICAgICAgICAgIChuZXdFbmRJbk1zID4gZWxlbWVudFN0YXJ0SW5NcyAmJiBuZXdFbmRJbk1zIDwgZWxlbWVudEVuZEluTXMpXHJcbiAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBvbmVPZkl0ZW1BYm92ZUVsZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAvLyBDaGVja2luZy4gV2hldGhlciBvbmUgb2YgdGhlIGRyYWdnZWQgYXJyYXkgZWxlbWVudHMgaXMgb3ZlciBhbiBlbGVtZW50IG9uIGEgbmV3IGxheWVyLlxyXG5cclxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgIGNvbnN0IG1ld1Jvd3NXaXRoTmV3SXRlbXMgPSB7fTtcclxuXHJcbiAgICAgICAgICBfLmZvckVhY2goYW5pbWF0ZWRJdGVtcywgZG9tSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHtpdGVtfSA9IHRoaXMuaXRlbUZyb21FbGVtZW50KGRvbUl0ZW0pO1xyXG4gICAgICAgICAgICBsZXQgdGltZWxpbmVTdGFydEluTXMgPSBpdGVtLmVuZC5kaWZmKGl0ZW0uc3RhcnQpO1xyXG4gICAgICAgICAgICBsZXQgbmV3U3RhcnQgPSBpdGVtLnN0YXJ0LmNsb25lKCkuYWRkKHRpbWVEZWx0YSwgJ21zJyk7XHJcbiAgICAgICAgICAgIGxldCBuZXdFbmQgPSBuZXdTdGFydC5jbG9uZSgpLmFkZCh0aW1lbGluZVN0YXJ0SW5Ncyk7XHJcbiAgICAgICAgICAgIGxldCBuZXdSb3cgPSBpdGVtLnJvdyArIHJvd0NoYW5nZURlbHRhID49IDAgPyBpdGVtLnJvdyArIHJvd0NoYW5nZURlbHRhIDogMDtcclxuICAgICAgICAgICAgaWYgKG5ld1JvdyA+IHRoaXMucHJvcHMubGF5ZXJzTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgbmV3Um93ID0gdGhpcy5wcm9wcy5sYXllcnNOdW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zT25OZXdSb3cgPSB0aGlzLnByb3BzLml0ZW1zLmZpbHRlcihlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICBpZiAoZWxlbWVudC5yb3cgPT09IG5ld1JvdyAmJiAhYW5pbWF0ZWRJdGVtc0tleXMuc29tZShrZXkgPT4ga2V5ID09PSBlbGVtZW50LmtleSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGl0ZW1zT25OZXdSb3cuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW1ld1Jvd3NXaXRoTmV3SXRlbXNbbmV3Um93XSkge1xyXG4gICAgICAgICAgICAgIG1ld1Jvd3NXaXRoTmV3SXRlbXNbbmV3Um93XSA9IHtpdGVtczogWy4uLml0ZW1zT25OZXdSb3ddfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmV3RW5kLmRpZmYoMCkgIT09IGl0ZW0uZW5kLmRpZmYoMCkpIHtcclxuICAgICAgICAgICAgICBpdGVtLnN0YXJ0ID0gbmV3U3RhcnQ7XHJcbiAgICAgICAgICAgICAgaXRlbS5lbmQgPSBuZXdFbmQ7XHJcbiAgICAgICAgICAgICAgaXRlbS5yb3cgPSBuZXdSb3c7XHJcbiAgICAgICAgICAgICAgbWV3Um93c1dpdGhOZXdJdGVtc1tuZXdSb3ddLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChtZXdSb3dzV2l0aE5ld0l0ZW1zKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG1ld1Jvd3NXaXRoTmV3SXRlbXMpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICAgIG1ld1Jvd3NXaXRoTmV3SXRlbXNbZWxdLml0ZW1zLnNvcnQoKGEsIGIpID0+IGEuc3RhcnQuZGlmZigwKSAtIGIuc3RhcnQuZGlmZigwKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobWV3Um93c1dpdGhOZXdJdGVtcykuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICAgICAgICBtZXdSb3dzV2l0aE5ld0l0ZW1zW2VsXS5pdGVtcy5mb3JFYWNoKChlbGVtZW50LCBrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbER1cmF0aW9uID0gZWxlbWVudC5lbmQuZGlmZihlbGVtZW50LnN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIGlmIChrID09PSAwICYmIHRoaXMucHJvcHMub3JpZ2luYWxTdGFydERhdGUuZGlmZigwKSA+IGVsZW1lbnQuc3RhcnQuZGlmZigwKSkge1xyXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LnN0YXJ0ID0gdGhpcy5wcm9wcy5vcmlnaW5hbFN0YXJ0RGF0ZTtcclxuICAgICAgICAgICAgICAgICAgZWxlbWVudC5lbmQgPSB0aGlzLnByb3BzLm9yaWdpbmFsU3RhcnREYXRlLmNsb25lKCkuYWRkKGVsRHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgbWV3Um93c1dpdGhOZXdJdGVtc1tlbF0uaXRlbXNbayAtIDFdICYmXHJcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3RhcnQuZGlmZigwKSA8PSBtZXdSb3dzV2l0aE5ld0l0ZW1zW2VsXS5pdGVtc1trIC0gMV0uZW5kLmRpZmYoMClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LnN0YXJ0ID0gbWV3Um93c1dpdGhOZXdJdGVtc1tlbF0uaXRlbXNbayAtIDFdLmVuZDtcclxuICAgICAgICAgICAgICAgICAgZWxlbWVudC5lbmQgPSBtZXdSb3dzV2l0aE5ld0l0ZW1zW2VsXS5pdGVtc1trIC0gMV0uZW5kLmNsb25lKCkuYWRkKGVsRHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuZW5kLmRpZmYoMCkgPiB0aGlzLnByb3BzLm9yaWdpbmFsRW5kRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUVuZERhdGUoZWxlbWVudC5lbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgICAgICAgLy8gRGVmYXVsdCwgYWxsIGl0ZW1zIG1vdmUgYnkgdGhlIHNhbWUgb2Zmc2V0IGR1cmluZyBhIGRyYWdcclxuXHJcbiAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3Rpb24oVGltZWxpbmUuY2hhbmdlVHlwZXMuZHJhZ0VuZCwgY2hhbmdlcywgaXRlbXMpO1xyXG5cclxuICAgICAgICAgIC8vIFJlc2V0IHRoZSBzdHlsZXNcclxuICAgICAgICAgIGFuaW1hdGVkSXRlbXMuZm9yRWFjaChkb21JdGVtID0+IHtcclxuICAgICAgICAgICAgZG9tSXRlbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBkb21JdGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMHB4LCAwcHgpJztcclxuICAgICAgICAgICAgZG9tSXRlbS5zZXRBdHRyaWJ1dGUoJ2RyYWcteCcsIDApO1xyXG4gICAgICAgICAgICBkb21JdGVtLnNldEF0dHJpYnV0ZSgnZHJhZy15JywgMCk7XHJcbiAgICAgICAgICAgIGRvbUl0ZW0uc3R5bGVbJ3otaW5kZXgnXSA9IDM7XHJcbiAgICAgICAgICAgIGRvbUl0ZW0uc3R5bGVbJ3RvcCddID0gaW50VG9QaXgoXHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5pdGVtSGVpZ2h0ICogTWF0aC5yb3VuZChwaXhUb0ludChkb21JdGVtLnN0eWxlWyd0b3AnXSkgLyB0aGlzLnByb3BzLml0ZW1IZWlnaHQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGRvbUl0ZW0ucmVtb3ZlQXR0cmlidXRlKCdpc0RyYWdnaW5nJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB0aGlzLl9ncmlkLnJlY29tcHV0ZUdyaWRTaXplKHtyb3dJbmRleDogMH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGNhblJlc2l6ZSkge1xyXG4gICAgICB0aGlzLl9pdGVtSW50ZXJhY3RhYmxlXHJcbiAgICAgICAgLnJlc2l6YWJsZSh7XHJcbiAgICAgICAgICBhbGxvd0Zyb206IHNlbGVjdGVkSXRlbVNlbGVjdG9yLFxyXG4gICAgICAgICAgZWRnZXM6IHtsZWZ0OiB0cnVlLCByaWdodDogdHJ1ZSwgYm90dG9tOiBmYWxzZSwgdG9wOiBmYWxzZX1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbigncmVzaXplc3RhcnQnLCBlID0+IHtcclxuICAgICAgICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaXMtcmVzaXphYmxlJykgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLm9uSW50ZXJhY3Rpb24oVGltZWxpbmUuY2hhbmdlVHlwZXMucmVzaXplU3RhcnQsIG51bGwsIHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICBfLmZvckVhY2goc2VsZWN0ZWQsIGlkID0+IHtcclxuICAgICAgICAgICAgbGV0IGRvbUl0ZW0gPSB0aGlzLl9ncmlkRG9tTm9kZS5xdWVyeVNlbGVjdG9yKFwic3BhbltkYXRhLWl0ZW0taW5kZXg9J1wiICsgaWQgKyBcIidcIik7XHJcbiAgICAgICAgICAgIGlmIChkb21JdGVtKSB7XHJcbiAgICAgICAgICAgICAgZG9tSXRlbS5zZXRBdHRyaWJ1dGUoJ2lzUmVzaXppbmcnLCAnVHJ1ZScpO1xyXG4gICAgICAgICAgICAgIGRvbUl0ZW0uc2V0QXR0cmlidXRlKCdpbml0aWFsV2lkdGgnLCBwaXhUb0ludChkb21JdGVtLnN0eWxlLndpZHRoKSk7XHJcbiAgICAgICAgICAgICAgZG9tSXRlbS5zdHlsZVsnei1pbmRleCddID0gNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ3Jlc2l6ZW1vdmUnLCBlID0+IHtcclxuICAgICAgICAgIGxldCBhbmltYXRlZEl0ZW1zID0gdGhpcy5fZ3JpZERvbU5vZGUucXVlcnlTZWxlY3RvckFsbChcInNwYW5baXNSZXNpemluZz0nVHJ1ZSdcIikgfHwgW107XHJcblxyXG4gICAgICAgICAgbGV0IGR4ID0gcGFyc2VGbG9hdChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RlbHRhLXgnKSkgfHwgMDtcclxuICAgICAgICAgIGR4ICs9IGUuZGVsdGFSZWN0LmxlZnQ7XHJcblxyXG4gICAgICAgICAgbGV0IGR3ID0gZS5yZWN0LndpZHRoIC0gTnVtYmVyKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaW5pdGlhbFdpZHRoJykpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHNuYXBwZWREeCA9IGdldFNuYXBQaXhlbEZyb21EZWx0YShcclxuICAgICAgICAgICAgZHgsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpLFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNuYXBNaW51dGVzXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHNuYXBwZWREdyA9IGdldFNuYXBQaXhlbEZyb21EZWx0YShcclxuICAgICAgICAgICAgZHcsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpLFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNuYXBNaW51dGVzXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIF8uZm9yRWFjaChhbmltYXRlZEl0ZW1zLCBpdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbURhdGEgPSB0aGlzLml0ZW1Gcm9tRWxlbWVudChpdGVtKS5pdGVtO1xyXG4gICAgICAgICAgICBpZiAoaXRlbURhdGEuaXNSZXNpemFibGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpdGVtV2lkdGggPSBpdGVtLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICBjb25zdCBtaW5pbXVtRHVyYXRpb24gPSBpdGVtRGF0YS5taW5EdXJhdGlvbiB8fCB0aGlzLnByb3BzLm1pbkl0ZW1EdXJhdGlvbjtcclxuICAgICAgICAgICAgY29uc3QgbWF4aW11bUR1cmF0aW9uID0gaXRlbURhdGEubWF4RHVyYXRpb247XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtaW5pbXVtV2lkdGggPVxyXG4gICAgICAgICAgICAgIHBpeGVsc1Blck1pbnV0ZSh0aGlzLnByb3BzLnN0YXJ0RGF0ZSwgdGhpcy5wcm9wcy5lbmREYXRlLCB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKSkgKiBtaW5pbXVtRHVyYXRpb247XHJcbiAgICAgICAgICAgIGxldCBtYXhpbXVtV2lkdGg7XHJcbiAgICAgICAgICAgIGlmIChtYXhpbXVtRHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICBtYXhpbXVtV2lkdGggPVxyXG4gICAgICAgICAgICAgICAgcGl4ZWxzUGVyTWludXRlKHRoaXMucHJvcHMuc3RhcnREYXRlLCB0aGlzLnByb3BzLmVuZERhdGUsIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpKSAqIG1heGltdW1EdXJhdGlvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG5lYXJieUVsZW1lbnRMZWZ0O1xyXG4gICAgICAgICAgICBsZXQgbmVhcmJ5RWxlbWVudFJpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1zLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGVsLmtleSAhPT0gaXRlbURhdGEua2V5ICYmXHJcbiAgICAgICAgICAgICAgICBlbC5yb3cgPT09IGl0ZW1EYXRhLnJvdyAmJlxyXG4gICAgICAgICAgICAgICAgZWwuZW5kLmRpZmYoMCwgJ21zJykgPCBpdGVtRGF0YS5zdGFydC5kaWZmKDAsICdtcycpICYmXHJcbiAgICAgICAgICAgICAgICAoIW5lYXJieUVsZW1lbnRMZWZ0IHx8IGVsLmVuZC5kaWZmKDAsICdtcycpID4gbmVhcmJ5RWxlbWVudExlZnQuZW5kLmRpZmYoMCwgJ21zJykpXHJcbiAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBuZWFyYnlFbGVtZW50TGVmdCA9IGVsO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBlbC5rZXkgIT09IGl0ZW1EYXRhLmtleSAmJlxyXG4gICAgICAgICAgICAgICAgZWwuc3RhcnQuZGlmZigwLCAnbXMnKSA+IGl0ZW1EYXRhLmVuZC5kaWZmKDAsICdtcycpICYmXHJcbiAgICAgICAgICAgICAgICAoIW5lYXJieUVsZW1lbnRSaWdodCB8fCBlbC5lbmQuZGlmZigwLCAnbXMnKSA8IG5lYXJieUVsZW1lbnRSaWdodC5lbmQuZGlmZigwLCAnbXMnKSlcclxuICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5lYXJieUVsZW1lbnRSaWdodCA9IGVsO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBmcmVlIHNwYWNlIGZyb20gdGhlIGVsZW1lbnQgdG8gdGhlIHN0YXJ0IG9mIHRoZSB0aW1lbGluZSArIGVsZW1lbnQgZHVyYXRpb24gaW4gcHhcclxuICAgICAgICAgICAgbGV0IHNwYWNlTGVmdEluUHggPSBnZXRQaXhlbEF0VGltZShcclxuICAgICAgICAgICAgICBpdGVtRGF0YS5lbmQsXHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGxldCBzcGFjZVJpZ2h0SW5QeCA9IGdldFBpeGVsQXRUaW1lKFxyXG4gICAgICAgICAgICAgIGl0ZW1EYXRhLnN0YXJ0LFxyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgICB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAobmVhcmJ5RWxlbWVudExlZnQgJiYgZS5kZWx0YVJlY3QubGVmdCA8PSAwICYmIGUuZGVsdGFSZWN0LnJpZ2h0ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgc3BhY2VMZWZ0SW5QeCA9XHJcbiAgICAgICAgICAgICAgICBzcGFjZUxlZnRJblB4IC1cclxuICAgICAgICAgICAgICAgIGdldFBpeGVsQXRUaW1lKFxyXG4gICAgICAgICAgICAgICAgICBuZWFyYnlFbGVtZW50TGVmdC5lbmQsXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIC8vIHNwYWNlTGVmdEluUHggPSBzcGFjZUxlZnRJblB4IC0gZ2V0UGl4ZWxBdFRpbWUobmVhcmJ5RWxlbWVudExlZnQuZW5kLCB0aGlzLnByb3BzLnN0YXJ0RGF0ZSwgdGhpcy5wcm9wcy5lbmREYXRlLCB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKSkgKyAxMDtcclxuICAgICAgICAgICAgICAvLyBpdGVtV2lkdGggPSBpdGVtV2lkdGggKyAxMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmVhcmJ5RWxlbWVudFJpZ2h0ICYmIGUuZGVsdGFSZWN0LnJpZ2h0ID49IDAgJiYgZS5kZWx0YVJlY3QubGVmdCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIHNwYWNlUmlnaHRJblB4ID1cclxuICAgICAgICAgICAgICAgIHNwYWNlUmlnaHRJblB4IC1cclxuICAgICAgICAgICAgICAgIGdldFBpeGVsQXRUaW1lKFxyXG4gICAgICAgICAgICAgICAgICBuZWFyYnlFbGVtZW50UmlnaHQuc3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIC8vIHNwYWNlUmlnaHRJblB4ID0gc3BhY2VSaWdodEluUHggLSBnZXRQaXhlbEF0VGltZShuZWFyYnlFbGVtZW50UmlnaHQuc3RhcnQsIHRoaXMucHJvcHMuZW5kRGF0ZSwgdGhpcy5wcm9wcy5zdGFydERhdGUsIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpKSArIDEwO1xyXG4gICAgICAgICAgICAgIC8vIGl0ZW1XaWR0aCA9IGl0ZW1XaWR0aCArIDEwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZXNpemUgbGVmdFxyXG4gICAgICAgICAgICAvLyBpZiAoc3BhY2VMZWZ0SW5QeCAtIGl0ZW1XaWR0aCA8PSAwICYmIGUuZGVsdGFSZWN0LmxlZnQgPD0gMCAmJiBlLmRlbHRhUmVjdC5yaWdodCA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyByZXNpemUgcmlnaHRcclxuICAgICAgICAgICAgLy8gaWYgKHNwYWNlUmlnaHRJblB4IC0gaXRlbVdpZHRoIDw9IDAgJiYgZS5kZWx0YVJlY3QucmlnaHQgPj0gMCAmJiBlLmRlbHRhUmVjdC5sZWZ0ID09PSAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIG1pbiBhbmQgbWF4XHJcbiAgICAgICAgICAgIGxldCBuZXdXaWR0aCA9IGludFRvUGl4KE51bWJlcihpdGVtLmdldEF0dHJpYnV0ZSgnaW5pdGlhbFdpZHRoJykpICsgc25hcHBlZER3KTtcclxuICAgICAgICAgICAgLy8gaWYgKCsobmV3V2lkdGgucmVwbGFjZSgncHgnLCAnJykpIDwgbWluaW11bVdpZHRoXHJcbiAgICAgICAgICAgIC8vICAgfHwgKyhuZXdXaWR0aC5yZXBsYWNlKCdweCcsICcnKSkgPiBtYXhpbXVtV2lkdGgpIHtcclxuICAgICAgICAgICAgLy8gICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaXRlbS5zdHlsZS53aWR0aCA9IG5ld1dpZHRoO1xyXG4gICAgICAgICAgICBpdGVtLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGl0ZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgc25hcHBlZER4ICsgJ3B4LCAwcHgpJztcclxuICAgICAgICAgICAgZS50YXJnZXQuc2V0QXR0cmlidXRlKCdkZWx0YS14JywgZHgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ3Jlc2l6ZWVuZCcsIGUgPT4ge1xyXG4gICAgICAgICAgbGV0IGFuaW1hdGVkSXRlbXMgPSB0aGlzLl9ncmlkRG9tTm9kZS5xdWVyeVNlbGVjdG9yQWxsKFwic3Bhbltpc1Jlc2l6aW5nPSdUcnVlJ1wiKSB8fCBbXTtcclxuICAgICAgICAgIC8vIFVwZGF0ZSB0aW1lXHJcbiAgICAgICAgICBjb25zdCBkeCA9IHBhcnNlRmxvYXQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkZWx0YS14JykpIHx8IDA7XHJcbiAgICAgICAgICBjb25zdCBpc1N0YXJ0VGltZUNoYW5nZSA9IGR4ICE9IDA7XHJcblxyXG4gICAgICAgICAgbGV0IGl0ZW1zID0gW107XHJcbiAgICAgICAgICBsZXQgbWluUm93Tm8gPSBJbmZpbml0eTtcclxuXHJcbiAgICAgICAgICBsZXQgZHVyYXRpb25DaGFuZ2UgPSBudWxsO1xyXG4gICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZWZhdWx0IGl0ZW0gcG9zaXRpb25zXHJcbiAgICAgICAgICBfLmZvckVhY2goYW5pbWF0ZWRJdGVtcywgZG9tSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFBpeGVsT2Zmc2V0ID0gcGl4VG9JbnQoZG9tSXRlbS5zdHlsZS5sZWZ0KSArIGR4O1xyXG4gICAgICAgICAgICBjb25zdCB7aXRlbSwgcm93Tm99ID0gdGhpcy5pdGVtRnJvbUVsZW1lbnQoZG9tSXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbmltdW1EdXJhdGlvbiA9IGl0ZW0ubWluRHVyYXRpb24gfHwgdGhpcy5wcm9wcy5taW5JdGVtRHVyYXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IG1heGltdW1EdXJhdGlvbiA9IGl0ZW0ubWF4RHVyYXRpb247XHJcblxyXG4gICAgICAgICAgICBtaW5Sb3dObyA9IE1hdGgubWluKG1pblJvd05vLCByb3dObyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmVhcmJ5RWxlbWVudDtcclxuICAgICAgICAgICAgY29uc3QgaXRlbXNPbk5ld1JvdyA9IHRoaXMucHJvcHMuaXRlbXMuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5yb3cgPT09IHJvd05vKTtcclxuICAgICAgICAgICAgaXRlbXNPbk5ld1Jvdy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1N0YXJ0VGltZUNoYW5nZSkge1xyXG4gICAgICAgICAgICAgIGxldCBuZXdTdGFydCA9IGdldFRpbWVBdFBpeGVsKFxyXG4gICAgICAgICAgICAgICAgc3RhcnRQaXhlbE9mZnNldCxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNuYXBNaW51dGVzXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBpZiAoZHVyYXRpb25DaGFuZ2UgPT09IG51bGwpIGR1cmF0aW9uQ2hhbmdlID0gaXRlbS5zdGFydC5kaWZmKG5ld1N0YXJ0LCAnbXMnKTtcclxuICAgICAgICAgICAgICBpdGVtc09uTmV3Um93LmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBlbC5rZXkgIT09IGl0ZW0ua2V5ICYmXHJcbiAgICAgICAgICAgICAgICAgIGVsLmVuZC5kaWZmKDAsICdtcycpIDw9IGl0ZW0uc3RhcnQuZGlmZigwLCAnbXMnKSAmJlxyXG4gICAgICAgICAgICAgICAgICAoIW5lYXJieUVsZW1lbnQgfHwgZWwuZW5kLmRpZmYoMCwgJ21zJykgPiBuZWFyYnlFbGVtZW50LmVuZC5kaWZmKDAsICdtcycpKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgIG5lYXJieUVsZW1lbnQgPSBlbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gaWYgaGFzIG5lYXJieSBlbGVtZW50IGZyb20gbGVmdCBzaWRlXHJcbiAgICAgICAgICAgICAgaWYgKG5lYXJieUVsZW1lbnQgJiYgbmVhcmJ5RWxlbWVudC5lbmQuZGlmZigwLCAnbXMnKSA+IG5ld1N0YXJ0LmRpZmYoMCwgJ21zJykpIHtcclxuICAgICAgICAgICAgICAgIG5ld1N0YXJ0ID0gbW9tZW50KG5lYXJieUVsZW1lbnQuZW5kLmRpZmYoMCwgJ21zJykgKyAxMCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAvLyByZXNpemUgbGVmdFxyXG4gICAgICAgICAgICAgIGlmICghbmVhcmJ5RWxlbWVudCAmJiB0aGlzLnByb3BzLnN0YXJ0RGF0ZS5kaWZmKDAsICdtcycpID49IG5ld1N0YXJ0LmRpZmYoMCwgJ21zJykpIHtcclxuICAgICAgICAgICAgICAgIG5ld1N0YXJ0ID0gdGhpcy5wcm9wcy5zdGFydERhdGU7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAvLyBjaGVjayBpdGVtIG1pbmltdW0gc2l6ZVxyXG4gICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGl0ZW0uZW5kLmRpZmYobmV3U3RhcnQsICdtcycpIDwgbWluaW11bUR1cmF0aW9uICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZS5kaWZmKDAsICdtcycpIDwgbmV3U3RhcnQuZGlmZigwLCAnbXMnKVxyXG4gICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhcnQgPSBtb21lbnQoaXRlbS5lbmQuZGlmZigwLCAnbXMnKSAtIG1pbmltdW1EdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAvLyBjaGVjayBpdGVtIG1heGltdW0gc2l6ZVxyXG4gICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGl0ZW0uZW5kLmRpZmYobmV3U3RhcnQsICdtcycpID4gbWF4aW11bUR1cmF0aW9uICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZS5kaWZmKDAsICdtcycpIDwgbmV3U3RhcnQuZGlmZigwLCAnbXMnKVxyXG4gICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhcnQgPSBtb21lbnQoaXRlbS5lbmQuZGlmZigwLCAnbXMnKSAtIG1heGltdW1EdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjb25zdCB3aWR0aEluUHhUb0VuZCA9IGdldFBpeGVsQXRUaW1lKFxyXG4gICAgICAgICAgICAgICAgaXRlbS5lbmQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBjb25zdCB3aWR0aEluUHhUb1N0YXJ0ID0gZ2V0UGl4ZWxBdFRpbWUoXHJcbiAgICAgICAgICAgICAgICBuZXdTdGFydCxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKClcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGl0ZW1XaWR0aEluUHggPSB3aWR0aEluUHhUb0VuZCAtIHdpZHRoSW5QeFRvU3RhcnQ7XHJcblxyXG4gICAgICAgICAgICAgIGl0ZW0uc3RhcnQgPSBuZXdTdGFydDtcclxuICAgICAgICAgICAgICBkb21JdGVtLnN0eWxlLndpZHRoID0gYCR7aXRlbVdpZHRoSW5QeH1weGA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbGV0IGVuZFBpeGVsT2Zmc2V0ID0gc3RhcnRQaXhlbE9mZnNldCArIHBpeFRvSW50KGRvbUl0ZW0uc3R5bGUud2lkdGgpO1xyXG4gICAgICAgICAgICAgIGxldCBuZXdFbmQgPSBnZXRUaW1lQXRQaXhlbChcclxuICAgICAgICAgICAgICAgIGVuZFBpeGVsT2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKSxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc25hcE1pbnV0ZXNcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIGlmIChkdXJhdGlvbkNoYW5nZSA9PT0gbnVsbCkgZHVyYXRpb25DaGFuZ2UgPSBpdGVtLmVuZC5kaWZmKG5ld0VuZCwgJ21zJyk7XHJcblxyXG4gICAgICAgICAgICAgIGl0ZW1zT25OZXdSb3cuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgIGVsLmtleSAhPT0gaXRlbS5rZXkgJiZcclxuICAgICAgICAgICAgICAgICAgZWwuc3RhcnQuZGlmZigwLCAnbXMnKSA+PSBpdGVtLmVuZC5kaWZmKDAsICdtcycpICYmXHJcbiAgICAgICAgICAgICAgICAgICghbmVhcmJ5RWxlbWVudCB8fCBlbC5lbmQuZGlmZigwLCAnbXMnKSA8IG5lYXJieUVsZW1lbnQuZW5kLmRpZmYoMCwgJ21zJykpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgbmVhcmJ5RWxlbWVudCA9IGVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAvLyBpZiBoYXMgbmVhcmJ5IGVsZW1lbnQgZnJvbSByaWdodCBzaWRlXHJcbiAgICAgICAgICAgICAgaWYgKG5lYXJieUVsZW1lbnQgJiYgbmVhcmJ5RWxlbWVudC5zdGFydC5kaWZmKDAsICdtcycpIDwgbmV3RW5kLmRpZmYoMCwgJ21zJykpIHtcclxuICAgICAgICAgICAgICAgIG5ld0VuZCA9IG1vbWVudChuZWFyYnlFbGVtZW50LnN0YXJ0LmRpZmYoMCwgJ21zJykgLSAxMCk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAvLyByZXNpemUgcmlnaHRcclxuICAgICAgICAgICAgICBpZiAoIW5lYXJieUVsZW1lbnQgJiYgdGhpcy5wcm9wcy5lbmREYXRlLmRpZmYoMCwgJ21zJykgPD0gbmV3RW5kLmRpZmYoMCwgJ21zJykpIHtcclxuICAgICAgICAgICAgICAgIG5ld0VuZCA9IHRoaXMucHJvcHMuZW5kRGF0ZTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIC8vIGNoZWNrIGl0ZW0gbWluaW11bSBzaXplXHJcbiAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgbmV3RW5kLmRpZmYoaXRlbS5zdGFydCwgJ21zJykgPCBtaW5pbXVtRHVyYXRpb24gJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZS5kaWZmKDAsICdtcycpID4gbmV3RW5kLmRpZmYoMCwgJ21zJylcclxuICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIG5ld0VuZCA9IG1vbWVudChpdGVtLnN0YXJ0LmRpZmYoMCwgJ21zJykgKyBtaW5pbXVtRHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgLy8gY2hlY2sgaXRlbSBtYXhpbXVtIHNpemVcclxuICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBuZXdFbmQuZGlmZihpdGVtLnN0YXJ0LCAnbXMnKSA+IG1heGltdW1EdXJhdGlvbiAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLmRpZmYoMCwgJ21zJykgPiBuZXdFbmQuZGlmZigwLCAnbXMnKVxyXG4gICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbmV3RW5kID0gbW9tZW50KGl0ZW0uc3RhcnQuZGlmZigwLCAnbXMnKSArIG1heGltdW1EdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjb25zdCB3aWR0aEluUHhUb0VuZCA9IGdldFBpeGVsQXRUaW1lKFxyXG4gICAgICAgICAgICAgICAgbmV3RW5kLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgY29uc3Qgd2lkdGhJblB4VG9TdGFydCA9IGdldFBpeGVsQXRUaW1lKFxyXG4gICAgICAgICAgICAgICAgaXRlbS5zdGFydCxcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKClcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGl0ZW1XaWR0aEluUHggPSB3aWR0aEluUHhUb0VuZCAtIHdpZHRoSW5QeFRvU3RhcnQ7XHJcblxyXG4gICAgICAgICAgICAgIGl0ZW0uZW5kID0gbmV3RW5kO1xyXG4gICAgICAgICAgICAgIGRvbUl0ZW0uc3R5bGUud2lkdGggPSBgJHtpdGVtV2lkdGhJblB4fXB4YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgcm93IGhlaWdodCBkb2Vzbid0IG5lZWQgY2hhbmdpbmdcclxuICAgICAgICAgICAgbGV0IG5ld19yb3dfaGVpZ2h0ID0gZ2V0TWF4T3ZlcmxhcHBpbmdJdGVtcyhcclxuICAgICAgICAgICAgICB0aGlzLnJvd0l0ZW1NYXBbcm93Tm9dLFxyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAobmV3X3Jvd19oZWlnaHQgIT09IHRoaXMucm93SGVpZ2h0Q2FjaGVbcm93Tm9dKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yb3dIZWlnaHRDYWNoZVtyb3dOb10gPSBuZXdfcm93X2hlaWdodDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9SZXNldCBzdHlsZXNcclxuICAgICAgICAgICAgZG9tSXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2lzUmVzaXppbmcnKTtcclxuICAgICAgICAgICAgZG9tSXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2luaXRpYWxXaWR0aCcpO1xyXG4gICAgICAgICAgICBkb21JdGVtLnN0eWxlWyd6LWluZGV4J10gPSAzO1xyXG4gICAgICAgICAgICBkb21JdGVtLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGRvbUl0ZW0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwcHgsIDBweCknO1xyXG5cclxuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKGR1cmF0aW9uQ2hhbmdlID09PSBudWxsKSBkdXJhdGlvbkNoYW5nZSA9IDA7XHJcbiAgICAgICAgICBjb25zdCBjaGFuZ2VzID0ge2lzU3RhcnRUaW1lQ2hhbmdlLCB0aW1lRGVsdGE6IC1kdXJhdGlvbkNoYW5nZX07XHJcblxyXG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkludGVyYWN0aW9uKFRpbWVsaW5lLmNoYW5nZVR5cGVzLnJlc2l6ZUVuZCwgY2hhbmdlcywgaXRlbXMpO1xyXG5cclxuICAgICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGVsdGEteCcsIDApO1xyXG4gICAgICAgICAgdGhpcy5fZ3JpZC5yZWNvbXB1dGVHcmlkU2l6ZSh7cm93SW5kZXg6IG1pblJvd05vfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNhblNlbGVjdCkge1xyXG4gICAgICB0aGlzLl9zZWxlY3RSZWN0YW5nbGVJbnRlcmFjdGFibGVcclxuICAgICAgICAuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICBpZ25vcmVGcm9tOiAnLml0ZW1fZHJhZ2dhYmxlLCAucmN0OWstZ3JvdXAnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3R5bGVDdXJzb3IoZmFsc2UpXHJcbiAgICAgICAgLm9uKCdkcmFnc3RhcnQnLCBlID0+IHtcclxuICAgICAgICAgIGNvbnN0IG5lYXJlc3RSb3dPYmplY3QgPSBnZXROZWFyZXN0Um93T2JqZWN0KGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuXHJcbiAgICAgICAgICAvLyB0aGlzLl9zZWxlY3RCb3guc3RhcnQoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgICAgICAgLy8gdGhpcy5fc2VsZWN0Qm94LnN0YXJ0KGUuY2xpZW50WCwgdG9wUm93T2JqLnN0eWxlLnRvcCk7XHJcbiAgICAgICAgICB0aGlzLl9zZWxlY3RCb3guc3RhcnQoZS5jbGllbnRYLCBuZWFyZXN0Um93T2JqZWN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkpO1xyXG4gICAgICAgICAgLy8gY29uc3QgYm90dG9tUm93ID0gTnVtYmVyKGdldE5lYXJlc3RSb3dOdW1iZXIobGVmdCArIHdpZHRoLCB0b3AgKyBoZWlnaHQpKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignZHJhZ21vdmUnLCBlID0+IHtcclxuICAgICAgICAgIGNvbnN0IG1hZ2ljYWxDb25zdGFudCA9IDI7XHJcbiAgICAgICAgICAvLyBJIGFkZGVkIHRoaXMgbWFnaWNhbCBjb25zdGFudCB0byBzb2x2ZSB0aGUgaXNzdWUgb2Ygc2VsZWN0aW9uIGJsZWVkLFxyXG4gICAgICAgICAgLy8gSSBkb24ndCB1bmRlcnN0YW5kIHdoeSBpdCB3b3JrcywgYnV0IGlmIGZyZXF1ZW50aXN0IHN0YXRpc3RpY2lhbnMgY2FuIHVzZSBpbWFnaW5hcnkgbnVtYmVycywgc28gY2FuIGkuXHJcbiAgICAgICAgICBjb25zdCB7c3RhcnRYLCBzdGFydFl9ID0gdGhpcy5fc2VsZWN0Qm94O1xyXG4gICAgICAgICAgY29uc3Qgc3RhcnRSb3dPYmplY3QgPSBnZXROZWFyZXN0Um93T2JqZWN0KHN0YXJ0WCwgc3RhcnRZKTtcclxuICAgICAgICAgIGNvbnN0IHtjbGllbnRYLCBjbGllbnRZfSA9IGU7XHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50Um93T2JqZWN0ID0gZ2V0TmVhcmVzdFJvd09iamVjdChjbGllbnRYLCBjbGllbnRZKTtcclxuICAgICAgICAgIGlmIChjdXJyZW50Um93T2JqZWN0ICE9PSB1bmRlZmluZWQgJiYgc3RhcnRSb3dPYmplY3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBvbmx5IHJ1biBpZiB5b3UgY2FuIGRldGVjdCB0aGUgdG9wIHJvd1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydFJvd051bWJlciA9IGdldFJvd09iamVjdFJvd051bWJlcihzdGFydFJvd09iamVjdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSb3dOdW1iZXIgPSBnZXRSb3dPYmplY3RSb3dOdW1iZXIoY3VycmVudFJvd09iamVjdCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IG51bVJvd3MgPSAxICsgTWF0aC5hYnMoc3RhcnRSb3dOdW1iZXIgLSBjdXJyZW50Um93TnVtYmVyKTtcclxuICAgICAgICAgICAgY29uc3Qgcm93TWFyZ2luQm9yZGVyID0gZ2V0VmVydGljYWxNYXJnaW5Cb3JkZXIoY3VycmVudFJvd09iamVjdCk7XHJcbiAgICAgICAgICAgIGlmIChzdGFydFJvd051bWJlciA8PSBjdXJyZW50Um93TnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgLy8gc2VsZWN0IGJveCBmb3Igc2VsZWN0aW9uIGdvaW5nIGRvd25cclxuICAgICAgICAgICAgICAvLyBnZXQgdGhlIGZpcnN0IHNlbGVjdGVkIHJvd3MgdG9wXHJcbiAgICAgICAgICAgICAgY29uc3Qgc3RhcnRUb3AgPSBNYXRoLmNlaWwoc3RhcnRSb3dPYmplY3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgcm93TWFyZ2luQm9yZGVyKTtcclxuICAgICAgICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByb3dzIGJvdHRvbVxyXG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRCb3R0b20gPSBNYXRoLmZsb29yKGdldFRydWVCb3R0b20oY3VycmVudFJvd09iamVjdCkgLSBtYWdpY2FsQ29uc3RhbnQgLSByb3dNYXJnaW5Cb3JkZXIpO1xyXG4gICAgICAgICAgICAgIHRoaXMuX3NlbGVjdEJveC5zdGFydChzdGFydFgsIHN0YXJ0VG9wKTtcclxuICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RCb3gubW92ZShjbGllbnRYLCBjdXJyZW50Qm90dG9tKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBzZWxlY3QgYm94IGZvciBzZWxlY3Rpb24gZ29pbmcgdXBcclxuICAgICAgICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByb3dzIHRvcFxyXG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUb3AgPSBNYXRoLmNlaWwoY3VycmVudFJvd09iamVjdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyByb3dNYXJnaW5Cb3JkZXIpO1xyXG4gICAgICAgICAgICAgIC8vIGdldCB0aGUgZmlyc3Qgc2VsZWN0ZWQgcm93cyBib3R0b21cclxuICAgICAgICAgICAgICBjb25zdCBzdGFydEJvdHRvbSA9IE1hdGguZmxvb3IoZ2V0VHJ1ZUJvdHRvbShzdGFydFJvd09iamVjdCkgLSBtYWdpY2FsQ29uc3RhbnQgLSByb3dNYXJnaW5Cb3JkZXIgKiAyKTtcclxuICAgICAgICAgICAgICAvLyB0aGUgYm90dG9tIHdpbGwgYmxlZWQgc291dGggdW5sZXNzIHlvdSBjb3VudGVyIHRoZSBtYXJnaW5zIGFuZCBib3JlZGVycyBmcm9tIHRoZSBhYm92ZSByb3dzXHJcbiAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0Qm94LnN0YXJ0KHN0YXJ0WCwgc3RhcnRCb3R0b20pO1xyXG4gICAgICAgICAgICAgIHRoaXMuX3NlbGVjdEJveC5tb3ZlKGNsaWVudFgsIGN1cnJlbnRUb3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2RyYWdlbmQnLCBlID0+IHtcclxuICAgICAgICAgIGxldCB7dG9wLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuX3NlbGVjdEJveC5lbmQoKTtcclxuICAgICAgICAgIC8vR2V0IHRoZSBzdGFydCBhbmQgZW5kIHJvdyBvZiB0aGUgc2VsZWN0aW9uIHJlY3RhbmdsZVxyXG4gICAgICAgICAgY29uc3QgdG9wUm93T2JqZWN0ID0gZ2V0TmVhcmVzdFJvd09iamVjdChsZWZ0LCB0b3ApO1xyXG4gICAgICAgICAgaWYgKHRvcFJvd09iamVjdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIG9ubHkgY29uZmlybSB0aGUgZW5kIG9mIGEgZHJhZyBpZiB0aGUgc2VsZWN0aW9uIGJveCBpcyB2YWxpZFxyXG4gICAgICAgICAgICBjb25zdCB0b3BSb3dOdW1iZXIgPSBOdW1iZXIoZ2V0TmVhcmVzdFJvd051bWJlcihsZWZ0LCB0b3ApKTtcclxuICAgICAgICAgICAgY29uc3QgdG9wUm93TG9jID0gdG9wUm93T2JqZWN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCByb3dNYXJnaW5Cb3JkZXIgPSBnZXRWZXJ0aWNhbE1hcmdpbkJvcmRlcih0b3BSb3dPYmplY3QpO1xyXG4gICAgICAgICAgICBjb25zdCBib3R0b21Sb3cgPSBOdW1iZXIoXHJcbiAgICAgICAgICAgICAgZ2V0TmVhcmVzdFJvd051bWJlcihcclxuICAgICAgICAgICAgICAgIGxlZnQgKyB3aWR0aCxcclxuICAgICAgICAgICAgICAgIE1hdGguZmxvb3IodG9wUm93TG9jLnRvcCAtIHJvd01hcmdpbkJvcmRlcikgKyBNYXRoLmZsb29yKGhlaWdodCAtIHJvd01hcmdpbkJvcmRlcilcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vR2V0IHRoZSBzdGFydCBhbmQgZW5kIHRpbWUgb2YgdGhlIHNlbGVjdGlvbiByZWN0YW5nbGVcclxuICAgICAgICAgICAgbGVmdCA9IGxlZnQgLSB0aGlzLnByb3BzLmdyb3VwT2Zmc2V0O1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRPZmZzZXQgPSB3aWR0aCA+IDAgPyBsZWZ0IDogbGVmdCArIHdpZHRoO1xyXG4gICAgICAgICAgICBsZXQgZW5kT2Zmc2V0ID0gd2lkdGggPiAwID8gbGVmdCArIHdpZHRoIDogbGVmdDtcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gZ2V0VGltZUF0UGl4ZWwoXHJcbiAgICAgICAgICAgICAgc3RhcnRPZmZzZXQsXHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpLFxyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc25hcE1pbnV0ZXNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc3QgZW5kVGltZSA9IGdldFRpbWVBdFBpeGVsKFxyXG4gICAgICAgICAgICAgIGVuZE9mZnNldCxcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXHJcbiAgICAgICAgICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKCksXHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zbmFwTWludXRlc1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvL0dldCBpdGVtcyBpbiB0aGVzZSByYW5nZXNcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgciA9IE1hdGgubWluKHRvcFJvd051bWJlciwgYm90dG9tUm93KTsgciA8PSBNYXRoLm1heCh0b3BSb3dOdW1iZXIsIGJvdHRvbVJvdyk7IHIrKykge1xyXG4gICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMucHVzaChcclxuICAgICAgICAgICAgICAgIC4uLl8uZmlsdGVyKHRoaXMucm93SXRlbU1hcFtyXSwgaSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpLnN0YXJ0LmlzQmVmb3JlKGVuZFRpbWUpICYmIGkuZW5kLmlzQWZ0ZXIoc3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3Rpb24oVGltZWxpbmUuY2hhbmdlVHlwZXMuaXRlbXNTZWxlY3RlZCwgc2VsZWN0ZWRJdGVtcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlSXRlbVJvd0V2ZW50ID0gKGUsIGl0ZW1DYWxsYmFjaywgcm93Q2FsbGJhY2spID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vIFNraXAgY2xpY2sgaGFuZGxlciBpZiBzZWxlY3Rpbmcgd2l0aCBzZWxlY3Rpb24gYm94XHJcbiAgICBpZiAodGhpcy5zZWxlY3RpbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1pdGVtLWluZGV4JykgfHwgZS50YXJnZXQucGFyZW50RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtaXRlbS1pbmRleCcpKSB7XHJcbiAgICAgIGxldCBpdGVtS2V5ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWl0ZW0taW5kZXgnKSB8fCBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pdGVtLWluZGV4Jyk7XHJcbiAgICAgIGl0ZW1DYWxsYmFjayAmJiBpdGVtQ2FsbGJhY2soZSwgTnVtYmVyKGl0ZW1LZXkpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCByb3cgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93LWluZGV4Jyk7XHJcbiAgICAgIGxldCBjbGlja2VkVGltZSA9IGdldFRpbWVBdFBpeGVsKFxyXG4gICAgICAgIGUuY2xpZW50WCAtIHRoaXMucHJvcHMuZ3JvdXBPZmZzZXQsXHJcbiAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXHJcbiAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxyXG4gICAgICAgIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvL2NvbnN0IHJvdW5kZWRTdGFydE1pbnV0ZXMgPSBNYXRoLnJvdW5kKGNsaWNrZWRUaW1lLm1pbnV0ZSgpIC8gdGhpcy5wcm9wcy5zbmFwTWludXRlcykgKiB0aGlzLnByb3BzLnNuYXBNaW51dGVzOyAvLyBJIGRvbnQga25vdyB3aGF0IHRoaXMgZG9lc1xyXG4gICAgICBsZXQgc25hcHBlZENsaWNrZWRUaW1lID0gdGltZVNuYXAoY2xpY2tlZFRpbWUsIHRoaXMucHJvcHMuc25hcE1pbnV0ZXMpO1xyXG4gICAgICByb3dDYWxsYmFjayAmJiByb3dDYWxsYmFjayhlLCByb3csIGNsaWNrZWRUaW1lLCBzbmFwcGVkQ2xpY2tlZFRpbWUpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNlbGxSZW5kZXJlcih3aWR0aCkge1xyXG4gICAgY29uc3Qge3RpbWVsaW5lTW9kZSwgb25JdGVtSG92ZXIsIG9uSXRlbUxlYXZlLCByb3dMYXllcnN9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGNhblNlbGVjdCA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlNFTEVDVCwgdGltZWxpbmVNb2RlKTtcclxuICAgIHJldHVybiAoe2NvbHVtbkluZGV4LCBrZXksIHBhcmVudCwgcm93SW5kZXgsIHN0eWxlfSkgPT4ge1xyXG4gICAgICBsZXQgaXRlbUNvbCA9IDE7XHJcbiAgICAgIGlmIChpdGVtQ29sID09IGNvbHVtbkluZGV4KSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zSW5Sb3cgPSB0aGlzLnJvd0l0ZW1NYXBbcm93SW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGxheWVyc0luUm93ID0gcm93TGF5ZXJzLmZpbHRlcihyID0+IHIucm93TnVtYmVyID09PSByb3dJbmRleCk7XHJcbiAgICAgICAgbGV0IHJvd0hlaWdodCA9IHRoaXMucHJvcHMuaXRlbUhlaWdodDtcclxuICAgICAgICBpZiAodGhpcy5yb3dIZWlnaHRDYWNoZVtyb3dJbmRleF0pIHtcclxuICAgICAgICAgIHJvd0hlaWdodCA9IHJvd0hlaWdodCAqIHRoaXMucm93SGVpZ2h0Q2FjaGVbcm93SW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBrZXk9e2tleX1cclxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgICAgICBkYXRhLXJvdy1pbmRleD17cm93SW5kZXh9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJjdDlrLXJvd1wiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5faGFuZGxlSXRlbVJvd0V2ZW50KGUsIFRpbWVsaW5lLm5vX29wLCB0aGlzLnByb3BzLm9uUm93Q2xpY2spfVxyXG4gICAgICAgICAgICBvbk1vdXNlRG93bj17ZSA9PiAodGhpcy5zZWxlY3RpbmcgPSBmYWxzZSl9XHJcbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXtlID0+ICh0aGlzLnNlbGVjdGluZyA9IHRydWUpfVxyXG4gICAgICAgICAgICBvbk1vdXNlT3Zlcj17ZSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlSXRlbVJvd0V2ZW50KGUsIG9uSXRlbUhvdmVyLCBudWxsKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtlID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVJdGVtUm93RXZlbnQoZSwgb25JdGVtTGVhdmUsIG51bGwpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBvbkNvbnRleHRNZW51PXtlID0+XHJcbiAgICAgICAgICAgICAgdGhpcy5faGFuZGxlSXRlbVJvd0V2ZW50KGUsIHRoaXMucHJvcHMub25JdGVtQ29udGV4dENsaWNrLCB0aGlzLnByb3BzLm9uUm93Q29udGV4dENsaWNrKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uRG91YmxlQ2xpY2s9e2UgPT4gdGhpcy5faGFuZGxlSXRlbVJvd0V2ZW50KGUsIHRoaXMucHJvcHMub25JdGVtRG91YmxlQ2xpY2ssIHRoaXMucHJvcHMub25Sb3dEb3VibGVDbGljayl9PlxyXG4gICAgICAgICAgICB7cm93SXRlbXNSZW5kZXJlcihcclxuICAgICAgICAgICAgICBpdGVtc0luUm93LFxyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcclxuICAgICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1IZWlnaHQsXHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5pdGVtUmVuZGVyZXIsXHJcbiAgICAgICAgICAgICAgY2FuU2VsZWN0ID8gdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zIDogW11cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge3Jvd0xheWVyUmVuZGVyZXIobGF5ZXJzSW5Sb3csIHRoaXMucHJvcHMuc3RhcnREYXRlLCB0aGlzLnByb3BzLmVuZERhdGUsIHdpZHRoLCByb3dIZWlnaHQpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJvd0hlaWdodCh7aW5kZXh9KSB7XHJcbiAgICAvLyBsZXQgcmggPSB0aGlzLnJvd0hlaWdodENhY2hlW2luZGV4XSA/IHRoaXMucm93SGVpZ2h0Q2FjaGVbaW5kZXhdIDogMTtcclxuICAgIGNvbnN0IHJoID0gMTtcclxuICAgIHJldHVybiByaCAqIHRoaXMucHJvcHMuaXRlbUhlaWdodDtcclxuICB9XHJcblxyXG4gIGdyaWRfcmVmX2NhbGxiYWNrKHJlYWN0Q29tcG9uZW50KSB7XHJcbiAgICB0aGlzLl9ncmlkID0gcmVhY3RDb21wb25lbnQ7XHJcbiAgICB0aGlzLl9ncmlkRG9tTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMuX2dyaWQpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0X3JlZl9jYWxsYmFjayhyZWFjdENvbXBvbmVudCkge1xyXG4gICAgdGhpcy5fc2VsZWN0Qm94ID0gcmVhY3RDb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICB0aHJvdHRsZWRNb3VzZU1vdmVGdW5jKGUpIHtcclxuICAgIGNvbnN0IHtjb21wb25lbnRJZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgbGVmdE9mZnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5yY3Q5ay1pZC0ke2NvbXBvbmVudElkfSAucGFyZW50LWRpdmApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICBjb25zdCBjdXJzb3JTbmFwcGVkVGltZSA9IGdldFRpbWVBdFBpeGVsKFxyXG4gICAgICBlLmNsaWVudFggLSB0aGlzLnByb3BzLmdyb3VwT2Zmc2V0IC0gbGVmdE9mZnNldCxcclxuICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXHJcbiAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcclxuICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKCksXHJcbiAgICAgIHRoaXMucHJvcHMuc25hcE1pbnV0ZXNcclxuICAgICk7XHJcbiAgICBpZiAoIXRoaXMubW91c2Vfc25hcHBlZF90aW1lIHx8IHRoaXMubW91c2Vfc25hcHBlZF90aW1lLnVuaXgoKSAhPT0gY3Vyc29yU25hcHBlZFRpbWUudW5peCgpKSB7XHJcbiAgICAgIGlmIChjdXJzb3JTbmFwcGVkVGltZS5pc1NhbWVPckFmdGVyKHRoaXMucHJvcHMuc3RhcnREYXRlKSkge1xyXG4gICAgICAgIHRoaXMubW91c2Vfc25hcHBlZF90aW1lID0gY3Vyc29yU25hcHBlZFRpbWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3Vyc29yVGltZTogdGhpcy5tb3VzZV9zbmFwcGVkX3RpbWV9KTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3Rpb24oXHJcbiAgICAgICAgICBUaW1lbGluZS5jaGFuZ2VUeXBlcy5zbmFwcGVkTW91c2VNb3ZlLFxyXG4gICAgICAgICAge3NuYXBwZWRUaW1lOiB0aGlzLm1vdXNlX3NuYXBwZWRfdGltZS5jbG9uZSgpfSxcclxuICAgICAgICAgIG51bGxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3VzZU1vdmVGdW5jKGUpIHtcclxuICAgIGUucGVyc2lzdCgpO1xyXG4gICAgdGhpcy50aHJvdHRsZWRNb3VzZU1vdmVGdW5jKGUpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICB0aW1lYmFyRm9ybWF0LFxyXG4gICAgICBjb21wb25lbnRJZCxcclxuICAgICAgc2hhbGxvd1VwZGF0ZUNoZWNrLFxyXG4gICAgICBmb3JjZVJlZHJhd0Z1bmMsXHJcbiAgICAgIGJvdHRvbVJlc29sdXRpb24sXHJcbiAgICAgIHRvcFJlc29sdXRpb25cclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IGRpdkNzc0NsYXNzID0gYHJjdDlrLXRpbWVsaW5lLWRpdiByY3Q5ay1pZC0ke2NvbXBvbmVudElkfWA7XHJcbiAgICBsZXQgdmFyVGltZWJhclByb3BzID0ge307XHJcbiAgICBpZiAodGltZWJhckZvcm1hdCkgdmFyVGltZWJhclByb3BzWyd0aW1lRm9ybWF0cyddID0gdGltZWJhckZvcm1hdDtcclxuICAgIGlmIChib3R0b21SZXNvbHV0aW9uKSB2YXJUaW1lYmFyUHJvcHNbJ2JvdHRvbV9yZXNvbHV0aW9uJ10gPSBib3R0b21SZXNvbHV0aW9uO1xyXG4gICAgaWYgKHRvcFJlc29sdXRpb24pIHZhclRpbWViYXJQcm9wc1sndG9wX3Jlc29sdXRpb24nXSA9IHRvcFJlc29sdXRpb247XHJcblxyXG4gICAgZnVuY3Rpb24gY29sdW1uV2lkdGgod2lkdGgpIHtcclxuICAgICAgcmV0dXJuICh7aW5kZXh9KSA9PiB7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlSGVpZ2h0KGhlaWdodCkge1xyXG4gICAgICAvLyB3aGVuIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGZvciB0aGUgZmlyc3QgdGltZSwgdGhlIHRpbWViYXIgaXMgbm90IHlldCByZW5kZXJlZFxyXG4gICAgICBsZXQgdGltZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5yY3Q5ay1pZC0ke2NvbXBvbmVudElkfSAucmN0OWstdGltZWJhcmApO1xyXG4gICAgICBpZiAoIXRpbWViYXIpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgICAgfVxyXG4gICAgICAvLyBzdWJzdHJhY3QgdGltZWJhciBoZWlnaHQgZnJvbSB0b3RhbCBoZWlnaHRcclxuICAgICAgY29uc3QgdGltZWJhckhlaWdodCA9IHRpbWViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG4gICAgICByZXR1cm4gTWF0aC5tYXgoaGVpZ2h0IC0gdGltZWJhckhlaWdodCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEZyYWdtZW50PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtkaXZDc3NDbGFzc30+XHJcbiAgICAgICAgICA8QXV0b1NpemVyIGNsYXNzTmFtZT1cInJjdDlrLWF1dG9zaXplclwiIG9uUmVzaXplPXt0aGlzLnJlZnJlc2hHcmlkfT5cclxuICAgICAgICAgICAgeyh7aGVpZ2h0LCB3aWR0aH0pID0+IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcmVudC1kaXZcIiBvbk1vdXNlTW92ZT17dGhpcy5tb3VzZU1vdmVGdW5jfT5cclxuICAgICAgICAgICAgICAgIDxTZWxlY3RCb3ggcmVmPXt0aGlzLnNlbGVjdF9yZWZfY2FsbGJhY2t9IC8+XHJcbiAgICAgICAgICAgICAgICA8VGltZWJhciBzdGFydD17dGhpcy5wcm9wcy5zdGFydERhdGV9IGVuZD17dGhpcy5wcm9wcy5lbmREYXRlfSB3aWR0aD17d2lkdGh9IHsuLi52YXJUaW1lYmFyUHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICA8VGltZWxpbmVCb2R5XHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cclxuICAgICAgICAgICAgICAgICAgY29sdW1uV2lkdGg9e2NvbHVtbldpZHRoKHdpZHRoKX1cclxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtjYWxjdWxhdGVIZWlnaHQoaGVpZ2h0KX1cclxuICAgICAgICAgICAgICAgICAgcm93SGVpZ2h0PXt0aGlzLnJvd0hlaWdodH1cclxuICAgICAgICAgICAgICAgICAgcm93Q291bnQ9e3RoaXMucHJvcHMuZ3JvdXBzLmxlbmd0aH1cclxuICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXt0aGlzLmNlbGxSZW5kZXJlcih0aGlzLmdldFRpbWVsaW5lV2lkdGgod2lkdGgpKX1cclxuICAgICAgICAgICAgICAgICAgZ3JpZF9yZWZfY2FsbGJhY2s9e3RoaXMuZ3JpZF9yZWZfY2FsbGJhY2t9XHJcbiAgICAgICAgICAgICAgICAgIHNoYWxsb3dVcGRhdGVDaGVjaz17c2hhbGxvd1VwZGF0ZUNoZWNrfVxyXG4gICAgICAgICAgICAgICAgICBmb3JjZVJlZHJhd0Z1bmM9e2ZvcmNlUmVkcmF3RnVuY31cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L0F1dG9TaXplcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9GcmFnbWVudD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==