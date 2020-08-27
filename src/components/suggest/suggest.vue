<template>
  <scroll ref="suggest"
          class="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" :key="index" v-for="(item,index) in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script lang="ts">
import Scroll from '@/components/scroll/scroll.vue'
import Loading from '@/components/loading/loading.vue'
import NoResult from '@/components/no-result/no-result.vue'
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/ts/song'
import { Mutation, Action } from 'vuex-class'
import Singer from '@/common/ts/singer'
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import { SearchResonse, SearchData, SearchZhiDa } from '@/types/search'
import { MusicData, CreateSongType } from '@/types/song'

const TYPE_SINGER = 'singer'
const perpage = 20

@Component({
  components: {
    Scroll,
    Loading,
    NoResult
  }
})
export default class Suggest extends Vue {
    @Prop({ type: Boolean, default: true }) showSinger!: boolean;
    @Prop({ type: String, default: '' }) query!: string;
    private page = 1;
    private pullup = true;
    private beforeScroll = true;
    private hasMore = true;
    private result: any[] = []
    private refresh () {
      (this.$refs.suggest as any).refresh()
    }

    private search () {
      this.page = 1
      this.hasMore = true;
      (this.$refs.suggest as any).scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perpage).then((res: SearchResonse) => {
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
          this._checkMore(res.data)
        }
      })
    }

    private searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then((res: SearchResonse) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data))
          this._checkMore(res.data)
        }
      })
    }

    private listScroll () {
      this.$emit('listScroll')
    }

    private selectItem (item: any) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select', item)
    }

    private getDisplayName (item: any) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    }

    private getIconCls (item: any) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    }

    private _genResult (data: SearchData): any[] {
      // console.log(data)
      let ret: any[] = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    }

    private _normalizeSongs (list: MusicData[]): CreateSongType[] {
      const ret: CreateSongType[] = []
      list.forEach(musicData => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }

    private _checkMore (data: SearchData) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    }

    @Action('insertSong') insertSong!: Function;
    @Mutation('SET_SINGER') setSinger!: Function;
    @Watch('query') queryChanged () { this.search() }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
