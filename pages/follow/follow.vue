<template>
	<view class="body">
		<!-- 切换导航 -->
		<u-tabs ref="tab" class="tab" :list="tabList" lineColor="#FFE933" :itemStyle="tabItemStyle" :current="tabindex"
			@click="onTabClick">
		</u-tabs>

		<view class="">
			<swiper class="swiper-box" :style="contentHeight" :current="tabindex" @change="swiperChange">
				<swiper-item>
					<block v-for="(item,index) in followList" :key="index">
						<user-item :item="item.user" :index="index"></user-item>
					</block>
				</swiper-item>
				<swiper-item>
					<block v-for="(item,index) in fanList" :key="index">
						<user-item :item="item.user" :index="index"></user-item>
					</block>
				</swiper-item>
				<swiper-item>
					<block v-for="(item,index) in comList" :key="index">
						<user-item :item="item.user" :index="index"></user-item>
					</block>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		intersect
	} from '@/util/func.js'
	export default {
		components: {},
		data() {
			return {
				tabHeight: 0,
				tabindex: 0,
				tabList: [{
						name: "关注",

					},
					{
						name: "粉丝",
						id: "article"
					},
					{
						name: "互关",
						id: "yule"
					},



				],
				tabItemStyle: {
					'min-width': "calc(1000rpx / 4 )"
				},
				followList: [],
				fanList: [],
				// comList: []
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
			getList(type = 1) {
				let uid = this.$store.state.userinfo.uid;
				this.$api.getFollows({
						uid,
						type,
					})
					.then(res => {
						console.log(res)
						if (type == 0) {
							this.fanList = res.data || []
						} else {
							this.followList = res.data || []
						}
					}).catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {

			this.$nextTick(() => {
				this.tabHeight = this.$refs.tab.$el.clientHeight
			})
		},
		onLoad() {
			this.windowHeight = 500
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
				}
			});
			
		},
		onShow() {
			this.getList(0)
			this.getList(1)
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		computed: {
			comList() {
				
				return intersect(this.fanList, this.followList)
			},

			contentHeight() {
				let windowHeight = this.windowHeight;
				let tabHeight = this.tabHeight
				console.log(windowHeight, tabHeight)
				return {
					height: `calc(${windowHeight}px - ${tabHeight}px)`
				}
			}
		}
	}
</script>

<style scoped>
	::v-deep .u-tabs__wrapper__nav__item__text {
		font-size: 18px;
	}
</style>
