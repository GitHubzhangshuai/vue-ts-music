<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script lang="ts">
import MusicList from '@/components/music-list/music-list.vue'
import { getSingerDetail } from '@/api/singer'
import { GetSingerDetailResponse, GetSingerDetailDataListItem, MapHotItems } from '@/types/singer'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/ts/song'
import { CreateSongType } from '@/types/song'
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  components: { MusicList }
})
export default class SingerDetail extends Vue {
    @Getter('singer') private singer!: MapHotItems;
    private songs: CreateSongType[] = []
    private created () {
      this._getDetail()
      // console.log(this.singer)
    }

    get title () {
      return this.singer.name
    }

    get bgImage () {
      return this.singer.avatar
    }

    private _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res: GetSingerDetailResponse) => {
        if (res.code === ERR_OK) {
          console.log(res.data.list)
          this.songs = this._normalizeSongs(res.data.list)
          // console.log(this.songs)
        }
      })
    }

    private _normalizeSongs (list: GetSingerDetailDataListItem[]): CreateSongType[] {
      const ret: CreateSongType[] = []
      list.forEach((item) => {
        const { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
