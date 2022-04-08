<template>
	<view>
		<u-navbar @rightClick="rightClick" :rightText="rightText" :autoBack="true">
			<view class="flex" slot="center" @click="changePublic">
				{{title}}
				<view class="icon iconfont icon-xialazhankai"></view>
			</view>
		</u-navbar>

		<view class="uni-textarea">
			<textarea ref="inputRef" @input="input" :focus="focus" v-model="text" @focus="onFocus" @blur="blur"
				placeholder="说点什么吧..." />

		</view>
		<!--选择图片-->
		<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="file" :maxCount="9"
			:previewFullImage="true"></u-upload>
		<!-- 底部 -->
		<view class="btm fixed " ref='btm'>
			<view class="box flex justify-around align-middle">
				<view class="icon iconfont icon-smile" @click="show_emoji=!show_emoji"></view>
				<view class="icon iconfont icon-shanchu"></view>
				<view class="" @click="showTopic=true"># </view>
				<view class="">@</view>
			</view>
			<emoji-list class="emoji" :style="{'max-height':show_emoji?'300px':'0'}" @click="(val)=>setEmoji(val.alt)">
			</emoji-list>
		</view>
		<!--弹出公告-->
		<u-popup :show="show" mode="center" round="25">
			<view class="gonggao" style="width: 600rpx;">
				<image src="../../static/images/gonggao.png" mode="aspectFit"></image>
				<view class="zhuyi">1.涉及黄色，政治，广告及骚扰信息，涉及黄色，政治，广告及骚扰信息</view>
				<view class="zhuyi">2.涉及黄色，政治，广告及骚扰信息，涉及黄色，政治，广告及骚扰信息</view>
				<view class="zhuyi">3.涉及黄色，政治，广告及骚扰信息，涉及黄色，政治，广告及骚扰信息</view>
				<view class="zhuyi">一经核实将被封禁，情节严重者永久封禁！</view>
				<button type="default" @tap="show=false">朕知道了</button>
			</view>
		</u-popup>
		<u-popup :show="showTopic" mode="bottom" round="25" @close="close" @open="handleOpen">
			<view class="topic" style="height: 80vh;">
				<block v-for="(item,index) in topicList">
					<topic-item :item="item" :key="item._id" @click="handleClick"></topic-item>
				</block>
			</view>
		</u-popup>
	</view>
</template>

<script>
	let arry = ['仅自己可见', '所有人可见', ]

	export default {
		components: {},

		onLoad(options) {
			this.topic_id = options.topic_id
			if (this.topic_id) {
				this.rightText = "编辑"
				this.getDetail()
			}

			//#ifdef H5
			// document.addEventListener('click', this.documentHandler.bind(this));
			// this.$once('hook:beforedestroy', () => {
			// 	document.removeEventListener('click', this.documentHandler);
			// })
			// #endif
		},
		data() {
			return {
				is_public: 1,
				fileList: [],
				topicList: [],
				show: true,
				showTopic: false,
				rightText: "发布",
				show_emoji: false,
				text: '',
				selection_start: 1,
				selection_end: 0,
				focus: true,
				cursor: 1,


			}
		},
		created() {
			this.cursor = this.text.length
		},
		computed: {
			title() {
				return arry[this.is_public]
			}
		},
		watch: {
			showTopic(newVal) {
				if (newVal) {
					this.getTopicList()
				}
			}
		},
		methods: {
			handleOpen() {
				console.log('open');
				this.getTopicList()
			},
			handleClick(item) {
				this.topic = item;
				this.showTopic = false
				let reg = /\#([^\#|.]+)\#/g
				if (this.text.indexOf('#') == -1) {
					this.text = `#${item.title}#` + this.text
				} else {
					this.text=this.text.replace(reg, (item, index) => {
						return `#${this.topic.title}#`
					})
				}

				// 
			},
			close() {
				this.showTopic = false
				console.log('close');
			},
			getTopicList() {
				this.$api
					.getTopics({
						page_size: 100
					})
					.then((res) => {
						console.log(res);
						this.topicList = res.data
					})
					.catch((err) => {
						console.log(err);
					});
			},
			getDetail() {
				this.$api.getDynamicDetail({
					_id: this.topic_id
				}).then(res => {
					console.log(res)
					let data = res.data;
					this.info = data;
					this.text = data.content;
					this.fileList = data.album.map(item => ({
						url: item
					}));
					this.is_public = data.is_public;
				})
			},
			documentHandler(e) {
				let el = e.target;
				console.log(this.$refs.btm.$el.contains(el))
				if (this.show_emoji && !this.$refs.btm.$el.contains(el)) {
					this.show_emoji = false;
				}
			},
			blur(e) {
				this.focus = false;
				console.log(e.target.cursor)
				this.selection_end = e.target.cursor
			},
			onFocus(e) {
				console.log(e, this.$refs.inputRef.cursor)
				this.selection_end = e.target.cursor
			},
			input(e) {
				console.log(e)
			},
			setEmoji(emojiText) {
				if (emojiText === '[删除]') {
					let str;
					var msglen = this.selection_end;
					let laststr = this.text.substring(0, msglen);
					let endstr = this.text.substring(msglen, this.text.length)
					console.log(laststr, endstr)
					let start = laststr.lastIndexOf("[");
					let end = laststr.lastIndexOf("]");
					let len = end - start;
					console.log(end, start, msglen)

					// 删除整个表情文本
					if (msglen - end == 1) {
						let delstr = this.text.substring(start, end + 1)
						console.log(delstr)
						str = this.text.replace(delstr, '');
						this.selection_end -= delstr.length
					} else {
						// delstr=laststr.substring(msglen-1, msglen)
						// str = this.text.replace(delstr, '');
						str = this.text.slice(0, msglen - 1) + endstr;
						this.selection_end--
					}


					this.text = str;

					// this.focus=true;
					// console.log(this.$refs.inputRef.cursor)
					// this.selection_end =this.$refs.inputRef.cursor
					return;
				}
				let str = this.text.substring(0, this.selection_end)
				this.text = this.text.replace(str, str + emojiText)
				this.selection_end += emojiText.length
				let inputRef = this.$refs.inputRef;
				console.log(inputRef)
				// inputRef.focus();
				// inputRef.setRangeText(
				// 	emojiText,
				// 	inputRef.selectionStart,
				// 	inputRef.selectionEnd,
				// 	"end"
				// );
				// inputRef.blur();
			},
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				console.log(event)

				this.$api.upload(event.file.url).then(([err, res]) => {
					if (err) {
						console.log('file-err', err)
					}
					let data = JSON.parse(res.data)
					let url = uni.API_URL + data.url;
					this.fileList.splice(event.index, 1, {
						url
					})
					// this.fileList.push({
					// 	url:data.url
					// })
					console.log('file', url, data)
				}).catch(err => {
					console.log('file-err', err)
				})
			},
			uploadFilePromise(url) {
				this.$api.upload()
			},

			previewImage: function(e) {
				console.log(e);
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList,
					indicator: 'default'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			add() {
				let album = this.fileList.map(item => item.url)
				this.$api
					.addDynamic({
						...this.info,
						album,
						content: this.text,
						is_public: this.is_public,
						topic: this.topic._id
					})
					.then((res) => {
						console.log(res);
						uni.showToast({
							title: '发布成功'
						})
						uni.switchTab({
							url: '/pages/index/index'
						})
					})
					.catch((err) => {
						console.log(err);
					});
			},
			edit() {
				let album = this.fileList.map(item => item.url)
				this.$api
					.addDynamic({
						album,
						content: this.text,
						is_public: this.is_public,
						topic: this.topic / _id
					})
					.then((res) => {
						console.log(res);
						uni.showToast({
							title: '发布成功'
						})
						uni.switchTab({
							url: '/pages/index/index'
						})
					})
					.catch((err) => {
						console.log(err);
					});
			},
			rightClick() {
				if (this.topic_id) {
					uni.$u.toast('编辑功能正在开发！！')
				} else {
					this.add()
				}

			},
			changePublic() {
				uni.showActionSheet({
					itemList: arry,
					success: (res) => {
						this.is_public = res.tapIndex;
					}
				});
			},

		}
	}
</script>

<style scoped lang="scss">
	.uni-textarea {
		padding-top: 44px;
	}

	.widthatch {
		margin: 0 auto;
		padding-right: 20upx;
		color: #010101;
		font-weight: bold;
		font-size: 32upx;
	}

	.gonggao {
		width: 500upx;
		background-color: #FFFFFF;
		border-radius: 10upx;
		padding: 30upx 40upx;
	}

	.gonggao image {
		width: 90%;
		height: 200rpx;
	}

	.gonggao button {
		background-color: #FFE934;
		margin-top: 40upx;
		border-radius: 10upx;
	}

	.zhuyi {
		text-align: left;
	}

	.btm {

		width: 100%;
		bottom: 0;

		.box {
			background-color: #f4f5f7;
			height: 45px;

			view {
				font-size: 20px;
			}
		}


	}

	.emoji {
		transition: all .8s ease-in-out;
	}

	.topic {
		padding: 20rpx;
	}
</style>
