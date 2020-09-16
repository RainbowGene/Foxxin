<template>
	<view @click="clickEvent" hover-class="bg-chat-item" class="rounded mr-2"
	:class="disabled?'user-border bg-light':'main-bg-color'">
		<text class="font-md px-2 py-1" :class="disabled?'text-light-muted':'text-white'">{{name}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		methods:{
			clickEvent(){
				if(!this.disabled) return this.$emit("click")
			}
		}
	}
</script>

<style>
</style>
