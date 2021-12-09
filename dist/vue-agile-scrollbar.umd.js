(function(h,a){typeof exports=="object"&&typeof module!="undefined"?module.exports=a():typeof define=="function"&&define.amd?define(a):(h=typeof globalThis!="undefined"?globalThis:h||self,h["vue-agile-scrollbar"]=a())})(this,function(){"use strict";var h={minBarSize:{type:Number,default:50},scrollTop:{type:[Number,Function],default:0},scrollLeft:{type:[Number,Function],default:0},offsetLeft:{type:Number,default:0},offsetRight:{type:Number,default:10},offsetTop:{type:Number,default:0},offsetBottom:{type:Number,default:10},offsetHit:{type:Number,default:10},isAutoUpdate:{type:Boolean,default:!0}},a=function(){var t=this,l=t.$createElement,s=t._self._c||l;return s("div",{staticClass:"vue-agile-scrollbar",class:{"not-user-select":t.scrollBarX.clientX||t.scrollBarY.clientY}},[s("div",{ref:"scroll",staticClass:"agile-scroll-content",on:{scroll:t.onScroll}},[s("div",{ref:"scrollContent",staticClass:"agile-scroll-wrapper"},[t._t("default")],2)]),s("div",{staticClass:"agile-scroll-bar-x",class:{act:t.scrollBarX.clientX||t.scrollBarY.clientY},style:{left:t.scrollBarX.left+"px",width:t.scrollBarX.width+"px"},on:{mousedown:function(e){return t.scrollBarDown(e,"scrollBarX")}}}),s("div",{staticClass:"agile-scroll-bar-y",class:{act:t.scrollBarY.clientY||t.scrollBarX.clientX},style:{top:t.scrollBarY.top+"px",height:t.scrollBarY.height+"px"},on:{mousedown:function(e){return t.scrollBarDown(e,"scrollBarY")}}})])},B=[],$="";function v(t,l,s,e,o,c,u,X){var i=typeof t=="function"?t.options:t;l&&(i.render=l,i.staticRenderFns=s,i._compiled=!0),e&&(i.functional=!0),c&&(i._scopeId="data-v-"+c);var n;if(u?(n=function(r){r=r||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!r&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(r=__VUE_SSR_CONTEXT__),o&&o.call(this,r),r&&r._registeredComponents&&r._registeredComponents.add(u)},i._ssrRegister=n):o&&(n=X?function(){o.call(this,(i.functional?this.parent:this).$root.$options.shadowRoot)}:o),n)if(i.functional){i._injectStyles=n;var Y=i.render;i.render=function(b,p){return n.call(p),Y(b,p)}}else{var d=i.beforeCreate;i.beforeCreate=d?[].concat(d,n):[n]}return{exports:t,options:i}}const m={props:h,data(){return{scrollBarY:{clientY:null,height:0,top:this.offsetTop,multiple:1},scrollBarX:{clientX:null,width:0,left:this.offsetLeft,multiple:1},scrollWidth:0,scrollHeight:0,scrollContentWidth:0,scrollContentHeight:0}},mounted(){this.$scroll=this.$refs.scroll,this.$scrollContent=this.$refs.scrollContent,this.initContainer(),this.initScrollBar(),this.isAutoUpdate&&(this.observer=new MutationObserver(this.updated),this.observer.observe(this.$refs.scrollContent,{attributes:!0,childList:!0,subtree:!0})),this.addDragEvent()},methods:{initContainer(){this.scrollWidth=this.$scroll.offsetWidth,this.scrollHeight=this.$scroll.offsetHeight,this.scrollContentWidth=this.$scrollContent.offsetWidth,this.scrollContentHeight=this.$scrollContent.offsetHeight},initScrollBar(){if(this.scrollContentWidth>this.scrollWidth){const t=this.scrollWidth-(this.scrollContentWidth-this.scrollWidth);this.scrollBarX.width=t<this.minBarSize?this.minBarSize:t,this.scrollBarX.multiple=(this.scrollContentWidth-this.scrollWidth)/(this.scrollWidth-this.scrollBarX.width-this.offsetLeft-this.offsetRight)}if(this.scrollContentHeight>this.scrollHeight){const t=this.scrollHeight-(this.scrollContentHeight-this.scrollHeight);this.scrollBarY.height=t<this.minBarSize?this.minBarSize:t,this.scrollBarY.multiple=(this.scrollContentHeight-this.scrollHeight)/(this.scrollHeight-this.scrollBarY.height-this.offsetTop-this.offsetBottom)}},updated(){this.initContainer(),this.initScrollBar()},onScroll(t){const l=this.$scroll.scrollTop,s=this.$scroll.scrollLeft;this.scrollBarY.top=this.offsetTop+l/this.scrollBarY.multiple,this.scrollBarX.left=this.offsetLeft+s/this.scrollBarX.multiple,this.$emit("scroll",{top:l,left:s},t),this._events["scroll-hit"]&&this.onScrollHit(l,s)},onScrollHit(t,l){let s="top",e=t-this.initTop,o=l-this.initLeft;this.initTop=t,this.initLeft=l;const c=()=>{this.$emit("scroll-hit",s,{top:t,left:l})};e!==0&&this.scrollBarY.height&&(e<0?s="top":s="bottom",this.scrollContentHeight-this.scrollHeight-t==0&&c(),t===0&&s==="top"&&c()),o!==0&&this.scrollBarX.width&&(o<0?s="left":s="right",l===0&&s==="left"&&c(),this.scrollContentWidth-this.scrollWidth-l==0&&c())},scrollBarDown(t,l){l==="scrollBarX"&&(this.scrollBarX.clientX=t.clientX,this.scrollBarX.scrollLeft=this.$scroll.scrollLeft),l==="scrollBarY"&&(this.scrollBarY.clientY=t.clientY,this.scrollBarY.scrollTop=this.$scroll.scrollTop),window.addEventListener("mousemove",this.scrollBarDrag)},scrollBarDrag(t){const l=this.scrollBarX.clientX,s=this.scrollBarY.clientY;if(l){let e=t.clientX-l;this.$scroll.scrollLeft=this.scrollBarX.scrollLeft+e*this.scrollBarX.multiple}if(s){let e=t.clientY-s;this.$scroll.scrollTop=this.scrollBarY.scrollTop+e*this.scrollBarY.multiple}},scrollBarUp(){this.scrollBarX.clientX=null,this.scrollBarY.clientY=null,window.removeEventListener("mousemove",this.scrollBarDrag)},addDragEvent(){window.addEventListener("mouseup",this.scrollBarUp)},removeDragEvent(){window.removeEventListener("mouseup",this.scrollBarUp)}},beforeDestroy(){this.isAutoUpdate&&this.observer&&this.observer.disconnect(),this.removeDragEvent()}},f={};var g=v(m,a,B,!1,_,null,null,null);function _(t){for(let l in f)this[l]=f[l]}var C=function(){return g.exports}();return C});
