"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.growingio = exports.gioEmitter = exports.GioPage = exports.GioComponent = exports.GioBehavior = exports.GioApp = exports["default"] = void 0;

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Utils = {
  devVer: 1,
  guid: function guid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
      var e = 16 * Math.random() | 0;
      return ("x" == t ? e : 3 & e | 8).toString(16);
    });
  },
  getScreenHeight: function getScreenHeight(t) {
    return t.pixelRatio ? Math.round(t.screenHeight * t.pixelRatio) : t.screenHeight;
  },
  getScreenWidth: function getScreenWidth(t) {
    return t.pixelRatio ? Math.round(t.screenWidth * t.pixelRatio) : t.screenWidth;
  },
  getOS: function getOS(t) {
    if (t) {
      var e = t.toLowerCase();
      return -1 != e.indexOf("android") ? "".concat(gioGlobal.platformConfig.name, "-Android") : -1 != e.indexOf("ios") ? "".concat(gioGlobal.platformConfig.name, "-iOS") : t;
    }
  },
  getOSV: function getOSV(t) {
    return "".concat(gioGlobal.platformConfig.name, " ").concat(t);
  },
  isEmpty: function isEmpty(t) {
    for (var e in t) {
      if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    }

    return !0;
  },
  compareVersion: function compareVersion(t, e) {
    t = t.split("."), e = e.split(".");
    var n = Math.max(t.length, e.length);

    for (; n > t.length;) {
      t.push("0");
    }

    for (; n > e.length;) {
      e.push("0");
    }

    for (var i = 0; n > i; i++) {
      var _n = parseInt(t[i]),
          o = parseInt(e[i]);

      if (_n > o) return 1;
      if (o > _n) return -1;
    }

    return 0;
  }
},
    initGlobal = function initGlobal(t) {
  Object.defineProperty(Object.prototype, "gioGlobal", {
    get: function get() {
      return "quickApp" === t ? global.__proto__ : "my" === t ? $global : global;
    },
    configurable: !1,
    enumerable: !1
  });
},
    getDataByPath = function getDataByPath(t, e) {
  if (!t) return t;
  var n = e.split(".");
  var i = t[n.shift()];

  for (var _t = 0, _e = n.length; _e > _t; _t++) {
    var _t2 = n.shift();

    if (!i) return i;
    i = i[_t2];
  }

  return i;
},
    getManualImpInfo = function getManualImpInfo(t) {
  var e = {
    eventId: void 0,
    properties: {}
  };

  try {
    if (t.hasOwnProperty("gioTrack") && "object" == _typeof(t.gioTrack)) return e.eventId = t.gioTrack.name, e.properties = t.gioTrack.properties, e;
    if (!t.gioImpTrack) return e;
    e.eventId = t.gioImpTrack;
    var n = /^gioTrack(.+)/;

    for (var i in t) {
      var o = void 0,
          s = i.match(n);
      s && ("track" === (o = s[1].toLowerCase()) ? e.eventId = t[i] : e.properties[o] = t[i]);
    }
  } catch (t) {
    console.warn("半打点IMP格式不正确, 请参考文档");
  }

  return e;
};

if (!Object.hasOwnProperty("getOwnPropertyDescriptors")) {
  var t;
  t = "object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.ownKeys ? Reflect.ownKeys : "function" == typeof Object.getOwnPropertySymbols ? function (t) {
    return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
  } : Object.getOwnPropertyNames, Object.defineProperty(Object, "getOwnPropertyDescriptors", {
    configurable: !0,
    writable: !0,
    value: function value(e) {
      return t(e).reduce(function (t, n) {
        return Object.defineProperty(t, n, {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: Object.getOwnPropertyDescriptor(e, n)
        });
      }, {});
    }
  });
}

var setShareResult = function setShareResult(t) {
  var e = VdsInstrumentAgent.observer.growingio;
  e && e.vdsConfig.followShare && t && t.path && (t.path = -1 === t.path.indexOf("?") ? t.path + "?suid=" + e.info.uid : t.path + "&suid=" + e.info.uid);
};

var VdsInstrumentAgent = {
  defaultPageCallbacks: {},
  defaultAppCallbacks: {},
  appHandlers: null,
  pageHandlers: null,
  actionEventTypes: null,
  originalPage: null,
  originalApp: null,
  originalComponent: null,
  originalBehavior: null,
  observer: null,
  hook: function hook(t, e) {
    return function () {
      var n,
          i = arguments ? arguments[0] : void 0;
      if (i && (i.currentTarget || i.target) && -1 != VdsInstrumentAgent.actionEventTypes.indexOf(i.type)) try {
        VdsInstrumentAgent.observer.actionListener(i, t);
      } catch (t) {
        console.error(t);
      }
      var o = gioGlobal.platformConfig.lisiteners.app,
          s = gioGlobal.platformConfig.lisiteners.page;

      if (this._growing_app_ && t !== o.appShow ? n = e.apply(this, arguments) : this._growing_page_ && -1 === [s.pageShow, s.pageClose, s.pageLoad, s.pageHide, s.tabTap].indexOf(t) ? n = e.apply(this, arguments) : this._growing_app_ || this._growing_page_ || (n = e.apply(this, arguments)), this._growing_app_ && -1 !== VdsInstrumentAgent.appHandlers.indexOf(t)) {
        try {
          VdsInstrumentAgent.defaultAppCallbacks[t].apply(this, arguments);
        } catch (t) {
          console.error(t);
        }

        t === o.appShow && (n = e.apply(this, arguments));
      }

      if (this._growing_page_ && -1 !== VdsInstrumentAgent.pageHandlers.indexOf(t)) {
        var _i = Array.prototype.slice.call(arguments);

        n && _i.push(n);

        try {
          VdsInstrumentAgent.defaultPageCallbacks[t].apply(this, _i);
        } catch (t) {
          console.error(t);
        }

        -1 !== [s.pageShow, s.pageClose, s.pageLoad, s.pageHide, s.tabTap].indexOf(t) ? n = e.apply(this, arguments) : setShareResult(n);
      }

      return n;
    };
  },
  hookComponent: function hookComponent(t, e) {
    return function () {
      var n,
          i = arguments ? arguments[0] : void 0;
      if (i && (i.currentTarget || i.target) && -1 != VdsInstrumentAgent.actionEventTypes.indexOf(i.type)) try {
        VdsInstrumentAgent.observer.actionListener(i, t);
      } catch (t) {
        console.error(t);
      }
      return n = e.apply(this, arguments);
    };
  },
  instrument: function instrument(t) {
    for (var e in t) {
      "function" == typeof t[e] && (t[e] = this.hook(e, t[e]));
    }

    return t._growing_app_ && VdsInstrumentAgent.appHandlers.map(function (e) {
      t[e] || (t[e] = VdsInstrumentAgent.defaultAppCallbacks[e]);
    }), t._growing_page_ && VdsInstrumentAgent.pageHandlers.map(function (e) {
      t[e] || e === gioGlobal.platformConfig.lisiteners.page.shareApp || (t[e] = VdsInstrumentAgent.defaultPageCallbacks[e]);
    }), t;
  },
  instrumentPageComponent: function instrumentPageComponent(t) {
    if (t) return VdsInstrumentAgent.pageHandlers.map(function (e) {
      if ("function" == typeof t[e]) {
        var n = t[e];

        t[e] = function () {
          var t = n.apply(this, arguments);
          var i = Array.prototype.slice.call(arguments);
          return t && i.push(t), VdsInstrumentAgent.observer.pageListener(this, e, i), e === gioGlobal.platformConfig.lisiteners.page.shareApp && setShareResult(t), t;
        };
      } else e !== gioGlobal.platformConfig.lisiteners.page.shareApp && (t[e] = function () {
        VdsInstrumentAgent.observer.pageListener(this, e, arguments);
      });
    }), t;
  },
  instrumentComponent: function instrumentComponent(t) {
    if (t.methods) {
      var e = t.methods;

      for (var n in e) {
        "function" == typeof e[n] && (t.methods[n] = this.hookComponent(n, e[n]));
      }
    }

    return t;
  },
  GrowingPage: function GrowingPage(t) {
    return t._growing_page_ = !0, VdsInstrumentAgent.originalPage(VdsInstrumentAgent.instrument(t));
  },
  GrowingComponent: function GrowingComponent(t) {
    return VdsInstrumentAgent.originalComponent(VdsInstrumentAgent.instrumentComponent(t));
  },
  GrowingBehavior: function GrowingBehavior(t) {
    return VdsInstrumentAgent.originalBehavior(VdsInstrumentAgent.instrumentComponent(t));
  },
  GrowingApp: function GrowingApp(t) {
    return t._growing_app_ = !0, VdsInstrumentAgent.originalApp(VdsInstrumentAgent.instrument(t));
  },
  initPlatformInfo: function initPlatformInfo(t) {
    VdsInstrumentAgent.appHandlers = t.appHandlers, VdsInstrumentAgent.pageHandlers = t.pageHandlers, VdsInstrumentAgent.actionEventTypes = t.actionEventTypes, VdsInstrumentAgent.originalApp = t.originalApp, VdsInstrumentAgent.originalPage = t.originalPage, VdsInstrumentAgent.originalComponent = t.originalComponent, VdsInstrumentAgent.originalBehavior = t.originalBehavior;
  },
  initInstrument: function initInstrument(t) {
    if (VdsInstrumentAgent.initPlatformInfo(gioGlobal.platformConfig), VdsInstrumentAgent.observer = t, VdsInstrumentAgent.pageHandlers.forEach(function (t) {
      VdsInstrumentAgent.defaultPageCallbacks[t] = function () {
        VdsInstrumentAgent.observer.pageListener(this, t, arguments);
      };
    }), VdsInstrumentAgent.appHandlers.forEach(function (t) {
      VdsInstrumentAgent.defaultAppCallbacks[t] = function () {
        VdsInstrumentAgent.observer.appListener(this, t, arguments);
      };
    }), gioGlobal.platformConfig.canHook) {
      var _t3 = gioGlobal.platformConfig.hooks;
      _t3.App && !gioGlobal.growingAppInited && (App = function App() {
        return VdsInstrumentAgent.GrowingApp(arguments[0]);
      }, gioGlobal.growingAppInited = !0), _t3.Page && !gioGlobal.growingPageInited && (Page = function Page() {
        return VdsInstrumentAgent.GrowingPage(arguments[0]);
      }, gioGlobal.growingPageInited = !0), _t3.Component && !gioGlobal.growingComponentInited && (Component = function Component() {
        return VdsInstrumentAgent.GrowingComponent(arguments[0]);
      }, gioGlobal.growingComponentInited = !0), _t3.Behavior && !gioGlobal.growingBehaviorInited && (Behavior = function Behavior() {
        return VdsInstrumentAgent.GrowingBehavior(arguments[0]);
      }, gioGlobal.growingBehaviorInited = !0);
    }

    gioGlobal.GioPage = VdsInstrumentAgent.GrowingPage, gioGlobal.GioApp = VdsInstrumentAgent.GrowingApp, gioGlobal.GioComponent = VdsInstrumentAgent.GrowingComponent, gioGlobal.GioBehavior = VdsInstrumentAgent.GrowingBehavior, gioGlobal.trackApp = function () {
      var t = arguments[0];
      return t._growing_app_ = !0, VdsInstrumentAgent.instrument(t);
    }, gioGlobal.trackPage = function () {
      var t = arguments[0];
      return t._growing_page_ = !0, VdsInstrumentAgent.instrument(t);
    }, gioGlobal.trackComponent = function () {
      return VdsInstrumentAgent.instrument(arguments[0]);
    }, gioGlobal.trackBehavior = function () {
      return VdsInstrumentAgent.instrument(arguments[0]);
    };
  }
};

var Page$1 =
/*#__PURE__*/
function () {
  function Page$1() {
    _classCallCheck(this, Page$1);

    this.queries = {}, this.pvar = {};
  }

  _createClass(Page$1, [{
    key: "touch",
    value: function touch(t) {
      this.path = t.route, this.time = Date.now(), this.query = this.queries[t.route] ? this.queries[t.route] : void 0;
    }
  }, {
    key: "addQuery",
    value: function addQuery(t, e) {
      this.queries[t.route] = e ? this._getQuery(e) : null;
    }
  }, {
    key: "_getQuery",
    value: function _getQuery(t) {
      return Object.keys(t).filter(function (t) {
        return "wxShoppingListScene" !== t;
      }).map(function (e) {
        return "".concat(e, "=").concat(t[e]);
      }).join("&");
    }
  }, {
    key: "touchRelatedPvarData",
    value: function touchRelatedPvarData(t) {
      var e = "".concat(t.p, "?").concat(t.q);
      this.pvar[e] ? this.pvar[e].push(t) : this.pvar[e] = [t];
    }
  }]);

  return Page$1;
}();

var eventTypeMap = {
  tap: ["tap", "click"],
  longtap: ["longtap"],
  input: ["input"],
  blur: ["change", "blur"],
  submit: ["submit"],
  focus: ["focus"]
},
    fnExpRE = /^function[^\(]*\([^\)]+\).*[^\.]+\.([^\(]+)\(.*/;

function getComKey(t) {
  return t && t.$attrs ? t.$attrs.mpcomid : "0";
}

function isVmKeyMatchedCompkey(t, e, n) {
  return !(!t || !e) && (e === t || 0 === e.indexOf(t + n));
}

function getVM(t, e, n) {
  void 0 === e && (e = []);
  var i = e.slice(1);
  if (!i.length) return t;
  var o = i.join(n),
      s = "";
  return i.reduce(function (t, e) {
    for (var i = t.$children.length, r = 0; i > r; r++) {
      var a = t.$children[r],
          g = getComKey(a);
      if (s && (g = s + n + g), isVmKeyMatchedCompkey(g, o, n)) return s = g, t = a;
    }

    return t;
  }, t);
}

function _getHandle(t, e, n) {
  void 0 === n && (n = []);
  var i = [];
  if (!t || !t.tag) return i;
  var o = t || {},
      s = o.data;
  void 0 === s && (s = {});
  var r = o.children;
  void 0 === r && (r = []);
  var a = o.componentInstance;
  a ? Object.keys(a.$slots).forEach(function (t) {
    var o = a.$slots[t];
    (Array.isArray(o) ? o : [o]).forEach(function (t) {
      i = i.concat(_getHandle(t, e, n));
    });
  }) : r.forEach(function (t) {
    i = i.concat(_getHandle(t, e, n));
  });
  var g = s.attrs,
      l = s.on;
  return g && l && g.eventid === e && n.forEach(function (t) {
    var e = l[t];
    "function" == typeof e ? i.push(e) : Array.isArray(e) && (i = i.concat(e));
  }), i;
}

var ONCE = "~",
    CUSTOM = "^";

function isMatchEventType(t, e) {
  return t === e || "regionchange" === e && ("begin" === t || "end" === t);
}

var VueProxy =
/*#__PURE__*/
function () {
  function VueProxy(t) {
    _classCallCheck(this, VueProxy);

    this.vueVM = t;
  }

  _createClass(VueProxy, [{
    key: "getHandle",
    value: function getHandle(t) {
      var e = t.type,
          n = t.target;
      void 0 === n && (n = {});
      var i = (t.currentTarget || n).dataset;
      void 0 === i && (i = {});
      var o = i.comkey;
      void 0 === o && (o = "");
      var s = i.eventid;
      var r = -1 !== o.indexOf("_") ? "_" : ",";
      var a = getVM(this.vueVM, o.split(r), r);

      if (a) {
        var g = _getHandle(a._vnode, s, eventTypeMap[e] || [e]);

        if (g.length) {
          var l = g[0];
          if (l.isProxied) return l.proxiedName;

          try {
            var p = ("" + l).replace("\n", "");

            if (p.match(fnExpRE)) {
              var h = fnExpRE.exec(p);
              if (h && h.length > 1) return h[1];
            }
          } catch (t) {}

          return l.name;
        }
      }
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(t) {
      var e = t.type;
      var n;
      var i = (t.currentTarget || t.target).dataset;
      return (i.eventOpts || i["event-opts"]).forEach(function (t) {
        var i = t[0];
        var o = t[1];
        i = (i = i.charAt(0) === CUSTOM ? i.slice(1) : i).charAt(0) === ONCE ? i.slice(1) : i, o && isMatchEventType(e, i) && o.forEach(function (t) {
          n = t[0];
        });
      }), n;
    }
  }]);

  return VueProxy;
}();

function EventEmitter() {}

var proto = EventEmitter.prototype,
    originalGlobalValue = exports.EventEmitter;

function indexOfListener(t, e) {
  for (var n = t.length; n--;) {
    if (t[n].listener === e) return n;
  }

  return -1;
}

function alias(t) {
  return function () {
    return this[t].apply(this, arguments);
  };
}

function isValidListener(t) {
  return "function" == typeof t || t instanceof RegExp || !(!t || "object" != _typeof(t)) && isValidListener(t.listener);
}

proto.getListeners = function (t) {
  var e,
      n,
      i = this._getEvents();

  if (t instanceof RegExp) for (n in e = {}, i) {
    i.hasOwnProperty(n) && t.test(n) && (e[n] = i[n]);
  } else e = i[t] || (i[t] = []);
  return e;
}, proto.flattenListeners = function (t) {
  var e,
      n = [];

  for (e = 0; t.length > e; e += 1) {
    n.push(t[e].listener);
  }

  return n;
}, proto.getListenersAsObject = function (t) {
  var e,
      n = this.getListeners(t);
  return n instanceof Array && ((e = {})[t] = n), e || n;
}, proto.addListener = function (t, e) {
  if (!isValidListener(e)) throw new TypeError("listener must be a function");

  var n,
      i = this.getListenersAsObject(t),
      o = "object" == _typeof(e);

  for (n in i) {
    i.hasOwnProperty(n) && -1 === indexOfListener(i[n], e) && i[n].push(o ? e : {
      listener: e,
      once: !1
    });
  }

  return this;
}, proto.on = alias("addListener"), proto.addOnceListener = function (t, e) {
  return this.addListener(t, {
    listener: e,
    once: !0
  });
}, proto.once = alias("addOnceListener"), proto.defineEvent = function (t) {
  return this.getListeners(t), this;
}, proto.defineEvents = function (t) {
  for (var e = 0; t.length > e; e += 1) {
    this.defineEvent(t[e]);
  }

  return this;
}, proto.removeListener = function (t, e) {
  var n,
      i,
      o = this.getListenersAsObject(t);

  for (i in o) {
    o.hasOwnProperty(i) && -1 !== (n = indexOfListener(o[i], e)) && o[i].splice(n, 1);
  }

  return this;
}, proto.off = alias("removeListener"), proto.addListeners = function (t, e) {
  return this.manipulateListeners(!1, t, e);
}, proto.removeListeners = function (t, e) {
  return this.manipulateListeners(!0, t, e);
}, proto.manipulateListeners = function (t, e, n) {
  var i,
      o,
      s = t ? this.removeListener : this.addListener,
      r = t ? this.removeListeners : this.addListeners;
  if ("object" != _typeof(e) || e instanceof RegExp) for (i = n.length; i--;) {
    s.call(this, e, n[i]);
  } else for (i in e) {
    e.hasOwnProperty(i) && (o = e[i]) && ("function" == typeof o ? s.call(this, i, o) : r.call(this, i, o));
  }
  return this;
}, proto.removeEvent = function (t) {
  var e,
      n = _typeof(t),
      i = this._getEvents();

  if ("string" === n) delete i[t];else if (t instanceof RegExp) for (e in i) {
    i.hasOwnProperty(e) && t.test(e) && delete i[e];
  } else delete this._events;
  return this;
}, proto.removeAllListeners = alias("removeEvent"), proto.emitEvent = function (t, e) {
  var n,
      i,
      o,
      s,
      r = this.getListenersAsObject(t);

  for (s in r) {
    if (r.hasOwnProperty(s)) for (n = r[s].slice(0), o = 0; n.length > o; o++) {
      !0 === (i = n[o]).once && this.removeListener(t, i.listener), i.listener.apply(this, e || []) === this._getOnceReturnValue() && this.removeListener(t, i.listener);
    }
  }

  return this;
}, proto.trigger = alias("emitEvent"), proto.emit = function (t) {
  var e = Array.prototype.slice.call(arguments, 1);
  return this.emitEvent(t, e);
}, proto.setOnceReturnValue = function (t) {
  return this._onceReturnValue = t, this;
}, proto._getOnceReturnValue = function () {
  return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue;
}, proto._getEvents = function () {
  return this._events || (this._events = {});
}, EventEmitter.noConflict = function () {
  return exports.EventEmitter = originalGlobalValue, EventEmitter;
};
var gioEmitter = new EventEmitter();

function validVar(t) {
  return null !== t && "[object Object]" === Object.prototype.toString.call(t) && Object.keys(t).length > 0;
}

var CLICK_TYPE = {
  tap: "clck",
  longpress: "lngprss",
  longtap: "lngprss"
};

var Observer =
/*#__PURE__*/
function () {
  function Observer(t) {
    _classCallCheck(this, Observer);

    this.growingio = t, this.info = t.info, this.currentPage = new Page$1(), this.scene = null, this._sessionId = null, this.cs1 = null, this.lastPageEvent = null, this.lastVstArgs = void 0, this.lastCloseTime = null, this.lastScene = void 0, this.keepAlive = t.vdsConfig.keepAlive, this.isPauseSession = !1, this.isGettingUid = !1, this.esid = this.info.esid, this.uploadingMessages = [];
  }

  _createClass(Observer, [{
    key: "resetSessionId",
    value: function resetSessionId() {
      this._sessionId = null;
    }
  }, {
    key: "pauseSession",
    value: function pauseSession() {
      this.isPauseSession = !0;
    }
  }, {
    key: "getVisitorId",
    value: function getVisitorId() {
      return this.info.uid;
    }
  }, {
    key: "getUserId",
    value: function getUserId() {
      return this.cs1;
    }
  }, {
    key: "getGioInfo",
    value: function getGioInfo() {
      return "giou=".concat(this.getVisitorId(), "&giocs1=").concat(this.getUserId(), "&gios=").concat(this.sessionId, "&gioprojectid=").concat(this.growingio.vdsConfig.projectId, "&gioappid=").concat(this.growingio.vdsConfig.appId, "&gioplatform=").concat(gioGlobal.platformConfig.platform);
    }
  }, {
    key: "setUserId",
    value: function setUserId(t) {
      var e = t + "";
      e && 100 > e.length && (this.cs1 = e, gioEmitter.emitEvent("setCs1", [e]), this.lastPageEvent && this._sendEvent(this.lastPageEvent));
    }
  }, {
    key: "clearUserId",
    value: function clearUserId() {
      this.cs1 = null, gioEmitter.emitEvent("clearCs1");
    }
  }, {
    key: "appListener",
    value: function appListener(t, e, n) {
      var i = gioGlobal.platformConfig.lisiteners.app;
      this.isPauseSession || (this.growingio.vdsConfig.debug && console.log("App.", e, Date.now()), e == i.appShow ? (gioEmitter.emitEvent("appShow"), this._parseScene(n), !this.lastCloseTime || Date.now() - this.lastCloseTime > this.keepAlive || this.lastScene && this.scene !== this.lastScene ? (this.resetSessionId(), this.sendVisitEvent(n, this.growingio.vdsConfig.getLocation.type), this.lastVstArgs = n, this.useLastPageTime = !1, this.lastPageEvent = void 0) : this.lastPageEvent && (this.useLastPageTime = !0)) : e == i.appClose ? (this.lastScene = this.scene, this.growingio.forceFlush(), this.info.syncStorage(), this.isPauseSession || (this.lastCloseTime = Date.now(), this.sendVisitCloseEvent())) : e == i.appError && this.sendErrorEvent(n));
    }
  }, {
    key: "pageListener",
    value: function pageListener(t, e, n) {
      var i = gioGlobal.platformConfig.lisiteners.page;

      if (this.growingio.vdsConfig.wepy && (t.route = t.$is), t.route || (t.route = this.info.getPagePath(t)), this.growingio.vdsConfig.debug && console.log("Page.", t.route, "#", e, Date.now()), e === i.pageShow) {
        var _e2 = getDataByPath(t, "$page.query");

        Utils.isEmpty(_e2) || "quickApp" !== gioGlobal.gio__platform || this.currentPage.addQuery(t, _e2), this.isPauseSession ? this.isPauseSession = !1 : (this.currentPage.touch(t), this.useLastPageTime && (this.currentPage.time = this.lastPageEvent.tm, this.useLastPageTime = !1), this.sendPage(t));
      } else if (e === i.pageLoad) {
        var _e3 = n[0];
        Utils.isEmpty(_e3) || "quickApp" === gioGlobal.gio__platform || this.currentPage.addQuery(t, _e3);
      } else if (e === i.pageHide) this.growingio._observer && this.growingio._observer.disconnect();else if (e === i.pageClose) this.currentPage.pvar["".concat(this.currentPage.path, "?").concat(this.currentPage.query)] = void 0;else if (e === i.shareApp) {
        var _e4 = null,
            _i2 = null;
        2 > n.length ? 1 === n.length && (n[0].from ? _e4 = n[0] : n[0].title && (_i2 = n[0])) : (_e4 = n[0], _i2 = n[1]), this.pauseSession(), this.sendPageShare(t, _e4, _i2);
      } else if ("onTabItemTap" === e) {
        this.sendTabClick(n[0]);
      }
    }
  }, {
    key: "actionListener",
    value: function actionListener(t, e) {
      if (getDataByPath(t, "currentTarget.dataset.growingIgnore") || getDataByPath(t, "target.dataset.growingIgnore")) return;
      var n = gioGlobal.platformConfig.lisiteners.actions;

      if ("_cmlEventProxy" !== e) {
        if ("handleProxy" === e && this.growingio.vueRootVMs && this.growingio.vueRootVMs[this.currentPage.path]) {
          var _n2 = new VueProxy(this.growingio.vueRootVMs[this.currentPage.path]).getHandle(t);

          _n2 && (e = _n2);
        }

        if ("__e" === e && this.growingio.vueRootVMs && this.growingio.vueRootVMs[this.currentPage.path]) {
          var _n3 = new VueProxy(this.growingio.vueRootVMs[this.currentPage.path]).handleEvent(t);

          _n3 && (e = _n3);
        }

        if ("_proxy" === e && this.growingio.wepyRootVMs) {
          var _n4 = t.currentTarget.dataset.wpyEvt,
              i = t.type;
          getDataByPath(this, "growingio.wepyRootVMs.".concat(_n4, ".").concat(i)) && (e = this.growingio.wepyRootVMs[_n4][i]);
        }

        getDataByPath(this, "growingio.taroRootVMs.".concat(e)) && (e = this.growingio.taroRootVMs[e]), this.growingio.vdsConfig.debug && console.log("Click on ", e, Date.now()), -1 !== n.click.indexOf(t.type) ? (this.sendClick(t, e), "getuserinfo" === t.type && getDataByPath(t, "detail.userInfo") && this.setVisitor(t.detail.userInfo)) : -1 !== n.change.indexOf(t.type) ? this.sendChange(t, e) : -1 !== n.submit.indexOf(t.type) && this.sendSubmit(t, e);
      }
    }
  }, {
    key: "sendVideoCstm",
    value: function sendVideoCstm(t) {
      this.track("video-".concat(t.type), t["var"]);
    }
  }, {
    key: "track",
    value: function track(t, e) {
      if ("string" != typeof t || null === t || void 0 === t || 0 === t.length) return;
      var n = {
        t: "cstm",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query,
        n: t
      };
      validVar(e) && (n["var"] = e), this._sendEvent(n);
    }
  }, {
    key: "identify",
    value: function identify(t, e) {
      if (void 0 === t || 0 === t.length) return;
      this.growingio.login(t), this._sendEvent({
        t: "vstr",
        "var": {
          openid: t,
          unionid: e
        }
      });
    }
  }, {
    key: "setVisitor",
    value: function setVisitor(t) {
      if (validVar(t)) {
        this._sendEvent({
          t: "vstr",
          "var": t
        });
      }
    }
  }, {
    key: "setUser",
    value: function setUser(t) {
      if (this.cs1 && validVar(t)) {
        this._sendEvent({
          t: "ppl",
          "var": t
        });
      }
    }
  }, {
    key: "setPage",
    value: function setPage(t) {
      if (validVar(t)) {
        var e = {
          t: "pvar",
          ptm: this.currentPage.time,
          p: this.currentPage.path,
          q: this.currentPage.query,
          "var": t
        };
        this.currentPage.touchRelatedPvarData(e), this._sendEvent(e);
      }
    }
  }, {
    key: "setEvar",
    value: function setEvar(t) {
      if (validVar(t)) {
        this._sendEvent({
          t: "evar",
          "var": t
        });
      }
    }
  }, {
    key: "getLocation",
    value: function getLocation(t) {
      this.growingio.vdsConfig.getLocation.autoGet = !0, this.sendVisitEvent(this.lastVstArgs, t);
    }
  }, {
    key: "sendVisitEvent",
    value: function sendVisitEvent(t, e) {
      var _this = this;

      this.info.getSystemInfo().then(function (n) {
        var i = n || {};
        var o = {
          t: "vst",
          tm: Date.now(),
          av: _this.info.sdkVer,
          db: i.brand,
          dm: i.model && i.model.replace(/<.*>/, ""),
          sh: Utils.getScreenHeight(i),
          sw: Utils.getScreenWidth(i),
          os: Utils.getOS(i.platform),
          osv: Utils.getOSV(i.version),
          l: i.language
        };

        if (_this.growingio.vdsConfig.appVer && (o.cv = _this.growingio.vdsConfig.appVer + ""), t.length > 0) {
          var _n5 = t[0];
          o.p = _n5.path || _this.info.getPagePath(), Utils.isEmpty(_n5.query) || (o.q = _this.currentPage._getQuery(_n5.query)), o.ch = "scn:".concat(_this.info.scnPrefix).concat(_this.scene), "quickapp" === _this.info.platform ? o.rf = _this.info.appSource.packageName : _n5.referrerInfo && _n5.referrerInfo.appId && getDataByPath(_n5, "referrerInfo.appId") && (o.rf = _n5.referrerInfo.appId), _this.info.getNetworkType().then(function (t) {
            t && (o.nt = t.networkType, _this._sendEvent(o), _this.growingio.vdsConfig.getLocation.autoGet && (e && -1 !== ["wgs84", "gcj02", 0, 1, 2].indexOf(e) || (e = "my" === gioGlobal.gio__platform ? 0 : "wgs84"), _this.info.getLocation(e).then(function (t) {
              t && (o.lat = t.latitude, o.lng = t.longitude, _this._sendEvent(o));
            })));
          });
        }
      });
    }
  }, {
    key: "sendVisitCloseEvent",
    value: function sendVisitCloseEvent() {
      this._sendEvent({
        t: "cls",
        p: this.currentPage.path,
        q: this.currentPage.query
      });
    }
  }, {
    key: "sendErrorEvent",
    value: function sendErrorEvent(t) {
      if (t && t.length > 0) {
        var e,
            n = t[0].split("\n");

        if (n && n.length > 1) {
          var _t4 = n[1].split(";");

          if (_t4 && _t4.length > 1) {
            var i = _t4[1].match(/at ([^ ]+) page (.*) function/);

            e = {
              key: n[0],
              error: _t4[0]
            }, i && i.length > 2 && (e.page = i[1], e["function"] = i[2]);
          }
        } else e = {
          error: n && n[0]
        };

        this._sendEvent({
          t: "cstm",
          ptm: this.currentPage.time,
          p: this.currentPage.path,
          q: this.currentPage.query,
          n: "onError",
          "var": e
        });
      }
    }
  }, {
    key: "sendPage",
    value: function sendPage(t) {
      var _this2 = this;

      var e = {
        t: "page",
        tm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query
      };
      e.rp = this.lastPageEvent ? this.lastPageEvent.p : this.scene ? "scn:".concat(this.info.scnPrefix).concat(this.scene) : null;
      var n = this.info.getPageTitle(t);
      n && n.length > 0 && (e.tl = n), this._sendEvent(e), this.lastPageEvent = e;
      var i = this.currentPage.pvar["".concat(this.currentPage.path, "?").concat(this.currentPage.query)];
      i && i.length > 0 && i.map(function (t) {
        t.ptm = _this2.currentPage.time, _this2._sendEvent(t);
      });
    }
  }, {
    key: "sendPageShare",
    value: function sendPageShare(t, e, n) {
      this._sendEvent({
        t: "cstm",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query,
        n: "onShareAppMessage",
        "var": {
          from: e ? e.from : void 0,
          target: e && e.target ? e.target.id : void 0,
          title: n ? n.title : void 0,
          path: n ? decodeURI(n.path) : void 0
        }
      });
    }
  }, {
    key: "sendClick",
    value: function sendClick(t, e) {
      var n = {
        t: CLICK_TYPE[t.type] || "clck",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query
      },
          i = t.currentTarget || t.target,
          o = i.id;
      (!o || "swan" === gioGlobal.gio__platform && /^_[0-9a-f]+/.test(o)) && (o = "");
      var s = {
        x: "".concat(o, "#").concat(e)
      };
      i.dataset.title && (s.v = i.dataset.title), i.dataset.src && (s.h = i.dataset.src), void 0 !== i.dataset.index && (s.idx = /^[\d]+$/.test(i.dataset.index) ? parseInt(i.dataset.index) : -1), n.e = [s], this._sendEvent(n);
    }
  }, {
    key: "sendSubmit",
    value: function sendSubmit(t, e) {
      var n = {
        t: "sbmt",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query
      },
          i = (t.currentTarget || t.target).id;
      (!i || "swan" === gioGlobal.gio__platform && /^_[0-9a-f]+/.test(i)) && (i = ""), n.e = [{
        x: "".concat(i, "#").concat(e)
      }], this._sendEvent(n);
    }
  }, {
    key: "sendChange",
    value: function sendChange(t, e) {
      var n = {
        t: "chng",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query
      },
          i = t.currentTarget || t.target,
          o = i.id;
      (!o || "swan" === gioGlobal.gio__platform && /^_[0-9a-f]+/.test(o)) && (o = "");
      var s = {
        x: "".concat(o, "#").concat(e)
      },
          r = getDataByPath(t, "detail.value") || getDataByPath(t, "target.attr.value");
      (i.dataset.growingTrack || i.dataset.growingtrack) && ("boolean" == typeof r || r && 0 !== r.length) && ("[object Array]" === Object.prototype.toString.call(r) ? (r = r.join(",")) && (s.v = r) : s.v = r), "change" === t.type && "autoplay" === getDataByPath(t, "detail.source") || (n.e = [s], this._sendEvent(n));
    }
  }, {
    key: "sendTabClick",
    value: function sendTabClick(t) {
      var e = {
        t: "clck",
        ptm: this.currentPage.time,
        p: this.currentPage.path,
        q: this.currentPage.query,
        e: [{
          x: "#onTabItemTap",
          v: t.text,
          idx: t.index,
          h: "string" == typeof t.pagePath ? t.pagePath : JSON.stringify(t.pagePath)
        }]
      };

      this._sendEvent(e);
    }
  }, {
    key: "_sendEvent",
    value: function _sendEvent(t) {
      var _this3 = this;

      if (this.info.uid && this.esid) {
        var e = this._buildEvent(t, this.info);

        this.growingio.upload(e);
      } else this.isGettingUid ? this.uploadingMessages.push(t) : (this.isGettingUid = !0, this.info.getStorage(this.info.uidKey).then(function (e) {
        e || (e = Utils.guid()), _this3.info.uid = e, _this3.info.getStorage(_this3.info.esidKey).then(function (e) {
          e || (e = 1), _this3.esid = e, _this3.isGettingUid = !1;

          var n = _this3._buildEvent(t, _this3.info);

          _this3.growingio.upload(n);

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _this3.uploadingMessages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _t5 = _step.value;
              _this3._buildEvent(_t5, _this3.info), _this3.growingio.upload(_t5);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        });
      }));
    }
  }, {
    key: "_buildEvent",
    value: function _buildEvent(t, e) {
      if (t.u = e.uid, t.s = this.sessionId, t.tm = t.tm || Date.now(), t.d = this.growingio.vdsConfig.appId, t.b = e.platform, null !== this.cs1 && (t.cs1 = this.cs1), t["var"]) {
        var _e5 = t["var"];
        Object.keys(_e5).forEach(function (n) {
          "string" != typeof _e5[n] && (t["var"][n] = JSON.stringify(_e5[n]));
        });
      }

      return t.esid = this.esid++, t;
    }
  }, {
    key: "_parseScene",
    value: function _parseScene(t) {
      if ("quickapp" === this.info.platform) {
        var _t6 = this.info.getAppSource(),
            e = _t6.extra || {},
            n = _t6.type || "";

        this.scene = n, this.setVisitor({
          extra: JSON.stringify(e)
        });
      } else if (t.length > 0) {
        var _e6 = t[0];
        this.scene = _e6.query && _e6.query.wxShoppingListScene ? _e6.query.wxShoppingListScene : _e6.scene ? _e6.scene : "NA";
      }
    }
  }, {
    key: "sessionId",
    get: function get() {
      return null === this._sessionId && (this._sessionId = Utils.guid()), this._sessionId;
    }
  }]);

  return Observer;
}();

var Info =
/*#__PURE__*/
function () {
  function Info(t) {
    _classCallCheck(this, Info);

    this.growing = t, this._uid = void 0, this._esid = void 0, this._systemInfo = null, this.uidKey = "_growing_uid_", this.esidKey = "_growing_esid_", this.platform = gioGlobal.platformConfig.platform, this.sdkVer = gioGlobal.platformConfig.sdkVer, this.scnPrefix = gioGlobal.platformConfig.scnPrefix, "quickapp" !== gioGlobal.platformConfig.platform && this.initUserInfo();
  }

  _createClass(Info, [{
    key: "initUserInfo",
    value: function initUserInfo() {
      this.uid = this.getStorageSync(this.uidKey), this.esid = +this.getStorageSync(this.esidKey) + 1;
    }
  }, {
    key: "syncStorage",
    value: function syncStorage() {
      var _this4 = this;

      this.getStorage(this.uidKey).then(function (t) {
        t || _this4.setStorage(_this4.uidKey, _this4._uid);
      });
    }
  }, {
    key: "getAppId",
    value: function getAppId() {
      throw Error("this a interface function");
    }
  }, {
    key: "getAppSource",
    value: function getAppSource() {
      throw Error("this a interface function");
    }
  }, {
    key: "getPageTitle",
    value: function getPageTitle(t) {
      throw Error("this a interface function");
    }
  }, {
    key: "getPagePath",
    value: function getPagePath(t) {
      throw Error("this a interface function");
    }
  }, {
    key: "getStorage",
    value: function getStorage(t) {
      throw Error("this a interface function");
    }
  }, {
    key: "getStorageSync",
    value: function getStorageSync(t) {
      throw Error("this a interface function");
    }
  }, {
    key: "setStorage",
    value: function setStorage(t, e) {
      throw Error("this a interface function");
    }
  }, {
    key: "getSystemInfo",
    value: function getSystemInfo() {
      throw Error("this a interface function");
    }
  }, {
    key: "getNetworkType",
    value: function getNetworkType() {
      throw Error("this a interface function");
    }
  }, {
    key: "getLocation",
    value: function getLocation(t) {
      throw Error("this a interface function");
    }
  }, {
    key: "request",
    value: function request(_ref) {
      var t = _ref.url,
          e = _ref.header,
          n = _ref.method,
          i = _ref.data,
          o = _ref.success,
          s = _ref.fail;
      throw Error("this a interface function");
    }
  }, {
    key: "collectImp",
    value: function collectImp(t) {
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      throw Error("this a interface function");
    }
  }, {
    key: "initShareAppMessage",
    value: function initShareAppMessage(t) {
      throw Error("this a interface function");
    }
  }, {
    key: "esid",
    set: function set(t) {
      this._esid = t, this.setStorage(this.esidKey, this._esid);
    },
    get: function get() {
      return this._esid;
    }
  }, {
    key: "uid",
    set: function set(t) {
      this._uid = t, this.setStorage(this.uidKey, this._uid);
    },
    get: function get() {
      return this._uid;
    }
  }, {
    key: "systemInfo",
    get: function get() {
      return this._systemInfo;
    }
  }]);

  return Info;
}();

var Weixin =
/*#__PURE__*/
function (_Info) {
  _inherits(Weixin, _Info);

  function Weixin(t) {
    var _this5;

    _classCallCheck(this, Weixin);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(Weixin).call(this, t)), _this5.growingio = t;
    return _this5;
  }

  _createClass(Weixin, [{
    key: "getAppId",
    value: function getAppId() {
      this._systemInfo || (this._systemInfo = wx.getSystemInfoSync());
      var t = void 0;
      return 0 > Utils.compareVersion(this._systemInfo.SDKVersion, "2.2.2") || (t = wx.getAccountInfoSync().miniProgram.appId), t;
    }
  }, {
    key: "getPageTitle",
    value: function getPageTitle(t) {
      var e = "";

      try {
        if (t.data.title && t.data.title.length > 0 && (e = Array.isArray(t.data.title) ? t.data.title.join(" ") : t.data.title), 0 === e.length && __wxConfig) {
          if (__wxConfig.tabBar) {
            var n = __wxConfig.tabBar.list.find(function (e) {
              return e.pathPath == t.route || e.pagePath == "".concat(t.route, ".html");
            });

            n && n.text && (e = n.text);
          }

          if (0 == e.length) {
            var _n6 = __wxConfig.page[t.route] || __wxConfig.page["".concat(t.route, ".html")];

            e = _n6 ? _n6.window.navigationBarTitleText : __wxConfig.global.window.navigationBarTitleText;
          }
        }
      } catch (t) {
        return "";
      }

      return e;
    }
  }, {
    key: "getStorage",
    value: function getStorage(t) {
      return new Promise(function (e) {
        wx.getStorage({
          key: t,
          success: function success(t) {
            return e(t.data);
          },
          fail: function fail() {
            return e("");
          }
        });
      });
    }
  }, {
    key: "getStorageSync",
    value: function getStorageSync(t) {
      return wx.getStorageSync(t);
    }
  }, {
    key: "setStorage",
    value: function setStorage(t, e) {
      wx.setStorage({
        key: t,
        data: e
      });
    }
  }, {
    key: "getSystemInfo",
    value: function getSystemInfo() {
      var _this6 = this;

      return new Promise(function (t) {
        wx.getSystemInfo({
          success: function success(e) {
            _this6._systemInfo = e, t(e);
          },
          fail: function fail() {
            return t(null);
          }
        });
      });
    }
  }, {
    key: "getNetworkType",
    value: function getNetworkType() {
      return new Promise(function (t) {
        wx.getNetworkType({
          success: function success(e) {
            return t(e);
          },
          fail: function fail() {
            return t(null);
          }
        });
      });
    }
  }, {
    key: "getSetting",
    value: function getSetting() {
      return new Promise(function (t) {
        wx.getSetting({
          success: t,
          fail: t
        });
      });
    }
  }, {
    key: "getLocation",
    value: function getLocation(t) {
      return new Promise(function (e) {
        wx.getLocation({
          type: t,
          success: function success(t) {
            return e(t);
          },
          fail: function fail() {
            return e(null);
          }
        });
      });
    }
  }, {
    key: "request",
    value: function request(_ref2) {
      var t = _ref2.url,
          e = _ref2.header,
          n = _ref2.method,
          i = _ref2.data,
          o = _ref2.success,
          s = _ref2.fail;
      return wx.request({
        url: t,
        header: e,
        method: n,
        data: i,
        success: o,
        fail: s
      });
    }
  }, {
    key: "collectImp",
    value: function collectImp(t) {
      var _this7 = this;

      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var n = null;
      this.growingio.vdsConfig.vue && (t = t.$mp.page), this.growingio.vdsConfig.taro && (t = t.$scope);
      var i = {};
      this.growingio._observer && this.growingio._observer.disconnect(), this.growingio._observer = t.isComponent ? t.createIntersectionObserver({
        observeAll: !0
      }) : wx.createIntersectionObserver(t, {
        observeAll: !0
      }), (n = e ? this.growingio._observer.relativeTo(e) : this.growingio._observer.relativeToViewport()).observe(".growing_collect_imp", function (t) {
        if (!t.id || i[t.id]) return;
        var e = getManualImpInfo(t.dataset);
        t.id && !i[t.id] && (_this7.growingio.observer.track(e.eventId, e.properties), i[t.id] = !0);
      });
    }
  }]);

  return Weixin;
}(Info);

var Uploader =
/*#__PURE__*/
function () {
  function Uploader(t) {
    _classCallCheck(this, Uploader);

    this.growingio = t, this.messageQueue = [], this.uploadingQueue = [], this.uploadTimer = null, this.projectId = this.growingio.vdsConfig.projectId, this.appId = this.growingio.vdsConfig.appId, this.host = this.growingio.vdsConfig.host, this.url = "".concat(this.host, "/projects/").concat(this.projectId, "/apps/").concat(this.appId, "/collect");
  }

  _createClass(Uploader, [{
    key: "upload",
    value: function upload(t) {
      var _this8 = this;

      this.messageQueue.push(t);
      var e = this.messageQueue.length;
      e > 100 && (this.messageQueue = this.messageQueue.slice(e - 100)), this.uploadTimer || (this.uploadTimer = setTimeout(function () {
        _this8._flush(), _this8.uploadTimer = null;
      }, 1e3));
    }
  }, {
    key: "forceFlush",
    value: function forceFlush() {
      this.uploadTimer && (clearTimeout(this.uploadTimer), this.uploadTimer = null), this._flush();
    }
  }, {
    key: "_flush",
    value: function _flush() {
      var _this9 = this;

      this.uploadingQueue = this.messageQueue.slice(), this.messageQueue = [], this.uploadingQueue.length > 0 && this.growingio.info.request({
        url: "".concat(this.url, "?stm=").concat(Date.now()),
        header: {
          "content-type": "application/json"
        },
        method: "POST",
        data: this.uploadingQueue,
        success: function success() {
          _this9.messageQueue.length > 0 && _this9._flush();
        },
        fail: function fail(t) {
          204 !== t.status && (_this9.messageQueue = _this9.uploadingQueue.concat(_this9.messageQueue));
        }
      });
    }
  }]);

  return Uploader;
}();

var sdkVersion = "3.2.2",
    platformConfig = {
  wx: {
    name: "Weixin",
    path: "./weixin"
  },
  qq: {
    name: "QQ",
    path: "./qq"
  },
  my: {
    name: "Alipay",
    path: "./alipay"
  },
  swan: {
    name: "Baidu",
    path: "./baidu"
  },
  tt: {
    name: "Bytedance",
    path: "./bytedance"
  },
  quickApp: {
    name: "Quickapp",
    path: "./quickApp"
  },
  frame: {
    name: "Frame",
    path: "./multipleFrame"
  }
},
    Config = Object.assign({}, platformConfig.wx, {
  platform: "MinP",
  scnPrefix: "",
  appHandlers: ["onShow", "onHide", "onError"],
  pageHandlers: ["onLoad", "onShow", "onShareAppMessage", "onTabItemTap", "onHide", "onUnload"],
  actionEventTypes: ["onclick", "tap", "longpress", "blur", "change", "submit", "confirm", "getuserinfo", "getphonenumber", "contact"],
  originalApp: App,
  originalPage: Page,
  originalComponent: Component,
  originalBehavior: Behavior,
  canHook: !0,
  hooks: {
    App: !0,
    Page: !0,
    Component: !0,
    Behavior: !0
  },
  lisiteners: {
    app: {
      appShow: "onShow",
      appClose: "onHide",
      appError: "onError"
    },
    page: {
      pageLoad: "onLoad",
      pageShow: "onShow",
      pageHide: "onHide",
      pageClose: "onUnload",
      tabTap: "onTabItemTap",
      shareApp: "onShareAppMessage"
    },
    actions: {
      click: ["onclick", "tap", "longpress", "getuserinfo", "getphonenumber", "contact"],
      change: ["blur", "change", "confirm"],
      submit: ["submit"]
    }
  }
});
var platformConfig$1 = Object.assign({}, Config, {
  sdkVer: "3.2.2"
});
var duration5min = 3e5;

var GrowingIO =
/*#__PURE__*/
function () {
  function GrowingIO() {
    _classCallCheck(this, GrowingIO);

    this.uploadingMessages = [], this.start = !1;
  }

  _createClass(GrowingIO, [{
    key: "init",
    value: function init(t, e, n) {
      this.start || (e && "string" != typeof e && (n = e, e = ""), e || n || (e = "", n = {}), "alip" === platformConfig$1.platform && (n.vue || n.taro || n.cml || n.wepy) && (platformConfig$1.canHook = !0), n.usePlugin && (platformConfig$1.canHook = !1), this.vdsConfig = {
        projectId: t,
        appId: e,
        appVer: n.version || "",
        debug: n.debug || !1,
        forceLogin: n.forceLogin || !1,
        followShare: void 0 === n.followShare || n.followShare,
        usePlugin: n.usePlugin || !1,
        getLocation: {
          autoGet: ("object" == _typeof(n.getLocation) ? n.getLocation.autoGet : n.getLocation) || !1,
          type: "object" == _typeof(n.getLocation) && n.getLocation.type || "wgs84"
        },
        dataCollect: !("boolean" == typeof n.stopTrack && n.stopTrack || "boolean" == typeof n.dataCollect && !n.dataCollect),
        keepAlive: +n.keepAlive || duration5min,
        vue: n.vue || !1,
        taro: n.taro || !1,
        cml: n.cml || !1,
        wepy: n.wepy || !1,
        host: n.host && n.host.indexOf("http") >= 0 ? "https://".concat(n.host.slice(n.host.indexOf("://") + 3)) : "https://wxapi.growingio.com",
        sdkVer: platformConfig$1.sdkVer
      }, gioGlobal.vdsConfig = this.vdsConfig, gioGlobal.platformConfig = platformConfig$1, this.info = new Weixin(this), e || (this.vdsConfig.appId = this.info.getAppId() || t), this.observer = new Observer(this), this.uploader = new Uploader(this), this.start = !0, n.vue && (this.vueRootVMs = {}, this._proxyVue(n.vue)), n.taro && (this.taroRootVMs = {}, this._proxyTaro(n.taro)), n.cml && (gioGlobal.platformConfig.hooks.Component = !1, this._proxyCml(n.cml)), n.wepy && (this.wepyRootVMs = {}, this._proxyWepy(n.wepy)), "quickapp" === gioGlobal.platformConfig.platform && this.info.initShareAppMessage(this), this._start());
    }
  }, {
    key: "setConfig",
    value: function setConfig(t) {
      this.init(t.projectId, t.appId, t);
    }
  }, {
    key: "setVue",
    value: function setVue(t) {
      this.vueRootVMs || (this.vueRootVMs = {}), this.vdsConfig.vue = !0, this._proxyVue(t);
    }
  }, {
    key: "_proxyVue",
    value: function _proxyVue(t) {
      if (void 0 !== t.mixin) {
        var e = this;
        t.mixin({
          created: function created() {
            if (!this.$options.methods) return;
            var t = Object.keys(this.$options.methods);

            for (var _i3 = 0, _Object$keys = Object.keys(this); _i3 < _Object$keys.length; _i3++) {
              var _e7 = _Object$keys[_i3];
              0 > t.indexOf(_e7) || "function" != typeof this[_e7] || (Object.defineProperty(this[_e7], "proxiedName", {
                value: _e7
              }), Object.defineProperty(this[_e7], "isProxied", {
                value: !0
              }));
            }
          },
          beforeMount: function beforeMount() {
            var t = this.$root;
            t.$mp && "page" === t.$mp.mpType ? t.$mp.page && (e.vueRootVMs[t.$mp.page.route] = t) : "page" === t.mpType && "page" === this.mpType && t.$mp.page && (e.vueRootVMs[t.$mp.page.route || t.$mp.page.is] = t, -1 !== ["wx", "qq", "tt"].indexOf(gioGlobal.gio__platform) && VdsInstrumentAgent.instrumentPageComponent(t.$mp.page));
          }
        });
      }
    }
  }, {
    key: "_proxyTaro",
    value: function _proxyTaro(t) {
      var e = this;
      var n = t.createComponent,
          i = this.vdsConfig.usePlugin;

      if (t.createComponent = function (t, o) {
        var s = t;

        for (; s && s.prototype;) {
          var _n7 = Object.keys(Object.getOwnPropertyDescriptors(s.prototype) || {});

          for (var _i4 = 0; _n7.length > _i4; _i4++) {
            if (_n7[_i4].startsWith("func__")) {
              var _o = s.name,
                  _r = _n7[_i4].slice(6);

              e.taroRootVMs[_n7[_i4]] = _o + "_" + ("" + t.prototype[_n7[_i4]]).match(/this\.__triggerPropsFn\("(.+)",/)[1] + "_" + _r;
            }
          }

          s = Object.getPrototypeOf(s);
        }

        var r = n(t, o),
            a = -1 !== ["MinP", "qq"].indexOf(platformConfig$1.platform),
            g = a ? r && r.methods : r;
        return i ? (VdsInstrumentAgent.instrument(g), o && VdsInstrumentAgent.instrumentPageComponent(g)) : o && a && VdsInstrumentAgent.instrumentPageComponent(g), r;
      }, i) {
        var _e8 = t.createApp;

        t.createApp = function (t) {
          var n = _e8(t);

          return n._growing_app_ = !0, VdsInstrumentAgent.instrument(n), n;
        };
      }
    }
  }, {
    key: "_proxyCml",
    value: function _proxyCml(t) {
      var e = t.createApp,
          n = t.createComponent;
      t.createApp = function (t) {
        return t._growing_app_ = !0, e(VdsInstrumentAgent.instrument(t));
      }, t.createComponent = function (t) {
        return n(t.data && t.data.isComponent ? Object.assign({}, t, {
          methods: VdsInstrumentAgent.instrument(t.methods)
        }) : t);
      };
    }
  }, {
    key: "_proxyWepy",
    value: function _proxyWepy(t) {
      var e = this,
          n = t.page,
          i = function i(t) {
        var n = Object.keys(t);

        for (var _i5 = 0; n.length > _i5; _i5++) {
          var _o2 = Object.keys(t[n[_i5]]);

          for (var s = 0; _o2.length > s; s++) {
            if ("function" == typeof t[n[_i5]][_o2[s]]) {
              var r = ("" + t[n[_i5]][_o2[s]]).match(/_vm\.(.+)\(.*\)/);

              r && r[1] && (e.wepyRootVMs[n[_i5]] || (e.wepyRootVMs[n[_i5]] = {}), e.wepyRootVMs[n[_i5]][_o2[s]] = r[1]), e.vdsConfig.usePlugin && (t[n[_i5]][_o2[s]] = VdsInstrumentAgent.hook("_proxy", t[n[_i5]][_o2[s]]));
            }
          }
        }
      };

      t.page = function (t, e) {
        return e.handlers && i(e.handlers), VdsInstrumentAgent.instrumentPageComponent(t), n(t, e);
      };

      var o = t.component;

      if (t.component = function (t, e) {
        return e.handlers && i(e.handlers), o(t, e);
      }, this.vdsConfig.usePlugin) {
        var _e9 = t.app;

        t.app = function (t, n) {
          return t._growing_app_ = !0, _e9(VdsInstrumentAgent.instrument(t), n);
        };
      }
    }
  }, {
    key: "_start",
    value: function _start() {
      VdsInstrumentAgent.initInstrument(this.observer);

      try {
        gioGlobal && platformConfig$1.canHook && (platformConfig$1.hooks.App && (gioGlobal.App = App), platformConfig$1.hooks.Page && (gioGlobal.Page = Page), platformConfig$1.hooks.Component && (gioGlobal.Component = Component), platformConfig$1.hooks.Behavior && (gioGlobal.Behavior = Behavior));
      } catch (t) {}
    }
  }, {
    key: "setDataCollect",
    value: function setDataCollect(t) {
      this.vdsConfig.dataCollect = t;
    }
  }, {
    key: "login",
    value: function login(t) {
      if (this.vdsConfig.forceLogin) {
        this.info.uid = t, this.vdsConfig.forceLogin = !1;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.uploadingMessages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var e = _step2.value;
            e.u = t, this.upload(e);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }, {
    key: "upload",
    value: function upload(t) {
      this.vdsConfig.dataCollect && (this.vdsConfig.forceLogin ? this.uploadingMessages.push(t) : (this.vdsConfig.debug && console.info("generate new event", JSON.stringify(t, 0, 2)), gioEmitter.emitEvent("upload", [t]), this.uploader.upload(t)));
    }
  }, {
    key: "forceFlush",
    value: function forceFlush() {
      this.info.esid = this.observer.esid, this.uploader.forceFlush();
    }
  }, {
    key: "proxy",
    value: function proxy(t, e) {
      try {
        if ("setVue" === t) this.setVue(e[0]);else if ("setDataCollect" === t) this.setDataCollect(e[0]);else if ("setStopTrack" === t) this.setDataCollect(!e[0]);else if ("collectImp" === t) this.collectImp(e[0], e[1]);else if (this.observer && this.observer[t]) return this.observer[t].apply(this.observer, e);
      } catch (t) {
        console.error(t);
      }
    }
  }, {
    key: "collectImp",
    value: function collectImp(t) {
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.info.collectImp(t, e);
    }
  }]);

  return GrowingIO;
}();

var UserStorage =
/*#__PURE__*/
function () {
  function UserStorage() {
    _classCallCheck(this, UserStorage);

    this.namespace = "push-user-status", this.duration = 432e7;
  }

  _createClass(UserStorage, [{
    key: "_get",
    value: function _get(t) {
      return wx.getStorageSync("".concat(this.namespace, "#").concat(t));
    }
  }, {
    key: "set",
    value: function set(t, e) {
      var n = this._get(t),
          i = {
        startAt: Date.now(),
        value: e
      };

      if (n) {
        var _e10 = JSON.parse(n);

        wx.setStorageSync("".concat(this.namespace, "#").concat(t), JSON.stringify(i.value === _e10.value ? _e10 : i));
      } else wx.setStorageSync("".concat(this.namespace, "#").concat(t), JSON.stringify(i));
    }
  }, {
    key: "get",
    value: function get(t) {
      var e = this._get(t);

      if (!e) return;
      var n = JSON.parse(e);
      return Date.now() > n.startAt + this.duration ? void 0 : n.value;
    }
  }]);

  return UserStorage;
}();

try {
  var _t7 = "wx";
  initGlobal(_t7), "frame" !== _t7 && (gioGlobal.gio__platform = _t7);
} catch (t) {}

var growingio = new GrowingIO();
exports.growingio = growingio;

var gio = function gio() {
  var t = arguments[0];
  if (!t) return;
  var e = 2 > arguments.length ? [] : [].slice.call(arguments, 1);

  if ("init" === t) {
    if (1 > e.length) return void console.log('初始化 GrowingIO SDK 失败。请使用 gio("init", "你的GrowingIO项目ID", "你的应用APP_ID", options);');
    growingio.init(e[0], e[1], e[2]);
  } else {
    if ("setConfig" !== t) return growingio.proxy(t, e);
    if (!e[0]) return void console.log("初始化 GrowingIO SDK 失败。请检查你的config文件是否引入正确");
    if (!e[0].projectId) return void console.log("初始化 GrowingIO SDK 失败。请检查你的 GrowingIO项目ID, 你的应用APP_ID 是否填写正确");
    growingio.setConfig(e[0]);
  }
};

console.log("init growingio...");
var GioPage = VdsInstrumentAgent.GrowingPage,
    GioApp = VdsInstrumentAgent.GrowingApp,
    GioComponent = VdsInstrumentAgent.GrowingComponent,
    GioBehavior = VdsInstrumentAgent.GrowingBehavior,
    gioEmitter$1 = gioEmitter,
    userStorage = new UserStorage();
exports.gioEmitter = gioEmitter$1;
exports.GioBehavior = GioBehavior;
exports.GioComponent = GioComponent;
exports.GioApp = GioApp;
exports.GioPage = GioPage;
gioGlobal.__growing__ = {
  gioEmitter: gioEmitter$1,
  gio: gio,
  growingio: growingio,
  userStorage: userStorage
}, gioGlobal.gio = gio;
var _default = gio;
exports["default"] = _default;