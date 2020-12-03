import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		cartList:[]
  },
  mutations: {
		addCart(state,product){
			let oldProduct=null;
			for(let item of state.cartList){
				if(item.iid===product.iid){
					oldProduct=item;
					break;
				};
			}
			if(oldProduct !== null){
				oldProduct.count++;
			}else{
				product.isSelected=true;
				state.cartList.push(product);
				
			};
			// console.log(state.cartList);
		},
		deleteSelected(state){
			for(let i=0;i<state.cartList.length;i++){
				if(state.cartList[i].isSelected){
					state.cartList.splice(i,1);
					i--;
				};
			}
		}
  },
  actions: {
		addToCart(context,product){
			context.commit('addCart',product);
			return new Promise((resolve,reject)=>{
				resolve();
			})
		}
  },
  modules: {
  }
})
