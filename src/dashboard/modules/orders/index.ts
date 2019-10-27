import {
  restore, createEffect, createEvent, sample,
} from "effector";

import ordersService, { Snapshot } from "@/dashboard/services/orders.service";
import { OrderDetailsResponse } from "@/services/cart.service";

import { $metadata, $productsByOrder, $cardLoadings } from "./store";

const fxFetchOrders = createEffect<
  { offset: number; limit: number }, {products: OrderDetailsResponse[]; totalCount: number}
>("fetch orders", {
  handler: ordersService.fetchOrders,
});

const fxFetchProductsByOrder = createEffect<string, Snapshot>("fetch products by order id", {
  handler: ordersService.fetchProductsByOrder,
});

const changedQuery = createEvent<string>("changed query by phone");
const changePage = createEvent<number>("change page via pagination");
const resetMetadata = createEvent("reset metas when user go to another page");

const $ordersContext = restore(
  fxFetchOrders.done.map(({ result }) => result.products),
  [],
);

changedQuery.watch(w => console.log(w));

const $totalCount = restore(
  fxFetchOrders.done.map(({ result }) => result.totalCount),
  0,
);

const $isLoading = fxFetchOrders.pending;

$cardLoadings
  .on(fxFetchProductsByOrder, (list, id) => [...list, id])
  .on(fxFetchProductsByOrder.finally, (list, { params: id }) => list.filter(e => e !== id));

$productsByOrder.on(fxFetchProductsByOrder.done, (state, { result: snapshot }) => ({
  ...state,
  [snapshot.orderDetailsId]: snapshot,
}));

$metadata
  .on(changePage, (state, offset) => ({ ...state, offset }))
  .on(changedQuery, (state, query) => ({ ...state, query })) // TODO: create handler for search by phone number
  .reset(resetMetadata);

sample({
  source: $metadata,
  clock: changePage,
  fn: metadata => metadata,
  target: fxFetchOrders,
});

export {
  $metadata,
  $isLoading,
  $ordersContext,
  $totalCount,
  $productsByOrder,
  $cardLoadings,

  fxFetchOrders,
  fxFetchProductsByOrder,
  changePage,
  changedQuery,
  resetMetadata,
};
