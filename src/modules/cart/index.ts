export {
  $productsInCart, $productsContextInCart, $totalAmount, $isLoading,
  $fullProductsModel,
} from "./model";
export {
  addedItemToCart, updatedQuantity, fxAddItemToCart,
} from "./events";

export { default as CartItem } from "./components/CartItem.vue";
