<template>
	<div id="scroll" ref="wrapper">
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	export default{
		name:"Scroll",
		data(){
			return{
				scroll:null
			}
		},
		props:{
			probeType:{
				type:Number,
				// 其实只有当default值为对象或数组时才需要写成函数
				default(){
					return 0
				}
			},
			pullUpLoad:{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		mounted(){
			// 要在html标签挂载到DOM之后才能获取wrapper元素，因此不能放在created中，要放在mounted中
			// 但是此时加载的可滚动高度scrollerHeight(this.scroll属性)是不准的，这是因为网页中的图片是异步加载，mounted时捕捉到的高度可能不是完整图片的高度
			// 传入第一个参数为滚动容器wrapper的选择器（或直接传入DOM元素），其内只能有一个元素，即滚动内容content
			// 第二个参数为一个对象，里面放置一些可选参数
			this.scroll=new BScroll(this.$refs.wrapper,{
				// 默认content元素内的click事件是无法监听的，即默认click属性值为false
				click:true,
				// probeType:是否实时侦测位置，0和1为不侦测
				// 2:手指滑动时的滚动会侦测，离开后的惯性滚动不侦测
				// 3:只要在滚动，就侦测
				probeType:this.probeType,
				// 监控上拉加载动作，默认为false
				pullUpLoad:this.pullUpLoad
			});
			// 默认情况下不能实时监听滚动位置，需要设置probeType，然后用scroll事件监听
			if((this.probeType==2)||(this.probeType==3)){
				this.scroll.on('scroll',(position)=>{
					this.$emit('scroll',position);
				});
			};
			// 监控上拉加载事件，需要设置pullUpLoad,然后用pullingUp事件监听
			if(this.pullUpLoad){
				this.scroll.on('pullingUp',()=>{
					this.$emit('pullingUp');
					// 必须调用finishPullUp函数，才可以继续监听上拉加载事件
					// this.scroll.finishPullUp();
				});
			};
		},
		methods:{
			refresh(){
				// 先加一个判断，看scroll是否挂载上better-scroll
				// console.log(this);
				this.scroll && this.scroll.refresh();
			},
			scrollTo(x,y,transition=1000){
				this.scroll && this.scroll.scrollTo(x,y,transition);
			},
			finishPullUp(){
				this.scroll && this.scroll.finishPullUp();
			}
		}
	}
</script>

<style scoped>
	#scroll{
		overflow: hidden;
	}
</style>
