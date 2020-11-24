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

var _commonUtils = require("../utils/commonUtils");

var _itemUtils = require("../utils/itemUtils");

var _timeUtils = require("../utils/timeUtils");

var _timebar = _interopRequireDefault(require("../components/timebar"));

var _selector = _interopRequireDefault(require("../components/selector"));

var _renderers = require("../components/renderers");

var _body = _interopRequireDefault(require("../components/body"));

require("core-js/fn/string/starts-with");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
    value: function setUpDragging(canSelect, canDrag) {
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
              left: 0,
              right: 1,
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
          var selections = []; // Snap the movement to the current snap interval

          var snapDx = (0, _timeUtils.getSnapPixelFromDelta)(dx, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);

          _lodash["default"].forEach(animatedItems, function (domItem) {
            var _this4$itemFromElemen = _this4.itemFromElement(domItem),
                item = _this4$itemFromElemen.item;

            var itemDuration = item.end.diff(item.start, 'ms');
            var newPixelOffset = ((0, _commonUtils.pixToInt)(domItem.style.left) + snapDx).toFixed(3);
            var newStart = (0, _timeUtils.getTimeAtPixel)(newPixelOffset, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);
            var newEnd = newStart.clone().add(itemDuration, 'ms');

            if (newStart.diff(_this4.props.startDate) <= 0) {
              newStart = _this4.props.startDate;

              _this4.props.setStartDateWithZoom(_this4.props.startDate);
            } else {
              _this4.props.setStartDateWithZoom(newStart);
            }

            if (_this4.props.endDate.diff(newEnd) <= 0) {
              newEnd = _this4.props.endDate;

              _this4.props.setEndDateWithZoom(_this4.props.endDate);
            } else {
              _this4.props.setEndDateWithZoom(newEnd);
            }

            selections.push([newStart, newEnd]); // Translate the new start time back to pixels, so we can animate the snap

            domItem.style.webkitTransform = domItem.style.transform = 'translate(' + snapDx + 'px, ' + 0 + 'px)';
          });

          target.setAttribute('drag-x', dx);

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


          var newRow = (0, _itemUtils.getNearestRowNumber)(e.clientX, e.clientY);
          var rowChangeDelta = newRow - rowNo; // Update time

          var newPixelOffset = ((0, _commonUtils.pixToInt)(e.target.style.left) + (parseFloat(e.target.getAttribute('drag-x')) || 0)).toFixed(3);
          var newStart = (0, _timeUtils.getTimeAtPixel)(newPixelOffset, _this4.props.startDate, _this4.props.endDate, _this4.getTimelineWidth(), _this4.props.snapMinutes);
          var timeDelta = newStart.clone().diff(item.start, 'ms');
          var changes = {
            rowChangeDelta: rowChangeDelta,
            timeDelta: timeDelta
          };
          var items = [];

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
            var itemAboveElement = false; // Checking whether the dragged item is above other items.

            var _loop = function _loop(i) {
              var element = itemsOnNewRow[i];

              if (animatedItemsKeys.some(function (key) {
                return key === element.key;
              })) {
                return "continue";
              }

              var elementStartInMs = element.start.clone().diff(0, 'ms');
              var elementEndInMs = element.end.clone().diff(0, 'ms');

              if (newStartInMs > elementStartInMs && newStartInMs < elementEndInMs || newEndInMs > elementStartInMs && newEndInMs < elementEndInMs) {
                itemAboveElement = true;
                return "break";
              }
            };

            for (var i = 0; i < itemsOnNewRow.length; i++) {
              var _ret = _loop(i);

              if (_ret === "continue") continue;
              if (_ret === "break") break;
            }

            item.start = newStart;
            item.end = newEnd;
            items.push(item);
          });

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
    }
  }, {
    key: "cellRenderer",
    value: function cellRenderer(width) {
      var _this5 = this;

      var _this$props2 = this.props,
          timelineMode = _this$props2.timelineMode,
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
            }
          }, (0, _itemUtils.rowItemsRenderer)(itemsInRow, _this5.props.startDate, _this5.props.endDate, width, _this5.props.itemHeight, _this5.props.itemRenderer, canSelect ? _this5.props.selectedItems : [], true), (0, _itemUtils.rowLayerRenderer)(layersInRow, _this5.props.startDate, _this5.props.endDate, width, rowHeight));
        }
      };
    }
  }, {
    key: "rowHeight",
    value: function rowHeight() {
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
      var divCssClass = "rct9k-timeline-div rct9k-timeline-scroll rct9k-id-".concat(componentId);
      var varTimebarProps = {};
      if (timebarFormat) varTimebarProps['timeFormats'] = timebarFormat;
      if (bottomResolution) varTimebarProps['bottom_resolution'] = bottomResolution;
      if (topResolution) varTimebarProps['top_resolution'] = topResolution;

      function columnWidth(width) {
        return function (_ref2) {
          var index = _ref2.index;
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
      }, function (_ref3) {
        var width = _ref3.width;
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: "parent-div"
        }, /*#__PURE__*/_react["default"].createElement(_selector["default"], {
          ref: _this6.select_ref_callback
        }), /*#__PURE__*/_react["default"].createElement(_timebar["default"], _extends({
          start: _this6.props.startDate,
          end: _this6.props.endDate,
          width: width
        }, varTimebarProps)), /*#__PURE__*/_react["default"].createElement(_body["default"], {
          width: width,
          columnWidth: columnWidth(width),
          height: calculateHeight(_this6.props.itemHeight),
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

_defineProperty(Timeline, "TIMELINE_MODES", {
  SELECT: 1,
  DRAG: 2,
  RESIZE: 4
});

_defineProperty(Timeline, "propTypes", {
  setStartDateWithZoom: _propTypes["default"].func.isRequired,
  setEndDateWithZoom: _propTypes["default"].func.isRequired,
  items: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
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
  minItemDuration: _propTypes["default"].number // in ms

});

_defineProperty(Timeline, "defaultProps", {
  rowLayers: [],
  groupOffset: 0,
  itemHeight: 10,
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
  minItemDuration: 1 // in ms

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Njcm9sbEJhci5qcyJdLCJuYW1lcyI6WyJUaW1lbGluZSIsImJpdCIsIm1hc2siLCJwcm9wcyIsImNvbmZpZyIsIl9ncmlkIiwicmVjb21wdXRlR3JpZFNpemUiLCJlIiwiaXRlbUNhbGxiYWNrIiwicm93Q2FsbGJhY2siLCJwcmV2ZW50RGVmYXVsdCIsInNlbGVjdGluZyIsInRhcmdldCIsImhhc0F0dHJpYnV0ZSIsInBhcmVudEVsZW1lbnQiLCJpdGVtS2V5IiwiZ2V0QXR0cmlidXRlIiwiTnVtYmVyIiwicm93IiwiY2xpY2tlZFRpbWUiLCJjbGllbnRYIiwiZ3JvdXBPZmZzZXQiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiZ2V0VGltZWxpbmVXaWR0aCIsInNuYXBwZWRDbGlja2VkVGltZSIsInNuYXBNaW51dGVzIiwic3RhdGUiLCJzZWxlY3Rpb24iLCJjdXJzb3JUaW1lIiwic2V0VGltZU1hcCIsIml0ZW1zIiwiY2VsbFJlbmRlcmVyIiwiYmluZCIsInJvd0hlaWdodCIsImdldEl0ZW0iLCJjaGFuZ2VHcm91cCIsInNldFNlbGVjdGlvbiIsImNsZWFyU2VsZWN0aW9uIiwiaXRlbUZyb21FbGVtZW50IiwidXBkYXRlRGltZW5zaW9ucyIsImdyaWRfcmVmX2NhbGxiYWNrIiwic2VsZWN0X3JlZl9jYWxsYmFjayIsInRocm90dGxlZE1vdXNlTW92ZUZ1bmMiLCJfIiwidGhyb3R0bGUiLCJjYW5TZWxlY3QiLCJpc0JpdFNldCIsIlRJTUVMSU5FX01PREVTIiwiU0VMRUNUIiwidGltZWxpbmVNb2RlIiwiY2FuRHJhZyIsIkRSQUciLCJjYW5SZXNpemUiLCJSRVNJWkUiLCJzZXRVcERyYWdnaW5nIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm5leHRQcm9wcyIsInJlZnJlc2hHcmlkIiwiX2l0ZW1JbnRlcmFjdGFibGUiLCJ1bnNldCIsIl9zZWxlY3RSZWN0YW5nbGVJbnRlcmFjdGFibGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwic2VsZWN0ZWRJdGVtcyIsInNlbGVjdGlvbkNoYW5nZSIsImlzRXF1YWwiLCJ0aW1lbGluZU1vZGVDaGFuZ2UiLCJjbGVhclRpbWVvdXQiLCJyZXNpemVUaW1lb3V0Iiwic2V0VGltZW91dCIsImZvcmNlVXBkYXRlIiwiaXRlbVJvd01hcCIsInJvd0l0ZW1NYXAiLCJyb3dIZWlnaHRDYWNoZSIsInZpc2libGVJdGVtcyIsImZpbHRlciIsImkiLCJlbmQiLCJzdGFydCIsIml0ZW1Sb3dzIiwiZ3JvdXBCeSIsImZvckVhY2giLCJyb3dJbnQiLCJwYXJzZUludCIsInVuZGVmaW5lZCIsIml0ZW0iLCJrZXkiLCJwdXNoIiwiaW5kZXgiLCJyb3dObyIsIml0ZW1JbmRleCIsImZpbmRJbmRleCIsImlkIiwiY3VyUm93IiwibmV3Um93Iiwic2VsZWN0aW9ucyIsIm5ld1NlbGVjdGlvbiIsIm1hcCIsInMiLCJjbG9uZSIsInNldFN0YXRlIiwidG90YWxXaWR0aCIsIndpZHRoIiwidG9wRGl2Q2xhc3NJZCIsImNvbXBvbmVudElkIiwic2VsZWN0ZWRJdGVtU2VsZWN0b3IiLCJvbiIsIl9oYW5kbGVJdGVtUm93RXZlbnQiLCJvbkl0ZW1DbGljayIsIm9uUm93Q2xpY2siLCJkcmFnZ2FibGUiLCJlbmFibGVkIiwiYWxsb3dGcm9tIiwicmVzdHJpY3QiLCJyZXN0cmljdGlvbiIsImVsZW1lbnRSZWN0IiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiYW5pbWF0ZWRJdGVtcyIsIm9uSW50ZXJhY3Rpb24iLCJjaGFuZ2VUeXBlcyIsImRyYWdTdGFydCIsImRvbUl0ZW0iLCJfZ3JpZERvbU5vZGUiLCJxdWVyeVNlbGVjdG9yIiwic2V0QXR0cmlidXRlIiwic3R5bGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZHgiLCJwYXJzZUZsb2F0Iiwic25hcER4IiwiaXRlbUR1cmF0aW9uIiwiZGlmZiIsIm5ld1BpeGVsT2Zmc2V0IiwidG9GaXhlZCIsIm5ld1N0YXJ0IiwibmV3RW5kIiwiYWRkIiwic2V0U3RhcnREYXRlV2l0aFpvb20iLCJzZXRFbmREYXRlV2l0aFpvb20iLCJ3ZWJraXRUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm0iLCJhbmltYXRlZEl0ZW1zS2V5cyIsImNsaWVudFkiLCJyb3dDaGFuZ2VEZWx0YSIsInRpbWVEZWx0YSIsImNoYW5nZXMiLCJuZXdTdGFydEluTXMiLCJuZXdFbmRJbk1zIiwiY3VycmVudEl0ZW1OZXdSb3ciLCJpdGVtc09uTmV3Um93IiwiZWxlbWVudCIsInNvcnQiLCJhIiwiYiIsIml0ZW1BYm92ZUVsZW1lbnQiLCJzb21lIiwiZWxlbWVudFN0YXJ0SW5NcyIsImVsZW1lbnRFbmRJbk1zIiwibGVuZ3RoIiwiZHJhZ0VuZCIsIml0ZW1IZWlnaHQiLCJNYXRoIiwicm91bmQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyb3dJbmRleCIsInJvd0xheWVycyIsImNvbHVtbkluZGV4IiwicGFyZW50IiwiaXRlbUNvbCIsIml0ZW1zSW5Sb3ciLCJsYXllcnNJblJvdyIsInIiLCJyb3dOdW1iZXIiLCJub19vcCIsIml0ZW1SZW5kZXJlciIsInJoIiwicmVhY3RDb21wb25lbnQiLCJSZWFjdERPTSIsImZpbmRET01Ob2RlIiwiX3NlbGVjdEJveCIsImxlZnRPZmZzZXQiLCJkb2N1bWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImN1cnNvclNuYXBwZWRUaW1lIiwibW91c2Vfc25hcHBlZF90aW1lIiwidW5peCIsImlzU2FtZU9yQWZ0ZXIiLCJzbmFwcGVkTW91c2VNb3ZlIiwic25hcHBlZFRpbWUiLCJ0aW1lYmFyRm9ybWF0Iiwic2hhbGxvd1VwZGF0ZUNoZWNrIiwiZm9yY2VSZWRyYXdGdW5jIiwiYm90dG9tUmVzb2x1dGlvbiIsInRvcFJlc29sdXRpb24iLCJkaXZDc3NDbGFzcyIsInZhclRpbWViYXJQcm9wcyIsImNvbHVtbldpZHRoIiwiY2FsY3VsYXRlSGVpZ2h0IiwiaGVpZ2h0IiwidGltZWJhciIsInRpbWViYXJIZWlnaHQiLCJtYXgiLCJncm91cHMiLCJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsIm9iamVjdCIsIm51bWJlciIsInNoYXBlIiwib3JpZ2luYWxTdGFydERhdGUiLCJvcmlnaW5hbEVuZERhdGUiLCJzaG93Q3Vyc29yVGltZSIsImJvb2wiLCJjdXJzb3JUaW1lRm9ybWF0Iiwic3RyaW5nIiwib25JdGVtRG91YmxlQ2xpY2siLCJvbkl0ZW1Db250ZXh0Iiwib25Sb3dDb250ZXh0Iiwib25Sb3dEb3VibGVDbGljayIsIm9uSXRlbUhvdmVyIiwib25JdGVtTGVhdmUiLCJncm91cFJlbmRlcmVyIiwiZ3JvdXBUaXRsZVJlbmRlcmVyIiwibWluSXRlbUR1cmF0aW9uIiwiRGVmYXVsdEdyb3VwUmVuZGVyZXIiLCJEZWZhdWx0SXRlbVJlbmRlcmVyIiwicmVzaXplU3RhcnQiLCJyZXNpemVFbmQiLCJpdGVtc1NlbGVjdGVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7OzZCQThFSEMsRyxFQUFLQyxJLEVBQU07QUFDekIsYUFBTyxDQUFDRCxHQUFHLEdBQUdDLElBQVAsTUFBaUJELEdBQXhCO0FBQ0Q7OztBQUlELG9CQUFZRSxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOOztBQURpQixrRUE2SEwsWUFBaUI7QUFBQSxVQUFoQkMsTUFBZ0IsdUVBQVAsRUFBTzs7QUFDN0IsWUFBS0MsS0FBTCxDQUFXQyxpQkFBWCxDQUE2QkYsTUFBN0I7QUFDRCxLQS9Ia0I7O0FBQUEsMEVBa1VHLFVBQUNHLENBQUQsRUFBSUMsWUFBSixFQUFrQkMsV0FBbEIsRUFBa0M7QUFDdERGLE1BQUFBLENBQUMsQ0FBQ0cs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QUEsV0FBVyxFQUFFLENBRk87QUFHcEJpSixFQUFBQSxVQUFVLEVBQUUsRUFIUTtBQUlwQjVJLEVBQUFBLFdBQVcsRUFBRSxJQUpPO0FBS3BCb00sRUFBQUEsZ0JBQWdCLEVBQUUsVUFMRTtBQU1wQm5ILEVBQUFBLFdBQVcsRUFBRSxNQU5PO0FBT3BCaUgsRUFBQUEsY0FBYyxFQUFFLElBUEk7QUFRcEJVLEVBQUFBLGFBQWEsRUFBRUcsK0JBUks7QUFTcEJyRCxFQUFBQSxZQUFZLEVBQUVzRCw4QkFUTTtBQVVwQkgsRUFBQUEsa0JBQWtCLEVBQUU7QUFBQSx3QkFBTSw0Q0FBTjtBQUFBLEdBVkE7QUFXcEJyTCxFQUFBQSxZQUFZLEVBQUVsRCxRQUFRLENBQUNnRCxjQUFULENBQXdCQyxNQUF4QixHQUFpQ2pELFFBQVEsQ0FBQ2dELGNBQVQsQ0FBd0JJLElBQXpELEdBQWdFcEQsUUFBUSxDQUFDZ0QsY0FBVCxDQUF3Qk0sTUFYbEY7QUFZcEI4SSxFQUFBQSxrQkFBa0IsRUFBRSxLQVpBO0FBYXBCQyxFQUFBQSxlQUFlLEVBQUUsSUFiRztBQWNwQm1DLEVBQUFBLGVBQWUsRUFBRSxDQWRHLENBY0Q7O0FBZEMsQzs7Z0JBcERIeE8sUSxpQkFxRUU7QUFDbkIyTyxFQUFBQSxXQUFXLEVBQUUsYUFETTtBQUVuQkMsRUFBQUEsU0FBUyxFQUFFLFdBRlE7QUFHbkJ2RSxFQUFBQSxPQUFPLEVBQUUsU0FIVTtBQUluQnZDLEVBQUFBLFNBQVMsRUFBRSxXQUpRO0FBS25CK0csRUFBQUEsYUFBYSxFQUFFLGVBTEk7QUFNbkI1QyxFQUFBQSxnQkFBZ0IsRUFBRTtBQU5DLEM7O2dCQXJFRmpNLFEsV0FrRkosWUFBTSxDQUFFLEMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgUmVhY3QsIHtGcmFnbWVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHtBdXRvU2l6ZXJ9IGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkJztcclxuXHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IGludGVyYWN0IGZyb20gJ2ludGVyYWN0anMnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHtwaXhUb0ludCwgaW50VG9QaXgsIHN1bVN0eWxlfSBmcm9tICcuLi91dGlscy9jb21tb25VdGlscyc7XHJcbmltcG9ydCB7cm93SXRlbXNSZW5kZXJlciwgcm93TGF5ZXJSZW5kZXJlciwgZ2V0TmVhcmVzdFJvd051bWJlciwgZ2V0TWF4T3ZlcmxhcHBpbmdJdGVtc30gZnJvbSAnLi4vdXRpbHMvaXRlbVV0aWxzJztcclxuaW1wb3J0IHt0aW1lU25hcCwgZ2V0VGltZUF0UGl4ZWwsIGdldFNuYXBQaXhlbEZyb21EZWx0YX0gZnJvbSAnLi4vdXRpbHMvdGltZVV0aWxzJztcclxuaW1wb3J0IFRpbWViYXIgZnJvbSAnLi4vY29tcG9uZW50cy90aW1lYmFyJztcclxuaW1wb3J0IFNlbGVjdEJveCBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdG9yJztcclxuaW1wb3J0IHtEZWZhdWx0R3JvdXBSZW5kZXJlciwgRGVmYXVsdEl0ZW1SZW5kZXJlcn0gZnJvbSAnLi4vY29tcG9uZW50cy9yZW5kZXJlcnMnO1xyXG5pbXBvcnQgVGltZWxpbmVCb2R5IGZyb20gJy4uL2NvbXBvbmVudHMvYm9keSc7XHJcblxyXG4vLyBzdGFydHNXaXRoIHBvbHlmaWxsIGZvciBJRTExIHN1cHBvcnRcclxuaW1wb3J0ICdjb3JlLWpzL2ZuL3N0cmluZy9zdGFydHMtd2l0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lbGluZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgc3RhdGljIFRJTUVMSU5FX01PREVTID0ge1xyXG4gICAgU0VMRUNUOiAxLFxyXG4gICAgRFJBRzogMixcclxuICAgIFJFU0laRTogNFxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBzZXRTdGFydERhdGVXaXRoWm9vbTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHNldEVuZERhdGVXaXRoWm9vbTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxyXG4gICAgZ3JvdXBzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxyXG4gICAgZ3JvdXBPZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICByb3dMYXllcnM6IFByb3BUeXBlcy5hcnJheU9mKFxyXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgIHN0YXJ0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgZW5kOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgcm93TnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIHNlbGVjdGVkSXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxyXG4gICAgc3RhcnREYXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBvcmlnaW5hbFN0YXJ0RGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgb3JpZ2luYWxFbmREYXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBzbmFwTWludXRlczogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHNob3dDdXJzb3JUaW1lOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGN1cnNvclRpbWVGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBjb21wb25lbnRJZDogUHJvcFR5cGVzLnN0cmluZywgLy8gQSB1bmlxdWUga2V5IHRvIGlkZW50aWZ5IHRoZSBjb21wb25lbnQuIE9ubHkgbmVlZGVkIHdoZW4gMiBncmlkcyBhcmUgbW91bnRlZFxyXG4gICAgaXRlbUhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHRpbWVsaW5lTW9kZTogUHJvcFR5cGVzLm51bWJlcixcclxuICAgIHRpbWViYXJGb3JtYXQ6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBvbkl0ZW1DbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkl0ZW1Eb3VibGVDbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkl0ZW1Db250ZXh0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uSW50ZXJhY3Rpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBvblJvd0NsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uUm93Q29udGV4dDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvblJvd0RvdWJsZUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uSXRlbUhvdmVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uSXRlbUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGl0ZW1SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBncm91cFJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGdyb3VwVGl0bGVSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBzaGFsbG93VXBkYXRlQ2hlY2s6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZm9yY2VSZWRyYXdGdW5jOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGJvdHRvbVJlc29sdXRpb246IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0b3BSZXNvbHV0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbWluSXRlbUR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyIC8vIGluIG1zXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHJvd0xheWVyczogW10sXHJcbiAgICBncm91cE9mZnNldDogMCxcclxuICAgIGl0ZW1IZWlnaHQ6IDEwLFxyXG4gICAgc25hcE1pbnV0ZXM6IDAuMDEsXHJcbiAgICBjdXJzb3JUaW1lRm9ybWF0OiAnbW06c3M6bXMnLFxyXG4gICAgY29tcG9uZW50SWQ6ICdyOWsxJyxcclxuICAgIHNob3dDdXJzb3JUaW1lOiB0cnVlLFxyXG4gICAgZ3JvdXBSZW5kZXJlcjogRGVmYXVsdEdyb3VwUmVuZGVyZXIsXHJcbiAgICBpdGVtUmVuZGVyZXI6IERlZmF1bHRJdGVtUmVuZGVyZXIsXHJcbiAgICBncm91cFRpdGxlUmVuZGVyZXI6ICgpID0+IDxkaXYgLz4sXHJcbiAgICB0aW1lbGluZU1vZGU6IFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlNFTEVDVCB8IFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLkRSQUcgfCBUaW1lbGluZS5USU1FTElORV9NT0RFUy5SRVNJWkUsXHJcbiAgICBzaGFsbG93VXBkYXRlQ2hlY2s6IGZhbHNlLFxyXG4gICAgZm9yY2VSZWRyYXdGdW5jOiBudWxsLFxyXG4gICAgbWluSXRlbUR1cmF0aW9uOiAxIC8vIGluIG1zXHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGNoYW5nZVR5cGVzID0ge1xyXG4gICAgcmVzaXplU3RhcnQ6ICdyZXNpemVTdGFydCcsXHJcbiAgICByZXNpemVFbmQ6ICdyZXNpemVFbmQnLFxyXG4gICAgZHJhZ0VuZDogJ2RyYWdFbmQnLFxyXG4gICAgZHJhZ1N0YXJ0OiAnZHJhZ1N0YXJ0JyxcclxuICAgIGl0ZW1zU2VsZWN0ZWQ6ICdpdGVtc1NlbGVjdGVkJyxcclxuICAgIHNuYXBwZWRNb3VzZU1vdmU6ICdzbmFwcGVkTW91c2VNb3ZlJ1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBpc0JpdFNldChiaXQsIG1hc2spIHtcclxuICAgIHJldHVybiAoYml0ICYgbWFzaykgPT09IGJpdDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBub19vcCA9ICgpID0+IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zZWxlY3RpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc3RhdGUgPSB7c2VsZWN0aW9uOiBbXSwgY3Vyc29yVGltZTogbnVsbH07XHJcbiAgICB0aGlzLnNldFRpbWVNYXAodGhpcy5wcm9wcy5pdGVtcyk7XHJcblxyXG4gICAgdGhpcy5jZWxsUmVuZGVyZXIgPSB0aGlzLmNlbGxSZW5kZXJlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5yb3dIZWlnaHQgPSB0aGlzLnJvd0hlaWdodC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5zZXRUaW1lTWFwID0gdGhpcy5zZXRUaW1lTWFwLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmdldEl0ZW0gPSB0aGlzLmdldEl0ZW0uYmluZCh0aGlzKTtcclxuICAgIHRoaXMuY2hhbmdlR3JvdXAgPSB0aGlzLmNoYW5nZUdyb3VwLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnNldFNlbGVjdGlvbiA9IHRoaXMuc2V0U2VsZWN0aW9uLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmNsZWFyU2VsZWN0aW9uID0gdGhpcy5jbGVhclNlbGVjdGlvbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoID0gdGhpcy5nZXRUaW1lbGluZVdpZHRoLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLml0ZW1Gcm9tRWxlbWVudCA9IHRoaXMuaXRlbUZyb21FbGVtZW50LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMgPSB0aGlzLnVwZGF0ZURpbWVuc2lvbnMuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZ3JpZF9yZWZfY2FsbGJhY2sgPSB0aGlzLmdyaWRfcmVmX2NhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnNlbGVjdF9yZWZfY2FsbGJhY2sgPSB0aGlzLnNlbGVjdF9yZWZfY2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgIHRoaXMudGhyb3R0bGVkTW91c2VNb3ZlRnVuYyA9IF8udGhyb3R0bGUodGhpcy50aHJvdHRsZWRNb3VzZU1vdmVGdW5jLmJpbmQodGhpcyksIDIwKTtcclxuXHJcbiAgICBjb25zdCBjYW5TZWxlY3QgPSBUaW1lbGluZS5pc0JpdFNldChUaW1lbGluZS5USU1FTElORV9NT0RFUy5TRUxFQ1QsIHRoaXMucHJvcHMudGltZWxpbmVNb2RlKTtcclxuICAgIGNvbnN0IGNhbkRyYWcgPSBUaW1lbGluZS5pc0JpdFNldChUaW1lbGluZS5USU1FTElORV9NT0RFUy5EUkFHLCB0aGlzLnByb3BzLnRpbWVsaW5lTW9kZSk7XHJcbiAgICBjb25zdCBjYW5SZXNpemUgPSBUaW1lbGluZS5pc0JpdFNldChUaW1lbGluZS5USU1FTElORV9NT0RFUy5SRVNJWkUsIHRoaXMucHJvcHMudGltZWxpbmVNb2RlKTtcclxuICAgIHRoaXMuc2V0VXBEcmFnZ2luZyhjYW5TZWxlY3QsIGNhbkRyYWcsIGNhblJlc2l6ZSk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnVwZGF0ZURpbWVuc2lvbnMpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIHRoaXMuc2V0VGltZU1hcChuZXh0UHJvcHMuaXRlbXMsIG5leHRQcm9wcy5zdGFydERhdGUsIG5leHRQcm9wcy5lbmREYXRlKTtcclxuICAgIHRoaXMucmVmcmVzaEdyaWQoKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgaWYgKHRoaXMuX2l0ZW1JbnRlcmFjdGFibGUpIHRoaXMuX2l0ZW1JbnRlcmFjdGFibGUudW5zZXQoKTtcclxuICAgIGlmICh0aGlzLl9zZWxlY3RSZWN0YW5nbGVJbnRlcmFjdGFibGUpIHRoaXMuX3NlbGVjdFJlY3RhbmdsZUludGVyYWN0YWJsZS51bnNldCgpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudXBkYXRlRGltZW5zaW9ucyk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuICAgIGNvbnN0IHt0aW1lbGluZU1vZGUsIHNlbGVjdGVkSXRlbXN9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHNlbGVjdGlvbkNoYW5nZSA9ICFfLmlzRXF1YWwocHJldlByb3BzLnNlbGVjdGVkSXRlbXMsIHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgY29uc3QgdGltZWxpbmVNb2RlQ2hhbmdlID0gIV8uaXNFcXVhbChwcmV2UHJvcHMudGltZWxpbmVNb2RlLCB0aW1lbGluZU1vZGUpO1xyXG5cclxuICAgIGlmICh0aW1lbGluZU1vZGVDaGFuZ2UgfHwgc2VsZWN0aW9uQ2hhbmdlKSB7XHJcbiAgICAgIGNvbnN0IGNhblNlbGVjdCA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlNFTEVDVCwgdGltZWxpbmVNb2RlKTtcclxuICAgICAgY29uc3QgY2FuRHJhZyA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLkRSQUcsIHRpbWVsaW5lTW9kZSk7XHJcbiAgICAgIGNvbnN0IGNhblJlc2l6ZSA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlJFU0laRSwgdGltZWxpbmVNb2RlKTtcclxuICAgICAgdGhpcy5zZXRVcERyYWdnaW5nKGNhblNlbGVjdCwgY2FuRHJhZywgY2FuUmVzaXplKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZURpbWVuc2lvbnMoKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lb3V0KTtcclxuICAgIHRoaXMucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICAgIHRoaXMuX2dyaWQucmVjb21wdXRlR3JpZFNpemUoKTtcclxuICAgIH0sIDEwMCk7XHJcbiAgfVxyXG5cclxuICBzZXRUaW1lTWFwKGl0ZW1zLCBzdGFydERhdGUsIGVuZERhdGUpIHtcclxuICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSB7XHJcbiAgICAgIHN0YXJ0RGF0ZSA9IHRoaXMucHJvcHMuc3RhcnREYXRlO1xyXG4gICAgICBlbmREYXRlID0gdGhpcy5wcm9wcy5lbmREYXRlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pdGVtUm93TWFwID0ge307IC8vIHRpbWVsaW5lIGVsZW1lbnRzIChrZXkpID0+IChyb3dObykuXHJcbiAgICB0aGlzLnJvd0l0ZW1NYXAgPSB7fTsgLy8gKHJvd05vKSA9PiB0aW1lbGluZSBlbGVtZW50c1xyXG4gICAgdGhpcy5yb3dIZWlnaHRDYWNoZSA9IHt9OyAvLyAocm93Tm8pID0+IG1heCBudW1iZXIgb2Ygc3RhY2tlZCBpdGVtc1xyXG4gICAgbGV0IHZpc2libGVJdGVtcyA9IF8uZmlsdGVyKGl0ZW1zLCBpID0+IHtcclxuICAgICAgcmV0dXJuIGkuZW5kID4gc3RhcnREYXRlICYmIGkuc3RhcnQgPCBlbmREYXRlO1xyXG4gICAgfSk7XHJcbiAgICBsZXQgaXRlbVJvd3MgPSBfLmdyb3VwQnkodmlzaWJsZUl0ZW1zLCAncm93Jyk7XHJcblxyXG4gICAgXy5mb3JFYWNoKGl0ZW1Sb3dzLCAodmlzaWJsZUl0ZW1zLCByb3cpID0+IHtcclxuICAgICAgY29uc3Qgcm93SW50ID0gcGFyc2VJbnQocm93KTtcclxuICAgICAgaWYgKHRoaXMucm93SXRlbU1hcFtyb3dJbnRdID09PSB1bmRlZmluZWQpIHRoaXMucm93SXRlbU1hcFtyb3dJbnRdID0gW107XHJcbiAgICAgIF8uZm9yRWFjaCh2aXNpYmxlSXRlbXMsIGl0ZW0gPT4ge1xyXG4gICAgICAgIHRoaXMuaXRlbVJvd01hcFtpdGVtLmtleV0gPSByb3dJbnQ7XHJcbiAgICAgICAgdGhpcy5yb3dJdGVtTWFwW3Jvd0ludF0ucHVzaChpdGVtKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucm93SGVpZ2h0Q2FjaGVbcm93SW50XSA9IGdldE1heE92ZXJsYXBwaW5nSXRlbXModmlzaWJsZUl0ZW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaXRlbUZyb21FbGVtZW50KGUpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaXRlbS1pbmRleCcpO1xyXG4gICAgY29uc3Qgcm93Tm8gPSB0aGlzLml0ZW1Sb3dNYXBbaW5kZXhdO1xyXG4gICAgY29uc3QgaXRlbUluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5yb3dJdGVtTWFwW3Jvd05vXSwgaSA9PiBpLmtleSA9PSBpbmRleCk7XHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5yb3dJdGVtTWFwW3Jvd05vXVtpdGVtSW5kZXhdO1xyXG4gICAgcmV0dXJuIHtpbmRleCwgcm93Tm8sIGl0ZW1JbmRleCwgaXRlbX07XHJcbiAgfVxyXG5cclxuICBnZXRJdGVtKGlkKSB7XHJcbiAgICAvLyBUaGlzIGlzIHF1aXRlIHN0dXBpZCBhbmQgc2hvdWxkbid0IHJlYWxseSBiZSBuZWVkZWRcclxuICAgIGNvbnN0IHJvd05vID0gdGhpcy5pdGVtUm93TWFwW2lkXTtcclxuICAgIGNvbnN0IGl0ZW1JbmRleCA9IF8uZmluZEluZGV4KHRoaXMucm93SXRlbU1hcFtyb3dOb10sIGkgPT4gaS5rZXkgPT0gaWQpO1xyXG4gICAgcmV0dXJuIHRoaXMucm93SXRlbU1hcFtyb3dOb11baXRlbUluZGV4XTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUdyb3VwKGl0ZW0sIGN1clJvdywgbmV3Um93KSB7XHJcbiAgICBpdGVtLnJvdyA9IG5ld1JvdztcclxuICAgIHRoaXMuaXRlbVJvd01hcFtpdGVtLmtleV0gPSBuZXdSb3c7XHJcbiAgICB0aGlzLnJvd0l0ZW1NYXBbY3VyUm93XSA9IHRoaXMucm93SXRlbU1hcFtjdXJSb3ddLmZpbHRlcihpID0+IGkua2V5ICE9PSBpdGVtLmtleSk7XHJcbiAgICB0aGlzLnJvd0l0ZW1NYXBbbmV3Um93XS5wdXNoKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbnMpIHtcclxuICAgIGxldCBuZXdTZWxlY3Rpb24gPSBfLm1hcChzZWxlY3Rpb25zLCBzID0+IHtcclxuICAgICAgcmV0dXJuIHtzdGFydDogc1swXS5jbG9uZSgpLCBlbmQ6IHNbMV0uY2xvbmUoKX07XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGlvbjogbmV3U2VsZWN0aW9ufSk7XHJcbiAgfVxyXG5cclxuICBjbGVhclNlbGVjdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGlvbjogW119KTtcclxuICB9XHJcblxyXG4gIGdldFRpbWVsaW5lV2lkdGgodG90YWxXaWR0aCkge1xyXG4gICAgY29uc3Qge2dyb3VwT2Zmc2V0fSA9IHRoaXMucHJvcHM7XHJcbiAgICBpZiAodG90YWxXaWR0aCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gdG90YWxXaWR0aCAtIGdyb3VwT2Zmc2V0O1xyXG4gICAgcmV0dXJuIHRoaXMuX2dyaWQucHJvcHMud2lkdGggLSBncm91cE9mZnNldDtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hHcmlkID0gKGNvbmZpZyA9IHt9KSA9PiB7XHJcbiAgICB0aGlzLl9ncmlkLnJlY29tcHV0ZUdyaWRTaXplKGNvbmZpZyk7XHJcbiAgfTtcclxuXHJcbiAgc2V0VXBEcmFnZ2luZyhjYW5TZWxlY3QsIGNhbkRyYWcpIHtcclxuICAgIGNvbnN0IHRvcERpdkNsYXNzSWQgPSBgcmN0OWstaWQtJHt0aGlzLnByb3BzLmNvbXBvbmVudElkfWA7XHJcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1TZWxlY3RvciA9ICcucmN0OWstaXRlbXMtb3V0ZXItc2VsZWN0ZWQnO1xyXG4gICAgaWYgKHRoaXMuX2l0ZW1JbnRlcmFjdGFibGUpIHRoaXMuX2l0ZW1JbnRlcmFjdGFibGUudW5zZXQoKTtcclxuICAgIGlmICh0aGlzLl9zZWxlY3RSZWN0YW5nbGVJbnRlcmFjdGFibGUpIHRoaXMuX3NlbGVjdFJlY3RhbmdsZUludGVyYWN0YWJsZS51bnNldCgpO1xyXG5cclxuICAgIHRoaXMuX2l0ZW1JbnRlcmFjdGFibGUgPSBpbnRlcmFjdChgLiR7dG9wRGl2Q2xhc3NJZH0gLml0ZW1fZHJhZ2dhYmxlYCk7XHJcbiAgICB0aGlzLl9zZWxlY3RSZWN0YW5nbGVJbnRlcmFjdGFibGUgPSBpbnRlcmFjdChgLiR7dG9wRGl2Q2xhc3NJZH0gLnBhcmVudC1kaXZgKTtcclxuXHJcbiAgICB0aGlzLl9pdGVtSW50ZXJhY3RhYmxlLm9uKCd0YXAnLCBlID0+IHtcclxuICAgICAgdGhpcy5faGFuZGxlSXRlbVJvd0V2ZW50KGUsIHRoaXMucHJvcHMub25JdGVtQ2xpY2ssIHRoaXMucHJvcHMub25Sb3dDbGljayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY2FuRHJhZykge1xyXG4gICAgICB0aGlzLl9pdGVtSW50ZXJhY3RhYmxlXHJcbiAgICAgICAgLmRyYWdnYWJsZSh7XHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgYWxsb3dGcm9tOiBzZWxlY3RlZEl0ZW1TZWxlY3RvcixcclxuICAgICAgICAgIHJlc3RyaWN0OiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0aW9uOiBgLiR7dG9wRGl2Q2xhc3NJZH1gLFxyXG4gICAgICAgICAgICBlbGVtZW50UmVjdDoge2xlZnQ6IDAsIHJpZ2h0OiAxLCB0b3A6IDAsIGJvdHRvbTogMX1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignZHJhZ3N0YXJ0JywgZSA9PiB7XHJcbiAgICAgICAgICBsZXQgc2VsZWN0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgY29uc3QgYW5pbWF0ZWRJdGVtcyA9IHRoaXMucHJvcHMub25JbnRlcmFjdGlvbihcclxuICAgICAgICAgICAgVGltZWxpbmUuY2hhbmdlVHlwZXMuZHJhZ1N0YXJ0LFxyXG4gICAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXNcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgXy5mb3JFYWNoKGFuaW1hdGVkSXRlbXMsIGlkID0+IHtcclxuICAgICAgICAgICAgbGV0IGRvbUl0ZW0gPSB0aGlzLl9ncmlkRG9tTm9kZS5xdWVyeVNlbGVjdG9yKFwic3BhbltkYXRhLWl0ZW0taW5kZXg9J1wiICsgaWQgKyBcIidcIik7XHJcbiAgICAgICAgICAgIGlmIChkb21JdGVtKSB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0aW9ucy5wdXNoKFt0aGlzLmdldEl0ZW0oaWQpLnN0YXJ0LCB0aGlzLmdldEl0ZW0oaWQpLmVuZF0pO1xyXG4gICAgICAgICAgICAgIGRvbUl0ZW0uc2V0QXR0cmlidXRlKCdpc0RyYWdnaW5nJywgJ1RydWUnKTtcclxuICAgICAgICAgICAgICBkb21JdGVtLnNldEF0dHJpYnV0ZSgnZHJhZy14JywgMCk7XHJcbiAgICAgICAgICAgICAgZG9tSXRlbS5zZXRBdHRyaWJ1dGUoJ2RyYWcteScsIDApO1xyXG4gICAgICAgICAgICAgIGRvbUl0ZW0uc3R5bGVbJ3otaW5kZXgnXSA9IDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb24oc2VsZWN0aW9ucyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2RyYWdtb3ZlJywgZSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgICAgIGxldCBhbmltYXRlZEl0ZW1zID0gdGhpcy5fZ3JpZERvbU5vZGUucXVlcnlTZWxlY3RvckFsbChcInNwYW5baXNEcmFnZ2luZz0nVHJ1ZSdcIikgfHwgW107XHJcblxyXG4gICAgICAgICAgbGV0IGR4ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZHJhZy14JykpIHx8IDApICsgZS5keDtcclxuICAgICAgICAgIGxldCBzZWxlY3Rpb25zID0gW107XHJcblxyXG4gICAgICAgICAgLy8gU25hcCB0aGUgbW92ZW1lbnQgdG8gdGhlIGN1cnJlbnQgc25hcCBpbnRlcnZhbFxyXG4gICAgICAgICAgY29uc3Qgc25hcER4ID0gZ2V0U25hcFBpeGVsRnJvbURlbHRhKFxyXG4gICAgICAgICAgICBkeCxcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcclxuICAgICAgICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKCksXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc25hcE1pbnV0ZXNcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgXy5mb3JFYWNoKGFuaW1hdGVkSXRlbXMsIGRvbUl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB7aXRlbX0gPSB0aGlzLml0ZW1Gcm9tRWxlbWVudChkb21JdGVtKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW1EdXJhdGlvbiA9IGl0ZW0uZW5kLmRpZmYoaXRlbS5zdGFydCwgJ21zJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3UGl4ZWxPZmZzZXQgPSAocGl4VG9JbnQoZG9tSXRlbS5zdHlsZS5sZWZ0KSArIHNuYXBEeCkudG9GaXhlZCgzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdTdGFydCA9IGdldFRpbWVBdFBpeGVsKFxyXG4gICAgICAgICAgICAgIG5ld1BpeGVsT2Zmc2V0LFxyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcclxuICAgICAgICAgICAgICB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKSxcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNuYXBNaW51dGVzXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3RW5kID0gbmV3U3RhcnQuY2xvbmUoKS5hZGQoaXRlbUR1cmF0aW9uLCAnbXMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdTdGFydC5kaWZmKHRoaXMucHJvcHMuc3RhcnREYXRlKSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgbmV3U3RhcnQgPSB0aGlzLnByb3BzLnN0YXJ0RGF0ZTtcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNldFN0YXJ0RGF0ZVdpdGhab29tKHRoaXMucHJvcHMuc3RhcnREYXRlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNldFN0YXJ0RGF0ZVdpdGhab29tKG5ld1N0YXJ0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuZW5kRGF0ZS5kaWZmKG5ld0VuZCkgPD0gMCkge1xyXG4gICAgICAgICAgICAgIG5ld0VuZCA9IHRoaXMucHJvcHMuZW5kRGF0ZTtcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNldEVuZERhdGVXaXRoWm9vbSh0aGlzLnByb3BzLmVuZERhdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2V0RW5kRGF0ZVdpdGhab29tKG5ld0VuZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbnMucHVzaChbbmV3U3RhcnQsIG5ld0VuZF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVHJhbnNsYXRlIHRoZSBuZXcgc3RhcnQgdGltZSBiYWNrIHRvIHBpeGVscywgc28gd2UgY2FuIGFuaW1hdGUgdGhlIHNuYXBcclxuICAgICAgICAgICAgZG9tSXRlbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBkb21JdGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNuYXBEeCArICdweCwgJyArIDAgKyAncHgpJztcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RyYWcteCcsIGR4KTtcclxuXHJcbiAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbihzZWxlY3Rpb25zKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignZHJhZ2VuZCcsIGUgPT4ge1xyXG4gICAgICAgICAgY29uc3Qge2l0ZW0sIHJvd05vfSA9IHRoaXMuaXRlbUZyb21FbGVtZW50KGUudGFyZ2V0KTtcclxuICAgICAgICAgIGxldCBhbmltYXRlZEl0ZW1zID0gdGhpcy5fZ3JpZERvbU5vZGUucXVlcnlTZWxlY3RvckFsbChcInNwYW5baXNEcmFnZ2luZz0nVHJ1ZSdcIikgfHwgW107XHJcblxyXG4gICAgICAgICAgbGV0IGFuaW1hdGVkSXRlbXNLZXlzID0gW107XHJcbiAgICAgICAgICBfLmZvckVhY2goYW5pbWF0ZWRJdGVtcywgZG9tSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGFuaW1hdGVkSXRlbXNLZXlzLnB1c2godGhpcy5pdGVtRnJvbUVsZW1lbnQoZG9tSXRlbSkuaXRlbS5rZXkpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb24oW1tpdGVtLnN0YXJ0LCBpdGVtLmVuZF1dKTtcclxuICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAvLyBDaGFuZ2Ugcm93XHJcbiAgICAgICAgICBsZXQgbmV3Um93ID0gZ2V0TmVhcmVzdFJvd051bWJlcihlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcblxyXG4gICAgICAgICAgbGV0IHJvd0NoYW5nZURlbHRhID0gbmV3Um93IC0gcm93Tm87XHJcblxyXG4gICAgICAgICAgLy8gVXBkYXRlIHRpbWVcclxuICAgICAgICAgIGxldCBuZXdQaXhlbE9mZnNldCA9IChcclxuICAgICAgICAgICAgcGl4VG9JbnQoZS50YXJnZXQuc3R5bGUubGVmdCkgKyAocGFyc2VGbG9hdChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RyYWcteCcpKSB8fCAwKVxyXG4gICAgICAgICAgKS50b0ZpeGVkKDMpO1xyXG5cclxuICAgICAgICAgIGxldCBuZXdTdGFydCA9IGdldFRpbWVBdFBpeGVsKFxyXG4gICAgICAgICAgICBuZXdQaXhlbE9mZnNldCxcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcclxuICAgICAgICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKCksXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc25hcE1pbnV0ZXNcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgY29uc3QgdGltZURlbHRhID0gbmV3U3RhcnQuY2xvbmUoKS5kaWZmKGl0ZW0uc3RhcnQsICdtcycpO1xyXG4gICAgICAgICAgY29uc3QgY2hhbmdlcyA9IHtyb3dDaGFuZ2VEZWx0YSwgdGltZURlbHRhfTtcclxuICAgICAgICAgIGxldCBpdGVtcyA9IFtdO1xyXG5cclxuICAgICAgICAgIF8uZm9yRWFjaChhbmltYXRlZEl0ZW1zLCBkb21JdGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3Qge2l0ZW19ID0gdGhpcy5pdGVtRnJvbUVsZW1lbnQoZG9tSXRlbSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtRHVyYXRpb24gPSBpdGVtLmVuZC5kaWZmKGl0ZW0uc3RhcnQpO1xyXG4gICAgICAgICAgICBsZXQgbmV3U3RhcnQgPSBpdGVtLnN0YXJ0LmNsb25lKCkuYWRkKHRpbWVEZWx0YSwgJ21zJyk7XHJcbiAgICAgICAgICAgIGxldCBuZXdFbmQgPSBuZXdTdGFydC5jbG9uZSgpLmFkZChpdGVtRHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmV3U3RhcnRJbk1zID0gbmV3U3RhcnQuY2xvbmUoKS5kaWZmKDAsICdtcycpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdFbmRJbk1zID0gbmV3RW5kLmNsb25lKCkuZGlmZigwLCAnbXMnKTtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudEl0ZW1OZXdSb3cgPSBpdGVtLnJvdyArIHJvd0NoYW5nZURlbHRhO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXRlbXNPbk5ld1JvdyA9IHRoaXMucHJvcHMuaXRlbXMuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5yb3cgPT09IGN1cnJlbnRJdGVtTmV3Um93KTtcclxuICAgICAgICAgICAgaXRlbXNPbk5ld1Jvdy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpdGVtQWJvdmVFbGVtZW50ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVja2luZyB3aGV0aGVyIHRoZSBkcmFnZ2VkIGl0ZW0gaXMgYWJvdmUgb3RoZXIgaXRlbXMuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXNPbk5ld1Jvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBpdGVtc09uTmV3Um93W2ldO1xyXG4gICAgICAgICAgICAgIGlmIChhbmltYXRlZEl0ZW1zS2V5cy5zb21lKGtleSA9PiBrZXkgPT09IGVsZW1lbnQua2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRTdGFydEluTXMgPSBlbGVtZW50LnN0YXJ0LmNsb25lKCkuZGlmZigwLCAnbXMnKTtcclxuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50RW5kSW5NcyA9IGVsZW1lbnQuZW5kLmNsb25lKCkuZGlmZigwLCAnbXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKG5ld1N0YXJ0SW5NcyA+IGVsZW1lbnRTdGFydEluTXMgJiYgbmV3U3RhcnRJbk1zIDwgZWxlbWVudEVuZEluTXMpIHx8XHJcbiAgICAgICAgICAgICAgICAobmV3RW5kSW5NcyA+IGVsZW1lbnRTdGFydEluTXMgJiYgbmV3RW5kSW5NcyA8IGVsZW1lbnRFbmRJbk1zKVxyXG4gICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgaXRlbUFib3ZlRWxlbWVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGl0ZW0uc3RhcnQgPSBuZXdTdGFydDtcclxuICAgICAgICAgICAgaXRlbS5lbmQgPSBuZXdFbmQ7XHJcblxyXG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkludGVyYWN0aW9uKFRpbWVsaW5lLmNoYW5nZVR5cGVzLmRyYWdFbmQsIGNoYW5nZXMsIGl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAvLyBSZXNldCB0aGUgc3R5bGVzXHJcbiAgICAgICAgICBhbmltYXRlZEl0ZW1zLmZvckVhY2goZG9tSXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGRvbUl0ZW0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZG9tSXRlbS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDBweCwgMHB4KSc7XHJcbiAgICAgICAgICAgIGRvbUl0ZW0uc2V0QXR0cmlidXRlKCdkcmFnLXgnLCAwKTtcclxuICAgICAgICAgICAgZG9tSXRlbS5zZXRBdHRyaWJ1dGUoJ2RyYWcteScsIDApO1xyXG4gICAgICAgICAgICBkb21JdGVtLnN0eWxlWyd6LWluZGV4J10gPSAzO1xyXG4gICAgICAgICAgICBkb21JdGVtLnN0eWxlWyd0b3AnXSA9IGludFRvUGl4KFxyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuaXRlbUhlaWdodCAqIE1hdGgucm91bmQocGl4VG9JbnQoZG9tSXRlbS5zdHlsZVsndG9wJ10pIC8gdGhpcy5wcm9wcy5pdGVtSGVpZ2h0KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBkb21JdGVtLnJlbW92ZUF0dHJpYnV0ZSgnaXNEcmFnZ2luZycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5fZ3JpZC5yZWNvbXB1dGVHcmlkU2l6ZSh7cm93SW5kZXg6IDB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9oYW5kbGVJdGVtUm93RXZlbnQgPSAoZSwgaXRlbUNhbGxiYWNrLCByb3dDYWxsYmFjaykgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy8gU2tpcCBjbGljayBoYW5kbGVyIGlmIHNlbGVjdGluZyB3aXRoIHNlbGVjdGlvbiBib3hcclxuICAgIGlmICh0aGlzLnNlbGVjdGluZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWl0ZW0taW5kZXgnKSB8fCBlLnRhcmdldC5wYXJlbnRFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1pdGVtLWluZGV4JykpIHtcclxuICAgICAgbGV0IGl0ZW1LZXkgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaXRlbS1pbmRleCcpIHx8IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWl0ZW0taW5kZXgnKTtcclxuICAgICAgaXRlbUNhbGxiYWNrICYmIGl0ZW1DYWxsYmFjayhlLCBOdW1iZXIoaXRlbUtleSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHJvdyA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3ctaW5kZXgnKTtcclxuICAgICAgbGV0IGNsaWNrZWRUaW1lID0gZ2V0VGltZUF0UGl4ZWwoXHJcbiAgICAgICAgZS5jbGllbnRYIC0gdGhpcy5wcm9wcy5ncm91cE9mZnNldCxcclxuICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcclxuICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXHJcbiAgICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKClcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vY29uc3Qgcm91bmRlZFN0YXJ0TWludXRlcyA9IE1hdGgucm91bmQoY2xpY2tlZFRpbWUubWludXRlKCkgLyB0aGlzLnByb3BzLnNuYXBNaW51dGVzKSAqIHRoaXMucHJvcHMuc25hcE1pbnV0ZXM7IC8vIEkgZG9udCBrbm93IHdoYXQgdGhpcyBkb2VzXHJcbiAgICAgIGxldCBzbmFwcGVkQ2xpY2tlZFRpbWUgPSB0aW1lU25hcChjbGlja2VkVGltZSwgdGhpcy5wcm9wcy5zbmFwTWludXRlcyk7XHJcbiAgICAgIHJvd0NhbGxiYWNrICYmIHJvd0NhbGxiYWNrKGUsIHJvdywgY2xpY2tlZFRpbWUsIHNuYXBwZWRDbGlja2VkVGltZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY2VsbFJlbmRlcmVyKHdpZHRoKSB7XHJcbiAgICBjb25zdCB7dGltZWxpbmVNb2RlLCByb3dMYXllcnN9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGNhblNlbGVjdCA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlNFTEVDVCwgdGltZWxpbmVNb2RlKTtcclxuICAgIHJldHVybiAoe2NvbHVtbkluZGV4LCBrZXksIHBhcmVudCwgcm93SW5kZXgsIHN0eWxlfSkgPT4ge1xyXG4gICAgICBsZXQgaXRlbUNvbCA9IDE7XHJcbiAgICAgIGlmIChpdGVtQ29sID09IGNvbHVtbkluZGV4KSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zSW5Sb3cgPSB0aGlzLnJvd0l0ZW1NYXBbcm93SW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGxheWVyc0luUm93ID0gcm93TGF5ZXJzLmZpbHRlcihyID0+IHIucm93TnVtYmVyID09PSByb3dJbmRleCk7XHJcbiAgICAgICAgbGV0IHJvd0hlaWdodCA9IHRoaXMucHJvcHMuaXRlbUhlaWdodDtcclxuICAgICAgICBpZiAodGhpcy5yb3dIZWlnaHRDYWNoZVtyb3dJbmRleF0pIHtcclxuICAgICAgICAgIHJvd0hlaWdodCA9IHJvd0hlaWdodCAqIHRoaXMucm93SGVpZ2h0Q2FjaGVbcm93SW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBrZXk9e2tleX1cclxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgICAgICBkYXRhLXJvdy1pbmRleD17cm93SW5kZXh9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJjdDlrLXJvd1wiXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4gdGhpcy5faGFuZGxlSXRlbVJvd0V2ZW50KGUsIFRpbWVsaW5lLm5vX29wLCB0aGlzLnByb3BzLm9uUm93Q2xpY2spfT5cclxuICAgICAgICAgICAge3Jvd0l0ZW1zUmVuZGVyZXIoXHJcbiAgICAgICAgICAgICAgaXRlbXNJblJvdyxcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXHJcbiAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5pdGVtSGVpZ2h0LFxyXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuaXRlbVJlbmRlcmVyLFxyXG4gICAgICAgICAgICAgIGNhblNlbGVjdCA/IHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcyA6IFtdLFxyXG4gICAgICAgICAgICAgIHRydWVcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge3Jvd0xheWVyUmVuZGVyZXIobGF5ZXJzSW5Sb3csIHRoaXMucHJvcHMuc3RhcnREYXRlLCB0aGlzLnByb3BzLmVuZERhdGUsIHdpZHRoLCByb3dIZWlnaHQpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJvd0hlaWdodCgpIHtcclxuICAgIGNvbnN0IHJoID0gMTtcclxuICAgIHJldHVybiByaCAqIHRoaXMucHJvcHMuaXRlbUhlaWdodDtcclxuICB9XHJcblxyXG4gIGdyaWRfcmVmX2NhbGxiYWNrKHJlYWN0Q29tcG9uZW50KSB7XHJcbiAgICB0aGlzLl9ncmlkID0gcmVhY3RDb21wb25lbnQ7XHJcbiAgICB0aGlzLl9ncmlkRG9tTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMuX2dyaWQpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0X3JlZl9jYWxsYmFjayhyZWFjdENvbXBvbmVudCkge1xyXG4gICAgdGhpcy5fc2VsZWN0Qm94ID0gcmVhY3RDb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICB0aHJvdHRsZWRNb3VzZU1vdmVGdW5jKGUpIHtcclxuICAgIGNvbnN0IHtjb21wb25lbnRJZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgbGVmdE9mZnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5yY3Q5ay1pZC0ke2NvbXBvbmVudElkfSAucGFyZW50LWRpdmApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICBjb25zdCBjdXJzb3JTbmFwcGVkVGltZSA9IGdldFRpbWVBdFBpeGVsKFxyXG4gICAgICBlLmNsaWVudFggLSB0aGlzLnByb3BzLmdyb3VwT2Zmc2V0IC0gbGVmdE9mZnNldCxcclxuICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXHJcbiAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcclxuICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKCksXHJcbiAgICAgIHRoaXMucHJvcHMuc25hcE1pbnV0ZXNcclxuICAgICk7XHJcbiAgICBpZiAoIXRoaXMubW91c2Vfc25hcHBlZF90aW1lIHx8IHRoaXMubW91c2Vfc25hcHBlZF90aW1lLnVuaXgoKSAhPT0gY3Vyc29yU25hcHBlZFRpbWUudW5peCgpKSB7XHJcbiAgICAgIGlmIChjdXJzb3JTbmFwcGVkVGltZS5pc1NhbWVPckFmdGVyKHRoaXMucHJvcHMuc3RhcnREYXRlKSkge1xyXG4gICAgICAgIHRoaXMubW91c2Vfc25hcHBlZF90aW1lID0gY3Vyc29yU25hcHBlZFRpbWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3Vyc29yVGltZTogdGhpcy5tb3VzZV9zbmFwcGVkX3RpbWV9KTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uSW50ZXJhY3Rpb24oXHJcbiAgICAgICAgICBUaW1lbGluZS5jaGFuZ2VUeXBlcy5zbmFwcGVkTW91c2VNb3ZlLFxyXG4gICAgICAgICAge3NuYXBwZWRUaW1lOiB0aGlzLm1vdXNlX3NuYXBwZWRfdGltZS5jbG9uZSgpfSxcclxuICAgICAgICAgIG51bGxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHRpbWViYXJGb3JtYXQsXHJcbiAgICAgIGNvbXBvbmVudElkLFxyXG4gICAgICBzaGFsbG93VXBkYXRlQ2hlY2ssXHJcbiAgICAgIGZvcmNlUmVkcmF3RnVuYyxcclxuICAgICAgYm90dG9tUmVzb2x1dGlvbixcclxuICAgICAgdG9wUmVzb2x1dGlvblxyXG4gICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgY29uc3QgZGl2Q3NzQ2xhc3MgPSBgcmN0OWstdGltZWxpbmUtZGl2IHJjdDlrLXRpbWVsaW5lLXNjcm9sbCByY3Q5ay1pZC0ke2NvbXBvbmVudElkfWA7XHJcbiAgICBsZXQgdmFyVGltZWJhclByb3BzID0ge307XHJcbiAgICBpZiAodGltZWJhckZvcm1hdCkgdmFyVGltZWJhclByb3BzWyd0aW1lRm9ybWF0cyddID0gdGltZWJhckZvcm1hdDtcclxuICAgIGlmIChib3R0b21SZXNvbHV0aW9uKSB2YXJUaW1lYmFyUHJvcHNbJ2JvdHRvbV9yZXNvbHV0aW9uJ10gPSBib3R0b21SZXNvbHV0aW9uO1xyXG4gICAgaWYgKHRvcFJlc29sdXRpb24pIHZhclRpbWViYXJQcm9wc1sndG9wX3Jlc29sdXRpb24nXSA9IHRvcFJlc29sdXRpb247XHJcblxyXG4gICAgZnVuY3Rpb24gY29sdW1uV2lkdGgod2lkdGgpIHtcclxuICAgICAgcmV0dXJuICh7aW5kZXh9KSA9PiB7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlSGVpZ2h0KGhlaWdodCkge1xyXG4gICAgICAvLyB3aGVuIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGZvciB0aGUgZmlyc3QgdGltZSwgdGhlIHRpbWViYXIgaXMgbm90IHlldCByZW5kZXJlZFxyXG4gICAgICBsZXQgdGltZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5yY3Q5ay1pZC0ke2NvbXBvbmVudElkfSAucmN0OWstdGltZWJhcmApO1xyXG4gICAgICBpZiAoIXRpbWViYXIpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgICAgfVxyXG4gICAgICAvLyBzdWJzdHJhY3QgdGltZWJhciBoZWlnaHQgZnJvbSB0b3RhbCBoZWlnaHRcclxuICAgICAgY29uc3QgdGltZWJhckhlaWdodCA9IHRpbWViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG4gICAgICByZXR1cm4gTWF0aC5tYXgoaGVpZ2h0IC0gdGltZWJhckhlaWdodCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEZyYWdtZW50PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtkaXZDc3NDbGFzc30+XHJcbiAgICAgICAgICA8QXV0b1NpemVyIGNsYXNzTmFtZT1cInJjdDlrLWF1dG9zaXplclwiIG9uUmVzaXplPXt0aGlzLnJlZnJlc2hHcmlkfT5cclxuICAgICAgICAgICAgeyh7d2lkdGh9KSA9PiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXJlbnQtZGl2XCI+XHJcbiAgICAgICAgICAgICAgICA8U2VsZWN0Qm94IHJlZj17dGhpcy5zZWxlY3RfcmVmX2NhbGxiYWNrfSAvPlxyXG4gICAgICAgICAgICAgICAgPFRpbWViYXIgc3RhcnQ9e3RoaXMucHJvcHMuc3RhcnREYXRlfSBlbmQ9e3RoaXMucHJvcHMuZW5kRGF0ZX0gd2lkdGg9e3dpZHRofSB7Li4udmFyVGltZWJhclByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgPFRpbWVsaW5lQm9keVxyXG4gICAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XHJcbiAgICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoPXtjb2x1bW5XaWR0aCh3aWR0aCl9XHJcbiAgICAgICAgICAgICAgICAgIGhlaWdodD17Y2FsY3VsYXRlSGVpZ2h0KHRoaXMucHJvcHMuaXRlbUhlaWdodCl9XHJcbiAgICAgICAgICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5yb3dIZWlnaHR9XHJcbiAgICAgICAgICAgICAgICAgIHJvd0NvdW50PXt0aGlzLnByb3BzLmdyb3Vwcy5sZW5ndGh9XHJcbiAgICAgICAgICAgICAgICAgIGNlbGxSZW5kZXJlcj17dGhpcy5jZWxsUmVuZGVyZXIodGhpcy5nZXRUaW1lbGluZVdpZHRoKHdpZHRoKSl9XHJcbiAgICAgICAgICAgICAgICAgIGdyaWRfcmVmX2NhbGxiYWNrPXt0aGlzLmdyaWRfcmVmX2NhbGxiYWNrfVxyXG4gICAgICAgICAgICAgICAgICBzaGFsbG93VXBkYXRlQ2hlY2s9e3NoYWxsb3dVcGRhdGVDaGVja31cclxuICAgICAgICAgICAgICAgICAgZm9yY2VSZWRyYXdGdW5jPXtmb3JjZVJlZHJhd0Z1bmN9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9BdXRvU2l6ZXI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvRnJhZ21lbnQ+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=