<template>
	<div id="main-tab-bar">
		<tab-bar>
			<tab-bar-item path="/home" activeColor="#FF5777">
				<img slot="item-icon" src="@/assets/img/maintabbar/home.svg" alt="首页">
				<img slot="item-icon-active" src="@/assets/img/maintabbar/home_active.svg" alt="首页">
				<div slot="item-text">首页</div>
			</tab-bar-item>
			<tab-bar-item path="/category" activeColor="#FF5777">
				<img slot="item-icon" src="@/assets/img/maintabbar/category.svg" alt="分类">
				<img slot="item-icon-active" src="@/assets/img/maintabbar/category_active.svg" alt="分类">
				<div slot="item-text">分类</div>
			</tab-bar-item>
			<tab-bar-item path="/cart" activeColor="#FF5777">
				<img slot="item-icon" src="@/assets/img/maintabbar/cart.svg" alt="购物车">
				<img slot="item-icon-active" src="@/assets/img/maintabbar/cart_active.svg" alt="购物车">
				<div slot="item-text">购物车</div>
			</tab-bar-item>
			<tab-bar-item path="/profile" activeColor="#FF5777">
				<img slot="item-icon" src="@/assets/img/maintabbar/profile.svg" alt="我的">
				<img slot="item-icon-active" src="@/assets/img/maintabbar/profile_active.svg" alt="我的">
				<div slot="item-text">我的</div>
			</tab-bar-item>
		</tab-bar>
	</div>
</template>

<script>
	import TabBar from "@/components/common/tabbar/TabBar.vue"
	import TabBarItem from "@/components/common/tabbar/TabBarItem.vue"
	export default{
		name:"MainTabBar",
		components:{
			TabBar,
			TabBarItem
		}
	}
</script>

<style scoped>
</style>
