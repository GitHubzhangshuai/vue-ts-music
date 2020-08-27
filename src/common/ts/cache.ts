import storage from 'good-storage'
import { Song } from '@/common/ts/song'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

function insertArray<T> (arr: Array<T>, val: T, compare: (item: T) => boolean, maxLen: number) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray<T> (arr: Array<T>, compare: (item: T) => boolean) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch (query: string): string[] {
  const searches: string[] = storage.get(SEARCH_KEY, [])
  insertArray<string>(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch (query: string): string[] {
  const searches: string[] = storage.get(SEARCH_KEY, [])
  deleteFromArray<string>(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}
export function loadSearch (): string[] {
  return storage.get(SEARCH_KEY, [])
}

export function savePlay (song: Song): Song[] {
  const songs: Song[] = storage.get(PLAY_KEY, [])
  insertArray<Song>(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay (): Song[] {
  // storage.remove(PLAY_KEY)
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite (song: Song): Song[] {
  const songs: Song[] = storage.get(FAVORITE_KEY, [])
  insertArray<Song>(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite (song: Song): Song[] {
  const songs: Song[] = storage.get(FAVORITE_KEY, [])
  deleteFromArray<Song>(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite (): Song[] {
  // storage.remove(FAVORITE_KEY)
  return storage.get(FAVORITE_KEY, [])
}
