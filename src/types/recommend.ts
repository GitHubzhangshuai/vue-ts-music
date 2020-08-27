/* eslint-disable camelcase */
export interface GetRecommendResponse{
    code: number;
    data: GetRecommendData;
}
export interface GetRecommendData{
    songList: [];
    radioList: GetRecommendRadioList[];
    slider: GetRecommendSlider[];
}
export interface GetDiscListDataListItem{
    commit_time: string;
    createtime: string;
    creator: {
      avatarUrl: string;
      encrypt_uin: string;
      followflag: number;
      isVip: number;
      name: string;
      qq: number;
      type: number;
    };
    dissid: string;
    dissname: string;
    imgurl: string;
    introduction: string;
    listennum: number;
    score: number;
    version: number;
}

export interface GetRecommendRadioList{
    Ftitle: string;
    picUrl: string;
    radioid: number;
}
export interface GetRecommendSlider{
    id: number;
    linkUrl: string;
    picUrl: number;
}

export interface GetDiscListResponse{
    code: number;
    data: GetDiscListData;
    default: number;
    message: string;
    subcode: number;
}
export interface GetDiscListData{
    categoryId: number;
    ein: number;
    list: GetDiscListDataListItem[];
    sin: number;
    sortId: number;
    sum: number;
    uin: number;
}
