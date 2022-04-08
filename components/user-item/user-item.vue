<template>
	<view class="user-list flex  align-middle">
		<!-- 左 -->
		<view class="left flex align-middle">
			<avatar class="image" :src="item.avatar" @click="goTo"></avatar>
			<!-- <image :src="item.avatar" mode="widthFix" lazy-load ></image> -->
			<view class="name" @click="goTo">
				{{item.nickname}}
				<!-- <view style="display: inline-block;width: 45px;">
				<tagSex :sex="item.sex" :userage="item.age"></tagSex>
			</view> -->
			</view>
		</view>
		<!-- 中 -->

		<!-- 右 -->
		<view>
			<u-button text="聊天" type="primary" @click="tochat"></u-button>
		</view>
	</view>
</template>

<script>
	// import tagSex from "../common/tag-sex.vue";
	export default {
		components: {
			// tagSex
		},
		props: {
			item: Object,
			index: Number
		},
		methods:{
			//个人空间
			goTo() {
				uni.navigateTo({
					url: '../../pages/userspace/userspace?uid=' + this.item.uid
				})
			},
			tochat(){
				let obj={
					...this.item,
					type:"SINGLE"
				}
				let uid=this.$store.state.userinfo.uid
				obj.accounts=[uid, this.item.uid].sort((a, b) => a - b)
				this.$store.commit('set_curchat',obj)
				uni.navigateTo({
					url:'../../pages/userchat/userchat'
				})
			}
		}
	}
</script>

<style scoped>
	.user-list {
		margin: 0 20upx;
		padding: 20upx 0;
		border-bottom: 1upx solid #EEEEEE;
	}
	.left{
		flex: 1;
	}
	.left .image{
		margin-right: 10upx;
		
	}
	
</style>
