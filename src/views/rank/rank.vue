<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="(item,itemIndex) in topList" :key="itemIndex">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList" :key="index">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import Scroll from '@/components/scroll/scroll.vue'
import Loading from '@/components/loading/loading.vue'
import { getTopList } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import { PlaylistMixin } from '@/common/ts/mixin'
import { Mutation } from 'vuex-class'
import { GetTopListResponse, GetTopListTopListItem } from '@/types/rank'
import { Song } from '@/common/ts/song'

@Component({
  components: {
    Scroll,
    Loading
  }
})
export default class Rank extends PlaylistMixin {
  // mixins: [playlistMixin],
  @Mutation('SET_TOP_LIST') setTopList!: Function;
  private topList: GetTopListTopListItem[] = [];
  private created () {
    this._getTopList()
  }

  protected handlePlaylist (playlist: Song[]) {
    const bottom = playlist.length > 0 ? '60px' : '';
    (this.$refs.rank as HTMLElement).style.bottom = bottom;
    (this.$refs.toplist as any).refresh()
  }

  private selectItem (item: GetTopListTopListItem) {
    this.$router.push({
      path: `/rank/${item.id}`
    })
    this.setTopList(item)
  }

  private _getTopList () {
    getTopList().then((res: GetTopListResponse) => {
      if (res.code === ERR_OK) {
        this.topList = res.data.topList
      }
    })
  }

  @Watch('topList') topListChanged () {
    setTimeout(() => {
      this.$Lazyload.lazyLoadHandler()
    }, 20)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
