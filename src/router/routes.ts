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
import { $cartContext, fxFetchCartContext } from "@/modules/cart";

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
  {
    path: "/redirect",
    name: "PaymentRedirectPage",
    component: lazy(import("@/views/PaymentRedirectPage.vue")),
    meta: {
      beforeResolve(to, from, next) {
        if (!(to.params.data && to.params.signature)) {
          return next({ name: "HomePage" });
        }
        return next();
      },
    },
  },
  {
    path: "/checkout/success",
    name: "CheckoutSuccessPage",
    component: lazy(import("@/views/CheckoutPage.vue")),
    meta: {
      beforeResolve(to, from, next) {
        if (from.name === "CheckoutPage" || to.query.redirectFrom) {
          return next();
        }

        return next({ name: "HomePage" });
      },
    },
  },
  {
    path: "/help",
    name: "HelpPage",
    component: lazy(import("@/views/HelpPage.vue")),
    children: [
      {
        path: "delivery",
        name: "DeliveryPage",
        component: lazy(import("@/views/DeliveryPage.vue")),
      },
      {
        path: "payment",
        name: "PaymentPage",
        component: lazy(import("@/views/PaymentPage.vue")),
      },
    ],
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
        if (to.name !== "CheckoutSuccessPage" && to.name) {
          if (!$cartContext.getState() || from.name === "CheckoutSuccessPage") {
            fxFetchCartContext();
          }
        }

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
  {
    path: "/login",
    name: "LoginPage",
    component: lazy(import("@/views/LoginPage.vue")),
  },
];

export default routes;
