import { createEffect, restore } from "effector";
import categoriesService, { Category } from "@/services/categories.service";

const fxFetchCategories = createEffect<void, Category[]>({
  handler: categoriesService.fetchCategories,
});

const $categories = restore(
  fxFetchCategories.done.map(({ result: categories }) => categories),
  [],
);

export {
  fxFetchCategories,
  $categories,
};
