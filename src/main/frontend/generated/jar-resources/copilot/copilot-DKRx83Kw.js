class Qi extends EventTarget {
  constructor() {
    super(...arguments), this.eventBuffer = [], this.handledTypes = [];
  }
  on(t, r) {
    const n = r;
    return this.addEventListener(t, n), this.handledTypes.push(t), this.flush(t), () => this.off(t, n);
  }
  once(t, r) {
    this.addEventListener(t, r, { once: !0 });
  }
  off(t, r) {
    this.removeEventListener(t, r);
    const n = this.handledTypes.indexOf(t, 0);
    n > -1 && this.handledTypes.splice(n, 1);
  }
  emit(t, r) {
    const n = new CustomEvent(t, { detail: r, cancelable: !0 });
    return this.handledTypes.includes(t) || this.eventBuffer.push(n), this.dispatchEvent(n), n.defaultPrevented;
  }
  emitUnsafe({ type: t, data: r }) {
    return this.emit(t, r);
  }
  // Communication with server via eventbus
  send(t, r) {
    const n = new CustomEvent("copilot-send", { detail: { command: t, data: r } });
    this.dispatchEvent(n);
  }
  // Listeners for Copilot itself
  onSend(t) {
    this.on("copilot-send", t);
  }
  offSend(t) {
    this.off("copilot-send", t);
  }
  flush(t) {
    const r = [];
    this.eventBuffer.filter((n) => n.type === t).forEach((n) => {
      this.dispatchEvent(n), r.push(n);
    }), this.eventBuffer = this.eventBuffer.filter((n) => !r.includes(n));
  }
}
var eo = {
  0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
  1: function(t, r) {
    return "Cannot apply '" + t + "' to '" + r.toString() + "': Field not found.";
  },
  /*
  2(prop) {
      return `invalid decorator for '${prop.toString()}'`
  },
  3(prop) {
      return `Cannot decorate '${prop.toString()}': action can only be used on properties with a function value.`
  },
  4(prop) {
      return `Cannot decorate '${prop.toString()}': computed can only be used on getter properties.`
  },
  */
  5: "'keys()' can only be used on observable objects, arrays, sets and maps",
  6: "'values()' can only be used on observable objects, arrays, sets and maps",
  7: "'entries()' can only be used on observable objects, arrays and maps",
  8: "'set()' can only be used on observable objects, arrays and maps",
  9: "'remove()' can only be used on observable objects, arrays and maps",
  10: "'has()' can only be used on observable objects, arrays and maps",
  11: "'get()' can only be used on observable objects, arrays and maps",
  12: "Invalid annotation",
  13: "Dynamic observable objects cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  14: "Intercept handlers should return nothing or a change object",
  15: "Observable arrays cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  16: "Modification exception: the internal structure of an observable array was changed.",
  17: function(t, r) {
    return "[mobx.array] Index out of bounds, " + t + " is larger than " + r;
  },
  18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
  19: function(t) {
    return "Cannot initialize from classes that inherit from Map: " + t.constructor.name;
  },
  20: function(t) {
    return "Cannot initialize map from " + t;
  },
  21: function(t) {
    return "Cannot convert to map from '" + t + "'";
  },
  22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
  23: "It is not possible to get index atoms from arrays",
  24: function(t) {
    return "Cannot obtain administration from " + t;
  },
  25: function(t, r) {
    return "the entry '" + t + "' does not exist in the observable map '" + r + "'";
  },
  26: "please specify a property",
  27: function(t, r) {
    return "no observable property '" + t.toString() + "' found on the observable object '" + r + "'";
  },
  28: function(t) {
    return "Cannot obtain atom from " + t;
  },
  29: "Expecting some object",
  30: "invalid action stack. did you forget to finish an action?",
  31: "missing option for computed: get",
  32: function(t, r) {
    return "Cycle detected in computation " + t + ": " + r;
  },
  33: function(t) {
    return "The setter of computed value '" + t + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
  },
  34: function(t) {
    return "[ComputedValue '" + t + "'] It is not possible to assign a new value to a computed value.";
  },
  35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
  36: "isolateGlobalState should be called before MobX is running any reactions",
  37: function(t) {
    return "[mobx] `observableArray." + t + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + t + "()` instead";
  },
  38: "'ownKeys()' can only be used on observable objects",
  39: "'defineProperty()' can only be used on observable objects"
}, to = process.env.NODE_ENV !== "production" ? eo : {};
function f(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  if (process.env.NODE_ENV !== "production") {
    var i = typeof e == "string" ? e : to[e];
    throw typeof i == "function" && (i = i.apply(null, r)), new Error("[MobX] " + i);
  }
  throw new Error(typeof e == "number" ? "[MobX] minified error nr: " + e + (r.length ? " " + r.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + e);
}
var ro = {};
function Nn() {
  return typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : ro;
}
var xn = Object.assign, Pt = Object.getOwnPropertyDescriptor, J = Object.defineProperty, zt = Object.prototype, $t = [];
Object.freeze($t);
var Er = {};
Object.freeze(Er);
var no = typeof Proxy < "u", io = /* @__PURE__ */ Object.toString();
function Dn() {
  no || f(process.env.NODE_ENV !== "production" ? "`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" : "Proxy not available");
}
function We(e) {
  process.env.NODE_ENV !== "production" && h.verifyProxies && f("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + e);
}
function B() {
  return ++h.mobxGuid;
}
function Ar(e) {
  var t = !1;
  return function() {
    if (!t)
      return t = !0, e.apply(this, arguments);
  };
}
var Te = function() {
};
function O(e) {
  return typeof e == "function";
}
function we(e) {
  var t = typeof e;
  switch (t) {
    case "string":
    case "symbol":
    case "number":
      return !0;
  }
  return !1;
}
function Bt(e) {
  return e !== null && typeof e == "object";
}
function P(e) {
  if (!Bt(e))
    return !1;
  var t = Object.getPrototypeOf(e);
  if (t == null)
    return !0;
  var r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r.toString() === io;
}
function Pn(e) {
  var t = e?.constructor;
  return t ? t.name === "GeneratorFunction" || t.displayName === "GeneratorFunction" : !1;
}
function Kt(e, t, r) {
  J(e, t, {
    enumerable: !1,
    writable: !0,
    configurable: !0,
    value: r
  });
}
function $n(e, t, r) {
  J(e, t, {
    enumerable: !1,
    writable: !1,
    configurable: !0,
    value: r
  });
}
function xe(e, t) {
  var r = "isMobX" + e;
  return t.prototype[r] = !0, function(n) {
    return Bt(n) && n[r] === !0;
  };
}
function Ue(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Map]";
}
function oo(e) {
  var t = Object.getPrototypeOf(e), r = Object.getPrototypeOf(t), n = Object.getPrototypeOf(r);
  return n === null;
}
function Q(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Set]";
}
var Cn = typeof Object.getOwnPropertySymbols < "u";
function ao(e) {
  var t = Object.keys(e);
  if (!Cn)
    return t;
  var r = Object.getOwnPropertySymbols(e);
  return r.length ? [].concat(t, r.filter(function(n) {
    return zt.propertyIsEnumerable.call(e, n);
  })) : t;
}
var rt = typeof Reflect < "u" && Reflect.ownKeys ? Reflect.ownKeys : Cn ? function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : (
  /* istanbul ignore next */
  Object.getOwnPropertyNames
);
function dr(e) {
  return typeof e == "string" ? e : typeof e == "symbol" ? e.toString() : new String(e).toString();
}
function Vn(e) {
  return e === null ? null : typeof e == "object" ? "" + e : e;
}
function F(e, t) {
  return zt.hasOwnProperty.call(e, t);
}
var so = Object.getOwnPropertyDescriptors || function(t) {
  var r = {};
  return rt(t).forEach(function(n) {
    r[n] = Pt(t, n);
  }), r;
};
function C(e, t) {
  return !!(e & t);
}
function V(e, t, r) {
  return r ? e |= t : e &= ~t, e;
}
function Kr(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function lo(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, uo(n.key), n);
  }
}
function ze(e, t, r) {
  return t && lo(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function ke(e, t) {
  var r = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r) return (r = r.call(e)).next.bind(r);
  if (Array.isArray(e) || (r = ho(e)) || t) {
    r && (e = r);
    var n = 0;
    return function() {
      return n >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[n++]
      };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function le() {
  return le = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, le.apply(null, arguments);
}
function Tn(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, hr(e, t);
}
function hr(e, t) {
  return hr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, hr(e, t);
}
function co(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function uo(e) {
  var t = co(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ho(e, t) {
  if (e) {
    if (typeof e == "string") return Kr(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Kr(e, t) : void 0;
  }
}
var ee = /* @__PURE__ */ Symbol("mobx-stored-annotations");
function Z(e) {
  function t(r, n) {
    if (dt(n))
      return e.decorate_20223_(r, n);
    Be(r, n, e);
  }
  return Object.assign(t, e);
}
function Be(e, t, r) {
  if (F(e, ee) || Kt(e, ee, le({}, e[ee])), process.env.NODE_ENV !== "production" && Ct(r) && !F(e[ee], t)) {
    var n = e.constructor.name + ".prototype." + t.toString();
    f("'" + n + "' is decorated with 'override', but no such decorated member was found on prototype.");
  }
  fo(e, r, t), Ct(r) || (e[ee][t] = r);
}
function fo(e, t, r) {
  if (process.env.NODE_ENV !== "production" && !Ct(t) && F(e[ee], r)) {
    var n = e.constructor.name + ".prototype." + r.toString(), i = e[ee][r].annotationType_, o = t.annotationType_;
    f("Cannot apply '@" + o + "' to '" + n + "':" + (`
The field is already decorated with '@` + i + "'.") + `
Re-decorating fields is not allowed.
Use '@override' decorator for methods overridden by subclass.`);
  }
}
function dt(e) {
  return typeof e == "object" && typeof e.kind == "string";
}
function Ft(e, t) {
  process.env.NODE_ENV !== "production" && !t.includes(e.kind) && f("The decorator applied to '" + String(e.name) + "' cannot be used on a " + e.kind + " element");
}
var p = /* @__PURE__ */ Symbol("mobx administration"), ue = /* @__PURE__ */ function() {
  function e(r) {
    r === void 0 && (r = process.env.NODE_ENV !== "production" ? "Atom@" + B() : "Atom"), this.name_ = void 0, this.flags_ = 0, this.observers_ = /* @__PURE__ */ new Set(), this.lastAccessedBy_ = 0, this.lowestObserverState_ = m.NOT_TRACKING_, this.onBOL = void 0, this.onBUOL = void 0, this.name_ = r;
  }
  var t = e.prototype;
  return t.onBO = function() {
    this.onBOL && this.onBOL.forEach(function(n) {
      return n();
    });
  }, t.onBUO = function() {
    this.onBUOL && this.onBUOL.forEach(function(n) {
      return n();
    });
  }, t.reportObserved = function() {
    return Xn(this);
  }, t.reportChanged = function() {
    L(), Jn(this), I();
  }, t.toString = function() {
    return this.name_;
  }, ze(e, [{
    key: "isBeingObserved",
    get: function() {
      return C(this.flags_, e.isBeingObservedMask_);
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.isBeingObservedMask_, n);
    }
  }, {
    key: "isPendingUnobservation",
    get: function() {
      return C(this.flags_, e.isPendingUnobservationMask_);
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.isPendingUnobservationMask_, n);
    }
  }, {
    key: "diffValue",
    get: function() {
      return C(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.diffValueMask_, n === 1);
    }
  }]);
}();
ue.isBeingObservedMask_ = 1;
ue.isPendingUnobservationMask_ = 2;
ue.diffValueMask_ = 4;
var Sr = /* @__PURE__ */ xe("Atom", ue);
function kn(e, t, r) {
  t === void 0 && (t = Te), r === void 0 && (r = Te);
  var n = new ue(e);
  return t !== Te && Aa(n, t), r !== Te && ai(n, r), n;
}
function vo(e, t) {
  return e === t;
}
function po(e, t) {
  return Cr(e, t);
}
function go(e, t) {
  return Cr(e, t, 1);
}
function bo(e, t) {
  return Object.is ? Object.is(e, t) : e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var Re = {
  identity: vo,
  structural: po,
  default: bo,
  shallow: go
};
function Oe(e, t, r) {
  return ot(e) ? e : Array.isArray(e) ? A.array(e, {
    name: r
  }) : P(e) ? A.object(e, void 0, {
    name: r
  }) : Ue(e) ? A.map(e, {
    name: r
  }) : Q(e) ? A.set(e, {
    name: r
  }) : typeof e == "function" && !ft(e) && !it(e) ? Pn(e) ? je(e) : nt(r, e) : e;
}
function _o(e, t, r) {
  if (e == null || He(e) || Yt(e) || de(e) || Ke(e))
    return e;
  if (Array.isArray(e))
    return A.array(e, {
      name: r,
      deep: !1
    });
  if (P(e))
    return A.object(e, void 0, {
      name: r,
      deep: !1
    });
  if (Ue(e))
    return A.map(e, {
      name: r,
      deep: !1
    });
  if (Q(e))
    return A.set(e, {
      name: r,
      deep: !1
    });
  process.env.NODE_ENV !== "production" && f("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
}
function Ht(e) {
  return e;
}
function mo(e, t) {
  return process.env.NODE_ENV !== "production" && ot(e) && f("observable.struct should not be used with observable values"), Cr(e, t) ? t : e;
}
var yo = "override";
function Ct(e) {
  return e.annotationType_ === yo;
}
function ht(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: wo,
    extend_: Oo,
    decorate_20223_: Eo
  };
}
function wo(e, t, r, n) {
  var i;
  if ((i = this.options_) != null && i.bound)
    return this.extend_(e, t, r, !1) === null ? 0 : 1;
  if (n === e.target_)
    return this.extend_(e, t, r, !1) === null ? 0 : 2;
  if (ft(r.value))
    return 1;
  var o = Rn(e, this, t, r, !1);
  return J(n, t, o), 2;
}
function Oo(e, t, r, n) {
  var i = Rn(e, this, t, r);
  return e.defineProperty_(t, i, n);
}
function Eo(e, t) {
  process.env.NODE_ENV !== "production" && Ft(t, ["method", "field"]);
  var r = t.kind, n = t.name, i = t.addInitializer, o = this, a = function(c) {
    var u, d, v, g;
    return Ee((u = (d = o.options_) == null ? void 0 : d.name) != null ? u : n.toString(), c, (v = (g = o.options_) == null ? void 0 : g.autoAction) != null ? v : !1);
  };
  if (r == "field") {
    i(function() {
      Be(this, n, o);
    });
    return;
  }
  if (r == "method") {
    var l;
    return ft(e) || (e = a(e)), (l = this.options_) != null && l.bound && i(function() {
      var s = this, c = s[n].bind(s);
      c.isMobxAction = !0, s[n] = c;
    }), e;
  }
  f("Cannot apply '" + o.annotationType_ + "' to '" + String(n) + "' (kind: " + r + "):" + (`
'` + o.annotationType_ + "' can only be used on properties with a function value."));
}
function Ao(e, t, r, n) {
  var i = t.annotationType_, o = n.value;
  process.env.NODE_ENV !== "production" && !O(o) && f("Cannot apply '" + i + "' to '" + e.name_ + "." + r.toString() + "':" + (`
'` + i + "' can only be used on properties with a function value."));
}
function Rn(e, t, r, n, i) {
  var o, a, l, s, c, u, d;
  i === void 0 && (i = h.safeDescriptors), Ao(e, t, r, n);
  var v = n.value;
  if ((o = t.options_) != null && o.bound) {
    var g;
    v = v.bind((g = e.proxy_) != null ? g : e.target_);
  }
  return {
    value: Ee(
      (a = (l = t.options_) == null ? void 0 : l.name) != null ? a : r.toString(),
      v,
      (s = (c = t.options_) == null ? void 0 : c.autoAction) != null ? s : !1,
      // https://github.com/mobxjs/mobx/discussions/3140
      (u = t.options_) != null && u.bound ? (d = e.proxy_) != null ? d : e.target_ : void 0
    ),
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: i ? e.isPlainObject_ : !0,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: !1,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: !i
  };
}
function jn(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: So,
    extend_: No,
    decorate_20223_: xo
  };
}
function So(e, t, r, n) {
  var i;
  if (n === e.target_)
    return this.extend_(e, t, r, !1) === null ? 0 : 2;
  if ((i = this.options_) != null && i.bound && (!F(e.target_, t) || !it(e.target_[t])) && this.extend_(e, t, r, !1) === null)
    return 0;
  if (it(r.value))
    return 1;
  var o = Mn(e, this, t, r, !1, !1);
  return J(n, t, o), 2;
}
function No(e, t, r, n) {
  var i, o = Mn(e, this, t, r, (i = this.options_) == null ? void 0 : i.bound);
  return e.defineProperty_(t, o, n);
}
function xo(e, t) {
  var r;
  process.env.NODE_ENV !== "production" && Ft(t, ["method"]);
  var n = t.name, i = t.addInitializer;
  return it(e) || (e = je(e)), (r = this.options_) != null && r.bound && i(function() {
    var o = this, a = o[n].bind(o);
    a.isMobXFlow = !0, o[n] = a;
  }), e;
}
function Do(e, t, r, n) {
  var i = t.annotationType_, o = n.value;
  process.env.NODE_ENV !== "production" && !O(o) && f("Cannot apply '" + i + "' to '" + e.name_ + "." + r.toString() + "':" + (`
'` + i + "' can only be used on properties with a generator function value."));
}
function Mn(e, t, r, n, i, o) {
  o === void 0 && (o = h.safeDescriptors), Do(e, t, r, n);
  var a = n.value;
  if (it(a) || (a = je(a)), i) {
    var l;
    a = a.bind((l = e.proxy_) != null ? l : e.target_), a.isMobXFlow = !0;
  }
  return {
    value: a,
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: o ? e.isPlainObject_ : !0,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: !1,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: !o
  };
}
function Nr(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: Po,
    extend_: $o,
    decorate_20223_: Co
  };
}
function Po(e, t, r) {
  return this.extend_(e, t, r, !1) === null ? 0 : 1;
}
function $o(e, t, r, n) {
  return Vo(e, this, t, r), e.defineComputedProperty_(t, le({}, this.options_, {
    get: r.get,
    set: r.set
  }), n);
}
function Co(e, t) {
  process.env.NODE_ENV !== "production" && Ft(t, ["getter"]);
  var r = this, n = t.name, i = t.addInitializer;
  return i(function() {
    var o = Fe(this)[p], a = le({}, r.options_, {
      get: e,
      context: this
    });
    a.name || (a.name = process.env.NODE_ENV !== "production" ? o.name_ + "." + n.toString() : "ObservableObject." + n.toString()), o.values_.set(n, new z(a));
  }), function() {
    return this[p].getObservablePropValue_(n);
  };
}
function Vo(e, t, r, n) {
  var i = t.annotationType_, o = n.get;
  process.env.NODE_ENV !== "production" && !o && f("Cannot apply '" + i + "' to '" + e.name_ + "." + r.toString() + "':" + (`
'` + i + "' can only be used on getter(+setter) properties."));
}
function qt(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: To,
    extend_: ko,
    decorate_20223_: Ro
  };
}
function To(e, t, r) {
  return this.extend_(e, t, r, !1) === null ? 0 : 1;
}
function ko(e, t, r, n) {
  var i, o;
  return jo(e, this, t, r), e.defineObservableProperty_(t, r.value, (i = (o = this.options_) == null ? void 0 : o.enhancer) != null ? i : Oe, n);
}
function Ro(e, t) {
  if (process.env.NODE_ENV !== "production") {
    if (t.kind === "field")
      throw f("Please use `@observable accessor " + String(t.name) + "` instead of `@observable " + String(t.name) + "`");
    Ft(t, ["accessor"]);
  }
  var r = this, n = t.kind, i = t.name, o = /* @__PURE__ */ new WeakSet();
  function a(l, s) {
    var c, u, d = Fe(l)[p], v = new me(s, (c = (u = r.options_) == null ? void 0 : u.enhancer) != null ? c : Oe, process.env.NODE_ENV !== "production" ? d.name_ + "." + i.toString() : "ObservableObject." + i.toString(), !1);
    d.values_.set(i, v), o.add(l);
  }
  if (n == "accessor")
    return {
      get: function() {
        return o.has(this) || a(this, e.get.call(this)), this[p].getObservablePropValue_(i);
      },
      set: function(s) {
        return o.has(this) || a(this, s), this[p].setObservablePropValue_(i, s);
      },
      init: function(s) {
        return o.has(this) || a(this, s), s;
      }
    };
}
function jo(e, t, r, n) {
  var i = t.annotationType_;
  process.env.NODE_ENV !== "production" && !("value" in n) && f("Cannot apply '" + i + "' to '" + e.name_ + "." + r.toString() + "':" + (`
'` + i + "' cannot be used on getter/setter properties"));
}
var Mo = "true", Lo = /* @__PURE__ */ Ln();
function Ln(e) {
  return {
    annotationType_: Mo,
    options_: e,
    make_: Io,
    extend_: Uo,
    decorate_20223_: zo
  };
}
function Io(e, t, r, n) {
  var i, o;
  if (r.get)
    return Wt.make_(e, t, r, n);
  if (r.set) {
    var a = Ee(t.toString(), r.set);
    return n === e.target_ ? e.defineProperty_(t, {
      configurable: h.safeDescriptors ? e.isPlainObject_ : !0,
      set: a
    }) === null ? 0 : 2 : (J(n, t, {
      configurable: !0,
      set: a
    }), 2);
  }
  if (n !== e.target_ && typeof r.value == "function") {
    var l;
    if (Pn(r.value)) {
      var s, c = (s = this.options_) != null && s.autoBind ? je.bound : je;
      return c.make_(e, t, r, n);
    }
    var u = (l = this.options_) != null && l.autoBind ? nt.bound : nt;
    return u.make_(e, t, r, n);
  }
  var d = ((i = this.options_) == null ? void 0 : i.deep) === !1 ? A.ref : A;
  if (typeof r.value == "function" && (o = this.options_) != null && o.autoBind) {
    var v;
    r.value = r.value.bind((v = e.proxy_) != null ? v : e.target_);
  }
  return d.make_(e, t, r, n);
}
function Uo(e, t, r, n) {
  var i, o;
  if (r.get)
    return Wt.extend_(e, t, r, n);
  if (r.set)
    return e.defineProperty_(t, {
      configurable: h.safeDescriptors ? e.isPlainObject_ : !0,
      set: Ee(t.toString(), r.set)
    }, n);
  if (typeof r.value == "function" && (i = this.options_) != null && i.autoBind) {
    var a;
    r.value = r.value.bind((a = e.proxy_) != null ? a : e.target_);
  }
  var l = ((o = this.options_) == null ? void 0 : o.deep) === !1 ? A.ref : A;
  return l.extend_(e, t, r, n);
}
function zo(e, t) {
  f("'" + this.annotationType_ + "' cannot be used as a decorator");
}
var Bo = "observable", Ko = "observable.ref", Fo = "observable.shallow", Ho = "observable.struct", In = {
  deep: !0,
  name: void 0,
  defaultDecorator: void 0,
  proxy: !0
};
Object.freeze(In);
function _t(e) {
  return e || In;
}
var fr = /* @__PURE__ */ qt(Bo), qo = /* @__PURE__ */ qt(Ko, {
  enhancer: Ht
}), Wo = /* @__PURE__ */ qt(Fo, {
  enhancer: _o
}), Go = /* @__PURE__ */ qt(Ho, {
  enhancer: mo
}), Un = /* @__PURE__ */ Z(fr);
function mt(e) {
  return e.deep === !0 ? Oe : e.deep === !1 ? Ht : Jo(e.defaultDecorator);
}
function Xo(e) {
  var t;
  return e ? (t = e.defaultDecorator) != null ? t : Ln(e) : void 0;
}
function Jo(e) {
  var t, r;
  return e && (t = (r = e.options_) == null ? void 0 : r.enhancer) != null ? t : Oe;
}
function zn(e, t, r) {
  if (dt(t))
    return fr.decorate_20223_(e, t);
  if (we(t)) {
    Be(e, t, fr);
    return;
  }
  return ot(e) ? e : P(e) ? A.object(e, t, r) : Array.isArray(e) ? A.array(e, t) : Ue(e) ? A.map(e, t) : Q(e) ? A.set(e, t) : typeof e == "object" && e !== null ? e : A.box(e, t);
}
xn(zn, Un);
var Zo = {
  box: function(t, r) {
    var n = _t(r);
    return new me(t, mt(n), n.name, !0, n.equals);
  },
  array: function(t, r) {
    var n = _t(r);
    return (h.useProxies === !1 || n.proxy === !1 ? qa : ja)(t, mt(n), n.name);
  },
  map: function(t, r) {
    var n = _t(r);
    return new hi(t, mt(n), n.name);
  },
  set: function(t, r) {
    var n = _t(r);
    return new fi(t, mt(n), n.name);
  },
  object: function(t, r, n) {
    return Pe(function() {
      return li(h.useProxies === !1 || n?.proxy === !1 ? Fe({}, n) : Ta({}, n), t, r);
    });
  },
  ref: /* @__PURE__ */ Z(qo),
  shallow: /* @__PURE__ */ Z(Wo),
  deep: Un,
  struct: /* @__PURE__ */ Z(Go)
}, A = /* @__PURE__ */ xn(zn, Zo), Bn = "computed", Yo = "computed.struct", vr = /* @__PURE__ */ Nr(Bn), Qo = /* @__PURE__ */ Nr(Yo, {
  equals: Re.structural
}), Wt = function(t, r) {
  if (dt(r))
    return vr.decorate_20223_(t, r);
  if (we(r))
    return Be(t, r, vr);
  if (P(t))
    return Z(Nr(Bn, t));
  process.env.NODE_ENV !== "production" && (O(t) || f("First argument to `computed` should be an expression."), O(r) && f("A setter as second argument is no longer supported, use `{ set: fn }` option instead"));
  var n = P(r) ? r : {};
  return n.get = t, n.name || (n.name = t.name || ""), new z(n);
};
Object.assign(Wt, vr);
Wt.struct = /* @__PURE__ */ Z(Qo);
var Fr, Hr, Vt = 0, ea = 1, ta = (Fr = (Hr = /* @__PURE__ */ Pt(function() {
}, "name")) == null ? void 0 : Hr.configurable) != null ? Fr : !1, qr = {
  value: "action",
  configurable: !0,
  writable: !1,
  enumerable: !1
};
function Ee(e, t, r, n) {
  r === void 0 && (r = !1), process.env.NODE_ENV !== "production" && (O(t) || f("`action` can only be invoked on functions"), (typeof e != "string" || !e) && f("actions should have valid names, got: '" + e + "'"));
  function i() {
    return Kn(e, r, t, n || this, arguments);
  }
  return i.isMobxAction = !0, i.toString = function() {
    return t.toString();
  }, ta && (qr.value = e, J(i, "name", qr)), i;
}
function Kn(e, t, r, n, i) {
  var o = ra(e, t, n, i);
  try {
    return r.apply(n, i);
  } catch (a) {
    throw o.error_ = a, a;
  } finally {
    na(o);
  }
}
function ra(e, t, r, n) {
  var i = process.env.NODE_ENV !== "production" && D() && !!e, o = 0;
  if (process.env.NODE_ENV !== "production" && i) {
    o = Date.now();
    var a = n ? Array.from(n) : $t;
    T({
      type: Dr,
      name: e,
      object: r,
      arguments: a
    });
  }
  var l = h.trackingDerivation, s = !t || !l;
  L();
  var c = h.allowStateChanges;
  s && (De(), c = Gt(!0));
  var u = xr(!0), d = {
    runAsAction_: s,
    prevDerivation_: l,
    prevAllowStateChanges_: c,
    prevAllowStateReads_: u,
    notifySpy_: i,
    startTime_: o,
    actionId_: ea++,
    parentActionId_: Vt
  };
  return Vt = d.actionId_, d;
}
function na(e) {
  Vt !== e.actionId_ && f(30), Vt = e.parentActionId_, e.error_ !== void 0 && (h.suppressReactionErrors = !0), Xt(e.prevAllowStateChanges_), Qe(e.prevAllowStateReads_), I(), e.runAsAction_ && ne(e.prevDerivation_), process.env.NODE_ENV !== "production" && e.notifySpy_ && k({
    time: Date.now() - e.startTime_
  }), h.suppressReactionErrors = !1;
}
function ia(e, t) {
  var r = Gt(e);
  try {
    return t();
  } finally {
    Xt(r);
  }
}
function Gt(e) {
  var t = h.allowStateChanges;
  return h.allowStateChanges = e, t;
}
function Xt(e) {
  h.allowStateChanges = e;
}
var oa = "create", me = /* @__PURE__ */ function(e) {
  function t(n, i, o, a, l) {
    var s;
    return o === void 0 && (o = process.env.NODE_ENV !== "production" ? "ObservableValue@" + B() : "ObservableValue"), a === void 0 && (a = !0), l === void 0 && (l = Re.default), s = e.call(this, o) || this, s.enhancer = void 0, s.name_ = void 0, s.equals = void 0, s.hasUnreportedChange_ = !1, s.interceptors_ = void 0, s.changeListeners_ = void 0, s.value_ = void 0, s.dehancer = void 0, s.enhancer = i, s.name_ = o, s.equals = l, s.value_ = i(n, void 0, o), process.env.NODE_ENV !== "production" && a && D() && Ae({
      type: oa,
      object: s,
      observableKind: "value",
      debugObjectName: s.name_,
      newValue: "" + s.value_
    }), s;
  }
  Tn(t, e);
  var r = t.prototype;
  return r.dehanceValue = function(i) {
    return this.dehancer !== void 0 ? this.dehancer(i) : i;
  }, r.set = function(i) {
    var o = this.value_;
    if (i = this.prepareNewValue_(i), i !== h.UNCHANGED) {
      var a = D();
      process.env.NODE_ENV !== "production" && a && T({
        type: K,
        object: this,
        observableKind: "value",
        debugObjectName: this.name_,
        newValue: i,
        oldValue: o
      }), this.setNewValue_(i), process.env.NODE_ENV !== "production" && a && k();
    }
  }, r.prepareNewValue_ = function(i) {
    if (X(this), j(this)) {
      var o = M(this, {
        object: this,
        type: K,
        newValue: i
      });
      if (!o)
        return h.UNCHANGED;
      i = o.newValue;
    }
    return i = this.enhancer(i, this.value_, this.name_), this.equals(this.value_, i) ? h.UNCHANGED : i;
  }, r.setNewValue_ = function(i) {
    var o = this.value_;
    this.value_ = i, this.reportChanged(), H(this) && q(this, {
      type: K,
      object: this,
      newValue: i,
      oldValue: o
    });
  }, r.get = function() {
    return this.reportObserved(), this.dehanceValue(this.value_);
  }, r.intercept_ = function(i) {
    return vt(this, i);
  }, r.observe_ = function(i, o) {
    return o && i({
      observableKind: "value",
      debugObjectName: this.name_,
      object: this,
      type: K,
      newValue: this.value_,
      oldValue: void 0
    }), pt(this, i);
  }, r.raw = function() {
    return this.value_;
  }, r.toJSON = function() {
    return this.get();
  }, r.toString = function() {
    return this.name_ + "[" + this.value_ + "]";
  }, r.valueOf = function() {
    return Vn(this.get());
  }, r[Symbol.toPrimitive] = function() {
    return this.valueOf();
  }, t;
}(ue), z = /* @__PURE__ */ function() {
  function e(r) {
    this.dependenciesState_ = m.NOT_TRACKING_, this.observing_ = [], this.newObserving_ = null, this.observers_ = /* @__PURE__ */ new Set(), this.runId_ = 0, this.lastAccessedBy_ = 0, this.lowestObserverState_ = m.UP_TO_DATE_, this.unboundDepsCount_ = 0, this.value_ = new Tt(null), this.name_ = void 0, this.triggeredBy_ = void 0, this.flags_ = 0, this.derivation = void 0, this.setter_ = void 0, this.isTracing_ = U.NONE, this.scope_ = void 0, this.equals_ = void 0, this.requiresReaction_ = void 0, this.keepAlive_ = void 0, this.onBOL = void 0, this.onBUOL = void 0, r.get || f(31), this.derivation = r.get, this.name_ = r.name || (process.env.NODE_ENV !== "production" ? "ComputedValue@" + B() : "ComputedValue"), r.set && (this.setter_ = Ee(process.env.NODE_ENV !== "production" ? this.name_ + "-setter" : "ComputedValue-setter", r.set)), this.equals_ = r.equals || (r.compareStructural || r.struct ? Re.structural : Re.default), this.scope_ = r.context, this.requiresReaction_ = r.requiresReaction, this.keepAlive_ = !!r.keepAlive;
  }
  var t = e.prototype;
  return t.onBecomeStale_ = function() {
    da(this);
  }, t.onBO = function() {
    this.onBOL && this.onBOL.forEach(function(n) {
      return n();
    });
  }, t.onBUO = function() {
    this.onBUOL && this.onBUOL.forEach(function(n) {
      return n();
    });
  }, t.get = function() {
    if (this.isComputing && f(32, this.name_, this.derivation), h.inBatch === 0 && // !globalState.trackingDerivatpion &&
    this.observers_.size === 0 && !this.keepAlive_)
      pr(this) && (this.warnAboutUntrackedRead_(), L(), this.value_ = this.computeValue_(!1), I());
    else if (Xn(this), pr(this)) {
      var n = h.trackingContext;
      this.keepAlive_ && !n && (h.trackingContext = this), this.trackAndCompute() && ua(this), h.trackingContext = n;
    }
    var i = this.value_;
    if (St(i))
      throw i.cause;
    return i;
  }, t.set = function(n) {
    if (this.setter_) {
      this.isRunningSetter && f(33, this.name_), this.isRunningSetter = !0;
      try {
        this.setter_.call(this.scope_, n);
      } finally {
        this.isRunningSetter = !1;
      }
    } else
      f(34, this.name_);
  }, t.trackAndCompute = function() {
    var n = this.value_, i = (
      /* see #1208 */
      this.dependenciesState_ === m.NOT_TRACKING_
    ), o = this.computeValue_(!0), a = i || St(n) || St(o) || !this.equals_(n, o);
    return a && (this.value_ = o, process.env.NODE_ENV !== "production" && D() && Ae({
      observableKind: "computed",
      debugObjectName: this.name_,
      object: this.scope_,
      type: "update",
      oldValue: n,
      newValue: o
    })), a;
  }, t.computeValue_ = function(n) {
    this.isComputing = !0;
    var i = Gt(!1), o;
    if (n)
      o = Fn(this, this.derivation, this.scope_);
    else if (h.disableErrorBoundaries === !0)
      o = this.derivation.call(this.scope_);
    else
      try {
        o = this.derivation.call(this.scope_);
      } catch (a) {
        o = new Tt(a);
      }
    return Xt(i), this.isComputing = !1, o;
  }, t.suspend_ = function() {
    this.keepAlive_ || (gr(this), this.value_ = void 0, process.env.NODE_ENV !== "production" && this.isTracing_ !== U.NONE && console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access."));
  }, t.observe_ = function(n, i) {
    var o = this, a = !0, l = void 0;
    return ni(function() {
      var s = o.get();
      if (!a || i) {
        var c = De();
        n({
          observableKind: "computed",
          debugObjectName: o.name_,
          type: K,
          object: o,
          newValue: s,
          oldValue: l
        }), ne(c);
      }
      a = !1, l = s;
    });
  }, t.warnAboutUntrackedRead_ = function() {
    process.env.NODE_ENV !== "production" && (this.isTracing_ !== U.NONE && console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute."), (typeof this.requiresReaction_ == "boolean" ? this.requiresReaction_ : h.computedRequiresReaction) && console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute."));
  }, t.toString = function() {
    return this.name_ + "[" + this.derivation.toString() + "]";
  }, t.valueOf = function() {
    return Vn(this.get());
  }, t[Symbol.toPrimitive] = function() {
    return this.valueOf();
  }, ze(e, [{
    key: "isComputing",
    get: function() {
      return C(this.flags_, e.isComputingMask_);
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.isComputingMask_, n);
    }
  }, {
    key: "isRunningSetter",
    get: function() {
      return C(this.flags_, e.isRunningSetterMask_);
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.isRunningSetterMask_, n);
    }
  }, {
    key: "isBeingObserved",
    get: function() {
      return C(this.flags_, e.isBeingObservedMask_);
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.isBeingObservedMask_, n);
    }
  }, {
    key: "isPendingUnobservation",
    get: function() {
      return C(this.flags_, e.isPendingUnobservationMask_);
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.isPendingUnobservationMask_, n);
    }
  }, {
    key: "diffValue",
    get: function() {
      return C(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.diffValueMask_, n === 1);
    }
  }]);
}();
z.isComputingMask_ = 1;
z.isRunningSetterMask_ = 2;
z.isBeingObservedMask_ = 4;
z.isPendingUnobservationMask_ = 8;
z.diffValueMask_ = 16;
var Jt = /* @__PURE__ */ xe("ComputedValue", z), m;
(function(e) {
  e[e.NOT_TRACKING_ = -1] = "NOT_TRACKING_", e[e.UP_TO_DATE_ = 0] = "UP_TO_DATE_", e[e.POSSIBLY_STALE_ = 1] = "POSSIBLY_STALE_", e[e.STALE_ = 2] = "STALE_";
})(m || (m = {}));
var U;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.LOG = 1] = "LOG", e[e.BREAK = 2] = "BREAK";
})(U || (U = {}));
var Tt = function(t) {
  this.cause = void 0, this.cause = t;
};
function St(e) {
  return e instanceof Tt;
}
function pr(e) {
  switch (e.dependenciesState_) {
    case m.UP_TO_DATE_:
      return !1;
    case m.NOT_TRACKING_:
    case m.STALE_:
      return !0;
    case m.POSSIBLY_STALE_: {
      for (var t = xr(!0), r = De(), n = e.observing_, i = n.length, o = 0; o < i; o++) {
        var a = n[o];
        if (Jt(a)) {
          if (h.disableErrorBoundaries)
            a.get();
          else
            try {
              a.get();
            } catch {
              return ne(r), Qe(t), !0;
            }
          if (e.dependenciesState_ === m.STALE_)
            return ne(r), Qe(t), !0;
        }
      }
      return qn(e), ne(r), Qe(t), !1;
    }
  }
}
function X(e) {
  if (process.env.NODE_ENV !== "production") {
    var t = e.observers_.size > 0;
    !h.allowStateChanges && (t || h.enforceActions === "always") && console.warn("[MobX] " + (h.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + e.name_);
  }
}
function aa(e) {
  process.env.NODE_ENV !== "production" && !h.allowStateReads && h.observableRequiresReaction && console.warn("[mobx] Observable '" + e.name_ + "' being read outside a reactive context.");
}
function Fn(e, t, r) {
  var n = xr(!0);
  qn(e), e.newObserving_ = new Array(
    // Reserve constant space for initial dependencies, dynamic space otherwise.
    // See https://github.com/mobxjs/mobx/pull/3833
    e.runId_ === 0 ? 100 : e.observing_.length
  ), e.unboundDepsCount_ = 0, e.runId_ = ++h.runId;
  var i = h.trackingDerivation;
  h.trackingDerivation = e, h.inBatch++;
  var o;
  if (h.disableErrorBoundaries === !0)
    o = t.call(r);
  else
    try {
      o = t.call(r);
    } catch (a) {
      o = new Tt(a);
    }
  return h.inBatch--, h.trackingDerivation = i, la(e), sa(e), Qe(n), o;
}
function sa(e) {
  process.env.NODE_ENV !== "production" && e.observing_.length === 0 && (typeof e.requiresObservable_ == "boolean" ? e.requiresObservable_ : h.reactionRequiresObservable) && console.warn("[mobx] Derivation '" + e.name_ + "' is created/updated without reading any observable value.");
}
function la(e) {
  for (var t = e.observing_, r = e.observing_ = e.newObserving_, n = m.UP_TO_DATE_, i = 0, o = e.unboundDepsCount_, a = 0; a < o; a++) {
    var l = r[a];
    l.diffValue === 0 && (l.diffValue = 1, i !== a && (r[i] = l), i++), l.dependenciesState_ > n && (n = l.dependenciesState_);
  }
  for (r.length = i, e.newObserving_ = null, o = t.length; o--; ) {
    var s = t[o];
    s.diffValue === 0 && Wn(s, e), s.diffValue = 0;
  }
  for (; i--; ) {
    var c = r[i];
    c.diffValue === 1 && (c.diffValue = 0, ca(c, e));
  }
  n !== m.UP_TO_DATE_ && (e.dependenciesState_ = n, e.onBecomeStale_());
}
function gr(e) {
  var t = e.observing_;
  e.observing_ = [];
  for (var r = t.length; r--; )
    Wn(t[r], e);
  e.dependenciesState_ = m.NOT_TRACKING_;
}
function Hn(e) {
  var t = De();
  try {
    return e();
  } finally {
    ne(t);
  }
}
function De() {
  var e = h.trackingDerivation;
  return h.trackingDerivation = null, e;
}
function ne(e) {
  h.trackingDerivation = e;
}
function xr(e) {
  var t = h.allowStateReads;
  return h.allowStateReads = e, t;
}
function Qe(e) {
  h.allowStateReads = e;
}
function qn(e) {
  if (e.dependenciesState_ !== m.UP_TO_DATE_) {
    e.dependenciesState_ = m.UP_TO_DATE_;
    for (var t = e.observing_, r = t.length; r--; )
      t[r].lowestObserverState_ = m.UP_TO_DATE_;
  }
}
var rr = function() {
  this.version = 6, this.UNCHANGED = {}, this.trackingDerivation = null, this.trackingContext = null, this.runId = 0, this.mobxGuid = 0, this.inBatch = 0, this.pendingUnobservations = [], this.pendingReactions = [], this.isRunningReactions = !1, this.allowStateChanges = !1, this.allowStateReads = !0, this.enforceActions = !0, this.spyListeners = [], this.globalReactionErrorHandlers = [], this.computedRequiresReaction = !1, this.reactionRequiresObservable = !1, this.observableRequiresReaction = !1, this.disableErrorBoundaries = !1, this.suppressReactionErrors = !1, this.useProxies = !0, this.verifyProxies = !1, this.safeDescriptors = !0;
}, nr = !0, h = /* @__PURE__ */ function() {
  var e = /* @__PURE__ */ Nn();
  return e.__mobxInstanceCount > 0 && !e.__mobxGlobals && (nr = !1), e.__mobxGlobals && e.__mobxGlobals.version !== new rr().version && (nr = !1), nr ? e.__mobxGlobals ? (e.__mobxInstanceCount += 1, e.__mobxGlobals.UNCHANGED || (e.__mobxGlobals.UNCHANGED = {}), e.__mobxGlobals) : (e.__mobxInstanceCount = 1, e.__mobxGlobals = /* @__PURE__ */ new rr()) : (setTimeout(function() {
    f(35);
  }, 1), new rr());
}();
function ca(e, t) {
  e.observers_.add(t), e.lowestObserverState_ > t.dependenciesState_ && (e.lowestObserverState_ = t.dependenciesState_);
}
function Wn(e, t) {
  e.observers_.delete(t), e.observers_.size === 0 && Gn(e);
}
function Gn(e) {
  e.isPendingUnobservation === !1 && (e.isPendingUnobservation = !0, h.pendingUnobservations.push(e));
}
function L() {
  h.inBatch++;
}
function I() {
  if (--h.inBatch === 0) {
    Qn();
    for (var e = h.pendingUnobservations, t = 0; t < e.length; t++) {
      var r = e[t];
      r.isPendingUnobservation = !1, r.observers_.size === 0 && (r.isBeingObserved && (r.isBeingObserved = !1, r.onBUO()), r instanceof z && r.suspend_());
    }
    h.pendingUnobservations = [];
  }
}
function Xn(e) {
  aa(e);
  var t = h.trackingDerivation;
  return t !== null ? (t.runId_ !== e.lastAccessedBy_ && (e.lastAccessedBy_ = t.runId_, t.newObserving_[t.unboundDepsCount_++] = e, !e.isBeingObserved && h.trackingContext && (e.isBeingObserved = !0, e.onBO())), e.isBeingObserved) : (e.observers_.size === 0 && h.inBatch > 0 && Gn(e), !1);
}
function Jn(e) {
  e.lowestObserverState_ !== m.STALE_ && (e.lowestObserverState_ = m.STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === m.UP_TO_DATE_ && (process.env.NODE_ENV !== "production" && t.isTracing_ !== U.NONE && Zn(t, e), t.onBecomeStale_()), t.dependenciesState_ = m.STALE_;
  }));
}
function ua(e) {
  e.lowestObserverState_ !== m.STALE_ && (e.lowestObserverState_ = m.STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === m.POSSIBLY_STALE_ ? (t.dependenciesState_ = m.STALE_, process.env.NODE_ENV !== "production" && t.isTracing_ !== U.NONE && Zn(t, e)) : t.dependenciesState_ === m.UP_TO_DATE_ && (e.lowestObserverState_ = m.UP_TO_DATE_);
  }));
}
function da(e) {
  e.lowestObserverState_ === m.UP_TO_DATE_ && (e.lowestObserverState_ = m.POSSIBLY_STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === m.UP_TO_DATE_ && (t.dependenciesState_ = m.POSSIBLY_STALE_, t.onBecomeStale_());
  }));
}
function Zn(e, t) {
  if (console.log("[mobx.trace] '" + e.name_ + "' is invalidated due to a change in: '" + t.name_ + "'"), e.isTracing_ === U.BREAK) {
    var r = [];
    Yn(Sa(e), r, 1), new Function(`debugger;
/*
Tracing '` + e.name_ + `'

You are entering this break point because derivation '` + e.name_ + "' is being traced and '" + t.name_ + `' is now forcing it to update.
Just follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update
The stackframe you are looking for is at least ~6-8 stack-frames up.

` + (e instanceof z ? e.derivation.toString().replace(/[*]\//g, "/") : "") + `

The dependencies for this derivation are:

` + r.join(`
`) + `
*/
    `)();
  }
}
function Yn(e, t, r) {
  if (t.length >= 1e3) {
    t.push("(and many more)");
    return;
  }
  t.push("" + "	".repeat(r - 1) + e.name), e.dependencies && e.dependencies.forEach(function(n) {
    return Yn(n, t, r + 1);
  });
}
var Y = /* @__PURE__ */ function() {
  function e(r, n, i, o) {
    r === void 0 && (r = process.env.NODE_ENV !== "production" ? "Reaction@" + B() : "Reaction"), this.name_ = void 0, this.onInvalidate_ = void 0, this.errorHandler_ = void 0, this.requiresObservable_ = void 0, this.observing_ = [], this.newObserving_ = [], this.dependenciesState_ = m.NOT_TRACKING_, this.runId_ = 0, this.unboundDepsCount_ = 0, this.flags_ = 0, this.isTracing_ = U.NONE, this.name_ = r, this.onInvalidate_ = n, this.errorHandler_ = i, this.requiresObservable_ = o;
  }
  var t = e.prototype;
  return t.onBecomeStale_ = function() {
    this.schedule_();
  }, t.schedule_ = function() {
    this.isScheduled || (this.isScheduled = !0, h.pendingReactions.push(this), Qn());
  }, t.runReaction_ = function() {
    if (!this.isDisposed) {
      L(), this.isScheduled = !1;
      var n = h.trackingContext;
      if (h.trackingContext = this, pr(this)) {
        this.isTrackPending = !0;
        try {
          this.onInvalidate_(), process.env.NODE_ENV !== "production" && this.isTrackPending && D() && Ae({
            name: this.name_,
            type: "scheduled-reaction"
          });
        } catch (i) {
          this.reportExceptionInDerivation_(i);
        }
      }
      h.trackingContext = n, I();
    }
  }, t.track = function(n) {
    if (!this.isDisposed) {
      L();
      var i = D(), o;
      process.env.NODE_ENV !== "production" && i && (o = Date.now(), T({
        name: this.name_,
        type: "reaction"
      })), this.isRunning = !0;
      var a = h.trackingContext;
      h.trackingContext = this;
      var l = Fn(this, n, void 0);
      h.trackingContext = a, this.isRunning = !1, this.isTrackPending = !1, this.isDisposed && gr(this), St(l) && this.reportExceptionInDerivation_(l.cause), process.env.NODE_ENV !== "production" && i && k({
        time: Date.now() - o
      }), I();
    }
  }, t.reportExceptionInDerivation_ = function(n) {
    var i = this;
    if (this.errorHandler_) {
      this.errorHandler_(n, this);
      return;
    }
    if (h.disableErrorBoundaries)
      throw n;
    var o = process.env.NODE_ENV !== "production" ? "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" : "[mobx] uncaught error in '" + this + "'";
    h.suppressReactionErrors ? process.env.NODE_ENV !== "production" && console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)") : console.error(o, n), process.env.NODE_ENV !== "production" && D() && Ae({
      type: "error",
      name: this.name_,
      message: o,
      error: "" + n
    }), h.globalReactionErrorHandlers.forEach(function(a) {
      return a(n, i);
    });
  }, t.dispose = function() {
    this.isDisposed || (this.isDisposed = !0, this.isRunning || (L(), gr(this), I()));
  }, t.getDisposer_ = function(n) {
    var i = this, o = function a() {
      i.dispose(), n == null || n.removeEventListener == null || n.removeEventListener("abort", a);
    };
    return n == null || n.addEventListener == null || n.addEventListener("abort", o), o[p] = this, o;
  }, t.toString = function() {
    return "Reaction[" + this.name_ + "]";
  }, t.trace = function(n) {
    n === void 0 && (n = !1), $a(this, n);
  }, ze(e, [{
    key: "isDisposed",
    get: function() {
      return C(this.flags_, e.isDisposedMask_);
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.isDisposedMask_, n);
    }
  }, {
    key: "isScheduled",
    get: function() {
      return C(this.flags_, e.isScheduledMask_);
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.isScheduledMask_, n);
    }
  }, {
    key: "isTrackPending",
    get: function() {
      return C(this.flags_, e.isTrackPendingMask_);
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.isTrackPendingMask_, n);
    }
  }, {
    key: "isRunning",
    get: function() {
      return C(this.flags_, e.isRunningMask_);
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.isRunningMask_, n);
    }
  }, {
    key: "diffValue",
    get: function() {
      return C(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(n) {
      this.flags_ = V(this.flags_, e.diffValueMask_, n === 1);
    }
  }]);
}();
Y.isDisposedMask_ = 1;
Y.isScheduledMask_ = 2;
Y.isTrackPendingMask_ = 4;
Y.isRunningMask_ = 8;
Y.diffValueMask_ = 16;
var Wr = 100, ha = function(t) {
  return t();
};
function Qn() {
  h.inBatch > 0 || h.isRunningReactions || ha(fa);
}
function fa() {
  h.isRunningReactions = !0;
  for (var e = h.pendingReactions, t = 0; e.length > 0; ) {
    ++t === Wr && (console.error(process.env.NODE_ENV !== "production" ? "Reaction doesn't converge to a stable state after " + Wr + " iterations." + (" Probably there is a cycle in the reactive function: " + e[0]) : "[mobx] cycle in reaction: " + e[0]), e.splice(0));
    for (var r = e.splice(0), n = 0, i = r.length; n < i; n++)
      r[n].runReaction_();
  }
  h.isRunningReactions = !1;
}
var kt = /* @__PURE__ */ xe("Reaction", Y);
function D() {
  return process.env.NODE_ENV !== "production" && !!h.spyListeners.length;
}
function Ae(e) {
  if (process.env.NODE_ENV !== "production" && h.spyListeners.length)
    for (var t = h.spyListeners, r = 0, n = t.length; r < n; r++)
      t[r](e);
}
function T(e) {
  if (process.env.NODE_ENV !== "production") {
    var t = le({}, e, {
      spyReportStart: !0
    });
    Ae(t);
  }
}
var va = {
  type: "report-end",
  spyReportEnd: !0
};
function k(e) {
  process.env.NODE_ENV !== "production" && Ae(e ? le({}, e, {
    type: "report-end",
    spyReportEnd: !0
  }) : va);
}
function pa(e) {
  return process.env.NODE_ENV === "production" ? (console.warn("[mobx.spy] Is a no-op in production builds"), function() {
  }) : (h.spyListeners.push(e), Ar(function() {
    h.spyListeners = h.spyListeners.filter(function(t) {
      return t !== e;
    });
  }));
}
var Dr = "action", ga = "action.bound", ei = "autoAction", ba = "autoAction.bound", ti = "<unnamed action>", br = /* @__PURE__ */ ht(Dr), _a = /* @__PURE__ */ ht(ga, {
  bound: !0
}), _r = /* @__PURE__ */ ht(ei, {
  autoAction: !0
}), ma = /* @__PURE__ */ ht(ba, {
  autoAction: !0,
  bound: !0
});
function ri(e) {
  var t = function(n, i) {
    if (O(n))
      return Ee(n.name || ti, n, e);
    if (O(i))
      return Ee(n, i, e);
    if (dt(i))
      return (e ? _r : br).decorate_20223_(n, i);
    if (we(i))
      return Be(n, i, e ? _r : br);
    if (we(n))
      return Z(ht(e ? ei : Dr, {
        name: n,
        autoAction: e
      }));
    process.env.NODE_ENV !== "production" && f("Invalid arguments for `action`");
  };
  return t;
}
var be = /* @__PURE__ */ ri(!1);
Object.assign(be, br);
var nt = /* @__PURE__ */ ri(!0);
Object.assign(nt, _r);
be.bound = /* @__PURE__ */ Z(_a);
nt.bound = /* @__PURE__ */ Z(ma);
function El(e) {
  return Kn(e.name || ti, !1, e, this, void 0);
}
function ft(e) {
  return O(e) && e.isMobxAction === !0;
}
function ni(e, t) {
  var r, n, i, o;
  t === void 0 && (t = Er), process.env.NODE_ENV !== "production" && (O(e) || f("Autorun expects a function as first argument"), ft(e) && f("Autorun does not accept actions since actions are untrackable"));
  var a = (r = (n = t) == null ? void 0 : n.name) != null ? r : process.env.NODE_ENV !== "production" ? e.name || "Autorun@" + B() : "Autorun", l = !t.scheduler && !t.delay, s;
  if (l)
    s = new Y(a, function() {
      this.track(d);
    }, t.onError, t.requiresObservable);
  else {
    var c = ii(t), u = !1;
    s = new Y(a, function() {
      u || (u = !0, c(function() {
        u = !1, s.isDisposed || s.track(d);
      }));
    }, t.onError, t.requiresObservable);
  }
  function d() {
    e(s);
  }
  return (i = t) != null && (i = i.signal) != null && i.aborted || s.schedule_(), s.getDisposer_((o = t) == null ? void 0 : o.signal);
}
var ya = function(t) {
  return t();
};
function ii(e) {
  return e.scheduler ? e.scheduler : e.delay ? function(t) {
    return setTimeout(t, e.delay);
  } : ya;
}
function oi(e, t, r) {
  var n, i, o;
  r === void 0 && (r = Er), process.env.NODE_ENV !== "production" && ((!O(e) || !O(t)) && f("First and second argument to reaction should be functions"), P(r) || f("Third argument of reactions should be an object"));
  var a = (n = r.name) != null ? n : process.env.NODE_ENV !== "production" ? "Reaction@" + B() : "Reaction", l = be(a, r.onError ? wa(r.onError, t) : t), s = !r.scheduler && !r.delay, c = ii(r), u = !0, d = !1, v, g = r.compareStructural ? Re.structural : r.equals || Re.default, _ = new Y(a, function() {
    u || s ? w() : d || (d = !0, c(w));
  }, r.onError, r.requiresObservable);
  function w() {
    if (d = !1, !_.isDisposed) {
      var S = !1, G = v;
      _.track(function() {
        var $e = ia(!1, function() {
          return e(_);
        });
        S = u || !g(v, $e), v = $e;
      }), (u && r.fireImmediately || !u && S) && l(v, G, _), u = !1;
    }
  }
  return (i = r) != null && (i = i.signal) != null && i.aborted || _.schedule_(), _.getDisposer_((o = r) == null ? void 0 : o.signal);
}
function wa(e, t) {
  return function() {
    try {
      return t.apply(this, arguments);
    } catch (r) {
      e.call(this, r);
    }
  };
}
var Oa = "onBO", Ea = "onBUO";
function Aa(e, t, r) {
  return si(Oa, e, t, r);
}
function ai(e, t, r) {
  return si(Ea, e, t, r);
}
function si(e, t, r, n) {
  var i = Me(t), o = O(n) ? n : r, a = e + "L";
  return i[a] ? i[a].add(o) : i[a] = /* @__PURE__ */ new Set([o]), function() {
    var l = i[a];
    l && (l.delete(o), l.size === 0 && delete i[a]);
  };
}
function li(e, t, r, n) {
  process.env.NODE_ENV !== "production" && (arguments.length > 4 && f("'extendObservable' expected 2-4 arguments"), typeof e != "object" && f("'extendObservable' expects an object as first argument"), de(e) && f("'extendObservable' should not be used on maps, use map.merge instead"), P(t) || f("'extendObservable' only accepts plain objects as second argument"), (ot(t) || ot(r)) && f("Extending an object with another observable (object) is not supported"));
  var i = so(t);
  return Pe(function() {
    var o = Fe(e, n)[p];
    rt(i).forEach(function(a) {
      o.extend_(
        a,
        i[a],
        // must pass "undefined" for { key: undefined }
        r && a in r ? r[a] : !0
      );
    });
  }), e;
}
function Sa(e, t) {
  return ci(Me(e, t));
}
function ci(e) {
  var t = {
    name: e.name_
  };
  return e.observing_ && e.observing_.length > 0 && (t.dependencies = Na(e.observing_).map(ci)), t;
}
function Na(e) {
  return Array.from(new Set(e));
}
var xa = 0;
function ui() {
  this.message = "FLOW_CANCELLED";
}
ui.prototype = /* @__PURE__ */ Object.create(Error.prototype);
var ir = /* @__PURE__ */ jn("flow"), Da = /* @__PURE__ */ jn("flow.bound", {
  bound: !0
}), je = /* @__PURE__ */ Object.assign(function(t, r) {
  if (dt(r))
    return ir.decorate_20223_(t, r);
  if (we(r))
    return Be(t, r, ir);
  process.env.NODE_ENV !== "production" && arguments.length !== 1 && f("Flow expects single argument with generator function");
  var n = t, i = n.name || "<unnamed flow>", o = function() {
    var l = this, s = arguments, c = ++xa, u = be(i + " - runid: " + c + " - init", n).apply(l, s), d, v = void 0, g = new Promise(function(_, w) {
      var S = 0;
      d = w;
      function G($) {
        v = void 0;
        var ie;
        try {
          ie = be(i + " - runid: " + c + " - yield " + S++, u.next).call(u, $);
        } catch (he) {
          return w(he);
        }
        qe(ie);
      }
      function $e($) {
        v = void 0;
        var ie;
        try {
          ie = be(i + " - runid: " + c + " - yield " + S++, u.throw).call(u, $);
        } catch (he) {
          return w(he);
        }
        qe(ie);
      }
      function qe($) {
        if (O($?.then)) {
          $.then(qe, w);
          return;
        }
        return $.done ? _($.value) : (v = Promise.resolve($.value), v.then(G, $e));
      }
      G(void 0);
    });
    return g.cancel = be(i + " - runid: " + c + " - cancel", function() {
      try {
        v && Gr(v);
        var _ = u.return(void 0), w = Promise.resolve(_.value);
        w.then(Te, Te), Gr(w), d(new ui());
      } catch (S) {
        d(S);
      }
    }), g;
  };
  return o.isMobXFlow = !0, o;
}, ir);
je.bound = /* @__PURE__ */ Z(Da);
function Gr(e) {
  O(e.cancel) && e.cancel();
}
function it(e) {
  return e?.isMobXFlow === !0;
}
function Pa(e, t) {
  return e ? He(e) || !!e[p] || Sr(e) || kt(e) || Jt(e) : !1;
}
function ot(e) {
  return process.env.NODE_ENV !== "production" && arguments.length !== 1 && f("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property"), Pa(e);
}
function $a() {
  if (process.env.NODE_ENV !== "production") {
    for (var e = !1, t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    typeof r[r.length - 1] == "boolean" && (e = r.pop());
    var i = Ca(r);
    if (!i)
      return f("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    i.isTracing_ === U.NONE && console.log("[mobx.trace] '" + i.name_ + "' tracing enabled"), i.isTracing_ = e ? U.BREAK : U.LOG;
  }
}
function Ca(e) {
  switch (e.length) {
    case 0:
      return h.trackingDerivation;
    case 1:
      return Me(e[0]);
    case 2:
      return Me(e[0], e[1]);
  }
}
function te(e, t) {
  t === void 0 && (t = void 0), L();
  try {
    return e.apply(t);
  } finally {
    I();
  }
}
function fe(e) {
  return e[p];
}
var Va = {
  has: function(t, r) {
    return process.env.NODE_ENV !== "production" && h.trackingDerivation && We("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead."), fe(t).has_(r);
  },
  get: function(t, r) {
    return fe(t).get_(r);
  },
  set: function(t, r, n) {
    var i;
    return we(r) ? (process.env.NODE_ENV !== "production" && !fe(t).values_.has(r) && We("add a new observable property through direct assignment. Use 'set' from 'mobx' instead."), (i = fe(t).set_(r, n, !0)) != null ? i : !0) : !1;
  },
  deleteProperty: function(t, r) {
    var n;
    return process.env.NODE_ENV !== "production" && We("delete properties from an observable object. Use 'remove' from 'mobx' instead."), we(r) ? (n = fe(t).delete_(r, !0)) != null ? n : !0 : !1;
  },
  defineProperty: function(t, r, n) {
    var i;
    return process.env.NODE_ENV !== "production" && We("define property on an observable object. Use 'defineProperty' from 'mobx' instead."), (i = fe(t).defineProperty_(r, n)) != null ? i : !0;
  },
  ownKeys: function(t) {
    return process.env.NODE_ENV !== "production" && h.trackingDerivation && We("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead."), fe(t).ownKeys_();
  },
  preventExtensions: function(t) {
    f(13);
  }
};
function Ta(e, t) {
  var r, n;
  return Dn(), e = Fe(e, t), (n = (r = e[p]).proxy_) != null ? n : r.proxy_ = new Proxy(e, Va);
}
function j(e) {
  return e.interceptors_ !== void 0 && e.interceptors_.length > 0;
}
function vt(e, t) {
  var r = e.interceptors_ || (e.interceptors_ = []);
  return r.push(t), Ar(function() {
    var n = r.indexOf(t);
    n !== -1 && r.splice(n, 1);
  });
}
function M(e, t) {
  var r = De();
  try {
    for (var n = [].concat(e.interceptors_ || []), i = 0, o = n.length; i < o && (t = n[i](t), t && !t.type && f(14), !!t); i++)
      ;
    return t;
  } finally {
    ne(r);
  }
}
function H(e) {
  return e.changeListeners_ !== void 0 && e.changeListeners_.length > 0;
}
function pt(e, t) {
  var r = e.changeListeners_ || (e.changeListeners_ = []);
  return r.push(t), Ar(function() {
    var n = r.indexOf(t);
    n !== -1 && r.splice(n, 1);
  });
}
function q(e, t) {
  var r = De(), n = e.changeListeners_;
  if (n) {
    n = n.slice();
    for (var i = 0, o = n.length; i < o; i++)
      n[i](t);
    ne(r);
  }
}
var or = /* @__PURE__ */ Symbol("mobx-keys");
function Zt(e, t, r) {
  return process.env.NODE_ENV !== "production" && (!P(e) && !P(Object.getPrototypeOf(e)) && f("'makeAutoObservable' can only be used for classes that don't have a superclass"), He(e) && f("makeAutoObservable can only be used on objects not already made observable")), P(e) ? li(e, e, t, r) : (Pe(function() {
    var n = Fe(e, r)[p];
    if (!e[or]) {
      var i = Object.getPrototypeOf(e), o = new Set([].concat(rt(e), rt(i)));
      o.delete("constructor"), o.delete(p), Kt(i, or, o);
    }
    e[or].forEach(function(a) {
      return n.make_(
        a,
        // must pass "undefined" for { key: undefined }
        t && a in t ? t[a] : !0
      );
    });
  }), e);
}
var Xr = "splice", K = "update", ka = 1e4, Ra = {
  get: function(t, r) {
    var n = t[p];
    return r === p ? n : r === "length" ? n.getArrayLength_() : typeof r == "string" && !isNaN(r) ? n.get_(parseInt(r)) : F(Rt, r) ? Rt[r] : t[r];
  },
  set: function(t, r, n) {
    var i = t[p];
    return r === "length" && i.setArrayLength_(n), typeof r == "symbol" || isNaN(r) ? t[r] = n : i.set_(parseInt(r), n), !0;
  },
  preventExtensions: function() {
    f(15);
  }
}, Pr = /* @__PURE__ */ function() {
  function e(r, n, i, o) {
    r === void 0 && (r = process.env.NODE_ENV !== "production" ? "ObservableArray@" + B() : "ObservableArray"), this.owned_ = void 0, this.legacyMode_ = void 0, this.atom_ = void 0, this.values_ = [], this.interceptors_ = void 0, this.changeListeners_ = void 0, this.enhancer_ = void 0, this.dehancer = void 0, this.proxy_ = void 0, this.lastKnownLength_ = 0, this.owned_ = i, this.legacyMode_ = o, this.atom_ = new ue(r), this.enhancer_ = function(a, l) {
      return n(a, l, process.env.NODE_ENV !== "production" ? r + "[..]" : "ObservableArray[..]");
    };
  }
  var t = e.prototype;
  return t.dehanceValue_ = function(n) {
    return this.dehancer !== void 0 ? this.dehancer(n) : n;
  }, t.dehanceValues_ = function(n) {
    return this.dehancer !== void 0 && n.length > 0 ? n.map(this.dehancer) : n;
  }, t.intercept_ = function(n) {
    return vt(this, n);
  }, t.observe_ = function(n, i) {
    return i === void 0 && (i = !1), i && n({
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: "splice",
      index: 0,
      added: this.values_.slice(),
      addedCount: this.values_.length,
      removed: [],
      removedCount: 0
    }), pt(this, n);
  }, t.getArrayLength_ = function() {
    return this.atom_.reportObserved(), this.values_.length;
  }, t.setArrayLength_ = function(n) {
    (typeof n != "number" || isNaN(n) || n < 0) && f("Out of range: " + n);
    var i = this.values_.length;
    if (n !== i)
      if (n > i) {
        for (var o = new Array(n - i), a = 0; a < n - i; a++)
          o[a] = void 0;
        this.spliceWithArray_(i, 0, o);
      } else
        this.spliceWithArray_(n, i - n);
  }, t.updateArrayLength_ = function(n, i) {
    n !== this.lastKnownLength_ && f(16), this.lastKnownLength_ += i, this.legacyMode_ && i > 0 && gi(n + i + 1);
  }, t.spliceWithArray_ = function(n, i, o) {
    var a = this;
    X(this.atom_);
    var l = this.values_.length;
    if (n === void 0 ? n = 0 : n > l ? n = l : n < 0 && (n = Math.max(0, l + n)), arguments.length === 1 ? i = l - n : i == null ? i = 0 : i = Math.max(0, Math.min(i, l - n)), o === void 0 && (o = $t), j(this)) {
      var s = M(this, {
        object: this.proxy_,
        type: Xr,
        index: n,
        removedCount: i,
        added: o
      });
      if (!s)
        return $t;
      i = s.removedCount, o = s.added;
    }
    if (o = o.length === 0 ? o : o.map(function(d) {
      return a.enhancer_(d, void 0);
    }), this.legacyMode_ || process.env.NODE_ENV !== "production") {
      var c = o.length - i;
      this.updateArrayLength_(l, c);
    }
    var u = this.spliceItemsIntoValues_(n, i, o);
    return (i !== 0 || o.length !== 0) && this.notifyArraySplice_(n, o, u), this.dehanceValues_(u);
  }, t.spliceItemsIntoValues_ = function(n, i, o) {
    if (o.length < ka) {
      var a;
      return (a = this.values_).splice.apply(a, [n, i].concat(o));
    } else {
      var l = this.values_.slice(n, n + i), s = this.values_.slice(n + i);
      this.values_.length += o.length - i;
      for (var c = 0; c < o.length; c++)
        this.values_[n + c] = o[c];
      for (var u = 0; u < s.length; u++)
        this.values_[n + o.length + u] = s[u];
      return l;
    }
  }, t.notifyArrayChildUpdate_ = function(n, i, o) {
    var a = !this.owned_ && D(), l = H(this), s = l || a ? {
      observableKind: "array",
      object: this.proxy_,
      type: K,
      debugObjectName: this.atom_.name_,
      index: n,
      newValue: i,
      oldValue: o
    } : null;
    process.env.NODE_ENV !== "production" && a && T(s), this.atom_.reportChanged(), l && q(this, s), process.env.NODE_ENV !== "production" && a && k();
  }, t.notifyArraySplice_ = function(n, i, o) {
    var a = !this.owned_ && D(), l = H(this), s = l || a ? {
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: Xr,
      index: n,
      removed: o,
      added: i,
      removedCount: o.length,
      addedCount: i.length
    } : null;
    process.env.NODE_ENV !== "production" && a && T(s), this.atom_.reportChanged(), l && q(this, s), process.env.NODE_ENV !== "production" && a && k();
  }, t.get_ = function(n) {
    if (this.legacyMode_ && n >= this.values_.length) {
      console.warn(process.env.NODE_ENV !== "production" ? "[mobx.array] Attempt to read an array index (" + n + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX" : "[mobx] Out of bounds read: " + n);
      return;
    }
    return this.atom_.reportObserved(), this.dehanceValue_(this.values_[n]);
  }, t.set_ = function(n, i) {
    var o = this.values_;
    if (this.legacyMode_ && n > o.length && f(17, n, o.length), n < o.length) {
      X(this.atom_);
      var a = o[n];
      if (j(this)) {
        var l = M(this, {
          type: K,
          object: this.proxy_,
          // since "this" is the real array we need to pass its proxy
          index: n,
          newValue: i
        });
        if (!l)
          return;
        i = l.newValue;
      }
      i = this.enhancer_(i, a);
      var s = i !== a;
      s && (o[n] = i, this.notifyArrayChildUpdate_(n, i, a));
    } else {
      for (var c = new Array(n + 1 - o.length), u = 0; u < c.length - 1; u++)
        c[u] = void 0;
      c[c.length - 1] = i, this.spliceWithArray_(o.length, 0, c);
    }
  }, e;
}();
function ja(e, t, r, n) {
  return r === void 0 && (r = process.env.NODE_ENV !== "production" ? "ObservableArray@" + B() : "ObservableArray"), n === void 0 && (n = !1), Dn(), Pe(function() {
    var i = new Pr(r, t, n, !1);
    $n(i.values_, p, i);
    var o = new Proxy(i.values_, Ra);
    return i.proxy_ = o, e && e.length && i.spliceWithArray_(0, 0, e), o;
  });
}
var Rt = {
  clear: function() {
    return this.splice(0);
  },
  replace: function(t) {
    var r = this[p];
    return r.spliceWithArray_(0, r.values_.length, t);
  },
  // Used by JSON.stringify
  toJSON: function() {
    return this.slice();
  },
  /*
   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
   * since these functions alter the inner structure of the array, the have side effects.
   * Because the have side effects, they should not be used in computed function,
   * and for that reason the do not call dependencyState.notifyObserved
   */
  splice: function(t, r) {
    for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++)
      i[o - 2] = arguments[o];
    var a = this[p];
    switch (arguments.length) {
      case 0:
        return [];
      case 1:
        return a.spliceWithArray_(t);
      case 2:
        return a.spliceWithArray_(t, r);
    }
    return a.spliceWithArray_(t, r, i);
  },
  spliceWithArray: function(t, r, n) {
    return this[p].spliceWithArray_(t, r, n);
  },
  push: function() {
    for (var t = this[p], r = arguments.length, n = new Array(r), i = 0; i < r; i++)
      n[i] = arguments[i];
    return t.spliceWithArray_(t.values_.length, 0, n), t.values_.length;
  },
  pop: function() {
    return this.splice(Math.max(this[p].values_.length - 1, 0), 1)[0];
  },
  shift: function() {
    return this.splice(0, 1)[0];
  },
  unshift: function() {
    for (var t = this[p], r = arguments.length, n = new Array(r), i = 0; i < r; i++)
      n[i] = arguments[i];
    return t.spliceWithArray_(0, 0, n), t.values_.length;
  },
  reverse: function() {
    return h.trackingDerivation && f(37, "reverse"), this.replace(this.slice().reverse()), this;
  },
  sort: function() {
    h.trackingDerivation && f(37, "sort");
    var t = this.slice();
    return t.sort.apply(t, arguments), this.replace(t), this;
  },
  remove: function(t) {
    var r = this[p], n = r.dehanceValues_(r.values_).indexOf(t);
    return n > -1 ? (this.splice(n, 1), !0) : !1;
  }
};
y("at", R);
y("concat", R);
y("flat", R);
y("includes", R);
y("indexOf", R);
y("join", R);
y("lastIndexOf", R);
y("slice", R);
y("toString", R);
y("toLocaleString", R);
y("toSorted", R);
y("toSpliced", R);
y("with", R);
y("every", W);
y("filter", W);
y("find", W);
y("findIndex", W);
y("findLast", W);
y("findLastIndex", W);
y("flatMap", W);
y("forEach", W);
y("map", W);
y("some", W);
y("toReversed", W);
y("reduce", di);
y("reduceRight", di);
function y(e, t) {
  typeof Array.prototype[e] == "function" && (Rt[e] = t(e));
}
function R(e) {
  return function() {
    var t = this[p];
    t.atom_.reportObserved();
    var r = t.dehanceValues_(t.values_);
    return r[e].apply(r, arguments);
  };
}
function W(e) {
  return function(t, r) {
    var n = this, i = this[p];
    i.atom_.reportObserved();
    var o = i.dehanceValues_(i.values_);
    return o[e](function(a, l) {
      return t.call(r, a, l, n);
    });
  };
}
function di(e) {
  return function() {
    var t = this, r = this[p];
    r.atom_.reportObserved();
    var n = r.dehanceValues_(r.values_), i = arguments[0];
    return arguments[0] = function(o, a, l) {
      return i(o, a, l, t);
    }, n[e].apply(n, arguments);
  };
}
var Ma = /* @__PURE__ */ xe("ObservableArrayAdministration", Pr);
function Yt(e) {
  return Bt(e) && Ma(e[p]);
}
var La = {}, se = "add", jt = "delete", hi = /* @__PURE__ */ function() {
  function e(r, n, i) {
    var o = this;
    n === void 0 && (n = Oe), i === void 0 && (i = process.env.NODE_ENV !== "production" ? "ObservableMap@" + B() : "ObservableMap"), this.enhancer_ = void 0, this.name_ = void 0, this[p] = La, this.data_ = void 0, this.hasMap_ = void 0, this.keysAtom_ = void 0, this.interceptors_ = void 0, this.changeListeners_ = void 0, this.dehancer = void 0, this.enhancer_ = n, this.name_ = i, O(Map) || f(18), Pe(function() {
      o.keysAtom_ = kn(process.env.NODE_ENV !== "production" ? o.name_ + ".keys()" : "ObservableMap.keys()"), o.data_ = /* @__PURE__ */ new Map(), o.hasMap_ = /* @__PURE__ */ new Map(), r && o.merge(r);
    });
  }
  var t = e.prototype;
  return t.has_ = function(n) {
    return this.data_.has(n);
  }, t.has = function(n) {
    var i = this;
    if (!h.trackingDerivation)
      return this.has_(n);
    var o = this.hasMap_.get(n);
    if (!o) {
      var a = o = new me(this.has_(n), Ht, process.env.NODE_ENV !== "production" ? this.name_ + "." + dr(n) + "?" : "ObservableMap.key?", !1);
      this.hasMap_.set(n, a), ai(a, function() {
        return i.hasMap_.delete(n);
      });
    }
    return o.get();
  }, t.set = function(n, i) {
    var o = this.has_(n);
    if (j(this)) {
      var a = M(this, {
        type: o ? K : se,
        object: this,
        newValue: i,
        name: n
      });
      if (!a)
        return this;
      i = a.newValue;
    }
    return o ? this.updateValue_(n, i) : this.addValue_(n, i), this;
  }, t.delete = function(n) {
    var i = this;
    if (X(this.keysAtom_), j(this)) {
      var o = M(this, {
        type: jt,
        object: this,
        name: n
      });
      if (!o)
        return !1;
    }
    if (this.has_(n)) {
      var a = D(), l = H(this), s = l || a ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: jt,
        object: this,
        oldValue: this.data_.get(n).value_,
        name: n
      } : null;
      return process.env.NODE_ENV !== "production" && a && T(s), te(function() {
        var c;
        i.keysAtom_.reportChanged(), (c = i.hasMap_.get(n)) == null || c.setNewValue_(!1);
        var u = i.data_.get(n);
        u.setNewValue_(void 0), i.data_.delete(n);
      }), l && q(this, s), process.env.NODE_ENV !== "production" && a && k(), !0;
    }
    return !1;
  }, t.updateValue_ = function(n, i) {
    var o = this.data_.get(n);
    if (i = o.prepareNewValue_(i), i !== h.UNCHANGED) {
      var a = D(), l = H(this), s = l || a ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: K,
        object: this,
        oldValue: o.value_,
        name: n,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && a && T(s), o.setNewValue_(i), l && q(this, s), process.env.NODE_ENV !== "production" && a && k();
    }
  }, t.addValue_ = function(n, i) {
    var o = this;
    X(this.keysAtom_), te(function() {
      var c, u = new me(i, o.enhancer_, process.env.NODE_ENV !== "production" ? o.name_ + "." + dr(n) : "ObservableMap.key", !1);
      o.data_.set(n, u), i = u.value_, (c = o.hasMap_.get(n)) == null || c.setNewValue_(!0), o.keysAtom_.reportChanged();
    });
    var a = D(), l = H(this), s = l || a ? {
      observableKind: "map",
      debugObjectName: this.name_,
      type: se,
      object: this,
      name: n,
      newValue: i
    } : null;
    process.env.NODE_ENV !== "production" && a && T(s), l && q(this, s), process.env.NODE_ENV !== "production" && a && k();
  }, t.get = function(n) {
    return this.has(n) ? this.dehanceValue_(this.data_.get(n).get()) : this.dehanceValue_(void 0);
  }, t.dehanceValue_ = function(n) {
    return this.dehancer !== void 0 ? this.dehancer(n) : n;
  }, t.keys = function() {
    return this.keysAtom_.reportObserved(), this.data_.keys();
  }, t.values = function() {
    var n = this, i = this.keys();
    return at({
      next: function() {
        var a = i.next(), l = a.done, s = a.value;
        return {
          done: l,
          value: l ? void 0 : n.get(s)
        };
      }
    });
  }, t.entries = function() {
    var n = this, i = this.keys();
    return at({
      next: function() {
        var a = i.next(), l = a.done, s = a.value;
        return {
          done: l,
          value: l ? void 0 : [s, n.get(s)]
        };
      }
    });
  }, t[Symbol.iterator] = function() {
    return this.entries();
  }, t.forEach = function(n, i) {
    for (var o = ke(this), a; !(a = o()).done; ) {
      var l = a.value, s = l[0], c = l[1];
      n.call(i, c, s, this);
    }
  }, t.merge = function(n) {
    var i = this;
    return de(n) && (n = new Map(n)), te(function() {
      P(n) ? ao(n).forEach(function(o) {
        return i.set(o, n[o]);
      }) : Array.isArray(n) ? n.forEach(function(o) {
        var a = o[0], l = o[1];
        return i.set(a, l);
      }) : Ue(n) ? (oo(n) || f(19, n), n.forEach(function(o, a) {
        return i.set(a, o);
      })) : n != null && f(20, n);
    }), this;
  }, t.clear = function() {
    var n = this;
    te(function() {
      Hn(function() {
        for (var i = ke(n.keys()), o; !(o = i()).done; ) {
          var a = o.value;
          n.delete(a);
        }
      });
    });
  }, t.replace = function(n) {
    var i = this;
    return te(function() {
      for (var o = Ia(n), a = /* @__PURE__ */ new Map(), l = !1, s = ke(i.data_.keys()), c; !(c = s()).done; ) {
        var u = c.value;
        if (!o.has(u)) {
          var d = i.delete(u);
          if (d)
            l = !0;
          else {
            var v = i.data_.get(u);
            a.set(u, v);
          }
        }
      }
      for (var g = ke(o.entries()), _; !(_ = g()).done; ) {
        var w = _.value, S = w[0], G = w[1], $e = i.data_.has(S);
        if (i.set(S, G), i.data_.has(S)) {
          var qe = i.data_.get(S);
          a.set(S, qe), $e || (l = !0);
        }
      }
      if (!l)
        if (i.data_.size !== a.size)
          i.keysAtom_.reportChanged();
        else
          for (var $ = i.data_.keys(), ie = a.keys(), he = $.next(), Br = ie.next(); !he.done; ) {
            if (he.value !== Br.value) {
              i.keysAtom_.reportChanged();
              break;
            }
            he = $.next(), Br = ie.next();
          }
      i.data_ = a;
    }), this;
  }, t.toString = function() {
    return "[object ObservableMap]";
  }, t.toJSON = function() {
    return Array.from(this);
  }, t.observe_ = function(n, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && f("`observe` doesn't support fireImmediately=true in combination with maps."), pt(this, n);
  }, t.intercept_ = function(n) {
    return vt(this, n);
  }, ze(e, [{
    key: "size",
    get: function() {
      return this.keysAtom_.reportObserved(), this.data_.size;
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Map";
    }
  }]);
}(), de = /* @__PURE__ */ xe("ObservableMap", hi);
function Ia(e) {
  if (Ue(e) || de(e))
    return e;
  if (Array.isArray(e))
    return new Map(e);
  if (P(e)) {
    var t = /* @__PURE__ */ new Map();
    for (var r in e)
      t.set(r, e[r]);
    return t;
  } else
    return f(21, e);
}
var Ua = {}, fi = /* @__PURE__ */ function() {
  function e(r, n, i) {
    var o = this;
    n === void 0 && (n = Oe), i === void 0 && (i = process.env.NODE_ENV !== "production" ? "ObservableSet@" + B() : "ObservableSet"), this.name_ = void 0, this[p] = Ua, this.data_ = /* @__PURE__ */ new Set(), this.atom_ = void 0, this.changeListeners_ = void 0, this.interceptors_ = void 0, this.dehancer = void 0, this.enhancer_ = void 0, this.name_ = i, O(Set) || f(22), this.enhancer_ = function(a, l) {
      return n(a, l, i);
    }, Pe(function() {
      o.atom_ = kn(o.name_), r && o.replace(r);
    });
  }
  var t = e.prototype;
  return t.dehanceValue_ = function(n) {
    return this.dehancer !== void 0 ? this.dehancer(n) : n;
  }, t.clear = function() {
    var n = this;
    te(function() {
      Hn(function() {
        for (var i = ke(n.data_.values()), o; !(o = i()).done; ) {
          var a = o.value;
          n.delete(a);
        }
      });
    });
  }, t.forEach = function(n, i) {
    for (var o = ke(this), a; !(a = o()).done; ) {
      var l = a.value;
      n.call(i, l, l, this);
    }
  }, t.add = function(n) {
    var i = this;
    if (X(this.atom_), j(this)) {
      var o = M(this, {
        type: se,
        object: this,
        newValue: n
      });
      if (!o)
        return this;
    }
    if (!this.has(n)) {
      te(function() {
        i.data_.add(i.enhancer_(n, void 0)), i.atom_.reportChanged();
      });
      var a = process.env.NODE_ENV !== "production" && D(), l = H(this), s = l || a ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: se,
        object: this,
        newValue: n
      } : null;
      a && process.env.NODE_ENV !== "production" && T(s), l && q(this, s), a && process.env.NODE_ENV !== "production" && k();
    }
    return this;
  }, t.delete = function(n) {
    var i = this;
    if (j(this)) {
      var o = M(this, {
        type: jt,
        object: this,
        oldValue: n
      });
      if (!o)
        return !1;
    }
    if (this.has(n)) {
      var a = process.env.NODE_ENV !== "production" && D(), l = H(this), s = l || a ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: jt,
        object: this,
        oldValue: n
      } : null;
      return a && process.env.NODE_ENV !== "production" && T(s), te(function() {
        i.atom_.reportChanged(), i.data_.delete(n);
      }), l && q(this, s), a && process.env.NODE_ENV !== "production" && k(), !0;
    }
    return !1;
  }, t.has = function(n) {
    return this.atom_.reportObserved(), this.data_.has(this.dehanceValue_(n));
  }, t.entries = function() {
    var n = 0, i = Array.from(this.keys()), o = Array.from(this.values());
    return at({
      next: function() {
        var l = n;
        return n += 1, l < o.length ? {
          value: [i[l], o[l]],
          done: !1
        } : {
          done: !0
        };
      }
    });
  }, t.keys = function() {
    return this.values();
  }, t.values = function() {
    this.atom_.reportObserved();
    var n = this, i = 0, o = Array.from(this.data_.values());
    return at({
      next: function() {
        return i < o.length ? {
          value: n.dehanceValue_(o[i++]),
          done: !1
        } : {
          done: !0
        };
      }
    });
  }, t.intersection = function(n) {
    if (Q(n))
      return n.intersection(this);
    var i = new Set(this);
    return i.intersection(n);
  }, t.union = function(n) {
    if (Q(n))
      return n.union(this);
    var i = new Set(this);
    return i.union(n);
  }, t.difference = function(n) {
    return new Set(this).difference(n);
  }, t.symmetricDifference = function(n) {
    if (Q(n))
      return n.symmetricDifference(this);
    var i = new Set(this);
    return i.symmetricDifference(n);
  }, t.isSubsetOf = function(n) {
    return new Set(this).isSubsetOf(n);
  }, t.isSupersetOf = function(n) {
    return new Set(this).isSupersetOf(n);
  }, t.isDisjointFrom = function(n) {
    if (Q(n))
      return n.isDisjointFrom(this);
    var i = new Set(this);
    return i.isDisjointFrom(n);
  }, t.replace = function(n) {
    var i = this;
    return Ke(n) && (n = new Set(n)), te(function() {
      Array.isArray(n) ? (i.clear(), n.forEach(function(o) {
        return i.add(o);
      })) : Q(n) ? (i.clear(), n.forEach(function(o) {
        return i.add(o);
      })) : n != null && f("Cannot initialize set from " + n);
    }), this;
  }, t.observe_ = function(n, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && f("`observe` doesn't support fireImmediately=true in combination with sets."), pt(this, n);
  }, t.intercept_ = function(n) {
    return vt(this, n);
  }, t.toJSON = function() {
    return Array.from(this);
  }, t.toString = function() {
    return "[object ObservableSet]";
  }, t[Symbol.iterator] = function() {
    return this.values();
  }, ze(e, [{
    key: "size",
    get: function() {
      return this.atom_.reportObserved(), this.data_.size;
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Set";
    }
  }]);
}(), Ke = /* @__PURE__ */ xe("ObservableSet", fi), Jr = /* @__PURE__ */ Object.create(null), Zr = "remove", mr = /* @__PURE__ */ function() {
  function e(r, n, i, o) {
    n === void 0 && (n = /* @__PURE__ */ new Map()), o === void 0 && (o = Lo), this.target_ = void 0, this.values_ = void 0, this.name_ = void 0, this.defaultAnnotation_ = void 0, this.keysAtom_ = void 0, this.changeListeners_ = void 0, this.interceptors_ = void 0, this.proxy_ = void 0, this.isPlainObject_ = void 0, this.appliedAnnotations_ = void 0, this.pendingKeys_ = void 0, this.target_ = r, this.values_ = n, this.name_ = i, this.defaultAnnotation_ = o, this.keysAtom_ = new ue(process.env.NODE_ENV !== "production" ? this.name_ + ".keys" : "ObservableObject.keys"), this.isPlainObject_ = P(this.target_), process.env.NODE_ENV !== "production" && !_i(this.defaultAnnotation_) && f("defaultAnnotation must be valid annotation"), process.env.NODE_ENV !== "production" && (this.appliedAnnotations_ = {});
  }
  var t = e.prototype;
  return t.getObservablePropValue_ = function(n) {
    return this.values_.get(n).get();
  }, t.setObservablePropValue_ = function(n, i) {
    var o = this.values_.get(n);
    if (o instanceof z)
      return o.set(i), !0;
    if (j(this)) {
      var a = M(this, {
        type: K,
        object: this.proxy_ || this.target_,
        name: n,
        newValue: i
      });
      if (!a)
        return null;
      i = a.newValue;
    }
    if (i = o.prepareNewValue_(i), i !== h.UNCHANGED) {
      var l = H(this), s = process.env.NODE_ENV !== "production" && D(), c = l || s ? {
        type: K,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        oldValue: o.value_,
        name: n,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && s && T(c), o.setNewValue_(i), l && q(this, c), process.env.NODE_ENV !== "production" && s && k();
    }
    return !0;
  }, t.get_ = function(n) {
    return h.trackingDerivation && !F(this.target_, n) && this.has_(n), this.target_[n];
  }, t.set_ = function(n, i, o) {
    return o === void 0 && (o = !1), F(this.target_, n) ? this.values_.has(n) ? this.setObservablePropValue_(n, i) : o ? Reflect.set(this.target_, n, i) : (this.target_[n] = i, !0) : this.extend_(n, {
      value: i,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }, this.defaultAnnotation_, o);
  }, t.has_ = function(n) {
    if (!h.trackingDerivation)
      return n in this.target_;
    this.pendingKeys_ || (this.pendingKeys_ = /* @__PURE__ */ new Map());
    var i = this.pendingKeys_.get(n);
    return i || (i = new me(n in this.target_, Ht, process.env.NODE_ENV !== "production" ? this.name_ + "." + dr(n) + "?" : "ObservableObject.key?", !1), this.pendingKeys_.set(n, i)), i.get();
  }, t.make_ = function(n, i) {
    if (i === !0 && (i = this.defaultAnnotation_), i !== !1) {
      if (en(this, i, n), !(n in this.target_)) {
        var o;
        if ((o = this.target_[ee]) != null && o[n])
          return;
        f(1, i.annotationType_, this.name_ + "." + n.toString());
      }
      for (var a = this.target_; a && a !== zt; ) {
        var l = Pt(a, n);
        if (l) {
          var s = i.make_(this, n, l, a);
          if (s === 0)
            return;
          if (s === 1)
            break;
        }
        a = Object.getPrototypeOf(a);
      }
      Qr(this, i, n);
    }
  }, t.extend_ = function(n, i, o, a) {
    if (a === void 0 && (a = !1), o === !0 && (o = this.defaultAnnotation_), o === !1)
      return this.defineProperty_(n, i, a);
    en(this, o, n);
    var l = o.extend_(this, n, i, a);
    return l && Qr(this, o, n), l;
  }, t.defineProperty_ = function(n, i, o) {
    o === void 0 && (o = !1), X(this.keysAtom_);
    try {
      L();
      var a = this.delete_(n);
      if (!a)
        return a;
      if (j(this)) {
        var l = M(this, {
          object: this.proxy_ || this.target_,
          name: n,
          type: se,
          newValue: i.value
        });
        if (!l)
          return null;
        var s = l.newValue;
        i.value !== s && (i = le({}, i, {
          value: s
        }));
      }
      if (o) {
        if (!Reflect.defineProperty(this.target_, n, i))
          return !1;
      } else
        J(this.target_, n, i);
      this.notifyPropertyAddition_(n, i.value);
    } finally {
      I();
    }
    return !0;
  }, t.defineObservableProperty_ = function(n, i, o, a) {
    a === void 0 && (a = !1), X(this.keysAtom_);
    try {
      L();
      var l = this.delete_(n);
      if (!l)
        return l;
      if (j(this)) {
        var s = M(this, {
          object: this.proxy_ || this.target_,
          name: n,
          type: se,
          newValue: i
        });
        if (!s)
          return null;
        i = s.newValue;
      }
      var c = Yr(n), u = {
        configurable: h.safeDescriptors ? this.isPlainObject_ : !0,
        enumerable: !0,
        get: c.get,
        set: c.set
      };
      if (a) {
        if (!Reflect.defineProperty(this.target_, n, u))
          return !1;
      } else
        J(this.target_, n, u);
      var d = new me(i, o, process.env.NODE_ENV !== "production" ? this.name_ + "." + n.toString() : "ObservableObject.key", !1);
      this.values_.set(n, d), this.notifyPropertyAddition_(n, d.value_);
    } finally {
      I();
    }
    return !0;
  }, t.defineComputedProperty_ = function(n, i, o) {
    o === void 0 && (o = !1), X(this.keysAtom_);
    try {
      L();
      var a = this.delete_(n);
      if (!a)
        return a;
      if (j(this)) {
        var l = M(this, {
          object: this.proxy_ || this.target_,
          name: n,
          type: se,
          newValue: void 0
        });
        if (!l)
          return null;
      }
      i.name || (i.name = process.env.NODE_ENV !== "production" ? this.name_ + "." + n.toString() : "ObservableObject.key"), i.context = this.proxy_ || this.target_;
      var s = Yr(n), c = {
        configurable: h.safeDescriptors ? this.isPlainObject_ : !0,
        enumerable: !1,
        get: s.get,
        set: s.set
      };
      if (o) {
        if (!Reflect.defineProperty(this.target_, n, c))
          return !1;
      } else
        J(this.target_, n, c);
      this.values_.set(n, new z(i)), this.notifyPropertyAddition_(n, void 0);
    } finally {
      I();
    }
    return !0;
  }, t.delete_ = function(n, i) {
    if (i === void 0 && (i = !1), X(this.keysAtom_), !F(this.target_, n))
      return !0;
    if (j(this)) {
      var o = M(this, {
        object: this.proxy_ || this.target_,
        name: n,
        type: Zr
      });
      if (!o)
        return null;
    }
    try {
      var a;
      L();
      var l = H(this), s = process.env.NODE_ENV !== "production" && D(), c = this.values_.get(n), u = void 0;
      if (!c && (l || s)) {
        var d;
        u = (d = Pt(this.target_, n)) == null ? void 0 : d.value;
      }
      if (i) {
        if (!Reflect.deleteProperty(this.target_, n))
          return !1;
      } else
        delete this.target_[n];
      if (process.env.NODE_ENV !== "production" && delete this.appliedAnnotations_[n], c && (this.values_.delete(n), c instanceof me && (u = c.value_), Jn(c)), this.keysAtom_.reportChanged(), (a = this.pendingKeys_) == null || (a = a.get(n)) == null || a.set(n in this.target_), l || s) {
        var v = {
          type: Zr,
          observableKind: "object",
          object: this.proxy_ || this.target_,
          debugObjectName: this.name_,
          oldValue: u,
          name: n
        };
        process.env.NODE_ENV !== "production" && s && T(v), l && q(this, v), process.env.NODE_ENV !== "production" && s && k();
      }
    } finally {
      I();
    }
    return !0;
  }, t.observe_ = function(n, i) {
    return process.env.NODE_ENV !== "production" && i === !0 && f("`observe` doesn't support the fire immediately property for observable objects."), pt(this, n);
  }, t.intercept_ = function(n) {
    return vt(this, n);
  }, t.notifyPropertyAddition_ = function(n, i) {
    var o, a = H(this), l = process.env.NODE_ENV !== "production" && D();
    if (a || l) {
      var s = a || l ? {
        type: se,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        name: n,
        newValue: i
      } : null;
      process.env.NODE_ENV !== "production" && l && T(s), a && q(this, s), process.env.NODE_ENV !== "production" && l && k();
    }
    (o = this.pendingKeys_) == null || (o = o.get(n)) == null || o.set(!0), this.keysAtom_.reportChanged();
  }, t.ownKeys_ = function() {
    return this.keysAtom_.reportObserved(), rt(this.target_);
  }, t.keys_ = function() {
    return this.keysAtom_.reportObserved(), Object.keys(this.target_);
  }, e;
}();
function Fe(e, t) {
  var r;
  if (process.env.NODE_ENV !== "production" && t && He(e) && f("Options can't be provided for already observable objects."), F(e, p))
    return process.env.NODE_ENV !== "production" && !(bi(e) instanceof mr) && f("Cannot convert '" + Mt(e) + `' into observable object:
The target is already observable of different type.
Extending builtins is not supported.`), e;
  process.env.NODE_ENV !== "production" && !Object.isExtensible(e) && f("Cannot make the designated object observable; it is not extensible");
  var n = (r = t?.name) != null ? r : process.env.NODE_ENV !== "production" ? (P(e) ? "ObservableObject" : e.constructor.name) + "@" + B() : "ObservableObject", i = new mr(e, /* @__PURE__ */ new Map(), String(n), Xo(t));
  return Kt(e, p, i), e;
}
var za = /* @__PURE__ */ xe("ObservableObjectAdministration", mr);
function Yr(e) {
  return Jr[e] || (Jr[e] = {
    get: function() {
      return this[p].getObservablePropValue_(e);
    },
    set: function(r) {
      return this[p].setObservablePropValue_(e, r);
    }
  });
}
function He(e) {
  return Bt(e) ? za(e[p]) : !1;
}
function Qr(e, t, r) {
  var n;
  process.env.NODE_ENV !== "production" && (e.appliedAnnotations_[r] = t), (n = e.target_[ee]) == null || delete n[r];
}
function en(e, t, r) {
  if (process.env.NODE_ENV !== "production" && !_i(t) && f("Cannot annotate '" + e.name_ + "." + r.toString() + "': Invalid annotation."), process.env.NODE_ENV !== "production" && !Ct(t) && F(e.appliedAnnotations_, r)) {
    var n = e.name_ + "." + r.toString(), i = e.appliedAnnotations_[r].annotationType_, o = t.annotationType_;
    f("Cannot apply '" + o + "' to '" + n + "':" + (`
The field is already annotated with '` + i + "'.") + `
Re-annotating fields is not allowed.
Use 'override' annotation for methods overridden by subclass.`);
  }
}
var Ba = /* @__PURE__ */ pi(0), Ka = /* @__PURE__ */ function() {
  var e = !1, t = {};
  return Object.defineProperty(t, "0", {
    set: function() {
      e = !0;
    }
  }), Object.create(t)[0] = 1, e === !1;
}(), ar = 0, vi = function() {
};
function Fa(e, t) {
  Object.setPrototypeOf ? Object.setPrototypeOf(e.prototype, t) : e.prototype.__proto__ !== void 0 ? e.prototype.__proto__ = t : e.prototype = t;
}
Fa(vi, Array.prototype);
var $r = /* @__PURE__ */ function(e) {
  function t(n, i, o, a) {
    var l;
    return o === void 0 && (o = process.env.NODE_ENV !== "production" ? "ObservableArray@" + B() : "ObservableArray"), a === void 0 && (a = !1), l = e.call(this) || this, Pe(function() {
      var s = new Pr(o, i, a, !0);
      s.proxy_ = l, $n(l, p, s), n && n.length && l.spliceWithArray(0, 0, n), Ka && Object.defineProperty(l, "0", Ba);
    }), l;
  }
  Tn(t, e);
  var r = t.prototype;
  return r.concat = function() {
    this[p].atom_.reportObserved();
    for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++)
      o[a] = arguments[a];
    return Array.prototype.concat.apply(
      this.slice(),
      //@ts-ignore
      o.map(function(l) {
        return Yt(l) ? l.slice() : l;
      })
    );
  }, r[Symbol.iterator] = function() {
    var n = this, i = 0;
    return at({
      next: function() {
        return i < n.length ? {
          value: n[i++],
          done: !1
        } : {
          done: !0,
          value: void 0
        };
      }
    });
  }, ze(t, [{
    key: "length",
    get: function() {
      return this[p].getArrayLength_();
    },
    set: function(i) {
      this[p].setArrayLength_(i);
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Array";
    }
  }]);
}(vi);
Object.entries(Rt).forEach(function(e) {
  var t = e[0], r = e[1];
  t !== "concat" && Kt($r.prototype, t, r);
});
function pi(e) {
  return {
    enumerable: !1,
    configurable: !0,
    get: function() {
      return this[p].get_(e);
    },
    set: function(r) {
      this[p].set_(e, r);
    }
  };
}
function Ha(e) {
  J($r.prototype, "" + e, pi(e));
}
function gi(e) {
  if (e > ar) {
    for (var t = ar; t < e + 100; t++)
      Ha(t);
    ar = e;
  }
}
gi(1e3);
function qa(e, t, r) {
  return new $r(e, t, r);
}
function Me(e, t) {
  if (typeof e == "object" && e !== null) {
    if (Yt(e))
      return t !== void 0 && f(23), e[p].atom_;
    if (Ke(e))
      return e.atom_;
    if (de(e)) {
      if (t === void 0)
        return e.keysAtom_;
      var r = e.data_.get(t) || e.hasMap_.get(t);
      return r || f(25, t, Mt(e)), r;
    }
    if (He(e)) {
      if (!t)
        return f(26);
      var n = e[p].values_.get(t);
      return n || f(27, t, Mt(e)), n;
    }
    if (Sr(e) || Jt(e) || kt(e))
      return e;
  } else if (O(e) && kt(e[p]))
    return e[p];
  f(28);
}
function bi(e, t) {
  if (e || f(29), Sr(e) || Jt(e) || kt(e) || de(e) || Ke(e))
    return e;
  if (e[p])
    return e[p];
  f(24, e);
}
function Mt(e, t) {
  var r;
  if (t !== void 0)
    r = Me(e, t);
  else {
    if (ft(e))
      return e.name;
    He(e) || de(e) || Ke(e) ? r = bi(e) : r = Me(e);
  }
  return r.name_;
}
function Pe(e) {
  var t = De(), r = Gt(!0);
  L();
  try {
    return e();
  } finally {
    I(), Xt(r), ne(t);
  }
}
var tn = zt.toString;
function Cr(e, t, r) {
  return r === void 0 && (r = -1), yr(e, t, r);
}
function yr(e, t, r, n, i) {
  if (e === t)
    return e !== 0 || 1 / e === 1 / t;
  if (e == null || t == null)
    return !1;
  if (e !== e)
    return t !== t;
  var o = typeof e;
  if (o !== "function" && o !== "object" && typeof t != "object")
    return !1;
  var a = tn.call(e);
  if (a !== tn.call(t))
    return !1;
  switch (a) {
    case "[object RegExp]":
    case "[object String]":
      return "" + e == "" + t;
    case "[object Number]":
      return +e != +e ? +t != +t : +e == 0 ? 1 / +e === 1 / t : +e == +t;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +t;
    case "[object Symbol]":
      return typeof Symbol < "u" && Symbol.valueOf.call(e) === Symbol.valueOf.call(t);
    case "[object Map]":
    case "[object Set]":
      r >= 0 && r++;
      break;
  }
  e = rn(e), t = rn(t);
  var l = a === "[object Array]";
  if (!l) {
    if (typeof e != "object" || typeof t != "object")
      return !1;
    var s = e.constructor, c = t.constructor;
    if (s !== c && !(O(s) && s instanceof s && O(c) && c instanceof c) && "constructor" in e && "constructor" in t)
      return !1;
  }
  if (r === 0)
    return !1;
  r < 0 && (r = -1), n = n || [], i = i || [];
  for (var u = n.length; u--; )
    if (n[u] === e)
      return i[u] === t;
  if (n.push(e), i.push(t), l) {
    if (u = e.length, u !== t.length)
      return !1;
    for (; u--; )
      if (!yr(e[u], t[u], r - 1, n, i))
        return !1;
  } else {
    var d = Object.keys(e), v;
    if (u = d.length, Object.keys(t).length !== u)
      return !1;
    for (; u--; )
      if (v = d[u], !(F(t, v) && yr(e[v], t[v], r - 1, n, i)))
        return !1;
  }
  return n.pop(), i.pop(), !0;
}
function rn(e) {
  return Yt(e) ? e.slice() : Ue(e) || de(e) || Q(e) || Ke(e) ? Array.from(e.entries()) : e;
}
function at(e) {
  return e[Symbol.iterator] = Wa, e;
}
function Wa() {
  return this;
}
function _i(e) {
  return (
    // Can be function
    e instanceof Object && typeof e.annotationType_ == "string" && O(e.make_) && O(e.extend_)
  );
}
["Symbol", "Map", "Set"].forEach(function(e) {
  var t = Nn();
  typeof t[e] > "u" && f("MobX requires global '" + e + "' to be available or polyfilled");
});
typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ == "object" && __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
  spy: pa,
  extras: {
    getDebugName: Mt
  },
  $mobx: p
});
const nn = "copilot-conf";
class ye {
  static get sessionConfiguration() {
    const t = sessionStorage.getItem(nn);
    return t ? JSON.parse(t) : {};
  }
  static saveCopilotActivation(t) {
    const r = this.sessionConfiguration;
    r.active = t, this.persist(r);
  }
  static getCopilotActivation() {
    return this.sessionConfiguration.active;
  }
  static saveSpotlightActivation(t) {
    const r = this.sessionConfiguration;
    r.spotlightActive = t, this.persist(r);
  }
  static getSpotlightActivation() {
    return this.sessionConfiguration.spotlightActive;
  }
  static saveSpotlightPosition(t, r, n, i) {
    const o = this.sessionConfiguration;
    o.spotlightPosition = { left: t, top: r, right: n, bottom: i }, this.persist(o);
  }
  static getSpotlightPosition() {
    return this.sessionConfiguration.spotlightPosition;
  }
  static saveDrawerSize(t, r) {
    const n = this.sessionConfiguration;
    n.drawerSizes = n.drawerSizes ?? {}, n.drawerSizes[t] = r, this.persist(n);
  }
  static getDrawerSize(t) {
    const r = this.sessionConfiguration;
    if (r.drawerSizes)
      return r.drawerSizes[t];
  }
  static savePanelConfigurations(t) {
    const r = this.sessionConfiguration;
    r.sectionPanelState = t, this.persist(r);
  }
  static getPanelConfigurations() {
    return this.sessionConfiguration.sectionPanelState;
  }
  static persist(t) {
    sessionStorage.setItem(nn, JSON.stringify(t));
  }
  static savePrompts(t) {
    const r = this.sessionConfiguration;
    r.prompts = t, this.persist(r);
  }
  static getPrompts() {
    return this.sessionConfiguration.prompts || [];
  }
}
class Ga {
  constructor() {
    this.spotlightActive = !1, this.welcomeActive = !1, this.loginCheckActive = !1, this.userInfo = void 0, this.active = !1, this.activatedFrom = null, this.activatedAtLeastOnce = !1, this.operationInProgress = void 0, this.operationWaitsHmrUpdate = void 0, this.idePluginState = void 0, this.notifications = [], this.infoTooltip = null, this.sectionPanelDragging = !1, this.spotlightDragging = !1, this.sectionPanelResizing = !1, this.drawerResizing = !1, this.jdkInfo = void 0, Zt(this, {
      notifications: A.shallow
    }), this.spotlightActive = ye.getSpotlightActivation() ?? !1;
  }
  setActive(t, r) {
    this.active = t, t && (this.activatedAtLeastOnce = !0), this.activatedFrom = r ?? null;
  }
  setSpotlightActive(t) {
    this.spotlightActive = t;
  }
  setWelcomeActive(t) {
    this.welcomeActive = t;
  }
  setLoginCheckActive(t) {
    this.loginCheckActive = t;
  }
  setUserInfo(t) {
    this.userInfo = t;
  }
  startOperation(t) {
    if (this.operationInProgress)
      throw new Error(`An ${t} operation is already in progress`);
    if (this.operationWaitsHmrUpdate)
      throw new Error("Wait for files to be updated to start a new operation");
    this.operationInProgress = t;
  }
  stopOperation(t) {
    if (this.operationInProgress) {
      if (this.operationInProgress !== t)
        return;
    } else return;
    this.operationInProgress = void 0;
  }
  setIdePluginState(t) {
    this.idePluginState = t;
  }
  toggleActive(t) {
    this.setActive(!this.active, this.active ? null : t ?? null);
  }
  reset() {
    this.active = !1, this.activatedAtLeastOnce = !1;
  }
  setNotifications(t) {
    this.notifications = t;
  }
  removeNotification(t) {
    t.animatingOut = !0, setTimeout(() => {
      this.reallyRemoveNotification(t);
    }, 180);
  }
  reallyRemoveNotification(t) {
    const r = this.notifications.indexOf(t);
    r > -1 && this.notifications.splice(r, 1);
  }
  setTooltip(t, r) {
    this.infoTooltip = {
      text: t,
      loader: r
    };
  }
  clearTooltip() {
    this.infoTooltip = null;
  }
  setSectionPanelDragging(t) {
    this.sectionPanelDragging = t;
  }
  setSpotlightDragging(t) {
    this.spotlightDragging = t;
  }
  setSectionPanelResizing(t) {
    this.sectionPanelResizing = t;
  }
  setDrawerResizing(t) {
    this.drawerResizing = t;
  }
}
const Le = "copilot-", Xa = "24.5.0.alpha15", Al = "attention-required", Sl = "https://plugins.jetbrains.com/plugin/23758-vaadin", Nl = "https://marketplace.visualstudio.com/items?itemName=vaadin.vaadin-vscode", xl = (e, t, r) => t >= e.left && t <= e.right && r >= e.top && r <= e.bottom, Ja = (e) => {
  const t = [];
  let r = Ya(e);
  for (; r; )
    t.push(r), r = r.parentElement;
  return t;
}, Za = (e, t) => {
  let r = e;
  for (; !(r instanceof HTMLElement && r.localName === `${Le}main`); ) {
    if (!r.isConnected)
      return null;
    if (r.parentNode ? r = r.parentNode : r.host && (r = r.host), r instanceof HTMLElement && r.localName === t)
      return r;
  }
  return null;
};
function Ya(e) {
  return e.parentElement ?? e.parentNode?.host;
}
function st(e) {
  return !e || !(e instanceof HTMLElement) ? !1 : [...Ja(e), e].map((t) => t.localName).some((t) => t.startsWith(Le));
}
function Dl(e) {
  return e instanceof Element;
}
function Pl(e) {
  return e.startsWith("vaadin-") ? e.substring(7).split("-").map((n) => n.charAt(0).toUpperCase() + n.slice(1)).join(" ") : e;
}
function $l(e) {
  if (!e)
    return;
  if (e.id)
    return `#${e.id}`;
  if (!e.children)
    return;
  const t = Array.from(e.children).find((n) => n.localName === "label");
  if (t)
    return t.outerText.trim();
  const r = Array.from(e.childNodes).find(
    (n) => n.nodeType === Node.TEXT_NODE && n.textContent && n.textContent.trim().length > 0
  );
  if (r && r.textContent)
    return r.textContent.trim();
}
var mi = /* @__PURE__ */ ((e) => (e["vaadin-combo-box"] = "vaadin-combo-box", e["vaadin-date-picker"] = "vaadin-date-picker", e["vaadin-dialog"] = "vaadin-dialog", e["vaadin-multi-select-combo-box"] = "vaadin-multi-select-combo-box", e["vaadin-select"] = "vaadin-select", e["vaadin-time-picker"] = "vaadin-time-picker", e))(mi || {});
const Ge = {
  "vaadin-combo-box": {
    hideOnActivation: !0,
    open: (e) => yt(e),
    close: (e) => wt(e)
  },
  "vaadin-select": {
    hideOnActivation: !0,
    open: (e) => {
      const t = e;
      wi(t, t._overlayElement), t.opened = !0;
    },
    close: (e) => {
      const t = e;
      Oi(t, t._overlayElement), t.opened = !1;
    }
  },
  "vaadin-multi-select-combo-box": {
    hideOnActivation: !0,
    open: (e) => yt(e.$.comboBox),
    close: (e) => {
      wt(e.$.comboBox), e.removeAttribute("focused");
    }
  },
  "vaadin-date-picker": {
    hideOnActivation: !0,
    open: (e) => yt(e),
    close: (e) => wt(e)
  },
  "vaadin-time-picker": {
    hideOnActivation: !0,
    open: (e) => yt(e.$.comboBox),
    close: (e) => {
      wt(e.$.comboBox), e.removeAttribute("focused");
    }
  },
  "vaadin-dialog": {
    hideOnActivation: !1
  }
}, yi = (e) => {
  e.preventDefault(), e.stopImmediatePropagation();
}, yt = (e) => {
  e.addEventListener("focusout", yi, { capture: !0 }), wi(e), e.opened = !0;
}, wt = (e) => {
  Oi(e), e.removeAttribute("focused"), e.removeEventListener("focusout", yi, { capture: !0 }), e.opened = !1;
}, wi = (e, t) => {
  const r = t ?? e.$.overlay;
  r.__oldModeless = r.modeless, r.modeless = !0;
}, Oi = (e, t) => {
  const r = t ?? e.$.overlay;
  r.modeless = r.__oldModeless !== void 0 ? r.__oldModeless : r.modeless, delete r.__oldModeless;
};
class Qa {
  constructor() {
    this.openedOverlayOwners = /* @__PURE__ */ new Set(), this.overlayCloseEventListener = (t) => {
      st(t.target?.owner) || (window.Vaadin.copilot._uiState.active || st(t.detail.sourceEvent.target)) && (t.preventDefault(), t.stopImmediatePropagation());
    };
  }
  /**
   * Modifies pointer-events property to auto if dialog overlay is present on body element. <br/>
   * Overriding closeOnOutsideClick method in order to keep overlay present while copilot is active
   * @private
   */
  onCopilotActivation() {
    const t = Array.from(document.body.children).find(
      (n) => n.localName.startsWith("vaadin") && n.localName.endsWith("-overlay")
    );
    if (!t)
      return;
    const r = this.getOwner(t);
    if (r) {
      const n = Ge[r.localName];
      if (!n)
        return;
      n.hideOnActivation && n.close ? n.close(r) : document.body.style.getPropertyValue("pointer-events") === "none" && document.body.style.removeProperty("pointer-events");
    }
  }
  /**
   * Restores pointer-events state on deactivation. <br/>
   * Closes opened overlays while using copilot.
   * @private
   */
  onCopilotDeactivation() {
    this.openedOverlayOwners.forEach((r) => {
      const n = Ge[r.localName];
      n && n.close && n.close(r);
    }), document.body.querySelector("vaadin-dialog-overlay") && document.body.style.setProperty("pointer-events", "none");
  }
  getOwner(t) {
    const r = t;
    return r.owner ?? r.__dataHost;
  }
  addOverlayOutsideClickEvent() {
    document.documentElement.addEventListener("vaadin-overlay-outside-click", this.overlayCloseEventListener, {
      capture: !0
    }), document.documentElement.addEventListener("vaadin-overlay-escape-press", this.overlayCloseEventListener, {
      capture: !0
    });
  }
  removeOverlayOutsideClickEvent() {
    document.documentElement.removeEventListener("vaadin-overlay-outside-click", this.overlayCloseEventListener), document.documentElement.removeEventListener("vaadin-overlay-escape-press", this.overlayCloseEventListener);
  }
  toggle(t) {
    const r = Ge[t.localName];
    this.isOverlayActive(t) ? (r.close(t), this.openedOverlayOwners.delete(t)) : (r.open(t), this.openedOverlayOwners.add(t));
  }
  isOverlayActive(t) {
    const r = Ge[t.localName];
    return r.active ? r.active(t) : t.hasAttribute("opened");
  }
  overlayStatus(t) {
    if (!t)
      return { visible: !1 };
    const r = t.localName;
    let n = Object.keys(mi).includes(r);
    if (!n)
      return { visible: !1 };
    const i = Ge[t.localName];
    i.hasOverlay && (n = i.hasOverlay(t));
    const o = this.isOverlayActive(t);
    return { visible: n, active: o };
  }
}
function Ei(e, t) {
  const r = e();
  r ? t(r) : setTimeout(() => Ei(e, t), 50);
}
async function Ai(e) {
  const t = e();
  if (t)
    return t;
  let r;
  const n = new Promise((o) => {
    r = o;
  }), i = setInterval(() => {
    const o = e();
    o && (clearInterval(i), r(o));
  }, 10);
  return n;
}
function es(e) {
  return A.box(e, { deep: !1 });
}
function ts(e) {
  return e && typeof e.lastAccessedBy_ == "number";
}
function Cl(e) {
  if (e) {
    if (typeof e == "string")
      return e;
    if (!ts(e))
      throw new Error(`Expected message to be a string or an observable value but was ${JSON.stringify(e)}`);
    return e.get();
  }
}
function Vl(e, t) {
  return e.length > t ? `${e.substring(0, t - 3)}...` : e;
}
const rs = {
  userAgent: navigator.userAgent,
  locale: navigator.language,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
};
async function Vr() {
  return Ai(() => {
    const e = window.Vaadin.devTools, t = e?.frontendConnection && e?.frontendConnection.status === "active";
    return e !== void 0 && t && e?.frontendConnection;
  });
}
function Ie(e, t) {
  Vr().then((r) => r.send(e, { ...t, context: rs }));
}
async function Tl() {
  return await Vr(), !!window.Vaadin.devTools.conf.backend;
}
class ns {
  constructor() {
    this.promise = new Promise((t) => {
      this.resolveInit = t;
    });
  }
  done(t) {
    this.resolveInit(t);
  }
}
class is {
  constructor() {
    this.dismissedNotifications = [], this.termsSummaryDismissed = !1, this.activationButtonPosition = null, this.paletteState = null, this.activationShortcut = !0, this.activationAnimation = !0, Zt(this), this.initializer = new ns(), this.initializer.promise.then(() => {
      oi(
        () => JSON.stringify(this),
        () => {
          Ie("copilot-set-machine-configuration", { conf: JSON.stringify(on(this)) });
        }
      );
    }), window.Vaadin.copilot.eventbus.on("copilot-machine-configuration", (t) => {
      const r = t.detail.conf;
      Object.assign(this, on(r)), this.initializer.done(!0), t.preventDefault();
    }), this.loadData();
  }
  loadData() {
    Ie("copilot-get-machine-configuration", {});
  }
  addDismissedNotification(t) {
    this.dismissedNotifications.push(t);
  }
  getDismissedNotifications() {
    return this.dismissedNotifications;
  }
  setTermsSummaryDismissed(t) {
    this.termsSummaryDismissed = t;
  }
  isTermsSummaryDismissed() {
    return this.termsSummaryDismissed;
  }
  getActivationButtonPosition() {
    return this.activationButtonPosition;
  }
  setActivationButtonPosition(t) {
    this.activationButtonPosition = t;
  }
  getPaletteState() {
    return this.paletteState;
  }
  setPaletteState(t) {
    this.paletteState = t;
  }
  isActivationShortcut() {
    return this.activationShortcut;
  }
  setActivationShortcut(t) {
    this.activationShortcut = t;
  }
  isActivationAnimation() {
    return this.activationAnimation;
  }
  setActivationAnimation(t) {
    this.activationAnimation = t;
  }
}
function on(e) {
  const t = { ...e };
  return delete t.initializer, t;
}
const Si = async (e, t, r) => window.Vaadin.copilot.comm(e, t, r);
class os {
  constructor() {
    this._previewActivated = !1, this._remainingTimeInMillis = -1, this._active = !1, this._configurationLoaded = !1, Zt(this);
  }
  setConfiguration(t) {
    this._previewActivated = t.previewActivated, t.previewActivated ? this._remainingTimeInMillis = t.remainingTimeInMillis : this._remainingTimeInMillis = -1, this._active = t.active, this._configurationLoaded = !0;
  }
  get previewActivated() {
    return this._previewActivated;
  }
  get remainingTimeInMillis() {
    return this._remainingTimeInMillis;
  }
  get active() {
    return this._active;
  }
  get configurationLoaded() {
    return this._configurationLoaded;
  }
  get expired() {
    return this.previewActivated && !this.active;
  }
  reset() {
    this._previewActivated = !1, this._active = !1, this._configurationLoaded = !1, this._remainingTimeInMillis = -1;
  }
  loadPreviewConfiguration() {
    Si(`${Le}get-preview`, {}, (t) => {
      const r = t.data;
      this.setConfiguration(r);
    }).catch((t) => {
      Promise.resolve().then(() => js).then((r) => {
        r.handleCopilotError("Load preview configuration failed", t);
      });
    });
  }
}
class as {
  constructor() {
    this._panels = [], this._attentionRequiredPanelTag = null, this._floatingPanelsZIndexOrder = [], Zt(this), this.restorePositions();
  }
  restorePositions() {
    const t = ye.getPanelConfigurations();
    t && (this._panels = this._panels.map((r) => {
      const n = t.find((i) => i.tag === r.tag);
      return n && (r = Object.assign(r, { ...n })), r;
    }));
  }
  /**
   * Adds panelTag as last element -focused- to list.
   * @param panelConfiguration
   */
  addFocusedFloatingPanel(t) {
    this._floatingPanelsZIndexOrder = this._floatingPanelsZIndexOrder.filter((r) => r !== t.tag), t.floating && this._floatingPanelsZIndexOrder.push(t.tag);
  }
  /**
   * Returns the focused z-index of floating panel as following order
   * <ul>
   *     <li>Returns 50 for last(focused) element </li>
   *     <li>Returns the index of element in list(starting from 0) </li>
   *     <li>Returns 0 if panel is not in the list</li>
   * </ul>
   * @param panelTag
   */
  getFloatingPanelZIndex(t) {
    const r = this._floatingPanelsZIndexOrder.findIndex((n) => n === t);
    return r === this._floatingPanelsZIndexOrder.length - 1 ? 50 : r === -1 ? 0 : r;
  }
  get floatingPanelsZIndexOrder() {
    return this._floatingPanelsZIndexOrder;
  }
  get attentionRequiredPanelTag() {
    return this._attentionRequiredPanelTag;
  }
  set attentionRequiredPanelTag(t) {
    this._attentionRequiredPanelTag = t;
  }
  getAttentionRequiredPanelConfiguration() {
    return this._panels.find((t) => t.tag === this._attentionRequiredPanelTag);
  }
  clearAttention() {
    this._attentionRequiredPanelTag = null;
  }
  get panels() {
    return this._panels;
  }
  addPanel(t) {
    this._panels.push(t), this.restorePositions();
  }
  getPanelByTag(t) {
    return this._panels.find((r) => r.tag === t);
  }
  updatePanel(t, r) {
    const n = [...this._panels], i = n.find((o) => o.tag === t);
    if (i) {
      for (const o in r)
        i[o] = r[o];
      r.floating === !1 && (this._floatingPanelsZIndexOrder = this._floatingPanelsZIndexOrder.filter((o) => o !== t)), this._panels = n, ye.savePanelConfigurations(this._panels);
    }
  }
  updateOrders(t) {
    const r = [...this._panels];
    r.forEach((n) => {
      const i = t.find((o) => o.tag === n.tag);
      i && (n.panelOrder = i.order);
    }), this._panels = r, ye.savePanelConfigurations(r);
  }
}
window.Vaadin ??= {};
window.Vaadin.copilot ??= {};
window.Vaadin.copilot.plugins = [];
window.Vaadin.copilot._uiState = new Ga();
window.Vaadin.copilot.eventbus = new Qi();
window.Vaadin.copilot.overlayManager = new Qa();
window.Vaadin.copilot._machineState = new is();
window.Vaadin.copilot._previewState = new os();
window.Vaadin.copilot._sectionPanelUiState = new as();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ss = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Nt = globalThis, Tr = Nt.ShadowRoot && (Nt.ShadyCSS === void 0 || Nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, kr = Symbol(), an = /* @__PURE__ */ new WeakMap();
let Ni = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== kr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Tr && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = an.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && an.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ae = (e) => new Ni(typeof e == "string" ? e : e + "", void 0, kr), ls = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, o) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[o + 1], e[0]);
  return new Ni(r, e, kr);
}, cs = (e, t) => {
  if (Tr) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = Nt.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, sn = Tr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return ae(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: us, defineProperty: ds, getOwnPropertyDescriptor: hs, getOwnPropertyNames: fs, getOwnPropertySymbols: vs, getPrototypeOf: ps } = Object, Qt = globalThis, ln = Qt.trustedTypes, gs = ln ? ln.emptyScript : "", bs = Qt.reactiveElementPolyfillSupport, et = (e, t) => e, wr = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? gs : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, xi = (e, t) => !us(e, t), cn = { attribute: !0, type: String, converter: wr, reflect: !1, hasChanged: xi };
Symbol.metadata ??= Symbol("metadata"), Qt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class Ve extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = cn) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && ds(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: o } = hs(this.prototype, t) ?? { get() {
      return this[r];
    }, set(a) {
      this[r] = a;
    } };
    return { get() {
      return i?.call(this);
    }, set(a) {
      const l = i?.call(this);
      o.call(this, a), this.requestUpdate(t, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? cn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(et("elementProperties"))) return;
    const t = ps(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(et("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(et("properties"))) {
      const r = this.properties, n = [...fs(r), ...vs(r)];
      for (const i of n) this.createProperty(i, r[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [n, i] of r) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, n] of this.elementProperties) {
      const i = this._$Eu(r, n);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) r.unshift(sn(i));
    } else t !== void 0 && r.push(sn(t));
    return r;
  }
  static _$Eu(t, r) {
    const n = r.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const n of r.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return cs(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, r, n) {
    this._$AK(t, n);
  }
  _$EC(t, r) {
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : wr).toAttribute(r, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, r) {
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = n.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : wr;
      this._$Em = i, this[i] = a.fromAttribute(r, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, r, n) {
    if (t !== void 0) {
      if (n ??= this.constructor.getPropertyOptions(t), !(n.hasChanged ?? xi)(this[t], r)) return;
      this.P(t, r, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, r, n) {
    this._$AL.has(t) || this._$AL.set(t, r), n.reflect === !0 && this._$Em !== t && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, o] of n) o.wrapped !== !0 || this._$AL.has(i) || this[i] === void 0 || this.P(i, this[i], o);
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(r)) : this._$EU();
    } catch (n) {
      throw t = !1, this._$EU(), n;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej &&= this._$Ej.forEach((r) => this._$EC(r, this[r])), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
Ve.elementStyles = [], Ve.shadowRootOptions = { mode: "open" }, Ve[et("elementProperties")] = /* @__PURE__ */ new Map(), Ve[et("finalized")] = /* @__PURE__ */ new Map(), bs?.({ ReactiveElement: Ve }), (Qt.reactiveElementVersions ??= []).push("2.0.4");
const Ce = Symbol("LitMobxRenderReaction"), un = Symbol("LitMobxRequestUpdate");
function _s(e, t) {
  var r, n;
  return n = class extends e {
    constructor() {
      super(...arguments), this[r] = () => {
        this.requestUpdate();
      };
    }
    connectedCallback() {
      super.connectedCallback();
      const o = this.constructor.name || this.nodeName;
      this[Ce] = new t(`${o}.update()`, this[un]), this.hasUpdated && this.requestUpdate();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this[Ce] && (this[Ce].dispose(), this[Ce] = void 0);
    }
    update(o) {
      this[Ce] ? this[Ce].track(super.update.bind(this, o)) : super.update(o);
    }
  }, r = un, n;
}
function ms(e) {
  return _s(e, Y);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rr = globalThis, Lt = Rr.trustedTypes, dn = Lt ? Lt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, jr = "$lit$", re = `lit$${Math.random().toFixed(9).slice(2)}$`, Mr = "?" + re, ys = `<${Mr}>`, Se = document, lt = () => Se.createComment(""), ct = (e) => e === null || typeof e != "object" && typeof e != "function", Lr = Array.isArray, Di = (e) => Lr(e) || typeof e?.[Symbol.iterator] == "function", sr = `[ 	
\f\r]`, Xe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, hn = /-->/g, fn = />/g, ve = RegExp(`>|${sr}(?:([^\\s"'>=/]+)(${sr}*=${sr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vn = /'/g, pn = /"/g, Pi = /^(?:script|style|textarea|title)$/i, $i = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), It = $i(1), jl = $i(2), ce = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), gn = /* @__PURE__ */ new WeakMap(), _e = Se.createTreeWalker(Se, 129);
function Ci(e, t) {
  if (!Lr(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return dn !== void 0 ? dn.createHTML(t) : t;
}
const Vi = (e, t) => {
  const r = e.length - 1, n = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Xe;
  for (let l = 0; l < r; l++) {
    const s = e[l];
    let c, u, d = -1, v = 0;
    for (; v < s.length && (a.lastIndex = v, u = a.exec(s), u !== null); ) v = a.lastIndex, a === Xe ? u[1] === "!--" ? a = hn : u[1] !== void 0 ? a = fn : u[2] !== void 0 ? (Pi.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = ve) : u[3] !== void 0 && (a = ve) : a === ve ? u[0] === ">" ? (a = i ?? Xe, d = -1) : u[1] === void 0 ? d = -2 : (d = a.lastIndex - u[2].length, c = u[1], a = u[3] === void 0 ? ve : u[3] === '"' ? pn : vn) : a === pn || a === vn ? a = ve : a === hn || a === fn ? a = Xe : (a = ve, i = void 0);
    const g = a === ve && e[l + 1].startsWith("/>") ? " " : "";
    o += a === Xe ? s + ys : d >= 0 ? (n.push(c), s.slice(0, d) + jr + s.slice(d) + re + g) : s + re + (d === -2 ? l : g);
  }
  return [Ci(e, o + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ut {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let o = 0, a = 0;
    const l = t.length - 1, s = this.parts, [c, u] = Vi(t, r);
    if (this.el = ut.createElement(c, n), _e.currentNode = this.el.content, r === 2 || r === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = _e.nextNode()) !== null && s.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(jr)) {
          const v = u[a++], g = i.getAttribute(d).split(re), _ = /([.?@])?(.*)/.exec(v);
          s.push({ type: 1, index: o, name: _[2], strings: g, ctor: _[1] === "." ? Ri : _[1] === "?" ? ji : _[1] === "@" ? Mi : gt }), i.removeAttribute(d);
        } else d.startsWith(re) && (s.push({ type: 6, index: o }), i.removeAttribute(d));
        if (Pi.test(i.tagName)) {
          const d = i.textContent.split(re), v = d.length - 1;
          if (v > 0) {
            i.textContent = Lt ? Lt.emptyScript : "";
            for (let g = 0; g < v; g++) i.append(d[g], lt()), _e.nextNode(), s.push({ type: 2, index: ++o });
            i.append(d[v], lt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Mr) s.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(re, d + 1)) !== -1; ) s.push({ type: 7, index: o }), d += re.length - 1;
      }
      o++;
    }
  }
  static createElement(t, r) {
    const n = Se.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Ne(e, t, r = e, n) {
  if (t === ce) return t;
  let i = n !== void 0 ? r.o?.[n] : r.l;
  const o = ct(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(e), i._$AT(e, r, n)), n !== void 0 ? (r.o ??= [])[n] = i : r.l = i), i !== void 0 && (t = Ne(e, i._$AS(e, t.values), i, n)), t;
}
class Ti {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: n } = this._$AD, i = (t?.creationScope ?? Se).importNode(r, !0);
    _e.currentNode = i;
    let o = _e.nextNode(), a = 0, l = 0, s = n[0];
    for (; s !== void 0; ) {
      if (a === s.index) {
        let c;
        s.type === 2 ? c = new er(o, o.nextSibling, this, t) : s.type === 1 ? c = new s.ctor(o, s.name, s.strings, this, t) : s.type === 6 && (c = new Li(o, this, t)), this._$AV.push(c), s = n[++l];
      }
      a !== s?.index && (o = _e.nextNode(), a++);
    }
    return _e.currentNode = Se, i;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
let er = class ki {
  get _$AU() {
    return this._$AM?._$AU ?? this.v;
  }
  constructor(t, r, n, i) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = i, this.v = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && t?.nodeType === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = Ne(this, t, r), ct(t) ? t === E || t == null || t === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : t !== this._$AH && t !== ce && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Di(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== E && ct(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Se.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ut.createElement(Ci(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(r);
    else {
      const o = new Ti(i, this), a = o.u(this.options);
      o.p(r), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let r = gn.get(t.strings);
    return r === void 0 && gn.set(t.strings, r = new ut(t)), r;
  }
  k(t) {
    Lr(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const o of t) i === r.length ? r.push(n = new ki(this.O(lt()), this.O(lt()), this, this.options)) : n = r[i], n._$AI(o), i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this.v = t, this._$AP?.(t));
  }
};
class gt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, i, o) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = E;
  }
  _$AI(t, r = this, n, i) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = Ne(this, t, r, 0), a = !ct(t) || t !== this._$AH && t !== ce, a && (this._$AH = t);
    else {
      const l = t;
      let s, c;
      for (t = o[0], s = 0; s < o.length - 1; s++) c = Ne(this, l[n + s], r, s), c === ce && (c = this._$AH[s]), a ||= !ct(c) || c !== this._$AH[s], c === E ? t = E : t !== E && (t += (c ?? "") + o[s + 1]), this._$AH[s] = c;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ri extends gt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === E ? void 0 : t;
  }
}
class ji extends gt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== E);
  }
}
class Mi extends gt {
  constructor(t, r, n, i, o) {
    super(t, r, n, i, o), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Ne(this, t, r, 0) ?? E) === ce) return;
    const n = this._$AH, i = t === E && n !== E || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== E && (n === E || i);
    i && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Li {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ne(this, t);
  }
}
const ws = { M: jr, P: re, A: Mr, C: 1, L: Vi, R: Ti, D: Di, V: Ne, I: er, H: gt, N: ji, U: Mi, B: Ri, F: Li }, Os = Rr.litHtmlPolyfillSupport;
Os?.(ut, er), (Rr.litHtmlVersions ??= []).push("3.2.0");
const Es = (e, t, r) => {
  const n = r?.renderBefore ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const o = r?.renderBefore ?? null;
    n._$litPart$ = i = new er(t.insertBefore(lt(), o), o, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class tt extends Ve {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this.o = Es(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this.o?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.o?.setConnected(!1);
  }
  render() {
    return ce;
  }
}
tt._$litElement$ = !0, tt.finalized = !0, globalThis.litElementHydrateSupport?.({ LitElement: tt });
const As = globalThis.litElementPolyfillSupport;
As?.({ LitElement: tt });
(globalThis.litElementVersions ??= []).push("4.1.0");
class Ss extends ms(tt) {
}
class Ns extends Ss {
  constructor() {
    super(...arguments), this.disposers = [];
  }
  /**
   * Creates a MobX reaction using the given parameters and disposes it when this element is detached.
   *
   * This should be called from `connectedCallback` to ensure that the reaction is active also if the element is attached again later.
   */
  reaction(t, r, n) {
    this.disposers.push(oi(t, r, n));
  }
  /**
   * Creates a MobX autorun using the given parameters and disposes it when this element is detached.
   *
   * This should be called from `connectedCallback` to ensure that the reaction is active also if the element is attached again later.
   */
  autorun(t, r) {
    this.disposers.push(ni(t, r));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.disposers.forEach((t) => {
      t();
    }), this.disposers = [];
  }
}
const bt = window.Vaadin.copilot._sectionPanelUiState;
if (!bt)
  throw new Error("Tried to access copilot section panel ui state before it was initialized.");
let ge = [];
const bn = [];
function _n(e) {
  e.init({
    addPanel: (t) => {
      bt.addPanel(t);
    },
    send(t, r) {
      Ie(t, r);
    }
  });
}
function xs() {
  ge.push(import("./copilot-log-plugin-C_Qje5Sb.js")), ge.push(import("./copilot-info-plugin-BPKOVP7r.js")), ge.push(import("./copilot-features-plugin-BcWxpl7D.js")), ge.push(import("./copilot-feedback-plugin-B-ZJIfc8.js")), ge.push(import("./copilot-shortcuts-plugin-Bnt2ZSHN.js"));
}
function Ds() {
  {
    const e = `https://cdn.vaadin.com/copilot/${Xa}/copilot-plugins.js`;
    import(
      /* @vite-ignore */
      e
    ).catch((t) => {
      console.warn(`Unable to load plugins from ${e}. Some Copilot features are unavailable.`, t);
    });
  }
}
function Ps() {
  Promise.all(ge).then(() => {
    const e = window.Vaadin;
    if (e.copilot.plugins) {
      const t = e.copilot.plugins;
      e.copilot.plugins.push = (r) => _n(r), Array.from(t).forEach((r) => {
        bn.includes(r) || (_n(r), bn.push(r));
      });
    }
  }), ge = [];
}
class $s {
  constructor() {
    this.active = !1, this.activate = () => {
      this.active = !0, this.blurActiveApplicationElement();
    }, this.deactivate = () => {
      this.active = !1;
    }, this.focusInEventListener = (t) => {
      this.active && (t.preventDefault(), t.stopPropagation(), st(t.target) || requestAnimationFrame(() => {
        t.target.blur && t.target.blur(), document.body.querySelector("copilot-main")?.focus();
      }));
    };
  }
  hostConnectedCallback() {
    const t = this.getApplicationRootElement();
    t && t instanceof HTMLElement && t.addEventListener("focusin", this.focusInEventListener);
  }
  hostDisconnectedCallback() {
    const t = this.getApplicationRootElement();
    t && t instanceof HTMLElement && t.removeEventListener("focusin", this.focusInEventListener);
  }
  getApplicationRootElement() {
    return document.body.firstElementChild;
  }
  blurActiveApplicationElement() {
    document.activeElement && document.activeElement.blur && document.activeElement.blur();
  }
}
const Ot = new $s(), x = window.Vaadin.copilot.eventbus;
if (!x)
  throw new Error("Tried to access copilot eventbus before it was initialized.");
const Je = window.Vaadin.copilot.overlayManager, Ml = {
  AddClickListener: "Add Click Listener",
  AI: "AI",
  Delete: "Delete",
  DragAndDrop: "Drag and Drop",
  Duplicate: "Duplicate",
  SetLabel: "Set label",
  SetText: "Set text",
  SetHelper: "Set helper text",
  WrapWithTag: "Wrapping with tag",
  Alignment: "Alignment",
  Padding: "Padding",
  ModifyComponentSource: "Modify component source",
  Gap: "Gap"
}, b = window.Vaadin.copilot._uiState;
if (!b)
  throw new Error("Tried to access copilot ui state before it was initialized.");
const Ir = (e, t) => {
  Ie("copilot-track-event", { event: e, value: t });
};
var Ur = /* @__PURE__ */ ((e) => (e.INFORMATION = "information", e.WARNING = "warning", e.ERROR = "error", e))(Ur || {});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ii = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ui = (e) => (...t) => ({ _$litDirective$: e, values: t });
let zi = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, r, n) {
    this.t = t, this._$AM = r, this.i = n;
  }
  _$AS(t, r) {
    return this.update(t, r);
  }
  update(t, r) {
    return this.render(...r);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Or extends zi {
  constructor(t) {
    if (super(t), this.it = E, t.type !== Ii.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === E || t == null) return this._t = void 0, this.it = t;
    if (t === ce) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const r = [t];
    return r.raw = r, this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
Or.directiveName = "unsafeHTML", Or.resultType = 1;
const Cs = Ui(Or);
function Bi() {
  return import("./copilot-notification-CRd3Cmhj.js");
}
const Vs = (e) => {
  tr("Unspecified error", e);
}, Ts = (e) => e.error ? (ks({
  error: e.error,
  message: e.errorMessage,
  stackTrace: e.errorStacktrace
}), !0) : !1, Ki = (e, t, r) => {
  Bi().then(({ showNotification: n }) => {
    n({
      type: Ur.ERROR,
      message: e,
      details: es(
        It`<vaadin-details summary="Details" style="color: var(--dev-tools-text-color)"
          ><div>
            <code class="codeblock" style="white-space: normal;color: var(--dev-tools-background-color-active)"
              ><copilot-copy></copilot-copy>${Cs(t)}</code
            >
            <vaadin-button hidden>Report this issue</vaadin-button>
          </div></vaadin-details
        >`
      ),
      delay: 3e4
    });
  }), Ir("error", `${e}
\`\`\`${r}\`\`\``), b.operationWaitsHmrUpdate = void 0;
}, ks = (e) => {
  Ki(e.error, e.message, e.stackTrace);
};
function Rs(e, t) {
  Ki(e, t.message, t.stack || "");
}
function tr(e, t) {
  Bi().then(({ showNotification: r }) => {
    r({
      type: Ur.ERROR,
      message: "Copilot internal error",
      details: e + (t ? `
${t}` : "")
    });
  }), Ir("error", `${e}
\`\`\`${t}\`\`\``);
}
const js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  handleBrowserOperationError: Rs,
  handleCopilotError: tr,
  handleErrorDuringOperation: Vs,
  handleServerOperationErrorIfNeeded: Ts
}, Symbol.toStringTag, { value: "Module" })), Fi = window.Vaadin.copilot._previewState;
if (!Fi)
  throw new Error("Tried to access copilot preview state before it was initialized.");
const Hi = () => {
  Ms().then((e) => b.setUserInfo(e)).catch((e) => tr("Failed to load userInfo", e));
}, Ms = async () => Si(`${Le}get-user-info`, {}, (e) => (delete e.data.reqId, e.data)), Ls = async () => Ai(() => b.userInfo), Il = async () => (await Ls()).vaadiner;
x.on("copilot-prokey-received", (e) => {
  Hi(), e.preventDefault();
});
function Is() {
  const e = window.navigator.userAgent;
  return e.indexOf("Windows") !== -1 ? "Windows" : e.indexOf("Mac") !== -1 ? "Mac" : e.indexOf("Linux") !== -1 ? "Linux" : null;
}
function Us() {
  return Is() === "Mac";
}
function zs() {
  return Us() ? "⌘" : "Ctrl";
}
const qi = window.Vaadin.copilot._machineState;
if (!qi)
  throw new Error("Trying to use stored machine state before it was initialized");
function Bs(e) {
  return e.composed && e.composedPath().map((t) => t.localName).some((t) => t === "copilot-spotlight");
}
function Ks(e) {
  return e.composed && e.composedPath().map((t) => t.localName).some((t) => t === "copilot-drawer-panel" || t === "copilot-section-panel-wrapper");
}
let lr = !1, Et = 0;
const mn = (e) => {
  if (qi.isActivationShortcut())
    if (e.key === "Shift" && !e.ctrlKey && !e.altKey && !e.metaKey)
      lr = !0;
    else if (lr && e.shiftKey && (e.key === "Control" || e.key === "Meta")) {
      if (Et++, Et === 2) {
        b.toggleActive("shortcut");
        return;
      }
      setTimeout(() => {
        Et = 0;
      }, 500);
    } else
      lr = !1, Et = 0;
  b.active && Fs(e);
}, Fs = (e) => {
  const t = Bs(e);
  if (e.shiftKey && e.code === "Space")
    b.setSpotlightActive(!b.spotlightActive), e.stopPropagation(), e.preventDefault();
  else if (e.key === "Escape") {
    if (e.stopPropagation(), b.loginCheckActive) {
      b.setLoginCheckActive(!1);
      return;
    }
    x.emit("close-drawers", {}), b.setSpotlightActive(!1);
  } else !Ks(e) && !t && Hs(e) ? (x.emit("delete-selected", {}), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "d" && !t ? (x.emit("duplicate-selected", {}), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "b" && !t ? (x.emit("show-selected-in-ide", {}), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "z" ? b.idePluginState?.supportedActions?.find((r) => r === "undo") && (x.emit("undoRedo", { undo: !e.shiftKey }), e.preventDefault(), e.stopPropagation()) : (e.ctrlKey || e.metaKey) && e.key === "c" && !t && (x.emit("copy-selected", {}), e.preventDefault(), e.stopPropagation());
}, Hs = (e) => (e.key === "Backspace" || e.key === "Delete") && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey, oe = zs(), Ul = {
  toggleCopilot: `<kbd>⇧</kbd> + <kbd>${oe}</kbd> <kbd>${oe}</kbd>`,
  toggleCommandWindow: "<kbd>⇧</kbd> + <kbd>Space</kbd>",
  undo: `<kbd>${oe}</kbd> + <kbd>Z</kbd>`,
  redo: `<kbd>${oe}</kbd> + <kbd>⇧</kbd> + <kbd>Z</kbd>`,
  duplicate: `<kbd>${oe}</kbd> + <kbd>D</kbd>`,
  goToSource: `<kbd>${oe}</kbd> + <kbd>B</kbd>`,
  selectParent: "<kbd>←</kbd>",
  selectPreviousSibling: "<kbd>↑</kbd>",
  selectNextSibling: "<kbd>↓</kbd>",
  delete: "<kbd>DEL</kbd>",
  copy: `<kbd>${oe}</kbd> + <kbd>C</kbd>`,
  paste: `<kbd>${oe}</kbd> + <kbd>V</kbd>`
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wi = Symbol.for(""), qs = (e) => {
  if (e?.r === Wi) return e?._$litStatic$;
}, Gi = (e) => ({ _$litStatic$: e, r: Wi }), yn = /* @__PURE__ */ new Map(), Ws = (e) => (t, ...r) => {
  const n = r.length;
  let i, o;
  const a = [], l = [];
  let s, c = 0, u = !1;
  for (; c < n; ) {
    for (s = t[c]; c < n && (o = r[c], (i = qs(o)) !== void 0); ) s += i + t[++c], u = !0;
    c !== n && l.push(o), a.push(s), c++;
  }
  if (c === n && a.push(t[n]), u) {
    const d = a.join("$$lit$$");
    (t = yn.get(d)) === void 0 && (a.raw = a, yn.set(d, t = a)), r = l;
  }
  return e(t, ...r);
}, Ut = Ws(It);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Gs } = ws, wn = () => document.createComment(""), Ze = (e, t, r) => {
  const n = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
  if (r === void 0) {
    const o = n.insertBefore(wn(), i), a = n.insertBefore(wn(), i);
    r = new Gs(o, a, e, e.options);
  } else {
    const o = r._$AB.nextSibling, a = r._$AM, l = a !== e;
    if (l) {
      let s;
      r._$AQ?.(e), r._$AM = e, r._$AP !== void 0 && (s = e._$AU) !== a._$AU && r._$AP(s);
    }
    if (o !== i || l) {
      let s = r._$AA;
      for (; s !== o; ) {
        const c = s.nextSibling;
        n.insertBefore(s, i), s = c;
      }
    }
  }
  return r;
}, pe = (e, t, r = e) => (e._$AI(t, r), e), Xs = {}, Js = (e, t = Xs) => e._$AH = t, Zs = (e) => e._$AH, cr = (e) => {
  e._$AP?.(!1, !0);
  let t = e._$AA;
  const r = e._$AB.nextSibling;
  for (; t !== r; ) {
    const n = t.nextSibling;
    t.remove(), t = n;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const On = (e, t, r) => {
  const n = /* @__PURE__ */ new Map();
  for (let i = t; i <= r; i++) n.set(e[i], i);
  return n;
}, Xi = Ui(class extends zi {
  constructor(e) {
    if (super(e), e.type !== Ii.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, r) {
    let n;
    r === void 0 ? r = t : t !== void 0 && (n = t);
    const i = [], o = [];
    let a = 0;
    for (const l of e) i[a] = n ? n(l, a) : a, o[a] = r(l, a), a++;
    return { values: o, keys: i };
  }
  render(e, t, r) {
    return this.dt(e, t, r).values;
  }
  update(e, [t, r, n]) {
    const i = Zs(e), { values: o, keys: a } = this.dt(t, r, n);
    if (!Array.isArray(i)) return this.ut = a, o;
    const l = this.ut ??= [], s = [];
    let c, u, d = 0, v = i.length - 1, g = 0, _ = o.length - 1;
    for (; d <= v && g <= _; ) if (i[d] === null) d++;
    else if (i[v] === null) v--;
    else if (l[d] === a[g]) s[g] = pe(i[d], o[g]), d++, g++;
    else if (l[v] === a[_]) s[_] = pe(i[v], o[_]), v--, _--;
    else if (l[d] === a[_]) s[_] = pe(i[d], o[_]), Ze(e, s[_ + 1], i[d]), d++, _--;
    else if (l[v] === a[g]) s[g] = pe(i[v], o[g]), Ze(e, i[d], i[v]), v--, g++;
    else if (c === void 0 && (c = On(a, g, _), u = On(l, d, v)), c.has(l[d])) if (c.has(l[v])) {
      const w = u.get(a[g]), S = w !== void 0 ? i[w] : null;
      if (S === null) {
        const G = Ze(e, i[d]);
        pe(G, o[g]), s[g] = G;
      } else s[g] = pe(S, o[g]), Ze(e, i[d], S), i[w] = null;
      g++;
    } else cr(i[v]), v--;
    else cr(i[d]), d++;
    for (; g <= _; ) {
      const w = Ze(e, s[_ + 1]);
      pe(w, o[g]), s[g++] = w;
    }
    for (; d <= v; ) {
      const w = i[d++];
      w !== null && cr(w);
    }
    return this.ut = a, Js(e, s), ce;
  }
}), xt = /* @__PURE__ */ new Map(), Ys = (e) => {
  const r = bt.panels.filter((n) => !n.floating && n.panel === e).sort((n, i) => n.panelOrder - i.panelOrder);
  return Ut`
    ${Xi(
    r,
    (n) => n.tag,
    (n) => {
      const i = Gi(n.tag);
      return Ut`
                        <copilot-section-panel-wrapper panelTag="${i}">
                            <${i} slot="content"></${i}>
                        </copilot-section-panel-wrapper>`;
    }
  )}
  `;
}, Qs = () => {
  const e = bt.panels;
  return Ut`
    ${Xi(
    e.filter((t) => t.floating),
    (t) => t.tag,
    (t) => {
      const r = Gi(t.tag);
      return Ut`
                        <copilot-section-panel-wrapper panelTag="${r}">
                            <${r} slot="content"></${r}>
                        </copilot-section-panel-wrapper>`;
    }
  )}
  `;
}, zl = (e) => {
  const t = e.panelTag, r = e.querySelector('[slot="content"]');
  r && xt.set(t, r);
}, Bl = (e) => {
  if (xt.has(e.panelTag)) {
    const t = xt.get(e.panelTag);
    e.querySelector('[slot="content"]').replaceWith(t);
  }
  xt.delete(e.panelTag);
};
var N = [];
for (var ur = 0; ur < 256; ++ur)
  N.push((ur + 256).toString(16).slice(1));
function el(e, t = 0) {
  return (N[e[t + 0]] + N[e[t + 1]] + N[e[t + 2]] + N[e[t + 3]] + "-" + N[e[t + 4]] + N[e[t + 5]] + "-" + N[e[t + 6]] + N[e[t + 7]] + "-" + N[e[t + 8]] + N[e[t + 9]] + "-" + N[e[t + 10]] + N[e[t + 11]] + N[e[t + 12]] + N[e[t + 13]] + N[e[t + 14]] + N[e[t + 15]]).toLowerCase();
}
var At, tl = new Uint8Array(16);
function rl() {
  if (!At && (At = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !At))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return At(tl);
}
var nl = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const En = {
  randomUUID: nl
};
function il(e, t, r) {
  if (En.randomUUID && !t && !e)
    return En.randomUUID();
  e = e || {};
  var n = e.random || (e.rng || rl)();
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, el(n);
}
const Dt = [], Ye = [], Kl = async (e, t, r) => {
  let n, i;
  t.reqId = il();
  const o = new Promise((a, l) => {
    n = a, i = l;
  });
  return Dt.push({
    handleMessage(a) {
      if (a?.data?.reqId !== t.reqId)
        return !1;
      try {
        n(r(a));
      } catch (l) {
        i(l.toString());
      }
      return !0;
    }
  }), Ie(e, t), o;
};
function ol(e) {
  for (const t of Dt)
    if (t.handleMessage(e))
      return Dt.splice(Dt.indexOf(t), 1), !0;
  if (x.emitUnsafe({ type: e.command, data: e.data }))
    return !0;
  for (const t of Zi())
    if (Ji(t, e))
      return !0;
  return Ye.push(e), !1;
}
function Ji(e, t) {
  return e.handleMessage?.call(e, t);
}
function al() {
  if (Ye.length)
    for (const e of Zi())
      for (let t = 0; t < Ye.length; t++)
        Ji(e, Ye[t]) && (Ye.splice(t, 1), t--);
}
function Zi() {
  const e = document.querySelector("copilot-main");
  return e ? e.renderRoot.querySelectorAll("copilot-section-panel-wrapper *") : [];
}
const sl = ":host{--gray-h: 220;--gray-s: 30%;--gray-l: 30%;--gray-hsl: var(--gray-h) var(--gray-s) var(--gray-l);--gray: hsl(var(--gray-hsl));--gray-50: hsl(var(--gray-hsl) / .05);--gray-100: hsl(var(--gray-hsl) / .1);--gray-150: hsl(var(--gray-hsl) / .16);--gray-200: hsl(var(--gray-hsl) / .24);--gray-250: hsl(var(--gray-hsl) / .34);--gray-300: hsl(var(--gray-hsl) / .46);--gray-350: hsl(var(--gray-hsl) / .6);--gray-400: hsl(var(--gray-hsl) / .7);--gray-450: hsl(var(--gray-hsl) / .8);--gray-500: hsl(var(--gray-hsl) / .9);--gray-550: hsl(var(--gray-hsl));--gray-600: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 2%));--gray-650: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 4%));--gray-700: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 8%));--gray-750: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 12%));--gray-800: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 20%));--gray-850: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 23%));--gray-900: hsl(var(--gray-h) var(--gray-s) calc(var(--gray-l) - 30%));--blue-h: 220;--blue-s: 90%;--blue-l: 53%;--blue-hsl: var(--blue-h) var(--blue-s) var(--blue-l);--blue: hsl(var(--blue-hsl));--blue-50: hsl(var(--blue-hsl) / .05);--blue-100: hsl(var(--blue-hsl) / .1);--blue-150: hsl(var(--blue-hsl) / .2);--blue-200: hsl(var(--blue-hsl) / .3);--blue-250: hsl(var(--blue-hsl) / .4);--blue-300: hsl(var(--blue-hsl) / .5);--blue-350: hsl(var(--blue-hsl) / .6);--blue-400: hsl(var(--blue-hsl) / .7);--blue-450: hsl(var(--blue-hsl) / .8);--blue-500: hsl(var(--blue-hsl) / .9);--blue-550: hsl(var(--blue-hsl));--blue-600: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 4%));--blue-650: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 8%));--blue-700: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 12%));--blue-750: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 15%));--blue-800: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 18%));--blue-850: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 24%));--blue-900: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) - 27%));--purple-h: 246;--purple-s: 90%;--purple-l: 60%;--purple-hsl: var(--purple-h) var(--purple-s) var(--purple-l);--purple: hsl(var(--purple-hsl));--purple-50: hsl(var(--purple-hsl) / .05);--purple-100: hsl(var(--purple-hsl) / .1);--purple-150: hsl(var(--purple-hsl) / .2);--purple-200: hsl(var(--purple-hsl) / .3);--purple-250: hsl(var(--purple-hsl) / .4);--purple-300: hsl(var(--purple-hsl) / .5);--purple-350: hsl(var(--purple-hsl) / .6);--purple-400: hsl(var(--purple-hsl) / .7);--purple-450: hsl(var(--purple-hsl) / .8);--purple-500: hsl(var(--purple-hsl) / .9);--purple-550: hsl(var(--purple-hsl));--purple-600: hsl(var(--purple-h) calc(var(--purple-s) - 4%) calc(var(--purple-l) - 2%));--purple-650: hsl(var(--purple-h) calc(var(--purple-s) - 8%) calc(var(--purple-l) - 4%));--purple-700: hsl(var(--purple-h) calc(var(--purple-s) - 15%) calc(var(--purple-l) - 7%));--purple-750: hsl(var(--purple-h) calc(var(--purple-s) - 23%) calc(var(--purple-l) - 11%));--purple-800: hsl(var(--purple-h) calc(var(--purple-s) - 24%) calc(var(--purple-l) - 15%));--purple-850: hsl(var(--purple-h) calc(var(--purple-s) - 24%) calc(var(--purple-l) - 19%));--purple-900: hsl(var(--purple-h) calc(var(--purple-s) - 27%) calc(var(--purple-l) - 23%));--green-h: 150;--green-s: 80%;--green-l: 42%;--green-hsl: var(--green-h) var(--green-s) var(--green-l);--green: hsl(var(--green-hsl));--green-50: hsl(var(--green-hsl) / .05);--green-100: hsl(var(--green-hsl) / .1);--green-150: hsl(var(--green-hsl) / .2);--green-200: hsl(var(--green-hsl) / .3);--green-250: hsl(var(--green-hsl) / .4);--green-300: hsl(var(--green-hsl) / .5);--green-350: hsl(var(--green-hsl) / .6);--green-400: hsl(var(--green-hsl) / .7);--green-450: hsl(var(--green-hsl) / .8);--green-500: hsl(var(--green-hsl) / .9);--green-550: hsl(var(--green-hsl));--green-600: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 2%));--green-650: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 4%));--green-700: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 8%));--green-750: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 12%));--green-800: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 15%));--green-850: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 19%));--green-900: hsl(var(--green-h) var(--green-s) calc(var(--green-l) - 23%));--yellow-h: 38;--yellow-s: 98%;--yellow-l: 64%;--yellow-hsl: var(--yellow-h) var(--yellow-s) var(--yellow-l);--yellow: hsl(var(--yellow-hsl));--yellow-50: hsl(var(--yellow-hsl) / .07);--yellow-100: hsl(var(--yellow-hsl) / .12);--yellow-150: hsl(var(--yellow-hsl) / .2);--yellow-200: hsl(var(--yellow-hsl) / .3);--yellow-250: hsl(var(--yellow-hsl) / .4);--yellow-300: hsl(var(--yellow-hsl) / .5);--yellow-350: hsl(var(--yellow-hsl) / .6);--yellow-400: hsl(var(--yellow-hsl) / .7);--yellow-450: hsl(var(--yellow-hsl) / .8);--yellow-500: hsl(var(--yellow-hsl) / .9);--yellow-550: hsl(var(--yellow-hsl));--yellow-600: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 5%));--yellow-650: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 10%));--yellow-700: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 15%));--yellow-750: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 20%));--yellow-800: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 25%));--yellow-850: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 30%));--yellow-900: hsl(var(--yellow-h) var(--yellow-s) calc(var(--yellow-l) - 35%));--red-h: 355;--red-s: 75%;--red-l: 55%;--red-hsl: var(--red-h) var(--red-s) var(--red-l);--red: hsl(var(--red-hsl));--red-50: hsl(var(--red-hsl) / .05);--red-100: hsl(var(--red-hsl) / .1);--red-150: hsl(var(--red-hsl) / .2);--red-200: hsl(var(--red-hsl) / .3);--red-250: hsl(var(--red-hsl) / .4);--red-300: hsl(var(--red-hsl) / .5);--red-350: hsl(var(--red-hsl) / .6);--red-400: hsl(var(--red-hsl) / .7);--red-450: hsl(var(--red-hsl) / .8);--red-500: hsl(var(--red-hsl) / .9);--red-550: hsl(var(--red-hsl));--red-600: hsl(var(--red-h) calc(var(--red-s) - 5%) calc(var(--red-l) - 2%));--red-650: hsl(var(--red-h) calc(var(--red-s) - 10%) calc(var(--red-l) - 4%));--red-700: hsl(var(--red-h) calc(var(--red-s) - 15%) calc(var(--red-l) - 8%));--red-750: hsl(var(--red-h) calc(var(--red-s) - 20%) calc(var(--red-l) - 12%));--red-800: hsl(var(--red-h) calc(var(--red-s) - 25%) calc(var(--red-l) - 15%));--red-850: hsl(var(--red-h) calc(var(--red-s) - 30%) calc(var(--red-l) - 19%));--red-900: hsl(var(--red-h) calc(var(--red-s) - 35%) calc(var(--red-l) - 23%));--codeblock-bg: #f4f4f4;--vaadin-logo-blue: #00b4f0}:host(.dark){--gray-s: 15%;--gray-l: 70%;--gray-600: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 6%));--gray-650: hsl(var(--gray-h) calc(var(--gray-s) - 5%) calc(var(--gray-l) + 14%));--gray-700: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 26%));--gray-750: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 36%));--gray-800: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 48%));--gray-850: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 62%));--gray-900: hsl(var(--gray-h) calc(var(--gray-s) - 2%) calc(var(--gray-l) + 70%));--blue-s: 90%;--blue-l: 58%;--blue-600: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 6%));--blue-650: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 12%));--blue-700: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 17%));--blue-750: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 22%));--blue-800: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 28%));--blue-850: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 35%));--blue-900: hsl(var(--blue-h) var(--blue-s) calc(var(--blue-l) + 43%));--purple-600: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 4%));--purple-650: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 9%));--purple-700: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 12%));--purple-750: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 18%));--purple-800: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 24%));--purple-850: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 29%));--purple-900: hsl(var(--purple-h) var(--purple-s) calc(var(--purple-l) + 33%));--green-600: hsl(calc(var(--green-h) - 1) calc(var(--green-s) - 5%) calc(var(--green-l) + 5%));--green-650: hsl(calc(var(--green-h) - 2) calc(var(--green-s) - 10%) calc(var(--green-l) + 12%));--green-700: hsl(calc(var(--green-h) - 4) calc(var(--green-s) - 15%) calc(var(--green-l) + 20%));--green-750: hsl(calc(var(--green-h) - 6) calc(var(--green-s) - 20%) calc(var(--green-l) + 29%));--green-800: hsl(calc(var(--green-h) - 8) calc(var(--green-s) - 25%) calc(var(--green-l) + 37%));--green-850: hsl(calc(var(--green-h) - 10) calc(var(--green-s) - 30%) calc(var(--green-l) + 42%));--green-900: hsl(calc(var(--green-h) - 12) calc(var(--green-s) - 35%) calc(var(--green-l) + 48%));--yellow-600: hsl(calc(var(--yellow-h) + 1) var(--yellow-s) calc(var(--yellow-l) + 4%));--yellow-650: hsl(calc(var(--yellow-h) + 2) var(--yellow-s) calc(var(--yellow-l) + 7%));--yellow-700: hsl(calc(var(--yellow-h) + 4) var(--yellow-s) calc(var(--yellow-l) + 11%));--yellow-750: hsl(calc(var(--yellow-h) + 6) var(--yellow-s) calc(var(--yellow-l) + 16%));--yellow-800: hsl(calc(var(--yellow-h) + 8) var(--yellow-s) calc(var(--yellow-l) + 20%));--yellow-850: hsl(calc(var(--yellow-h) + 10) var(--yellow-s) calc(var(--yellow-l) + 24%));--yellow-900: hsl(calc(var(--yellow-h) + 12) var(--yellow-s) calc(var(--yellow-l) + 29%));--red-600: hsl(calc(var(--red-h) - 1) calc(var(--red-s) - 5%) calc(var(--red-l) + 3%));--red-650: hsl(calc(var(--red-h) - 2) calc(var(--red-s) - 10%) calc(var(--red-l) + 7%));--red-700: hsl(calc(var(--red-h) - 4) calc(var(--red-s) - 15%) calc(var(--red-l) + 14%));--red-750: hsl(calc(var(--red-h) - 6) calc(var(--red-s) - 20%) calc(var(--red-l) + 19%));--red-800: hsl(calc(var(--red-h) - 8) calc(var(--red-s) - 25%) calc(var(--red-l) + 24%));--red-850: hsl(calc(var(--red-h) - 10) calc(var(--red-s) - 30%) calc(var(--red-l) + 30%));--red-900: hsl(calc(var(--red-h) - 12) calc(var(--red-s) - 35%) calc(var(--red-l) + 36%));--codeblock-bg: var(--gray-100)}", ll = ":host{--font-family: Inter, system-ui, ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;--monospace-font-family: Inconsolata, Monaco, Consolas, Courier New, Courier, monospace;--font-size-0: .6875rem;--font-size-1: .75rem;--font-size-2: .875rem;--font-size-3: 1rem;--font-size-4: 1.125rem;--font-size-5: 1.25rem;--font-size-6: 1.375rem;--font-size-7: 1.5rem;--line-height-1: 1.125rem;--line-height-2: 1.25rem;--line-height-3: 1.5rem;--line-height-4: 1.75rem;--line-height-5: 2rem;--line-height-6: 2.25rem;--line-height-7: 2.5rem;--font-weight-bold: 500;--font-weight-strong: 600;--font: normal 400 var(--font-size-3) / var(--line-height-3) var(--font-family);--font-bold: normal var(--font-weight-bold) var(--font-size-3) / var(--line-height-3) var(--font-family);--font-strong: normal var(--font-weight-strong) var(--font-size-3) / var(--line-height-3) var(--font-family);--font-small: normal 400 var(--font-size-2) / var(--line-height-2) var(--font-family);--font-small-bold: normal var(--font-weight-bold) var(--font-size-2) / var(--line-height-2) var(--font-family);--font-small-strong: normal var(--font-weight-strong) var(--font-size-2) / var(--line-height-2) var(--font-family);--font-xsmall: normal 400 var(--font-size-1) / var(--line-height-1) var(--font-family);--font-xsmall-bold: normal var(--font-weight-bold) var(--font-size-1) / var(--line-height-1) var(--font-family);--font-xsmall-strong: normal var(--font-weight-strong) var(--font-size-1) / var(--line-height-1) var(--font-family);--font-button: normal var(--font-weight-bold) var(--font-size-1) / var(--line-height-1) var(--font-family);--font-tooltip: normal var(--font-weight-bold) var(--font-size-1) / var(--line-height-2) var(--font-family);--radius-1: .1875rem;--radius-2: .375rem;--radius-3: .75rem;--space-25: 2px;--space-50: 4px;--space-75: 6px;--space-100: 8px;--space-150: 12px;--space-200: 16px;--space-300: 24px;--space-400: 32px;--space-500: 40px;--space-600: 48px;--space-700: 56px;--space-800: 64px;--space-900: 72px;--z-index-component-selector: 100;--z-index-floating-panel: 101;--z-index-drawer: 150;--z-index-opened-drawer: 151;--z-index-spotlight: 200;--z-index-popover: 300;--z-index-activation-button: 1000;--duration-1: .1s;--duration-2: .2s;--duration-3: .3s;--duration-4: .4s;--button-background: var(--gray-100);--button-background-hover: var(--gray-150)}:host{--lumo-font-family: var(--font-family);--lumo-font-size-xs: var(--font-size-1);--lumo-font-size-s: var(--font-size-2);--lumo-font-size-m: var(--font-size-3);--lumo-font-size-l: var(--font-size-4);--lumo-font-size-xl: var(--font-size-5);--lumo-font-size-xxl: var(--font-size-6);--lumo-font-size-xxxl: var(--font-size-7);--lumo-line-height-s: var(--line-height-2);--lumo-line-height-m: var(--line-height-3);--lumo-line-height-l: var(--line-height-4);--lumo-border-radius-s: var(--radius-1);--lumo-border-radius-m: var(--radius-2);--lumo-border-radius-l: var(--radius-3);--lumo-base-color: var(--surface-0);--lumo-body-text-color: var(--color-high-contrast);--lumo-header-text-color: var(--color-high-contrast);--lumo-secondary-text-color: var(--color);--lumo-tertiary-text-color: var(--color);--lumo-error-text-color: var(--color-danger);--lumo-primary-text-color: var(--color-high-contrast);--lumo-primary-color: var(--background-button-primary);--lumo-primary-color-50pct: var(--color-accent);--lumo-primary-contrast-color: var(--lumo-secondary-text-color);--lumo-space-xs: var(--space-50);--lumo-space-s: var(--space-100);--lumo-space-m: var(--space-200);--lumo-space-l: var(--space-300);--lumo-space-xl: var(--space-500);--lumo-icon-size-xs: var(--font-size-1);--lumo-icon-size-s: var(--font-size-2);--lumo-icon-size-m: var(--font-size-3);--lumo-icon-size-l: var(--font-size-4);--lumo-icon-size-xl: var(--font-size-5)}:host{color-scheme:light;--surface-0: hsl(var(--gray-h) var(--gray-s) 90% / .8);--surface-1: hsl(var(--gray-h) var(--gray-s) 95% / .8);--surface-2: hsl(var(--gray-h) var(--gray-s) 100% / .8);--surface-background: linear-gradient( hsl(var(--gray-h) var(--gray-s) 95% / .7), hsl(var(--gray-h) var(--gray-s) 95% / .65) );--surface-glow: radial-gradient(circle at 30% 0%, hsl(var(--gray-h) var(--gray-s) 98% / .7), transparent 50%);--surface-border-glow: radial-gradient(at 50% 50%, hsl(var(--purple-h) 90% 90% / .8) 0, transparent 50%);--surface: var(--surface-glow) no-repeat border-box, var(--surface-background) no-repeat padding-box, hsl(var(--gray-h) var(--gray-s) 98% / .2);--surface-with-border-glow: var(--surface-glow) no-repeat border-box, var(--surface-background) no-repeat padding-box, var(--surface-border-glow) no-repeat border-box 0 0 / var(--glow-size, 600px) var(--glow-size, 600px);--surface-border-color: hsl(var(--gray-h) var(--gray-s) 100% / .7);--surface-backdrop-filter: blur(10px);--surface-box-shadow-1: 0 0 0 .5px hsl(var(--gray-h) var(--gray-s) 5% / .15), 0 6px 12px -1px hsl(var(--shadow-hsl) / .3);--surface-box-shadow-2: 0 0 0 .5px hsl(var(--gray-h) var(--gray-s) 5% / .15), 0 24px 40px -4px hsl(var(--shadow-hsl) / .4);--background-button: linear-gradient( hsl(var(--gray-h) var(--gray-s) 98% / .4), hsl(var(--gray-h) var(--gray-s) 90% / .2) );--background-button-active: hsl(var(--gray-h) var(--gray-s) 80% / .2);--color: var(--gray-500);--color-high-contrast: var(--gray-900);--color-accent: var(--purple-700);--color-danger: var(--red-700);--border-color: var(--gray-150);--border-color-high-contrast: var(--gray-300);--border-color-button: var(--gray-350);--border-color-popover: hsl(var(--gray-hsl) / .08);--border-color-dialog: hsl(var(--gray-hsl) / .08);--accent-color: var(--purple-600);--selection-color: hsl(var(--blue-hsl));--shadow-hsl: var(--gray-h) var(--gray-s) 20%;--lumo-contrast-5pct: var(--gray-100);--lumo-contrast-10pct: var(--gray-200);--lumo-contrast-60pct: var(--gray-400);--lumo-contrast-80pct: var(--gray-600);--lumo-contrast-90pct: var(--gray-800);--card-bg: rgba(255, 255, 255, .5);--card-hover-bg: rgba(255, 255, 255, .65);--card-open-bg: rgba(255, 255, 255, .8);--card-border: 1px solid rgba(0, 50, 100, .15);--card-open-shadow: 0px 1px 4px -1px rgba(28, 52, 84, .26);--card-section-border: var(--card-border);--card-field-bg: var(--lumo-contrast-5pct)}:host(.dark){color-scheme:dark;--surface-0: hsl(var(--gray-h) var(--gray-s) 10% / .85);--surface-1: hsl(var(--gray-h) var(--gray-s) 14% / .85);--surface-2: hsl(var(--gray-h) var(--gray-s) 18% / .85);--surface-background: linear-gradient( hsl(var(--gray-h) var(--gray-s) 8% / .65), hsl(var(--gray-h) var(--gray-s) 8% / .7) );--surface-glow: radial-gradient( circle at 30% 0%, hsl(var(--gray-h) calc(var(--gray-s) * 2) 90% / .12), transparent 50% );--surface: var(--surface-glow) no-repeat border-box, var(--surface-background) no-repeat padding-box, hsl(var(--gray-h) var(--gray-s) 20% / .4);--surface-border-glow: hsl(var(--gray-h) var(--gray-s) 20% / .4) radial-gradient(at 50% 50%, hsl(250 40% 80% / .4) 0, transparent 50%);--surface-border-color: hsl(var(--gray-h) var(--gray-s) 50% / .2);--surface-box-shadow-1: 0 0 0 .5px hsl(var(--purple-h) 40% 5% / .4), 0 6px 12px -1px hsl(var(--shadow-hsl) / .4);--surface-box-shadow-2: 0 0 0 .5px hsl(var(--purple-h) 40% 5% / .4), 0 24px 40px -4px hsl(var(--shadow-hsl) / .5);--color: var(--gray-650);--background-button: linear-gradient( hsl(var(--gray-h) calc(var(--gray-s) * 2) 80% / .1), hsl(var(--gray-h) calc(var(--gray-s) * 2) 80% / 0) );--background-button-active: hsl(var(--gray-h) var(--gray-s) 10% / .1);--border-color-popover: hsl(var(--gray-h) var(--gray-s) 90% / .1);--border-color-dialog: hsl(var(--gray-h) var(--gray-s) 90% / .1);--shadow-hsl: 0 0% 0%;--lumo-disabled-text-color: var(--lumo-contrast-60pct);--card-bg: rgba(255, 255, 255, .05);--card-hover-bg: rgba(255, 255, 255, .065);--card-open-bg: rgba(255, 255, 255, .1);--card-border: 1px solid rgba(255, 255, 255, .11);--card-open-shadow: 0px 1px 4px -1px rgba(0, 0, 0, .26);--card-section-border: var(--card-border);--card-field-bg: var(--lumo-contrast-10pct)}", cl = "button{-webkit-appearance:none;appearance:none;background:var(--background-button);background-origin:border-box;font:var(--font-button);color:var(--color-high-contrast);border:1px solid var(--border-color);border-radius:var(--radius-2);padding:var(--space-25) var(--space-100)}button:focus-visible{outline:2px solid var(--blue-500);outline-offset:2px}button:active:not(:disabled){background:var(--background-button-active)}button:disabled{color:var(--gray-400);background:transparent}", ul = ":is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay){z-index:var(--z-index-popover)}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay):first-of-type{padding-top:0}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay)::part(overlay){color:inherit;font:inherit;background:var(--surface);-webkit-backdrop-filter:var(--surface-backdrop-filter);backdrop-filter:var(--surface-backdrop-filter);border-radius:var(--radius-2);border:1px solid var(--surface-border-color);box-shadow:var(--surface-box-shadow-1)}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay)::part(content){padding:var(--space-50)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item){color:var(--color-high-contrast);font:var(--font-small);display:flex;align-items:center;cursor:default;padding:var(--space-75) var(--space-100);min-height:0;border-radius:var(--radius-1);--_lumo-item-selected-icon-display: none}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item)[disabled],:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item)[disabled] .hint,:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item)[disabled] vaadin-icon{color:var(--lumo-disabled-text-color)}:is(vaadin-context-menu-item,vaadin-menu-bar-item)[expanded]{background:var(--gray-200)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item):not([disabled]):hover{background:var(--color-high-contrast);color:var(--surface-2);--lumo-tertiary-text-color: var(--surface-2);--color: currentColor;--border-color: var(--surface-0)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item)[focus-ring]{outline:2px solid var(--selection-color);outline-offset:-2px}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item):is([aria-haspopup=true]):after{margin-inline-end:calc(var(--space-200) * -1);margin-right:unset}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item).danger{color:var(--color-danger);--color: currentColor}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item).danger:not([disabled]):hover{background-color:var(--color-danger)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item)::part(content){display:flex;align-items:center;gap:var(--space-100)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item,vaadin-combo-box-item) vaadin-icon{width:1em;height:1em;padding:0;color:var(--color)}:is(vaadin-context-menu-overlay,vaadin-select-overlay,vaadin-menu-bar-overlay) hr{margin:var(--space-50)}:is(vaadin-context-menu-item,vaadin-select-item,vaadin-menu-bar-item) .label{padding-inline-end:var(--space-300)}:is(vaadin-context-menu-item,vaadin-select-item,vaadin-menu-bar-item) .hint{margin-inline-start:auto;color:var(--color)}:is(vaadin-context-menu-item,vaadin-menu-bar-item,vaadin-select-item) kbd{display:inline-block;border-radius:var(--radius-1);border:1px solid var(--border-color);min-width:1em;min-height:1em;text-align:center;margin:0 .1em;padding:.1em .25em;box-sizing:border-box;font-size:var(--font-size-1);font-family:var(--font-family);line-height:1}:is(copilot-alignment-overlay)::part(content){padding:0}:is(.padding-values-overlay){--lumo-base-color: var(--selection-color);--color-high-contrast: white}:is(.padding-values-overlay) vaadin-combo-box-item:hover{color:#272c35d9}", dl = "code.codeblock{background:var(--codeblock-bg);border-radius:var(--radius-2);display:block;font-family:var(--monospace-font-family);font-size:var(--font-size-1);line-height:var(--line-height-1);overflow:hidden;padding:.3125rem 1.75rem .3125rem var(--space-100);position:relative;text-overflow:ellipsis;white-space:pre}copilot-copy{position:absolute;right:0;top:0}copilot-copy button{align-items:center;background:none;border:1px solid transparent;border-radius:var(--radius-2);color:var(--color);display:flex;font:var(--font-button);height:1.75rem;justify-content:center;padding:0;width:1.75rem}copilot-copy button:hover{color:var(--color-high-contrast)}", hl = "vaadin-dialog-overlay::part(overlay){background:#fff}vaadin-dialog-overlay::part(content){background:var(--surface);font:var(--font-xsmall);padding:var(--space-300)}vaadin-dialog-overlay::part(header){background:var(--surface);font:var(--font-xsmall-strong);border-bottom:1px solid var(--border-color);padding:var(--space-100) var(--space-150)}vaadin-dialog-overlay::part(footer){background:var(--surface);padding:var(--space-150)}vaadin-dialog-overlay::part(header-content){display:flex;line-height:normal;justify-content:space-between;width:100%;align-items:center}vaadin-dialog-overlay [slot=header-content] h2{margin:0;padding:0;font:var(--font-small-bold)}vaadin-dialog-overlay [slot=header-content] .close{line-height:0}vaadin-dialog-overlay{--vaadin-button-font-size: var(--font-size-1);--vaadin-button-height: var(--line-height-4)}vaadin-dialog-overlay vaadin-button[theme~=primary]{background-color:hsl(var(--blue-hsl))}vaadin-dialog-overlay a svg{height:12px;width:12px}.dialog-footer vaadin-button{--vaadin-button-primary-background: var(--button-background);--vaadin-button-border-radius: var(--radius-1);--vaadin-button-primary-text-color: var(--color-high-contrast);--vaadin-button-height: var(--line-height-5);font:var(--font-small-bold)}.dialog-footer vaadin-button span[slot=suffix]{display:flex}.dialog-footer vaadin-button span[slot=suffix] svg{height:14px;width:14px}", fl = ":host{--vaadin-input-field-label-font-size: var(--font-size-1);--vaadin-select-label-font-size: var(--font-size-1);--vaadin-input-field-helper-font-size: var(--font-size-0);--vaadin-button-font-size: var(--font-size-2);--vaadin-checkbox-label-font-size: var(--font-size-1);--vaadin-input-field-background: var(--lumo-contrast-10pct);--vaadin-input-field-height: 26px;--vaadin-input-field-value-font-size: var(--font-xsmall)}";
var Fl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Hl(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var zr = { exports: {} };
function Yi(e, t = 100, r = {}) {
  if (typeof e != "function")
    throw new TypeError(`Expected the first parameter to be a function, got \`${typeof e}\`.`);
  if (t < 0)
    throw new RangeError("`wait` must not be negative.");
  const { immediate: n } = typeof r == "boolean" ? { immediate: r } : r;
  let i, o, a, l, s;
  function c() {
    const v = i, g = o;
    return i = void 0, o = void 0, s = e.apply(v, g), s;
  }
  function u() {
    const v = Date.now() - l;
    v < t && v >= 0 ? a = setTimeout(u, t - v) : (a = void 0, n || (s = c()));
  }
  const d = function(...v) {
    if (i && this !== i)
      throw new Error("Debounced method called with different contexts.");
    i = this, o = v, l = Date.now();
    const g = n && !a;
    return a || (a = setTimeout(u, t)), g && (s = c()), s;
  };
  return d.clear = () => {
    a && (clearTimeout(a), a = void 0);
  }, d.flush = () => {
    a && d.trigger();
  }, d.trigger = () => {
    s = c(), d.clear();
  }, d;
}
zr.exports.debounce = Yi;
zr.exports = Yi;
var pl = zr.exports;
const gl = /* @__PURE__ */ vl(pl);
class bl {
  constructor() {
    this.documentActive = !0, this.addListeners = () => {
      window.addEventListener("pageshow", this.handleWindowVisibilityChange), window.addEventListener("pagehide", this.handleWindowVisibilityChange), window.addEventListener("focus", this.handleWindowFocusChange), window.addEventListener("blur", this.handleWindowFocusChange), document.addEventListener("visibilitychange", this.handleDocumentVisibilityChange);
    }, this.removeListeners = () => {
      window.removeEventListener("pageshow", this.handleWindowVisibilityChange), window.removeEventListener("pagehide", this.handleWindowVisibilityChange), window.removeEventListener("focus", this.handleWindowFocusChange), window.removeEventListener("blur", this.handleWindowFocusChange), document.removeEventListener("visibilitychange", this.handleDocumentVisibilityChange);
    }, this.handleWindowVisibilityChange = (t) => {
      t.type === "pageshow" ? this.dispatch(!0) : this.dispatch(!1);
    }, this.handleWindowFocusChange = (t) => {
      t.type === "focus" ? this.dispatch(!0) : this.dispatch(!1);
    }, this.handleDocumentVisibilityChange = () => {
      this.dispatch(!document.hidden);
    }, this.dispatch = (t) => {
      if (t !== this.documentActive) {
        const r = window.Vaadin.copilot.eventbus;
        this.documentActive = t, r.emit("document-activation-change", { active: this.documentActive });
      }
    };
  }
  copilotActivated() {
    this.addListeners();
  }
  copilotDeactivated() {
    this.removeListeners();
  }
}
const An = new bl();
var _l = Object.defineProperty, ml = Object.getOwnPropertyDescriptor, yl = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? ml(t, r) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (i = (n ? a(t, r, i) : a(i)) || i);
  return n && i && _l(t, r, i), i;
};
let Sn = class extends Ns {
  constructor() {
    super(...arguments), this.removers = [], this.initialized = !1, this.toggleOperationInProgressAttr = () => {
      this.toggleAttribute("operation-in-progress", b.operationWaitsHmrUpdate !== void 0);
    }, this.operationInProgressCursorUpdateDebounceFunc = gl(this.toggleOperationInProgressAttr, 500), this.overlayOutsideClickListener = (e) => {
      st(e.target?.owner) || (b.active || st(e.detail.sourceEvent.target)) && e.preventDefault();
    };
  }
  static get styles() {
    return [
      ae(sl),
      ae(ll),
      ae(cl),
      ae(ul),
      ae(dl),
      ae(hl),
      ae(fl),
      ls`
        :host {
          position: fixed;
          inset: 0;
          z-index: 9999;
          contain: strict;
          font: var(--font-small);
          color: var(--color);
          pointer-events: all;
          cursor: var(--cursor, default);
        }

        :host([operation-in-progress]) {
          --cursor: wait;
          --lumo-clickable-cursor: wait;
        }

        :host(:not([active])) {
          visibility: hidden !important;
          pointer-events: none;
        }

        /* Hide floating panels when not active */

        :host(:not([active])) > copilot-section-panel-wrapper {
          display: none !important;
        }

        /* Keep activation button and menu visible */

        copilot-activation-button,
        .activation-button-menu {
          visibility: visible;
        }

        copilot-activation-button {
          pointer-events: auto;
        }

        a {
          color: var(--blue-600);
          text-decoration-color: var(--blue-200);
        }

        :host([user-select-none]) {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Needed to prevent a JS error because of monkey patched '_attachOverlay'. It is some scope issue, */
        /* where 'this._placeholder.parentNode' is undefined - the scope if 'this' gets messed up at some point. */
        /* We also don't want animations on the overlays to make the feel faster, so this is fine. */

        :is(
            vaadin-context-menu-overlay,
            vaadin-menu-bar-overlay,
            vaadin-select-overlay,
            vaadin-combo-box-overlay,
            vaadin-tooltip-overlay
          ):is([opening], [closing]),
        :is(
            vaadin-context-menu-overlay,
            vaadin-menu-bar-overlay,
            vaadin-select-overlay,
            vaadin-combo-box-overlay,
            vaadin-tooltip-overlay
          )::part(overlay) {
          animation: none !important;
        }

        :host(:not([active])) copilot-drawer-panel::before {
          animation: none;
        }

        /* Workaround for https://github.com/vaadin/web-components/issues/5400 */

        :host([active]) .activation-button-menu .activate,
        :host(:not([active])) .activation-button-menu .deactivate,
        :host(:not([active])) .activation-button-menu .toggle-spotlight {
          display: none;
        }
      `
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.init().catch((e) => tr("Unable to initialize copilot", e));
  }
  async init() {
    if (this.initialized)
      return;
    await window.Vaadin.copilot._machineState.initializer.promise, document.body.style.setProperty("--dev-tools-button-display", "none"), await import("./copilot-global-vars-later-C8vpmksv.js"), await import("./copilot-init-step2-DwZ9TaaV.js"), xs(), this.tabIndex = 0, Ot.hostConnectedCallback(), window.addEventListener("keydown", mn), x.onSend(this.handleSendEvent), this.removers.push(x.on("close-drawers", this.closeDrawers.bind(this))), this.removers.push(
      x.on("open-attention-required-drawer", this.openDrawerIfPanelRequiresAttention.bind(this))
    ), this.removers.push(
      x.on("set-pointer-events", (t) => {
        this.style.pointerEvents = t.detail.enable ? "" : "none";
      })
    ), this.addEventListener("mousemove", this.mouseMoveListener), this.addEventListener("dragover", this.mouseMoveListener), Je.addOverlayOutsideClickEvent();
    const e = window.matchMedia("(prefers-color-scheme: dark)");
    this.classList.toggle("dark", e.matches), e.addEventListener("change", (t) => {
      this.classList.toggle("dark", e.matches);
    }), this.reaction(
      () => b.spotlightActive,
      () => {
        ye.saveSpotlightActivation(b.spotlightActive), Array.from(this.shadowRoot.querySelectorAll("copilot-section-panel-wrapper")).filter((t) => t.panelInfo?.floating === !0).forEach((t) => {
          b.spotlightActive ? t.style.setProperty("display", "none") : t.style.removeProperty("display");
        });
      }
    ), this.reaction(
      () => b.active,
      () => {
        this.toggleAttribute("active", b.active), b.active ? this.activate() : this.deactivate(), ye.saveCopilotActivation(b.active);
      }
    ), this.reaction(
      () => b.activatedAtLeastOnce,
      () => {
        Hi(), Ds();
      }
    ), this.reaction(
      () => b.sectionPanelDragging,
      () => {
        b.sectionPanelDragging && Array.from(this.shadowRoot.children).filter((r) => r.localName.endsWith("-overlay")).forEach((r) => {
          r.close && r.close();
        });
      }
    ), this.reaction(
      () => b.operationWaitsHmrUpdate,
      () => {
        b.operationWaitsHmrUpdate ? this.operationInProgressCursorUpdateDebounceFunc() : (this.operationInProgressCursorUpdateDebounceFunc.clear(), this.toggleOperationInProgressAttr());
      }
    ), ye.getCopilotActivation() && Vr().then(() => {
      b.setActive(!0, "restore");
    }), this.removers.push(
      x.on("user-select", (t) => {
        const { allowSelection: r } = t.detail;
        this.toggleAttribute("user-select-none", !r);
      })
    ), this.initialized = !0;
  }
  /**
   * Called when Copilot is activated. Good place to start attach listeners etc.
   */
  activate() {
    Ir("activate"), Ot.activate(), An.copilotActivated(), Ps(), this.openDrawerIfPanelRequiresAttention(), document.documentElement.addEventListener("mouseleave", this.mouseLeaveListener), Je.onCopilotActivation(), x.emit("component-tree-updated", {}), Fi.loadPreviewConfiguration();
  }
  /**
   * Called when Copilot is deactivated. Good place to remove listeners etc.
   */
  deactivate() {
    this.closeDrawers(), Ot.deactivate(), An.copilotDeactivated(), document.documentElement.removeEventListener("mouseleave", this.mouseLeaveListener), Je.onCopilotDeactivation();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), Ot.hostDisconnectedCallback(), window.removeEventListener("keydown", mn), x.offSend(this.handleSendEvent), this.removers.forEach((e) => e()), this.removeEventListener("mousemove", this.mouseMoveListener), this.removeEventListener("dragover", this.mouseMoveListener), Je.removeOverlayOutsideClickEvent(), document.documentElement.removeEventListener("vaadin-overlay-outside-click", this.overlayOutsideClickListener);
  }
  handleSendEvent(e) {
    const t = e.detail.command, r = e.detail.data;
    Ie(t, r);
  }
  /**
   * Opens the attention required drawer if there is any.
   */
  openDrawerIfPanelRequiresAttention() {
    const e = bt.getAttentionRequiredPanelConfiguration();
    if (!e)
      return;
    const t = e.panel;
    if (!t || e.floating)
      return;
    const r = this.shadowRoot.querySelector(`copilot-drawer-panel[position="${t}"]`);
    r.opened = !0;
  }
  render() {
    return It`
      <copilot-activation-button
        @activation-btn-clicked="${() => {
      b.toggleActive("button"), b.setLoginCheckActive(!1);
    }}"
        @spotlight-activation-changed="${(e) => {
      b.setSpotlightActive(e.detail);
    }}"
        .spotlightOn="${b.spotlightActive}">
      </copilot-activation-button>
      <copilot-component-selector></copilot-component-selector>
      <copilot-label-editor-container></copilot-label-editor-container>
      <copilot-info-tooltip></copilot-info-tooltip>
      ${this.renderDrawer("left")} ${this.renderDrawer("right")} ${this.renderDrawer("bottom")} ${Qs()}
      <copilot-spotlight ?active=${b.spotlightActive && b.active}></copilot-spotlight>
      <copilot-login-check ?active=${b.loginCheckActive && b.active}></copilot-login-check>
      <copilot-notifications-container></copilot-notifications-container>
    `;
  }
  renderDrawer(e) {
    return It` <copilot-drawer-panel no-transition position=${e}>
      ${Ys(e)}
    </copilot-drawer-panel>`;
  }
  /**
   * Closes the open drawers if any opened unless an overlay is opened from drawer.
   */
  closeDrawers() {
    const e = this.shadowRoot.querySelectorAll(`${Le}drawer-panel`);
    if (!Array.from(e).some((o) => o.opened))
      return;
    const r = Array.from(this.shadowRoot.children).find(
      (o) => o.localName.endsWith("overlay")
    ), n = r && Je.getOwner(r);
    if (!n) {
      e.forEach((o) => {
        o.opened = !1;
      });
      return;
    }
    const i = Za(n, "copilot-drawer-panel");
    if (!i) {
      e.forEach((o) => {
        o.opened = !1;
      });
      return;
    }
    Array.from(e).filter((o) => o.position !== i.position).forEach((o) => {
      o.opened = !1;
    });
  }
  updated(e) {
    super.updated(e), this.attachActivationButtonToBody(), al();
  }
  attachActivationButtonToBody() {
    const e = document.body.querySelectorAll("copilot-activation-button");
    e.length > 1 && e[0].remove();
  }
  mouseMoveListener(e) {
    e.composedPath().find((t) => t.localName === `${Le}drawer-panel`) || this.closeDrawers();
  }
  mouseLeaveListener() {
    x.emit("close-drawers", {});
  }
};
Sn = yl([
  ss("copilot-main")
], Sn);
const wl = window.Vaadin, Ol = {
  init(e) {
    Ei(
      () => window.Vaadin.devTools,
      (t) => {
        const r = t.handleFrontendMessage;
        t.handleFrontendMessage = (n) => {
          ol(n) || r.call(t, n);
        };
      }
    );
  }
};
wl.devToolsPlugins.push(Ol);
customElements.whenDefined("vaadin-dev-tools").then(() => {
  const e = window, t = e.Vaadin.devTools.frontendConnection.onReload;
  e.Vaadin.devTools.frontendConnection.onReload = (r = "reload") => {
    t(r), e.Vaadin.copilot.eventbus.emit("java-after-update", {});
  };
});
export {
  Al as A,
  Bl as B,
  ye as C,
  E as D,
  Cs as E,
  dl as F,
  cl as G,
  Cl as H,
  Ur as I,
  Ir as J,
  Vl as K,
  ts as L,
  Ns as M,
  Zt as N,
  Ml as O,
  Le as P,
  Il as Q,
  Sl as R,
  wr as S,
  xi as T,
  jl as U,
  Nl as V,
  vl as a,
  x as b,
  Fl as c,
  Si as d,
  b as e,
  $l as f,
  Hl as g,
  tr as h,
  Dl as i,
  Tl as j,
  Kl as k,
  bt as l,
  xl as m,
  ls as n,
  qi as o,
  Pl as p,
  It as q,
  ae as r,
  Ie as s,
  ss as t,
  tt as u,
  il as v,
  Ul as w,
  El as x,
  gl as y,
  zl as z
};
