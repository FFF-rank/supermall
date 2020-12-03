<template>
	<div class="detail-images">
		<img v-for="item in detailImages" :src="item" @load="imageLoad">
	</div>
</template>

<script>
	export default{
		name:"DetailImages",
		props:{
			detailImages:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			imageLoad(){
				this.$bus.$emit('detailLoad');
			}
		}
	}
</script>

<style scoped>
	.detail-images{
		padding:10px;
	}
	.detail-images img{
		width: 100%;
	}
</style>
