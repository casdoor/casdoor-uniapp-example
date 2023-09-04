<!--
 Copyright 2022 The Casdoor Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <view class="content">
	<image class="logo" src="/static/logo.png"></image>
	<view class="text-area">
		<text class="title">{{title}}</text>
	</view>
	<button @click="login">Click to login</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
	  title: 'Hello'
    }
  },
  methods: {
    login(){
	  uni.navigateTo({
	    url: `./webpage?path=${encodeURIComponent(this.getSigninUrl())}`
	  })
	}
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
