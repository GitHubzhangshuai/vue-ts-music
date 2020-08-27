/* eslint-disable camelcase */
export interface GetTopListResponse{
    code: number;
    data: GetTopListData;
    default: number;
    message: string;
    subcode: number;
}

export interface GetTopListData{
    topList: GetTopListTopListItem[];
}

export interface GetTopListTopListItem{
    id: number;
    listenCount: number;
    picUrl: string;
    topTitle: string;
    type: number;
    songList: GetTopListTopListItemSongListItem[];
}

export interface GetTopListTopListItemSongListItem{
    singername: string;
    songname: string;
}

export interface GetMusicListResponse{
    code: number;
    color: number;
    comment_num: number;
    cur_song_num: number;
    date: string;
    day_of_year: string;
    song_begin: number;
    total_song_num: number;
    update_time: string;
    topinfo: GetMusicListTopinfo;
    songlist: GetMusicListSonglistItem[];
}
export interface GetMusicListTopinfo{
    ListName: string;
    MacDetailPicUrl: string;
    MacListPicUrl: string;
    UpdateType: string;
    albuminfo: string;
    headPic_v12: string;
    info: string;
    listennum: number;
    pic: string;
    picDetail: string;
    pic_album: string;
    pic_h5: string;
    pic_v11: string;
    pic_v12: string;
    topID: string;
    type: string;
}

export interface GetMusicListSonglistItem{
    Franking_value: string;
    cur_count: string;
    in_count: string;
    old_count: string;
    data: GetMusicListSonglistItemData;
}

export interface GetMusicListSonglistItemData{
    albumdesc: string;
    albumid: number;
    albummid: string;
    albumname: string;
    songmid: string;
    songid: number;
    songname: string;
    songorig: string;
    songtype: number;
    strMediaMid: string;
    interval: number;
    singer: GetMusicListSonglistItemDataSinger[];
}

export interface GetMusicListSonglistItemDataSinger{
    id: number;
    mid: string;
    name: string;
}
