import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import config from '@/api/config.js'
import * as api from '@/api/index.js'
import '@/util/navigate.js'
// console.log('mainjs ---')
// import '@/common/markdown/github.css'
import store from './store'
import socket from './socket/index.js'
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$socket = socket
Vue.config.productionTip = false


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
})
config(app)
app.$mount()
