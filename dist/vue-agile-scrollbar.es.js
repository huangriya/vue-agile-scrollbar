var props = {
  minBarSize: {
    type: Number,
    default: 50
  },
  scrollTop: {
    type: [Number, Function],
    default: 0
  },
  scrollLeft: {
    type: [Number, Function],
    default: 0
  },
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
  offsetHit: {
    type: Number,
    default: 10
  },
  isAutoUpdate: {
    type: Boolean,
    default: true
  },
  dragSpeedX: {
    type: Number,
    default: 1
  },
  dragSpeedY: {
    type: Number,
    default: 1
  }
};
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "vue-agile-scrollbar", class: { "not-user-select": _vm.scrollBarX.clientX || _vm.scrollBarY.clientY } }, [_c("div", { ref: "scroll", staticClass: "agile-scroll-content", on: { "scroll": _vm.onScroll } }, [_c("div", { ref: "scrollContent", staticClass: "agile-scroll-wrapper" }, [_vm._t("default")], 2)]), _c("div", { staticClass: "agile-scroll-bar-x", class: { act: _vm.scrollBarX.clientX || _vm.scrollBarY.clientY }, style: { left: _vm.scrollBarX.left + "px", width: _vm.scrollBarX.width + "px" }, on: { "mousedown": function($event) {
    return _vm.scrollBarDown($event, "scrollBarX");
  } } }), _c("div", { staticClass: "agile-scroll-bar-y", class: { act: _vm.scrollBarY.clientY || _vm.scrollBarX.clientX }, style: { top: _vm.scrollBarY.top + "px", height: _vm.scrollBarY.height + "px" }, on: { "mousedown": function($event) {
    return _vm.scrollBarDown($event, "scrollBarY");
  } } })]);
};
var staticRenderFns = [];
var vueAgileScrollbar_vue_vue_type_style_index_0_lang = "";
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script = {
  props,
  data() {
    return {
      scrollBarY: {
        clientY: null,
        height: 0,
        top: this.offsetTop,
        multiple: 1
      },
      scrollBarX: {
        clientX: null,
        width: 0,
        left: this.offsetLeft,
        multiple: 1
      },
      scrollWidth: 0,
      scrollHeight: 0,
      scrollContentWidth: 0,
      scrollContentHeight: 0
    };
  },
  mounted() {
    this.$scroll = this.$refs.scroll;
    this.$scrollContent = this.$refs.scrollContent;
    this.initContainer();
    this.initScrollBar();
    if (this.isAutoUpdate) {
      this.observer = new MutationObserver(this.updated);
      this.observer.observe(this.$refs.scrollContent, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    this.addDragEvent();
  },
  methods: {
    initContainer() {
      this.scrollWidth = this.$scroll.offsetWidth;
      this.scrollHeight = this.$scroll.offsetHeight;
      this.scrollContentWidth = this.$scrollContent.offsetWidth;
      this.scrollContentHeight = this.$scrollContent.offsetHeight;
    },
    initScrollBar() {
      if (this.scrollContentWidth > this.scrollWidth) {
        const width = this.scrollWidth - (this.scrollContentWidth - this.scrollWidth);
        this.scrollBarX.width = width < this.minBarSize ? this.minBarSize : width;
        this.scrollBarX.multiple = (this.scrollContentWidth - this.scrollWidth) / (this.scrollWidth - this.scrollBarX.width - this.offsetLeft - this.offsetRight);
      }
      if (this.scrollContentHeight > this.scrollHeight) {
        const height = this.scrollHeight - (this.scrollContentHeight - this.scrollHeight);
        this.scrollBarY.height = height < this.minBarSize ? this.minBarSize : height;
        this.scrollBarY.multiple = (this.scrollContentHeight - this.scrollHeight) / (this.scrollHeight - this.scrollBarY.height - this.offsetTop - this.offsetBottom);
      }
    },
    updated() {
      this.initContainer();
      this.initScrollBar();
    },
    onScroll(e) {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = this.$scroll.scrollTop;
          const scrollLeft = this.$scroll.scrollLeft;
          const top = this.offsetTop + Math.floor(scrollTop / this.scrollBarY.multiple);
          if (top !== this.scrollBarY.top) {
            this.scrollBarY.top = top;
          }
          const left = this.offsetLeft + Math.floor(scrollLeft / this.scrollBarX.multiple);
          if (left !== this.scrollBarX.left) {
            this.scrollBarX.left = left;
          }
          this.$emit("scroll", {
            top: scrollTop,
            left: scrollLeft
          }, e);
          if (this._events["scroll-hit"]) {
            this.onScrollHit(scrollTop, scrollLeft);
          }
          this.ticking = false;
        });
        this.ticking = true;
      }
    },
    onScrollHit(scrollTop, scrollLeft) {
      let type = "top", scrollY = scrollTop - this.initTop, scrollX = scrollLeft - this.initLeft;
      this.initTop = scrollTop;
      this.initLeft = scrollLeft;
      const scrollHit = () => {
        this.$emit("scroll-hit", type, {
          top: scrollTop,
          left: scrollLeft
        });
      };
      if (scrollY !== 0 && this.scrollBarY.height) {
        scrollY < 0 ? type = "top" : type = "bottom";
        if (this.scrollContentHeight - this.scrollHeight - scrollTop === 0) {
          scrollHit();
        }
        if (scrollTop === 0 && type === "top") {
          scrollHit();
        }
      }
      if (scrollX !== 0 && this.scrollBarX.width) {
        scrollX < 0 ? type = "left" : type = "right";
        if (scrollLeft === 0 && type === "left") {
          scrollHit();
        }
        if (this.scrollContentWidth - this.scrollWidth - scrollLeft === 0) {
          scrollHit();
        }
      }
    },
    scrollBarDown(e, key) {
      if (key === "scrollBarX") {
        this.scrollBarX.clientX = e.clientX;
        this.scrollBarX.scrollLeft = this.$scroll.scrollLeft;
      }
      if (key === "scrollBarY") {
        this.scrollBarY.clientY = e.clientY;
        this.scrollBarY.scrollTop = this.$scroll.scrollTop;
      }
      window.addEventListener("mousemove", this.scrollBarDrag);
    },
    scrollBarDrag(e) {
      const clientX = this.scrollBarX.clientX;
      const clientY = this.scrollBarY.clientY;
      if (clientX) {
        let dragX = e.clientX - clientX;
        this.$scroll.scrollLeft = this.scrollBarX.scrollLeft + dragX * (this.scrollBarX.multiple * this.dragSpeedX);
      }
      if (clientY) {
        let dragY = e.clientY - clientY;
        this.$scroll.scrollTop = this.scrollBarY.scrollTop + dragY * this.scrollBarY.multiple * this.dragSpeedY;
      }
    },
    scrollBarUp() {
      this.scrollBarX.clientX = null;
      this.scrollBarY.clientY = null;
      window.removeEventListener("mousemove", this.scrollBarDrag);
    },
    addDragEvent() {
      window.addEventListener("mouseup", this.scrollBarUp);
    },
    removeDragEvent() {
      window.removeEventListener("mouseup", this.scrollBarUp);
    }
  },
  beforeDestroy() {
    if (this.isAutoUpdate && this.observer) {
      this.observer.disconnect();
    }
    this.removeDragEvent();
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var vueAgileScrollbar = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { vueAgileScrollbar as default };
