<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script lang="ts">
import MusicList from '@/components/music-list/music-list.vue'
import { getMusicList } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import { Getter } from 'vuex-class'
import { createSong } from '@/common/ts/song'
import { Vue, Component } from 'vue-property-decorator'
import { GetTopListTopListItem, GetMusicListResponse, GetMusicListSonglistItem } from '@/types/rank'
import { CreateSongType } from '@/types/song'

@Component({
  components: {
    MusicList
  }
})
export default class TopList extends Vue {
    @Getter('topList') topList!: GetTopListTopListItem;
    private songs: CreateSongType[] = [];
    get title () {
      return this.topList.topTitle
    }

    get bgImage () {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    }

    private rank = true
    private created () {
      this._getMusicList()
    }

    private _getMusicList () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res: GetMusicListResponse) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    }

    private _normalizeSongs (list: GetMusicListSonglistItem[]): CreateSongType[] {
      const ret: CreateSongType[] = []
      list.forEach((item) => {
        const musicData = item.data
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
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
