(function(he){typeof define=="function"&&define.amd?define(he):he()})(function(){"use strict";var he=document.createElement("style");he.textContent=`body{background-color:#f5f5f5}
/*$vite$:1*/`,document.head.appendChild(he);/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */function st(o,e){var t=Object.keys(o);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(o);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(o,i).enumerable})),t.push.apply(t,n)}return t}function G(o){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?st(Object(t),!0).forEach(function(n){Nt(o,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(t)):st(Object(t)).forEach(function(n){Object.defineProperty(o,n,Object.getOwnPropertyDescriptor(t,n))})}return o}function Ae(o){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ae=function(e){return typeof e}:Ae=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ae(o)}function Nt(o,e,t){return e in o?Object.defineProperty(o,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):o[e]=t,o}function j(){return j=Object.assign||function(o){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(o[n]=t[n])}return o},j.apply(this,arguments)}function Mt(o,e){if(o==null)return{};var t={},n=Object.keys(o),i,r;for(r=0;r<n.length;r++)i=n[r],!(e.indexOf(i)>=0)&&(t[i]=o[i]);return t}function Ft(o,e){if(o==null)return{};var t=Mt(o,e),n,i;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(o);for(i=0;i<r.length;i++)n=r[i],!(e.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(o,n)&&(t[n]=o[n])}return t}var Rt="1.15.6";function $(o){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(o)}var U=$(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),pe=$(/Edge/i),ut=$(/firefox/i),ge=$(/safari/i)&&!$(/chrome/i)&&!$(/android/i),je=$(/iP(ad|od|hone)/i),ft=$(/chrome/i)&&$(/android/i),dt={capture:!1,passive:!1};function v(o,e,t){o.addEventListener(e,t,!U&&dt)}function m(o,e,t){o.removeEventListener(e,t,!U&&dt)}function Pe(o,e){if(e){if(e[0]===">"&&(e=e.substring(1)),o)try{if(o.matches)return o.matches(e);if(o.msMatchesSelector)return o.msMatchesSelector(e);if(o.webkitMatchesSelector)return o.webkitMatchesSelector(e)}catch{return!1}return!1}}function ct(o){return o.host&&o!==document&&o.host.nodeType?o.host:o.parentNode}function k(o,e,t,n){if(o){t=t||document;do{if(e!=null&&(e[0]===">"?o.parentNode===t&&Pe(o,e):Pe(o,e))||n&&o===t)return o;if(o===t)break}while(o=ct(o))}return null}var ht=/\s+/g;function M(o,e,t){if(o&&e)if(o.classList)o.classList[t?"add":"remove"](e);else{var n=(" "+o.className+" ").replace(ht," ").replace(" "+e+" "," ");o.className=(n+(t?" "+e:"")).replace(ht," ")}}function h(o,e,t){var n=o&&o.style;if(n){if(t===void 0)return document.defaultView&&document.defaultView.getComputedStyle?t=document.defaultView.getComputedStyle(o,""):o.currentStyle&&(t=o.currentStyle),e===void 0?t:t[e];!(e in n)&&e.indexOf("webkit")===-1&&(e="-webkit-"+e),n[e]=t+(typeof t=="string"?"":"px")}}function le(o,e){var t="";if(typeof o=="string")t=o;else do{var n=h(o,"transform");n&&n!=="none"&&(t=n+" "+t)}while(!e&&(o=o.parentNode));var i=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return i&&new i(t)}function pt(o,e,t){if(o){var n=o.getElementsByTagName(e),i=0,r=n.length;if(t)for(;i<r;i++)t(n[i],i);return n}return[]}function L(){var o=document.scrollingElement;return o||document.documentElement}function T(o,e,t,n,i){if(!(!o.getBoundingClientRect&&o!==window)){var r,a,l,s,u,c,d;if(o!==window&&o.parentNode&&o!==L()?(r=o.getBoundingClientRect(),a=r.top,l=r.left,s=r.bottom,u=r.right,c=r.height,d=r.width):(a=0,l=0,s=window.innerHeight,u=window.innerWidth,c=window.innerHeight,d=window.innerWidth),(e||t)&&o!==window&&(i=i||o.parentNode,!U))do if(i&&i.getBoundingClientRect&&(h(i,"transform")!=="none"||t&&h(i,"position")!=="static")){var b=i.getBoundingClientRect();a-=b.top+parseInt(h(i,"border-top-width")),l-=b.left+parseInt(h(i,"border-left-width")),s=a+r.height,u=l+r.width;break}while(i=i.parentNode);if(n&&o!==window){var y=le(i||o),E=y&&y.a,w=y&&y.d;y&&(a/=w,l/=E,d/=E,c/=w,s=a+c,u=l+d)}return{top:a,left:l,bottom:s,right:u,width:d,height:c}}}function gt(o,e,t){for(var n=K(o,!0),i=T(o)[e];n;){var r=T(n)[t],a=void 0;if(a=i>=r,!a)return n;if(n===L())break;n=K(n,!1)}return!1}function se(o,e,t,n){for(var i=0,r=0,a=o.children;r<a.length;){if(a[r].style.display!=="none"&&a[r]!==p.ghost&&(n||a[r]!==p.dragged)&&k(a[r],t.draggable,o,!1)){if(i===e)return a[r];i++}r++}return null}function $e(o,e){for(var t=o.lastElementChild;t&&(t===p.ghost||h(t,"display")==="none"||e&&!Pe(t,e));)t=t.previousElementSibling;return t||null}function Y(o,e){var t=0;if(!o||!o.parentNode)return-1;for(;o=o.previousElementSibling;)o.nodeName.toUpperCase()!=="TEMPLATE"&&o!==p.clone&&(!e||Pe(o,e))&&t++;return t}function mt(o){var e=0,t=0,n=L();if(o)do{var i=le(o),r=i.a,a=i.d;e+=o.scrollLeft*r,t+=o.scrollTop*a}while(o!==n&&(o=o.parentNode));return[e,t]}function Xt(o,e){for(var t in o)if(o.hasOwnProperty(t)){for(var n in e)if(e.hasOwnProperty(n)&&e[n]===o[t][n])return Number(t)}return-1}function K(o,e){if(!o||!o.getBoundingClientRect)return L();var t=o,n=!1;do if(t.clientWidth<t.scrollWidth||t.clientHeight<t.scrollHeight){var i=h(t);if(t.clientWidth<t.scrollWidth&&(i.overflowX=="auto"||i.overflowX=="scroll")||t.clientHeight<t.scrollHeight&&(i.overflowY=="auto"||i.overflowY=="scroll")){if(!t.getBoundingClientRect||t===document.body)return L();if(n||e)return t;n=!0}}while(t=t.parentNode);return L()}function Yt(o,e){if(o&&e)for(var t in e)e.hasOwnProperty(t)&&(o[t]=e[t]);return o}function Ue(o,e){return Math.round(o.top)===Math.round(e.top)&&Math.round(o.left)===Math.round(e.left)&&Math.round(o.height)===Math.round(e.height)&&Math.round(o.width)===Math.round(e.width)}var me;function vt(o,e){return function(){if(!me){var t=arguments,n=this;t.length===1?o.call(n,t[0]):o.apply(n,t),me=setTimeout(function(){me=void 0},e)}}}function kt(){clearTimeout(me),me=void 0}function bt(o,e,t){o.scrollLeft+=e,o.scrollTop+=t}function Et(o){var e=window.Polymer,t=window.jQuery||window.Zepto;return e&&e.dom?e.dom(o).cloneNode(!0):t?t(o).clone(!0)[0]:o.cloneNode(!0)}function wt(o,e,t){var n={};return Array.from(o.children).forEach(function(i){var r,a,l,s;if(!(!k(i,e.draggable,o,!1)||i.animated||i===t)){var u=T(i);n.left=Math.min((r=n.left)!==null&&r!==void 0?r:1/0,u.left),n.top=Math.min((a=n.top)!==null&&a!==void 0?a:1/0,u.top),n.right=Math.max((l=n.right)!==null&&l!==void 0?l:-1/0,u.right),n.bottom=Math.max((s=n.bottom)!==null&&s!==void 0?s:-1/0,u.bottom)}}),n.width=n.right-n.left,n.height=n.bottom-n.top,n.x=n.left,n.y=n.top,n}var x="Sortable"+new Date().getTime();function Bt(){var o=[],e;return{captureAnimationState:function(){if(o=[],!!this.options.animation){var n=[].slice.call(this.el.children);n.forEach(function(i){if(!(h(i,"display")==="none"||i===p.ghost)){o.push({target:i,rect:T(i)});var r=G({},o[o.length-1].rect);if(i.thisAnimationDuration){var a=le(i,!0);a&&(r.top-=a.f,r.left-=a.e)}i.fromRect=r}})}},addAnimationState:function(n){o.push(n)},removeAnimationState:function(n){o.splice(Xt(o,{target:n}),1)},animateAll:function(n){var i=this;if(!this.options.animation){clearTimeout(e),typeof n=="function"&&n();return}var r=!1,a=0;o.forEach(function(l){var s=0,u=l.target,c=u.fromRect,d=T(u),b=u.prevFromRect,y=u.prevToRect,E=l.rect,w=le(u,!0);w&&(d.top-=w.f,d.left-=w.e),u.toRect=d,u.thisAnimationDuration&&Ue(b,d)&&!Ue(c,d)&&(E.top-d.top)/(E.left-d.left)===(c.top-d.top)/(c.left-d.left)&&(s=Wt(E,b,y,i.options)),Ue(d,c)||(u.prevFromRect=c,u.prevToRect=d,s||(s=i.options.animation),i.animate(u,E,d,s)),s&&(r=!0,a=Math.max(a,s),clearTimeout(u.animationResetTimer),u.animationResetTimer=setTimeout(function(){u.animationTime=0,u.prevFromRect=null,u.fromRect=null,u.prevToRect=null,u.thisAnimationDuration=null},s),u.thisAnimationDuration=s)}),clearTimeout(e),r?e=setTimeout(function(){typeof n=="function"&&n()},a):typeof n=="function"&&n(),o=[]},animate:function(n,i,r,a){if(a){h(n,"transition",""),h(n,"transform","");var l=le(this.el),s=l&&l.a,u=l&&l.d,c=(i.left-r.left)/(s||1),d=(i.top-r.top)/(u||1);n.animatingX=!!c,n.animatingY=!!d,h(n,"transform","translate3d("+c+"px,"+d+"px,0)"),this.forRepaintDummy=Ht(n),h(n,"transition","transform "+a+"ms"+(this.options.easing?" "+this.options.easing:"")),h(n,"transform","translate3d(0,0,0)"),typeof n.animated=="number"&&clearTimeout(n.animated),n.animated=setTimeout(function(){h(n,"transition",""),h(n,"transform",""),n.animated=!1,n.animatingX=!1,n.animatingY=!1},a)}}}}function Ht(o){return o.offsetWidth}function Wt(o,e,t,n){return Math.sqrt(Math.pow(e.top-o.top,2)+Math.pow(e.left-o.left,2))/Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))*n.animation}var ue=[],qe={initializeByDefault:!0},ve={mount:function(e){for(var t in qe)qe.hasOwnProperty(t)&&!(t in e)&&(e[t]=qe[t]);ue.forEach(function(n){if(n.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),ue.push(e)},pluginEvent:function(e,t,n){var i=this;this.eventCanceled=!1,n.cancel=function(){i.eventCanceled=!0};var r=e+"Global";ue.forEach(function(a){t[a.pluginName]&&(t[a.pluginName][r]&&t[a.pluginName][r](G({sortable:t},n)),t.options[a.pluginName]&&t[a.pluginName][e]&&t[a.pluginName][e](G({sortable:t},n)))})},initializePlugins:function(e,t,n,i){ue.forEach(function(l){var s=l.pluginName;if(!(!e.options[s]&&!l.initializeByDefault)){var u=new l(e,t,e.options);u.sortable=e,u.options=e.options,e[s]=u,j(n,u.defaults)}});for(var r in e.options)if(e.options.hasOwnProperty(r)){var a=this.modifyOption(e,r,e.options[r]);typeof a<"u"&&(e.options[r]=a)}},getEventProperties:function(e,t){var n={};return ue.forEach(function(i){typeof i.eventProperties=="function"&&j(n,i.eventProperties.call(t[i.pluginName],e))}),n},modifyOption:function(e,t,n){var i;return ue.forEach(function(r){e[r.pluginName]&&r.optionListeners&&typeof r.optionListeners[t]=="function"&&(i=r.optionListeners[t].call(e[r.pluginName],n))}),i}};function Gt(o){var e=o.sortable,t=o.rootEl,n=o.name,i=o.targetEl,r=o.cloneEl,a=o.toEl,l=o.fromEl,s=o.oldIndex,u=o.newIndex,c=o.oldDraggableIndex,d=o.newDraggableIndex,b=o.originalEvent,y=o.putSortable,E=o.extraEventProperties;if(e=e||t&&t[x],!!e){var w,H=e.options,q="on"+n.charAt(0).toUpperCase()+n.substr(1);window.CustomEvent&&!U&&!pe?w=new CustomEvent(n,{bubbles:!0,cancelable:!0}):(w=document.createEvent("Event"),w.initEvent(n,!0,!0)),w.to=a||t,w.from=l||t,w.item=i||t,w.clone=r,w.oldIndex=s,w.newIndex=u,w.oldDraggableIndex=c,w.newDraggableIndex=d,w.originalEvent=b,w.pullMode=y?y.lastPutMode:void 0;var P=G(G({},E),ve.getEventProperties(n,e));for(var W in P)w[W]=P[W];t&&t.dispatchEvent(w),H[q]&&H[q].call(e,w)}}var Lt=["evt"],N=function(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=n.evt,r=Ft(n,Lt);ve.pluginEvent.bind(p)(e,t,G({dragEl:f,parentEl:S,ghostEl:g,rootEl:_,nextEl:te,lastDownEl:xe,cloneEl:D,cloneHidden:Z,dragStarted:Ee,putSortable:O,activeSortable:p.active,originalEvent:i,oldIndex:fe,oldDraggableIndex:be,newIndex:F,newDraggableIndex:J,hideGhostForTarget:Ot,unhideGhostForTarget:It,cloneNowHidden:function(){Z=!0},cloneNowShown:function(){Z=!1},dispatchSortableEvent:function(l){A({sortable:t,name:l,originalEvent:i})}},r))};function A(o){Gt(G({putSortable:O,cloneEl:D,targetEl:f,rootEl:_,oldIndex:fe,oldDraggableIndex:be,newIndex:F,newDraggableIndex:J},o))}var f,S,g,_,te,xe,D,Z,fe,F,be,J,Ne,O,de=!1,Me=!1,Fe=[],ne,B,Ve,Ke,yt,_t,Ee,ce,we,ye=!1,Re=!1,Xe,I,Ze=[],Je=!1,Ye=[],ke=typeof document<"u",Be=je,Dt=pe||U?"cssFloat":"float",zt=ke&&!ft&&!je&&"draggable"in document.createElement("div"),St=function(){if(ke){if(U)return!1;var o=document.createElement("x");return o.style.cssText="pointer-events:auto",o.style.pointerEvents==="auto"}}(),Tt=function(e,t){var n=h(e),i=parseInt(n.width)-parseInt(n.paddingLeft)-parseInt(n.paddingRight)-parseInt(n.borderLeftWidth)-parseInt(n.borderRightWidth),r=se(e,0,t),a=se(e,1,t),l=r&&h(r),s=a&&h(a),u=l&&parseInt(l.marginLeft)+parseInt(l.marginRight)+T(r).width,c=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+T(a).width;if(n.display==="flex")return n.flexDirection==="column"||n.flexDirection==="column-reverse"?"vertical":"horizontal";if(n.display==="grid")return n.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(r&&l.float&&l.float!=="none"){var d=l.float==="left"?"left":"right";return a&&(s.clear==="both"||s.clear===d)?"vertical":"horizontal"}return r&&(l.display==="block"||l.display==="flex"||l.display==="table"||l.display==="grid"||u>=i&&n[Dt]==="none"||a&&n[Dt]==="none"&&u+c>i)?"vertical":"horizontal"},jt=function(e,t,n){var i=n?e.left:e.top,r=n?e.right:e.bottom,a=n?e.width:e.height,l=n?t.left:t.top,s=n?t.right:t.bottom,u=n?t.width:t.height;return i===l||r===s||i+a/2===l+u/2},$t=function(e,t){var n;return Fe.some(function(i){var r=i[x].options.emptyInsertThreshold;if(!(!r||$e(i))){var a=T(i),l=e>=a.left-r&&e<=a.right+r,s=t>=a.top-r&&t<=a.bottom+r;if(l&&s)return n=i}}),n},Ct=function(e){function t(r,a){return function(l,s,u,c){var d=l.options.group.name&&s.options.group.name&&l.options.group.name===s.options.group.name;if(r==null&&(a||d))return!0;if(r==null||r===!1)return!1;if(a&&r==="clone")return r;if(typeof r=="function")return t(r(l,s,u,c),a)(l,s,u,c);var b=(a?l:s).options.group.name;return r===!0||typeof r=="string"&&r===b||r.join&&r.indexOf(b)>-1}}var n={},i=e.group;(!i||Ae(i)!="object")&&(i={name:i}),n.name=i.name,n.checkPull=t(i.pull,!0),n.checkPut=t(i.put),n.revertClone=i.revertClone,e.group=n},Ot=function(){!St&&g&&h(g,"display","none")},It=function(){!St&&g&&h(g,"display","")};ke&&!ft&&document.addEventListener("click",function(o){if(Me)return o.preventDefault(),o.stopPropagation&&o.stopPropagation(),o.stopImmediatePropagation&&o.stopImmediatePropagation(),Me=!1,!1},!0);var oe=function(e){if(f){e=e.touches?e.touches[0]:e;var t=$t(e.clientX,e.clientY);if(t){var n={};for(var i in e)e.hasOwnProperty(i)&&(n[i]=e[i]);n.target=n.rootEl=t,n.preventDefault=void 0,n.stopPropagation=void 0,t[x]._onDragOver(n)}}},Ut=function(e){f&&f.parentNode[x]._isOutsideThisEl(e.target)};function p(o,e){if(!(o&&o.nodeType&&o.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));this.el=o,this.options=e=j({},e),o[x]=this;var t={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(o.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Tt(o,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(a,l){a.setData("Text",l.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:p.supportPointer!==!1&&"PointerEvent"in window&&(!ge||je),emptyInsertThreshold:5};ve.initializePlugins(this,o,t);for(var n in t)!(n in e)&&(e[n]=t[n]);Ct(e);for(var i in this)i.charAt(0)==="_"&&typeof this[i]=="function"&&(this[i]=this[i].bind(this));this.nativeDraggable=e.forceFallback?!1:zt,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?v(o,"pointerdown",this._onTapStart):(v(o,"mousedown",this._onTapStart),v(o,"touchstart",this._onTapStart)),this.nativeDraggable&&(v(o,"dragover",this),v(o,"dragenter",this)),Fe.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),j(this,Bt())}p.prototype={constructor:p,_isOutsideThisEl:function(e){!this.el.contains(e)&&e!==this.el&&(ce=null)},_getDirection:function(e,t){return typeof this.options.direction=="function"?this.options.direction.call(this,e,t,f):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,n=this.el,i=this.options,r=i.preventOnFilter,a=e.type,l=e.touches&&e.touches[0]||e.pointerType&&e.pointerType==="touch"&&e,s=(l||e).target,u=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||s,c=i.filter;if(tn(n),!f&&!(/mousedown|pointerdown/.test(a)&&e.button!==0||i.disabled)&&!u.isContentEditable&&!(!this.nativeDraggable&&ge&&s&&s.tagName.toUpperCase()==="SELECT")&&(s=k(s,i.draggable,n,!1),!(s&&s.animated)&&xe!==s)){if(fe=Y(s),be=Y(s,i.draggable),typeof c=="function"){if(c.call(this,e,s,this)){A({sortable:t,rootEl:u,name:"filter",targetEl:s,toEl:n,fromEl:n}),N("filter",t,{evt:e}),r&&e.preventDefault();return}}else if(c&&(c=c.split(",").some(function(d){if(d=k(u,d.trim(),n,!1),d)return A({sortable:t,rootEl:d,name:"filter",targetEl:s,fromEl:n,toEl:n}),N("filter",t,{evt:e}),!0}),c)){r&&e.preventDefault();return}i.handle&&!k(u,i.handle,n,!1)||this._prepareDragStart(e,l,s)}}},_prepareDragStart:function(e,t,n){var i=this,r=i.el,a=i.options,l=r.ownerDocument,s;if(n&&!f&&n.parentNode===r){var u=T(n);if(_=r,f=n,S=f.parentNode,te=f.nextSibling,xe=n,Ne=a.group,p.dragged=f,ne={target:f,clientX:(t||e).clientX,clientY:(t||e).clientY},yt=ne.clientX-u.left,_t=ne.clientY-u.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,f.style["will-change"]="all",s=function(){if(N("delayEnded",i,{evt:e}),p.eventCanceled){i._onDrop();return}i._disableDelayedDragEvents(),!ut&&i.nativeDraggable&&(f.draggable=!0),i._triggerDragStart(e,t),A({sortable:i,name:"choose",originalEvent:e}),M(f,a.chosenClass,!0)},a.ignore.split(",").forEach(function(c){pt(f,c.trim(),Qe)}),v(l,"dragover",oe),v(l,"mousemove",oe),v(l,"touchmove",oe),a.supportPointer?(v(l,"pointerup",i._onDrop),!this.nativeDraggable&&v(l,"pointercancel",i._onDrop)):(v(l,"mouseup",i._onDrop),v(l,"touchend",i._onDrop),v(l,"touchcancel",i._onDrop)),ut&&this.nativeDraggable&&(this.options.touchStartThreshold=4,f.draggable=!0),N("delayStart",this,{evt:e}),a.delay&&(!a.delayOnTouchOnly||t)&&(!this.nativeDraggable||!(pe||U))){if(p.eventCanceled){this._onDrop();return}a.supportPointer?(v(l,"pointerup",i._disableDelayedDrag),v(l,"pointercancel",i._disableDelayedDrag)):(v(l,"mouseup",i._disableDelayedDrag),v(l,"touchend",i._disableDelayedDrag),v(l,"touchcancel",i._disableDelayedDrag)),v(l,"mousemove",i._delayedDragTouchMoveHandler),v(l,"touchmove",i._delayedDragTouchMoveHandler),a.supportPointer&&v(l,"pointermove",i._delayedDragTouchMoveHandler),i._dragStartTimer=setTimeout(s,a.delay)}else s()}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){f&&Qe(f),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;m(e,"mouseup",this._disableDelayedDrag),m(e,"touchend",this._disableDelayedDrag),m(e,"touchcancel",this._disableDelayedDrag),m(e,"pointerup",this._disableDelayedDrag),m(e,"pointercancel",this._disableDelayedDrag),m(e,"mousemove",this._delayedDragTouchMoveHandler),m(e,"touchmove",this._delayedDragTouchMoveHandler),m(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||e.pointerType=="touch"&&e,!this.nativeDraggable||t?this.options.supportPointer?v(document,"pointermove",this._onTouchMove):t?v(document,"touchmove",this._onTouchMove):v(document,"mousemove",this._onTouchMove):(v(f,"dragend",this),v(_,"dragstart",this._onDragStart));try{document.selection?We(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(e,t){if(de=!1,_&&f){N("dragStarted",this,{evt:t}),this.nativeDraggable&&v(document,"dragover",Ut);var n=this.options;!e&&M(f,n.dragClass,!1),M(f,n.ghostClass,!0),p.active=this,e&&this._appendGhost(),A({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(B){this._lastX=B.clientX,this._lastY=B.clientY,Ot();for(var e=document.elementFromPoint(B.clientX,B.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(B.clientX,B.clientY),e!==t);)t=e;if(f.parentNode[x]._isOutsideThisEl(e),t)do{if(t[x]){var n=void 0;if(n=t[x]._onDragOver({clientX:B.clientX,clientY:B.clientY,target:e,rootEl:t}),n&&!this.options.dragoverBubble)break}e=t}while(t=ct(t));It()}},_onTouchMove:function(e){if(ne){var t=this.options,n=t.fallbackTolerance,i=t.fallbackOffset,r=e.touches?e.touches[0]:e,a=g&&le(g,!0),l=g&&a&&a.a,s=g&&a&&a.d,u=Be&&I&&mt(I),c=(r.clientX-ne.clientX+i.x)/(l||1)+(u?u[0]-Ze[0]:0)/(l||1),d=(r.clientY-ne.clientY+i.y)/(s||1)+(u?u[1]-Ze[1]:0)/(s||1);if(!p.active&&!de){if(n&&Math.max(Math.abs(r.clientX-this._lastX),Math.abs(r.clientY-this._lastY))<n)return;this._onDragStart(e,!0)}if(g){a?(a.e+=c-(Ve||0),a.f+=d-(Ke||0)):a={a:1,b:0,c:0,d:1,e:c,f:d};var b="matrix(".concat(a.a,",").concat(a.b,",").concat(a.c,",").concat(a.d,",").concat(a.e,",").concat(a.f,")");h(g,"webkitTransform",b),h(g,"mozTransform",b),h(g,"msTransform",b),h(g,"transform",b),Ve=c,Ke=d,B=r}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!g){var e=this.options.fallbackOnBody?document.body:_,t=T(f,!0,Be,!0,e),n=this.options;if(Be){for(I=e;h(I,"position")==="static"&&h(I,"transform")==="none"&&I!==document;)I=I.parentNode;I!==document.body&&I!==document.documentElement?(I===document&&(I=L()),t.top+=I.scrollTop,t.left+=I.scrollLeft):I=L(),Ze=mt(I)}g=f.cloneNode(!0),M(g,n.ghostClass,!1),M(g,n.fallbackClass,!0),M(g,n.dragClass,!0),h(g,"transition",""),h(g,"transform",""),h(g,"box-sizing","border-box"),h(g,"margin",0),h(g,"top",t.top),h(g,"left",t.left),h(g,"width",t.width),h(g,"height",t.height),h(g,"opacity","0.8"),h(g,"position",Be?"absolute":"fixed"),h(g,"zIndex","100000"),h(g,"pointerEvents","none"),p.ghost=g,e.appendChild(g),h(g,"transform-origin",yt/parseInt(g.style.width)*100+"% "+_t/parseInt(g.style.height)*100+"%")}},_onDragStart:function(e,t){var n=this,i=e.dataTransfer,r=n.options;if(N("dragStart",this,{evt:e}),p.eventCanceled){this._onDrop();return}N("setupClone",this),p.eventCanceled||(D=Et(f),D.removeAttribute("id"),D.draggable=!1,D.style["will-change"]="",this._hideClone(),M(D,this.options.chosenClass,!1),p.clone=D),n.cloneId=We(function(){N("clone",n),!p.eventCanceled&&(n.options.removeCloneOnHide||_.insertBefore(D,f),n._hideClone(),A({sortable:n,name:"clone"}))}),!t&&M(f,r.dragClass,!0),t?(Me=!0,n._loopId=setInterval(n._emulateDragOver,50)):(m(document,"mouseup",n._onDrop),m(document,"touchend",n._onDrop),m(document,"touchcancel",n._onDrop),i&&(i.effectAllowed="move",r.setData&&r.setData.call(n,i,f)),v(document,"drop",n),h(f,"transform","translateZ(0)")),de=!0,n._dragStartId=We(n._dragStarted.bind(n,t,e)),v(document,"selectstart",n),Ee=!0,window.getSelection().removeAllRanges(),ge&&h(document.body,"user-select","none")},_onDragOver:function(e){var t=this.el,n=e.target,i,r,a,l=this.options,s=l.group,u=p.active,c=Ne===s,d=l.sort,b=O||u,y,E=this,w=!1;if(Je)return;function H(Ie,on){N(Ie,E,G({evt:e,isOwner:c,axis:y?"vertical":"horizontal",revert:a,dragRect:i,targetRect:r,canSort:d,fromSortable:b,target:n,completed:P,onMove:function(xt,rn){return He(_,t,f,i,xt,T(xt),e,rn)},changed:W},on))}function q(){H("dragOverAnimationCapture"),E.captureAnimationState(),E!==b&&b.captureAnimationState()}function P(Ie){return H("dragOverCompleted",{insertion:Ie}),Ie&&(c?u._hideClone():u._showClone(E),E!==b&&(M(f,O?O.options.ghostClass:u.options.ghostClass,!1),M(f,l.ghostClass,!0)),O!==E&&E!==p.active?O=E:E===p.active&&O&&(O=null),b===E&&(E._ignoreWhileAnimating=n),E.animateAll(function(){H("dragOverAnimationComplete"),E._ignoreWhileAnimating=null}),E!==b&&(b.animateAll(),b._ignoreWhileAnimating=null)),(n===f&&!f.animated||n===t&&!n.animated)&&(ce=null),!l.dragoverBubble&&!e.rootEl&&n!==document&&(f.parentNode[x]._isOutsideThisEl(e.target),!Ie&&oe(e)),!l.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),w=!0}function W(){F=Y(f),J=Y(f,l.draggable),A({sortable:E,name:"change",toEl:t,newIndex:F,newDraggableIndex:J,originalEvent:e})}if(e.preventDefault!==void 0&&e.cancelable&&e.preventDefault(),n=k(n,l.draggable,t,!0),H("dragOver"),p.eventCanceled)return w;if(f.contains(e.target)||n.animated&&n.animatingX&&n.animatingY||E._ignoreWhileAnimating===n)return P(!1);if(Me=!1,u&&!l.disabled&&(c?d||(a=S!==_):O===this||(this.lastPutMode=Ne.checkPull(this,u,f,e))&&s.checkPut(this,u,f,e))){if(y=this._getDirection(e,n)==="vertical",i=T(f),H("dragOverValid"),p.eventCanceled)return w;if(a)return S=_,q(),this._hideClone(),H("revert"),p.eventCanceled||(te?_.insertBefore(f,te):_.appendChild(f)),P(!0);var R=$e(t,l.draggable);if(!R||Zt(e,y,this)&&!R.animated){if(R===f)return P(!1);if(R&&t===e.target&&(n=R),n&&(r=T(n)),He(_,t,f,i,n,r,e,!!n)!==!1)return q(),R&&R.nextSibling?t.insertBefore(f,R.nextSibling):t.appendChild(f),S=t,W(),P(!0)}else if(R&&Kt(e,y,this)){var ie=se(t,0,l,!0);if(ie===f)return P(!1);if(n=ie,r=T(n),He(_,t,f,i,n,r,e,!1)!==!1)return q(),t.insertBefore(f,ie),S=t,W(),P(!0)}else if(n.parentNode===t){r=T(n);var z=0,re,Se=f.parentNode!==t,X=!jt(f.animated&&f.toRect||i,n.animated&&n.toRect||r,y),Te=y?"top":"left",Q=gt(n,"top","top")||gt(f,"top","top"),Ce=Q?Q.scrollTop:void 0;ce!==n&&(re=r[Te],ye=!1,Re=!X&&l.invertSwap||Se),z=Jt(e,n,r,y,X?1:l.swapThreshold,l.invertedSwapThreshold==null?l.swapThreshold:l.invertedSwapThreshold,Re,ce===n);var V;if(z!==0){var ae=Y(f);do ae-=z,V=S.children[ae];while(V&&(h(V,"display")==="none"||V===g))}if(z===0||V===n)return P(!1);ce=n,we=z;var Oe=n.nextElementSibling,ee=!1;ee=z===1;var ze=He(_,t,f,i,n,r,e,ee);if(ze!==!1)return(ze===1||ze===-1)&&(ee=ze===1),Je=!0,setTimeout(Vt,30),q(),ee&&!Oe?t.appendChild(f):n.parentNode.insertBefore(f,ee?Oe:n),Q&&bt(Q,0,Ce-Q.scrollTop),S=f.parentNode,re!==void 0&&!Re&&(Xe=Math.abs(re-T(n)[Te])),W(),P(!0)}if(t.contains(f))return P(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){m(document,"mousemove",this._onTouchMove),m(document,"touchmove",this._onTouchMove),m(document,"pointermove",this._onTouchMove),m(document,"dragover",oe),m(document,"mousemove",oe),m(document,"touchmove",oe)},_offUpEvents:function(){var e=this.el.ownerDocument;m(e,"mouseup",this._onDrop),m(e,"touchend",this._onDrop),m(e,"pointerup",this._onDrop),m(e,"pointercancel",this._onDrop),m(e,"touchcancel",this._onDrop),m(document,"selectstart",this)},_onDrop:function(e){var t=this.el,n=this.options;if(F=Y(f),J=Y(f,n.draggable),N("drop",this,{evt:e}),S=f&&f.parentNode,F=Y(f),J=Y(f,n.draggable),p.eventCanceled){this._nulling();return}de=!1,Re=!1,ye=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),et(this.cloneId),et(this._dragStartId),this.nativeDraggable&&(m(document,"drop",this),m(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),ge&&h(document.body,"user-select",""),h(f,"transform",""),e&&(Ee&&(e.cancelable&&e.preventDefault(),!n.dropBubble&&e.stopPropagation()),g&&g.parentNode&&g.parentNode.removeChild(g),(_===S||O&&O.lastPutMode!=="clone")&&D&&D.parentNode&&D.parentNode.removeChild(D),f&&(this.nativeDraggable&&m(f,"dragend",this),Qe(f),f.style["will-change"]="",Ee&&!de&&M(f,O?O.options.ghostClass:this.options.ghostClass,!1),M(f,this.options.chosenClass,!1),A({sortable:this,name:"unchoose",toEl:S,newIndex:null,newDraggableIndex:null,originalEvent:e}),_!==S?(F>=0&&(A({rootEl:S,name:"add",toEl:S,fromEl:_,originalEvent:e}),A({sortable:this,name:"remove",toEl:S,originalEvent:e}),A({rootEl:S,name:"sort",toEl:S,fromEl:_,originalEvent:e}),A({sortable:this,name:"sort",toEl:S,originalEvent:e})),O&&O.save()):F!==fe&&F>=0&&(A({sortable:this,name:"update",toEl:S,originalEvent:e}),A({sortable:this,name:"sort",toEl:S,originalEvent:e})),p.active&&((F==null||F===-1)&&(F=fe,J=be),A({sortable:this,name:"end",toEl:S,originalEvent:e}),this.save()))),this._nulling()},_nulling:function(){N("nulling",this),_=f=S=g=te=D=xe=Z=ne=B=Ee=F=J=fe=be=ce=we=O=Ne=p.dragged=p.ghost=p.clone=p.active=null,Ye.forEach(function(e){e.checked=!0}),Ye.length=Ve=Ke=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":f&&(this._onDragOver(e),qt(e));break;case"selectstart":e.preventDefault();break}},toArray:function(){for(var e=[],t,n=this.el.children,i=0,r=n.length,a=this.options;i<r;i++)t=n[i],k(t,a.draggable,this.el,!1)&&e.push(t.getAttribute(a.dataIdAttr)||en(t));return e},sort:function(e,t){var n={},i=this.el;this.toArray().forEach(function(r,a){var l=i.children[a];k(l,this.options.draggable,i,!1)&&(n[r]=l)},this),t&&this.captureAnimationState(),e.forEach(function(r){n[r]&&(i.removeChild(n[r]),i.appendChild(n[r]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return k(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var n=this.options;if(t===void 0)return n[e];var i=ve.modifyOption(this,e,t);typeof i<"u"?n[e]=i:n[e]=t,e==="group"&&Ct(n)},destroy:function(){N("destroy",this);var e=this.el;e[x]=null,m(e,"mousedown",this._onTapStart),m(e,"touchstart",this._onTapStart),m(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(m(e,"dragover",this),m(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),Fe.splice(Fe.indexOf(this.el),1),this.el=e=null},_hideClone:function(){if(!Z){if(N("hideClone",this),p.eventCanceled)return;h(D,"display","none"),this.options.removeCloneOnHide&&D.parentNode&&D.parentNode.removeChild(D),Z=!0}},_showClone:function(e){if(e.lastPutMode!=="clone"){this._hideClone();return}if(Z){if(N("showClone",this),p.eventCanceled)return;f.parentNode==_&&!this.options.group.revertClone?_.insertBefore(D,f):te?_.insertBefore(D,te):_.appendChild(D),this.options.group.revertClone&&this.animate(f,D),h(D,"display",""),Z=!1}}};function qt(o){o.dataTransfer&&(o.dataTransfer.dropEffect="move"),o.cancelable&&o.preventDefault()}function He(o,e,t,n,i,r,a,l){var s,u=o[x],c=u.options.onMove,d;return window.CustomEvent&&!U&&!pe?s=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(s=document.createEvent("Event"),s.initEvent("move",!0,!0)),s.to=e,s.from=o,s.dragged=t,s.draggedRect=n,s.related=i||e,s.relatedRect=r||T(e),s.willInsertAfter=l,s.originalEvent=a,o.dispatchEvent(s),c&&(d=c.call(u,s,a)),d}function Qe(o){o.draggable=!1}function Vt(){Je=!1}function Kt(o,e,t){var n=T(se(t.el,0,t.options,!0)),i=wt(t.el,t.options,g),r=10;return e?o.clientX<i.left-r||o.clientY<n.top&&o.clientX<n.right:o.clientY<i.top-r||o.clientY<n.bottom&&o.clientX<n.left}function Zt(o,e,t){var n=T($e(t.el,t.options.draggable)),i=wt(t.el,t.options,g),r=10;return e?o.clientX>i.right+r||o.clientY>n.bottom&&o.clientX>n.left:o.clientY>i.bottom+r||o.clientX>n.right&&o.clientY>n.top}function Jt(o,e,t,n,i,r,a,l){var s=n?o.clientY:o.clientX,u=n?t.height:t.width,c=n?t.top:t.left,d=n?t.bottom:t.right,b=!1;if(!a){if(l&&Xe<u*i){if(!ye&&(we===1?s>c+u*r/2:s<d-u*r/2)&&(ye=!0),ye)b=!0;else if(we===1?s<c+Xe:s>d-Xe)return-we}else if(s>c+u*(1-i)/2&&s<d-u*(1-i)/2)return Qt(e)}return b=b||a,b&&(s<c+u*r/2||s>d-u*r/2)?s>c+u/2?1:-1:0}function Qt(o){return Y(f)<Y(o)?1:-1}function en(o){for(var e=o.tagName+o.className+o.src+o.href+o.textContent,t=e.length,n=0;t--;)n+=e.charCodeAt(t);return n.toString(36)}function tn(o){Ye.length=0;for(var e=o.getElementsByTagName("input"),t=e.length;t--;){var n=e[t];n.checked&&Ye.push(n)}}function We(o){return setTimeout(o,0)}function et(o){return clearTimeout(o)}ke&&v(document,"touchmove",function(o){(p.active||de)&&o.cancelable&&o.preventDefault()}),p.utils={on:v,off:m,css:h,find:pt,is:function(e,t){return!!k(e,t,e,!1)},extend:Yt,throttle:vt,closest:k,toggleClass:M,clone:Et,index:Y,nextTick:We,cancelNextTick:et,detectDirection:Tt,getChild:se,expando:x},p.get=function(o){return o[x]},p.mount=function(){for(var o=arguments.length,e=new Array(o),t=0;t<o;t++)e[t]=arguments[t];e[0].constructor===Array&&(e=e[0]),e.forEach(function(n){if(!n.prototype||!n.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(n));n.utils&&(p.utils=G(G({},p.utils),n.utils)),ve.mount(n)})},p.create=function(o,e){return new p(o,e)},p.version=Rt;var C=[],_e,tt,nt=!1,ot,it,Ge,De;function nn(){function o(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var e in this)e.charAt(0)==="_"&&typeof this[e]=="function"&&(this[e]=this[e].bind(this))}return o.prototype={dragStarted:function(t){var n=t.originalEvent;this.sortable.nativeDraggable?v(document,"dragover",this._handleAutoScroll):this.options.supportPointer?v(document,"pointermove",this._handleFallbackAutoScroll):n.touches?v(document,"touchmove",this._handleFallbackAutoScroll):v(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var n=t.originalEvent;!this.options.dragOverBubble&&!n.rootEl&&this._handleAutoScroll(n)},drop:function(){this.sortable.nativeDraggable?m(document,"dragover",this._handleAutoScroll):(m(document,"pointermove",this._handleFallbackAutoScroll),m(document,"touchmove",this._handleFallbackAutoScroll),m(document,"mousemove",this._handleFallbackAutoScroll)),At(),Le(),kt()},nulling:function(){Ge=tt=_e=nt=De=ot=it=null,C.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,n){var i=this,r=(t.touches?t.touches[0]:t).clientX,a=(t.touches?t.touches[0]:t).clientY,l=document.elementFromPoint(r,a);if(Ge=t,n||this.options.forceAutoScrollFallback||pe||U||ge){rt(t,this.options,l,n);var s=K(l,!0);nt&&(!De||r!==ot||a!==it)&&(De&&At(),De=setInterval(function(){var u=K(document.elementFromPoint(r,a),!0);u!==s&&(s=u,Le()),rt(t,i.options,u,n)},10),ot=r,it=a)}else{if(!this.options.bubbleScroll||K(l,!0)===L()){Le();return}rt(t,this.options,K(l,!1),!1)}}},j(o,{pluginName:"scroll",initializeByDefault:!0})}function Le(){C.forEach(function(o){clearInterval(o.pid)}),C=[]}function At(){clearInterval(De)}var rt=vt(function(o,e,t,n){if(e.scroll){var i=(o.touches?o.touches[0]:o).clientX,r=(o.touches?o.touches[0]:o).clientY,a=e.scrollSensitivity,l=e.scrollSpeed,s=L(),u=!1,c;tt!==t&&(tt=t,Le(),_e=e.scroll,c=e.scrollFn,_e===!0&&(_e=K(t,!0)));var d=0,b=_e;do{var y=b,E=T(y),w=E.top,H=E.bottom,q=E.left,P=E.right,W=E.width,R=E.height,ie=void 0,z=void 0,re=y.scrollWidth,Se=y.scrollHeight,X=h(y),Te=y.scrollLeft,Q=y.scrollTop;y===s?(ie=W<re&&(X.overflowX==="auto"||X.overflowX==="scroll"||X.overflowX==="visible"),z=R<Se&&(X.overflowY==="auto"||X.overflowY==="scroll"||X.overflowY==="visible")):(ie=W<re&&(X.overflowX==="auto"||X.overflowX==="scroll"),z=R<Se&&(X.overflowY==="auto"||X.overflowY==="scroll"));var Ce=ie&&(Math.abs(P-i)<=a&&Te+W<re)-(Math.abs(q-i)<=a&&!!Te),V=z&&(Math.abs(H-r)<=a&&Q+R<Se)-(Math.abs(w-r)<=a&&!!Q);if(!C[d])for(var ae=0;ae<=d;ae++)C[ae]||(C[ae]={});(C[d].vx!=Ce||C[d].vy!=V||C[d].el!==y)&&(C[d].el=y,C[d].vx=Ce,C[d].vy=V,clearInterval(C[d].pid),(Ce!=0||V!=0)&&(u=!0,C[d].pid=setInterval((function(){n&&this.layer===0&&p.active._onTouchMove(Ge);var Oe=C[this.layer].vy?C[this.layer].vy*l:0,ee=C[this.layer].vx?C[this.layer].vx*l:0;typeof c=="function"&&c.call(p.dragged.parentNode[x],ee,Oe,o,Ge,C[this.layer].el)!=="continue"||bt(C[this.layer].el,ee,Oe)}).bind({layer:d}),24))),d++}while(e.bubbleScroll&&b!==s&&(b=K(b,!1)));nt=u}},30),Pt=function(e){var t=e.originalEvent,n=e.putSortable,i=e.dragEl,r=e.activeSortable,a=e.dispatchSortableEvent,l=e.hideGhostForTarget,s=e.unhideGhostForTarget;if(t){var u=n||r;l();var c=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,d=document.elementFromPoint(c.clientX,c.clientY);s(),u&&!u.el.contains(d)&&(a("spill"),this.onSpill({dragEl:i,putSortable:n}))}};function at(){}at.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,n=e.putSortable;this.sortable.captureAnimationState(),n&&n.captureAnimationState();var i=se(this.sortable.el,this.startIndex,this.options);i?this.sortable.el.insertBefore(t,i):this.sortable.el.appendChild(t),this.sortable.animateAll(),n&&n.animateAll()},drop:Pt},j(at,{pluginName:"revertOnSpill"});function lt(){}lt.prototype={onSpill:function(e){var t=e.dragEl,n=e.putSortable,i=n||this.sortable;i.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),i.animateAll()},drop:Pt},j(lt,{pluginName:"removeOnSpill"}),p.mount(new nn),p.mount(lt,at),console.log("Filamentor loaded!"),window.addEventListener("alpine:init",()=>{console.log("Alpine init event fired!"),Alpine.data("filamentor",()=>(console.log("Component definition called"),{init(){console.log("Filamentor initialized from JS!"),new p(document.getElementById("rows-container"),{animation:150,handle:".row-handle",ghostClass:"sortable-ghost"})}}))})});
