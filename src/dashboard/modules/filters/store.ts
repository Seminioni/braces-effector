import { createStore } from "effector";

import { FilterPayload, Filter } from "@/dashboard/services/filters.service";

const $filters = createStore<Filter[]>([]);
const $selectedFilter = createStore<Filter | null>(null);

const $filterModel = createStore<FilterPayload>(new FilterPayload());

export {
  $filters,
  $selectedFilter,
  $filterModel,
};
