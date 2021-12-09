

export default {

  // 滚动条最小尺寸
  minBarSize: {
    type: Number,
    default: 50
  },

  // 初始化滚动位置
  scrollTop: {
    type: [Number, Function],
    default: 0
  },

  // 初始化滚动位置
  scrollLeft: {
    type: [Number, Function],
    default: 0
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

  //滚动条 触底 触顶 触左 触右时的偏移量
  offsetHit: {
    type: Number,
    default: 10
  },

  // dem内容变更，是否自动更新
  isAutoUpdate: {
    type: Boolean,
    default: true
  }
}