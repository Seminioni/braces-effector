import { createStore } from "effector";
import { FilterGroup } from "@/services/products.service";

const $filterGroups = createStore<FilterGroup[]>([]);
const $selectedFilterGroup = createStore<FilterGroup | null>(null);

const $filterGroupModel = createStore<string>("");

const $filters = createStore<FilterGroup[]>([]);
const $selectedFilter = createStore<FilterGroup | null>(null);

const $filterModel = createStore<string>("");

export {
  $filterGroups,
  $selectedFilterGroup,
  $filterGroupModel,

  $filters,
  $selectedFilter,
  $filterModel,
};
