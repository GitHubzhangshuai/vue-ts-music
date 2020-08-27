# better-scroll的一些API

## 构造函数
new BScroll(Dom,Options)
>Dom: Dom元素,滚动的wrapper层

>Options 参数
startX: 0 开始的X轴位置
startY: 0 开始的Y轴位置
scrollY: true 滚动方向为 Y 轴
scrollX: true 滚动方向为 X 轴
click: true 是否派发click事件，通常判断浏览器派发的click还是betterscroll派发的click，可以用_constructed，若是bs派发的则为true
directionLockThreshold: 5
momentum: true 当快速滑动时是否开启滑动惯性
bounce: true 是否启用回弹动画效果
selectedIndex: 0 wheel 为 true 时有效，表示被选中的 wheel 索引
rotate: 25 wheel 为 true 时有效，表示被选中的 wheel 每一层的旋转角度
wheel: false 该属性是给 picker 组件使用的，普通的列表滚动不需要配置
snap: {
          loop: false 是否可以无缝循环轮播
          threshold: 0.1 用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
          speed: 400, 轮播图切换的动画时间
          time: 
        } 该属性是给 slider 组件使用的，普通的列表滚动不需要配置
swipeTime: 2500 swipe 持续时间
bounceTime: 700 弹力动画持续的毫秒数
adjustTime: 400 wheel 为 true 有用，调整停留位置的时间
swipeBounceTime: 1200 swipe 回弹 时间
deceleration: 0.001 滚动动量减速越大越快，建议不大于0.01
momentumLimitTime: 300 符合惯性拖动的最大时间
momentumLimitDistance: 15 符合惯性拖动的最小拖动距离
resizePolling: 60 重新调整窗口大小时，重新计算better-scroll的时间间隔
preventDefault: true 是否阻止默认事件
preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ } 阻止默认事件
HWCompositing: true 是否启用硬件加速
useTransition: true 是否使用CSS3的Transition属性
useTransform: true 是否使用CSS3的Transform属性
probeType: 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件

## 方法
disable()
>参数：无
返回值：无
作用：禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。

enable()
>参数：无
返回值：无
作用：启用 better-scroll, 默认 开启。

refresh()
>参数：无
返回值：无
作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。

scrollBy(x, y, time, easing)
>参数：
{Number} x 横轴距离（单位 px）
{Number} y 纵轴距离（单位 px）
{Number} time 滚动动画执行的时长（单位 ms）
{Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
返回值：无
作用：相对于当前位置偏移滚动 x,y 的距离。

scrollTo(x, y, time, easing)
>参数：
{Number} x 横轴坐标（单位 px）
{Number} y 纵轴坐标（单位 px）
{Number} time 滚动动画执行的时长（单位 ms）
{Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
返回值：无
作用：滚动到指定的位置。

scrollToElement(el, time, offsetX, offsetY, easing)
>参数：
{DOM | String} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。
{Number} time 滚动动画执行的时长（单位 ms）
{Number | Boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
{Number | Boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
{Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
返回值：无
作用：滚动到指定的目标元素。

getCurrentPage()
>snap 为 true 时，获取滚动的当前页，返回的对象结构为 {x, y, pageX, pageY}，其中 x,y 代表滚动横向和纵向的位置；pageX，pageY 表示横向和纵向的页面索引。用法如：getCurrentPage().pageX

goToPage(x, y, time, easing)
>snap 为 true，滚动到对应的页面，x 表示横向页面索引，y 表示纵向页面索引， time 表示动画，easing 表示缓动函数（可省略不写）


## 事件
scroll
>参数：{Object} {x, y} 滚动的实时坐标
触发时机：滚动过程中，具体时机取决于选项中的 probeType。

例子:
```
import BScroll from 'better-scroll'
...
this.scroll = new BScroll('...',{})
this.scroll.on('scroll',(x,y)=>{
    //这里是回调函数
    //垂直方向滑动的话y初始为0，往上滑动y则变为负值
})
```
>scroll - 滚动时触发
beforeScrollStart - 滚动开始之前触发
scrollStart - 滚动开始时触发
scrollCancel - 取消滚动时触发
scrollEnd - 滚动结束时触发
touchend - 手指移开屏幕时触发
flick - 触发了 fastclick 时的回调函数
refresh - 当 better-scroll 刷新时触发
destroy - 销毁 better-scroll 实例时触发

# audio元素的一些API
## 属性
autoplay:自动播放
controls:显示控件
loop:循环播放
preload:音频在页面加载时进行加载
src:音频链接
currentTime: 设置或返回音频中的当前播放位置（以秒计）。
## 方法 
load():重新加载音频，用于更改src之后使用，无参数，无返回值
play(): 开始播放音频。
pause(): 暂停当前播放的音频。
## 事件
error:在音频或视频加载发生错误时触发
play:音频或视频文件已经就绪可以开始播放时触发
ended:音频或视频文件播放完毕后触发
pause:音频或视频文件暂停时触发
timeupdate:播放位置改变时触发[注意:播放和调整指示定位时都会触发]
volumechange:音量改变时触发
abort:在音频或视频终止加载时触发
canplay:浏览器能够开始播放指定的音频或视频

# js-base64的一些API
```
import { Base64 } from 'js-base64';
let latin = 'dankogai';
let utf8  = '小飼弾'
let u8s   =  new Uint8Array([100,97,110,107,111,103,97,105]);
Base64.encode(latin);             // ZGFua29nYWk=
Base64.btoa(latin);               // ZGFua29nYWk=
Base64.btoa(utf8);                // raises exception
Base64.fromUint8Array(u8s);       // ZGFua29nYWk=
Base64.fromUint8Array(u8s, true); // ZGFua29nYW which is URI safe
Base64.encode(utf8);              // 5bCP6aO85by+
Base64.encode(utf8, true)         // 5bCP6aO85by-
Base64.encodeURI(utf8);           // 5bCP6aO85by-
Base64.decode('ZGFua29nYWk=');// dankogai
Base64.atob('ZGFua29nYWk=');// dankogai
Base64.atob('5bCP6aO85by+');// 'å°�é£¼å¼¾' which is nonsense
Base64.toUint8Array('ZGFua29nYWk=');// u8s above
Base64.decode('5bCP6aO85by+');// 小飼弾
// note .decodeURI() is unnecessary since it accepts both flavors
Base64.decode('5bCP6aO85by-');// 小飼弾
```

# lyric-parser的一些API
## Usage
```
 import Lyric from 'lyric-parser'
 let lyric = new Lyric(lyricStr, handler)

 function hanlder({lineNum, txt}){
   // this hanlder called when lineNum change
 }
```
其中Lyric的值为下:
```
curLine: 0
curNum: 2
handler: ƒ ()
lines: [{time(毫秒做单位): 740,txt: "Lyrics by：Jesper Borgen/Anders Froen/Gunnar Greve/Alan Walker"}...]Array(70)
lrc: "[ti:Faded]↵[ar:Alan Walker]↵[al:Faded]↵[by:]↵[offset:0]↵[00:00.00]Faded - Alan Walker (艾兰·沃克)/Iselin Solheim↵[00:00.74]..."
pauseStamp: 1598516041688
startStamp: 1598516040837
state: 0
tags: Object
timer: 348
```
## API
>play() play the lyric
stop() stop play
seek(startTime) seek to correspond starTime
togglePlay() toggle play state

# 动画实现
拿播放页面的全屏页来说:用了create-keyframe-animation,CSS3的动画,transition
- 全屏页(normal)的top和bottom的进出场动画由transtion的name属性配合CSS3实现
- 全屏页(normal)的cdWrapper进场动画通过transition的钩子函数配合create-keyframe-animation实现
- 全屏页(normal)的cdWrapper出场动画通过transition的钩子函数配合JS操作DOM的style(即js操作CSS3)实现
```
<div class="player" v-show="playlist.length>0">
    <transition name="normal"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave">
                    <div class="normal-player" v-show="fullScreen">
                        <div class="background">
                            <img width="100%" height="100%" :src="currentSong.image">
                        </div>
                        <div class="top">...</div>
                        <div class="middle">
                            <div class="middle-l" ref="middleL">...</div>
                        </div>
                        <div class="bottom">...</div>
                    ...
                    </div>
    </transition>
    <transition name="mini">...</transition>
</div>
...
import { Vue, Component } from 'vue-property-decorator'
import animations from 'create-keyframe-animation'
@Component({})
class XXX extends Vue{
    ...
    private enter (el: HTMLElement, done: Function) {
      const { x, y, scale } = this._getPosAndScale()
      const animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: 'translate3d(0,0,0) scale(1.1)'
        },
        100: {
          transform: 'translate3d(0,0,0) scale(1)'
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 2000,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    }

    private afterEnter () {
      animations.unregisterAnimation('move');
      (this.$refs.cdWrapper as HTMLElement).style.animation = ''
    }

    private leave (el: HTMLElement, done: any) {
      (this.$refs.cdWrapper as HTMLElement).style.transition = 'all 2s'
      const { x, y, scale } = this._getPosAndScale();
      (this.$refs.cdWrapper as HTMLElement).style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      (this.$refs.cdWrapper as HTMLElement).addEventListener('transitionend', done)
    }

    private afterLeave () {
      (this.$refs.cdWrapper as HTMLElement).style.transition = '';
      (this.$refs.cdWrapper as HTMLElement).style[transform] = ''
    }
}
<style scoped lang="stylus" rel="stylesheet/stylus">
.player
    .normal-player
        ...
        &.normal-enter-active, &.normal-leave-active
            transition: all 5s
            .top, .bottom
            transition: all 1s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        &.normal-enter, &.normal-leave-to
            opacity: 0
            .top
            transform: translate3d(0, -100px, 0)
            .bottom
            transform: translate3d(0, 100px, 0)
    .mini-player
        ...
        &.mini-enter-active, &.mini-leave-active
            transition: all 2s
        &.mini-enter, &.mini-leave-to
            opacity: 0
</style>
```

获取歌曲的播放链接:getplaysongvkey根据mid获取vkey然后拼接成url`http://dl.stream.qqmusic.qq.com/${vkey}`
获取歌词:getLyric根据mid获取lyric然后用js-base64的decode解码
