<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component, Prop } from 'vue-property-decorator'
import { addClass } from '@/common/ts/dom'
import BScroll from 'better-scroll'

@Component({
  name: 'slider',
  components: {}
})
export default class Slider extends Vue {
    @Prop({ type: Boolean, default: true }) private loop!: boolean;
    @Prop({ type: Boolean, default: true }) private autoPlay!: boolean;
    @Prop({ type: Number, default: 4000 }) private interval!: number;

    private dots: undefined[]=[];
    private currentPageIndex=0;
    private timer: any;
    private children!: Array<Element>;
    private slider!: any;
    private mounted () {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    }

    private activated () {
      if (this.autoPlay) {
        this._play()
      }
    }

    private deactivated () {
      clearTimeout(this.timer)
    }

    private beforeDestory () {
      clearTimeout(this.timer)
    }

    private _setSliderWidth (isResize?: boolean) {
      this.children = Array.from((this.$refs.sliderGroup as HTMLElement).children)
      let width = 0
      const sliderWidth: number = (this.$refs.slider as HTMLElement).clientWidth
      for (let i = 0; i < this.children.length; i++) {
        const child: HTMLElement = this.children[i] as HTMLElement
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      (this.$refs.sliderGroup as HTMLElement).style.width = width + 'px'
    }

    private _initSlider () {
      this.slider = new BScroll(this.$refs.slider as HTMLElement, {
        scrollX: true, // 设置为 true 的时候，可以开启横向滚动。
        scrollY: false, // 设置为 true 的时候，可以开启纵向滚动。
        momentum: false, // 快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为 true 则开启动画。
        // snap
        // 类型：Boolean | Object
        // 默认值：false
        // 作用：这个配置是为了做 Slide 组件用的，默认为 false，如果开启则需要配置一个 Object，例如：
        // snap: {
        // loop: false,
        // threshold: 0.1,
        // stepX: 100,
        // stepY: 100,
        // easing: {
        //   style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        //   fn: function(t) {
        //     return t * (2 - t)
        //   }
        // }
        // }
        // 注意：loop 为 true 是为了支持循环轮播，但只有一个元素的时候，loop 为 true 是无效的，也并不会 clone 节点。
        // threshold 表示可滚动到下一个的阈值，easing 表示滚动的缓动函数。
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
        // 以下是0.x版本写法
        // snap: true,
        // snapLoop: this.loop,
        // snapThreshold: 0.3,
        // snapSpeed: 400
      })
      this.slider.on('scrollEnd', () => {
        // getCurrentPage()
        // 参数：无
        // 返回值：{Object} { x: posX, y: posY,pageX: x, pageY: y} 其中，x 和 y 表示偏移的坐标值，pageX 和 pageY 表示横轴方向和纵轴方向的页面数。
        // 作用：获取当前页面的信息。
        const pageIndex = this.slider.getCurrentPage().pageX
        // 1.x版本loop为ture时，第二张的pageX为1，0.x版本的为2。故1.x版本的不用写以下代码
        // if (this.loop) {
        //   pageIndex -= 1
        // }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      })
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    }

    private _initDots () {
      this.dots = new Array(this.children.length)
    }

    private _play () {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        // goToPage(x, y, time, easing)
        // 参数
        // {Number} x 横轴的页数
        // {Number} y 纵轴的页数
        // {Number} time 动画执行的时间
        // {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
        // 返回值：无
        // 作用：当我们做 slide 组件的时候，slide 通常会分成多个页面。调用此方法可以滚动到指定的页面。
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    position relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
