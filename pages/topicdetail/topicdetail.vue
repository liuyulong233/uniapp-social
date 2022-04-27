<template>
	<view>
		<!-- 头部 -->
		 <topic-info :item="info" class="top"></topic-info>
		<!-- 列表 -->
		<block v-for="(item,index) in list">
			<dy-item :key="item._id" :item="item"  class="dy"></dy-item>
		</block>
		
	</view>
</template>

<script>
	export default {
		components:{
		},
		data() {
			return {	
				info:{},
				list:[]
			}
		},
		onLoad(options) {
			this.id=options.id
			this.getData();
			this.getList()
		},
		onReachBottom(){
			console.log('onReachBottom')
		},
		methods: {
			getData(){
				if(!this.id)return
				this.$api
					.getTopicDetail({
						_id:this.id
					})
					.then((res) => {
						console.log(res);
						this.info=res.data
					})
					.catch((err) => {
						console.log(err);
					});
			},
			getList(){
				if(!this.id)return
				this.$api
					.getTopicDynamics({
						_id:this.id,
						page_size:20
					})
					.then((res) => {
						console.log(res);
						this.list=res.data
					})
					.catch((err) => {
						console.log(err);
					});
			}
						
		}
	}
</script>

<style scoped>
.dy,.top{
	border-bottom: 16rpx solid #F2F2F2;
}
</style>
