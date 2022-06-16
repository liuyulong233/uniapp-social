<template>
	<view class="index-list">
		<view class="dy-top">
			<avatar class="image" :src="info.user&&info.user.avatar"></avatar>
			<!-- <image :src="info.user.avatar" mode="aspectFill"></image> -->
			<view class="dy-box ">
				<text class="name ellipsis" @click="goTo">{{info.user.nickname}}</text>
				<text class="date">{{info.create_at||'2022'}}</text>
			</view>
			<view class="dy-other">
				<view class="follow flex align-middle" :class="{isfollow:info.follow}" @tap="follow">
					<view class="icon iconfont icon-zengjia" v-show="!info.follow"></view>
					{{info.follow?"已关注":"关注"}}
				</view>
			</view>
		</view>

		<view class="index-listtwo">
			<rich-text :nodes="replaceTextToEmoji(info.content)"></rich-text>
		</view>
		<view :class="imgClass" v-if="imgLen">
			<image class="image" @click="previewImage(index)" v-for="(url,index) in imgList" :key="url" :src="url|formatImage" mode="aspectFill"></image>
			<!-- <u--image class='image' @click="previewImage(index)" v-for="(url,index) in imgList" :key="url"
				:src="url|formatImage" radius="15rpx"  mode="aspectFill" lazy-load>
				<view slot="error" style="font-size: 24px;">加载失败</view>
			</u--image> -->
		</view>

		<view class="index-listfour ">
			<view class="tip flex align-middle">
				<view class="" hover-class="activegray animated rubberBand" hover-stay-time="600">
					<view class="icon iconfont icon-zhuanfa"></view>
					{{info.share||0}}
				</view>
				<view class="" hover-class="activegray animated rubberBand" hover-stay-time="600">
					<u-icon name="star-fill" size="20px" style="margin-bottom: 6rpx;"></u-icon>
					{{info.collect||0}}
				</view>
				<view class="" hover-class="animated rubberBand" hover-stay-time="600" @tap="handleLike">
					<view class="icon iconfont icon-dianzan1" :class="{activered:info.islike}"></view>
					{{info.like||0}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		replaceTextToEmoji
	} from '@/util/emoji.js'
	export default {
		props: {
			topic_id: {
				type: String,
				default: ''
			},


		},
		data() {
			return {
				info: {
					album: [],
					comment: 0,
					content: "[发呆]",
					create_at: "2022-02-27 15:20:36",
					is_public: 0,
					like: 0,
					status: 1,
					tag: [],
					uid: 100001,
					user: {
						nickname:null
					},
					create_at: "2022-02-08 11:23",
					follow: true,
					share: 10,

				}
			}
		},

		created() {
			this.getDetail()
		},
		computed: {
			imgLen() {
				return this.info.album.length
			},
			imgClass() {
				let imgLen = this.imgLen
				console.log(imgLen == 1)
				return {
					"dy-image": imgLen == 1,
					"dy-image-1": imgLen == 2 || imgLen == 3,
					"dy-image-3": imgLen == 3,
					"dy-image-4": imgLen == 4,
					"dy-image-5": imgLen >= 5 && imgLen < 7,
					"dy-image-6": imgLen >= 7 && imgLen < 10,
				}

			},
			imgList() {
				return this.info.album
			}
		},
		watch: {
			topic_id() {
				this.getDetail()
			}
		},
		methods: {
			replaceTextToEmoji,
			//关注
			follow() {
				// this.$emit('follow', this.item);
				let uid = this.$store.state.userinfo.uid;
				let follower_id = this.info.uid
				if (uid === follower_id) {
					uni.$u.toast("不能关注自己");
					return;
				}

				this.$api.follow({
						user_id: uid,
						follower_id,
					}).then((res) => {
						console.log(res);
						this.info.follow = res.follow;
						uni.$u.toast(res.message);
					})
					.catch((err) => {
						console.log(err);
					});
			},
			//详情
			getDetail() {
				this.$api.getDynamicDetail({
					_id: this.topic_id
				}).then(res => {
					console.log(res)
					this.info = res.data
				})
			},
			//个人空间
			goTo() {
				uni.navigateTo({
					url: '../../pages/userspace/userspace?uid=' + this.info.uid
				}, true)
			},
			other(type) {
				this.$emit('other', type);
			},
			//预览图片
			previewImage(index) {
				let imgList = this.imgList.map(item => {
					if(item.indexOf('http') == -1){
						return uni.API_URL + item
					}else{
						return  item
					}
					
				})
				// 预览图片
				uni.previewImage({
					current: index,
					urls: imgList,
					indicator: 'default',
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			handleCollect() {

			},
			handleLike() {
				this.$api.like({
						topic_id: this.topic_id,
						type: 1,
					})
					.then((res) => {
						console.log(res);
						this.info.islike = res.like;
						if (res.like) {
							this.info.like++
						} else {
							this.info.like--
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},


		}
	}
</script>

<style scoped lang="scss">
	.dy-top {
		display: flex;
		margin-bottom: 5px;

		image {
			height: 50px;
			width: 50px;
			border-radius: 50%;
		}

		.dy-box {
			display: flex;
			flex-direction: column;
			margin-left: 15px;

			.name {
				overflow: hidden;
				color: #333;
				max-width: 200px;
				font-size: 18px;
				font-weight: bold;
			}

			.date {
				font-size: 14px;
				color: rgba(128, 128, 128, 1);
			}
		}

		.dy-other {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: flex-start;
		}

		.follow {
			background-color: #F4F4F4;
			color: #050505;
			padding: 0 15upx;
			font-weight: 600;
			border-radius: 10upx;
			padding: 5px 10px;
		}

		.isfollow {
			color: #989898;
		}
	}

	.index-list {
		padding: 20upx 40upx 0upx 40upx;
		// border-bottom: 12upx solid #F2F2F2;
	}


	.index-listtwo {
		padding-top: 10upx;
		font-size: 35upx;
		font-weight: 600;
		letter-spacing: 1upx;
		color: #989898;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.index-listthree {
		position: relative;
		margin-top: 15upx;
	}

	.index-listthree image {
		width: 100%;
		border-radius: 15upx;
	}

	.index-listfour {
		padding: 10upx 0;
		margin-top: 20upx;
		color: #545454;
	}

	.index-listfour>view:first-child>view {
		margin-right: 15upx;
		width: 100upx;
	}

	.index-listfour>view:last-child>view {
		width: 120upx;
	}

	.index-listfour>view:first-child>view>view {
		margin-right: 15upx;
	}

	.index-listfour>view:last-child>view>text {
		width: 50upx;
		text-align: right;
	}

	.index-listthree-play {
		position: absolute;
		font-size: 140upx;
		color: #FFFFFF;
	}

	.index-listthree-playinfo {
		position: absolute;
		bottom: 10upx;
		right: 10upx;
		background: rgba(51, 51, 51, 0.72);
		color: #FFFFFF;
		font-size: 24upx;
		padding: 1upx 15upx;
		border-radius: 40upx;
	}

	.activered {
		color: #FF392C;
	}

	.activeblue {
		color: #2B80FF;
	}

	.activegray {
		color: #808080;
	}

	.dy-image {
		margin-top: 10px;

		.image {
			width: 100%;
			// height: 200px;
			border-radius: 10px;
		}
	}

	.dy-image-1 {
		display: flex;
		margin-top: 10px;

		.image {
			flex: 1;
			height: 150px;
		}

		.image:first-child {
			margin-right: 10px;
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
		}

		.image:last-child {
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
		}
	}

	.dy-image-3 {
		margin-top: 10px;

		image {
			flex: 1;
			height: 120px;
		}

		image:nth-of-type(2) {
			margin-right: 10px;
		}
	}

	.dy-image-4 {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 10px;

		image {
			width: 48%;
			height: 150px;
		}

		.image:nth-of-type(1) {
			margin-right: 10px;
			margin-bottom: 10px;
			border-top-left-radius: 10px;
		}

		.image:nth-of-type(2) {
			border-top-right-radius: 10px;
		}

		.image:nth-of-type(3) {
			border-bottom-left-radius: 10px;
		}

		.image:nth-of-type(4) {
			border-bottom-right-radius: 10px;
		}
	}

	.dy-image-5 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-gap: 10px;
		margin-top: 10px;

		.image {
			width: 100%;
			height: 100px;
			border-radius: 10px;
		}
	}

	.dy-image-6 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-gap: 10px;
		margin-top: 10px;

		.image {
			width: 100%;
			height: 100px;
			border-radius: 10px;
		}
	}

	.tip {
		view {
			display: flex;
			align-items: center;
		}
	}
</style>
