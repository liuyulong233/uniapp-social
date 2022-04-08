<template>
	<view class="topic-item flex" @tap="opendatel">
		<view class="image">
			<image :src="item.cover" mode="aspectFill" lazy-load></image>
		</view>
		
		<view>
			<view class="title">#{{item.title}}#</view>
			<view class="desc">{{item.desc}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({
					"title": "",
					"cover": "",
					"desc": "",
					"category": ""
				})
			},
		},
		methods: {
			opendatel() {
				this.$emit("click",this.item)
				// uni.navigateTo({
				// 	url: '../../pages/topicdetail/topicdetail?id='+this.item._id
				// },true)
			}
		}
	}
</script>

<style scoped lang="scss">
	.topic-item {
		padding: 20rpx 0;
		border-bottom: 1px solid #EFEFEF;
		

		.image {
			image{
				width: 180rpx;
				height: 180rpx;
				border-radius: 10rpx;
			}
			width: 180rpx;
			height: 180rpx;
			
			margin-right: 20rpx;
		}

		.title {
			font-size: 30rpx;
			color: #007AFF;
		}

		.desc {
			font-size: 25rpx;
			color: #A4A4A4;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	.top-lists {}

	.top-lists .top-lists>view {
		margin-left: 20upx;
	}

	.top-lists>view>view:nth-child(1) {}

	.top-lists>view>view:nth-child(2) {}

	.top-lists>view>view:nth-child(3) {
		font-size: 25upx;
		color: #A4A4A4;
	}
</style>
