<template>
	<u-popup v-bind="$attrs" mode="bottom" :round="10" v-on="$listeners" @open="open" closeable>
		<view >
			<view class="title flex justify-center">
				回复
			</view>
			<view class="reply-wrap" style="height: calc(100vh - 300rpx);">
				<view class="uni-comment-list" @click="reply(item)">
					<view class="uni-comment-face">
						<image :src="item.user.avatar" mode="widthFix"></image>
					</view>
					<view class="uni-comment-body">
						<view class="name"><text>{{item.user.nickname}}</text>
						</view>
						<view class="uni-comment-content">
							<rich-text :nodes="content"></rich-text>
						</view>
						<view class="uni-comment-date">
							<view>{{item.create_at}}</view>
							<!-- <view class="uni-comment-replay-btn">5回复</view> -->
						</view>
					</view>
				</view>
				<view class="">
					全部回复
				</view>

				<reply-item v-for="item in replyList" :key="item._id" :item="item" @reply="reply"> </reply-item>
			</view>

		</view>
	</u-popup>

</template>

<script>
	import {
		replaceTextToEmoji
	} from "@/util/emoji.js"
	export default {
		props: {
			item: {
				type: Object,
				default: function() {
					return {
						content: text,
						create_at: "2022-02-27 18:14:21",
						reply_count: 1,
						status: 1,
						top: 1,
						topic_id: "621b26017803922f5c5fda1b",
						type: 1,
						uid: 100001,
						user: {
							nickname: "联合国认证小可爱",
							avatar: "https://www.thiswaifudoesnotexist.net/example-65564.jpg",
							uid: 100001
						},
					}

				}
			},

		},
		data() {
			return {
				replyList: [{
					content: "2",
					pid: "621b4eef20d7af1a2ca67ad5",
					reply: {
						content: "弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义。",
						pid: "621b4eef20d7af1a2ca67ad5",
						reply_count: 0,
						status: 1,
						top: 1,
						topic_id: "621b26017803922f5c5fda1b",
						type: 1,
						uid: 100001,
						user: {
							nickname: "联合国认证小可爱",
							avatar: "https://www.thiswaifudoesnotexist.net/example-65564.jpg",
							uid: 100001
						},

						_id: "621b4f1e20d7af1a2ca67afb"
					},
					reply_count: 0,
					reply_id: "621b4f1e20d7af1a2ca67afb",
					status: 1,
					top: 1,
					topic_id: "621b26017803922f5c5fda1b",
					type: 1,
					_id: "621b4f3820d7af1a2ca67b11",
					uid: 100421,
					user: {
						nickname: "高数十八讲",
						avatar: "https://avatarfiles.alphacoders.com/854/thumb-85469.png",
						uid: 100421
					},
				}]
			}
		},
		watch: {
			item(newVal) {
				if (newVal._id) {
					this.getReplyList()
				}

			}
		},
		computed: {
			content() {
				return replaceTextToEmoji(this.item.content)
			}
		},
		methods: {
			open() {
				console.log('open');
			},
			getReplyList() {
				this.$api
					.getReply({
						topic_id: this.item.topic_id,
						pid: this.item._id,
					})
					.then((res) => {
						console.log(res);
						this.replyList = res.data;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			reply(val) {
				this.$emit('reply', val)
			}

		}
	}
</script>

<style scoped>
	.title{
		margin: 10px 0;
	}
	.reply-wrap {
		padding: 20px;
		padding-bottom: 126rpx;
		overflow: auto;
	}

	.name {
		color: #0A98D5;
		font-size: 30rpx;
	}
</style>
