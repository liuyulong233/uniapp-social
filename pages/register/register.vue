<template>
	<view class="container w-full h-full overflow-scroll relative">
		<view class="icon absolute" @click="back">
			<u-icon name="arrow-left" size="28"></u-icon>
		</view>
		<view class="title">
			欢迎注册
		</view>
		<u--form labelPosition="top" ref="form" :labelStyle="labelStyle" :rules="rules" :model="info">
			<u-form-item label="昵称" prop="nickname" borderBottom>
				<u--input style="padding: 6px 0px;" fontSize="18px" v-model="info.nickname" placeholder="请输入昵称"
					border="none" clearable></u--input>
			</u-form-item>
			<u-form-item label="手机号码" prop="mobile" borderBottom>
				<u--input style="padding: 6px 0px;" maxlength="11" fontSize="18px" v-model="info.mobile"
					placeholder="请输入手机号" border="none" clearable></u--input>
			</u-form-item>
			<u-form-item label="邮箱" prop="email" borderBottom>
				<u--input style="padding: 6px 0px;" fontSize="18px" v-model="info.email" placeholder="请输入邮箱"
					border="none" clearable></u--input>
			</u-form-item>
			<u-form-item label="登录密码" prop="password" borderBottom>
				<u--input style="padding: 6px 0px;" maxlength="15" type="password" fontSize="18px"
					v-model.trim="info.password" placeholder="请输入密码（6-15位由字母数字构成）" border="none" clearable></u--input>
			</u-form-item>
			<u-form-item label="确认密码" prop="password1" borderBottom>
				<u--input style="padding: 6px 0px;" maxlength="15" fontSize="18px" type="password"
					v-model.trim="info.password1" placeholder="请确认密码" border="none" clearable></u--input>
			</u-form-item>
			<u-form-item label="验证码" prop="info.code" borderBottom class="relative">
				<u--input style="padding: 6px 0px;" maxlength="6" fontSize="18px" v-model="info.code"
					placeholder="请输入验证码" border="none" clearable></u--input>
				<view class="code-tip absolute">
					<text v-if="!isGetCode" @click="getVerifyCode">获取验证码</text>
					<image v-else class="code-img" @click="getVerifyCode" mode="aspectFit" :src="verifyCode">
					</image>
				</view>
			</u-form-item>
			
		</u--form>
		<view class="checkbox flex align-middle">
			<checkbox :checked="checked" @click="checked=!checked" style="transform:scale(0.8)" />
			<text @click="checked=!checked">我已阅读用户协议</text>
		</view>
		<u-button class="btn" type="primary" shape="circle" @click="submit">提交注册</u-button>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				labelStyle: {
					'font-size': '20px',
					width: '150px'
				},
				isGetCode: false,
				verifyCode: '',
				info: {
					nickname: "",
					mobile: '',
					password: "",
					code: '',
					email: ""
				},
				rules: {
					nickname: [{
							required: true,
							type: 'string',
							message: '请输入姓名',
							trigger: ['blur']
						}, // 6-8个字符之间的判断
						{
							min: 2,
							max: 8,
							message: '长度在2-8个字符之间'
						},
					],
					mobile: [{
							required: true,
							message: '请输入手机号',
							len: 11,
							trigger: ['blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['blur'],
						},
						{
							min: 6,
							max: 15,
							message: '长度在6-15个字符之间'
						},
						{
							pattern: /^[0-9a-zA-Z]*$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '字符包含字母和数字'
						}
					],
					password1: [{
							required: true,
							message: '请确认输入密码',
							trigger: ['blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// console.log(this)
								return value == this.info.password;
							},
							message: '密码不一致',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: ['blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								return uni.$u.test.email(value);
							},
							message: '邮箱格式不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					],

					code: [{
						type: 'string',
						required: true,
						len: 6,
						message: '请填写6位验证码',
						trigger: ['blur']
					}, ]
				},
				password: "",
				checked: false
			}
		},
		methods: {
			...mapMutations(['set_login']),
			back() {
				uni.navigateBack()
			},
			getVerifyCode() {
				this.isGetCode = true;
				this.verifyCode = this.$api.getVerifyCode('login')
			},

			submit() {
				console.log(this.checked)
				if (!this.checked) {
					uni.$u.toast('请勾选已读用户协议')
					return
				}
				this.$refs.form.validate().then(res => {
					let form = {
						...this.info
					}
					delete form.password1
					console.log(res, form)
					this.$api.register(form).then((data) => {
						console.log(data)
						data.userinfo.avatar='../../static/userpic/10.jpg'
						this.set_login(data)
					}).catch(errors => {
						console.log(errors)
					})
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		box-sizing: border-box;
		padding: 20px;

	}
	.icon{
		top: 50rpx;
	}

	.title {
		margin-top: 100rpx;
		font-size: 28px;
		margin-bottom: 10px;
	}

	.form-item {

		text {
			font-size: 18px;
		}
	}

	.code-tip {
		right: 20px;
	}

	.checkbox {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.btn {
		height: 50px;
		font-size: 18px;
	}

	.code-img {
		height: 45px;
		width: 240rpx;
		background-color: #eeeeee;
	}

	.form-item ::v-deep .u-input {}
</style>
