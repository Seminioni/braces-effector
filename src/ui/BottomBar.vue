<script lang="ts">
import createComponent from "@/core/component";
import { BrUserControl, BrBadge } from "@/shared";
import { $productsInCart } from "@/modules/cart";

import Logo from "./Logo.vue";

const store = {
  $productsInCart,
};

export default createComponent({
  name: "BottomBar",

  components: {
    BrUserControl,
    BrBadge,
    Logo,
  },
}, store);
</script>

<template>
  <nav class="bottom-bar">
    <logo class="bottom-bar__logo" />
    <div class="bottom-bar__control bottom-bar__control--badge">
      <router-link :to="{ name: 'CartPage' }">
        <br-badge
          :count="Object.keys($productsInCart).length"
          class="bottom-bar__badge"
        >
          <br-user-control
            icon="cart"
            custom-tag="div"
          >
            Кошик
          </br-user-control>
        </br-badge>
      </router-link>
    </div>


    <br-user-control
      icon="menu"
      class="bottom-bar__control"
      @click="$emit('toggle')"
    >
      Меню
    </br-user-control>
  </nav>
</template>

<style lang="scss" scoped>
.bottom-bar {
  background: #fff;
  height: $--bottom-bar-height;
  border: 1px solid $--divider;
  width: 100%;
  display: flex;

  position: fixed;
  left: 0;
  bottom: 0;
}

.bottom-bar__logo {
  width: 95px;
  display: flex;
  justify-content: center;
}

.bottom-bar__control {
  flex: 1 0;
}

.bottom-bar__control--badge {
  > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
