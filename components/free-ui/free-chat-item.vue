<template>
	<view>
		<!-- 时间显示 -->
		<view v-if="showTime" class="flex align-center justify-center mt-1 py-2">
			<text class="font-sm text-light-muted">{{showTime}}</text>
		</view>
		<!-- 撤回消息 -->
		<view v-if="item.isremove" class="flex align-center justify-center py-2">
			<text class="font-sm text-light-muted">你撤回了一条消息</text>
		</view>
		<!-- 主体内容 -->
		<view v-if="!item.isremove" class="flex pt-3 position-relative" :class="isSelf?'flex-row-reverse':'flex-row'">
			<view>
				<free-avatar :src="item.avatar" :size="100"></free-avatar>
			</view>
			<text class="iconfont position-absolute font-lg" :class="isSelf?'text-chat-item chat-right-icon':'chat-left-icon text-white'">{{isSelf?'&#xe61c;':'&#xe6a7;'}}</text>
			<!-- 长按弹出操作菜单 -->
			<div @longpress="longClick" style="height: 100%;" class="rounded px-2 py-1" :class="isSelf?'mr-3 bg-chat-item':'ml-3 bg-white'">
				<text class="font-md">{{item.data}}</text>
			</div>
		</view>
	</view>
</template>

<script>
	import freeAvatar from "./free-avatar.vue"
	import $time from "../../common/js/time.js"
	export default {
		props: {
			item: Object,
			index: Number,
			// 上一条消息的时间戳
			pretime: [Number, String]
		},
		components: {
			freeAvatar
		},
		computed: {
			isSelf() {
				let id = 1 // 假设拿到了id
				return this.item.user_id === id
			},
			showTime() {
				// 间隔超过300秒不要显示了
				return $time.getChatTime(this.item.createtime, this.pretime)
			}
		},
		methods: {
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chat-left-icon {
		left: 105rpx;
		top: 40rpx;
	}

	.chat-right-icon {
		right: 105rpx;
		top: 40rpx;
	}
</style>
