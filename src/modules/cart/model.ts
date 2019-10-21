import {
  combine, createStore, forward, guard, sample,
} from "effector";
import debounce from "lodash.debounce";

import {
  addedItemToCart,
  fxAddItemToCart,
  fxFetchCartContext,
  fxFetchProductsFromCart, fxUpdateQuantity, updatedQuantity,
} from "@/modules/cart/events";
import { CartContext, FullProductModel, ProductMetadata } from "@/services/cart.service";
import { Product } from "@/services/products.service";
import reduceToDict from "@/lib/reduce";
import { Dictionary } from "@/lib/types";
import exclude from "@/lib/exclude";

const $cartContext = createStore<CartContext | null>(null)
  .on(fxFetchCartContext.done, (_, { result: ctx }) => ctx);

const $productsInCart = createStore<Dictionary<Product>>({})
  .on(
    fxFetchProductsFromCart.done,
    (_, { result: products }) => reduceToDict(
      products.map(({ product }) => product),
      ({ id }) => id,
      product => product,
    ),
  )
  .on(addedItemToCart, (state, product) => ({ ...state, [product.id]: product }))
  .on(
    updatedQuantity,
    (state, { productCtx, quantity }) => (quantity ? state : exclude(productCtx.productId, state)),
  );

const $productsContextInCart = createStore<Dictionary<ProductMetadata>>({})
  .on(
    fxFetchProductsFromCart.done,
    (_, { result: products }) => reduceToDict(
      products.map(({ bucketProduct }) => bucketProduct),
      ({ productId }) => productId,
      ctx => ctx,
    ),
  )
  .on(fxAddItemToCart.done, (state, { result: ctx }) => ({
    ...state,
    [ctx.productId]: ctx,
  }))
  .on(fxUpdateQuantity.done, (state, { result: ctx }) => {
    const { etag, productId, quantity } = ctx;
    if (!etag) {
      return exclude(productId, state);
    }

    return {
      ...state,
      [productId]: { ...state[productId], quantity, etag },
    };
  })
  .on(updatedQuantity, (state, { productCtx, quantity }) => {
    if (!quantity) {
      return exclude(productCtx.productId, state);
    }
    return { ...state, [productCtx.productId]: { ...state[productCtx.productId], quantity } };
  });

const $totalAmount = combine(
  $productsContextInCart,
  $productsInCart,
  (ctx, products) => Object.values(ctx)
    .reduce((acc, { quantity, productId }) => (acc + quantity * products[productId].price), 0),
);

const $fullProductsModel = combine(
  $productsContextInCart,
  $productsInCart,
  (ctx, products) => Object.values(products)
    .reduce((acc, current) => ({
      ...acc,
      [current.id]: {
        ...current,
        quantity: !ctx[current.id] ? 1 : ctx[current.id].quantity,
        totalAmount: !ctx[current.id] ? 0 : ctx[current.id].quantity * current.price,
        categoryProductUrl: `/products/${current.categoryProductUrl.slice(12)}`,
      },
    }), {} as FullProductModel),
);

$fullProductsModel.watch(w => console.log(w));

const $isLoading = createStore(true)
  .on(fxFetchProductsFromCart.pending.updates, (_, isLoading) => isLoading);

forward({
  from: fxFetchCartContext.done
    .map(({ result }) => result)
    .map(ctx => ctx.bucketProductViewUrl),
  to: fxFetchProductsFromCart,
});

/*
*
* TODO: Add item to cart.
*
* */

sample({
  source: $cartContext,
  clock: addedItemToCart,
  fn: (ctx, product) => ({
    quantity: product.quantity || 1,
    bucketId: ctx!.id,
    productId: product.id,
  }),
  target: fxAddItemToCart,
});

updatedQuantity.watch(debounce(({ quantity, productCtx }) => {
  const {
    bucketId, etag, productId, url,
  } = productCtx;

  fxUpdateQuantity({
    bucketId,
    etag,
    productId,
    quantity,
    url,
  });
}, 500));

export {
  $cartContext,
  $productsInCart,
  $productsContextInCart,
  $fullProductsModel,
  $totalAmount,
  $isLoading,
};
