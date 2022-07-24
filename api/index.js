
// const uni.$u.http =uni.$u&& uni.$u.http
// 登录
export const login = (params, config = {}) => uni.$u.http.post('/api/login', params, config)
//注销
export const logout = (params, config = {}) => uni.$u.http.post('/api/app/logout', params, config)
//注册 
export const register = (params, config = {}) => uni.$u.http.post('/api/register', params, config)
// 获取验证码
export const getVerifyCode = (type = 'login') => uni.API_URL + `/api/verifyCode?type=${type}&t=` + Date.now()

// 上传图片
export const upload = (file) => {
	//#ifdef H5
	const token = sessionStorage.getItem('token')
	//#endif
	//#ifndef H5 
	const token = uni.getStorageSync('token');
	//#endif
	return uni.uploadFile({
		url: uni.API_URL + '/api/app/upload', //仅为示例，非真实的接口地址
		filePath: file,
		header: {
			authorization: 'bearer ' + token
		},
		name: 'file',
		formData: {},

	});

}
//首页动态列表
export const getDynamics = (data) => uni.$u.http.get('/api/app/dynamic', {
	params: data
})
//评论列表
export const getComments = (data) => uni.$u.http.get('/api/app/comment', {
	params: data
})
//应用更新
export const getUpgrade= (data) => uni.$u.http.get('/api/app/upgrade', {
	params: data
})
export const getConfig= (data) => uni.$u.http.get('/api/app/config', {
	params: data
})
//评论发布
export const postComment = (params, config = {}) => uni.$u.http.post('/api/app/comment/add', params, config)
//一级评论详情及回复
export const getReply = (data) => uni.$u.http.get('/api/app/comment/detail', {
	params: data
})
//获取我的页面数据
export const getMine = (data) => uni.$u.http.get('/api/app/mine', {
	params: data
})
//获取用户个人资料
export const getUserInfo = (data) => uni.$u.http.get('/api/app/user/profile', {
	params: data
})
//修改个人资料
export const editUserInfo = (params, config = {}) => uni.$u.http.post('/api/app/user/edit', params, config)
//获取个人主页 动态列表数据
export const getUserDynamics = (data) => uni.$u.http.get('/api/app/mine/dynamic', {
	params: data
})
//动态删除
export const removeDynamic = (data) => uni.$u.http.get('/api/app/dynamic/remove', {
	params: data
})
//发布动态
export const addDynamic = (data) => uni.$u.http.post('/api/app/dynamic/add', data)
//编辑动态
export const editDynamic = (data) => uni.$u.http.post('/api/app/dynamic/edit', data)
//动态详情
export const getDynamicDetail = (data) => uni.$u.http.get('/api/app/dynamic/detail', {
	params: data
})
//文章删除
export const removeArticle = (data) => uni.$u.http.get('/api/app/article/remove', {
	params: data
})
//首页文章列表
export const getArticles = (data) => uni.$u.http.get('/api/app/article', {
	params: data
})
//获取个人主页 文章列表数据
export const getUserArticles = (data) => uni.$u.http.get('/api/app/mine/article', {
	params: data
})
//文章详情
export const getArticleDetail = (data) => uni.$u.http.get('/api/app/article/detail', {
	params: data
})
//关注/粉丝列表
export const getFollows = (data) => uni.$u.http.get('/api/app/mine/follow', {
	params: data
})
//关注/取关
export const follow = (params, config = {}) => uni.$u.http.post('/api/app/user/follow', params, config)
//修改密码 邮箱 手机
export const bind = (params, type = 'password') => uni.$u.http.post('/api/app/bind/' + type, params)
//收藏/取消
export const collect = (params) => uni.$u.http.post('/api/app/collect', params)
//点赞/取消
export const like = (params) => uni.$u.http.post('/api/app/like', params)
//收藏列表
export const getCollects = (data) => uni.$u.http.get('/api/app/collect/list', {
	params: data
})
//--- 聊天 ---
//获取单聊 消息列表
export const getSingleMsgList = (data) => uni.$u.http.get('/api/chat/singleMessage/list', {
	params: data
})

//查询最新聊天会话  
export const getConversations = (data) => uni.$u.http.get('/api/chat/conversation/list', {
	params: data
})

//加群通知列表
export const  getNoticeList=(data) => uni.$u.http.get('/api/chat/group/join/list', {
	params: data
})

//建群
export const createGroup=(params) => uni.$u.http.post('/api/chat/group/add', params)

//查询群列表
export const getGroupList=(data) => uni.$u.http.get('/api/chat/group/list', {
	params: data
})
//查询群成员
export const getGroupMember=(data) => uni.$u.http.get('/api/chat/groupmember/list', {
	params: data
})
//查询加入的群列表
export const getJoinGroupList=(data) => uni.$u.http.get('/api/chat/joingroup/list', {
	params: data
})

//同意/拒绝加群申请
export const postGroupJoin=(params) => uni.$u.http.post('/api/chat/group/join', params)

//群历史消息 
export const getGroupMsgList=(data) => uni.$u.http.get('/api/chat/groupMessage/list', {
	params: data
})
//查询群信息 
export const getGroupInfo=(params) => uni.$u.http.get('/api/chat/group/detail', {params})

//修改群信息 
export const editGroupInfo=(params) => uni.$u.http.post('/api/chat/group/edit', params)

//修改群昵称接口
export const editGroupSetting=(params) => uni.$u.http.post('/api/chat/groupmember/edit', params)






//话题-------
//创建话题
export const addTopic=(params) => uni.$u.http.post('/api/app/topic/add', params)
//话题列表
export const getTopics=(data) => uni.$u.http.get('/api/app/topics', {
	params: data
})
//话题详情
export const getTopicDetail=(data) => uni.$u.http.get('/api/app/topic/detail', {
	params: data
})
//话题下的动态
export const getTopicDynamics=(data) => uni.$u.http.get('/api/app/topic/dynamic', {
	params: data
})
//根据动态id找话题id
// export const getTopicId=(data) => uni.$u.http.get('/api/app/topic_id', {
// 	params: data
// })