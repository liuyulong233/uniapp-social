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
			<picker mode="date" :value="userinfo.birthday" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="flex">
					<view class="birthdaycss">{{userinfo.birthday}}</view>
					<view class="icon iconfont icon-bianji1"></view>
				</view>
			</picker>
		</view>
		<!-- <view class="user-info-list ">
			<view>情感</view>
			<view class="" @tap="changedan('qg')">
				<view>{{qg}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view> -->
		<!-- <view class="user-info-list ">
			<view>职业</view>
			<view class="" @tap="changedan('job')">
				<view>{{userinfo.job}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view> -->
		<view class="user-info-list ">
			<view>住址</view>
			<view class="" @tap="showMulLinkageThreePicker">
				<view>{{userinfo.address}}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>

		<button class="user-set-btn" type="primary" @tap="submit">保存</button>
		<city-picker ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm">
		</city-picker>
	</view>
</template>

<script>
	let sex = ['女', '男', '未知'];
	let qg = ['秘密', '未婚', '已婚'];
	let job = ['秘密', 'IT', '家教'];
	export default {
		components: {},
		data() {
			return {
				userinfo: {
					email: '', //邮箱
					address: '', //地址
					desc: '暂无', //个人简介
					tag: '未知', //标签
					age: '', //
					sex: '', //0 女 1 男 2未知
					birthday: '', //
					job: "",
					...this.$store.state.userinfo,
				},


				cityPickerValueDefault: [0, 0, 1],
			}
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onLoad() {
			console.log(this.$store.state.userinfo)
			this.sexMap = {
				0: '女',
				1: '男',
				2: '未知'
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
				this.userinfo.address = e.label;
			},
			//选择日期
			bindDateChange(e) {
				this.userinfo.birthday = e.target.value;
				this.userinfo.age = this.getAge(e.target.value)
			},
			//选择图片
			choessimg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						// this.userinfo.avatar = res.tempFilePaths[0];
						this.upload(res.tempFilePaths[0])
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
								this.userinfo.sex = res.tapIndex;
								break;
							case 'qg':
								this.userinfo.qg = arr[res.tapIndex];
								break;
							case 'job':
								this.userinfo.job = arr[res.tapIndex];
								break;
							default:
								break;
						}
					}
				});
			},
			getAge(date) {
				var birthday = new Date(date.replace(/-/g, "\/"));
				var d = new Date();
				var age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d
					.getMonth() == birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0);
				return age + ''
			},
			upload(path) {
				this.$api.upload(path).then(([err, res]) => {
					if (err) {
						console.log('file-err', err)
					}
					res = JSON.parse(res.data)
					let url = uni.API_URL + res.data.url;
					this.userinfo.avatar = url
					// this.fileList.push({
					// 	url:data.url
					// })
					console.log('file', url, res.data)
				}).catch(err => {
					console.log('file-err', err)
				})
			},
			submit() {

				delete this.userinfo.password
				delete this.userinfo.email
				console.log(this.userinfo)
				this.$api.editUserInfo(this.userinfo).then((res) => {
					console.log(res)
					uni.$u.toast('保存成功')
					this.$store.commit('set_userinfo', this.userinfo)
				}).catch(err => {
					console.log('file-err', err)
				})
			},
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
			},

		}
	}
</script>

<style scoped>
	.user-info-list {
		padding: 20rpx;
		border-bottom: 1rpx solid #F4F4F4;
		display: flex;
		justify-content: space-between;
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
