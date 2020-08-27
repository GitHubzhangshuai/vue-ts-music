/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from './mutation-types'
import { playMode } from '@/common/ts/config'
import { shuffle } from '@/common/ts/util'
import { ActionContext } from 'vuex'
import { State } from './state'
import { Song } from '@/common/ts/song'
import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from '@/common/ts/cache'

function findIndex (list: Song[], song: Song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function (context: ActionContext<State, any>, { list, index }: { list: Song[]; index: number }) {
  context.commit(types.SET_SEQUENCE_LIST, list)
  if (context.state.mode === playMode.random) {
    const randomList = shuffle(list)
    context.commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    context.commit(types.SET_PLAYLIST, list)
  }
  context.commit(types.SET_CURRENT_INDEX, index)
  context.commit(types.SET_FULL_SCREEN, true)
  context.commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function (context: ActionContext<State, any>, { list }: { list: Song[] }) {
  context.commit(types.SET_PLAY_MODE, playMode.random)
  context.commit(types.SET_SEQUENCE_LIST, list)
  const randomList = shuffle(list)
  context.commit(types.SET_PLAYLIST, randomList)
  context.commit(types.SET_CURRENT_INDEX, 0)
  context.commit(types.SET_FULL_SCREEN, true)
  context.commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function (context: ActionContext<State, any>, song: Song) {
  const playlist = context.state.playlist.slice()
  const sequenceList = context.state.sequenceList.slice()
  let currentIndex = context.state.currentIndex

  // let currentSong = playlist[currentIndex]
  const fpIndex = findIndex(playlist, song)
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  // let currentSIndex = findIndex(sequenceList, currentIndex) + 1
  const currentSIndex = currentIndex + 1
  const fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  context.commit(types.SET_PLAYLIST, playlist)
  context.commit(types.SET_SEQUENCE_LIST, sequenceList)
  context.commit(types.SET_CURRENT_INDEX, currentIndex)
  context.commit(types.SET_FULL_SCREEN, true)
  context.commit(types.SET_PLAYING_STATE, true)
}

export const deleteSong = function (context: ActionContext<State, any>, song: Song) {
  const playlist = context.state.playlist.slice()
  const sequenceList = context.state.sequenceList.slice()
  let currentIndex = context.state.currentIndex
  const pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  const SIndex = findIndex(sequenceList, song)
  sequenceList.splice(SIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  context.commit(types.SET_PLAYLIST, playlist)
  context.commit(types.SET_SEQUENCE_LIST, sequenceList)
  context.commit(types.SET_CURRENT_INDEX, currentIndex)
  if (!playlist.length) {
    context.commit(types.SET_PLAYING_STATE, false)
  } else {
    context.commit(types.SET_PLAYING_STATE, true)
  }
}

export const deleteSongList = function (context: ActionContext<State, any>) {
  context.commit(types.SET_CURRENT_INDEX, -1)
  context.commit(types.SET_FAVORITE_LIST, [])
  context.commit(types.SET_SEQUENCE_LIST, [])
  context.commit(types.SET_PLAYING_STATE, false)
}

export const saveFavoriteList = function (context: ActionContext<State, any>, song: Song) {
  context.commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function (context: ActionContext<State, any>, song: Song) {
  context.commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}

export const saveSearchHistory = function (context: ActionContext<State, any>, query: string) {
  context.commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function (context: ActionContext<State, any>, query: string) {
  context.commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function (context: ActionContext<State, any>) {
  context.commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const savePlayHistory = function (context: ActionContext<State, any>, song: Song) {
  context.commit(types.SET_PLAY_HISTORY, savePlay(song))
}
