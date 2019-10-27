<script lang="ts">
import createComponent from "@/core/component";
import { BrRadioGroup, BrRadio } from "@/shared";

export default createComponent({
  name: "AuthForm",

  components: {
    BrRadioGroup,
    BrRadio,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    currentPage: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <form class="auth-form">
    <h1 class="auth-form__title bold">
      {{ title }}
    </h1>

    <br-radio-group
      :checked="currentPage"
      group-name="router"
      class="auth-form__router"
      @change="$emit('change-route', $event)"
    >
      <br-radio value="LoginPage">
        У мене є акаунт
      </br-radio>

      <br-radio value="RegisterPage">
        Я новий покупець
      </br-radio>
    </br-radio-group>

    <div class="auth-form__body">
      <slot />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.auth-form {
  max-width: 366px;
  margin: 0 auto;
}

.auth-form__router {
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
}

.auth-form__title {
  text-align: center;
  margin: 44px 0;
}

.auth-form__body {
  margin-top: 35px;
}
</style>

<style lang="scss">
.auth-form__textfield {
  margin-bottom: 16px;

  + button {
    margin-top: 35px !important;
  }
}
</style>
