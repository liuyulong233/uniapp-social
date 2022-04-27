<template>
	<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="top":down="downOption" @down="downCallback" @up="upCallback">
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
				type:Number,
				default:0
			},
			tabindex: {
				type:Number,
				default:0
			},
			current: {
				type:Number,
				default:0
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
				if (this.current === this.tabindex&&this.list.length==0) {
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

			/*下拉刷新的回调 */
			downCallback() {
				console.log('下拉刷新的回调')
				setTimeout(() => {
					this.mescroll.endSuccess();
					let data = this.getData();
					console.log('下拉刷新的回调', data)
					this.list = data;
				}, 500)
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
			getData({
				num
			} = {
				num: 1
			}) {
				let data = [...Array(10).keys()].map((item, index) => {
					return {
						username: '昵称第' + num + "页" + (index + 1),
						avatar: "../../static/userpic/10.jpg",
						isFollow: true,
						content: "我是标题我是标题我是标题我是标题",
						pics: [
							'../../static/datapic/14.jpg'
						],
						comment: 10,
						share: 10,
						other: {
							status: 0, //0表示无操作，1表示顶了，2表示踩了
							like: 10,
							hate: 10
						}
					}

				})
				return data
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				console.log(this.current, this.tabindex)
				if (this.current != this.tabindex) {
					return
				}
				setTimeout(() => {
					let data = this.getData(page)
					console.log('上拉加载', data)
					// this.mescroll.endSuccess(30);
					this.mescroll.endBySize(10, 30)
					if (page.num == 1) {
						this.list = []
					};
					if (page.num > 3) {
						data = []
					}
					this.list = this.list.concat(data);
					// this.list=[...this.list,...this.list];
				}, 500)
				//联网加载数据
				// apiNewList(page.num, page.size).then(curPageData=>{
				// 	//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				// 	//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

				// 	//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 	//this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

				// 	//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				// 	//this.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

				// 	//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
				// 	//this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

				// 	//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据.
				// 	this.mescroll.endSuccess(curPageData.length);

				// 	//设置列表数据
				// 	this.dataList=this.dataList.concat(curPageData);
				// }).catch(()=>{
				// 	//联网失败, 结束加载
				// 	this.mescroll.endErr();
				// })

			}
		}
	}
</script>

<style scoped lang="scss">
	//解决 swiper 对 fix的影响
	// ::v-deep .mescroll-uni-fixed {
	// 	top: 0 !important;
	// }
</style>
