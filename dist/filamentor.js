document.addEventListener("alpine:init", () => {
  Alpine.store("rows", {
    items: [],
    init() {
    },
    setRows(e) {
      this.items = e;
    },
    getColumn(e, t) {
      var n;
      return ((n = this.items[e]) == null ? void 0 : n.columns[t]) || {};
    },
    getColumns(e) {
      var t;
      return ((t = this.items[e]) == null ? void 0 : t.columns) || [];
    },
    reorderRows(e) {
      if (!e || typeof e.newIndex > "u" || typeof e.oldIndex > "u")
        return this.items;
      const t = e.newIndex, n = e.oldIndex;
      let r = [...this.items];
      const i = r.splice(n, 1)[0];
      return r.splice(t, 0, i), r.forEach((o, a) => {
        o.order = a;
      }), this.items = r, this.items;
    },
    reorderColumns({ sourceRowId: e, targetRowId: t, oldIndex: n, newIndex: r }) {
      const i = [...this.items], o = i.find((l) => l.id === parseInt(e)), a = i.find((l) => l.id === parseInt(t)), [s] = o.columns.splice(n, 1);
      return a.columns.splice(r, 0, s), this.items = i, i;
    }
  });
});
function Ui(e) {
  return {
    handleDragStart(t, n) {
      t.dataTransfer.setData("text/plain", n.id), t.target.classList.add("dragging");
    },
    handleDragOver(t) {
      t.preventDefault();
      const n = t.target.closest(".bg-gray-50");
      n && (document.querySelectorAll(".drop-target").forEach((r) => {
        r.classList.remove("drop-target");
      }), n.classList.add("drop-target"));
    },
    handleDragEnd(t) {
      t.target.classList.remove("dragging"), document.querySelectorAll(".drop-target").forEach((n) => {
        n.classList.remove("drop-target");
      });
    },
    handleDrop(t, n) {
      t.preventDefault(), document.querySelectorAll(".dragging, .drop-target").forEach((u) => {
        u.classList.remove("dragging", "drop-target");
      });
      const r = t.dataTransfer.getData("text/plain"), i = Alpine.store("rows").items, o = i.findIndex((u) => u.id.toString() === r), a = i.findIndex((u) => u.id === n.id), s = Alpine.store("rows").reorderRows({
        newIndex: a,
        oldIndex: o
      });
      window.Livewire.find(
        document.querySelector("[wire\\:id]").getAttribute("wire:id")
      ).saveLayout(JSON.stringify(s));
    },
    handleColumnDragStart(t, n, r) {
      t.stopPropagation(), t.dataTransfer.setData("text/plain", JSON.stringify({
        columnId: n.id,
        rowId: r.id
      })), t.target.classList.add("dragging-column");
    },
    handleColumnDragOver(t) {
      t.stopPropagation(), t.preventDefault();
      const n = t.target.closest('[draggable="true"]');
      n && !n.classList.contains("dragging-column") && (document.querySelectorAll(".drop-target-column").forEach((r) => {
        r.classList.remove("drop-target-column");
      }), n.classList.add("drop-target-column"));
    },
    handleColumnDragEnd(t) {
      t.stopPropagation(), document.querySelectorAll(".dragging-column, .drop-target-column").forEach((n) => {
        n.classList.remove("dragging-column", "drop-target-column");
      });
    },
    handleColumnDrop(t, n, r) {
      t.stopPropagation(), t.preventDefault();
      const i = JSON.parse(t.dataTransfer.getData("text/plain"));
      if (i.rowId !== r.id) return;
      const o = r.columns.findIndex((u) => u.id === i.columnId), a = r.columns.findIndex((u) => u.id === n.id), s = Alpine.store("rows").reorderColumns({
        sourceRowId: r.id,
        targetRowId: r.id,
        oldIndex: o,
        newIndex: a
      });
      window.Livewire.find(
        document.querySelector("[wire\\:id]").getAttribute("wire:id")
      ).saveLayout(JSON.stringify(s));
    }
  };
}
var ln = !1, un = !1, Se = [], cn = -1;
function Vi(e) {
  Zi(e);
}
function Zi(e) {
  Se.includes(e) || Se.push(e), eo();
}
function Qi(e) {
  let t = Se.indexOf(e);
  t !== -1 && t > cn && Se.splice(t, 1);
}
function eo() {
  !un && !ln && (ln = !0, queueMicrotask(to));
}
function to() {
  ln = !1, un = !0;
  for (let e = 0; e < Se.length; e++)
    Se[e](), cn = e;
  Se.length = 0, cn = -1, un = !1;
}
var ke, Te, Be, xr, dn = !0;
function no(e) {
  dn = !1, e(), dn = !0;
}
function ro(e) {
  ke = e.reactive, Be = e.release, Te = (t) => e.effect(t, { scheduler: (n) => {
    dn ? Vi(n) : n();
  } }), xr = e.raw;
}
function er(e) {
  Te = e;
}
function io(e) {
  let t = () => {
  };
  return [(r) => {
    let i = Te(r);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((o) => o());
    }), e._x_effects.add(i), t = () => {
      i !== void 0 && (e._x_effects.delete(i), Be(i));
    }, i;
  }, () => {
    t();
  }];
}
function Cr(e, t) {
  let n = !0, r, i = Te(() => {
    let o = e();
    JSON.stringify(o), n ? r = o : queueMicrotask(() => {
      t(o, r), r = o;
    }), n = !1;
  });
  return () => Be(i);
}
var Sr = [], Ar = [], Dr = [];
function oo(e) {
  Dr.push(e);
}
function On(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, Ar.push(t));
}
function Ir(e) {
  Sr.push(e);
}
function Or(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function Tr(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
    (t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
  });
}
function ao(e) {
  var t, n;
  for ((t = e._x_effects) == null || t.forEach(Qi); (n = e._x_cleanups) != null && n.length; )
    e._x_cleanups.pop()();
}
var Tn = new MutationObserver(Pn), Rn = !1;
function $n() {
  Tn.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), Rn = !0;
}
function Rr() {
  so(), Tn.disconnect(), Rn = !1;
}
var qe = [];
function so() {
  let e = Tn.takeRecords();
  qe.push(() => e.length > 0 && Pn(e));
  let t = qe.length;
  queueMicrotask(() => {
    if (qe.length === t)
      for (; qe.length > 0; )
        qe.shift()();
  });
}
function R(e) {
  if (!Rn)
    return e();
  Rr();
  let t = e();
  return $n(), t;
}
var Nn = !1, Tt = [];
function lo() {
  Nn = !0;
}
function uo() {
  Nn = !1, Pn(Tt), Tt = [];
}
function Pn(e) {
  if (Nn) {
    Tt = Tt.concat(e);
    return;
  }
  let t = [], n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let o = 0; o < e.length; o++)
    if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].removedNodes.forEach((a) => {
      a.nodeType === 1 && a._x_marker && n.add(a);
    }), e[o].addedNodes.forEach((a) => {
      if (a.nodeType === 1) {
        if (n.has(a)) {
          n.delete(a);
          return;
        }
        a._x_marker || t.push(a);
      }
    })), e[o].type === "attributes")) {
      let a = e[o].target, s = e[o].attributeName, l = e[o].oldValue, u = () => {
        r.has(a) || r.set(a, []), r.get(a).push({ name: s, value: a.getAttribute(s) });
      }, c = () => {
        i.has(a) || i.set(a, []), i.get(a).push(s);
      };
      a.hasAttribute(s) && l === null ? u() : a.hasAttribute(s) ? (c(), u()) : c();
    }
  i.forEach((o, a) => {
    Tr(a, o);
  }), r.forEach((o, a) => {
    Sr.forEach((s) => s(a, o));
  });
  for (let o of n)
    t.some((a) => a.contains(o)) || Ar.forEach((a) => a(o));
  for (let o of t)
    o.isConnected && Dr.forEach((a) => a(o));
  t = null, n = null, r = null, i = null;
}
function $r(e) {
  return ut(Le(e));
}
function lt(e, t, n) {
  return e._x_dataStack = [t, ...Le(n || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
  };
}
function Le(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? Le(e.host) : e.parentNode ? Le(e.parentNode) : [];
}
function ut(e) {
  return new Proxy({ objects: e }, co);
}
var co = {
  ownKeys({ objects: e }) {
    return Array.from(
      new Set(e.flatMap((t) => Object.keys(t)))
    );
  },
  has({ objects: e }, t) {
    return t == Symbol.unscopables ? !1 : e.some(
      (n) => Object.prototype.hasOwnProperty.call(n, t) || Reflect.has(n, t)
    );
  },
  get({ objects: e }, t, n) {
    return t == "toJSON" ? fo : Reflect.get(
      e.find(
        (r) => Reflect.has(r, t)
      ) || {},
      t,
      n
    );
  },
  set({ objects: e }, t, n, r) {
    const i = e.find(
      (a) => Object.prototype.hasOwnProperty.call(a, t)
    ) || e[e.length - 1], o = Object.getOwnPropertyDescriptor(i, t);
    return o != null && o.set && (o != null && o.get) ? o.set.call(r, n) || !0 : Reflect.set(i, t, n);
  }
};
function fo() {
  return Reflect.ownKeys(this).reduce((t, n) => (t[n] = Reflect.get(this, n), t), {});
}
function Nr(e) {
  let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null, n = (r, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([o, { value: a, enumerable: s }]) => {
      if (s === !1 || a === void 0 || typeof a == "object" && a !== null && a.__v_skip)
        return;
      let l = i === "" ? o : `${i}.${o}`;
      typeof a == "object" && a !== null && a._x_interceptor ? r[o] = a.initialize(e, l, o) : t(a) && a !== r && !(a instanceof Element) && n(a, l);
    });
  };
  return n(e);
}
function Pr(e, t = () => {
}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, o) {
      return e(this.initialValue, () => ho(r, i), (a) => fn(r, i, a), i, o);
    }
  };
  return t(n), (r) => {
    if (typeof r == "object" && r !== null && r._x_interceptor) {
      let i = n.initialize.bind(n);
      n.initialize = (o, a, s) => {
        let l = r.initialize(o, a, s);
        return n.initialValue = l, i(o, a, s);
      };
    } else
      n.initialValue = r;
    return n;
  };
}
function ho(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function fn(e, t, n) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = n;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), fn(e[t[0]], t.slice(1), n);
  }
}
var Mr = {};
function Z(e, t) {
  Mr[e] = t;
}
function hn(e, t) {
  let n = po(t);
  return Object.entries(Mr).forEach(([r, i]) => {
    Object.defineProperty(e, `$${r}`, {
      get() {
        return i(t, n);
      },
      enumerable: !1
    });
  }), e;
}
function po(e) {
  let [t, n] = zr(e), r = { interceptor: Pr, ...t };
  return On(e, n), r;
}
function mo(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    st(i, e, t);
  }
}
function st(e, t, n = void 0) {
  e = Object.assign(
    e ?? { message: "No error message given." },
    { el: t, expression: n }
  ), console.warn(`Alpine Expression Error: ${e.message}

${n ? 'Expression: "' + n + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var xt = !0;
function Lr(e) {
  let t = xt;
  xt = !1;
  let n = e();
  return xt = t, n;
}
function Ae(e, t, n = {}) {
  let r;
  return z(e, t)((i) => r = i, n), r;
}
function z(...e) {
  return jr(...e);
}
var jr = Fr;
function go(e) {
  jr = e;
}
function Fr(e, t) {
  let n = {};
  hn(n, e);
  let r = [n, ...Le(e)], i = typeof t == "function" ? vo(r, t) : _o(r, t, e);
  return mo.bind(null, e, t, i);
}
function vo(e, t) {
  return (n = () => {
  }, { scope: r = {}, params: i = [] } = {}) => {
    let o = t.apply(ut([r, ...e]), i);
    Rt(n, o);
  };
}
var qt = {};
function yo(e, t) {
  if (qt[e])
    return qt[e];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim()) ? `(async()=>{ ${e} })()` : e, o = (() => {
    try {
      let a = new n(
        ["__self", "scope"],
        `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
      );
      return Object.defineProperty(a, "name", {
        value: `[Alpine] ${e}`
      }), a;
    } catch (a) {
      return st(a, t, e), Promise.resolve();
    }
  })();
  return qt[e] = o, o;
}
function _o(e, t, n) {
  let r = yo(t, n);
  return (i = () => {
  }, { scope: o = {}, params: a = [] } = {}) => {
    r.result = void 0, r.finished = !1;
    let s = ut([o, ...e]);
    if (typeof r == "function") {
      let l = r(r, s).catch((u) => st(u, n, t));
      r.finished ? (Rt(i, r.result, s, a, n), r.result = void 0) : l.then((u) => {
        Rt(i, u, s, a, n);
      }).catch((u) => st(u, n, t)).finally(() => r.result = void 0);
    }
  };
}
function Rt(e, t, n, r, i) {
  if (xt && typeof t == "function") {
    let o = t.apply(n, r);
    o instanceof Promise ? o.then((a) => Rt(e, a, n, r)).catch((a) => st(a, i, t)) : e(o);
  } else typeof t == "object" && t instanceof Promise ? t.then((o) => e(o)) : e(t);
}
var Mn = "x-";
function ze(e = "") {
  return Mn + e;
}
function wo(e) {
  Mn = e;
}
var $t = {};
function M(e, t) {
  return $t[e] = t, {
    before(n) {
      if (!$t[n]) {
        console.warn(String.raw`Cannot find directive \`${n}\`. \`${e}\` will use the default order of execution`);
        return;
      }
      const r = Ce.indexOf(n);
      Ce.splice(r >= 0 ? r : Ce.indexOf("DEFAULT"), 0, e);
    }
  };
}
function bo(e) {
  return Object.keys($t).includes(e);
}
function Ln(e, t, n) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let o = Object.entries(e._x_virtualDirectives).map(([s, l]) => ({ name: s, value: l })), a = kr(o);
    o = o.map((s) => a.find((l) => l.name === s.name) ? {
      name: `x-bind:${s.name}`,
      value: `"${s.value}"`
    } : s), t = t.concat(o);
  }
  let r = {};
  return t.map(Kr((o, a) => r[o] = a)).filter(Xr).map(Co(r, n)).sort(So).map((o) => xo(e, o));
}
function kr(e) {
  return Array.from(e).map(Kr()).filter((t) => !Xr(t));
}
var pn = !1, Ue = /* @__PURE__ */ new Map(), Br = Symbol();
function Eo(e) {
  pn = !0;
  let t = Symbol();
  Br = t, Ue.set(t, []);
  let n = () => {
    for (; Ue.get(t).length; )
      Ue.get(t).shift()();
    Ue.delete(t);
  }, r = () => {
    pn = !1, n();
  };
  e(n), r();
}
function zr(e) {
  let t = [], n = (s) => t.push(s), [r, i] = io(e);
  return t.push(i), [{
    Alpine: ct,
    effect: r,
    cleanup: n,
    evaluateLater: z.bind(z, e),
    evaluate: Ae.bind(Ae, e)
  }, () => t.forEach((s) => s())];
}
function xo(e, t) {
  let n = () => {
  }, r = $t[t.type] || n, [i, o] = zr(e);
  Or(e, t.original, o);
  let a = () => {
    e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, i), r = r.bind(r, e, t, i), pn ? Ue.get(Br).push(r) : r());
  };
  return a.runCleanups = o, a;
}
var Hr = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }), Wr = (e) => e;
function Kr(e = () => {
}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = Yr.reduce((o, a) => a(o), { name: t, value: n });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var Yr = [];
function jn(e) {
  Yr.push(e);
}
function Xr({ name: e }) {
  return qr().test(e);
}
var qr = () => new RegExp(`^${Mn}([^:^.]+)\\b`);
function Co(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(qr()), o = n.match(/:([a-zA-Z0-9\-_:]+)/), a = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], s = t || e[n] || n;
    return {
      type: i ? i[1] : null,
      value: o ? o[1] : null,
      modifiers: a.map((l) => l.replace(".", "")),
      expression: r,
      original: s
    };
  };
}
var mn = "DEFAULT", Ce = [
  "ignore",
  "ref",
  "data",
  "id",
  "anchor",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  mn,
  "teleport"
];
function So(e, t) {
  let n = Ce.indexOf(e.type) === -1 ? mn : e.type, r = Ce.indexOf(t.type) === -1 ? mn : t.type;
  return Ce.indexOf(n) - Ce.indexOf(r);
}
function et(e, t, n = {}) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: n,
      bubbles: !0,
      // Allows events to pass the shadow DOM barrier.
      composed: !0,
      cancelable: !0
    })
  );
}
function Oe(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => Oe(i, t));
    return;
  }
  let n = !1;
  if (t(e, () => n = !0), n)
    return;
  let r = e.firstElementChild;
  for (; r; )
    Oe(r, t), r = r.nextElementSibling;
}
function J(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
var tr = !1;
function Ao() {
  tr && J("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), tr = !0, document.body || J("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), et(document, "alpine:init"), et(document, "alpine:initializing"), $n(), oo((t) => oe(t, Oe)), On((t) => We(t)), Ir((t, n) => {
    Ln(t, n).forEach((r) => r());
  });
  let e = (t) => !kt(t.parentElement, !0);
  Array.from(document.querySelectorAll(Ur().join(","))).filter(e).forEach((t) => {
    oe(t);
  }), et(document, "alpine:initialized"), setTimeout(() => {
    To();
  });
}
var Fn = [], Jr = [];
function Gr() {
  return Fn.map((e) => e());
}
function Ur() {
  return Fn.concat(Jr).map((e) => e());
}
function Vr(e) {
  Fn.push(e);
}
function Zr(e) {
  Jr.push(e);
}
function kt(e, t = !1) {
  return He(e, (n) => {
    if ((t ? Ur() : Gr()).some((i) => n.matches(i)))
      return !0;
  });
}
function He(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return He(e.parentElement, t);
  }
}
function Do(e) {
  return Gr().some((t) => e.matches(t));
}
var Qr = [];
function Io(e) {
  Qr.push(e);
}
var Oo = 1;
function oe(e, t = Oe, n = () => {
}) {
  He(e, (r) => r._x_ignore) || Eo(() => {
    t(e, (r, i) => {
      r._x_marker || (n(r, i), Qr.forEach((o) => o(r, i)), Ln(r, r.attributes).forEach((o) => o()), r._x_ignore || (r._x_marker = Oo++), r._x_ignore && i());
    });
  });
}
function We(e, t = Oe) {
  t(e, (n) => {
    ao(n), Tr(n), delete n._x_marker;
  });
}
function To() {
  [
    ["ui", "dialog", ["[x-dialog], [x-popover]"]],
    ["anchor", "anchor", ["[x-anchor]"]],
    ["sort", "sort", ["[x-sort]"]]
  ].forEach(([t, n, r]) => {
    bo(n) || r.some((i) => {
      if (document.querySelector(i))
        return J(`found "${i}", but missing ${t} plugin`), !0;
    });
  });
}
var gn = [], kn = !1;
function Bn(e = () => {
}) {
  return queueMicrotask(() => {
    kn || setTimeout(() => {
      vn();
    });
  }), new Promise((t) => {
    gn.push(() => {
      e(), t();
    });
  });
}
function vn() {
  for (kn = !1; gn.length; )
    gn.shift()();
}
function Ro() {
  kn = !0;
}
function zn(e, t) {
  return Array.isArray(t) ? nr(e, t.join(" ")) : typeof t == "object" && t !== null ? $o(e, t) : typeof t == "function" ? zn(e, t()) : nr(e, t);
}
function nr(e, t) {
  let n = (i) => i.split(" ").filter((o) => !e.classList.contains(o)).filter(Boolean), r = (i) => (e.classList.add(...i), () => {
    e.classList.remove(...i);
  });
  return t = t === !0 ? t = "" : t || "", r(n(t));
}
function $o(e, t) {
  let n = (s) => s.split(" ").filter(Boolean), r = Object.entries(t).flatMap(([s, l]) => l ? n(s) : !1).filter(Boolean), i = Object.entries(t).flatMap(([s, l]) => l ? !1 : n(s)).filter(Boolean), o = [], a = [];
  return i.forEach((s) => {
    e.classList.contains(s) && (e.classList.remove(s), a.push(s));
  }), r.forEach((s) => {
    e.classList.contains(s) || (e.classList.add(s), o.push(s));
  }), () => {
    a.forEach((s) => e.classList.add(s)), o.forEach((s) => e.classList.remove(s));
  };
}
function Bt(e, t) {
  return typeof t == "object" && t !== null ? No(e, t) : Po(e, t);
}
function No(e, t) {
  let n = {};
  return Object.entries(t).forEach(([r, i]) => {
    n[r] = e.style[r], r.startsWith("--") || (r = Mo(r)), e.style.setProperty(r, i);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    Bt(e, n);
  };
}
function Po(e, t) {
  let n = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", n || "");
  };
}
function Mo(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function yn(e, t = () => {
}) {
  let n = !1;
  return function() {
    n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments));
  };
}
M("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r !== !1 && (!r || typeof r == "boolean" ? jo(e, n, t) : Lo(e, r, t));
});
function Lo(e, t, n) {
  ei(e, zn, ""), {
    enter: (i) => {
      e._x_transition.enter.during = i;
    },
    "enter-start": (i) => {
      e._x_transition.enter.start = i;
    },
    "enter-end": (i) => {
      e._x_transition.enter.end = i;
    },
    leave: (i) => {
      e._x_transition.leave.during = i;
    },
    "leave-start": (i) => {
      e._x_transition.leave.start = i;
    },
    "leave-end": (i) => {
      e._x_transition.leave.end = i;
    }
  }[n](t);
}
function jo(e, t, n) {
  ei(e, Bt);
  let r = !t.includes("in") && !t.includes("out") && !n, i = r || t.includes("in") || ["enter"].includes(n), o = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((E, w) => w < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((E, w) => w > t.indexOf("out")));
  let a = !t.includes("opacity") && !t.includes("scale"), s = a || t.includes("opacity"), l = a || t.includes("scale"), u = s ? 0 : 1, c = l ? Je(t, "scale", 95) / 100 : 1, d = Je(t, "delay", 0) / 1e3, h = Je(t, "origin", "center"), m = "opacity, transform", y = Je(t, "duration", 150) / 1e3, b = Je(t, "duration", 75) / 1e3, p = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (e._x_transition.enter.during = {
    transformOrigin: h,
    transitionDelay: `${d}s`,
    transitionProperty: m,
    transitionDuration: `${y}s`,
    transitionTimingFunction: p
  }, e._x_transition.enter.start = {
    opacity: u,
    transform: `scale(${c})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), o && (e._x_transition.leave.during = {
    transformOrigin: h,
    transitionDelay: `${d}s`,
    transitionProperty: m,
    transitionDuration: `${b}s`,
    transitionTimingFunction: p
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: u,
    transform: `scale(${c})`
  });
}
function ei(e, t, n = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: n, start: n, end: n },
    leave: { during: n, start: n, end: n },
    in(r = () => {
    }, i = () => {
    }) {
      _n(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, r, i);
    },
    out(r = () => {
    }, i = () => {
    }) {
      _n(e, t, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, r, i);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, n, r) {
  const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let o = () => i(n);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(n) : o() : e._x_transition ? e._x_transition.in(n) : o();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((a, s) => {
    e._x_transition.out(() => {
    }, () => a(r)), e._x_transitioning && e._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(r), queueMicrotask(() => {
    let a = ti(e);
    a ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(e)) : i(() => {
      let s = (l) => {
        let u = Promise.all([
          l._x_hidePromise,
          ...(l._x_hideChildren || []).map(s)
        ]).then(([c]) => c == null ? void 0 : c());
        return delete l._x_hidePromise, delete l._x_hideChildren, u;
      };
      s(e).catch((l) => {
        if (!l.isFromCancelledTransition)
          throw l;
      });
    });
  });
};
function ti(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : ti(t);
}
function _n(e, t, { during: n, start: r, end: i } = {}, o = () => {
}, a = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0) {
    o(), a();
    return;
  }
  let s, l, u;
  Fo(e, {
    start() {
      s = t(e, r);
    },
    during() {
      l = t(e, n);
    },
    before: o,
    end() {
      s(), u = t(e, i);
    },
    after: a,
    cleanup() {
      l(), u();
    }
  });
}
function Fo(e, t) {
  let n, r, i, o = yn(() => {
    R(() => {
      n = !0, r || t.before(), i || (t.end(), vn()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(a) {
      this.beforeCancels.push(a);
    },
    cancel: yn(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      o();
    }),
    finish: o
  }, R(() => {
    t.start(), t.during();
  }), Ro(), requestAnimationFrame(() => {
    if (n)
      return;
    let a = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, s = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    a === 0 && (a = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), R(() => {
      t.before();
    }), r = !0, requestAnimationFrame(() => {
      n || (R(() => {
        t.end();
      }), vn(), setTimeout(e._x_transitioning.finish, a + s), i = !0);
    });
  });
}
function Je(e, t, n) {
  if (e.indexOf(t) === -1)
    return n;
  const r = e[e.indexOf(t) + 1];
  if (!r || t === "scale" && isNaN(r))
    return n;
  if (t === "duration" || t === "delay") {
    let i = r.match(/([0-9]+)ms/);
    if (i)
      return i[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [r, e[e.indexOf(t) + 2]].join(" ") : r;
}
var pe = !1;
function ge(e, t = () => {
}) {
  return (...n) => pe ? t(...n) : e(...n);
}
function ko(e) {
  return (...t) => pe && e(...t);
}
var ni = [];
function zt(e) {
  ni.push(e);
}
function Bo(e, t) {
  ni.forEach((n) => n(e, t)), pe = !0, ri(() => {
    oe(t, (n, r) => {
      r(n, () => {
      });
    });
  }), pe = !1;
}
var wn = !1;
function zo(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), pe = !0, wn = !0, ri(() => {
    Ho(t);
  }), pe = !1, wn = !1;
}
function Ho(e) {
  let t = !1;
  oe(e, (r, i) => {
    Oe(r, (o, a) => {
      if (t && Do(o))
        return a();
      t = !0, i(o, a);
    });
  });
}
function ri(e) {
  let t = Te;
  er((n, r) => {
    let i = t(n);
    return Be(i), () => {
    };
  }), e(), er(t);
}
function ii(e, t, n, r = []) {
  switch (e._x_bindings || (e._x_bindings = ke({})), e._x_bindings[t] = n, t = r.includes("camel") ? Uo(t) : t, t) {
    case "value":
      Wo(e, n);
      break;
    case "style":
      Yo(e, n);
      break;
    case "class":
      Ko(e, n);
      break;
    case "selected":
    case "checked":
      Xo(e, t, n);
      break;
    default:
      oi(e, t, n);
      break;
  }
}
function Wo(e, t) {
  if (li(e))
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (typeof t == "boolean" ? e.checked = Ct(e.value) === t : e.checked = rr(e.value, t));
  else if (Hn(e))
    Number.isInteger(t) ? e.value = t : !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((n) => rr(n, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    Go(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t === void 0 ? "" : t;
  }
}
function Ko(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = zn(e, t);
}
function Yo(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = Bt(e, t);
}
function Xo(e, t, n) {
  oi(e, t, n), Jo(e, t, n);
}
function oi(e, t, n) {
  [null, void 0, !1].includes(n) && Zo(t) ? e.removeAttribute(t) : (ai(t) && (n = t), qo(e, t, n));
}
function qo(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function Jo(e, t, n) {
  e[t] !== n && (e[t] = n);
}
function Go(e, t) {
  const n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function Uo(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function rr(e, t) {
  return e == t;
}
function Ct(e) {
  return [1, "1", "true", "on", "yes", !0].includes(e) ? !0 : [0, "0", "false", "off", "no", !1].includes(e) ? !1 : e ? !!e : null;
}
var Vo = /* @__PURE__ */ new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "inert",
  "ismap",
  "itemscope",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected",
  "shadowrootclonable",
  "shadowrootdelegatesfocus",
  "shadowrootserializable"
]);
function ai(e) {
  return Vo.has(e);
}
function Zo(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function Qo(e, t, n) {
  return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : si(e, t, n);
}
function ea(e, t, n, r = !0) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
    let i = e._x_inlineBindings[t];
    return i.extract = r, Lr(() => Ae(e, i.expression));
  }
  return si(e, t, n);
}
function si(e, t, n) {
  let r = e.getAttribute(t);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : ai(t) ? !![t, "true"].includes(r) : r;
}
function Hn(e) {
  return e.type === "checkbox" || e.localName === "ui-checkbox" || e.localName === "ui-switch";
}
function li(e) {
  return e.type === "radio" || e.localName === "ui-radio";
}
function ui(e, t) {
  var n;
  return function() {
    var r = this, i = arguments, o = function() {
      n = null, e.apply(r, i);
    };
    clearTimeout(n), n = setTimeout(o, t);
  };
}
function ci(e, t) {
  let n;
  return function() {
    let r = this, i = arguments;
    n || (e.apply(r, i), n = !0, setTimeout(() => n = !1, t));
  };
}
function di({ get: e, set: t }, { get: n, set: r }) {
  let i = !0, o, a = Te(() => {
    let s = e(), l = n();
    if (i)
      r(Jt(s)), i = !1;
    else {
      let u = JSON.stringify(s), c = JSON.stringify(l);
      u !== o ? r(Jt(s)) : u !== c && t(Jt(l));
    }
    o = JSON.stringify(e()), JSON.stringify(n());
  });
  return () => {
    Be(a);
  };
}
function Jt(e) {
  return typeof e == "object" ? JSON.parse(JSON.stringify(e)) : e;
}
function ta(e) {
  (Array.isArray(e) ? e : [e]).forEach((n) => n(ct));
}
var Ee = {}, ir = !1;
function na(e, t) {
  if (ir || (Ee = ke(Ee), ir = !0), t === void 0)
    return Ee[e];
  Ee[e] = t, Nr(Ee[e]), typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && Ee[e].init();
}
function ra() {
  return Ee;
}
var fi = {};
function ia(e, t) {
  let n = typeof t != "function" ? () => t : t;
  return e instanceof Element ? hi(e, n()) : (fi[e] = n, () => {
  });
}
function oa(e) {
  return Object.entries(fi).forEach(([t, n]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...r) => n(...r);
      }
    });
  }), e;
}
function hi(e, t, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let i = Object.entries(t).map(([a, s]) => ({ name: a, value: s })), o = kr(i);
  return i = i.map((a) => o.find((s) => s.name === a.name) ? {
    name: `x-bind:${a.name}`,
    value: `"${a.value}"`
  } : a), Ln(e, i, n).map((a) => {
    r.push(a.runCleanups), a();
  }), () => {
    for (; r.length; )
      r.pop()();
  };
}
var pi = {};
function aa(e, t) {
  pi[e] = t;
}
function sa(e, t) {
  return Object.entries(pi).forEach(([n, r]) => {
    Object.defineProperty(e, n, {
      get() {
        return (...i) => r.bind(t)(...i);
      },
      enumerable: !1
    });
  }), e;
}
var la = {
  get reactive() {
    return ke;
  },
  get release() {
    return Be;
  },
  get effect() {
    return Te;
  },
  get raw() {
    return xr;
  },
  version: "3.14.9",
  flushAndStopDeferringMutations: uo,
  dontAutoEvaluateFunctions: Lr,
  disableEffectScheduling: no,
  startObservingMutations: $n,
  stopObservingMutations: Rr,
  setReactivityEngine: ro,
  onAttributeRemoved: Or,
  onAttributesAdded: Ir,
  closestDataStack: Le,
  skipDuringClone: ge,
  onlyDuringClone: ko,
  addRootSelector: Vr,
  addInitSelector: Zr,
  interceptClone: zt,
  addScopeToNode: lt,
  deferMutations: lo,
  mapAttributes: jn,
  evaluateLater: z,
  interceptInit: Io,
  setEvaluator: go,
  mergeProxies: ut,
  extractProp: ea,
  findClosest: He,
  onElRemoved: On,
  closestRoot: kt,
  destroyTree: We,
  interceptor: Pr,
  // INTERNAL: not public API and is subject to change without major release.
  transition: _n,
  // INTERNAL
  setStyles: Bt,
  // INTERNAL
  mutateDom: R,
  directive: M,
  entangle: di,
  throttle: ci,
  debounce: ui,
  evaluate: Ae,
  initTree: oe,
  nextTick: Bn,
  prefixed: ze,
  prefix: wo,
  plugin: ta,
  magic: Z,
  store: na,
  start: Ao,
  clone: zo,
  // INTERNAL
  cloneNode: Bo,
  // INTERNAL
  bound: Qo,
  $data: $r,
  watch: Cr,
  walk: Oe,
  data: aa,
  bind: ia
}, ct = la;
function ua(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return (i) => !!n[i];
}
var ca = Object.freeze({}), da = Object.prototype.hasOwnProperty, Ht = (e, t) => da.call(e, t), De = Array.isArray, tt = (e) => mi(e) === "[object Map]", fa = (e) => typeof e == "string", Wn = (e) => typeof e == "symbol", Wt = (e) => e !== null && typeof e == "object", ha = Object.prototype.toString, mi = (e) => ha.call(e), gi = (e) => mi(e).slice(8, -1), Kn = (e) => fa(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, pa = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, ma = pa((e) => e.charAt(0).toUpperCase() + e.slice(1)), vi = (e, t) => e !== t && (e === e || t === t), bn = /* @__PURE__ */ new WeakMap(), Ge = [], ee, Ie = Symbol("iterate"), En = Symbol("Map key iterate");
function ga(e) {
  return e && e._isEffect === !0;
}
function va(e, t = ca) {
  ga(e) && (e = e.raw);
  const n = wa(e, t);
  return t.lazy || n(), n;
}
function ya(e) {
  e.active && (yi(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var _a = 0;
function wa(e, t) {
  const n = function() {
    if (!n.active)
      return e();
    if (!Ge.includes(n)) {
      yi(n);
      try {
        return Ea(), Ge.push(n), ee = n, e();
      } finally {
        Ge.pop(), _i(), ee = Ge[Ge.length - 1];
      }
    }
  };
  return n.id = _a++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n;
}
function yi(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
var je = !0, Yn = [];
function ba() {
  Yn.push(je), je = !1;
}
function Ea() {
  Yn.push(je), je = !0;
}
function _i() {
  const e = Yn.pop();
  je = e === void 0 ? !0 : e;
}
function V(e, t, n) {
  if (!je || ee === void 0)
    return;
  let r = bn.get(e);
  r || bn.set(e, r = /* @__PURE__ */ new Map());
  let i = r.get(n);
  i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(ee) || (i.add(ee), ee.deps.push(i), ee.options.onTrack && ee.options.onTrack({
    effect: ee,
    target: e,
    type: t,
    key: n
  }));
}
function me(e, t, n, r, i, o) {
  const a = bn.get(e);
  if (!a)
    return;
  const s = /* @__PURE__ */ new Set(), l = (c) => {
    c && c.forEach((d) => {
      (d !== ee || d.allowRecurse) && s.add(d);
    });
  };
  if (t === "clear")
    a.forEach(l);
  else if (n === "length" && De(e))
    a.forEach((c, d) => {
      (d === "length" || d >= r) && l(c);
    });
  else
    switch (n !== void 0 && l(a.get(n)), t) {
      case "add":
        De(e) ? Kn(n) && l(a.get("length")) : (l(a.get(Ie)), tt(e) && l(a.get(En)));
        break;
      case "delete":
        De(e) || (l(a.get(Ie)), tt(e) && l(a.get(En)));
        break;
      case "set":
        tt(e) && l(a.get(Ie));
        break;
    }
  const u = (c) => {
    c.options.onTrigger && c.options.onTrigger({
      effect: c,
      target: e,
      key: n,
      type: t,
      newValue: r,
      oldValue: i,
      oldTarget: o
    }), c.options.scheduler ? c.options.scheduler(c) : c();
  };
  s.forEach(u);
}
var xa = /* @__PURE__ */ ua("__proto__,__v_isRef,__isVue"), wi = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(Wn)), Ca = /* @__PURE__ */ bi(), Sa = /* @__PURE__ */ bi(!0), or = /* @__PURE__ */ Aa();
function Aa() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = I(this);
      for (let o = 0, a = this.length; o < a; o++)
        V(r, "get", o + "");
      const i = r[t](...n);
      return i === -1 || i === !1 ? r[t](...n.map(I)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ba();
      const r = I(this)[t].apply(this, n);
      return _i(), r;
    };
  }), e;
}
function bi(e = !1, t = !1) {
  return function(r, i, o) {
    if (i === "__v_isReactive")
      return !e;
    if (i === "__v_isReadonly")
      return e;
    if (i === "__v_raw" && o === (e ? t ? Ba : Si : t ? ka : Ci).get(r))
      return r;
    const a = De(r);
    if (!e && a && Ht(or, i))
      return Reflect.get(or, i, o);
    const s = Reflect.get(r, i, o);
    return (Wn(i) ? wi.has(i) : xa(i)) || (e || V(r, "get", i), t) ? s : xn(s) ? !a || !Kn(i) ? s.value : s : Wt(s) ? e ? Ai(s) : Gn(s) : s;
  };
}
var Da = /* @__PURE__ */ Ia();
function Ia(e = !1) {
  return function(n, r, i, o) {
    let a = n[r];
    if (!e && (i = I(i), a = I(a), !De(n) && xn(a) && !xn(i)))
      return a.value = i, !0;
    const s = De(n) && Kn(r) ? Number(r) < n.length : Ht(n, r), l = Reflect.set(n, r, i, o);
    return n === I(o) && (s ? vi(i, a) && me(n, "set", r, i, a) : me(n, "add", r, i)), l;
  };
}
function Oa(e, t) {
  const n = Ht(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
  return i && n && me(e, "delete", t, void 0, r), i;
}
function Ta(e, t) {
  const n = Reflect.has(e, t);
  return (!Wn(t) || !wi.has(t)) && V(e, "has", t), n;
}
function Ra(e) {
  return V(e, "iterate", De(e) ? "length" : Ie), Reflect.ownKeys(e);
}
var $a = {
  get: Ca,
  set: Da,
  deleteProperty: Oa,
  has: Ta,
  ownKeys: Ra
}, Na = {
  get: Sa,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Xn = (e) => Wt(e) ? Gn(e) : e, qn = (e) => Wt(e) ? Ai(e) : e, Jn = (e) => e, Kt = (e) => Reflect.getPrototypeOf(e);
function pt(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = I(e), o = I(t);
  t !== o && !n && V(i, "get", t), !n && V(i, "get", o);
  const { has: a } = Kt(i), s = r ? Jn : n ? qn : Xn;
  if (a.call(i, t))
    return s(e.get(t));
  if (a.call(i, o))
    return s(e.get(o));
  e !== i && e.get(t);
}
function mt(e, t = !1) {
  const n = this.__v_raw, r = I(n), i = I(e);
  return e !== i && !t && V(r, "has", e), !t && V(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function gt(e, t = !1) {
  return e = e.__v_raw, !t && V(I(e), "iterate", Ie), Reflect.get(e, "size", e);
}
function ar(e) {
  e = I(e);
  const t = I(this);
  return Kt(t).has.call(t, e) || (t.add(e), me(t, "add", e, e)), this;
}
function sr(e, t) {
  t = I(t);
  const n = I(this), { has: r, get: i } = Kt(n);
  let o = r.call(n, e);
  o ? xi(n, r, e) : (e = I(e), o = r.call(n, e));
  const a = i.call(n, e);
  return n.set(e, t), o ? vi(t, a) && me(n, "set", e, t, a) : me(n, "add", e, t), this;
}
function lr(e) {
  const t = I(this), { has: n, get: r } = Kt(t);
  let i = n.call(t, e);
  i ? xi(t, n, e) : (e = I(e), i = n.call(t, e));
  const o = r ? r.call(t, e) : void 0, a = t.delete(e);
  return i && me(t, "delete", e, void 0, o), a;
}
function ur() {
  const e = I(this), t = e.size !== 0, n = tt(e) ? new Map(e) : new Set(e), r = e.clear();
  return t && me(e, "clear", void 0, void 0, n), r;
}
function vt(e, t) {
  return function(r, i) {
    const o = this, a = o.__v_raw, s = I(a), l = t ? Jn : e ? qn : Xn;
    return !e && V(s, "iterate", Ie), a.forEach((u, c) => r.call(i, l(u), l(c), o));
  };
}
function yt(e, t, n) {
  return function(...r) {
    const i = this.__v_raw, o = I(i), a = tt(o), s = e === "entries" || e === Symbol.iterator && a, l = e === "keys" && a, u = i[e](...r), c = n ? Jn : t ? qn : Xn;
    return !t && V(o, "iterate", l ? En : Ie), {
      // iterator protocol
      next() {
        const { value: d, done: h } = u.next();
        return h ? { value: d, done: h } : {
          value: s ? [c(d[0]), c(d[1])] : c(d),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ce(e) {
  return function(...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${ma(e)} operation ${n}failed: target is readonly.`, I(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function Pa() {
  const e = {
    get(o) {
      return pt(this, o);
    },
    get size() {
      return gt(this);
    },
    has: mt,
    add: ar,
    set: sr,
    delete: lr,
    clear: ur,
    forEach: vt(!1, !1)
  }, t = {
    get(o) {
      return pt(this, o, !1, !0);
    },
    get size() {
      return gt(this);
    },
    has: mt,
    add: ar,
    set: sr,
    delete: lr,
    clear: ur,
    forEach: vt(!1, !0)
  }, n = {
    get(o) {
      return pt(this, o, !0);
    },
    get size() {
      return gt(this, !0);
    },
    has(o) {
      return mt.call(this, o, !0);
    },
    add: ce(
      "add"
      /* ADD */
    ),
    set: ce(
      "set"
      /* SET */
    ),
    delete: ce(
      "delete"
      /* DELETE */
    ),
    clear: ce(
      "clear"
      /* CLEAR */
    ),
    forEach: vt(!0, !1)
  }, r = {
    get(o) {
      return pt(this, o, !0, !0);
    },
    get size() {
      return gt(this, !0);
    },
    has(o) {
      return mt.call(this, o, !0);
    },
    add: ce(
      "add"
      /* ADD */
    ),
    set: ce(
      "set"
      /* SET */
    ),
    delete: ce(
      "delete"
      /* DELETE */
    ),
    clear: ce(
      "clear"
      /* CLEAR */
    ),
    forEach: vt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = yt(o, !1, !1), n[o] = yt(o, !0, !1), t[o] = yt(o, !1, !0), r[o] = yt(o, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
var [Ma, La, Hs, Ws] = /* @__PURE__ */ Pa();
function Ei(e, t) {
  const n = e ? La : Ma;
  return (r, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(Ht(n, i) && i in r ? n : r, i, o);
}
var ja = {
  get: /* @__PURE__ */ Ei(!1)
}, Fa = {
  get: /* @__PURE__ */ Ei(!0)
};
function xi(e, t, n) {
  const r = I(n);
  if (r !== n && t.call(e, r)) {
    const i = gi(e);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var Ci = /* @__PURE__ */ new WeakMap(), ka = /* @__PURE__ */ new WeakMap(), Si = /* @__PURE__ */ new WeakMap(), Ba = /* @__PURE__ */ new WeakMap();
function za(e) {
  switch (e) {
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
function Ha(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : za(gi(e));
}
function Gn(e) {
  return e && e.__v_isReadonly ? e : Di(e, !1, $a, ja, Ci);
}
function Ai(e) {
  return Di(e, !0, Na, Fa, Si);
}
function Di(e, t, n, r, i) {
  if (!Wt(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const a = Ha(e);
  if (a === 0)
    return e;
  const s = new Proxy(e, a === 2 ? r : n);
  return i.set(e, s), s;
}
function I(e) {
  return e && I(e.__v_raw) || e;
}
function xn(e) {
  return !!(e && e.__v_isRef === !0);
}
Z("nextTick", () => Bn);
Z("dispatch", (e) => et.bind(et, e));
Z("watch", (e, { evaluateLater: t, cleanup: n }) => (r, i) => {
  let o = t(r), s = Cr(() => {
    let l;
    return o((u) => l = u), l;
  }, i);
  n(s);
});
Z("store", ra);
Z("data", (e) => $r(e));
Z("root", (e) => kt(e));
Z("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = ut(Wa(e))), e._x_refs_proxy));
function Wa(e) {
  let t = [];
  return He(e, (n) => {
    n._x_refs && t.push(n._x_refs);
  }), t;
}
var Gt = {};
function Ii(e) {
  return Gt[e] || (Gt[e] = 0), ++Gt[e];
}
function Ka(e, t) {
  return He(e, (n) => {
    if (n._x_ids && n._x_ids[t])
      return !0;
  });
}
function Ya(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Ii(t));
}
Z("id", (e, { cleanup: t }) => (n, r = null) => {
  let i = `${n}${r ? `-${r}` : ""}`;
  return Xa(e, i, t, () => {
    let o = Ka(e, n), a = o ? o._x_ids[n] : Ii(n);
    return r ? `${n}-${a}-${r}` : `${n}-${a}`;
  });
});
zt((e, t) => {
  e._x_id && (t._x_id = e._x_id);
});
function Xa(e, t, n, r) {
  if (e._x_id || (e._x_id = {}), e._x_id[t])
    return e._x_id[t];
  let i = r();
  return e._x_id[t] = i, n(() => {
    delete e._x_id[t];
  }), i;
}
Z("el", (e) => e);
Oi("Focus", "focus", "focus");
Oi("Persist", "persist", "persist");
function Oi(e, t, n) {
  Z(t, (r) => J(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
M("modelable", (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
  let o = r(t), a = () => {
    let c;
    return o((d) => c = d), c;
  }, s = r(`${t} = __placeholder`), l = (c) => s(() => {
  }, { scope: { __placeholder: c } }), u = a();
  l(u), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let c = e._x_model.get, d = e._x_model.set, h = di(
      {
        get() {
          return c();
        },
        set(m) {
          d(m);
        }
      },
      {
        get() {
          return a();
        },
        set(m) {
          l(m);
        }
      }
    );
    i(h);
  });
});
M("teleport", (e, { modifiers: t, expression: n }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && J("x-teleport can only be used on a <template> tag", e);
  let i = cr(n), o = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = o, o._x_teleportBack = e, e.setAttribute("data-teleport-template", !0), o.setAttribute("data-teleport-target", !0), e._x_forwardEvents && e._x_forwardEvents.forEach((s) => {
    o.addEventListener(s, (l) => {
      l.stopPropagation(), e.dispatchEvent(new l.constructor(l.type, l));
    });
  }), lt(o, {}, e);
  let a = (s, l, u) => {
    u.includes("prepend") ? l.parentNode.insertBefore(s, l) : u.includes("append") ? l.parentNode.insertBefore(s, l.nextSibling) : l.appendChild(s);
  };
  R(() => {
    a(o, i, t), ge(() => {
      oe(o);
    })();
  }), e._x_teleportPutBack = () => {
    let s = cr(n);
    R(() => {
      a(e._x_teleport, s, t);
    });
  }, r(
    () => R(() => {
      o.remove(), We(o);
    })
  );
});
var qa = document.createElement("div");
function cr(e) {
  let t = ge(() => document.querySelector(e), () => qa)();
  return t || J(`Cannot find x-teleport element for selector: "${e}"`), t;
}
var Ti = () => {
};
Ti.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, n(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
M("ignore", Ti);
M("effect", ge((e, { expression: t }, { effect: n }) => {
  n(z(e, t));
}));
function Cn(e, t, n, r) {
  let i = e, o = (l) => r(l), a = {}, s = (l, u) => (c) => u(l, c);
  if (n.includes("dot") && (t = Ja(t)), n.includes("camel") && (t = Ga(t)), n.includes("passive") && (a.passive = !0), n.includes("capture") && (a.capture = !0), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("debounce")) {
    let l = n[n.indexOf("debounce") + 1] || "invalid-wait", u = Nt(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    o = ui(o, u);
  }
  if (n.includes("throttle")) {
    let l = n[n.indexOf("throttle") + 1] || "invalid-wait", u = Nt(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    o = ci(o, u);
  }
  return n.includes("prevent") && (o = s(o, (l, u) => {
    u.preventDefault(), l(u);
  })), n.includes("stop") && (o = s(o, (l, u) => {
    u.stopPropagation(), l(u);
  })), n.includes("once") && (o = s(o, (l, u) => {
    l(u), i.removeEventListener(t, o, a);
  })), (n.includes("away") || n.includes("outside")) && (i = document, o = s(o, (l, u) => {
    e.contains(u.target) || u.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && l(u));
  })), n.includes("self") && (o = s(o, (l, u) => {
    u.target === e && l(u);
  })), (Va(t) || Ri(t)) && (o = s(o, (l, u) => {
    Za(u, n) || l(u);
  })), i.addEventListener(t, o, a), () => {
    i.removeEventListener(t, o, a);
  };
}
function Ja(e) {
  return e.replace(/-/g, ".");
}
function Ga(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Nt(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Ua(e) {
  return [" ", "_"].includes(
    e
  ) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function Va(e) {
  return ["keydown", "keyup"].includes(e);
}
function Ri(e) {
  return ["contextmenu", "click", "mouse"].some((t) => e.includes(t));
}
function Za(e, t) {
  let n = t.filter((o) => !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(o));
  if (n.includes("debounce")) {
    let o = n.indexOf("debounce");
    n.splice(o, Nt((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.includes("throttle")) {
    let o = n.indexOf("throttle");
    n.splice(o, Nt((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && dr(e.key).includes(n[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) => n.includes(o));
  return n = n.filter((o) => !i.includes(o)), !(i.length > 0 && i.filter((a) => ((a === "cmd" || a === "super") && (a = "meta"), e[`${a}Key`])).length === i.length && (Ri(e.type) || dr(e.key).includes(n[0])));
}
function dr(e) {
  if (!e)
    return [];
  e = Ua(e);
  let t = {
    ctrl: "control",
    slash: "/",
    space: " ",
    spacebar: " ",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    comma: ",",
    equal: "=",
    minus: "-",
    underscore: "_"
  };
  return t[e] = e, Object.keys(t).map((n) => {
    if (t[n] === e)
      return n;
  }).filter((n) => n);
}
M("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let o = e;
  t.includes("parent") && (o = e.parentNode);
  let a = z(o, n), s;
  typeof n == "string" ? s = z(o, `${n} = __placeholder`) : typeof n == "function" && typeof n() == "string" ? s = z(o, `${n()} = __placeholder`) : s = () => {
  };
  let l = () => {
    let h;
    return a((m) => h = m), fr(h) ? h.get() : h;
  }, u = (h) => {
    let m;
    a((y) => m = y), fr(m) ? m.set(h) : s(() => {
    }, {
      scope: { __placeholder: h }
    });
  };
  typeof n == "string" && e.type === "radio" && R(() => {
    e.hasAttribute("name") || e.setAttribute("name", n);
  });
  var c = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let d = pe ? () => {
  } : Cn(e, c, t, (h) => {
    u(Ut(e, t, h, l()));
  });
  if (t.includes("fill") && ([void 0, null, ""].includes(l()) || Hn(e) && Array.isArray(l()) || e.tagName.toLowerCase() === "select" && e.multiple) && u(
    Ut(e, t, { target: e }, l())
  ), e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = d, i(() => e._x_removeModelListeners.default()), e.form) {
    let h = Cn(e.form, "reset", [], (m) => {
      Bn(() => e._x_model && e._x_model.set(Ut(e, t, { target: e }, l())));
    });
    i(() => h());
  }
  e._x_model = {
    get() {
      return l();
    },
    set(h) {
      u(h);
    }
  }, e._x_forceModelUpdate = (h) => {
    h === void 0 && typeof n == "string" && n.match(/\./) && (h = ""), window.fromModel = !0, R(() => ii(e, "value", h)), delete window.fromModel;
  }, r(() => {
    let h = l();
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(h);
  });
});
function Ut(e, t, n, r) {
  return R(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail !== null && n.detail !== void 0 ? n.detail : n.target.value;
    if (Hn(e))
      if (Array.isArray(r)) {
        let i = null;
        return t.includes("number") ? i = Vt(n.target.value) : t.includes("boolean") ? i = Ct(n.target.value) : i = n.target.value, n.target.checked ? r.includes(i) ? r : r.concat([i]) : r.filter((o) => !Qa(o, i));
      } else
        return n.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(n.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return Vt(o);
        }) : t.includes("boolean") ? Array.from(n.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return Ct(o);
        }) : Array.from(n.target.selectedOptions).map((i) => i.value || i.text);
      {
        let i;
        return li(e) ? n.target.checked ? i = n.target.value : i = r : i = n.target.value, t.includes("number") ? Vt(i) : t.includes("boolean") ? Ct(i) : t.includes("trim") ? i.trim() : i;
      }
    }
  });
}
function Vt(e) {
  let t = e ? parseFloat(e) : null;
  return es(t) ? t : e;
}
function Qa(e, t) {
  return e == t;
}
function es(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function fr(e) {
  return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function";
}
M("cloak", (e) => queueMicrotask(() => R(() => e.removeAttribute(ze("cloak")))));
Zr(() => `[${ze("init")}]`);
M("init", ge((e, { expression: t }, { evaluate: n }) => typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)));
M("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((o) => {
      R(() => {
        e.textContent = o;
      });
    });
  });
});
M("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((o) => {
      R(() => {
        e.innerHTML = o, e._x_ignoreSelf = !0, oe(e), delete e._x_ignoreSelf;
      });
    });
  });
});
jn(Hr(":", Wr(ze("bind:"))));
var $i = (e, { value: t, modifiers: n, expression: r, original: i }, { effect: o, cleanup: a }) => {
  if (!t) {
    let l = {};
    oa(l), z(e, r)((c) => {
      hi(e, c, i);
    }, { scope: l });
    return;
  }
  if (t === "key")
    return ts(e, r);
  if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract)
    return;
  let s = z(e, r);
  o(() => s((l) => {
    l === void 0 && typeof r == "string" && r.match(/\./) && (l = ""), R(() => ii(e, t, l, n));
  })), a(() => {
    e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedStyles && e._x_undoAddedStyles();
  });
};
$i.inline = (e, { value: t, modifiers: n, expression: r }) => {
  t && (e._x_inlineBindings || (e._x_inlineBindings = {}), e._x_inlineBindings[t] = { expression: r, extract: !1 });
};
M("bind", $i);
function ts(e, t) {
  e._x_keyExpression = t;
}
Vr(() => `[${ze("data")}]`);
M("data", (e, { expression: t }, { cleanup: n }) => {
  if (ns(e))
    return;
  t = t === "" ? "{}" : t;
  let r = {};
  hn(r, e);
  let i = {};
  sa(i, r);
  let o = Ae(e, t, { scope: i });
  (o === void 0 || o === !0) && (o = {}), hn(o, e);
  let a = ke(o);
  Nr(a);
  let s = lt(e, a);
  a.init && Ae(e, a.init), n(() => {
    a.destroy && Ae(e, a.destroy), s();
  });
});
zt((e, t) => {
  e._x_dataStack && (t._x_dataStack = e._x_dataStack, t.setAttribute("data-has-alpine-state", !0));
});
function ns(e) {
  return pe ? wn ? !0 : e.hasAttribute("data-has-alpine-state") : !1;
}
M("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = z(e, n);
  e._x_doHide || (e._x_doHide = () => {
    R(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    R(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let o = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, a = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, s = () => setTimeout(a), l = yn(
    (d) => d ? a() : o(),
    (d) => {
      typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, d, a, o) : d ? s() : o();
    }
  ), u, c = !0;
  r(() => i((d) => {
    !c && d === u || (t.includes("immediate") && (d ? s() : o()), l(d), u = d, c = !1);
  }));
});
M("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = is(t), o = z(e, i.items), a = z(
    e,
    // the x-bind:key expression is stored for our use instead of evaluated.
    e._x_keyExpression || "index"
  );
  e._x_prevKeys = [], e._x_lookup = {}, n(() => rs(e, i, o, a)), r(() => {
    Object.values(e._x_lookup).forEach((s) => R(
      () => {
        We(s), s.remove();
      }
    )), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function rs(e, t, n, r) {
  let i = (a) => typeof a == "object" && !Array.isArray(a), o = e;
  n((a) => {
    os(a) && a >= 0 && (a = Array.from(Array(a).keys(), (p) => p + 1)), a === void 0 && (a = []);
    let s = e._x_lookup, l = e._x_prevKeys, u = [], c = [];
    if (i(a))
      a = Object.entries(a).map(([p, E]) => {
        let w = hr(t, E, p, a);
        r((A) => {
          c.includes(A) && J("Duplicate key on x-for", e), c.push(A);
        }, { scope: { index: p, ...w } }), u.push(w);
      });
    else
      for (let p = 0; p < a.length; p++) {
        let E = hr(t, a[p], p, a);
        r((w) => {
          c.includes(w) && J("Duplicate key on x-for", e), c.push(w);
        }, { scope: { index: p, ...E } }), u.push(E);
      }
    let d = [], h = [], m = [], y = [];
    for (let p = 0; p < l.length; p++) {
      let E = l[p];
      c.indexOf(E) === -1 && m.push(E);
    }
    l = l.filter((p) => !m.includes(p));
    let b = "template";
    for (let p = 0; p < c.length; p++) {
      let E = c[p], w = l.indexOf(E);
      if (w === -1)
        l.splice(p, 0, E), d.push([b, p]);
      else if (w !== p) {
        let A = l.splice(p, 1)[0], D = l.splice(w - 1, 1)[0];
        l.splice(p, 0, D), l.splice(w, 0, A), h.push([A, D]);
      } else
        y.push(E);
      b = E;
    }
    for (let p = 0; p < m.length; p++) {
      let E = m[p];
      E in s && (R(() => {
        We(s[E]), s[E].remove();
      }), delete s[E]);
    }
    for (let p = 0; p < h.length; p++) {
      let [E, w] = h[p], A = s[E], D = s[w], H = document.createElement("div");
      R(() => {
        D || J('x-for ":key" is undefined or invalid', o, w, s), D.after(H), A.after(D), D._x_currentIfEl && D.after(D._x_currentIfEl), H.before(A), A._x_currentIfEl && A.after(A._x_currentIfEl), H.remove();
      }), D._x_refreshXForScope(u[c.indexOf(w)]);
    }
    for (let p = 0; p < d.length; p++) {
      let [E, w] = d[p], A = E === "template" ? o : s[E];
      A._x_currentIfEl && (A = A._x_currentIfEl);
      let D = u[w], H = c[w], j = document.importNode(o.content, !0).firstElementChild, Q = ke(D);
      lt(j, Q, o), j._x_refreshXForScope = (ve) => {
        Object.entries(ve).forEach(([k, ye]) => {
          Q[k] = ye;
        });
      }, R(() => {
        A.after(j), ge(() => oe(j))();
      }), typeof H == "object" && J("x-for key cannot be an object, it must be a string or an integer", o), s[H] = j;
    }
    for (let p = 0; p < y.length; p++)
      s[y[p]]._x_refreshXForScope(u[c.indexOf(y[p])]);
    o._x_prevKeys = c;
  });
}
function is(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = e.match(r);
  if (!i)
    return;
  let o = {};
  o.items = i[2].trim();
  let a = i[1].replace(n, "").trim(), s = a.match(t);
  return s ? (o.item = a.replace(t, "").trim(), o.index = s[1].trim(), s[2] && (o.collection = s[2].trim())) : o.item = a, o;
}
function hr(e, t, n, r) {
  let i = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((a) => a.trim()).forEach((a, s) => {
    i[a] = t[s];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((a) => a.trim()).forEach((a) => {
    i[a] = t[a];
  }) : i[e.item] = t, e.index && (i[e.index] = n), e.collection && (i[e.collection] = r), i;
}
function os(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Ni() {
}
Ni.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = kt(e);
  r._x_refs || (r._x_refs = {}), r._x_refs[t] = e, n(() => delete r._x_refs[t]);
};
M("ref", Ni);
M("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && J("x-if can only be used on a <template> tag", e);
  let i = z(e, t), o = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let s = e.content.cloneNode(!0).firstElementChild;
    return lt(s, {}, e), R(() => {
      e.after(s), ge(() => oe(s))();
    }), e._x_currentIfEl = s, e._x_undoIf = () => {
      R(() => {
        We(s), s.remove();
      }), delete e._x_currentIfEl;
    }, s;
  }, a = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  n(() => i((s) => {
    s ? o() : a();
  })), r(() => e._x_undoIf && e._x_undoIf());
});
M("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => Ya(e, i));
});
zt((e, t) => {
  e._x_ids && (t._x_ids = e._x_ids);
});
jn(Hr("@", Wr(ze("on:"))));
M("on", ge((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
  let o = r ? z(e, r) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let a = Cn(e, t, n, (s) => {
    o(() => {
    }, { scope: { $event: s }, params: [s] });
  });
  i(() => a());
}));
Yt("Collapse", "collapse", "collapse");
Yt("Intersect", "intersect", "intersect");
Yt("Focus", "trap", "focus");
Yt("Mask", "mask", "mask");
function Yt(e, t, n) {
  M(t, (r) => J(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
ct.setEvaluator(Fr);
ct.setReactivityEngine({ reactive: Gn, effect: va, release: ya, raw: I });
var as = ct, C = as;
function pr(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ne(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pr(Object(n), !0).forEach(function(r) {
      ss(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pr(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function St(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? St = function(t) {
    return typeof t;
  } : St = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, St(e);
}
function ss(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function ae() {
  return ae = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ae.apply(this, arguments);
}
function ls(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, o;
  for (o = 0; o < r.length; o++)
    i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function us(e, t) {
  if (e == null)
    return {};
  var n = ls(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (i = 0; i < o.length; i++)
      r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var cs = "1.15.2";
function ie(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var se = ie(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), dt = ie(/Edge/i), mr = ie(/firefox/i), nt = ie(/safari/i) && !ie(/chrome/i) && !ie(/android/i), Pi = ie(/iP(ad|od|hone)/i), Mi = ie(/chrome/i) && ie(/android/i), Li = {
  capture: !1,
  passive: !1
};
function S(e, t, n) {
  e.addEventListener(t, n, !se && Li);
}
function x(e, t, n) {
  e.removeEventListener(t, n, !se && Li);
}
function Pt(e, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), e)
      try {
        if (e.matches)
          return e.matches(t);
        if (e.msMatchesSelector)
          return e.msMatchesSelector(t);
        if (e.webkitMatchesSelector)
          return e.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function ds(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function U(e, t, n, r) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && Pt(e, t) : Pt(e, t)) || r && e === n)
        return e;
      if (e === n)
        break;
    } while (e = ds(e));
  }
  return null;
}
var gr = /\s+/g;
function K(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var r = (" " + e.className + " ").replace(gr, " ").replace(" " + t + " ", " ");
      e.className = (r + (n ? " " + t : "")).replace(gr, " ");
    }
}
function g(e, t, n) {
  var r = e && e.style;
  if (r) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
    !(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
  }
}
function Me(e, t) {
  var n = "";
  if (typeof e == "string")
    n = e;
  else
    do {
      var r = g(e, "transform");
      r && r !== "none" && (n = r + " " + n);
    } while (!t && (e = e.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(n);
}
function ji(e, t, n) {
  if (e) {
    var r = e.getElementsByTagName(t), i = 0, o = r.length;
    if (n)
      for (; i < o; i++)
        n(r[i], i);
    return r;
  }
  return [];
}
function te() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function P(e, t, n, r, i) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var o, a, s, l, u, c, d;
    if (e !== window && e.parentNode && e !== te() ? (o = e.getBoundingClientRect(), a = o.top, s = o.left, l = o.bottom, u = o.right, c = o.height, d = o.width) : (a = 0, s = 0, l = window.innerHeight, u = window.innerWidth, c = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !se))
      do
        if (i && i.getBoundingClientRect && (g(i, "transform") !== "none" || n && g(i, "position") !== "static")) {
          var h = i.getBoundingClientRect();
          a -= h.top + parseInt(g(i, "border-top-width")), s -= h.left + parseInt(g(i, "border-left-width")), l = a + o.height, u = s + o.width;
          break;
        }
      while (i = i.parentNode);
    if (r && e !== window) {
      var m = Me(i || e), y = m && m.a, b = m && m.d;
      m && (a /= b, s /= y, d /= y, c /= b, l = a + c, u = s + d);
    }
    return {
      top: a,
      left: s,
      bottom: l,
      right: u,
      width: d,
      height: c
    };
  }
}
function vr(e, t, n) {
  for (var r = he(e, !0), i = P(e)[t]; r; ) {
    var o = P(r)[n], a = void 0;
    if (a = i >= o, !a)
      return r;
    if (r === te())
      break;
    r = he(r, !1);
  }
  return !1;
}
function Fe(e, t, n, r) {
  for (var i = 0, o = 0, a = e.children; o < a.length; ) {
    if (a[o].style.display !== "none" && a[o] !== v.ghost && (r || a[o] !== v.dragged) && U(a[o], n.draggable, e, !1)) {
      if (i === t)
        return a[o];
      i++;
    }
    o++;
  }
  return null;
}
function Un(e, t) {
  for (var n = e.lastElementChild; n && (n === v.ghost || g(n, "display") === "none" || t && !Pt(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function q(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== v.clone && (!t || Pt(e, t)) && n++;
  return n;
}
function yr(e) {
  var t = 0, n = 0, r = te();
  if (e)
    do {
      var i = Me(e), o = i.a, a = i.d;
      t += e.scrollLeft * o, n += e.scrollTop * a;
    } while (e !== r && (e = e.parentNode));
  return [t, n];
}
function fs(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      for (var r in t)
        if (t.hasOwnProperty(r) && t[r] === e[n][r])
          return Number(n);
    }
  return -1;
}
function he(e, t) {
  if (!e || !e.getBoundingClientRect)
    return te();
  var n = e, r = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var i = g(n);
      if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body)
          return te();
        if (r || t)
          return n;
        r = !0;
      }
    }
  while (n = n.parentNode);
  return te();
}
function hs(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Zt(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var rt;
function Fi(e, t) {
  return function() {
    if (!rt) {
      var n = arguments, r = this;
      n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), rt = setTimeout(function() {
        rt = void 0;
      }, t);
    }
  };
}
function ps() {
  clearTimeout(rt), rt = void 0;
}
function ki(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function Bi(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function zi(e, t, n) {
  var r = {};
  return Array.from(e.children).forEach(function(i) {
    var o, a, s, l;
    if (!(!U(i, t.draggable, e, !1) || i.animated || i === n)) {
      var u = P(i);
      r.left = Math.min((o = r.left) !== null && o !== void 0 ? o : 1 / 0, u.left), r.top = Math.min((a = r.top) !== null && a !== void 0 ? a : 1 / 0, u.top), r.right = Math.max((s = r.right) !== null && s !== void 0 ? s : -1 / 0, u.right), r.bottom = Math.max((l = r.bottom) !== null && l !== void 0 ? l : -1 / 0, u.bottom);
    }
  }), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var X = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function ms() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var r = [].slice.call(this.el.children);
        r.forEach(function(i) {
          if (!(g(i, "display") === "none" || i === v.ghost)) {
            e.push({
              target: i,
              rect: P(i)
            });
            var o = ne({}, e[e.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = Me(i, !0);
              a && (o.top -= a.f, o.left -= a.e);
            }
            i.fromRect = o;
          }
        });
      }
    },
    addAnimationState: function(r) {
      e.push(r);
    },
    removeAnimationState: function(r) {
      e.splice(fs(e, {
        target: r
      }), 1);
    },
    animateAll: function(r) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof r == "function" && r();
        return;
      }
      var o = !1, a = 0;
      e.forEach(function(s) {
        var l = 0, u = s.target, c = u.fromRect, d = P(u), h = u.prevFromRect, m = u.prevToRect, y = s.rect, b = Me(u, !0);
        b && (d.top -= b.f, d.left -= b.e), u.toRect = d, u.thisAnimationDuration && Zt(h, d) && !Zt(c, d) && // Make sure animatingRect is on line between toRect & fromRect
        (y.top - d.top) / (y.left - d.left) === (c.top - d.top) / (c.left - d.left) && (l = vs(y, h, m, i.options)), Zt(d, c) || (u.prevFromRect = c, u.prevToRect = d, l || (l = i.options.animation), i.animate(u, y, d, l)), l && (o = !0, a = Math.max(a, l), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, l), u.thisAnimationDuration = l);
      }), clearTimeout(t), o ? t = setTimeout(function() {
        typeof r == "function" && r();
      }, a) : typeof r == "function" && r(), e = [];
    },
    animate: function(r, i, o, a) {
      if (a) {
        g(r, "transition", ""), g(r, "transform", "");
        var s = Me(this.el), l = s && s.a, u = s && s.d, c = (i.left - o.left) / (l || 1), d = (i.top - o.top) / (u || 1);
        r.animatingX = !!c, r.animatingY = !!d, g(r, "transform", "translate3d(" + c + "px," + d + "px,0)"), this.forRepaintDummy = gs(r), g(r, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), g(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function() {
          g(r, "transition", ""), g(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1;
        }, a);
      }
    }
  };
}
function gs(e) {
  return e.offsetWidth;
}
function vs(e, t, n, r) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation;
}
var Re = [], Qt = {
  initializeByDefault: !0
}, ft = {
  mount: function(t) {
    for (var n in Qt)
      Qt.hasOwnProperty(n) && !(n in t) && (t[n] = Qt[n]);
    Re.forEach(function(r) {
      if (r.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), Re.push(t);
  },
  pluginEvent: function(t, n, r) {
    var i = this;
    this.eventCanceled = !1, r.cancel = function() {
      i.eventCanceled = !0;
    };
    var o = t + "Global";
    Re.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][o] && n[a.pluginName][o](ne({
        sortable: n
      }, r)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](ne({
        sortable: n
      }, r)));
    });
  },
  initializePlugins: function(t, n, r, i) {
    Re.forEach(function(s) {
      var l = s.pluginName;
      if (!(!t.options[l] && !s.initializeByDefault)) {
        var u = new s(t, n, t.options);
        u.sortable = t, u.options = t.options, t[l] = u, ae(r, u.defaults);
      }
    });
    for (var o in t.options)
      if (t.options.hasOwnProperty(o)) {
        var a = this.modifyOption(t, o, t.options[o]);
        typeof a < "u" && (t.options[o] = a);
      }
  },
  getEventProperties: function(t, n) {
    var r = {};
    return Re.forEach(function(i) {
      typeof i.eventProperties == "function" && ae(r, i.eventProperties.call(n[i.pluginName], t));
    }), r;
  },
  modifyOption: function(t, n, r) {
    var i;
    return Re.forEach(function(o) {
      t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r));
    }), i;
  }
};
function ys(e) {
  var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, a = e.toEl, s = e.fromEl, l = e.oldIndex, u = e.newIndex, c = e.oldDraggableIndex, d = e.newDraggableIndex, h = e.originalEvent, m = e.putSortable, y = e.extraEventProperties;
  if (t = t || n && n[X], !!t) {
    var b, p = t.options, E = "on" + r.charAt(0).toUpperCase() + r.substr(1);
    window.CustomEvent && !se && !dt ? b = new CustomEvent(r, {
      bubbles: !0,
      cancelable: !0
    }) : (b = document.createEvent("Event"), b.initEvent(r, !0, !0)), b.to = a || n, b.from = s || n, b.item = i || n, b.clone = o, b.oldIndex = l, b.newIndex = u, b.oldDraggableIndex = c, b.newDraggableIndex = d, b.originalEvent = h, b.pullMode = m ? m.lastPutMode : void 0;
    var w = ne(ne({}, y), ft.getEventProperties(r, t));
    for (var A in w)
      b[A] = w[A];
    n && n.dispatchEvent(b), p[E] && p[E].call(t, b);
  }
}
var _s = ["evt"], W = function(t, n) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = us(r, _s);
  ft.pluginEvent.bind(v)(t, n, ne({
    dragEl: f,
    parentEl: $,
    ghostEl: _,
    rootEl: O,
    nextEl: xe,
    lastDownEl: At,
    cloneEl: T,
    cloneHidden: fe,
    dragStarted: Ve,
    putSortable: L,
    activeSortable: v.active,
    originalEvent: i,
    oldIndex: Pe,
    oldDraggableIndex: it,
    newIndex: Y,
    newDraggableIndex: de,
    hideGhostForTarget: Yi,
    unhideGhostForTarget: Xi,
    cloneNowHidden: function() {
      fe = !0;
    },
    cloneNowShown: function() {
      fe = !1;
    },
    dispatchSortableEvent: function(s) {
      B({
        sortable: n,
        name: s,
        originalEvent: i
      });
    }
  }, o));
};
function B(e) {
  ys(ne({
    putSortable: L,
    cloneEl: T,
    targetEl: f,
    rootEl: O,
    oldIndex: Pe,
    oldDraggableIndex: it,
    newIndex: Y,
    newDraggableIndex: de
  }, e));
}
var f, $, _, O, xe, At, T, fe, Pe, Y, it, de, _t, L, Ne = !1, Mt = !1, Lt = [], we, G, en, tn, _r, wr, Ve, $e, ot, at = !1, wt = !1, Dt, F, nn = [], Sn = !1, jt = [], Xt = typeof document < "u", bt = Pi, br = dt || se ? "cssFloat" : "float", ws = Xt && !Mi && !Pi && "draggable" in document.createElement("div"), Hi = function() {
  if (Xt) {
    if (se)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
}(), Wi = function(t, n) {
  var r = g(t), i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth), o = Fe(t, 0, n), a = Fe(t, 1, n), s = o && g(o), l = a && g(a), u = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + P(o).width, c = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + P(a).width;
  if (r.display === "flex")
    return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (r.display === "grid")
    return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (o && s.float && s.float !== "none") {
    var d = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
  }
  return o && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || u >= i && r[br] === "none" || a && r[br] === "none" && u + c > i) ? "vertical" : "horizontal";
}, bs = function(t, n, r) {
  var i = r ? t.left : t.top, o = r ? t.right : t.bottom, a = r ? t.width : t.height, s = r ? n.left : n.top, l = r ? n.right : n.bottom, u = r ? n.width : n.height;
  return i === s || o === l || i + a / 2 === s + u / 2;
}, Es = function(t, n) {
  var r;
  return Lt.some(function(i) {
    var o = i[X].options.emptyInsertThreshold;
    if (!(!o || Un(i))) {
      var a = P(i), s = t >= a.left - o && t <= a.right + o, l = n >= a.top - o && n <= a.bottom + o;
      if (s && l)
        return r = i;
    }
  }), r;
}, Ki = function(t) {
  function n(o, a) {
    return function(s, l, u, c) {
      var d = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
      if (o == null && (a || d))
        return !0;
      if (o == null || o === !1)
        return !1;
      if (a && o === "clone")
        return o;
      if (typeof o == "function")
        return n(o(s, l, u, c), a)(s, l, u, c);
      var h = (a ? s : l).options.group.name;
      return o === !0 || typeof o == "string" && o === h || o.join && o.indexOf(h) > -1;
    };
  }
  var r = {}, i = t.group;
  (!i || St(i) != "object") && (i = {
    name: i
  }), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r;
}, Yi = function() {
  !Hi && _ && g(_, "display", "none");
}, Xi = function() {
  !Hi && _ && g(_, "display", "");
};
Xt && !Mi && document.addEventListener("click", function(e) {
  if (Mt)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Mt = !1, !1;
}, !0);
var be = function(t) {
  if (f) {
    t = t.touches ? t.touches[0] : t;
    var n = Es(t.clientX, t.clientY);
    if (n) {
      var r = {};
      for (var i in t)
        t.hasOwnProperty(i) && (r[i] = t[i]);
      r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[X]._onDragOver(r);
    }
  }
}, xs = function(t) {
  f && f.parentNode[X]._isOutsideThisEl(t.target);
};
function v(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = ae({}, t), e[X] = this;
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return Wi(e, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(a, s) {
      a.setData("Text", s.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: v.supportPointer !== !1 && "PointerEvent" in window && !nt,
    emptyInsertThreshold: 5
  };
  ft.initializePlugins(this, e, n);
  for (var r in n)
    !(r in t) && (t[r] = n[r]);
  Ki(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : ws, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? S(e, "pointerdown", this._onTapStart) : (S(e, "mousedown", this._onTapStart), S(e, "touchstart", this._onTapStart)), this.nativeDraggable && (S(e, "dragover", this), S(e, "dragenter", this)), Lt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), ae(this, ms());
}
v.prototype = /** @lends Sortable.prototype */
{
  constructor: v,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && ($e = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, f) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, r = this.el, i = this.options, o = i.preventOnFilter, a = t.type, s = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, l = (s || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || l, c = i.filter;
      if (Rs(r), !f && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && nt && l && l.tagName.toUpperCase() === "SELECT") && (l = U(l, i.draggable, r, !1), !(l && l.animated) && At !== l)) {
        if (Pe = q(l), it = q(l, i.draggable), typeof c == "function") {
          if (c.call(this, t, l, this)) {
            B({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: l,
              toEl: r,
              fromEl: r
            }), W("filter", n, {
              evt: t
            }), o && t.cancelable && t.preventDefault();
            return;
          }
        } else if (c && (c = c.split(",").some(function(d) {
          if (d = U(u, d.trim(), r, !1), d)
            return B({
              sortable: n,
              rootEl: d,
              name: "filter",
              targetEl: l,
              fromEl: r,
              toEl: r
            }), W("filter", n, {
              evt: t
            }), !0;
        }), c)) {
          o && t.cancelable && t.preventDefault();
          return;
        }
        i.handle && !U(u, i.handle, r, !1) || this._prepareDragStart(t, s, l);
      }
    }
  },
  _prepareDragStart: function(t, n, r) {
    var i = this, o = i.el, a = i.options, s = o.ownerDocument, l;
    if (r && !f && r.parentNode === o) {
      var u = P(r);
      if (O = o, f = r, $ = f.parentNode, xe = f.nextSibling, At = r, _t = a.group, v.dragged = f, we = {
        target: f,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, _r = we.clientX - u.left, wr = we.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, f.style["will-change"] = "all", l = function() {
        if (W("delayEnded", i, {
          evt: t
        }), v.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !mr && i.nativeDraggable && (f.draggable = !0), i._triggerDragStart(t, n), B({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), K(f, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(c) {
        ji(f, c.trim(), rn);
      }), S(s, "dragover", be), S(s, "mousemove", be), S(s, "touchmove", be), S(s, "mouseup", i._onDrop), S(s, "touchend", i._onDrop), S(s, "touchcancel", i._onDrop), mr && this.nativeDraggable && (this.options.touchStartThreshold = 4, f.draggable = !0), W("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(dt || se))) {
        if (v.eventCanceled) {
          this._onDrop();
          return;
        }
        S(s, "mouseup", i._disableDelayedDrag), S(s, "touchend", i._disableDelayedDrag), S(s, "touchcancel", i._disableDelayedDrag), S(s, "mousemove", i._delayedDragTouchMoveHandler), S(s, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && S(s, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(l, a.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    f && rn(f), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    x(t, "mouseup", this._disableDelayedDrag), x(t, "touchend", this._disableDelayedDrag), x(t, "touchcancel", this._disableDelayedDrag), x(t, "mousemove", this._delayedDragTouchMoveHandler), x(t, "touchmove", this._delayedDragTouchMoveHandler), x(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? S(document, "pointermove", this._onTouchMove) : n ? S(document, "touchmove", this._onTouchMove) : S(document, "mousemove", this._onTouchMove) : (S(f, "dragend", this), S(O, "dragstart", this._onDragStart));
    try {
      document.selection ? It(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (Ne = !1, O && f) {
      W("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && S(document, "dragover", xs);
      var r = this.options;
      !t && K(f, r.dragClass, !1), K(f, r.ghostClass, !0), v.active = this, t && this._appendGhost(), B({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (G) {
      this._lastX = G.clientX, this._lastY = G.clientY, Yi();
      for (var t = document.elementFromPoint(G.clientX, G.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(G.clientX, G.clientY), t !== n); )
        n = t;
      if (f.parentNode[X]._isOutsideThisEl(t), n)
        do {
          if (n[X]) {
            var r = void 0;
            if (r = n[X]._onDragOver({
              clientX: G.clientX,
              clientY: G.clientY,
              target: t,
              rootEl: n
            }), r && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = n.parentNode);
      Xi();
    }
  },
  _onTouchMove: function(t) {
    if (we) {
      var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t, a = _ && Me(_, !0), s = _ && a && a.a, l = _ && a && a.d, u = bt && F && yr(F), c = (o.clientX - we.clientX + i.x) / (s || 1) + (u ? u[0] - nn[0] : 0) / (s || 1), d = (o.clientY - we.clientY + i.y) / (l || 1) + (u ? u[1] - nn[1] : 0) / (l || 1);
      if (!v.active && !Ne) {
        if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r)
          return;
        this._onDragStart(t, !0);
      }
      if (_) {
        a ? (a.e += c - (en || 0), a.f += d - (tn || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: c,
          f: d
        };
        var h = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        g(_, "webkitTransform", h), g(_, "mozTransform", h), g(_, "msTransform", h), g(_, "transform", h), en = c, tn = d, G = o;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!_) {
      var t = this.options.fallbackOnBody ? document.body : O, n = P(f, !0, bt, !0, t), r = this.options;
      if (bt) {
        for (F = t; g(F, "position") === "static" && g(F, "transform") === "none" && F !== document; )
          F = F.parentNode;
        F !== document.body && F !== document.documentElement ? (F === document && (F = te()), n.top += F.scrollTop, n.left += F.scrollLeft) : F = te(), nn = yr(F);
      }
      _ = f.cloneNode(!0), K(_, r.ghostClass, !1), K(_, r.fallbackClass, !0), K(_, r.dragClass, !0), g(_, "transition", ""), g(_, "transform", ""), g(_, "box-sizing", "border-box"), g(_, "margin", 0), g(_, "top", n.top), g(_, "left", n.left), g(_, "width", n.width), g(_, "height", n.height), g(_, "opacity", "0.8"), g(_, "position", bt ? "absolute" : "fixed"), g(_, "zIndex", "100000"), g(_, "pointerEvents", "none"), v.ghost = _, t.appendChild(_), g(_, "transform-origin", _r / parseInt(_.style.width) * 100 + "% " + wr / parseInt(_.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var r = this, i = t.dataTransfer, o = r.options;
    if (W("dragStart", this, {
      evt: t
    }), v.eventCanceled) {
      this._onDrop();
      return;
    }
    W("setupClone", this), v.eventCanceled || (T = Bi(f), T.removeAttribute("id"), T.draggable = !1, T.style["will-change"] = "", this._hideClone(), K(T, this.options.chosenClass, !1), v.clone = T), r.cloneId = It(function() {
      W("clone", r), !v.eventCanceled && (r.options.removeCloneOnHide || O.insertBefore(T, f), r._hideClone(), B({
        sortable: r,
        name: "clone"
      }));
    }), !n && K(f, o.dragClass, !0), n ? (Mt = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (x(document, "mouseup", r._onDrop), x(document, "touchend", r._onDrop), x(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, f)), S(document, "drop", r), g(f, "transform", "translateZ(0)")), Ne = !0, r._dragStartId = It(r._dragStarted.bind(r, n, t)), S(document, "selectstart", r), Ve = !0, nt && g(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, r = t.target, i, o, a, s = this.options, l = s.group, u = v.active, c = _t === l, d = s.sort, h = L || u, m, y = this, b = !1;
    if (Sn)
      return;
    function p(Xe, Ji) {
      W(Xe, y, ne({
        evt: t,
        isOwner: c,
        axis: m ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: o,
        canSort: d,
        fromSortable: h,
        target: r,
        completed: w,
        onMove: function(Qn, Gi) {
          return Et(O, n, f, i, Qn, P(Qn), t, Gi);
        },
        changed: A
      }, Ji));
    }
    function E() {
      p("dragOverAnimationCapture"), y.captureAnimationState(), y !== h && h.captureAnimationState();
    }
    function w(Xe) {
      return p("dragOverCompleted", {
        insertion: Xe
      }), Xe && (c ? u._hideClone() : u._showClone(y), y !== h && (K(f, L ? L.options.ghostClass : u.options.ghostClass, !1), K(f, s.ghostClass, !0)), L !== y && y !== v.active ? L = y : y === v.active && L && (L = null), h === y && (y._ignoreWhileAnimating = r), y.animateAll(function() {
        p("dragOverAnimationComplete"), y._ignoreWhileAnimating = null;
      }), y !== h && (h.animateAll(), h._ignoreWhileAnimating = null)), (r === f && !f.animated || r === n && !r.animated) && ($e = null), !s.dragoverBubble && !t.rootEl && r !== document && (f.parentNode[X]._isOutsideThisEl(t.target), !Xe && be(t)), !s.dragoverBubble && t.stopPropagation && t.stopPropagation(), b = !0;
    }
    function A() {
      Y = q(f), de = q(f, s.draggable), B({
        sortable: y,
        name: "change",
        toEl: n,
        newIndex: Y,
        newDraggableIndex: de,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = U(r, s.draggable, n, !0), p("dragOver"), v.eventCanceled)
      return b;
    if (f.contains(t.target) || r.animated && r.animatingX && r.animatingY || y._ignoreWhileAnimating === r)
      return w(!1);
    if (Mt = !1, u && !s.disabled && (c ? d || (a = $ !== O) : L === this || (this.lastPutMode = _t.checkPull(this, u, f, t)) && l.checkPut(this, u, f, t))) {
      if (m = this._getDirection(t, r) === "vertical", i = P(f), p("dragOverValid"), v.eventCanceled)
        return b;
      if (a)
        return $ = O, E(), this._hideClone(), p("revert"), v.eventCanceled || (xe ? O.insertBefore(f, xe) : O.appendChild(f)), w(!0);
      var D = Un(n, s.draggable);
      if (!D || Ds(t, m, this) && !D.animated) {
        if (D === f)
          return w(!1);
        if (D && n === t.target && (r = D), r && (o = P(r)), Et(O, n, f, i, r, o, t, !!r) !== !1)
          return E(), D && D.nextSibling ? n.insertBefore(f, D.nextSibling) : n.appendChild(f), $ = n, A(), w(!0);
      } else if (D && As(t, m, this)) {
        var H = Fe(n, 0, s, !0);
        if (H === f)
          return w(!1);
        if (r = H, o = P(r), Et(O, n, f, i, r, o, t, !1) !== !1)
          return E(), n.insertBefore(f, H), $ = n, A(), w(!0);
      } else if (r.parentNode === n) {
        o = P(r);
        var j = 0, Q, ve = f.parentNode !== n, k = !bs(f.animated && f.toRect || i, r.animated && r.toRect || o, m), ye = m ? "top" : "left", le = vr(r, "top", "top") || vr(f, "top", "top"), Ke = le ? le.scrollTop : void 0;
        $e !== r && (Q = o[ye], at = !1, wt = !k && s.invertSwap || ve), j = Is(t, r, o, m, k ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, wt, $e === r);
        var re;
        if (j !== 0) {
          var _e = q(f);
          do
            _e -= j, re = $.children[_e];
          while (re && (g(re, "display") === "none" || re === _));
        }
        if (j === 0 || re === r)
          return w(!1);
        $e = r, ot = j;
        var Ye = r.nextElementSibling, ue = !1;
        ue = j === 1;
        var ht = Et(O, n, f, i, r, o, t, ue);
        if (ht !== !1)
          return (ht === 1 || ht === -1) && (ue = ht === 1), Sn = !0, setTimeout(Ss, 30), E(), ue && !Ye ? n.appendChild(f) : r.parentNode.insertBefore(f, ue ? Ye : r), le && ki(le, 0, Ke - le.scrollTop), $ = f.parentNode, Q !== void 0 && !wt && (Dt = Math.abs(Q - P(r)[ye])), A(), w(!0);
      }
      if (n.contains(f))
        return w(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    x(document, "mousemove", this._onTouchMove), x(document, "touchmove", this._onTouchMove), x(document, "pointermove", this._onTouchMove), x(document, "dragover", be), x(document, "mousemove", be), x(document, "touchmove", be);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    x(t, "mouseup", this._onDrop), x(t, "touchend", this._onDrop), x(t, "pointerup", this._onDrop), x(t, "touchcancel", this._onDrop), x(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, r = this.options;
    if (Y = q(f), de = q(f, r.draggable), W("drop", this, {
      evt: t
    }), $ = f && f.parentNode, Y = q(f), de = q(f, r.draggable), v.eventCanceled) {
      this._nulling();
      return;
    }
    Ne = !1, wt = !1, at = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), An(this.cloneId), An(this._dragStartId), this.nativeDraggable && (x(document, "drop", this), x(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), nt && g(document.body, "user-select", ""), g(f, "transform", ""), t && (Ve && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), _ && _.parentNode && _.parentNode.removeChild(_), (O === $ || L && L.lastPutMode !== "clone") && T && T.parentNode && T.parentNode.removeChild(T), f && (this.nativeDraggable && x(f, "dragend", this), rn(f), f.style["will-change"] = "", Ve && !Ne && K(f, L ? L.options.ghostClass : this.options.ghostClass, !1), K(f, this.options.chosenClass, !1), B({
      sortable: this,
      name: "unchoose",
      toEl: $,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), O !== $ ? (Y >= 0 && (B({
      rootEl: $,
      name: "add",
      toEl: $,
      fromEl: O,
      originalEvent: t
    }), B({
      sortable: this,
      name: "remove",
      toEl: $,
      originalEvent: t
    }), B({
      rootEl: $,
      name: "sort",
      toEl: $,
      fromEl: O,
      originalEvent: t
    }), B({
      sortable: this,
      name: "sort",
      toEl: $,
      originalEvent: t
    })), L && L.save()) : Y !== Pe && Y >= 0 && (B({
      sortable: this,
      name: "update",
      toEl: $,
      originalEvent: t
    }), B({
      sortable: this,
      name: "sort",
      toEl: $,
      originalEvent: t
    })), v.active && ((Y == null || Y === -1) && (Y = Pe, de = it), B({
      sortable: this,
      name: "end",
      toEl: $,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    W("nulling", this), O = f = $ = _ = xe = T = At = fe = we = G = Ve = Y = de = Pe = it = $e = ot = L = _t = v.dragged = v.ghost = v.clone = v.active = null, jt.forEach(function(t) {
      t.checked = !0;
    }), jt.length = en = tn = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        f && (this._onDragOver(t), Cs(t));
        break;
      case "selectstart":
        t.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var t = [], n, r = this.el.children, i = 0, o = r.length, a = this.options; i < o; i++)
      n = r[i], U(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || Ts(n));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, n) {
    var r = {}, i = this.el;
    this.toArray().forEach(function(o, a) {
      var s = i.children[a];
      U(s, this.options.draggable, i, !1) && (r[o] = s);
    }, this), n && this.captureAnimationState(), t.forEach(function(o) {
      r[o] && (i.removeChild(r[o]), i.appendChild(r[o]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var t = this.options.store;
    t && t.set && t.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(t, n) {
    return U(t, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(t, n) {
    var r = this.options;
    if (n === void 0)
      return r[t];
    var i = ft.modifyOption(this, t, n);
    typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && Ki(r);
  },
  /**
   * Destroy
   */
  destroy: function() {
    W("destroy", this);
    var t = this.el;
    t[X] = null, x(t, "mousedown", this._onTapStart), x(t, "touchstart", this._onTapStart), x(t, "pointerdown", this._onTapStart), this.nativeDraggable && (x(t, "dragover", this), x(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Lt.splice(Lt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!fe) {
      if (W("hideClone", this), v.eventCanceled)
        return;
      g(T, "display", "none"), this.options.removeCloneOnHide && T.parentNode && T.parentNode.removeChild(T), fe = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (fe) {
      if (W("showClone", this), v.eventCanceled)
        return;
      f.parentNode == O && !this.options.group.revertClone ? O.insertBefore(T, f) : xe ? O.insertBefore(T, xe) : O.appendChild(T), this.options.group.revertClone && this.animate(f, T), g(T, "display", ""), fe = !1;
    }
  }
};
function Cs(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function Et(e, t, n, r, i, o, a, s) {
  var l, u = e[X], c = u.options.onMove, d;
  return window.CustomEvent && !se && !dt ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = t, l.from = e, l.dragged = n, l.draggedRect = r, l.related = i || t, l.relatedRect = o || P(t), l.willInsertAfter = s, l.originalEvent = a, e.dispatchEvent(l), c && (d = c.call(u, l, a)), d;
}
function rn(e) {
  e.draggable = !1;
}
function Ss() {
  Sn = !1;
}
function As(e, t, n) {
  var r = P(Fe(n.el, 0, n.options, !0)), i = zi(n.el, n.options, _), o = 10;
  return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left;
}
function Ds(e, t, n) {
  var r = P(Un(n.el, n.options.draggable)), i = zi(n.el, n.options, _), o = 10;
  return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top;
}
function Is(e, t, n, r, i, o, a, s) {
  var l = r ? e.clientY : e.clientX, u = r ? n.height : n.width, c = r ? n.top : n.left, d = r ? n.bottom : n.right, h = !1;
  if (!a) {
    if (s && Dt < u * i) {
      if (!at && (ot === 1 ? l > c + u * o / 2 : l < d - u * o / 2) && (at = !0), at)
        h = !0;
      else if (ot === 1 ? l < c + Dt : l > d - Dt)
        return -ot;
    } else if (l > c + u * (1 - i) / 2 && l < d - u * (1 - i) / 2)
      return Os(t);
  }
  return h = h || a, h && (l < c + u * o / 2 || l > d - u * o / 2) ? l > c + u / 2 ? 1 : -1 : 0;
}
function Os(e) {
  return q(f) < q(e) ? 1 : -1;
}
function Ts(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--; )
    r += t.charCodeAt(n);
  return r.toString(36);
}
function Rs(e) {
  jt.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var r = t[n];
    r.checked && jt.push(r);
  }
}
function It(e) {
  return setTimeout(e, 0);
}
function An(e) {
  return clearTimeout(e);
}
Xt && S(document, "touchmove", function(e) {
  (v.active || Ne) && e.cancelable && e.preventDefault();
});
v.utils = {
  on: S,
  off: x,
  css: g,
  find: ji,
  is: function(t, n) {
    return !!U(t, n, t, !1);
  },
  extend: hs,
  throttle: Fi,
  closest: U,
  toggleClass: K,
  clone: Bi,
  index: q,
  nextTick: It,
  cancelNextTick: An,
  detectDirection: Wi,
  getChild: Fe
};
v.get = function(e) {
  return e[X];
};
v.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(r) {
    if (!r.prototype || !r.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
    r.utils && (v.utils = ne(ne({}, v.utils), r.utils)), ft.mount(r);
  });
};
v.create = function(e, t) {
  return new v(e, t);
};
v.version = cs;
var N = [], Ze, Dn, In = !1, on, an, Ft, Qe;
function $s() {
  function e() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var t in this)
      t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this));
  }
  return e.prototype = {
    dragStarted: function(n) {
      var r = n.originalEvent;
      this.sortable.nativeDraggable ? S(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? S(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? S(document, "touchmove", this._handleFallbackAutoScroll) : S(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var r = n.originalEvent;
      !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r);
    },
    drop: function() {
      this.sortable.nativeDraggable ? x(document, "dragover", this._handleAutoScroll) : (x(document, "pointermove", this._handleFallbackAutoScroll), x(document, "touchmove", this._handleFallbackAutoScroll), x(document, "mousemove", this._handleFallbackAutoScroll)), Er(), Ot(), ps();
    },
    nulling: function() {
      Ft = Dn = Ze = In = Qe = on = an = null, N.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, r) {
      var i = this, o = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, s = document.elementFromPoint(o, a);
      if (Ft = n, r || this.options.forceAutoScrollFallback || dt || se || nt) {
        sn(n, this.options, s, r);
        var l = he(s, !0);
        In && (!Qe || o !== on || a !== an) && (Qe && Er(), Qe = setInterval(function() {
          var u = he(document.elementFromPoint(o, a), !0);
          u !== l && (l = u, Ot()), sn(n, i.options, u, r);
        }, 10), on = o, an = a);
      } else {
        if (!this.options.bubbleScroll || he(s, !0) === te()) {
          Ot();
          return;
        }
        sn(n, this.options, he(s, !1), !1);
      }
    }
  }, ae(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Ot() {
  N.forEach(function(e) {
    clearInterval(e.pid);
  }), N = [];
}
function Er() {
  clearInterval(Qe);
}
var sn = Fi(function(e, t, n, r) {
  if (t.scroll) {
    var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, s = t.scrollSpeed, l = te(), u = !1, c;
    Dn !== n && (Dn = n, Ot(), Ze = t.scroll, c = t.scrollFn, Ze === !0 && (Ze = he(n, !0)));
    var d = 0, h = Ze;
    do {
      var m = h, y = P(m), b = y.top, p = y.bottom, E = y.left, w = y.right, A = y.width, D = y.height, H = void 0, j = void 0, Q = m.scrollWidth, ve = m.scrollHeight, k = g(m), ye = m.scrollLeft, le = m.scrollTop;
      m === l ? (H = A < Q && (k.overflowX === "auto" || k.overflowX === "scroll" || k.overflowX === "visible"), j = D < ve && (k.overflowY === "auto" || k.overflowY === "scroll" || k.overflowY === "visible")) : (H = A < Q && (k.overflowX === "auto" || k.overflowX === "scroll"), j = D < ve && (k.overflowY === "auto" || k.overflowY === "scroll"));
      var Ke = H && (Math.abs(w - i) <= a && ye + A < Q) - (Math.abs(E - i) <= a && !!ye), re = j && (Math.abs(p - o) <= a && le + D < ve) - (Math.abs(b - o) <= a && !!le);
      if (!N[d])
        for (var _e = 0; _e <= d; _e++)
          N[_e] || (N[_e] = {});
      (N[d].vx != Ke || N[d].vy != re || N[d].el !== m) && (N[d].el = m, N[d].vx = Ke, N[d].vy = re, clearInterval(N[d].pid), (Ke != 0 || re != 0) && (u = !0, N[d].pid = setInterval((function() {
        r && this.layer === 0 && v.active._onTouchMove(Ft);
        var Ye = N[this.layer].vy ? N[this.layer].vy * s : 0, ue = N[this.layer].vx ? N[this.layer].vx * s : 0;
        typeof c == "function" && c.call(v.dragged.parentNode[X], ue, Ye, e, Ft, N[this.layer].el) !== "continue" || ki(N[this.layer].el, ue, Ye);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && h !== l && (h = he(h, !1)));
    In = u;
  }
}, 30), qi = function(t) {
  var n = t.originalEvent, r = t.putSortable, i = t.dragEl, o = t.activeSortable, a = t.dispatchSortableEvent, s = t.hideGhostForTarget, l = t.unhideGhostForTarget;
  if (n) {
    var u = r || o;
    s();
    var c = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, d = document.elementFromPoint(c.clientX, c.clientY);
    l(), u && !u.el.contains(d) && (a("spill"), this.onSpill({
      dragEl: i,
      putSortable: r
    }));
  }
};
function Vn() {
}
Vn.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable;
    this.sortable.captureAnimationState(), r && r.captureAnimationState();
    var i = Fe(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll();
  },
  drop: qi
};
ae(Vn, {
  pluginName: "revertOnSpill"
});
function Zn() {
}
Zn.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
    i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll();
  },
  drop: qi
};
ae(Zn, {
  pluginName: "removeOnSpill"
});
v.mount(new $s());
v.mount(Zn, Vn);
var Ns = v;
function Ps(e) {
  e.directive("sort", (t, { value: n, modifiers: r, expression: i }, { effect: o, evaluate: a, evaluateLater: s, cleanup: l }) => {
    if (n === "config" || n === "handle" || n === "group")
      return;
    if (n === "key" || n === "item") {
      if ([void 0, null, ""].includes(i))
        return;
      t._x_sort_key = a(i);
      return;
    }
    let u = {
      hideGhost: !r.includes("ghost"),
      useHandles: !!t.querySelector("[x-sort\\:handle]"),
      group: ks(t, r)
    }, c = Ms(i, s), d = Ls(t, r, a), h = js(t, d, u, (m, y) => {
      c(m, y);
    });
    l(() => h.destroy());
  });
}
function Ms(e, t) {
  if ([void 0, null, ""].includes(e))
    return () => {
    };
  let n = t(e);
  return (r, i) => {
    Alpine.dontAutoEvaluateFunctions(() => {
      n(
        // If a function is returned, call it with the key/position params...
        (o) => {
          typeof o == "function" && o(r, i);
        },
        // Provide $key and $position to the scope in case they want to call their own function...
        { scope: {
          // Supporting both `$item` AND `$key` ($key for BC)...
          $key: r,
          $item: r,
          $position: i
        } }
      );
    });
  };
}
function Ls(e, t, n) {
  return e.hasAttribute("x-sort:config") ? n(e.getAttribute("x-sort:config")) : {};
}
function js(e, t, n, r) {
  let i, o = {
    animation: 150,
    handle: n.useHandles ? "[x-sort\\:handle]" : null,
    group: n.group,
    filter(a) {
      return e.querySelector("[x-sort\\:item]") ? !a.target.closest("[x-sort\\:item]") : !1;
    },
    onSort(a) {
      if (a.from !== a.to && a.to !== a.target)
        return;
      let s = a.item._x_sort_key, l = a.newIndex;
      (s !== void 0 || s !== null) && r(s, l);
    },
    onStart() {
      document.body.classList.add("sorting"), i = document.querySelector(".sortable-ghost"), n.hideGhost && i && (i.style.opacity = "0");
    },
    onEnd() {
      document.body.classList.remove("sorting"), n.hideGhost && i && (i.style.opacity = "1"), i = void 0, Fs(e);
    }
  };
  return new Ns(e, { ...o, ...t });
}
function Fs(e) {
  let t = e.firstChild;
  for (; t.nextSibling; ) {
    if (t.textContent.trim() === "[if ENDBLOCK]><![endif]") {
      e.append(t);
      break;
    }
    t = t.nextSibling;
  }
}
function ks(e, t) {
  return e.hasAttribute("x-sort:group") ? e.getAttribute("x-sort:group") : t.indexOf("group") !== -1 ? t[t.indexOf("group") + 1] : null;
}
var Bs = Ps;
/*! Bundled license information:

sortablejs/modular/sortable.esm.js:
  (**!
   * Sortable 1.15.2
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
C.plugin(Bs);
window.addEventListener("alpine:init", () => {
  C.data("filamentor", () => ({
    showSettings: !1,
    activeRow: null,
    activeColumn: null,
    activeColumnIndex: null,
    activeElement: null,
    activeElementIndex: null,
    rowToDelete: null,
    columnToDeleteRowId: null,
    columnToDeleteIndex: null,
    elementData: {
      text: { content: null },
      image: { url: null, alt: null, thumbnail: null },
      video: { url: null }
    },
    ...Ui(),
    /**
     * Initializes the page builder with saved layout data
     * Parses saved JSON layout from the hidden input field and loads it into the Alpine store
     * Falls back to an empty layout if parsing fails or data is invalid
     */
    init() {
      try {
        if (!this.$refs.canvasData) {
          console.warn("Canvas data reference not found");
          return;
        }
        const e = this.$refs.canvasData.value;
        if (e)
          try {
            const t = JSON.parse(e);
            if (!Array.isArray(t)) {
              console.error("Parsed layout is not an array");
              return;
            }
            const n = t.sort((r, i) => {
              const o = r.order !== void 0 ? r.order : 0, a = i.order !== void 0 ? i.order : 0;
              return o - a;
            });
            C.store("rows").setRows(n);
          } catch (t) {
            console.error("Failed to parse layout JSON:", t), C.store("rows").setRows([]);
          }
      } catch (e) {
        console.error("Error initializing builder:", e), C.store("rows").setRows([]);
      }
    },
    /**
     * Opens the settings panel for a specific row
     * Sets the row as active and initializes any missing properties with defaults
     * 
     * @param {Object} row - The row object to edit settings for
     */
    openRowSettings(e) {
      try {
        if (!e || !e.id) {
          console.error("Invalid row provided to openRowSettings");
          return;
        }
        if (this.activeRow = C.store("rows").items.find((t) => t.id === e.id), !this.activeRow) {
          console.error(`Row with id ${e.id} not found`);
          return;
        }
        this.activeRow.padding = this.activeRow.padding || { top: 0, right: 0, bottom: 0, left: 0 }, this.activeRow.margin = this.activeRow.margin || { top: 0, right: 0, bottom: 0, left: 0 }, this.activeRow.customClasses = this.activeRow.customClasses || "", this.showSettings = !0;
      } catch (t) {
        console.error("Error opening row settings:", t), this.activeRow = null, this.showSettings = !1;
      }
    },
    /**
     * Saves settings for the currently active row
     * Updates the row in the store with validated values and saves the layout
     * Sends the updated layout to the server via Livewire
     */
    saveRowSettings() {
      try {
        if (!this.activeRow) {
          console.warn("No active row to save");
          return;
        }
        if (!this.activeRow.id) {
          console.error("Active row missing ID property");
          return;
        }
        const e = C.store("rows").items.findIndex((i) => i.id === this.activeRow.id);
        if (e === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`);
          return;
        }
        const t = this.activeRow.padding || {}, n = this.activeRow.margin || {}, r = {
          ...this.activeRow,
          padding: {
            top: this.safeParseNumber(t.top),
            right: this.safeParseNumber(t.right),
            bottom: this.safeParseNumber(t.bottom),
            left: this.safeParseNumber(t.left)
          },
          margin: {
            top: this.safeParseNumber(n.top),
            right: this.safeParseNumber(n.right),
            bottom: this.safeParseNumber(n.bottom),
            left: this.safeParseNumber(n.left)
          }
        };
        C.store("rows").items[e] = r;
        try {
          const i = JSON.stringify(C.store("rows").items);
          if (!this.$refs.canvasData) {
            console.error("Canvas data reference not found");
            return;
          }
          this.$refs.canvasData.value = i, this.$wire.saveLayout(i).then((o) => {
            o && o.success ? console.log("Layout saved successfully") : console.warn("Layout save returned unexpected result", o);
          }).catch((o) => {
            console.error("Error saving layout:", o);
          });
        } catch (i) {
          console.error("Error stringifying layout data:", i);
        }
      } catch (e) {
        console.error("Error in saveRowSettings:", e);
      }
    },
    /**
     * Adds a new row to the page builder canvas
     * Creates a default row with a single column and initializes
     * all required properties with sensible defaults
     */
    addRow() {
      try {
        const e = Date.now(), t = {
          id: e,
          // Unique identifier for the row
          order: C.store("rows").items.length,
          // Position in the layout (zero-based)
          // Initialize padding values to zero
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          // Initialize margin values to zero
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          customClasses: "",
          // Optional CSS classes for styling
          // Each row starts with at least one column
          columns: [{
            id: e + 1,
            // Unique identifier for the column (timestamp + 1 to ensure uniqueness)
            width: "w-full",
            // Default to full width column
            // Initialize padding values to zero
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            // Initialize margin values to zero
            margin: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            customClasses: "",
            // Optional CSS classes for styling
            elements: [],
            // Initially empty array of content elements
            order: 0
            // Position in the row (zero-based)
          }]
        };
        if (!C.store("rows") || !Array.isArray(C.store("rows").items)) {
          console.error("Rows store not properly initialized");
          return;
        }
        C.store("rows").items.push(t), this.updateCanvasData();
        try {
          const n = JSON.stringify(C.store("rows").items);
          this.$wire.saveLayout(n).then((r) => {
            r && r.success ? console.log("Row added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", r);
          }).catch((r) => {
            console.error("Error saving layout after adding row:", r);
          });
        } catch (n) {
          console.error("Error stringifying layout after adding row:", n);
        }
      } catch (e) {
        console.error("Error adding new row:", e), this.updateCanvasData();
      }
    },
    /**
     * Initiates the row deletion process
     * If the row contains elements, shows a confirmation dialog first
     * 
     * @param {Object} row - The row object to be deleted
     */
    deleteRow(e) {
      try {
        if (!e || typeof e != "object" || !e.id) {
          console.error("Invalid row provided for deletion");
          return;
        }
        if (!Array.isArray(e.columns)) {
          console.warn("Row has no columns array, proceeding with deletion"), this.performRowDeletion(e);
          return;
        }
        e.columns.some(
          (n) => n.elements && Array.isArray(n.elements) && n.elements.length > 0
        ) ? (this.rowToDelete = e, this.$dispatch("open-modal", { id: "confirm-row-deletion" })) : this.performRowDeletion(e);
      } catch (t) {
        console.error("Error during row deletion process:", t), this.rowToDelete = null;
      }
    },
    /**
     * Confirms row deletion after user approval
     * Called from the confirmation modal
     */
    confirmRowDeletion() {
      try {
        if (!this.rowToDelete || !this.rowToDelete.id) {
          console.error("No valid row to delete"), this.$dispatch("close-modal", { id: "confirm-row-deletion" });
          return;
        }
        this.performRowDeletion(this.rowToDelete), this.$dispatch("close-modal", { id: "confirm-row-deletion" }), this.rowToDelete = null;
      } catch (e) {
        console.error("Error during row deletion confirmation:", e), this.$dispatch("close-modal", { id: "confirm-row-deletion" }), this.rowToDelete = null;
      }
    },
    /**
     * Performs the actual row deletion and reorders remaining rows
     * 
     * @param {Object} row - The row object to be deleted
     */
    performRowDeletion(e) {
      try {
        if (!e || !e.id) {
          console.error("Invalid row provided to performRowDeletion");
          return;
        }
        if (!C.store("rows") || !Array.isArray(C.store("rows").items)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const t = C.store("rows").items.findIndex((n) => n.id === e.id);
        if (t > -1) {
          C.store("rows").items.splice(t, 1), C.store("rows").items = C.store("rows").items.map((n, r) => ({
            ...n,
            order: r
            // Reassign order based on array position
          }));
          try {
            const n = JSON.stringify(C.store("rows").items);
            this.updateCanvasData(), this.$wire.saveLayout(n).then((r) => {
              r && r.success ? console.log("Row deleted and layout saved successfully") : console.warn("Layout saved after deletion but returned unexpected result", r);
            }).catch((r) => {
              console.error("Error saving layout after row deletion:", r);
            });
          } catch (n) {
            console.error("Error stringifying layout after row deletion:", n);
          }
        } else
          console.warn(`Row with id ${e.id} not found in rows store`);
      } catch (t) {
        console.error("Error performing row deletion:", t), this.updateCanvasData();
      }
    },
    /**
     * Opens the column settings modal and prepares column data for editing
     * 
     * @param {Object} row - The parent row object containing the column
     * @param {Object} column - The column object to be edited
     */
    openColumnSettings(e, t) {
      try {
        if (!e || !e.id) {
          console.error("Invalid row provided to openColumnSettings");
          return;
        }
        if (!t || !t.id) {
          console.error("Invalid column provided to openColumnSettings");
          return;
        }
        this.activeRow = e, this.activeColumn = t, this.activeColumn.padding = this.activeColumn.padding || { top: 0, right: 0, bottom: 0, left: 0 }, this.activeColumn.margin = this.activeColumn.margin || { top: 0, right: 0, bottom: 0, left: 0 }, this.activeColumn.customClasses = this.activeColumn.customClasses || "", typeof this.activeColumn.padding == "object" && (this.activeColumn.padding.top = this.safeParseNumber(this.activeColumn.padding.top), this.activeColumn.padding.right = this.safeParseNumber(this.activeColumn.padding.right), this.activeColumn.padding.bottom = this.safeParseNumber(this.activeColumn.padding.bottom), this.activeColumn.padding.left = this.safeParseNumber(this.activeColumn.padding.left)), typeof this.activeColumn.margin == "object" && (this.activeColumn.margin.top = this.safeParseNumber(this.activeColumn.margin.top), this.activeColumn.margin.right = this.safeParseNumber(this.activeColumn.margin.right), this.activeColumn.margin.bottom = this.safeParseNumber(this.activeColumn.margin.bottom), this.activeColumn.margin.left = this.safeParseNumber(this.activeColumn.margin.left));
      } catch (n) {
        console.error("Error opening column settings:", n), this.activeRow = null, this.activeColumn = null;
      }
    },
    /**
     * Saves the column settings and updates the layout
     * Called when user confirms changes in the column settings modal
     */
    saveColumnSettings() {
      try {
        if (!this.activeColumn || !this.activeColumn.id) {
          console.error("No valid column to save settings for"), this.$dispatch("close-modal", { id: "column-settings-modal" });
          return;
        }
        if (!this.activeRow || !this.activeRow.id) {
          console.error("No valid parent row for column settings"), this.$dispatch("close-modal", { id: "column-settings-modal" });
          return;
        }
        const e = C.store("rows").items, t = e.findIndex((r) => r.id === this.activeRow.id);
        if (t === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`), this.$dispatch("close-modal", { id: "column-settings-modal" });
          return;
        }
        const n = e[t].columns.findIndex((r) => r.id === this.activeColumn.id);
        if (n === -1) {
          console.error(`Column with id ${this.activeColumn.id} not found in row`), this.$dispatch("close-modal", { id: "column-settings-modal" });
          return;
        }
        e[t].columns[n] = {
          ...this.activeColumn,
          padding: {
            top: this.safeParseNumber(this.activeColumn.padding.top),
            right: this.safeParseNumber(this.activeColumn.padding.right),
            bottom: this.safeParseNumber(this.activeColumn.padding.bottom),
            left: this.safeParseNumber(this.activeColumn.padding.left)
          },
          margin: {
            top: this.safeParseNumber(this.activeColumn.margin.top),
            right: this.safeParseNumber(this.activeColumn.margin.right),
            bottom: this.safeParseNumber(this.activeColumn.margin.bottom),
            left: this.safeParseNumber(this.activeColumn.margin.left)
          }
        };
        try {
          const r = JSON.stringify(e);
          this.updateCanvasData(), this.$wire.saveLayout(r).then((i) => {
            i && i.success ? console.log("Column settings saved successfully") : console.warn("Layout saved but returned unexpected result", i);
          }).catch((i) => {
            console.error("Error saving layout after column settings update:", i);
          }), this.$dispatch("close-modal", { id: "column-settings-modal" });
        } catch (r) {
          console.error("Error stringifying layout after column settings update:", r), this.$dispatch("close-modal", { id: "column-settings-modal" });
        }
      } catch (e) {
        console.error("Error saving column settings:", e), this.$dispatch("close-modal", { id: "column-settings-modal" });
      }
    },
    /**
     * Adds a new column to an existing row
     * Creates a column with default settings and appends it to the row's columns array
     * 
     * @param {Object} row - The row object to add the column to
     */
    addColumn(e) {
      try {
        if (!e || typeof e != "object" || !e.id) {
          console.error("Invalid row provided to addColumn");
          return;
        }
        Array.isArray(e.columns) || (console.warn("Row has no columns array, initializing empty array"), e.columns = []);
        const n = {
          id: Date.now(),
          // Unique identifier for the column
          elements: [],
          // Initialize with no elements
          order: e.columns.length,
          // Position in the row (zero-based)
          width: "w-full",
          // Default width class (Tailwind full width)
          // Initialize padding values to zero
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          // Initialize margin values to zero
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          customClasses: ""
          // Optional CSS classes for styling
        }, r = [...e.columns, n];
        e.columns = r, this.$nextTick(() => {
          try {
            const i = C.store("rows").items;
            if (!i || !Array.isArray(i)) {
              console.error("Rows store not properly initialized");
              return;
            }
            if (i.findIndex((s) => s.id === e.id) === -1) {
              console.error(`Row with id ${e.id} not found in rows store`);
              return;
            }
            this.updateCanvasData();
            const a = JSON.stringify(i);
            this.$wire.saveLayout(a).then((s) => {
              s && s.success ? console.log("Column added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", s);
            }).catch((s) => {
              console.error("Error saving layout after adding column:", s);
            });
          } catch (i) {
            console.error("Error processing or saving layout after adding column:", i);
          }
        });
      } catch (t) {
        console.error("Error adding new column:", t);
      }
    },
    /**
     * Updates the number of columns in the active row
     * Adds new columns or shows confirmation dialog for column reduction
     * 
     * @param {number|string} newCount - The new number of columns to set
     */
    updateColumns(e) {
      try {
        if (!this.activeRow || typeof this.activeRow != "object") {
          console.error("No active row to update columns for");
          return;
        }
        Array.isArray(this.activeRow.columns) || (console.warn("Active row has no columns array, initializing empty array"), this.activeRow.columns = []);
        const t = parseInt(e);
        if (isNaN(t) || t < 1) {
          console.error(`Invalid column count: ${e}`);
          return;
        }
        const n = this.activeRow.columns;
        if (t > n.length)
          try {
            const r = t - n.length, i = Date.now();
            for (let a = 0; a < r; a++)
              n.push({
                id: i + a,
                // Ensure unique IDs across columns
                elements: [],
                // Start with empty elements array
                order: n.length,
                // Set order based on current position
                width: "w-full",
                // Default width class
                padding: { top: 0, right: 0, bottom: 0, left: 0 },
                margin: { top: 0, right: 0, bottom: 0, left: 0 },
                customClasses: ""
              });
            this.activeRow.columns.forEach((a, s) => {
              a.order = s;
            });
            const o = C.store("rows").items;
            if (!o || !Array.isArray(o)) {
              console.error("Rows store not properly initialized");
              return;
            }
            this.updateCanvasData();
            try {
              const a = JSON.stringify(o);
              this.$wire.saveLayout(a).then((s) => {
                s && s.success ? console.log("Columns added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", s);
              }).catch((s) => {
                console.error("Error saving layout after adding columns:", s);
              });
            } catch (a) {
              console.error("Error stringifying layout after adding columns:", a);
            }
          } catch (r) {
            console.error("Error adding columns:", r);
          }
        else if (t < n.length)
          try {
            this.newColumnCount = t, this.activeRow.columns.slice(t).some(
              (o) => o.elements && Array.isArray(o.elements) && o.elements.length > 0
            ) ? this.$dispatch("open-modal", { id: "confirm-column-reduction" }) : this.confirmColumnReduction();
          } catch (r) {
            console.error("Error preparing column reduction:", r);
          }
        else
          console.log("Column count unchanged");
      } catch (t) {
        console.error("Error updating columns:", t);
      }
    },
    /**
     * Initiates the column deletion process
     * If the column contains elements, shows a confirmation dialog first
     * 
     * @param {Object} row - The parent row object containing the column
     * @param {number} columnIndex - The index of the column to delete
     */
    deleteColumn(e, t) {
      try {
        if (!e || typeof e != "object" || !e.id) {
          console.error("Invalid row provided to deleteColumn");
          return;
        }
        if (t === void 0 || isNaN(parseInt(t))) {
          console.error("Invalid column index provided to deleteColumn");
          return;
        }
        const n = C.store("rows").items;
        if (!n || !Array.isArray(n)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const r = n.findIndex((a) => a.id === e.id);
        if (r === -1) {
          console.error(`Row with id ${e.id} not found in rows store`);
          return;
        }
        if (!Array.isArray(n[r].columns)) {
          console.error(`Row with id ${e.id} has no valid columns array`);
          return;
        }
        if (t < 0 || t >= n[r].columns.length) {
          console.error(`Column index ${t} out of bounds for row with id ${e.id}`);
          return;
        }
        const i = n[r].columns[t];
        i && i.elements && Array.isArray(i.elements) && i.elements.length > 0 ? (this.columnToDeleteRowId = e.id, this.columnToDeleteIndex = t, this.$dispatch("open-modal", { id: "confirm-column-deletion" })) : this.performColumnDeletion(e.id, t);
      } catch (n) {
        console.error("Error during column deletion process:", n), this.columnToDeleteRowId = null, this.columnToDeleteIndex = null;
      }
    },
    /**
     * Confirms column deletion after user approval
     * Called from the confirmation modal
     */
    confirmColumnDeletion() {
      try {
        if (this.columnToDeleteRowId === null || this.columnToDeleteIndex === null) {
          console.error("No valid column to delete"), this.$dispatch("close-modal", { id: "confirm-column-deletion" });
          return;
        }
        this.performColumnDeletion(this.columnToDeleteRowId, this.columnToDeleteIndex), this.$dispatch("close-modal", { id: "confirm-column-deletion" }), this.columnToDeleteRowId = null, this.columnToDeleteIndex = null;
      } catch (e) {
        console.error("Error during column deletion confirmation:", e), this.$dispatch("close-modal", { id: "confirm-column-deletion" }), this.columnToDeleteRowId = null, this.columnToDeleteIndex = null;
      }
    },
    /**
     * Performs the actual column deletion and updates the layout
     * 
     * @param {number|string} rowId - The ID of the row containing the column
     * @param {number} columnIndex - The index of the column to delete
     */
    performColumnDeletion(e, t) {
      try {
        if (e == null) {
          console.error("Invalid rowId provided to performColumnDeletion");
          return;
        }
        if (t == null || isNaN(parseInt(t))) {
          console.error("Invalid columnIndex provided to performColumnDeletion");
          return;
        }
        const n = C.store("rows").items;
        if (!n || !Array.isArray(n)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const r = n.findIndex((i) => i.id === e);
        if (r === -1) {
          console.error(`Row with id ${e} not found in rows store`);
          return;
        }
        if (!Array.isArray(n[r].columns)) {
          console.error(`Row with id ${e} has no valid columns array`);
          return;
        }
        if (t < 0 || t >= n[r].columns.length) {
          console.error(`Column index ${t} out of bounds for row with id ${e}`);
          return;
        }
        if (n[r].columns.length === 1) {
          const i = Date.now();
          n[r].columns = [{
            id: n[r].columns[0].id,
            // Keep the same ID
            elements: [],
            // Clear elements
            order: 0,
            // Reset order
            width: "w-full",
            // Reset width
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            customClasses: ""
          }], console.log("Column content cleared instead of deletion, as it was the last column in the row");
        } else
          n[r].columns.splice(t, 1), n[r].columns = n[r].columns.map((i, o) => ({
            ...i,
            order: o
            // Reassign order based on array position
          }));
        this.updateCanvasData();
        try {
          const i = JSON.stringify(n);
          this.$wire.saveLayout(i).then((o) => {
            o && o.success ? console.log("Layout updated and saved successfully") : console.warn("Layout saved but returned unexpected result", o);
          }).catch((o) => {
            console.error("Error saving layout after column operation:", o);
          });
        } catch (i) {
          console.error("Error stringifying layout after column operation:", i);
        }
      } catch (n) {
        console.error("Error performing column deletion:", n), this.updateCanvasData();
      }
    },
    /**
     * Sets the active column for adding elements
     * 
     * @param {Object} row - The parent row object
     * @param {number} index - The index of the column to set as active
     */
    setActiveColumn(e, t) {
      try {
        if (!e || typeof e != "object" || !e.id) {
          console.error("Invalid row provided to setActiveColumn");
          return;
        }
        if (t == null || isNaN(parseInt(t))) {
          console.error("Invalid column index provided to setActiveColumn");
          return;
        }
        const n = C.store("rows").items;
        if (!n || !Array.isArray(n)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const r = n.find((o) => o.id === e.id);
        if (!r) {
          console.error(`Row with id ${e.id} not found in rows store`);
          return;
        }
        if (t < 0 || t >= r.columns.length) {
          console.error(`Column index ${t} out of bounds for row with id ${e.id}`);
          return;
        }
        const i = r.columns[t];
        if (i.elements && Array.isArray(i.elements) && i.elements.length > 0) {
          console.warn("Column already has an element. Only one element per column is allowed.");
          return;
        }
        this.activeRow = r, this.activeColumnIndex = t, this.$dispatch("open-modal", { id: "element-picker-modal" });
      } catch (n) {
        console.error("Error setting active column:", n), this.activeRow = null, this.activeColumnIndex = null;
      }
    },
    /**
     * Adds a new element to the active column
     * 
     * @param {string} elementType - The type of element to add
     */
    addElement(e) {
      try {
        if (!e || typeof e != "string") {
          console.error("Invalid element type provided to addElement");
          return;
        }
        if (!this.activeRow || this.activeColumnIndex === null) {
          console.error("No active row or column to add element to"), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const t = C.store("rows").items;
        if (!t || !Array.isArray(t)) {
          console.error("Rows store not properly initialized"), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const n = t.findIndex((s) => s.id === this.activeRow.id);
        if (n === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const r = t[n];
        if (!Array.isArray(r.columns)) {
          console.error(`Row with id ${r.id} has no valid columns array`), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        if (this.activeColumnIndex < 0 || this.activeColumnIndex >= r.columns.length) {
          console.error(`Column index ${this.activeColumnIndex} out of bounds for row with id ${r.id}`), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const i = r.columns[this.activeColumnIndex];
        if (!Array.isArray(i.elements))
          i.elements = [];
        else if (i.elements.length > 0) {
          console.warn("Column already has an element. Only one element per column is allowed."), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const o = e.replace(/Filamentor/, "\\Filamentor\\").replace(/Elements/, "Elements\\");
        let a = {};
        o.includes("Text") ? a = { text: "" } : o.includes("Image") ? a = { url: null, alt: "", thumbnail: null } : o.includes("Video") && (a = { url: "" }), t[n].columns[this.activeColumnIndex].elements.push({
          id: Date.now(),
          // Add unique ID for the element
          type: o,
          content: a
        }), this.updateCanvasData();
        try {
          const s = JSON.stringify(t);
          this.$wire.saveLayout(s).then((l) => {
            l && l.success ? console.log("Element added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", l);
          }).catch((l) => {
            console.error("Error saving layout after adding element:", l);
          });
        } catch (s) {
          console.error("Error stringifying layout after adding element:", s);
        }
        this.$dispatch("close-modal", { id: "element-picker-modal" }), this.activeRow = null, this.activeColumnIndex = null;
      } catch (t) {
        console.error("Error adding element:", t), this.$dispatch("close-modal", { id: "element-picker-modal" }), this.activeRow = null, this.activeColumnIndex = null;
      }
    },
    /**
     * Opens the element editor modal for editing an existing element
     * 
     * @param {Object} row - The row object containing the element
     * @param {number} columnIndex - The index of the column containing the element
     * @param {number} elementIndex - The index of the element to edit (defaults to 0)
     */
    editElement(e, t, n = 0) {
      try {
        if (!e || typeof e != "object" || !e.id) {
          console.error("Invalid row provided to editElement");
          return;
        }
        if (t == null || isNaN(parseInt(t))) {
          console.error("Invalid column index provided to editElement");
          return;
        }
        if (n == null || isNaN(parseInt(n))) {
          console.error("Invalid element index provided to editElement");
          return;
        }
        const r = C.store("rows").items;
        if (!r || !Array.isArray(r)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const i = r.find((u) => u.id === e.id);
        if (!i) {
          console.error(`Row with id ${e.id} not found in rows store`);
          return;
        }
        if (!Array.isArray(i.columns) || t >= i.columns.length) {
          console.error(`Column index ${t} out of bounds for row with id ${e.id}`);
          return;
        }
        const o = i.columns[t];
        if (!Array.isArray(o.elements) || o.elements.length === 0) {
          console.error(`No elements found in column ${t} of row with id ${e.id}`);
          return;
        }
        if (n >= o.elements.length) {
          console.error(`Element index ${n} out of bounds for column ${t}`);
          return;
        }
        const a = o.elements[n];
        if (!a || !a.type) {
          console.error(`Invalid element at index ${n}`);
          return;
        }
        this.activeRow = i, this.activeColumnIndex = t, this.activeElementIndex = n, this.activeElement = a;
        const s = a.type;
        if (!s) {
          console.error("Element has no type");
          return;
        }
        try {
          this.$wire.set("elementData", {
            text: { content: null },
            image: { url: null, alt: null, thumbnail: null },
            video: { url: null }
          });
        } catch (u) {
          console.error("Error resetting element data:", u);
          return;
        }
        try {
          if (s.includes("Text")) {
            const u = a.content && typeof a.content.text < "u" ? a.content.text : "";
            this.$wire.set("elementData.text.content", u);
          } else if (s.includes("Image")) {
            const u = {
              url: a.content && a.content.url ? a.content.url : null,
              alt: a.content && a.content.alt ? a.content.alt : "",
              thumbnail: a.content && a.content.thumbnail ? a.content.thumbnail : null
            };
            this.$wire.set("elementData.image", u);
          } else if (s.includes("Video")) {
            const u = a.content && a.content.url ? a.content.url : "";
            this.$wire.set("elementData.video.url", u);
          } else
            console.warn(`Unknown element type: ${s}`);
        } catch (u) {
          console.error("Error setting element data:", u);
          return;
        }
        try {
          this.$wire.editElement(s, a.content || {}, a.id).catch((u) => {
            console.error("Error in Livewire editElement method:", u);
          });
        } catch (u) {
          console.error("Error calling Livewire editElement method:", u);
          return;
        }
        const l = s.split("\\").pop() || "Unknown";
        this.$dispatch("open-modal", {
          id: "element-editor-modal",
          title: `Edit ${l} Element`
        });
      } catch (r) {
        console.error("Error editing element:", r), this.activeRow = null, this.activeColumnIndex = null, this.activeElementIndex = null, this.activeElement = null;
      }
    },
    /**
     * Saves the edited element content back to the data store
     * 
     * @param {Object} content - The content object from the editor (optional, may not be used)
     */
    saveElementContent(e) {
      try {
        if (!this.activeElement) {
          console.error("No active element to save content for"), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        if (!this.activeRow || this.activeColumnIndex === null || this.activeElementIndex === null) {
          console.error("Missing required references for element update"), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const t = C.store("rows").items;
        if (!t || !Array.isArray(t)) {
          console.error("Rows store not properly initialized"), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const n = t.findIndex((s) => s.id === this.activeRow.id);
        if (n === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const r = t[n];
        if (!Array.isArray(r.columns) || this.activeColumnIndex >= r.columns.length) {
          console.error(`Column index ${this.activeColumnIndex} out of bounds for row with id ${r.id}`), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const i = r.columns[this.activeColumnIndex];
        if (!Array.isArray(i.elements) || this.activeElementIndex >= i.elements.length) {
          console.error(`Element index ${this.activeElementIndex} out of bounds for column ${this.activeColumnIndex}`), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const o = this.activeElement.type, a = () => {
          try {
            const s = JSON.stringify(t);
            this.$wire.saveLayout(s).then((l) => {
              l && l.success ? console.log("Element content updated and layout saved successfully") : console.warn("Layout saved but returned unexpected result", l), this.$dispatch("close-modal", { id: "element-editor-modal" });
            }).catch((l) => {
              console.error("Error saving layout after updating element content:", l), this.$dispatch("close-modal", { id: "element-editor-modal" });
            });
          } catch (s) {
            console.error("Error processing layout data:", s), this.$dispatch("close-modal", { id: "element-editor-modal" });
          }
        };
        if (o.includes("Image")) {
          const s = this.$wire.get("elementData.image.alt") || "";
          this.$wire.uploadMedia().then((l) => {
            if (l && l.url)
              t[n].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                ...this.activeElement,
                content: {
                  url: l.url,
                  thumbnail: l.thumbnail,
                  alt: s
                  // Use the alt text we captured earlier
                }
              };
            else {
              const u = this.activeElement.content || {};
              t[n].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                ...this.activeElement,
                content: {
                  url: u.url || "",
                  thumbnail: u.thumbnail || "",
                  alt: s
                  // Update only the alt text
                }
              };
            }
            a();
          }).catch((l) => {
            console.error("Error during image processing:", l);
            try {
              const u = this.activeElement.content || {};
              t[n].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                ...this.activeElement,
                content: {
                  url: u.url || "",
                  thumbnail: u.thumbnail || "",
                  alt: s
                }
              }, a();
            } catch (u) {
              console.error("Error saving alt text after upload failure:", u), this.$dispatch("close-modal", { id: "element-editor-modal" });
            }
          });
        } else if (o.includes("Video"))
          try {
            const s = this.$wire.get("elementData.video.url");
            s || console.warn("Empty video URL provided"), t[n].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
              ...this.activeElement,
              content: {
                url: s || ""
              }
            }, a();
          } catch (s) {
            console.error("Error updating video element:", s), this.$dispatch("close-modal", { id: "element-editor-modal" });
          }
        else if (o.includes("Text"))
          try {
            const s = this.$wire.get("elementData.text.content");
            t[n].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
              ...this.activeElement,
              content: {
                text: s || ""
              }
            }, a();
          } catch (s) {
            console.error("Error updating text element:", s), this.$dispatch("close-modal", { id: "element-editor-modal" });
          }
        else
          console.error(`Unknown element type: ${o}`), this.$dispatch("close-modal", { id: "element-editor-modal" });
      } catch (t) {
        console.error("Error saving element content:", t), this.$dispatch("close-modal", { id: "element-editor-modal" }), this.activeRow = null, this.activeColumnIndex = null, this.activeElementIndex = null, this.activeElement = null;
      }
    },
    /**
     * Deletes an element from a column
     * 
     * @param {Object} row - The row object containing the element
     * @param {number} columnIndex - The index of the column containing the element
     * @param {number} elementIndex - The index of the element to delete (defaults to 0)
     */
    deleteElement(e, t, n = 0) {
      try {
        if (!e || typeof e != "object" || !e.id) {
          console.error("Invalid row provided to deleteElement");
          return;
        }
        if (t == null || isNaN(parseInt(t))) {
          console.error("Invalid column index provided to deleteElement");
          return;
        }
        if (n == null || isNaN(parseInt(n))) {
          console.error("Invalid element index provided to deleteElement");
          return;
        }
        const r = C.store("rows").items;
        if (!r || !Array.isArray(r)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const i = r.findIndex((a) => a.id === e.id);
        if (i === -1) {
          console.error(`Row with id ${e.id} not found in rows store`);
          return;
        }
        if (!Array.isArray(r[i].columns) || t >= r[i].columns.length) {
          console.error(`Column index ${t} out of bounds for row with id ${e.id}`);
          return;
        }
        const o = r[i].columns[t];
        if (!Array.isArray(o.elements)) {
          console.error(`Column ${t} has no elements array`);
          return;
        }
        if (n >= o.elements.length) {
          console.error(`Element index ${n} out of bounds for column ${t}`);
          return;
        }
        r[i].columns[t].elements.splice(n, 1), this.updateCanvasData();
        try {
          const a = JSON.stringify(r);
          this.$wire.saveLayout(a).then((s) => {
            s && s.success ? console.log("Element deleted and layout saved successfully") : console.warn("Layout saved after element deletion but returned unexpected result", s);
          }).catch((s) => {
            console.error("Error saving layout after element deletion:", s);
          });
        } catch (a) {
          console.error("Error stringifying layout after element deletion:", a);
        }
      } catch (r) {
        console.error("Error deleting element:", r), this.updateCanvasData();
      }
    },
    /**
     * Updates the canvas data in both the DOM and Livewire component
     * Synchronizes the Alpine store data with the form input and Livewire state
     */
    updateCanvasData() {
      try {
        const e = C.store("rows").items;
        if (!e) {
          console.error("Rows store is not properly initialized");
          return;
        }
        let t;
        try {
          t = JSON.stringify(e);
        } catch (n) {
          console.error("Error converting layout data to JSON:", n);
          return;
        }
        if (this.$refs.canvasData)
          try {
            this.$refs.canvasData.value = t;
          } catch (n) {
            console.error("Error updating canvas data reference:", n);
          }
        else
          console.warn("Canvas data reference not found in DOM");
        try {
          this.$wire.set("data.layout", t).catch((n) => {
            console.error("Error updating Livewire data.layout property:", n);
          });
        } catch (n) {
          console.error("Error calling Livewire set method:", n);
        }
        console.log("Canvas data updated successfully");
      } catch (e) {
        console.error("Unexpected error in updateCanvasData:", e);
      }
    },
    // Helper function to safely parse numbers
    safeParseNumber(e) {
      try {
        const t = Number(e);
        return isNaN(t) ? 0 : t;
      } catch {
        return 0;
      }
    }
  }));
});
