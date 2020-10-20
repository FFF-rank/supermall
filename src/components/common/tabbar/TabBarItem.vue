<template>
	<div class="tab-bar-item" @click="itemClick">
		<slot v-if="!isActive" name="item-icon"></slot>
		<slot v-else name="item-icon-active"></slot>
		<div :style="activeStyle">
			<slot name="item-text"></slot>
		</div>
	</div>
</template>

<script>
	export default{
		name:"TabBarItem",
		props:{
			path:String,
			activeColor:{
				type:String,
				default:"#FF5777"
			}
		},
		methods:{
			itemClick(){
				if(this.$route.path!==this.path){
					this.$router.replace(this.path);
				};
			}
		},
		computed:{
			isActive(){
				return this.$route.path.indexOf(this.path)!==-1
			},
			activeStyle(){
				return this.isActive?{color:this.activeColor}:{}
			}
		}
	}
</script>

<style scoped>
	.tab-bar-item{
		flex:1;
		text-align: center;
		height:49px;
		font-size:14px;
	}
	.tab-bar-item img{
		width: 24px;
		height:24px;
		margin-top:3px;
		/* 去除图片下空隙 */
		vertical-align:middle;
	}
</style>
