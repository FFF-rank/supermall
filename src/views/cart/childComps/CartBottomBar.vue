<template>
	<div class="cart-bottom-bar">
		<label for="totalSelect">
			<input id="totalSelect" type="checkbox" @click="totalClick" v-model="totalSelected">
			全选
		</label>
		<div class="right">
			<div>合计:￥{{totalPrice}}<br/>已选中 {{totalCount}} 项</div>
			<div class="checkout">结算</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"CartBottomBar",
		props:{
			cartInfo:{
				type:Array,
				default(){
					return {}
				}
			}
		},
		computed:{
			totalPrice(){
				let totalPrice=0;
				for(let item of this.cartInfo){
					if(item.isSelected){
						totalPrice += item.price * item.count;
					};
				};
				return totalPrice
			},
			totalCount(){
				let totalCount=0;
				for(let item of this.cartInfo){
					if(item.isSelected){
						totalCount++;
					};
				};
				return totalCount
			},
			totalSelected:{
				get(){
					let isTotalSelected=this.cartInfo.every(function(item){
						return item.isSelected
					});
					if(this.cartInfo.length==0){
						isTotalSelected=false;
					}
					return isTotalSelected
				},
				set(){
					
				}
			}
		},
		methods:{
			totalClick(event){
				// console.log(event.target.checked);
				for(let item of this.cartInfo){
					item.isSelected=event.target.checked;
				}
			}
		}
	}
</script>

<style scoped>
	.cart-bottom-bar{
		height: 49px;
		padding-left:20px;
		position: fixed;
		left: 0;
		right: 0;
		bottom:49px;
		background-color: #fff;
		box-shadow: 0 -1px 1px rgba(100,100,100,0.1);
		
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.right{
		display: flex;
		align-items: center;
	}
	.checkout{
		width: 100px;
		font-size: 20px;
		line-height: 49px;
		text-align: center;
		background-color: #FF5777;
		color: #fff;
		margin-left: 10px;
	}
</style>
