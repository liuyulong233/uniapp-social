<template>
	<view class="fixed box">
		<view class="add flex align-middle">
			<view class="icon iconfont icon-smile" @click="show_emoji=!show_emoji"></view>
			<input type="text" ref="inputRef" :placeholder="placeholder" v-model="text" @focus="onFocus"
				:adjust-position="false" @blur="onBlur" />
			<view class="icon iconfont icon-fabu u-f-ajc" @tap="submit"></view>
		</view>

		<emoji-list :style="{'max-height':show_emoji?'300px':'0'}" class="emoji" @click="(val)=>setEmoji(val.alt)">
		</emoji-list>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String,
				default: '文明发言'
			}
		},
		data() {
			return {
				text: '',
				show_emoji: false,
				selection_end: 0
			}
		},
		methods: {
			submit() {
				this.$emit('submit', this.text);
				this.text = "";
			},
			onFocus(e) {
				uni.onKeyboardHeightChange(res22 => {
					/* console.log(res22.height) 
					 this.scrollH=e.detail.height;*/
					if (res22.height == 0) {
						this.scrollH = 0;
					}
				})

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

					return;
				}
				let str = this.text.substring(0, this.selection_end)
				this.text = this.text.replace(str, str + emojiText)
				this.selection_end += emojiText.length
				let inputRef = this.$refs.inputRef;
				console.log(inputRef)
			},
			onBlur(e) {
				this.scrollH = 0;
				this.selection_end = e.target.cursor
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		bottom: 0px;
		left: 0;
		width: 100%;
		background: #FFFFFF;
		z-index: 11070;

		.add {
			height: 120rpx;
			border-top: 1px solid #EEEEEE;
			padding: 0 10rpx;
			background: #FFFFFF;

			>input {
				flex: 1;
				background: #F7F7F7;
				margin-right: 20upx;
				padding: 20upx 20upx;
				border-radius: 10upx;
			}

			>view {
				width: 80upx;
				font-size: 45upx;
			}
		}

		.emoji {
			transition: all .8s ease-in-out;
			overflow: hidden;
		}
	}
</style>
