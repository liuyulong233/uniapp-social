<template>
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="top" :down="downOption" @down="downCallback"
		@up="upCallback">
		<slot :data="list">

		</slot>
		<!-- <block v-for="(item,index) in list" :key="index">
			<dyItem class="dy-item" :item="item" @follow="(item)=>onFollow(item,index)"
				@other="(type)=>onOther(type,index)">
			</dyItem>
		</block> -->
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
					this.mescroll.scrollTo(0, 0)
					this.mescroll.triggerDownScroll()
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
			getDynamicList(num, size) {
				return this.$api.getDynamics({
					page: num,
					page_size: size
				})
			},
			getArticleList(num, size) {
				return this.$api.getArticles({
					page: num,
					page_size: size
				})
			},
			/*下拉刷新的回调 */
			async downCallback() {
				console.log('下拉刷新的回调')
				if (this.current == 0) {

					let res = await this.getDynamicList();
					console.log('下拉刷新的回调', res)
					this.list = res.data;
					this.mescroll.endSuccess();
				} else if(this.current == 1){
					let res = await this.getArticleList();
					console.log('下拉刷新的回调', res)
					this.list = res.data;
					this.mescroll.endSuccess();
				}else{
					this.mescroll.endSuccess();
				}
				// //联网加载数据
				// apiNewList().then(data => {
				// 	//联网成功的回调,隐藏下拉刷新的状态
				// 	this.mescroll.endSuccess();
				// 	//设置列表数据
				// 	this.dataList.unshift(data[0]);
				// }).catch(()=>{
				// 	//联网失败的回调,隐藏下拉刷新的状态
				// 	this.mescroll.endErr();
				// })
			},

			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback(page) {
				console.log(this.current, this.tabindex)
				// if(this.current== this.tabindex)
				let data;
				let paging
				console.log('上拉加载', this.tabindex, this.current)
				// this.mescroll.endSuccess(30);
				if (this.current === 0) {
					let res = await this.getDynamicList(page.num, page.size);
					console.log('上拉加载的回调', res)
					data = res.data;
					paging = res.paging
				} else if (this.current == 1) {
					let res = await this.getArticleList(page.num, page.size);
					console.log('上拉加载的回调', res)
					data = res.data;
					paging = res.paging
				} else {
					data = []
				}

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
</style>
