import http from "@/services/http.service";
import { RemovePayload, EditPayload } from "./types";
import { Filter } from "./filters.service";


type Product = {
  brand: string;
  bucketProductUrl: string;
  categoryId: string;
  categoryProductUrl: string;
  code: string;
  created: number;
  description: string;
  etag: string;
  filterUrl: string;
  id: string;
  imageResourceMembershipUrl: string;
  imageUrl: string;
  images: string[];
  isAvailable: true;
  price: number;
  rate: null;
  reviewsCount: null;
  thumbnail: string;
  title: string;
  total: number;
  updated: number;
  url: string;
};


class ProductModel {
  title = "";
  description = "";
  price = "";
  code = "";
  thumbnail = "";
  brand = "";
  categoryId = "";
  active = true;
  isAvailable = true;
  total = 1;
  images: { imageUrl: string; alt: string }[] = [];
}

type BindFilterToProduct = {
  productId: string;
  filterId: string;
}

async function fetchProducts() {
  const { data } = await http.get<Product[]>("/product");
  return data;
}

async function fetchFiltersByProduct(productId: string) {
  const { data } = await http.get<Filter[]>(`/product/${productId}/filter`);
  return data;
}

async function removeProduct(payload: RemovePayload) {
  const headers = {
    "If-Match": `"${payload.etag}"`,
  };

  await http.delete(`/product/${payload.id}`, { headers });
  return payload.id;
}

async function createProduct(model: ProductModel) {
  const { data } = await http.post<Product>("/product", model);
  return data;
}

async function editProduct({ etag, model, id }: EditPayload<ProductModel>) {
  const headers = {
    "If-Match": `"${etag}"`,
  };

  const response = await http.post<Product>(`/product/${id}`, model, {
    headers,
  });
  return {
    id,
    etag: !response ? etag : response.headers.etag.slice(1, -1),
  };
}

async function bindFilter(payload: BindFilterToProduct) {
  await http.post(`product/${payload.productId}/filter/${payload.filterId}`);
}

async function unbindFilter(payload: RemovePayload & { productId: string }) {
  await http.delete(`product/${payload.productId}/filter/${payload.id}`);
}

// async

const productsService = {
  fetchProducts,
  fetchFiltersByProduct,
  removeProduct,
  createProduct,
  bindFilter,
  unbindFilter,
  editProduct,
};

export default productsService;

export {
  Product, ProductModel, BindFilterToProduct,
};
