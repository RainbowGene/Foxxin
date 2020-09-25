<template>
	<text class="msg-badge bg-danger text-white rounded-circle font-sm position-absolute" :class="badgeClass" :style="badgeStyle">{{value}}</text>
	<!-- uniapp 的 nvue 编译模式下不推荐在 text中使用 slot -->
</template>

<script>
	export default {
		props: {
			badgeClass: {
				type: String,
				default: ""
			},
			badgeStyle: {
				type: String,
				default: ""
			},
			value:{
				type:[Number,String],
				default:''
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 角标
	.msg-badge {
		margin-right: 10upx;
		padding: 6rpx 10rpx;
		position: absolute;
		// right: 15rpx;
		// top: 9rpx;
	}
</style>
