<template>
	<view class="body">

		<block v-for="(item,index) in groupList" :key="index">
			<group-item :item="item" :scene="2"></group-item>
		</block>

	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				groupList: [],
			}
		},
		methods: {
			
			getGroup() {
				this.$api.getGroupList()
					.then(res => {
						console.log(res)
						this.groupList = res.data.map(item=>({group:{avatar:item.cover,nickname:item.name},...item})) || []

					}).catch(err => {
						console.log(err)
					})
			}
		},
		mounted() {


		},
		onLoad() {
			
			this.getGroup()

		},
		onShow() {
		},
		onNavigationBarButtonTap(e) {
			
		},
		computed: {



		}
	}
</script>

<style scoped>


</style>
