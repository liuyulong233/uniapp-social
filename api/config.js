// 此vm参数为页面的实例，可以通过它引用vuex中的变量
let baseURL;
uni.WS_API = 'wss://liuyulong.xyz'
if (process.env.NODE_ENV === 'development') {
	console.log('开发环境')
	// uni.API_URL = baseURL = 'http://192.168.0.107:3000'
	// uni.API_URL = baseURL = 'http://175.178.33.148:3000'
	uni.API_URL = baseURL = 'https://liuyulong.xyz'
} else {
	console.log('生产环境')
	uni.API_URL = baseURL = 'https://liuyulong.xyz'
}
export default (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = baseURL; /* 根域名 */
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		// if (config?.custom?.auth) {
		// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
		//#ifdef H5
		const token = sessionStorage.getItem('token')
		//#endif
		//#ifndef H5 
		const token = uni.getStorageSync('token');
		//#endif
		if (token) {
			config.header.authorization = 'beare ' + token
		}

		// }
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		// console.log('response', data)
		// 自定义参数
		const custom = response.config?.custom
		if (data.code !== 200) {
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				// console.log(data)
				if(data.code!=415){
					uni.$u.toast(data.message)
				}
				
			}
			if (data.code === 400) {
				// console.log("重新登录")
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => {})
			}
		}
		return data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}
