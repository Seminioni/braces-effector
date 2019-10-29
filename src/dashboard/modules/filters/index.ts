import {
  createEffect, createEvent, merge, forward, guard,
} from "effector";

import {
  $filterModel, $filters, $selectedFilter,
} from "./store";
import { Filter } from "@/services/products.service";
import { filterService, FilterPayload } from "@/dashboard/services/filters.service";
import { RemovePayload, EditPayload, EditResponse } from "@/dashboard/services/types";
import createFormHandler from "@/core/create-form-handler";

const fxFetchFilters = createEffect<void, Filter[]>("fetch filter groups", {
  handler: filterService.fetchFilters,
});
const fxCreateFilter = createEffect<FilterPayload, Filter>("create filter", {
  handler: filterService.createFilter,
});
const fxEditFilter = createEffect<EditPayload<FilterPayload>, EditResponse>("edit filter", {
  handler: filterService.editFilter,
});
const fxRemoveFilter = createEffect<RemovePayload, string>("remove filter", {
  handler: filterService.removeFilter,
});

const resetFilter = createEvent<FilterPayload>("reset filter");
const selectedFilter = createEvent<Filter>("select filter");
const changedFilter = createFormHandler($filterModel);

$filterModel
  .on(selectedFilter.map(filter => ({
    title: filter.title,
    filterGroupId: filter.filterGroupId,
  })), (_, filter) => filter)
  .reset(merge([fxCreateFilter.done, fxEditFilter.done]));

$selectedFilter
  .on(selectedFilter, (_, filter) => filter)
  .reset(merge([fxEditFilter.done, resetFilter]));


$filters
  .on(fxFetchFilters.done, (_, { result: filters }) => filters)
  .on(fxEditFilter.done, (filters, { result, params }) => [...filters]
    .map(f => (f.id !== params.id ? f : {
      ...f,
      title: params.model.title,
      filterGroupId: params.model.filterGroupId,
      etag: result.etag,
    })))
  .on(fxCreateFilter.done, (filters, { result: filter }) => [filter, ...filters])
  .on(fxRemoveFilter.done, (filters, { result: id }) => filters.filter(f => f.id !== id));

guard({
  source: $filterModel,
  filter: filter => !filter.title.length,
  target: resetFilter,
});


const $isFiltersLoading = fxFetchFilters.pending;


export {
  fxFetchFilters,
  fxRemoveFilter,
  fxCreateFilter,
  fxEditFilter,
  selectedFilter,
  changedFilter,

  $isFiltersLoading,
  $selectedFilter,
  $filterModel,
  $filters,
};
