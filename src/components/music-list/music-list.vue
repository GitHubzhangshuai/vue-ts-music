<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" @scroll="scroll"
            :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
      <div class="song-list-wrapper">
          <song-list :songs="songs" :rank="rank" @select="selectItem"></song-list>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Scroll from '@/components/scroll/scroll.vue'
import Loading from '@/components/loading/loading.vue'
import { prefixStyle } from '@/common/ts/dom'
import SongList from '@/components/song-list/song-list.vue'
import { Action, Mutation } from 'vuex-class'
import { PlaylistMixin } from '@/common/ts/mixin'
import { getplaysongvkey } from '@/api/song'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Pos } from '@/types/scroll'
import { CreateSongType } from '@/types/song'

const RESERVED_HEIGHT = 40
const transform: any = prefixStyle('transform')
const backdrop: any = prefixStyle('backdropFilter')

@Component({
  components: {
    Scroll,
    Loading,
    SongList
  }
})
export default class MusicList extends PlaylistMixin {
  @Action('selectPlay') selectPlay!: Function;
  @Action('randomPlay') randomPlay!: Function;
  @Mutation('SET_PLAYLIST_URL') setPlaylistUrl!: Function;
  @Prop({ type: String, default: '' }) bgImage!: string;
  @Prop({ type: Array, default: function () { return [] } }) songs!: CreateSongType[];
  @Prop({ type: String, default: '' }) title!: string;
  @Prop({ type: Boolean, default: false }) rank!: boolean;
  private scrollY = 0;
  private probeType!: number;
  private listenScroll!: boolean;
  private imageHeight!: number;
  private minTranslateY!: number;
  get bgStyle () {
    return `background-image:url(${this.bgImage})`
  }

  private created () {
    this.probeType = 3
    this.listenScroll = true
  }

  protected mounted () {
    this.imageHeight = (this.$refs.bgImage as HTMLElement).clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
    ((this.$refs.list as Vue).$el as HTMLElement).style.top = `${this.imageHeight}px`
  }

  protected handlePlaylist (playlist: CreateSongType[]) {
    const bottom = playlist.length > 0 ? '60px' : '';
    ((this.$refs.list as Vue).$el as HTMLElement).style.bottom = bottom;
    (this.$refs.list as any).refresh()
  }

  private selectItem (item: CreateSongType, index: number) {
    getplaysongvkey(item.mid).then((vkey) => {
      const url = `http://dl.stream.qqmusic.qq.com/${vkey}`
      console.log(url)
      this.setPlaylistUrl({
        index,
        url
      })
    })
    this.selectPlay({ list: this.songs, index })
  }

  private scroll (pos: Pos) {
    this.scrollY = pos.y
  }

  private back () {
    this.$router.back()
  }

  private random () {
    this.randomPlay({ list: this.songs })
  }

  @Watch('scrollY') scrollYChanged (newVal: number) {
    const translateY = Math.max(this.minTranslateY, newVal)
    let scale = 1
    let zIndex = 0
    let blur = 0
    const percent = Math.abs(newVal / this.imageHeight)
    if (newVal > 0) {
      scale = 1 + percent
      zIndex = 10
    } else {
      blur = Math.min(20, percent * 20)
    }

    (this.$refs.layer as HTMLElement).style[transform] = `translate3d(0,${translateY}px,0`;
    (this.$refs.filter as HTMLElement).style[backdrop] = `blur(${blur}px)`
    if (newVal < this.minTranslateY) {
      zIndex = 10;
      (this.$refs.bgImage as HTMLElement).style.paddingTop = 0 + '';
      (this.$refs.bgImage as HTMLElement).style.height = `${RESERVED_HEIGHT}px`;
      (this.$refs.playBtn as HTMLElement).style.display = 'none'
    } else {
      (this.$refs.bgImage as HTMLElement).style.paddingTop = '70%';
      (this.$refs.bgImage as HTMLElement).style.height = 0 + '';
      (this.$refs.playBtn as HTMLElement).style.display = ''
    }
    (this.$refs.bgImage as HTMLElement).style[transform] = `scale(${scale})`;
    (this.$refs.bgImage as HTMLElement).style.zIndex = zIndex + ''
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
