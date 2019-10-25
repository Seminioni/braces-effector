<script lang="ts">
import createComponent from "@/core/component";

export default createComponent({
  name: "CheckoutSuccess",

  props: {
    fullName: {
      type: String,
      required: true,
    },
  },
});
</script>

<template functional>
  <div class="checkout-success">
    <p class="checkout-success__title">
      Дякуємо Вам, {{ props.fullName }}
    </p>
    <p class="body-text-14">
      Ми зателефонуємо Вам у найближчий час 🙂
    </p>
  </div>
</template>

<style lang="scss" scoped>
.checkout-success {
  padding-left: 45px;

  @include large {
    margin-bottom: 26px;
  }
}
.checkout-success__title {
  font-size: 24px;
  line-height: 26px;
  color: #000;
  font-weight: 500;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -45px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 16px;
    background: url("~@/assets/vector/success.pure.svg");
  }
}
</style>
