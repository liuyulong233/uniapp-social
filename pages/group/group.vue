<template>
	<view class="body">
		<!-- 切换导航 -->
		<u-tabs ref="tab" class="tab" :list="tabList" lineColor="#FFE933" :itemStyle="tabItemStyle" :current="tabindex"
			@click="onTabClick">
		</u-tabs>

		<view class="">
			<swiper class="swiper-box" :style="contentHeight" :current="tabindex" @change="swiperChange">
				<swiper-item>
					<block v-for="(item,index) in groupList" :key="index">
						<group-item :item="item" :index="index"></group-item>
					</block>
				</swiper-item>
				<swiper-item>
					<block v-for="(item,index) in noticeList" :key="index">
						<join-item :item="item" @refresh="getNotices"></join-item>
					</block>
				</swiper-item>
				
			</swiper>
		</view>
		<u-popup :show="show" mode="bottom" @open="open" @close="close" round="20" closeable>
			<view class="popup">
				<view class="title">
					群信息
				</view>
				<view class="">
					群名称：<u--input v-model="info.name" placeholder="请输入群名称(2-8个字符)" border="surround"></u--input>
				</view>
				<view class="">
					群头像：<u--input v-model="info.cover" placeholder="请输入头像网址" border="surround"></u--input>
					
				</view>
				<view class="" v-show="info.cover">
						<image style="width: 120rpx;height:120rpx;border-radius: 50%;" :src="info.cover" mode="widthFix"></image>
					</view>
				<view class="">
					群介绍：<u--textarea v-model="info.intro" placeholder="请输入内容"></u--textarea>
				</view>
				<u-grid :border="false" col="4">
					<u-grid-item v-for="(item,index) in avatars" :key="index" @click="select(item)">
						<image style="width: 120rpx;height:120rpx;border-radius: 500rpx;" :src="item|'../static/images/avatar/8.jpg'" mode="aspectFill"></image>

					</u-grid-item>
				</u-grid>
				<button type="primary" @click="handle">确定</button>
			</view>
		</u-popup>
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
						name: "群组",

					},
					{
						name: "通知",
					},

				],
				avatars: [
					"https://avatarfiles.alphacoders.com/633/thumb-63329.png",
					"https://avatarfiles.alphacoders.com/873/thumb-87367.png",
					"https://avatarfiles.alphacoders.com/849/thumb-84930.png",
					"https://avatarfiles.alphacoders.com/108/thumb-108917.png",
					"https://avatarfiles.alphacoders.com/837/thumb-83705.png",
					"https://avatarfiles.alphacoders.com/102/thumb-102722.png",
					"https://avatarfiles.alphacoders.com/844/thumb-84463.jpg",
					"https://avatarfiles.alphacoders.com/110/thumb-110248.png",
				],
				tabItemStyle: {
					'width': "calc(100vw / 2 )"
				},
				groupList: [],
				show: false,
				info: {
					name: "",
					uid: null,
					cover: "",
					intro: "",
				}
			}
		},
		watch:{
			tabindex(newV){
				console.log(newV)
				if(newV==1){
					this.getNotices()
				}
			}
		},
		methods: {
			swiperChange(e) {
				this.tabindex = e.detail.current
			},
			onTabClick(item) {
				// console.log(item)
				this.tabindex = item.index;
				

			},
			getJoinGroup() {
				this.$api.getJoinGroupList({
						uid: this.uid,
					})
					.then(res => {
						console.log(res)
						this.groupList = res.data || []

					}).catch(err => {
						console.log(err)
					})
			},
			getNotices() {
				this.$api.getNoticeList()
					.then(res => {
						console.log(res)
						this.$store.commit('set_noticeList',res.data || [])
					}).catch(err => {
						console.log(err)
					})
			},
			open(){
				console.log('pop-open')
				
			},
			close(){
				console.log('pop-close')
				this.show=false;
				this.info={};
				
			},
			select(val){
				this.info.cover=val
			},
			handle(){
				let info={...this.info}
				if(info.name==''||info.cover==''){
					uni.$u.toast('群名称和头像不能为空！！');
					return;
				}
				 this.$api
				    .createGroup({
				      ...info,
				      uid: this.$store.state.userinfo.uid,
				    })
				    .then((res) => {
				      // data.invitedList = res.data;
					  this.show=false
					  setTimeout(()=>{
						  this.getJoinGroup()
					  },200)
				      console.log(res);
				    })
				    .catch((err) => {
						 this.show=false
				      console.log(err);
				    });
			}
		},
		mounted() {

			this.$nextTick(() => {
				this.tabHeight = this.$refs.tab.$el.clientHeight
			})

		},
		onLoad() {
			this.windowHeight = 500;
			this.uid = this.$store.state.userinfo.uid;
			uni.getSystemInfo({
				success: res => {
					this.windowHeight = res.windowHeight;
				}
			});
			this.getJoinGroup()

		},
		onShow() {
			// this.getList(0)
			// this.getList(1)
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if (e.index == 0) {
				uni.showActionSheet({
					itemList: ['建群', '加群'],
					success: (res) => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if (res.tapIndex === 0) {
							this.show=true
						} else {
							uni.navigateTo({
								url: '../group-list/group-list'
							})
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			}
		},
		computed: {
			noticeList(){
				return this.$store.state.noticeList
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

<style scoped lang="scss">
	::v-deep .u-tabs__wrapper__nav__item__text {
		font-size: 18px;
	}

	.popup {
		min-height: 500rpx;
		padding: 20rpx;

		.title {
			display: flex;
			justify-content: center;
			font-size: 18px;
		}

		>view {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
		}
	}
</style>
