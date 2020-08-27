<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import BScroll from 'better-scroll'
import { Pos } from '@/types/scroll'

@Component
export default class Scroll extends Vue {
    @Prop({ type: Number, default: 1 }) private probeType!: number;
    @Prop({ type: Boolean, default: true }) private click!: boolean;
    @Prop({ type: Boolean, default: false }) private listenScroll!: boolean;
    @Prop({ type: Array, default: null }) private data!: any [];
    @Prop({ type: Boolean, default: false }) private pullup!: boolean;
    @Prop({ type: Boolean, default: false }) private beforeScroll!: boolean;
    @Prop({ type: Number, default: 20 }) private refreshDelay!: number;
    private mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
      window.addEventListener('resize', () => {
        this.refresh()
      })
    }

    private scroll: any;

    private _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper as HTMLDivElement, {
        probeType: this.probeType,
        // 有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
        // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
        // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        // 如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
        click: this.click
        // better-scroll 默认会阻止浏览器的原生 click 事件。
        // 当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
      })

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos: Pos) => {
          // scroll
          // 参数：{Object} {x, y} 滚动的实时坐标
          // 触发时机：滚动过程中，具体时机取决于选项中的 probeType。
          this.scrollEmit(pos)
        })
      }

      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.scrollToEndEmit()
          }
        })
      }

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.beforeScrollEmit()
        })
      }
    }

    @Emit('scroll') private scrollEmit (pos: Pos) { return pos }
    @Emit('scrollToEnd') private scrollToEndEmit () { return null }
    @Emit('beforeScroll') private beforeScrollEmit () { return null }
    private disable () {
      this.scroll && this.scroll.disable()
      // disable()
      // 参数：无
      // 返回值：无
      // 作用：禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。
    }

    private enable () {
      this.scroll && this.scroll.enable()
      // enable()
      // 参数：无
      // 返回值：无
      // 作用：启用 better-scroll, 默认 开启。
    }

    private refresh () {
      this.scroll && this.scroll.refresh()
      // refresh()
      // 参数：无
      // 返回值：无
      // 作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    }

    private scrollBy (...rest: any[]) {
      // this.scroll && this.scroll.scrollBy.apply(this.scroll, arguments)
      this.scroll && this.scroll.scrollBy(...rest)
      // scrollBy(x, y, time, easing)
      // 参数：
      // {Number} x 横轴距离（单位 px）
      // {Number} y 纵轴距离（单位 px）
      // {Number} time 滚动动画执行的时长（单位 ms）
      // {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
      // 返回值：无
      // 作用：相对于当前位置偏移滚动 x,y 的距离。
    }

    private scrollTo (...rest: any []) {
      this.scroll && this.scroll.scrollTo(...rest)
      // scrollTo(x, y, time, easing)
      // 参数：
      // {Number} x 横轴坐标（单位 px）
      // {Number} y 纵轴坐标（单位 px）
      // {Number} time 滚动动画执行的时长（单位 ms）
      // {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
      // 返回值：无
      // 作用：滚动到指定的位置，见 Demo 。
    }

    private scrollToElement (...rest: any []) {
      this.scroll && this.scroll.scrollToElement(...rest)
      // scrollToElement(el, time, offsetX, offsetY, easing)
      // 参数：
      // {DOM | String} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。
      // {Number} time 滚动动画执行的时长（单位 ms）
      // {Number | Boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
      // {Number | Boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
      // {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
      // 返回值：无
      // 作用：滚动到指定的目标元素。
    }

    @Watch('data') onDataChanged () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
