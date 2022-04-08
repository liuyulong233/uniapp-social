<template>
	<view class="chat-big">
		<view class="user-chat-list flex" :class="{'user-char-me':isMe}">
			<view class="avatar relative" v-if="!isMe">
				<text class="text absolute">{{item.fromAccount.nickname}} </text>
				<!-- <u--image  :src="item.fromAccount.avatar" width="100rpx" height="100rpx" shape="circle">
					<view slot="error">
						<image style="width: 100rpx;height: 100rpx;border-radius: 100%;" src="../../static/images/avatar/0.png" mode="widthFix" lazy-load></image>
					</view>
				</u--image> -->
				<avatar :src="item.fromAccount.avatar"></avatar>
			</view>
			<view class="user-chat-title flex align-middle justify-center">
				<!-- 文字 -->
				<view v-if="item.type=='TEXT'">
					<rich-text :nodes="replaceTextToEmoji(item.message)"></rich-text>
				</view>
				<!-- 图片 -->
				<image v-if="item.type=='IMAGE'" :src="item.message" mode="widthFix" lazy-load></image>
			</view>
			<view class="avatar relative" v-if="isMe">
				<avatar :src="item.fromAccount.avatar"></avatar>
				<!-- <image :src="item.fromAccount.avatar" mode="widthFix" lazy-load></image> -->
			</view>


		</view>
	</view>
</template>

<script>
	import {
		replaceTextToEmoji
	} from "@/util/emoji.js"
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({
					fromAccount: {

					},
					lastMessage: {}
				})
			},

		},
		computed: {
			isMe() {
				let cur_uid;
				if(this.$store.state.isLogin){
					cur_uid=this.$store.state.userinfo.uid
				}else{
					//#ifdef H5
					let userinfo = JSON.parse(sessionStorage.getItem("temp_userinfo"));
					//#endif
					//#ifndef H5 
					let userinfo = JSON.parse(uni.getStorageSync("temp_userinfo")||'{}');
					//#endif
					
					cur_uid=userinfo.uid
				}
				return this.item.fromAccount.uid == cur_uid
			}
		},
		methods:{
			replaceTextToEmoji,
		}
	}
</script>

<style>
	.chat-big {
		margin: 0 30upx ;
		padding-bottom: 20rpx;
	}

	.user-chat-list {
		padding-top: 50rpx;
	}

	.user-chat-list .avatar >image {
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		flex-shrink: 0;
	}
	
	.avatar .text{
		width: 500rpx;
		top: -30px;
		left: 10rpx;
		z-index: 100;
		text-align: left;
	}
	.user-chat-title {
		position: relative;
		background: #F4F4F4;
		padding: 25upx;
		margin-left: 20upx;
		border-radius: 20upx;
		margin-right: 100upx;
	}

	.user-chat-title:after {
		position: absolute;
		left: -30upx;
		right: 0;
		top: 30upx;
		content: '';
		width: 0;
		height: 0;
		border: 16upx solid #F4F4F4;
		border-color: transparent #F4F4F4 transparent transparent;
	}

	.user-char-me {
		justify-content: flex-end;
	}

	.user-char-me .user-chat-title {
		margin-left: 100upx;
		margin-right: 20upx;
	}

	.user-char-me .user-chat-title:after {
		left: auto;
		right: -30upx;
		border-color: transparent transparent transparent #F4F4F4;
	}

	.user-chat-title>image {
		max-width: 150upx;
		max-height: 200upx;
	}

	.user-chat-time {
		color: #aeaeae;
		font-size: 24upx;
		padding: 50upx 0;
	}
</style>
