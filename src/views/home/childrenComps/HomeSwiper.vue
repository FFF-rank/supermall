<template>
	<div id="HomeSwiper">
		<swiper :moveRatio='moveRatio'>
			<swiper-item v-for="item in banners" >
				<a :href="item.link">
					<img :src="item.image">
				</a>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import Swiper from "@/components/common/swiper/Swiper.vue";
	import SwiperItem from "@/components/common/swiper/SwiperItem.vue";
	export default{
		name:"HomeSwiper",
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
</style>
