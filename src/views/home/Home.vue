<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control :titles="['流行','新款','精选']" class="home-tab-control fixed" @tabClick="tabClick" v-show="isInTop" ref="homeTabControl1"/>
		<scroll class="home-content" 
						ref="scroll" 
						:probeType="3" 
						@scroll="contentScroll"
						:pullUpLoad="true" 
						@pullingUp="contentPullingUp">
			<home-swiper :banners="banners"/>
			<home-recommend :recommends="recommends"/>
			<home-feature class="home-feature"/>
			<tab-control :titles="['流行','新款','精选']" class="home-tab-control" @tabClick="tabClick" ref="homeTabControl2"/>
			<goods-list :goods="showGoods"/>
		</scroll>
		<back-top @click.native="backTop" class="home-back-top" v-show="backTopShow"/>
	</div>
</template>

<script>
	import NavBar from "@/components/common/navbar/NavBar.vue"
	import Scroll from "@/components/common/scroll/Scroll.vue"
	import TabControl from "@/components/content/tabcontrol/TabControl.vue"
	import GoodsList from "@/components/content/goods/GoodsList.vue"
	import BackTop from "@/components/content/backtop/BackTop.vue"
	
	import HomeSwiper from "./childrenComps/HomeSwiper.vue"
	import HomeRecommend from "./childrenComps/HomeRecommend.vue"
	import HomeFeature from "./childrenComps/HomeFeature.vue"
	
	import {getHomeMultidata,getHomeGoods} from "@/network/home.js"
	import {debounce} from "@/common/utils.js"
	
	export default{
		name:"Home",
		components:{
			NavBar,
			Scroll,
			TabControl,
			GoodsList,
			BackTop,
			HomeSwiper,
			HomeRecommend,
			HomeFeature
		},
		data(){
			return {
				banners:[],
				recommends:[],
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]},
				},
				currentType:'pop',
				backTopShow:false,
				isInTop:false,
				tabOffsetTop:NaN,
			}
		},
		created(){
			this.getHomeMultidata();
			// 为什么要把这个函数封装到methods？因为要复用多次
			this.getHomeGoods('pop');
			this.getHomeGoods('new');
			this.getHomeGoods('sell');
		},
		mounted(){
			// 从事件总线获取图片加载完成事件
			// 节流，不一定要加
			// const refresh=debounce(this.$refs.scroll.refresh,100);
			this.$bus.$on('homeLoad',()=>{
				// refresh();
				// console.log(this.$refs.scroll);
				this.$refs.scroll.refresh();
			});
			// this.tabOffsetTop=this.$refs.homeTabControl2.$el.offsetTop;
			// 视频里的方法太取巧了，实际工作中上面元素的高度应该是固定的，这里就先写死吧
			// setTimeout(()=>{
			// 	console.log(this.$refs.homeTabControl2.$el.offsetTop);
			// },3000);
			this.tabOffsetTop=602;
		},
		methods:{
			// 网络请求相关方法
			getHomeMultidata(){
				getHomeMultidata().then(res => {
					this.banners=res.data.banner.list;
					this.recommends=res.data.recommend.list;
				});
			},
			getHomeGoods(type){
				const page=this.goods[type].page+1;
				getHomeGoods(type,page).then(res=>{
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page +=1;
					this.$refs.scroll.finishPullUp();
				})
			},
			// 事件监听相关方法
			tabClick(index){
				switch(index){
					case 0:
						this.currentType='pop';
						break;
					case 1:
						this.currentType='new';
						break;
					case 2:
						this.currentType='sell';
						break;
				};
				this.$refs.homeTabControl1.currentIndex=index;
				this.$refs.homeTabControl2.currentIndex=index;
				this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,0);
			},
			backTop(){
				this.$refs.scroll.scrollTo(0,0,1000);
			},
			contentScroll(position){
				this.backTopShow=(position.y <= -this.$refs.scroll.scroll.wrapper.offsetHeight);
				this.isInTop=(position.y <= -this.tabOffsetTop);
				// console.log(this.$refs.homeTabControl2.$el.offsetTop);
			},
			contentPullingUp(){
				this.getHomeGoods(this.currentType);
			},
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		}
	}
</script>

<style scoped>
	#home{
		position: relative;
	}
	.home-nav{
		background-color: #FF5777;
		color:#fff;
		font-size:24px;
		
		position:fixed;
		left:0;
		right:0;
		top:0;
		
		z-index:10;
	}
	.home-feature{
		border-bottom:#eee solid 5px;
	}
	.home-tab-control{
		/* position:sticky;
		top:44px; */
		background-color: #fff;
		z-index:9;
		font-weight: 700;
	}
	.home-tab-control.fixed{
		position:fixed;
		top:44px;
		left:0;
		right:0;
	}
	.home-back-top{
		z-index:10;
	}
	.home-content{
		height: calc(100vh - 44px - 49px);
		position:fixed;
		top:44px;
		left:0;
		right:0;
	}
</style>
