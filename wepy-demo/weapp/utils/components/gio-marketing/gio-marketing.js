"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

gioGlobal.__growing__ || console.error("未加载 gio SDK");
var gio = gioGlobal.__growing__.gio,
    growingio = gioGlobal.__growing__.growingio,
    gioEmitter = gioGlobal.__growing__.gioEmitter,
    userStorage = gioGlobal.__growing__.userStorage;

function getParameterByName(e, t) {
  if ("string" != typeof t) return;
  "?" !== t[0] && (t = "?" + t), e = e.replace(/[\[\]]/g, "\\$&");
  var s = RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
  return s ? s[2] ? decodeURIComponent(s[2].replace(/\+/g, " ")) : "" : null;
}

!growingio.marketingHost && (growingio.marketingHost = "https://messages.growingio.com");

var StatusStorage =
/*#__PURE__*/
function () {
  function StatusStorage(e) {
    _classCallCheck(this, StatusStorage);

    this.namespace = e;
  }

  _createClass(StatusStorage, [{
    key: "_getOldkey",
    value: function _getOldkey(e) {
      return "#" + this.namespace + "#" + e;
    }
  }, {
    key: "_key",
    value: function _key(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      return "#" + this.namespace + "#" + e + "_" + t;
    }
  }, {
    key: "_get",
    value: function _get(e, t) {
      var s = this._getOldkey(e),
          i = wx.getStorageSync(s);

      if (i) return wx.removeStorageSync(s), JSON.parse(i);
      var a = wx.getStorageSync(this._key(e, t));
      return !!a && JSON.parse(a);
    }
  }, {
    key: "_set",
    value: function _set(e, t, s) {
      wx.setStorageSync(this._key(e, t), JSON.stringify(s));
    }
  }, {
    key: "get",
    value: function get(e, t) {
      var s = this._get(e, t),
          i = {
        showTimes: 0,
        showDate: Date.now()
      };

      if (s) {
        var a = _objectSpread({}, i, {}, s);

        return this._set(e, t, a), a;
      }

      return this._set(e, t, i), i;
    }
  }, {
    key: "plus",
    value: function plus(e, t, s, i) {
      var a = this.get(e, t);
      a[s] = a[s] + i, this._set(e, t, a);
    }
  }, {
    key: "plusShowTimes",
    value: function plusShowTimes(e, t, s) {
      this.plus(e, t, "showTimes", s);
    }
  }, {
    key: "plusShowDate",
    value: function plusShowDate(e, t, s) {
      var i = this.get(e, t),
          a = new Date(Date.now() + s);
      a.setHours(0), a.setMinutes(0), a.setSeconds(0), i.showDate = a.getTime(), this._set(e, t, i);
    }
  }]);

  return StatusStorage;
}();

var Marketing =
/*#__PURE__*/
function () {
  function Marketing() {
    _classCallCheck(this, Marketing);

    console.log("Marketing 引入成功。请继续使用<gio-marketing />集成在您需要的页面中."), this.isInit = !1, this.statusStorage = new StatusStorage("push-status"), this.timer = null, this.isPreview = !1, this.isRequested = !1, this.isDispatching = !1, this.listener = null, this.fetchedMessages = [], this.renderQueue = [], this.unResolvedEvents = [], this.handleCS1 = this.handleCS1.bind(this), this.handleClearCs1 = this.handleClearCs1.bind(this), this.handleEvent = this.handleEvent.bind(this), this.addGlobalEventListener();
  }

  _createClass(Marketing, [{
    key: "init",
    value: function init() {
      console.log("gio-marketing 集成成功！初始化中…"), this.isInit = !0, this.addEventListener();
    }
  }, {
    key: "update",
    value: function update() {
      this.refetchPushMessage();
    }
  }, {
    key: "disabled",
    value: function disabled() {
      this.resetState(), this.setPreviewState(!1);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.disabled(), this.isInit = !1, this.removeEventListener();
    }
  }, {
    key: "addGlobalEventListener",
    value: function addGlobalEventListener() {
      gioEmitter.on("setCs1", this.handleCS1), gioEmitter.on("clearCs1", this.handleClearCs1);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      gioEmitter.on("appOpen", this.handleEvent), gioEmitter.on("upload", this.handleEvent);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {
      gioEmitter.off("appOpen", this.handleEvent), gioEmitter.off("upload", this.handleEvent);
    }
  }, {
    key: "addComponentListener",
    value: function addComponentListener(e) {
      this.listener = e;
    }
  }, {
    key: "removeComponentListener",
    value: function removeComponentListener() {
      this.listener = null;
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this.timer = null, this.isRequested = !1, this.isDispatching = !1, this.renderQueue = [], this.clearFetchedMessages(), this.clearUnResolvedEvents();
    }
  }, {
    key: "getPreviewState",
    value: function getPreviewState() {
      return this.isPreview;
    }
  }, {
    key: "setPreviewState",
    value: function setPreviewState(e) {
      this.isPreview = e;
    }
  }, {
    key: "gatherUnResolvedEvents",
    value: function gatherUnResolvedEvents(e) {
      this.unResolvedEvents.push(e);
    }
  }, {
    key: "clearUnResolvedEvents",
    value: function clearUnResolvedEvents() {
      this.unResolvedEvents = [];
    }
  }, {
    key: "clearFetchedMessages",
    value: function clearFetchedMessages() {
      this.fetchedMessages = [];
    }
  }, {
    key: "formatUrl",
    value: function formatUrl() {
      var e = userStorage.get("bu"),
          t = userStorage.get("bcs"),
          s = growingio.info.uid,
          i = gio("getUserId");
      var a = "".concat(growingio.marketingHost, "/v1/").concat(growingio.vdsConfig.projectId, "/notifications?url_scheme=").concat(growingio.vdsConfig.appId);
      return a += e ? "&bu=".concat(e) : s ? "&u=".concat(s) : "", a += t ? "&bcs=".concat(t) : i ? "&cs=".concat(i) : "";
    }
  }, {
    key: "fetchPushMessage",
    value: function fetchPushMessage() {
      var _this = this;

      var e = this.formatUrl(),
          t = Date.now();
      wx.request({
        url: e,
        success: function success(e) {
          var s = Date.now();
          userStorage.set("bcs", e.data.idMappings.bcs), userStorage.set("bu", e.data.idMappings.bu), _this.fetchedMessages = (e.data.popupWindows || []).sort(function (e, t) {
            return t.updateAt > e.updateAt ? 1 : -1;
          }), s - t > 5e3 && _this.clearUnResolvedEvents(), _this.consumeUnResolvedEvents();
        },
        fail: function fail() {
          _this.clearUnResolvedEvents();
        },
        complete: function complete() {
          _this.isRequested = !0;
        }
      });
    }
  }, {
    key: "fetchPreviewPushMessage",
    value: function fetchPreviewPushMessage(e) {
      var _this2 = this;

      var t = "".concat(growingio.marketingHost, "/v1/").concat(growingio.vdsConfig.projectId, "/notifications/preview?url_scheme=").concat(growingio.vdsConfig.appId, "&message_id=").concat(e);
      wx.request({
        url: t,
        success: function success(e) {
          _this2.triggerListener(e.data.popupWindows[0]);
        }
      });
    }
  }, {
    key: "refetchPushMessage",
    value: function refetchPushMessage() {
      var _this3 = this;

      this.isRequested = !1, this.clearFetchedMessages(), this.fetchPushMessage(), this.timer = setTimeout(function () {
        _this3.refetchPushMessage();
      }, 18e5);
    }
  }, {
    key: "consumeUnResolvedEvents",
    value: function consumeUnResolvedEvents(e) {
      var _this4 = this;

      var t = function t(e) {
        if ("cstm" === e.t && !e.n.startsWith("in_app_message_")) {
          var _t = _this4.getValidMessages(e, _this4.fetchedMessages);

          _t && _t.length && (_this4.renderQueue.push(_t[0]), _this4.dispatchMessage());
        }
      };

      if (e) t(e);else for (; this.unResolvedEvents.length > 0 && this.fetchedMessages.length > 0;) {
        t(this.unResolvedEvents.shift());
      }
    }
  }, {
    key: "consumeNextMessage",
    value: function consumeNextMessage() {
      this.isDispatching = !1, this.dispatchMessage();
    }
  }, {
    key: "dispatchMessage",
    value: function dispatchMessage() {
      if (!this.isDispatching) {
        this.isDispatching = !0;
        var e = this.renderQueue.shift();
        this.triggerListener(e);
      }
    }
  }, {
    key: "triggerListener",
    value: function triggerListener(e) {
      e && this.listener && this.listener(e);
    }
  }, {
    key: "getValidMessages",
    value: function getValidMessages(e, t) {
      var _this5 = this;

      var s = userStorage.get("cs1");
      return t.filter(function (t) {
        return _this5.validActionType(t, e);
      }).filter(function (e) {
        return _this5.validTimeRange(e);
      }).filter(function (e) {
        return _this5.validateTimes(e, s);
      }).filter(function (e) {
        return _this5.validateTriggerCd(e, s);
      });
    }
  }, {
    key: "validActionType",
    value: function validActionType(e, t) {
      return t.n === e.rule.action;
    }
  }, {
    key: "validTimeRange",
    value: function validTimeRange(e) {
      var t = Date.now();
      return t >= (e.rule.startAt || 0) && (e.rule.endAt || t + 1) > t;
    }
  }, {
    key: "validateTriggerCd",
    value: function validateTriggerCd(e, t) {
      return this.statusStorage.get(e.id, t).showDate < Date.now();
    }
  }, {
    key: "validateTimes",
    value: function validateTimes(e, t) {
      var s = this.statusStorage.get(e.id, t).showTimes;
      return e.rule.limit > s;
    }
  }, {
    key: "onTrackImp",
    value: function onTrackImp(e) {
      if (!this.getPreviewState()) {
        var t = userStorage.get("cs1");
        gio("track", "in_app_message_imp", {
          in_app_message_name: e.name
        }), this.statusStorage.plusShowTimes(e.id, t, 1), this.statusStorage.plusShowDate(e.id, t, 1e3 * e.rule.triggerCd);
      }
    }
  }, {
    key: "onCloseWindow",
    value: function onCloseWindow(e) {
      this.getPreviewState() || (gio("track", "in_app_message_close", {
        in_app_message_name: e.name
      }), this.consumeNextMessage());
    }
  }, {
    key: "onClickTarget",
    value: function onClickTarget(e) {
      if (!this.getPreviewState()) {
        var _t2 = userStorage.get("cs1");

        gio("track", "in_app_message_cmp_click", {
          in_app_message_name: e.name
        }), this.statusStorage.plusShowTimes(e.id, _t2, 5e3);
      }

      var t = e.contentMetadata.components[0].config.target["growing.".concat(growingio.vdsConfig.appId)];
      t && this.navigateTo(t);
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(e) {
      wx.navigateTo({
        url: e,
        fail: function fail() {
          wx.switchTab({
            url: e
          });
        }
      });
    }
  }, {
    key: "handleCS1",
    value: function handleCS1(e) {
      e !== userStorage.get("cs1") && (userStorage.set("cs1", e), userStorage.set("bcs", void 0), this.isInit && this.refetchPushMessage());
    }
  }, {
    key: "handleClearCs1",
    value: function handleClearCs1() {
      userStorage.set("cs1", void 0), userStorage.set("bcs", void 0);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(e) {
      if (e) switch (e.t) {
        case "cstm":
          this.fetchedMessages.length ? this.consumeUnResolvedEvents(e) : this.isRequested || this.gatherUnResolvedEvents(e);
          break;

        case "page":
          if (!e.q) return;
          var t = getParameterByName("scene", e.q);
          if (!t) return;
          var s = getParameterByName("gioMessageId", t);
          if (!s) return;
          this.resetState(), this.setPreviewState(!0), this.fetchPreviewPushMessage(s);
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      return this.marketing || (this.marketing = new Marketing()), this.marketing;
    }
  }]);

  return Marketing;
}();

var marketing = Marketing.getInstance();
Component({
  data: {
    message: void 0,
    visible: !1
  },
  attached: function attached() {
    var _this6 = this;

    marketing.init(), marketing.addComponentListener(function (e) {
      _this6.setData({
        message: e,
        visible: !0
      });
    });
  },
  detached: function detached() {
    marketing.destroy(), marketing.removeComponentListener(), this.hideModal();
  },
  pageLifetimes: {
    show: function show() {
      marketing.update(), gioEmitter.emit("appOpen", {
        t: "cstm",
        n: "appOpen"
      });
    },
    hide: function hide() {
      marketing.disabled(), this.hideModal();
    }
  },
  methods: {
    onClickTarget: function onClickTarget() {
      this.hideModal(), marketing.onClickTarget(this.data.message);
    },
    onImageLoad: function onImageLoad() {
      marketing.onTrackImp(this.data.message);
    },
    onImageError: function onImageError() {
      this.hideModal(), marketing.consumeNextMessage();
    },
    handleClose: function handleClose() {
      this.hideModal(), marketing.onCloseWindow(this.data.message);
    },
    handleTouchMove: function handleTouchMove() {},
    hideModal: function hideModal() {
      this.setData({
        visible: !1
      });
    }
  }
});