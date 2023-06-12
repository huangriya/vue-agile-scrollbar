const qe = {
  // 滚动条最小尺寸
  minBarSize: {
    type: Number,
    default: 50
  },
  // 初始化滚动位置
  scrollTop: {
    type: Number,
    default: 0
  },
  // 初始化滚动位置
  scrollLeft: {
    type: Number,
    default: 0
  },
  // 滚动条显示类型 hover show hide
  displayType: {
    type: String,
    default: "hover"
  },
  // 滚动条偏移位置
  offsetLeft: {
    type: Number,
    default: 0
  },
  offsetRight: {
    type: Number,
    default: 10
  },
  offsetTop: {
    type: Number,
    default: 0
  },
  offsetBottom: {
    type: Number,
    default: 10
  },
  // dom内容变更，是否自动更新
  isAutoUpdate: {
    type: Boolean,
    default: !0
  },
  // 拖动滚动条速度
  dragSpeedX: {
    type: Number,
    default: 1
  },
  dragSpeedY: {
    type: Number,
    default: 1
  }
};
function Ge(t, e) {
  const n = /* @__PURE__ */ Object.create(null), s = t.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return e ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function rt(t) {
  if (d(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], r = $(s) ? tn(s) : rt(s);
      if (r)
        for (const o in r)
          e[o] = r[o];
    }
    return e;
  } else {
    if ($(t))
      return t;
    if (v(t))
      return t;
  }
}
const Qe = /;(?![^(]*\))/g, Ze = /:([^]+)/, ke = /\/\*.*?\*\//gs;
function tn(t) {
  const e = {};
  return t.replace(ke, "").split(Qe).forEach((n) => {
    if (n) {
      const s = n.split(Ze);
      s.length > 1 && (e[s[0].trim()] = s[1].trim());
    }
  }), e;
}
function q(t) {
  let e = "";
  if ($(t))
    e = t;
  else if (d(t))
    for (let n = 0; n < t.length; n++) {
      const s = q(t[n]);
      s && (e += s + " ");
    }
  else if (v(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const I = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, en = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], he = () => {
}, nn = /^on[^a-z]/, rn = (t) => nn.test(t), D = Object.assign, sn = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, on = Object.prototype.hasOwnProperty, m = (t, e) => on.call(t, e), d = Array.isArray, G = (t) => Ot(t) === "[object Map]", ln = (t) => Ot(t) === "[object Set]", b = (t) => typeof t == "function", $ = (t) => typeof t == "string", At = (t) => typeof t == "symbol", v = (t) => t !== null && typeof t == "object", cn = (t) => v(t) && b(t.then) && b(t.catch), an = Object.prototype.toString, Ot = (t) => an.call(t), pe = (t) => Ot(t).slice(8, -1), un = (t) => Ot(t) === "[object Object]", Ft = (t) => $(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, fn = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, hn = fn((t) => t.charAt(0).toUpperCase() + t.slice(1)), mt = (t, e) => !Object.is(t, e), pn = (t, e, n) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let Qt;
const dn = () => Qt || (Qt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Zt(t, ...e) {
  console.warn(`[Vue warn] ${t}`, ...e);
}
let de;
function gn(t, e = de) {
  e && e.active && e.effects.push(t);
}
function mn() {
  return de;
}
const Dt = (t) => {
  const e = new Set(t);
  return e.w = 0, e.n = 0, e;
}, ge = (t) => (t.w & Y) > 0, me = (t) => (t.n & Y) > 0, _n = ({ deps: t }) => {
  if (t.length)
    for (let e = 0; e < t.length; e++)
      t[e].w |= Y;
}, wn = (t) => {
  const { deps: e } = t;
  if (e.length) {
    let n = 0;
    for (let s = 0; s < e.length; s++) {
      const r = e[s];
      ge(r) && !me(r) ? r.delete(t) : e[n++] = r, r.w &= ~Y, r.n &= ~Y;
    }
    e.length = n;
  }
}, $t = /* @__PURE__ */ new WeakMap();
let k = 0, Y = 1;
const Rt = 30;
let S;
const X = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), It = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class En {
  constructor(e, n = null, s) {
    this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, gn(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let e = S, n = L;
    for (; e; ) {
      if (e === this)
        return;
      e = e.parent;
    }
    try {
      return this.parent = S, S = this, L = !0, Y = 1 << ++k, k <= Rt ? _n(this) : kt(this), this.fn();
    } finally {
      k <= Rt && wn(this), Y = 1 << --k, S = this.parent, L = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    S === this ? this.deferStop = !0 : this.active && (kt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function kt(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
let L = !0;
const _e = [];
function we() {
  _e.push(L), L = !1;
}
function Ee() {
  const t = _e.pop();
  L = t === void 0 ? !0 : t;
}
function B(t, e, n) {
  if (L && S) {
    let s = $t.get(t);
    s || $t.set(t, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = Dt());
    const o = process.env.NODE_ENV !== "production" ? { effect: S, target: t, type: e, key: n } : void 0;
    Nn(r, o);
  }
}
function Nn(t, e) {
  let n = !1;
  k <= Rt ? me(t) || (t.n |= Y, n = !ge(t)) : n = !t.has(S), n && (t.add(S), S.deps.push(t), process.env.NODE_ENV !== "production" && S.onTrack && S.onTrack(Object.assign({ effect: S }, e)));
}
function A(t, e, n, s, r, o) {
  const i = $t.get(t);
  if (!i)
    return;
  let l = [];
  if (e === "clear")
    l = [...i.values()];
  else if (n === "length" && d(t)) {
    const f = Number(s);
    i.forEach((p, c) => {
      (c === "length" || c >= f) && l.push(p);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), e) {
      case "add":
        d(t) ? Ft(n) && l.push(i.get("length")) : (l.push(i.get(X)), G(t) && l.push(i.get(It)));
        break;
      case "delete":
        d(t) || (l.push(i.get(X)), G(t) && l.push(i.get(It)));
        break;
      case "set":
        G(t) && l.push(i.get(X));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: t, type: e, key: n, newValue: s, oldValue: r, oldTarget: o } : void 0;
  if (l.length === 1)
    l[0] && (process.env.NODE_ENV !== "production" ? it(l[0], a) : it(l[0]));
  else {
    const f = [];
    for (const p of l)
      p && f.push(...p);
    process.env.NODE_ENV !== "production" ? it(Dt(f), a) : it(Dt(f));
  }
}
function it(t, e) {
  const n = d(t) ? t : [...t];
  for (const s of n)
    s.computed && te(s, e);
  for (const s of n)
    s.computed || te(s, e);
}
function te(t, e) {
  (t !== S || t.allowRecurse) && (process.env.NODE_ENV !== "production" && t.onTrigger && t.onTrigger(D({ effect: t }, e)), t.scheduler ? t.scheduler() : t.run());
}
const bn = /* @__PURE__ */ Ge("__proto__,__v_isRef,__isVue"), Ne = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(At)
), Sn = /* @__PURE__ */ Xt(), On = /* @__PURE__ */ Xt(!0), vn = /* @__PURE__ */ Xt(!0, !0), ee = /* @__PURE__ */ yn();
function yn() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const s = h(this);
      for (let o = 0, i = this.length; o < i; o++)
        B(s, "get", o + "");
      const r = s[e](...n);
      return r === -1 || r === !1 ? s[e](...n.map(h)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      we();
      const s = h(this)[e].apply(this, n);
      return Ee(), s;
    };
  }), t;
}
function Bn(t) {
  const e = h(this);
  return B(e, "has", t), e.hasOwnProperty(t);
}
function Xt(t = !1, e = !1) {
  return function(s, r, o) {
    if (r === "__v_isReactive")
      return !t;
    if (r === "__v_isReadonly")
      return t;
    if (r === "__v_isShallow")
      return e;
    if (r === "__v_raw" && o === (t ? e ? ye : ve : e ? Xn : Oe).get(s))
      return s;
    const i = d(s);
    if (!t) {
      if (i && m(ee, r))
        return Reflect.get(ee, r, o);
      if (r === "hasOwnProperty")
        return Bn;
    }
    const l = Reflect.get(s, r, o);
    return (At(r) ? Ne.has(r) : bn(r)) || (t || B(s, "get", r), e) ? l : O(l) ? i && Ft(r) ? l : l.value : v(l) ? t ? Ce(l) : Be(l) : l;
  };
}
const Cn = /* @__PURE__ */ xn();
function xn(t = !1) {
  return function(n, s, r, o) {
    let i = n[s];
    if (U(i) && O(i) && !O(r))
      return !1;
    if (!t && (!Pt(r) && !U(r) && (i = h(i), r = h(r)), !d(n) && O(i) && !O(r)))
      return i.value = r, !0;
    const l = d(n) && Ft(s) ? Number(s) < n.length : m(n, s), a = Reflect.set(n, s, r, o);
    return n === h(o) && (l ? mt(r, i) && A(n, "set", s, r, i) : A(n, "add", s, r)), a;
  };
}
function Vn(t, e) {
  const n = m(t, e), s = t[e], r = Reflect.deleteProperty(t, e);
  return r && n && A(t, "delete", e, void 0, s), r;
}
function Tn(t, e) {
  const n = Reflect.has(t, e);
  return (!At(e) || !Ne.has(e)) && B(t, "has", e), n;
}
function Dn(t) {
  return B(t, "iterate", d(t) ? "length" : X), Reflect.ownKeys(t);
}
const $n = {
  get: Sn,
  set: Cn,
  deleteProperty: Vn,
  has: Tn,
  ownKeys: Dn
}, be = {
  get: On,
  set(t, e) {
    return process.env.NODE_ENV !== "production" && Zt(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return process.env.NODE_ENV !== "production" && Zt(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, Rn = /* @__PURE__ */ D({}, be, {
  get: vn
}), Lt = (t) => t, vt = (t) => Reflect.getPrototypeOf(t);
function lt(t, e, n = !1, s = !1) {
  t = t.__v_raw;
  const r = h(t), o = h(e);
  n || (e !== o && B(r, "get", e), B(r, "get", o));
  const { has: i } = vt(r), l = s ? Lt : n ? Ut : Kt;
  if (i.call(r, e))
    return l(t.get(e));
  if (i.call(r, o))
    return l(t.get(o));
  t !== r && t.get(e);
}
function ct(t, e = !1) {
  const n = this.__v_raw, s = h(n), r = h(t);
  return e || (t !== r && B(s, "has", t), B(s, "has", r)), t === r ? n.has(t) : n.has(t) || n.has(r);
}
function at(t, e = !1) {
  return t = t.__v_raw, !e && B(h(t), "iterate", X), Reflect.get(t, "size", t);
}
function ne(t) {
  t = h(t);
  const e = h(this);
  return vt(e).has.call(e, t) || (e.add(t), A(e, "add", t, t)), this;
}
function re(t, e) {
  e = h(e);
  const n = h(this), { has: s, get: r } = vt(n);
  let o = s.call(n, t);
  o ? process.env.NODE_ENV !== "production" && Se(n, s, t) : (t = h(t), o = s.call(n, t));
  const i = r.call(n, t);
  return n.set(t, e), o ? mt(e, i) && A(n, "set", t, e, i) : A(n, "add", t, e), this;
}
function se(t) {
  const e = h(this), { has: n, get: s } = vt(e);
  let r = n.call(e, t);
  r ? process.env.NODE_ENV !== "production" && Se(e, n, t) : (t = h(t), r = n.call(e, t));
  const o = s ? s.call(e, t) : void 0, i = e.delete(t);
  return r && A(e, "delete", t, void 0, o), i;
}
function oe() {
  const t = h(this), e = t.size !== 0, n = process.env.NODE_ENV !== "production" ? G(t) ? new Map(t) : new Set(t) : void 0, s = t.clear();
  return e && A(t, "clear", void 0, void 0, n), s;
}
function ut(t, e) {
  return function(s, r) {
    const o = this, i = o.__v_raw, l = h(i), a = e ? Lt : t ? Ut : Kt;
    return !t && B(l, "iterate", X), i.forEach((f, p) => s.call(r, a(f), a(p), o));
  };
}
function ft(t, e, n) {
  return function(...s) {
    const r = this.__v_raw, o = h(r), i = G(o), l = t === "entries" || t === Symbol.iterator && i, a = t === "keys" && i, f = r[t](...s), p = n ? Lt : e ? Ut : Kt;
    return !e && B(o, "iterate", a ? It : X), {
      // iterator protocol
      next() {
        const { value: c, done: u } = f.next();
        return u ? { value: c, done: u } : {
          value: l ? [p(c[0]), p(c[1])] : p(c),
          done: u
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function M(t) {
  return function(...e) {
    if (process.env.NODE_ENV !== "production") {
      const n = e[0] ? `on key "${e[0]}" ` : "";
      console.warn(`${hn(t)} operation ${n}failed: target is readonly.`, h(this));
    }
    return t === "delete" ? !1 : this;
  };
}
function In() {
  const t = {
    get(o) {
      return lt(this, o);
    },
    get size() {
      return at(this);
    },
    has: ct,
    add: ne,
    set: re,
    delete: se,
    clear: oe,
    forEach: ut(!1, !1)
  }, e = {
    get(o) {
      return lt(this, o, !1, !0);
    },
    get size() {
      return at(this);
    },
    has: ct,
    add: ne,
    set: re,
    delete: se,
    clear: oe,
    forEach: ut(!1, !0)
  }, n = {
    get(o) {
      return lt(this, o, !0);
    },
    get size() {
      return at(this, !0);
    },
    has(o) {
      return ct.call(this, o, !0);
    },
    add: M(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: M(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: M(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: M(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: ut(!0, !1)
  }, s = {
    get(o) {
      return lt(this, o, !0, !0);
    },
    get size() {
      return at(this, !0);
    },
    has(o) {
      return ct.call(this, o, !0);
    },
    add: M(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: M(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: M(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: M(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: ut(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    t[o] = ft(o, !1, !1), n[o] = ft(o, !0, !1), e[o] = ft(o, !1, !0), s[o] = ft(o, !0, !0);
  }), [
    t,
    n,
    e,
    s
  ];
}
const [Pn, Mn, Hn, Wn] = /* @__PURE__ */ In();
function zt(t, e) {
  const n = e ? t ? Wn : Hn : t ? Mn : Pn;
  return (s, r, o) => r === "__v_isReactive" ? !t : r === "__v_isReadonly" ? t : r === "__v_raw" ? s : Reflect.get(m(n, r) && r in s ? n : s, r, o);
}
const Yn = {
  get: /* @__PURE__ */ zt(!1, !1)
}, An = {
  get: /* @__PURE__ */ zt(!0, !1)
}, Fn = {
  get: /* @__PURE__ */ zt(!0, !0)
};
function Se(t, e, n) {
  const s = h(n);
  if (s !== n && e.call(t, s)) {
    const r = pe(t);
    console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Oe = /* @__PURE__ */ new WeakMap(), Xn = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap();
function Ln(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function zn(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Ln(pe(t));
}
function Be(t) {
  return U(t) ? t : jt(t, !1, $n, Yn, Oe);
}
function Ce(t) {
  return jt(t, !0, be, An, ve);
}
function ht(t) {
  return jt(t, !0, Rn, Fn, ye);
}
function jt(t, e, n, s, r) {
  if (!v(t))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(t)}`), t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const o = r.get(t);
  if (o)
    return o;
  const i = zn(t);
  if (i === 0)
    return t;
  const l = new Proxy(t, i === 2 ? s : n);
  return r.set(t, l), l;
}
function z(t) {
  return U(t) ? z(t.__v_raw) : !!(t && t.__v_isReactive);
}
function U(t) {
  return !!(t && t.__v_isReadonly);
}
function Pt(t) {
  return !!(t && t.__v_isShallow);
}
function Mt(t) {
  return z(t) || U(t);
}
function h(t) {
  const e = t && t.__v_raw;
  return e ? h(e) : t;
}
function jn(t) {
  return pn(t, "__v_skip", !0), t;
}
const Kt = (t) => v(t) ? Be(t) : t, Ut = (t) => v(t) ? Ce(t) : t;
function O(t) {
  return !!(t && t.__v_isRef === !0);
}
function Kn(t) {
  return O(t) ? t.value : t;
}
const Un = {
  get: (t, e, n) => Kn(Reflect.get(t, e, n)),
  set: (t, e, n, s) => {
    const r = t[e];
    return O(r) && !O(n) ? (r.value = n, !0) : Reflect.set(t, e, n, s);
  }
};
function Jn(t) {
  return z(t) ? t : new Proxy(t, Un);
}
const j = [];
function qn(t) {
  j.push(t);
}
function Gn() {
  j.pop();
}
function E(t, ...e) {
  if (process.env.NODE_ENV === "production")
    return;
  we();
  const n = j.length ? j[j.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Qn();
  if (s)
    K(s, n, 11, [
      t + e.join(""),
      n && n.proxy,
      r.map(({ vnode: o }) => `at <${je(n, o.type)}>`).join(`
`),
      r
    ]);
  else {
    const o = [`[Vue warn]: ${t}`, ...e];
    r.length && o.push(`
`, ...Zn(r)), console.warn(...o);
  }
  Ee();
}
function Qn() {
  let t = j[j.length - 1];
  if (!t)
    return [];
  const e = [];
  for (; t; ) {
    const n = e[0];
    n && n.vnode === t ? n.recurseCount++ : e.push({
      vnode: t,
      recurseCount: 0
    });
    const s = t.component && t.component.parent;
    t = s && s.vnode;
  }
  return e;
}
function Zn(t) {
  const e = [];
  return t.forEach((n, s) => {
    e.push(...s === 0 ? [] : [`
`], ...kn(n));
  }), e;
}
function kn({ vnode: t, recurseCount: e }) {
  const n = e > 0 ? `... (${e} recursive calls)` : "", s = t.component ? t.component.parent == null : !1, r = ` at <${je(t.component, t.type, s)}`, o = ">" + n;
  return t.props ? [r, ...tr(t.props), o] : [r + o];
}
function tr(t) {
  const e = [], n = Object.keys(t);
  return n.slice(0, 3).forEach((s) => {
    e.push(...xe(s, t[s]));
  }), n.length > 3 && e.push(" ..."), e;
}
function xe(t, e, n) {
  return $(e) ? (e = JSON.stringify(e), n ? e : [`${t}=${e}`]) : typeof e == "number" || typeof e == "boolean" || e == null ? n ? e : [`${t}=${e}`] : O(e) ? (e = xe(t, h(e.value), !0), n ? e : [`${t}=Ref<`, e, ">"]) : b(e) ? [`${t}=fn${e.name ? `<${e.name}>` : ""}`] : (e = h(e), n ? e : [`${t}=`, e]);
}
const Ve = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function K(t, e, n, s) {
  let r;
  try {
    r = s ? t(...s) : t();
  } catch (o) {
    Te(o, e, n);
  }
  return r;
}
function Ht(t, e, n, s) {
  if (b(t)) {
    const o = K(t, e, n, s);
    return o && cn(o) && o.catch((i) => {
      Te(i, e, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < t.length; o++)
    r.push(Ht(t[o], e, n, s));
  return r;
}
function Te(t, e, n, s = !0) {
  const r = e ? e.vnode : null;
  if (e) {
    let o = e.parent;
    const i = e.proxy, l = process.env.NODE_ENV !== "production" ? Ve[n] : n;
    for (; o; ) {
      const f = o.ec;
      if (f) {
        for (let p = 0; p < f.length; p++)
          if (f[p](t, i, l) === !1)
            return;
      }
      o = o.parent;
    }
    const a = e.appContext.config.errorHandler;
    if (a) {
      K(a, null, 10, [t, i, l]);
      return;
    }
  }
  er(t, n, r, s);
}
function er(t, e, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = Ve[e];
    if (n && qn(n), E(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Gn(), s)
      throw t;
    console.error(t);
  } else
    console.error(t);
}
let _t = !1, Wt = !1;
const V = [];
let W = 0;
const Q = [];
let R = null, H = 0;
const De = /* @__PURE__ */ Promise.resolve();
let Jt = null;
const nr = 100;
function rr(t) {
  const e = Jt || De;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function sr(t) {
  let e = W + 1, n = V.length;
  for (; e < n; ) {
    const s = e + n >>> 1;
    st(V[s]) < t ? e = s + 1 : n = s;
  }
  return e;
}
function qt(t) {
  (!V.length || !V.includes(t, _t && t.allowRecurse ? W + 1 : W)) && (t.id == null ? V.push(t) : V.splice(sr(t.id), 0, t), $e());
}
function $e() {
  !_t && !Wt && (Wt = !0, Jt = De.then(Ie));
}
function Re(t) {
  d(t) ? Q.push(...t) : (!R || !R.includes(t, t.allowRecurse ? H + 1 : H)) && Q.push(t), $e();
}
function or(t) {
  if (Q.length) {
    const e = [...new Set(Q)];
    if (Q.length = 0, R) {
      R.push(...e);
      return;
    }
    for (R = e, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), R.sort((n, s) => st(n) - st(s)), H = 0; H < R.length; H++)
      process.env.NODE_ENV !== "production" && Pe(t, R[H]) || R[H]();
    R = null, H = 0;
  }
}
const st = (t) => t.id == null ? 1 / 0 : t.id, ir = (t, e) => {
  const n = st(t) - st(e);
  if (n === 0) {
    if (t.pre && !e.pre)
      return -1;
    if (e.pre && !t.pre)
      return 1;
  }
  return n;
};
function Ie(t) {
  Wt = !1, _t = !0, process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()), V.sort(ir);
  const e = process.env.NODE_ENV !== "production" ? (n) => Pe(t, n) : he;
  try {
    for (W = 0; W < V.length; W++) {
      const n = V[W];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && e(n))
          continue;
        K(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    W = 0, V.length = 0, or(t), _t = !1, Jt = null, (V.length || Q.length) && Ie(t);
  }
}
function Pe(t, e) {
  if (!t.has(e))
    t.set(e, 1);
  else {
    const n = t.get(e);
    if (n > nr) {
      const s = e.ownerInstance, r = s && ze(s.type);
      return E(`Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      t.set(e, n + 1);
  }
}
const Z = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (dn().__VUE_HMR_RUNTIME__ = {
  createRecord: Ct(lr),
  rerender: Ct(cr),
  reload: Ct(ar)
});
const wt = /* @__PURE__ */ new Map();
function lr(t, e) {
  return wt.has(t) ? !1 : (wt.set(t, {
    initialDef: tt(e),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function tt(t) {
  return Ke(t) ? t.__vccOpts : t;
}
function cr(t, e) {
  const n = wt.get(t);
  n && (n.initialDef.render = e, [...n.instances].forEach((s) => {
    e && (s.render = e, tt(s.type).render = e), s.renderCache = [], s.update();
  }));
}
function ar(t, e) {
  const n = wt.get(t);
  if (!n)
    return;
  e = tt(e), ie(n.initialDef, e);
  const s = [...n.instances];
  for (const r of s) {
    const o = tt(r.type);
    Z.has(o) || (o !== n.initialDef && ie(o, e), Z.add(o)), r.appContext.optionsCache.delete(r.type), r.ceReload ? (Z.add(o), r.ceReload(e.styles), Z.delete(o)) : r.parent ? qt(r.parent.update) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  Re(() => {
    for (const r of s)
      Z.delete(tt(r.type));
  });
}
function ie(t, e) {
  D(t, e);
  for (const n in t)
    n !== "__file" && !(n in e) && delete t[n];
}
function Ct(t) {
  return (e, n) => {
    try {
      return t(e, n);
    } catch (s) {
      console.error(s), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let x = null, ur = null;
const fr = (t) => t.__isSuspense;
function hr(t, e) {
  e && e.pendingBranch ? d(t) ? e.effects.push(...t) : e.effects.push(t) : Re(t);
}
const pt = {};
function pr(t, e, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = I) {
  process.env.NODE_ENV !== "production" && !e && (n !== void 0 && E('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), s !== void 0 && E('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const l = (g) => {
    E("Invalid watch source: ", g, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, a = mn() === (P == null ? void 0 : P.scope) ? P : null;
  let f, p = !1, c = !1;
  if (O(t) ? (f = () => t.value, p = Pt(t)) : z(t) ? (f = () => t, s = !0) : d(t) ? (c = !0, p = t.some((g) => z(g) || Pt(g)), f = () => t.map((g) => {
    if (O(g))
      return g.value;
    if (z(g))
      return J(g);
    if (b(g))
      return K(
        g,
        a,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    process.env.NODE_ENV !== "production" && l(g);
  })) : b(t) ? e ? f = () => K(
    t,
    a,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : f = () => {
    if (!(a && a.isUnmounted))
      return u && u(), Ht(t, a, 3, [_]);
  } : (f = he, process.env.NODE_ENV !== "production" && l(t)), e && s) {
    const g = f;
    f = () => J(g());
  }
  let u, _ = (g) => {
    u = C.onStop = () => {
      K(
        g,
        a,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, w = c ? new Array(t.length).fill(pt) : pt;
  const y = () => {
    if (C.active)
      if (e) {
        const g = C.run();
        (s || p || (c ? g.some((Ue, Je) => mt(Ue, w[Je])) : mt(g, w))) && (u && u(), Ht(e, a, 3, [
          g,
          // pass undefined as the old value when it's changed for the first time
          w === pt ? void 0 : c && w[0] === pt ? [] : w,
          _
        ]), w = g);
      } else
        C.run();
  };
  y.allowRecurse = !!e;
  let ot;
  r === "sync" ? ot = y : r === "post" ? ot = () => ae(y, a && a.suspense) : (y.pre = !0, a && (y.id = a.uid), ot = () => qt(y));
  const C = new En(f, ot);
  return process.env.NODE_ENV !== "production" && (C.onTrack = o, C.onTrigger = i), e ? n ? y() : w = C.run() : r === "post" ? ae(C.run.bind(C), a && a.suspense) : C.run(), () => {
    C.stop(), a && a.scope && sn(a.scope.effects, C);
  };
}
function dr(t, e, n) {
  const s = this.proxy, r = $(t) ? t.includes(".") ? gr(s, t) : () => s[t] : t.bind(s, s);
  let o;
  b(e) ? o = e : (o = e.handler, n = e);
  const i = P;
  fe(this);
  const l = pr(r, o.bind(s), n);
  return i ? fe(i) : $r(), l;
}
function gr(t, e) {
  const n = e.split(".");
  return () => {
    let s = t;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function J(t, e) {
  if (!v(t) || t.__v_skip || (e = e || /* @__PURE__ */ new Set(), e.has(t)))
    return t;
  if (e.add(t), O(t))
    J(t.value, e);
  else if (d(t))
    for (let n = 0; n < t.length; n++)
      J(t[n], e);
  else if (ln(t) || G(t))
    t.forEach((n) => {
      J(n, e);
    });
  else if (un(t))
    for (const n in t)
      J(t[n], e);
  return t;
}
const mr = (t) => !!t.type.__asyncLoader, _r = Symbol();
function wr(t, e, n = {}, s, r) {
  if (x.isCE || x.parent && mr(x.parent) && x.parent.isCE)
    return e !== "default" && (n.name = e), Bt("slot", n, s && s());
  let o = t[e];
  process.env.NODE_ENV !== "production" && o && o.length > 1 && (E("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."), o = () => []), o && o._c && (o._d = !1), nt();
  const i = o && Me(o(n)), l = We(
    yt,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${e}`
    },
    i || (s ? s() : []),
    i && t._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  return !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), o && o._c && (o._d = !0), l;
}
function Me(t) {
  return t.some((e) => Ye(e) ? !(e.type === Nt || e.type === yt && !Me(e.children)) : !0) ? t : null;
}
const Yt = (t) => t ? Rr(t) ? Ir(t) || t.proxy : Yt(t.parent) : null, et = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ D(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => process.env.NODE_ENV !== "production" ? ht(t.props) : t.props,
    $attrs: (t) => process.env.NODE_ENV !== "production" ? ht(t.attrs) : t.attrs,
    $slots: (t) => process.env.NODE_ENV !== "production" ? ht(t.slots) : t.slots,
    $refs: (t) => process.env.NODE_ENV !== "production" ? ht(t.refs) : t.refs,
    $parent: (t) => Yt(t.parent),
    $root: (t) => Yt(t.root),
    $emit: (t) => t.emit,
    $options: (t) => br(t),
    $forceUpdate: (t) => t.f || (t.f = () => qt(t.update)),
    $nextTick: (t) => t.n || (t.n = rr.bind(t.proxy)),
    $watch: (t) => dr.bind(t)
  })
), Er = (t) => t === "_" || t === "$", xt = (t, e) => t !== I && !t.__isScriptSetup && m(t, e), Nr = {
  get({ _: t }, e) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: l, appContext: a } = t;
    if (process.env.NODE_ENV !== "production" && e === "__isVue")
      return !0;
    let f;
    if (e[0] !== "$") {
      const _ = i[e];
      if (_ !== void 0)
        switch (_) {
          case 1:
            return s[e];
          case 2:
            return r[e];
          case 4:
            return n[e];
          case 3:
            return o[e];
        }
      else {
        if (xt(s, e))
          return i[e] = 1, s[e];
        if (r !== I && m(r, e))
          return i[e] = 2, r[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = t.propsOptions[0]) && m(f, e)
        )
          return i[e] = 3, o[e];
        if (n !== I && m(n, e))
          return i[e] = 4, n[e];
        i[e] = 0;
      }
    }
    const p = et[e];
    let c, u;
    if (p)
      return e === "$attrs" && (B(t, "get", e), process.env.NODE_ENV !== "production" && void 0), p(t);
    if (
      // css module (injected by vue-loader)
      (c = l.__cssModules) && (c = c[e])
    )
      return c;
    if (n !== I && m(n, e))
      return i[e] = 4, n[e];
    if (
      // global properties
      u = a.config.globalProperties, m(u, e)
    )
      return u[e];
    process.env.NODE_ENV !== "production" && x && (!$(e) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    e.indexOf("__v") !== 0) && (r !== I && Er(e[0]) && m(r, e) ? E(`Property ${JSON.stringify(e)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : t === x && E(`Property ${JSON.stringify(e)} was accessed during render but is not defined on instance.`));
  },
  set({ _: t }, e, n) {
    const { data: s, setupState: r, ctx: o } = t;
    return xt(r, e) ? (r[e] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && m(r, e) ? (E(`Cannot mutate <script setup> binding "${e}" from Options API.`), !1) : s !== I && m(s, e) ? (s[e] = n, !0) : m(t.props, e) ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate prop "${e}". Props are readonly.`), !1) : e[0] === "$" && e.slice(1) in t ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate public property "${e}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && e in t.appContext.config.globalProperties ? Object.defineProperty(o, e, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[e] = n, !0);
  },
  has({ _: { data: t, setupState: e, accessCache: n, ctx: s, appContext: r, propsOptions: o } }, i) {
    let l;
    return !!n[i] || t !== I && m(t, i) || xt(e, i) || (l = o[0]) && m(l, i) || m(s, i) || m(et, i) || m(r.config.globalProperties, i);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : m(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
process.env.NODE_ENV !== "production" && (Nr.ownKeys = (t) => (E("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(t)));
function br(t) {
  const e = t.type, { mixins: n, extends: s } = e, { mixins: r, optionsCache: o, config: { optionMergeStrategies: i } } = t.appContext, l = o.get(e);
  let a;
  return l ? a = l : !r.length && !n && !s ? a = e : (a = {}, r.length && r.forEach((f) => Et(a, f, i, !0)), Et(a, e, i)), v(e) && o.set(e, a), a;
}
function Et(t, e, n, s = !1) {
  const { mixins: r, extends: o } = e;
  o && Et(t, o, n, !0), r && r.forEach((i) => Et(t, i, n, !0));
  for (const i in e)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && E('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const l = Sr[i] || n && n[i];
      t[i] = l ? l(t[i], e[i]) : e[i];
    }
  return t;
}
const Sr = {
  data: le,
  props: F,
  emits: F,
  // objects
  methods: F,
  computed: F,
  // lifecycle
  beforeCreate: N,
  created: N,
  beforeMount: N,
  mounted: N,
  beforeUpdate: N,
  updated: N,
  beforeDestroy: N,
  beforeUnmount: N,
  destroyed: N,
  unmounted: N,
  activated: N,
  deactivated: N,
  errorCaptured: N,
  serverPrefetch: N,
  // assets
  components: F,
  directives: F,
  // watch
  watch: vr,
  // provide / inject
  provide: le,
  inject: Or
};
function le(t, e) {
  return e ? t ? function() {
    return D(b(t) ? t.call(this, this) : t, b(e) ? e.call(this, this) : e);
  } : e : t;
}
function Or(t, e) {
  return F(ce(t), ce(e));
}
function ce(t) {
  if (d(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function N(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function F(t, e) {
  return t ? D(D(/* @__PURE__ */ Object.create(null), t), e) : e;
}
function vr(t, e) {
  if (!t)
    return e;
  if (!e)
    return t;
  const n = D(/* @__PURE__ */ Object.create(null), t);
  for (const s in e)
    n[s] = N(t[s], e[s]);
  return n;
}
const ae = hr, yr = (t) => t.__isTeleport, yt = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Br = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Nt = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const dt = [];
let T = null;
function nt(t = !1) {
  dt.push(T = t ? null : []);
}
function Cr() {
  dt.pop(), T = dt[dt.length - 1] || null;
}
function He(t) {
  return t.dynamicChildren = T || en, Cr(), T && T.push(t), t;
}
function Vt(t, e, n, s, r, o) {
  return He(bt(
    t,
    e,
    n,
    s,
    r,
    o,
    !0
    /* isBlock */
  ));
}
function We(t, e, n, s, r) {
  return He(Bt(
    t,
    e,
    n,
    s,
    r,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function Ye(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
const xr = (...t) => Xe(...t), Ae = "__vInternal", Fe = ({ key: t }) => t ?? null, gt = ({ ref: t, ref_key: e, ref_for: n }) => t != null ? $(t) || O(t) || b(t) ? { i: x, r: t, k: e, f: !!n } : t : null;
function bt(t, e = null, n = null, s = 0, r = null, o = t === yt ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Fe(e),
    ref: e && gt(e),
    scopeId: ur,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: x
  };
  return l ? (Gt(a, n), o & 128 && t.normalize(a)) : n && (a.shapeFlag |= $(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && E("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  T && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && T.push(a), a;
}
const Bt = process.env.NODE_ENV !== "production" ? xr : Xe;
function Xe(t, e = null, n = null, s = 0, r = null, o = !1) {
  if ((!t || t === _r) && (process.env.NODE_ENV !== "production" && !t && E(`Invalid vnode type when creating vnode: ${t}.`), t = Nt), Ye(t)) {
    const l = St(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Gt(l, n), !o && T && (l.shapeFlag & 6 ? T[T.indexOf(t)] = l : T.push(l)), l.patchFlag |= -2, l;
  }
  if (Ke(t) && (t = t.__vccOpts), e) {
    e = Vr(e);
    let { class: l, style: a } = e;
    l && !$(l) && (e.class = q(l)), v(a) && (Mt(a) && !d(a) && (a = D({}, a)), e.style = rt(a));
  }
  const i = $(t) ? 1 : fr(t) ? 128 : yr(t) ? 64 : v(t) ? 4 : b(t) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Mt(t) && (t = h(t), E("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, t)), bt(t, e, n, s, r, i, o, !0);
}
function Vr(t) {
  return t ? Mt(t) || Ae in t ? D({}, t) : t : null;
}
function St(t, e, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = t, l = e ? Dr(s || {}, e) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: l,
    key: l && Fe(l),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? d(r) ? r.concat(gt(e)) : [r, gt(e)] : gt(e)
    ) : r,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && d(i) ? i.map(Le) : i,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== yt ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && St(t.ssContent),
    ssFallback: t.ssFallback && St(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
}
function Le(t) {
  const e = St(t);
  return d(t.children) && (e.children = t.children.map(Le)), e;
}
function Tr(t = " ", e = 0) {
  return Bt(Br, null, t, e);
}
function ue(t = "", e = !1) {
  return e ? (nt(), We(Nt, null, t)) : Bt(Nt, null, t);
}
function Gt(t, e) {
  let n = 0;
  const { shapeFlag: s } = t;
  if (e == null)
    e = null;
  else if (d(e))
    n = 16;
  else if (typeof e == "object")
    if (s & 65) {
      const r = e.default;
      r && (r._c && (r._d = !1), Gt(t, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = e._;
      !r && !(Ae in e) ? e._ctx = x : r === 3 && x && (x.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else
    b(e) ? (e = { default: e, _ctx: x }, n = 32) : (e = String(e), s & 64 ? (n = 16, e = [Tr(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function Dr(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    for (const r in s)
      if (r === "class")
        e.class !== s.class && (e.class = q([e.class, s.class]));
      else if (r === "style")
        e.style = rt([e.style, s.style]);
      else if (rn(r)) {
        const o = e[r], i = s[r];
        i && o !== i && !(d(o) && o.includes(i)) && (e[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (e[r] = s[r]);
  }
  return e;
}
let P = null;
const fe = (t) => {
  P = t, t.scope.on();
}, $r = () => {
  P && P.scope.off(), P = null;
};
function Rr(t) {
  return t.vnode.shapeFlag & 4;
}
function Ir(t) {
  if (t.exposed)
    return t.exposeProxy || (t.exposeProxy = new Proxy(Jn(jn(t.exposed)), {
      get(e, n) {
        if (n in e)
          return e[n];
        if (n in et)
          return et[n](t);
      },
      has(e, n) {
        return n in e || n in et;
      }
    }));
}
const Pr = /(?:^|[-_])(\w)/g, Mr = (t) => t.replace(Pr, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function ze(t, e = !0) {
  return b(t) ? t.displayName || t.name : t.name || e && t.__name;
}
function je(t, e, n = !1) {
  let s = ze(e);
  if (!s && e.__file) {
    const r = e.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && t && t.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === e)
          return i;
    };
    s = r(t.components || t.parent.type.components) || r(t.appContext.components);
  }
  return s ? Mr(s) : n ? "App" : "Anonymous";
}
function Ke(t) {
  return b(t) && "__vccOpts" in t;
}
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function Tt(t) {
  return !!(t && t.__v_isShallow);
}
function Hr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const t = { style: "color:#3ba776" }, e = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, r = {
    header(c) {
      return v(c) ? c.__isVue ? ["div", t, "VueInstance"] : O(c) ? [
        "div",
        {},
        ["span", t, p(c)],
        "<",
        l(c.value),
        ">"
      ] : z(c) ? [
        "div",
        {},
        ["span", t, Tt(c) ? "ShallowReactive" : "Reactive"],
        "<",
        l(c),
        `>${U(c) ? " (readonly)" : ""}`
      ] : U(c) ? [
        "div",
        {},
        ["span", t, Tt(c) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(c),
        ">"
      ] : null : null;
    },
    hasBody(c) {
      return c && c.__isVue;
    },
    body(c) {
      if (c && c.__isVue)
        return [
          "div",
          {},
          ...o(c.$)
        ];
    }
  };
  function o(c) {
    const u = [];
    c.type.props && c.props && u.push(i("props", h(c.props))), c.setupState !== I && u.push(i("setup", c.setupState)), c.data !== I && u.push(i("data", h(c.data)));
    const _ = a(c, "computed");
    _ && u.push(i("computed", _));
    const w = a(c, "inject");
    return w && u.push(i("injected", w)), u.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: c }]
    ]), u;
  }
  function i(c, u) {
    return u = D({}, u), Object.keys(u).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        c
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(u).map((_) => [
          "div",
          {},
          ["span", s, _ + ": "],
          l(u[_], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(c, u = !0) {
    return typeof c == "number" ? ["span", e, c] : typeof c == "string" ? ["span", n, JSON.stringify(c)] : typeof c == "boolean" ? ["span", s, c] : v(c) ? ["object", { object: u ? h(c) : c }] : ["span", n, String(c)];
  }
  function a(c, u) {
    const _ = c.type;
    if (b(_))
      return;
    const w = {};
    for (const y in c.ctx)
      f(_, y, u) && (w[y] = c.ctx[y]);
    return w;
  }
  function f(c, u, _) {
    const w = c[_];
    if (d(w) && w.includes(u) || v(w) && u in w || c.extends && f(c.extends, u, _) || c.mixins && c.mixins.some((y) => f(y, u, _)))
      return !0;
  }
  function p(c) {
    return Tt(c) ? "ShallowRef" : c.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function Wr() {
  Hr();
}
process.env.NODE_ENV !== "production" && Wr();
const Yr = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, r] of e)
    n[s] = r;
  return n;
}, Ar = {
  name: "vueAgileScrollBar",
  props: qe,
  data() {
    return {
      scrollBarY: {
        show: !0,
        clientY: null,
        height: 0,
        top: this.offsetTop,
        // scrollBarY滚动相对于真实滚动的比例
        multiple: 1
      },
      scrollBarX: {
        show: !0,
        clientX: null,
        width: 0,
        bottom: 0,
        left: this.offsetLeft,
        // scrollBarY滚动相对于真实滚动的比例，比如scrollBar滚动10px，真实滚动需要滚动多少?
        multiple: 1
      },
      scrollWidth: 0,
      scrollHeight: 0,
      scrollContentWidth: 0,
      scrollContentHeight: 0
    };
  },
  watch: {
    offsetLeft() {
      this.setScrollBarLeft(), this.initScrollBar();
    },
    offsetRight() {
      this.initScrollBar();
    },
    offsetTop() {
      this.setScrollBarTop(), this.initScrollBar();
    },
    offsetBottom() {
      this.initScrollBar();
    }
  },
  mounted() {
    this.$scrollBox = this.$refs.scrollBox, this.$scroll = this.$refs.scroll, this.$scrollContent = this.$refs.scrollContent, this.setScrollLeft(), this.setScrollTop(), this.updated(), this.isAutoUpdate && (this.observer = new MutationObserver(this.updated), this.observer.observe(this.$refs.scrollContent, {
      attributes: !0,
      childList: !0,
      subtree: !0
    })), this.addDragEvent();
  },
  methods: {
    // 初始化容器信息
    initContainer() {
      this.scrollWidth = this.$scrollBox.offsetWidth, this.scrollHeight = this.$scrollBox.offsetHeight, this.scrollContentWidth = this.$scrollContent.offsetWidth, this.scrollContentHeight = this.$scrollContent.offsetHeight;
    },
    // 初始化scrollBar
    initScrollBar() {
      if (this.scrollContentWidth > this.scrollWidth) {
        const t = this.scrollWidth - (this.scrollContentWidth - this.scrollWidth) - this.offsetLeft - this.offsetRight;
        this.scrollBarX.show = !0, this.scrollBarX.width = t < this.minBarSize ? this.minBarSize : t, this.scrollBarX.multiple = (this.scrollContentWidth - this.scrollWidth) / (this.scrollWidth - this.scrollBarX.width - this.offsetLeft - this.offsetRight);
      } else
        this.scrollBarX.show = !1;
      if (this.scrollContentHeight > this.scrollHeight) {
        const t = this.scrollHeight - (this.scrollContentHeight - this.scrollHeight) - this.offsetTop - this.offsetBottom;
        this.scrollBarY.show = !0, this.scrollBarY.height = t < this.minBarSize ? this.minBarSize : t, this.scrollBarY.multiple = (this.scrollContentHeight - this.scrollHeight) / (this.scrollHeight - this.scrollBarY.height - this.offsetTop - this.offsetBottom), this.scrollBarX.bottom = 0;
      } else
        this.scrollBarY.show = !1, this.scrollBarX.bottom = this.scrollHeight - this.scrollContentHeight + "px";
    },
    updated() {
      this.initContainer(), this.initScrollBar(), this.$emit("updated", {
        scrollBarY: this.scrollBarY.show,
        scrollBarX: this.scrollBarX.show,
        top: this.$scroll.scrollTop,
        left: this.$scroll.scrollLeft,
        scrollWidth: this.scrollWidth,
        scrollHeight: this.scrollHeight,
        scrollContentWidth: this.scrollContentWidth,
        scrollContentHeight: this.scrollContentHeight
      });
    },
    // 设置x轴滚动条距离
    setScrollBarLeft() {
      const t = this.$scroll.scrollLeft, e = this.offsetLeft + Math.floor(t / this.scrollBarX.multiple);
      return e !== this.scrollBarX.left && (this.scrollBarX.left = e), t;
    },
    // 设置Y轴滚动条距离
    setScrollBarTop() {
      const t = this.$scroll.scrollTop, e = this.offsetTop + Math.floor(t / this.scrollBarY.multiple);
      return e !== this.scrollBarY.top && (this.scrollBarY.top = e), t;
    },
    onScroll(t) {
      const e = this.setScrollBarTop(), n = this.setScrollBarLeft();
      this.$emit("scroll", {
        top: e,
        left: n,
        scrollWidth: this.scrollWidth,
        scrollHeight: this.scrollHeight,
        scrollContentWidth: this.scrollContentWidth,
        scrollContentHeight: this.scrollContentHeight
      }, t), this.$attrs.onScrollHit && this.onScrollHit(e, n);
    },
    // 触发触底 触顶 触左 触右
    onScrollHit(t, e) {
      let n = "top", s = t - this.initTop, r = e - this.initLeft;
      this.initTop = t, this.initLeft = e;
      const o = () => {
        this.$emit("scroll-hit", n, {
          top: t,
          left: e,
          scrollWidth: this.scrollWidth,
          scrollHeight: this.scrollHeight,
          scrollContentWidth: this.scrollContentWidth,
          scrollContentHeight: this.scrollContentHeight
        });
      };
      s !== 0 && this.scrollBarY.height && (s < 0 ? n = "top" : n = "bottom", this.scrollContentHeight - this.scrollHeight - t === 0 && o(), t === 0 && n === "top" && o()), r !== 0 && this.scrollBarX.width && (r < 0 ? n = "left" : n = "right", e === 0 && n === "left" || this.scrollContentWidth - this.scrollWidth - e === 0 || (n = "xMiddle"), o());
    },
    scrollBarDown(t, e) {
      e === "scrollBarX" && (this.scrollBarX.clientX = t.clientX, this.scrollBarX.scrollLeft = this.$scroll.scrollLeft), e === "scrollBarY" && (this.scrollBarY.clientY = t.clientY, this.scrollBarY.scrollTop = this.$scroll.scrollTop), window.addEventListener("mousemove", this.scrollBarDrag);
    },
    // 拖拽滚动条
    scrollBarDrag(t) {
      const e = this.scrollBarX.clientX, n = this.scrollBarY.clientY;
      if (e) {
        let s = t.clientX - e;
        this.$scroll.scrollLeft = this.scrollBarX.scrollLeft + s * (this.scrollBarX.multiple * this.dragSpeedX);
      }
      if (n) {
        let s = t.clientY - n;
        this.$scroll.scrollTop = this.scrollBarY.scrollTop + s * this.scrollBarY.multiple * this.dragSpeedY;
      }
    },
    scrollBarUp() {
      this.scrollBarX.clientX = null, this.scrollBarY.clientY = null, window.removeEventListener("mousemove", this.scrollBarDrag);
    },
    // 添加拖拽事件
    addDragEvent() {
      window.addEventListener("mouseup", this.scrollBarUp);
    },
    // 移除拖拽事件
    removeDragEvent() {
      window.removeEventListener("mouseup", this.addDragEvent);
    },
    // 设置滚动条左边距离
    setScrollLeft(t) {
      (t >= 0 || this.scrollLeft >= 0) && (this.$scroll.scrollLeft = t || this.scrollLeft);
    },
    // 设置滚动条左边距离
    setScrollTop(t) {
      (t >= 0 || this.scrollTop >= 0) && (this.$scroll.scrollTop = t || this.scrollTop);
    }
  },
  beforeUnmount() {
    this.isAutoUpdate && this.observer && this.observer.disconnect(), this.removeDragEvent();
  }
}, Fr = {
  class: "agile-scroll-wrapper",
  ref: "scrollContent"
};
function Xr(t, e, n, s, r, o) {
  return nt(), Vt("div", {
    class: q(["vue-agile-scrollbar", {
      "not-user-select": r.scrollBarX.clientX || r.scrollBarY.clientY,
      "scrollbar-hover": t.displayType === "hover",
      "scrollbar-hide": t.displayType === "hide"
    }]),
    ref: "scrollBox"
  }, [
    bt("div", {
      class: "agile-scroll-content",
      ref: "scroll",
      onScroll: e[0] || (e[0] = (...i) => o.onScroll && o.onScroll(...i))
    }, [
      bt("div", Fr, [
        wr(t.$slots, "default")
      ], 512)
    ], 544),
    r.scrollBarX.show ? (nt(), Vt("div", {
      key: 0,
      class: q(["agile-scroll-bar-x", { act: r.scrollBarX.clientX }]),
      style: rt({ left: r.scrollBarX.left + "px", width: r.scrollBarX.width + "px", bottom: r.scrollBarX.bottom }),
      onMousedown: e[1] || (e[1] = (i) => o.scrollBarDown(i, "scrollBarX"))
    }, null, 38)) : ue("", !0),
    r.scrollBarY.show ? (nt(), Vt("div", {
      key: 1,
      class: q(["agile-scroll-bar-y", { act: r.scrollBarY.clientY }]),
      style: rt({ top: r.scrollBarY.top + "px", height: r.scrollBarY.height + "px" }),
      onMousedown: e[2] || (e[2] = (i) => o.scrollBarDown(i, "scrollBarY"))
    }, null, 38)) : ue("", !0)
  ], 2);
}
const zr = /* @__PURE__ */ Yr(Ar, [["render", Xr]]);
export {
  zr as default
};
