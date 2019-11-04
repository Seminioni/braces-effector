<script lang="ts">
import createComponent from "@/core/component";
import { $products, fxFetchProducts, fxRemoveProduct } from "@/dashboard/modules/products";

import { BrLoader, BrButton } from "@/shared";

const store = {
  $products,
  $isLoading: fxFetchProducts.pending,
};

export default createComponent({
  name: "DashboardProductsPage",

  components: {
    BrLoader,
    BrButton,
  },

  methods: {
    fxRemoveProduct,
  },
}, store);
</script>

<template>
  <div>
    <br-button
      type="primary"
      :to="{ name: 'CreateNewProductPage' }"
      style="margin-top: 15px;"
    >
      Створити новий продукт
    </br-button>
    <br-loader>
      <ul
        v-if="!$isLoading && $products.length"
        class="row"
      >
        <li
          v-for="product in $products"
          :key="product.id"
          class="col products__item"
        >
          <div>
            <span class="bold">Назва продукту: </span>
            {{ product.title }}
          </div>
          <br-button
            type="text"
            :to="{ name: 'EditProductPage', params: { id: product.id } }"
          >
            Редагувати
          </br-button>

          <br-button
            type="text"
            @click="fxRemoveProduct({
              id: product.id,
              etag: product.etag
            })"
          >
            Видалити
          </br-button>
        </li>
      </ul>
    </br-loader>
  </div>
</template>

<style lang="scss" scoped>
.products__item {
  @include col(5);
  border: 1px solid $--divider;
  padding-top: 15px;
  padding-bottom: 15px;
  margin: 15px;
}
</style>
