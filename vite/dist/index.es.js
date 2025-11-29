import * as O from "react";
import pe, { createContext as qa, useState as Wa, useMemo as Ua, useRef as je, useContext as Mn, useEffect as rr, useLayoutEffect as za, forwardRef as Ya } from "react";
import Ha from "react-dom";
function Ba(r, t) {
  const e = this.cur.slice(0), n = this.events;
  e.push(r);
  const a = e.join("/");
  n[a] || (n[a] = []), n[a].push(t), this._registered.push([a, t]);
}
function Ga() {
  const r = this.events;
  this._registered.forEach((t) => {
    const e = r[t[0]].indexOf(t[1]);
    e > -1 && r[t[0]].splice(e, 1);
  });
}
function Bt(r, t = {}) {
  const e = r.events;
  function n(a, i) {
    let o = a;
    if (t[o] && (o = [t[o], o].join("/")), !e[o]) {
      console.warn(`event ${o} is not defined`);
      return;
    }
    e[o].forEach((s) => {
      s(i);
    });
  }
  return n.bind(r);
}
function In(r) {
  const t = this.cur.slice(0), e = this.events || {}, n = {
    cur: t,
    _registered: [],
    events: e
  };
  Object.assign(n, {
    create: In.bind(n),
    register: Ba.bind(n),
    destroy: Ga.bind(n)
  });
  let a;
  return r && (r.register && t.push(r.register), a = Bt(n, r)), n.trigger = a || Bt(n), n;
}
const at = {
  cur: []
};
at.create = In.bind(at);
class Ka extends pe.Component {
  constructor(t) {
    super(t), this.state = {
      count: 0
    }, this.props = t, this.__ = t.__;
  }
  componentDidMount() {
    this.__.register("change", (t) => {
      const {
        state: e,
        setState: n
      } = this;
      ((a, {
        setState: i,
        state: o
      }) => {
        a.count && i({
          count: o.count + a.count
        });
      })(t, {
        state: e,
        setState: n.bind(this)
      });
    });
  }
  componentWillUnmount() {
    this.__.destroy();
  }
  render() {
    const {
      state: t,
      props: e,
      __: n
    } = this;
    return this.setState.bind(this), n && n.trigger, /* @__PURE__ */ pe.createElement(pe.Fragment, null, /* @__PURE__ */ pe.createElement("p", {
      className: "test"
    }, e.msg, ": ", t.count));
  }
}
function B(r, t, e) {
  return t in r ? Object.defineProperty(r, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : r[t] = e, r;
}
function gr(r, t) {
  if (!(r instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Gt(r, t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(r, n.key, n);
  }
}
function pr(r, t, e) {
  return t && Gt(r.prototype, t), e && Gt(r, e), Object.defineProperty(r, "prototype", {
    writable: !1
  }), r;
}
function it(r, t) {
  return it = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, it(r, t);
}
function Pt(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  r.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: r,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(r, "prototype", {
    writable: !1
  }), t && it(r, t);
}
function Ar(r) {
  return Ar = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Ar(r);
}
function Ja() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function he(r) {
  return he = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, he(r);
}
function xt(r) {
  if (r === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r;
}
function Za(r, t) {
  if (t && (he(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return xt(r);
}
function _t(r) {
  var t = Ja();
  return function() {
    var n = Ar(r), a;
    if (t) {
      var i = Ar(this).constructor;
      a = Reflect.construct(n, arguments, i);
    } else
      a = n.apply(this, arguments);
    return Za(this, a);
  };
}
var jn = { exports: {} };
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
(function(r) {
  (function() {
    var t = {}.hasOwnProperty;
    function e() {
      for (var n = [], a = 0; a < arguments.length; a++) {
        var i = arguments[a];
        if (!!i) {
          var o = typeof i;
          if (o === "string" || o === "number")
            n.push(i);
          else if (Array.isArray(i)) {
            if (i.length) {
              var s = e.apply(null, i);
              s && n.push(s);
            }
          } else if (o === "object")
            if (i.toString === Object.prototype.toString)
              for (var u in i)
                t.call(i, u) && i[u] && n.push(u);
            else
              n.push(i.toString());
        }
      }
      return n.join(" ");
    }
    r.exports ? (e.default = e, r.exports = e) : window.classNames = e;
  })();
})(jn);
const kr = jn.exports;
var Rt = { exports: {} }, G = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kt;
function Qa() {
  if (Kt)
    return G;
  Kt = 1;
  var r = typeof Symbol == "function" && Symbol.for, t = r ? Symbol.for("react.element") : 60103, e = r ? Symbol.for("react.portal") : 60106, n = r ? Symbol.for("react.fragment") : 60107, a = r ? Symbol.for("react.strict_mode") : 60108, i = r ? Symbol.for("react.profiler") : 60114, o = r ? Symbol.for("react.provider") : 60109, s = r ? Symbol.for("react.context") : 60110, u = r ? Symbol.for("react.async_mode") : 60111, l = r ? Symbol.for("react.concurrent_mode") : 60111, c = r ? Symbol.for("react.forward_ref") : 60112, d = r ? Symbol.for("react.suspense") : 60113, v = r ? Symbol.for("react.suspense_list") : 60120, S = r ? Symbol.for("react.memo") : 60115, _ = r ? Symbol.for("react.lazy") : 60116, m = r ? Symbol.for("react.block") : 60121, y = r ? Symbol.for("react.fundamental") : 60117, p = r ? Symbol.for("react.responder") : 60118, C = r ? Symbol.for("react.scope") : 60119;
  function E(h) {
    if (typeof h == "object" && h !== null) {
      var N = h.$$typeof;
      switch (N) {
        case t:
          switch (h = h.type, h) {
            case u:
            case l:
            case n:
            case i:
            case a:
            case d:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case s:
                case c:
                case _:
                case S:
                case o:
                  return h;
                default:
                  return N;
              }
          }
        case e:
          return N;
      }
    }
  }
  function x(h) {
    return E(h) === l;
  }
  return G.AsyncMode = u, G.ConcurrentMode = l, G.ContextConsumer = s, G.ContextProvider = o, G.Element = t, G.ForwardRef = c, G.Fragment = n, G.Lazy = _, G.Memo = S, G.Portal = e, G.Profiler = i, G.StrictMode = a, G.Suspense = d, G.isAsyncMode = function(h) {
    return x(h) || E(h) === u;
  }, G.isConcurrentMode = x, G.isContextConsumer = function(h) {
    return E(h) === s;
  }, G.isContextProvider = function(h) {
    return E(h) === o;
  }, G.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, G.isForwardRef = function(h) {
    return E(h) === c;
  }, G.isFragment = function(h) {
    return E(h) === n;
  }, G.isLazy = function(h) {
    return E(h) === _;
  }, G.isMemo = function(h) {
    return E(h) === S;
  }, G.isPortal = function(h) {
    return E(h) === e;
  }, G.isProfiler = function(h) {
    return E(h) === i;
  }, G.isStrictMode = function(h) {
    return E(h) === a;
  }, G.isSuspense = function(h) {
    return E(h) === d;
  }, G.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === l || h === i || h === a || h === d || h === v || typeof h == "object" && h !== null && (h.$$typeof === _ || h.$$typeof === S || h.$$typeof === o || h.$$typeof === s || h.$$typeof === c || h.$$typeof === y || h.$$typeof === p || h.$$typeof === C || h.$$typeof === m);
  }, G.typeOf = E, G;
}
var K = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jt;
function Xa() {
  return Jt || (Jt = 1, process.env.NODE_ENV !== "production" && function() {
    var r = typeof Symbol == "function" && Symbol.for, t = r ? Symbol.for("react.element") : 60103, e = r ? Symbol.for("react.portal") : 60106, n = r ? Symbol.for("react.fragment") : 60107, a = r ? Symbol.for("react.strict_mode") : 60108, i = r ? Symbol.for("react.profiler") : 60114, o = r ? Symbol.for("react.provider") : 60109, s = r ? Symbol.for("react.context") : 60110, u = r ? Symbol.for("react.async_mode") : 60111, l = r ? Symbol.for("react.concurrent_mode") : 60111, c = r ? Symbol.for("react.forward_ref") : 60112, d = r ? Symbol.for("react.suspense") : 60113, v = r ? Symbol.for("react.suspense_list") : 60120, S = r ? Symbol.for("react.memo") : 60115, _ = r ? Symbol.for("react.lazy") : 60116, m = r ? Symbol.for("react.block") : 60121, y = r ? Symbol.for("react.fundamental") : 60117, p = r ? Symbol.for("react.responder") : 60118, C = r ? Symbol.for("react.scope") : 60119;
    function E(k) {
      return typeof k == "string" || typeof k == "function" || k === n || k === l || k === i || k === a || k === d || k === v || typeof k == "object" && k !== null && (k.$$typeof === _ || k.$$typeof === S || k.$$typeof === o || k.$$typeof === s || k.$$typeof === c || k.$$typeof === y || k.$$typeof === p || k.$$typeof === C || k.$$typeof === m);
    }
    function x(k) {
      if (typeof k == "object" && k !== null) {
        var me = k.$$typeof;
        switch (me) {
          case t:
            var ke = k.type;
            switch (ke) {
              case u:
              case l:
              case n:
              case i:
              case a:
              case d:
                return ke;
              default:
                var ye = ke && ke.$$typeof;
                switch (ye) {
                  case s:
                  case c:
                  case _:
                  case S:
                  case o:
                    return ye;
                  default:
                    return me;
                }
            }
          case e:
            return me;
        }
      }
    }
    var h = u, N = l, M = s, $ = o, I = t, b = c, g = n, F = _, P = S, R = e, A = i, D = a, J = d, X = !1;
    function L(k) {
      return X || (X = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), Y(k) || x(k) === u;
    }
    function Y(k) {
      return x(k) === l;
    }
    function te(k) {
      return x(k) === s;
    }
    function ee(k) {
      return x(k) === o;
    }
    function oe(k) {
      return typeof k == "object" && k !== null && k.$$typeof === t;
    }
    function ce(k) {
      return x(k) === c;
    }
    function le(k) {
      return x(k) === n;
    }
    function Ve(k) {
      return x(k) === _;
    }
    function Fe(k) {
      return x(k) === S;
    }
    function Te(k) {
      return x(k) === e;
    }
    function ne(k) {
      return x(k) === i;
    }
    function Oe(k) {
      return x(k) === a;
    }
    function De(k) {
      return x(k) === d;
    }
    K.AsyncMode = h, K.ConcurrentMode = N, K.ContextConsumer = M, K.ContextProvider = $, K.Element = I, K.ForwardRef = b, K.Fragment = g, K.Lazy = F, K.Memo = P, K.Portal = R, K.Profiler = A, K.StrictMode = D, K.Suspense = J, K.isAsyncMode = L, K.isConcurrentMode = Y, K.isContextConsumer = te, K.isContextProvider = ee, K.isElement = oe, K.isForwardRef = ce, K.isFragment = le, K.isLazy = Ve, K.isMemo = Fe, K.isPortal = Te, K.isProfiler = ne, K.isStrictMode = Oe, K.isSuspense = De, K.isValidElementType = E, K.typeOf = x;
  }()), K;
}
(function(r) {
  process.env.NODE_ENV === "production" ? r.exports = Qa() : r.exports = Xa();
})(Rt);
function ot(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = [];
  return pe.Children.forEach(r, function(n) {
    n == null && !t.keepEmpty || (Array.isArray(n) ? e = e.concat(ot(n)) : Rt.exports.isFragment(n) && n.props ? e = e.concat(ot(n.props.children, t)) : e.push(n));
  }), e;
}
var st = {};
function ei(r, t) {
  process.env.NODE_ENV !== "production" && !r && console !== void 0 && console.error("Warning: ".concat(t));
}
function ri() {
  st = {};
}
function ti(r, t, e) {
  !t && !st[e] && (r(!1, e), st[e] = !0);
}
function we(r, t) {
  ti(ei, r, t);
}
function Zt(r, t) {
  var e = Object.keys(r);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(r);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(r, a).enumerable;
    })), e.push.apply(e, n);
  }
  return e;
}
function V(r) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zt(Object(e), !0).forEach(function(n) {
      B(r, n, e[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(e)) : Zt(Object(e)).forEach(function(n) {
      Object.defineProperty(r, n, Object.getOwnPropertyDescriptor(e, n));
    });
  }
  return r;
}
function Ln(r, t) {
  typeof r == "function" ? r(t) : he(r) === "object" && r && "current" in r && (r.current = t);
}
function ni() {
  for (var r = arguments.length, t = new Array(r), e = 0; e < r; e++)
    t[e] = arguments[e];
  var n = t.filter(function(a) {
    return a;
  });
  return n.length <= 1 ? n[0] : function(a) {
    t.forEach(function(i) {
      Ln(i, a);
    });
  };
}
function Dn(r) {
  var t, e, n = Rt.exports.isMemo(r) ? r.type.type : r.type;
  return !(typeof n == "function" && !(!((t = n.prototype) === null || t === void 0) && t.render) || typeof r == "function" && !(!((e = r.prototype) === null || e === void 0) && e.render));
}
function ai(r) {
  return r instanceof HTMLElement ? r : Ha.findDOMNode(r);
}
var Vr = { exports: {} }, or = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qt;
function ii() {
  if (Qt)
    return or;
  Qt = 1;
  var r = pe, t = Symbol.for("react.element"), e = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, a = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(s, u, l) {
    var c, d = {}, v = null, S = null;
    l !== void 0 && (v = "" + l), u.key !== void 0 && (v = "" + u.key), u.ref !== void 0 && (S = u.ref);
    for (c in u)
      n.call(u, c) && !i.hasOwnProperty(c) && (d[c] = u[c]);
    if (s && s.defaultProps)
      for (c in u = s.defaultProps, u)
        d[c] === void 0 && (d[c] = u[c]);
    return { $$typeof: t, type: s, key: v, ref: S, props: d, _owner: a.current };
  }
  return or.Fragment = e, or.jsx = o, or.jsxs = o, or;
}
var sr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xt;
function oi() {
  return Xt || (Xt = 1, process.env.NODE_ENV !== "production" && function() {
    var r = pe, t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), _ = Symbol.iterator, m = "@@iterator";
    function y(f) {
      if (f === null || typeof f != "object")
        return null;
      var w = _ && f[_] || f[m];
      return typeof w == "function" ? w : null;
    }
    var p = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function C(f) {
      {
        for (var w = arguments.length, T = new Array(w > 1 ? w - 1 : 0), j = 1; j < w; j++)
          T[j - 1] = arguments[j];
        E("error", f, T);
      }
    }
    function E(f, w, T) {
      {
        var j = p.ReactDebugCurrentFrame, H = j.getStackAddendum();
        H !== "" && (w += "%s", T = T.concat([H]));
        var Z = T.map(function(z) {
          return String(z);
        });
        Z.unshift("Warning: " + w), Function.prototype.apply.call(console[f], console, Z);
      }
    }
    var x = !1, h = !1, N = !1, M = !1, $ = !1, I;
    I = Symbol.for("react.module.reference");
    function b(f) {
      return !!(typeof f == "string" || typeof f == "function" || f === n || f === i || $ || f === a || f === l || f === c || M || f === S || x || h || N || typeof f == "object" && f !== null && (f.$$typeof === v || f.$$typeof === d || f.$$typeof === o || f.$$typeof === s || f.$$typeof === u || f.$$typeof === I || f.getModuleId !== void 0));
    }
    function g(f, w, T) {
      var j = f.displayName;
      if (j)
        return j;
      var H = w.displayName || w.name || "";
      return H !== "" ? T + "(" + H + ")" : T;
    }
    function F(f) {
      return f.displayName || "Context";
    }
    function P(f) {
      if (f == null)
        return null;
      if (typeof f.tag == "number" && C("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof f == "function")
        return f.displayName || f.name || null;
      if (typeof f == "string")
        return f;
      switch (f) {
        case n:
          return "Fragment";
        case e:
          return "Portal";
        case i:
          return "Profiler";
        case a:
          return "StrictMode";
        case l:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case s:
            var w = f;
            return F(w) + ".Consumer";
          case o:
            var T = f;
            return F(T._context) + ".Provider";
          case u:
            return g(f, f.render, "ForwardRef");
          case d:
            var j = f.displayName || null;
            return j !== null ? j : P(f.type) || "Memo";
          case v: {
            var H = f, Z = H._payload, z = H._init;
            try {
              return P(z(Z));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var R = Object.assign, A = 0, D, J, X, L, Y, te, ee;
    function oe() {
    }
    oe.__reactDisabledLog = !0;
    function ce() {
      {
        if (A === 0) {
          D = console.log, J = console.info, X = console.warn, L = console.error, Y = console.group, te = console.groupCollapsed, ee = console.groupEnd;
          var f = {
            configurable: !0,
            enumerable: !0,
            value: oe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: f,
            log: f,
            warn: f,
            error: f,
            group: f,
            groupCollapsed: f,
            groupEnd: f
          });
        }
        A++;
      }
    }
    function le() {
      {
        if (A--, A === 0) {
          var f = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: R({}, f, {
              value: D
            }),
            info: R({}, f, {
              value: J
            }),
            warn: R({}, f, {
              value: X
            }),
            error: R({}, f, {
              value: L
            }),
            group: R({}, f, {
              value: Y
            }),
            groupCollapsed: R({}, f, {
              value: te
            }),
            groupEnd: R({}, f, {
              value: ee
            })
          });
        }
        A < 0 && C("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ve = p.ReactCurrentDispatcher, Fe;
    function Te(f, w, T) {
      {
        if (Fe === void 0)
          try {
            throw Error();
          } catch (H) {
            var j = H.stack.trim().match(/\n( *(at )?)/);
            Fe = j && j[1] || "";
          }
        return `
` + Fe + f;
      }
    }
    var ne = !1, Oe;
    {
      var De = typeof WeakMap == "function" ? WeakMap : Map;
      Oe = new De();
    }
    function k(f, w) {
      if (!f || ne)
        return "";
      {
        var T = Oe.get(f);
        if (T !== void 0)
          return T;
      }
      var j;
      ne = !0;
      var H = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Z;
      Z = Ve.current, Ve.current = null, ce();
      try {
        if (w) {
          var z = function() {
            throw Error();
          };
          if (Object.defineProperty(z.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(z, []);
            } catch ($e) {
              j = $e;
            }
            Reflect.construct(f, [], z);
          } else {
            try {
              z.call();
            } catch ($e) {
              j = $e;
            }
            f.call(z.prototype);
          }
        } else {
          try {
            throw Error();
          } catch ($e) {
            j = $e;
          }
          f();
        }
      } catch ($e) {
        if ($e && j && typeof $e.stack == "string") {
          for (var q = $e.stack.split(`
`), Ee = j.stack.split(`
`), ue = q.length - 1, de = Ee.length - 1; ue >= 1 && de >= 0 && q[ue] !== Ee[de]; )
            de--;
          for (; ue >= 1 && de >= 0; ue--, de--)
            if (q[ue] !== Ee[de]) {
              if (ue !== 1 || de !== 1)
                do
                  if (ue--, de--, de < 0 || q[ue] !== Ee[de]) {
                    var xe = `
` + q[ue].replace(" at new ", " at ");
                    return f.displayName && xe.includes("<anonymous>") && (xe = xe.replace("<anonymous>", f.displayName)), typeof f == "function" && Oe.set(f, xe), xe;
                  }
                while (ue >= 1 && de >= 0);
              break;
            }
        }
      } finally {
        ne = !1, Ve.current = Z, le(), Error.prepareStackTrace = H;
      }
      var Ke = f ? f.displayName || f.name : "", Ht = Ke ? Te(Ke) : "";
      return typeof f == "function" && Oe.set(f, Ht), Ht;
    }
    function me(f, w, T) {
      return k(f, !1);
    }
    function ke(f) {
      var w = f.prototype;
      return !!(w && w.isReactComponent);
    }
    function ye(f, w, T) {
      if (f == null)
        return "";
      if (typeof f == "function")
        return k(f, ke(f));
      if (typeof f == "string")
        return Te(f);
      switch (f) {
        case l:
          return Te("Suspense");
        case c:
          return Te("SuspenseList");
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case u:
            return me(f.render);
          case d:
            return ye(f.type, w, T);
          case v: {
            var j = f, H = j._payload, Z = j._init;
            try {
              return ye(Z(H), w, T);
            } catch {
            }
          }
        }
      return "";
    }
    var Ae = Object.prototype.hasOwnProperty, ae = {}, ie = p.ReactDebugCurrentFrame;
    function se(f) {
      if (f) {
        var w = f._owner, T = ye(f.type, f._source, w ? w.type : null);
        ie.setExtraStackFrame(T);
      } else
        ie.setExtraStackFrame(null);
    }
    function be(f, w, T, j, H) {
      {
        var Z = Function.call.bind(Ae);
        for (var z in f)
          if (Z(f, z)) {
            var q = void 0;
            try {
              if (typeof f[z] != "function") {
                var Ee = Error((j || "React class") + ": " + T + " type `" + z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof f[z] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ee.name = "Invariant Violation", Ee;
              }
              q = f[z](w, z, j, T, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ue) {
              q = ue;
            }
            q && !(q instanceof Error) && (se(H), C("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", j || "React class", T, z, typeof q), se(null)), q instanceof Error && !(q.message in ae) && (ae[q.message] = !0, se(H), C("Failed %s type: %s", T, q.message), se(null));
          }
      }
    }
    var Be = Array.isArray;
    function ze(f) {
      return Be(f);
    }
    function Ca(f) {
      {
        var w = typeof Symbol == "function" && Symbol.toStringTag, T = w && f[Symbol.toStringTag] || f.constructor.name || "Object";
        return T;
      }
    }
    function Sa(f) {
      try {
        return Mt(f), !1;
      } catch {
        return !0;
      }
    }
    function Mt(f) {
      return "" + f;
    }
    function It(f) {
      if (Sa(f))
        return C("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ca(f)), Mt(f);
    }
    var ir = p.ReactCurrentOwner, Pa = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, jt, Lt, Wr;
    Wr = {};
    function xa(f) {
      if (Ae.call(f, "ref")) {
        var w = Object.getOwnPropertyDescriptor(f, "ref").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return f.ref !== void 0;
    }
    function _a(f) {
      if (Ae.call(f, "key")) {
        var w = Object.getOwnPropertyDescriptor(f, "key").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return f.key !== void 0;
    }
    function Ra(f, w) {
      if (typeof f.ref == "string" && ir.current && w && ir.current.stateNode !== w) {
        var T = P(ir.current.type);
        Wr[T] || (C('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', P(ir.current.type), f.ref), Wr[T] = !0);
      }
    }
    function Ta(f, w) {
      {
        var T = function() {
          jt || (jt = !0, C("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        T.isReactWarning = !0, Object.defineProperty(f, "key", {
          get: T,
          configurable: !0
        });
      }
    }
    function Oa(f, w) {
      {
        var T = function() {
          Lt || (Lt = !0, C("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        T.isReactWarning = !0, Object.defineProperty(f, "ref", {
          get: T,
          configurable: !0
        });
      }
    }
    var Aa = function(f, w, T, j, H, Z, z) {
      var q = {
        $$typeof: t,
        type: f,
        key: w,
        ref: T,
        props: z,
        _owner: Z
      };
      return q._store = {}, Object.defineProperty(q._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(q, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: j
      }), Object.defineProperty(q, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: H
      }), Object.freeze && (Object.freeze(q.props), Object.freeze(q)), q;
    };
    function Na(f, w, T, j, H) {
      {
        var Z, z = {}, q = null, Ee = null;
        T !== void 0 && (It(T), q = "" + T), _a(w) && (It(w.key), q = "" + w.key), xa(w) && (Ee = w.ref, Ra(w, H));
        for (Z in w)
          Ae.call(w, Z) && !Pa.hasOwnProperty(Z) && (z[Z] = w[Z]);
        if (f && f.defaultProps) {
          var ue = f.defaultProps;
          for (Z in ue)
            z[Z] === void 0 && (z[Z] = ue[Z]);
        }
        if (q || Ee) {
          var de = typeof f == "function" ? f.displayName || f.name || "Unknown" : f;
          q && Ta(z, de), Ee && Oa(z, de);
        }
        return Aa(f, q, Ee, H, j, ir.current, z);
      }
    }
    var Ur = p.ReactCurrentOwner, Dt = p.ReactDebugCurrentFrame;
    function Ge(f) {
      if (f) {
        var w = f._owner, T = ye(f.type, f._source, w ? w.type : null);
        Dt.setExtraStackFrame(T);
      } else
        Dt.setExtraStackFrame(null);
    }
    var zr;
    zr = !1;
    function Yr(f) {
      return typeof f == "object" && f !== null && f.$$typeof === t;
    }
    function qt() {
      {
        if (Ur.current) {
          var f = P(Ur.current.type);
          if (f)
            return `

Check the render method of \`` + f + "`.";
        }
        return "";
      }
    }
    function ka(f) {
      {
        if (f !== void 0) {
          var w = f.fileName.replace(/^.*[\\\/]/, ""), T = f.lineNumber;
          return `

Check your code at ` + w + ":" + T + ".";
        }
        return "";
      }
    }
    var Wt = {};
    function Va(f) {
      {
        var w = qt();
        if (!w) {
          var T = typeof f == "string" ? f : f.displayName || f.name;
          T && (w = `

Check the top-level render call using <` + T + ">.");
        }
        return w;
      }
    }
    function Ut(f, w) {
      {
        if (!f._store || f._store.validated || f.key != null)
          return;
        f._store.validated = !0;
        var T = Va(w);
        if (Wt[T])
          return;
        Wt[T] = !0;
        var j = "";
        f && f._owner && f._owner !== Ur.current && (j = " It was passed a child from " + P(f._owner.type) + "."), Ge(f), C('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', T, j), Ge(null);
      }
    }
    function zt(f, w) {
      {
        if (typeof f != "object")
          return;
        if (ze(f))
          for (var T = 0; T < f.length; T++) {
            var j = f[T];
            Yr(j) && Ut(j, w);
          }
        else if (Yr(f))
          f._store && (f._store.validated = !0);
        else if (f) {
          var H = y(f);
          if (typeof H == "function" && H !== f.entries)
            for (var Z = H.call(f), z; !(z = Z.next()).done; )
              Yr(z.value) && Ut(z.value, w);
        }
      }
    }
    function $a(f) {
      {
        var w = f.type;
        if (w == null || typeof w == "string")
          return;
        var T;
        if (typeof w == "function")
          T = w.propTypes;
        else if (typeof w == "object" && (w.$$typeof === u || w.$$typeof === d))
          T = w.propTypes;
        else
          return;
        if (T) {
          var j = P(w);
          be(T, f.props, "prop", j, f);
        } else if (w.PropTypes !== void 0 && !zr) {
          zr = !0;
          var H = P(w);
          C("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", H || "Unknown");
        }
        typeof w.getDefaultProps == "function" && !w.getDefaultProps.isReactClassApproved && C("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ma(f) {
      {
        for (var w = Object.keys(f.props), T = 0; T < w.length; T++) {
          var j = w[T];
          if (j !== "children" && j !== "key") {
            Ge(f), C("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", j), Ge(null);
            break;
          }
        }
        f.ref !== null && (Ge(f), C("Invalid attribute `ref` supplied to `React.Fragment`."), Ge(null));
      }
    }
    function Yt(f, w, T, j, H, Z) {
      {
        var z = b(f);
        if (!z) {
          var q = "";
          (f === void 0 || typeof f == "object" && f !== null && Object.keys(f).length === 0) && (q += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ee = ka(H);
          Ee ? q += Ee : q += qt();
          var ue;
          f === null ? ue = "null" : ze(f) ? ue = "array" : f !== void 0 && f.$$typeof === t ? (ue = "<" + (P(f.type) || "Unknown") + " />", q = " Did you accidentally export a JSX literal instead of a component?") : ue = typeof f, C("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ue, q);
        }
        var de = Na(f, w, T, H, Z);
        if (de == null)
          return de;
        if (z) {
          var xe = w.children;
          if (xe !== void 0)
            if (j)
              if (ze(xe)) {
                for (var Ke = 0; Ke < xe.length; Ke++)
                  zt(xe[Ke], f);
                Object.freeze && Object.freeze(xe);
              } else
                C("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              zt(xe, f);
        }
        return f === n ? Ma(de) : $a(de), de;
      }
    }
    function Ia(f, w, T) {
      return Yt(f, w, T, !0);
    }
    function ja(f, w, T) {
      return Yt(f, w, T, !1);
    }
    var La = ja, Da = Ia;
    sr.Fragment = n, sr.jsx = La, sr.jsxs = Da;
  }()), sr;
}
(function(r) {
  process.env.NODE_ENV === "production" ? r.exports = ii() : r.exports = oi();
})(Vr);
const si = Vr.exports.Fragment, re = Vr.exports.jsx, en = Vr.exports.jsxs;
function ui(r, t) {
  var e = V({}, r);
  return Array.isArray(t) && t.forEach(function(n) {
    delete e[n];
  }), e;
}
var fi = /* @__PURE__ */ qa({});
const qn = fi;
function ci(r, t) {
  if (r == null)
    return {};
  var e = {}, n = Object.keys(r), a, i;
  for (i = 0; i < n.length; i++)
    a = n[i], !(t.indexOf(a) >= 0) && (e[a] = r[a]);
  return e;
}
function hr(r, t) {
  if (r == null)
    return {};
  var e = ci(r, t), n, a;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(r);
    for (a = 0; a < i.length; a++)
      n = i[a], !(t.indexOf(n) >= 0) && (!Object.prototype.propertyIsEnumerable.call(r, n) || (e[n] = r[n]));
  }
  return e;
}
function ut(r, t) {
  (t == null || t > r.length) && (t = r.length);
  for (var e = 0, n = new Array(t); e < t; e++)
    n[e] = r[e];
  return n;
}
function li(r) {
  if (Array.isArray(r))
    return ut(r);
}
function Wn(r) {
  if (typeof Symbol < "u" && r[Symbol.iterator] != null || r["@@iterator"] != null)
    return Array.from(r);
}
function Tt(r, t) {
  if (!!r) {
    if (typeof r == "string")
      return ut(r, t);
    var e = Object.prototype.toString.call(r).slice(8, -1);
    if (e === "Object" && r.constructor && (e = r.constructor.name), e === "Map" || e === "Set")
      return Array.from(r);
    if (e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))
      return ut(r, t);
  }
}
function di() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function U(r) {
  return li(r) || Wn(r) || Tt(r) || di();
}
var Ye = "RC_FORM_INTERNAL_HOOKS", Q = function() {
  we(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, nr = /* @__PURE__ */ O.createContext({
  getFieldValue: Q,
  getFieldsValue: Q,
  getFieldError: Q,
  getFieldWarning: Q,
  getFieldsError: Q,
  isFieldsTouched: Q,
  isFieldTouched: Q,
  isFieldValidating: Q,
  isFieldsValidating: Q,
  resetFields: Q,
  setFields: Q,
  setFieldsValue: Q,
  validateFields: Q,
  submit: Q,
  getInternalHooks: function() {
    return Q(), {
      dispatch: Q,
      initEntityValue: Q,
      registerField: Q,
      useSubscribe: Q,
      setInitialValues: Q,
      destroyForm: Q,
      setCallbacks: Q,
      registerWatch: Q,
      getFields: Q,
      setValidateMessages: Q,
      setPreserve: Q,
      getInitialValue: Q
    };
  }
});
function ft(r) {
  return r == null ? [] : Array.isArray(r) ? r : [r];
}
function Le() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  Le = function() {
    return r;
  };
  var r = {}, t = Object.prototype, e = t.hasOwnProperty, n = typeof Symbol == "function" ? Symbol : {}, a = n.iterator || "@@iterator", i = n.asyncIterator || "@@asyncIterator", o = n.toStringTag || "@@toStringTag";
  function s(b, g, F) {
    return Object.defineProperty(b, g, {
      value: F,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), b[g];
  }
  try {
    s({}, "");
  } catch {
    s = function(F, P, R) {
      return F[P] = R;
    };
  }
  function u(b, g, F, P) {
    var R = g && g.prototype instanceof d ? g : d, A = Object.create(R.prototype), D = new M(P || []);
    return A._invoke = function(J, X, L) {
      var Y = "suspendedStart";
      return function(te, ee) {
        if (Y === "executing")
          throw new Error("Generator is already running");
        if (Y === "completed") {
          if (te === "throw")
            throw ee;
          return I();
        }
        for (L.method = te, L.arg = ee; ; ) {
          var oe = L.delegate;
          if (oe) {
            var ce = x(oe, L);
            if (ce) {
              if (ce === c)
                continue;
              return ce;
            }
          }
          if (L.method === "next")
            L.sent = L._sent = L.arg;
          else if (L.method === "throw") {
            if (Y === "suspendedStart")
              throw Y = "completed", L.arg;
            L.dispatchException(L.arg);
          } else
            L.method === "return" && L.abrupt("return", L.arg);
          Y = "executing";
          var le = l(J, X, L);
          if (le.type === "normal") {
            if (Y = L.done ? "completed" : "suspendedYield", le.arg === c)
              continue;
            return {
              value: le.arg,
              done: L.done
            };
          }
          le.type === "throw" && (Y = "completed", L.method = "throw", L.arg = le.arg);
        }
      };
    }(b, F, D), A;
  }
  function l(b, g, F) {
    try {
      return {
        type: "normal",
        arg: b.call(g, F)
      };
    } catch (P) {
      return {
        type: "throw",
        arg: P
      };
    }
  }
  r.wrap = u;
  var c = {};
  function d() {
  }
  function v() {
  }
  function S() {
  }
  var _ = {};
  s(_, a, function() {
    return this;
  });
  var m = Object.getPrototypeOf, y = m && m(m($([])));
  y && y !== t && e.call(y, a) && (_ = y);
  var p = S.prototype = d.prototype = Object.create(_);
  function C(b) {
    ["next", "throw", "return"].forEach(function(g) {
      s(b, g, function(F) {
        return this._invoke(g, F);
      });
    });
  }
  function E(b, g) {
    function F(R, A, D, J) {
      var X = l(b[R], b, A);
      if (X.type !== "throw") {
        var L = X.arg, Y = L.value;
        return Y && he(Y) == "object" && e.call(Y, "__await") ? g.resolve(Y.__await).then(function(te) {
          F("next", te, D, J);
        }, function(te) {
          F("throw", te, D, J);
        }) : g.resolve(Y).then(function(te) {
          L.value = te, D(L);
        }, function(te) {
          return F("throw", te, D, J);
        });
      }
      J(X.arg);
    }
    var P;
    this._invoke = function(R, A) {
      function D() {
        return new g(function(J, X) {
          F(R, A, J, X);
        });
      }
      return P = P ? P.then(D, D) : D();
    };
  }
  function x(b, g) {
    var F = b.iterator[g.method];
    if (F === void 0) {
      if (g.delegate = null, g.method === "throw") {
        if (b.iterator.return && (g.method = "return", g.arg = void 0, x(b, g), g.method === "throw"))
          return c;
        g.method = "throw", g.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return c;
    }
    var P = l(F, b.iterator, g.arg);
    if (P.type === "throw")
      return g.method = "throw", g.arg = P.arg, g.delegate = null, c;
    var R = P.arg;
    return R ? R.done ? (g[b.resultName] = R.value, g.next = b.nextLoc, g.method !== "return" && (g.method = "next", g.arg = void 0), g.delegate = null, c) : R : (g.method = "throw", g.arg = new TypeError("iterator result is not an object"), g.delegate = null, c);
  }
  function h(b) {
    var g = {
      tryLoc: b[0]
    };
    1 in b && (g.catchLoc = b[1]), 2 in b && (g.finallyLoc = b[2], g.afterLoc = b[3]), this.tryEntries.push(g);
  }
  function N(b) {
    var g = b.completion || {};
    g.type = "normal", delete g.arg, b.completion = g;
  }
  function M(b) {
    this.tryEntries = [{
      tryLoc: "root"
    }], b.forEach(h, this), this.reset(!0);
  }
  function $(b) {
    if (b) {
      var g = b[a];
      if (g)
        return g.call(b);
      if (typeof b.next == "function")
        return b;
      if (!isNaN(b.length)) {
        var F = -1, P = function R() {
          for (; ++F < b.length; )
            if (e.call(b, F))
              return R.value = b[F], R.done = !1, R;
          return R.value = void 0, R.done = !0, R;
        };
        return P.next = P;
      }
    }
    return {
      next: I
    };
  }
  function I() {
    return {
      value: void 0,
      done: !0
    };
  }
  return v.prototype = S, s(p, "constructor", S), s(S, "constructor", v), v.displayName = s(S, o, "GeneratorFunction"), r.isGeneratorFunction = function(b) {
    var g = typeof b == "function" && b.constructor;
    return !!g && (g === v || (g.displayName || g.name) === "GeneratorFunction");
  }, r.mark = function(b) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(b, S) : (b.__proto__ = S, s(b, o, "GeneratorFunction")), b.prototype = Object.create(p), b;
  }, r.awrap = function(b) {
    return {
      __await: b
    };
  }, C(E.prototype), s(E.prototype, i, function() {
    return this;
  }), r.AsyncIterator = E, r.async = function(b, g, F, P, R) {
    R === void 0 && (R = Promise);
    var A = new E(u(b, g, F, P), R);
    return r.isGeneratorFunction(g) ? A : A.next().then(function(D) {
      return D.done ? D.value : A.next();
    });
  }, C(p), s(p, o, "Generator"), s(p, a, function() {
    return this;
  }), s(p, "toString", function() {
    return "[object Generator]";
  }), r.keys = function(b) {
    var g = [];
    for (var F in b)
      g.push(F);
    return g.reverse(), function P() {
      for (; g.length; ) {
        var R = g.pop();
        if (R in b)
          return P.value = R, P.done = !1, P;
      }
      return P.done = !0, P;
    };
  }, r.values = $, M.prototype = {
    constructor: M,
    reset: function(g) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(N), !g)
        for (var F in this)
          F.charAt(0) === "t" && e.call(this, F) && !isNaN(+F.slice(1)) && (this[F] = void 0);
    },
    stop: function() {
      this.done = !0;
      var g = this.tryEntries[0].completion;
      if (g.type === "throw")
        throw g.arg;
      return this.rval;
    },
    dispatchException: function(g) {
      if (this.done)
        throw g;
      var F = this;
      function P(L, Y) {
        return D.type = "throw", D.arg = g, F.next = L, Y && (F.method = "next", F.arg = void 0), !!Y;
      }
      for (var R = this.tryEntries.length - 1; R >= 0; --R) {
        var A = this.tryEntries[R], D = A.completion;
        if (A.tryLoc === "root")
          return P("end");
        if (A.tryLoc <= this.prev) {
          var J = e.call(A, "catchLoc"), X = e.call(A, "finallyLoc");
          if (J && X) {
            if (this.prev < A.catchLoc)
              return P(A.catchLoc, !0);
            if (this.prev < A.finallyLoc)
              return P(A.finallyLoc);
          } else if (J) {
            if (this.prev < A.catchLoc)
              return P(A.catchLoc, !0);
          } else {
            if (!X)
              throw new Error("try statement without catch or finally");
            if (this.prev < A.finallyLoc)
              return P(A.finallyLoc);
          }
        }
      }
    },
    abrupt: function(g, F) {
      for (var P = this.tryEntries.length - 1; P >= 0; --P) {
        var R = this.tryEntries[P];
        if (R.tryLoc <= this.prev && e.call(R, "finallyLoc") && this.prev < R.finallyLoc) {
          var A = R;
          break;
        }
      }
      A && (g === "break" || g === "continue") && A.tryLoc <= F && F <= A.finallyLoc && (A = null);
      var D = A ? A.completion : {};
      return D.type = g, D.arg = F, A ? (this.method = "next", this.next = A.finallyLoc, c) : this.complete(D);
    },
    complete: function(g, F) {
      if (g.type === "throw")
        throw g.arg;
      return g.type === "break" || g.type === "continue" ? this.next = g.arg : g.type === "return" ? (this.rval = this.arg = g.arg, this.method = "return", this.next = "end") : g.type === "normal" && F && (this.next = F), c;
    },
    finish: function(g) {
      for (var F = this.tryEntries.length - 1; F >= 0; --F) {
        var P = this.tryEntries[F];
        if (P.finallyLoc === g)
          return this.complete(P.completion, P.afterLoc), N(P), c;
      }
    },
    catch: function(g) {
      for (var F = this.tryEntries.length - 1; F >= 0; --F) {
        var P = this.tryEntries[F];
        if (P.tryLoc === g) {
          var R = P.completion;
          if (R.type === "throw") {
            var A = R.arg;
            N(P);
          }
          return A;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(g, F, P) {
      return this.delegate = {
        iterator: $(g),
        resultName: F,
        nextLoc: P
      }, this.method === "next" && (this.arg = void 0), c;
    }
  }, r;
}
function rn(r, t, e, n, a, i, o) {
  try {
    var s = r[i](o), u = s.value;
  } catch (l) {
    e(l);
    return;
  }
  s.done ? t(u) : Promise.resolve(u).then(n, a);
}
function $r(r) {
  return function() {
    var t = this, e = arguments;
    return new Promise(function(n, a) {
      var i = r.apply(t, e);
      function o(u) {
        rn(i, n, a, o, s, "next", u);
      }
      function s(u) {
        rn(i, n, a, o, s, "throw", u);
      }
      o(void 0);
    });
  };
}
function He() {
  return He = Object.assign ? Object.assign.bind() : function(r) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
    }
    return r;
  }, He.apply(this, arguments);
}
function vi(r, t) {
  r.prototype = Object.create(t.prototype), r.prototype.constructor = r, vr(r, t);
}
function ct(r) {
  return ct = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, ct(r);
}
function vr(r, t) {
  return vr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, vr(r, t);
}
function gi() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Rr(r, t, e) {
  return gi() ? Rr = Reflect.construct.bind() : Rr = function(a, i, o) {
    var s = [null];
    s.push.apply(s, i);
    var u = Function.bind.apply(a, s), l = new u();
    return o && vr(l, o.prototype), l;
  }, Rr.apply(null, arguments);
}
function pi(r) {
  return Function.toString.call(r).indexOf("[native code]") !== -1;
}
function lt(r) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return lt = function(n) {
    if (n === null || !pi(n))
      return n;
    if (typeof n != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(n))
        return t.get(n);
      t.set(n, a);
    }
    function a() {
      return Rr(n, arguments, ct(this).constructor);
    }
    return a.prototype = Object.create(n.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), vr(a, n);
  }, lt(r);
}
var hi = /%[sdj%]/g, Un = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (Un = function(t, e) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && e.every(function(n) {
    return typeof n == "string";
  }) && console.warn(t, e);
});
function dt(r) {
  if (!r || !r.length)
    return null;
  var t = {};
  return r.forEach(function(e) {
    var n = e.field;
    t[n] = t[n] || [], t[n].push(e);
  }), t;
}
function Pe(r) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    e[n - 1] = arguments[n];
  var a = 0, i = e.length;
  if (typeof r == "function")
    return r.apply(null, e);
  if (typeof r == "string") {
    var o = r.replace(hi, function(s) {
      if (s === "%%")
        return "%";
      if (a >= i)
        return s;
      switch (s) {
        case "%s":
          return String(e[a++]);
        case "%d":
          return Number(e[a++]);
        case "%j":
          try {
            return JSON.stringify(e[a++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return s;
      }
    });
    return o;
  }
  return r;
}
function mi(r) {
  return r === "string" || r === "url" || r === "hex" || r === "email" || r === "date" || r === "pattern";
}
function ve(r, t) {
  return !!(r == null || t === "array" && Array.isArray(r) && !r.length || mi(t) && typeof r == "string" && !r);
}
function yi(r, t, e) {
  var n = [], a = 0, i = r.length;
  function o(s) {
    n.push.apply(n, s || []), a++, a === i && e(n);
  }
  r.forEach(function(s) {
    t(s, o);
  });
}
function tn(r, t, e) {
  var n = 0, a = r.length;
  function i(o) {
    if (o && o.length) {
      e(o);
      return;
    }
    var s = n;
    n = n + 1, s < a ? t(r[s], i) : e([]);
  }
  i([]);
}
function bi(r) {
  var t = [];
  return Object.keys(r).forEach(function(e) {
    t.push.apply(t, r[e] || []);
  }), t;
}
var nn = /* @__PURE__ */ function(r) {
  vi(t, r);
  function t(e, n) {
    var a;
    return a = r.call(this, "Async Validation Error") || this, a.errors = e, a.fields = n, a;
  }
  return t;
}(/* @__PURE__ */ lt(Error));
function Ei(r, t, e, n, a) {
  if (t.first) {
    var i = new Promise(function(v, S) {
      var _ = function(p) {
        return n(p), p.length ? S(new nn(p, dt(p))) : v(a);
      }, m = bi(r);
      tn(m, e, _);
    });
    return i.catch(function(v) {
      return v;
    }), i;
  }
  var o = t.firstFields === !0 ? Object.keys(r) : t.firstFields || [], s = Object.keys(r), u = s.length, l = 0, c = [], d = new Promise(function(v, S) {
    var _ = function(y) {
      if (c.push.apply(c, y), l++, l === u)
        return n(c), c.length ? S(new nn(c, dt(c))) : v(a);
    };
    s.length || (n(c), v(a)), s.forEach(function(m) {
      var y = r[m];
      o.indexOf(m) !== -1 ? tn(y, e, _) : yi(y, e, _);
    });
  });
  return d.catch(function(v) {
    return v;
  }), d;
}
function wi(r) {
  return !!(r && r.message !== void 0);
}
function Fi(r, t) {
  for (var e = r, n = 0; n < t.length; n++) {
    if (e == null)
      return e;
    e = e[t[n]];
  }
  return e;
}
function an(r, t) {
  return function(e) {
    var n;
    return r.fullFields ? n = Fi(t, r.fullFields) : n = t[e.field || r.fullField], wi(e) ? (e.field = e.field || r.fullField, e.fieldValue = n, e) : {
      message: typeof e == "function" ? e() : e,
      fieldValue: n,
      field: e.field || r.fullField
    };
  };
}
function on(r, t) {
  if (t) {
    for (var e in t)
      if (t.hasOwnProperty(e)) {
        var n = t[e];
        typeof n == "object" && typeof r[e] == "object" ? r[e] = He({}, r[e], n) : r[e] = n;
      }
  }
  return r;
}
var zn = function(t, e, n, a, i, o) {
  t.required && (!n.hasOwnProperty(t.field) || ve(e, o || t.type)) && a.push(Pe(i.messages.required, t.fullField));
}, Ci = function(t, e, n, a, i) {
  (/^\s+$/.test(e) || e === "") && a.push(Pe(i.messages.whitespace, t.fullField));
}, br, Si = function() {
  if (br)
    return br;
  var r = "[a-fA-F\\d:]", t = function(x) {
    return x && x.includeBoundaries ? "(?:(?<=\\s|^)(?=" + r + ")|(?<=" + r + ")(?=\\s|$))" : "";
  }, e = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", n = "[a-fA-F\\d]{1,4}", a = (`
(?:
(?:` + n + ":){7}(?:" + n + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + n + ":){6}(?:" + e + "|:" + n + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + n + ":){5}(?::" + e + "|(?::" + n + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + n + ":){4}(?:(?::" + n + "){0,1}:" + e + "|(?::" + n + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + n + ":){3}(?:(?::" + n + "){0,2}:" + e + "|(?::" + n + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + n + ":){2}(?:(?::" + n + "){0,3}:" + e + "|(?::" + n + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + n + ":){1}(?:(?::" + n + "){0,4}:" + e + "|(?::" + n + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + n + "){0,5}:" + e + "|(?::" + n + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), i = new RegExp("(?:^" + e + "$)|(?:^" + a + "$)"), o = new RegExp("^" + e + "$"), s = new RegExp("^" + a + "$"), u = function(x) {
    return x && x.exact ? i : new RegExp("(?:" + t(x) + e + t(x) + ")|(?:" + t(x) + a + t(x) + ")", "g");
  };
  u.v4 = function(E) {
    return E && E.exact ? o : new RegExp("" + t(E) + e + t(E), "g");
  }, u.v6 = function(E) {
    return E && E.exact ? s : new RegExp("" + t(E) + a + t(E), "g");
  };
  var l = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", d = u.v4().source, v = u.v6().source, S = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", _ = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", m = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", y = "(?::\\d{2,5})?", p = '(?:[/?#][^\\s"]*)?', C = "(?:" + l + "|www\\.)" + c + "(?:localhost|" + d + "|" + v + "|" + S + _ + m + ")" + y + p;
  return br = new RegExp("(?:^" + C + "$)", "i"), br;
}, sn = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, fr = {
  integer: function(t) {
    return fr.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return fr.number(t) && !fr.integer(t);
  },
  array: function(t) {
    return Array.isArray(t);
  },
  regexp: function(t) {
    if (t instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(t);
    } catch {
      return !1;
    }
  },
  date: function(t) {
    return typeof t.getTime == "function" && typeof t.getMonth == "function" && typeof t.getYear == "function" && !isNaN(t.getTime());
  },
  number: function(t) {
    return isNaN(t) ? !1 : typeof t == "number";
  },
  object: function(t) {
    return typeof t == "object" && !fr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(sn.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(Si());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(sn.hex);
  }
}, Pi = function(t, e, n, a, i) {
  if (t.required && e === void 0) {
    zn(t, e, n, a, i);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = t.type;
  o.indexOf(s) > -1 ? fr[s](e) || a.push(Pe(i.messages.types[s], t.fullField, t.type)) : s && typeof e !== t.type && a.push(Pe(i.messages.types[s], t.fullField, t.type));
}, xi = function(t, e, n, a, i) {
  var o = typeof t.len == "number", s = typeof t.min == "number", u = typeof t.max == "number", l = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = e, d = null, v = typeof e == "number", S = typeof e == "string", _ = Array.isArray(e);
  if (v ? d = "number" : S ? d = "string" : _ && (d = "array"), !d)
    return !1;
  _ && (c = e.length), S && (c = e.replace(l, "_").length), o ? c !== t.len && a.push(Pe(i.messages[d].len, t.fullField, t.len)) : s && !u && c < t.min ? a.push(Pe(i.messages[d].min, t.fullField, t.min)) : u && !s && c > t.max ? a.push(Pe(i.messages[d].max, t.fullField, t.max)) : s && u && (c < t.min || c > t.max) && a.push(Pe(i.messages[d].range, t.fullField, t.min, t.max));
}, Je = "enum", _i = function(t, e, n, a, i) {
  t[Je] = Array.isArray(t[Je]) ? t[Je] : [], t[Je].indexOf(e) === -1 && a.push(Pe(i.messages[Je], t.fullField, t[Je].join(", ")));
}, Ri = function(t, e, n, a, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(e) || a.push(Pe(i.messages.pattern.mismatch, t.fullField, e, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(e) || a.push(Pe(i.messages.pattern.mismatch, t.fullField, e, t.pattern));
    }
  }
}, W = {
  required: zn,
  whitespace: Ci,
  type: Pi,
  range: xi,
  enum: _i,
  pattern: Ri
}, Ti = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e, "string") && !t.required)
      return n();
    W.required(t, e, a, o, i, "string"), ve(e, "string") || (W.type(t, e, a, o, i), W.range(t, e, a, o, i), W.pattern(t, e, a, o, i), t.whitespace === !0 && W.whitespace(t, e, a, o, i));
  }
  n(o);
}, Oi = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e) && !t.required)
      return n();
    W.required(t, e, a, o, i), e !== void 0 && W.type(t, e, a, o, i);
  }
  n(o);
}, Ai = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (e === "" && (e = void 0), ve(e) && !t.required)
      return n();
    W.required(t, e, a, o, i), e !== void 0 && (W.type(t, e, a, o, i), W.range(t, e, a, o, i));
  }
  n(o);
}, Ni = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e) && !t.required)
      return n();
    W.required(t, e, a, o, i), e !== void 0 && W.type(t, e, a, o, i);
  }
  n(o);
}, ki = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e) && !t.required)
      return n();
    W.required(t, e, a, o, i), ve(e) || W.type(t, e, a, o, i);
  }
  n(o);
}, Vi = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e) && !t.required)
      return n();
    W.required(t, e, a, o, i), e !== void 0 && (W.type(t, e, a, o, i), W.range(t, e, a, o, i));
  }
  n(o);
}, $i = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e) && !t.required)
      return n();
    W.required(t, e, a, o, i), e !== void 0 && (W.type(t, e, a, o, i), W.range(t, e, a, o, i));
  }
  n(o);
}, Mi = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (e == null && !t.required)
      return n();
    W.required(t, e, a, o, i, "array"), e != null && (W.type(t, e, a, o, i), W.range(t, e, a, o, i));
  }
  n(o);
}, Ii = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e) && !t.required)
      return n();
    W.required(t, e, a, o, i), e !== void 0 && W.type(t, e, a, o, i);
  }
  n(o);
}, ji = "enum", Li = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e) && !t.required)
      return n();
    W.required(t, e, a, o, i), e !== void 0 && W[ji](t, e, a, o, i);
  }
  n(o);
}, Di = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e, "string") && !t.required)
      return n();
    W.required(t, e, a, o, i), ve(e, "string") || W.pattern(t, e, a, o, i);
  }
  n(o);
}, qi = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e, "date") && !t.required)
      return n();
    if (W.required(t, e, a, o, i), !ve(e, "date")) {
      var u;
      e instanceof Date ? u = e : u = new Date(e), W.type(t, u, a, o, i), u && W.range(t, u.getTime(), a, o, i);
    }
  }
  n(o);
}, Wi = function(t, e, n, a, i) {
  var o = [], s = Array.isArray(e) ? "array" : typeof e;
  W.required(t, e, a, o, i, s), n(o);
}, Hr = function(t, e, n, a, i) {
  var o = t.type, s = [], u = t.required || !t.required && a.hasOwnProperty(t.field);
  if (u) {
    if (ve(e, o) && !t.required)
      return n();
    W.required(t, e, a, s, i, o), ve(e, o) || W.type(t, e, a, s, i);
  }
  n(s);
}, Ui = function(t, e, n, a, i) {
  var o = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (ve(e) && !t.required)
      return n();
    W.required(t, e, a, o, i);
  }
  n(o);
}, cr = {
  string: Ti,
  method: Oi,
  number: Ai,
  boolean: Ni,
  regexp: ki,
  integer: Vi,
  float: $i,
  array: Mi,
  object: Ii,
  enum: Li,
  pattern: Di,
  date: qi,
  url: Hr,
  hex: Hr,
  email: Hr,
  required: Wi,
  any: Ui
};
function vt() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var t = JSON.parse(JSON.stringify(this));
      return t.clone = this.clone, t;
    }
  };
}
var gt = vt(), mr = /* @__PURE__ */ function() {
  function r(e) {
    this.rules = null, this._messages = gt, this.define(e);
  }
  var t = r.prototype;
  return t.define = function(n) {
    var a = this;
    if (!n)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof n != "object" || Array.isArray(n))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(n).forEach(function(i) {
      var o = n[i];
      a.rules[i] = Array.isArray(o) ? o : [o];
    });
  }, t.messages = function(n) {
    return n && (this._messages = on(vt(), n)), this._messages;
  }, t.validate = function(n, a, i) {
    var o = this;
    a === void 0 && (a = {}), i === void 0 && (i = function() {
    });
    var s = n, u = a, l = i;
    if (typeof u == "function" && (l = u, u = {}), !this.rules || Object.keys(this.rules).length === 0)
      return l && l(null, s), Promise.resolve(s);
    function c(m) {
      var y = [], p = {};
      function C(x) {
        if (Array.isArray(x)) {
          var h;
          y = (h = y).concat.apply(h, x);
        } else
          y.push(x);
      }
      for (var E = 0; E < m.length; E++)
        C(m[E]);
      y.length ? (p = dt(y), l(y, p)) : l(null, s);
    }
    if (u.messages) {
      var d = this.messages();
      d === gt && (d = vt()), on(d, u.messages), u.messages = d;
    } else
      u.messages = this.messages();
    var v = {}, S = u.keys || Object.keys(this.rules);
    S.forEach(function(m) {
      var y = o.rules[m], p = s[m];
      y.forEach(function(C) {
        var E = C;
        typeof E.transform == "function" && (s === n && (s = He({}, s)), p = s[m] = E.transform(p)), typeof E == "function" ? E = {
          validator: E
        } : E = He({}, E), E.validator = o.getValidationMethod(E), E.validator && (E.field = m, E.fullField = E.fullField || m, E.type = o.getType(E), v[m] = v[m] || [], v[m].push({
          rule: E,
          value: p,
          source: s,
          field: m
        }));
      });
    });
    var _ = {};
    return Ei(v, u, function(m, y) {
      var p = m.rule, C = (p.type === "object" || p.type === "array") && (typeof p.fields == "object" || typeof p.defaultField == "object");
      C = C && (p.required || !p.required && m.value), p.field = m.field;
      function E(N, M) {
        return He({}, M, {
          fullField: p.fullField + "." + N,
          fullFields: p.fullFields ? [].concat(p.fullFields, [N]) : [N]
        });
      }
      function x(N) {
        N === void 0 && (N = []);
        var M = Array.isArray(N) ? N : [N];
        !u.suppressWarning && M.length && r.warning("async-validator:", M), M.length && p.message !== void 0 && (M = [].concat(p.message));
        var $ = M.map(an(p, s));
        if (u.first && $.length)
          return _[p.field] = 1, y($);
        if (!C)
          y($);
        else {
          if (p.required && !m.value)
            return p.message !== void 0 ? $ = [].concat(p.message).map(an(p, s)) : u.error && ($ = [u.error(p, Pe(u.messages.required, p.field))]), y($);
          var I = {};
          p.defaultField && Object.keys(m.value).map(function(F) {
            I[F] = p.defaultField;
          }), I = He({}, I, m.rule.fields);
          var b = {};
          Object.keys(I).forEach(function(F) {
            var P = I[F], R = Array.isArray(P) ? P : [P];
            b[F] = R.map(E.bind(null, F));
          });
          var g = new r(b);
          g.messages(u.messages), m.rule.options && (m.rule.options.messages = u.messages, m.rule.options.error = u.error), g.validate(m.value, m.rule.options || u, function(F) {
            var P = [];
            $ && $.length && P.push.apply(P, $), F && F.length && P.push.apply(P, F), y(P.length ? P : null);
          });
        }
      }
      var h;
      if (p.asyncValidator)
        h = p.asyncValidator(p, m.value, x, m.source, u);
      else if (p.validator) {
        try {
          h = p.validator(p, m.value, x, m.source, u);
        } catch (N) {
          console.error == null || console.error(N), u.suppressValidatorError || setTimeout(function() {
            throw N;
          }, 0), x(N.message);
        }
        h === !0 ? x() : h === !1 ? x(typeof p.message == "function" ? p.message(p.fullField || p.field) : p.message || (p.fullField || p.field) + " fails") : h instanceof Array ? x(h) : h instanceof Error && x(h.message);
      }
      h && h.then && h.then(function() {
        return x();
      }, function(N) {
        return x(N);
      });
    }, function(m) {
      c(m);
    }, s);
  }, t.getType = function(n) {
    if (n.type === void 0 && n.pattern instanceof RegExp && (n.type = "pattern"), typeof n.validator != "function" && n.type && !cr.hasOwnProperty(n.type))
      throw new Error(Pe("Unknown rule type %s", n.type));
    return n.type || "string";
  }, t.getValidationMethod = function(n) {
    if (typeof n.validator == "function")
      return n.validator;
    var a = Object.keys(n), i = a.indexOf("message");
    return i !== -1 && a.splice(i, 1), a.length === 1 && a[0] === "required" ? cr.required : cr[this.getType(n)] || void 0;
  }, r;
}();
mr.register = function(t, e) {
  if (typeof e != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  cr[t] = e;
};
mr.warning = Un;
mr.messages = gt;
mr.validators = cr;
var Ce = "'${name}' is not a valid ${type}", Yn = {
  default: "Validation error on field '${name}'",
  required: "'${name}' is required",
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date"
  },
  types: {
    string: Ce,
    method: Ce,
    array: Ce,
    object: Ce,
    number: Ce,
    date: Ce,
    boolean: Ce,
    integer: Ce,
    float: Ce,
    regexp: Ce,
    email: Ce,
    url: Ce,
    hex: Ce
  },
  string: {
    len: "'${name}' must be exactly ${len} characters",
    min: "'${name}' must be at least ${min} characters",
    max: "'${name}' cannot be longer than ${max} characters",
    range: "'${name}' must be between ${min} and ${max} characters"
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}"
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length"
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}"
  }
};
function Hn(r, t) {
  for (var e = r, n = 0; n < t.length; n += 1) {
    if (e == null)
      return;
    e = e[t[n]];
  }
  return e;
}
function Bn(r) {
  if (Array.isArray(r))
    return r;
}
function Gn() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zi(r) {
  return Bn(r) || Wn(r) || Tt(r) || Gn();
}
function Kn(r, t, e, n) {
  if (!t.length)
    return e;
  var a = zi(t), i = a[0], o = a.slice(1), s;
  return !r && typeof i == "number" ? s = [] : Array.isArray(r) ? s = U(r) : s = V({}, r), n && e === void 0 && o.length === 1 ? delete s[i][o[0]] : s[i] = Kn(s[i], o, e, n), s;
}
function Yi(r, t, e) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && n && e === void 0 && !Hn(r, t.slice(0, -1)) ? r : Kn(r, t, e, n);
}
function Mr(r) {
  return Array.isArray(r) ? Bi(r) : he(r) === "object" && r !== null ? Hi(r) : r;
}
function Hi(r) {
  if (Object.getPrototypeOf(r) === Object.prototype) {
    var t = {};
    for (var e in r)
      t[e] = Mr(r[e]);
    return t;
  }
  return r;
}
function Bi(r) {
  return r.map(function(t) {
    return Mr(t);
  });
}
function fe(r) {
  return ft(r);
}
function We(r, t) {
  var e = Hn(r, t);
  return e;
}
function qe(r, t, e) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, a = Yi(r, t, e, n);
  return a;
}
function un(r, t) {
  var e = {};
  return t.forEach(function(n) {
    var a = We(r, n);
    e = qe(e, n, a);
  }), e;
}
function lr(r, t) {
  return r && r.some(function(e) {
    return Zn(e, t);
  });
}
function fn(r) {
  return he(r) === "object" && r !== null && Object.getPrototypeOf(r) === Object.prototype;
}
function Jn(r, t) {
  var e = Array.isArray(r) ? U(r) : V({}, r);
  return t && Object.keys(t).forEach(function(n) {
    var a = e[n], i = t[n], o = fn(a) && fn(i);
    e[n] = o ? Jn(a, i || {}) : Mr(i);
  }), e;
}
function Tr(r) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    e[n - 1] = arguments[n];
  return e.reduce(function(a, i) {
    return Jn(a, i);
  }, r);
}
function Zn(r, t) {
  return !r || !t || r.length !== t.length ? !1 : r.every(function(e, n) {
    return t[n] === e;
  });
}
function Gi(r, t) {
  if (r === t)
    return !0;
  if (!r && t || r && !t || !r || !t || he(r) !== "object" || he(t) !== "object")
    return !1;
  var e = Object.keys(r), n = Object.keys(t), a = new Set([].concat(U(e), U(n)));
  return U(a).every(function(i) {
    var o = r[i], s = t[i];
    return typeof o == "function" && typeof s == "function" ? !0 : o === s;
  });
}
function Ki(r) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && he(t.target) === "object" && r in t.target ? t.target[r] : t;
}
function cn(r, t, e) {
  var n = r.length;
  if (t < 0 || t >= n || e < 0 || e >= n)
    return r;
  var a = r[t], i = t - e;
  return i > 0 ? [].concat(U(r.slice(0, e)), [a], U(r.slice(e, t)), U(r.slice(t + 1, n))) : i < 0 ? [].concat(U(r.slice(0, t)), U(r.slice(t + 1, e + 1)), [a], U(r.slice(e + 1, n))) : r;
}
var Ji = mr;
function Zi(r, t) {
  return r.replace(/\$\{\w+\}/g, function(e) {
    var n = e.slice(2, -1);
    return t[n];
  });
}
var ln = "CODE_LOGIC_ERROR";
function pt(r, t, e, n, a) {
  return ht.apply(this, arguments);
}
function ht() {
  return ht = $r(/* @__PURE__ */ Le().mark(function r(t, e, n, a, i) {
    var o, s, u, l, c, d, v, S, _;
    return Le().wrap(function(y) {
      for (; ; )
        switch (y.prev = y.next) {
          case 0:
            return o = V({}, n), delete o.ruleIndex, o.validator && (s = o.validator, o.validator = function() {
              try {
                return s.apply(void 0, arguments);
              } catch (p) {
                return console.error(p), Promise.reject(ln);
              }
            }), u = null, o && o.type === "array" && o.defaultField && (u = o.defaultField, delete o.defaultField), l = new Ji(B({}, t, [o])), c = Tr({}, Yn, a.validateMessages), l.messages(c), d = [], y.prev = 9, y.next = 12, Promise.resolve(l.validate(B({}, t, e), V({}, a)));
          case 12:
            y.next = 17;
            break;
          case 14:
            y.prev = 14, y.t0 = y.catch(9), y.t0.errors && (d = y.t0.errors.map(function(p, C) {
              var E = p.message, x = E === ln ? c.default : E;
              return /* @__PURE__ */ O.isValidElement(x) ? /* @__PURE__ */ O.cloneElement(x, {
                key: "error_".concat(C)
              }) : x;
            }));
          case 17:
            if (!(!d.length && u)) {
              y.next = 22;
              break;
            }
            return y.next = 20, Promise.all(e.map(function(p, C) {
              return pt("".concat(t, ".").concat(C), p, u, a, i);
            }));
          case 20:
            return v = y.sent, y.abrupt("return", v.reduce(function(p, C) {
              return [].concat(U(p), U(C));
            }, []));
          case 22:
            return S = V(V({}, n), {}, {
              name: t,
              enum: (n.enum || []).join(", ")
            }, i), _ = d.map(function(p) {
              return typeof p == "string" ? Zi(p, S) : p;
            }), y.abrupt("return", _);
          case 25:
          case "end":
            return y.stop();
        }
    }, r, null, [[9, 14]]);
  })), ht.apply(this, arguments);
}
function Qi(r, t, e, n, a, i) {
  var o = r.join("."), s = e.map(function(c, d) {
    var v = c.validator, S = V(V({}, c), {}, {
      ruleIndex: d
    });
    return v && (S.validator = function(_, m, y) {
      var p = !1, C = function() {
        for (var h = arguments.length, N = new Array(h), M = 0; M < h; M++)
          N[M] = arguments[M];
        Promise.resolve().then(function() {
          we(!p, "Your validator function has already return a promise. `callback` will be ignored."), p || y.apply(void 0, N);
        });
      }, E = v(_, m, C);
      p = E && typeof E.then == "function" && typeof E.catch == "function", we(p, "`callback` is deprecated. Please return a promise instead."), p && E.then(function() {
        y();
      }).catch(function(x) {
        y(x || " ");
      });
    }), S;
  }).sort(function(c, d) {
    var v = c.warningOnly, S = c.ruleIndex, _ = d.warningOnly, m = d.ruleIndex;
    return !!v == !!_ ? S - m : v ? 1 : -1;
  }), u;
  if (a === !0)
    u = new Promise(/* @__PURE__ */ function() {
      var c = $r(/* @__PURE__ */ Le().mark(function d(v, S) {
        var _, m, y;
        return Le().wrap(function(C) {
          for (; ; )
            switch (C.prev = C.next) {
              case 0:
                _ = 0;
              case 1:
                if (!(_ < s.length)) {
                  C.next = 12;
                  break;
                }
                return m = s[_], C.next = 5, pt(o, t, m, n, i);
              case 5:
                if (y = C.sent, !y.length) {
                  C.next = 9;
                  break;
                }
                return S([{
                  errors: y,
                  rule: m
                }]), C.abrupt("return");
              case 9:
                _ += 1, C.next = 1;
                break;
              case 12:
                v([]);
              case 13:
              case "end":
                return C.stop();
            }
        }, d);
      }));
      return function(d, v) {
        return c.apply(this, arguments);
      };
    }());
  else {
    var l = s.map(function(c) {
      return pt(o, t, c, n, i).then(function(d) {
        return {
          errors: d,
          rule: c
        };
      });
    });
    u = (a ? eo(l) : Xi(l)).then(function(c) {
      return Promise.reject(c);
    });
  }
  return u.catch(function(c) {
    return c;
  }), u;
}
function Xi(r) {
  return mt.apply(this, arguments);
}
function mt() {
  return mt = $r(/* @__PURE__ */ Le().mark(function r(t) {
    return Le().wrap(function(n) {
      for (; ; )
        switch (n.prev = n.next) {
          case 0:
            return n.abrupt("return", Promise.all(t).then(function(a) {
              var i, o = (i = []).concat.apply(i, U(a));
              return o;
            }));
          case 1:
          case "end":
            return n.stop();
        }
    }, r);
  })), mt.apply(this, arguments);
}
function eo(r) {
  return yt.apply(this, arguments);
}
function yt() {
  return yt = $r(/* @__PURE__ */ Le().mark(function r(t) {
    var e;
    return Le().wrap(function(a) {
      for (; ; )
        switch (a.prev = a.next) {
          case 0:
            return e = 0, a.abrupt("return", new Promise(function(i) {
              t.forEach(function(o) {
                o.then(function(s) {
                  s.errors.length && i([s]), e += 1, e === t.length && i([]);
                });
              });
            }));
          case 2:
          case "end":
            return a.stop();
        }
    }, r);
  })), yt.apply(this, arguments);
}
var ro = ["name"], _e = [];
function dn(r, t, e, n, a, i) {
  return typeof r == "function" ? r(t, e, "source" in i ? {
    source: i.source
  } : {}) : n !== a;
}
var Ot = /* @__PURE__ */ function(r) {
  Pt(e, r);
  var t = _t(e);
  function e(n) {
    var a;
    if (gr(this, e), a = t.call(this, n), a.state = {
      resetCount: 0
    }, a.cancelRegisterFunc = null, a.mounted = !1, a.touched = !1, a.dirty = !1, a.validatePromise = null, a.prevValidating = void 0, a.errors = _e, a.warnings = _e, a.cancelRegister = function() {
      var u = a.props, l = u.preserve, c = u.isListField, d = u.name;
      a.cancelRegisterFunc && a.cancelRegisterFunc(c, l, fe(d)), a.cancelRegisterFunc = null;
    }, a.getNamePath = function() {
      var u = a.props, l = u.name, c = u.fieldContext, d = c.prefixName, v = d === void 0 ? [] : d;
      return l !== void 0 ? [].concat(U(v), U(l)) : [];
    }, a.getRules = function() {
      var u = a.props, l = u.rules, c = l === void 0 ? [] : l, d = u.fieldContext;
      return c.map(function(v) {
        return typeof v == "function" ? v(d) : v;
      });
    }, a.refresh = function() {
      !a.mounted || a.setState(function(u) {
        var l = u.resetCount;
        return {
          resetCount: l + 1
        };
      });
    }, a.triggerMetaEvent = function(u) {
      var l = a.props.onMetaChange;
      l == null || l(V(V({}, a.getMeta()), {}, {
        destroy: u
      }));
    }, a.onStoreChange = function(u, l, c) {
      var d = a.props, v = d.shouldUpdate, S = d.dependencies, _ = S === void 0 ? [] : S, m = d.onReset, y = c.store, p = a.getNamePath(), C = a.getValue(u), E = a.getValue(y), x = l && lr(l, p);
      switch (c.type === "valueUpdate" && c.source === "external" && C !== E && (a.touched = !0, a.dirty = !0, a.validatePromise = null, a.errors = _e, a.warnings = _e, a.triggerMetaEvent()), c.type) {
        case "reset":
          if (!l || x) {
            a.touched = !1, a.dirty = !1, a.validatePromise = null, a.errors = _e, a.warnings = _e, a.triggerMetaEvent(), m == null || m(), a.refresh();
            return;
          }
          break;
        case "remove": {
          if (v) {
            a.reRender();
            return;
          }
          break;
        }
        case "setField": {
          if (x) {
            var h = c.data;
            "touched" in h && (a.touched = h.touched), "validating" in h && !("originRCField" in h) && (a.validatePromise = h.validating ? Promise.resolve([]) : null), "errors" in h && (a.errors = h.errors || _e), "warnings" in h && (a.warnings = h.warnings || _e), a.dirty = !0, a.triggerMetaEvent(), a.reRender();
            return;
          }
          if (v && !p.length && dn(v, u, y, C, E, c)) {
            a.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var N = _.map(fe);
          if (N.some(function(M) {
            return lr(c.relatedFields, M);
          })) {
            a.reRender();
            return;
          }
          break;
        }
        default:
          if (x || (!_.length || p.length || v) && dn(v, u, y, C, E, c)) {
            a.reRender();
            return;
          }
          break;
      }
      v === !0 && a.reRender();
    }, a.validateRules = function(u) {
      var l = a.getNamePath(), c = a.getValue(), d = Promise.resolve().then(function() {
        if (!a.mounted)
          return [];
        var v = a.props, S = v.validateFirst, _ = S === void 0 ? !1 : S, m = v.messageVariables, y = u || {}, p = y.triggerName, C = a.getRules();
        p && (C = C.filter(function(x) {
          var h = x.validateTrigger;
          if (!h)
            return !0;
          var N = ft(h);
          return N.includes(p);
        }));
        var E = Qi(l, c, C, u, _, m);
        return E.catch(function(x) {
          return x;
        }).then(function() {
          var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _e;
          if (a.validatePromise === d) {
            a.validatePromise = null;
            var h = [], N = [];
            x.forEach(function(M) {
              var $ = M.rule.warningOnly, I = M.errors, b = I === void 0 ? _e : I;
              $ ? N.push.apply(N, U(b)) : h.push.apply(h, U(b));
            }), a.errors = h, a.warnings = N, a.triggerMetaEvent(), a.reRender();
          }
        }), E;
      });
      return a.validatePromise = d, a.dirty = !0, a.errors = _e, a.warnings = _e, a.triggerMetaEvent(), a.reRender(), d;
    }, a.isFieldValidating = function() {
      return !!a.validatePromise;
    }, a.isFieldTouched = function() {
      return a.touched;
    }, a.isFieldDirty = function() {
      if (a.dirty || a.props.initialValue !== void 0)
        return !0;
      var u = a.props.fieldContext, l = u.getInternalHooks(Ye), c = l.getInitialValue;
      return c(a.getNamePath()) !== void 0;
    }, a.getErrors = function() {
      return a.errors;
    }, a.getWarnings = function() {
      return a.warnings;
    }, a.isListField = function() {
      return a.props.isListField;
    }, a.isList = function() {
      return a.props.isList;
    }, a.isPreserve = function() {
      return a.props.preserve;
    }, a.getMeta = function() {
      a.prevValidating = a.isFieldValidating();
      var u = {
        touched: a.isFieldTouched(),
        validating: a.prevValidating,
        errors: a.errors,
        warnings: a.warnings,
        name: a.getNamePath()
      };
      return u;
    }, a.getOnlyChild = function(u) {
      if (typeof u == "function") {
        var l = a.getMeta();
        return V(V({}, a.getOnlyChild(u(a.getControlled(), l, a.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var c = ot(u);
      return c.length !== 1 || !/* @__PURE__ */ O.isValidElement(c[0]) ? {
        child: c,
        isFunction: !1
      } : {
        child: c[0],
        isFunction: !1
      };
    }, a.getValue = function(u) {
      var l = a.props.fieldContext.getFieldsValue, c = a.getNamePath();
      return We(u || l(!0), c);
    }, a.getControlled = function() {
      var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, l = a.props, c = l.trigger, d = l.validateTrigger, v = l.getValueFromEvent, S = l.normalize, _ = l.valuePropName, m = l.getValueProps, y = l.fieldContext, p = d !== void 0 ? d : y.validateTrigger, C = a.getNamePath(), E = y.getInternalHooks, x = y.getFieldsValue, h = E(Ye), N = h.dispatch, M = a.getValue(), $ = m || function(F) {
        return B({}, _, F);
      }, I = u[c], b = V(V({}, u), $(M));
      b[c] = function() {
        a.touched = !0, a.dirty = !0, a.triggerMetaEvent();
        for (var F, P = arguments.length, R = new Array(P), A = 0; A < P; A++)
          R[A] = arguments[A];
        v ? F = v.apply(void 0, R) : F = Ki.apply(void 0, [_].concat(R)), S && (F = S(F, M, x(!0))), N({
          type: "updateValue",
          namePath: C,
          value: F
        }), I && I.apply(void 0, R);
      };
      var g = ft(p || []);
      return g.forEach(function(F) {
        var P = b[F];
        b[F] = function() {
          P && P.apply(void 0, arguments);
          var R = a.props.rules;
          R && R.length && N({
            type: "validateField",
            namePath: C,
            triggerName: F
          });
        };
      }), b;
    }, n.fieldContext) {
      var i = n.fieldContext.getInternalHooks, o = i(Ye), s = o.initEntityValue;
      s(xt(a));
    }
    return a;
  }
  return pr(e, [{
    key: "componentDidMount",
    value: function() {
      var a = this.props, i = a.shouldUpdate, o = a.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, u = s(Ye), l = u.registerField;
        this.cancelRegisterFunc = l(this);
      }
      i === !0 && this.reRender();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.cancelRegister(), this.triggerMetaEvent(!0), this.mounted = !1;
    }
  }, {
    key: "reRender",
    value: function() {
      !this.mounted || this.forceUpdate();
    }
  }, {
    key: "render",
    value: function() {
      this.state.resetCount;
      var a = this.props.children, i = this.getOnlyChild(a), o = i.child, s = i.isFunction, u;
      return s ? u = o : /* @__PURE__ */ O.isValidElement(o) ? u = /* @__PURE__ */ O.cloneElement(o, this.getControlled(o.props)) : (we(!o, "`children` of Field is not validate ReactElement."), u = o), /* @__PURE__ */ re(si, {
        children: u
      });
    }
  }]), e;
}(O.Component);
Ot.contextType = nr;
Ot.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function Qn(r) {
  var t = r.name, e = hr(r, ro), n = O.useContext(nr), a = t !== void 0 ? fe(t) : void 0, i = "keep";
  return e.isListField || (i = "_".concat((a || []).join("_"))), process.env.NODE_ENV !== "production" && e.preserve === !1 && e.isListField && a.length <= 1 && we(!1, "`preserve` should not apply on Form.List fields."), /* @__PURE__ */ re(Ot, {
    name: a,
    ...e,
    fieldContext: n
  }, i);
}
var to = /* @__PURE__ */ O.createContext(null), no = function(t) {
  var e = t.name, n = t.initialValue, a = t.children, i = t.rules, o = t.validateTrigger, s = O.useContext(nr), u = O.useRef({
    keys: [],
    id: 0
  }), l = u.current, c = O.useMemo(function() {
    var _ = fe(s.prefixName) || [];
    return [].concat(U(_), U(fe(e)));
  }, [s.prefixName, e]), d = O.useMemo(function() {
    return V(V({}, s), {}, {
      prefixName: c
    });
  }, [s, c]), v = O.useMemo(function() {
    return {
      getKey: function(m) {
        var y = c.length, p = m[y];
        return [l.keys[p], m.slice(y + 1)];
      }
    };
  }, [c]);
  if (typeof a != "function")
    return we(!1, "Form.List only accepts function as children."), null;
  var S = function(m, y, p) {
    var C = p.source;
    return C === "internal" ? !1 : m !== y;
  };
  return /* @__PURE__ */ re(to.Provider, {
    value: v,
    children: /* @__PURE__ */ re(nr.Provider, {
      value: d,
      children: /* @__PURE__ */ re(Qn, {
        name: [],
        shouldUpdate: S,
        rules: i,
        validateTrigger: o,
        initialValue: n,
        isList: !0,
        children: function(_, m) {
          var y = _.value, p = y === void 0 ? [] : y, C = _.onChange, E = s.getFieldValue, x = function() {
            var $ = E(c || []);
            return $ || [];
          }, h = {
            add: function($, I) {
              var b = x();
              I >= 0 && I <= b.length ? (l.keys = [].concat(U(l.keys.slice(0, I)), [l.id], U(l.keys.slice(I))), C([].concat(U(b.slice(0, I)), [$], U(b.slice(I))))) : (process.env.NODE_ENV !== "production" && (I < 0 || I > b.length) && we(!1, "The second parameter of the add function should be a valid positive number."), l.keys = [].concat(U(l.keys), [l.id]), C([].concat(U(b), [$]))), l.id += 1;
            },
            remove: function($) {
              var I = x(), b = new Set(Array.isArray($) ? $ : [$]);
              b.size <= 0 || (l.keys = l.keys.filter(function(g, F) {
                return !b.has(F);
              }), C(I.filter(function(g, F) {
                return !b.has(F);
              })));
            },
            move: function($, I) {
              if ($ !== I) {
                var b = x();
                $ < 0 || $ >= b.length || I < 0 || I >= b.length || (l.keys = cn(l.keys, $, I), C(cn(b, $, I)));
              }
            }
          }, N = p || [];
          return Array.isArray(N) || (N = [], process.env.NODE_ENV !== "production" && we(!1, "Current value of '".concat(c.join(" > "), "' is not an array type."))), a(N.map(function(M, $) {
            var I = l.keys[$];
            return I === void 0 && (l.keys[$] = l.id, I = l.keys[$], l.id += 1), {
              name: $,
              key: I,
              isListField: !0
            };
          }), h, m);
        }
      })
    })
  });
};
function ao(r, t) {
  var e = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
  if (e != null) {
    var n = [], a = !0, i = !1, o, s;
    try {
      for (e = e.call(r); !(a = (o = e.next()).done) && (n.push(o.value), !(t && n.length === t)); a = !0)
        ;
    } catch (u) {
      i = !0, s = u;
    } finally {
      try {
        !a && e.return != null && e.return();
      } finally {
        if (i)
          throw s;
      }
    }
    return n;
  }
}
function ge(r, t) {
  return Bn(r) || ao(r, t) || Tt(r, t) || Gn();
}
function io(r) {
  var t = !1, e = r.length, n = [];
  return r.length ? new Promise(function(a, i) {
    r.forEach(function(o, s) {
      o.catch(function(u) {
        return t = !0, u;
      }).then(function(u) {
        e -= 1, n[s] = u, !(e > 0) && (t && i(n), a(n));
      });
    });
  }) : Promise.resolve([]);
}
var Xn = "__@field_split__";
function Br(r) {
  return r.map(function(t) {
    return "".concat(he(t), ":").concat(t);
  }).join(Xn);
}
var Ze = /* @__PURE__ */ function() {
  function r() {
    gr(this, r), this.kvs = /* @__PURE__ */ new Map();
  }
  return pr(r, [{
    key: "set",
    value: function(e, n) {
      this.kvs.set(Br(e), n);
    }
  }, {
    key: "get",
    value: function(e) {
      return this.kvs.get(Br(e));
    }
  }, {
    key: "update",
    value: function(e, n) {
      var a = this.get(e), i = n(a);
      i ? this.set(e, i) : this.delete(e);
    }
  }, {
    key: "delete",
    value: function(e) {
      this.kvs.delete(Br(e));
    }
  }, {
    key: "map",
    value: function(e) {
      return U(this.kvs.entries()).map(function(n) {
        var a = ge(n, 2), i = a[0], o = a[1], s = i.split(Xn);
        return e({
          key: s.map(function(u) {
            var l = u.match(/^([^:]*):(.*)$/), c = ge(l, 3), d = c[1], v = c[2];
            return d === "number" ? Number(v) : v;
          }),
          value: o
        });
      });
    }
  }, {
    key: "toJSON",
    value: function() {
      var e = {};
      return this.map(function(n) {
        var a = n.key, i = n.value;
        return e[a.join(".")] = i, null;
      }), e;
    }
  }]), r;
}(), oo = ["name", "errors"], so = /* @__PURE__ */ pr(function r(t) {
  var e = this;
  gr(this, r), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
    return {
      getFieldValue: e.getFieldValue,
      getFieldsValue: e.getFieldsValue,
      getFieldError: e.getFieldError,
      getFieldWarning: e.getFieldWarning,
      getFieldsError: e.getFieldsError,
      isFieldsTouched: e.isFieldsTouched,
      isFieldTouched: e.isFieldTouched,
      isFieldValidating: e.isFieldValidating,
      isFieldsValidating: e.isFieldsValidating,
      resetFields: e.resetFields,
      setFields: e.setFields,
      setFieldsValue: e.setFieldsValue,
      validateFields: e.validateFields,
      submit: e.submit,
      _init: !0,
      getInternalHooks: e.getInternalHooks
    };
  }, this.getInternalHooks = function(n) {
    return n === Ye ? (e.formHooked = !0, {
      dispatch: e.dispatch,
      initEntityValue: e.initEntityValue,
      registerField: e.registerField,
      useSubscribe: e.useSubscribe,
      setInitialValues: e.setInitialValues,
      destroyForm: e.destroyForm,
      setCallbacks: e.setCallbacks,
      setValidateMessages: e.setValidateMessages,
      getFields: e.getFields,
      setPreserve: e.setPreserve,
      getInitialValue: e.getInitialValue,
      registerWatch: e.registerWatch
    }) : (we(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }, this.useSubscribe = function(n) {
    e.subscribable = n;
  }, this.prevWithoutPreserves = null, this.setInitialValues = function(n, a) {
    if (e.initialValues = n || {}, a) {
      var i, o = Tr({}, n, e.store);
      (i = e.prevWithoutPreserves) === null || i === void 0 || i.map(function(s) {
        var u = s.key;
        o = qe(o, u, We(n, u));
      }), e.prevWithoutPreserves = null, e.updateStore(o);
    }
  }, this.destroyForm = function() {
    var n = new Ze();
    e.getFieldEntities(!0).forEach(function(a) {
      e.isMergedPreserve(a.isPreserve()) || n.set(a.getNamePath(), !0);
    }), e.prevWithoutPreserves = n;
  }, this.getInitialValue = function(n) {
    var a = We(e.initialValues, n);
    return n.length ? Mr(a) : a;
  }, this.setCallbacks = function(n) {
    e.callbacks = n;
  }, this.setValidateMessages = function(n) {
    e.validateMessages = n;
  }, this.setPreserve = function(n) {
    e.preserve = n;
  }, this.watchList = [], this.registerWatch = function(n) {
    return e.watchList.push(n), function() {
      e.watchList = e.watchList.filter(function(a) {
        return a !== n;
      });
    };
  }, this.notifyWatch = function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (e.watchList.length) {
      var a = e.getFieldsValue();
      e.watchList.forEach(function(i) {
        i(a, n);
      });
    }
  }, this.timeoutId = null, this.warningUnhooked = function() {
    process.env.NODE_ENV !== "production" && !e.timeoutId && typeof window < "u" && (e.timeoutId = setTimeout(function() {
      e.timeoutId = null, e.formHooked || we(!1, "Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?");
    }));
  }, this.updateStore = function(n) {
    e.store = n;
  }, this.getFieldEntities = function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    return n ? e.fieldEntities.filter(function(a) {
      return a.getNamePath().length;
    }) : e.fieldEntities;
  }, this.getFieldsMap = function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, a = new Ze();
    return e.getFieldEntities(n).forEach(function(i) {
      var o = i.getNamePath();
      a.set(o, i);
    }), a;
  }, this.getFieldEntitiesForNamePathList = function(n) {
    if (!n)
      return e.getFieldEntities(!0);
    var a = e.getFieldsMap(!0);
    return n.map(function(i) {
      var o = fe(i);
      return a.get(o) || {
        INVALIDATE_NAME_PATH: fe(i)
      };
    });
  }, this.getFieldsValue = function(n, a) {
    if (e.warningUnhooked(), n === !0 && !a)
      return e.store;
    var i = e.getFieldEntitiesForNamePathList(Array.isArray(n) ? n : null), o = [];
    return i.forEach(function(s) {
      var u, l = "INVALIDATE_NAME_PATH" in s ? s.INVALIDATE_NAME_PATH : s.getNamePath();
      if (!(!n && ((u = s.isListField) === null || u === void 0 ? void 0 : u.call(s))))
        if (!a)
          o.push(l);
        else {
          var c = "getMeta" in s ? s.getMeta() : null;
          a(c) && o.push(l);
        }
    }), un(e.store, o.map(fe));
  }, this.getFieldValue = function(n) {
    e.warningUnhooked();
    var a = fe(n);
    return We(e.store, a);
  }, this.getFieldsError = function(n) {
    e.warningUnhooked();
    var a = e.getFieldEntitiesForNamePathList(n);
    return a.map(function(i, o) {
      return i && !("INVALIDATE_NAME_PATH" in i) ? {
        name: i.getNamePath(),
        errors: i.getErrors(),
        warnings: i.getWarnings()
      } : {
        name: fe(n[o]),
        errors: [],
        warnings: []
      };
    });
  }, this.getFieldError = function(n) {
    e.warningUnhooked();
    var a = fe(n), i = e.getFieldsError([a])[0];
    return i.errors;
  }, this.getFieldWarning = function(n) {
    e.warningUnhooked();
    var a = fe(n), i = e.getFieldsError([a])[0];
    return i.warnings;
  }, this.isFieldsTouched = function() {
    e.warningUnhooked();
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a[0], s = a[1], u, l = !1;
    a.length === 0 ? u = null : a.length === 1 ? Array.isArray(o) ? (u = o.map(fe), l = !1) : (u = null, l = o) : (u = o.map(fe), l = s);
    var c = e.getFieldEntities(!0), d = function(y) {
      return y.isFieldTouched();
    };
    if (!u)
      return l ? c.every(d) : c.some(d);
    var v = new Ze();
    u.forEach(function(m) {
      v.set(m, []);
    }), c.forEach(function(m) {
      var y = m.getNamePath();
      u.forEach(function(p) {
        p.every(function(C, E) {
          return y[E] === C;
        }) && v.update(p, function(C) {
          return [].concat(U(C), [m]);
        });
      });
    });
    var S = function(y) {
      return y.some(d);
    }, _ = v.map(function(m) {
      var y = m.value;
      return y;
    });
    return l ? _.every(S) : _.some(S);
  }, this.isFieldTouched = function(n) {
    return e.warningUnhooked(), e.isFieldsTouched([n]);
  }, this.isFieldsValidating = function(n) {
    e.warningUnhooked();
    var a = e.getFieldEntities();
    if (!n)
      return a.some(function(o) {
        return o.isFieldValidating();
      });
    var i = n.map(fe);
    return a.some(function(o) {
      var s = o.getNamePath();
      return lr(i, s) && o.isFieldValidating();
    });
  }, this.isFieldValidating = function(n) {
    return e.warningUnhooked(), e.isFieldsValidating([n]);
  }, this.resetWithFieldInitialValue = function() {
    var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = new Ze(), i = e.getFieldEntities(!0);
    i.forEach(function(u) {
      var l = u.props.initialValue, c = u.getNamePath();
      if (l !== void 0) {
        var d = a.get(c) || /* @__PURE__ */ new Set();
        d.add({
          entity: u,
          value: l
        }), a.set(c, d);
      }
    });
    var o = function(l) {
      l.forEach(function(c) {
        var d = c.props.initialValue;
        if (d !== void 0) {
          var v = c.getNamePath(), S = e.getInitialValue(v);
          if (S !== void 0)
            we(!1, "Form already set 'initialValues' with path '".concat(v.join("."), "'. Field can not overwrite it."));
          else {
            var _ = a.get(v);
            if (_ && _.size > 1)
              we(!1, "Multiple Field with path '".concat(v.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (_) {
              var m = e.getFieldValue(v);
              (!n.skipExist || m === void 0) && e.updateStore(qe(e.store, v, U(_)[0].value));
            }
          }
        }
      });
    }, s;
    n.entities ? s = n.entities : n.namePathList ? (s = [], n.namePathList.forEach(function(u) {
      var l = a.get(u);
      if (l) {
        var c;
        (c = s).push.apply(c, U(U(l).map(function(d) {
          return d.entity;
        })));
      }
    })) : s = i, o(s);
  }, this.resetFields = function(n) {
    e.warningUnhooked();
    var a = e.store;
    if (!n) {
      e.updateStore(Tr({}, e.initialValues)), e.resetWithFieldInitialValue(), e.notifyObservers(a, null, {
        type: "reset"
      }), e.notifyWatch();
      return;
    }
    var i = n.map(fe);
    i.forEach(function(o) {
      var s = e.getInitialValue(o);
      e.updateStore(qe(e.store, o, s));
    }), e.resetWithFieldInitialValue({
      namePathList: i
    }), e.notifyObservers(a, i, {
      type: "reset"
    }), e.notifyWatch(i);
  }, this.setFields = function(n) {
    e.warningUnhooked();
    var a = e.store, i = [];
    n.forEach(function(o) {
      var s = o.name;
      o.errors;
      var u = hr(o, oo), l = fe(s);
      i.push(l), "value" in u && e.updateStore(qe(e.store, l, u.value)), e.notifyObservers(a, [l], {
        type: "setField",
        data: o
      });
    }), e.notifyWatch(i);
  }, this.getFields = function() {
    var n = e.getFieldEntities(!0), a = n.map(function(i) {
      var o = i.getNamePath(), s = i.getMeta(), u = V(V({}, s), {}, {
        name: o,
        value: e.getFieldValue(o)
      });
      return Object.defineProperty(u, "originRCField", {
        value: !0
      }), u;
    });
    return a;
  }, this.initEntityValue = function(n) {
    var a = n.props.initialValue;
    if (a !== void 0) {
      var i = n.getNamePath(), o = We(e.store, i);
      o === void 0 && e.updateStore(qe(e.store, i, a));
    }
  }, this.isMergedPreserve = function(n) {
    var a = n !== void 0 ? n : e.preserve;
    return a != null ? a : !0;
  }, this.registerField = function(n) {
    e.fieldEntities.push(n);
    var a = n.getNamePath();
    if (e.notifyWatch([a]), n.props.initialValue !== void 0) {
      var i = e.store;
      e.resetWithFieldInitialValue({
        entities: [n],
        skipExist: !0
      }), e.notifyObservers(i, [n.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(o, s) {
      var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (e.fieldEntities = e.fieldEntities.filter(function(d) {
        return d !== n;
      }), !e.isMergedPreserve(s) && (!o || u.length > 1)) {
        var l = o ? void 0 : e.getInitialValue(a);
        if (a.length && e.getFieldValue(a) !== l && e.fieldEntities.every(function(d) {
          return !Zn(d.getNamePath(), a);
        })) {
          var c = e.store;
          e.updateStore(qe(c, a, l, !0)), e.notifyObservers(c, [a], {
            type: "remove"
          }), e.triggerDependenciesUpdate(c, a);
        }
      }
      e.notifyWatch([a]);
    };
  }, this.dispatch = function(n) {
    switch (n.type) {
      case "updateValue": {
        var a = n.namePath, i = n.value;
        e.updateValue(a, i);
        break;
      }
      case "validateField": {
        var o = n.namePath, s = n.triggerName;
        e.validateFields([o], {
          triggerName: s
        });
        break;
      }
    }
  }, this.notifyObservers = function(n, a, i) {
    if (e.subscribable) {
      var o = V(V({}, i), {}, {
        store: e.getFieldsValue(!0)
      });
      e.getFieldEntities().forEach(function(s) {
        var u = s.onStoreChange;
        u(n, a, o);
      });
    } else
      e.forceRootUpdate();
  }, this.triggerDependenciesUpdate = function(n, a) {
    var i = e.getDependencyChildrenFields(a);
    return i.length && e.validateFields(i), e.notifyObservers(n, i, {
      type: "dependenciesUpdate",
      relatedFields: [a].concat(U(i))
    }), i;
  }, this.updateValue = function(n, a) {
    var i = fe(n), o = e.store;
    e.updateStore(qe(e.store, i, a)), e.notifyObservers(o, [i], {
      type: "valueUpdate",
      source: "internal"
    }), e.notifyWatch([i]);
    var s = e.triggerDependenciesUpdate(o, i), u = e.callbacks.onValuesChange;
    if (u) {
      var l = un(e.store, [i]);
      u(l, e.getFieldsValue());
    }
    e.triggerOnFieldsChange([i].concat(U(s)));
  }, this.setFieldsValue = function(n) {
    e.warningUnhooked();
    var a = e.store;
    if (n) {
      var i = Tr(e.store, n);
      e.updateStore(i);
    }
    e.notifyObservers(a, null, {
      type: "valueUpdate",
      source: "external"
    }), e.notifyWatch();
  }, this.getDependencyChildrenFields = function(n) {
    var a = /* @__PURE__ */ new Set(), i = [], o = new Ze();
    e.getFieldEntities().forEach(function(u) {
      var l = u.props.dependencies;
      (l || []).forEach(function(c) {
        var d = fe(c);
        o.update(d, function() {
          var v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return v.add(u), v;
        });
      });
    });
    var s = function u(l) {
      var c = o.get(l) || /* @__PURE__ */ new Set();
      c.forEach(function(d) {
        if (!a.has(d)) {
          a.add(d);
          var v = d.getNamePath();
          d.isFieldDirty() && v.length && (i.push(v), u(v));
        }
      });
    };
    return s(n), i;
  }, this.triggerOnFieldsChange = function(n, a) {
    var i = e.callbacks.onFieldsChange;
    if (i) {
      var o = e.getFields();
      if (a) {
        var s = new Ze();
        a.forEach(function(l) {
          var c = l.name, d = l.errors;
          s.set(c, d);
        }), o.forEach(function(l) {
          l.errors = s.get(l.name) || l.errors;
        });
      }
      var u = o.filter(function(l) {
        var c = l.name;
        return lr(n, c);
      });
      i(u, o);
    }
  }, this.validateFields = function(n, a) {
    e.warningUnhooked();
    var i = !!n, o = i ? n.map(fe) : [], s = [];
    e.getFieldEntities(!0).forEach(function(c) {
      if (i || o.push(c.getNamePath()), (a == null ? void 0 : a.recursive) && i) {
        var d = c.getNamePath();
        d.every(function(_, m) {
          return n[m] === _ || n[m] === void 0;
        }) && o.push(d);
      }
      if (!(!c.props.rules || !c.props.rules.length)) {
        var v = c.getNamePath();
        if (!i || lr(o, v)) {
          var S = c.validateRules(V({
            validateMessages: V(V({}, Yn), e.validateMessages)
          }, a));
          s.push(S.then(function() {
            return {
              name: v,
              errors: [],
              warnings: []
            };
          }).catch(function(_) {
            var m = [], y = [];
            return _.forEach(function(p) {
              var C = p.rule.warningOnly, E = p.errors;
              C ? y.push.apply(y, U(E)) : m.push.apply(m, U(E));
            }), m.length ? Promise.reject({
              name: v,
              errors: m,
              warnings: y
            }) : {
              name: v,
              errors: m,
              warnings: y
            };
          }));
        }
      }
    });
    var u = io(s);
    e.lastValidatePromise = u, u.catch(function(c) {
      return c;
    }).then(function(c) {
      var d = c.map(function(v) {
        var S = v.name;
        return S;
      });
      e.notifyObservers(e.store, d, {
        type: "validateFinish"
      }), e.triggerOnFieldsChange(d, c);
    });
    var l = u.then(function() {
      return e.lastValidatePromise === u ? Promise.resolve(e.getFieldsValue(o)) : Promise.reject([]);
    }).catch(function(c) {
      var d = c.filter(function(v) {
        return v && v.errors.length;
      });
      return Promise.reject({
        values: e.getFieldsValue(o),
        errorFields: d,
        outOfDate: e.lastValidatePromise !== u
      });
    });
    return l.catch(function(c) {
      return c;
    }), l;
  }, this.submit = function() {
    e.warningUnhooked(), e.validateFields().then(function(n) {
      var a = e.callbacks.onFinish;
      if (a)
        try {
          a(n);
        } catch (i) {
          console.error(i);
        }
    }).catch(function(n) {
      var a = e.callbacks.onFinishFailed;
      a && a(n);
    });
  }, this.forceRootUpdate = t;
});
function ea(r) {
  var t = O.useRef(), e = O.useState({}), n = ge(e, 2), a = n[1];
  if (!t.current)
    if (r)
      t.current = r;
    else {
      var i = function() {
        a({});
      }, o = new so(i);
      t.current = o.getForm();
    }
  return [t.current];
}
var bt = /* @__PURE__ */ O.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), uo = function(t) {
  var e = t.validateMessages, n = t.onFormChange, a = t.onFormFinish, i = t.children, o = O.useContext(bt), s = O.useRef({});
  return /* @__PURE__ */ re(bt.Provider, {
    value: V(V({}, o), {}, {
      validateMessages: V(V({}, o.validateMessages), e),
      triggerFormChange: function(l, c) {
        n && n(l, {
          changedFields: c,
          forms: s.current
        }), o.triggerFormChange(l, c);
      },
      triggerFormFinish: function(l, c) {
        a && a(l, {
          values: c,
          forms: s.current
        }), o.triggerFormFinish(l, c);
      },
      registerForm: function(l, c) {
        l && (s.current = V(V({}, s.current), {}, B({}, l, c))), o.registerForm(l, c);
      },
      unregisterForm: function(l) {
        var c = V({}, s.current);
        delete c[l], s.current = c, o.unregisterForm(l);
      }
    }),
    children: i
  });
}, fo = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], co = function(t, e) {
  var n = t.name, a = t.initialValues, i = t.fields, o = t.form, s = t.preserve, u = t.children, l = t.component, c = l === void 0 ? "form" : l, d = t.validateMessages, v = t.validateTrigger, S = v === void 0 ? "onChange" : v, _ = t.onValuesChange, m = t.onFieldsChange, y = t.onFinish, p = t.onFinishFailed, C = hr(t, fo), E = O.useContext(bt), x = ea(o), h = ge(x, 1), N = h[0], M = N.getInternalHooks(Ye), $ = M.useSubscribe, I = M.setInitialValues, b = M.setCallbacks, g = M.setValidateMessages, F = M.setPreserve, P = M.destroyForm;
  O.useImperativeHandle(e, function() {
    return N;
  }), O.useEffect(function() {
    return E.registerForm(n, N), function() {
      E.unregisterForm(n);
    };
  }, [E, N, n]), g(V(V({}, E.validateMessages), d)), b({
    onValuesChange: _,
    onFieldsChange: function(ee) {
      if (E.triggerFormChange(n, ee), m) {
        for (var oe = arguments.length, ce = new Array(oe > 1 ? oe - 1 : 0), le = 1; le < oe; le++)
          ce[le - 1] = arguments[le];
        m.apply(void 0, [ee].concat(ce));
      }
    },
    onFinish: function(ee) {
      E.triggerFormFinish(n, ee), y && y(ee);
    },
    onFinishFailed: p
  }), F(s);
  var R = O.useRef(null);
  I(a, !R.current), R.current || (R.current = !0), O.useEffect(
    function() {
      return P;
    },
    []
  );
  var A, D = typeof u == "function";
  if (D) {
    var J = N.getFieldsValue(!0);
    A = u(J, N);
  } else
    A = u;
  $(!D);
  var X = O.useRef();
  O.useEffect(function() {
    Gi(X.current || [], i || []) || N.setFields(i || []), X.current = i;
  }, [i, N]);
  var L = O.useMemo(function() {
    return V(V({}, N), {}, {
      validateTrigger: S
    });
  }, [N, S]), Y = /* @__PURE__ */ re(nr.Provider, {
    value: L,
    children: A
  });
  return c === !1 ? Y : /* @__PURE__ */ re(c, {
    ...C,
    onSubmit: function(ee) {
      ee.preventDefault(), ee.stopPropagation(), N.submit();
    },
    onReset: function(ee) {
      var oe;
      ee.preventDefault(), N.resetFields(), (oe = C.onReset) === null || oe === void 0 || oe.call(C, ee);
    },
    children: Y
  });
};
function vn(r) {
  try {
    return JSON.stringify(r);
  } catch {
    return Math.random();
  }
}
function lo() {
  var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 ? arguments[1] : void 0, e = Wa(), n = ge(e, 2), a = n[0], i = n[1], o = Ua(function() {
    return vn(a);
  }, [a]), s = je(o);
  s.current = o;
  var u = Mn(nr), l = t || u, c = l && l._init;
  process.env.NODE_ENV !== "production" && we(c, "useWatch requires a form instance since it can not auto detect from context.");
  var d = fe(r), v = je(d);
  return v.current = d, rr(
    function() {
      if (!!c) {
        var S = l.getFieldsValue, _ = l.getInternalHooks, m = _(Ye), y = m.registerWatch, p = y(function(E) {
          var x = We(E, v.current), h = vn(x);
          s.current !== h && (s.current = h, i(x));
        }), C = We(S(), v.current);
        return i(C), p;
      }
    },
    []
  ), a;
}
var vo = /* @__PURE__ */ O.forwardRef(co), yr = vo;
yr.FormProvider = uo;
yr.Field = Qn;
yr.List = no;
yr.useForm = ea;
yr.useWatch = lo;
function go() {
}
var ra = go;
process.env.NODE_ENV !== "production" && (ra = function(t, e, n) {
  we(t, "[antd: ".concat(e, "] ").concat(n)), process.env.NODE_ENV === "test" && ri();
});
const Et = ra;
function Re(r, t) {
  po(r) && (r = "100%");
  var e = ho(r);
  return r = t === 360 ? r : Math.min(t, Math.max(0, parseFloat(r))), e && (r = parseInt(String(r * t), 10) / 100), Math.abs(r - t) < 1e-6 ? 1 : (t === 360 ? r = (r < 0 ? r % t + t : r % t) / parseFloat(String(t)) : r = r % t / parseFloat(String(t)), r);
}
function po(r) {
  return typeof r == "string" && r.indexOf(".") !== -1 && parseFloat(r) === 1;
}
function ho(r) {
  return typeof r == "string" && r.indexOf("%") !== -1;
}
function mo(r) {
  return r = parseFloat(r), (isNaN(r) || r < 0 || r > 1) && (r = 1), r;
}
function Er(r) {
  return r <= 1 ? "".concat(Number(r) * 100, "%") : r;
}
function Gr(r) {
  return r.length === 1 ? "0" + r : String(r);
}
function yo(r, t, e) {
  return {
    r: Re(r, 255) * 255,
    g: Re(t, 255) * 255,
    b: Re(e, 255) * 255
  };
}
function Kr(r, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? r + (t - r) * (6 * e) : e < 1 / 2 ? t : e < 2 / 3 ? r + (t - r) * (2 / 3 - e) * 6 : r;
}
function bo(r, t, e) {
  var n, a, i;
  if (r = Re(r, 360), t = Re(t, 100), e = Re(e, 100), t === 0)
    a = e, i = e, n = e;
  else {
    var o = e < 0.5 ? e * (1 + t) : e + t - e * t, s = 2 * e - o;
    n = Kr(s, o, r + 1 / 3), a = Kr(s, o, r), i = Kr(s, o, r - 1 / 3);
  }
  return { r: n * 255, g: a * 255, b: i * 255 };
}
function Eo(r, t, e) {
  r = Re(r, 255), t = Re(t, 255), e = Re(e, 255);
  var n = Math.max(r, t, e), a = Math.min(r, t, e), i = 0, o = n, s = n - a, u = n === 0 ? 0 : s / n;
  if (n === a)
    i = 0;
  else {
    switch (n) {
      case r:
        i = (t - e) / s + (t < e ? 6 : 0);
        break;
      case t:
        i = (e - r) / s + 2;
        break;
      case e:
        i = (r - t) / s + 4;
        break;
    }
    i /= 6;
  }
  return { h: i, s: u, v: o };
}
function wo(r, t, e) {
  r = Re(r, 360) * 6, t = Re(t, 100), e = Re(e, 100);
  var n = Math.floor(r), a = r - n, i = e * (1 - t), o = e * (1 - a * t), s = e * (1 - (1 - a) * t), u = n % 6, l = [e, o, i, i, s, e][u], c = [s, e, e, o, i, i][u], d = [i, i, s, e, e, o][u];
  return { r: l * 255, g: c * 255, b: d * 255 };
}
function Fo(r, t, e, n) {
  var a = [
    Gr(Math.round(r).toString(16)),
    Gr(Math.round(t).toString(16)),
    Gr(Math.round(e).toString(16))
  ];
  return n && a[0].startsWith(a[0].charAt(1)) && a[1].startsWith(a[1].charAt(1)) && a[2].startsWith(a[2].charAt(1)) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("");
}
function gn(r) {
  return Se(r) / 255;
}
function Se(r) {
  return parseInt(r, 16);
}
var pn = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function ur(r) {
  var t = { r: 0, g: 0, b: 0 }, e = 1, n = null, a = null, i = null, o = !1, s = !1;
  return typeof r == "string" && (r = Po(r)), typeof r == "object" && (Me(r.r) && Me(r.g) && Me(r.b) ? (t = yo(r.r, r.g, r.b), o = !0, s = String(r.r).substr(-1) === "%" ? "prgb" : "rgb") : Me(r.h) && Me(r.s) && Me(r.v) ? (n = Er(r.s), a = Er(r.v), t = wo(r.h, n, a), o = !0, s = "hsv") : Me(r.h) && Me(r.s) && Me(r.l) && (n = Er(r.s), i = Er(r.l), t = bo(r.h, n, i), o = !0, s = "hsl"), Object.prototype.hasOwnProperty.call(r, "a") && (e = r.a)), e = mo(e), {
    ok: o,
    format: r.format || s,
    r: Math.min(255, Math.max(t.r, 0)),
    g: Math.min(255, Math.max(t.g, 0)),
    b: Math.min(255, Math.max(t.b, 0)),
    a: e
  };
}
var Co = "[-\\+]?\\d+%?", So = "[-\\+]?\\d*\\.\\d+%?", Ue = "(?:".concat(So, ")|(?:").concat(Co, ")"), Jr = "[\\s|\\(]+(".concat(Ue, ")[,|\\s]+(").concat(Ue, ")[,|\\s]+(").concat(Ue, ")\\s*\\)?"), Zr = "[\\s|\\(]+(".concat(Ue, ")[,|\\s]+(").concat(Ue, ")[,|\\s]+(").concat(Ue, ")[,|\\s]+(").concat(Ue, ")\\s*\\)?"), Ne = {
  CSS_UNIT: new RegExp(Ue),
  rgb: new RegExp("rgb" + Jr),
  rgba: new RegExp("rgba" + Zr),
  hsl: new RegExp("hsl" + Jr),
  hsla: new RegExp("hsla" + Zr),
  hsv: new RegExp("hsv" + Jr),
  hsva: new RegExp("hsva" + Zr),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function Po(r) {
  if (r = r.trim().toLowerCase(), r.length === 0)
    return !1;
  var t = !1;
  if (pn[r])
    r = pn[r], t = !0;
  else if (r === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var e = Ne.rgb.exec(r);
  return e ? { r: e[1], g: e[2], b: e[3] } : (e = Ne.rgba.exec(r), e ? { r: e[1], g: e[2], b: e[3], a: e[4] } : (e = Ne.hsl.exec(r), e ? { h: e[1], s: e[2], l: e[3] } : (e = Ne.hsla.exec(r), e ? { h: e[1], s: e[2], l: e[3], a: e[4] } : (e = Ne.hsv.exec(r), e ? { h: e[1], s: e[2], v: e[3] } : (e = Ne.hsva.exec(r), e ? { h: e[1], s: e[2], v: e[3], a: e[4] } : (e = Ne.hex8.exec(r), e ? {
    r: Se(e[1]),
    g: Se(e[2]),
    b: Se(e[3]),
    a: gn(e[4]),
    format: t ? "name" : "hex8"
  } : (e = Ne.hex6.exec(r), e ? {
    r: Se(e[1]),
    g: Se(e[2]),
    b: Se(e[3]),
    format: t ? "name" : "hex"
  } : (e = Ne.hex4.exec(r), e ? {
    r: Se(e[1] + e[1]),
    g: Se(e[2] + e[2]),
    b: Se(e[3] + e[3]),
    a: gn(e[4] + e[4]),
    format: t ? "name" : "hex8"
  } : (e = Ne.hex3.exec(r), e ? {
    r: Se(e[1] + e[1]),
    g: Se(e[2] + e[2]),
    b: Se(e[3] + e[3]),
    format: t ? "name" : "hex"
  } : !1)))))))));
}
function Me(r) {
  return Boolean(Ne.CSS_UNIT.exec(String(r)));
}
var wr = 2, hn = 0.16, xo = 0.05, _o = 0.05, Ro = 0.15, ta = 5, na = 4, To = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];
function mn(r) {
  var t = r.r, e = r.g, n = r.b, a = Eo(t, e, n);
  return {
    h: a.h * 360,
    s: a.s,
    v: a.v
  };
}
function Fr(r) {
  var t = r.r, e = r.g, n = r.b;
  return "#".concat(Fo(t, e, n, !1));
}
function Oo(r, t, e) {
  var n = e / 100, a = {
    r: (t.r - r.r) * n + r.r,
    g: (t.g - r.g) * n + r.g,
    b: (t.b - r.b) * n + r.b
  };
  return a;
}
function yn(r, t, e) {
  var n;
  return Math.round(r.h) >= 60 && Math.round(r.h) <= 240 ? n = e ? Math.round(r.h) - wr * t : Math.round(r.h) + wr * t : n = e ? Math.round(r.h) + wr * t : Math.round(r.h) - wr * t, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function bn(r, t, e) {
  if (r.h === 0 && r.s === 0)
    return r.s;
  var n;
  return e ? n = r.s - hn * t : t === na ? n = r.s + hn : n = r.s + xo * t, n > 1 && (n = 1), e && t === ta && n > 0.1 && (n = 0.1), n < 0.06 && (n = 0.06), Number(n.toFixed(2));
}
function En(r, t, e) {
  var n;
  return e ? n = r.v + _o * t : n = r.v - Ro * t, n > 1 && (n = 1), Number(n.toFixed(2));
}
function wt(r) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = [], n = ur(r), a = ta; a > 0; a -= 1) {
    var i = mn(n), o = Fr(ur({
      h: yn(i, a, !0),
      s: bn(i, a, !0),
      v: En(i, a, !0)
    }));
    e.push(o);
  }
  e.push(Fr(n));
  for (var s = 1; s <= na; s += 1) {
    var u = mn(n), l = Fr(ur({
      h: yn(u, s),
      s: bn(u, s),
      v: En(u, s)
    }));
    e.push(l);
  }
  return t.theme === "dark" ? To.map(function(c) {
    var d = c.index, v = c.opacity, S = Fr(Oo(ur(t.backgroundColor || "#141414"), ur(e[d]), v * 100));
    return S;
  }) : e;
}
var Qr = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
}, Xr = {}, et = {};
Object.keys(Qr).forEach(function(r) {
  Xr[r] = wt(Qr[r]), Xr[r].primary = Xr[r][5], et[r] = wt(Qr[r], {
    theme: "dark",
    backgroundColor: "#141414"
  }), et[r].primary = et[r][5];
});
function Ir() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var Ao = "rc-util-key";
function aa() {
  var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = r.mark;
  return t ? t.startsWith("data-") ? t : "data-".concat(t) : Ao;
}
function At(r) {
  if (r.attachTo)
    return r.attachTo;
  var t = document.querySelector("head");
  return t || document.body;
}
function wn(r) {
  var t, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!Ir())
    return null;
  var n = document.createElement("style");
  if (!((t = e.csp) === null || t === void 0) && t.nonce) {
    var a;
    n.nonce = (a = e.csp) === null || a === void 0 ? void 0 : a.nonce;
  }
  n.innerHTML = r;
  var i = At(e), o = i.firstChild;
  return e.prepend && i.prepend ? i.prepend(n) : e.prepend && o ? i.insertBefore(n, o) : i.appendChild(n), n;
}
var Ft = /* @__PURE__ */ new Map();
function No(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = At(t);
  return Array.from(Ft.get(e).children).find(function(n) {
    return n.tagName === "STYLE" && n.getAttribute(aa(t)) === r;
  });
}
function ia(r, t) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = At(e);
  if (!Ft.has(n)) {
    var a = wn("", e), i = a.parentNode;
    Ft.set(n, i), i.removeChild(a);
  }
  var o = No(t, e);
  if (o) {
    var s, u;
    if (((s = e.csp) === null || s === void 0 ? void 0 : s.nonce) && o.nonce !== ((u = e.csp) === null || u === void 0 ? void 0 : u.nonce)) {
      var l;
      o.nonce = (l = e.csp) === null || l === void 0 ? void 0 : l.nonce;
    }
    return o.innerHTML !== r && (o.innerHTML = r), o;
  }
  var c = wn(r, e);
  return c.setAttribute(aa(e), t), c;
}
function ko(r, t) {
  we(r, "[@ant-design/icons] ".concat(t));
}
function Fn(r) {
  return he(r) === "object" && typeof r.name == "string" && typeof r.theme == "string" && (he(r.icon) === "object" || typeof r.icon == "function");
}
function Cn() {
  var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(r).reduce(function(t, e) {
    var n = r[e];
    switch (e) {
      case "class":
        t.className = n, delete t.class;
        break;
      default:
        t[e] = n;
    }
    return t;
  }, {});
}
function Ct(r, t, e) {
  return e ? /* @__PURE__ */ pe.createElement(r.tag, V(V({
    key: t
  }, Cn(r.attrs)), e), (r.children || []).map(function(n, a) {
    return Ct(n, "".concat(t, "-").concat(r.tag, "-").concat(a));
  })) : /* @__PURE__ */ pe.createElement(r.tag, V({
    key: t
  }, Cn(r.attrs)), (r.children || []).map(function(n, a) {
    return Ct(n, "".concat(t, "-").concat(r.tag, "-").concat(a));
  }));
}
function oa(r) {
  return wt(r)[0];
}
function sa(r) {
  return r ? Array.isArray(r) ? r : [r] : [];
}
var Vo = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`, $o = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Vo, e = Mn(qn), n = e.csp;
  rr(function() {
    ia(t, "@ant-design-icons", {
      prepend: !0,
      csp: n
    });
  }, []);
}, Mo = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"], dr = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function Io(r) {
  var t = r.primaryColor, e = r.secondaryColor;
  dr.primaryColor = t, dr.secondaryColor = e || oa(t), dr.calculated = !!e;
}
function jo() {
  return V({}, dr);
}
var jr = function(t) {
  var e = t.icon, n = t.className, a = t.onClick, i = t.style, o = t.primaryColor, s = t.secondaryColor, u = hr(t, Mo), l = dr;
  if (o && (l = {
    primaryColor: o,
    secondaryColor: s || oa(o)
  }), $o(), ko(Fn(e), "icon should be icon definiton, but got ".concat(e)), !Fn(e))
    return null;
  var c = e;
  return c && typeof c.icon == "function" && (c = V(V({}, c), {}, {
    icon: c.icon(l.primaryColor, l.secondaryColor)
  })), Ct(c.icon, "svg-".concat(c.name), V({
    className: n,
    onClick: a,
    style: i,
    "data-icon": c.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, u));
};
jr.displayName = "IconReact";
jr.getTwoToneColors = jo;
jr.setTwoToneColors = Io;
const Nt = jr;
function ua(r) {
  var t = sa(r), e = ge(t, 2), n = e[0], a = e[1];
  return Nt.setTwoToneColors({
    primaryColor: n,
    secondaryColor: a
  });
}
function Lo() {
  var r = Nt.getTwoToneColors();
  return r.calculated ? [r.primaryColor, r.secondaryColor] : r.primaryColor;
}
var Do = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
ua("#1890ff");
var Lr = /* @__PURE__ */ O.forwardRef(function(r, t) {
  var e, n = r.className, a = r.icon, i = r.spin, o = r.rotate, s = r.tabIndex, u = r.onClick, l = r.twoToneColor, c = hr(r, Do), d = O.useContext(qn), v = d.prefixCls, S = v === void 0 ? "anticon" : v, _ = kr(S, (e = {}, B(e, "".concat(S, "-").concat(a.name), !!a.name), B(e, "".concat(S, "-spin"), !!i || a.name === "loading"), e), n), m = s;
  m === void 0 && u && (m = -1);
  var y = o ? {
    msTransform: "rotate(".concat(o, "deg)"),
    transform: "rotate(".concat(o, "deg)")
  } : void 0, p = sa(l), C = ge(p, 2), E = C[0], x = C[1];
  return /* @__PURE__ */ re("span", {
    ...V(V({
      role: "img",
      "aria-label": a.name
    }, c), {}, {
      ref: t,
      tabIndex: m,
      onClick: u,
      className: _
    }),
    children: /* @__PURE__ */ re(Nt, {
      icon: a,
      primaryColor: E,
      secondaryColor: x,
      style: y
    })
  });
});
Lr.displayName = "AntdIcon";
Lr.getTwoToneColor = Lo;
Lr.setTwoToneColor = ua;
const qo = Lr;
var Wo = { icon: { tag: "svg", attrs: { viewBox: "0 0 1024 1024", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, name: "loading", theme: "outlined" };
const Uo = Wo;
var fa = function(t, e) {
  return /* @__PURE__ */ re(qo, {
    ...V(V({}, t), {}, {
      ref: e,
      icon: Uo
    })
  });
};
fa.displayName = "LoadingOutlined";
const Sn = /* @__PURE__ */ O.forwardRef(fa);
function Pn(r, t) {
  var e = {};
  return e[r.toLowerCase()] = t.toLowerCase(), e["Webkit".concat(r)] = "webkit".concat(t), e["Moz".concat(r)] = "moz".concat(t), e["ms".concat(r)] = "MS".concat(t), e["O".concat(r)] = "o".concat(t.toLowerCase()), e;
}
function zo(r, t) {
  var e = {
    animationend: Pn("Animation", "AnimationEnd"),
    transitionend: Pn("Transition", "TransitionEnd")
  };
  return r && ("AnimationEvent" in t || delete e.animationend.animation, "TransitionEvent" in t || delete e.transitionend.transition), e;
}
var Yo = zo(Ir(), typeof window < "u" ? window : {}), ca = {};
if (Ir()) {
  var Ho = document.createElement("div");
  ca = Ho.style;
}
var Cr = {};
function la(r) {
  if (Cr[r])
    return Cr[r];
  var t = Yo[r];
  if (t)
    for (var e = Object.keys(t), n = e.length, a = 0; a < n; a += 1) {
      var i = e[a];
      if (Object.prototype.hasOwnProperty.call(t, i) && i in ca)
        return Cr[r] = t[i], Cr[r];
    }
  return "";
}
var da = la("animationend"), va = la("transitionend"), Bo = !!(da && va), xn = da || "animationend", _n = va || "transitionend";
function Rn(r, t) {
  if (!r)
    return null;
  if (he(r) === "object") {
    var e = t.replace(/-\w/g, function(n) {
      return n[1].toUpperCase();
    });
    return r[e];
  }
  return "".concat(r, "-").concat(t);
}
var Qe = "none", Sr = "appear", Pr = "enter", xr = "leave", Tn = "none", Ie = "prepare", Xe = "start", er = "active", kt = "end";
function Or(r) {
  var t = O.useRef(!1), e = O.useState(r), n = ge(e, 2), a = n[0], i = n[1];
  O.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function o(s, u) {
    u && t.current || i(s);
  }
  return [a, o];
}
var ga = function(t) {
  return +setTimeout(t, 16);
}, pa = function(t) {
  return clearTimeout(t);
};
typeof window < "u" && "requestAnimationFrame" in window && (ga = function(t) {
  return window.requestAnimationFrame(t);
}, pa = function(t) {
  return window.cancelAnimationFrame(t);
});
var On = 0, Vt = /* @__PURE__ */ new Map();
function ha(r) {
  Vt.delete(r);
}
function ar(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  On += 1;
  var e = On;
  function n(a) {
    if (a === 0)
      ha(e), r();
    else {
      var i = ga(function() {
        n(a - 1);
      });
      Vt.set(e, i);
    }
  }
  return n(t), e;
}
ar.cancel = function(r) {
  var t = Vt.get(r);
  return ha(t), pa(t);
};
const Go = function() {
  var r = O.useRef(null);
  function t() {
    ar.cancel(r.current);
  }
  function e(n) {
    var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    t();
    var i = ar(function() {
      a <= 1 ? n({
        isCanceled: function() {
          return i !== r.current;
        }
      }) : e(n, a - 1);
    });
    r.current = i;
  }
  return O.useEffect(function() {
    return function() {
      t();
    };
  }, []), [e, t];
};
var ma = Ir() ? za : rr, An = [Ie, Xe, er, kt], ya = !1, Ko = !0;
function ba(r) {
  return r === er || r === kt;
}
const Jo = function(r, t) {
  var e = Or(Tn), n = ge(e, 2), a = n[0], i = n[1], o = Go(), s = ge(o, 2), u = s[0], l = s[1];
  function c() {
    i(Ie, !0);
  }
  return ma(function() {
    if (a !== Tn && a !== kt) {
      var d = An.indexOf(a), v = An[d + 1], S = t(a);
      S === ya ? i(v, !0) : u(function(_) {
        function m() {
          _.isCanceled() || i(v, !0);
        }
        S === !0 ? m() : Promise.resolve(S).then(m);
      });
    }
  }, [r, a]), O.useEffect(function() {
    return function() {
      l();
    };
  }, []), [c, a];
}, Zo = function(r) {
  var t = je(), e = je(r);
  e.current = r;
  var n = O.useCallback(function(o) {
    e.current(o);
  }, []);
  function a(o) {
    o && (o.removeEventListener(_n, n), o.removeEventListener(xn, n));
  }
  function i(o) {
    t.current && t.current !== o && a(t.current), o && o !== t.current && (o.addEventListener(_n, n), o.addEventListener(xn, n), t.current = o);
  }
  return O.useEffect(function() {
    return function() {
      a(t.current);
    };
  }, []), [i, a];
};
function Qo(r, t, e, n) {
  var a = n.motionEnter, i = a === void 0 ? !0 : a, o = n.motionAppear, s = o === void 0 ? !0 : o, u = n.motionLeave, l = u === void 0 ? !0 : u, c = n.motionDeadline, d = n.motionLeaveImmediately, v = n.onAppearPrepare, S = n.onEnterPrepare, _ = n.onLeavePrepare, m = n.onAppearStart, y = n.onEnterStart, p = n.onLeaveStart, C = n.onAppearActive, E = n.onEnterActive, x = n.onLeaveActive, h = n.onAppearEnd, N = n.onEnterEnd, M = n.onLeaveEnd, $ = n.onVisibleChanged, I = Or(), b = ge(I, 2), g = b[0], F = b[1], P = Or(Qe), R = ge(P, 2), A = R[0], D = R[1], J = Or(null), X = ge(J, 2), L = X[0], Y = X[1], te = je(!1), ee = je(null);
  function oe() {
    return e();
  }
  var ce = je(!1);
  function le(ae) {
    var ie = oe();
    if (!(ae && !ae.deadline && ae.target !== ie)) {
      var se = ce.current, be;
      A === Sr && se ? be = h == null ? void 0 : h(ie, ae) : A === Pr && se ? be = N == null ? void 0 : N(ie, ae) : A === xr && se && (be = M == null ? void 0 : M(ie, ae)), A !== Qe && se && be !== !1 && (D(Qe, !0), Y(null, !0));
    }
  }
  var Ve = Zo(le), Fe = ge(Ve, 1), Te = Fe[0], ne = O.useMemo(function() {
    var ae, ie, se;
    switch (A) {
      case Sr:
        return ae = {}, B(ae, Ie, v), B(ae, Xe, m), B(ae, er, C), ae;
      case Pr:
        return ie = {}, B(ie, Ie, S), B(ie, Xe, y), B(ie, er, E), ie;
      case xr:
        return se = {}, B(se, Ie, _), B(se, Xe, p), B(se, er, x), se;
      default:
        return {};
    }
  }, [A]), Oe = Jo(A, function(ae) {
    if (ae === Ie) {
      var ie = ne[Ie];
      return ie ? ie(oe()) : ya;
    }
    if (me in ne) {
      var se;
      Y(((se = ne[me]) === null || se === void 0 ? void 0 : se.call(ne, oe(), null)) || null);
    }
    return me === er && (Te(oe()), c > 0 && (clearTimeout(ee.current), ee.current = setTimeout(function() {
      le({
        deadline: !0
      });
    }, c))), Ko;
  }), De = ge(Oe, 2), k = De[0], me = De[1], ke = ba(me);
  ce.current = ke, ma(function() {
    F(t);
    var ae = te.current;
    if (te.current = !0, !!r) {
      var ie;
      !ae && t && s && (ie = Sr), ae && t && i && (ie = Pr), (ae && !t && l || !ae && d && !t && l) && (ie = xr), ie && (D(ie), k());
    }
  }, [t]), rr(function() {
    (A === Sr && !s || A === Pr && !i || A === xr && !l) && D(Qe);
  }, [s, i, l]), rr(function() {
    return function() {
      te.current = !1, clearTimeout(ee.current);
    };
  }, []);
  var ye = O.useRef(!1);
  rr(function() {
    g && (ye.current = !0), g !== void 0 && A === Qe && ((ye.current || g) && ($ == null || $(g)), ye.current = !0);
  }, [g, A]);
  var Ae = L;
  return ne[Ie] && me === Xe && (Ae = V({
    transition: "none"
  }, Ae)), [A, me, Ae, g != null ? g : t];
}
var Xo = /* @__PURE__ */ function(r) {
  Pt(e, r);
  var t = _t(e);
  function e() {
    return gr(this, e), t.apply(this, arguments);
  }
  return pr(e, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), e;
}(O.Component);
function es(r) {
  var t = r;
  he(r) === "object" && (t = r.transitionSupport);
  function e(a) {
    return !!(a.motionName && t);
  }
  var n = /* @__PURE__ */ O.forwardRef(function(a, i) {
    var o = a.visible, s = o === void 0 ? !0 : o, u = a.removeOnLeave, l = u === void 0 ? !0 : u, c = a.forceRender, d = a.children, v = a.motionName, S = a.leavedClassName, _ = a.eventProps, m = e(a), y = je(), p = je();
    function C() {
      try {
        return y.current instanceof HTMLElement ? y.current : ai(p.current);
      } catch {
        return null;
      }
    }
    var E = Qo(m, s, C, a), x = ge(E, 4), h = x[0], N = x[1], M = x[2], $ = x[3], I = O.useRef($);
    $ && (I.current = !0);
    var b = O.useCallback(function(J) {
      y.current = J, Ln(i, J);
    }, [i]), g, F = V(V({}, _), {}, {
      visible: s
    });
    if (!d)
      g = null;
    else if (h === Qe || !e(a))
      $ ? g = d(V({}, F), b) : !l && I.current ? g = d(V(V({}, F), {}, {
        className: S
      }), b) : c ? g = d(V(V({}, F), {}, {
        style: {
          display: "none"
        }
      }), b) : g = null;
    else {
      var P, R;
      N === Ie ? R = "prepare" : ba(N) ? R = "active" : N === Xe && (R = "start"), g = d(V(V({}, F), {}, {
        className: kr(Rn(v, h), (P = {}, B(P, Rn(v, "".concat(h, "-").concat(R)), R), B(P, v, typeof v == "string"), P)),
        style: M
      }), b);
    }
    if (/* @__PURE__ */ O.isValidElement(g) && Dn(g)) {
      var A = g, D = A.ref;
      D || (g = /* @__PURE__ */ O.cloneElement(g, {
        ref: b
      }));
    }
    return /* @__PURE__ */ re(Xo, {
      ref: p,
      children: g
    });
  });
  return n.displayName = "CSSMotion", n;
}
const rs = es(Bo);
var ts = function(t, e) {
  return e || (t ? "ant-".concat(t) : "ant");
}, Dr = /* @__PURE__ */ O.createContext({
  getPrefixCls: ts
}), ns = Dr.Consumer, as = /* @__PURE__ */ O.createContext(!1);
const is = as;
var os = /* @__PURE__ */ O.createContext(void 0);
const ss = os;
var us = O.isValidElement;
function fs(r, t, e) {
  return us(r) ? /* @__PURE__ */ O.cloneElement(r, typeof e == "function" ? e(r.props || {}) : e) : t;
}
function Ea(r, t) {
  return fs(r, r, t);
}
var $t = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return e;
}, cs = 0, tr = {};
function Nr(r) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, e = cs++, n = t;
  function a() {
    n -= 1, n <= 0 ? (r(), delete tr[e]) : tr[e] = ar(a);
  }
  return tr[e] = ar(a), e;
}
Nr.cancel = function(t) {
  t !== void 0 && (ar.cancel(tr[t]), delete tr[t]);
};
Nr.ids = tr;
var rt;
function Nn(r) {
  return process.env.NODE_ENV === "test" ? !1 : !r || r.offsetParent === null || r.hidden;
}
function ls(r) {
  var t = (r || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
  return t && t[1] && t[2] && t[3] ? !(t[1] === t[2] && t[2] === t[3]) : !0;
}
var wa = /* @__PURE__ */ function(r) {
  Pt(e, r);
  var t = _t(e);
  function e() {
    var n;
    return gr(this, e), n = t.apply(this, arguments), n.containerRef = /* @__PURE__ */ O.createRef(), n.animationStart = !1, n.destroyed = !1, n.onClick = function(a, i) {
      var o, s, u = n.props, l = u.insertExtraNode, c = u.disabled;
      if (!(c || !a || Nn(a) || a.className.indexOf("-leave") >= 0)) {
        n.extraNode = document.createElement("div");
        var d = xt(n), v = d.extraNode, S = n.context.getPrefixCls;
        v.className = "".concat(S(""), "-click-animating-node");
        var _ = n.getAttributeName();
        if (a.setAttribute(_, "true"), i && i !== "#ffffff" && i !== "rgb(255, 255, 255)" && ls(i) && !/rgba\((?:\d*, ){3}0\)/.test(i) && i !== "transparent") {
          v.style.borderColor = i;
          var m = ((o = a.getRootNode) === null || o === void 0 ? void 0 : o.call(a)) || a.ownerDocument, y = m instanceof Document ? m.body : (s = m.firstChild) !== null && s !== void 0 ? s : m;
          rt = ia(`
      [`.concat(S(""), "-click-animating-without-extra-node='true']::after, .").concat(S(""), `-click-animating-node {
        --antd-wave-shadow-color: `).concat(i, `;
      }`), "antd-wave", {
            csp: n.csp,
            attachTo: y
          });
        }
        l && a.appendChild(v), ["transition", "animation"].forEach(function(p) {
          a.addEventListener("".concat(p, "start"), n.onTransitionStart), a.addEventListener("".concat(p, "end"), n.onTransitionEnd);
        });
      }
    }, n.onTransitionStart = function(a) {
      if (!n.destroyed) {
        var i = n.containerRef.current;
        !a || a.target !== i || n.animationStart || n.resetEffect(i);
      }
    }, n.onTransitionEnd = function(a) {
      !a || a.animationName !== "fadeEffect" || n.resetEffect(a.target);
    }, n.bindAnimationEvent = function(a) {
      if (!(!a || !a.getAttribute || a.getAttribute("disabled") || a.className.indexOf("disabled") >= 0)) {
        var i = function(s) {
          if (!(s.target.tagName === "INPUT" || Nn(s.target))) {
            n.resetEffect(a);
            var u = getComputedStyle(a).getPropertyValue("border-top-color") || getComputedStyle(a).getPropertyValue("border-color") || getComputedStyle(a).getPropertyValue("background-color");
            n.clickWaveTimeoutId = window.setTimeout(function() {
              return n.onClick(a, u);
            }, 0), Nr.cancel(n.animationStartId), n.animationStart = !0, n.animationStartId = Nr(function() {
              n.animationStart = !1;
            }, 10);
          }
        };
        return a.addEventListener("click", i, !0), {
          cancel: function() {
            a.removeEventListener("click", i, !0);
          }
        };
      }
    }, n.renderWave = function(a) {
      var i = a.csp, o = n.props.children;
      if (n.csp = i, !/* @__PURE__ */ O.isValidElement(o))
        return o;
      var s = n.containerRef;
      return Dn(o) && (s = ni(o.ref, n.containerRef)), Ea(o, {
        ref: s
      });
    }, n;
  }
  return pr(e, [{
    key: "componentDidMount",
    value: function() {
      this.destroyed = !1;
      var a = this.containerRef.current;
      !a || a.nodeType !== 1 || (this.instance = this.bindAnimationEvent(a));
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.instance && this.instance.cancel(), this.clickWaveTimeoutId && clearTimeout(this.clickWaveTimeoutId), this.destroyed = !0;
    }
  }, {
    key: "getAttributeName",
    value: function() {
      var a = this.context.getPrefixCls, i = this.props.insertExtraNode;
      return i ? "".concat(a(""), "-click-animating") : "".concat(a(""), "-click-animating-without-extra-node");
    }
  }, {
    key: "resetEffect",
    value: function(a) {
      var i = this;
      if (!(!a || a === this.extraNode || !(a instanceof Element))) {
        var o = this.props.insertExtraNode, s = this.getAttributeName();
        a.setAttribute(s, "false"), rt && (rt.innerHTML = ""), o && this.extraNode && a.contains(this.extraNode) && a.removeChild(this.extraNode), ["transition", "animation"].forEach(function(u) {
          a.removeEventListener("".concat(u, "start"), i.onTransitionStart), a.removeEventListener("".concat(u, "end"), i.onTransitionEnd);
        });
      }
    }
  }, {
    key: "render",
    value: function() {
      return /* @__PURE__ */ re(ns, {
        children: this.renderWave
      });
    }
  }]), e;
}(O.Component);
wa.contextType = Dr;
var ds = /* @__PURE__ */ Ya(function(r, t) {
  return /* @__PURE__ */ re(wa, {
    ref: t,
    ...r
  });
});
const vs = ds;
var gs = globalThis && globalThis.__rest || function(r, t) {
  var e = {};
  for (var n in r)
    Object.prototype.hasOwnProperty.call(r, n) && t.indexOf(n) < 0 && (e[n] = r[n]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, n = Object.getOwnPropertySymbols(r); a < n.length; a++)
      t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[a]) && (e[n[a]] = r[n[a]]);
  return e;
}, Fa = /* @__PURE__ */ O.createContext(void 0), ps = function(t) {
  var e, n = O.useContext(Dr), a = n.getPrefixCls, i = n.direction, o = t.prefixCls, s = t.size, u = t.className, l = gs(t, ["prefixCls", "size", "className"]), c = a("btn-group", o), d = "";
  switch (s) {
    case "large":
      d = "lg";
      break;
    case "small":
      d = "sm";
      break;
    case "middle":
    case void 0:
      break;
    default:
      process.env.NODE_ENV !== "production" && Et(!s, "Button.Group", "Invalid prop `size`.");
  }
  var v = kr(c, (e = {}, B(e, "".concat(c, "-").concat(d), d), B(e, "".concat(c, "-rtl"), i === "rtl"), e), u);
  return /* @__PURE__ */ re(Fa.Provider, {
    value: s,
    children: /* @__PURE__ */ re("div", {
      ...l,
      className: v
    })
  });
};
const hs = ps;
var tt = function() {
  return {
    width: 0,
    opacity: 0,
    transform: "scale(0)"
  };
}, nt = function(t) {
  return {
    width: t.scrollWidth,
    opacity: 1,
    transform: "scale(1)"
  };
}, ms = function(t) {
  var e = t.prefixCls, n = t.loading, a = t.existIcon, i = !!n;
  return a ? /* @__PURE__ */ re("span", {
    className: "".concat(e, "-loading-icon"),
    children: /* @__PURE__ */ re(Sn, {})
  }) : /* @__PURE__ */ re(rs, {
    visible: i,
    motionName: "".concat(e, "-loading-icon-motion"),
    removeOnLeave: !0,
    onAppearStart: tt,
    onAppearActive: nt,
    onEnterStart: tt,
    onEnterActive: nt,
    onLeaveStart: nt,
    onLeaveActive: tt,
    children: function(o, s) {
      var u = o.className, l = o.style;
      return /* @__PURE__ */ re("span", {
        className: "".concat(e, "-loading-icon"),
        style: l,
        ref: s,
        children: /* @__PURE__ */ re(Sn, {
          className: u
        })
      });
    }
  });
};
const ys = ms;
var bs = globalThis && globalThis.__rest || function(r, t) {
  var e = {};
  for (var n in r)
    Object.prototype.hasOwnProperty.call(r, n) && t.indexOf(n) < 0 && (e[n] = r[n]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, n = Object.getOwnPropertySymbols(r); a < n.length; a++)
      t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[a]) && (e[n[a]] = r[n[a]]);
  return e;
}, kn = /^[\u4e00-\u9fa5]{2}$/, St = kn.test.bind(kn);
function Es(r) {
  return typeof r == "string";
}
function _r(r) {
  return r === "text" || r === "link";
}
function ws(r) {
  return /* @__PURE__ */ O.isValidElement(r) && r.type === O.Fragment;
}
function Fs(r, t) {
  if (r != null) {
    var e = t ? " " : "";
    return typeof r != "string" && typeof r != "number" && Es(r.type) && St(r.props.children) ? Ea(r, {
      children: r.props.children.split("").join(e)
    }) : typeof r == "string" ? St(r) ? /* @__PURE__ */ re("span", {
      children: r.split("").join(e)
    }) : /* @__PURE__ */ re("span", {
      children: r
    }) : ws(r) ? /* @__PURE__ */ re("span", {
      children: r
    }) : r;
  }
}
function Cs(r, t) {
  var e = !1, n = [];
  return O.Children.forEach(r, function(a) {
    var i = he(a), o = i === "string" || i === "number";
    if (e && o) {
      var s = n.length - 1, u = n[s];
      n[s] = "".concat(u).concat(a);
    } else
      n.push(a);
    e = o;
  }), O.Children.map(n, function(a) {
    return Fs(a, t);
  });
}
$t("default", "primary", "ghost", "dashed", "link", "text");
$t("default", "circle", "round");
$t("submit", "button", "reset");
var Ss = function(t, e) {
  var n, a = t.loading, i = a === void 0 ? !1 : a, o = t.prefixCls, s = t.type, u = s === void 0 ? "default" : s, l = t.danger, c = t.shape, d = c === void 0 ? "default" : c, v = t.size, S = t.disabled, _ = t.className, m = t.children, y = t.icon, p = t.ghost, C = p === void 0 ? !1 : p, E = t.block, x = E === void 0 ? !1 : E, h = t.htmlType, N = h === void 0 ? "button" : h, M = bs(t, ["loading", "prefixCls", "type", "danger", "shape", "size", "disabled", "className", "children", "icon", "ghost", "block", "htmlType"]), $ = O.useContext(ss), I = O.useContext(is), b = S || I, g = O.useContext(Fa), F = O.useState(!!i), P = ge(F, 2), R = P[0], A = P[1], D = O.useState(!1), J = ge(D, 2), X = J[0], L = J[1], Y = O.useContext(Dr), te = Y.getPrefixCls, ee = Y.autoInsertSpaceInButton, oe = Y.direction, ce = e || /* @__PURE__ */ O.createRef(), le = function() {
    return O.Children.count(m) === 1 && !y && !_r(u);
  }, Ve = function() {
    if (!(!ce || !ce.current || ee === !1)) {
      var Be = ce.current.textContent;
      le() && St(Be) ? X || L(!0) : X && L(!1);
    }
  }, Fe = typeof i == "boolean" ? i : (i == null ? void 0 : i.delay) || !0;
  O.useEffect(function() {
    var be = null;
    return typeof Fe == "number" ? be = window.setTimeout(function() {
      be = null, A(Fe);
    }, Fe) : A(Fe), function() {
      be && (window.clearTimeout(be), be = null);
    };
  }, [Fe]), O.useEffect(Ve, [ce]);
  var Te = function(Be) {
    var ze = t.onClick;
    if (R || b) {
      Be.preventDefault();
      return;
    }
    ze == null || ze(Be);
  };
  process.env.NODE_ENV !== "production" && Et(!(typeof y == "string" && y.length > 2), "Button", "`icon` is using ReactNode instead of string naming in v4. Please check `".concat(y, "` at https://ant.design/components/icon")), process.env.NODE_ENV !== "production" && Et(!(C && _r(u)), "Button", "`link` or `text` button can't be a `ghost` button.");
  var ne = te("btn", o), Oe = ee !== !1, De = {
    large: "lg",
    small: "sm",
    middle: void 0
  }, k = g || v || $, me = k && De[k] || "", ke = R ? "loading" : y, ye = ui(M, ["navigate"]), Ae = kr(ne, (n = {}, B(n, "".concat(ne, "-").concat(d), d !== "default" && d), B(n, "".concat(ne, "-").concat(u), u), B(n, "".concat(ne, "-").concat(me), me), B(n, "".concat(ne, "-icon-only"), !m && m !== 0 && !!ke), B(n, "".concat(ne, "-background-ghost"), C && !_r(u)), B(n, "".concat(ne, "-loading"), R), B(n, "".concat(ne, "-two-chinese-chars"), X && Oe && !R), B(n, "".concat(ne, "-block"), x), B(n, "".concat(ne, "-dangerous"), !!l), B(n, "".concat(ne, "-rtl"), oe === "rtl"), B(n, "".concat(ne, "-disabled"), ye.href !== void 0 && b), n), _), ae = y && !R ? y : /* @__PURE__ */ re(ys, {
    existIcon: !!y,
    prefixCls: ne,
    loading: !!R
  }), ie = m || m === 0 ? Cs(m, le() && Oe) : null;
  if (ye.href !== void 0)
    return /* @__PURE__ */ en("a", {
      ...ye,
      className: Ae,
      onClick: Te,
      ref: ce,
      children: [ae, ie]
    });
  var se = /* @__PURE__ */ en("button", {
    ...M,
    type: N,
    className: Ae,
    onClick: Te,
    disabled: b,
    ref: ce,
    children: [ae, ie]
  });
  return _r(u) ? se : /* @__PURE__ */ re(vs, {
    disabled: !!R,
    children: se
  });
}, qr = /* @__PURE__ */ O.forwardRef(Ss);
process.env.NODE_ENV !== "production" && (qr.displayName = "Button");
qr.Group = hs;
qr.__ANT_BUTTON = !0;
const Vn = qr;
function $n({
  $trigger: r,
  count: t
}) {
  console.log("hello"), r("change", {
    count: t
  });
}
const Ps = (r) => {
  const t = r.__, e = t ? t.trigger : function() {
    console.warn("you should not use $trigger in thie component.");
  };
  return /* @__PURE__ */ pe.createElement(pe.Fragment, null, /* @__PURE__ */ pe.createElement(Vn, {
    onClick: () => $n({
      $trigger: e,
      count: 1
    })
  }, "count + 1"), /* @__PURE__ */ pe.createElement(Vn, {
    onClick: () => $n({
      $trigger: e,
      count: -1
    })
  }, "count - 1"));
}, Rs = (r) => {
  const t = r.__ || at.create();
  return t && t.trigger, /* @__PURE__ */ pe.createElement(pe.Fragment, null, /* @__PURE__ */ pe.createElement(Ka, {
    msg: "hello world",
    __: typeof t < "u" && t.create({
      register: "counter"
    })
  }), /* @__PURE__ */ pe.createElement(Ps, {
    __: typeof t < "u" && t.create({
      change: "counter"
    })
  }));
};
export {
  Rs as default
};
//# sourceMappingURL=index.es.js.map
