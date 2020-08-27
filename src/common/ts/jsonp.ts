import originJsonp from 'jsonp'
import { OptionType } from '@/api/config'

interface JSON {
  [index: string]: string|number;
}

export function param (data: JSON): string {
  let url = ''
  for (const k in data) {
    const value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

export default function jsonp (url: string, data: JSON, option: OptionType): Promise<any> {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
