import Vue from "vue";
import VueMeta from "vue-meta";
import VueScrollTo from "vue-scrollto";
import { VueEffector } from "effector-vue";

import ProgressBar from "./ui/ProgressBar.vue";

export interface NProgress extends Vue {
  start: () => Vue;
  finish: () => Vue;
}

Vue.use(VueScrollTo);
Vue.use(VueEffector);
Vue.use(VueMeta);

const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount()) as NProgress;
document.body.appendChild(bar.$el);

export {
  bar,
};
