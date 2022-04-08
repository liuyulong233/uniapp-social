<template>
	<view class="">
		<view class="close flex " >
			<image @click="click({alt:'[删除]'})" style="height: 30px;" src="../../static/images/delete.webp" mode="heightFix"></image>
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots">
			<swiper-item v-for="(item,index) in swiper_num" :key="index">
				<u-grid :border="false" col="7">
					<u-grid-item class="grid-item" @click="click(sitem)"
						v-for="sitem in emojiInfo.list.slice(21 * index, 21 * (index + 1))" :key="sitem.url">
						<image :src="emojiInfo.path + sitem.url" mode="aspectFill" style="width: 25px;height: 25px;">
						</image>
					</u-grid-item>
					<!-- <u-grid-item class="grid-item" @click="click({alt:'[删除】'})" v-if="index==(swiper_num-1)">
						<image style="height: 30px;" src="../../static/delete2.png" mode="heightFix"></image>
					</u-grid-item> -->
				</u-grid>
			</swiper-item>

		
		</swiper>
	</view>

</template>

<script>
	import {
		emoji2
	} from "@/util/emoji.js";
	export default {
		data() {
			return {
				emojiInfo: emoji2,
				indicatorDots: true,
			}
		},
		computed: {
			swiper_num() {
				return Math.ceil(this.emojiInfo.list.length / 21);
			}
		},
		methods: {
			click(item) {
				console.log(item);
				this.$emit('click', item)
				// this.$refs.uToast.success(`点击了第${name}个`)
			}
		}
	}
</script>

<style scoped lang="scss">
	.close{
		background-color: #F4F4F4;
		justify-content: flex-end;
		image{
			margin-right: 10px;
		}
		
	}
	.grid-item {
		height: 45px;
	}
</style>
