type RemovePayload = {
  etag: string;
  id: string;
};

type EditPayload<T> = {
  etag: string;
  model: T;
  id: string;
};

type EditResponse = RemovePayload;

export { RemovePayload, EditResponse, EditPayload };
