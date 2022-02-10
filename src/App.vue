

<template>
  <div>
    <section>
      <h3>基本用法</h3>
      <div style="height:200px;width:500px;border:solid #eee 1px">
        <vueAgileScrollbar @scroll="scroll">
          <div style="width:600px">冷风吹，小雪到</div>
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
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
