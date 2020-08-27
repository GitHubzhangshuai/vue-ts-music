// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path') // 引入path模块
function resolve (dir) {
  return join(__dirname, dir) // path.join(_dirname)设置绝对路径
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  // 输出文件目录
  outputDir: 'docs',
  chainWebpack: (config) => {
    config.resolve.alias
    // 第一个参数：别名 第二个参数：路径
    // 注意： 在html中使用别名，需要加~
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('common', resolve('./src/common'))
      .set('views', resolve('./src/views'))
      .set('base', resolve('./src/base'))
      .set('api', resolve('./src/api'))
  }
}
