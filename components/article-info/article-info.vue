<template>
	<view class="">
		<view class="dy-top">
			<image :src="info.user.avatar" mode="aspectFill"></image>
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
		<view class="content markdown-body">
			<!-- <u-parse :content="content"></u-parse> -->
			<mp-html :content="content"></mp-html>
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
	import {marked} from '@/common/marked.esm.js'
	export default{
		props: {
			topic_id: {
				type: String,
				default: ''
			},
		
		
		},
		data() {
			return {
				info: {
					author: 100001,
					category: "前端",
					check_status: 2,
					comment: 3,
					content: ``,
					cover: ["https://images3.alphacoders.com/716/thumbbig-716428.webp"],
					create_at: "2022-02-12 10:55:00",
					description: "社区博客项目及功能介绍",
					is_public: 1,
					keywords: "vue,nodejs",
					like: 0,
					status: 1,
					title: "社区博客项目介绍",
					type: 1,
					user:{}
				}
			}
		},
		created() {
			this.getDetail()
		},
		computed:{
			content(){
				return marked(this.info.content||'')
			}
		},
		methods: {
			//关注
			follow() {
				// this.$emit('follow', this.item);
				let uid = this.$store.state.userinfo.uid;
				let follower_id = this.info.author
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
				this.$api.getArticleDetail({
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
				},true)
			},
			
			
			handleCollect() {
		
			},
			handleLike() {
				this.$api.like({
						topic_id: this.topic_id,
						type: 2,
					})
					.then((res) => {
						console.log(res);
						this.info.islike = res.like;
						if(res.like){
							this.info.like++
						}else{
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
	.index-list {
		padding: 20upx 40upx 0upx 40upx;
		// border-bottom: 12upx solid #F2F2F2;
	}
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
	.activered {
		color: #FF392C;
	}
	.tip {
		view {
			display: flex;
			align-items: center;
		}
	}
</style>
