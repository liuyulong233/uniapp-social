<template>
	<view class="body">
		<view class="user-info-list ">
			<view>头像</view>
			<view class="" @tap="choessimg">
				<image :src="userinfo.avatar" mode="aspectFill" lazy-load></image>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-info-list ">
			<view>昵称</view>
			<view class="">
				<input type="text" v-model="userinfo.nickname" maxlength="10" />
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-info-list ">
			<view>性别</view>
			<view class="" @tap="changedan('sex')">
				<view>{{sexMap[userinfo.sex]}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-info-list ">
			<view>生日</view>
			<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="flex">
					<view class="birthdaycss">{{birthday}}</view>
					<view class="icon iconfont icon-bianji1"></view>
				</view>
			</picker>
		</view>
		<view class="user-info-list ">
			<view>情感</view>
			<view class="" @tap="changedan('qg')">
				<view>{{qg}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-info-list ">
			<view>职业</view>
			<view class="" @tap="changedan('job')">
				<view>{{job}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-info-list ">
			<view>住址</view>
			<view class="" @tap="showMulLinkageThreePicker">
				<view>{{pickerText}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>

		<button class="user-set-btn" type="primary" @tap="submit">完成</button>
		<mpvueCitypicker ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm">
		</mpvueCitypicker>
	</view>
</template>

<script>
	let sex = ['女' ,'男','未知' ];
	let qg = ['秘密', '未婚', '已婚'];
	let job = ['秘密', 'IT', '家教'];
	import mpvueCitypicker from '../../compoents/mpvue-citypicker/mpvueCityPicker.vue';
	export default {
		components: {
			mpvueCitypicker
		},
		data() {
			return {
				userinfo:this.$store.state.userinfo,
				birthday:"",
				job:"",
				pickerText:"",
				qg:""
			}
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onLoad() {
			this.sexMap={
				0:'女' ,1:'男',2:'未知' 
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
			
		},
		computed: {
			
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			// 三级联动
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.showPickerView()
			},
			onConfirm(e) {
				this.pickerText = e.label;
			},
			//选择日期
			bindDateChange(e) {
				this.birthday = e.target.value
			},
			//选择图片
			choessimg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						this.userpic = res.tempFilePaths[0];
					}
				});
			},
			//单列选择
			changedan(val) {
				let arr = [];
				switch (val) {
					case 'sex':
						arr = sex;
						break;
					case 'qg':
						arr = qg;
						break;
					case 'job':
						arr = job;
						break;
					default:
						break;
				}
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						switch (val) {
							case 'sex':
								this.sex = arr[res.tapIndex];
								break;
							case 'qg':
								this.qg = arr[res.tapIndex];
								break;
							case 'job':
								this.job = arr[res.tapIndex];
								break;
							default:
								break;
						}
					}
				});
			},
			/* submit(){
				
			}, */
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style scoped>
	.user-info-list {
		padding: 20rpx;
		border-bottom: 1rpx solid #F4F4F4;
		display: flex;
		justify-content:space-between;
		align-items: center;
	}

	.user-info-list>view:nth-child(1) {
		font-size: 30rpx;
		color: #9B9B9B;
		font-weight: bold;
	}
	.user-info-list>view:nth-child(2) {
		display: flex;
	}

	.user-info-list>view:nth-child(2)>image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}

	.user-info-list>view:nth-child(2)>input {
		text-align: right;
		font-weight: bold;
		font-size: 30rpx;
	}

	.user-info-list>view:nth-child(2)>view:nth-child(1) {
		font-weight: bold;
	}

	.user-info-list>view:nth-child(2)>view:last-of-type {
		color: #9B9B9B;
		margin-left: 20rpx;
		font-weight: bold;
	}

	.birthdaycss {
		font-weight: bold;
	}

	.icon-bianji1 {
		color: #9B9B9B;
		margin-left: 20rpx;
		font-weight: bold;
	}
</style>
