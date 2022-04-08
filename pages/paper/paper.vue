<template>
	<view class="big  fast">

		<block v-for="(item,index) in conversationsList" :key="index">
			<paper-item :item="item"></paper-item>
		</block>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {},
		data() {
			return {

			}
		},
		computed: {
			...mapState(['conversationsList','receive','isLogin']),
			count() {
				let res = this.conversationsList.reduce(function(pre, cur) {
					let noReadCount=cur.noReadCount
					if(!noReadCount){
						 noReadCount=0
					}
					 pre += noReadCount;
					return pre;
				}, 0);
				return res
			}
		},
		onReachBottom() {},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getData()
				uni.hideTabBarRedDot({
					index: 2,
				})
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			if (e.index == 0) {
				uni.navigateTo({
					url: '../group/group'
				},true)
			}
		},
		watch: {
			receive(newVal) {
				console.log('msg',newVal)
				uni.showTabBarRedDot({
					index: 2,
					// text: this.getNoCount()+''
				})
			}
		},
		onLoad() {
			// this.getData()

		},
		onShow() {
		this.getData()
		},
		methods: {
			getNoCount() {
				let res = this.conversationsList.reduce(function(pre, cur) {
					let noReadCount=cur.noReadCount
					if(!noReadCount){
						 noReadCount=0
					}
					 pre += noReadCount;
					return pre;
				}, 0);
				return res
			},
			getData() {
				if(!this.isLogin)return;
				this.$store.dispatch("get_conversations");
				/*
				
				follower_id: 100001
				status: 1
				user:
				avatar: "https://avatarfiles.alphacoders.com/456/thumb-45632.jpg"
				nickname: "灰毛衣小"
				uid: 100213
				[[Prototype]]: Object
				user_id: 100213
				_id: "6207236b43fd563718f2e1ba"
				
				
				*/

			},

		},






	}
</script>

<style>
	.big {
		padding: 0 20upx;
	}
</style>
