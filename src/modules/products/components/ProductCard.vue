<script lang="ts">
import Vue, { PropType } from "vue";

import { Product } from "@/services/products.service";
import {
  addedItemToCart, $productsInCart, $productsContextInCart, updatedQuantity, fxAddItemToCart,
} from "@/modules/cart";

import { BrButton, BrInputNumber } from "@/shared";
import currency from "@/lib/currency";

export default Vue.extend({
  name: "ProductCard",

  effector() {
    return {
      $isLoading: fxAddItemToCart.pending,
      $productsInCart,
      $productsContextInCart,
    };
  },

  filters: { currency },

  components: {
    BrButton,
    BrInputNumber,
  },

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  methods: {
    updatedQuantity,
    addedItemToCart,
  },
});
</script>

<template>
  <figure class="product-card">
    <router-link
      :to="product.categoryProductUrl"
      class="product-card__link"
    >
      <div class="product-card__img">
        <img
          :src="product.thumbnail"
          :alt="product.title"
        >
      </div>

      <figcaption class="product-card__descr">
        <p class="body-text-14 product-card__title">
          {{ product.title }}
        </p>
      </figcaption>
    </router-link>

    <div class="product-card__footer">
      <div class="body-text bold product-card__price">
        {{ product.price | currency }}
      </div>

      <br-button
        v-if="!$productsContextInCart[product.id]"
        type="transparent"
        class="product-card__cart-btn"
        :is-loading="$isLoading"
        @click="addedItemToCart(product)"
      >
        У кошик
      </br-button>
      <br-input-number
        v-else
        class="product-card__cart-quantity"
        :value="$productsContextInCart[product.id].quantity"
        @input="updatedQuantity({
          productCtx: $productsContextInCart[product.id],
          quantity: $event,
        })"
      />
    </div>
  </figure>
</template>

<style lang="scss" scoped>
.product-card {
  margin: 0 auto;
  width: 100%;
  max-width: 250px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.product-card__img {
  width: 100%;
  position: relative;
  padding-top: 100%;
  margin-bottom: 26px;

  > img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
    object-position: center;
  }
}

.product-card__title {
  max-height: 46px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
}

.product-card__price {
  line-height: 24px;
  border-top: 1px solid $--divider;
  padding: 3px 0;
  width: 100%;
  margin-bottom: 9px;
}

.product-card__cart-btn, .product-card__cart-quantity {
  width: 100%;

  @include medium {
    width: auto;
  }
}

.product-card__footer {
  margin-top: auto;
  width: 100%;
}

.product-card__link {
  display: block;
  width: 100%;

  &:hover {
    .product-card__title {
      text-decoration: underline;
    }
  }
}
</style>
