<!-- <template>
	<view>
		<u-notify ref="uNotify" message="Hi uView"></u-notify>
	</view>
</template> -->
<script>
	export default {
		onLaunch: function() {
			// this.lib.NetWork.On();
			// uni.clearStorage()
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
	page{
		height: 100%;
	}
	view{
		box-sizing: border-box;
	}
</style>
