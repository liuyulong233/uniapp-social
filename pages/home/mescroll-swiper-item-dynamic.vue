<template>
	<!-- swiper下使用需要设置高度height -->
	<mescroll-uni class="scroll" ref="mescrollRef" @init="mescrollInit" :height="height+'px'" :top="top" :down="downOption"
		@down="downCallback" @up="upCallback">
		<dy-item v-for="(item,index) in list" :key="index" class="dy-item" :item="item"
			@follow="(item)=>onFollow(item,index)" @other="(type)=>onOther(type,index)">
		</dy-item>
	</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		props: {
			top: {
				type: Number,
				default: 0
			},

			tabindex: {
				type: Number,
				default: 0
			},
			current: {
				type: Number,
				default: 0
			},
			height: {
				type: [Number,String],
				default: '100%'
			},
		},
		data() {
			return {
				list: [],
				triggered: false,
				isOpenRefresh: true, // 是否开启下拉
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},

			}
		},
		watch: {
			tabindex() {
				if (this.current === this.tabindex && this.list.length == 0) {
					this.mescroll.scrollTo(0, 0)
					this.mescroll.triggerDownScroll()
				}

			}
		},
		methods: {

			mescrollInit(res) {
				console.log('mescrollInit', res);
			},

			getDynamicList(num, size) {
				console.log(num, size)
				return this.$api.getDynamics({
					page: num,
					page_size: size
				})
			},

			/*下拉刷新的回调 */
			async downCallback() {

				let res = await this.getDynamicList();
				console.log('下拉刷新的回调', res)
				this.list = res.data;
				let paging = res.paging

				this.mescroll.endSuccess();
				this.mescroll.endBySize(paging.page_size, paging.count)

			},

			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				console.log('上拉加载', this.tabindex, this.current)
				if (this.current != this.tabindex) return
				let data;
				let paging

				let res = await this.getDynamicList(page.num, page.size);
				// console.log('上拉加载的回调', res)
				data = res.data;
				paging = res.paging

				this.mescroll.endSuccess();
				if (data.length == 0) {
					this.mescroll.endBySize(0, 0)
				} else {
					this.mescroll.endBySize(paging.page_size, paging.count)
				}


				this.list = this.list.concat(data);
			}
		}
	}
</script>

<style scoped lang="scss">
	

	.dy-item {
		border-bottom: 16rpx solid #F2F2F2;
		/* margin-bottom: 20px; */
	}

	//解决touchmove事件和其他某个滚动的操作冲突了
	::v-deep .uni-scroll-view,
	.uni-scroll-view {
		touch-action: pan-y;
	}
</style>
