import {
  createStore, createEffect, createEvent, merge, forward, guard,
} from "effector";
import { FilterGroup } from "@/services/products.service";
import { filterService } from "@/dashboard/services/filters.service";
import { EditPayload, EditResponse, RemovePayload } from "@/dashboard/services/types";

const $filterGroups = createStore<FilterGroup[]>([]);
const $selectedFilterGroup = createStore<FilterGroup | null>(null);

const $filterGroupModel = createStore<string>("");

const fxFetchFilterGroups = createEffect<void, FilterGroup[]>("fetch filter groups", {
  handler: filterService.fetchFilterGroups,
});
const fxCreateFilterGroup = createEffect<string, FilterGroup>("create filter group", {
  handler: filterService.createFilterGroup,
});
const fxEditFilterGroup = createEffect<EditPayload<string>, EditResponse>("edit filter group", {
  handler: filterService.editFilterGroup,
});
const fxRemoveFilterGroup = createEffect<RemovePayload, string>("remove filter group", {
  handler: filterService.removeFilterGroup,
});

const resetSelectedFilterGroup = createEvent<string>();
const selectedFilterGroup = createEvent<FilterGroup>("select filter group for change data");
const changedFilterGroup = createEvent<string>("change filter group input");

$selectedFilterGroup
  .on(selectedFilterGroup, (_, group) => group)
  .reset(merge([fxEditFilterGroup.done, resetSelectedFilterGroup]));

$filterGroupModel
  .on(changedFilterGroup, (_, str) => str)
  .reset(merge([fxEditFilterGroup.done, fxCreateFilterGroup.done]));

$filterGroups
  .on(fxFetchFilterGroups.done, (_, { result: filterGroups }) => filterGroups)
  .on(fxCreateFilterGroup.done, (filterGroups, { result: group }) => [group, ...filterGroups])
  .on(fxRemoveFilterGroup.done, (filterGroups, { result: id }) => filterGroups.filter(f => f.id !== id))
  .on(fxEditFilterGroup.done, (filterGroups, { result, params }) => filterGroups = [...filterGroups]
    .map(f => (f.id !== params.id ? f : {
      ...f,
      title: params.model,
      etag: result.etag,
    })));

forward({
  from: selectedFilterGroup.map(group => group.title),
  to: changedFilterGroup,
});

guard({
  source: $filterGroupModel,
  filter: title => !title.length,
  target: resetSelectedFilterGroup,
});

const $isFIlterGroupsLoading = fxFetchFilterGroups.pending;

export {
  $filterGroups,
  $selectedFilterGroup,
  $filterGroupModel,
  $isFIlterGroupsLoading,

  fxFetchFilterGroups,
  fxCreateFilterGroup,
  fxEditFilterGroup,
  fxRemoveFilterGroup,

  changedFilterGroup,
  selectedFilterGroup,
};
