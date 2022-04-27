<template>
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="top" :down="downOption" @down="downCallback"
		@up="upCallback">
		<article-item v-for="item in list" :article="item" :key="item._id"></article-item>

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
					if (this.current < 2) {
						this.mescroll.scrollTo(0, 0)
						this.mescroll.triggerDownScroll()
					}

				}

			}
		},
		methods: {

			//关注
			onFollow(item, index) {
				console.log(item, index)
				uni.showToast({
					title: '关注成功',
					mask: true,
					icon: 'none'
				})
			},
			//顶踩操作
			onOther(type, index) {
				console.log(type, index)

			},

			getArticleList(num, size) {
				return this.$api.getArticles({
					page: num,
					page_size: size
				})
			},
			/*下拉刷新的回调 */
			async downCallback() {
				let res = await this.getArticleList();
				console.log('下拉刷新的回调', res)
				this.list = res.data;
				let paging = res.paging

				this.mescroll.endSuccess();
				this.mescroll.endBySize(paging.page_size, paging.count)
				




			},

			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				console.log('上拉加载', this.tabindex, this.current)
				if (this.current != this.tabindex) {
					this.mescroll.endBySize(0, 0)
					return
				}
				let data;
				let paging


				let res = await this.getArticleList(page.num, page.size);
				console.log('上拉加载的回调', res)
				data = res.data || [];
				paging = res.paging


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
	//解决 swiper 对 fix的影响
	::v-deep .mescroll-uni-fixed {
		height: 100% !important;
		top: 0 !important;
	}

	.dy-item {
		border-bottom: 16rpx solid #F2F2F2;
		/* margin-bottom: 20px; */
	}
</style>
