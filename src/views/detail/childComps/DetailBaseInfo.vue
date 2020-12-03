<template>
	<div class="detail-base-info" v-if="Object.keys(goods).length !== 0">
		<div class="info-title">{{goods.title}}</div>
		<div class="info-price">
			<div class="n-price">{{goods.newPrice}}</div>
			<div class="o-price">{{goods.oldPrice}}</div>
			<div v-if="goods.discount" class="discount">{{goods.discount}}</div>
		</div>
		<div class="info-other">
			<div v-for="item in goods.columns">{{item}}</div>
		</div>
		<div class="info-service">
			<div v-for="item in goods.services" class="service-item">
				<img :src="'https:'+item.icon">
				<div>{{item.name}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"DetailBaseInfo",
		props:{
			goods:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.info-title{
		padding: 10px;
		font-size: 20px;
	}
	.info-price{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
	}
	.n-price{
		color: #FF5777;
		font-size: 24px;
	}
	.o-price{
		text-decoration:line-through;
		color: gray;
	}
	.discount{
		background-color: #FF5777;
		color:#fff;
		padding:3px;
		border-radius: 5px;
	}
	.info-other{
		display: flex;
		justify-content:space-between;
		padding: 10px;
		border-bottom: 5px solid #eee;
		color: gray;
	}
	.info-service{
		padding: 10px;
		display: flex;
		flex-wrap: wrap;
		border-bottom: 5px solid #eee;
	}
	.service-item{
		padding: 8px;
		white-space: nowrap;
		display: flex;
		align-items: center;
	}
	.info-service img{
		height:16px;
		margin-right: 3px;
	}
</style>
