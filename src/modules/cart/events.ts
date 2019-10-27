import { createEffect, createEvent } from "effector";

import {
  CartContext,
  cartService,
  ProductInCart,
  ProductMetadata, SaveQuantityPayload, SaveQuantityResponse,
  SaveToCartPaylod,
} from "@/services/cart.service";
import { Product } from "@/services/products.service";

const fxFetchCartContext = createEffect<void, CartContext>({ handler: cartService.fetchCartStatus });
const fxFetchProductsFromCart = createEffect<string, ProductInCart[]>({ handler: cartService.fetchProductsFromCart });
const fxAddItemToCart = createEffect<SaveToCartPaylod, ProductMetadata>({ handler: cartService.addToCart });
const fxUpdateQuantity = createEffect<SaveQuantityPayload, SaveQuantityResponse>({
  handler: cartService.updateQuantity,
});

const addedItemToCart = createEvent<Product & { quantity?: number }>();
const updatedQuantity = createEvent<{ productCtx: ProductMetadata; quantity: number }>();

export {
  fxFetchCartContext,
  fxFetchProductsFromCart,
  fxAddItemToCart,
  fxUpdateQuantity,

  addedItemToCart,
  updatedQuantity,
};
