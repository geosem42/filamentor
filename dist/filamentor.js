function le(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    t && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function W(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? le(Object(n), !0).forEach(function(i) {
      Re(e, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : le(Object(n)).forEach(function(i) {
      Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return e;
}
function Pt(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Pt = function(t) {
    return typeof t;
  } : Pt = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Pt(e);
}
function Re(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function q() {
  return q = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n)
        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
    }
    return e;
  }, q.apply(this, arguments);
}
function Pe(e, t) {
  if (e == null)
    return {};
  var n = {}, i = Object.keys(e), o, r;
  for (r = 0; r < i.length; r++)
    o = i[r], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Me(e, t) {
  if (e == null)
    return {};
  var n = Pe(e, t), i, o;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    for (o = 0; o < r.length; o++)
      i = r[o], !(t.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(e, i) && (n[i] = e[i]);
  }
  return n;
}
var Fe = "1.15.2";
function j(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var U = j(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Tt = j(/Edge/i), se = j(/firefox/i), Et = j(/safari/i) && !j(/chrome/i) && !j(/android/i), ge = j(/iP(ad|od|hone)/i), ve = j(/chrome/i) && j(/android/i), be = {
  capture: !1,
  passive: !1
};
function w(e, t, n) {
  e.addEventListener(t, n, !U && be);
}
function b(e, t, n) {
  e.removeEventListener(t, n, !U && be);
}
function Lt(e, t) {
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
function $e(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function B(e, t, n, i) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && Lt(e, t) : Lt(e, t)) || i && e === n)
        return e;
      if (e === n)
        break;
    } while (e = $e(e));
  }
  return null;
}
var ue = /\s+/g;
function M(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var i = (" " + e.className + " ").replace(ue, " ").replace(" " + t + " ", " ");
      e.className = (i + (n ? " " + t : "")).replace(ue, " ");
    }
}
function h(e, t, n) {
  var i = e && e.style;
  if (i) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
    !(t in i) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), i[t] = n + (typeof n == "string" ? "" : "px");
  }
}
function ct(e, t) {
  var n = "";
  if (typeof e == "string")
    n = e;
  else
    do {
      var i = h(e, "transform");
      i && i !== "none" && (n = i + " " + n);
    } while (!t && (e = e.parentNode));
  var o = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return o && new o(n);
}
function we(e, t, n) {
  if (e) {
    var i = e.getElementsByTagName(t), o = 0, r = i.length;
    if (n)
      for (; o < r; o++)
        n(i[o], o);
    return i;
  }
  return [];
}
function G() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function T(e, t, n, i, o) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var r, a, l, s, u, f, c;
    if (e !== window && e.parentNode && e !== G() ? (r = e.getBoundingClientRect(), a = r.top, l = r.left, s = r.bottom, u = r.right, f = r.height, c = r.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, f = window.innerHeight, c = window.innerWidth), (t || n) && e !== window && (o = o || e.parentNode, !U))
      do
        if (o && o.getBoundingClientRect && (h(o, "transform") !== "none" || n && h(o, "position") !== "static")) {
          var g = o.getBoundingClientRect();
          a -= g.top + parseInt(h(o, "border-top-width")), l -= g.left + parseInt(h(o, "border-left-width")), s = a + r.height, u = l + r.width;
          break;
        }
      while (o = o.parentNode);
    if (i && e !== window) {
      var y = ct(o || e), v = y && y.a, E = y && y.d;
      y && (a /= E, l /= v, c /= v, f /= E, s = a + f, u = l + c);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: c,
      height: f
    };
  }
}
function de(e, t, n) {
  for (var i = tt(e, !0), o = T(e)[t]; i; ) {
    var r = T(i)[n], a = void 0;
    if (a = o >= r, !a)
      return i;
    if (i === G())
      break;
    i = tt(i, !1);
  }
  return !1;
}
function ft(e, t, n, i) {
  for (var o = 0, r = 0, a = e.children; r < a.length; ) {
    if (a[r].style.display !== "none" && a[r] !== m.ghost && (i || a[r] !== m.dragged) && B(a[r], n.draggable, e, !1)) {
      if (o === t)
        return a[r];
      o++;
    }
    r++;
  }
  return null;
}
function ie(e, t) {
  for (var n = e.lastElementChild; n && (n === m.ghost || h(n, "display") === "none" || t && !Lt(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function k(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== m.clone && (!t || Lt(e, t)) && n++;
  return n;
}
function ce(e) {
  var t = 0, n = 0, i = G();
  if (e)
    do {
      var o = ct(e), r = o.a, a = o.d;
      t += e.scrollLeft * r, n += e.scrollTop * a;
    } while (e !== i && (e = e.parentNode));
  return [t, n];
}
function ke(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      for (var i in t)
        if (t.hasOwnProperty(i) && t[i] === e[n][i])
          return Number(n);
    }
  return -1;
}
function tt(e, t) {
  if (!e || !e.getBoundingClientRect)
    return G();
  var n = e, i = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var o = h(n);
      if (n.clientWidth < n.scrollWidth && (o.overflowX == "auto" || o.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (o.overflowY == "auto" || o.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body)
          return G();
        if (i || t)
          return n;
        i = !0;
      }
    }
  while (n = n.parentNode);
  return G();
}
function Le(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function Wt(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var St;
function ye(e, t) {
  return function() {
    if (!St) {
      var n = arguments, i = this;
      n.length === 1 ? e.call(i, n[0]) : e.apply(i, n), St = setTimeout(function() {
        St = void 0;
      }, t);
    }
  };
}
function Xe() {
  clearTimeout(St), St = void 0;
}
function Ee(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function Se(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function _e(e, t, n) {
  var i = {};
  return Array.from(e.children).forEach(function(o) {
    var r, a, l, s;
    if (!(!B(o, t.draggable, e, !1) || o.animated || o === n)) {
      var u = T(o);
      i.left = Math.min((r = i.left) !== null && r !== void 0 ? r : 1 / 0, u.left), i.top = Math.min((a = i.top) !== null && a !== void 0 ? a : 1 / 0, u.top), i.right = Math.max((l = i.right) !== null && l !== void 0 ? l : -1 / 0, u.right), i.bottom = Math.max((s = i.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
var $ = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ye() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var i = [].slice.call(this.el.children);
        i.forEach(function(o) {
          if (!(h(o, "display") === "none" || o === m.ghost)) {
            e.push({
              target: o,
              rect: T(o)
            });
            var r = W({}, e[e.length - 1].rect);
            if (o.thisAnimationDuration) {
              var a = ct(o, !0);
              a && (r.top -= a.f, r.left -= a.e);
            }
            o.fromRect = r;
          }
        });
      }
    },
    addAnimationState: function(i) {
      e.push(i);
    },
    removeAnimationState: function(i) {
      e.splice(ke(e, {
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
      e.forEach(function(l) {
        var s = 0, u = l.target, f = u.fromRect, c = T(u), g = u.prevFromRect, y = u.prevToRect, v = l.rect, E = ct(u, !0);
        E && (c.top -= E.f, c.left -= E.e), u.toRect = c, u.thisAnimationDuration && Wt(g, c) && !Wt(f, c) && // Make sure animatingRect is on line between toRect & fromRect
        (v.top - c.top) / (v.left - c.left) === (f.top - c.top) / (f.left - c.left) && (s = He(v, g, y, o.options)), Wt(c, f) || (u.prevFromRect = f, u.prevToRect = c, s || (s = o.options.animation), o.animate(u, v, c, s)), s && (r = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), r ? t = setTimeout(function() {
        typeof i == "function" && i();
      }, a) : typeof i == "function" && i(), e = [];
    },
    animate: function(i, o, r, a) {
      if (a) {
        h(i, "transition", ""), h(i, "transform", "");
        var l = ct(this.el), s = l && l.a, u = l && l.d, f = (o.left - r.left) / (s || 1), c = (o.top - r.top) / (u || 1);
        i.animatingX = !!f, i.animatingY = !!c, h(i, "transform", "translate3d(" + f + "px," + c + "px,0)"), this.forRepaintDummy = Be(i), h(i, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), h(i, "transform", "translate3d(0,0,0)"), typeof i.animated == "number" && clearTimeout(i.animated), i.animated = setTimeout(function() {
          h(i, "transition", ""), h(i, "transform", ""), i.animated = !1, i.animatingX = !1, i.animatingY = !1;
        }, a);
      }
    }
  };
}
function Be(e) {
  return e.offsetWidth;
}
function He(e, t, n, i) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * i.animation;
}
var lt = [], Jt = {
  initializeByDefault: !0
}, Ot = {
  mount: function(t) {
    for (var n in Jt)
      Jt.hasOwnProperty(n) && !(n in t) && (t[n] = Jt[n]);
    lt.forEach(function(i) {
      if (i.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), lt.push(t);
  },
  pluginEvent: function(t, n, i) {
    var o = this;
    this.eventCanceled = !1, i.cancel = function() {
      o.eventCanceled = !0;
    };
    var r = t + "Global";
    lt.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][r] && n[a.pluginName][r](W({
        sortable: n
      }, i)), n.options[a.pluginName] && n[a.pluginName][t] && n[a.pluginName][t](W({
        sortable: n
      }, i)));
    });
  },
  initializePlugins: function(t, n, i, o) {
    lt.forEach(function(l) {
      var s = l.pluginName;
      if (!(!t.options[s] && !l.initializeByDefault)) {
        var u = new l(t, n, t.options);
        u.sortable = t, u.options = t.options, t[s] = u, q(i, u.defaults);
      }
    });
    for (var r in t.options)
      if (t.options.hasOwnProperty(r)) {
        var a = this.modifyOption(t, r, t.options[r]);
        typeof a < "u" && (t.options[r] = a);
      }
  },
  getEventProperties: function(t, n) {
    var i = {};
    return lt.forEach(function(o) {
      typeof o.eventProperties == "function" && q(i, o.eventProperties.call(n[o.pluginName], t));
    }), i;
  },
  modifyOption: function(t, n, i) {
    var o;
    return lt.forEach(function(r) {
      t[r.pluginName] && r.optionListeners && typeof r.optionListeners[n] == "function" && (o = r.optionListeners[n].call(t[r.pluginName], i));
    }), o;
  }
};
function Ge(e) {
  var t = e.sortable, n = e.rootEl, i = e.name, o = e.targetEl, r = e.cloneEl, a = e.toEl, l = e.fromEl, s = e.oldIndex, u = e.newIndex, f = e.oldDraggableIndex, c = e.newDraggableIndex, g = e.originalEvent, y = e.putSortable, v = e.extraEventProperties;
  if (t = t || n && n[$], !!t) {
    var E, L = t.options, J = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !U && !Tt ? E = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : (E = document.createEvent("Event"), E.initEvent(i, !0, !0)), E.to = a || n, E.from = l || n, E.item = o || n, E.clone = r, E.oldIndex = s, E.newIndex = u, E.oldDraggableIndex = f, E.newDraggableIndex = c, E.originalEvent = g, E.pullMode = y ? y.lastPutMode : void 0;
    var N = W(W({}, v), Ot.getEventProperties(i, t));
    for (var X in N)
      E[X] = N[X];
    n && n.dispatchEvent(E), L[J] && L[J].call(t, E);
  }
}
var We = ["evt"], x = function(t, n) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = i.evt, r = Me(i, We);
  Ot.pluginEvent.bind(m)(t, n, W({
    dragEl: d,
    parentEl: D,
    ghostEl: p,
    rootEl: S,
    nextEl: at,
    lastDownEl: Mt,
    cloneEl: _,
    cloneHidden: Q,
    dragStarted: bt,
    putSortable: O,
    activeSortable: m.active,
    originalEvent: o,
    oldIndex: dt,
    oldDraggableIndex: _t,
    newIndex: F,
    newDraggableIndex: Z,
    hideGhostForTarget: Oe,
    unhideGhostForTarget: Ie,
    cloneNowHidden: function() {
      Q = !0;
    },
    cloneNowShown: function() {
      Q = !1;
    },
    dispatchSortableEvent: function(l) {
      A({
        sortable: n,
        name: l,
        originalEvent: o
      });
    }
  }, r));
};
function A(e) {
  Ge(W({
    putSortable: O,
    cloneEl: _,
    targetEl: d,
    rootEl: S,
    oldIndex: dt,
    oldDraggableIndex: _t,
    newIndex: F,
    newDraggableIndex: Z
  }, e));
}
var d, D, p, S, at, Mt, _, Q, dt, F, _t, Z, Nt, O, ut = !1, Xt = !1, Yt = [], ot, Y, zt, jt, fe, he, bt, st, Dt, Ct = !1, At = !1, Ft, I, qt = [], Qt = !1, Bt = [], Gt = typeof document < "u", xt = ge, me = Tt || U ? "cssFloat" : "float", Je = Gt && !ve && !ge && "draggable" in document.createElement("div"), De = function() {
  if (Gt) {
    if (U)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
}(), Ce = function(t, n) {
  var i = h(t), o = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), r = ft(t, 0, n), a = ft(t, 1, n), l = r && h(r), s = a && h(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + T(r).width, f = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + T(a).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (r && l.float && l.float !== "none") {
    var c = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === c) ? "vertical" : "horizontal";
  }
  return r && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= o && i[me] === "none" || a && i[me] === "none" && u + f > o) ? "vertical" : "horizontal";
}, ze = function(t, n, i) {
  var o = i ? t.left : t.top, r = i ? t.right : t.bottom, a = i ? t.width : t.height, l = i ? n.left : n.top, s = i ? n.right : n.bottom, u = i ? n.width : n.height;
  return o === l || r === s || o + a / 2 === l + u / 2;
}, je = function(t, n) {
  var i;
  return Yt.some(function(o) {
    var r = o[$].options.emptyInsertThreshold;
    if (!(!r || ie(o))) {
      var a = T(o), l = t >= a.left - r && t <= a.right + r, s = n >= a.top - r && n <= a.bottom + r;
      if (l && s)
        return i = o;
    }
  }), i;
}, Te = function(t) {
  function n(r, a) {
    return function(l, s, u, f) {
      var c = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (r == null && (a || c))
        return !0;
      if (r == null || r === !1)
        return !1;
      if (a && r === "clone")
        return r;
      if (typeof r == "function")
        return n(r(l, s, u, f), a)(l, s, u, f);
      var g = (a ? l : s).options.group.name;
      return r === !0 || typeof r == "string" && r === g || r.join && r.indexOf(g) > -1;
    };
  }
  var i = {}, o = t.group;
  (!o || Pt(o) != "object") && (o = {
    name: o
  }), i.name = o.name, i.checkPull = n(o.pull, !0), i.checkPut = n(o.put), i.revertClone = o.revertClone, t.group = i;
}, Oe = function() {
  !De && p && h(p, "display", "none");
}, Ie = function() {
  !De && p && h(p, "display", "");
};
Gt && !ve && document.addEventListener("click", function(e) {
  if (Xt)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Xt = !1, !1;
}, !0);
var rt = function(t) {
  if (d) {
    t = t.touches ? t.touches[0] : t;
    var n = je(t.clientX, t.clientY);
    if (n) {
      var i = {};
      for (var o in t)
        t.hasOwnProperty(o) && (i[o] = t[o]);
      i.target = i.rootEl = n, i.preventDefault = void 0, i.stopPropagation = void 0, n[$]._onDragOver(i);
    }
  }
}, qe = function(t) {
  d && d.parentNode[$]._isOutsideThisEl(t.target);
};
function m(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = q({}, t), e[$] = this;
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
      return Ce(e, this.options);
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
  Ot.initializePlugins(this, e, n);
  for (var i in n)
    !(i in t) && (t[i] = n[i]);
  Te(t);
  for (var o in this)
    o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Je, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? w(e, "pointerdown", this._onTapStart) : (w(e, "mousedown", this._onTapStart), w(e, "touchstart", this._onTapStart)), this.nativeDraggable && (w(e, "dragover", this), w(e, "dragenter", this)), Yt.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), q(this, Ye());
}
m.prototype = /** @lends Sortable.prototype */
{
  constructor: m,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (st = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, d) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, i = this.el, o = this.options, r = o.preventOnFilter, a = t.type, l = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (l || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, f = o.filter;
      if (nn(i), !d && !(/mousedown|pointerdown/.test(a) && t.button !== 0 || o.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Et && s && s.tagName.toUpperCase() === "SELECT") && (s = B(s, o.draggable, i, !1), !(s && s.animated) && Mt !== s)) {
        if (dt = k(s), _t = k(s, o.draggable), typeof f == "function") {
          if (f.call(this, t, s, this)) {
            A({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: i,
              fromEl: i
            }), x("filter", n, {
              evt: t
            }), r && t.cancelable && t.preventDefault();
            return;
          }
        } else if (f && (f = f.split(",").some(function(c) {
          if (c = B(u, c.trim(), i, !1), c)
            return A({
              sortable: n,
              rootEl: c,
              name: "filter",
              targetEl: s,
              fromEl: i,
              toEl: i
            }), x("filter", n, {
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
  _prepareDragStart: function(t, n, i) {
    var o = this, r = o.el, a = o.options, l = r.ownerDocument, s;
    if (i && !d && i.parentNode === r) {
      var u = T(i);
      if (S = r, d = i, D = d.parentNode, at = d.nextSibling, Mt = i, Nt = a.group, m.dragged = d, ot = {
        target: d,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, fe = ot.clientX - u.left, he = ot.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, d.style["will-change"] = "all", s = function() {
        if (x("delayEnded", o, {
          evt: t
        }), m.eventCanceled) {
          o._onDrop();
          return;
        }
        o._disableDelayedDragEvents(), !se && o.nativeDraggable && (d.draggable = !0), o._triggerDragStart(t, n), A({
          sortable: o,
          name: "choose",
          originalEvent: t
        }), M(d, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        we(d, f.trim(), Ut);
      }), w(l, "dragover", rt), w(l, "mousemove", rt), w(l, "touchmove", rt), w(l, "mouseup", o._onDrop), w(l, "touchend", o._onDrop), w(l, "touchcancel", o._onDrop), se && this.nativeDraggable && (this.options.touchStartThreshold = 4, d.draggable = !0), x("delayStart", this, {
        evt: t
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Tt || U))) {
        if (m.eventCanceled) {
          this._onDrop();
          return;
        }
        w(l, "mouseup", o._disableDelayedDrag), w(l, "touchend", o._disableDelayedDrag), w(l, "touchcancel", o._disableDelayedDrag), w(l, "mousemove", o._delayedDragTouchMoveHandler), w(l, "touchmove", o._delayedDragTouchMoveHandler), a.supportPointer && w(l, "pointermove", o._delayedDragTouchMoveHandler), o._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    d && Ut(d), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    b(t, "mouseup", this._disableDelayedDrag), b(t, "touchend", this._disableDelayedDrag), b(t, "touchcancel", this._disableDelayedDrag), b(t, "mousemove", this._delayedDragTouchMoveHandler), b(t, "touchmove", this._delayedDragTouchMoveHandler), b(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? w(document, "pointermove", this._onTouchMove) : n ? w(document, "touchmove", this._onTouchMove) : w(document, "mousemove", this._onTouchMove) : (w(d, "dragend", this), w(S, "dragstart", this._onDragStart));
    try {
      document.selection ? $t(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (ut = !1, S && d) {
      x("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && w(document, "dragover", qe);
      var i = this.options;
      !t && M(d, i.dragClass, !1), M(d, i.ghostClass, !0), m.active = this, t && this._appendGhost(), A({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Y) {
      this._lastX = Y.clientX, this._lastY = Y.clientY, Oe();
      for (var t = document.elementFromPoint(Y.clientX, Y.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(Y.clientX, Y.clientY), t !== n); )
        n = t;
      if (d.parentNode[$]._isOutsideThisEl(t), n)
        do {
          if (n[$]) {
            var i = void 0;
            if (i = n[$]._onDragOver({
              clientX: Y.clientX,
              clientY: Y.clientY,
              target: t,
              rootEl: n
            }), i && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = n.parentNode);
      Ie();
    }
  },
  _onTouchMove: function(t) {
    if (ot) {
      var n = this.options, i = n.fallbackTolerance, o = n.fallbackOffset, r = t.touches ? t.touches[0] : t, a = p && ct(p, !0), l = p && a && a.a, s = p && a && a.d, u = xt && I && ce(I), f = (r.clientX - ot.clientX + o.x) / (l || 1) + (u ? u[0] - qt[0] : 0) / (l || 1), c = (r.clientY - ot.clientY + o.y) / (s || 1) + (u ? u[1] - qt[1] : 0) / (s || 1);
      if (!m.active && !ut) {
        if (i && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < i)
          return;
        this._onDragStart(t, !0);
      }
      if (p) {
        a ? (a.e += f - (zt || 0), a.f += c - (jt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: c
        };
        var g = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        h(p, "webkitTransform", g), h(p, "mozTransform", g), h(p, "msTransform", g), h(p, "transform", g), zt = f, jt = c, Y = r;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!p) {
      var t = this.options.fallbackOnBody ? document.body : S, n = T(d, !0, xt, !0, t), i = this.options;
      if (xt) {
        for (I = t; h(I, "position") === "static" && h(I, "transform") === "none" && I !== document; )
          I = I.parentNode;
        I !== document.body && I !== document.documentElement ? (I === document && (I = G()), n.top += I.scrollTop, n.left += I.scrollLeft) : I = G(), qt = ce(I);
      }
      p = d.cloneNode(!0), M(p, i.ghostClass, !1), M(p, i.fallbackClass, !0), M(p, i.dragClass, !0), h(p, "transition", ""), h(p, "transform", ""), h(p, "box-sizing", "border-box"), h(p, "margin", 0), h(p, "top", n.top), h(p, "left", n.left), h(p, "width", n.width), h(p, "height", n.height), h(p, "opacity", "0.8"), h(p, "position", xt ? "absolute" : "fixed"), h(p, "zIndex", "100000"), h(p, "pointerEvents", "none"), m.ghost = p, t.appendChild(p), h(p, "transform-origin", fe / parseInt(p.style.width) * 100 + "% " + he / parseInt(p.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var i = this, o = t.dataTransfer, r = i.options;
    if (x("dragStart", this, {
      evt: t
    }), m.eventCanceled) {
      this._onDrop();
      return;
    }
    x("setupClone", this), m.eventCanceled || (_ = Se(d), _.removeAttribute("id"), _.draggable = !1, _.style["will-change"] = "", this._hideClone(), M(_, this.options.chosenClass, !1), m.clone = _), i.cloneId = $t(function() {
      x("clone", i), !m.eventCanceled && (i.options.removeCloneOnHide || S.insertBefore(_, d), i._hideClone(), A({
        sortable: i,
        name: "clone"
      }));
    }), !n && M(d, r.dragClass, !0), n ? (Xt = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : (b(document, "mouseup", i._onDrop), b(document, "touchend", i._onDrop), b(document, "touchcancel", i._onDrop), o && (o.effectAllowed = "move", r.setData && r.setData.call(i, o, d)), w(document, "drop", i), h(d, "transform", "translateZ(0)")), ut = !0, i._dragStartId = $t(i._dragStarted.bind(i, n, t)), w(document, "selectstart", i), bt = !0, Et && h(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, i = t.target, o, r, a, l = this.options, s = l.group, u = m.active, f = Nt === s, c = l.sort, g = O || u, y, v = this, E = !1;
    if (Qt)
      return;
    function L(vt, Ae) {
      x(vt, v, W({
        evt: t,
        isOwner: f,
        axis: y ? "vertical" : "horizontal",
        revert: a,
        dragRect: o,
        targetRect: r,
        canSort: c,
        fromSortable: g,
        target: i,
        completed: N,
        onMove: function(ae, xe) {
          return Rt(S, n, d, o, ae, T(ae), t, xe);
        },
        changed: X
      }, Ae));
    }
    function J() {
      L("dragOverAnimationCapture"), v.captureAnimationState(), v !== g && g.captureAnimationState();
    }
    function N(vt) {
      return L("dragOverCompleted", {
        insertion: vt
      }), vt && (f ? u._hideClone() : u._showClone(v), v !== g && (M(d, O ? O.options.ghostClass : u.options.ghostClass, !1), M(d, l.ghostClass, !0)), O !== v && v !== m.active ? O = v : v === m.active && O && (O = null), g === v && (v._ignoreWhileAnimating = i), v.animateAll(function() {
        L("dragOverAnimationComplete"), v._ignoreWhileAnimating = null;
      }), v !== g && (g.animateAll(), g._ignoreWhileAnimating = null)), (i === d && !d.animated || i === n && !i.animated) && (st = null), !l.dragoverBubble && !t.rootEl && i !== document && (d.parentNode[$]._isOutsideThisEl(t.target), !vt && rt(t)), !l.dragoverBubble && t.stopPropagation && t.stopPropagation(), E = !0;
    }
    function X() {
      F = k(d), Z = k(d, l.draggable), A({
        sortable: v,
        name: "change",
        toEl: n,
        newIndex: F,
        newDraggableIndex: Z,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), i = B(i, l.draggable, n, !0), L("dragOver"), m.eventCanceled)
      return E;
    if (d.contains(t.target) || i.animated && i.animatingX && i.animatingY || v._ignoreWhileAnimating === i)
      return N(!1);
    if (Xt = !1, u && !l.disabled && (f ? c || (a = D !== S) : O === this || (this.lastPutMode = Nt.checkPull(this, u, d, t)) && s.checkPut(this, u, d, t))) {
      if (y = this._getDirection(t, i) === "vertical", o = T(d), L("dragOverValid"), m.eventCanceled)
        return E;
      if (a)
        return D = S, J(), this._hideClone(), L("revert"), m.eventCanceled || (at ? S.insertBefore(d, at) : S.appendChild(d)), N(!0);
      var R = ie(n, l.draggable);
      if (!R || Ze(t, y, this) && !R.animated) {
        if (R === d)
          return N(!1);
        if (R && n === t.target && (i = R), i && (r = T(i)), Rt(S, n, d, o, i, r, t, !!i) !== !1)
          return J(), R && R.nextSibling ? n.insertBefore(d, R.nextSibling) : n.appendChild(d), D = n, X(), N(!0);
      } else if (R && Ke(t, y, this)) {
        var et = ft(n, 0, l, !0);
        if (et === d)
          return N(!1);
        if (i = et, r = T(i), Rt(S, n, d, o, i, r, t, !1) !== !1)
          return J(), n.insertBefore(d, et), D = n, X(), N(!0);
      } else if (i.parentNode === n) {
        r = T(i);
        var H = 0, nt, ht = d.parentNode !== n, P = !ze(d.animated && d.toRect || o, i.animated && i.toRect || r, y), mt = y ? "top" : "left", V = de(i, "top", "top") || de(d, "top", "top"), pt = V ? V.scrollTop : void 0;
        st !== i && (nt = r[mt], Ct = !1, At = !P && l.invertSwap || ht), H = Qe(t, i, r, y, P ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, At, st === i);
        var z;
        if (H !== 0) {
          var it = k(d);
          do
            it -= H, z = D.children[it];
          while (z && (h(z, "display") === "none" || z === p));
        }
        if (H === 0 || z === i)
          return N(!1);
        st = i, Dt = H;
        var gt = i.nextElementSibling, K = !1;
        K = H === 1;
        var It = Rt(S, n, d, o, i, r, t, K);
        if (It !== !1)
          return (It === 1 || It === -1) && (K = It === 1), Qt = !0, setTimeout(Ve, 30), J(), K && !gt ? n.appendChild(d) : i.parentNode.insertBefore(d, K ? gt : i), V && Ee(V, 0, pt - V.scrollTop), D = d.parentNode, nt !== void 0 && !At && (Ft = Math.abs(nt - T(i)[mt])), X(), N(!0);
      }
      if (n.contains(d))
        return N(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    b(document, "mousemove", this._onTouchMove), b(document, "touchmove", this._onTouchMove), b(document, "pointermove", this._onTouchMove), b(document, "dragover", rt), b(document, "mousemove", rt), b(document, "touchmove", rt);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    b(t, "mouseup", this._onDrop), b(t, "touchend", this._onDrop), b(t, "pointerup", this._onDrop), b(t, "touchcancel", this._onDrop), b(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, i = this.options;
    if (F = k(d), Z = k(d, i.draggable), x("drop", this, {
      evt: t
    }), D = d && d.parentNode, F = k(d), Z = k(d, i.draggable), m.eventCanceled) {
      this._nulling();
      return;
    }
    ut = !1, At = !1, Ct = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), te(this.cloneId), te(this._dragStartId), this.nativeDraggable && (b(document, "drop", this), b(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Et && h(document.body, "user-select", ""), h(d, "transform", ""), t && (bt && (t.cancelable && t.preventDefault(), !i.dropBubble && t.stopPropagation()), p && p.parentNode && p.parentNode.removeChild(p), (S === D || O && O.lastPutMode !== "clone") && _ && _.parentNode && _.parentNode.removeChild(_), d && (this.nativeDraggable && b(d, "dragend", this), Ut(d), d.style["will-change"] = "", bt && !ut && M(d, O ? O.options.ghostClass : this.options.ghostClass, !1), M(d, this.options.chosenClass, !1), A({
      sortable: this,
      name: "unchoose",
      toEl: D,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), S !== D ? (F >= 0 && (A({
      rootEl: D,
      name: "add",
      toEl: D,
      fromEl: S,
      originalEvent: t
    }), A({
      sortable: this,
      name: "remove",
      toEl: D,
      originalEvent: t
    }), A({
      rootEl: D,
      name: "sort",
      toEl: D,
      fromEl: S,
      originalEvent: t
    }), A({
      sortable: this,
      name: "sort",
      toEl: D,
      originalEvent: t
    })), O && O.save()) : F !== dt && F >= 0 && (A({
      sortable: this,
      name: "update",
      toEl: D,
      originalEvent: t
    }), A({
      sortable: this,
      name: "sort",
      toEl: D,
      originalEvent: t
    })), m.active && ((F == null || F === -1) && (F = dt, Z = _t), A({
      sortable: this,
      name: "end",
      toEl: D,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    x("nulling", this), S = d = D = p = at = _ = Mt = Q = ot = Y = bt = F = Z = dt = _t = st = Dt = O = Nt = m.dragged = m.ghost = m.clone = m.active = null, Bt.forEach(function(t) {
      t.checked = !0;
    }), Bt.length = zt = jt = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        d && (this._onDragOver(t), Ue(t));
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
    for (var t = [], n, i = this.el.children, o = 0, r = i.length, a = this.options; o < r; o++)
      n = i[o], B(n, a.draggable, this.el, !1) && t.push(n.getAttribute(a.dataIdAttr) || en(n));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, n) {
    var i = {}, o = this.el;
    this.toArray().forEach(function(r, a) {
      var l = o.children[a];
      B(l, this.options.draggable, o, !1) && (i[r] = l);
    }, this), n && this.captureAnimationState(), t.forEach(function(r) {
      i[r] && (o.removeChild(i[r]), o.appendChild(i[r]));
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
    return B(t, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(t, n) {
    var i = this.options;
    if (n === void 0)
      return i[t];
    var o = Ot.modifyOption(this, t, n);
    typeof o < "u" ? i[t] = o : i[t] = n, t === "group" && Te(i);
  },
  /**
   * Destroy
   */
  destroy: function() {
    x("destroy", this);
    var t = this.el;
    t[$] = null, b(t, "mousedown", this._onTapStart), b(t, "touchstart", this._onTapStart), b(t, "pointerdown", this._onTapStart), this.nativeDraggable && (b(t, "dragover", this), b(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Yt.splice(Yt.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Q) {
      if (x("hideClone", this), m.eventCanceled)
        return;
      h(_, "display", "none"), this.options.removeCloneOnHide && _.parentNode && _.parentNode.removeChild(_), Q = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Q) {
      if (x("showClone", this), m.eventCanceled)
        return;
      d.parentNode == S && !this.options.group.revertClone ? S.insertBefore(_, d) : at ? S.insertBefore(_, at) : S.appendChild(_), this.options.group.revertClone && this.animate(d, _), h(_, "display", ""), Q = !1;
    }
  }
};
function Ue(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function Rt(e, t, n, i, o, r, a, l) {
  var s, u = e[$], f = u.options.onMove, c;
  return window.CustomEvent && !U && !Tt ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = i, s.related = o || t, s.relatedRect = r || T(t), s.willInsertAfter = l, s.originalEvent = a, e.dispatchEvent(s), f && (c = f.call(u, s, a)), c;
}
function Ut(e) {
  e.draggable = !1;
}
function Ve() {
  Qt = !1;
}
function Ke(e, t, n) {
  var i = T(ft(n.el, 0, n.options, !0)), o = _e(n.el, n.options, p), r = 10;
  return t ? e.clientX < o.left - r || e.clientY < i.top && e.clientX < i.right : e.clientY < o.top - r || e.clientY < i.bottom && e.clientX < i.left;
}
function Ze(e, t, n) {
  var i = T(ie(n.el, n.options.draggable)), o = _e(n.el, n.options, p), r = 10;
  return t ? e.clientX > o.right + r || e.clientY > i.bottom && e.clientX > i.left : e.clientY > o.bottom + r || e.clientX > i.right && e.clientY > i.top;
}
function Qe(e, t, n, i, o, r, a, l) {
  var s = i ? e.clientY : e.clientX, u = i ? n.height : n.width, f = i ? n.top : n.left, c = i ? n.bottom : n.right, g = !1;
  if (!a) {
    if (l && Ft < u * o) {
      if (!Ct && (Dt === 1 ? s > f + u * r / 2 : s < c - u * r / 2) && (Ct = !0), Ct)
        g = !0;
      else if (Dt === 1 ? s < f + Ft : s > c - Ft)
        return -Dt;
    } else if (s > f + u * (1 - o) / 2 && s < c - u * (1 - o) / 2)
      return tn(t);
  }
  return g = g || a, g && (s < f + u * r / 2 || s > c - u * r / 2) ? s > f + u / 2 ? 1 : -1 : 0;
}
function tn(e) {
  return k(d) < k(e) ? 1 : -1;
}
function en(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, i = 0; n--; )
    i += t.charCodeAt(n);
  return i.toString(36);
}
function nn(e) {
  Bt.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var i = t[n];
    i.checked && Bt.push(i);
  }
}
function $t(e) {
  return setTimeout(e, 0);
}
function te(e) {
  return clearTimeout(e);
}
Gt && w(document, "touchmove", function(e) {
  (m.active || ut) && e.cancelable && e.preventDefault();
});
m.utils = {
  on: w,
  off: b,
  css: h,
  find: we,
  is: function(t, n) {
    return !!B(t, n, t, !1);
  },
  extend: Le,
  throttle: ye,
  closest: B,
  toggleClass: M,
  clone: Se,
  index: k,
  nextTick: $t,
  cancelNextTick: te,
  detectDirection: Ce,
  getChild: ft
};
m.get = function(e) {
  return e[$];
};
m.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(i) {
    if (!i.prototype || !i.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));
    i.utils && (m.utils = W(W({}, m.utils), i.utils)), Ot.mount(i);
  });
};
m.create = function(e, t) {
  return new m(e, t);
};
m.version = Fe;
var C = [], wt, ee, ne = !1, Vt, Kt, Ht, yt;
function on() {
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
      var i = n.originalEvent;
      this.sortable.nativeDraggable ? w(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? w(document, "pointermove", this._handleFallbackAutoScroll) : i.touches ? w(document, "touchmove", this._handleFallbackAutoScroll) : w(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var i = n.originalEvent;
      !this.options.dragOverBubble && !i.rootEl && this._handleAutoScroll(i);
    },
    drop: function() {
      this.sortable.nativeDraggable ? b(document, "dragover", this._handleAutoScroll) : (b(document, "pointermove", this._handleFallbackAutoScroll), b(document, "touchmove", this._handleFallbackAutoScroll), b(document, "mousemove", this._handleFallbackAutoScroll)), pe(), kt(), Xe();
    },
    nulling: function() {
      Ht = ee = wt = ne = yt = Vt = Kt = null, C.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, i) {
      var o = this, r = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(r, a);
      if (Ht = n, i || this.options.forceAutoScrollFallback || Tt || U || Et) {
        Zt(n, this.options, l, i);
        var s = tt(l, !0);
        ne && (!yt || r !== Vt || a !== Kt) && (yt && pe(), yt = setInterval(function() {
          var u = tt(document.elementFromPoint(r, a), !0);
          u !== s && (s = u, kt()), Zt(n, o.options, u, i);
        }, 10), Vt = r, Kt = a);
      } else {
        if (!this.options.bubbleScroll || tt(l, !0) === G()) {
          kt();
          return;
        }
        Zt(n, this.options, tt(l, !1), !1);
      }
    }
  }, q(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function kt() {
  C.forEach(function(e) {
    clearInterval(e.pid);
  }), C = [];
}
function pe() {
  clearInterval(yt);
}
var Zt = ye(function(e, t, n, i) {
  if (t.scroll) {
    var o = (e.touches ? e.touches[0] : e).clientX, r = (e.touches ? e.touches[0] : e).clientY, a = t.scrollSensitivity, l = t.scrollSpeed, s = G(), u = !1, f;
    ee !== n && (ee = n, kt(), wt = t.scroll, f = t.scrollFn, wt === !0 && (wt = tt(n, !0)));
    var c = 0, g = wt;
    do {
      var y = g, v = T(y), E = v.top, L = v.bottom, J = v.left, N = v.right, X = v.width, R = v.height, et = void 0, H = void 0, nt = y.scrollWidth, ht = y.scrollHeight, P = h(y), mt = y.scrollLeft, V = y.scrollTop;
      y === s ? (et = X < nt && (P.overflowX === "auto" || P.overflowX === "scroll" || P.overflowX === "visible"), H = R < ht && (P.overflowY === "auto" || P.overflowY === "scroll" || P.overflowY === "visible")) : (et = X < nt && (P.overflowX === "auto" || P.overflowX === "scroll"), H = R < ht && (P.overflowY === "auto" || P.overflowY === "scroll"));
      var pt = et && (Math.abs(N - o) <= a && mt + X < nt) - (Math.abs(J - o) <= a && !!mt), z = H && (Math.abs(L - r) <= a && V + R < ht) - (Math.abs(E - r) <= a && !!V);
      if (!C[c])
        for (var it = 0; it <= c; it++)
          C[it] || (C[it] = {});
      (C[c].vx != pt || C[c].vy != z || C[c].el !== y) && (C[c].el = y, C[c].vx = pt, C[c].vy = z, clearInterval(C[c].pid), (pt != 0 || z != 0) && (u = !0, C[c].pid = setInterval((function() {
        i && this.layer === 0 && m.active._onTouchMove(Ht);
        var gt = C[this.layer].vy ? C[this.layer].vy * l : 0, K = C[this.layer].vx ? C[this.layer].vx * l : 0;
        typeof f == "function" && f.call(m.dragged.parentNode[$], K, gt, e, Ht, C[this.layer].el) !== "continue" || Ee(C[this.layer].el, K, gt);
      }).bind({
        layer: c
      }), 24))), c++;
    } while (t.bubbleScroll && g !== s && (g = tt(g, !1)));
    ne = u;
  }
}, 30), Ne = function(t) {
  var n = t.originalEvent, i = t.putSortable, o = t.dragEl, r = t.activeSortable, a = t.dispatchSortableEvent, l = t.hideGhostForTarget, s = t.unhideGhostForTarget;
  if (n) {
    var u = i || r;
    l();
    var f = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, c = document.elementFromPoint(f.clientX, f.clientY);
    s(), u && !u.el.contains(c) && (a("spill"), this.onSpill({
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
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, i = t.putSortable;
    this.sortable.captureAnimationState(), i && i.captureAnimationState();
    var o = ft(this.sortable.el, this.startIndex, this.options);
    o ? this.sortable.el.insertBefore(n, o) : this.sortable.el.appendChild(n), this.sortable.animateAll(), i && i.animateAll();
  },
  drop: Ne
};
q(oe, {
  pluginName: "revertOnSpill"
});
function re() {
}
re.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, i = t.putSortable, o = i || this.sortable;
    o.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), o.animateAll();
  },
  drop: Ne
};
q(re, {
  pluginName: "removeOnSpill"
});
m.mount(new on());
m.mount(re, oe);
var rn = m;
function an(e) {
  e.directive("sort", (t, { value: n, modifiers: i, expression: o }, { effect: r, evaluate: a, evaluateLater: l, cleanup: s }) => {
    if (n === "config" || n === "handle" || n === "group")
      return;
    if (n === "key" || n === "item") {
      if ([void 0, null, ""].includes(o))
        return;
      t._x_sort_key = a(o);
      return;
    }
    let u = {
      hideGhost: !i.includes("ghost"),
      useHandles: !!t.querySelector("[x-sort\\:handle]"),
      group: cn(t, i)
    }, f = ln(o, l), c = sn(t, i, a), g = un(t, c, u, (y, v) => {
      f(y, v);
    });
    s(() => g.destroy());
  });
}
function ln(e, t) {
  if ([void 0, null, ""].includes(e))
    return () => {
    };
  let n = t(e);
  return (i, o) => {
    Alpine.dontAutoEvaluateFunctions(() => {
      n(
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
function sn(e, t, n) {
  return e.hasAttribute("x-sort:config") ? n(e.getAttribute("x-sort:config")) : {};
}
function un(e, t, n, i) {
  let o, r = {
    animation: 150,
    handle: n.useHandles ? "[x-sort\\:handle]" : null,
    group: n.group,
    filter(a) {
      return e.querySelector("[x-sort\\:item]") ? !a.target.closest("[x-sort\\:item]") : !1;
    },
    onSort(a) {
      if (a.from !== a.to && a.to !== a.target)
        return;
      let l = a.item._x_sort_key, s = a.newIndex;
      (l !== void 0 || l !== null) && i(l, s);
    },
    onStart() {
      document.body.classList.add("sorting"), o = document.querySelector(".sortable-ghost"), n.hideGhost && o && (o.style.opacity = "0");
    },
    onEnd() {
      document.body.classList.remove("sorting"), n.hideGhost && o && (o.style.opacity = "1"), o = void 0, dn(e);
    }
  };
  return new rn(e, { ...r, ...t });
}
function dn(e) {
  let t = e.firstChild;
  for (; t.nextSibling; ) {
    if (t.textContent.trim() === "[if ENDBLOCK]><![endif]") {
      e.append(t);
      break;
    }
    t = t.nextSibling;
  }
}
function cn(e, t) {
  return e.hasAttribute("x-sort:group") ? e.getAttribute("x-sort:group") : t.indexOf("group") !== -1 ? t[t.indexOf("group") + 1] : null;
}
var fn = an;
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
window.addEventListener("alpine:init", () => {
  console.log("Alpine init event fired!"), Alpine.plugin(fn), Alpine.data("filamentor", () => (console.log("Component definition called"), {
    rows: [],
    showSettings: !1,
    activeRow: null,
    activeColumn: null,
    activeColumnIndex: null,
    activeElement: null,
    activeElementIndex: null,
    rowToDelete: null,
    init() {
      this.rows = this.$wire.get("data"), console.log("Filamentor initialized from JS!"), console.log("Raw canvas data:", this.$refs.canvasData.value);
      const e = this.$refs.canvasData.value;
      e && (this.rows = JSON.parse(e).sort((t, n) => t.order - n.order), console.log("Sorted initial rows:", this.rows)), new Sortable(document.getElementById("rows-container"), {
        animation: 150,
        handle: ".row-handle",
        ghostClass: "sortable-ghost",
        onEnd: (t) => {
          console.log("Before reorder:", this.rows);
          const n = [...this.rows], [i] = n.splice(t.oldIndex, 1);
          n.splice(t.newIndex, 0, i);
          const o = n.map((r, a) => ({
            ...r,
            order: a
          }));
          this.$nextTick(() => {
            this.rows = o, console.log("After reorder:", this.rows), this.updateCanvasData(), this.$wire.saveLayout(JSON.stringify(this.rows));
          });
        }
      });
    },
    handleSort: (e, t) => {
      const n = document.querySelector('[id^="columns-"]'), i = Alpine.$data(n), o = [...i.columns], r = o.findIndex((u) => u.id === parseInt(e)), a = o[r];
      o.splice(r, 1), o.splice(t, 0, a);
      const l = o.map((u, f) => ({
        ...u,
        order: f
      }));
      i.columns = [], Alpine.nextTick(() => {
        i.columns = l;
      });
      const s = n.id.replace("columns-", "");
      Livewire.find(n.closest("[wire\\:id]").getAttribute("wire:id")).call("reorderColumns", s, JSON.stringify(l));
    },
    openRowSettings(e) {
      this.activeRow = e, this.activeRow.padding || (this.activeRow.padding = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeRow.margin || (this.activeRow.margin = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeRow.customClasses || (this.activeRow.customClasses = ""), this.showSettings = !0;
    },
    openColumnSettings(e, t) {
      this.activeRow = e, this.activeColumn = e.columns[t], this.activeColumn.padding || (this.activeColumn.padding = {}), this.activeColumn.margin || (this.activeColumn.margin = {}), this.activeColumn.customClasses || (this.activeColumn.customClasses = ""), this.$dispatch("open-modal", { id: "column-settings-modal" });
    },
    saveRowSettings() {
      const e = this.rows.findIndex((n) => n.id === this.activeRow.id);
      this.rows[e] = {
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
      const e = {
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
      this.rows.push(e), this.updateCanvasData(), this.$wire.saveLayout(JSON.stringify(this.rows));
    },
    deleteRow(e) {
      e.columns.some((n) => n.elements && n.elements.length > 0) ? (this.rowToDelete = e, this.$dispatch("open-modal", { id: "confirm-row-deletion" })) : this.performRowDeletion(e);
    },
    confirmRowDeletion() {
      this.performRowDeletion(this.rowToDelete), this.$dispatch("close-modal", { id: "confirm-row-deletion" }), this.rowToDelete = null;
    },
    performRowDeletion(e) {
      const t = this.rows.findIndex((n) => n.id === e.id);
      t > -1 && (this.rows.splice(t, 1), this.rows = this.rows.map((n, i) => ({
        ...n,
        order: i
      })), this.$wire.saveLayout(JSON.stringify(this.rows)));
    },
    addColumn(e) {
      const t = {
        id: Date.now(),
        //width: `col-span-${Math.floor(12 / (row.columns.length + 1))}`,
        elements: [],
        order: e.columns.length,
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        customClasses: ""
      }, n = [...e.columns, t];
      e.columns = n, this.$nextTick(() => {
        this.rows = [...this.rows], this.$wire.saveLayout(JSON.stringify(this.rows));
      });
    },
    saveColumnSettings() {
      const e = this.rows.findIndex((n) => n.id === this.activeRow.id), t = this.activeRow.columns.findIndex((n) => n.id === this.activeColumn.id);
      this.rows[e].columns[t] = {
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
    updateColumns(e) {
      e = parseInt(e);
      const t = this.activeRow.columns;
      if (e > t.length) {
        const n = e - t.length;
        for (let i = 0; i < n; i++)
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
        this.newColumnCount = e, this.$dispatch("open-modal", { id: "confirm-column-reduction" });
    },
    deleteColumn(e, t) {
      if (e.columns.splice(t, 1), e.columns.length > 0) {
        const n = `col-span-${Math.floor(12 / e.columns.length)}`;
        e.columns.forEach((i) => {
          i.width = n;
        });
      }
      this.$wire.saveLayout(JSON.stringify(this.rows));
    },
    setActiveColumn(e, t) {
      this.activeRow = e, this.activeColumnIndex = t, this.$dispatch("open-modal", { id: "element-picker-modal" });
    },
    addElement(e) {
      if (this.activeRow && this.activeColumnIndex !== null) {
        const t = e.replace(/Filamentor/, "\\Filamentor\\").replace(/Elements/, "Elements\\");
        console.log("Adding element of type:", t), this.activeRow.columns[this.activeColumnIndex].elements.push({
          type: t,
          content: {}
        }), console.log("Updated row state:", JSON.stringify(this.activeRow)), this.$wire.saveLayout(JSON.stringify(this.rows));
      }
    },
    editElement(e, t) {
      var n;
      if (e.columns[t].elements.length) {
        if (this.activeRow = e, this.activeColumnIndex = t, this.activeElement = e.columns[t].elements[0], this.$wire.set("elementContent", null), this.activeElement.type.includes("Text"))
          this.$wire.set("elementContent", this.activeElement.content.text || "");
        else if (this.activeElement.type.includes("Image")) {
          const i = ((n = this.activeElement.content) == null ? void 0 : n.url) || null;
          this.$wire.set("elementContent", i);
        } else this.activeElement.type.includes("Video") && this.$wire.set("elementContent", this.activeElement.content.url || "");
        this.$wire.editElement(this.activeElement.type), this.$dispatch("open-modal", {
          id: "element-editor-modal",
          title: `Edit ${this.activeElement.type.split("\\").pop()} Element`
        });
      }
    },
    saveElementContent(e) {
      this.activeElement && (this.activeElement.type.includes("Image") ? this.$wire.uploadMedia().then((t) => {
        this.activeElement.content = {
          url: t.url,
          thumbnail: t.thumbnail,
          alt: t.alt
        }, this.$wire.saveLayout(JSON.stringify(this.rows)), this.$dispatch("close-modal", { id: "element-editor-modal" });
      }) : this.activeElement.type.includes("Video") ? (this.activeElement.content = { url: e }, this.$wire.saveLayout(JSON.stringify(this.rows)), this.$dispatch("close-modal", { id: "element-editor-modal" })) : (this.activeElement.content = { text: e }, this.$wire.saveLayout(JSON.stringify(this.rows)), this.$dispatch("close-modal", { id: "element-editor-modal" })));
    },
    deleteElement(e, t) {
      e.columns[t].elements = [], this.$wire.saveLayout(JSON.stringify(this.rows));
    },
    updateCanvasData() {
      const e = JSON.stringify(this.rows);
      this.$refs.canvasData.value = e, this.$wire.set("data.layout", e);
    }
  }));
});
