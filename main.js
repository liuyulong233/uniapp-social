import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'
import config from '@/api/config.js'
import * as api from '@/api/index.js'
import '@/util/navigate.js'
Vue.use(uView)

import store from './store'
import socket from './socket/index.js'
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$socket = socket
Vue.config.productionTip = false

//挂载全局方法：这样任何地方都可以调用

import lib from './common/lib.js'
Vue.prototype.lib = lib
Vue.filter('formatImage', function(src) {
	if (!src) {
		return ""

	}
	if (src.indexOf('http') == -1) {
		return uni.API_URL + src
	} else {
		return src
	}
})

App.mpType = 'app'

const app = new Vue({
	...App,
	store,
	lib
})
config(app)
app.$mount()
