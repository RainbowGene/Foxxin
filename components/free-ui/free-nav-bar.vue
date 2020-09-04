<template>
	<view>
		<!-- 导航栏 -->
		<view class="index-top-bar bg-light" :class="fixed?'fixed-top-bar':''">
			<!-- 状态栏留白 -->
			<view :style="'height:'+statusBarHeight+'px'"></view>
			<!-- 导航 -->
			<view class="top-bar">
				<view class="top-bar-left">
					<text v-if="title">
						<slot name="title">{{title}}</slot>
					</text>
				</view>
				<view class="top-bar-right">
					<free-icon-btn @click="searchHandle"><text class="iconfont">&#xe636;</text></free-icon-btn>
					<free-icon-btn @click="addHandle"><text class="iconfont smart">&#xe60d;</text></free-icon-btn>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="fixed" :style="fixedStyle"></view>

	</view>
</template>

<script>
	import freeIconBtn from './free-icon-btn.vue'
	export default {
		data() {
			return {
				statusBarHeight: 0,
				navBarHeight: 0
			}
		},
		props: {
			title: {
				type: Boolean,
				default: false
			},
			fixed: {
				type: Boolean,
				default: true // 默认固定头部
			}
		},
		components: {
			freeIconBtn
		},
		// 组件中不能使用onLoad
		mounted() {
			// #ifdef APP-PLUS-NVUE
			this.statusBarHeight = plus.navigator.getStatusbarHeight()
			// #endif
			this.navBarHeight = this.statusBarHeight + uni.upx2px(90) // 90rpx高度转为px
		},
		computed: {
			fixedStyle() {
				return `height:${this.navBarHeight}px`
			}
		},
		methods: {
			searchHandle() {
				console.log('搜索')
			},
			addHandle() {
				console.log('添加')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-top-bar {

		.top-bar {
			padding: 0 15rpx 0 35rpx;
			height: 90rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}

		.top-bar-left {
			flex: 1;
		}

		.top-bar-right {
			display: flex;
			flex-direction: row;
			align-items: center;
			text-align: center;

			view {
				height: 90rpx;
				width: 90rpx;
				line-height: 90rpx;

				.iconfont {
					font-size: 50rpx;
				}

				.smart {
					font-size: 48rpx;
				}
			}
		}
	}
	.fixed-top-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1030;
	}
</style>
