<template>
	<view>
		<image :style="imageStyle" :class="imageClass" :src="src" @click="$emit('click')" @load="loadImg" lazy-load></image>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			imageClass: {
				type: String,
				default: ''
			},
			maxWidth: {
				type: Number,
				default: 350
			},
			maxHeight: {
				type: Number,
				default: 350
			}
		},
		data() {
			return {
				width: 100, // 图片宽高
				height: 100
			}
		},
		computed: {
			imageStyle() {
				return `height:${this.height}px;width:${this.width}px;`
			}
		},
		methods: {
			// 图片加载完成
			loadImg(e) {
				// 拿到宽高赋值
				let {
					width,
					height
				} = e.detail
				let maxW = uni.upx2px(this.maxWidth)
				let maxH = uni.upx2px(this.maxHeight)
				if (width <= maxW) {
					// 不改变宽高
					this.width = width
					this.height = height
				} else { // 宽度超过更改比例
					this.width = maxW
					this.height = maxW * (height / width)
				}
				this.$emit('load',{
					width:this.width,height:this.height
				})
			}
		}
	}
</script>

<style>
</style>
