<template>
	<image :class="type" :src="src?src:'/static/images/userpic.png'" :style="getStyle" mode="widthFix" @click="toMail"></image>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: "rounded" // 默认有一点圆角
			},
			size: {
				type: [String, Number],
				default: 90
			},
			clickType: {
				type: String,
				default: null
			},
			id: {
				type: Number,
				default: 0
			}
		},
		computed: {
			getStyle() {
				return `width: ${this.size}rpx;height: ${this.size}rpx;`
			}
		},
		methods: {
			// 跳转到名片页
			toMail() {
				switch (this.clickType) {
					case 'navigate':
						console.log(this.id)
						uni.navigateTo({
							url: "/pages/mail/user-base/user-base?user_id=" + this.id
						})
						break;
					default:
						this.$emit('click')
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
