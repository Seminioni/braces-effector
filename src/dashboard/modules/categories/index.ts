import {
  createEffect, restore, merge, createEvent, forward,
} from "effector";
import { categoriesService, Category, CategoryModel } from "@/dashboard/services/categories.service";
import createFormHandler from "@/core/create-form-handler";
import { $categoryModel, $selectedCategory } from "./store";
import { RemovePayload, EditPayload, EditResponse } from "@/dashboard/services/types";

const fxFetchCategories = createEffect<void, Category[]>("fetch categories", {
  handler: categoriesService.fetchCategories,
});
const fxCreateCategory = createEffect<CategoryModel, Category>("create category", {
  handler: categoriesService.createCategory,
});
const fxRemoveCategory = createEffect<RemovePayload, string>("remove category", {
  handler: categoriesService.removeCategory,
});
const fxEditCategory = createEffect<EditPayload<CategoryModel>, EditResponse>("edit category", {
  handler: categoriesService.editCategory,
});

const resetSelectedCategory = createEvent<string>();
const selectedCategory = createEvent<Category>("select category");
const changedCategoryModel = createFormHandler($categoryModel);

const $categories = restore(fxFetchCategories, []);

$categoryModel
  .on(selectedCategory.map(({
    title, description, path, smallIcon, largeIcon, name,
  }) => ({
    title,
    description,
    path,
    smallIcon,
    largeIcon,
    name,
  })), (_, c) => c)
  .reset(merge([fxCreateCategory.done, fxEditCategory.done]));

$selectedCategory.on(selectedCategory, (_, category) => category)
  .reset(merge([fxEditCategory.done, resetSelectedCategory]));

$categories
  .on(fxEditCategory.done, (categories, { result, params }) => [...categories]
    .map(f => (f.id !== params.id ? f : {
      ...f,
      ...params.model,
      etag: result.etag,
    })))
  .on(fxCreateCategory.done, (categories, { result: category }) => [category, ...categories])
  .on(fxRemoveCategory.done, (categories, { result: id }) => categories.filter(c => c.id !== id));

export {
  $categories,
  $categoryModel,
  $selectedCategory,

  fxFetchCategories,
  fxCreateCategory,
  fxEditCategory,
  selectedCategory,
  fxRemoveCategory,
  changedCategoryModel,
};
