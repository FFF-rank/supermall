<template>
	<div id="cart">
		<nav-bar class="cart-nav">
			<div slot="left" @click="backClick">
				<img src="@/assets/img/common/back.svg">
			</div>
			<div slot="center" class="center">购物车 ( {{cartInfo.length}} )</div>
			<div slot="right" class="right" @click="deleteItem">
				<img src="@/assets/img/common/3.1删除.svg">
				<div>删除</div>
			</div>
		</nav-bar>
		<scroll class="cart-content" ref="scroll">
			<div v-for="item in cartInfo" class="cart-item">
				<input type="checkbox" v-model="item.isSelected">
				<img :src="item.image" @load="cartImagesLoad">
				<div class="item-info">
					<div class="item-title">{{item.title}}</div>
					<div class="price-count">
						<div>￥{{item.price}}</div>
						<div class="item-count">
							<div @click="decrease(item)" :class="{disable:isDisable(item)}">-</div>
							<input type="number" class="count-number" v-model="item.count"></input>
							<div @click="increase(item)">+</div>
						</div>
					</div>
				</div>
			</div>
			<div class="cart-recommends">- 你可能还喜欢 -</div>
		</scroll>
		<div class="deleteItem" v-show="isDeleteItemShow">
			<div class="deleteConfirm">
				<div class="confirmTitle">确定要删除这 <span>{{selectedCount}}</span> 项商品吗？</div>
				<div class="option">
					<div class="confirm" @click="confirmDelete">确定</div>
					<div class="cancel" @click="cancelDelete">取消</div>
				</div>
			</div>
		</div>
		<cart-bottom-bar :cartInfo="cartInfo"/>
	</div>
</template>

<script>
	import NavBar from "@/components/common/navbar/NavBar.vue"
	import Scroll from "@/components/common/scroll/Scroll.vue"
	
	import CartBottomBar from "./childComps/CartBottomBar.vue"
	export default{
		name:"Cart",
		components:{
			NavBar,
			Scroll,
			CartBottomBar
		},
		data(){
			return {
				isDeleteItemShow:false
			}
		},
		computed:{
			cartInfo(){
				return this.$store.state.cartList;
			},
			selectedCount(){
				let count=0;
				for(let item of this.cartInfo){
					if(item.isSelected){
						count++;
					}
				};
				return count
			}
		},
		methods:{
			cartImagesLoad(){
				this.$refs.scroll.refresh();
			},
			backClick(){
				this.$router.back();
			},
			decrease(item){
				if(item.count>1){
					item.count--;
				};
			},
			increase(item){
				item.count++;
			},
			isDisable(item){
				return item.count<=1
			},
			deleteItem(){
				this.isDeleteItemShow=true;
			},
			cancelDelete(){
				this.isDeleteItemShow=false;
			},
			confirmDelete(){
				this.$store.commit('deleteSelected');
				this.isDeleteItemShow=false;
			}
		},
		activated(){
			this.$refs.scroll.refresh();
			// console.log(this.$refs.scroll.scroll.scrollerHeight);
		}
	}
</script>

<style scoped>
	#cart{
		background-color: #eee;
		position: relative;
	}
	.cart-nav{
		background-color: #FF5777;
		color:#fff;
		
		position:fixed;
		left:0;
		right:0;
		top:0;
		
		z-index:10;
	}
	.center{
		font-size:24px;
	}
	.right{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 16px;
		line-height: 16px;
	}
	.right img{
		height: 22px;
	}
	.cart-content{
		overflow: hidden;
		word-break:break-all;
		height: calc(100vh - 44px - 49px - 49px);
		background-color: #eee;
		position:fixed;
		left:0;
		right:0;
		top:44px;
	}
	.cart-item{
		display: flex;
		height: 200px;
		background-color: #fff;
		align-items: center;
		padding: 10px 20px;
		border-bottom: solid #eee 5px;
	}
	.cart-item img{
		width: 25%;
		margin:0 10px;
	}
	.item-info{
		height: 80%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.price-count{
		display: flex;
		justify-content: space-between;
		font-size: 22px;
	}
	.item-count{
		display: flex;
	}
	.count-number{
		width: 50px;
		text-align: center;
		background-color: #eee;
		margin: 0 10px;
	}
	.disable{
		color: #eee;
	}
	.cart-recommends{
		padding: 10px;
		background-color: #FFFFFF;
		text-align: center;
		font-size: 24px;
		color:#FF5777;
	}
	.deleteItem{
		background-color: rgba(100,100,100,0.5);
		height: 100vh;
		width: 100vw;
		z-index:12;
		position: fixed;
	}
	.deleteConfirm{
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		bottom:0;
		margin: auto;
		width: 80%;
		height: 20%;
		background-color: #fff;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-radius: 20px;
	}
	.confirmTitle{
		font-weight: 700;
		margin-bottom:15%;
	}
	.confirmTitle>span{
		color: red;
	}
	.option{
		display: flex;
		justify-content: center;
		font-weight: 700;
		width: 100%;
		height: 20%;
	}
	.confirm{
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 19.8px;
		border:solid 5px #FF5777;
		margin-right:10%;
	}
	.cancel{
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 19.8px;
		border:solid 5px mediumseagreen;
	}
</style>
