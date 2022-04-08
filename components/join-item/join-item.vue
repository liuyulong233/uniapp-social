<template>
	<view class="zhitiao u-f-a animated fadeIn fast">
		<image :src="item.user.avatar" mode="widthFix" lazy-load></image>
		<view class="u-f-aj">
			<view class="zhitiao-one">
				<view class="ellipsis">{{item.user.nickname}}</view>
				<view>请求加入 {{ item.group.name }} 群</view>
			</view>
			<view class="zhitiao-two flex  justify-between">
				<button type="primary" size="mini" @click="agree"> 同意</button>
				<button type="warn" size="mini" @click="refuse">拒绝</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			item: {
				type: Object,
				default: () => ({
					account: {

					},
					lastMessage: {}
				})
			}
		},
		methods: {
			tochat() {
				let obj = {
					...this.item.account,
					type: this.item.type
				}
				if (obj.type == "SINGLE") {
					obj.accounts = this.item.accounts;
				}
				this.$store.commit('set_curchat', obj)
				uni.navigateTo({
					url: '../../pages/userchat/userchat'
				})
			},
			agree() {
				let obj = {
					operate: "agree", //notice-加群通知 agree-同意加群 join-加群
					group_id: this.item.group_id, //群ID
					group_uid: this.item.group.uid, //群主uid
					uid: this.item.user.uid, //加群人uid
				};
				this.$socket.joinGroup(obj);

				this.$emit('refresh')
			},
			refuse() {
				this.$api
					.postGroupJoin({
						_id: this.item._id
					})
					.then((res) => {
						console.log(res);
						this.$emit('refresh')
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}
</script>

<style scoped>
	.zhitiao {
		padding: 20upx 10upx;
		border-bottom: 1px solid #EEEEEE;
	}

	.zhitiao>image {
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		flex-shrink: 0;
		/*不写时默认值为1,空间不够时,会等比例缩小.否则不会变*/
	}

	.zhitiao>view {
		flex: 1;
	}

	.zhitiao-one {
		margin-left: 20upx;
		max-width: 300rpx;
	}

	.zhitiao-one>view:nth-child(1) {
		font-size: 35upx;
	}

	.zhitiao-one>view:nth-child(2) {
		color: #999999;
		font-size: 30upx;
	}

	.zhitiao-two {
		height: 100%;
		text-align: right;
		align-items: flex-end;
	}

	.zhitiao-two>view:nth-child(1) {
		color: #CBCBCB;
	}
</style>
