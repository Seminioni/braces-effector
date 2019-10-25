<script lang="ts">
import createComponent from "@/core/component";
import { $isMobile } from "@/core/session";
import { BrBadge, BrUserControl } from "@/shared";
import { $productsInCart } from "@/modules/cart";
import { Search } from "@/modules/search";
import Logo from "@/ui/Logo.vue";


const store = {
  $isMobile,
  $productsInCart,
};

export default createComponent({
  name: "SimpleHeader",

  components: {
    Logo,
    BrBadge,
    BrUserControl,
    Search,
  },
}, store);
</script>

<template>
  <div class="container">
    <div class="row justify-center">
      <div class="col container__inner">
        <template v-if="!$isMobile">
          <logo />
          <br-badge
            v-if="$route.name !== 'CheckoutSuccessPage'"
            :count="Object.keys($productsInCart).length"
          >
            <br-user-control
              :to="{ name: 'CartPage' }"
              icon="cart"
            >
              Кошик
            </br-user-control>
          </br-badge>
        </template>
        <search
          v-else
          style="width: 100%"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container__inner {
    justify-content: space-between;
    display: flex;
    align-items: center;
  @include medium {
    @include col(10);
  }
}
</style>
