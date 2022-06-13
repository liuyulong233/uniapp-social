<template>
	<view class="h-full relative overflow-hidden">
		<swiper class="swiper" :current="current" @change="change" >
			<swiper-item>
				<view class="swiper-item">
					<view class="bg-1 absolute">
					</view>
					<view class="bg-2 absolute">
					</view>
					<text class="title">
						记录学习
					</text>
					<text class="tip">
						记录生活中美好的点滴，留住美好的事物，保存美丽的生活过往
					</text>
					<view class="dot">
						<view class="dot-item dot-act">

						</view>
						<view class="dot-item">

						</view>
					</view>
					<view class="btn flex justify-center align-middle" @tap="next()">
						<u-icon name="arrow-rightward" color="#fff" size="28"></u-icon>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="bg-1 absolute">
					</view>
					<view class="bg-2 absolute">
					</view>
					<text class="title">
						分享生活
					</text>
					<text class="tip">
						记录生活中美好的点滴，留住美好的事物，与同好伙伴交友聊天
					</text>
					<view class="dot">
						<view class="dot-item">
					
						</view>
						<view class="dot-item dot-act">
					
						</view>
					</view>
					<view class="btn1 flex justify-center align-middle" @tap="handle">
						立即体验
					</view>
				</view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0
			}
		},
		onLoad() {
			uni.setStorageSync('launchFlag',true)
		},
		methods: {
			change(e) {
			this.current=e.detail.current
			},
			next(){
				this.current=1
			},
			handle(){
				uni.switchTab({
					url:'../home/home'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
	}

	.bg-1 {
		left: -159rpx;
		top: -150rpx;
		width: 600rpx;
		height: 600rpx;
		border-radius: 500rpx;
		background: rgba(42, 130, 228, 0.2);
		z-index: -1;
	}

	.bg-2 {
		right: -100rpx;
		bottom: -200rpx;
		width: 231px;
		height: 229px;
		border-radius: 200px;
		background: rgba(121, 72, 234, 0.25);
		z-index: -1;
	}

	.swiper,
	.swiper-item {
		height: 100%;
	}

	.swiper-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.title {
		font-size: 26px;
		margin-top: 900rpx;
	}

	.tip {
		width: 70%;
		font-size: 16px;
		text-align: center;
		margin-top: 100rpx;
	}

	.dot {
		// width: 20%;
		// height: 10px;
		display: flex;
		margin: 20px 0;

		&-item {
			width: 10px;
			height: 6px;
			background: rgba(121, 72, 234, 0.25);
			border-radius: 5px;
			margin-left: 4px;
		}

		&-act {
			width: 24px;
			height: 6px;
			background: rgba(121.00005005099995, 71.9981076, 233.98800000000003, 0.85);
			border-radius: 13px;
		}
	}

	.btn {
		width: 50px;
		height: 50px;
		background: rgba(121, 72, 234, 0.6);
		border-radius: 50%;
	}
	.btn1{
		width: 311px;
		height: 52px;
		background: rgba(121, 72, 234, 0.6);
		border-radius: 80rpx;
		color: #fff;
		font-size: 16px;
	}
</style>
