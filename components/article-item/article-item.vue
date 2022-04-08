<template>
	<view class="article flex justify-between" @longpress="handle">
		<text class="art-check" v-if="scene == 1">{{ check_text }}</text>
		<view class="left flex flex-column justify-between flex-1">
			<view class="title" @click="opendetail">{{ article.title }}</view>
			<view class="tip">
				<text class="ellipsis">{{ article.user.nickname }}</text>
				<text>{{ article.comment }}评论</text>
				<text>{{ article.fromNow }}</text>
			</view>
		</view>
		<view class="cover">
			<image @click="opendetail" class="cover_img" mode="aspectFill" v-if="article.cover.length!=0"
				:src="article.cover[0]" />
			<image @click="opendetail" class="cover_img" mode="aspectFill" v-else="article.cover.length!=0"
				src="../../static/images/cover/34.jpg" />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			article: {
				type: Object,
				default: () => ({
					author: 100001,
					category: "前端",
					check_status: 2,
					comment: 3,
					is_public: 1,
					keywords: "vue,nodejs",
					like: 0,
					status: 1,
					title: "",
					type: 1,
					fromNow: "2022-03-28",
					cover: [],
					user: {}
				})
			},
			scene: {
				type: [String, Number],
				default: 2
			}
		},
		computed: {
			check_text() {
				let text = ["草稿", "审核中", "已发布", "失败"];
				return text[this.article.check_status]
			}
		},
		methods: {
			opendetail() {
				uni.navigateTo({
					url: '../../pages/detail/article-detail?topic_id=' + this.article._id
				})
			},
			handle() {
				if (this.scene == 1) {
					uni.showActionSheet({
						itemList: ['编辑', '删除'],
						success: (res)=> {
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
							if (res.tapIndex === 0) {
								uni.showModal({
								    title: '提示',
									showCancel:false,
								    content: '请到管理端编辑文章\n 网址：http://175.178.33.148/admin',
								    success: function (res) {
								       
								    }
								});
							} else {
								this.remove()
							}
						},
						fail: function(res) {
							console.log(res.errMsg);
						}
					});
				}

			},
			remove() {
				this.$api
					.removeArticle({
						_id: this.item._id
					})
					.then((res) => {
						console.log(res);
						uni.showToast({
							title: '删除成功'
						})

					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.article {
		padding: 10px;
		background-color: #fff;
		position: relative;
		overflow: hidden;
	}

	.art-check {
		display: inline-block;
		position: absolute;
		content: attr(data-check);
		right: -5px;
		top: 0;
		font-size: 14px;
		min-width: 80px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		background: #45b649;
		color: #fff;
		transform: rotateZ(45deg) translateX(25%);
		z-index: 10;
	}

	.title {
		font-size: 18px;
		line-height: 24px;
	}

	.cover {
		margin-left: 10px;
	}

	.tip {
		color: rgb(179, 175, 175);
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tip>span {
		margin-right: 10px;
	}

	.tip>span:first-child {
		display: inline-block;
		max-width: 120px;
	}

	.cover_img {
		max-width: 220rpx;
		max-height: 80px;
		border-radius: 10rpx;
	}
</style>
