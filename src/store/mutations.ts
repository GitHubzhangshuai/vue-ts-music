import * as types from './mutation-types'
import { State } from './state'
import { GetDiscListDataListItem } from '@/types/recommend'
import { MapHotItems } from '@/types/singer'
import { GetTopListTopListItem } from '@/types/rank'
import { Song } from '@/common/ts/song'
const mutations = {
  [types.SET_DISC] (state: State, disc: GetDiscListDataListItem) {
    state.disc = disc
  },
  [types.SET_SINGER] (state: State, singer: MapHotItems) {
    state.singer = singer
  },
  [types.SET_TOP_LIST] (state: State, topList: GetTopListTopListItem) {
    state.topList = topList
  },
  [types.SET_PLAYLIST] (state: State, list: Song[]) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST] (state: State, list: Song[]) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state: State, mode: number) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state: State, index: number) {
    state.currentIndex = index
  },
  [types.SET_FULL_SCREEN] (state: State, flag: boolean) {
    state.fullScreen = flag
  },
  [types.SET_PLAYING_STATE] (state: State, flag: boolean) {
    state.playing = flag
  },
  [types.SET_PLAYLIST_URL] (state: State, keyUrl: {index: number; url: string}) {
    const index = keyUrl.index
    const url = keyUrl.url
    state.playlist[index].url = url
  },
  [types.SET_SEARCH_HISTORY] (state: State, history: string[]) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY] (state: State, history: Song[]) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST] (state: State, list: Song[]) {
    state.favoriteList = list
  }
}

export default mutations
