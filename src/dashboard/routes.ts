import { R } from "vue-router";

import lazy from "@/router/lib/lazy";
import fetchCategories from "@/router/lib/fetch-categories";
import { fxFetchOrders } from "./modules/orders";
import { fxFetchFilterGroups } from "./modules/filters/filter-group";
import { fxFetchFilters } from "./modules/filters";
import { fxFetchImages } from "./modules/images";
import { fxValidate, resetRoles } from "@/modules/auth";
import { $roles } from "@/modules/auth/store";
import { fxFetchCategories } from "./modules/categories";

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
    path: "images",
    name: "DashboardImages",
    component: lazy(import("./views/DashboardImages.vue")),
    meta: {
      async beforeResolve(to, from, next) {
        fxFetchImages();
        next();
      },
    },
  },
  {
    path: "products",
    name: "DashboardProductsPage",
    component: lazy(import("./views/DashboardProductsPage.vue")),
  },
  {
    path: "categories",
    name: "DashboardCategoriesPage",
    component: lazy(import("./views/DashboardCategoriesPage.vue")),
    meta: {
      async beforeResolve(to, from, next) {
        fxFetchCategories();
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
        const roles = $roles.getState();

        try {
          await fxValidate();

          if (roles.includes("ADMIN")) {
            await fetchCategories(to);
            return next();
          }

          return next({
            name: "HomePage",
          });
        } catch (ex) {
          resetRoles();
          return next({
            name: "HomePage",
          });
        }
      },
    },
  },
];

export default routes;
