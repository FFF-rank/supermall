<template>
	<div class="goods-list">
		<goods-list-item v-for="item in goods" :goodsItem="item"/>
	</div>
</template>

<script>
	import GoodsListItem from "./GoodsListItem.vue";
	export default{
		name:"GoodsList",
		props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			GoodsListItem
		}
	}
</script>

<style scoped>
	.goods-list{
		background-color: #eee;
		display: flex;
		flex-wrap:wrap;
		justify-content: center;
	}
</style>
