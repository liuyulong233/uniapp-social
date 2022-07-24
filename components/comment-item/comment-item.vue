<template>
	<view class="uni-comment-list">
		<view class="uni-comment-face">
			<image :src="item.user.avatar"  class="comment-avatar" mode="aspectFill"></image>
		</view>
		<view class="uni-comment-body">
			<view class="name"><text>{{item.user.nickname}}</text>
			</view>
			<view class="uni-comment-content"><rich-text :nodes="content"></rich-text></view>
			<view class="uni-comment-date">
				<view>{{item.create_at}}</view><view class="uni-comment-replay-btn" @click="reply(item)">{{item.reply_count?item.reply_count:""}} 回复</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {replaceTextToEmoji} from "@/util/emoji.js"
	export default{
		props:{
			item:{
				type:Object,
				default(){
					return{
						user:{}
					}
				}
			},
		},
		computed:{
			content(){
				return replaceTextToEmoji(this.item.content)
			}
		},
		methods:{
			reply(val){
				this.$emit('openReply',val)
			}
		}
	}
</script>

<style scoped lang="scss">
.name{
		color: #0A98D5;
		font-size: 30rpx;
	}
	.comment-avatar{
		height: 72rpx;
		width: 72rpx;
	}
</style>
