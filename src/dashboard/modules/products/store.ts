import { createStore } from "effector";
import { Product } from "@/services/products.service";
import { ProductModel } from "@/dashboard/services/products.service";
import { SelectedFilter } from "@/dashboard/services/types";

const $model = createStore(new ProductModel());
const $selectedFilters = createStore<SelectedFilter[]>([]);
const $selectedProduct = createStore<Product | null>(null);

export {
  $model,
  $selectedFilters,
  $selectedProduct,
};
