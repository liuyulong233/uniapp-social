<template>
	<view>
		<view
		class="common-list-right-one flex align-middle justify-center icon iconfont"
		:class="[sex==1?'icon-nan':'icon-nv',
		 sex==1?'':'nvcolor']"
		>{{userage}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			sex:Number,
			userage:String 		
		}
	}
</script>

<style scoped>
.nvcolor{
	background-color: #FF698D!important;
}
.common-list-right-one{
	    color: #FFFFFF;
		font-size: 25upx;
		background-color: #44B3FF;
		padding: 0 15upx;
		margin-left: 10upx;
		border-radius: 50upx;
		height: 35upx;
	
}
</style>
