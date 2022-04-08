<template>
	<view class="h-full relative overflow-hidden">
		<view class="bg-1 absolute">
		</view>
		<view class="bg-2 absolute">
		</view>
		<view class="register absolute" @click="goToPage">
			注册
		</view>
		<view class="register absolute icon iconfont icon-guanbi" @click="back">
		</view>
		<view class="content flex flex-column align-middle">
			<view class="title text-purple">
				社区博客
			</view>
			<view class="login-tip">
				欢迎登录
			</view>
			<view class="login-form">
				<view class="form-item">
					<u--input placeholder="输入用户UID" prefixIcon="account-fill" v-model.trim="form.username"
						shape="circle" :placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle">
					</u--input>
				</view>
				<view class="form-item">
					<u--input placeholder="输入密码" prefixIcon="lock-fill" v-model.trim="form.password" type="password"
						shape="circle" :placeholderStyle="placeholderStyle" :prefixIconStyle="prefixIconStyle">
					</u--input>
				</view>
				<view class="code-form flex justify-between ">
					<u--input class="input" placeholder="输入验证码" v-model.trim="form.code" shape="circle"
						:placeholderStyle="placeholderStyle">
					</u--input>
					<u-button v-if="!isGetCode" @click="getVerifyCode" class="btn" text="获取验证码" type="primary"
						shape="circle"></u-button>
					<image v-else class="code-img" @click="getVerifyCode" mode="aspectFit" :src="verifyCode">
					</image>
				</view>
				<u-button :disabled="disabled" class="login-btn" type="primary" shape="circle" @click="login">登录</u-button>
			</view>
		</view>
		<view class="other-login-title flex align-middle justify-center login-padding login-font-color">第三方登录</view>
		<third-party-login class="other"></third-party-login>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				placeholderStyle: `color: 'rgba(166, 166, 166, 0.89)'`,
				prefixIconStyle: `
					font-size :'22px';
					color: ' #909399'
				`,
				
				form: {
					username: '',
					password: '',
					code: ''
				},
				isGetCode: false,
				verifyCode: ''
			}
		},
		onLoad() {},
		computed: {
			disabled() {
				let form = this.form;
				let s1 = form.username.length == 6;
				let s3 = uni.$u.test.rangeLength(form.password, [6, 15]);
				let s2 = uni.$u.test.code(form.code, 6)
				return !(s1 && s2 && s3)
			}
		},
		methods: {
			...mapMutations(['set_login']),
			goToPage() {
				console.log('goToPage')
				uni.navigateTo({
					url: '../register/register'
				})
			},
			getVerifyCode() {
				this.isGetCode = true;
				this.verifyCode = this.$api.getVerifyCode('login')
			},
			back() {
				console.log('返回')
				uni.navigateBack({
					delta: 1
				})
			},
			login() {
				let form = {
					...this.form
				}
				this.$api.login(form).then(res=>{
					console.log(res)
					this.set_login(res)
					// uni.switchTab({
					// 	url:'../index/index',
					// 	fail(err) {
					// 		console.log('set_login',err)
					// 	}
					// })
				})
				.catch(err=>{
					console.log(err)
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {}

	.bg-1 {
		left: -159rpx;
		top: -150rpx;
		width: 600rpx;
		height: 600rpx;
		border-radius: 500rpx;
		background: rgba(42, 130, 228, 0.2);
		z-index: -1;
	}

	.bg-2 {
		right: -100rpx;
		bottom: -200rpx;
		width: 231px;
		height: 229px;
		border-radius: 200px;
		background: rgba(121, 72, 234, 0.25);
		z-index: -1;
	}

	.register {
		right: 15px;
		top: 15px;
		font-size: 20px;
		font-weight: bold;
	}

	.title {
		margin-top: 250rpx;
		margin-bottom: 50rpx;
		font-size: 80rpx;
		color: rgba(121, 72, 234, 0.9);
	}

	.login-tip {
		font-size: 50rpx;
		color: #333333;
	}

	.login-form {
		margin-top: 50rpx;
		width: 500rpx;
	}

	.form-item {
		// height: 80rpx;
		background: rgba(255, 255, 255, 1);
		background-blend-mode: normal;
		border-radius: 60rpx;
		box-shadow: 7px 6px 23px rgba(0, 0, 0, 0.22);
		margin-bottom: 40rpx;
	}

	.code-form {
		border-radius: 60rpx;

		.input {
			width: 250rpx;
			background-color: #fff;
			box-shadow: 7px 6px 23px rgba(0, 0, 0, 0.22);
		}

		.btn {
			width: 200rpx;
			box-shadow: 7px 6px 23px rgba(0, 0, 0, 0.22);
		}
	}

	.code-img {
		height: 40px;
		width: 200rpx;
		background-color: #eeeeee;
	}

	.login-btn {
		box-shadow: 0px 2px 4px rgba(0, 0, 0, .5);
		margin-top: 40rpx;
		height: 45px;
	}

	.form-item ::v-deep .u-input {
		// padding: 8px 9px;;
		height: 84rpx;
	}

	.other-login-title {
		position: relative;
		margin-top: 20px;
	}

	.other-login-title:before,
	.other-login-title:after {
		content: "";
		position: absolute;
		background: #BBBBBB;
		height: 1rpx;
		width: 100rpx;
		top: 50%;
	}

	.other-login-title:before {
		left: 25%;
	}

	.other-login-title:after {
		right: 25%;
	}

	.icon-guanbi {
		left: 15px;
		width: 100px;
	}
</style>
