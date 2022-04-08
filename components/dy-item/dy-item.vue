<template>
	<view class="index-list">
		<view class="dy-top">
			<avatar class="image" :src="item.user.avatar"></avatar>
			<!-- <image :src="item.user.avatar" mode="aspectFill"></image> -->
			<view class="dy-box ">
				<text class="name ellipsis">{{item.user.nickname}}</text>
				<text class="date">{{item.create_at||'2022'}}</text>
			</view>
			<view class="dy-other">
				<view class="follow flex align-middle" v-if="scene===1" :class="{isfollow:item.isFollow}" @tap="follow">
					<view class="icon iconfont icon-zengjia" v-show="!item.isFollow"></view>
					{{item.isFollow?"已关注":"关注"}}
				</view>
				<u-icon name="more-dot-fill" v-if="scene===2" @click="showAction"></u-icon>
			</view>
		</view>

		<view class="index-listtwo" @tap="opendetail">
			<rich-text :nodes="replaceTextToEmoji(item.content)"></rich-text>
		</view>
		<view class="index-listthree flex align-middle justify-center" @tap="opendetail" v-if="item.album.length!=0">
			<!--图片-->
			<!-- <image :src="item.album[0]" mode="aspectFill" lazy-load></image> -->
			<u--image class='img' :src="item.album[0]|formatImage" radius="15rpx" width="100%" mode="aspectFill" lazy-load>
				<view slot="error" style="font-size: 24px;">加载失败</view>
			</u--image>
		</view>
		<view class="index-listfour flex align-middle justify-between">
			<view class="flex align-middle">
				<view class="flex align-middle" hover-class="activegray" hover-stay-time="100">
					<view class="icon iconfont icon-zhuanfa"></view>
					{{item.share||0}}
				</view>
				<view class="flex align-middle" hover-class="activegray" hover-stay-time="100">
					<view class="icon iconfont icon-pinglun1"></view>
					{{item.comment||0}}
				</view>
			</view>
			<view class="flex align-middle">
				<view class="flex align-middle " hover-class="animated rubberBand" hover-stay-time="1000"
					 @tap="other(1)">
					<view class="icon iconfont icon-dianzan1"></view>
					<text>{{item.like||0}}</text>
				</view>
				<view class="flex align-middle " hover-class="animated rubberBand" hover-stay-time="1000"
					:class="{'activeblue':(item.status==2)}" @tap="other(2)">
					<view class="icon iconfont icon-shoucang"></view>
					<text>{{item.collect||0}}</text>
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
			item: {
				type: Object,
				default: () => ({
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
						nickname: "联合国认证小可爱",
						avatar: "https://www.thiswaifudoesnotexist.net/example-65564.jpg",
						uid: 100001
					},
					_id:'',
					create_at: "2022-02-08 11:23",
					isFollow: false,

					share: 10,
					other: {
						status: 1, //0表示无操作，1表示顶了，2表示踩了
						like: 10,
						hate: 10
					}
				})
			},
			scene: {
				type: [Number, String],
				default: 1
			}
		},
		methods: {
			replaceTextToEmoji,
			//关注
			follow() {
				// this.$emit('follow', this.item);
			},
			other(type) {
				this.$emit('other', type);
			},
			opendetail() {
				uni.navigateTo({
					url: '../../pages/detail/detail?topic_id=' + this.item._id
				})
			},
			showAction(){
				uni.showActionSheet({
					itemList: ['编辑', '删除'],
					success:  (res) =>{
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if(res.tapIndex===0){
							uni.navigateTo({
								url: '../../pages/fabu/fabu?topic_id=' + this.item._id
							})
						}else{
							
						}
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
				
			},
			remove(){
				this.$api
					.removeDynamic({
						_id:this.item._id
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

<style scoped lang="scss">
	.dy-top {
		display: flex;
		margin-bottom: 5px;

		

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
			border-radius: 5upx;
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

	.index-listthree .img {
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
	// ::v-deep .u-image__image{
	// 	width: 100% !important;
	// }
</style>
