import { Store, createApi } from "effector";

function createFormHandler<T>(store: Store<T>) {
  const { update } = createApi(store, {
    update: (state, { key, value }: { key: keyof T; value: any }) => ({
      ...state,
      [key]: value,
    }),
  });
  return update;
}


export default createFormHandler;
