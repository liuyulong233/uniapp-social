<template>
	<view style="padding: 20rpx;">
		<view class="userabout-header flex align-middle justify-center flex-column">
			<image src="../../static/images/logo.png" lazy-load mode="widthFix"></image>
			<view>version 1.0.0</view>
		</view>
		<block v-for="(item,index) in homelist" :key="index">
			<u-cell :title="item.name" :isLink="true" @click="handleClick(item)"></u-cell>
		</block>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				homelist: [{
						icon: '',
						name: '新版本检测',
						type: 'navigateTo',
						urls: ''
					},
					{
						icon: '',
						name: '用户协议',
						type: 'navigateTo',
						urls: ''
					}
				]
			}
		},
		methods: {
			handleClick() {

			}
		}
	}
</script>

<style scoped>
	.userabout-header {
		padding: 40rpx 0;
	}

	.userabout-header>image {
		width: 65%;
		margin-top: 50rpx;
		margin-bottom: 30rpx;
	}

	.userabout-header>view {
		color: #CCCCCC;
	}
</style>
