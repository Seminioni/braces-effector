<script lang="ts">
import Vue from "vue";

import { $categories } from "../model";

import { BrLoader } from "@/shared";

export default Vue.extend({
  name: "CategoriesList",

  effector() {
    return {
      $categories,
    };
  },

  components: {
    BrLoader,
  },
});
</script>

<template>
  <section class="categories">
    <div class="container">
      <h2 class="categories__title">
        Категорії
      </h2>

      <br-loader class="categories__loader">
        <ul
          v-if="$categories.length"
          class="row col categories__list"
        >
          <li
            v-for="category in $categories"
            :key="category.id"
            class="col categories__item"
          >
            <router-link
              :to="{
                name: 'ProductsPage',
                params: { category: category.path },
              }"
              class="body-text-16 categories__link"
              :style="`background-image: url(${category.largeIcon})`"
            >
              <span>
                {{ category.title }}
              </span>
            </router-link>
          </li>
        </ul>
      </br-loader>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.categories__title {
  @include visually-hidden;
}

.categories__loader {
  margin-top: 45px;
  margin-bottom: 70px;
}

.categories__list {
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;

  @include small {
    @include col(10);
  }

  @include large {
    justify-content: center;
  }
}

.categories__item {
  display: flex;
  justify-content: center;

  @include col(5, 10);

  &:not(:last-child) {
    margin-bottom: 45px;
  }

  @include small {
    @include col(3, 10);
  }

  @include large {
    @include col(2, 10);
  }
}

.categories__link {
  display: block;
  width: 100px;

  padding-top: 115px;
  background: top center no-repeat;
  background-size: 100px;
  text-align: center;
}
</style>
