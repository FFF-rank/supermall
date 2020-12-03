<template>
	<div class="goods-list-item" @click="itemClick">
		<img :src="goodsItem.show.img" @load="imageLoad">
		<div class="goods-info">
			<p>{{goodsItem.title}}</p>
			<div class="price-cfav">
				<span class="price">￥{{goodsItem.price}}</span>
				<span class="cfav">♥ {{goodsItem.cfav}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"GoodsListItem",
		props:{
			goodsItem:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			// 向上发射图片加载完成事件，提醒上层组件进行某些操作
			imageLoad(){
				this.$bus.$emit('homeLoad');
			},
			itemClick(){
				// 跳转到详情页
				this.$router.push('/detail/' + this.goodsItem.iid);
			}
		},
		destroyed(){
			this.$bus.$off('homeLoad');
		}
	}
</script>

<style scoped>
	.goods-list-item{
		width: 48%;
		background-color: #fff;
		border-radius:10px;
		overflow: hidden;
		margin:1%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.goods-list-item img{
		width: 100%;
	}
	.goods-info{
		display: flex;
		flex-direction: column;
		padding:5px;
	}
	.goods-info p{
		padding:5px;
		margin:0 0 5px 0;
		height:32px;
		overflow: hidden;
	}
	.goods-info .price-cfav{
		display: flex;
		justify-content: space-between;
		font-weight: 700;
	}
	.cfav:first-letter{
		color:#FF5777;
	}
</style>
