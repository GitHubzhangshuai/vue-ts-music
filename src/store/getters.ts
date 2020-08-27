import { State } from './state'

export const disc = (state: State) => state.disc
export const singer = (state: State) => state.singer
export const topList = (state: State) => state.topList
export const playing = (state: State) => state.playing
export const fullScreen = (state: State) => state.fullScreen
export const currentIndex = (state: State) => state.currentIndex
export const mode = (state: State) => state.mode
export const playlist = (state: State) => state.playlist
export const sequenceList = (state: State) => state.sequenceList
export const currentSong = (state: State) => {
  return state.playlist[state.currentIndex] || {}
}
export const playHistory = (state: State) => state.playHistory
export const searchHistory = (state: State) => state.searchHistory
export const favoriteList = (state: State) => state.favoriteList
