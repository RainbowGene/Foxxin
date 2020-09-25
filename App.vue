<script>
	export default {
		onLaunch: function() {
			// 加载全局唯一的录音管理器
			this.$store.commit('initRECORD')

			// 初始化登录状态
			this.$store.dispatch('initLogin')
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./common/css/free.css";
	@import "./common/css/iconfont.css";
	@import "./common/css/common.css";
</style>
