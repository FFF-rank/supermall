<template>
	<swiper class="detail-swiper" :moveRatio='moveRatio'>
		<swiperItem v-for="item in banners">
			<img :src="item">
		</swiperItem>
	</swiper>
</template>

<script>
	import Swiper from "@/components/common/swiper/Swiper.vue";
	import SwiperItem from "@/components/common/swiper/SwiperItem.vue";
	
	export default{
		name:"DetailSwiper",
		components:{
			Swiper,
			SwiperItem
		},
		props:{
			banners:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				moveRatio:0.1
			}
		}
	}
</script>

<style scoped>
	.detail-swiper{
		height:calc((100vh - 44px - 49px) * 0.5);
		overflow: hidden;
	}
</style>
