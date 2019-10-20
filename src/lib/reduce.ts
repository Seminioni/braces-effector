import { Dictionary } from "./types";

export default function reduceToDict<T, Result>(
  items: T[],
  id: (item: T) => string,
  val: (item: T) => Result,
): Dictionary<Result> {
  return items.reduce(
    (acc, current) => {
      const key = id(current);
      return {
        ...acc,
        [key]: val(current),
      };
    },
    {} as Dictionary<Result>,
  );
}
