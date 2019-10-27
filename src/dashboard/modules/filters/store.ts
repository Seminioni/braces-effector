import { createStore } from "effector";
import { FilterGroup } from "@/services/products.service";

const $filterGroups = createStore<FilterGroup[]>([]);
const $selectedFilterGroup = createStore<FilterGroup | null>(null);

const $filterGroupModel = createStore<string>("");

export {
  $filterGroups,
  $selectedFilterGroup,
  $filterGroupModel,
};
