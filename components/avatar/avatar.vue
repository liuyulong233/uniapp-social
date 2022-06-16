<template>
	<u--image  :src="src|formatImage" :width="width" :height="width" shape="circle">
		<view slot="error">
			<image :style="{'width': width,'height': width,'border-radius': '100%'}" :src="error" mode="widthFix" lazy-load></image>
		</view>
	</u--image>
</template>

<script>
	export default{
		props:{
			src:String,
			width:{
				type:String,
				default:'100rpx'
			},
			
			error:{
				type:String,
				default:'../../static/images/avatar/0.png'
			}
		},
		computed:{
			
		}
	}
</script>

<style>
</style>
