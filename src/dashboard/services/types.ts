type RemovePayload = {
  etag: string;
  id: string;
};

type EditPayload<T> = {
  etag: string;
  model: T;
  id: string;
};

type Filter = {
  created: number;
  etag: string;
  filterGroupId: string;
  id: string;
  title: string;
  updated: number;
  url: string;
};

type FilterGroup = {
  created: number;
  etag: string;
  id: string;
  title: string;
  updated: number
  url: string;
};

type EditResponse = RemovePayload;

export {
  RemovePayload, EditResponse, EditPayload, Filter, FilterGroup,
};
