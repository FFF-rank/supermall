<template>
	<div class="detail-bottom-bar">
		<div class="left">
			<div class="service">
				<img src="@/assets/img/detailbottombar/3.1旺旺.svg">
				<div>客服</div>
			</div>
			<div class="shop">
				<img src="@/assets/img/detailbottombar/3.1店铺.svg">
				<div>店铺</div>
			</div>
			<div class="collect" @click="collectClick">
				<img src="@/assets/img/detailbottombar/3.1收藏.svg" v-if="!isCollect">
				<img src="@/assets/img/detailbottombar/3.1收藏-选中.svg" v-else>
				<div>收藏</div>
			</div>
		</div>
		<div class="right">
			<div class="addCart" @click="addToCart">加入购物车</div>
			<div class="buyNow">立即购买</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"DetailBottomBar",
		props:{
			shops:{
				type:String,
				default(){
					return null
				}
			}
		},
		data(){
			return{
				isCollect:false
			}
		},
		methods:{
			collectClick(){
				this.isCollect=!this.isCollect;
			},
			addToCart(){
				this.$emit('addToCart');
			}
		}
	}
</script>

<style scoped>
	.detail-bottom-bar{
		height: 49px;
		z-index:11;
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		bottom:0;
		display: flex;
	}
	.left{
		display: flex;
		flex:1;
		text-align: center;
		align-items: center;
	}
	.left img{
		height: 24px;
	}
	.service,.shop,.collect{
		flex:1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 12px;
		height: 100%;
	}
	.shop{
		border-left: rgba(100,100,100,0.1) solid 1px;
		border-right: rgba(100,100,100,0.1) solid 1px;
	}
	.right{
		display: flex;
		flex:1;
		text-align: center;
		align-items: center;
	}
	.addCart,.buyNow{
		flex:1;
		line-height: 49px;
	}
	.addCart{
		background-color: orange;
		color: #fff;
	}
	.buyNow{
		background-color: #FF5777;
		color: #fff;
	}
</style>
