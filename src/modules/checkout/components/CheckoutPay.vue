<script lang="ts">
import Vue from "vue";

import {
  BrRadioGroup, BrRadio, BrButton, BrInput,
} from "@/shared";

import {
  $payModel, updatedPay, confirmOrder, fxSendOrder,
} from "../model";
import { $cartContext } from "@/modules/cart";
import { PayType } from "@/services/cart.service";

export default Vue.extend({
  name: "CheckoutPay",

  effector() {
    return {
      $isLoading: fxSendOrder.pending,
      $cartContext,
      $payModel,
    };
  },

  components: {
    BrRadioGroup,
    BrRadio,
    BrButton,
    BrInput,
  },

  data: () => ({
    $cartContext: {} as State<typeof $cartContext>,
  }),

  methods: {
    updatedPay,
    confirmOrder,
    fxSendOrder,
    changePayType(value: PayType) {
      this.updatedPay({
        key: "type",
        value,
      });
    },
    handleSubmit() {
      if (!this.$cartContext) {
        return;
      }
      this.confirmOrder(this.$cartContext.id);
    },
  },
});
</script>

<template>
  <validation-observer v-slot="{ valid }">
    <validation-provider
      v-slot="{ errors }"
      rules="required"
    >
      <br-radio-group
        :checked="$payModel.type"
        group-name="pay"
        @change="changePayType"
      >
        <div>
          <br-radio
            value="CashPaymentType"
            class="checkout-form__checkbox"
          >
            Готівкою при отриманні
          </br-radio>

          <div
            v-if="$payModel.type === 'CashPaymentType'"
            class="checkout-form__fields checkout-form__fields--cash"
          >
            <validation-provider
              v-slot="{ errors }"
              rules="required|numeric"
            >
              <br-input
                :value="$payModel.faceValue"
                type="number"
                @input="updatedPay({
                  key: 'faceValue',
                  value: $event,
                })"
              >
                Решта з:
              </br-input>
            </validation-provider>
          </div>
        </div>

        <br-radio
          value="LiqPayPaymentType"
          class="checkout-form__checkbox"
        >
          Карткою на сайті
        </br-radio>
      </br-radio-group>
    </validation-provider>

    <br-button
      type="primary"
      class="checkout-form__submit"
      :disabled="!valid"
      :is-loading="$isLoading"
      @click="handleSubmit"
    >
      {{ $payModel.type === 'CashPaymentType' ? 'Підтвердити замовлення' : 'Перейти до оплати' }}
    </br-button>
  </validation-observer>
</template>

<style lang="scss" scoped>
.checkout-form__fields--cash {
  span {
    display: block;
    max-width: 150px;
  }
}
</style>
