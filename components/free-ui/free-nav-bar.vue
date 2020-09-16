<template>
	<view>
		<!-- 导航栏 -->
		<view class="index-top-bar" :class="getClass">
			<!-- 状态栏留白 -->
			<view :style="'height:'+statusBarHeight+'px'"></view>
			<!-- 导航 -->
			<view class="flex-row align-center justify-center">
				<view class="flex-1 flex flex-row align-center" :class="showBack?'':'pl-3'">
					<!-- fanhui -->
					<free-icon-btn v-if="showBack" @click="back"><text class="iconfont font-lg">&#xe613;</text></free-icon-btn>
					<text v-if="title">
						<slot name="title">{{title}}{{noread|msgNumFilter}}</slot>
					</text>
					<slot name="center"></slot>
				</view>
				<view v-if="showRight" class="flex-row align-center text-center">
					<slot name="right">
						<free-icon-btn @click="searchHandle">&#xe6bd;</free-icon-btn>
						<free-icon-btn @click="addHandle">&#xe61f;</free-icon-btn>
					</slot>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="fixed" :style="fixedStyle"></view>
		<!-- 拓展菜单 -->
		<free-popup ref="extend" border bodyBgColor="bg-dark" :bodyW="290" :bodyH="525">
			<view class="flex-column" style='height: 525rpx;width: 290rpx;'>
				<view class="flex-1 justify-center pl-3" hover-class="bg-hover-dark" v-for="(item,index) in menus" :key="index" @click="clickEvent(item.event)">
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
			},
			showRight: {
				type: Boolean,
				default: true
			},
			backEvent:{
				type:Boolean,
				default:true
			}
		},
		components: {
			freeIconBtn,
			freePopup
		},
		// 组件中不能使用onLoad
		mounted() {
			// #ifdef H5
			// this.navBarHeight = this.statusBarHeight + uni.upx2px(90) // 90rpx高度转为px
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
				uni.navigateTo({
					url:"/pages/compage/search/search"
				})
			},
			addHandle() {
				if (this.$refs.extend.status) return this.$refs.extend.hidden()
				this.$refs.extend.show(uni.upx2px(445), uni.upx2px(100))
			},
			back() {
				if(this.backEvent){
					return uni.navigateBack({
						delta: 1
					})
				}
				this.$emit('back')
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
</style>
