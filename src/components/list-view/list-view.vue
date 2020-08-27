<template>
 <scroll @scroll="scroll"
     :listen-scroll="listenScroll"
     :probe-type="probeType"
     :data="data"
     class="listview"
     ref="listview"
     >
     <ul>
         <li v-for="(group,groupIndex) in data" class="list-group" ref="listGroup" :key="groupIndex">
             <h2 class="list-group-title">{{group.title}}</h2>
             <ul>
                 <li @click="selectItem(item)" v-for="(item,index) in group.items" :key="index" class="list-group-item">
                     <img class="avatar" v-lazy="item.avatar">
                     <span class="name">{{item.name}}</span>
                 </li>
             </ul>
         </li>
     </ul>
     <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
         <ul>
             <li v-for="(item,index) in shortcutList" :data-index="index" :key="index" class="item" :class="{'current':currentIndex===index}">{{item}}</li>
         </ul>
     </div>
     <div class="list-fixed" ref="fixed" v-show="fixedTitle">
         <div class="fixed-title">{{fixedTitle}}</div>
     </div>
     <div v-show="!data.length" class="loading-container">
         <loading></loading>
     </div>
 </scroll>

</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Scroll from '@/components/scroll/scroll.vue'
import Loading from '@/components/loading/loading.vue'
import { getData } from '@/common/ts/dom'
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import { Pos } from '@/types/scroll'
import { MapHotItems, MapHot } from '@/types/singer'
const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18

@Component({
  components: {
    Scroll,
    Loading
  }
})
export default class ListView extends Vue {
    @Prop({ type: Array, default: function () { return [] } }) data!: MapHot[];
    get shortcutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }

    get fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }

    private scrollY = -1
    private currentIndex = 0
    private diff = -1
    private probeType!: number;
    private listenScroll!: boolean;
    private touch: any;
    private listHeight!: any[];
    private fixedTop!: number;
    private created () {
      this.probeType = 3
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
    }

    @Emit('select') private selectEmit (item: MapHotItems) { return item }

    private selectItem (item: MapHotItems) {
      this.selectEmit(item)
    }

    private onShortcutTouchStart (e: any) {
      const anchorIndex = getData(e.target, 'index') as string
      const firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(~~anchorIndex)
    }

    private onShortcutTouchMove (e: any) {
      const firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      const delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      const anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(~~anchorIndex)
    }

    private refresh () {
      (this.$refs.listview as any).refresh()
    }

    private scroll (pos: Pos) {
      this.scrollY = pos.y
    }

    private _calculateHeight () {
      this.listHeight = []
      const list: HTMLElement[] = Array.from(this.$refs.listGroup as HTMLElement[])
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }

    private _scrollTo (index: number) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index];
      (this.$refs.listview as any).scrollToElement((this.$refs.listGroup as HTMLElement[])[index], 0)
    }

    @Watch('data') dataChanged () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    }

    @Watch('scrollY') scrollYChanged (newY: number) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        const height1 = listHeight[i]
        const height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      this.currentIndex = listHeight.length - 2
    }

    @Watch('diff') diffChanged (newVal: number) {
      const fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop;
      (this.$refs.fixed as HTMLElement).style.transform = `translate3d(0,${fixedTop}px,0`
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
