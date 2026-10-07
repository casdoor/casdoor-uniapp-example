// Copyright 2026 The Casdoor Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {CasdoorSdk} from "casdoor-uniapp-sdk";

export const casdoorConfig = {
  serverUrl: import.meta.env.VITE_CASDOOR_SERVER_URL || "https://door.casdoor.com", // Casdoor server URL
  clientId: import.meta.env.VITE_CASDOOR_CLIENT_ID || "014ae4bd048734ca2dea", // client ID of the application
  organizationName: "casbin", // organization of the application
  appName: "app-casnode", // name of the application
  redirectPath: "/callback", // H5: path of the redirect URL on this site
  // redirectUri: "http://localhost/callback", // App: the redirect URL caught in the sign-in webview, this is the default
};

export const casdoor = new CasdoorSdk(casdoorConfig);
