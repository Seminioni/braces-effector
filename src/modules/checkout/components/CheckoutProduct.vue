<script lang="ts">
import Vue, { PropType } from "vue";

import { FullProductModel } from "@/services/cart.service";
import currency from "@/lib/currency";

export default Vue.extend({
  name: "CheckoutProduct",

  filters: { currency },

  props: {
    product: {
      type: Object as PropType<FullProductModel>,
      required: true,
    },
  },
});
</script>

<template functional>
  <li class="checkout-product__item">
    <figure class="checkout-pruduct__image">
      <div class="checkout-product__image-container">
        <v-lazy-image
          :src="props.product.thumbnail"
          :alt="props.product.title"
        />
      </div>

      <figcaption class="checkout-product__description">
        <p class="checkout-product__title">
          {{ props.product.title }}
        </p>

        <footer class="checkout-product__footer">
          <span>
            {{ props.product.quantity }}шт.
          </span>

          <span class="body-text-14">
            {{ props.product.totalAmount | currency }}
          </span>
        </footer>
      </figcaption>
    </figure>
  </li>
</template>

<style lang="scss" scoped>
.checkout-product__item {
  margin-bottom: 40px;
}

.checkout-pruduct__image {
  display: flex;
}

.checkout-product__image-container {
  width: 80px;
  height: 80px;
  margin-right: 18px;

  > img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }
}

.checkout-product__description {
  font-size: 13px;
  display: flex;
  flex-direction: column;
  flex: 1 0;
}

.checkout-product__title {
  line-height: 19px;
}

.checkout-product__footer {
  color: $--secondary-text;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
