import { createStore } from "effector";
import { Product } from "@/services/products.service";
import { ProductModel } from "@/dashboard/services/products.service";

const $model = createStore(new ProductModel());
const $selectedProduct = createStore<Product | null>(null);

export {
  $model,
  $selectedProduct,
};
