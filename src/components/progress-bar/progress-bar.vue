<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend="progressTouchEnd"
            >
            <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { prefixStyle } from '@/common/ts/dom'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
const progressBtnWidth = 16
const transform = prefixStyle('transform')
interface Touch{
    initiated: boolean;
    startX: number;
    left: number;
}
@Component({})
export default class ProgressBar extends Vue {
    @Prop({ type: Number, default: 0 }) percent!: number;
    private touch!: Touch;
    private created () {
      this.touch = {
        initiated: false,
        startX: 0,
        left: 0
      }
    }

    private progressTouchStart (e: any) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = (this.$refs.progress as HTMLElement).clientWidth
    }

    private progressTouchMove (e: any) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min((this.$refs.progressBar as HTMLElement).clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    }

    private progressTouchEnd () {
      console.log(1)
      this.touch.initiated = false
      this._triggerPercent()
    }

    private progressClick (e: any) {
      const rect = (this.$refs.progressBar as HTMLElement).getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      this._triggerPercent()
    }

    private _triggerPercent () {
      const barWidth = (this.$refs.progressBar as HTMLElement).clientWidth - progressBtnWidth
      const percent = (this.$refs.progress as HTMLElement).clientWidth / barWidth
      this.$emit('percentChange', percent)
    }

    private _offset (offsetWidth: number) {
      (this.$refs.progress as HTMLElement).style.width = `${offsetWidth}px`;
      (this.$refs.progressBtn as HTMLElement).style[transform] = `translate3d(${offsetWidth}px,0,0)`
    }

    @Watch('percent') percentChanged (newPercent: number) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = (this.$refs.progressBar as HTMLElement).clientWidth - progressBtnWidth
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
