<template>
	<view>
		<!-- 头部 -->
		<user-info :userinfo="info"></user-info>
		
		<!-- 切换导航 -->

		<view class="content" :style="{height:windowHeight +'px'}">
			<u-tabs ref="tab" class="tab" :list="tabList" lineColor="#FFE933" :itemStyle="tabItemStyle"
				:current="tabindex" @click="onTabClick">
			</u-tabs>
			<swiper class="swiper" :style="contentHeight" :current="tabindex" @change="swiperChange">
			
				
				<swiper-item>
					<mescroll-swiper-item ref="mescroll_0" :tabindex="tabindex" :current="0"
						@down="downCallback" @up="upCallback">
						<template v-slot:default="{data:list}">
							<dynamicList scene="2" :list="list"></dynamicList>

						</template>
					</mescroll-swiper-item>
				</swiper-item>
				<swiper-item>
					<mescroll-swiper-item ref="mescroll_1"  :tabindex="tabindex" :current="1"
						@down="downCallback" @up="upCallback">
						<template v-slot:default="{data:list}">
							<article-item v-for="item in list" :article="item" :key="item._id" :scene="1"></article-item>
						</template>
					</mescroll-swiper-item>
				</swiper-item>
				<swiper-item>
					<mescroll-swiper-item ref="mescroll_2" :uid="user_uid"  :tabindex="tabindex"
						:current="2" @down="downCallback" @up="upCallback">
						<template v-slot:default="{data:list}">

						</template>
					</mescroll-swiper-item>
				</swiper-item>
			</swiper>
		</view>
		<!-- <userSpacePop 
		:showpop="showpop"
		@hidepop="hidepop"
		@lahei="lahei"
		@beizhu="beizhu"
		></userSpacePop> -->
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	
	export default {
		components: {},
		data() {
			return {
				tabindex: 0,
				tabHeight: 0,
				windowHeight: 0,
				user_uid: null,
				tabItemStyle: {
					'min-width': "calc(1000rpx / 4 )",
				},
				tabList: [{
						name: "动态",
						id: "dynamic"
					},
					{
						name: "文章",
						id: "article"
					},
					{
						name: "其他",
						id: "other"
					},
				],
				

			}
		},
		onLoad(option) {
			this.user_uid = option.uid || this.userinfo.uid
			this.windowHeight = 500
			uni.getSystemInfo({
				success: res => {
					console.log('getSystemInfo',res)
					this.windowHeight = res.windowHeight -res.statusBarHeight -43;
				}
			});
			this.getUserInfo()
		},
		onShow() {

			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.tab').boundingClientRect(data => {
					// console.log("得到布局位置信息", data);
					this.tabHeight=~~data.height
					
				}).exec();
			})
		},
		onReachBottom() {},
		onNavigationBarButtonTap(e) {

		},
		computed: {
			...mapState(['userinfo','set_userinfo']),
			isMe() {
				return this.userinfo.uid == this.user_uid
			},
			info() {
				console.log(this.isMe)
				if (this.isMe) {
					// this.set_userinfo(this.otherinfo)
					return this.userinfo
				} else {
					return this.otherinfo
				}
			},
			contentHeight() {
				let windowHeight = this.windowHeight;
				let tabHeight = this.tabHeight
				// console.log("contentHeight",windowHeight, tabHeight)
			
				return {
					height: `calc(${windowHeight}px - ${tabHeight}px)`
				}
			}
		},
		methods: {
			swiperChange(e) {
				this.tabindex = e.detail.current
			},
			onTabClick(item) {
				console.log(item)
				this.tabindex = item.index;


			},
			getDynamicList(num = 1, size = 10) {
				return this.$api.getUserDynamics({
					uid: this.user_uid,
					page: num,
					page_size: size
				})
			},
			getArticleList(num = 1, size = 10) {
				return this.$api.getUserArticles({
					uid: this.user_uid,
					page: num,
					page_size: size
				})
			},
			getUserInfo() {
				console.log(this.user_uid)
				this.$api.getUserInfo({
					uid: this.user_uid
				}).then(res => {
					console.log(res)
					this.otherinfo = res.data
				})
			},
			/*下拉刷新的回调 */
			async downCallback(current) {
				console.log('下拉刷新的回调', this.tabindex)
				let instance = this.$refs["mescroll_" + current];
				let paging;
				if (current == 0) {

					let res = await this.getDynamicList();
					// console.log('下拉刷新的回调', res)
					instance.list = res.data;
					paging = res.paging
					instance.mescroll.endSuccess();
				} else if(current == 1) {
					let res = await this.getArticleList();
					// console.log('下拉刷新的回调', res)
					instance.list = res.data;
					instance.mescroll.endSuccess();
					paging = res.paging
				}else {
					instance.mescroll.endSuccess();
				}
				if (instance.list.length == 0) {
					instance.mescroll.endBySize(0, 0)
				} else {
					instance.mescroll.endBySize(paging.page_size, paging.count)
				}


			},

			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async upCallback({
				current,
				page
			}) {
				// console.log(this.current, this.tabindex)
				
				let data;
				let paging
				console.log('上拉加载', this.tabindex, current)
				let instance = this.$refs["mescroll_" + current];
				if (current != this.tabindex) {
					instance.mescroll.endBySize(1, 10)
					return
				}
				// this.mescroll.endSuccess(30);
				if (current === 0) {
					let res = await this.getDynamicList(page.num, page.size);
					console.log('上拉加载的回调', res)
					data = res.data;
					paging = res.paging
				}
				if (current == 1) {
					let res = await this.getArticleList(page.num, page.size);
					console.log('上拉加载的回调', res)
					data = res.data;
					paging = res.paging
				}
				if (current == 2) {
					data = []
				}
				if (data.length == 0) {
					instance.mescroll.endBySize(0, 0)
				} else {
					instance.mescroll.endBySize(paging.page_size, paging.count)
				}

				if (page.num == 1) {
					instance.list = []
				};
			
				instance.list = instance.list.concat(data);



			}
		}

	}
</script>

<style scoped>
	.tab {
		padding-bottom: 10px;
	}

	::v-deep .u-tabs__wrapper__nav__item__text {
		font-size: 18px;
	}

	.content {
		touch-action: auto;
		overflow: hidden;
	}
	.swiper{
		/* border-bottom:1px solid red; */
	}
</style>
