<template>
	<text class="msg-badge bg-danger text-white rounded-circle font-sm position-absolute" :class="badgeClass" :style="badgeStyle"><slot></slot></text>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 角标
	.msg-badge {
		padding: 6rpx 14rpx;
		position: absolute;
		// right: 15rpx;
		// top: 9rpx;
	}
</style>
