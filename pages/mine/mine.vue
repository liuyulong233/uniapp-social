<template>
	<page ref='page' class="wrap">
		<template v-if="!isLogin">
			<!-- 未登录 -->
			<view class="home-nologin-title flex align-middle justify-center">登陆，体验更多功能</view>
			<!-- 更多登陆 -->
			<third-party-login></third-party-login>
			<!-- 账号密码登陆 -->
			<view class="home-password flex align-middle justify-center" @tap="tologin">账号密码登陆<view class="icon iconfont icon-jinru"></view>
			</view>
		</template>
		<!-- 已登陆 -->
		<view v-else class="home-islogin flex align-middle" @tap="touserspace">
			<avatar class="image" :src="userinfo.avatar"></avatar>
			<view class="home-islogin-info flex-1">
				<view>{{userinfo.nickname}}</view>
				<view>UID: {{userinfo.uid}} </view>
			</view>
			<view class="icon iconfont icon-jinru"></view>
		</view>
		<!-- 数据 -->
		<view class="home-data flex align-middle">
			<!-- <block v-for="(item,index) in homedata" :key="index">
				<view class="u-f-ajc u-f1 u-f-l"><text>{{item.num}}</text>{{item.name}}</view>
			</block> -->
			<view class=""><text>{{mine.dynamic}}</text>动态</view>
			<view class=""><text>{{mine.article}}</text>文章</view>
			<view class="" @tap="toUser"><text>{{mine.fans}}</text>粉丝</view>
			<view class="" @tap="toUser"><text>{{mine.follow}}</text>关注</view>
		</view>
		<!-- 广告位 -->
		<view class="home-adv flex align-middle justify-center">
			<image src="../../static/images/demo20.jpg" mode="widthFix" lazy-load></image>
		</view>
		<!-- 功能 -->
		<view class="list" v-if="isLogin">
			<u-cell-group>
				<u-cell icon="setting-fill" title="设置" isLink url="/pages/setting/setting"></u-cell>
				<!-- <u-cell icon="integral-fill" title="会员等级" value="新版本"></u-cell> -->
			</u-cell-group>
		</view>
		<!-- <button type="default" @click="test">测试</button> -->

	</page>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		components: {},
		data() {
			return {

				mine: {
					article: 0,
					dynamic: 0,
					fans: 0,
					follow: 0,
				},

			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getMine()
				
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			this.getMine()
		},
		onLoad() {
			
		},
		computed: {
			...mapState(['userinfo', 'isLogin'])
		},
		methods: {
			toUser(){
				uni.navigateTo({
					url: '../follow/follow'
				},true)
			},
			touserspace() {
				console.log('weee')
				uni.navigateTo({
					url: '../../pages/userspace/userspace'
				}, true)
			},
			tologin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			getMine() {
				if (!this.isLogin) return;
				this.$api.getMine().then(res => {
					console.log(res)
					this.mine = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			test(){
				this.$refs.page.notify()
			}
		}
	}
</script>

<style>
	.wrap {
		padding-top: 40px;
	}

	.home-nologin-title {
		font-size: 32rpx;
	}

	.home-password {
		font-size: 29rpx;
	}

	.home-password>view {
		color: #D5D5D5;
	}

	.home-adv {
		padding: 20rpx;
	}

	.home-adv>image {
		border-radius: 20rpx;
		height: 150rpx;
	}

	.home-list {
		padding: 20rpx 40rpx;
	}

	.home-islogin {
		padding: 20rpx 40rpx;
	}

	.home-islogin .image {
		margin-right: 15rpx;
	}

	.home-islogin>view:first-of-type>view:nth-child(1) {
		font-size: 32rpx;
	}

	.home-islogin>view:first-of-type>view:nth-child(2) {
		color: #929292;
	}

	.home-islogin>view:last-of-type {
		height: 100%;
	}

	.home-data {
		padding: 30rpx;
	}

	.home-data>view {
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex:1
	}

	.home-data>view>text {
		color: #343434;
		font-size: 33rpx;
		font-weight: bold;
	}

	.list {
		padding: 0 50rpx;
	}
</style>
