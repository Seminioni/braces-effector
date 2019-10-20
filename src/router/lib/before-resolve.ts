import VueRouter from "vue-router";
import { bar } from "@/plugins";

export default function beforeResolve(router: VueRouter) {
  router.beforeResolve(async (to, from, next) => {
    if (from.name !== null) {
      bar.start();
    }

    try {
      // eslint-disable-next-line
      for (const route of to.matched) {
        // eslint-disable-next-line
        await new Promise((resolve, reject) => {
          if (route.meta && route.meta.beforeResolve) {
            route.meta.beforeResolve(to, from, (...args: any[]) => {
              if (args.length) {
                if (from.name === args[0].name) {
                  bar.finish();
                }
                next(...args);
                reject(new Error("Redirected"));
              } else {
                resolve();
              }
            });
          } else {
            resolve();
          }
        });
      }
    } catch (ex) {
      return;
    }
    next();
  });

  router.afterEach(() => {
    bar.finish();
  });
}
