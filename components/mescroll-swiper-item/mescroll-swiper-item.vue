<template>
	<mescroll-uni class="scroll" ref="mescrollRef" @init="mescrollInit" :top="top" :down="downOption"
		@down="downCallback" @up="upCallback">
		<slot :data="list">

		</slot>
		
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
			uid: [String, Number]
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

			
			
			/*下拉刷新的回调 */
			async downCallback() {
				this.$emit('down',this.current)
				console.log('下拉刷新的回调', this.tabindex)
				
			},

			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				console.log('上拉加载')
				this.$emit('up',{current:this.current,page})
				

			}
		}
	}
</script>

<style scoped lang="scss">
	//解决 swiper 对 fix的影响
	::v-deep .mescroll-uni-fixed {
		top: 0 !important;
	}

	//解决touchmove事件和其他某个滚动的操作冲突了
	::v-deep .uni-scroll-view,
	.uni-scroll-view {
		touch-action: pan-y;
	}
</style>
