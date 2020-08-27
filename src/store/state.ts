/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import { GetDiscListDataListItem } from '@/types/recommend'
import { MapHotItems } from '@/types/singer'
import { GetTopListTopListItem } from '@/types/rank'
import { playMode } from '@/common/ts/config'
import { Song } from '@/common/ts/song'
import { loadSearch, loadPlay, loadFavorite } from '@/common/ts/cache'
const state: State = {
  disc: {
    commit_time: '',
    createtime: '',
    creator: {
      avatarUrl: '',
      encrypt_uin: '',
      followflag: 0,
      isVip: 0,
      name: '',
      qq: 0,
      type: 0
    },
    dissid: '',
    dissname: '',
    imgurl: '',
    introduction: '',
    listennum: 0,
    score: 0,
    version: 0
  },
  singer: { id: '', name: '', avatar: '' },
  topList: {
    id: 0,
    listenCount: 0,
    picUrl: '',
    topTitle: '',
    type: 0,
    songList: [{ singername: '', songname: '' }]
  },
  fullScreen: false,
  playing: false,
  currentIndex: 0,
  mode: playMode.sequence,
  sequenceList: [],
  playlist: [],
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
export interface State{
    disc: GetDiscListDataListItem;
    singer: MapHotItems;
    topList: GetTopListTopListItem;
    fullScreen: boolean;
    playing: boolean;
    currentIndex: number;
    mode: number;
    sequenceList: Song[];
    playlist: Song[];
    searchHistory: string[];
    playHistory: Song[];
    favoriteList: Song[];
}

export default state
