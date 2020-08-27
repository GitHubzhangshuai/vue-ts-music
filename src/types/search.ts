/* eslint-disable camelcase */
import { MusicData } from '@/types/song'
export interface SearchResonse{
    code: number;
    message: string;
    notice: string;
    subcode: number;
    tips: string;
    time: number;
    data: SearchData;
}

export interface SearchData{
    keyword: string;
    totaltime: number;
    zhida?: SearchZhiDa;
    song: { list: MusicData[]; curnum: number; curpage: number; totalnum: number };
}
export interface SearchZhiDa{
    albumnum: number;
    singerid: number;
    singermid: string;
    singername: string;
    songnum: number;
    type: number;
}

export interface GetHotResponse{
    code: number;
    data: GetHotData;
    subcode: number;
}

export interface GetHotData{
    special_key: string;
    special_url: string;
    hotkey: GetHotDataHotKey[];
}

export interface GetHotDataHotKey{
    k: string;
    n: number;
}
