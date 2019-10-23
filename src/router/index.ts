import Vue from "vue";
import Router from "vue-router";

import routes from "./routes";
import beforeResolve from "./lib/before-resolve";

Vue.use(Router);

const router = new Router({
  routes,
  mode: "history",
  base: process.env.DEPLOY_ENV !== "GH_PAGES" ? process.env.BASE_URL : "/braces-effector/",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

beforeResolve(router);

export default router;
