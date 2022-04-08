<template>
	<view>
		<view class="cover  flex align-middle justify-center">
			<view class="image relative" @click="getImage">
				<image :src="info.cover" mode="aspectFill"></image>
				<view v-if="!info.cover" class="tip absolute flex justify-center">
					添加头像
				</view>
			</view>

		</view>

		<view class="form">
			<view class="form-item">
				<text class="form-item_title">话题名称</text>
				<view class="form-item_content">
					<u--input v-model="info.title" placeholder="给话题取个名称(不超过12个字)" border="bottom" clearable></u--input>
				</view>
			</view>
			<view class="form-item">
				<text class="form-item_title">话题简介</text>
				<view class="form-item_content">
					<u--textarea v-model="info.desc" maxlength="200" placeholder="用于解释话题立意(不超过200个字)"></u--textarea>

				</view>
			</view>
			<view class="form-item">
				<text class="form-item_title">分类</text>
				<view class="form-item_content flex flex-wrap ">
					<block class="" v-for="(item, index) in type" :key="index">
						<u-tag class="tag" :text="item.name" :plain="!item.checked" type="warning" :name="index"
							@click="radioClick">
						</u-tag>
					</block>
				</view>
			</view>
			
		</view>
		<button type="primary" :disabled="disabled" class="btn" @click="submit">立即创建</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					cover: '',
					title: "",
					desc: "",
					category: ""
				},
				type: [
					{
						name: '游戏',
						checked:false
					},
					{
						name: '兴趣',
						checked:false
					},
					{
						name: '学习',
						checked:false
					},
					{
						name: '生活',
						checked:false
					},
					{
						name: '校园',
						checked:false
					},
					{
						name: '娱乐',
						checked:false
					},
					{
						name: '工作',
						checked:false
					},
					{
						name: '其他',
						checked:false
					},
				]
			}
		},
		computed:{
			disabled(){
			return	this.info.cover==''||this.info.title==''||this.info.desc==''||this.info.category==''
			}
		},
		methods: {
			submit(){
				
				this.$api.addTopic(this.info).then(res => {
					
					uni.$u.toast('创建成功')
					uni.navigateBack({
						delta:1
					})
				}).catch(err => {
					console.log('err', err)
				})
			},
			radioClick(name) {
				
				console.log(name)
				this.type.forEach((item, index) => {
					item.checked = index === name ? true : false
					if(item.checked){
						this.info.category=item.name
					}
				})
				console.log(this.info)
			},
			getImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						console.log(res)
						this.upload(res.tempFilePaths[0])
					}
				});
			},
			upload(path) {
				this.$api.upload(path).then(([err, res]) => {
					if (err) {
						console.log('file-err', err)
					}
					let data = JSON.parse(res.data)
					let url = uni.API_URL + data.url;
					this.info.cover = url
					// this.fileList.push({
					// 	url:data.url
					// })
					console.log('file', url, data)
				}).catch(err => {
					console.log('file-err', err)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.cover {
		height: 100px;

		.image {
			border: 1px solid #b2b2b2;
			background-color: #f4f4f4;

			image {
				width: 180rpx;
				height: 180rpx;
				border-radius: 10rpx;
			}

			border-radius: 10rpx;
			overflow: hidden;
			width: 180rpx;
			height: 180rpx;

			.tip {
				width: 100%;
				bottom: 0rpx;
				background-color: #EEEEEE;
				color: #b2b2b2;
			}
		}
	}

	.form {
		padding: 0 20rpx;

		.form-item {
			margin-top: 20px;

			&_title {
				margin-bottom: 20rpx;
			}
		}
	}
	.tag{
		margin-right: 15rpx;
		margin-top: 10px;
	}
	.btn{
		margin-top: 30px;
	}
</style>
