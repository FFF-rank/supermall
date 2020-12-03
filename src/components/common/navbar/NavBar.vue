<template>
	<div class="nav-bar">
		<div class="left">
			<slot name="left"></slot>
		</div>
		<div class="center">
			<slot name="center"></slot>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
	export default{
		name:"NavBar"
	}
</script>

<style scoped>
	.nav-bar{
		display: flex;
		height:44px;
		line-height:44px;
		text-align: center;
		/* background-color: #d81e06; */
		box-shadow: 0 1px 1px rgba(100,100,100,0.1);
	}
	.left,.right{
		width: 60px;
	}
	.center{
		/* 当flex内其他元素都有固定宽度时，flex=1即为剩余的100%宽度 */
		flex:1;
	}
</style>
