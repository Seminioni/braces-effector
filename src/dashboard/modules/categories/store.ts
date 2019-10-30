import { createStore } from "effector";
import { CategoryModel, Category } from "@/dashboard/services/categories.service";

const $categoryModel = createStore(new CategoryModel());
const $selectedCategory = createStore<Category | null>(null);


export {
  $categoryModel,
  $selectedCategory,
};
