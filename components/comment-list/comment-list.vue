<template>
	<view class="comment">
		<view class="common-list-title">全部评论 {{comment_count}}</view>
		<block v-for="item in commentList">
			<comment-item :item="item" :key="item._id" @openReply="openReply"></comment-item>
		</block>
		<u-empty mode="list" text="暂无评论" style="height: 700rpx;" v-if="comment_count==0">
		</u-empty>

		<reply-comment ref="reply" :item="cur_item" :show="show" @close="close" @reply="onReply"></reply-comment>
		<post-comment :placeholder="placeholder" @submit="submit"></post-comment>
	</view>
</template>

<script>
	export default {
		props: {
			topic_id: {
				type: String,
				default: ''
			},
			type: {
				type: Number,
				default: 1,
			},
		},
		data() {
			return {
				show: false,
				loadMore: true,
				cur_pid: null,
				cur_reply_id: null,
				//回复一级评论时，一级评论信息
				cur_item: {
					content: "",
					user: {}
				},

				page: 1,
				page_size: 10,
				commentList: []
			}
		},
		computed: {
			isLogin() {
				return this.$store.state.isLogin
			},
			comment_count() {
				return this.commentList.length
			},
			placeholder() {
				if (!this.cur_pid) {
					return '文明发言'
				} else {
					if (this.cur_reply_id) {
						return '@' + this.cur_item2.user.nickname
					} else {
						return '@' + this.cur_item.user.nickname
					}

				}
			}
		},
		created() {
			this.getComment()
		},
		methods: {
			close() {
				this.show = false;
				this.cur_pid = null;
				this.cur_reply_id = null;
				//回复一级评论时，一级评论信息
				this.cur_item = {
					content: "",
					user: {}
				}
			},
			getComment() {
				if (!this.loadMore) return
				this.$api.getComments({
						topic_id: this.topic_id,
						page: this.page,

					})
					.then((res) => {
						console.log('getComment', res);
						let data = res.data || [];
						if (this.page == 1) {
							this.commentList = [...data];
						} else {
							this.commentList = [...this.commentList, ...data];
						}
						if (data.length < this.page_size) {
							this.loadMore = false
						} else {
							this.loadMore = true
							this.page++
						}


					})
					.catch((err) => {
						console.log(err);
					});
			},
			openReply(val) {
				if (!this.isLogin) {
					uni.$u.toast('请登录！')
					return
				}
				this.show = true;
				this.cur_item = val;
				this.cur_pid = val._id
				this.cur_reply_id = val.reply_id;
			},
			//回复弹窗 回复谁
			onReply(val) {
				console.log('回复弹窗 回复谁')
				this.cur_item2 = val;
				this.cur_pid = val._id
				this.cur_reply_id = val.reply_id;
			},
			submit(text) {
				if (!this.isLogin) {
					uni.$u.toast('请登录！')
					return
				}
				let comment = {
					topic_id: this.topic_id, // 动态或文章 id
					pid: this.cur_pid, // 父级评论id
					reply_id: this.reply_id, //回复的评论的id
					content: text, // 评论内容
					type: this.type,
				};
				this.$api
					.postComment(comment)
					.then((res) => {
						console.log('res', res);

						if (this.cur_pid) {
							this.$refs.reply.getReplyList()
						}
						this.loadMore = true;
						this.page = 1;
						this.getComment()
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}
</script>

<style scoped>
	.comment {
		padding: 0 10px;
		padding-bottom: 120rpx;
	}

	.common-list-title {
		font-size: 30rpx;
		font-weight: bold;
		padding: 20rpx 0;
	}
</style>
