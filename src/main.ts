import Vue from "vue";

import router from "./router";
import deviceCheck from "./lib/device-check";
import { deviceChecked } from "./core/session";

import App from "./App.vue";

import "./plugins";
import "./registerServiceWorker";

Vue.config.productionTip = false;

window.mobilecheck = deviceCheck;
deviceChecked(window.mobilecheck());

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
