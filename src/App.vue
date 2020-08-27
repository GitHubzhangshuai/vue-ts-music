<template>
  <div id="app">
      <m-header :msg="title"></m-header>
      <tab></tab>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <play></play>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MHeader from '@/components/m-header/m-header.vue' // @ is an alias to /src
import Tab from '@/components/tab/tab.vue'
import Play from '@/components/play/play.vue'

@Component({
  components: {
    MHeader,
    Tab,
    Play
  }
})
export default class Home extends Vue {
  private title='Chicken Music';
}
</script>

<style scoped lang="stylus" rel="stylesheet">
@import "~common/stylus/variable"
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
