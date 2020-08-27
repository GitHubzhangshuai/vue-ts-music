<template>
  <div class="recommend" ref="recommend">
    <keep-alive>
        <router-view :key="key"></router-view>
    </keep-alive>
    <scroll class="recommend-content" ref="scroll" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper" ref='sliderWrapper'>
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li @click="selectItem(item)" v-for="(item,index) in discList" :key="index" class="item">
                <div class="icon">
                  <img width="60" height="60" v-lazy="item.imgurl">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
      </div>
      <div class="loader-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component } from 'vue-property-decorator'
import Slider from 'components/slider/slider.vue'
import Loading from 'components/loading/loading.vue'
import Scroll from 'components/scroll/scroll.vue'
import { ERR_OK } from '@/api/config'
import { getRecommend, getDiscList } from '@/api/recommend'
import { GetRecommendResponse, GetRecommendSlider, GetDiscListResponse, GetDiscListDataListItem } from '@/types/recommend'
import { Mutation } from 'vuex-class'
@Component({
  components: { Slider, Loading, Scroll }
})
export default class Recommend extends Vue {
  @Mutation('SET_DISC') setDisc!: Function;
  private recommends: GetRecommendSlider[]=[];
  private discList: GetDiscListDataListItem[]=[];
  private checkloaded!: boolean;
  private created () {
    this._getRecommend()
    this._getDiscList()
  }

  get key (): string {
    return this.$route.path
  }

  private handlePlaylist (playlist: any[]) {
    const bottom: string = playlist.length > 0 ? '60px' : '';
    (this.$refs.recommend as HTMLElement).style.bottom = bottom;
    (this.$refs.scroll as any).refresh()
  }

  private loadImage () {
    if (!this.checkloaded) {
      this.checkloaded = true;
      (this.$refs.scroll as any).refresh()
    }
  }

  private selectItem (item: any) {
    this.$router.push({
      path: `/recommend/${item.dissid}`
    })
    this.setDisc(item)
  }

  private _getRecommend () {
    getRecommend().then((res: GetRecommendResponse) => {
      if (res.code === ERR_OK) {
        this.recommends = res.data.slider
      }
    })
  }

  private _getDiscList () {
    getDiscList().then((res: GetDiscListResponse) => {
      if (res.code === ERR_OK) {
        this.discList = res.data.list
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
