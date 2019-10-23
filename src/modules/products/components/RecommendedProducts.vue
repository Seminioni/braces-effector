<script lang="ts">
import Vue from "vue";

import ProductCard from "./ProductCard.vue";
import { BrLoader } from "@/shared";

import { $recommendedProducts } from "../model";
import { fxFetchRecommendedProducts } from "../events";

export default Vue.extend({
  name: "RecommendedProducts",

  effector() {
    return {
      $recommendedProducts,
      $isLoading: fxFetchRecommendedProducts.pending,
    };
  },

  components: {
    ProductCard,
    BrLoader,
  },

  props: {
    categoryId: {
      type: String,
      default: "",
    },
  },

  created() {
    this.fxFetchRecommendedProducts(this.categoryId);
  },

  methods: {
    fxFetchRecommendedProducts,
  },
});
</script>

<template>
  <section class="recommended-products">
    <div class="container">
      <h2 class="recommended-products__title">
        Рекомендовані товари
      </h2>

      <br-loader class="recommended-products__loader">
        <ul
          v-if="!$isLoading && $recommendedProducts.length"
          class="row recommended-products__list"
        >
          <li
            v-for="product in $recommendedProducts"
            :key="product.id"
            class="col recommended-products__item"
          >
            <product-card
              :product="product"
              :hide-button="true"
            />
          </li>
        </ul>
      </br-loader>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.recommended-products {
  border-top: 1px solid $--divider;
  padding: 32px 0;
}

.recommended-products__title {
  text-align: center;
}

.recommended-products__loader {
  margin-top: 24px;
}

.recommended-products__item {
  margin-bottom: 25px;

  @include small {
    @include col(6);
  }

  @include medium {
    @include col(4);
  }

  @include large {
    @include col(3);
  }

  @include extra {
    @include col(2);
  }
}
</style>
