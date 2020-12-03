<template>
	<div class="detail-nav-bar">
		<nav-bar>
			<div slot="left" @click="backClick">
				<img src="@/assets/img/common/back.svg">
			</div>
			<div slot="center">
				<tab-control :titles="titles" class="detail-tab-control" @tabClick="tabClick"/>
			</div>
			<div slot="right" class="right" @click="toCart">
				<img src="@/assets/img/maintabbar/cart_active.svg">
			</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from "@/components/common/navbar/NavBar.vue"
	import TabControl from "@/components/content/tabcontrol/TabControl.vue"
	
	export default{
		name:"DetailNavBar",
		components:{
			NavBar,
			TabControl
		},
		data(){
			return {
				titles:['商品','参数','评论','推荐']
			}
		},
		methods:{
			backClick(){
				this.$router.back();
			},
			tabClick(index){
				switch(index){
					case 0:
					 this.$emit('goodClick');
					 break;
					case 1:
					 this.$emit('paramsClick');
					 break;
					case 2:
					 this.$emit('rateClick');
					 break;
					case 3:
					 this.$emit('recommendsClick');
					 break;
				}
			},
			toCart(){
				this.$router.push('/cart');
			}
		}
	}
</script>

<style scoped>
	.detail-tab-control{
		font-weight: 700;
	}
	.right img{
		height: 22px;
	}
</style>
