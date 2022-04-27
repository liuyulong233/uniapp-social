import store from '../store'
import SocketService from './socket'

function getRoutePath() {
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let curRoute = routes[routes.length - 1].route //获取当前页面路由
	return curRoute
}
const findSingleCoversationIndex = (toAccount, fromAccount) => {
	let accounts = [fromAccount, toAccount].sort((a, b) => a - b).join()
	let index = store.state.conversationsList.findIndex((item) => {
		return item.type == "SINGLE" && accounts == item.accounts.join()
	})
	return index
}
const findCoversationIndex = (toAccount) => {
	let index = store.state.conversationsList.findIndex((item) => {
		return item.account.uid == toAccount
	})
	return index
}
const socket = new SocketService({
	//单聊消息处理
	onP2PMsg(msg, fn) {
		console.log('P2pmsg', msg);
		store.commit('set_receive', msg)
		//在聊天页面
		if (getRoutePath().includes('pages/chat/chat')) {
			let recv_accounts = [msg.toAccount, msg.fromAccount.uid].sort((a, b) => a - b).join();
			let cur_accounts=store.state.currentChatAccout.accounts.join()
			//消息是否发给自己
			if (recv_accounts == cur_accounts) {
				store.commit('set_chatList', [msg])
				
			}

		} else {
			let index = findSingleCoversationIndex(msg.toAccount, msg.fromAccount.uid)
			console.log(index)
			if (index !== -1) {
				store.commit('update_conversation', {
					msg,
					index
				})
			} else {
				store.dispatch("get_conversations");
			}

		}

	},
	//公共聊天消息处理
	message(msg) {
		console.log('getRoutePath',getRoutePath());
		store.commit('set_receive', msg)
		if (getRoutePath().includes('pages/chat/chat')) {
			//消息是当前聊天群的
			if (msg.toAccount === store.state.currentChatAccout.uid) {
				store.commit('set_chatList', [msg])
			}

		} else {
			let index = findCoversationIndex(msg.toAccount)
			store.commit('update_conversation', {msg, index})
		}
	},
	//监听群聊事件
	onGroupMsg(msg) {
	    console.log('群消息--', msg);
	    if (getRoutePath().includes('pages/chat/chat')) {
	        //消息是当前聊天群的
	        if (msg.toAccount === store.state.currentChatAccout.uid) {
	            store.commit('set_chatList', [msg])
	        }

	    } else {
	        let index = findGroupCoversationIndex(msg.toAccount)
	        console.log(index);
	        if (index !== -1) {
	        	store.commit('update_conversation', {
	        		msg,
	        		index
	        	})
	        } else {
	        	store.dispatch("get_conversations");
	        }

	    }

	},
	//监听同意加群事件
	onJoinGroup(obj) {
	    console.log('加群', obj)
	    //收到加群申请通知
	    if (obj.operate == 'notice') {
	        //store保存通知
			uni.$u.toast('收到一条加群通知')
	        // Notify({ type: 'primary', message: '收到一条加群通知' });
	        store.commit('set_noticeList', [obj])
	    }
	    //同意加群
	    if (obj.operate == 'agree') {
	        // Notify({ type: 'success', message: '加群已通过' });
			uni.$u.toast('加群已通过')
	        socket.joinGroup({
	            ...obj,
	            operate: "join"
	        })
	    }
	}
});


socket.connect()

export default socket
