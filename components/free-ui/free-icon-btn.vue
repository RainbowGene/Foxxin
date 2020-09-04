<template>
	<!-- 图标按钮组件 -->
	<view class="icon-btn-box flex-row align-center justify-center border" hover-class="bg-hover-light" @click="$emit('click')">
		<text class="iconfont">
			<slot></slot>
		</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-btn-box {
		height: 90rpx;
		width: 90rpx;
	}
</style>
