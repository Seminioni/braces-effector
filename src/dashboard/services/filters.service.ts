import http from "@/services/http.service";
import { EditPayload, RemovePayload } from "./types";
import { FilterGroup, Filter } from "@/services/products.service";

class FilterPayload {
  title = "";
  filterGroupId = "";

  constructor(initialState?: Filter) {
    if (initialState) {
      const { title, filterGroupId } = initialState;
      Object.assign(this, { title, filterGroupId });
    }
  }
}

/**
 *
 * Groups
 *
 */

async function fetchFilterGroups() {
  const { data } = await http.get<FilterGroup[]>("/filter_group");
  return data;
}

async function createFilterGroup(title: string) {
  const { data } = await http.post<FilterGroup>("/filter_group", { title });
  return data;
}

async function editFilterGroup({ etag, model, id }: EditPayload<string>) {
  const headers = {
    "If-Match": `"${etag}"`,
  };

  const response = await http.post<FilterGroup>(`/filter_group/${id}`, { title: model }, { headers });
  return {
    id,
    etag: !response ? etag : response.headers.etag.slice(1, -1),
  };
}

async function removeFilterGroup({ id, etag }: RemovePayload) {
  const headers = {
    "If-Match": `"${etag}"`,
  };

  await http.delete(`/filter_group/${id}`, { headers });
  return id;
}

/**
 *
 * Filters
 *
 */


async function fetchFilters() {
  const { data } = await http.get<Filter[]>("/filter");
  return data;
}

async function createFilter(model: FilterPayload) {
  const { data } = await http.post<Filter>("/filter", { ...model, path: "" });
  return data;
}

async function editFilter({ etag, model, id }: EditPayload<FilterPayload>) {
  const headers = {
    "If-Match": `"${etag}"`,
  };

  const response = await http.post<FilterGroup>(`/filter/${id}`, model, { headers });
  return {
    id,
    etag: !response ? etag : response.headers.etag.slice(1, -1),
  };
}

async function removeFilter({ id, etag }: RemovePayload) {
  const headers = {
    "If-Match": `"${etag}"`,
  };

  await http.delete(`/filter/${id}`, { headers });
  return id;
}

const filterService = {
  createFilterGroup,
  editFilterGroup,
  fetchFilterGroups,
  removeFilterGroup,

  fetchFilters,
  createFilter,
  editFilter,
  removeFilter,
};

export {
  filterService,
  FilterGroup,
  Filter,
  FilterPayload,
};
