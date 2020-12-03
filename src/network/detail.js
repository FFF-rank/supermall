import {request} from "./request.js";

export function getDetail(iid){
	return request({
		url:"/detail",
		params:{
			iid
		}
	})
}

export class Goods{
	constructor(itemInfo,columns,services){
		this.title=itemInfo.title;
		this.desc=itemInfo.desc;
		this.newPrice=itemInfo.price;
		this.oldPrice=itemInfo.oldPrice;
		this.discount=itemInfo.discountDesc;
		this.columns=columns;
		this.services=services;
		this.realPrice=itemInfo.lowNowPrice;
	};
}

export class Shops{
	constructor(shopInfo){
		this.shopLogo=shopInfo.shopLogo;
		this.name=shopInfo.name;
		this.shopUrl=shopInfo.shopUrl;
		this.totalSells=shopInfo.cSells;
		this.fans=shopInfo.cFans;
		this.totalGoods=shopInfo.cGoods
		this.score=shopInfo.score;
	};
}

export function getRecommend(){
	return request({
		url:"/recommend"
	})
}
