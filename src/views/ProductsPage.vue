<script lang="ts">
import { PropType } from "vue";

import createComponent from "@/core/component";
import { Category } from "@/services/categories.service";
import { ProductsContainer } from "@/modules/products";
import Breadcrumbs from "@/ui/Breadcrumbs.vue";


export default createComponent({
  name: "ProductsPage",

  metaInfo() {
    return {
      title: `Braces — ${this.currentCategory.title}`,
    };
  },

  components: {
    Breadcrumbs,
    ProductsContainer,
  },

  props: {
    currentCategory: {
      type: Object as PropType<Category>,
      required: true,
    },
  },

  computed: {
    breadcrumbs(): { label: string; path: string }[] {
      return [
        { label: "Головна", path: "/" },
        { label: this.currentCategory.title, path: "" },
      ];
    },
  },
});
</script>

<template>
  <div
    class="page"
  >
    <breadcrumbs :breadcrumbs="breadcrumbs" />

    <section class="hero">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="hero__title bold">
              {{ currentCategory.title }}
            </h1>

            <p class="hero__descr body-text-14">
              {{ currentCategory.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <products-container :current-category="currentCategory" />
  </div>
</template>

<style lang="scss" scoped>
.hero {
  text-align: center;
  padding: 21px 0;

  background: $--light-background;
  border-top: 1px solid $--divider;
  border-bottom: 1px solid $--divider;
}

.hero__title {
  @include headline-3;
  text-transform: uppercase;
  margin-bottom: 24px;
}
</style>
