# vue-agile-scrollbar

基于vue的自定义滚动条组件，完全基于浏览器的滚动，简单而强大

# Demo
[查看demo](https://huangriya.github.io/vue-agile-scrollbar/dist/index.html)

# Simple usage

通过npm 或者 yarn安装

``` 
yarn add vue-agile-scrollbar

npm i vue-agile-scrollbar
```

引入

``` js
import 'vue-agile-scrollbar/dist/style.css'
import vueAgileScrollbar from 'vue-agile-scrollbar'
```

``` vue
<template>
  <div style="height:200px;width:500px;border:solid #eee 1px">
    <vueAgileScrollbar>
      <div style="width:10000px; height:100000px"></div>
    </vueAgileScrollbar>
  </div>
</template>

<script>
import vueAgileScrollbar from 'vue-agile-scrollbar'
import 'vue-agile-scrollbar/dist/style.css'

export default {
  components: { vueAgileScrollbar },
  data () {
    return {
      
    }
  }
}
</script>
```

# Api

### scroll props
name|类型|默认值|说明
--|:--:|--:|:--
minBarSize| Number | 50 | 滚动条最小尺寸，<br>Y轴滚动条的高度或X轴滚动条的宽度不会小于这个值
scrollTop| Number | 0 | 指定滚动条滚到距离顶部某个位置
scrollLeft| Number | 0 | 指定滚动条滚到距离左边某个位置
offsetLeft| Number | 0 | 滚动距离左边的偏移量
offsetRight| Number | 10 | 滚动距离右边的偏移量
offsetTop| Number | 0 | 滚动距离顶部的偏移量
offsetBottom| Number | 10 | 滚动距离底部的偏移量
isAutoUpdate| Boolean | true | element改变后，是否自动更新
dragSpeedX | Number | 1 | 拖拽X滚动条滚动阀值，<br>值越大滚动越快，越小滚动越慢
dragSpeedY | Number | 1 | 拖拽Y滚动条滚动阀值，<br>值越大滚动越快，越小滚动越慢
displayType | String | hover | 滚动条显示类型<br> show: 一直显示 <br>hover:鼠标移入显示 <br>hide:一直不显示


### event
name|回调参数|说明
--|:--:|:--
scroll | function(scrollValue: Object, $event) | 滚动会触发该事件
scroll-hit | function(type: String, scrollValue: Object) | 滚动条触底、触顶、触左、触右后出发该事件
updated | function(scrollValue: Object) | 容器更新后会触发该事件


### 方法
name|参数|说明
--|:--|:--
updated() | - | element改变后，<br>可以通过该方法手动更新滚动容器状态
setScrollLeft(number) | - | 改变滚动条左边滚动距离
setScrollTop(number) | - | 改变滚动条上边滚动距离