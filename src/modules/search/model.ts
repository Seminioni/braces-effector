import { createStore, createEffect, createEvent } from "effector";
import debounce from "lodash.debounce";

import productsService, { Product } from "@/services/products.service";

const fxFetchProducts = createEffect<string, Product[]>("fxFetchProducts", {
  handler: async (query) => {
    const data = await productsService.fetchProducts(`like:"%${query}%"`);
    return data;
  },
});

const reset = createEvent("reset");
const handleChange = createEvent<string>("change query");

const $results = createStore<Product[]>([]);
const $isLoading = createStore(false)
  .on(fxFetchProducts.pending, (_, isLoading) => isLoading);

$results
  .on(fxFetchProducts.done, (_, { result: products }) => products.map(product => ({
    ...product,
    categoryProductUrl: `/products/${product.categoryProductUrl.slice(12)}`,
  })))
  .reset(reset);


handleChange.watch(debounce(async (query) => {
  if (query.length) {
    await fxFetchProducts(query);
  }
}, 500));


export {
  $results,
  $isLoading,
  reset,
  handleChange,
};
