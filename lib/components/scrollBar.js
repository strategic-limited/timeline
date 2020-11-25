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
            className: "rct9k-row rct9k-row-scroll",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Njcm9sbEJhci5qcyJdLCJuYW1lcyI6WyJUaW1lbGluZSIsImJpdCIsIm1hc2siLCJwcm9wcyIsImNvbmZpZyIsIl9ncmlkIiwicmVjb21wdXRlR3JpZFNpemUiLCJlIiwiaXRlbUNhbGxiYWNrIiwicm93Q2FsbGJhY2siLCJwcmV2ZW50RGVmYXVsdCIsInNlbGVjdGluZyIsInRhcmdldCIsImhhc0F0dHJpYnV0ZSIsInBhcmVudEVsZW1lbnQiLCJpdGVtS2V5IiwiZ2V0QXR0cmlidXRlIiwiTnVtYmVyIiwicm93IiwiY2xpY2tlZFRpbWUiLCJjbGllbnRYIiwiZ3JvdXBPZmZzZXQiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiZ2V0VGltZWxpbmVXaWR0aCIsInNuYXBwZWRDbGlja2VkVGltZSIsInNuYXBNaW51dGVzIiwic3RhdGUiLCJzZWxlY3Rpb24iLCJjdXJzb3JUaW1lIiwic2V0VGltZU1hcCIsIml0ZW1zIiwiY2VsbFJlbmRlcmVyIiwiYmluZCIsInJvd0hlaWdodCIsImdldEl0ZW0iLCJjaGFuZ2VHcm91cCIsInNldFNlbGVjdGlvbiIsImNsZWFyU2VsZWN0aW9uIiwiaXRlbUZyb21FbGVtZW50IiwidXBkYXRlRGltZW5zaW9ucyIsImdyaWRfcmVmX2NhbGxiYWNrIiwic2VsZWN0X3JlZl9jYWxsYmFjayIsInRocm90dGxlZE1vdXNlTW92ZUZ1bmMiLCJfIiwidGhyb3R0bGUiLCJjYW5TZWxlY3QiLCJpc0JpdFNldCIsIlRJTUVMSU5FX01PREVTIiwiU0VMRUNUIiwidGltZWxpbmVNb2RlIiwiY2FuRHJhZyIsIkRSQUciLCJjYW5SZXNpemUiLCJSRVNJWkUiLCJzZXRVcERyYWdnaW5nIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm5leHRQcm9wcyIsInJlZnJlc2hHcmlkIiwiX2l0ZW1JbnRlcmFjdGFibGUiLCJ1bnNldCIsIl9zZWxlY3RSZWN0YW5nbGVJbnRlcmFjdGFibGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwic2VsZWN0ZWRJdGVtcyIsInNlbGVjdGlvbkNoYW5nZSIsImlzRXF1YWwiLCJ0aW1lbGluZU1vZGVDaGFuZ2UiLCJjbGVhclRpbWVvdXQiLCJyZXNpemVUaW1lb3V0Iiwic2V0VGltZW91dCIsImZvcmNlVXBkYXRlIiwiaXRlbVJvd01hcCIsInJvd0l0ZW1NYXAiLCJyb3dIZWlnaHRDYWNoZSIsInZpc2libGVJdGVtcyIsImZpbHRlciIsImkiLCJlbmQiLCJzdGFydCIsIml0ZW1Sb3dzIiwiZ3JvdXBCeSIsImZvckVhY2giLCJyb3dJbnQiLCJwYXJzZUludCIsInVuZGVmaW5lZCIsIml0ZW0iLCJrZXkiLCJwdXNoIiwiaW5kZXgiLCJyb3dObyIsIml0ZW1JbmRleCIsImZpbmRJbmRleCIsImlkIiwiY3VyUm93IiwibmV3Um93Iiwic2VsZWN0aW9ucyIsIm5ld1NlbGVjdGlvbiIsIm1hcCIsInMiLCJjbG9uZSIsInNldFN0YXRlIiwidG90YWxXaWR0aCIsIndpZHRoIiwidG9wRGl2Q2xhc3NJZCIsImNvbXBvbmVudElkIiwic2VsZWN0ZWRJdGVtU2VsZWN0b3IiLCJvbiIsIl9oYW5kbGVJdGVtUm93RXZlbnQiLCJvbkl0ZW1DbGljayIsIm9uUm93Q2xpY2siLCJkcmFnZ2FibGUiLCJlbmFibGVkIiwiYWxsb3dGcm9tIiwicmVzdHJpY3QiLCJyZXN0cmljdGlvbiIsImVsZW1lbnRSZWN0IiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiYW5pbWF0ZWRJdGVtcyIsIm9uSW50ZXJhY3Rpb24iLCJjaGFuZ2VUeXBlcyIsImRyYWdTdGFydCIsImRvbUl0ZW0iLCJfZ3JpZERvbU5vZGUiLCJxdWVyeVNlbGVjdG9yIiwic2V0QXR0cmlidXRlIiwic3R5bGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZHgiLCJwYXJzZUZsb2F0Iiwic25hcER4IiwiaXRlbUR1cmF0aW9uIiwiZGlmZiIsIm5ld1BpeGVsT2Zmc2V0IiwidG9GaXhlZCIsIm5ld1N0YXJ0IiwibmV3RW5kIiwiYWRkIiwic2V0U3RhcnREYXRlV2l0aFpvb20iLCJzZXRFbmREYXRlV2l0aFpvb20iLCJ3ZWJraXRUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm0iLCJhbmltYXRlZEl0ZW1zS2V5cyIsImNsaWVudFkiLCJyb3dDaGFuZ2VEZWx0YSIsInRpbWVEZWx0YSIsImNoYW5nZXMiLCJuZXdTdGFydEluTXMiLCJuZXdFbmRJbk1zIiwiY3VycmVudEl0ZW1OZXdSb3ciLCJpdGVtc09uTmV3Um93IiwiZWxlbWVudCIsInNvcnQiLCJhIiwiYiIsIml0ZW1BYm92ZUVsZW1lbnQiLCJzb21lIiwiZWxlbWVudFN0YXJ0SW5NcyIsImVsZW1lbnRFbmRJbk1zIiwibGVuZ3RoIiwiZHJhZ0VuZCIsIml0ZW1IZWlnaHQiLCJNYXRoIiwicm91bmQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyb3dJbmRleCIsInJvd0xheWVycyIsImNvbHVtbkluZGV4IiwicGFyZW50IiwiaXRlbUNvbCIsIml0ZW1zSW5Sb3ciLCJsYXllcnNJblJvdyIsInIiLCJyb3dOdW1iZXIiLCJub19vcCIsIml0ZW1SZW5kZXJlciIsInJoIiwicmVhY3RDb21wb25lbnQiLCJSZWFjdERPTSIsImZpbmRET01Ob2RlIiwiX3NlbGVjdEJveCIsImxlZnRPZmZzZXQiLCJkb2N1bWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImN1cnNvclNuYXBwZWRUaW1lIiwibW91c2Vfc25hcHBlZF90aW1lIiwidW5peCIsImlzU2FtZU9yQWZ0ZXIiLCJzbmFwcGVkTW91c2VNb3ZlIiwic25hcHBlZFRpbWUiLCJ0aW1lYmFyRm9ybWF0Iiwic2hhbGxvd1VwZGF0ZUNoZWNrIiwiZm9yY2VSZWRyYXdGdW5jIiwiYm90dG9tUmVzb2x1dGlvbiIsInRvcFJlc29sdXRpb24iLCJkaXZDc3NDbGFzcyIsInZhclRpbWViYXJQcm9wcyIsImNvbHVtbldpZHRoIiwiY2FsY3VsYXRlSGVpZ2h0IiwiaGVpZ2h0IiwidGltZWJhciIsInRpbWViYXJIZWlnaHQiLCJtYXgiLCJncm91cHMiLCJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsIm9iamVjdCIsIm51bWJlciIsInNoYXBlIiwib3JpZ2luYWxTdGFydERhdGUiLCJvcmlnaW5hbEVuZERhdGUiLCJzaG93Q3Vyc29yVGltZSIsImJvb2wiLCJjdXJzb3JUaW1lRm9ybWF0Iiwic3RyaW5nIiwib25JdGVtRG91YmxlQ2xpY2siLCJvbkl0ZW1Db250ZXh0Iiwib25Sb3dDb250ZXh0Iiwib25Sb3dEb3VibGVDbGljayIsIm9uSXRlbUhvdmVyIiwib25JdGVtTGVhdmUiLCJncm91cFJlbmRlcmVyIiwiZ3JvdXBUaXRsZVJlbmRlcmVyIiwibWluSXRlbUR1cmF0aW9uIiwiRGVmYXVsdEdyb3VwUmVuZGVyZXIiLCJEZWZhdWx0SXRlbVJlbmRlcmVyIiwicmVzaXplU3RhcnQiLCJyZXNpemVFbmQiLCJpdGVtc1NlbGVjdGVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7OzZCQThFSEMsRyxFQUFLQyxJLEVBQU07QUFDekIsYUFBTyxDQUFDRCxHQUFHLEdBQUdDLElBQVAsTUFBaUJELEdBQXhCO0FBQ0Q7OztBQUlELG9CQUFZRSxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2pCLDhCQUFNQSxLQUFOOztBQURpQixrRUE2SEwsWUFBaUI7QUFBQSxVQUFoQkMsTUFBZ0IsdUVBQVAsRUFBTzs7QUFDN0IsWUFBS0MsS0FBTCxDQUFXQyxpQkFBWCxDQUE2QkYsTUFBN0I7QUFDRCxLQS9Ia0I7O0FBQUEsMEVBa1VHLFVBQUNHLENBQUQsRUFBSUMsWUFBSixFQUFrQkMsV0FBbEIsRUFBa0M7QUFDdERGLE1BQUFBLENBQUMsQ0FBQ0cs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QUFBLFdBQVcsRUFBRSxDQUZPO0FBR3BCaUosRUFBQUEsVUFBVSxFQUFFLEVBSFE7QUFJcEI1SSxFQUFBQSxXQUFXLEVBQUUsSUFKTztBQUtwQm9NLEVBQUFBLGdCQUFnQixFQUFFLFVBTEU7QUFNcEJuSCxFQUFBQSxXQUFXLEVBQUUsTUFOTztBQU9wQmlILEVBQUFBLGNBQWMsRUFBRSxJQVBJO0FBUXBCVSxFQUFBQSxhQUFhLEVBQUVHLCtCQVJLO0FBU3BCckQsRUFBQUEsWUFBWSxFQUFFc0QsOEJBVE07QUFVcEJILEVBQUFBLGtCQUFrQixFQUFFO0FBQUEsd0JBQU0sNENBQU47QUFBQSxHQVZBO0FBV3BCckwsRUFBQUEsWUFBWSxFQUFFbEQsUUFBUSxDQUFDZ0QsY0FBVCxDQUF3QkMsTUFBeEIsR0FBaUNqRCxRQUFRLENBQUNnRCxjQUFULENBQXdCSSxJQUF6RCxHQUFnRXBELFFBQVEsQ0FBQ2dELGNBQVQsQ0FBd0JNLE1BWGxGO0FBWXBCOEksRUFBQUEsa0JBQWtCLEVBQUUsS0FaQTtBQWFwQkMsRUFBQUEsZUFBZSxFQUFFLElBYkc7QUFjcEJtQyxFQUFBQSxlQUFlLEVBQUUsQ0FkRyxDQWNEOztBQWRDLEM7O2dCQXBESHhPLFEsaUJBcUVFO0FBQ25CMk8sRUFBQUEsV0FBVyxFQUFFLGFBRE07QUFFbkJDLEVBQUFBLFNBQVMsRUFBRSxXQUZRO0FBR25CdkUsRUFBQUEsT0FBTyxFQUFFLFNBSFU7QUFJbkJ2QyxFQUFBQSxTQUFTLEVBQUUsV0FKUTtBQUtuQitHLEVBQUFBLGFBQWEsRUFBRSxlQUxJO0FBTW5CNUMsRUFBQUEsZ0JBQWdCLEVBQUU7QUFOQyxDOztnQkFyRUZqTSxRLFdBa0ZKLFlBQU0sQ0FBRSxDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QsIHtGcmFnbWVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtBdXRvU2l6ZXJ9IGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkJztcblxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGludGVyYWN0IGZyb20gJ2ludGVyYWN0anMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtwaXhUb0ludCwgaW50VG9QaXh9IGZyb20gJy4uL3V0aWxzL2NvbW1vblV0aWxzJztcbmltcG9ydCB7cm93SXRlbXNSZW5kZXJlciwgcm93TGF5ZXJSZW5kZXJlciwgZ2V0TmVhcmVzdFJvd051bWJlciwgZ2V0TWF4T3ZlcmxhcHBpbmdJdGVtc30gZnJvbSAnLi4vdXRpbHMvaXRlbVV0aWxzJztcbmltcG9ydCB7dGltZVNuYXAsIGdldFRpbWVBdFBpeGVsLCBnZXRTbmFwUGl4ZWxGcm9tRGVsdGF9IGZyb20gJy4uL3V0aWxzL3RpbWVVdGlscyc7XG5pbXBvcnQgVGltZWJhciBmcm9tICcuLi9jb21wb25lbnRzL3RpbWViYXInO1xuaW1wb3J0IFNlbGVjdEJveCBmcm9tICcuLi9jb21wb25lbnRzL3NlbGVjdG9yJztcbmltcG9ydCB7RGVmYXVsdEdyb3VwUmVuZGVyZXIsIERlZmF1bHRJdGVtUmVuZGVyZXJ9IGZyb20gJy4uL2NvbXBvbmVudHMvcmVuZGVyZXJzJztcbmltcG9ydCBUaW1lbGluZUJvZHkgZnJvbSAnLi4vY29tcG9uZW50cy9ib2R5JztcblxuLy8gc3RhcnRzV2l0aCBwb2x5ZmlsbCBmb3IgSUUxMSBzdXBwb3J0XG5pbXBvcnQgJ2NvcmUtanMvZm4vc3RyaW5nL3N0YXJ0cy13aXRoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZWxpbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgVElNRUxJTkVfTU9ERVMgPSB7XG4gICAgU0VMRUNUOiAxLFxuICAgIERSQUc6IDIsXG4gICAgUkVTSVpFOiA0XG4gIH07XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBzZXRTdGFydERhdGVXaXRoWm9vbTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZXRFbmREYXRlV2l0aFpvb206IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLmlzUmVxdWlyZWQsXG4gICAgZ3JvdXBzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KS5pc1JlcXVpcmVkLFxuICAgIGdyb3VwT2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHJvd0xheWVyczogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBzdGFydDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICBlbmQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgcm93TnVtYmVyOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICAgIH0pXG4gICAgKSxcbiAgICBzZWxlY3RlZEl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSxcbiAgICBzdGFydERhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBlbmREYXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgb3JpZ2luYWxTdGFydERhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBvcmlnaW5hbEVuZERhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBzbmFwTWludXRlczogUHJvcFR5cGVzLm51bWJlcixcbiAgICBzaG93Q3Vyc29yVGltZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgY3Vyc29yVGltZUZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb21wb25lbnRJZDogUHJvcFR5cGVzLnN0cmluZywgLy8gQSB1bmlxdWUga2V5IHRvIGlkZW50aWZ5IHRoZSBjb21wb25lbnQuIE9ubHkgbmVlZGVkIHdoZW4gMiBncmlkcyBhcmUgbW91bnRlZFxuICAgIGl0ZW1IZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgdGltZWxpbmVNb2RlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHRpbWViYXJGb3JtYXQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgb25JdGVtQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSXRlbURvdWJsZUNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkl0ZW1Db250ZXh0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkludGVyYWN0aW9uOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uUm93Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUm93Q29udGV4dDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Sb3dEb3VibGVDbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25JdGVtSG92ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSXRlbUxlYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpdGVtUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGdyb3VwUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGdyb3VwVGl0bGVSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hhbGxvd1VwZGF0ZUNoZWNrOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb3JjZVJlZHJhd0Z1bmM6IFByb3BUeXBlcy5mdW5jLFxuICAgIGJvdHRvbVJlc29sdXRpb246IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdG9wUmVzb2x1dGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtaW5JdGVtRHVyYXRpb246IFByb3BUeXBlcy5udW1iZXIgLy8gaW4gbXNcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHJvd0xheWVyczogW10sXG4gICAgZ3JvdXBPZmZzZXQ6IDAsXG4gICAgaXRlbUhlaWdodDogMTAsXG4gICAgc25hcE1pbnV0ZXM6IDAuMDEsXG4gICAgY3Vyc29yVGltZUZvcm1hdDogJ21tOnNzOm1zJyxcbiAgICBjb21wb25lbnRJZDogJ3I5azEnLFxuICAgIHNob3dDdXJzb3JUaW1lOiB0cnVlLFxuICAgIGdyb3VwUmVuZGVyZXI6IERlZmF1bHRHcm91cFJlbmRlcmVyLFxuICAgIGl0ZW1SZW5kZXJlcjogRGVmYXVsdEl0ZW1SZW5kZXJlcixcbiAgICBncm91cFRpdGxlUmVuZGVyZXI6ICgpID0+IDxkaXYgLz4sXG4gICAgdGltZWxpbmVNb2RlOiBUaW1lbGluZS5USU1FTElORV9NT0RFUy5TRUxFQ1QgfCBUaW1lbGluZS5USU1FTElORV9NT0RFUy5EUkFHIHwgVGltZWxpbmUuVElNRUxJTkVfTU9ERVMuUkVTSVpFLFxuICAgIHNoYWxsb3dVcGRhdGVDaGVjazogZmFsc2UsXG4gICAgZm9yY2VSZWRyYXdGdW5jOiBudWxsLFxuICAgIG1pbkl0ZW1EdXJhdGlvbjogMSAvLyBpbiBtc1xuICB9O1xuXG4gIHN0YXRpYyBjaGFuZ2VUeXBlcyA9IHtcbiAgICByZXNpemVTdGFydDogJ3Jlc2l6ZVN0YXJ0JyxcbiAgICByZXNpemVFbmQ6ICdyZXNpemVFbmQnLFxuICAgIGRyYWdFbmQ6ICdkcmFnRW5kJyxcbiAgICBkcmFnU3RhcnQ6ICdkcmFnU3RhcnQnLFxuICAgIGl0ZW1zU2VsZWN0ZWQ6ICdpdGVtc1NlbGVjdGVkJyxcbiAgICBzbmFwcGVkTW91c2VNb3ZlOiAnc25hcHBlZE1vdXNlTW92ZSdcbiAgfTtcblxuICBzdGF0aWMgaXNCaXRTZXQoYml0LCBtYXNrKSB7XG4gICAgcmV0dXJuIChiaXQgJiBtYXNrKSA9PT0gYml0O1xuICB9XG5cbiAgc3RhdGljIG5vX29wID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zZWxlY3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXRlID0ge3NlbGVjdGlvbjogW10sIGN1cnNvclRpbWU6IG51bGx9O1xuICAgIHRoaXMuc2V0VGltZU1hcCh0aGlzLnByb3BzLml0ZW1zKTtcblxuICAgIHRoaXMuY2VsbFJlbmRlcmVyID0gdGhpcy5jZWxsUmVuZGVyZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLnJvd0hlaWdodCA9IHRoaXMucm93SGVpZ2h0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5zZXRUaW1lTWFwID0gdGhpcy5zZXRUaW1lTWFwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5nZXRJdGVtID0gdGhpcy5nZXRJdGVtLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jaGFuZ2VHcm91cCA9IHRoaXMuY2hhbmdlR3JvdXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNldFNlbGVjdGlvbiA9IHRoaXMuc2V0U2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gICAgdGhpcy5jbGVhclNlbGVjdGlvbiA9IHRoaXMuY2xlYXJTZWxlY3Rpb24uYmluZCh0aGlzKTtcbiAgICB0aGlzLmdldFRpbWVsaW5lV2lkdGggPSB0aGlzLmdldFRpbWVsaW5lV2lkdGguYmluZCh0aGlzKTtcbiAgICB0aGlzLml0ZW1Gcm9tRWxlbWVudCA9IHRoaXMuaXRlbUZyb21FbGVtZW50LmJpbmQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVEaW1lbnNpb25zID0gdGhpcy51cGRhdGVEaW1lbnNpb25zLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ncmlkX3JlZl9jYWxsYmFjayA9IHRoaXMuZ3JpZF9yZWZfY2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLnNlbGVjdF9yZWZfY2FsbGJhY2sgPSB0aGlzLnNlbGVjdF9yZWZfY2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLnRocm90dGxlZE1vdXNlTW92ZUZ1bmMgPSBfLnRocm90dGxlKHRoaXMudGhyb3R0bGVkTW91c2VNb3ZlRnVuYy5iaW5kKHRoaXMpLCAyMCk7XG5cbiAgICBjb25zdCBjYW5TZWxlY3QgPSBUaW1lbGluZS5pc0JpdFNldChUaW1lbGluZS5USU1FTElORV9NT0RFUy5TRUxFQ1QsIHRoaXMucHJvcHMudGltZWxpbmVNb2RlKTtcbiAgICBjb25zdCBjYW5EcmFnID0gVGltZWxpbmUuaXNCaXRTZXQoVGltZWxpbmUuVElNRUxJTkVfTU9ERVMuRFJBRywgdGhpcy5wcm9wcy50aW1lbGluZU1vZGUpO1xuICAgIGNvbnN0IGNhblJlc2l6ZSA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlJFU0laRSwgdGhpcy5wcm9wcy50aW1lbGluZU1vZGUpO1xuICAgIHRoaXMuc2V0VXBEcmFnZ2luZyhjYW5TZWxlY3QsIGNhbkRyYWcsIGNhblJlc2l6ZSk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGVEaW1lbnNpb25zKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5zZXRUaW1lTWFwKG5leHRQcm9wcy5pdGVtcywgbmV4dFByb3BzLnN0YXJ0RGF0ZSwgbmV4dFByb3BzLmVuZERhdGUpO1xuICAgIHRoaXMucmVmcmVzaEdyaWQoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLl9pdGVtSW50ZXJhY3RhYmxlKSB0aGlzLl9pdGVtSW50ZXJhY3RhYmxlLnVuc2V0KCk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdFJlY3RhbmdsZUludGVyYWN0YWJsZSkgdGhpcy5fc2VsZWN0UmVjdGFuZ2xlSW50ZXJhY3RhYmxlLnVuc2V0KCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudXBkYXRlRGltZW5zaW9ucyk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBjb25zdCB7dGltZWxpbmVNb2RlLCBzZWxlY3RlZEl0ZW1zfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0aW9uQ2hhbmdlID0gIV8uaXNFcXVhbChwcmV2UHJvcHMuc2VsZWN0ZWRJdGVtcywgc2VsZWN0ZWRJdGVtcyk7XG4gICAgY29uc3QgdGltZWxpbmVNb2RlQ2hhbmdlID0gIV8uaXNFcXVhbChwcmV2UHJvcHMudGltZWxpbmVNb2RlLCB0aW1lbGluZU1vZGUpO1xuXG4gICAgaWYgKHRpbWVsaW5lTW9kZUNoYW5nZSB8fCBzZWxlY3Rpb25DaGFuZ2UpIHtcbiAgICAgIGNvbnN0IGNhblNlbGVjdCA9IFRpbWVsaW5lLmlzQml0U2V0KFRpbWVsaW5lLlRJTUVMSU5FX01PREVTLlNFTEVDVCwgdGltZWxpbmVNb2RlKTtcbiAgICAgIGNvbnN0IGNhbkRyYWcgPSBUaW1lbGluZS5pc0JpdFNldChUaW1lbGluZS5USU1FTElORV9NT0RFUy5EUkFHLCB0aW1lbGluZU1vZGUpO1xuICAgICAgY29uc3QgY2FuUmVzaXplID0gVGltZWxpbmUuaXNCaXRTZXQoVGltZWxpbmUuVElNRUxJTkVfTU9ERVMuUkVTSVpFLCB0aW1lbGluZU1vZGUpO1xuICAgICAgdGhpcy5zZXRVcERyYWdnaW5nKGNhblNlbGVjdCwgY2FuRHJhZywgY2FuUmVzaXplKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVEaW1lbnNpb25zKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVvdXQpO1xuICAgIHRoaXMucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgdGhpcy5fZ3JpZC5yZWNvbXB1dGVHcmlkU2l6ZSgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBzZXRUaW1lTWFwKGl0ZW1zLCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkge1xuICAgICAgc3RhcnREYXRlID0gdGhpcy5wcm9wcy5zdGFydERhdGU7XG4gICAgICBlbmREYXRlID0gdGhpcy5wcm9wcy5lbmREYXRlO1xuICAgIH1cbiAgICB0aGlzLml0ZW1Sb3dNYXAgPSB7fTsgLy8gdGltZWxpbmUgZWxlbWVudHMgKGtleSkgPT4gKHJvd05vKS5cbiAgICB0aGlzLnJvd0l0ZW1NYXAgPSB7fTsgLy8gKHJvd05vKSA9PiB0aW1lbGluZSBlbGVtZW50c1xuICAgIHRoaXMucm93SGVpZ2h0Q2FjaGUgPSB7fTsgLy8gKHJvd05vKSA9PiBtYXggbnVtYmVyIG9mIHN0YWNrZWQgaXRlbXNcbiAgICBsZXQgdmlzaWJsZUl0ZW1zID0gXy5maWx0ZXIoaXRlbXMsIGkgPT4ge1xuICAgICAgcmV0dXJuIGkuZW5kID4gc3RhcnREYXRlICYmIGkuc3RhcnQgPCBlbmREYXRlO1xuICAgIH0pO1xuICAgIGxldCBpdGVtUm93cyA9IF8uZ3JvdXBCeSh2aXNpYmxlSXRlbXMsICdyb3cnKTtcblxuICAgIF8uZm9yRWFjaChpdGVtUm93cywgKHZpc2libGVJdGVtcywgcm93KSA9PiB7XG4gICAgICBjb25zdCByb3dJbnQgPSBwYXJzZUludChyb3cpO1xuICAgICAgaWYgKHRoaXMucm93SXRlbU1hcFtyb3dJbnRdID09PSB1bmRlZmluZWQpIHRoaXMucm93SXRlbU1hcFtyb3dJbnRdID0gW107XG4gICAgICBfLmZvckVhY2godmlzaWJsZUl0ZW1zLCBpdGVtID0+IHtcbiAgICAgICAgdGhpcy5pdGVtUm93TWFwW2l0ZW0ua2V5XSA9IHJvd0ludDtcbiAgICAgICAgdGhpcy5yb3dJdGVtTWFwW3Jvd0ludF0ucHVzaChpdGVtKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yb3dIZWlnaHRDYWNoZVtyb3dJbnRdID0gZ2V0TWF4T3ZlcmxhcHBpbmdJdGVtcyh2aXNpYmxlSXRlbXMpO1xuICAgIH0pO1xuICB9XG5cbiAgaXRlbUZyb21FbGVtZW50KGUpIHtcbiAgICBjb25zdCBpbmRleCA9IGUuZ2V0QXR0cmlidXRlKCdkYXRhLWl0ZW0taW5kZXgnKTtcbiAgICBjb25zdCByb3dObyA9IHRoaXMuaXRlbVJvd01hcFtpbmRleF07XG4gICAgY29uc3QgaXRlbUluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5yb3dJdGVtTWFwW3Jvd05vXSwgaSA9PiBpLmtleSA9PSBpbmRleCk7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMucm93SXRlbU1hcFtyb3dOb11baXRlbUluZGV4XTtcbiAgICByZXR1cm4ge2luZGV4LCByb3dObywgaXRlbUluZGV4LCBpdGVtfTtcbiAgfVxuXG4gIGdldEl0ZW0oaWQpIHtcbiAgICAvLyBUaGlzIGlzIHF1aXRlIHN0dXBpZCBhbmQgc2hvdWxkbid0IHJlYWxseSBiZSBuZWVkZWRcbiAgICBjb25zdCByb3dObyA9IHRoaXMuaXRlbVJvd01hcFtpZF07XG4gICAgY29uc3QgaXRlbUluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5yb3dJdGVtTWFwW3Jvd05vXSwgaSA9PiBpLmtleSA9PSBpZCk7XG4gICAgcmV0dXJuIHRoaXMucm93SXRlbU1hcFtyb3dOb11baXRlbUluZGV4XTtcbiAgfVxuXG4gIGNoYW5nZUdyb3VwKGl0ZW0sIGN1clJvdywgbmV3Um93KSB7XG4gICAgaXRlbS5yb3cgPSBuZXdSb3c7XG4gICAgdGhpcy5pdGVtUm93TWFwW2l0ZW0ua2V5XSA9IG5ld1JvdztcbiAgICB0aGlzLnJvd0l0ZW1NYXBbY3VyUm93XSA9IHRoaXMucm93SXRlbU1hcFtjdXJSb3ddLmZpbHRlcihpID0+IGkua2V5ICE9PSBpdGVtLmtleSk7XG4gICAgdGhpcy5yb3dJdGVtTWFwW25ld1Jvd10ucHVzaChpdGVtKTtcbiAgfVxuXG4gIHNldFNlbGVjdGlvbihzZWxlY3Rpb25zKSB7XG4gICAgbGV0IG5ld1NlbGVjdGlvbiA9IF8ubWFwKHNlbGVjdGlvbnMsIHMgPT4ge1xuICAgICAgcmV0dXJuIHtzdGFydDogc1swXS5jbG9uZSgpLCBlbmQ6IHNbMV0uY2xvbmUoKX07XG4gICAgfSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0aW9uOiBuZXdTZWxlY3Rpb259KTtcbiAgfVxuXG4gIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGlvbjogW119KTtcbiAgfVxuXG4gIGdldFRpbWVsaW5lV2lkdGgodG90YWxXaWR0aCkge1xuICAgIGNvbnN0IHtncm91cE9mZnNldH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICh0b3RhbFdpZHRoICE9PSB1bmRlZmluZWQpIHJldHVybiB0b3RhbFdpZHRoIC0gZ3JvdXBPZmZzZXQ7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWQucHJvcHMud2lkdGggLSBncm91cE9mZnNldDtcbiAgfVxuXG4gIHJlZnJlc2hHcmlkID0gKGNvbmZpZyA9IHt9KSA9PiB7XG4gICAgdGhpcy5fZ3JpZC5yZWNvbXB1dGVHcmlkU2l6ZShjb25maWcpO1xuICB9O1xuXG4gIHNldFVwRHJhZ2dpbmcoY2FuU2VsZWN0LCBjYW5EcmFnKSB7XG4gICAgY29uc3QgdG9wRGl2Q2xhc3NJZCA9IGByY3Q5ay1pZC0ke3RoaXMucHJvcHMuY29tcG9uZW50SWR9YDtcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1TZWxlY3RvciA9ICcucmN0OWstaXRlbXMtb3V0ZXItc2VsZWN0ZWQnO1xuICAgIGlmICh0aGlzLl9pdGVtSW50ZXJhY3RhYmxlKSB0aGlzLl9pdGVtSW50ZXJhY3RhYmxlLnVuc2V0KCk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdFJlY3RhbmdsZUludGVyYWN0YWJsZSkgdGhpcy5fc2VsZWN0UmVjdGFuZ2xlSW50ZXJhY3RhYmxlLnVuc2V0KCk7XG5cbiAgICB0aGlzLl9pdGVtSW50ZXJhY3RhYmxlID0gaW50ZXJhY3QoYC4ke3RvcERpdkNsYXNzSWR9IC5pdGVtX2RyYWdnYWJsZWApO1xuICAgIHRoaXMuX3NlbGVjdFJlY3RhbmdsZUludGVyYWN0YWJsZSA9IGludGVyYWN0KGAuJHt0b3BEaXZDbGFzc0lkfSAucGFyZW50LWRpdmApO1xuXG4gICAgdGhpcy5faXRlbUludGVyYWN0YWJsZS5vbigndGFwJywgZSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVJdGVtUm93RXZlbnQoZSwgdGhpcy5wcm9wcy5vbkl0ZW1DbGljaywgdGhpcy5wcm9wcy5vblJvd0NsaWNrKTtcbiAgICB9KTtcblxuICAgIGlmIChjYW5EcmFnKSB7XG4gICAgICB0aGlzLl9pdGVtSW50ZXJhY3RhYmxlXG4gICAgICAgIC5kcmFnZ2FibGUoe1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgYWxsb3dGcm9tOiBzZWxlY3RlZEl0ZW1TZWxlY3RvcixcbiAgICAgICAgICByZXN0cmljdDoge1xuICAgICAgICAgICAgcmVzdHJpY3Rpb246IGAuJHt0b3BEaXZDbGFzc0lkfWAsXG4gICAgICAgICAgICBlbGVtZW50UmVjdDoge2xlZnQ6IDAsIHJpZ2h0OiAxLCB0b3A6IDAsIGJvdHRvbTogMX1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZHJhZ3N0YXJ0JywgZSA9PiB7XG4gICAgICAgICAgbGV0IHNlbGVjdGlvbnMgPSBbXTtcbiAgICAgICAgICBjb25zdCBhbmltYXRlZEl0ZW1zID0gdGhpcy5wcm9wcy5vbkludGVyYWN0aW9uKFxuICAgICAgICAgICAgVGltZWxpbmUuY2hhbmdlVHlwZXMuZHJhZ1N0YXJ0LFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtc1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICBfLmZvckVhY2goYW5pbWF0ZWRJdGVtcywgaWQgPT4ge1xuICAgICAgICAgICAgbGV0IGRvbUl0ZW0gPSB0aGlzLl9ncmlkRG9tTm9kZS5xdWVyeVNlbGVjdG9yKFwic3BhbltkYXRhLWl0ZW0taW5kZXg9J1wiICsgaWQgKyBcIidcIik7XG4gICAgICAgICAgICBpZiAoZG9tSXRlbSkge1xuICAgICAgICAgICAgICBzZWxlY3Rpb25zLnB1c2goW3RoaXMuZ2V0SXRlbShpZCkuc3RhcnQsIHRoaXMuZ2V0SXRlbShpZCkuZW5kXSk7XG4gICAgICAgICAgICAgIGRvbUl0ZW0uc2V0QXR0cmlidXRlKCdpc0RyYWdnaW5nJywgJ1RydWUnKTtcbiAgICAgICAgICAgICAgZG9tSXRlbS5zZXRBdHRyaWJ1dGUoJ2RyYWcteCcsIDApO1xuICAgICAgICAgICAgICBkb21JdGVtLnNldEF0dHJpYnV0ZSgnZHJhZy15JywgMCk7XG4gICAgICAgICAgICAgIGRvbUl0ZW0uc3R5bGVbJ3otaW5kZXgnXSA9IDQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb24oc2VsZWN0aW9ucyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZHJhZ21vdmUnLCBlID0+IHtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICBsZXQgYW5pbWF0ZWRJdGVtcyA9IHRoaXMuX2dyaWREb21Ob2RlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzcGFuW2lzRHJhZ2dpbmc9J1RydWUnXCIpIHx8IFtdO1xuXG4gICAgICAgICAgbGV0IGR4ID0gKHBhcnNlRmxvYXQodGFyZ2V0LmdldEF0dHJpYnV0ZSgnZHJhZy14JykpIHx8IDApICsgZS5keDtcbiAgICAgICAgICBsZXQgc2VsZWN0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgLy8gU25hcCB0aGUgbW92ZW1lbnQgdG8gdGhlIGN1cnJlbnQgc25hcCBpbnRlcnZhbFxuICAgICAgICAgIGNvbnN0IHNuYXBEeCA9IGdldFNuYXBQaXhlbEZyb21EZWx0YShcbiAgICAgICAgICAgIGR4LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgICAgICB0aGlzLnByb3BzLmVuZERhdGUsXG4gICAgICAgICAgICB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc25hcE1pbnV0ZXNcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgXy5mb3JFYWNoKGFuaW1hdGVkSXRlbXMsIGRvbUl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3Qge2l0ZW19ID0gdGhpcy5pdGVtRnJvbUVsZW1lbnQoZG9tSXRlbSk7XG4gICAgICAgICAgICBsZXQgaXRlbUR1cmF0aW9uID0gaXRlbS5lbmQuZGlmZihpdGVtLnN0YXJ0LCAnbXMnKTtcblxuICAgICAgICAgICAgbGV0IG5ld1BpeGVsT2Zmc2V0ID0gKHBpeFRvSW50KGRvbUl0ZW0uc3R5bGUubGVmdCkgKyBzbmFwRHgpLnRvRml4ZWQoMyk7XG5cbiAgICAgICAgICAgIGxldCBuZXdTdGFydCA9IGdldFRpbWVBdFBpeGVsKFxuICAgICAgICAgICAgICBuZXdQaXhlbE9mZnNldCxcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcbiAgICAgICAgICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKCksXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc25hcE1pbnV0ZXNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxldCBuZXdFbmQgPSBuZXdTdGFydC5jbG9uZSgpLmFkZChpdGVtRHVyYXRpb24sICdtcycpO1xuXG4gICAgICAgICAgICBpZiAobmV3U3RhcnQuZGlmZih0aGlzLnByb3BzLnN0YXJ0RGF0ZSkgPD0gMCkge1xuICAgICAgICAgICAgICBuZXdTdGFydCA9IHRoaXMucHJvcHMuc3RhcnREYXRlO1xuICAgICAgICAgICAgICB0aGlzLnByb3BzLnNldFN0YXJ0RGF0ZVdpdGhab29tKHRoaXMucHJvcHMuc3RhcnREYXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2V0U3RhcnREYXRlV2l0aFpvb20obmV3U3RhcnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5lbmREYXRlLmRpZmYobmV3RW5kKSA8PSAwKSB7XG4gICAgICAgICAgICAgIG5ld0VuZCA9IHRoaXMucHJvcHMuZW5kRGF0ZTtcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zZXRFbmREYXRlV2l0aFpvb20odGhpcy5wcm9wcy5lbmREYXRlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuc2V0RW5kRGF0ZVdpdGhab29tKG5ld0VuZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGVjdGlvbnMucHVzaChbbmV3U3RhcnQsIG5ld0VuZF0pO1xuXG4gICAgICAgICAgICAvLyBUcmFuc2xhdGUgdGhlIG5ldyBzdGFydCB0aW1lIGJhY2sgdG8gcGl4ZWxzLCBzbyB3ZSBjYW4gYW5pbWF0ZSB0aGUgc25hcFxuICAgICAgICAgICAgZG9tSXRlbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBkb21JdGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIHNuYXBEeCArICdweCwgJyArIDAgKyAncHgpJztcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RyYWcteCcsIGR4KTtcblxuICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKHNlbGVjdGlvbnMpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2RyYWdlbmQnLCBlID0+IHtcbiAgICAgICAgICBjb25zdCB7aXRlbSwgcm93Tm99ID0gdGhpcy5pdGVtRnJvbUVsZW1lbnQoZS50YXJnZXQpO1xuICAgICAgICAgIGxldCBhbmltYXRlZEl0ZW1zID0gdGhpcy5fZ3JpZERvbU5vZGUucXVlcnlTZWxlY3RvckFsbChcInNwYW5baXNEcmFnZ2luZz0nVHJ1ZSdcIikgfHwgW107XG5cbiAgICAgICAgICBsZXQgYW5pbWF0ZWRJdGVtc0tleXMgPSBbXTtcbiAgICAgICAgICBfLmZvckVhY2goYW5pbWF0ZWRJdGVtcywgZG9tSXRlbSA9PiB7XG4gICAgICAgICAgICBhbmltYXRlZEl0ZW1zS2V5cy5wdXNoKHRoaXMuaXRlbUZyb21FbGVtZW50KGRvbUl0ZW0pLml0ZW0ua2V5KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uKFtbaXRlbS5zdGFydCwgaXRlbS5lbmRdXSk7XG4gICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbigpO1xuXG4gICAgICAgICAgLy8gQ2hhbmdlIHJvd1xuICAgICAgICAgIGxldCBuZXdSb3cgPSBnZXROZWFyZXN0Um93TnVtYmVyKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcblxuICAgICAgICAgIGxldCByb3dDaGFuZ2VEZWx0YSA9IG5ld1JvdyAtIHJvd05vO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIHRpbWVcbiAgICAgICAgICBsZXQgbmV3UGl4ZWxPZmZzZXQgPSAoXG4gICAgICAgICAgICBwaXhUb0ludChlLnRhcmdldC5zdHlsZS5sZWZ0KSArIChwYXJzZUZsb2F0KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZHJhZy14JykpIHx8IDApXG4gICAgICAgICAgKS50b0ZpeGVkKDMpO1xuXG4gICAgICAgICAgbGV0IG5ld1N0YXJ0ID0gZ2V0VGltZUF0UGl4ZWwoXG4gICAgICAgICAgICBuZXdQaXhlbE9mZnNldCxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhcnREYXRlLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxuICAgICAgICAgICAgdGhpcy5nZXRUaW1lbGluZVdpZHRoKCksXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNuYXBNaW51dGVzXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnN0IHRpbWVEZWx0YSA9IG5ld1N0YXJ0LmNsb25lKCkuZGlmZihpdGVtLnN0YXJ0LCAnbXMnKTtcbiAgICAgICAgICBjb25zdCBjaGFuZ2VzID0ge3Jvd0NoYW5nZURlbHRhLCB0aW1lRGVsdGF9O1xuICAgICAgICAgIGxldCBpdGVtcyA9IFtdO1xuXG4gICAgICAgICAgXy5mb3JFYWNoKGFuaW1hdGVkSXRlbXMsIGRvbUl0ZW0gPT4ge1xuICAgICAgICAgICAgY29uc3Qge2l0ZW19ID0gdGhpcy5pdGVtRnJvbUVsZW1lbnQoZG9tSXRlbSk7XG4gICAgICAgICAgICBsZXQgaXRlbUR1cmF0aW9uID0gaXRlbS5lbmQuZGlmZihpdGVtLnN0YXJ0KTtcbiAgICAgICAgICAgIGxldCBuZXdTdGFydCA9IGl0ZW0uc3RhcnQuY2xvbmUoKS5hZGQodGltZURlbHRhLCAnbXMnKTtcbiAgICAgICAgICAgIGxldCBuZXdFbmQgPSBuZXdTdGFydC5jbG9uZSgpLmFkZChpdGVtRHVyYXRpb24pO1xuXG4gICAgICAgICAgICBjb25zdCBuZXdTdGFydEluTXMgPSBuZXdTdGFydC5jbG9uZSgpLmRpZmYoMCwgJ21zJyk7XG4gICAgICAgICAgICBjb25zdCBuZXdFbmRJbk1zID0gbmV3RW5kLmNsb25lKCkuZGlmZigwLCAnbXMnKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRJdGVtTmV3Um93ID0gaXRlbS5yb3cgKyByb3dDaGFuZ2VEZWx0YTtcblxuICAgICAgICAgICAgY29uc3QgaXRlbXNPbk5ld1JvdyA9IHRoaXMucHJvcHMuaXRlbXMuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudC5yb3cgPT09IGN1cnJlbnRJdGVtTmV3Um93KTtcbiAgICAgICAgICAgIGl0ZW1zT25OZXdSb3cuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IGl0ZW1BYm92ZUVsZW1lbnQgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gQ2hlY2tpbmcgd2hldGhlciB0aGUgZHJhZ2dlZCBpdGVtIGlzIGFib3ZlIG90aGVyIGl0ZW1zLlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtc09uTmV3Um93Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBpdGVtc09uTmV3Um93W2ldO1xuICAgICAgICAgICAgICBpZiAoYW5pbWF0ZWRJdGVtc0tleXMuc29tZShrZXkgPT4ga2V5ID09PSBlbGVtZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50U3RhcnRJbk1zID0gZWxlbWVudC5zdGFydC5jbG9uZSgpLmRpZmYoMCwgJ21zJyk7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRFbmRJbk1zID0gZWxlbWVudC5lbmQuY2xvbmUoKS5kaWZmKDAsICdtcycpO1xuXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAobmV3U3RhcnRJbk1zID4gZWxlbWVudFN0YXJ0SW5NcyAmJiBuZXdTdGFydEluTXMgPCBlbGVtZW50RW5kSW5NcykgfHxcbiAgICAgICAgICAgICAgICAobmV3RW5kSW5NcyA+IGVsZW1lbnRTdGFydEluTXMgJiYgbmV3RW5kSW5NcyA8IGVsZW1lbnRFbmRJbk1zKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpdGVtQWJvdmVFbGVtZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLnN0YXJ0ID0gbmV3U3RhcnQ7XG4gICAgICAgICAgICBpdGVtLmVuZCA9IG5ld0VuZDtcblxuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMucHJvcHMub25JbnRlcmFjdGlvbihUaW1lbGluZS5jaGFuZ2VUeXBlcy5kcmFnRW5kLCBjaGFuZ2VzLCBpdGVtcyk7XG5cbiAgICAgICAgICAvLyBSZXNldCB0aGUgc3R5bGVzXG4gICAgICAgICAgYW5pbWF0ZWRJdGVtcy5mb3JFYWNoKGRvbUl0ZW0gPT4ge1xuICAgICAgICAgICAgZG9tSXRlbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBkb21JdGVtLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMHB4LCAwcHgpJztcbiAgICAgICAgICAgIGRvbUl0ZW0uc2V0QXR0cmlidXRlKCdkcmFnLXgnLCAwKTtcbiAgICAgICAgICAgIGRvbUl0ZW0uc2V0QXR0cmlidXRlKCdkcmFnLXknLCAwKTtcbiAgICAgICAgICAgIGRvbUl0ZW0uc3R5bGVbJ3otaW5kZXgnXSA9IDM7XG4gICAgICAgICAgICBkb21JdGVtLnN0eWxlWyd0b3AnXSA9IGludFRvUGl4KFxuICAgICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1IZWlnaHQgKiBNYXRoLnJvdW5kKHBpeFRvSW50KGRvbUl0ZW0uc3R5bGVbJ3RvcCddKSAvIHRoaXMucHJvcHMuaXRlbUhlaWdodClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkb21JdGVtLnJlbW92ZUF0dHJpYnV0ZSgnaXNEcmFnZ2luZycpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5fZ3JpZC5yZWNvbXB1dGVHcmlkU2l6ZSh7cm93SW5kZXg6IDB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUl0ZW1Sb3dFdmVudCA9IChlLCBpdGVtQ2FsbGJhY2ssIHJvd0NhbGxiYWNrKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIFNraXAgY2xpY2sgaGFuZGxlciBpZiBzZWxlY3Rpbmcgd2l0aCBzZWxlY3Rpb24gYm94XG4gICAgaWYgKHRoaXMuc2VsZWN0aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtaXRlbS1pbmRleCcpIHx8IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLWl0ZW0taW5kZXgnKSkge1xuICAgICAgbGV0IGl0ZW1LZXkgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaXRlbS1pbmRleCcpIHx8IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWl0ZW0taW5kZXgnKTtcbiAgICAgIGl0ZW1DYWxsYmFjayAmJiBpdGVtQ2FsbGJhY2soZSwgTnVtYmVyKGl0ZW1LZXkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJvdyA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3ctaW5kZXgnKTtcbiAgICAgIGxldCBjbGlja2VkVGltZSA9IGdldFRpbWVBdFBpeGVsKFxuICAgICAgICBlLmNsaWVudFggLSB0aGlzLnByb3BzLmdyb3VwT2Zmc2V0LFxuICAgICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcbiAgICAgICAgdGhpcy5wcm9wcy5lbmREYXRlLFxuICAgICAgICB0aGlzLmdldFRpbWVsaW5lV2lkdGgoKVxuICAgICAgKTtcblxuICAgICAgLy9jb25zdCByb3VuZGVkU3RhcnRNaW51dGVzID0gTWF0aC5yb3VuZChjbGlja2VkVGltZS5taW51dGUoKSAvIHRoaXMucHJvcHMuc25hcE1pbnV0ZXMpICogdGhpcy5wcm9wcy5zbmFwTWludXRlczsgLy8gSSBkb250IGtub3cgd2hhdCB0aGlzIGRvZXNcbiAgICAgIGxldCBzbmFwcGVkQ2xpY2tlZFRpbWUgPSB0aW1lU25hcChjbGlja2VkVGltZSwgdGhpcy5wcm9wcy5zbmFwTWludXRlcyk7XG4gICAgICByb3dDYWxsYmFjayAmJiByb3dDYWxsYmFjayhlLCByb3csIGNsaWNrZWRUaW1lLCBzbmFwcGVkQ2xpY2tlZFRpbWUpO1xuICAgIH1cbiAgfTtcblxuICBjZWxsUmVuZGVyZXIod2lkdGgpIHtcbiAgICBjb25zdCB7dGltZWxpbmVNb2RlLCByb3dMYXllcnN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjYW5TZWxlY3QgPSBUaW1lbGluZS5pc0JpdFNldChUaW1lbGluZS5USU1FTElORV9NT0RFUy5TRUxFQ1QsIHRpbWVsaW5lTW9kZSk7XG4gICAgcmV0dXJuICh7Y29sdW1uSW5kZXgsIGtleSwgcGFyZW50LCByb3dJbmRleCwgc3R5bGV9KSA9PiB7XG4gICAgICBsZXQgaXRlbUNvbCA9IDE7XG4gICAgICBpZiAoaXRlbUNvbCA9PSBjb2x1bW5JbmRleCkge1xuICAgICAgICBsZXQgaXRlbXNJblJvdyA9IHRoaXMucm93SXRlbU1hcFtyb3dJbmRleF07XG4gICAgICAgIGNvbnN0IGxheWVyc0luUm93ID0gcm93TGF5ZXJzLmZpbHRlcihyID0+IHIucm93TnVtYmVyID09PSByb3dJbmRleCk7XG4gICAgICAgIGxldCByb3dIZWlnaHQgPSB0aGlzLnByb3BzLml0ZW1IZWlnaHQ7XG4gICAgICAgIGlmICh0aGlzLnJvd0hlaWdodENhY2hlW3Jvd0luZGV4XSkge1xuICAgICAgICAgIHJvd0hlaWdodCA9IHJvd0hlaWdodCAqIHRoaXMucm93SGVpZ2h0Q2FjaGVbcm93SW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICBkYXRhLXJvdy1pbmRleD17cm93SW5kZXh9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyY3Q5ay1yb3cgcmN0OWstcm93LXNjcm9sbFwiXG4gICAgICAgICAgICBvbkNsaWNrPXtlID0+IHRoaXMuX2hhbmRsZUl0ZW1Sb3dFdmVudChlLCBUaW1lbGluZS5ub19vcCwgdGhpcy5wcm9wcy5vblJvd0NsaWNrKX0+XG4gICAgICAgICAgICB7cm93SXRlbXNSZW5kZXJlcihcbiAgICAgICAgICAgICAgaXRlbXNJblJvdyxcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGFydERhdGUsXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcbiAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgIHRoaXMucHJvcHMuaXRlbUhlaWdodCxcbiAgICAgICAgICAgICAgdGhpcy5wcm9wcy5pdGVtUmVuZGVyZXIsXG4gICAgICAgICAgICAgIGNhblNlbGVjdCA/IHRoaXMucHJvcHMuc2VsZWN0ZWRJdGVtcyA6IFtdLFxuICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3Jvd0xheWVyUmVuZGVyZXIobGF5ZXJzSW5Sb3csIHRoaXMucHJvcHMuc3RhcnREYXRlLCB0aGlzLnByb3BzLmVuZERhdGUsIHdpZHRoLCByb3dIZWlnaHQpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByb3dIZWlnaHQoKSB7XG4gICAgY29uc3QgcmggPSAxO1xuICAgIHJldHVybiByaCAqIHRoaXMucHJvcHMuaXRlbUhlaWdodDtcbiAgfVxuXG4gIGdyaWRfcmVmX2NhbGxiYWNrKHJlYWN0Q29tcG9uZW50KSB7XG4gICAgdGhpcy5fZ3JpZCA9IHJlYWN0Q29tcG9uZW50O1xuICAgIHRoaXMuX2dyaWREb21Ob2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5fZ3JpZCk7XG4gIH1cblxuICBzZWxlY3RfcmVmX2NhbGxiYWNrKHJlYWN0Q29tcG9uZW50KSB7XG4gICAgdGhpcy5fc2VsZWN0Qm94ID0gcmVhY3RDb21wb25lbnQ7XG4gIH1cblxuICB0aHJvdHRsZWRNb3VzZU1vdmVGdW5jKGUpIHtcbiAgICBjb25zdCB7Y29tcG9uZW50SWR9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBsZWZ0T2Zmc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnJjdDlrLWlkLSR7Y29tcG9uZW50SWR9IC5wYXJlbnQtZGl2YCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICBjb25zdCBjdXJzb3JTbmFwcGVkVGltZSA9IGdldFRpbWVBdFBpeGVsKFxuICAgICAgZS5jbGllbnRYIC0gdGhpcy5wcm9wcy5ncm91cE9mZnNldCAtIGxlZnRPZmZzZXQsXG4gICAgICB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcbiAgICAgIHRoaXMucHJvcHMuZW5kRGF0ZSxcbiAgICAgIHRoaXMuZ2V0VGltZWxpbmVXaWR0aCgpLFxuICAgICAgdGhpcy5wcm9wcy5zbmFwTWludXRlc1xuICAgICk7XG4gICAgaWYgKCF0aGlzLm1vdXNlX3NuYXBwZWRfdGltZSB8fCB0aGlzLm1vdXNlX3NuYXBwZWRfdGltZS51bml4KCkgIT09IGN1cnNvclNuYXBwZWRUaW1lLnVuaXgoKSkge1xuICAgICAgaWYgKGN1cnNvclNuYXBwZWRUaW1lLmlzU2FtZU9yQWZ0ZXIodGhpcy5wcm9wcy5zdGFydERhdGUpKSB7XG4gICAgICAgIHRoaXMubW91c2Vfc25hcHBlZF90aW1lID0gY3Vyc29yU25hcHBlZFRpbWU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnNvclRpbWU6IHRoaXMubW91c2Vfc25hcHBlZF90aW1lfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25JbnRlcmFjdGlvbihcbiAgICAgICAgICBUaW1lbGluZS5jaGFuZ2VUeXBlcy5zbmFwcGVkTW91c2VNb3ZlLFxuICAgICAgICAgIHtzbmFwcGVkVGltZTogdGhpcy5tb3VzZV9zbmFwcGVkX3RpbWUuY2xvbmUoKX0sXG4gICAgICAgICAgbnVsbFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB0aW1lYmFyRm9ybWF0LFxuICAgICAgY29tcG9uZW50SWQsXG4gICAgICBzaGFsbG93VXBkYXRlQ2hlY2ssXG4gICAgICBmb3JjZVJlZHJhd0Z1bmMsXG4gICAgICBib3R0b21SZXNvbHV0aW9uLFxuICAgICAgdG9wUmVzb2x1dGlvblxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZGl2Q3NzQ2xhc3MgPSBgcmN0OWstdGltZWxpbmUtZGl2IHJjdDlrLXRpbWVsaW5lLXNjcm9sbCByY3Q5ay1pZC0ke2NvbXBvbmVudElkfWA7XG4gICAgbGV0IHZhclRpbWViYXJQcm9wcyA9IHt9O1xuICAgIGlmICh0aW1lYmFyRm9ybWF0KSB2YXJUaW1lYmFyUHJvcHNbJ3RpbWVGb3JtYXRzJ10gPSB0aW1lYmFyRm9ybWF0O1xuICAgIGlmIChib3R0b21SZXNvbHV0aW9uKSB2YXJUaW1lYmFyUHJvcHNbJ2JvdHRvbV9yZXNvbHV0aW9uJ10gPSBib3R0b21SZXNvbHV0aW9uO1xuICAgIGlmICh0b3BSZXNvbHV0aW9uKSB2YXJUaW1lYmFyUHJvcHNbJ3RvcF9yZXNvbHV0aW9uJ10gPSB0b3BSZXNvbHV0aW9uO1xuXG4gICAgZnVuY3Rpb24gY29sdW1uV2lkdGgod2lkdGgpIHtcbiAgICAgIHJldHVybiAoe2luZGV4fSkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IDApIHJldHVybiAwO1xuICAgICAgICByZXR1cm4gd2lkdGg7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZUhlaWdodChoZWlnaHQpIHtcbiAgICAgIC8vIHdoZW4gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgZm9yIHRoZSBmaXJzdCB0aW1lLCB0aGUgdGltZWJhciBpcyBub3QgeWV0IHJlbmRlcmVkXG4gICAgICBsZXQgdGltZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5yY3Q5ay1pZC0ke2NvbXBvbmVudElkfSAucmN0OWstdGltZWJhcmApO1xuICAgICAgaWYgKCF0aW1lYmFyKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgLy8gc3Vic3RyYWN0IHRpbWViYXIgaGVpZ2h0IGZyb20gdG90YWwgaGVpZ2h0XG4gICAgICBjb25zdCB0aW1lYmFySGVpZ2h0ID0gdGltZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoaGVpZ2h0IC0gdGltZWJhckhlaWdodCwgMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2RpdkNzc0NsYXNzfT5cbiAgICAgICAgICA8QXV0b1NpemVyIGNsYXNzTmFtZT1cInJjdDlrLWF1dG9zaXplclwiIG9uUmVzaXplPXt0aGlzLnJlZnJlc2hHcmlkfT5cbiAgICAgICAgICAgIHsoe3dpZHRofSkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcmVudC1kaXZcIj5cbiAgICAgICAgICAgICAgICA8U2VsZWN0Qm94IHJlZj17dGhpcy5zZWxlY3RfcmVmX2NhbGxiYWNrfSAvPlxuICAgICAgICAgICAgICAgIDxUaW1lYmFyIHN0YXJ0PXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX0gZW5kPXt0aGlzLnByb3BzLmVuZERhdGV9IHdpZHRoPXt3aWR0aH0gey4uLnZhclRpbWViYXJQcm9wc30gLz5cbiAgICAgICAgICAgICAgICA8VGltZWxpbmVCb2R5XG4gICAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgICAgICAgICBjb2x1bW5XaWR0aD17Y29sdW1uV2lkdGgod2lkdGgpfVxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtjYWxjdWxhdGVIZWlnaHQodGhpcy5wcm9wcy5pdGVtSGVpZ2h0KX1cbiAgICAgICAgICAgICAgICAgIHJvd0hlaWdodD17dGhpcy5yb3dIZWlnaHR9XG4gICAgICAgICAgICAgICAgICByb3dDb3VudD17dGhpcy5wcm9wcy5ncm91cHMubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgY2VsbFJlbmRlcmVyPXt0aGlzLmNlbGxSZW5kZXJlcih0aGlzLmdldFRpbWVsaW5lV2lkdGgod2lkdGgpKX1cbiAgICAgICAgICAgICAgICAgIGdyaWRfcmVmX2NhbGxiYWNrPXt0aGlzLmdyaWRfcmVmX2NhbGxiYWNrfVxuICAgICAgICAgICAgICAgICAgc2hhbGxvd1VwZGF0ZUNoZWNrPXtzaGFsbG93VXBkYXRlQ2hlY2t9XG4gICAgICAgICAgICAgICAgICBmb3JjZVJlZHJhd0Z1bmM9e2ZvcmNlUmVkcmF3RnVuY31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9BdXRvU2l6ZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG4iXX0=