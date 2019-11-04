import {
  restore, createEffect, merge, createEvent, sample, guard,
} from "effector";
import isEqual from "lodash.isequal";

import productsService, { Product, ProductModel } from "@/dashboard/services/products.service";
import createFormHandler from "@/core/create-form-handler";
import { $model, $selectedFilters } from "./store";
import { SelectedFilter, RemovePayload, EditPayload } from "@/dashboard/services/types";
import { Filter } from "@/services/products.service";
import diff from "@/lib/diff";

type F = {
  remove: RemovePayload[];
  add: string[];
};

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
const fxEditProduct = createEffect<
  EditPayload<ProductModel> & { filters: SelectedFilter[] },
  { id: string; filters: SelectedFilter[] }
>("edit product", {
  handler: async ({
    etag, filters, model, id,
  }) => {
    try {
      await productsService.editProduct({
        etag, model, id,
      });
    } catch (ex) {
      console.log("Продукт не був змінений");
    }

    const selectedFilters = $selectedFilters.getState();
    console.log(selectedFilters);

    if (selectedFilters && !isEqual(selectedFilters, filters)) {
      const d = diff(selectedFilters.map(i => i.id), filters.map(i => i.id));

      const { remove, add } = d.reduce((acc: F, current: string) => {
        const toRemove = selectedFilters!.find(f => f.id === current);
        return {
          remove: toRemove ? [...acc.remove, toRemove] : acc.remove,
          add: !toRemove ? [...acc.add, current] : acc.add,
        };
      }, { remove: [], add: [] } as F);

      if (remove.length) {
        for (const i of remove) { // eslint-disable-line
          await productsService.unbindFilter({ // eslint-disable-line
            productId: id,
            ...i,
          });
        }
      }

      if (add.length) {
        // eslint-disable-next-line
        for (let f of add) {
          // eslint-disable-next-line
          await productsService.bindFilter({
            productId: id,
            filterId: f,
          });
        }
      }
    }

    return {
      id,
      filters,
    };
  },
});
const fxFetchFiltersByProduct = createEffect<string, Filter[]>("fetch filters by product", {
  handler: productsService.fetchFiltersByProduct,
});

const $products = restore(fxFetchProducts, []);
const updatedModel = createFormHandler($model);
const updateFilter = createEvent<SelectedFilter[]>("update filter");
const reset = createEvent<void>();

$products
  .on(
    fxRemoveProduct.done,
    (state, { params }) => state.filter(product => product.id !== params.id),
  );

$model
  .reset(merge([reset, fxBindFiltersToProduct.done]));

$selectedFilters
  .on(updateFilter, (_, v) => v)
  .on(fxFetchFiltersByProduct.done, (_, { result }) => result.map(({ id, etag }) => ({
    etag,
    id,
  })))
  .reset(merge([reset, fxBindFiltersToProduct.done]));

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
  reset,
  $model,
  $products,
  $selectedFilters,

  fxFetchProducts,
  fxEditProduct,
  fxCreateProduct,
  fxFetchFiltersByProduct,
  fxRemoveProduct,
};
