import { Route } from "vue-router";

import { $categories, fxFetchCategories } from "@/modules/categories";

async function fetchCategories(to: Route) {
  if (to.name !== "ProductsPage" && to.name !== "ProductPage") {
    if (!$categories.getState().length) {
      fxFetchCategories();
    }
    return;
  }

  if (!$categories.getState().length) {
    await fxFetchCategories();
  }
}

export default fetchCategories;
