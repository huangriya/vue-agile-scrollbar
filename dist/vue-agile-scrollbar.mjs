import { openBlock as h, createElementBlock as c, normalizeClass as n, createElementVNode as a, renderSlot as p, normalizeStyle as f, createCommentVNode as d } from "vue";
const B = {
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
const u = (t, l) => {
  const s = t.__vccOpts || t;
  for (const [e, o] of l)
    s[e] = o;
  return s;
}, g = {
  name: "vueAgileScrollBar",
  props: B,
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
      const t = this.$scroll.scrollLeft, l = this.offsetLeft + Math.floor(t / this.scrollBarX.multiple);
      return l !== this.scrollBarX.left && (this.scrollBarX.left = l), t;
    },
    // 设置Y轴滚动条距离
    setScrollBarTop() {
      const t = this.$scroll.scrollTop, l = this.offsetTop + Math.floor(t / this.scrollBarY.multiple);
      return l !== this.scrollBarY.top && (this.scrollBarY.top = l), t;
    },
    onScroll(t) {
      const l = this.setScrollBarTop(), s = this.setScrollBarLeft();
      this.$emit("scroll", {
        top: l,
        left: s,
        scrollWidth: this.scrollWidth,
        scrollHeight: this.scrollHeight,
        scrollContentWidth: this.scrollContentWidth,
        scrollContentHeight: this.scrollContentHeight
      }, t), this.$attrs.onScrollHit && this.onScrollHit(l, s);
    },
    // 触发触底 触顶 触左 触右
    onScrollHit(t, l) {
      let s = "top", e = t - this.initTop, o = l - this.initLeft;
      this.initTop = t, this.initLeft = l;
      const r = () => {
        this.$emit("scroll-hit", s, {
          top: t,
          left: l,
          scrollWidth: this.scrollWidth,
          scrollHeight: this.scrollHeight,
          scrollContentWidth: this.scrollContentWidth,
          scrollContentHeight: this.scrollContentHeight
        });
      };
      e !== 0 && this.scrollBarY.height && (e < 0 ? s = "top" : s = "bottom", this.scrollContentHeight - this.scrollHeight - t === 0 && r(), t === 0 && s === "top" && r()), o !== 0 && this.scrollBarX.width && (o < 0 ? s = "left" : s = "right", l === 0 && s === "left" || this.scrollContentWidth - this.scrollWidth - l === 0 || (s = "xMiddle"), r());
    },
    scrollBarDown(t, l) {
      l === "scrollBarX" && (this.scrollBarX.clientX = t.clientX, this.scrollBarX.scrollLeft = this.$scroll.scrollLeft), l === "scrollBarY" && (this.scrollBarY.clientY = t.clientY, this.scrollBarY.scrollTop = this.$scroll.scrollTop), window.addEventListener("mousemove", this.scrollBarDrag);
    },
    // 拖拽滚动条
    scrollBarDrag(t) {
      const l = this.scrollBarX.clientX, s = this.scrollBarY.clientY;
      if (l) {
        let e = t.clientX - l;
        this.$scroll.scrollLeft = this.scrollBarX.scrollLeft + e * (this.scrollBarX.multiple * this.dragSpeedX);
      }
      if (s) {
        let e = t.clientY - s;
        this.$scroll.scrollTop = this.scrollBarY.scrollTop + e * this.scrollBarY.multiple * this.dragSpeedY;
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
}, m = {
  class: "agile-scroll-wrapper",
  ref: "scrollContent"
};
function X(t, l, s, e, o, r) {
  return h(), c("div", {
    class: n(["vue-agile-scrollbar", {
      "not-user-select": o.scrollBarX.clientX || o.scrollBarY.clientY,
      "scrollbar-hover": t.displayType === "hover",
      "scrollbar-hide": t.displayType === "hide"
    }]),
    ref: "scrollBox"
  }, [
    a("div", {
      class: "agile-scroll-content",
      ref: "scroll",
      onScroll: l[0] || (l[0] = (...i) => r.onScroll && r.onScroll(...i))
    }, [
      a("div", m, [
        p(t.$slots, "default")
      ], 512)
    ], 544),
    o.scrollBarX.show ? (h(), c("div", {
      key: 0,
      class: n(["agile-scroll-bar-x", { act: o.scrollBarX.clientX }]),
      style: f({ left: o.scrollBarX.left + "px", width: o.scrollBarX.width + "px", bottom: o.scrollBarX.bottom }),
      onMousedown: l[1] || (l[1] = (i) => r.scrollBarDown(i, "scrollBarX"))
    }, null, 38)) : d("", !0),
    o.scrollBarY.show ? (h(), c("div", {
      key: 1,
      class: n(["agile-scroll-bar-y", { act: o.scrollBarY.clientY }]),
      style: f({ top: o.scrollBarY.top + "px", height: o.scrollBarY.height + "px" }),
      onMousedown: l[2] || (l[2] = (i) => r.scrollBarDown(i, "scrollBarY"))
    }, null, 38)) : d("", !0)
  ], 2);
}
const Y = /* @__PURE__ */ u(g, [["render", X]]);
export {
  Y as default
};
