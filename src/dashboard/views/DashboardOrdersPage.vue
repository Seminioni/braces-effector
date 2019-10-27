<script lang="ts">
import createComponent from "@/core/component";

import {
  $isLoading, $ordersContext, $totalCount, $metadata,
  changePage, resetMetadata, changedQuery,
} from "../modules/orders";
import OrdersItem from "../modules/orders/shared/OrdersItem.vue";

import { BrLoader, BrInput } from "@/shared";
import Pagination from "@/ui/Pagination.vue";

const store = {
  $isLoading,
  $metadata,
  $ordersContext,
  $totalCount,
};

export default createComponent({
  name: "DashboardOrdersPage",

  components: {
    BrLoader,
    BrInput,
    OrdersItem,
    Pagination,
  },

  destroyed() {
    this.resetMetadata();
  },

  methods: {
    changedQuery,
    resetMetadata,
    changePage,
  },
}, store);
</script>

<template>
  <div class="page">
    <br-input
      class="orders-page__search"
      :value="$metadata.query"
      @input="changedQuery($event)"
    >
      Пошук за номером телефону
    </br-input>
    <br-loader>
      <template v-if="!$isLoading && $ordersContext.length">
        <ul class="row">
          <orders-item
            v-for="order in $ordersContext"
            :key="order.id"
            :order="order"
          />
        </ul>
        <pagination
          v-if="$ordersContext.length"
          style="margin: 25px 0;"
          :offset="$metadata.offset"
          :total="$totalCount"
          :limit="10"
          align="center"
          @update-offset="changePage"
        />
      </template>
    </br-loader>
  </div>
</template>

<style lang="scss" scoped>
.orders-page__search {
  margin: 15px 0 !important;
}
</style>
