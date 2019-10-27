<script lang="ts">
import { PropType } from "vue";

import createComponent from "@/core/component";
import currency from "@/lib/currency";
import { fxFetchProductsByOrder, $productsByOrder, $cardLoadings } from "..";
import { OrderDetailsResponse } from "@/services/cart.service";
import { BrButton } from "@/shared";

const store = {
  $productsByOrder,
  $cardLoadings,
};

export default createComponent({
  name: "OrdersItem",

  filters: { currency },

  components: {
    BrButton,
  },

  props: {
    order: {
      type: Object as PropType<OrderDetailsResponse>,
      required: true,
    },
  },

  computed: {
    isOpened() {
      return this.$productsByOrder && this.$productsByOrder[this.order.id];
    },
  },

  methods: {
    fxFetchProductsByOrder,
  },
}, store);
</script>

<template>
  <li class="col order-item">
    <p>
      <span class="bold">Клієнт: </span>{{ order.fullname }}
    </p>

    <p>
      <span class="bold">Телефон: </span>{{ order.phoneNumber }}
    </p>

    <p>
      <span class="bold">E-mail: </span>{{ order.email }}
    </p>

    <p>
      <span class="bold">Спосіб доставки: </span>
      {{ order.deliveryType.DeliveryToAddressType ? 'Кур\'єр' : 'Нова пошта' }}
    </p>

    <p>
      <span class="bold">Адреса доставки: </span>
      {{
        order.deliveryType.DeliveryToAddressType
          ? `${order.deliveryType.DeliveryToAddressType.city},
            ${order.deliveryType.DeliveryToAddressType.street},
            ${order.deliveryType.DeliveryToAddressType.number}`
          : `${order.deliveryType.NovaPoshtaDeliveryType.city},
            відділення № ${order.deliveryType.NovaPoshtaDeliveryType.postOfficeNumber}`
      }}
    </p>

    <p>
      <span class="bold">Спосіб оплати:</span>
      {{ order.paymentType.CashPaymentType ? 'Готівка' : 'Картка' }}
    </p>
    <p>
      <span class="bold">{{ order.paymentType.CashPaymentType ? 'Решта з:' : 'Статус оплати:' }}</span>
      {{
        order.paymentType.CashPaymentType
          ? `${order.paymentType.CashPaymentType.amount} грн.`
          : 'Оплачено'
      }}
    </p>

    <br-button
      class="order-item__details"
      type="primary"
      :is-loading="$cardLoadings.includes(order.orderSnapshotUrl)"
      @click="fxFetchProductsByOrder(order.orderSnapshotUrl)"
    >
      {{ !isOpened ? 'Деталі замовлення': 'Оновити' }}
    </br-button>

    <div v-if="isOpened">
      <ul class="order-item__products-list">
        <li
          v-for="product in $productsByOrder[order.id].products"
          :key="product.id"
          class="order-item__products-item"
        >
          {{ product.productTitle }} x {{ product.productQuantity }}
        </li>
      </ul>

      <div>
        <span class="bold">Всього: </span> {{ $productsByOrder[order.id].totalPrice | currency }}
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.order-item {
  padding-top: 15px;
  padding-bottom: 15px;
  border: 1px solid $--divider;
  margin: 15px 0;
}

.order-item__details {
  margin: 15px 0;
}

.order-item__products-list {
  border-top: 1px solid $--divider;
  padding-top: 25px;
}
</style>
