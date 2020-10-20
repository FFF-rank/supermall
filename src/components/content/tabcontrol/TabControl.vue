<template>
	<div class="tab-control">
		<div v-for="(item,index) in titles" class="tab-control-item" @click="itemClick(index)">
			<span :class="{active:index===currentIndex}">{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:"TabControl",
		props:{
			titles:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				currentIndex:0
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex=index;
			}
		}
	}
</script>

<style scoped>
	.tab-control{
		display: flex;
		height:40px;
		line-height:40px;
		text-align: center;
	}
	.tab-control-item{
		flex:1;
	}
	.tab-control-item .active{
		padding:5px;
		color: #FF5777;
		border-bottom: #FF5777 solid 2px;
	}
</style>
