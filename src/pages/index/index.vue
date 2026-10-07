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
    <text class="title">Casdoor uni-app Example</text>

    <view v-if="loading" class="hint">Signing in...</view>

    <view v-else-if="user" class="card">
      <image v-if="user.picture" class="avatar" :src="user.picture"></image>
      <text class="name">{{ user.name || user.preferred_username }}</text>
      <view class="row"><text class="label">Username</text><text class="value">{{ user.preferred_username }}</text></view>
      <view class="row"><text class="label">Email</text><text class="value">{{ user.email || "-" }}</text></view>
      <view class="row"><text class="label">User ID</text><text class="value">{{ user.sub }}</text></view>
      <view class="row"><text class="label">Token expires</text><text class="value">{{ expiresAt }}</text></view>
      <button class="button" @click="refresh">Refresh token</button>
      <button class="button" type="warn" @click="logout">Sign out</button>
    </view>

    <view v-else class="card">
      <text class="hint">Sign in with your Casdoor account. On the demo server, use admin / 123.</text>
      <button class="button" type="primary" @click="signin">Sign in with Casdoor</button>
    </view>

    <text v-if="error" class="error">{{ error }}</text>
  </view>
</template>

<script>
import {casdoor} from "../../casdoor.js";

export default {
  data() {
    return {
      loading: false,
      user: null,
      expiresAt: "",
      error: "",
    };
  },
  onLoad() {
    // H5: Casdoor redirects back to this page with ?code=...&state=...
    // #ifdef H5
    if (casdoor.isCallback()) {
      this.loading = true;
      casdoor.handleCallback()
        .then(() => this.loadUser())
        .catch((err) => this.showError(err))
        .finally(() => {
          this.loading = false;
        });
      return;
    }
    // #endif
    this.loadUser();
  },
  methods: {
    loadUser() {
      if (!casdoor.isSignedIn()) {
        this.user = null;
        return Promise.resolve();
      }
      const token = casdoor.isTokenExpired() ? casdoor.refreshToken() : Promise.resolve(casdoor.getToken());
      return token
        .then(() => casdoor.getUserInfo())
        .then((user) => {
          this.user = user;
          const expiresAt = casdoor.getToken().expires_at;
          this.expiresAt = expiresAt ? new Date(expiresAt).toLocaleString() : "-";
          this.error = "";
        })
        .catch((err) => {
          this.user = null;
          this.showError(err);
        });
    },
    signin() {
      this.error = "";
      // H5 leaves the page here; App opens a sign-in webview; WeChat mini programs use wx.login
      casdoor.signin({title: "Sign in with Casdoor"})
        .then(() => this.loadUser())
        .catch((err) => this.showError(err));
    },
    refresh() {
      casdoor.refreshToken()
        .then(() => this.loadUser())
        .then(() => uni.showToast({title: "Token refreshed", icon: "none"}))
        .catch((err) => this.showError(err));
    },
    logout() {
      casdoor.logout().then(() => {
        this.user = null;
        this.error = "";
      });
    },
    showError(err) {
      if (err && err.code === "cancelled") {
        return;
      }
      this.error = (err && err.message) || String(err);
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32rpx 48rpx;
}

.logo {
  height: 160rpx;
  width: 160rpx;
  margin-top: 120rpx;
  margin-bottom: 32rpx;
}

.title {
  font-size: 40rpx;
  color: #333;
  margin-bottom: 48rpx;
}

.card {
  width: 100%;
  max-width: 640px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  border-radius: 16rpx;
  background-color: #fff;
}

.avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 64rpx;
  margin-bottom: 16rpx;
}

.name {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 24rpx;
}

.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12rpx 0;
  border-bottom: 1px solid #f0f0f0;
}

.label {
  color: #8f8f94;
  font-size: 28rpx;
  margin-right: 24rpx;
}

.value {
  font-size: 28rpx;
  word-break: break-all;
  text-align: right;
}

.button {
  width: 100%;
  margin-top: 32rpx;
}

.hint {
  color: #8f8f94;
  font-size: 28rpx;
  text-align: center;
}

.error {
  margin-top: 32rpx;
  color: #e64340;
  font-size: 28rpx;
  word-break: break-all;
}
</style>
