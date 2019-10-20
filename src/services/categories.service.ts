import http from "./http.service";

async function fetchCategories() {
  const { data } = await http.get<Category[]>("/category");
  return data;
}

type Category = {
  created: number;
  description: string;
  etag: string;
  id: string;
  largeIcon: string;
  name: string;
  path: string;
  productUrl: string;
  smallIcon: string;
  title: string;
  updated: number;
  url: string;
};

const categoriesService = {
  fetchCategories,
};

export {
  Category,
};

export default categoriesService;
