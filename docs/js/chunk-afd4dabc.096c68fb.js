(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-afd4dabc"],{3173:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"slide"}},[s("music-list",{attrs:{title:t.title,"bg-image":t.bgImage,songs:t.songs}})],1)},i=[],n=(s("4160"),s("b0c0"),s("159b"),s("d4ec")),c=s("bee2"),l=s("262e"),r=s("2caf"),o=s("9ab4"),g=s("5362"),b=s("4f0d"),u=s("d89f"),f=s("b5fc"),h=s("60a3"),d=s("4bb5"),p=function(t){Object(l["a"])(s,t);var e=Object(r["a"])(s);function s(){var t;return Object(n["a"])(this,s),t=e.apply(this,arguments),t.songs=[],t}return Object(c["a"])(s,[{key:"created",value:function(){this._getDetail()}},{key:"_getDetail",value:function(){var t=this;this.singer.id?Object(b["a"])(this.singer.id).then((function(e){e.code===u["a"]&&(console.log(e.data.list),t.songs=t._normalizeSongs(e.data.list))})):this.$router.push("/singer")}},{key:"_normalizeSongs",value:function(t){var e=[];return t.forEach((function(t){var s=t.musicData;s.songid&&s.albummid&&e.push(Object(f["b"])(s))})),e}},{key:"title",get:function(){return this.singer.name}},{key:"bgImage",get:function(){return this.singer.avatar}}]),s}(h["d"]);Object(o["a"])([Object(d["b"])("singer")],p.prototype,"singer",void 0),p=Object(o["a"])([Object(h["a"])({components:{MusicList:g["a"]}})],p);var y=p,m=y,v=(s("59e8"),s("2877")),j=Object(v["a"])(m,a,i,!1,null,"397410b6",null);e["default"]=j.exports},"4f0d":function(t,e,s){"use strict";s.d(e,"b",(function(){return n})),s.d(e,"a",(function(){return c}));var a=s("1888"),i=s("d89f");function n(){var t="https://c.y.qq.com/v8/fcg-bin/v8.fcg",e=Object.assign({},i["b"],{channel:"singer",page:"list",key:"all_all_all",pagesize:100,pagenum:1,hostUin:0,needNewCode:0,platform:"yqq"});return Object(a["a"])(t,e,i["c"])}function c(t){var e="https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",s=Object.assign({},i["b"],{hostUin:0,needNewCode:0,platform:"yqq",order:"listen",begin:0,num:80,songstatus:1,singermid:t});return Object(a["a"])(e,s,i["c"])}},5362:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"music-list"},[s("div",{staticClass:"back",on:{click:t.back}},[s("i",{staticClass:"icon-back"})]),s("h1",{staticClass:"title",domProps:{innerHTML:t._s(t.title)}}),s("div",{ref:"bgImage",staticClass:"bg-image",style:t.bgStyle},[s("div",{staticClass:"play-wrapper"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.songs.length>0,expression:"songs.length>0"}],ref:"playBtn",staticClass:"play",on:{click:t.random}},[s("i",{staticClass:"icon-play"}),s("span",{staticClass:"text"},[t._v("随机播放全部")])])]),s("div",{ref:"filter",staticClass:"filter"})]),s("div",{ref:"layer",staticClass:"bg-layer"}),s("scroll",{ref:"list",staticClass:"list",attrs:{data:t.songs,"listen-scroll":t.listenScroll,"probe-type":t.probeType},on:{scroll:t.scroll}},[s("div",{staticClass:"song-list-wrapper"},[s("song-list",{attrs:{songs:t.songs,rank:t.rank},on:{select:t.selectItem}})],1),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.songs.length,expression:"!songs.length"}],staticClass:"loading-container"},[s("loading")],1)])],1)},i=[],n=(s("4de4"),s("d4ec")),c=s("bee2"),l=s("262e"),r=s("2caf"),o=s("9ab4"),g=s("ef39"),b=s("54a1"),u=s("ab68"),f=s("7920"),h=s("4bb5"),d=s("1b7b"),p=s("6e21"),y=s("60a3"),m=40,v=Object(u["c"])("transform"),j=Object(u["c"])("backdropFilter"),O=function(t){Object(l["a"])(s,t);var e=Object(r["a"])(s);function s(){var t;return Object(n["a"])(this,s),t=e.apply(this,arguments),t.scrollY=0,t}return Object(c["a"])(s,[{key:"created",value:function(){this.probeType=3,this.listenScroll=!0}},{key:"mounted",value:function(){this.imageHeight=this.$refs.bgImage.clientHeight,this.minTranslateY=-this.imageHeight+m,this.$refs.list.$el.style.top="".concat(this.imageHeight,"px")}},{key:"handlePlaylist",value:function(t){var e=t.length>0?"60px":"";this.$refs.list.$el.style.bottom=e,this.$refs.list.refresh()}},{key:"selectItem",value:function(t,e){var s=this;Object(p["b"])(t.mid).then((function(t){var a="http://dl.stream.qqmusic.qq.com/".concat(t);console.log(a),s.setPlaylistUrl({index:e,url:a})})),this.selectPlay({list:this.songs,index:e})}},{key:"scroll",value:function(t){this.scrollY=t.y}},{key:"back",value:function(){this.$router.back()}},{key:"random",value:function(){this.randomPlay({list:this.songs})}},{key:"scrollYChanged",value:function(t){var e=Math.max(this.minTranslateY,t),s=1,a=0,i=0,n=Math.abs(t/this.imageHeight);t>0?(s=1+n,a=10):i=Math.min(20,20*n),this.$refs.layer.style[v]="translate3d(0,".concat(e,"px,0"),this.$refs.filter.style[j]="blur(".concat(i,"px)"),t<this.minTranslateY?(a=10,this.$refs.bgImage.style.paddingTop="0",this.$refs.bgImage.style.height="".concat(m,"px"),this.$refs.playBtn.style.display="none"):(this.$refs.bgImage.style.paddingTop="70%",this.$refs.bgImage.style.height="0",this.$refs.playBtn.style.display=""),this.$refs.bgImage.style[v]="scale(".concat(s,")"),this.$refs.bgImage.style.zIndex=a+""}},{key:"bgStyle",get:function(){return"background-image:url(".concat(this.bgImage,")")}}]),s}(d["b"]);Object(o["a"])([Object(h["a"])("selectPlay")],O.prototype,"selectPlay",void 0),Object(o["a"])([Object(h["a"])("randomPlay")],O.prototype,"randomPlay",void 0),Object(o["a"])([Object(h["c"])("SET_PLAYLIST_URL")],O.prototype,"setPlaylistUrl",void 0),Object(o["a"])([Object(y["c"])({type:String,default:""})],O.prototype,"bgImage",void 0),Object(o["a"])([Object(y["c"])({type:Array,default:function(){return[]}})],O.prototype,"songs",void 0),Object(o["a"])([Object(y["c"])({type:String,default:""})],O.prototype,"title",void 0),Object(o["a"])([Object(y["c"])({type:Boolean,default:!1})],O.prototype,"rank",void 0),Object(o["a"])([Object(y["e"])("scrollY")],O.prototype,"scrollYChanged",null),O=Object(o["a"])([Object(y["a"])({components:{Scroll:g["a"],Loading:b["a"],SongList:f["a"]}})],O);var k=O,$=k,C=(s("7f98"),s("2877")),_=Object(C["a"])($,a,i,!1,null,"a6af0a3e",null);e["a"]=_.exports},"59e8":function(t,e,s){"use strict";var a=s("7010"),i=s.n(a);i.a},"6b2a":function(t,e,s){},7010:function(t,e,s){},"7f98":function(t,e,s){"use strict";var a=s("6b2a"),i=s.n(a);i.a}}]);
//# sourceMappingURL=chunk-afd4dabc.096c68fb.js.map