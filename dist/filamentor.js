class Pe {
  constructor(t) {
    const e = document.querySelector(`#${t}`);
    if (!e) {
      console.log(`Container #${t} not found, waiting for DOM`);
      return;
    }
    this.container = e, this.context = Alpine.$data(this.container), this.columns = [], console.log("ColumnManager initialized with context:", this.context);
  }
  init(t) {
    var i;
    return ((i = this.container) == null ? void 0 : i.querySelectorAll("[data-column-id]")) ? (this.columns = t, console.log("ColumnManager initialized with columns:", this.columns), this) : (console.log("Column elements not found"), this);
  }
  reorder(t) {
    console.log("Reorder event:", t), console.log("Current columns:", this.columns);
    const e = [...t.to.querySelectorAll("[data-column-id]")];
    console.log("Found column elements:", e);
    const i = e.map((o, r) => {
      const a = parseInt(o.dataset.columnId), l = this.columns.find((s) => s.id === a);
      return console.log("Processing column:", { columnId: a, originalColumn: l }), {
        ...l,
        order: r
      };
    });
    console.log("New column order:", i), this.sync(i), this.save(i);
  }
  sync(t) {
    const e = t.map((i) => ({ ...i }));
    this.columns = e, this.context.columns = e, console.log("Synced new columns:", e);
  }
  save(t) {
    const e = this.container.id.replace("columns-container-", "");
    console.log("Saving columns for row:", e), Livewire.find(this.container.closest("[wire\\:id]").getAttribute("wire:id")).call("reorderColumns", e, JSON.stringify(t));
  }
}
function le(n, t) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n);
    t && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    })), e.push.apply(e, i);
  }
  return e;
}
function W(n) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? le(Object(e), !0).forEach(function(i) {
      Re(n, i, e[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : le(Object(e)).forEach(function(i) {
      Object.defineProperty(n, i, Object.getOwnPropertyDescriptor(e, i));
    });
  }
  return n;
}
function Rt(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Rt = function(t) {
    return typeof t;
  } : Rt = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Rt(n);
}
function Re(n, t, e) {
  return t in n ? Object.defineProperty(n, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[t] = e, n;
}
function q() {
  return q = Object.assign || function(n) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var i in e)
        Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
    }
    return n;
  }, q.apply(this, arguments);
}
function Me(n, t) {
  if (n == null)
    return {};
  var e = {}, i = Object.keys(n), o, r;
  for (r = 0; r < i.length; r++)
    o = i[r], !(t.indexOf(o) >= 0) && (e[o] = n[o]);
  return e;
}
function $e(n, t) {
  if (n == null)
    return {};
  var e = Me(n, t), i, o;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    for (o = 0; o < r.length; o++)
      i = r[o], !(t.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(n, i) && (e[i] = n[i]);
  }
  return e;
}
var Fe = "1.15.2";
function j(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var V = j(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Tt = j(/Edge/i), se = j(/firefox/i), Et = j(/safari/i) && !j(/chrome/i) && !j(/android/i), ge = j(/iP(ad|od|hone)/i), ve = j(/chrome/i) && j(/android/i), we = {
  capture: !1,
  passive: !1
};
function b(n, t, e) {
  n.addEventListener(t, e, !V && we);
}
function w(n, t, e) {
  n.removeEventListener(t, e, !V && we);
}
function Lt(n, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), n)
      try {
        if (n.matches)
          return n.matches(t);
        if (n.msMatchesSelector)
          return n.msMatchesSelector(t);
        if (n.webkitMatchesSelector)
          return n.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function ke(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function B(n, t, e, i) {
  if (n) {
    e = e || document;
    do {
      if (t != null && (t[0] === ">" ? n.parentNode === e && Lt(n, t) : Lt(n, t)) || i && n === e)
        return n;
      if (n === e)
        break;
    } while (n = ke(n));
  }
  return null;
}
var ue = /\s+/g;
function M(n, t, e) {
  if (n && t)
    if (n.classList)
      n.classList[e ? "add" : "remove"](t);
    else {
      var i = (" " + n.className + " ").replace(ue, " ").replace(" " + t + " ", " ");
      n.className = (i + (e ? " " + t : "")).replace(ue, " ");
    }
}
function h(n, t, e) {
  var i = n && n.style;
  if (i) {
    if (e === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? e = document.defaultView.getComputedStyle(n, "") : n.currentStyle && (e = n.currentStyle), t === void 0 ? e : e[t];
    !(t in i) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), i[t] = e + (typeof e == "string" ? "" : "px");
  }
}
function dt(n, t) {
  var e = "";
  if (typeof n == "string")
    e = n;
  else
    do {
      var i = h(n, "transform");
      i && i !== "none" && (e = i + " " + e);
    } while (!t && (n = n.parentNode));
  var o = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return o && new o(e);
}
function be(n, t, e) {
  if (n) {
    var i = n.getElementsByTagName(t), o = 0, r = i.length;
    if (e)
      for (; o < r; o++)
        e(i[o], o);
    return i;
  }
  return [];
}
function G() {
  var n = document.scrollingElement;
  return n || document.documentElement;
}
function T(n, t, e, i, o) {
  if (!(!n.getBoundingClientRect && n !== window)) {
    var r, a, l, s, u, f, d;
    if (n !== window && n.parentNode && n !== G() ? (r = n.getBoundingClientRect(), a = r.top, l = r.left, s = r.bottom, u = r.right, f = r.height, d = r.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, f = window.innerHeight, d = window.innerWidth), (t || e) && n !== window && (o = o || n.parentNode, !V))
      do
        if (o && o.getBoundingClientRect && (h(o, "transform") !== "none" || e && h(o, "position") !== "static")) {
          var g = o.getBoundingClientRect();
          a -= g.top + parseInt(h(o, "border-top-width")), l -= g.left + parseInt(h(o, "border-left-width")), s = a + r.height, u = l + r.width;
          break;
        }
      while (o = o.parentNode);
    if (i && n !== window) {
      var y = dt(o || n), v = y && y.a, E = y && y.d;
      y && (a /= E, l /= v, d /= v, f /= E, s = a + f, u = l + d);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: d,
      height: f
    };
  }
}
function ce(n, t, e) {
  for (var i = tt(n, !0), o = T(n)[t]; i; ) {
    var r = T(i)[e], a = void 0;
    if (a = o >= r, !a)
      return i;
    if (i === G())
      break;
    i = tt(i, !1);
  }
  return !1;
}
function ft(n, t, e, i) {
  for (var o = 0, r = 0, a = n.children; r < a.length; ) {
    if (a[r].style.display !== "none" && a[r] !== m.ghost && (i || a[r] !== m.dragged) && B(a[r], e.draggable, n, !1)) {
      if (o === t)
        return a[r];
      o++;
    }
    r++;
  }
  return null;
}
function ie(n, t) {
  for (var e = n.lastElementChild; e && (e === m.ghost || h(e, "display") === "none" || t && !Lt(e, t)); )
    e = e.previousElementSibling;
  return e || null;
}
function k(n, t) {
  var e = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== m.clone && (!t || Lt(n, t)) && e++;
  return e;
}
function de(n) {
  var t = 0, e = 0, i = G();
  if (n)
    do {
      var o = dt(n), r = o.a, a = o.d;
      t += n.scrollLeft * r, e += n.scrollTop * a;
    } while (n !== i && (n = n.parentNode));
  return [t, e];
}
function Le(n, t) {
  for (var e in n)
    if (n.hasOwnProperty(e)) {
      for (var i in t)
        if (t.hasOwnProperty(i) && t[i] === n[e][i])
          return Number(e);
    }
  return -1;
}
function tt(n, t) {
  if (!n || !n.getBoundingClientRect)
    return G();
  var e = n, i = !1;
  do
    if (e.clientWidth < e.scrollWidth || e.clientHeight < e.scrollHeight) {
      var o = h(e);
      if (e.clientWidth < e.scrollWidth && (o.overflowX == "auto" || o.overflowX == "scroll") || e.clientHeight < e.scrollHeight && (o.overflowY == "auto" || o.overflowY == "scroll")) {
        if (!e.getBoundingClientRect || e === document.body)
          return G();
        if (i || t)
          return e;
        i = !0;
      }
    }
  while (e = e.parentNode);
  return G();
}
function Xe(n, t) {
  if (n && t)
    for (var e in t)
      t.hasOwnProperty(e) && (n[e] = t[e]);
  return n;
}
function Wt(n, t) {
  return Math.round(n.top) === Math.round(t.top) && Math.round(n.left) === Math.round(t.left) && Math.round(n.height) === Math.round(t.height) && Math.round(n.width) === Math.round(t.width);
}
var St;
function ye(n, t) {
  return function() {
    if (!St) {
      var e = arguments, i = this;
      e.length === 1 ? n.call(i, e[0]) : n.apply(i, e), St = setTimeout(function() {
        St = void 0;
      }, t);
    }
  };
}
function Ye() {
  clearTimeout(St), St = void 0;
}
function Ee(n, t, e) {
  n.scrollLeft += t, n.scrollTop += e;
}
function Se(n) {
  var t = window.Polymer, e = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(n).cloneNode(!0) : e ? e(n).clone(!0)[0] : n.cloneNode(!0);
}
function De(n, t, e) {
  var i = {};
  return Array.from(n.children).forEach(function(o) {
    var r, a, l, s;
    if (!(!B(o, t.draggable, n, !1) || o.animated || o === e)) {
      var u = T(o);
      i.left = Math.min((r = i.left) !== null && r !== void 0 ? r : 1 / 0, u.left), i.top = Math.min((a = i.top) !== null && a !== void 0 ? a : 1 / 0, u.top), i.right = Math.max((l = i.right) !== null && l !== void 0 ? l : -1 / 0, u.right), i.bottom = Math.max((s = i.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
var F = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Be() {
  var n = [], t;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var i = [].slice.call(this.el.children);
        i.forEach(function(o) {
          if (!(h(o, "display") === "none" || o === m.ghost)) {
            n.push({
              target: o,
              rect: T(o)
            });
            var r = W({}, n[n.length - 1].rect);
            if (o.thisAnimationDuration) {
              var a = dt(o, !0);
              a && (r.top -= a.f, r.left -= a.e);
            }
            o.fromRect = r;
          }
        });
      }
    },
    addAnimationState: function(i) {
      n.push(i);
    },
    removeAnimationState: function(i) {
      n.splice(Le(n, {
        target: i
      }), 1);
    },
    animateAll: function(i) {
      var o = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof i == "function" && i();
        return;
      }
      var r = !1, a = 0;
      n.forEach(function(l) {
        var s = 0, u = l.target, f = u.fromRect, d = T(u), g = u.prevFromRect, y = u.prevToRect, v = l.rect, E = dt(u, !0);
        E && (d.top -= E.f, d.left -= E.e), u.toRect = d, u.thisAnimationDuration && Wt(g, d) && !Wt(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (v.top - d.top) / (v.left - d.left) === (f.top - d.top) / (f.left - d.left) && (s = Ge(v, g, y, o.options)), Wt(d, f) || (u.prevFromRect = f, u.prevToRect = d, s || (s = o.options.animation), o.animate(u, v, d, s)), s && (r = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), r ? t = setTimeout(function() {
        typeof i == "function" && i();
      }, a) : typeof i == "function" && i(), n = [];
    },
    animate: function(i, o, r, a) {
      if (a) {
        h(i, "transition", ""), h(i, "transform", "");
        var l = dt(this.el), s = l && l.a, u = l && l.d, f = (o.left - r.left) / (s || 1), d = (o.top - r.top) / (u || 1);
        i.animatingX = !!f, i.animatingY = !!d, h(i, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = He(i), h(i, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), h(i, "transform", "translate3d(0,0,0)"), typeof i.animated == "number" && clearTimeout(i.animated), i.animated = setTimeout(function() {
          h(i, "transition", ""), h(i, "transform", ""), i.animated = !1, i.animatingX = !1, i.animatingY = !1;
        }, a);
      }
    }
  };
}
function He(n) {
  return n.offsetWidth;
}
function Ge(n, t, e, i) {
  return Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) / Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) * i.animation;
}
var lt = [], zt = {
  initializeByDefault: !0
}, Ot = {
  mount: function(t) {
    for (var e in zt)
      zt.hasOwnProperty(e) && !(e in t) && (t[e] = zt[e]);
    lt.forEach(function(i) {
      if (i.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), lt.push(t);
  },
  pluginEvent: function(t, e, i) {
    var o = this;
    this.eventCanceled = !1, i.cancel = function() {
      o.eventCanceled = !0;
    };
    var r = t + "Global";
    lt.forEach(function(a) {
      e[a.pluginName] && (e[a.pluginName][r] && e[a.pluginName][r](W({
        sortable: e
      }, i)), e.options[a.pluginName] && e[a.pluginName][t] && e[a.pluginName][t](W({
        sortable: e
      }, i)));
    });
  },
  initializePlugins: function(t, e, i, o) {
    lt.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var u = new l(t, e, t.options);
        u.sortable = t, u.options = t.options, t[s] = u, q(i, u.defaults);
      }
    });
    for (var r in t.options)
      if (t.options.hasOwnProperty(r)) {
        var a = this.modifyOption(t, r, t.options[r]);
        typeof a < "u" && (t.options[r] = a);
      }
  },
  getEventProperties: function(t, e) {
    var i = {};
    return lt.forEach(function(o) {
      typeof o.eventProperties == "function" && q(i, o.eventProperties.call(e[o.pluginName], t));
    }), i;
  },
  modifyOption: function(t, e, i) {
    var o;
    return lt.forEach(function(r) {
      t[r.pluginName] && r.optionListeners && typeof r.optionListeners[e] == "function" && (o = r.optionListeners[e].call(t[r.pluginName], i));
    }), o;
  }
};
function We(n) {
  var t = n.sortable, e = n.rootEl, i = n.name, o = n.targetEl, r = n.cloneEl, a = n.toEl, l = n.fromEl, s = n.oldIndex, u = n.newIndex, f = n.oldDraggableIndex, d = n.newDraggableIndex, g = n.originalEvent, y = n.putSortable, v = n.extraEventProperties;
  if (t = t || e && e[F], !!t) {
    var E, L = t.options, z = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !V && !Tt ? E = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : (E = document.createEvent("Event"), E.initEvent(i, !0, !0)), E.to = a || e, E.from = l || e, E.item = o || e, E.clone = r, E.oldIndex = s, E.newIndex = u, E.oldDraggableIndex = f, E.newDraggableIndex = d, E.originalEvent = g, E.pullMode = y ? y.lastPutMode : void 0;
    var I = W(W({}, v), Ot.getEventProperties(i, t));
    for (var X in I)
      E[X] = I[X];
    e && e.dispatchEvent(E), L[z] && L[z].call(t, E);
  }
}
var ze = ["evt"], A = function(t, e) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = i.evt, r = $e(i, ze);
  Ot.pluginEvent.bind(m)(t, e, W({
    dragEl: c,
    parentEl: _,
    ghostEl: p,
    rootEl: S,
    nextEl: at,
    lastDownEl: Mt,
    cloneEl: D,
    cloneHidden: Q,
    dragStarted: wt,
    putSortable: O,
    activeSortable: m.active,
    originalEvent: o,
    oldIndex: ct,
    oldDraggableIndex: Dt,
    newIndex: $,
    newDraggableIndex: Z,
    hideGhostForTarget: Oe,
    unhideGhostForTarget: Ne,
    cloneNowHidden: function() {
      Q = !0;
    },
    cloneNowShown: function() {
      Q = !1;
    },
    dispatchSortableEvent: function(l) {
      x({
        sortable: e,
        name: l,
        originalEvent: o
      });
    }
  }, r));
};
function x(n) {
  We(W({
    putSortable: O,
    cloneEl: D,
    targetEl: c,
    rootEl: S,
    oldIndex: ct,
    oldDraggableIndex: Dt,
    newIndex: $,
    newDraggableIndex: Z
  }, n));
}
var c, _, p, S, at, Mt, D, Q, ct, $, Dt, Z, It, O, ut = !1, Xt = !1, Yt = [], ot, Y, Jt, jt, fe, he, wt, st, _t, Ct = !1, xt = !1, $t, N, qt = [], Qt = !1, Bt = [], Gt = typeof document < "u", At = ge, me = Tt || V ? "cssFloat" : "float", Je = Gt && !ve && !ge && "draggable" in document.createElement("div"), _e = function() {
  if (Gt) {
    if (V)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
}(), Ce = function(t, e) {
  var i = h(t), o = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), r = ft(t, 0, e), a = ft(t, 1, e), l = r && h(r), s = a && h(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + T(r).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + T(a).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (r && l.float && l.float !== "none") {
    var d = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return r && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= o && i[me] === "none" || a && i[me] === "none" && u + f > o) ? "vertical" : "horizontal";
}, je = function(t, e, i) {
  var o = i ? t.left : t.top, r = i ? t.right : t.bottom, a = i ? t.width : t.height, l = i ? e.left : e.top, s = i ? e.right : e.bottom, u = i ? e.width : e.height;
  return o === l || r === s || o + a / 2 === l + u / 2;
}, qe = function(t, e) {
  var i;
  return Yt.some(function(o) {
    var r = o[F].options.emptyInsertThreshold;
    if (!(!r || ie(o))) {
      var a = T(o), l = t >= a.left - r && t <= a.right + r, s = e >= a.top - r && e <= a.bottom + r;
      if (l && s)
        return i = o;
    }
  }), i;
}, Te = function(t) {
  function e(r, a) {
    return function(l, s, u, f) {
      var d = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (r == null && (a || d))
        return !0;
      if (r == null || r === !1)
        return !1;
      if (a && r === "clone")
        return r;
      if (typeof r == "function")
        return e(r(l, s, u, f), a)(l, s, u, f);
      var g = (a ? l : s).options.group.name;
      return r === !0 || typeof r == "string" && r === g || r.join && r.indexOf(g) > -1;
    };
  }
  var i = {}, o = t.group;
  (!o || Rt(o) != "object") && (o = {
    name: o
  }), i.name = o.name, i.checkPull = e(o.pull, !0), i.checkPut = e(o.put), i.revertClone = o.revertClone, t.group = i;
}, Oe = function() {
  !_e && p && h(p, "display", "none");
}, Ne = function() {
  !_e && p && h(p, "display", "");
};
Gt && !ve && document.addEventListener("click", function(n) {
  if (Xt)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), Xt = !1, !1;
}, !0);
var rt = function(t) {
  if (c) {
    t = t.touches ? t.touches[0] : t;
    var e = qe(t.clientX, t.clientY);
    if (e) {
      var i = {};
      for (var o in t)
        t.hasOwnProperty(o) && (i[o] = t[o]);
      i.target = i.rootEl = e, i.preventDefault = void 0, i.stopPropagation = void 0, e[F]._onDragOver(i);
    }
  }
}, Ve = function(t) {
  c && c.parentNode[F]._isOutsideThisEl(t.target);
};
function m(n, t) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = t = q({}, t), n[F] = this;
  var e = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(n.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return Ce(n, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(a, l) {
      a.setData("Text", l.textContent);
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
    supportPointer: m.supportPointer !== !1 && "PointerEvent" in window && !Et,
    emptyInsertThreshold: 5
  };
  Ot.initializePlugins(this, n, e);
  for (var i in e)
    !(i in t) && (t[i] = e[i]);
  Te(t);
  for (var o in this)
    o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Je, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? b(n, "pointerdown", this._onTapStart) : (b(n, "mousedown", this._onTapStart), b(n, "touchstart", this._onTapStart)), this.nativeDraggable && (b(n, "dragover", this), b(n, "dragenter", this)), Yt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), q(this, Be());
}
m.prototype = /** @lends Sortable.prototype */
{
  constructor: m,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (st = null);
  },
  _getDirection: function(t, e) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, e, c) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var e = this, i = this.el, o = this.options, r = o.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, f = o.filter;
      if (on(i), !c && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || o.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Et && s && s.tagName.toUpperCase() === "SELECT") && (s = B(s, o.draggable, i, !1), !(s && s.animated) && Mt !== s)) {
        if (ct = k(s), Dt = k(s, o.draggable), typeof f == "function") {
          if (f.call(this, t, s, this)) {
            x({
              sortable: e,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: i,
              fromEl: i
            }), A("filter", e, {
              evt: t
            }), r && t.cancelable && t.preventDefault();
            return;
          }
        } else if (f && (f = f.split(",").some(function(d) {
          if (d = B(u, d.trim(), i, !1), d)
            return x({
              sortable: e,
              rootEl: d,
              name: "filter",
              targetEl: s,
              fromEl: i,
              toEl: i
            }), A("filter", e, {
              evt: t
            }), !0;
        }), f)) {
          r && t.cancelable && t.preventDefault();
          return;
        }
        o.handle && !B(u, o.handle, i, !1) || this._prepareDragStart(t, l, s);
      }
    }
  },
  _prepareDragStart: function(t, e, i) {
    var o = this, r = o.el, a = o.options, l = r.ownerDocument, s;
    if (i && !c && i.parentNode === r) {
      var u = T(i);
      if (S = r, c = i, _ = c.parentNode, at = c.nextSibling, Mt = i, It = a.group, m.dragged = c, ot = {
        target: c,
        clientX: (e || t).clientX,
        clientY: (e || t).clientY
      }, fe = ot.clientX - u.left, he = ot.clientY - u.top, this._lastX = (e || t).clientX, this._lastY = (e || t).clientY, c.style["will-change"] = "all", s = function() {
        if (A("delayEnded", o, {
          evt: t
        }), m.eventCanceled) {
          o._onDrop();
          return;
        }
        o._disableDelayedDragEvents(), !se && o.nativeDraggable && (c.draggable = !0), o._triggerDragStart(t, e), x({
          sortable: o,
          name: "choose",
          originalEvent: t
        }), M(c, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        be(c, f.trim(), Vt);
      }), b(l, "dragover", rt), b(l, "mousemove", rt), b(l, "touchmove", rt), b(l, "mouseup", o._onDrop), b(l, "touchend", o._onDrop), b(l, "touchcancel", o._onDrop), se && this.nativeDraggable && (this.options.touchStartThreshold = 4, c.draggable = !0), A("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || e) && (!this.nativeDraggable || !(Tt || V))) {
        if (m.eventCanceled) {
          this._onDrop();
          return;
        }
        b(l, "mouseup", o._disableDelayedDrag), b(l, "touchend", o._disableDelayedDrag), b(l, "touchcancel", o._disableDelayedDrag), b(l, "mousemove", o._delayedDragTouchMoveHandler), b(l, "touchmove", o._delayedDragTouchMoveHandler), a.supportPointer && b(l, "pointermove", o._delayedDragTouchMoveHandler), o._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var e = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(e.clientX - this._lastX), Math.abs(e.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    c && Vt(c), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    w(t, "mouseup", this._disableDelayedDrag), w(t, "touchend", this._disableDelayedDrag), w(t, "touchcancel", this._disableDelayedDrag), w(t, "mousemove", this._delayedDragTouchMoveHandler), w(t, "touchmove", this._delayedDragTouchMoveHandler), w(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, e) {
    e = e || t.pointerType == "touch" && t, !this.nativeDraggable || e ? this.options.supportPointer ? b(document, "pointermove", this._onTouchMove) : e ? b(document, "touchmove", this._onTouchMove) : b(document, "mousemove", this._onTouchMove) : (b(c, "dragend", this), b(S, "dragstart", this._onDragStart));
    try {
      document.selection ? Ft(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, e) {
    if (ut = !1, S && c) {
      A("dragStarted", this, {
        evt: e
      }), this.nativeDraggable && b(document, "dragover", Ve);
      var i = this.options;
      !t && M(c, i.dragClass, !1), M(c, i.ghostClass, !0), m.active = this, t && this._appendGhost(), x({
        sortable: this,
        name: "start",
        originalEvent: e
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Y) {
      this._lastX = Y.clientX, this._lastY = Y.clientY, Oe();
      for (var t = document.elementFromPoint(Y.clientX, Y.clientY), e = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(Y.clientX, Y.clientY), t !== e); )
        e = t;
      if (c.parentNode[F]._isOutsideThisEl(t), e)
        do {
          if (e[F]) {
            var i = void 0;
            if (i = e[F]._onDragOver({
              clientX: Y.clientX,
              clientY: Y.clientY,
              target: t,
              rootEl: e
            }), i && !this.options.dragoverBubble)
              break;
          }
          t = e;
        } while (e = e.parentNode);
      Ne();
    }
  },
  _onTouchMove: function(t) {
    if (ot) {
      var e = this.options, i = e.fallbackTolerance, o = e.fallbackOffset, r = t.touches ? t.touches[0] : t, a = p && dt(p, !0), l = p && a && a.a, s = p && a && a.d, u = At && N && de(N), f = (r.clientX - ot.clientX + o.x) / (l || 1) + (u ? u[0] - qt[0] : 0) / (l || 1), d = (r.clientY - ot.clientY + o.y) / (s || 1) + (u ? u[1] - qt[1] : 0) / (s || 1);
      if (!m.active && !ut) {
        if (i && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < i)
          return;
        this._onDragStart(t, !0);
      }
      if (p) {
        a ? (a.e += f - (Jt || 0), a.f += d - (jt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: d
        };
        var g = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        h(p, "webkitTransform", g), h(p, "mozTransform", g), h(p, "msTransform", g), h(p, "transform", g), Jt = f, jt = d, Y = r;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!p) {
      var t = this.options.fallbackOnBody ? document.body : S, e = T(c, !0, At, !0, t), i = this.options;
      if (At) {
        for (N = t; h(N, "position") === "static" && h(N, "transform") === "none" && N !== document; )
          N = N.parentNode;
        N !== document.body && N !== document.documentElement ? (N === document && (N = G()), e.top += N.scrollTop, e.left += N.scrollLeft) : N = G(), qt = de(N);
      }
      p = c.cloneNode(!0), M(p, i.ghostClass, !1), M(p, i.fallbackClass, !0), M(p, i.dragClass, !0), h(p, "transition", ""), h(p, "transform", ""), h(p, "box-sizing", "border-box"), h(p, "margin", 0), h(p, "top", e.top), h(p, "left", e.left), h(p, "width", e.width), h(p, "height", e.height), h(p, "opacity", "0.8"), h(p, "position", At ? "absolute" : "fixed"), h(p, "zIndex", "100000"), h(p, "pointerEvents", "none"), m.ghost = p, t.appendChild(p), h(p, "transform-origin", fe / parseInt(p.style.width) * 100 + "% " + he / parseInt(p.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, e) {
    var i = this, o = t.dataTransfer, r = i.options;
    if (A("dragStart", this, {
      evt: t
    }), m.eventCanceled) {
      this._onDrop();
      return;
    }
    A("setupClone", this), m.eventCanceled || (D = Se(c), D.removeAttribute("id"), D.draggable = !1, D.style["will-change"] = "", this._hideClone(), M(D, this.options.chosenClass, !1), m.clone = D), i.cloneId = Ft(function() {
      A("clone", i), !m.eventCanceled && (i.options.removeCloneOnHide || S.insertBefore(D, c), i._hideClone(), x({
        sortable: i,
        name: "clone"
      }));
    }), !e && M(c, r.dragClass, !0), e ? (Xt = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : (w(document, "mouseup", i._onDrop), w(document, "touchend", i._onDrop), w(document, "touchcancel", i._onDrop), o && (o.effectAllowed = "move", r.setData && r.setData.call(i, o, c)), b(document, "drop", i), h(c, "transform", "translateZ(0)")), ut = !0, i._dragStartId = Ft(i._dragStarted.bind(i, e, t)), b(document, "selectstart", i), wt = !0, Et && h(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var e = this.el, i = t.target, o, r, a, l = this.options, s = l.group, u = m.active, f = It === s, d = l.sort, g = O || u, y, v = this, E = !1;
    if (Qt)
      return;
    function L(vt, xe) {
      A(vt, v, W({
        evt: t,
        isOwner: f,
        axis: y ? "vertical" : "horizontal",
        revert: a,
        dragRect: o,
        targetRect: r,
        canSort: d,
        fromSortable: g,
        target: i,
        completed: I,
        onMove: function(ae, Ae) {
          return Pt(S, e, c, o, ae, T(ae), t, Ae);
        },
        changed: X
      }, xe));
    }
    function z() {
      L("dragOverAnimationCapture"), v.captureAnimationState(), v !== g && g.captureAnimationState();
    }
    function I(vt) {
      return L("dragOverCompleted", {
        insertion: vt
      }), vt && (f ? u._hideClone() : u._showClone(v), v !== g && (M(c, O ? O.options.ghostClass : u.options.ghostClass, !1), M(c, l.ghostClass, !0)), O !== v && v !== m.active ? O = v : v === m.active && O && (O = null), g === v && (v._ignoreWhileAnimating = i), v.animateAll(function() {
        L("dragOverAnimationComplete"), v._ignoreWhileAnimating = null;
      }), v !== g && (g.animateAll(), g._ignoreWhileAnimating = null)), (i === c && !c.animated || i === e && !i.animated) && (st = null), !l.dragoverBubble && !t.rootEl && i !== document && (c.parentNode[F]._isOutsideThisEl(t.target), !vt && rt(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), E = !0;
    }
    function X() {
      $ = k(c), Z = k(c, l.draggable), x({
        sortable: v,
        name: "change",
        toEl: e,
        newIndex: $,
        newDraggableIndex: Z,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), i = B(i, l.draggable, e, !0), L("dragOver"), m.eventCanceled)
      return E;
    if (c.contains(t.target) || i.animated && i.animatingX && i.animatingY || v._ignoreWhileAnimating === i)
      return I(!1);
    if (Xt = !1, u && !l.disabled && (f ? d || (a = _ !== S) : O === this || (this.lastPutMode = It.checkPull(this, u, c, t)) && s.checkPut(this, u, c, t))) {
      if (y = this._getDirection(t, i) === "vertical", o = T(c), L("dragOverValid"), m.eventCanceled)
        return E;
      if (a)
        return _ = S, z(), this._hideClone(), L("revert"), m.eventCanceled || (at ? S.insertBefore(c, at) : S.appendChild(c)), I(!0);
      var P = ie(e, l.draggable);
      if (!P || Qe(t, y, this) && !P.animated) {
        if (P === c)
          return I(!1);
        if (P && e === t.target && (i = P), i && (r = T(i)), Pt(S, e, c, o, i, r, t, !!i) !== !1)
          return z(), P && P.nextSibling ? e.insertBefore(c, P.nextSibling) : e.appendChild(c), _ = e, X(), I(!0);
      } else if (P && Ze(t, y, this)) {
        var et = ft(e, 0, l, !0);
        if (et === c)
          return I(!1);
        if (i = et, r = T(i), Pt(S, e, c, o, i, r, t, !1) !== !1)
          return z(), e.insertBefore(c, et), _ = e, X(), I(!0);
      } else if (i.parentNode === e) {
        r = T(i);
        var H = 0, nt, ht = c.parentNode !== e, R = !je(c.animated && c.toRect || o, i.animated && i.toRect || r, y), mt = y ? "top" : "left", U = ce(i, "top", "top") || ce(c, "top", "top"), pt = U ? U.scrollTop : void 0;
        st !== i && (nt = r[mt], Ct = !1, xt = !R && l.invertSwap || ht), H = tn(t, i, r, y, R ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, xt, st === i);
        var J;
        if (H !== 0) {
          var it = k(c);
          do
            it -= H, J = _.children[it];
          while (J && (h(J, "display") === "none" || J === p));
        }
        if (H === 0 || J === i)
          return I(!1);
        st = i, _t = H;
        var gt = i.nextElementSibling, K = !1;
        K = H === 1;
        var Nt = Pt(S, e, c, o, i, r, t, K);
        if (Nt !== !1)
          return (Nt === 1 || Nt === -1) && (K = Nt === 1), Qt = !0, setTimeout(Ke, 30), z(), K && !gt ? e.appendChild(c) : i.parentNode.insertBefore(c, K ? gt : i), U && Ee(U, 0, pt - U.scrollTop), _ = c.parentNode, nt !== void 0 && !xt && ($t = Math.abs(nt - T(i)[mt])), X(), I(!0);
      }
      if (e.contains(c))
        return I(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    w(document, "mousemove", this._onTouchMove), w(document, "touchmove", this._onTouchMove), w(document, "pointermove", this._onTouchMove), w(document, "dragover", rt), w(document, "mousemove", rt), w(document, "touchmove", rt);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    w(t, "mouseup", this._onDrop), w(t, "touchend", this._onDrop), w(t, "pointerup", this._onDrop), w(t, "touchcancel", this._onDrop), w(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var e = this.el, i = this.options;
    if ($ = k(c), Z = k(c, i.draggable), A("drop", this, {
      evt: t
    }), _ = c && c.parentNode, $ = k(c), Z = k(c, i.draggable), m.eventCanceled) {
      this._nulling();
      return;
    }
    ut = !1, xt = !1, Ct = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), te(this.cloneId), te(this._dragStartId), this.nativeDraggable && (w(document, "drop", this), w(e, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Et && h(document.body, "user-select", ""), h(c, "transform", ""), t && (wt && (t.cancelable && t.preventDefault(), !i.dropBubble && t.stopPropagation()), p && p.parentNode && p.parentNode.removeChild(p), (S === _ || O && O.lastPutMode !== "clone") && D && D.parentNode && D.parentNode.removeChild(D), c && (this.nativeDraggable && w(c, "dragend", this), Vt(c), c.style["will-change"] = "", wt && !ut && M(c, O ? O.options.ghostClass : this.options.ghostClass, !1), M(c, this.options.chosenClass, !1), x({
      sortable: this,
      name: "unchoose",
      toEl: _,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), S !== _ ? ($ >= 0 && (x({
      rootEl: _,
      name: "add",
      toEl: _,
      fromEl: S,
      originalEvent: t
    }), x({
      sortable: this,
      name: "remove",
      toEl: _,
      originalEvent: t
    }), x({
      rootEl: _,
      name: "sort",
      toEl: _,
      fromEl: S,
      originalEvent: t
    }), x({
      sortable: this,
      name: "sort",
      toEl: _,
      originalEvent: t
    })), O && O.save()) : $ !== ct && $ >= 0 && (x({
      sortable: this,
      name: "update",
      toEl: _,
      originalEvent: t
    }), x({
      sortable: this,
      name: "sort",
      toEl: _,
      originalEvent: t
    })), m.active && (($ == null || $ === -1) && ($ = ct, Z = Dt), x({
      sortable: this,
      name: "end",
      toEl: _,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    A("nulling", this), S = c = _ = p = at = D = Mt = Q = ot = Y = wt = $ = Z = ct = Dt = st = _t = O = It = m.dragged = m.ghost = m.clone = m.active = null, Bt.forEach(function(t) {
      t.checked = !0;
    }), Bt.length = Jt = jt = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        c && (this._onDragOver(t), Ue(t));
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
    for (var t = [], e, i = this.el.children, o = 0, r = i.length, a = this.options; o < r; o++)
      e = i[o], B(e, a.draggable, this.el, !1) && t.push(e.getAttribute(a.dataIdAttr) || nn(e));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, e) {
    var i = {}, o = this.el;
    this.toArray().forEach(function(r, a) {
      var l = o.children[a];
      B(l, this.options.draggable, o, !1) && (i[r] = l);
    }, this), e && this.captureAnimationState(), t.forEach(function(r) {
      i[r] && (o.removeChild(i[r]), o.appendChild(i[r]));
    }), e && this.animateAll();
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
  closest: function(t, e) {
    return B(t, e || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(t, e) {
    var i = this.options;
    if (e === void 0)
      return i[t];
    var o = Ot.modifyOption(this, t, e);
    typeof o < "u" ? i[t] = o : i[t] = e, t === "group" && Te(i);
  },
  /**
   * Destroy
   */
  destroy: function() {
    A("destroy", this);
    var t = this.el;
    t[F] = null, w(t, "mousedown", this._onTapStart), w(t, "touchstart", this._onTapStart), w(t, "pointerdown", this._onTapStart), this.nativeDraggable && (w(t, "dragover", this), w(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(e) {
      e.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Yt.splice(Yt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Q) {
      if (A("hideClone", this), m.eventCanceled)
        return;
      h(D, "display", "none"), this.options.removeCloneOnHide && D.parentNode && D.parentNode.removeChild(D), Q = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Q) {
      if (A("showClone", this), m.eventCanceled)
        return;
      c.parentNode == S && !this.options.group.revertClone ? S.insertBefore(D, c) : at ? S.insertBefore(D, at) : S.appendChild(D), this.options.group.revertClone && this.animate(c, D), h(D, "display", ""), Q = !1;
    }
  }
};
function Ue(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function Pt(n, t, e, i, o, r, a, l) {
  var s, u = n[F], f = u.options.onMove, d;
  return window.CustomEvent && !V && !Tt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = n, s.dragged = e, s.draggedRect = i, s.related = o || t, s.relatedRect = r || T(t), s.willInsertAfter = l, s.originalEvent = a, n.dispatchEvent(s), f && (d = f.call(u, s, a)), d;
}
function Vt(n) {
  n.draggable = !1;
}
function Ke() {
  Qt = !1;
}
function Ze(n, t, e) {
  var i = T(ft(e.el, 0, e.options, !0)), o = De(e.el, e.options, p), r = 10;
  return t ? n.clientX < o.left - r || n.clientY < i.top && n.clientX < i.right : n.clientY < o.top - r || n.clientY < i.bottom && n.clientX < i.left;
}
function Qe(n, t, e) {
  var i = T(ie(e.el, e.options.draggable)), o = De(e.el, e.options, p), r = 10;
  return t ? n.clientX > o.right + r || n.clientY > i.bottom && n.clientX > i.left : n.clientY > o.bottom + r || n.clientX > i.right && n.clientY > i.top;
}
function tn(n, t, e, i, o, r, a, l) {
  var s = i ? n.clientY : n.clientX, u = i ? e.height : e.width, f = i ? e.top : e.left, d = i ? e.bottom : e.right, g = !1;
  if (!a) {
    if (l && $t < u * o) {
      if (!Ct && (_t === 1 ? s > f + u * r / 2 : s < d - u * r / 2) && (Ct = !0), Ct)
        g = !0;
      else if (_t === 1 ? s < f + $t : s > d - $t)
        return -_t;
    } else if (s > f + u * (1 - o) / 2 && s < d - u * (1 - o) / 2)
      return en(t);
  }
  return g = g || a, g && (s < f + u * r / 2 || s > d - u * r / 2) ? s > f + u / 2 ? 1 : -1 : 0;
}
function en(n) {
  return k(c) < k(n) ? 1 : -1;
}
function nn(n) {
  for (var t = n.tagName + n.className + n.src + n.href + n.textContent, e = t.length, i = 0; e--; )
    i += t.charCodeAt(e);
  return i.toString(36);
}
function on(n) {
  Bt.length = 0;
  for (var t = n.getElementsByTagName("input"), e = t.length; e--; ) {
    var i = t[e];
    i.checked && Bt.push(i);
  }
}
function Ft(n) {
  return setTimeout(n, 0);
}
function te(n) {
  return clearTimeout(n);
}
Gt && b(document, "touchmove", function(n) {
  (m.active || ut) && n.cancelable && n.preventDefault();
});
m.utils = {
  on: b,
  off: w,
  css: h,
  find: be,
  is: function(t, e) {
    return !!B(t, e, t, !1);
  },
  extend: Xe,
  throttle: ye,
  closest: B,
  toggleClass: M,
  clone: Se,
  index: k,
  nextTick: Ft,
  cancelNextTick: te,
  detectDirection: Ce,
  getChild: ft
};
m.get = function(n) {
  return n[F];
};
m.mount = function() {
  for (var n = arguments.length, t = new Array(n), e = 0; e < n; e++)
    t[e] = arguments[e];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(i) {
    if (!i.prototype || !i.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));
    i.utils && (m.utils = W(W({}, m.utils), i.utils)), Ot.mount(i);
  });
};
m.create = function(n, t) {
  return new m(n, t);
};
m.version = Fe;
var C = [], bt, ee, ne = !1, Ut, Kt, Ht, yt;
function rn() {
  function n() {
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
  return n.prototype = {
    dragStarted: function(e) {
      var i = e.originalEvent;
      this.sortable.nativeDraggable ? b(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? b(document, "pointermove", this._handleFallbackAutoScroll) : i.touches ? b(document, "touchmove", this._handleFallbackAutoScroll) : b(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(e) {
      var i = e.originalEvent;
      !this.options.dragOverBubble && !i.rootEl && this._handleAutoScroll(i);
    },
    drop: function() {
      this.sortable.nativeDraggable ? w(document, "dragover", this._handleAutoScroll) : (w(document, "pointermove", this._handleFallbackAutoScroll), w(document, "touchmove", this._handleFallbackAutoScroll), w(document, "mousemove", this._handleFallbackAutoScroll)), pe(), kt(), Ye();
    },
    nulling: function() {
      Ht = ee = bt = ne = yt = Ut = Kt = null, C.length = 0;
    },
    _handleFallbackAutoScroll: function(e) {
      this._handleAutoScroll(e, !0);
    },
    _handleAutoScroll: function(e, i) {
      var o = this, r = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, l = document.elementFromPoint(r, a);
      if (Ht = e, i || this.options.forceAutoScrollFallback || Tt || V || Et) {
        Zt(e, this.options, l, i);
        var s = tt(l, !0);
        ne && (!yt || r !== Ut || a !== Kt) && (yt && pe(), yt = setInterval(function() {
          var u = tt(document.elementFromPoint(r, a), !0);
          u !== s && (s = u, kt()), Zt(e, o.options, u, i);
        }, 10), Ut = r, Kt = a);
      } else {
        if (!this.options.bubbleScroll || tt(l, !0) === G()) {
          kt();
          return;
        }
        Zt(e, this.options, tt(l, !1), !1);
      }
    }
  }, q(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function kt() {
  C.forEach(function(n) {
    clearInterval(n.pid);
  }), C = [];
}
function pe() {
  clearInterval(yt);
}
var Zt = ye(function(n, t, e, i) {
  if (t.scroll) {
    var o = (n.touches ? n.touches[0] : n).clientX, r = (n.touches ? n.touches[0] : n).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = G(), u = !1, f;
    ee !== e && (ee = e, kt(), bt = t.scroll, f = t.scrollFn, bt === !0 && (bt = tt(e, !0)));
    var d = 0, g = bt;
    do {
      var y = g, v = T(y), E = v.top, L = v.bottom, z = v.left, I = v.right, X = v.width, P = v.height, et = void 0, H = void 0, nt = y.scrollWidth, ht = y.scrollHeight, R = h(y), mt = y.scrollLeft, U = y.scrollTop;
      y === s ? (et = X < nt && (R.overflowX === "auto" || R.overflowX === "scroll" || R.overflowX === "visible"), H = P < ht && (R.overflowY === "auto" || R.overflowY === "scroll" || R.overflowY === "visible")) : (et = X < nt && (R.overflowX === "auto" || R.overflowX === "scroll"), H = P < ht && (R.overflowY === "auto" || R.overflowY === "scroll"));
      var pt = et && (Math.abs(I - o) <= a && mt + X < nt) - (Math.abs(z - o) <= a && !!mt), J = H && (Math.abs(L - r) <= a && U + P < ht) - (Math.abs(E - r) <= a && !!U);
      if (!C[d])
        for (var it = 0; it <= d; it++)
          C[it] || (C[it] = {});
      (C[d].vx != pt || C[d].vy != J || C[d].el !== y) && (C[d].el = y, C[d].vx = pt, C[d].vy = J, clearInterval(C[d].pid), (pt != 0 || J != 0) && (u = !0, C[d].pid = setInterval((function() {
        i && this.layer === 0 && m.active._onTouchMove(Ht);
        var gt = C[this.layer].vy ? C[this.layer].vy * l : 0, K = C[this.layer].vx ? C[this.layer].vx * l : 0;
        typeof f == "function" && f.call(m.dragged.parentNode[F], K, gt, n, Ht, C[this.layer].el) !== "continue" || Ee(C[this.layer].el, K, gt);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && g !== s && (g = tt(g, !1)));
    ne = u;
  }
}, 30), Ie = function(t) {
  var e = t.originalEvent, i = t.putSortable, o = t.dragEl, r = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
  if (e) {
    var u = i || r;
    l();
    var f = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e, d = document.elementFromPoint(f.clientX, f.clientY);
    s(), u && !u.el.contains(d) && (a("spill"), this.onSpill({
      dragEl: o,
      putSortable: i
    }));
  }
};
function oe() {
}
oe.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var e = t.oldDraggableIndex;
    this.startIndex = e;
  },
  onSpill: function(t) {
    var e = t.dragEl, i = t.putSortable;
    this.sortable.captureAnimationState(), i && i.captureAnimationState();
    var o = ft(this.sortable.el, this.startIndex, this.options);
    o ? this.sortable.el.insertBefore(e, o) : this.sortable.el.appendChild(e), this.sortable.animateAll(), i && i.animateAll();
  },
  drop: Ie
};
q(oe, {
  pluginName: "revertOnSpill"
});
function re() {
}
re.prototype = {
  onSpill: function(t) {
    var e = t.dragEl, i = t.putSortable, o = i || this.sortable;
    o.captureAnimationState(), e.parentNode && e.parentNode.removeChild(e), o.animateAll();
  },
  drop: Ie
};
q(re, {
  pluginName: "removeOnSpill"
});
m.mount(new rn());
m.mount(re, oe);
var an = m;
function ln(n) {
  n.directive("sort", (t, { value: e, modifiers: i, expression: o }, { effect: r, evaluate: a, evaluateLater: l, cleanup: s }) => {
    if (e === "config" || e === "handle" || e === "group")
      return;
    if (e === "key" || e === "item") {
      if ([void 0, null, ""].includes(o))
        return;
      t._x_sort_key = a(o);
      return;
    }
    let u = {
      hideGhost: !i.includes("ghost"),
      useHandles: !!t.querySelector("[x-sort\\:handle]"),
      group: fn(t, i)
    }, f = sn(o, l), d = un(t, i, a), g = cn(t, d, u, (y, v) => {
      f(y, v);
    });
    s(() => g.destroy());
  });
}
function sn(n, t) {
  if ([void 0, null, ""].includes(n))
    return () => {
    };
  let e = t(n);
  return (i, o) => {
    Alpine.dontAutoEvaluateFunctions(() => {
      e(
        // If a function is returned, call it with the key/position params...
        (r) => {
          typeof r == "function" && r(i, o);
        },
        // Provide $key and $position to the scope in case they want to call their own function...
        { scope: {
          // Supporting both `$item` AND `$key` ($key for BC)...
          $key: i,
          $item: i,
          $position: o
        } }
      );
    });
  };
}
function un(n, t, e) {
  return n.hasAttribute("x-sort:config") ? e(n.getAttribute("x-sort:config")) : {};
}
function cn(n, t, e, i) {
  let o, r = {
    animation: 150,
    handle: e.useHandles ? "[x-sort\\:handle]" : null,
    group: e.group,
    filter(a) {
      return n.querySelector("[x-sort\\:item]") ? !a.target.closest("[x-sort\\:item]") : !1;
    },
    onSort(a) {
      if (a.from !== a.to && a.to !== a.target)
        return;
      let l = a.item._x_sort_key, s = a.newIndex;
      (l !== void 0 || l !== null) && i(l, s);
    },
    onStart() {
      document.body.classList.add("sorting"), o = document.querySelector(".sortable-ghost"), e.hideGhost && o && (o.style.opacity = "0");
    },
    onEnd() {
      document.body.classList.remove("sorting"), e.hideGhost && o && (o.style.opacity = "1"), o = void 0, dn(n);
    }
  };
  return new an(n, { ...r, ...t });
}
function dn(n) {
  let t = n.firstChild;
  for (; t.nextSibling; ) {
    if (t.textContent.trim() === "[if ENDBLOCK]><![endif]") {
      n.append(t);
      break;
    }
    t = t.nextSibling;
  }
}
function fn(n, t) {
  return n.hasAttribute("x-sort:group") ? n.getAttribute("x-sort:group") : t.indexOf("group") !== -1 ? t[t.indexOf("group") + 1] : null;
}
var hn = ln;
/*! Bundled license information:

sortablejs/modular/sortable.esm.js:
  (**!
   * Sortable 1.15.2
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
console.log("Filamentor loaded!");
window.ColumnManager = Pe;
window.addEventListener("alpine:init", () => {
  console.log("Alpine init event fired!"), Alpine.plugin(hn), Alpine.data("filamentor", () => (console.log("Component definition called"), {
    rows: [],
    showSettings: !1,
    activeRow: null,
    activeColumn: null,
    activeColumnIndex: null,
    activeElement: null,
    activeElementIndex: null,
    rowToDelete: null,
    elementData: {
      text: { content: null },
      image: { url: null, alt: null, thumbnail: null },
      video: { url: null }
    },
    init() {
      this.rows = this.$wire.get("data"), console.log("Filamentor initialized from JS!"), console.log("Raw canvas data:", this.$refs.canvasData.value);
      const n = this.$refs.canvasData.value;
      n && (this.rows = JSON.parse(n).sort((t, e) => t.order - e.order), console.log("Sorted initial rows:", this.rows)), new Sortable(document.getElementById("rows-container"), {
        animation: 150,
        handle: ".row-handle",
        ghostClass: "sortable-ghost",
        onEnd: (t) => {
          console.log("Before reorder:", this.rows);
          const e = [...this.rows], [i] = e.splice(t.oldIndex, 1);
          e.splice(t.newIndex, 0, i);
          const o = e.map((r, a) => ({
            ...r,
            order: a
          }));
          this.$nextTick(() => {
            this.rows = o, console.log("After reorder:", this.rows), this.updateCanvasData(), this.$wire.saveLayout(JSON.stringify(this.rows));
          });
        }
      });
    },
    openRowSettings(n) {
      this.activeRow = n, this.activeRow.padding || (this.activeRow.padding = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeRow.margin || (this.activeRow.margin = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeRow.customClasses || (this.activeRow.customClasses = ""), this.showSettings = !0;
    },
    openColumnSettings(n, t) {
      this.activeRow = n, this.activeColumn = n.columns[t], this.activeColumn.padding || (this.activeColumn.padding = {}), this.activeColumn.margin || (this.activeColumn.margin = {}), this.activeColumn.customClasses || (this.activeColumn.customClasses = ""), this.$dispatch("open-modal", { id: "column-settings-modal" });
    },
    saveRowSettings() {
      const n = this.rows.findIndex((e) => e.id === this.activeRow.id);
      this.rows[n] = {
        ...this.activeRow,
        padding: {
          top: Number(this.activeRow.padding.top) || 0,
          right: Number(this.activeRow.padding.right) || 0,
          bottom: Number(this.activeRow.padding.bottom) || 0,
          left: Number(this.activeRow.padding.left) || 0
        },
        margin: {
          top: Number(this.activeRow.margin.top) || 0,
          right: Number(this.activeRow.margin.right) || 0,
          bottom: Number(this.activeRow.margin.bottom) || 0,
          left: Number(this.activeRow.margin.left) || 0
        }
      };
      const t = JSON.stringify(this.rows);
      this.$refs.canvasData.value = t, this.$wire.saveLayout(t), this.$dispatch("close-modal", { id: "row-settings-modal" });
    },
    addRow() {
      console.log("Adding new row");
      const n = {
        id: Date.now(),
        order: this.rows.length,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        customClasses: "",
        columns: [{
          id: Date.now() + 1,
          width: "w-full",
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          customClasses: "",
          elements: [],
          order: 0
        }]
      };
      this.rows.push(n), this.updateCanvasData(), this.$wire.saveLayout(JSON.stringify(this.rows));
    },
    deleteRow(n) {
      n.columns.some((e) => e.elements && e.elements.length > 0) ? (this.rowToDelete = n, this.$dispatch("open-modal", { id: "confirm-row-deletion" })) : this.performRowDeletion(n);
    },
    confirmRowDeletion() {
      this.performRowDeletion(this.rowToDelete), this.$dispatch("close-modal", { id: "confirm-row-deletion" }), this.rowToDelete = null;
    },
    performRowDeletion(n) {
      const t = this.rows.findIndex((e) => e.id === n.id);
      t > -1 && (this.rows.splice(t, 1), this.rows = this.rows.map((e, i) => ({
        ...e,
        order: i
      })), this.$wire.saveLayout(JSON.stringify(this.rows)));
    },
    addColumn(n) {
      const t = {
        id: Date.now(),
        //width: `col-span-${Math.floor(12 / (row.columns.length + 1))}`,
        elements: [],
        order: n.columns.length,
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        customClasses: ""
      }, e = [...n.columns, t];
      n.columns = e, this.$nextTick(() => {
        this.rows = [...this.rows], this.$wire.saveLayout(JSON.stringify(this.rows));
      });
    },
    saveColumnSettings() {
      const n = this.rows.findIndex((e) => e.id === this.activeRow.id), t = this.activeRow.columns.findIndex((e) => e.id === this.activeColumn.id);
      this.rows[n].columns[t] = {
        ...this.activeColumn,
        padding: {
          top: Number(this.activeColumn.padding.top) || 0,
          right: Number(this.activeColumn.padding.right) || 0,
          bottom: Number(this.activeColumn.padding.bottom) || 0,
          left: Number(this.activeColumn.padding.left) || 0
        },
        margin: {
          top: Number(this.activeColumn.margin.top) || 0,
          right: Number(this.activeColumn.margin.right) || 0,
          bottom: Number(this.activeColumn.margin.bottom) || 0,
          left: Number(this.activeColumn.margin.left) || 0
        }
      }, this.$wire.saveLayout(JSON.stringify(this.rows)), this.$dispatch("close-modal", { id: "column-settings-modal" });
    },
    updateColumns(n) {
      n = parseInt(n);
      const t = this.activeRow.columns;
      if (n > t.length) {
        const e = n - t.length;
        for (let i = 0; i < e; i++)
          t.push({
            id: Date.now() + i,
            //width: `col-span-${Math.floor(12 / newCount)}`,
            elements: [],
            order: t.length,
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            customClasses: ""
          });
        this.activeRow.columns.forEach((i, o) => {
          i.order = o;
        }), this.$wire.saveLayout(JSON.stringify(this.rows)).then(() => {
          const i = this.rows.findIndex((o) => o.id === this.activeRow.id);
          i !== -1 && (this.rows[i].columns = t);
        });
      } else
        this.newColumnCount = n, this.$dispatch("open-modal", { id: "confirm-column-reduction" });
    },
    deleteColumn(n, t) {
      if (n.columns.splice(t, 1), n.columns.length > 0) {
        const e = `col-span-${Math.floor(12 / n.columns.length)}`;
        n.columns.forEach((i) => {
          i.width = e;
        });
      }
      this.$wire.saveLayout(JSON.stringify(this.rows));
    },
    setActiveColumn(n, t) {
      this.activeRow = n, this.activeColumnIndex = t, this.$dispatch("open-modal", { id: "element-picker-modal" });
    },
    addElement(n) {
      if (this.activeRow && this.activeColumnIndex !== null) {
        const t = n.replace(/Filamentor/, "\\Filamentor\\").replace(/Elements/, "Elements\\");
        let e = {};
        t.includes("Text") ? e = { text: "" } : t.includes("Image") ? e = { url: null, alt: "", thumbnail: null } : t.includes("Video") && (e = { url: "" }), this.activeRow.columns[this.activeColumnIndex].elements.push({
          type: t,
          content: e
        }), this.$wire.saveLayout(JSON.stringify(this.rows));
      }
    },
    editElement(n, t) {
      var r, a, l, s;
      if (!n.columns[t].elements.length)
        return;
      const e = n.columns[t].elements[0];
      console.log("Element being edited:", e), console.log("Element type:", e.type), console.log("Element content:", e.content), console.log("Full row data:", n), console.log("Column index:", t);
      const i = e.id;
      this.activeRow = n, this.activeColumnIndex = t, this.activeElement = e, this.$wire.set("elementData", {
        text: { content: null },
        image: { url: null, alt: null, thumbnail: null },
        video: { url: null }
      });
      const o = e.type;
      o.includes("Text") ? this.$wire.set("elementData.text.content", e.content.text || "") : o.includes("Image") ? this.$wire.set("elementData.image", {
        url: ((r = e.content) == null ? void 0 : r.url) || null,
        alt: ((a = e.content) == null ? void 0 : a.alt) || "",
        thumbnail: ((l = e.content) == null ? void 0 : l.thumbnail) || null
      }) : o.includes("Video") && this.$wire.set("elementData.video.url", ((s = e.content) == null ? void 0 : s.url) || ""), this.$wire.editElement(o, e.content, i), this.$dispatch("open-modal", {
        id: "element-editor-modal",
        title: `Edit ${o.split("\\").pop()} Element`
      });
    },
    saveElementContent(n) {
      this.activeElement && (this.activeElement.type.includes("Image") ? this.$wire.uploadMedia().then((t) => {
        this.activeElement.content = {
          url: t.url,
          thumbnail: t.thumbnail,
          alt: this.$wire.get("elementData.image.alt") || ""
        }, this.$wire.saveLayout(JSON.stringify(this.rows)), this.$dispatch("close-modal", { id: "element-editor-modal" });
      }) : this.activeElement.type.includes("Video") ? (this.activeElement.content = {
        url: this.$wire.get("elementData.video.url")
      }, this.$wire.saveLayout(JSON.stringify(this.rows)), this.$dispatch("close-modal", { id: "element-editor-modal" })) : (this.activeElement.content = {
        text: this.$wire.get("elementData.text.content")
      }, this.$wire.saveLayout(JSON.stringify(this.rows)), this.$dispatch("close-modal", { id: "element-editor-modal" })));
    },
    deleteElement(n, t) {
      n.columns[t].elements = [], this.$wire.saveLayout(JSON.stringify(this.rows));
    },
    updateCanvasData() {
      const n = JSON.stringify(this.rows);
      this.$refs.canvasData.value = n, this.$wire.set("data.layout", n);
    }
  }));
});
