<template>
	<view class="container">

		<slot></slot>
		<u-notify ref="uNotify" message="Hi uView"></u-notify>
		<!-- <view class="">
			{{receive}}
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true
			}
		},
		computed:{
			receive(){
				return this.$store.state.receive
			}
		},
		watch:{
			receive(newVal){
				// console.log(newVal)
				this.$refs.uNotify.primary('收到一条消息')
			}
		},
		methods: {
			notify() {
				this.$refs.uNotify.primary('Primary主题')
				// this.$refs.uNotify.show({
				// 	top: 10,
				// 	type: 'error',
				// 	color: '#000',
				// 	bgColor: '#e8e8e8',
				// 	message: 'Hi uView',
				// 	duration: 1000 * 3,
				// 	fontSize: 20,
				// 	safeAreaInsetTop: true
				// })

			}
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100%;
	}
</style>
