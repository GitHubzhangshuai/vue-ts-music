export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}
export interface OptionType{
  param: string;
  prefix: string;
}
export const options: OptionType = {
  param: 'jsonpCallback',
  prefix: '_jp'
}
export const ERR_OK = 0
