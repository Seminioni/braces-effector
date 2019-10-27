<script lang="ts">
import createComponent from "@/core/component";
import { $isMobile } from "@/core/session";
import { $isAdmin } from "@/modules/auth";
import { Search } from "@/modules/search";
import { $productsInCart } from "@/modules/cart";
import { BrUserControl, BrBadge } from "@/shared";
import Logo from "@/ui/Logo.vue";

const store = {
  $isMobile,
  $isAdmin,
  $productsInCart,
};

export default createComponent({
  name: "MainHeader",

  components: {
    Search,
    Logo,
    BrUserControl,
    BrBadge,
  },
}, store);
</script>

<template>
  <div class="container">
    <div class="row align-center">
      <div
        v-if="!$isMobile"
        class="col main-header__logo"
      >
        <logo />
      </div>

      <div
        class="col"
        :class="{ 'main-header__search': !$isMobile }"
      >
        <search />
      </div>

      <div
        v-if="!$isMobile"
        class="col main-header__controls justify-end align-center"
      >
        <br-badge
          v-if="!$isAdmin"
          :count="Object.keys($productsInCart).length"
        >
          <br-user-control
            :to="{ name: 'CartPage' }"
            icon="cart"
          >
            Кошик
          </br-user-control>
        </br-badge>

        <br-user-control
          v-else
          :to="{ name: 'DashboardOrdersPage' }"
          icon="settings"
        >
          Адмін
        </br-user-control>

        <br-user-control
          icon="menu"
          @click="$emit('toggle')"
        >
          Меню
        </br-user-control>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-header__logo {
  display: none;

  @include medium {
    display: block;
    @include col(2);
  }
}

.main-header__controls {
  display: none;

  @include medium {
    display: block;
    @include col(3);
  }
}

.main-header__search {
  @include col(9);

  @include medium {
    @include col(7);
  }
}

.main-header__controls {
  display: flex;
  @include col(3);
}
</style>
