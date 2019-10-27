import Vue from "vue";
import Router from "vue-router";

import beforeResolve from "./lib/before-resolve";
import clientRoutes from "./routes";
import dashboardRoutes from "@/dashboard/routes";
import { fxLogin } from "@/modules/auth";


Vue.use(Router);

const router = new Router({
  routes: [
    ...clientRoutes,
    ...dashboardRoutes,
  ],
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
