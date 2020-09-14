<template>
	<view class="pb-2">
		<!-- 时间显示 -->
		<view v-if="showTime" class="flex align-center justify-center mt-1 py-2">
			<text class="font-sm text-light-muted">{{showTime}}</text>
		</view>
		<!-- 撤回消息 -->
		<view v-if="item.isremove" class="flex align-center justify-center py-2">
			<text class="font-sm text-light-muted">你撤回了一条消息</text>
		</view>
		<!-- 主体内容 -->
		<view v-if="!item.isremove" class="flex pt-1 position-relative" :class="isSelf?'flex-row-reverse':'flex-row'">
			<view>
				<free-avatar clickType="navigate" :src="item.avatar" :size="60"></free-avatar>
			</view>
			<text v-if="item.type!=='emoticon'&&item.type!=='img'&&item.type!=='video'" class="iconfont position-absolute font-lg"
			 :class="isSelf?'text-chat-item chat-right-icon':'chat-left-icon text-white'">{{isSelf?'&#xe61c;':'&#xe6a7;'}}</text>
			<!-- 长按弹出操作菜单 -->
			<div @longpress="longClick" :style="labelStyle" style="max-width: 500rpx;" class="rounded px-2 py-1" :class="labelClass">
				<!-- 文字 -->
				<text v-if="item.type==='text'" class="font-md">{{item.data}}</text>
				<!-- 表情 -->
				<free-image v-else-if="item.type==='emoticon' || item.type==='img'" @click="preview(item)" :src="item.data"
				 imageClass="rounded" :maxHeight="250" :maxWidth="350"></free-image>
				<!-- 音频 -->
				<view v-else-if="item.type==='audio'" :class="isSelf?'flex-row':'flex-row-reverse'" class="flex align-center justify-end"
				 @click="openAudio">
					<image :src="audioPlaying?'/static/audio/play.gif':'/static/audio/audio3.png'" style="width: 50rpx;height: 50rpx;"
					 class="mx-1"></image>
					<text class="font">{{item.options.time+'\''}}</text>
				</view>
				<!-- 视频 -->
				<view v-else-if="item.type==='video'" class="position-relative rounded">
					<free-image :src="item.options.poster" imageClass="rounded bg-hover-light" :maxHeight="250" :maxWidth="350" @load="loadPoster"></free-image>
					<text @click="openVideo" class="iconfont position-absolute text-white" style="font-size: 80rpx;" :style="posterIconStyle">&#xe62e;</text>
				</view>
			</div>
		</view>
	</view>
</template>

<script>
	import freeImage from "./free-image.vue"
	import freeAvatar from "./free-avatar.vue"
	import $time from "../../common/js/time.js"
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		props: {
			item: Object,
			index: Number,
			// 上一条消息的时间戳
			pretime: [Number, String]
		},
		data() {
			return {
				audioContext: null,
				audioPlaying: false,
				poster: {
					w: 100,
					h: 100
				}
			}
		},
		components: {
			freeAvatar,
			freeImage
		},
		computed: {
			...mapState({

			}),
			isSelf() {
				let id = 1 // 假设拿到了id
				return this.item.user_id === id
			},
			showTime() {
				// 间隔超过300秒不要显示了
				return $time.getChatTime(this.item.createtime, this.pretime)
			},
			// 气泡是否显示
			labelClass() {
				if (this.item.type !== 'text' && this.item.type !== 'audio') {
					return this.isSelf ? 'mr-3' : 'ml-3'
				}
				// 如果是音频或者文字需要气泡
				return this.isSelf ? 'mr-3 bg-chat-item' : 'ml-3 bg-white'
			},
			// 视频封面图片显示位置
			posterIconStyle() {
				let iconSelf = uni.upx2px(40)
				return `left:${this.poster.w/2-iconSelf}px;top:${this.poster.h/2-iconSelf}px;`
			},
			// 气泡长度
			labelStyle() {
				if (this.item.type === 'audio') {
					let time = this.item.options.time || 0
					let width = parseInt(time) / (60 / 500)
					width = width <= 80 ? 80 : width
					return `width:${width}rpx;`
				}
			}
		},
		mounted() {
			// 注册全局事件
			if (this.item.type === 'audio') {
				this.audioOn(this.onPlayAudio)
			}
		},
		destroyed() {
			if (this.audioContext) {
				// 存在则先销毁
				this.audioContext.destroy()
				this.audioContext = null
			}
			if (this.item.type === 'audio') {
				this.audioOff(this.onPlayAudio)
			}
		},
		methods: {
			...mapActions(['audioOn', 'audioEmit', 'audioOff']),
			// 监听播放音频  index：当前播放的索引
			onPlayAudio(index) {
				if (this.audioContext) {
					if (this.index !== index) { // 不为当前播放
						this.audioContext.pause()
					}
				}
			},
			// 长按事件
			longClick(e) {
				let x = 0
				let y = 0
				// #ifdef APP-PLUS-NVUE
				if (Array.isArray(e.changedTouches) && e.changedTouches.length > 0) {
					x = e.changedTouches[0].scrrenX
					y = e.changedTouches[0].scrrenY
				}
				// #endif
				// #ifdef H5
				if (Array.isArray(e.changedTouches) && e.changedTouches.length > 0) {
					x = e.changedTouches[0].clientX
					y = e.changedTouches[0].clientY
				}
				// #endif
				// #ifdef MP
				x = e.detail.x
				y = e.detail.y
				// #endif
				this.$emit('clickLong', {
					x,
					y,
					index: this.index
				})
			},
			// 图片预览
			preview(item) {
				if (item.type !== 'img') return;
				// 确认图片，可以预览
				this.$emit('preview', this.item.data) // 这里传过去的是路径
			},
			// 播放音频
			openAudio() {
				// 通知其他音频关闭
				this.audioEmit(this.index)
				if (this.audioContext) {
					this.audioContext.stop()
					this.audioContext.play()
				} else {
					this.audioContext = uni.createInnerAudioContext()
					this.audioContext.src = this.item.data
					this.audioContext.play()
					// 监听播放
					this.audioContext.onPlay(() => {
						this.audioPlaying = true
					})
					// 监听暂停
					this.audioContext.onPause(() => {
						this.audioPlaying = false
					})
					// 监听停止
					this.audioContext.onStop(() => {
						this.audioPlaying = false
					})
					// 监听错误
					this.audioContext.onError(() => {
						this.audioPlaying = false
					})
				}
			},
			// 封面加载完成
			loadPoster({
				width,
				height
			}) {
				this.poster.w = width
				this.poster.h = height
			},
			// 打开视频
			openVideo() {
				uni.navigateTo({
					url: "../../pages/chat/video/video?url=" + this.item.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chat-left-icon {
		left: 70rpx;
		top: 18rpx;
	}

	.chat-right-icon {
		right: 70rpx;
		top: 18rpx;
	}
</style>
