<template>
	<image :class="type" :src="src" :style="getStyle" mode="widthFix"></image>
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
			size:{
				type:[String,Number],
				default:90
			}
		},
		computed:{
			getStyle(){
				return `width: ${this.size}rpx;height: ${this.size}rpx;`
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
