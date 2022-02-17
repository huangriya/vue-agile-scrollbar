<template>
  <div class="vue-agile-scrollbar"
      ref="scrollBox"
      :class="{'not-user-select': scrollBarX.clientX || scrollBarY.clientY, 
              'scrollbar-hover': displayType === 'hover', 
              'scrollbar-hide': displayType === 'hide'}">
    <div class="agile-scroll-content" ref="scroll" @scroll="onScroll">
      <div class="agile-scroll-wrapper" ref="scrollContent">
        <slot></slot>
      </div>
    </div>
    <div class="agile-scroll-bar-x" v-if="scrollBarX.show"
         :class="{act: scrollBarX.clientX}"
         :style="{left: scrollBarX.left + 'px', width: scrollBarX.width + 'px', bottom: scrollBarX.bottom}"
         @mousedown="scrollBarDown($event, 'scrollBarX')"></div>
    <div class="agile-scroll-bar-y" v-if="scrollBarY.show"
         :class="{act: scrollBarY.clientY}"
         :style="{top: scrollBarY.top + 'px', height: scrollBarY.height + 'px'}"
         @mousedown="scrollBarDown($event, 'scrollBarY')"></div>
  </div>
</template>

<script>
import props from './props'
export default {
  name: 'vueAgileScrollBar',
  props: props,
  data () {
    return {
      scrollBarY: {
        show: true,
        clientY: null,
        height: 0,
        top: this.offsetTop,

        // scrollBarY滚动相对于真实滚动的比例
        multiple: 1
      },

      scrollBarX: {
        show: true,
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
    }
  },

  watch: {
    offsetLeft () {
      this.setScrollBarLeft()
      this.initScrollBar()
    },
    offsetRight () {
      this.initScrollBar()
    },
    offsetTop () {
      this.setScrollBarTop()
      this.initScrollBar()
    },
    offsetBottom () {
      this.initScrollBar()
    }
  },
  
  mounted () {
    this.$scrollBox = this.$refs.scrollBox
    this.$scroll = this.$refs.scroll
    this.$scrollContent = this.$refs.scrollContent
    
    // 初始化滚动条位置
    this.setScrollLeft()
    this.setScrollTop()

    this.updated()

    // 监听容器内变化
    if (this.isAutoUpdate) {
      this.observer = new MutationObserver(this.updated)
      this.observer.observe(this.$refs.scrollContent, {
        attributes: true, 
        childList: true, 
        subtree: true
      })
    }

    // 添加滚动条拖拽事件
    this.addDragEvent()
  },

  methods: {
    
    // 初始化容器信息
    initContainer () {
      this.scrollWidth = this.$scrollBox.offsetWidth
      this.scrollHeight = this.$scrollBox.offsetHeight
      this.scrollContentWidth = this.$scrollContent.offsetWidth
      this.scrollContentHeight = this.$scrollContent.offsetHeight
    },

    // 初始化scrollBar
    initScrollBar () {
      
      if (this.scrollContentWidth > this.scrollWidth) {
        const width = this.scrollWidth - (this.scrollContentWidth - this.scrollWidth) - this.offsetLeft - this.offsetRight
        this.scrollBarX.show = true
        this.scrollBarX.width = width < this.minBarSize ? this.minBarSize : width
        this.scrollBarX.multiple = (this.scrollContentWidth - this.scrollWidth) / (this.scrollWidth - this.scrollBarX.width - this.offsetLeft - this.offsetRight)
      } else {
        this.scrollBarX.show = false
      }

      if (this.scrollContentHeight > this.scrollHeight) {
        const height = this.scrollHeight - (this.scrollContentHeight - this.scrollHeight) - this.offsetTop - this.offsetBottom
        this.scrollBarY.show = true
        this.scrollBarY.height = height < this.minBarSize ? this.minBarSize : height
        this.scrollBarY.multiple = (this.scrollContentHeight - this.scrollHeight) / (this.scrollHeight - this.scrollBarY.height  - this.offsetTop - this.offsetBottom)
        this.scrollBarX.bottom = 0
      } else {
        this.scrollBarY.show = false
        this.scrollBarX.bottom = this.scrollHeight - this.scrollContentHeight + 'px'
      }
    },

    updated () {
      this.initContainer()
      this.initScrollBar()
      this.$emit('updated', {
        scrollBarY: this.scrollBarY.show,
        scrollBarX: this.scrollBarX.show,
        top: this.$scroll.scrollTop,
        left: this.$scroll.scrollLeft,
        scrollWidth: this.scrollWidth,
        scrollHeight: this.scrollHeight,
        scrollContentWidth: this.scrollContentWidth,
        scrollContentHeight: this.scrollContentHeight
      })
    },

    // 设置x轴滚动条距离
    setScrollBarLeft () {
      const scrollLeft = this.$scroll.scrollLeft
      const left = this.offsetLeft + Math.floor(scrollLeft / this.scrollBarX.multiple)
      if (left !== this.scrollBarX.left) {
        this.scrollBarX.left = left
      }
      return scrollLeft
    },

    // 设置Y轴滚动条距离
    setScrollBarTop () {
      const scrollTop = this.$scroll.scrollTop
      const top = this.offsetTop + Math.floor(scrollTop / this.scrollBarY.multiple)
      if (top !== this.scrollBarY.top) {
        this.scrollBarY.top = top
      }
      return scrollTop
    },


    onScroll (e) {
      const scrollTop = this.setScrollBarTop()
      const scrollLeft = this.setScrollBarLeft()

      this.$emit('scroll', {
        top: scrollTop,
        left: scrollLeft,
        scrollWidth: this.scrollWidth,
        scrollHeight: this.scrollHeight,
        scrollContentWidth: this.scrollContentWidth,
        scrollContentHeight: this.scrollContentHeight
      }, e)

      if (this._events['scroll-hit']) {
        this.onScrollHit(scrollTop, scrollLeft)
      }
    },

    // 触发触底 触顶 触左 触右
    onScrollHit (scrollTop, scrollLeft) {

      let type = 'top', scrollY = scrollTop - this.initTop, scrollX = scrollLeft - this.initLeft

      this.initTop = scrollTop
      this.initLeft = scrollLeft

      const scrollHit = () => {
        this.$emit('scroll-hit', type, {
          top: scrollTop,
          left: scrollLeft,
          scrollWidth: this.scrollWidth,
          scrollHeight: this.scrollHeight,
          scrollContentWidth: this.scrollContentWidth,
          scrollContentHeight: this.scrollContentHeight
        })
      }
      
      if (scrollY !== 0 && this.scrollBarY.height) {
        scrollY < 0 ? type = 'top' : type = 'bottom'

        if (this.scrollContentHeight - this.scrollHeight - scrollTop === 0) {
          scrollHit()
        } 
        if (scrollTop === 0 && type === 'top') {
          scrollHit()
        }
      }

      if (scrollX !== 0  && this.scrollBarX.width) {
        scrollX < 0 ? type = 'left' : type = 'right'
        if (scrollLeft === 0 && type === 'left') {
          scrollHit()
        } else if (this.scrollContentWidth - this.scrollWidth - scrollLeft === 0) {
          scrollHit()
        } else {
          type = 'xMiddle'
          scrollHit()
        }
      }
    },


    scrollBarDown (e, key) {
      if (key === 'scrollBarX') {
        this.scrollBarX.clientX = e.clientX
        this.scrollBarX.scrollLeft = this.$scroll.scrollLeft
      }
      if (key === 'scrollBarY') {
        this.scrollBarY.clientY = e.clientY
        this.scrollBarY.scrollTop = this.$scroll.scrollTop
      }
      window.addEventListener('mousemove', this.scrollBarDrag)
    },

    // 拖拽滚动条
    scrollBarDrag (e) {
      const clientX = this.scrollBarX.clientX
      const clientY = this.scrollBarY.clientY
      if (clientX) {
        let dragX = e.clientX - clientX
        this.$scroll.scrollLeft = this.scrollBarX.scrollLeft + dragX * ((this.scrollBarX.multiple) * this.dragSpeedX)
      }
      if (clientY) {
        let dragY = e.clientY - clientY
        this.$scroll.scrollTop = this.scrollBarY.scrollTop + ((dragY * this.scrollBarY.multiple) * this.dragSpeedY)
      }
    },

    scrollBarUp () {
      this.scrollBarX.clientX = null
      this.scrollBarY.clientY = null
      window.removeEventListener('mousemove', this.scrollBarDrag)
    },

    // 添加拖拽事件
    addDragEvent () {
      window.addEventListener('mouseup', this.scrollBarUp)
    },

    // 移除拖拽事件
    removeDragEvent () {
      window.removeEventListener('mouseup', this.addDragEvent)
    },

    // 设置滚动条左边距离
    setScrollLeft (number) {
      if (number >= 0 || this.scrollLeft >= 0) {
        this.$scroll.scrollLeft = number || this.scrollLeft
      }
    },

    // 设置滚动条左边距离
    setScrollTop (number) {
      if (number >= 0 || this.scrollTop >= 0) {
        this.$scroll.scrollTop = number || this.scrollTop
      }
    }
  },

  beforeDestroy () {
    if (this.isAutoUpdate && this.observer) {
      this.observer.disconnect()
    }

    // 移除拖拽事件
    this.removeDragEvent()
  }
}
</script>

<style lang="less">
.vue-agile-scrollbar {
  height: 100%;
  position: relative;
  overflow: hidden;
  &.not-user-select {
    user-select: none;
  }
  &.scrollbar-hide {
    .agile-scroll-bar-x, .agile-scroll-bar-y {
      display: none;
    }
  }
  &.scrollbar-hover {
    .agile-scroll-bar-x, .agile-scroll-bar-y {
      opacity: 0;
    }
    &:hover {
      .agile-scroll-bar-x, .agile-scroll-bar-y {
        opacity: 1;
      }
    }
  }
  
  .agile-scroll-content {
    position: relative;
    overflow: auto;
    max-height: 100%;
    position: relative;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .agile-scroll-wrapper {
      float: left;
      min-width: 100%;
    }
  }
  
  .agile-scroll-bar-x, .agile-scroll-bar-y {
    position: absolute;
    background-color: #ddd;
    border-radius: 6px;
    transition: opacity, background-color .5s;
    cursor: pointer;
    z-index: 10;
    &.act {
      opacity: 1;
    }
    &:hover, &.act {
      background-color: #bbb;
    }
  }
  .agile-scroll-bar-x {
    bottom: 0;
    width: 100px;
    left: 0;
    height: 6px;
    &:hover, &.act {
      height: 10px;
    }
  }
  .agile-scroll-bar-y {
    position: absolute;
    right: 0;
    top: 0;
    width: 6px;
    height: 100px;
    &:hover, &.act {
      width: 10px;
    }
  }
}
</style>