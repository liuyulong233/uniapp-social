import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const vm = Vue.prototype
//#ifdef H5
let userinfo = JSON.parse(sessionStorage.getItem('userinfo') || null) || {}
let isLogin = sessionStorage.getItem('isLogin') || false
//#endif
//#ifndef H5
let userinfo = JSON.parse(uni.getStorageSync('userinfo') ||'{}') 
let isLogin = uni.getStorageSync('isLogin') || false
//#endif
const store = new Vuex.Store({
	state: {
		userinfo: {
			avatar: "https://www.thiswaifudoesnotexist.net/example-65564.jpg",
			desc: "小可爱",
			mobile: "13291111111",
			nickname: "联合国认证小可爱",
			photos: [],
			sex: 1,
			uid: 100001,
			...userinfo
		},
		isLogin: isLogin,
		//所有聊天会话
		conversationsList: [{
			account: {
				nickname: '世界-随便聊聊',
				uid: 'WorldChannel',
				avatar: 'https://avatarfiles.alphacoders.com/699/thumb-1920-69905.png'
			},
			type: "ALL", //GROUP SINGLE 会话类型
			noReadCount: 0,
			lastMessage: {
				content: "暂无",
				timestamp: 1639830937382,
				type: "TEXT",
				create_at: uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd'),
			},
		}],
		//当前聊天对象
		currentChatAccout: {
			type: "ALL",
			nickname: '世界-随便聊聊',
			uid: 'WorldChannel',
			avatar: 'https://avatarfiles.alphacoders.com/699/thumb-1920-69905.png'
		},
		//接收的消息
		receive: {

		},
		//聊天消息
		chatList: [

		],
		//加群通知
		noticeList: [
			//   {
			//         group: {
			//           cover:
			//             "https://atts.w3cschool.cn/attachments/cover/cover_socket.png?t=1314520?imageView2/1/w/48/h/48",
			//           name: "一号群",
			//           uid: 100885,
			//         },

			//         user: {
			//           avatar:
			//             "https://img1.baidu.com/it/u=3122136587,3938996930&fm=26&fmt=auto",
			//           nickname: "测权限3",
			//           uid: 100467,
			//         },
			//       },
		]
	},
	mutations: {
		set_chatList(state, arr) {
			state.chatList.push(...arr)
		},
		set_receive(state, msg) {
			state.receive = msg
		},
		clear_chatList(state, arr) {
			state.chatList = []
		},
		set_conversations(state, arr) {
			let t = state.conversationsList[0]
			state.conversationsList = [t].concat(arr)
		},
		set_curchat(state, obj) {
			state.currentChatAccout = obj
		},
		set_noticeList(state, arr) {
			state.noticeList = arr
		},
		set_userinfo(state, info) {
			state.userinfo = info;

			//#ifdef H5
			sessionStorage.setItem('userinfo', JSON.stringify(info))
			//#endif
			//#ifndef H5 
			uni.setStorageSync('userinfo', JSON.stringify(info))
			//#endif
		},
		set_login(state, val) {

			state.isLogin = true;
			//#ifdef H5
			sessionStorage.setItem('isLogin', true)
			//#endif
			//#ifndef H5 
			uni.setStorageSync('isLogin', true)
			//#endif
			store.commit('set_token', val.token)
			store.commit('set_userinfo', val.data || val.userinfo)
			console.log('set_login')
			vm.$socket.close()
			vm.$socket.connect()
			uni.switchTab({
				url: '/pages/home/home',
				fail(err) {
					console.log('set_login', err)
				}
			})
		},
		set_loginout(state) {
			uni.showModal({
				title: '提示',
				content: '确定要退出登录？',
				success: function(res) {
					if (res.confirm) {
						state.isLogin = false;
						//#ifdef H5
						sessionStorage.clear()
						//#endif
						//#ifndef H5 
						uni.clearStorageSync();
						uni.setStorageSync('isLogin', false)
						//#endif
						uni.switchTab({
							url: '/pages/home/home',
							fail(err) {
								console.log(err)
							}
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});

		},
		set_token(state, token) {
			//#ifdef H5
			sessionStorage.setItem('token', token)
			//#endif
			//#ifndef H5 
			uni.setStorageSync('token', token)
			//#endif
		},
		update_conversation(state, {
			msg: obj,
			index
		}) {
			console.log(obj, index)
			let item = state.conversationsList[index];

			if (!item.noReadCount) item.noReadCount = 0;
			item.noReadCount++;
			item.lastMessage = {
				content: obj.message,
				timestamp: obj.timestamp,
				type: obj.type,
				create_at: uni.$u.timeFormat(obj.timestamp, 'yyyy-mm-dd'),
			};


		},
	},
	actions: {
		get_conversations({
			commit
		}, val) {
			vm.$api.getConversations()
				.then(res => {
					console.log(res)
					let list = res.data;
					commit('set_conversations', list)
					// this.mine=res.data
				}).catch(err => {
					console.log(err)
				})
		}
	},
	getters: {

	}
})
export default store
