<template>
	<div id="detail" :key="this.$route.params.iid">
		<detail-nav-bar @goodClick="goodClick" 
										@paramsClick="paramsClick" 
										@rateClick="rateClick" 
										@recommendsClick="recommendsClick" 
										:currentIndex="currentIndex"/>
		<scroll class="detail-content" 
						ref="scroll" 
						:probeType="3" 
						@scroll="contentScroll">
			<div class="detail-good" @goodClick="goodClick" ref="detailGood">
				<detail-swiper :banners="topImages" ref="swiper"/>
				<detail-base-info :goods="goods"/>
				<detail-shop-info :shops="shops"/>
				<detail-images :detailImages="detailImages" />
			</div>
			<div class="detail-params" @paramsClick="paramsClick" ref="detailParams">
				<div class="rule">{{params.rule}}</div>
				<table>
					<tr v-for="item in params.ruleArray">
						<td v-for="itemAgain in item">{{itemAgain}}</td>
					</tr>
				</table>
				<div class="ruleMsg">{{params.ruleMsg}}</div>
				<div class="info">{{params.info}}</div>
				<div class="something">
					<div v-for="item in params.infoArray" class="something-item">
						<div>{{item.key}}</div>
						<div>{{item.value}}</div>
					</div>
				</div>
			</div>
			<div class="rate" @rateClick="rateClick" ref="rate">
				<div class="rate-title">
					<div>用户评价({{rate.count}})</div>
					<div>查看全部 ></div>
				</div>
				<div class="rate-item" ref="rateItem">
					<div class="user-msg">
						<img :src="rate.userLogo" class="user-logo">
						<div>{{rate.userName}}</div>
					</div>
					<div class="rate-content">{{rate.content}}</div>
					<div>
						<img  v-for="item in rate.images" :src="item" class="rate-photo">
					</div>
					<div class="rate-other">
						<div>{{rate.created|showDate}}</div>
						<div class="rate-style">{{rate.style}}</div>
					</div>
				</div>
			</div>
			<div class="recommends" @recommendsClick="recommendsClick" ref="recommends">
				<div class="recommends-title">- 推荐商品 -</div>
				<recommends-list :recommends="recommends"/>
			</div>
		</scroll>
		<detail-bottom-bar @addToCart="addToCart"/>
		<toast :message="toastMessage" v-show="isToastShow"></toast>
		<back-top class="detail-back-top" @click.native="backTop" v-show="backTopShow"/>
	</div>
</template>

<script>
	import DetailNavBar from "./childComps/DetailNavBar.vue"
	import DetailSwiper from "./childComps/DetailSwiper.vue"
	import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
	import DetailShopInfo from "./childComps/DetailShopInfo.vue"
	import DetailImages from "./childComps/DetailImages.vue"
	import RecommendsList from "./childComps/RecommendsList.vue"
	import DetailBottomBar from "./childComps/DetailBottomBar.vue"
	
	import Scroll from "@/components/common/scroll/Scroll.vue"
	import Toast from "@/components/common/toast/Toast.vue"
	import BackTop from "@/components/content/backtop/BackTop.vue"
	
	import {getDetail,Goods,Shops,getRecommend} from "@/network/detail.js"
	import {formatDate} from "@/common/utils.js"
	
	export default{
		name:"Detail",
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailImages,
			BackTop,
			Scroll,
			RecommendsList,
			DetailBottomBar,
			Toast
		},
		data(){
			return{
				iid:null,
				topImages:[],
				goods:{},
				shops:{},
				detailImages:[],
				backTopShow:false,
				params:{},
				rate:{},
				recommends:[],
				currentIndex:0,
				tempIndex:0,
				toastMessage:'√成功添加至购物车',
				isToastShow:false,
				toastHandle:null
			}
		},
		created(){
			this.iid=this.$route.params.iid;
			getDetail(this.iid).then(res=>{
				console.log(res);
				// 商品页渲染
				// 获取顶部轮播图数据
				this.topImages=res.result.itemInfo.topImages;
				// 获取商品信息
				this.goods=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
				// 获取商家信息
				this.shops=new Shops(res.result.shopInfo);
				// 获取详情图片
				this.detailImages=res.result.detailInfo.detailImage[0].list;
				
				// 参数页渲染
				// 获取商品尺码
				this.params.rule=res.result.itemParams.rule.key;
				this.params.ruleArray=res.result.itemParams.rule.tables[0];
				this.params.ruleMsg=res.result.itemParams.rule.disclaimer;
				// 获取商品详细参数
				this.params.info=res.result.itemParams.info.key;
				this.params.infoArray=res.result.itemParams.info.set;
				
				// 评价页渲染
				// 获取商品评价
				this.rate.count=res.result.rate.cRate;
				if(res.result.rate.list){
					this.rate.userLogo=res.result.rate.list[0].user.avatar;
					this.rate.userName=res.result.rate.list[0].user.uname;
					this.rate.content=res.result.rate.list[0].content;
					this.rate.style=res.result.rate.list[0].style;
					this.rate.created=res.result.rate.list[0].created;
				}else{
					this.$refs.rateItem.remove();
				};
				if(res.result.rate.list&&res.result.rate.list[0].images){
					this.rate.images=[res.result.rate.list[0].images[0],res.result.rate.list[0].images[1]];
				}
			});
			getRecommend().then(res=>{
				this.recommends=res.data.list;
				// console.log(this.recommends);
			})
		},
		mounted(){
			this.$bus.$on('detailLoad',()=>{
				this.$refs.scroll.refresh();
			});
		},
		destroyed(){
			// 在详情页被销毁时，移除图片加载的事件监听
			this.$bus.$off('detailLoad');
		},
		methods:{
			backTop(){
				this.$refs.scroll.scrollTo(0,0,1000);
			},
			contentScroll(position){
			// 返回顶部隐藏监听
				this.backTopShow=(position.y <= -this.$refs.scroll.$el.offsetHeight);
				if(position.y > -this.$refs.detailParams.offsetTop){
					this.tempIndex=0;
				}else if(position.y > -this.$refs.rate.offsetTop){
					this.tempIndex=1;
				}else if(position.y > -this.$refs.recommends.offsetTop){
					this.tempIndex=2;
				}else{
					this.tempIndex=3;
				};
				if(this.tempIndex != this.currentIndex){
					this.currentIndex=this.tempIndex;
					this.$bus.$emit('detailIndexChange',this.currentIndex);
				};
			},
			// 导航栏跳转监听
			goodClick(){
				this.$refs.scroll.scrollTo(0,-this.$refs.detailGood.offsetTop,0);
			},
			paramsClick(){
				this.$refs.scroll.scrollTo(0,-this.$refs.detailParams.offsetTop,0);
			},
			rateClick(){
				this.$refs.scroll.scrollTo(0,-this.$refs.rate.offsetTop,0);
			},
			recommendsClick(){
				this.$refs.scroll.scrollTo(0,-this.$refs.recommends.offsetTop,0);
			},
			addToCart(){
				// 获取购物车需要的商品信息
				const product={};
				product.image=this.topImages[0];
				product.title=this.goods.title;
				product.price=this.goods.realPrice;
				product.desc=this.goods.desc;
				product.iid=this.iid;
				product.count=1;
				this.$store.dispatch('addToCart',product).then(()=>{
					if(this.toastHandle){
						clearTimeout(this.toastHandle)
					};
					this.isToastShow=true;
					this.toastHandle=setTimeout(()=>{
						this.isToastShow=false;
					},1000);
				});
			}
		},
		filters:{
			showDate(value){
				// 将时间戳转换为字符串格式
				const date=new Date(value*1000);
				return formatDate(date);
			}
		},
		watch:{
			// 当路由的iid改变时刷新网页
			'$route.params.iid':function(newVal,oldVal){
				// console.log(this);
				// if(newVal != oldVal){
				// 	console.log(newVal,oldVal);
				// location.reload()
				// 把当前轮播图先清空，这样切换iid时可以马上开始新的轮播图
				this.$refs.swiper.banners.splice(0);
				this.iid=this.$route.params.iid;
				getDetail(this.iid).then(res=>{
					console.log(res);
					// 商品页渲染
					// 获取顶部轮播图数据
					this.topImages=res.result.itemInfo.topImages;
					// 获取商品信息
					this.goods=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
					// 获取商家信息
					this.shops=new Shops(res.result.shopInfo);
					// 获取详情图片
					this.detailImages=res.result.detailInfo.detailImage[0].list;
					
					// 参数页渲染
					// 获取商品尺码
					this.params.rule=res.result.itemParams.rule.key;
					this.params.ruleArray=res.result.itemParams.rule.tables[0];
					this.params.ruleMsg=res.result.itemParams.rule.disclaimer;
					// 获取商品详细参数
					this.params.info=res.result.itemParams.info.key;
					this.params.infoArray=res.result.itemParams.info.set;
					
					// 评价页渲染
					// 获取商品评价
					this.rate.count=res.result.rate.cRate;
					if(res.result.rate.list){
						this.rate.userLogo=res.result.rate.list[0].user.avatar;
						this.rate.userName=res.result.rate.list[0].user.uname;
						this.rate.content=res.result.rate.list[0].content;
						this.rate.style=res.result.rate.list[0].style;
						this.rate.created=res.result.rate.list[0].created;
					}else{
						this.$refs.rateItem.remove();
					};
					if(res.result.rate.list&&res.result.rate.list[0].images){
						this.rate.images=[res.result.rate.list[0].images[0],res.result.rate.list[0].images[1]];
					}
				});
				getRecommend().then(res=>{
					this.recommends=res.data.list;
					// console.log(this.recommends);
				});
			}
		},
	}
</script>

<style scoped>
	#detail{
		position: relative;
		overflow: hidden;
		width: 100vw;
		height: 100vh;
	}
	.detail-content{
		height:calc(100vh - 44px - 49px);
		
		position:fixed;
		top:44px;
		left:0;
		right:0;
		z-index:11;
	}
	.detail-back-top{
		z-index:12;
	}
	.detail-good{
		border-bottom: 5px solid #eee;
	}
	.detail-params{
		padding: 10px;
		border-bottom: 5px solid #eee;
	}
	.rule,.info{
		text-align: center;
		margin: 10px;
		font-weight: 700;
	}
	.detail-params table{
		width: 100%;
		margin-bottom: 10px;
	}
	.detail-params tr{
		display: flex;
		text-align: center;
	}
	.detail-params td{
		flex:1;
		border-bottom: 2px solid #eee;
	}
	.detail-params td:first-child{
		font-weight: 700;
	}
	.ruleMsg{
		padding: 10px;
		color: #666;
		font-size: 12px;
		border-bottom: 2px solid #eee;
	}
	.something-item{
		display: flex;
		padding: 10px;
		border-bottom: 2px solid #eee;
	}
	.something-item>div:first-child{
		margin-right: 10px;
		color: #FF5777;
		font-weight: 700;
		white-space: nowrap;
	}
	.rate{
		padding: 10px;
		border-bottom:5px solid #eee;
	}
	.rate-title{
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}
	.rate-title>div:first-child{
		font-weight: 700;
	}
	.rate-title>div:last-child{
		color:#FF5777;
	}
	.rate-item{
		padding: 10px;
		border-top:solid #eee 2px;
		border-bottom:solid #eee 2px;
	}
	.user-msg{
		display: flex;
		align-items: center;
		padding: 10px;
	}
	.user-logo{
		height: 50px;
		border: 2px solid #eee;
		border-radius: 50%;
		margin-right:5px;
	}
	.rate-content{
		margin: 10px 0;
	}
	.rate-photo{
		width: 48%;
		margin:1%;
		/* height:200px; */
		/* object-fit:cover; */
	}
	.rate-other{
		font-size: 12px;
		color:#666;
		margin-top:10px;
		display: flex;
		justify-content: space-between;
	}
	.recommends{
		text-align: center;
		background-color: #eee;
	}
	.recommends-title{
		font-weight: 700;
		font-size: 24px;
		padding: 10px;
		color: #FF5777;
		background-color: #fff;
	}
</style>
