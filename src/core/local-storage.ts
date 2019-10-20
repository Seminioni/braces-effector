import * as effector from "effector";

const root = effector.createDomain("root");

root.onCreateStore((store) => {
  const snapshot = localStorage.getItem(store.shortName);
  if (snapshot !== null) store.setState(JSON.parse(snapshot));

  let isFirstSkiped = false;

  store.watch((newState) => {
    if (isFirstSkiped) {
      // @ts-ignore
      localStorage.setItem(store.domainName.shortName, JSON.stringify(newState));
    }

    isFirstSkiped = true;
  });

  return store;
});

export const createEvent = root.event;
export const createEffect = root.effect;
export const createStore = root.store;
export const createDomain = root.domain;
export const createStoreObject = (...a: any[]) => effector.createStoreObject(a);
