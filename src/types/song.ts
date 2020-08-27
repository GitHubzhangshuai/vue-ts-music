export interface CreateSongType{
    id: number;
    mid: string;
    singer: string;
    name: string;
    album: string;
    duration: number;
    image: string;
    url: string;
}

export interface MusicData{
    songid: number;
    songmid: string;
    singer: Singer [];
    songname: string;
    albumname: string;
    interval: number;
    albummid: string;
}
export interface Singer{
    name: string;
    id: number;
    mid: string;
}

export interface Params{
    id: number;
    mid: string;
    singer: string;
    name: string;
    album: string;
    duration: number;
    image: string;
    url: string;
}

export interface GetLyricResponse{
    lyric: string;
    code: number;
    retcode: number;
    subcode: number;
    trans: string;
}
