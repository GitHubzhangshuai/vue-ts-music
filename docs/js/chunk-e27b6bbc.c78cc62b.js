(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e27b6bbc"],{"0075":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"recommend",staticClass:"recommend"},[i("keep-alive",[i("router-view",{key:e.key})],1),i("scroll",{ref:"scroll",staticClass:"recommend-content",attrs:{data:e.discList}},[i("div",[e.recommends.length?i("div",{ref:"sliderWrapper",staticClass:"slider-wrapper"},[i("slider",e._l(e.recommends,(function(t,a){return i("div",{key:a},[i("a",{attrs:{href:t.linkUrl}},[i("img",{staticClass:"needsclick",attrs:{src:t.picUrl},on:{load:e.loadImage}})])])})),0)],1):e._e(),i("div",{staticClass:"recommend-list"},[i("h1",{staticClass:"list-title"},[e._v("热门歌单推荐")]),i("ul",e._l(e.discList,(function(t,a){return i("li",{key:a,staticClass:"item",on:{click:function(i){return e.selectItem(t)}}},[i("div",{staticClass:"icon"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgurl,expression:"item.imgurl"}],attrs:{width:"60",height:"60"}})]),i("div",{staticClass:"text"},[i("h2",{staticClass:"name",domProps:{innerHTML:e._s(t.creator.name)}}),i("p",{staticClass:"desc",domProps:{innerHTML:e._s(t.dissname)}})])])})),0)])]),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.discList.length,expression:"!discList.length"}],staticClass:"loader-container"},[i("loading")],1)])],1)},s=[],r=i("d4ec"),n=i("bee2"),c=i("262e"),o=i("2caf"),l=i("9ab4"),d=i("60a3"),u=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"slider",staticClass:"slider"},[i("div",{ref:"sliderGroup",staticClass:"slider-group"},[e._t("default")],2),i("div",{staticClass:"dots"},e._l(e.dots,(function(t,a){return i("span",{key:a,staticClass:"dot",class:{active:e.currentPageIndex===a}})})),0)])},f=[],h=(i("a630"),i("a9e3"),i("3ca3"),i("ab68")),m=i("1fba"),v=function(e){Object(c["a"])(i,e);var t=Object(o["a"])(i);function i(){var e;return Object(r["a"])(this,i),e=t.apply(this,arguments),e.dots=[],e.currentPageIndex=0,e}return Object(n["a"])(i,[{key:"mounted",value:function(){var e=this;setTimeout((function(){e._setSliderWidth(),e._initDots(),e._initSlider(),e.autoPlay&&e._play()}),20),window.addEventListener("resize",(function(){e.slider&&(e._setSliderWidth(!0),e.slider.refresh())}))}},{key:"activated",value:function(){this.autoPlay&&this._play()}},{key:"deactivated",value:function(){clearTimeout(this.timer)}},{key:"beforeDestory",value:function(){clearTimeout(this.timer)}},{key:"_setSliderWidth",value:function(e){this.children=Array.from(this.$refs.sliderGroup.children);for(var t=0,i=this.$refs.slider.clientWidth,a=0;a<this.children.length;a++){var s=this.children[a];Object(h["a"])(s,"slider-item"),s.style.width=i+"px",t+=i}this.loop&&!e&&(t+=2*i),this.$refs.sliderGroup.style.width=t+"px"}},{key:"_initSlider",value:function(){var e=this;this.slider=new m["a"](this.$refs.slider,{scrollX:!0,scrollY:!1,momentum:!1,snap:{loop:this.loop,threshold:.3,speed:400}}),this.slider.on("scrollEnd",(function(){var t=e.slider.getCurrentPage().pageX;e.currentPageIndex=t,e.autoPlay&&e._play()})),this.slider.on("beforeScrollStart",(function(){e.autoPlay&&clearTimeout(e.timer)}))}},{key:"_initDots",value:function(){this.dots=new Array(this.children.length)}},{key:"_play",value:function(){var e=this,t=this.currentPageIndex+1;this.loop&&(t+=1),this.timer=setTimeout((function(){e.slider.goToPage(t,0,400)}),this.interval)}}]),i}(d["d"]);Object(l["a"])([Object(d["c"])({type:Boolean,default:!0})],v.prototype,"loop",void 0),Object(l["a"])([Object(d["c"])({type:Boolean,default:!0})],v.prototype,"autoPlay",void 0),Object(l["a"])([Object(d["c"])({type:Number,default:4e3})],v.prototype,"interval",void 0),v=Object(l["a"])([Object(d["a"])({name:"slider",components:{}})],v);var p=v,y=p,b=(i("aab4"),i("2877")),g=Object(b["a"])(y,u,f,!1,null,"79026ac3",null),j=g.exports,k=i("54a1"),O=i("ef39"),_=i("d89f"),w=i("0d6f"),C=i("4bb5"),P=function(e){Object(c["a"])(i,e);var t=Object(o["a"])(i);function i(){var e;return Object(r["a"])(this,i),e=t.apply(this,arguments),e.recommends=[],e.discList=[],e}return Object(n["a"])(i,[{key:"created",value:function(){this._getRecommend(),this._getDiscList()}},{key:"handlePlaylist",value:function(e){var t=e.length>0?"60px":"";this.$refs.recommend.style.bottom=t,this.$refs.scroll.refresh()}},{key:"loadImage",value:function(){this.checkloaded||(this.checkloaded=!0,this.$refs.scroll.refresh())}},{key:"selectItem",value:function(e){this.$router.push({path:"/recommend/".concat(e.dissid)}),this.setDisc(e)}},{key:"_getRecommend",value:function(){var e=this;Object(w["b"])().then((function(t){t.code===_["a"]&&(e.recommends=t.data.slider)}))}},{key:"_getDiscList",value:function(){var e=this;Object(w["a"])().then((function(t){t.code===_["a"]&&(e.discList=t.data.list)}))}},{key:"key",get:function(){return this.$route.path}}]),i}(d["d"]);Object(l["a"])([Object(C["c"])("SET_DISC")],P.prototype,"setDisc",void 0),P=Object(l["a"])([Object(d["a"])({components:{Slider:j,Loading:k["a"],Scroll:O["a"]}})],P);var x=P,L=x,S=(i("ab5a"),Object(b["a"])(L,a,s,!1,null,"5c2567a4",null));t["default"]=S.exports},"0d6f":function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"a",(function(){return c})),i.d(t,"c",(function(){return o}));i("d3b7");var a=i("1888"),s=i("d89f"),r=i("2c75");function n(){var e="https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",t=Object.assign({},s["b"],{platform:"h5",uin:0,needNewCode:1});return Object(a["a"])(e,t,s["c"])}function c(){var e="/api/getDiscList",t=Object.assign({},s["b"],{platform:"yqq",hostUin:0,sin:0,ein:29,sortId:5,needNewCode:0,categoryId:1e7,rnd:Math.random(),format:"json"});return r["a"].get(e,{params:t}).then((function(e){return Promise.resolve(e.data)}))}function o(e){var t="api/getSongList",i=Object.assign({},s["b"],{disstid:e,type:1,json:1,utf8:1,onlysong:0,platform:"yqq",hostUin:0,needNewCode:0,format:"json"});return r["a"].get(t,{params:i}).then((function(e){return Promise.resolve(e.data)}))}},"4df4":function(e,t,i){"use strict";var a=i("0366"),s=i("7b0b"),r=i("9bdd"),n=i("e95a"),c=i("50c4"),o=i("8418"),l=i("35a1");e.exports=function(e){var t,i,d,u,f,h,m=s(e),v="function"==typeof this?this:Array,p=arguments.length,y=p>1?arguments[1]:void 0,b=void 0!==y,g=l(m),j=0;if(b&&(y=a(y,p>2?arguments[2]:void 0,2)),void 0==g||v==Array&&n(g))for(t=c(m.length),i=new v(t);t>j;j++)h=b?y(m[j],j):m[j],o(i,j,h);else for(u=g.call(m),f=u.next,i=new v;!(d=f.call(u)).done;j++)h=b?r(u,y,[d.value,j],!0):d.value,o(i,j,h);return i.length=j,i}},8753:function(e,t,i){},a630:function(e,t,i){var a=i("23e7"),s=i("4df4"),r=i("1c7e"),n=!r((function(e){Array.from(e)}));a({target:"Array",stat:!0,forced:n},{from:s})},aab4:function(e,t,i){"use strict";var a=i("ca36"),s=i.n(a);s.a},ab5a:function(e,t,i){"use strict";var a=i("8753"),s=i.n(a);s.a},ca36:function(e,t,i){}}]);
//# sourceMappingURL=chunk-e27b6bbc.c78cc62b.js.map