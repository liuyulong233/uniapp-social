<template>
	<view style="height: 100%;padding:20rpx; " class="">
		<view class="" style="">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<image src="../../static/images/cover/34.jpg" mode="aspectFill"></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/images/cover/35.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="">
			<view class="hot">
				<view class="title flex justify-between align-middle">
					<text>热门分类</text>
					<view class="flex align-middle">
						更多<view class="icon iconfont icon-jinru"></view>
					</view>
				</view>
				<view class="cate flex justify-between">
					<block v-for="(item,index) in category" :key="index">
						<view>{{item.name}}</view>
					</block>
				</view>
			</view>
			<view class="topic">
				<view class="title flex justify-between align-middle">
					<text>最近更新</text>
				</view>
				<block v-for="(item,index) in topicList" :key="index">
				<topic-item :item="item" @click="handleClick"></topic-item>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		//导航栏
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if (e.index == 0) {
				uni.navigateTo({
					url: '../postTopic/postTopic'
				},true);
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getList()
			
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			this.getList()
		},
		data() {
			return {
				category: [{
						name: "最新"
					},
					{
						name: "游戏"
					},
					{
						name: "情感"
					},
					{
						name: "打卡"
					},
					{
						name: "故事"
					},
					{
						name: "喜爱"
					}
				],
				topicList:[
					
				]
			}

		},
		methods: {
			handleClick(item){
				uni.navigateTo({
					url: '../../pages/topicdetail/topicdetail?id='+item._id
				},true)
			},
			getList(){
				this.$api
					.getTopics({
						page_size:100
					})
					.then((res) => {
						console.log(res);
						this.topicList=res.data
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},


	}
</script>

<style scoped lang="scss">
	.swiper {
		width: 100%;
		height: 270rpx;
		border-radius: 10rpx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;

		}
	}

	.hot {
		
		// padding: 0 25upx;
		margin-top: 20rpx;
		border-bottom: 1px solid #EEEEEE;
		border-top: 1px solid #EEEEEE;

		.title {
			font-size: 30rpx;
			padding-top: 20rpx;
		}

		.cate {
			padding: 30rpx 0;

			view {
				padding: 3upx 16upx;
				background: #F7F7F7;
				color: #9F9F9F;
				border-radius: 8upx;
				
			}
		}
	}
</style>
