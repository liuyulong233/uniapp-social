<template>
	<view>
		<dy-detail ref='dy' :topic_id="topic_id"></dy-detail>
		<comment-list ref="comment" :topic_id="topic_id"></comment-list>

		<!-- <view style="height: 130upx;"></view> -->
		<!-- 输入框 -->
		<!-- <userChat @submit="submit"></userChat> -->
		<!-- 分享 -->
		<shareMore :maskshow="maskshow" :providerList="providerList" @ismask="alertmask"></shareMore>
	</view>
</template>

<script>
	import userChat from "../../compoents/userchat/user-chat.vue";
	import shareMore from "../../compoents/common/share-more.vue";
	export default {
		components: {
			userChat,
			shareMore
		},
		data() {
			return {
				show: true,
				maskshow: false,
				topic_id: "",
				providerList: [],


			}
		},
		onLoad(options) {
			//console.log(typeof(e.detailinfo))
			this.topic_id = options.topic_id;
			this.initTitle();
			this.getProvider()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(()=>{
				this.$refs.dy.getDetail()
				this.$refs.comment.loadMore=true;
				this.$refs.comment.page=1
				this.$refs.comment.getComment()
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			this.$refs.comment.getComment()
			console.log('onReachBottom')
		},
		//监听导航右边按钮
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.alertmask();
			}
		},
		methods: {

			//弹出分享
			alertmask() {
				this.maskshow = !this.maskshow;
			},
			getProvider() {
				uni.getProvider({
					service: 'share',
					success: (e) => {
						let data = []
						for (let i = 0; i < e.provider.length; i++) {
							switch (e.provider[i]) {
								case 'weixin':
									data.push({
										name: '微信好友',
										id: 'weixin',
										zicon: 'weixin',
										zclass: 'weixin',
										sort: 0
									})
									data.push({
										name: '朋友圈',
										id: 'weixin',
										type: 'WXSenceTimeline',
										zicon: 'huiyuanvip',
										zclass: 'quan',
										sort: 1
									})
									break;
								case 'sinaweibo':
									data.push({
										name: '新浪微博',
										id: 'sinaweibo',
										zicon: 'xinlangweibo',
										zclass: 'weibo',
										sort: 2
									})
									break;
								case 'qq':
									data.push({
										name: 'QQ好友',
										id: 'qq',
										zicon: 'QQ',
										zclass: 'qq',
										sort: 3
									})
									break;
								default:
									break;
							}
						}
						this.providerList = data.sort((x, y) => {
							return x.sort - y.sort
						});
						//console.log(this.providerList)
					},
					fail: (e) => {
						console.log('获取分享通道失败', e);
						uni.showModal({
							content: '获取分享通道失败',
							showCancel: false
						})
					}
				});
			},

			//修改标题
			initTitle(obj) {
				uni.setNavigationBarTitle({
					title: "动态详情"
				});
			}
		}
	}
</script>

<style lang="scss">
	/* 评论 */
	.u-comment {
		padding: 0 20rpx;
	}

	.common-list-title {
		font-size: 30rpx;
		font-weight: bold;
		padding: 20rpx;
	}
</style>
