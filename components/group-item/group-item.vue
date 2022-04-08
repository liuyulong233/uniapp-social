<template>
	<view class="user-list flex  align-middle">
		<!-- 左 -->
		<view class="left flex align-middle">
			<image :src="item.group.avatar" mode="widthFix" @click="tochat"lazy-load></image>
			<view class="name" @click="tochat">
				{{item.group.nickname}}
				
			</view>
		</view>
		<!-- 中 -->

		<!-- 右 -->
		<view v-if="scene==2">
			<u-button text="申请加入" type="primary" @click="join" v-if="item.uid!=userinfo.uid"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		props: {
			item:{
				default:Object,
				default:()=>({
					group:{}
				})
			} ,
			scene: {
				type: [Number, String],
				default: 1
			}
		},
		computed:{
			userinfo(){
				return this.$store.state.userinfo
			}
		},
		methods: {
			handle(){
				
			},
			//个人空间
			join() {
				let item=this.item;
				let obj = {
					operate: "notice", //notice-加群通知 agree-同意加群 join-加群
					group_id: item._id, //群ID
					group_uid: item.uid, //群主uid
					uid: this.userinfo.uid, //加群人uid
					group: {
						uid: item.uid,
						avatar: item.cover,
						nickname: item.name,
					},
					user: {
						uid: this.userinfo.uid,
						avatar: this.userinfo.avatar,
						nickname:this.userinfo.nickname,
					},
				};
				this.$socket.joinGroup(obj);
			},
			tochat() {
				if(this.scene==2)return;
				let obj = {
					...this.item,
					type: "GROUP"
				}
				obj.uid=this.item.group_id;
				this.$store.commit('set_curchat', obj)
				uni.navigateTo({
					url: '../../pages/userchat/userchat'
				})
			}
		}
	}
</script>

<style scoped>
	.user-list {
		margin: 0 20upx;
		padding: 20upx 0;
		border-bottom: 1upx solid #EEEEEE;
	}

	.left {
		flex: 1;
	}

	.left image {
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		margin-right: 20upx;

	}
</style>
