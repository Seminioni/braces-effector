import { createStore } from "effector";
import { Snapshot } from "@/dashboard/services/orders.service";

const $metadata = createStore({
  offset: 0,
  limit: 10,
  query: "",
});

const $productsByOrder = createStore<{ [key: string]: Snapshot } | null>(null);
const $cardLoadings = createStore<string[]>([]);

export {
  $metadata,
  $productsByOrder,
  $cardLoadings,
};
