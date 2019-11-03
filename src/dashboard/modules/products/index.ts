import {
  restore, createEffect, merge, createEvent, sample, combine, createStoreObject,
} from "effector";

import productsService, { Product, ProductModel } from "@/dashboard/services/products.service";
import createFormHandler from "@/core/create-form-handler";
import { $model, $selectedFilters } from "./store";
import { SelectedFilter, RemovePayload } from "@/dashboard/services/types";

const fxFetchProducts = createEffect<void, Product[]>("fetch all products", {
  handler: productsService.fetchProducts,
});
const fxCreateProduct = createEffect<ProductModel, Product>("create product", {
  handler: productsService.createProduct,
});
const fxBindFiltersToProduct = createEffect<
  { filters: SelectedFilter[]; productId: string }, void
>("bind filter to product after create product", {
  handler: async ({ filters, productId }) => {
    const ids = filters.map(f => f.id);
    // eslint-disable-next-line
    for (let f of ids) {
      // eslint-disable-next-line
      await productsService.bindFilter({
        productId,
        filterId: f,
      });
    }
  },
});
const fxRemoveProduct = createEffect<RemovePayload, string>("remove product", {
  handler: productsService.removeProduct,
});

const $products = restore(fxFetchProducts, []);
const updatedModel = createFormHandler($model);
const updateFilter = createEvent<SelectedFilter[]>("update filter");

$products
  .on(
    fxRemoveProduct.done,
    (state, { params }) => state.filter(product => product.id !== params.id),
  );

$model
  .reset(fxBindFiltersToProduct.done);

$selectedFilters
  .on(updateFilter, (_, v) => v)
  .reset(fxBindFiltersToProduct.done);

sample({
  source: $selectedFilters,
  clock: fxCreateProduct.done,
  fn: (filters, { result }) => ({
    filters,
    productId: result.id,
  }),
  target: fxBindFiltersToProduct,
});

export {
  updatedModel,
  updateFilter,
  $model,
  $products,
  $selectedFilters,

  fxFetchProducts,
  fxCreateProduct,
  fxRemoveProduct,
};
