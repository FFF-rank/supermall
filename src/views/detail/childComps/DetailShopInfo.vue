<template>
	<div class="detail-shop-info">
		<a :href="shops.shopUrl">
			<div class="info-title">
				<img :src="shops.shopLogo">
				<div>{{shops.name}}</div>
			</div>
		</a>
		<div class="info-total">
			<div>
				<div class="totalSells">{{shops.totalSells}}</div>
				<div>总销量</div>
			</div>
			<div>
				<div class="fans">{{shops.fans}}</div>
				<div>粉丝数</div>
			</div>
			<div>
				<div class="totalGoods">{{shops.totalGoods}}</div>
				<div>全部宝贝</div>
			</div>
		</div>
		<div class="line"></div>
		<div class="info-score">
			<div v-for="item in shops.score" class="score-item">
				<div class="score-name">{{item.name}}</div>
				<div class="item-result">
					<div class="item-score" :class="{active:item.score.isBetter}">{{item.score}}</div>
					<div v-if="item.score.isBetter" class="high">高</div>
					<div v-else class="low">低</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"DetailShopInfo",
		props:{
			shops:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.detail-shop-info{
		padding: 10px;
		border-bottom:#eee 5px solid;
	}
	.info-title{
		display: flex;
		align-items: center;
		padding: 10px;
	}
	.info-title img{
		height: 50px;
		border: 2px solid #eee;
		border-radius: 50%;
		margin-right:5px;
	}
	.info-total{
		display: flex;
		justify-content: space-around;
		text-align: center;
		padding: 10px;
	}
	.totalSells,.fans,.totalGoods{
		margin-bottom:5px;
	}
	.line{
		width: 80%;
		height: 2px;
		background-color: #eee;
		margin: 0 auto;
	}
	.info-score{
		display: flex;
		justify-content: space-around;
		padding: 10px;
		text-align: center;
	}
	.item-result{
		display: flex;
		justify-content: space-between;
	}
	.score-name{
		margin-bottom:5px;
	}
	.item-score{
		color: green;
	}
	.item-score.active{
		color: red;
	}
	.high{
		background-color: red;
		color: #fff;
		border-radius: 3px;
	}
	.low{
		background-color: green;
		color: #fff;
		border-radius: 3px;
	}
</style>
