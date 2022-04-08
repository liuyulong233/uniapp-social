<template>
	<view class="body">
		<block v-for="(item,index) in homelist" :key="index">
			<u-cell :title="item.name"  :isLink="true" @click="handleClick(item)"></u-cell>
			<!-- <homeList :item="item"></homeList> -->
		</block>
		<button class="user-set-btn" type="primary" @click="set_loginout">退出登录</button>
	</view>
</template>

<script>
	import homeList from "../../compoents/home/home-list.vue"
	import {
		mapMutations
	} from 'vuex'
	export default {
		components: {
			homeList
		},
		data() {
			return {
				homelist: [{
						icon: '',
						name: '账号与安全',
						type: 'navigateTo',
						urls: '../../pages/userpassword/userpassword'
					},
					{
						icon: '',
						name: '绑定邮箱',
						type: 'navigateTo',
						urls: '../../pages/useremail/useremail'
					},
					{
						icon: '',
						name: '资料编辑',
						type: 'navigateTo',
						urls: '../../pages/usersetinfo/usersetinfo'
					},
					// {icon:'',name:'小纸条',type:'',urls:''},
					{
						icon: '',
						name: '清除缓存',
						type: 'clear',
						urls: ''
					},
					{
						icon: '',
						name: '意见反馈',
						type: 'navigateTo',
						urls: '../../pages/userhelp/userhelp'
					},
					{
						icon: '',
						name: '关于',
						type: 'navigateTo',
						urls: '../../pages/userabout/userabout'
					}
				]
			}
		},
		methods: {
			...mapMutations(['set_loginout']),
			handleClick(item){
				switch(item.type){
					case 'navigateTo':
					if(item.urls){uni.navigateTo({url:item.urls})}
					break;
					case 'clear':
					uni.showModal({
					    title: '提示',
					    content: '是否清除缓存？',
					    success: function (res) {
					        if (res.confirm) {
					           // uni.clearStorage();
							   uni.showToast({
							       title: '清除成功',
							       duration: 1000
							   });
					        } 
					    }
					});
					break;
				}
			}
		}
	}
</script>

<style scoped>
	.user-set-btn{
		margin-top: 20px;
	}
</style>
