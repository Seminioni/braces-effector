import Vue from "vue";
import VueMeta from "vue-meta";
import VueScrollTo from "vue-scrollto";
import { VueEffector } from "effector-vue";

import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import { email, numeric, required } from "vee-validate/dist/rules";

import ProgressBar from "./ui/ProgressBar.vue";

export interface NProgress extends Vue {
  start: () => Vue;
  finish: () => Vue;
}

Vue.use(VueScrollTo);
Vue.use(VueEffector);
Vue.use(VueMeta);

Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);

extend("required", required);
extend("email", email);
extend("numeric", numeric);


const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount()) as NProgress;
document.body.appendChild(bar.$el);

export {
  bar,
};
