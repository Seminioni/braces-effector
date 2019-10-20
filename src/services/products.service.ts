import http from "./http.service";

async function fetchProductsByFilters({ categoryId, filters, metadata }: Options) {
  const { limit, offset } = metadata;
  const response = await http.post<Product[]>(`/category/${categoryId}/filter?limit=${limit}&offset=${offset}`, filters || []);
  return response;
}

async function fetchFiltersByCategory(categoryId = "") {
  const { data } = await http.get<FilterView[]>(`category/${categoryId}/filter`);
  return data;
}

async function fetchProducts(query?: string) {
  const { data } = await http.get<Product[]>("/product", {
    params: {
      title: query,
    },
  });
  return data;
}

async function fetchProduct(id: string) {
  const { data } = await http.get<Product>(`/product/${id}`);
  return data;
}

type Filter = {
  created: number;
  etag: string;
  filterGroupId: string;
  id: string;
  title: string;
  updated: number;
  url: string;
};

type FilterGroup = {
  created: number;
  etag: string;
  id: string;
  title: string;
  updated: number
  url: string;
};

type FilterDescription = {
  filterGroup: FilterGroup;
  filters: Filter[];
};

type FilterView = {
  categoryId: string;
  filterDescription: FilterDescription[];
};

type Metadata = {
  limit?: number;
  offset: number;
  sortBy: "desc" | "asc";
}

type Options = {
  categoryId?: string;
  filters?: string[];
  metadata: Metadata;
};

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

const productsService = {
  fetchProducts,
  fetchProduct,
  fetchProductsByFilters,
  fetchFiltersByCategory,
};

export {
  Product,
  FilterView,
  FilterGroup,
  Filter,
  Options,
};

export default productsService;
