<template>
	<view>
		
		<u-collapse @change="change" @close="close" @open="open">
			<u-collapse-item   v-for="item in accordion" :key="item.id" :title="item.title">
				<text class="content">{{item.content}}</text>
			</u-collapse-item>

		</u-collapse>
		<view class="btn">
			<button class="user-set-btn" type="primary">意见反馈</button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				accordion: [{
						id: 0,
						title: '客服什么时候在线？',
						content: '周一至周六10：00-12：00',
						animation: true
					},
					{
						id: 1,
						title: '忘记账号/昵称/密码怎么办',
						content: '你猜',
						animation: true
					},
					{
						id: 2,
						title: '怎么搜索/查找、关注/取关用户？',
						content: '不告诉你',
						animation: true
					}
				],
			}
		},
		methods: {
			open(e) {
				// console.log('open', e)
			},
			close(e) {
				// console.log('close', e)
			},
			change(e) {
				// console.log('change', e)
			}
		}
	}
</script>

<style scoped> 
	.content {
		background-color: #f9f9f9;
		color: #666;
	}
	::v-deep .u-collapse-item__content__text{
		background-color: #f9f9f9;
	}
	.btn{
		margin-top: 20px;
	}
</style>
