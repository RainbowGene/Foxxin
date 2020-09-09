<template>
	<view v-if="item" :class="item.istop?'bg-light':'bg-white'" hover-class="bg-light">
		<div class="list-item w-100" hover-class="bg-light" @click="onClick" @longpress="longClick">
			<view class="item-left position-relative">
				<free-avatar :src="item.avatar" :size="92"></free-avatar>
				<free-badge v-if="item.noreadnum" badgeStyle="top:15rpx;right:15rpx;" :value="item.noreadnum"></free-badge>
			</view>
			<view class="item-right flex-column pr-3 py-3">
				<view class="top flex-row mb-1">
					<text class="font-md">{{item.nickname}}</text>
					<text class="text-muted font-sm">{{item.update_time|formatTime}}</text>
				</view>
				<text class="text-muted font-sm">{{item.data}}</text>
			</view>
		</div>
	</view>
</template>

<script>
	import freeBase from "../../common/mixin/free-base.js"
	import freeAvatar from "./free-avatar.vue"
	import freeBadge from "./free-badge.vue"
	export default {
		mixins: [freeBase],
		props: {
			item: Object,
			index: Number
		},
		components: {
			freeAvatar,
			freeBadge
		},
		methods: {
			onClick() {
				uni.navigateTo({
					url:"/pages/chat/chat"
				})
			},
			longClick(e) {
				// console.log(e.changedTouches[0])
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
	.list-item {
		display: flex;
		flex-direction: row;

		.item-left {
			width: 145rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}

		.item-right {
			flex: 1;
			justify-content: center;
			border-bottom: 1px solid #E9E8E5;

			.top {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
		}
	}
</style>
