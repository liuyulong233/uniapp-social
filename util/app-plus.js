import {
	getUpgrade
} from "../api/index.js"
export function customSplashScreen() {
	// #ifdef APP-PLUS
	plus.navigator.closeSplashscreen();
	var w = plus.webview.open(
		'hybrid/html/advertise/advertise.html',
		'本地地址', {
			top: 0,
			bottom: 0,
			zindex: 999
		},
		'fade-in',
		500
	);
	//设置定时器，4s后关闭启动广告页
	setTimeout(function() {
		plus.webview.close(w);
	}, 4000);
	// #endif
}
export function getVersion() {
	// #ifdef APP-PLUS  
	return new Promise((resolve, reject) => {
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			resolve(widgetInfo)
		});
	})

	// #endif
}
export async function checkUpgrade() {
	//#ifdef APP-PLUS
	//获取本地app版本信息
	let versionInfo = await getVersion()
	let info = { //升级检测数据  
		"appid": plus.runtime.appid,
		"version": versionInfo.version,
		// "name": version.name
	};
	console.log('checkUpgrade',info)
	//查询app是否有最新版本
	getUpgrade(info).then(res => {
		let data = res.data;
		console.log('checkUpgrade-1',data)
		//没有最新版本可升级
		if (!data.is_upgrade) return;
		//跳转到更新
		uni.navigateTo({
			url: `/pages/upgrade/upgrade?PACKAGE_INFO=${JSON.stringify(data)}`,
			
		})
		
	}).catch(err=>{
		console.log('upgrade-err:',err)
	})
	//#endif
}
