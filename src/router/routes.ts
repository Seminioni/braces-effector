import { R } from "vue-router";

import lazy from "./lib/lazy";
import { fxFetchCategories, $categories } from "@/modules/categories";
import {
  fxFetchFiltersByCategory,
  updatedQuery,
  $filters,
  LIMIT,
  $productsAsDictionary,
  fxFetchProductById,
} from "@/modules/products";

const children: R[] = [
  {
    path: "/",
    name: "HomePage",
    component: lazy(import("@/views/HomePage.vue")),
  },
  {
    path: "/products/:category/:id",
    name: "ProductPage",
    component: lazy(import("@/views/ProductPage.vue")),
    props: ({ params }) => ({
      id: params.id,
      currentCategory: $categories.getState().find(c => c.path === params.category),
    }),
    meta: {
      async beforeResolve(to, from, next) {
        const { id } = to.params;

        console.log($productsAsDictionary.getState());

        if (!$productsAsDictionary.getState()[id]) {
          await fxFetchProductById(id);
          return next();
        }
        return next();
      },
    },
  },
  {
    path: "/products/:category",
    name: "ProductsPage",
    component: lazy(import("@/views/ProductsPage.vue")),
    props: ({ params }) => ({
      currentCategory: $categories.getState().find(c => c.path === params.category),
    }),
    meta: {
      async beforeResolve(to, from, next) {
        const { query } = to;
        const { id } = $categories.getState().find(c => c.path === to.params.category)!;
        const filters = query.filters as string[] || [];

        if (!$filters.getState()[id]) {
          fxFetchFiltersByCategory(id);
        }

        updatedQuery({
          categoryId: id,
          filters: Array.isArray(filters) ? filters : [filters],
          metadata: {
            limit: LIMIT,
            offset: +query.offset || 0,
            sortBy: query.sortBy as "asc"|"desc" || "asc",
          },
        });

        next();
      },
    },
  },
  {
    path: "/cart",
    name: "CartPage",
    component: lazy(import("@/views/CartPage.vue")),
  },
  {
    path: "/checkout",
    name: "CheckoutPage",
    component: lazy(import("@/views/CheckoutPage.vue")),
    meta: {
      beforeResolve(to, from, next) {
        if (from.name !== "CartPage") {
          return next({ name: "CartPage" });
        }

        return next();
      },
    },
  },
];

const routes: R[] = [
  {
    path: "/",
    name: "Root",
    component: { render: h => h("router-view") },
    redirect: { name: "HomePage" },
    children,
    meta: {
      async beforeResolve(to, from, next) {
        if (to.name !== "ProductsPage" && to.name !== "ProductPage") {
          if (!$categories.getState().length) {
            fxFetchCategories();
          }
          return next();
        }

        if (!$categories.getState().length) {
          await fxFetchCategories();
        }
        return next();
      },
    },
  },
];

export default routes;
