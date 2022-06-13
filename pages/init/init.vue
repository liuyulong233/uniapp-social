<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// 从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
			//#ifdef APP-PLUS
			const value = uni.getStorageSync('launchFlag');
			console.log('onLaunch', value)
			if (value) {
				// 如何已经有，直接去home首页
				uni.switchTab({
					url: '/pages/home/home'
				});
			} else {

				uni.redirectTo({
					url: '/pages/guide/guide'
				});
			}
			//#endif
			//#ifdef MP-WEIXIN
			uni.switchTab({
				url: '/pages/home/home'
			});
			//#endif
		},
		methods: {

		}
	}
</script>

<style>

</style>
