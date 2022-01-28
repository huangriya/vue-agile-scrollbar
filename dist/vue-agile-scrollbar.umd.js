(function(n,a){typeof exports=="object"&&typeof module!="undefined"?module.exports=a():typeof define=="function"&&define.amd?define(a):(n=typeof globalThis!="undefined"?globalThis:n||self,n["vue-agile-scrollbar"]=a())})(this,function(){"use strict";var n={minBarSize:{type:Number,default:50},scrollTop:{type:[Number,Function],default:0},scrollLeft:{type:[Number,Function],default:0},displayType:{type:String,default:"hover"},offsetLeft:{type:Number,default:0},offsetRight:{type:Number,default:10},offsetTop:{type:Number,default:0},offsetBottom:{type:Number,default:10},isAutoUpdate:{type:Boolean,default:!0},dragSpeedX:{type:Number,default:1},dragSpeedY:{type:Number,default:1}},a=function(){var t=this,l=t.$createElement,s=t._self._c||l;return s("div",{ref:"scrollBox",staticClass:"vue-agile-scrollbar",class:{"not-user-select":t.scrollBarX.clientX||t.scrollBarY.clientY,"scrollbar-hover":t.displayType==="hover","scrollbar-hide":t.displayType==="hide"}},[s("div",{ref:"scroll",staticClass:"agile-scroll-content",on:{scroll:t.onScroll}},[s("div",{ref:"scrollContent",staticClass:"agile-scroll-wrapper"},[t._t("default")],2)]),t.scrollBarX.show?s("div",{staticClass:"agile-scroll-bar-x",class:{act:t.scrollBarX.clientX||t.scrollBarY.clientY},style:{left:t.scrollBarX.left+"px",width:t.scrollBarX.width+"px",bottom:t.scrollBarX.bottom},on:{mousedown:function(e){return t.scrollBarDown(e,"scrollBarX")}}}):t._e(),t.scrollBarY.show?s("div",{staticClass:"agile-scroll-bar-y",class:{act:t.scrollBarY.clientY||t.scrollBarX.clientX},style:{top:t.scrollBarY.top+"px",height:t.scrollBarY.height+"px"},on:{mousedown:function(e){return t.scrollBarDown(e,"scrollBarY")}}}):t._e()])},B=[],w="";function g(t,l,s,e,i,h,d,X){var o=typeof t=="function"?t.options:t;l&&(o.render=l,o.staticRenderFns=s,o._compiled=!0),e&&(o.functional=!0),h&&(o._scopeId="data-v-"+h);var c;if(d?(c=function(r){r=r||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!r&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(r=__VUE_SSR_CONTEXT__),i&&i.call(this,r),r&&r._registeredComponents&&r._registeredComponents.add(d)},o._ssrRegister=c):i&&(c=X?function(){i.call(this,(o.functional?this.parent:this).$root.$options.shadowRoot)}:i),c)if(o.functional){o._injectStyles=c;var Y=o.render;o.render=function(b,p){return c.call(p),Y(b,p)}}else{var u=o.beforeCreate;o.beforeCreate=u?[].concat(u,c):[c]}return{exports:t,options:o}}const m={name:"vueAgileScrollBar",props:n,data(){return{scrollBarY:{show:!0,clientY:null,height:0,top:this.offsetTop,multiple:1},scrollBarX:{show:!0,clientX:null,width:0,bottom:0,left:this.offsetLeft,multiple:1},scrollWidth:0,scrollHeight:0,scrollContentWidth:0,scrollContentHeight:0}},watch:{offsetLeft(){this.setScrollBarLeft()},offsetRight(){this.setScrollBarLeft()},offsetTop(){this.setScrollBarTop()},offsetBottom(){this.setScrollBarTop()}},mounted(){this.$scrollBox=this.$refs.scrollBox,this.$scroll=this.$refs.scroll,this.$scrollContent=this.$refs.scrollContent,this.updated(),this.isAutoUpdate&&(this.observer=new MutationObserver(this.updated),this.observer.observe(this.$refs.scrollContent,{attributes:!0,childList:!0,subtree:!0})),this.addDragEvent()},methods:{initContainer(){this.scrollWidth=this.$scrollBox.offsetWidth,this.scrollHeight=this.$scrollBox.offsetHeight,this.scrollContentWidth=this.$scrollContent.offsetWidth,this.scrollContentHeight=this.$scrollContent.offsetHeight},initScrollBar(){if(this.scrollContentWidth>this.scrollWidth){const t=this.scrollWidth-(this.scrollContentWidth-this.scrollWidth)-this.offsetLeft-this.offsetRight;this.scrollBarX.show=!0,this.scrollBarX.width=t<this.minBarSize?this.minBarSize:t,this.scrollBarX.multiple=(this.scrollContentWidth-this.scrollWidth)/(this.scrollWidth-this.scrollBarX.width-this.offsetLeft-this.offsetRight)}else this.scrollBarX.show=!1;if(this.scrollContentHeight>this.scrollHeight){const t=this.scrollHeight-(this.scrollContentHeight-this.scrollHeight)-this.offsetTop-this.offsetBottom;this.scrollBarY.show=!0,this.scrollBarY.height=t<this.minBarSize?this.minBarSize:t,this.scrollBarY.multiple=(this.scrollContentHeight-this.scrollHeight)/(this.scrollHeight-this.scrollBarY.height-this.offsetTop-this.offsetBottom),this.scrollBarX.bottom=0}else this.scrollBarY.show=!1,this.scrollBarX.bottom=this.scrollHeight-this.scrollContentHeight+"px"},updated(){this.initContainer(),this.initScrollBar(),this.$emit("updated",{scrollBarY:this.scrollBarY.show,scrollBarX:this.scrollBarX.show,top:this.$scroll.scrollTop,left:this.$scroll.scrollLeft,scrollWidth:this.scrollWidth,scrollHeight:this.scrollHeight,scrollContentWidth:this.scrollContentWidth,scrollContentHeight:this.scrollContentHeight})},setScrollBarLeft(){const t=this.$scroll.scrollLeft,l=this.offsetLeft+Math.floor(t/this.scrollBarX.multiple);return l!==this.scrollBarX.left&&(this.scrollBarX.left=l),t},setScrollBarTop(){const t=this.$scroll.scrollTop,l=this.offsetTop+Math.floor(t/this.scrollBarY.multiple);return l!==this.scrollBarY.top&&(this.scrollBarY.top=l),t},onScroll(t){const l=this.setScrollBarTop(),s=this.setScrollBarLeft();this.$emit("scroll",{top:l,left:s,scrollWidth:this.scrollWidth,scrollHeight:this.scrollHeight,scrollContentWidth:this.scrollContentWidth,scrollContentHeight:this.scrollContentHeight},t),this._events["scroll-hit"]&&this.onScrollHit(l,s)},onScrollHit(t,l){let s="top",e=t-this.initTop,i=l-this.initLeft;this.initTop=t,this.initLeft=l;const h=()=>{this.$emit("scroll-hit",s,{top:t,left:l,scrollWidth:this.scrollWidth,scrollHeight:this.scrollHeight,scrollContentWidth:this.scrollContentWidth,scrollContentHeight:this.scrollContentHeight})};e!==0&&this.scrollBarY.height&&(e<0?s="top":s="bottom",this.scrollContentHeight-this.scrollHeight-t==0&&h(),t===0&&s==="top"&&h()),i!==0&&this.scrollBarX.width&&(i<0?s="left":s="right",l===0&&s==="left"||this.scrollContentWidth-this.scrollWidth-l==0||(s="xMiddle"),h())},scrollBarDown(t,l){l==="scrollBarX"&&(this.scrollBarX.clientX=t.clientX,this.scrollBarX.scrollLeft=this.$scroll.scrollLeft),l==="scrollBarY"&&(this.scrollBarY.clientY=t.clientY,this.scrollBarY.scrollTop=this.$scroll.scrollTop),window.addEventListener("mousemove",this.scrollBarDrag)},scrollBarDrag(t){const l=this.scrollBarX.clientX,s=this.scrollBarY.clientY;if(l){let e=t.clientX-l;this.$scroll.scrollLeft=this.scrollBarX.scrollLeft+e*(this.scrollBarX.multiple*this.dragSpeedX)}if(s){let e=t.clientY-s;this.$scroll.scrollTop=this.scrollBarY.scrollTop+e*this.scrollBarY.multiple*this.dragSpeedY}},scrollBarUp(){this.scrollBarX.clientX=null,this.scrollBarY.clientY=null,window.removeEventListener("mousemove",this.scrollBarDrag)},addDragEvent(){window.addEventListener("mouseup",this.scrollBarUp)},removeDragEvent(){window.removeEventListener("mouseup",this.scrollBarUp)}},beforeDestroy(){this.isAutoUpdate&&this.observer&&this.observer.disconnect(),this.removeDragEvent()}},f={};var v=g(m,a,B,!1,C,null,null,null);function C(t){for(let l in f)this[l]=f[l]}var _=function(){return v.exports}();return _});
