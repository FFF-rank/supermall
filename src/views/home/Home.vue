<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"/>
		<home-recommend :recommends="recommends"/>
		<home-feature/>
		<tab-control :titles="['流行','新款','精选']" class="home-tab-control"/>
		<ul>
			<li>列表1</li>
			<li>列表2</li>
			<li>列表3</li>
			<li>列表4</li>
			<li>列表5</li>
			<li>列表6</li>
			<li>列表7</li>
			<li>列表8</li>
			<li>列表9</li>
			<li>列表10</li>
			<li>列表11</li>
			<li>列表12</li>
			<li>列表13</li>
			<li>列表14</li>
			<li>列表15</li>
			<li>列表16</li>
			<li>列表17</li>
			<li>列表18</li>
			<li>列表19</li>
			<li>列表20</li>
			<li>列表21</li>
			<li>列表22</li>
			<li>列表23</li>
			<li>列表24</li>
			<li>列表25</li>
			<li>列表26</li>
			<li>列表27</li>
			<li>列表28</li>
			<li>列表29</li>
			<li>列表30</li>
		</ul>
	</div>
</template>

<script>
	import NavBar from "@/components/common/navbar/NavBar.vue"
	import TabControl from "@/components/content/tabcontrol/TabControl.vue"
	
	import HomeSwiper from "./childrenComps/HomeSwiper.vue"
	import HomeRecommend from "./childrenComps/HomeRecommend.vue"
	import HomeFeature from "./childrenComps/HomeFeature.vue"
	
	import {getHomeMultidata,getHomeGoods} from "@/network/home.js"
	
	export default{
		name:"Home",
		components:{
			NavBar,
			TabControl,
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
				}
			}
		},
		created(){
			this.getHomeMultidata();
			// 为什么要把这个函数封装到methods？因为要复用多次
			this.getHomeGoods('pop');
			// this.getHomeGoods('new');
			// this.getHomeGoods('sell');
		},
		methods:{
			getHomeMultidata(){
				getHomeMultidata().then(res => {
					this.banners=res.data.banner.list;
					this.recommends=res.data.recommend.list;
				});
			},
			getHomeGoods(type){
				const page=this.goods[type].page+1;
				getHomeGoods(type,page).then(res=>{
					console.log(res);
					this.goods[type].list.push(...res.data.list);
					console.log(this.goods[type].list);
					this.goods[type].page +=1;
				})
			}
		}
	}
</script>

<style scoped>
	#home{
		padding:44px 0 49px 0;
	}
	.home-nav{
		background-color: #FF5777;
		color:#fff;
		
		position:fixed;
		left:0;
		right:0;
		top:0;
		
		z-index:10;
	}
	.home-tab-control{
		position:sticky;
		top:44px;
		background-color: #fff;
	}
</style>
