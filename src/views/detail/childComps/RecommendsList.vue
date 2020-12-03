<template>
	<div class="recommends-list">
		<div class="recommends-list-item" v-for="item in recommends" @click="itemClick(item)">
			<img :src="item.image" @load="detailLoad">
			<div>
				<div class="recommends-title">{{item.title}}</div>
				<div class="price-cfav">
					<span class="price">￥{{item.price}}</span>
					<span class="cfav">♥ {{item.cfav}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"RecommendList",
		props:{
			recommends:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			detailLoad(){
				this.$bus.$emit('detailLoad');
			},
			itemClick(item){
				// this.$router.push("/detail/"+item.item_id);
				// 演示用，因为上方的path无法请求到数据
				this.$router.push('/detail/1m745k0');
				// console.log(this.$route.params.iid);
				// console.log(item.item_id);
				// console.log(this.$router);
			}
		}
	}
</script>

<style scoped>
	.recommends-list{
		display: flex;
		flex-wrap: wrap;
	}
	.recommends-list-item{
		width: 48%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 10px;
		background-color: #fff;
		margin: 1%;
		overflow: hidden;
	}
	.recommends-list-item img{
		width: 100%;
	}
	.recommends-title{
		padding: 5px;
		height: 32px;
		overflow: hidden;
	}
	.price-cfav{
		display: flex;
		justify-content: space-between;
		font-weight: 700;
		padding: 5px;
	}
	.cfav:first-letter{
		color:#FF5777;
	}
</style>
