import { restore, createEffect, merge } from "effector";

import productsService, { Product, ProductModel } from "@/dashboard/services/products.service";
import createFormHandler from "@/core/create-form-handler";
import { $model } from "./store";

const fxFetchProducts = createEffect<void, Product[]>("fetch all products", {
  handler: productsService.fetchProducts,
});
const fxCreateProduct = createEffect<ProductModel, Product>("create product", {
  handler: productsService.createProduct,
});

const $products = restore(fxFetchProducts, []);
const updatedModel = createFormHandler($model);

$model
  .reset(merge([fxCreateProduct.done]));

export {
  updatedModel,
  $model,
  $products,

  fxFetchProducts,
  fxCreateProduct,
};
