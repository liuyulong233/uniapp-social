<template>
	<view>
		<u-tabs ref="tab" class="tab" :list="tabList" lineColor="#FFE933" :itemStyle="tabItemStyle" :current="tabindex"
			@click="onTabClick">
		</u-tabs>
		<!-- <view class="content" :style="contentHeight">
			<mescroll-item :top="tabHeight+10" >
				<template v-slot:default="{data:list}">
					<recommendList :list="list"></recommendList>
				</template>
			</mescroll-item>
		</view> -->
		<!-- <swiper :style="contentHeight" :current="tabindex" @change="swiperChange">
			<swiper-item v-for="(tab,i) in tabList" :key="i">
				<mescroll-swiper-item :top="tabHeight" :tabindex="tabindex" :current="i">
					<template v-slot:default="{data:list}" >
						{{tabindex}}{{i}}
						<recommendList :list="list" v-show="tabindex==i&&i==0"></recommendList >
						<template v-show="tabindex==i&&i==1">
							<article-item v-for="item in list" :article="item"></article-item>
						</template>
						
					</template>
					<template v-slot:default="{data:list}" >
						{{tabindex}}{{i}}
						<article-item v-for="item in list" :article="item"></article-item>
						
					</template>
				</mescroll-swiper-item>
			</swiper-item>
		</swiper> -->
		<swiper :style="contentHeight" :current="tabindex" @change="swiperChange">
			<swiper-item>
				<mescroll-swiper-item-dynamic></mescroll-swiper-item-dynamic>
			</swiper-item>
			<swiper-item>
				<mescroll-swiper-item-article :current="1" :tabindex="tabindex"></mescroll-swiper-item-article>
			</swiper-item>
			<swiper-item>
				<mescroll-swiper-item-article :current="2" :tabindex="tabindex"></mescroll-swiper-item-article>
			</swiper-item>
			<swiper-item>
				<mescroll-swiper-item-article :current="2" :tabindex="tabindex"></mescroll-swiper-item-article>
			</swiper-item>
			<swiper-item>
				<mescroll-swiper-item-article :current="2" :tabindex="tabindex"></mescroll-swiper-item-article>
			</swiper-item>
			<swiper-item>
				<mescroll-swiper-item-article :current="2" :tabindex="tabindex"></mescroll-swiper-item-article>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import mescrollSwiperItemDynamic from './mescroll-swiper-item-dynamic.vue'
	import mescrollSwiperItemArticle from './mescroll-swiper-item-article.vue'
	// import mescrollSwiperItem from './mescroll-swiper-item.vue'
	// import mescrollItem from './mescroll-item.vue'
	// import recommendList from './recommendList.vue'
	export default {
		components: {
			mescrollSwiperItemDynamic,
			mescrollSwiperItemArticle,
			// mescrollSwiperItem,
			// mescrollItem,
			// recommendList
		},
		data() {
			return {
				tabHeight: 0,
				tabindex: 0,
				linewidth: 38,
				triggered: false,
				isOpenRefresh: true, // 是否开启下拉
				list: {
					recommend: [],
					article: [],
					yule: []
				},
				tabItemStyle: {
					'min-width': "80px",
				},
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},

				tabList: [{
						name: "推荐",
						id: "recommend"
					},
					{
						name: "文章",
						id: "article"
					},
					{
						name: "音乐",
						id: "yule"
					},

					{
						name: "视频",
						id: "video"
					},
					{
						name: "小说",
						id: "keji"
					},
					{
						name: "游戏",
						id: "keji"
					},

				],

			}
		},
		onLoad() {
			this.windowHeight = 500
			uni.getSystemInfo({
				success: res => {
					console.log(res)
					let height = res.windowHeight - uni.upx2px(100);
					this.windowHeight = res.windowHeight;
				}
			});
		},
		onShow() {

			this.$nextTick(() => {
				//#ifndef H5
				const query = uni.createSelectorQuery().in(this);
				query.select('.tab').boundingClientRect(data => {
					// console.log("得到布局位置信息", data);
					this.tabHeight=~~data.height
				}).exec();
				//#endif
				//#ifdef H5
				console.log('高度',this.$refs.tab.$el.clientHeight)
				this.tabHeight = this.$refs.tab.$el.clientHeight
				//#endif
			})
		},
		//导航栏
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if (e.index == 1) {
				uni.navigateTo({
					url: '../postDynamic/postDynamic'
				}, true);
			}
		},
		computed: {
			contentHeight() {
				let windowHeight = this.windowHeight;
				let tabHeight = this.tabHeight || ''
				console.log(windowHeight, tabHeight)
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


		},
		watch: {
			tabindex(e) {

			}
		},


	}
</script>
<style scoped>
	.swiper-box {
		height: 100vh;
	}

	::v-deep .u-tabs__wrapper__nav__item__text {
		font-size: 18px;
	}



	.scroll {
		height: 100%;
	}

	.tab {
		padding-bottom: 15px;
	}

	.content {
		/* overflow: auto; */
	}
</style>
