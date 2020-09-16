<template>
	<!-- 朋友圈列表样式 -->
	<view class="p-3 flex-row align-start border-bottom border-light-secondary">
		<free-avatar :src="item.avatar" :size="80"></free-avatar>
		<view class="pl-2 flex-1 flex-column">
			<text class="font-md text-hover-primary mb-1">{{item.username}}</text>
			<text class="font-md text-dark mb-1">{{item.context}}</text>
			<!-- 图片 -->
			<view v-if="item.image.length" class="py-2 flex-row flex-wrap">
				<block v-for="(image,i) in item.image" :key="i">
					<!-- 单图 -->
					<free-image v-if="item.image.length===1" :src="image.src" imageClass="rounded" @click="preview(image.src)"></free-image>
					<!-- 多图 -->
					<image v-if="item.image.length>1" :src="image.src" class="mr-1 mb-1 rounded" mode="aspectFill" style="width: 180rpx;height: 180rpx;"
					 @click="preview(image.src)"></image>
				</block>
			</view>
			<!-- 视频 -->
			<view v-if="item.video" class="py-2">
				<video :src="item.video.src" :poster="item.video.poster" controls style="width: 500rpx;height: 300rpx;"></video>
			</view>
			<!-- 时间 & 操作 -->
			<view class="flex-row align-center justify-between">
				<text class="font-sm text-light-muted">{{item.create_time|formatTime}}</text>
				<view class="rounded p-1 bg-light" @click="$emit('action',{item,index})">
					<text class="text-hover-primary iconfont font">&#xe615;</text>
				</view>
			</view>
			<!-- 点赞 & 评论 -->
			<view class="bg-light mt-2" v-if="item.supports.length || item.comments.length">
				<!-- 点赞 -->
				<view v-if="item.supports.length" class="border-bottom flex-row align-start p-2">
					<text class="iconfont font-sm text-hover-primary pt-1">&#xe61b;</text>
					<view class="flex-1 flex-row flex-wrap">
						<text v-for="(s,i) in item.supports" :key="i" class="font-md text-hover-primary ml-1">{{s.username}}</text>
					</view>
				</view>
				<!-- 评论 -->
				<view v-if="item.comments.length" class="flex-row align-start p-2">
					<text class="iconfont font-sm text-hover-primary pt-1">&#xe607;</text>
					<view class="flex-1 flex-column ml-1">
						<view v-for="(c,ci) in item.comments" :key="ci" class="flex-row">
							<text class="text-hover-primary font-md">{{c.username}}</text>
							<text class="text-dark font-md flex-1">:{{c.content}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import freeAvatar from "@/components/free-ui/free-avatar.vue"
	import freeImage from "@/components/free-ui/free-image.vue"
	import $Time from "@/common/js/time.js"
	export default {
		props: {
			item: Object,
			index: Number
		},
		components: {
			freeAvatar,
			freeImage
		},
		filters: {
			formatTime(time) {
				return $Time.gettime(time)
			}
		},
		computed: {
			urls() { // 整理数组中的对象
				return this.item.image.map(item => item.src)
			}
		},
		methods: {
			// 点击图片查看多图
			preview(src) {
				uni.previewImage({
					current: src,
					urls: this.urls
				})
			}
		}
	}
</script>

<style>
</style>
