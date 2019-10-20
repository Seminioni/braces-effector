import { createEffect, createEvent } from "effector";

import {
  CartContext,
  cartService,
  ProductInCart,
  ProductMetadata, SaveQuantityPayload, SaveQuantityResponse,
  SaveToCartPaylod,
} from "@/services/cart.service";
import { Product } from "@/services/products.service";

const fxFetchCartContext = createEffect<void, CartContext>("fetchCartContext", {
  handler: cartService.fetchCartStatus,
});

const fxFetchProductsFromCart = createEffect<string, ProductInCart[]>(
  "fxFetchProductsFromCart",
  {
    handler: cartService.fetchProductsFromCart,
  },
);

const fxAddItemToCart = createEffect<SaveToCartPaylod, ProductMetadata>(
  "fxAddItemToCart",
  {
    handler: cartService.addToCart,
  },
);

const fxUpdateQuantity = createEffect<SaveQuantityPayload, SaveQuantityResponse>(
  "fxUpdateQuantity",
  {
    handler: cartService.updateQuantity,
  },
);

const addedItemToCart = createEvent<Product & { quantity?: number }>("addedItemToCart");
const updatedQuantity = createEvent<
  { productCtx: ProductMetadata; quantity: number }
>("updatedQuantity");

export {
  fxFetchCartContext,
  fxFetchProductsFromCart,
  fxAddItemToCart,
  fxUpdateQuantity,

  addedItemToCart,
  updatedQuantity,
};
