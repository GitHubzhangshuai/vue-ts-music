<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import ListView from '@/components/list-view/list-view.vue'
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/common/ts/singer'
import { Mutation } from 'vuex-class'
import { Component } from 'vue-property-decorator'
import { GetSingerDataListItem, GetSingerListResponse, Map, MapHot, MapHotItems } from '@/types/singer'
import { PlaylistMixin } from '@/common/ts/mixin'
import { Song } from '@/common/ts/song'
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

@Component({
  components: {
    ListView
  }
})
export default class SingerView extends PlaylistMixin {
  @Mutation('SET_SINGER') setSinger!: Function;
  private singers: MapHot [] = [];
  private created () {
    this._getSingerList()
  }

  protected handlePlaylist (playlist: Song[]) {
    const bottom = playlist.length > 0 ? '60px' : '';
    (this.$refs.singer as HTMLElement).style.bottom = bottom;
    (this.$refs.list as any).refresh()
  }

  private selectSinger (singer: MapHotItems) {
    this.$router.push({
      path: `/singer/${singer.id}`
    })
    this.setSinger(singer)
  }

  private _getSingerList () {
    getSingerList().then((res: GetSingerListResponse) => {
      if (res.code === ERR_OK) {
        this.singers = this._normalizeSinger(res.data.list)
      }
    })
  }

  private _normalizeSinger (list: GetSingerDataListItem[]) {
    const map: Map = {
      hot: {
        title: HOT_NAME,
        items: []
      }
    }
    list.forEach((item, index) => {
      if (index < HOT_SINGER_LEN) {
        map.hot.items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      }
      const key = item.Findex
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(new Singer({
        name: item.Fsinger_name,
        id: item.Fsinger_mid
      }))
    })
    const ret = []
    const hot = []
    for (const key in map) {
      const val = map[key]
      if (val.title.match(/[a-zA-z]/)) {
        ret.push(val)
      } else if (val.title === HOT_NAME) {
        hot.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(ret)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
