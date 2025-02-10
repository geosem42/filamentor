/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function st(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    e && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function z(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? st(Object(t), !0).forEach(function(o) {
      Mt(n, o, t[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : st(Object(t)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(t, o));
    });
  }
  return n;
}
function Me(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Me = function(e) {
    return typeof e;
  } : Me = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Me(n);
}
function Mt(n, e, t) {
  return e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function q() {
  return q = Object.assign || function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var o in t)
        Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[o]);
    }
    return n;
  }, q.apply(this, arguments);
}
function Rt(n, e) {
  if (n == null) return {};
  var t = {}, o = Object.keys(n), i, r;
  for (r = 0; r < o.length; r++)
    i = o[r], !(e.indexOf(i) >= 0) && (t[i] = n[i]);
  return t;
}
function Ft(n, e) {
  if (n == null) return {};
  var t = Rt(n, e), o, i;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    for (i = 0; i < r.length; i++)
      o = r[i], !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(n, o) && (t[o] = n[o]);
  }
  return t;
}
var Xt = "1.15.6";
function U(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var J = U(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Ce = U(/Edge/i), ut = U(/firefox/i), Ee = U(/safari/i) && !U(/chrome/i) && !U(/android/i), ot = U(/iP(ad|od|hone)/i), vt = U(/chrome/i) && U(/android/i), bt = {
  capture: !1,
  passive: !1
};
function v(n, e, t) {
  n.addEventListener(e, t, !J && bt);
}
function m(n, e, t) {
  n.removeEventListener(e, t, !J && bt);
}
function ke(n, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), n)
      try {
        if (n.matches)
          return n.matches(e);
        if (n.msMatchesSelector)
          return n.msMatchesSelector(e);
        if (n.webkitMatchesSelector)
          return n.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function wt(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function L(n, e, t, o) {
  if (n) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? n.parentNode === t && ke(n, e) : ke(n, e)) || o && n === t)
        return n;
      if (n === t) break;
    } while (n = wt(n));
  }
  return null;
}
var dt = /\s+/g;
function F(n, e, t) {
  if (n && e)
    if (n.classList)
      n.classList[t ? "add" : "remove"](e);
    else {
      var o = (" " + n.className + " ").replace(dt, " ").replace(" " + e + " ", " ");
      n.className = (o + (t ? " " + e : "")).replace(dt, " ");
    }
}
function h(n, e, t) {
  var o = n && n.style;
  if (o) {
    if (t === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? t = document.defaultView.getComputedStyle(n, "") : n.currentStyle && (t = n.currentStyle), e === void 0 ? t : t[e];
    !(e in o) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), o[e] = t + (typeof t == "string" ? "" : "px");
  }
}
function fe(n, e) {
  var t = "";
  if (typeof n == "string")
    t = n;
  else
    do {
      var o = h(n, "transform");
      o && o !== "none" && (t = o + " " + t);
    } while (!e && (n = n.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(t);
}
function yt(n, e, t) {
  if (n) {
    var o = n.getElementsByTagName(e), i = 0, r = o.length;
    if (t)
      for (; i < r; i++)
        t(o[i], i);
    return o;
  }
  return [];
}
function G() {
  var n = document.scrollingElement;
  return n || document.documentElement;
}
function C(n, e, t, o, i) {
  if (!(!n.getBoundingClientRect && n !== window)) {
    var r, a, l, s, u, c, f;
    if (n !== window && n.parentNode && n !== G() ? (r = n.getBoundingClientRect(), a = r.top, l = r.left, s = r.bottom, u = r.right, c = r.height, f = r.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, c = window.innerHeight, f = window.innerWidth), (e || t) && n !== window && (i = i || n.parentNode, !J))
      do
        if (i && i.getBoundingClientRect && (h(i, "transform") !== "none" || t && h(i, "position") !== "static")) {
          var b = i.getBoundingClientRect();
          a -= b.top + parseInt(h(i, "border-top-width")), l -= b.left + parseInt(h(i, "border-left-width")), s = a + r.height, u = l + r.width;
          break;
        }
      while (i = i.parentNode);
    if (o && n !== window) {
      var E = fe(i || n), w = E && E.a, y = E && E.d;
      E && (a /= y, l /= w, f /= w, c /= y, s = a + c, u = l + f);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: f,
      height: c
    };
  }
}
function ft(n, e, t) {
  for (var o = ee(n, !0), i = C(n)[e]; o; ) {
    var r = C(o)[t], a = void 0;
    if (a = i >= r, !a) return o;
    if (o === G()) break;
    o = ee(o, !1);
  }
  return !1;
}
function ce(n, e, t, o) {
  for (var i = 0, r = 0, a = n.children; r < a.length; ) {
    if (a[r].style.display !== "none" && a[r] !== p.ghost && (o || a[r] !== p.dragged) && L(a[r], t.draggable, n, !1)) {
      if (i === e)
        return a[r];
      i++;
    }
    r++;
  }
  return null;
}
function it(n, e) {
  for (var t = n.lastElementChild; t && (t === p.ghost || h(t, "display") === "none" || e && !ke(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function Y(n, e) {
  var t = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== p.clone && (!e || ke(n, e)) && t++;
  return t;
}
function ct(n) {
  var e = 0, t = 0, o = G();
  if (n)
    do {
      var i = fe(n), r = i.a, a = i.d;
      e += n.scrollLeft * r, t += n.scrollTop * a;
    } while (n !== o && (n = n.parentNode));
  return [e, t];
}
function Yt(n, e) {
  for (var t in n)
    if (n.hasOwnProperty(t)) {
      for (var o in e)
        if (e.hasOwnProperty(o) && e[o] === n[t][o]) return Number(t);
    }
  return -1;
}
function ee(n, e) {
  if (!n || !n.getBoundingClientRect) return G();
  var t = n, o = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var i = h(t);
      if (t.clientWidth < t.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return G();
        if (o || e) return t;
        o = !0;
      }
    }
  while (t = t.parentNode);
  return G();
}
function kt(n, e) {
  if (n && e)
    for (var t in e)
      e.hasOwnProperty(t) && (n[t] = e[t]);
  return n;
}
function ze(n, e) {
  return Math.round(n.top) === Math.round(e.top) && Math.round(n.left) === Math.round(e.left) && Math.round(n.height) === Math.round(e.height) && Math.round(n.width) === Math.round(e.width);
}
var De;
function Et(n, e) {
  return function() {
    if (!De) {
      var t = arguments, o = this;
      t.length === 1 ? n.call(o, t[0]) : n.apply(o, t), De = setTimeout(function() {
        De = void 0;
      }, e);
    }
  };
}
function Bt() {
  clearTimeout(De), De = void 0;
}
function Dt(n, e, t) {
  n.scrollLeft += e, n.scrollTop += t;
}
function _t(n) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(n).cloneNode(!0) : t ? t(n).clone(!0)[0] : n.cloneNode(!0);
}
function St(n, e, t) {
  var o = {};
  return Array.from(n.children).forEach(function(i) {
    var r, a, l, s;
    if (!(!L(i, e.draggable, n, !1) || i.animated || i === t)) {
      var u = C(i);
      o.left = Math.min((r = o.left) !== null && r !== void 0 ? r : 1 / 0, u.left), o.top = Math.min((a = o.top) !== null && a !== void 0 ? a : 1 / 0, u.top), o.right = Math.max((l = o.right) !== null && l !== void 0 ? l : -1 / 0, u.right), o.bottom = Math.max((s = o.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
var N = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Ht() {
  var n = [], e;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(i) {
          if (!(h(i, "display") === "none" || i === p.ghost)) {
            n.push({
              target: i,
              rect: C(i)
            });
            var r = z({}, n[n.length - 1].rect);
            if (i.thisAnimationDuration) {
              var a = fe(i, !0);
              a && (r.top -= a.f, r.left -= a.e);
            }
            i.fromRect = r;
          }
        });
      }
    },
    addAnimationState: function(o) {
      n.push(o);
    },
    removeAnimationState: function(o) {
      n.splice(Yt(n, {
        target: o
      }), 1);
    },
    animateAll: function(o) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof o == "function" && o();
        return;
      }
      var r = !1, a = 0;
      n.forEach(function(l) {
        var s = 0, u = l.target, c = u.fromRect, f = C(u), b = u.prevFromRect, E = u.prevToRect, w = l.rect, y = fe(u, !0);
        y && (f.top -= y.f, f.left -= y.e), u.toRect = f, u.thisAnimationDuration && ze(b, f) && !ze(c, f) && // Make sure animatingRect is on line between toRect & fromRect
        (w.top - f.top) / (w.left - f.left) === (c.top - f.top) / (c.left - f.left) && (s = Wt(w, b, E, i.options)), ze(f, c) || (u.prevFromRect = c, u.prevToRect = f, s || (s = i.options.animation), i.animate(u, w, f, s)), s && (r = !0, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), r ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, a) : typeof o == "function" && o(), n = [];
    },
    animate: function(o, i, r, a) {
      if (a) {
        h(o, "transition", ""), h(o, "transform", "");
        var l = fe(this.el), s = l && l.a, u = l && l.d, c = (i.left - r.left) / (s || 1), f = (i.top - r.top) / (u || 1);
        o.animatingX = !!c, o.animatingY = !!f, h(o, "transform", "translate3d(" + c + "px," + f + "px,0)"), this.forRepaintDummy = Lt(o), h(o, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), h(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          h(o, "transition", ""), h(o, "transform", ""), o.animated = !1, o.animatingX = !1, o.animatingY = !1;
        }, a);
      }
    }
  };
}
function Lt(n) {
  return n.offsetWidth;
}
function Wt(n, e, t, o) {
  return Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * o.animation;
}
var le = [], $e = {
  initializeByDefault: !0
}, Oe = {
  mount: function(e) {
    for (var t in $e)
      $e.hasOwnProperty(t) && !(t in e) && (e[t] = $e[t]);
    le.forEach(function(o) {
      if (o.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), le.push(e);
  },
  pluginEvent: function(e, t, o) {
    var i = this;
    this.eventCanceled = !1, o.cancel = function() {
      i.eventCanceled = !0;
    };
    var r = e + "Global";
    le.forEach(function(a) {
      t[a.pluginName] && (t[a.pluginName][r] && t[a.pluginName][r](z({
        sortable: t
      }, o)), t.options[a.pluginName] && t[a.pluginName][e] && t[a.pluginName][e](z({
        sortable: t
      }, o)));
    });
  },
  initializePlugins: function(e, t, o, i) {
    le.forEach(function(l) {
      var s = l.pluginName;
      if (!(!e.options[s] && !l.initializeByDefault)) {
        var u = new l(e, t, e.options);
        u.sortable = e, u.options = e.options, e[s] = u, q(o, u.defaults);
      }
    });
    for (var r in e.options)
      if (e.options.hasOwnProperty(r)) {
        var a = this.modifyOption(e, r, e.options[r]);
        typeof a < "u" && (e.options[r] = a);
      }
  },
  getEventProperties: function(e, t) {
    var o = {};
    return le.forEach(function(i) {
      typeof i.eventProperties == "function" && q(o, i.eventProperties.call(t[i.pluginName], e));
    }), o;
  },
  modifyOption: function(e, t, o) {
    var i;
    return le.forEach(function(r) {
      e[r.pluginName] && r.optionListeners && typeof r.optionListeners[t] == "function" && (i = r.optionListeners[t].call(e[r.pluginName], o));
    }), i;
  }
};
function Gt(n) {
  var e = n.sortable, t = n.rootEl, o = n.name, i = n.targetEl, r = n.cloneEl, a = n.toEl, l = n.fromEl, s = n.oldIndex, u = n.newIndex, c = n.oldDraggableIndex, f = n.newDraggableIndex, b = n.originalEvent, E = n.putSortable, w = n.extraEventProperties;
  if (e = e || t && t[N], !!e) {
    var y, k = e.options, $ = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !J && !Ce ? y = new CustomEvent(o, {
      bubbles: !0,
      cancelable: !0
    }) : (y = document.createEvent("Event"), y.initEvent(o, !0, !0)), y.to = a || t, y.from = l || t, y.item = i || t, y.clone = r, y.oldIndex = s, y.newIndex = u, y.oldDraggableIndex = c, y.newDraggableIndex = f, y.originalEvent = b, y.pullMode = E ? E.lastPutMode : void 0;
    var A = z(z({}, w), Oe.getEventProperties(o, e));
    for (var B in A)
      y[B] = A[B];
    t && t.dispatchEvent(y), k[$] && k[$].call(e, y);
  }
}
var zt = ["evt"], x = function(e, t) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = o.evt, r = Ft(o, zt);
  Oe.pluginEvent.bind(p)(e, t, z({
    dragEl: d,
    parentEl: S,
    ghostEl: g,
    rootEl: D,
    nextEl: ae,
    lastDownEl: Re,
    cloneEl: _,
    cloneHidden: Q,
    dragStarted: be,
    putSortable: O,
    activeSortable: p.active,
    originalEvent: i,
    oldIndex: de,
    oldDraggableIndex: _e,
    newIndex: X,
    newDraggableIndex: Z,
    hideGhostForTarget: It,
    unhideGhostForTarget: At,
    cloneNowHidden: function() {
      Q = !0;
    },
    cloneNowShown: function() {
      Q = !1;
    },
    dispatchSortableEvent: function(l) {
      P({
        sortable: t,
        name: l,
        originalEvent: i
      });
    }
  }, r));
};
function P(n) {
  Gt(z({
    putSortable: O,
    cloneEl: _,
    targetEl: d,
    rootEl: D,
    oldIndex: de,
    oldDraggableIndex: _e,
    newIndex: X,
    newDraggableIndex: Z
  }, n));
}
var d, S, g, D, ae, Re, _, Q, de, X, _e, Z, Ae, O, ue = !1, Be = !1, He = [], ie, H, je, Ue, ht, pt, be, se, Se, Te = !1, Pe = !1, Fe, I, qe = [], Qe = !1, Le = [], Ge = typeof document < "u", xe = ot, gt = Ce || J ? "cssFloat" : "float", $t = Ge && !vt && !ot && "draggable" in document.createElement("div"), Tt = function() {
  if (Ge) {
    if (J)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
}(), Ct = function(e, t) {
  var o = h(e), i = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), r = ce(e, 0, t), a = ce(e, 1, t), l = r && h(r), s = a && h(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + C(r).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + C(a).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (r && l.float && l.float !== "none") {
    var f = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
  }
  return r && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= i && o[gt] === "none" || a && o[gt] === "none" && u + c > i) ? "vertical" : "horizontal";
}, jt = function(e, t, o) {
  var i = o ? e.left : e.top, r = o ? e.right : e.bottom, a = o ? e.width : e.height, l = o ? t.left : t.top, s = o ? t.right : t.bottom, u = o ? t.width : t.height;
  return i === l || r === s || i + a / 2 === l + u / 2;
}, Ut = function(e, t) {
  var o;
  return He.some(function(i) {
    var r = i[N].options.emptyInsertThreshold;
    if (!(!r || it(i))) {
      var a = C(i), l = e >= a.left - r && e <= a.right + r, s = t >= a.top - r && t <= a.bottom + r;
      if (l && s)
        return o = i;
    }
  }), o;
}, Ot = function(e) {
  function t(r, a) {
    return function(l, s, u, c) {
      var f = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (r == null && (a || f))
        return !0;
      if (r == null || r === !1)
        return !1;
      if (a && r === "clone")
        return r;
      if (typeof r == "function")
        return t(r(l, s, u, c), a)(l, s, u, c);
      var b = (a ? l : s).options.group.name;
      return r === !0 || typeof r == "string" && r === b || r.join && r.indexOf(b) > -1;
    };
  }
  var o = {}, i = e.group;
  (!i || Me(i) != "object") && (i = {
    name: i
  }), o.name = i.name, o.checkPull = t(i.pull, !0), o.checkPut = t(i.put), o.revertClone = i.revertClone, e.group = o;
}, It = function() {
  !Tt && g && h(g, "display", "none");
}, At = function() {
  !Tt && g && h(g, "display", "");
};
Ge && !vt && document.addEventListener("click", function(n) {
  if (Be)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), Be = !1, !1;
}, !0);
var re = function(e) {
  if (d) {
    e = e.touches ? e.touches[0] : e;
    var t = Ut(e.clientX, e.clientY);
    if (t) {
      var o = {};
      for (var i in e)
        e.hasOwnProperty(i) && (o[i] = e[i]);
      o.target = o.rootEl = t, o.preventDefault = void 0, o.stopPropagation = void 0, t[N]._onDragOver(o);
    }
  }
}, qt = function(e) {
  d && d.parentNode[N]._isOutsideThisEl(e.target);
};
function p(n, e) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = e = q({}, e), n[N] = this;
  var t = {
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
      return Ct(n, this.options);
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
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: p.supportPointer !== !1 && "PointerEvent" in window && (!Ee || ot),
    emptyInsertThreshold: 5
  };
  Oe.initializePlugins(this, n, t);
  for (var o in t)
    !(o in e) && (e[o] = t[o]);
  Ot(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : $t, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? v(n, "pointerdown", this._onTapStart) : (v(n, "mousedown", this._onTapStart), v(n, "touchstart", this._onTapStart)), this.nativeDraggable && (v(n, "dragover", this), v(n, "dragenter", this)), He.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), q(this, Ht());
}
p.prototype = /** @lends Sortable.prototype */
{
  constructor: p,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (se = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, d) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, o = this.el, i = this.options, r = i.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, c = i.filter;
      if (nn(o), !d && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || i.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Ee && s && s.tagName.toUpperCase() === "SELECT") && (s = L(s, i.draggable, o, !1), !(s && s.animated) && Re !== s)) {
        if (de = Y(s), _e = Y(s, i.draggable), typeof c == "function") {
          if (c.call(this, e, s, this)) {
            P({
              sortable: t,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: o,
              fromEl: o
            }), x("filter", t, {
              evt: e
            }), r && e.preventDefault();
            return;
          }
        } else if (c && (c = c.split(",").some(function(f) {
          if (f = L(u, f.trim(), o, !1), f)
            return P({
              sortable: t,
              rootEl: f,
              name: "filter",
              targetEl: s,
              fromEl: o,
              toEl: o
            }), x("filter", t, {
              evt: e
            }), !0;
        }), c)) {
          r && e.preventDefault();
          return;
        }
        i.handle && !L(u, i.handle, o, !1) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, t, o) {
    var i = this, r = i.el, a = i.options, l = r.ownerDocument, s;
    if (o && !d && o.parentNode === r) {
      var u = C(o);
      if (D = r, d = o, S = d.parentNode, ae = d.nextSibling, Re = o, Ae = a.group, p.dragged = d, ie = {
        target: d,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, ht = ie.clientX - u.left, pt = ie.clientY - u.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, d.style["will-change"] = "all", s = function() {
        if (x("delayEnded", i, {
          evt: e
        }), p.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !ut && i.nativeDraggable && (d.draggable = !0), i._triggerDragStart(e, t), P({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), F(d, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(c) {
        yt(d, c.trim(), Je);
      }), v(l, "dragover", re), v(l, "mousemove", re), v(l, "touchmove", re), a.supportPointer ? (v(l, "pointerup", i._onDrop), !this.nativeDraggable && v(l, "pointercancel", i._onDrop)) : (v(l, "mouseup", i._onDrop), v(l, "touchend", i._onDrop), v(l, "touchcancel", i._onDrop)), ut && this.nativeDraggable && (this.options.touchStartThreshold = 4, d.draggable = !0), x("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(Ce || J))) {
        if (p.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (v(l, "pointerup", i._disableDelayedDrag), v(l, "pointercancel", i._disableDelayedDrag)) : (v(l, "mouseup", i._disableDelayedDrag), v(l, "touchend", i._disableDelayedDrag), v(l, "touchcancel", i._disableDelayedDrag)), v(l, "mousemove", i._delayedDragTouchMoveHandler), v(l, "touchmove", i._delayedDragTouchMoveHandler), a.supportPointer && v(l, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    d && Je(d), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    m(e, "mouseup", this._disableDelayedDrag), m(e, "touchend", this._disableDelayedDrag), m(e, "touchcancel", this._disableDelayedDrag), m(e, "pointerup", this._disableDelayedDrag), m(e, "pointercancel", this._disableDelayedDrag), m(e, "mousemove", this._delayedDragTouchMoveHandler), m(e, "touchmove", this._delayedDragTouchMoveHandler), m(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? v(document, "pointermove", this._onTouchMove) : t ? v(document, "touchmove", this._onTouchMove) : v(document, "mousemove", this._onTouchMove) : (v(d, "dragend", this), v(D, "dragstart", this._onDragStart));
    try {
      document.selection ? Xe(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (ue = !1, D && d) {
      x("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && v(document, "dragover", qt);
      var o = this.options;
      !e && F(d, o.dragClass, !1), F(d, o.ghostClass, !0), p.active = this, e && this._appendGhost(), P({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (H) {
      this._lastX = H.clientX, this._lastY = H.clientY, It();
      for (var e = document.elementFromPoint(H.clientX, H.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(H.clientX, H.clientY), e !== t); )
        t = e;
      if (d.parentNode[N]._isOutsideThisEl(e), t)
        do {
          if (t[N]) {
            var o = void 0;
            if (o = t[N]._onDragOver({
              clientX: H.clientX,
              clientY: H.clientY,
              target: e,
              rootEl: t
            }), o && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = wt(t));
      At();
    }
  },
  _onTouchMove: function(e) {
    if (ie) {
      var t = this.options, o = t.fallbackTolerance, i = t.fallbackOffset, r = e.touches ? e.touches[0] : e, a = g && fe(g, !0), l = g && a && a.a, s = g && a && a.d, u = xe && I && ct(I), c = (r.clientX - ie.clientX + i.x) / (l || 1) + (u ? u[0] - qe[0] : 0) / (l || 1), f = (r.clientY - ie.clientY + i.y) / (s || 1) + (u ? u[1] - qe[1] : 0) / (s || 1);
      if (!p.active && !ue) {
        if (o && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < o)
          return;
        this._onDragStart(e, !0);
      }
      if (g) {
        a ? (a.e += c - (je || 0), a.f += f - (Ue || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: c,
          f
        };
        var b = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        h(g, "webkitTransform", b), h(g, "mozTransform", b), h(g, "msTransform", b), h(g, "transform", b), je = c, Ue = f, H = r;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!g) {
      var e = this.options.fallbackOnBody ? document.body : D, t = C(d, !0, xe, !0, e), o = this.options;
      if (xe) {
        for (I = e; h(I, "position") === "static" && h(I, "transform") === "none" && I !== document; )
          I = I.parentNode;
        I !== document.body && I !== document.documentElement ? (I === document && (I = G()), t.top += I.scrollTop, t.left += I.scrollLeft) : I = G(), qe = ct(I);
      }
      g = d.cloneNode(!0), F(g, o.ghostClass, !1), F(g, o.fallbackClass, !0), F(g, o.dragClass, !0), h(g, "transition", ""), h(g, "transform", ""), h(g, "box-sizing", "border-box"), h(g, "margin", 0), h(g, "top", t.top), h(g, "left", t.left), h(g, "width", t.width), h(g, "height", t.height), h(g, "opacity", "0.8"), h(g, "position", xe ? "absolute" : "fixed"), h(g, "zIndex", "100000"), h(g, "pointerEvents", "none"), p.ghost = g, e.appendChild(g), h(g, "transform-origin", ht / parseInt(g.style.width) * 100 + "% " + pt / parseInt(g.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var o = this, i = e.dataTransfer, r = o.options;
    if (x("dragStart", this, {
      evt: e
    }), p.eventCanceled) {
      this._onDrop();
      return;
    }
    x("setupClone", this), p.eventCanceled || (_ = _t(d), _.removeAttribute("id"), _.draggable = !1, _.style["will-change"] = "", this._hideClone(), F(_, this.options.chosenClass, !1), p.clone = _), o.cloneId = Xe(function() {
      x("clone", o), !p.eventCanceled && (o.options.removeCloneOnHide || D.insertBefore(_, d), o._hideClone(), P({
        sortable: o,
        name: "clone"
      }));
    }), !t && F(d, r.dragClass, !0), t ? (Be = !0, o._loopId = setInterval(o._emulateDragOver, 50)) : (m(document, "mouseup", o._onDrop), m(document, "touchend", o._onDrop), m(document, "touchcancel", o._onDrop), i && (i.effectAllowed = "move", r.setData && r.setData.call(o, i, d)), v(document, "drop", o), h(d, "transform", "translateZ(0)")), ue = !0, o._dragStartId = Xe(o._dragStarted.bind(o, t, e)), v(document, "selectstart", o), be = !0, window.getSelection().removeAllRanges(), Ee && h(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, o = e.target, i, r, a, l = this.options, s = l.group, u = p.active, c = Ae === s, f = l.sort, b = O || u, E, w = this, y = !1;
    if (Qe) return;
    function k(ve, xt) {
      x(ve, w, z({
        evt: e,
        isOwner: c,
        axis: E ? "vertical" : "horizontal",
        revert: a,
        dragRect: i,
        targetRect: r,
        canSort: f,
        fromSortable: b,
        target: o,
        completed: A,
        onMove: function(lt, Nt) {
          return Ne(D, t, d, i, lt, C(lt), e, Nt);
        },
        changed: B
      }, xt));
    }
    function $() {
      k("dragOverAnimationCapture"), w.captureAnimationState(), w !== b && b.captureAnimationState();
    }
    function A(ve) {
      return k("dragOverCompleted", {
        insertion: ve
      }), ve && (c ? u._hideClone() : u._showClone(w), w !== b && (F(d, O ? O.options.ghostClass : u.options.ghostClass, !1), F(d, l.ghostClass, !0)), O !== w && w !== p.active ? O = w : w === p.active && O && (O = null), b === w && (w._ignoreWhileAnimating = o), w.animateAll(function() {
        k("dragOverAnimationComplete"), w._ignoreWhileAnimating = null;
      }), w !== b && (b.animateAll(), b._ignoreWhileAnimating = null)), (o === d && !d.animated || o === t && !o.animated) && (se = null), !l.dragoverBubble && !e.rootEl && o !== document && (d.parentNode[N]._isOutsideThisEl(e.target), !ve && re(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), y = !0;
    }
    function B() {
      X = Y(d), Z = Y(d, l.draggable), P({
        sortable: w,
        name: "change",
        toEl: t,
        newIndex: X,
        newDraggableIndex: Z,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = L(o, l.draggable, t, !0), k("dragOver"), p.eventCanceled) return y;
    if (d.contains(e.target) || o.animated && o.animatingX && o.animatingY || w._ignoreWhileAnimating === o)
      return A(!1);
    if (Be = !1, u && !l.disabled && (c ? f || (a = S !== D) : O === this || (this.lastPutMode = Ae.checkPull(this, u, d, e)) && s.checkPut(this, u, d, e))) {
      if (E = this._getDirection(e, o) === "vertical", i = C(d), k("dragOverValid"), p.eventCanceled) return y;
      if (a)
        return S = D, $(), this._hideClone(), k("revert"), p.eventCanceled || (ae ? D.insertBefore(d, ae) : D.appendChild(d)), A(!0);
      var M = it(t, l.draggable);
      if (!M || Zt(e, E, this) && !M.animated) {
        if (M === d)
          return A(!1);
        if (M && t === e.target && (o = M), o && (r = C(o)), Ne(D, t, d, i, o, r, e, !!o) !== !1)
          return $(), M && M.nextSibling ? t.insertBefore(d, M.nextSibling) : t.appendChild(d), S = t, B(), A(!0);
      } else if (M && Kt(e, E, this)) {
        var te = ce(t, 0, l, !0);
        if (te === d)
          return A(!1);
        if (o = te, r = C(o), Ne(D, t, d, i, o, r, e, !1) !== !1)
          return $(), t.insertBefore(d, te), S = t, B(), A(!0);
      } else if (o.parentNode === t) {
        r = C(o);
        var W = 0, ne, he = d.parentNode !== t, R = !jt(d.animated && d.toRect || i, o.animated && o.toRect || r, E), pe = E ? "top" : "left", V = ft(o, "top", "top") || ft(d, "top", "top"), ge = V ? V.scrollTop : void 0;
        se !== o && (ne = r[pe], Te = !1, Pe = !R && l.invertSwap || he), W = Qt(e, o, r, E, R ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Pe, se === o);
        var j;
        if (W !== 0) {
          var oe = Y(d);
          do
            oe -= W, j = S.children[oe];
          while (j && (h(j, "display") === "none" || j === g));
        }
        if (W === 0 || j === o)
          return A(!1);
        se = o, Se = W;
        var me = o.nextElementSibling, K = !1;
        K = W === 1;
        var Ie = Ne(D, t, d, i, o, r, e, K);
        if (Ie !== !1)
          return (Ie === 1 || Ie === -1) && (K = Ie === 1), Qe = !0, setTimeout(Vt, 30), $(), K && !me ? t.appendChild(d) : o.parentNode.insertBefore(d, K ? me : o), V && Dt(V, 0, ge - V.scrollTop), S = d.parentNode, ne !== void 0 && !Pe && (Fe = Math.abs(ne - C(o)[pe])), B(), A(!0);
      }
      if (t.contains(d))
        return A(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    m(document, "mousemove", this._onTouchMove), m(document, "touchmove", this._onTouchMove), m(document, "pointermove", this._onTouchMove), m(document, "dragover", re), m(document, "mousemove", re), m(document, "touchmove", re);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    m(e, "mouseup", this._onDrop), m(e, "touchend", this._onDrop), m(e, "pointerup", this._onDrop), m(e, "pointercancel", this._onDrop), m(e, "touchcancel", this._onDrop), m(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, o = this.options;
    if (X = Y(d), Z = Y(d, o.draggable), x("drop", this, {
      evt: e
    }), S = d && d.parentNode, X = Y(d), Z = Y(d, o.draggable), p.eventCanceled) {
      this._nulling();
      return;
    }
    ue = !1, Pe = !1, Te = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), et(this.cloneId), et(this._dragStartId), this.nativeDraggable && (m(document, "drop", this), m(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ee && h(document.body, "user-select", ""), h(d, "transform", ""), e && (be && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), g && g.parentNode && g.parentNode.removeChild(g), (D === S || O && O.lastPutMode !== "clone") && _ && _.parentNode && _.parentNode.removeChild(_), d && (this.nativeDraggable && m(d, "dragend", this), Je(d), d.style["will-change"] = "", be && !ue && F(d, O ? O.options.ghostClass : this.options.ghostClass, !1), F(d, this.options.chosenClass, !1), P({
      sortable: this,
      name: "unchoose",
      toEl: S,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), D !== S ? (X >= 0 && (P({
      rootEl: S,
      name: "add",
      toEl: S,
      fromEl: D,
      originalEvent: e
    }), P({
      sortable: this,
      name: "remove",
      toEl: S,
      originalEvent: e
    }), P({
      rootEl: S,
      name: "sort",
      toEl: S,
      fromEl: D,
      originalEvent: e
    }), P({
      sortable: this,
      name: "sort",
      toEl: S,
      originalEvent: e
    })), O && O.save()) : X !== de && X >= 0 && (P({
      sortable: this,
      name: "update",
      toEl: S,
      originalEvent: e
    }), P({
      sortable: this,
      name: "sort",
      toEl: S,
      originalEvent: e
    })), p.active && ((X == null || X === -1) && (X = de, Z = _e), P({
      sortable: this,
      name: "end",
      toEl: S,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    x("nulling", this), D = d = S = g = ae = _ = Re = Q = ie = H = be = X = Z = de = _e = se = Se = O = Ae = p.dragged = p.ghost = p.clone = p.active = null, Le.forEach(function(e) {
      e.checked = !0;
    }), Le.length = je = Ue = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        d && (this._onDragOver(e), Jt(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], t, o = this.el.children, i = 0, r = o.length, a = this.options; i < r; i++)
      t = o[i], L(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || tn(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var o = {}, i = this.el;
    this.toArray().forEach(function(r, a) {
      var l = i.children[a];
      L(l, this.options.draggable, i, !1) && (o[r] = l);
    }, this), t && this.captureAnimationState(), e.forEach(function(r) {
      o[r] && (i.removeChild(o[r]), i.appendChild(o[r]));
    }), t && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, t) {
    return L(e, t || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, t) {
    var o = this.options;
    if (t === void 0)
      return o[e];
    var i = Oe.modifyOption(this, e, t);
    typeof i < "u" ? o[e] = i : o[e] = t, e === "group" && Ot(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    x("destroy", this);
    var e = this.el;
    e[N] = null, m(e, "mousedown", this._onTapStart), m(e, "touchstart", this._onTapStart), m(e, "pointerdown", this._onTapStart), this.nativeDraggable && (m(e, "dragover", this), m(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), He.splice(He.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Q) {
      if (x("hideClone", this), p.eventCanceled) return;
      h(_, "display", "none"), this.options.removeCloneOnHide && _.parentNode && _.parentNode.removeChild(_), Q = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Q) {
      if (x("showClone", this), p.eventCanceled) return;
      d.parentNode == D && !this.options.group.revertClone ? D.insertBefore(_, d) : ae ? D.insertBefore(_, ae) : D.appendChild(_), this.options.group.revertClone && this.animate(d, _), h(_, "display", ""), Q = !1;
    }
  }
};
function Jt(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function Ne(n, e, t, o, i, r, a, l) {
  var s, u = n[N], c = u.options.onMove, f;
  return window.CustomEvent && !J && !Ce ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = e, s.from = n, s.dragged = t, s.draggedRect = o, s.related = i || e, s.relatedRect = r || C(e), s.willInsertAfter = l, s.originalEvent = a, n.dispatchEvent(s), c && (f = c.call(u, s, a)), f;
}
function Je(n) {
  n.draggable = !1;
}
function Vt() {
  Qe = !1;
}
function Kt(n, e, t) {
  var o = C(ce(t.el, 0, t.options, !0)), i = St(t.el, t.options, g), r = 10;
  return e ? n.clientX < i.left - r || n.clientY < o.top && n.clientX < o.right : n.clientY < i.top - r || n.clientY < o.bottom && n.clientX < o.left;
}
function Zt(n, e, t) {
  var o = C(it(t.el, t.options.draggable)), i = St(t.el, t.options, g), r = 10;
  return e ? n.clientX > i.right + r || n.clientY > o.bottom && n.clientX > o.left : n.clientY > i.bottom + r || n.clientX > o.right && n.clientY > o.top;
}
function Qt(n, e, t, o, i, r, a, l) {
  var s = o ? n.clientY : n.clientX, u = o ? t.height : t.width, c = o ? t.top : t.left, f = o ? t.bottom : t.right, b = !1;
  if (!a) {
    if (l && Fe < u * i) {
      if (!Te && (Se === 1 ? s > c + u * r / 2 : s < f - u * r / 2) && (Te = !0), Te)
        b = !0;
      else if (Se === 1 ? s < c + Fe : s > f - Fe)
        return -Se;
    } else if (s > c + u * (1 - i) / 2 && s < f - u * (1 - i) / 2)
      return en(e);
  }
  return b = b || a, b && (s < c + u * r / 2 || s > f - u * r / 2) ? s > c + u / 2 ? 1 : -1 : 0;
}
function en(n) {
  return Y(d) < Y(n) ? 1 : -1;
}
function tn(n) {
  for (var e = n.tagName + n.className + n.src + n.href + n.textContent, t = e.length, o = 0; t--; )
    o += e.charCodeAt(t);
  return o.toString(36);
}
function nn(n) {
  Le.length = 0;
  for (var e = n.getElementsByTagName("input"), t = e.length; t--; ) {
    var o = e[t];
    o.checked && Le.push(o);
  }
}
function Xe(n) {
  return setTimeout(n, 0);
}
function et(n) {
  return clearTimeout(n);
}
Ge && v(document, "touchmove", function(n) {
  (p.active || ue) && n.cancelable && n.preventDefault();
});
p.utils = {
  on: v,
  off: m,
  css: h,
  find: yt,
  is: function(e, t) {
    return !!L(e, t, e, !1);
  },
  extend: kt,
  throttle: Et,
  closest: L,
  toggleClass: F,
  clone: _t,
  index: Y,
  nextTick: Xe,
  cancelNextTick: et,
  detectDirection: Ct,
  getChild: ce,
  expando: N
};
p.get = function(n) {
  return n[N];
};
p.mount = function() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (p.utils = z(z({}, p.utils), o.utils)), Oe.mount(o);
  });
};
p.create = function(n, e) {
  return new p(n, e);
};
p.version = Xt;
var T = [], we, tt, nt = !1, Ve, Ke, We, ye;
function on() {
  function n() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return n.prototype = {
    dragStarted: function(t) {
      var o = t.originalEvent;
      this.sortable.nativeDraggable ? v(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? v(document, "pointermove", this._handleFallbackAutoScroll) : o.touches ? v(document, "touchmove", this._handleFallbackAutoScroll) : v(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var o = t.originalEvent;
      !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
    },
    drop: function() {
      this.sortable.nativeDraggable ? m(document, "dragover", this._handleAutoScroll) : (m(document, "pointermove", this._handleFallbackAutoScroll), m(document, "touchmove", this._handleFallbackAutoScroll), m(document, "mousemove", this._handleFallbackAutoScroll)), mt(), Ye(), Bt();
    },
    nulling: function() {
      We = tt = we = nt = ye = Ve = Ke = null, T.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, o) {
      var i = this, r = (t.touches ? t.touches[0] : t).clientX, a = (t.touches ? t.touches[0] : t).clientY, l = document.elementFromPoint(r, a);
      if (We = t, o || this.options.forceAutoScrollFallback || Ce || J || Ee) {
        Ze(t, this.options, l, o);
        var s = ee(l, !0);
        nt && (!ye || r !== Ve || a !== Ke) && (ye && mt(), ye = setInterval(function() {
          var u = ee(document.elementFromPoint(r, a), !0);
          u !== s && (s = u, Ye()), Ze(t, i.options, u, o);
        }, 10), Ve = r, Ke = a);
      } else {
        if (!this.options.bubbleScroll || ee(l, !0) === G()) {
          Ye();
          return;
        }
        Ze(t, this.options, ee(l, !1), !1);
      }
    }
  }, q(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Ye() {
  T.forEach(function(n) {
    clearInterval(n.pid);
  }), T = [];
}
function mt() {
  clearInterval(ye);
}
var Ze = Et(function(n, e, t, o) {
  if (e.scroll) {
    var i = (n.touches ? n.touches[0] : n).clientX, r = (n.touches ? n.touches[0] : n).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = G(), u = !1, c;
    tt !== t && (tt = t, Ye(), we = e.scroll, c = e.scrollFn, we === !0 && (we = ee(t, !0)));
    var f = 0, b = we;
    do {
      var E = b, w = C(E), y = w.top, k = w.bottom, $ = w.left, A = w.right, B = w.width, M = w.height, te = void 0, W = void 0, ne = E.scrollWidth, he = E.scrollHeight, R = h(E), pe = E.scrollLeft, V = E.scrollTop;
      E === s ? (te = B < ne && (R.overflowX === "auto" || R.overflowX === "scroll" || R.overflowX === "visible"), W = M < he && (R.overflowY === "auto" || R.overflowY === "scroll" || R.overflowY === "visible")) : (te = B < ne && (R.overflowX === "auto" || R.overflowX === "scroll"), W = M < he && (R.overflowY === "auto" || R.overflowY === "scroll"));
      var ge = te && (Math.abs(A - i) <= a && pe + B < ne) - (Math.abs($ - i) <= a && !!pe), j = W && (Math.abs(k - r) <= a && V + M < he) - (Math.abs(y - r) <= a && !!V);
      if (!T[f])
        for (var oe = 0; oe <= f; oe++)
          T[oe] || (T[oe] = {});
      (T[f].vx != ge || T[f].vy != j || T[f].el !== E) && (T[f].el = E, T[f].vx = ge, T[f].vy = j, clearInterval(T[f].pid), (ge != 0 || j != 0) && (u = !0, T[f].pid = setInterval((function() {
        o && this.layer === 0 && p.active._onTouchMove(We);
        var me = T[this.layer].vy ? T[this.layer].vy * l : 0, K = T[this.layer].vx ? T[this.layer].vx * l : 0;
        typeof c == "function" && c.call(p.dragged.parentNode[N], K, me, n, We, T[this.layer].el) !== "continue" || Dt(T[this.layer].el, K, me);
      }).bind({
        layer: f
      }), 24))), f++;
    } while (e.bubbleScroll && b !== s && (b = ee(b, !1)));
    nt = u;
  }
}, 30), Pt = function(e) {
  var t = e.originalEvent, o = e.putSortable, i = e.dragEl, r = e.activeSortable, a = e.dispatchSortableEvent, l = e.hideGhostForTarget, s = e.unhideGhostForTarget;
  if (t) {
    var u = o || r;
    l();
    var c = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, f = document.elementFromPoint(c.clientX, c.clientY);
    s(), u && !u.el.contains(f) && (a("spill"), this.onSpill({
      dragEl: i,
      putSortable: o
    }));
  }
};
function rt() {
}
rt.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var i = ce(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(t, i) : this.sortable.el.appendChild(t), this.sortable.animateAll(), o && o.animateAll();
  },
  drop: Pt
};
q(rt, {
  pluginName: "revertOnSpill"
});
function at() {
}
at.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, o = e.putSortable, i = o || this.sortable;
    i.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), i.animateAll();
  },
  drop: Pt
};
q(at, {
  pluginName: "removeOnSpill"
});
p.mount(new on());
p.mount(at, rt);
console.log("Filamentor loaded!");
window.addEventListener("alpine:init", () => {
  console.log("Alpine init event fired!"), Alpine.data("filamentor", () => (console.log("Component definition called"), {
    rows: [],
    showSettings: !1,
    activeRow: null,
    init() {
      console.log("Filamentor initialized from JS!"), console.log("Raw canvas data:", this.$refs.canvasData.value);
      const n = this.$refs.canvasData.value;
      n && (this.rows = JSON.parse(n).sort((e, t) => e.order - t.order), console.log("Sorted initial rows:", this.rows)), new p(document.getElementById("rows-container"), {
        animation: 150,
        handle: ".row-handle",
        ghostClass: "sortable-ghost",
        onEnd: (e) => {
          console.log("Before reorder:", this.rows);
          const t = [...this.rows], [o] = t.splice(e.oldIndex, 1);
          t.splice(e.newIndex, 0, o);
          const i = t.map((r, a) => ({
            ...r,
            order: a
          }));
          this.$nextTick(() => {
            this.rows = i, console.log("After reorder:", this.rows), this.updateCanvasData();
          });
        }
      });
    },
    openRowSettings(n) {
      this.activeRow = n, this.showSettings = !0;
    },
    updateColumns(n) {
      const e = `w-${Math.floor(12 / n)}/12`;
      this.activeRow.columns = Array(parseInt(n)).fill().map(() => e), console.log("Updated columns:", this.activeRow.columns);
    },
    saveRowSettings() {
      const n = this.rows.findIndex((t) => t.id === this.activeRow.id);
      this.rows[n] = this.activeRow;
      const e = JSON.stringify(this.rows);
      this.$refs.canvasData.value = e, this.$wire.saveLayout(e), console.log("Row settings saved:", this.activeRow);
    },
    addRow() {
      console.log("Adding new row");
      const n = {
        id: Date.now(),
        order: this.rows.length,
        columns: []
      };
      this.rows.push(n), console.log("Updated rows:", this.rows), this.updateCanvasData(), console.log("Canvas data:", this.$refs.canvasData.value);
    },
    updateCanvasData() {
      const n = JSON.stringify(this.rows);
      this.$refs.canvasData.value = n, this.$wire.set("data.layout", n);
    }
  }));
});
