<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" :key="index" v-for="(item,index) in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest @listScroll="blurInput" @select="saveSearch" ref="suggest" :query="query"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import SearchBox from '@/components/search-box/search-box.vue'
import SearchList from '@/components/search-list/search-list.vue'
import Scroll from '@/components/scroll/scroll.vue'
import Confirm from '@/components/confirm/confirm.vue'
import Suggest from '@/components/suggest/suggest.vue'
import { getHotKey } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { SearchMixin } from '@/common/ts/mixin'
import { Action } from 'vuex-class'
import { Component, Watch } from 'vue-property-decorator'
import { Song } from '@/common/ts/song'
import { GetHotResponse, GetHotDataHotKey } from '@/types/search'
@Component({
  components: {
    SearchBox,
    SearchList,
    Scroll,
    Confirm,
    Suggest
  }
})
export default class Search extends SearchMixin {
  private hotKey: GetHotDataHotKey[] = []
  get shortcut () {
    let arr: any[] = []
    arr = arr.concat(this.hotKey).concat(this.searchHistory)
    return arr
  }

  private created () {
    this._getHotKey()
  }

  @Action('clearSearchHistory') clearSearchHistory!: Function;
  private handlePlaylist (playlist: Song[]) {
    const bottom = playlist.length > 0 ? '60px' : '';

    (this.$refs.searchResult as HTMLElement).style.bottom = bottom;
    (this.$refs.suggest as any).refresh();

    (this.$refs.shortcutWrapper as HTMLElement).style.bottom = bottom;
    (this.$refs.shortcut as any).refresh()
  }

  private showConfirm () {
    (this.$refs.confirm as any).show()
  }

  private _getHotKey () {
    getHotKey().then((res: GetHotResponse) => {
      if (res.code === ERR_OK) {
        this.hotKey = res.data.hotkey.slice(0, 10)
      }
    })
  }

  @Watch('query') queryChanged (newQuery: string) {
    if (!newQuery) {
      setTimeout(() => {
        (this.$refs.shortcut as any).refresh()
      }, 20)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
