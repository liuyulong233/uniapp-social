<!-- <template>
	<view>
		<u-notify ref="uNotify" message="Hi uView"></u-notify>
	</view>
</template> -->
<script>
	console.log('App---')
	// import uView from '@/uni_modules/uview-ui'
	import {
		customSplashScreen,
		checkUpgrade
	} from 'util/app-plus.js'
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App onLaunch---')
			// this.lib.NetWork.On();
			// uni.clearStorage()
			//#ifdef APP-PLUS
			//自定义开屏
			customSplashScreen()
			//检测更新
			setTimeout(() => {
				checkUpgrade()
			}, 6000)
			//#endif
			//#ifdef H5
			uni.switchTab({
				url:'/pages/home/home'
			})
			//#endif
			Vue.prototype.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 45
			this.$store.dispatch('get_config')
			console.log('Vue.prototype.statusBarHeight', Vue.prototype.statusBarHeight)
		},
		onShow: function() {
			// console.log('App Show',this.$store.state.userinfo)

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import './common/uni.css';
	/*引入图标库*/
	@import './common/animate.css';
	@import './common/icon.css';
	// @import './common/flexCoomn.css';
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/common/base.css";

	page {
		height: 100%;
	}

	view {
		box-sizing: border-box;
	}
</style>
