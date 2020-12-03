<template>
	<div class="toast">
		{{message}}
	</div>
</template>

<script>
	export default{
		name:"Toast",
		props:{
			message:{
				type:String,
				default(){
					return null
				}
			}
		}
	}
</script>

<style scoped>
	.toast{
		width: 80%;
		height: 20%;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background-color: #fff;
		z-index:20;
		border-radius: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: #FF5777 solid 2px;
		font-size: 24px;
	}
</style>
