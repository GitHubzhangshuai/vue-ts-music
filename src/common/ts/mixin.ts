import { Getter, Action, Mutation } from 'vuex-class'
import { playMode } from '@/common/ts/config'
import { shuffle } from '@/common/ts/util'
import { Song } from '@/common/ts/song'
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({})
export class PlaylistMixin extends Vue {
  @Getter('playlist') playlist!: Song[];
  protected mounted () {
    this.handlePlaylist(this.playlist)
  }

  private activated () {
    this.handlePlaylist(this.playlist)
  }

  @Watch('playlist') playlistChanged (newVal: Song[]) {
    this.handlePlaylist(newVal)
  }

  protected handlePlaylist (list: Song[]) {
    throw new Error('component must implement handlePlaylist method')
  }
}

@Component({})
export class PlayerMixin extends Vue {
  get iconMode () {
    return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
  }

    @Getter('sequenceList') sequenceList!: Song[];
    @Getter('playlist') playlist!: Song[];
    @Getter('currentSong') currentSong!: Song;
    @Getter('mode') mode!: number;
    @Getter('favoriteList') favoriteList!: Song[];
    private changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    }

    private resetCurrentIndex (list: Song[]) {
      const index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    }

    private toggleFavorite (song: Song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    }

    private getFavoriteIcon (song: Song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    }

    private isFavorite (song: Song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    }

    @Mutation('SET_PLAY_MODE') setPlayMode!: Function;
    @Mutation('SET_PLAYLIST') setPlaylist!: Function;
    @Mutation('SET_CURRENT_INDEX') setCurrentIndex!: Function;
    @Mutation('SET_PLAYING_STATE') setPlayingState!: Function;
    @Action('saveFavoriteList') saveFavoriteList!: Function;
    @Action('deleteFavoriteList') deleteFavoriteList!: Function;
}

@Component({})
export class SearchMixin extends Vue {
  private query = ''
  private refreshDelay = 120
  @Getter('searchHistory') searchHistory!: string[];
  @Action('saveSearchHistory') saveSearchHistory!: Function;
  @Action('deleteSearchHistory') deleteSearchHistory!: Function;
  private onQueryChange (query: string) {
    this.query = query
  }

  private blurInput () {
    (this.$refs.searchBox as any).blur()
  }

  private addQuery (query: string) {
    (this.$refs.searchBox as any).setQuery(query)
  }

  protected saveSearch () {
    this.saveSearchHistory(this.query)
  }
}
