import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import Sdk from 'casdoor-uniapp-sdk-test'
Vue.config.productionTip = false
Vue.use(Sdk, {
  serverUrl: "https://door.casbin.com", //casdoor server url
  clientId: "014ae4bd048734ca2dea",
  organizationName: "casbin",
  appName: "app-casnode",
  redirectPath: "/callback",
})
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif