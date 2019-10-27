import Vue from "vue";
import Router from "vue-router";

import routes from "./routes";
import beforeResolve from "./lib/before-resolve";
import { fxLogin } from "@/modules/auth";

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

fxLogin.done.watch(() => {
  router.push({
    name: "HomePage",
  });
});

beforeResolve(router);

export default router;
