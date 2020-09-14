<template>
	<view @click="$emit('click')" hover-class="bg-chat-item" class="main-bg-color rounded mr-2">
		<text class="font-md text-white px-2 py-1">{{name}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style>
</style>
