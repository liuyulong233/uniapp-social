const methodToPatch = ['navigateTo', 'redirectTo', 'switchTab', 'navigateBack']
import store from "@/store"
//扩展 跳转函数
methodToPatch.map(item => {
	const original = uni[item] // 
	uni[item] = function(opt = {}, needAuth) {
		let isLogin=store.state.isLogin
		// console.log(needAuth , !isLogin)
		if (needAuth && !isLogin) { // 需要登录且未登录
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			return original.call(this, opt)
		}
	}
})
