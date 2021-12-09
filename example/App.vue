

<template>
  <div>

    <div style="height:100px; width: 50px">
      <vueAgileScrollbar>
        <div v-for="item in 20" :key="item">{{item}}</div>
      </vueAgileScrollbar>
    </div>
    
  </div>
</template>

<script>
import vueAgileScrollbar from '../src/vueAgileScrollbar.vue'

  export default {
    components: { vueAgileScrollbar }
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
