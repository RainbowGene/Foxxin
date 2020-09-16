<template>
	<!-- 图标按钮组件 -->
	<view class="flex-row align-center justify-center" hover-class="bg-hover-light" @click="$emit('click')" style="width: 90rpx;height: 90rpx;">
		<text class="iconfont font-weight-bold font-lg"><slot></slot></text>
	</view>
</template>

<script>
	export default {
		props:{
			icon:{
				type:String,
				default:''
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
