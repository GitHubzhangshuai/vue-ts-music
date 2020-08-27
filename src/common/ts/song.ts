import { getLyric } from '@/api/song'
import { ERR_OK } from '@/api/config'
import { Base64 } from 'js-base64'
import { Params, MusicData, Singer, GetLyricResponse } from '@/types/song'

export class Song {
  id: number;
  mid: string;
  singer: string;
  name: string;
  album: string;
  duration: number;
  image: string;
  url: string;
  lyric!: string;
  constructor ({ id, mid, singer, name, album, duration, image, url }: Params) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res: GetLyricResponse) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          // console.log(this.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

function filterSinger (singer: Singer []) {
  const ret: string[] = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function createSong (musicData: MusicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: ''
    // url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=1145430624&vkey=4C1E8F871BCB0EA13A208BA047447734161BFE7847117359CC8255C559BACDCBAC8E82BD01AF680FD87D29895B5A0EE2D9D4AB07DFBC7D10&uin=0&fromtag=38`
  })
}
