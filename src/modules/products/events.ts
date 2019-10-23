import { createEffect, createEvent } from "effector";

import productsService, { FilterView, Options, Product } from "@/services/products.service";

const fxFetchFiltersByCategory = createEffect<string, FilterView[]>("fxFetchFiltersByCategory", {
  handler: productsService.fetchFiltersByCategory,
});

const fxFetchProductById = createEffect<string, Product>("fxFetchProductById", {
  handler: productsService.fetchProduct,
});

const fxFetchProductsByFilters = createEffect<Options, { totalCount: number; products: Product[] }>(
  "fxFetchProductsByFilters",
  {
    handler: async (params) => {
      const response = await productsService.fetchProductsByFilters(params);
      return {
        products: response.data,
        totalCount: +response.headers["total-count"],
      };
    },
  },
);

const fxFetchRecommendedProducts = createEffect<string | void, Product[]>("fxFetchRecommendedProducts", {
  handler: productsService.fetchRecommendedProducts,
});

const updatedQuery = createEvent<Options>("updatedFilter");

export {
  updatedQuery,
  fxFetchFiltersByCategory,
  fxFetchProductsByFilters,
  fxFetchProductById,
  fxFetchRecommendedProducts,
};
