import { R } from "vue-router";

import lazy from "@/router/lib/lazy";
import fetchCategories from "@/router/lib/fetch-categories";
import { fxFetchOrders } from "./modules/orders";
import { fxFetchFilterGroups } from "./modules/filters/filter-group";
import { fxFetchFilters } from "./modules/filters";

const children: R[] = [
  {
    path: "orders",
    name: "DashboardOrdersPage",
    component: lazy(import("./views/DashboardOrdersPage.vue")),
    meta: {
      async beforeResolve(to, from, next) {
        await fxFetchOrders({
          limit: 10,
          offset: 0,
        });
        next();
      },
    },
  },
  {
    path: "filters",
    name: "DashboardFiltersPage",
    component: lazy(import("./views/DashboardFiltersPage.vue")),
    meta: {
      beforeResolve(to, from, next) {
        fxFetchFilterGroups();
        fxFetchFilters();
        next();
      },
    },
  },
];

const routes: R[] = [
  {
    children,
    path: "/dashboard",
    name: "DashboardRoot",
    redirect: { name: "DashboardOrdersPage" },
    component: lazy(import("./views/DashboardPage.vue")),
    meta: {
      async beforeResolve(to, from, next) {
        await fetchCategories(to);
        next();
      },
    },
  },
];

export default routes;
