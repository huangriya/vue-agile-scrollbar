

<template>
  <div>
    <h1>vue-agile-scrollbar</h1>
    <p>
      基于浏览器原生滚动实现，拥有浏览器的滚动体验于性能，又可自定义滚动条样式
    </p>
    <section>
      <h3>基本用法</h3>
      <p>
        滚动条显示模式: 
        <label><input name="displayType" :checked="displayType === 'hover'" type="radio" value="hover" @input="displayType = 'hover'"/>hover(hover时显示滚动条) </label> 
        <label><input name="displayType" :checked="displayType === 'show'" type="radio" value="show" @input="displayType = 'show'"/>show (一直显示滚动条) </label> 
        <label><input name="displayType" :checked="displayType === 'hide'" type="radio" value="hide" @input="displayType = 'hide'"/>hide (不显示滚动条) </label> 
      </p>
      <div style="height:300px;width:800px;border:solid #eee 1px;line-height:28px">
        <vueAgileScrollbar @scroll="scroll" :displayType="displayType">
          <div style="width:900px">冷风吹，小雪到</div>
          <p>
            早上步行上班，走在初冬时节的大街上，一阵冷风袭来，满树的黄叶飘落，顿觉寒意渐浓。刚到办公室，就收到一条短信，打开一看是一位朋友发来的：“北风阵阵天气寒，小雪节气到身边，心底珍藏是思念，拇指轻动祝福转，愿您：天寒地冻要保暖，开心快乐一天天！”翻开桌上的日历才知道，今年冬天的第二个节气“小雪”就要到了。
          </p>
          <p>
            《月令七十二候集解》：“十月中，雨下而为寒气所薄，故凝而为雪。小者未盛之辞。”古《群芳谱》又说：“小雪气寒而将雪矣，地寒未甚而雪未大也。”我国古代将小雪分为三候：“一候虹藏不见；二候天气上升地气下降；三候闭塞而成冬。”小雪，在二十四节气中表示降雪的起始时间与程度，进入小雪节气，意味着气温持续走低，天气寒冷，降水状态由雨变成雪。雪小，地面上又无积雪，这正是“小雪”这个节气的原本之意。看看窗外，天有些阴，风清冷但不刺骨，虽说已是“荷尽已无擎雨盖，菊残犹有傲霜枝”，但天空中却没有一点下雪的迹象，心中不禁有一种怅然若失的感觉。
          </p>
          <p>
            在老家农人们的心目中，小雪节气标志着冬天真正的到来。广袤的田野没有了忙碌的劳作，显得格外寂静，呈现一派初冬景象。农家自古都是地闲人亦闲，小雪节气正是“家里有粮，心头不慌”的农闲季节。村上的老人们聚在一起，找个背风暖和的土墙根或者麦秸垛，耷拉着头，眯缝着眼，慵懒地晒着太阳，散漫地说着闲话，南坑泥鳅北坑鱼，东集骡子西集驴，云天雾地，优哉优哉，豁牙咧嘴地扯着天南海北的话题。老家有一句乡谚“小雪雪满天，来岁是丰年”，其实在小雪节气很少下大雪，即使下也只是微薄一层的轻盈小雪，雪的厚度连浅浅绿绿的麦苗也遮盖不住。小雪时节的太阳还是暖暖的，风也不算刺骨，天地之间还不至于冷得滴水成冰哈气成霜，于是，大人和孩子的活动空间还是以室外为主，只要不大雪封门，乡村孩童们成群结队去田野里肆意疯跑，大人们则悠闲地到田间地头看看麦苗的长势，家庭主妇们走过油菜地，还忘不了薅一把清鲜水灵的油菜，反正墒好油菜长得密实，权当剔剔苗。
          </p>
        </vueAgileScrollbar>
      </div>
    </section>

    <section>
      <h3>高级用法</h3>
      <p>设置滚动条偏移量</p>
      <div style="height:300px;width:800px;line-height:28px">
        <vueAgileScrollbar :offsetTop="55" :offsetLeft="100" :offsetRight="100" displayType="show">
          <table cellpadding="0" cellspacing="0">
            <tr class="head">
              <td class="fixed left">固定列</td>
              <td v-for="item in 20" :key="item">head {{item}}</td>
              <td class="fixed right">固定列</td>
            </tr>
            <tr v-for="tr in 50" :key="tr">
              <td class="fixed left">固定列</td>
              <td v-for="item in 20" :key="item">1</td>
              <td class="fixed right">固定列</td>
            </tr>
          </table>
        </vueAgileScrollbar>
      </div>
    </section>
  </div>
</template>

<script>

import 'vue-agile-scrollbar/dist/style.css'
import vueAgileScrollbar from 'vue-agile-scrollbar'

export default {
  components: { vueAgileScrollbar },
  data () {
    return {
      displayType: 'hover'
    }
  },
  mounted () {
    
  },
  methods: {
    scroll (v) {
      // console.log(v)
    },

    onScrollHit (v) {
      console.log(v)
    },

    updated (v) {
      console.log(v)
    }
  }
}

</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
section {
  margin-bottom: 100px;
}
table {
  width: 100%;
  table-layout: fixed;
  text-align: center;
  .head {
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 1;
  }
  tr {
    
  }
  td {
    width: 100px;
    height: 50px;
    border-bottom: solid #ddd 1px;
  }
  .fixed {
    position: sticky;
    background-color: #fff;
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
}
</style>
