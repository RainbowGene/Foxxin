<template>
	<view>
		<!-- 导航栏 -->
		<view class="index-top-bar" :class="getClass">
			<!-- 状态栏留白 -->
			<view :style="'height:'+statusBarHeight+'px'"></view>
			<!-- 导航 -->
			<view class="top-bar">
				<view class="top-bar-left flex flex-row align-center" :class="showBack?'':'pl-3'">
					<!-- fanhui -->
					<free-icon-btn v-if="showBack" @click="back"><text class="iconfont smart">&#xe613;</text></free-icon-btn>
					<text v-if="title">
						<slot name="title">{{title}}{{noread|msgNumFilter}}</slot>
					</text>
				</view>
				<view class="top-bar-right">
					<slot name="right">
						<free-icon-btn @click="searchHandle"><text class="iconfont">&#xe636;</text></free-icon-btn>
						<free-icon-btn @click="addHandle"><text class="iconfont smart">&#xe60d;</text></free-icon-btn>
					</slot>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="fixed" :style="fixedStyle"></view>
		<!-- 拓展菜单 -->
		<free-popup ref="extend" border bodyBgColor="bg-dark" :bodyW="290" :bodyH="525">
			<view class="popup-content" style='height: 525rpx;width: 290rpx;'>
				<view class="popup-item pl-3" hover-class="bg-hover-dark" v-for="(item,index) in menus" :key="index" @click="clickEvent(item.event)">
					<text class="iconfont text-white font-md" v-html="item.icon+' '+item.name"></text>
				</view>
			</view>
		</free-popup>
	</view>
</template>

<script>
	import freeIconBtn from './free-icon-btn.vue'
	import freePopup from './free-popup.vue'
	export default {
		data() {
			return {
				statusBarHeight: 0,
				navBarHeight: 0,
				menus: [{
						name: '发起群聊',
						event: '',
						icon: '&#xe609;'
					},
					{
						name: '添加朋友',
						event: '',
						icon: '&#xe61d;'
					},
					{
						name: '扫一扫',
						event: '',
						icon: '&#xe610;'
					},
					{
						name: '收付款',
						event: '',
						icon: '&#xe6de;'
					},
					{
						name: '帮助与反馈',
						event: '',
						icon: '&#xe600;'
					}
				]
			}
		},
		props: {
			showBack: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: true // 默认固定头部
			},
			noread: {
				type: Number,
				default: 0
			},
			bgColor: {
				type: String,
				default: 'bg-light'
			}
		},
		components: {
			freeIconBtn,
			freePopup
		},
		// 组件中不能使用onLoad
		mounted() {
			// #ifdef H5
			this.navBarHeight = this.statusBarHeight + uni.upx2px(90) // 90rpx高度转为px
			// #endif
			// #ifdef APP-PLUS-NVUE
			this.statusBarHeight = plus.navigator.getStatusbarHeight()
			// #endif
		},
		computed: {
			fixedStyle() {
				return `height:${this.navBarHeight}px`
			},
			getClass() {
				let fixed = this.fixed ? 'fixed-top-bar' : ''
				return `${fixed} ${this.bgColor}`
			}
		},
		methods: {
			searchHandle() {
				console.log('搜索')
			},
			addHandle() {
				if (this.$refs.extend.status) return this.$refs.extend.hidden()
				this.$refs.extend.show(uni.upx2px(445), uni.upx2px(100))
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		filters: {
			msgNumFilter(num) {
				if (num > 99) return '(99+)'
				else return num !== 0 ? '(' + num + ')' : ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-top-bar {

		.top-bar {
			// padding: 0 15rpx 0 35rpx;
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

	.popup-content {
		display: flex;
		flex-direction: column;

		.popup-item {
			flex: 1;
			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
		}

		view:last-child {
			border-bottom: none;
		}
	}
</style>
