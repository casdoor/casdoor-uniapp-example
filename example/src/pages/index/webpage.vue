<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default{
		onLoad(option){
			this.url = option.path
		},
		data(){
			return {
				url: ''
			}
		}
	}
</script>

<style>
</style>