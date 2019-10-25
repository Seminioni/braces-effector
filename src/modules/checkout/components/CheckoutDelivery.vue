<script lang="ts">
import createComponent from "@/core/component";
import {
  BrRadioGroup, BrRadio, BrButton, BrInput,
} from "@/shared";

import { $deliveryModel, updatedDelivery } from "../model";

const store = {
  $deliveryModel,
};

export default createComponent({
  name: "CheckoutDelivery",

  components: {
    BrRadioGroup,
    BrRadio,
    BrButton,
    BrInput,
  },

  methods: {
    updatedDelivery,
    changeDeliveryType(value: "post" | "courier") {
      this.updatedDelivery({
        key: "deliveryType",
        value,
      });
    },
  },
}, store);
</script>

<template>
  <validation-observer v-slot="{ valid }">
    <br-radio-group
      :checked="$deliveryModel.deliveryType"
      group-name="delivery"
      @change="changeDeliveryType"
    >
      <p class="body-text-16">
        Доставка Львів
      </p>

      <br-radio
        class="checkout-form__checkbox"
        value="post"
      >
        Самовивіз із Нової пошти (50 грн.)
      </br-radio>

      <div
        v-if="$deliveryModel.deliveryType === 'post'"
        class="checkout-form__fields checkout-form__fields--office-number"
      >
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <br-input
            :value="$deliveryModel.postOfficeNumber"
            @input="updatedDelivery({
              key: 'postOfficeNumber',
              value: $event,
            })"
          >
            Відділення №
          </br-input>
        </validation-provider>
      </div>

      <br-radio
        class="checkout-form__checkbox"
        value="courier"
      >
        Кур'єр за Вашою адресою
      </br-radio>

      <div
        v-if="$deliveryModel.deliveryType === 'courier'"
        class="checkout-form__fields checkout-form__fields--delivery"
      >
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <br-input
            :value="$deliveryModel.street"
            @input="updatedDelivery({
              key: 'street',
              value: $event,
            })"
          >
            Вулиця
          </br-input>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <br-input
            :value="$deliveryModel.number"
            @input="updatedDelivery({
              key: 'number',
              value: $event,
            })"
          >
            Дім №
          </br-input>
        </validation-provider>
      </div>
    </br-radio-group>
    <br-button
      type="primary"
      class="checkout-form__submit"
      :disabled="!valid"
      @click="$emit('submit', 'pay')"
    >
      Далі
    </br-button>
  </validation-observer>
</template>

<style lang="scss" scoped>
.checkout-form__fields--office-number {
  .textfield {

    @include large {
      max-width: 171px;
    }
  }
}
</style>

<style lang="scss">
.checkout-form__fields--delivery {
  display: flex;

  span {
    flex: 1 0;
    &:not(:last-child) {
      margin-right: 12px;
    }
  }

}
</style>
