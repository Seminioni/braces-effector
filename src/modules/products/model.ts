import { restore, createStore, forward } from "effector";

import {
  fxFetchFiltersByCategory,
  fxFetchProductById,
  fxFetchProductsByFilters,
  updatedQuery,
} from "./events";
import reduceToDict from "@/lib/reduce";
import { Dictionary } from "@/lib/types";
import { FilterGroup, Filter, Product } from "@/services/products.service";

type FilterView = {
  categoryId: string;
  filterDescription: { filterGroup: FilterGroup; filters: string[] }[]
};

export const LIMIT = 30;

const $filters = createStore<Dictionary<FilterView>>({})
  .on(fxFetchFiltersByCategory.done, (state, { result: filters }) => ({
    ...state,
    ...reduceToDict(
      filters,
      ({ categoryId }) => categoryId,
      ({ categoryId, filterDescription }) => ({
        categoryId,
        filterDescription: filterDescription.map(description => ({
          ...description,
          filters: description.filters.map(f => f.id),
        })),
      }),
    ),
  }));

const $filterItems = createStore<Dictionary<Filter>>({})
  .on(
    fxFetchFiltersByCategory.done,
    (state, { result }) => ({
      ...state,
      ...result
        .map(filter => filter.filterDescription)
        .flat()
        .map(description => description.filters)
        .flat()
        .reduce((acc, current) => ({
          ...acc,
          [current.id]: current,
        }), {} as Dictionary<Filter>),
    }),
  );

const $selectedFilters = restore(updatedQuery, {
  filters: [],
  metadata: {
    limit: LIMIT,
    offset: 0,
    sortBy: "asc",
  },
});

const $products = createStore<Product[]>([])
  .on(fxFetchProductsByFilters.done, (_, { result }) => result.products.map(product => ({
    ...product,
    categoryProductUrl: `/products/${product.categoryProductUrl.slice(12)}`,
  })))
  .on(fxFetchProductById.done, (state, { result: product }) => [
    ...state,
    product,
  ]);

const $productsAsDictionary = $products
  .map(products => reduceToDict(products, ({ id }) => id, p => p));

const $productsTotal = createStore(0)
  .on(fxFetchProductsByFilters.done, (_, { result }) => result.totalCount);

const $isFiltersPending = fxFetchFiltersByCategory.pending;
const $isProductsPending = fxFetchProductsByFilters.pending;

forward({
  from: updatedQuery,
  to: fxFetchProductsByFilters,
});

export {
  $selectedFilters,
  $filters,
  $filterItems,
  $products,
  $productsAsDictionary,
  $isProductsPending,
  $isFiltersPending,
  $productsTotal,
};
