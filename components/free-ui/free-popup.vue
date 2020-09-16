<template>
	<!-- 弹出层 -->
	<div v-if="status" ref="popup" class="popup-menu">
		<!-- 蒙版 -->
		<div v-if="mask" class="popup-mask position-fixed top-0 left-0 right-0 bottom-0" :style="getMaskColor" @click="hidden"></div>
		<!-- 内容 -->
		<div class="position-fixed" :class="getBodyClass" :style="getBodyStyle">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			mask: {
				type: Boolean,
				default: true // 默认开启蒙版
			},
			maskColor: {
				type: Boolean,
				default: false // 蒙版透明
			},
			// 是否居中
			center: {
				type: Boolean,
				default: false
			},
			// 是否处于底部
			Bottom: {
				type: Boolean,
				default: false
			},
			// 内容宽高
			bodyW: {
				type: Number,
				default: 0
			},
			bodyH: {
				type: Number,
				default: 0
			},
			bodyBgColor: { // 自定义样式
				type: String,
				default: 'bg-white'
			},
			// tabbar 高度
			tabHeight: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				status: false,
				x: -1,
				y: -1,
				maxX: 0,
				maxY: 0
			}
		},
		mounted() {
			// 计算边界
			const res = uni.getSystemInfoSync()
			this.maxX = res.windowWidth - uni.upx2px(this.bodyW)
			this.maxY = res.windowHeight - uni.upx2px(this.bodyH) - uni.upx2px(this.tabHeight)
		},
		computed: {
			getMaskColor() {
				let i = this.maskColor ? 0.5 : 0
				return `background-color: rgba(0,0,0,${i});`
			},
			getBodyClass() {
				if (this.center) {
					return 'left-0 right-0 bottom-0 top-0 flex align-center justify-center'
				}
				let fixedbottom = this.Bottom ? 'left-0 right-0 bottom-0' : 'rounded border'
				return `${fixedbottom} ${this.bodyBgColor}`
			},
			getBodyStyle() {
				let left = this.x > -1 ? `left:${this.x}px;` : ''
				let top = this.y > -1 ? `top:${this.y}px;` : ''
				// let width = this.bodyW ? `width:${this.bodyW}rpx;` : ''
				// let height = this.bodyH ? `height:${this.bodyH}rpx;` : ''
				return left + top
			}
		},
		methods: {
			show(x, y) {
				if (x && y) {
					this.x = (x > this.maxX) ? this.maxX - 5 : x;
					this.y = (y > this.maxY) ? this.maxY - 5 : y;
				}
				this.status = true
			},
			hidden() {
				this.status = false
				this.$emit('hide')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-menu {
		overflow: hidden;
		z-index: 1000;
	}
</style>
