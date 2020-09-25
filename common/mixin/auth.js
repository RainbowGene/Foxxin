import $U from "@/common/free-lib/util.js"
export default {
	onShow() {
		let token = $U.getStorage('token')
		if (!token) {
			return uni.reLaunch({
				url: '/pages/compage/login/login'
			})
		}
	},
	methods: {
		// 跳转
		navigate(path) {
			uni.navigateTo({
				url: '/pages/' + path
			})
		},
		// 返回并提示
		backToast(msg = '参数非法') {
			uni.showToast({
				title: msg,
				icon: "none"
			})
			return setTimeout(() => {
				uni.navigateBack({
					delta: 1
				})
			}, 500)
		}
	}
}
