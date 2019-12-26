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
!growingio.marketingHost && (growingio.marketingHost = "https://messages.growingio.com");
var bannerStore = {
  namespace: "gio-banner",
  key: function key(e, r) {
    return "#".concat(this.namespace, "#").concat(e, "#").concat(r || "");
  },
  get: function get(e, r) {
    var t = wx.getStorageSync(this.key(e, r));
    return t ? JSON.parse(t) : void 0;
  },
  set: function set(e, r, t) {
    return wx.setStorageSync(this.key(e, r), JSON.stringify(t));
  }
},
    defaultMessage = {
  id: "",
  content: "",
  name: "",
  rule: {
    target: ""
  }
};

var GioBanner =
/*#__PURE__*/
function () {
  function GioBanner() {
    _classCallCheck(this, GioBanner);

    console.log("gio-banenr 代码已引入，请继续使用<gio-banner />的方式引入组件"), this.isInit = !1, this.bannerShowMap = {}, this.timer = null, this.listener = null, this.bannerKey = null, this.placeholderDrawable = null, this.errorReplaceDrawable = null, this.handleCS1 = this.handleCS1.bind(this), this.handleClearCs1 = this.handleClearCs1.bind(this), this.addGlobalEventListener();
  }

  _createClass(GioBanner, [{
    key: "init",
    value: function init() {
      console.log("gio-banner 集成成功，初始化中…"), this.isInit = !0;
    }
  }, {
    key: "update",
    value: function update(e) {
      this.bannerKey = e.bannerKey, this.placeholderDrawable = e.placeholderDrawable, this.errorReplaceDrawable = e.errorReplaceDrawable, this.refetchPushMessage();
    }
  }, {
    key: "disabled",
    value: function disabled() {
      this.resetState();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.disabled(), this.isInit = !1;
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this.timer = null, this.bannerKey = null, this.placeholderDrawable = null, this.errorReplaceDrawable = null;
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
    key: "addGlobalEventListener",
    value: function addGlobalEventListener() {
      gioEmitter.on("setCs1", this.handleCS1), gioEmitter.on("clearCs1", this.handleClearCs1);
    }
  }, {
    key: "triggerListener",
    value: function triggerListener(e) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      e && this.listener && this.listener(e, r);
    }
  }, {
    key: "formatUrl",
    value: function formatUrl() {
      var e = userStorage.get("bu"),
          r = userStorage.get("bcs"),
          t = growingio.info.uid,
          a = gio("getUserId");
      var s = "".concat(growingio.marketingHost, "/v1/").concat(growingio.vdsConfig.projectId, "/notifications?url_scheme=").concat(growingio.vdsConfig.appId);
      return s += e ? "&bu=".concat(e) : t ? "&u=".concat(t) : "", s += r ? "&bcs=".concat(r) : a ? "&cs=".concat(a) : "";
    }
  }, {
    key: "fetchPushMessage",
    value: function fetchPushMessage(e) {
      var _this = this;

      var r = this.formatUrl();
      return new Promise(function (t, a) {
        if (!e || "string" != typeof e) return a("请设置正确的bannerKey后重试！");
        wx.request({
          url: r,
          success: function success(r) {
            _this.updateUserStorage(r);

            var a = _this.formatResponse(r, e);

            t(a);
          },
          fail: function fail(e) {
            a(e);
          }
        });
      });
    }
  }, {
    key: "updateUserStorage",
    value: function updateUserStorage(e) {
      e && e.data && e.data.idMappings && (userStorage.set("bcs", e.data.idMappings.bcs), userStorage.set("bu", e.data.idMappings.bu));
    }
  }, {
    key: "formatResponse",
    value: function formatResponse(e, r) {
      if (!(e && e.data && e.data.banners && e.data.banners.length)) return {
        name: "",
        key: "",
        messages: []
      };
      var t = e.data.banners.find(function (e) {
        return e.key === r;
      }) || {},
          a = (t.messages || []).filter(this.validTimeRange).sort(this.sortMessages);
      return {
        name: t.name || "",
        key: t.key || "",
        messages: this.filterSameIndex(a)
      };
    }
  }, {
    key: "validTimeRange",
    value: function validTimeRange(e) {
      var r = Date.now();
      return r >= (e.rule.startAt || 0) && (e.rule.endAt || r + 1) > r;
    }
  }, {
    key: "sortMessages",
    value: function sortMessages(e, r) {
      return e.index !== r.index ? e.index - r.index : e.priority !== r.priority ? r.priority - e.priority : r.updateAt - e.updateAt;
    }
  }, {
    key: "filterSameIndex",
    value: function filterSameIndex(e) {
      var r = [];
      return e.forEach(function (e) {
        r.find(function (r) {
          return r.index === e.index;
        }) || r.push(e);
      }), r;
    }
  }, {
    key: "refetchPushMessage",
    value: function refetchPushMessage() {
      var _this2 = this;

      this.renderStoreMessages("default"), this.fetchPushMessage(this.bannerKey).then(function (e) {
        var r = e.messages;
        r.length && (_this2.updateStoreMessages(r), _this2.triggerListener(r));
      })["catch"](function (e) {
        console.log("banner数据请求失败：", e), _this2.renderStoreMessages("error");
      }), this.timer = setTimeout(function () {
        _this2.refetchPushMessage();
      }, 18e5);
    }
  }, {
    key: "updateStoreMessages",
    value: function updateStoreMessages(e) {
      var r = gio("getUserId");
      bannerStore.set(this.bannerKey, r, e);
    }
  }, {
    key: "renderStoreMessages",
    value: function renderStoreMessages() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";
      var r = userStorage.get("cs1"),
          t = bannerStore.get(this.bannerKey, r) || [],
          a = {
        error: this.renderErrorMessages,
        "default": this.renderDefaultMessages
      };
      t.length ? this.triggerListener(t) : a[e].call(this);
    }
  }, {
    key: "renderDefaultMessages",
    value: function renderDefaultMessages() {
      this.placeholderDrawable ? this.triggerListener([_objectSpread({}, defaultMessage, {
        id: "default",
        name: "default",
        content: this.placeholderDrawable
      })]) : this.triggerListener([], !1);
    }
  }, {
    key: "renderErrorMessages",
    value: function renderErrorMessages() {
      this.errorReplaceDrawable ? this.triggerListener([_objectSpread({}, defaultMessage, {
        id: "default",
        name: "default",
        content: this.errorReplaceDrawable
      })]) : this.triggerListener([], !1);
    }
  }, {
    key: "signBannerShow",
    value: function signBannerShow(e) {
      e && "default" !== e.id && !this.bannerShowMap[e.id] && (this.bannerShowMap[e.id] = !0, this.onTrackImp(e, this.bannerKey));
    }
  }, {
    key: "onTrackImp",
    value: function onTrackImp(e, r) {
      gio("track", "in_app_message_imp", this.gatherTrackParams(e, r));
    }
  }, {
    key: "gatherTrackParams",
    value: function gatherTrackParams(e, r) {
      return {
        in_app_message_name: e.name,
        gio_message_type: "banner",
        gio_message_id: e.id,
        gio_message_index: e.index,
        gio_campaign_key: r
      };
    }
  }, {
    key: "onClickTarget",
    value: function onClickTarget(e) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bannerKey;
      if ("default" === e.id) return;
      gio("track", "in_app_message_cmp_click", this.gatherTrackParams(e, r));
      var t = e.rule.target;
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
  }], [{
    key: "getInstance",
    value: function getInstance() {
      return this.gioBanner || (this.gioBanner = new GioBanner()), this.gioBanner;
    }
  }]);

  return GioBanner;
}();

var gioBanner = GioBanner.getInstance();
gioGlobal.getBannerMessages = function (e) {
  return gioBanner.fetchPushMessage(e).then(function (r) {
    return _objectSpread({}, r, {
      messages: r.messages.map(function (r) {
        return {
          id: r.id,
          index: r.index,
          name: r.name || "",
          imageUrl: r.content || "",
          summary: r.summary || "",
          onShow: function onShow() {
            gioBanner.onTrackImp(r, e);
          },
          onClick: function onClick() {
            gioBanner.onClickTarget(r, e);
          }
        };
      })
    });
  });
}, Component({
  properties: {
    bannerKey: String,
    indicatorDots: Boolean,
    indicatorColor: String,
    indicatorActiveColor: String,
    autoplay: Boolean,
    interval: Number,
    duration: Number,
    circular: Boolean,
    vertical: Boolean,
    previousMargin: String,
    nextMargin: String,
    easingFunction: String,
    placeholderDrawable: String,
    errorReplaceDrawable: String
  },
  data: {
    bannerMessages: void 0,
    visible: !0
  },
  attached: function attached() {
    var _this3 = this;

    gioBanner.init(), gioBanner.addComponentListener(function (e, r) {
      _this3.setData({
        bannerMessages: e,
        visible: r
      });
    });
  },
  detached: function detached() {
    gioBanner.destroy(), gioBanner.removeComponentListener();
  },
  pageLifetimes: {
    show: function show() {
      gioBanner.update({
        bannerKey: this.properties.bannerKey,
        placeholderDrawable: this.properties.placeholderDrawable,
        errorReplaceDrawable: this.properties.errorReplaceDrawable
      });
    },
    hide: function hide() {
      gioBanner.disabled();
    }
  },
  methods: {
    onClickTarget: function onClickTarget(e) {
      gioBanner.onClickTarget(e.target.dataset.message);
    },
    onSwiperChange: function onSwiperChange(e) {
      var r = e.detail.current,
          t = this.data.bannerMessages.find(function (e, t) {
        return t === r;
      });
      gioBanner.signBannerShow(t);
    },
    onImageLoaded: function onImageLoaded(e) {
      0 === e.target.dataset.current && gioBanner.signBannerShow(e.target.dataset.message);
    },
    onImageError: function onImageError(e) {
      var r = e.target.dataset.message.id,
          t = this.data.bannerMessages.filter(function (e) {
        return e.id !== r;
      });
      t.length ? this.setData({
        bannerMessages: t
      }) : gioBanner.renderErrorMessages();
    }
  }
});