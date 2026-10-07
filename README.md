# Casdoor uni-app Example

[![Build](https://github.com/casdoor/casdoor-uniapp-example/actions/workflows/build.yml/badge.svg)](https://github.com/casdoor/casdoor-uniapp-example/actions/workflows/build.yml)
[![License](https://img.shields.io/github/license/casdoor/casdoor-uniapp-example)](https://github.com/casdoor/casdoor-uniapp-example/blob/master/LICENSE)
[![Discord](https://img.shields.io/discord/1022748306096537660?logo=discord&label=discord&color=5865F2)](https://discord.gg/5rPsrAzK7S)

An example [uni-app](https://uniapp.dcloud.net.cn/) (Vue 3 + Vite) that signs in with [Casdoor](https://casdoor.ai/), shows the signed-in user, refreshes the token and signs out, using [casdoor-uniapp-sdk](https://github.com/casdoor/casdoor-uniapp-sdk). It needs no backend: the app exchanges the authorization code itself with PKCE.

## How it works

1. [src/casdoor.js](src/casdoor.js) creates the SDK with the settings of the Casdoor application, and [src/main.js](src/main.js) also installs it as `this.$casdoor`.
2. **Sign in with Casdoor** on [the home page](src/pages/index/index.vue) calls `casdoor.signin()`, which works per platform:
   - H5: the page goes to the Casdoor sign-in page with a random `state` and a PKCE code challenge. Casdoor redirects back to `/callback` with `code` and `state`, and the home page calls `casdoor.handleCallback()`, which checks the state and exchanges the code and the code verifier for a token (no client secret).
   - App: the sign-in page opens in a webview. When Casdoor redirects to `http://localhost/callback`, the SDK catches it, closes the webview and exchanges the code.
   - WeChat Mini Program: `uni.login()` gets a code, and Casdoor exchanges it with WeChat ([WeChat Mini Program login](https://casdoor.ai/docs/integration/javascript/wechat_miniprogram)).
3. With the token, the page shows the user from `casdoor.getUserInfo()`. **Refresh token** calls `casdoor.refreshToken()`, and **Sign out** calls `casdoor.logout()`, which removes the token and revokes it in Casdoor.

## Prerequisites

- Node.js 20+ and Yarn
- A Casdoor server. The example is preconfigured for the public demo server https://door.casdoor.com, so it runs as is. To use your own, see [Casdoor installation](https://casdoor.ai/docs/basic/server-installation).
- For App and WeChat Mini Programs: [HBuilderX](https://www.dcloud.io/hbuilderx.html) or [WeChat DevTools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## Configuration

Skip this section to try the example on H5 with the public demo server.

In your Casdoor, create (or reuse) an organization and an application, then in the application:

- add the redirect URLs to **Redirect URLs**: `http://localhost/callback` (H5 on any local port, and App) and your H5 site, for example `https://app.example.com/callback`
- keep the **Authorization Code** grant type, and add **Refresh Token**
- for WeChat Mini Programs, add a **WeChat Mini Program** provider with the AppID and AppSecret of your mini program, set the same AppID in `mp-weixin.appid` of [src/manifest.json](src/manifest.json), and add the Casdoor server to the request domains of the mini program

Then fill in [src/casdoor.js](src/casdoor.js):

```js
export const casdoorConfig = {
  serverUrl: "https://door.casdoor.com", // Casdoor server URL
  clientId: "014ae4bd048734ca2dea", // client ID of the application
  organizationName: "casbin", // organization of the application
  appName: "app-casnode", // name of the application
  redirectPath: "/callback", // H5: path of the redirect URL on this site
};
```

`serverUrl` and `clientId` can also be set with the `VITE_CASDOOR_SERVER_URL` and `VITE_CASDOOR_CLIENT_ID` environment variables.

## Run

```shell
git clone https://github.com/casdoor/casdoor-uniapp-example
cd casdoor-uniapp-example
yarn install
yarn dev:h5
```

Open the H5 app at the URL printed in the terminal (http://localhost:5173) and click **Sign in with Casdoor**. On the demo server, sign in with username `admin` and password `123`.

Other platforms:

- WeChat Mini Program: `yarn dev:mp-weixin`, then import `dist/dev/mp-weixin` in WeChat DevTools
- App: open the project in HBuilderX and run it on a phone or simulator, or `yarn build:app` and import `dist/build/app`

`yarn build:h5` builds the H5 app into `dist/build/h5`. The web server has to return `index.html` for `/callback`.

## Resources

- [Casdoor documentation](https://casdoor.ai/docs/overview)
- [casdoor-uniapp-sdk](https://github.com/casdoor/casdoor-uniapp-sdk)
- [uni-app documentation](https://uniapp.dcloud.net.cn/)

## License

[Apache-2.0](LICENSE)
