import http from "@/services/http.service";
import { OrderDetailsResponse } from "@/services/cart.service";

async function fetchOrders({ offset, limit }: { offset: number; limit: number }) {
  const response = await http.get<OrderDetailsResponse[]>(`/order_details?offset=${offset}&limit=${limit}`);

  return {
    products: response.data,
    totalCount: +response.headers["total-count"],
  };
}

async function fetchProductsByOrder(url: string) {
  const { data } = await http.get<Snapshot>(url.slice(3));
  return data;
}

type SnapshotProduct = {
  productId: string;
  productTitle: string;
  productPrice: number;
  productQuantity: number;
};

type Snapshot = {
  orderDetailsId: string;
  products: SnapshotProduct[];
  totalPrice: number;
  url: string;
  etag: string;
  created: number;
  updated: number;
  id: string;
};

const ordersService = {
  fetchOrders,
  fetchProductsByOrder,
};
export {
  Snapshot,
  SnapshotProduct,
};
export default ordersService;
