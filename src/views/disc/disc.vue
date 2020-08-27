
<template>
  <transition name="slide">
      <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import MusicList from '@/components/music-list/music-list.vue'
import { getSongList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import { Getter } from 'vuex-class'
import { createSong } from '@/common/ts/song'
import { CreateSongType } from '@/types/song'
import { Vue, Component } from 'vue-property-decorator'
import { GetDiscListDataListItem } from '@/types/recommend'

@Component({
  components: { MusicList }
})
export default class Disc extends Vue {
    @Getter('disc') disc!: GetDiscListDataListItem;
    private songs: CreateSongType[] = []
    get title () {
      return this.disc.dissname
    }

    get bgImage () {
      return this.disc.imgurl
    }

    private created () {
      this._getSongList()
    }

    private _getSongList () {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    }

    private _normalizeSongs (list: any []): CreateSongType[] {
      const ret: CreateSongType [] = []
      list.forEach((musicData) => {
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
