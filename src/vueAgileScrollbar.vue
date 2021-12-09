<template>
  <div class="vue-agile-scrollbar" :class="{'not-user-select': scrollBarX.clientX || scrollBarY.clientY}">
    <div class="agile-scroll-content" ref="scroll" @scroll="onScroll">
      <div class="agile-scroll-wrapper" ref="scrollContent">
        <slot></slot>
      </div>
    </div>
    <div class="agile-scroll-bar-x"
         :class="{act: scrollBarX.clientX || scrollBarY.clientY}"
         :style="{left: scrollBarX.left + 'px', width: scrollBarX.width + 'px'}"
         @mousedown="scrollBarDown($event, 'scrollBarX')"></div>
    <div class="agile-scroll-bar-y" 
         :class="{act: scrollBarY.clientY || scrollBarX.clientX}"
         :style="{top: scrollBarY.top + 'px', height: scrollBarY.height + 'px'}"
         @mousedown="scrollBarDown($event, 'scrollBarY')"></div>
  </div>
</template>

<script>
import props from './props'
export default {
  props: props,
  data () {
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
    }
  },
  mounted () {
    this.$scroll = this.$refs.scroll
    this.$scrollContent = this.$refs.scrollContent

    this.initContainer()
    this.initScrollBar()

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
      this.scrollWidth = this.$scroll.offsetWidth
      this.scrollHeight = this.$scroll.offsetHeight
      this.scrollContentWidth = this.$scrollContent.offsetWidth
      this.scrollContentHeight = this.$scrollContent.offsetHeight
    },

    // 初始化scrollBar
    initScrollBar () {
      
      if (this.scrollContentWidth > this.scrollWidth) {
        const width = this.scrollWidth - (this.scrollContentWidth - this.scrollWidth)
        this.scrollBarX.width = width < this.minBarSize ? this.minBarSize : width
        this.scrollBarX.multiple = (this.scrollContentWidth - this.scrollWidth) / (this.scrollWidth - this.scrollBarX.width - this.offsetLeft - this.offsetRight)
      }

      if (this.scrollContentHeight > this.scrollHeight) {
        const height = this.scrollHeight - (this.scrollContentHeight - this.scrollHeight)
        this.scrollBarY.height = height < this.minBarSize ? this.minBarSize : height
        this.scrollBarY.multiple = (this.scrollContentHeight - this.scrollHeight) / (this.scrollHeight - this.scrollBarY.height  - this.offsetTop - this.offsetBottom)
      }
    },

    updated () {
      this.initContainer()
      this.initScrollBar()
    },


    onScroll (e) {

      const scrollTop = this.$scroll.scrollTop
      const scrollLeft = this.$scroll.scrollLeft

      this.scrollBarY.top = this.offsetTop + scrollTop / this.scrollBarY.multiple
      this.scrollBarX.left = this.offsetLeft + scrollLeft / this.scrollBarX.multiple

      this.$emit('scroll', {
        top: scrollTop,
        left: scrollLeft
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
          left: scrollLeft
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
        }

        if (this.scrollContentWidth - this.scrollWidth - scrollLeft === 0) {
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
        this.$scroll.scrollLeft = this.scrollBarX.scrollLeft + dragX * this.scrollBarX.multiple
      }
      if (clientY) {
        let dragY = e.clientY - clientY
        this.$scroll.scrollTop = this.scrollBarY.scrollTop + dragY * this.scrollBarY.multiple
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
      window.removeEventListener('mouseup', this.scrollBarUp)
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
  &:hover {
    .agile-scroll-bar-x, .agile-scroll-bar-y {
      opacity: 1;
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
    }
  }
  
  .agile-scroll-bar-x, .agile-scroll-bar-y {
    position: absolute;
    background-color: #ddd;
    border-radius: 6px;
    opacity: 0;
    transition: opacity, background .5s;
    cursor: pointer;
    z-index: 10;
    &.act {
      opacity: 1;
    }
    &:hover {
      background-color: #bbb;
    }
  }
  .agile-scroll-bar-x {
    bottom: 0;
    width: 100px;
    left: 0;
    height: 6px;
    &:hover {
      height: 10px;
    }
  }
  .agile-scroll-bar-y {
    position: absolute;
    right: 0;
    top: 0;
    width: 6px;
    height: 100px;
    &:hover {
      width: 10px;
    }
  }
}
</style>