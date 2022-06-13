<template>
	<view>
		<view class="flex justify-center" style="margin-top: 10px;">
			<image style="width: 130rpx;height:130rpx;border-radius: 50%;" src="/static/images/avatar/0.png" mode="widthFix"></image>
		</view>
		<text class="title">群成员</text>
		<u-grid :border="false" col="4">
			<u-grid-item v-for="item in 6" :key="item">
				<view class="avatar-box">
					<image src="/static/images/avatar/0.png" mode=""></image>
					<text class="ellipsis">群成员群成员群成员群成员</text>
				</view>
			</u-grid-item>
		</u-grid>
		<view class="list">
			<view class="left">群聊名称</view>
			<view class="name">
				<text></text>
				你好
				<input type="text" v-model="nickname" maxlength="10" />
			</view>
		</view>
		<view class="list">
			<view class="left">我在群聊名称</view>
			<view class="name">
				<input type="text" v-model="nickname" maxlength="10" />
				
			</view>
		</view>
		<view class="list">
			<view class="left">显示群成员名称</view>
			<view class="name">
				<u-switch v-model="value" inactiveColor="rgb(230, 230, 230)" activeColor="#5ac725" ></u-switch>
			</view>
		</view>
		<view class="list">
			<view class="left">设置聊天背景</view>
			<view class="name">
				
			</view>
		</view>
		<u-button type="primary" class="btn" text="保存" :disabled="true"></u-button>
		<u-button type="error" class="btn" text="立即退群" :disabled="true"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname:'hal',
				value:false
			}
		},
		onLoad(options) {
			 this.id=options.id;
		},
		methods: {
			getData(){
				if(!this.id)return;
				this.$api.getGroupInfo({
					
				}).then(res => {
					console.log(res)
					this.mine = res.data
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f4f2f3;
	}

	.title {
		font-size: 16px;
		color: rgb(143, 156, 162);
		margin-bottom: 8px;
		padding-left: 8px;
	}


	.avatar-box {
		display: flex;
		flex-direction: column;
		margin: 10px;
		width: 60px;
		overflow: hidden;

		image {
			width: 60px;
			height: 60px;
			border-radius: 10px;
		}
	}

	.list {
		padding: 20rpx;
		border-bottom: 1rpx solid #F4F4F4;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;

		.left {
			font-size: 16px;
		}

		.name {
			text-align: right;
			color: #CCCCCC;
		}
	}
	.btn{
		margin-top: 20px;
	}
</style>
