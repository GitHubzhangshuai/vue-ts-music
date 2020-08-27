/* eslint-disable camelcase */
import { MusicData } from '@/types/song'
export interface GetSingerListResponse{
    code: number;
    data: GetSingerListData;
    message: string;
    subcode: number;
}

export interface GetSingerListData{
    list: GetSingerDataListItem[];
    total: number;
    total_page: number;
    per_page: number;
}

export interface GetSingerDataListItem{
    Fsinger_name: string;
    Fsinger_mid: string;
    Findex: string;
}
export interface GetSingerDetailResponse{
    code: number;
    data: GetSingerDetailData;
    message: string;
    subcode: number;
}

export interface GetSingerDetailData{
    list: GetSingerDetailDataListItem[];
    singer_id: string;
    singer_mid: string;
    singer_name: string;
    total: number;
}

export interface GetSingerDetailDataListItem{
    Flisten_count1: number;
    Fupload_time: string;
    index: number;
    isnew: number;
    listenCount: number;
    playurl: string;
    price: number;
    musicData: MusicData;
}

export interface MapHotItems{
    id: string;
    name: string;
    avatar: string;
}
export interface MapHot{
    title: string;
    items: MapHotItems[];
}
export interface Map{
    [index: string]: MapHot;
}
