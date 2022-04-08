<template>
	<view class="userspace-head flex align-middle justify-center">
		<image :src="bg" mode="widthFix" lazy-load @tap="changebg"></image>
		<view class="userspace-head-info flex align-middle justify-center flex-column">
			<avatar class="image" :src="userinfo.avatar" width="150rpx"></avatar>
			<!-- <image :src="userinfo.avatar" mode="widthFix" lazy-load></image> -->
			<view class="name flex align-middle userspace-head-margin">
				{{userinfo.nickname}}<tag-sex :sex="userinfo.sex" ></tag-sex>
			</view>
			<view class="icon iconfont userspace-btn userspace-head-margin"
			v-if="!isMe"
			:class="[isFollow?'active':'icon-zengjia']" @tap.stop="handleFollow">
				{{isFollow?'已关注':'关注'}}
			</view>
		</view>
	</view>
</template>

<script>
	import tagSex from '@/compoents/common/tag-sex.vue'
	export default {
		components:{
			tagSex
		},
		props:{
			userinfo:Object
		},
		data() {
			return{
				isFollow:this.userinfo.isFollow ,
				bg_num:1
			}
		},
		computed:{
			isMe(){
				return this.userinfo.uid == this.$store.state.userinfo.uid
			},
			bg(){
				return '../../static/images/bg/'+this.bg_num+'.jpg'
			}
		},
		watch:{
			userinfo(newVal,old){
				this.isFollow=newVal.isFollow ;
			},
		},
		methods: {
			//改变背景图
			changebg(){
				let num=parseInt(this.bg_num);
				this.bg_num = num<4? ++num : 1;
			},
			//关注
			handleFollow(){
				let uid = this.$store.state.userinfo.uid;
				let follower_id = this.userinfo.uid
				
				
				this.$api.follow({
						user_id: uid,
						follower_id,
					}).then((res) => {
						console.log(res);
						this.isFollow = res.follow;
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}	
</script>

<style scoped>
.userspace-head{
	position: relative;
    height: 500rpx;
	overflow: hidden;
}
.userspace-head>image{
	width: 100%;
}
.userspace-head-info{
	position: absolute;
	top: 150rpx;
}
.userspace-head-info .name{
	font-size: 35rpx;
	font-weight: bold;
	text-shadow: 2rpx 2rpx 10rpx #333333;
	color: #FFFFFF;
}
.userspace-head-info>image{
	height: 150rpx;
	width: 150rpx;
	border-radius: 100%;
}
.userspace-btn{
	background: #FFE933;
	border: 1rpx solid #FFE933;
	border-radius: 10rpx;
	color: #4A3F06;
	font-size: 28rpx;
	padding: 0 15rpx;
}
.active{
	background: none;
	border: 1rpx solid #FFFFFF;
	color: #FFFFFF;
}	
</style>
