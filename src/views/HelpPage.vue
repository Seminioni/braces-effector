<script lang="ts">
import createComponent from "@/core/component";

import { BrTab } from "@/shared";

const pages = [
  { label: "Доставка", to: "/help/delivery" },
  { label: "Оплата", to: "/help/payment" },
];

export default createComponent({
  name: "HelpPage",

  metaInfo() {
    return {
      title: "Braces — Допомога",
    };
  },

  components: {
    BrTab,
  },

  computed: {
    pages() {
      return pages;
    },
  },
});
</script>

<template>
  <div>
    <h1 class="help-page__title bold">
      Допомога
    </h1>
    <section class="help-page__section container">
      <br-tab
        :nav-items="pages"
        type="router"
      >
        <div class="row">
          <div class="col">
            <keep-alive>
              <router-view />
            </keep-alive>
          </div>
        </div>
      </br-tab>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.help-page__title {
  margin: 44px 0 25px 0;
  text-align: center;
}

.help-page__section {
  margin-bottom: 46px;

  .col:empty {
    background: red;
  }
}
</style>

<style lang="scss">
.content-title {
  margin-top: 46px;
}

.content-descr {
  margin-top: 24px;
  line-height: 24px;
}
</style>
