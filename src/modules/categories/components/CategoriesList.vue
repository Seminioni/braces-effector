<script lang="ts">
import createComponent from "@/core/component";
import { BrLoader } from "@/shared";

import { $categories } from "../model";

const store = {
  $categories,
};

export default createComponent({
  name: "CategoriesList",

  components: {
    BrLoader,
  },
}, store);
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
            >
              <v-lazy-image
                :src="category.largeIcon"
                :alt="category.title"
                class="categories__image"
              />
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
  text-align: center;
  padding-top: 115px;
  position: relative;
}

.categories__image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
}
</style>
