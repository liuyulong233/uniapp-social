<template>
	<view class="content">
		<article-info :topic_id="topic_id" ></article-info>
		<comment-list ref="comment" :topic_id="topic_id" :type="2"></comment-list>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
			};
		},
		onLoad(options) {
			this.topic_id = options.topic_id;
			this.initTitle();
		},
		methods: {
			//修改标题
			initTitle(obj) {
				uni.setNavigationBarTitle({
					title: "文章详情"
				});
			}
		}
	};
	
</script>

<style>
	page {
		background-color: #ffffff;
	}

	.content {
		margin: 30rpx;
	}
</style>
