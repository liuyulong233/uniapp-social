<template>
	<view>
		<!-- 聊天气泡 -->
		<scroll-view id="scrollView" :style="{height:scrollHeight+'px'}" scroll-y="true" :scroll-top="scrolltop" :scroll-with-animation="true"
			:scroll-into-view="scrollToView" show-scrollbar="true">
			<block v-for="(item,index) in chatList" :key="index">
				<message-item :id="'msg'+item.timestamp" :item="item" :key="item.timestamp"></message-item>
			</block>
		</scroll-view>
		<!-- 输入框 -->
		<post-comment @submit="send"></post-comment>
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
				text: '',
				windowHeight:0,
				scrolltop: 0,
				scrollAnimation: true,
				scrollToView: "",

			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.currentChatAccout.nickname
			})
			if(this.currentChatAccout.type=="SINGLE"){
				this.getHistoryChat()
			}
			if(this.currentChatAccout.type=="GROUP"){
				this.getHistoryChat2()
			}
			
			uni.getSystemInfo({
				success: res => {
					console.log(res)
					this.windowHeight = res.windowHeight;
				}
			});
		},
		computed: {
			...mapState(['chatList', 'isLogin','currentChatAccout','receive']),
			
			userinfo(){
				if(this.isLogin){
					return this.$store.state.userinfo
				}else{
					//#ifdef H5
					let userinfo = JSON.parse(sessionStorage.getItem("temp_userinfo"));
					//#endif
					//#ifndef H5 
					let userinfo = JSON.parse(uni.getStorageSync("temp_userinfo")||'{}');
					//#endif
					return userinfo
				}
			},
			scrollHeight(){
				return this.windowHeight -  uni.upx2px(120)
			}
		},
		beforeDestroy() {
			this.clear_chatList()
		},
		watch:{
			//监听接收消息
			receive(newVal){
				this.scrollToBottom()
			}
		},
		methods: {
			...mapMutations(['set_chatList', 'clear_chatList']),
			scrollToBottom() {
				if(this.chatList.length==0)return
				let id=this.chatList[this.chatList.length-1].timestamp
				this.$nextTick(function() {
					// 滚动到底
					this.scrollToView = 'msg' + id
				});
			},
			getHistoryChat() {
				if (this.currentChatAccout.type === "ALL") return
				this.$api.getSingleMsgList({
						accounts: this.currentChatAccout.accounts,
						page_size: 100,
					})
					.then(res => {
						console.log(res)
						let list = res.data;
						this.set_chatList(list)
						this.scrollToBottom()
						// this.mine=res.data
					}).catch(err => {
						console.log(err)
					})
			},
			getHistoryChat2() {
				if (this.currentChatAccout.type === "ALL") return
				this.$api.getGroupMsgList({
						group_id:this.currentChatAccout.uid,
						page_size: 100,
					})
					.then(res => {
						console.log(res)
						let list = res.data;
						this.set_chatList(list)
						this.scrollToBottom()
						// this.mine=res.data
					}).catch(err => {
						console.log(err)
					})
			},
			send(text) {
				let msg = {
					fromAccount: {
						nickname: this.userinfo.nickname,
						avatar: this.userinfo.avatar,
						uid: this.userinfo.uid
					},
				
					message: text,
					timestamp: Date.now(),
					toAccount: this.currentChatAccout.uid,
					type: "TEXT"
				}
				this.set_chatList([msg])
				if(this.currentChatAccout.type === "ALL"){
					this.$socket.send(msg)
				}
				if(this.currentChatAccout.type === "SINGLE"){
					this.$socket.sendP2PMsg(msg)
				}
				if(this.currentChatAccout.type === "GROUP"){
					this.$socket.sendGroupMsg(msg)
				}
				this.scrollToBottom()
			}
		}
	}
</script>

<style scoped>
	#scrollView {
		height: calc(100% - 120px);
	}

	/* ::-webkit-scrollbar {  
	    width: 3px !important; 
		height: 0 !important;  
		-webkit-appearance: none;  
	    background: blue;  
	} */
</style>
