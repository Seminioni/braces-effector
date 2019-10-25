<script lang="ts">
import createComponent from "@/core/component";
import { BrInput, BrButton } from "@/shared";

import { updatedInfo, $infoModel } from "../model";

const store = {
  $infoModel,
};

export default createComponent({
  name: "CheckoutInfo",

  components: {
    BrInput,
    BrButton,
  },

  methods: {
    updatedInfo,
  },
}, store);
</script>

<template>
  <validation-observer v-slot="{ valid }">
    <validation-provider
      v-slot="{ errors }"
      rules="required"
    >
      <br-input
        name="name"
        class="checkout-form__textfield"
        :value="$infoModel.fullName"
        @input="updatedInfo({
          key: 'fullName',
          value: $event,
        })"
      >
        Ім'я та прізвище

        <template
          v-if="errors.length"
          slot="error"
        >
          Поле обов'язкове для заповнення
        </template>
      </br-input>
    </validation-provider>

    <validation-provider
      v-slot="{ errors }"
      rules="required"
    >
      <br-input
        name="city"
        class="checkout-form__textfield"
        :value="$infoModel.city"
        @input="updatedInfo({
          key: 'city',
          value: $event,
        })"
      >
        Місто
        <template
          v-if="errors.length"
          slot="error"
        >
          Поле обов'язкове для заповнення
        </template>
      </br-input>
    </validation-provider>

    <validation-provider
      v-slot="{ errors }"
      rules="required|numeric"
    >
      <br-input
        name="phone"
        type="tel"
        class="checkout-form__textfield"
        :value="$infoModel.phoneNumber"
        @input="updatedInfo({
          key: 'phoneNumber',
          value: $event,
        })"
      >
        Мобільний телефон
        <template
          v-if="errors.length"
          slot="error"
        >
          Поле має містити тільки цілі числа
        </template>
      </br-input>
    </validation-provider>

    <validation-provider
      v-slot="{ errors }"
      rules="required|email"
      name="E-mail"
    >
      <br-input
        name="email"
        type="email"
        class="checkout-form__textfield"
        :value="$infoModel.email"
        @input="updatedInfo({
          key: 'email',
          value: $event,
        })"
      >
        E-mail

        <template
          v-if="errors.length"
          slot="error"
        >
          Введіть валідний e-mail
        </template>
      </br-input>
    </validation-provider>

    <br-button
      type="primary"
      class="checkout-form__submit"
      :disabled="!valid"
      @click="$emit('submit', 'delivery')"
    >
      Обрати спосіб доставки
    </br-button>
  </validation-observer>
</template>
