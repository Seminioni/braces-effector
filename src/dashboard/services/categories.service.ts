import http from "../../services/http.service";
import { RemovePayload, EditPayload } from "./types";

type Category = {
  title: string;
  description: string;
  path: string;
  smallIcon: string;
  largeIcon: string;
  name: string;
  url: string;
  etag: string;
  created: number;
  updated: number;
  id: string;
  productUrl: string;
};

class CategoryModel {
  title = "";
  description = "";
  path = "";
  smallIcon = "";
  largeIcon = "";
  name = "";

  constructor(initialState?: Category) {
    if (initialState) {
      const {
        url,
        etag,
        created,
        updated,
        id,
        productUrl,
        ...rest
      } = initialState;

      Object.assign(this, rest);
    }
  }
}

async function fetchCategories() {
  const { data } = await http.get<Category[]>("/category");
  return data;
}

async function removeCategory({ id, etag }: RemovePayload) {
  const headers = {
    "If-Match": `"${etag}"`,
  };

  await http.delete(`/category/${id}`, { headers });
  return id;
}

async function editCategory({ etag, model, id }: EditPayload<CategoryModel>) {
  const headers = {
    "If-Match": `"${etag}"`,
  };

  const response = await http.post<Category>(`/category/${id}`, model, {
    headers,
  });
  return {
    id,
    etag: !response ? etag : response.headers.etag.slice(1, -1),
  };
}

async function createCategory(model: CategoryModel) {
  const { data } = await http.post<Category>("/category", model);
  return data;
}

const categoriesService = {
  createCategory,
  editCategory,
  removeCategory,
  fetchCategories,
};

export {
  categoriesService, Category, CategoryModel,
};
