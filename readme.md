参考了 糗事百科项目  
使用 uview2 改造

## 接口文档
[接口文档](https://docs.apipost.cn/preview/b898423ab099b57a/f662da46a6e64085?target_id=34d01cc5-2926-4c93-979f-a73d403b8a60#b501d3e4-fe23-4287-99ff-8fb00795de79)
	
# 开发app遇到的问题
1.没有doucument window,doucument window上的方法不能使用  
2.image层级较高  
3.输入框键盘遮挡问题  
:adjust-position="false"
[输入框键盘遮挡问题](https://blog.csdn.net/weixin_44646986/article/details/112753567?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2.pc_relevant_aa&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2.pc_relevant_aa&utm_relevant_index=5)  
4.白屏bug  
	uni-app项目中主要文件的加载顺序  
	1.先后顺序  
	index.html > App.vue的export外的js代码 > main.js > App.vue的export里面的js代码 > Index.vue的export外的js代码
	Cannot read property 'http' of undefined  
	const http = uni.$u.http  
	uni.$u-> undefined,因为先加载App.vue的export里面的js代码 uview $u未挂载
	解决办法  
	1.不使用const http = uni.$u.http，用uni.$u.http请求  
	2.在App.vue 先引入import uView from '@/uni_modules/uview-ui'  
5.首页 tab 标签内容 触发上拉加载后，tabs标签上滑了  
app 环境 $refs.tab.$el.clientHeight失效，因为没有dom  
使用 uni.createSelectorQuery().in(this)解决 
```
const query = uni.createSelectorQuery().in(this);
query.select('#id').boundingClientRect(data => {
  console.log("得到布局位置信息" + JSON.stringify(data));
  console.log("节点离页面顶部的距离为" + data.top);
}).exec();
```

## 只有小程序能够获得导航栏高度，app、H5是没有的，所以高度这两端的导航栏高度是设屎的45px







4.引导页
5.启动页
6.更新功能