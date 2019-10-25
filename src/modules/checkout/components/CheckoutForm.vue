<script lang="ts">
import createComponent from "@/core/component";
import { BrButton } from "@/shared";

import {
  $currentStep, completedStep, changedStep, $completedSteps, $infoModel,
  $deliveryModel, $payModel,
} from "../model";

import CheckoutInfo from "./CheckoutInfo.vue";
import CheckoutDelivery from "./CheckoutDelivery.vue";
import CheckoutPay from "./CheckoutPay.vue";
import CheckoutPlaceholder from "./CheckoutPlaceholder.vue";

type Step = keyof State<typeof $completedSteps>;

const store = {
  $infoModel,
  $payModel,
  $deliveryModel,
  $currentStep,
  $completedSteps,
};

export default createComponent({
  name: "CheckoutForm",

  components: {
    BrButton,
    CheckoutInfo,
    CheckoutPay,
    CheckoutDelivery,
    CheckoutPlaceholder,
  },

  computed: {
    isCheckoutSuccess() {
      return this.$route.name === "CheckoutSuccessPage";
    },
  },

  methods: {
    changedStep,
    completedStep,
    handleChange(nextStep: Step, currentStep?: Step) {
      if (currentStep) {
        this.completedStep(currentStep);
      }

      this.changedStep(nextStep);
    },
  },
}, store);
</script>

<template>
  <form class="checkout-form">
    <validation-observer v-slot="{ valid }">
      <div class="checkout-form__item">
        <p class="checkout-page__title">
          1.Контактні дані

          <br-button
            v-if="!isCheckoutSuccess && ($currentStep !== 'info' && $completedSteps.info)"
            type="text"
            :disabled="!valid"
            class="checkout-page__change-btn"
            @click="handleChange('info')"
          >
            Змінити
          </br-button>
        </p>

        <div class="checkout-form__body">
          <checkout-info
            v-if="$currentStep === 'info'"
            @submit="handleChange($event, 'info')"
          />
          <checkout-placeholder
            v-if="$currentStep !== 'info' && $completedSteps.info"
            slot="placeholder"
            title="Отримувач"
          >
            <p>{{ $infoModel.fullName }}</p>
            <p>{{ $infoModel.email }}</p>
            <p>{{ $infoModel.phoneNumber }}</p>
          </checkout-placeholder>
        </div>
      </div>

      <div class="checkout-form__item">
        <p class="checkout-page__title">
          2.Спосіб доставки

          <br-button
            v-if="!isCheckoutSuccess && ($currentStep !== 'delivery' && $completedSteps.delivery)"
            type="text"
            :disabled="!valid"
            class="checkout-page__change-btn"
            @click="handleChange('delivery')"
          >
            Змінити
          </br-button>
        </p>

        <div class="checkout-form__body">
          <checkout-delivery
            v-if="$currentStep === 'delivery'"
            @submit="handleChange($event, 'delivery')"
          />
          <checkout-placeholder
            v-if="$currentStep !== 'delivery' && $completedSteps.delivery"
            slot="placeholder"
            :title="$deliveryModel.deliveryType === 'courier' ? `Кур'єр` : 'Нова пошта'"
          >
            <p>{{ $infoModel.city }}</p>
            <p v-if="$deliveryModel.deliveryType === 'post'">
              Точка видачі:
              № {{ $deliveryModel.postOfficeNumber }}
            </p>
            <p v-if="$deliveryModel.deliveryType === 'courier'">
              Вулиця: {{ `${$deliveryModel.street}, ${$deliveryModel.number}` }}
            </p>
          </checkout-placeholder>
        </div>
      </div>

      <div class="checkout-form__item">
        <p class="checkout-page__title">
          3.Оплата

          <br-button
            v-if="!isCheckoutSuccess && ($currentStep !== 'pay' && $completedSteps.pay)"
            type="text"
            :disabled="!valid"
            class="checkout-page__change-btn"
          >
            Змінити
          </br-button>
        </p>

        <div
          v-if="$currentStep === 'pay'"
          class="checkout-form__body"
        >
          <checkout-pay v-if="!isCheckoutSuccess" />
          <div
            v-else
            class="checkout-form__success-footer"
          >
            <checkout-placeholder
              :title="$payModel.type === 'CashPaymentType' ? 'Готівка': 'Картка'"
            >
              <p>
                Оплата {{ $payModel.type === 'CashPaymentType' ? 'готівкою': 'карткою' }}
                {{ $deliveryModel.deliveryType === 'courier' ? `кур'єру` : 'при отриманні' }}
              </p>
            </checkout-placeholder>

            <br-button
              type="primary"
              :to="{ name: 'HomePage' }"
              class="checkout-form__to-home-page"
            >
              На головну
            </br-button>
          </div>
        </div>
      </div>
    </validation-observer>
  </form>
</template>

<style lang="scss" scoped>
.checkout-page__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkout-page__change-btn {
  margin: 0;
  &.text {
    color: $--primary;
  }
}

.checkout-form__body {
  padding-bottom: 50px;
}


.checkout-form__success-footer {
  display: flex;
  flex-direction: column
}

.checkout-form__to-home-page.action {
  margin-top: 40px;
  align-self: center;
}
</style>

<style lang="scss">
.checkout-form__textfield {
  margin-bottom: 16px;
}

.checkout-form__submit {
  margin-top: 35px !important;
}

.checkout-form__checkbox {
  margin-top: 24px !important;
}

.checkout-form__fields {
  padding-left: 35px;
  margin-top: 35px;
}
</style>
