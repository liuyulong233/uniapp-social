<template>
	<view>
		<view class="zhitiao flex align-middle animated fadeIn fast" @tap="tochat">
			
			<avatar :src="item.account.avatar"></avatar>
			<view class="flex align-middle justify-between flex-1">
				<view class="zhitiao-one">
					<view>{{item.account.nickname}}</view>
					<view class="ellipsis">{{item.lastMessage.content}}</view>
				</view>
				<view class="zhitiao-two flex flex-column justify-between">
					<view>{{item.lastMessage.timestamp |date('yyyy-mm-dd')}}</view>
						<view class="">
							 <u-badge   :value="item.noReadCount" ></u-badge>
						</view>
							
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
		},
		props:{
			item:{
				type:Object,
				default:()=>({
					account:{
						
					},
					lastMessage:{}
				})
			}
		},
		methods:{
			tochat(){
				let obj={
					...this.item.account,
					type:this.item.type
				}
				if(obj.type == "SINGLE"){
					obj.accounts=this.item.accounts;
				}
				if(obj.type == "GROUP"){
					obj.uid=this.item.group_id;
				}
				this.$store.commit('set_curchat',obj)
				uni.navigateTo({
					url:'../../pages/userchat/userchat'
				})
			}
		}
	}
</script>

<style scoped>
	.zhitiao{
		padding: 20upx 0upx;
		border-bottom: 1px solid #EEEEEE;
	}	
	.zhitiao .image{
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		flex-shrink: 0;/*不写时默认值为1,空间不够时,会等比例缩小.否则不会变*/	
	}
	
	.zhitiao-one{
		margin-left: 20upx;
		max-width: 400rpx;
	}
	.zhitiao-one>view:nth-child(1){
		font-size: 35upx;
	}
	.zhitiao-one>view:nth-child(2){
		color: #999999;
		font-size: 30upx;
	}
	.zhitiao-two{
		height: 100%;
		text-align: right;
		align-items: flex-end;
	}
	.zhitiao-two>view:nth-child(1){
		color: #CBCBCB;
	}
</style>
