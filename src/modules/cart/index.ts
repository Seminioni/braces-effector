export {
  $productsInCart, $productsContextInCart, $totalAmount, $isLoading,
  $fullProductsModel, $cartContext,
} from "./model";
export {
  addedItemToCart, updatedQuantity, fxAddItemToCart, fxFetchCartContext,
} from "./events";

export { default as CartItem } from "./components/CartItem.vue";
