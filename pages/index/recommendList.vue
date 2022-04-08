<template>
	<view>
		<dyItem  v-for="(item,index) in list" :key="index" class="dy-item" :item="item"
			@follow="(item)=>onFollow(item,index)" @other="(type)=>onOther(type,index)">
		</dyItem>
	</view>

</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			//关注
			onFollow(item, index) {
				console.log(item, index)
				// uni.showToast({
				// 	title: '关注成功',
				// 	mask: true,
				// 	icon: 'none'
				// })
			},
			//顶踩操作
			onOther(type, index) {
				console.log(type, index)

			},
		}
	}
</script>

<style scoped>
	.dy-item {
		border-bottom: 16rpx solid #F2F2F2;
		/* margin-bottom: 20px; */
	}
</style>
