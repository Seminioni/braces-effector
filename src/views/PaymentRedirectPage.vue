<script lang="ts">
import createComponent from "@/core/component";
import { Liqpay } from "@/modules/checkout";


export default createComponent({
  name: "PaymentRedirect",

  components: {
    Liqpay,
  },
});
</script>

<template>
  <figure class="payment-request">
    <div class="image">
      <img
        :src="require('@/assets/vector/big-logo-request.pure.svg')"
        alt="Завершення оплати буде у окремому вікні"
      >
    </div>
    <figcaption>
      <h1 class="headline-36px">
        Зараз відбудеться оплата...
      </h1>
      <Liqpay
        :data="$route.params.data"
        :signature="$route.params.signature"
      />
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
.payment-request {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    text-align: center;
    margin-bottom: 25px;
  }
}

.image {
  width: 300px;
  margin-top: 35px;
  margin-bottom: 35px;

  > img {
    display: block;
    max-width: 100%;
  }
}
</style>
