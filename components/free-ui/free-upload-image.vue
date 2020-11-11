<template>
	<!-- 图片上传 -->
	<view class="flex-row flex-wrap py-2">
		<view v-for="(img,i) in imageList" :key="i" class="rounded flex-row align-center justify-center position-relative"
		 style="width: 230rpx;height: 230rpx;">
			<image class="bg-light rounded" :src="img" style="width: 220rpx;height: 220rpx;" @click="preview(img)"></image>
			<!-- 删除图标 -->
			<view class="flex-row align-center justify-center position-absolute rounded-circle" style="width: 40rpx;height: 40rpx;top: -10rpx;right: 0;background-color: rgba(0,0,0,0.5);"
			 @click="delImg(i)">
				<text class="iconfont text-white font-md">&#xe620;</text>
			</view>
		</view>
		<view class="rounded flex-row align-center justify-center" style="width: 230rpx;">
			<!-- 添加图标 -->
			<view class="flex-row align-center justify-center bg-light rounded user-border" style="width: 220rpx;height: 220rpx;"
			 @click="chooseImage">
				<text class="text-light-muted" style="font-size: 100rpx;">+</text>
			</view>
		</view>
	</view>
</template>

<script>
	import $H from "@/common/free-lib/request.js"
	export default {
		props: {
			data: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				imageList: []
			}
		},
		mounted() {
			this.imageList = this.data
		},
		methods: {
			// 添加图片
			chooseImage() {
				uni.chooseImage({
					count: 9 - this.imageList.length,
					sizeType: ['compressed'],
					success: res => {
						// 上传服务器
						res.tempFilePaths.forEach(path => {
							$H.upload('/upload', {
								filePath: path
							}, (process) => {
								console.log('上传进度', process)
							}).then(url => {
								this.imageList.push(url)
								this.$emit('update', this.imageList)
							})
						})
					}
				})
			},
			// 图片预览
			preview(path) {
				uni.previewImage({
					current: path,
					urls: this.imageList
				})
			},
			// 移除图片
			delImg(i) {
				uni.showModal({
					content: '是否移除？',
					success: res => {
						if (res.confirm) {
							this.imageList.splice(i, 1)
							this.$emit('update', this.imageList)
						}
					}
				})
			}
		}
	}
</script>

<style>
</style>
