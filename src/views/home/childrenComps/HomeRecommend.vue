<template>
	<div id="home-recommend">
		<a v-for="item in recommends" :href="item.link" class="home-recommend-item">
			<img :src="item.image">
			<div>{{item.title}}</div>
		</a>
	</div>
</template>

<script>
	export default{
		name:"HomeRecommend",
		props:{
			recommends:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style scoped>
	#home-recommend{
		display: flex;
		background-color: #fff;
		padding:10px 0;
		font-size:14px;
		border-bottom:5px solid #eee;
	}
	.home-recommend-item{
		flex:1;
		text-align:center;
	}
	#home-recommend img{
		width: 80%;
		margin-bottom:10px;
	}
</style>
