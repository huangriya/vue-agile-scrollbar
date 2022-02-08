

export default {

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
    default: 'hover'
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
    default: true
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
}