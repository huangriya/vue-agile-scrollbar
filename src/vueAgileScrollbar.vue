<template>
  <div class="vue-agile-scrollbar" :class="{'not-user-select': scrollBarX.clientX || scrollBarY.clientY}" :style="styles">
    <div class="agile-scroll-content" ref="scroll" @scroll="onScroll">
      <div class="agile-scroll-wrapper" ref="scrollContent">
        <slot></slot>
      </div>
    </div>
    <div class="agile-scroll-bar-x" v-if="scrollBarX.show"
         :class="{act: scrollBarX.clientX || scrollBarY.clientY}"
         :style="{left: scrollBarX.left + 'px', width: scrollBarX.width + 'px'}"
         @mousedown="scrollBarDown($event, 'scrollBarX')"></div>
    <div class="agile-scroll-bar-y" v-if="scrollBarY.show"
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

  computed: {
    styles () {
      if (this.scrollContentHeight && this.scrollContentHeight <= this.scrollHeight) {
        console.log('dd')
        return {
          height: this.scrollContentHeight + 'px'
        }
      }
    }
  },

  watch: {
    offsetLeft () {
      this.setScrollBarLeft()
    },
    offsetRight () {
      this.setScrollBarLeft()
    },
    offsetTop () {
      this.setScrollBarTop()
    },
    offsetBottom () {
      this.setScrollBarTop()
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

      console.log(this.scrollHeight, this.scrollContentHeight)
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
      } else {
        this.scrollBarY.show = false
      }
    },

    updated () {
      this.initContainer()
      this.initScrollBar()
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

      // 通过requestAnimationFrame函数做节流处理

      if (!this.ticking) {

        window.requestAnimationFrame(() => {

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
          
          this.ticking = false

        })

        this.ticking = true
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
      min-width: 100%;
    }
  }
  
  .agile-scroll-bar-x, .agile-scroll-bar-y {
    position: absolute;
    background-color: #ddd;
    border-radius: 6px;
    opacity: 0;
    transition: opacity, background-color .5s;
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