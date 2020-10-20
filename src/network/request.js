// axios请求的封装
import axios from 'axios'

export function request(config){
	// 1.创建axios的实例
	const instance = axios.create({
		baseURL:'',
		timeout:5000
	});
	// 2.axios的拦截器
	instance.interceptors.request.use(function(config){
		// console.log(config);
		return config
	},function(err){
		// console.log(err);
	});
	instance.interceptors.response.use(function(result){
		// console.log(result);
		return result.data
	},function(err){
		// console.log(err);
	});
	// 3.发送真正的网络请求
	return instance(config)
}