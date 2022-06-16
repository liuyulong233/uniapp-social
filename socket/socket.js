import store from '../store'
import io from '@/js_sdk/hyoga-uni-socket_io/uni-socket.io.js'
import {
	guid,
	randomAvatar,
	randomName
} from '@/util/func.js'

function getOption() {
	let option = {}
	// console.log('getOption',store.state.isLogin)
	if (!store.state.isLogin) {
		//#ifdef H5
		let userinfo = JSON.parse(sessionStorage.getItem("temp_userinfo")||'{}');
		//#endif
		//#ifndef H5 
		let userinfo = JSON.parse(uni.getStorageSync("temp_userinfo")||'{}');
		//#endif
		if (!userinfo.uid) {
			let uid = guid(16, 16)
			let obj = {
				uid,
				nickname: randomName(),
				avatar: randomAvatar(),
				expired: 0,
			}
			userinfo = obj;
			//#ifdef H5
			sessionStorage.setItem('temp_userinfo', JSON.stringify(obj))
			//#endif
			//#ifndef H5 
			uni.setStorageSync('temp_userinfo', JSON.stringify(obj))
			//#endif
		}
		// console.log('temp_userinfo',store.state.isLogin)
		option.uid = userinfo.uid

	} else {
		option.uid = store.state.userinfo.uid
	}
	// console.log(store.state)
	option.hasLogin = store.state.isLogin;
	return option
}
class SocketService {
	constructor(options) {
		this.onP2PMsg = options.onP2PMsg;
		this.message = options.message;
		this.onGroupMsg = options.onGroupMsg;
		this.onJoinGroup = options.onJoinGroup;
		this.flag = {
			onP2PMsg: null,
			onGroupMsg: null,
			message: null,
			onJoinGroup: null
		}
	}
	//连接服务器方法
	connect() {
		return
		let obj = getOption()
		//连接服务器
		console.log(uni.WS_API)

		this.ws = io(`${uni.WS_API}/?option=` + JSON.stringify(obj), {
			query: {},
			transports: ['websocket', 'polling'],
			timeout: 5000,
		});
		//监听到连接服务端
		this.ws.on('connect', () => {
			console.log('client connected server success')
			for (let key of Object.keys(this.flag)) {
				if (!this.flag[key]) {
					this.ws.on(key, this[key]);
					this.flag[key] = true;
				}
			}
			// this.ws.on('onP2PMsg',this.onP2PMsg)
			//监听同一事件多次，收到消息也会多次，造成重复接收数据
			// this.ws.on('onP2PMsg',this.onP2PMsg)
			// this.ws.on('onGroupMsg',(msg)=>{
			// 	console.log("onGroupMsg",msg);
			// })
		});
		//连接断开
		this.ws.on('disconnect', (arg) => {
			console.log('断开连接了', arg)

			// this.ws.open();
		});
		//重新连接
		this.ws.on('reconnect', (arg) => {
			console.log('重新连接')
		});
		//连接中
		this.ws.on('reconnecting', (arg) => {
			console.log('重新连接中', arg)
		});
		//连接失败
		this.ws.on('connect_error', (error) => {
			console.log('连接失败', error)
		});

		//关闭连接
		this.ws.on('close', (error) => {
			console.log('连接关闭', error)
		});
	}
	//销毁该实例
	destroyed() {
		// window.onbeforeunload = function () {
		// 	websocket.onclose = function () { }; // disable onclose handler first
		// 	websocket.close()
		// };
	}
	close() {
		this.ws&&this.ws.close()
	}
	sendP2PMsg(msg) {
		this.ws&&this.ws.emit('P2PMsg', msg, (res) => {
			//成功发送到服务端 会执行
			console.log('发送成功', res);
		})
	}
	//发送群聊消息
	sendGroupMsg(msg) {
		this.ws&&this.ws.emit('groupMsg', msg, (res) => {
			//成功发送到服务端 会执行
			console.log('发送成功', res);
		})
	}

	leaveRoom(groupId) {
		this.ws&&this.ws.emit('leaveRoom', groupId)
	}
	//监听到agreeJoin事件时调用 加群
	joinGroup(obj) {
		this.ws&&this.ws.emit('joinGroup', obj)
	}

	send(msg) {
		this.ws&&this.ws.send(msg)
	}
}
export default SocketService
