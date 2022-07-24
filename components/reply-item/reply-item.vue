<template>
	<view class="uni-comment-list">
		<view class="uni-comment-face">
			<image :src="item.user.avatar" class="comment-avatar" mode="aspectFill"></image>
		</view>
		<view class="uni-comment-body">
			<view class=" name"><text>{{item.user.nickname}}</text>
			</view>
			<view class="reply" v-if="item.reply&&item.reply.uid">
				@{{item.reply.user.nickname}}:{{item.reply.content}}
			</view>
			<view class="uni-comment-content">
				<rich-text :nodes="content"></rich-text>
			</view>
			<view class="uni-comment-date">
				<view>{{item.create_at||'2022-2-27'}}</view><view class="uni-comment-replay-btn" @click="reply(item)">回复</view>
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
					content: '',
					user: {},
					reply: {}
				})
			},
		},
		computed: {
			content() {
				return replaceTextToEmoji(this.item.content)
			}
		},
		methods: {
			reply(val) {
				this.$emit('reply', val)
			}
		}
	}
</script>

<style scoped>
	.reply {
		padding: 3px 8px;
		background: #f8f8f8;
		color: #5b5b5b;
		font-size: 14px;
		margin-bottom: 5px;
	}
	.name{
		color: #0A98D5;
		font-size: 30rpx;
	}
	.comment-avatar{
		height: 72rpx;
		width: 72rpx;
	}
</style>
