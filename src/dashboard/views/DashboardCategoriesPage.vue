<script lang="ts">
import createComponent from "@/core/component";

import {
  fxFetchCategories, $categories, $categoryModel, changedCategoryModel,
  fxCreateCategory, fxRemoveCategory, selectedCategory, $selectedCategory,
  fxEditCategory,
} from "@/dashboard/modules/categories";
import { BrLoader, BrButton, BrInput } from "@/shared";

const store = {
  $categories,
  $selectedCategory,
  $categoryModel,
  $isLoading: fxFetchCategories.pending,
};

export default createComponent({
  name: "DashboardCategoriesPage",

  components: {
    BrLoader,
    BrButton,
    BrInput,
  },

  methods: {
    selectedCategory,
    fxRemoveCategory,
    fxEditCategory,
    fxCreateCategory,
    changedCategoryModel,
  },
}, store);
</script>

<template>
  <div class="categories">
    <div>
      <h2
        class="bold"
        style="margin-top: 15px;"
      >
        {{ !$selectedCategory ? 'Створити' : 'Редагувати' }} категорію
      </h2>

      <div class="row">
        <div class="col filter__control">
          <br-input
            :value="$categoryModel.title"
            @input="changedCategoryModel({
              key: 'title',
              value: $event
            })"
          >
            Назва категорії
          </br-input>
        </div>
        <div class="col filter__control">
          <br-input
            :value="$categoryModel.description"
            @input="changedCategoryModel({
              key: 'description',
              value: $event
            })"
          >
            Опис категорії
          </br-input>
        </div>
        <div class="col filter__control">
          <br-input
            :value="$categoryModel.path"
            @input="changedCategoryModel({
              key: 'path',
              value: $event
            })"
          >
            Шлях (трансліт)
          </br-input>
        </div>
        <div class="col filter__control">
          <br-input
            :value="$categoryModel.smallIcon"
            @input="changedCategoryModel({
              key: 'smallIcon',
              value: $event
            })"
          >
            Шлях до іконки навігації
          </br-input>
        </div>
        <div class="col filter__control">
          <br-input
            :value="$categoryModel.largeIcon"
            @input="changedCategoryModel({
              key: 'largeIcon',
              value: $event
            })"
          >
            Іконка для головної сторінки
          </br-input>
        </div>
        <div class="col filter__control">
          <br-input
            :value="$categoryModel.name"
            @input="changedCategoryModel({
              key: 'name',
              value: $event
            })"
          >
            Ім'я шляху ( для розробника )
          </br-input>
        </div>
      </div>

      <br-button
        type="primary"
        :is-loading="$isLoading"
        @click="!$selectedCategory ? fxCreateCategory($categoryModel) : fxEditCategory({
          etag: $selectedCategory.etag,
          id: $selectedCategory.id,
          model: $categoryModel,
        })"
      >
        <!-- @click="fxCreateCategory($categoryModel)" -->
        Зберегти
      </br-button>
    </div>
    <br-loader>
      <ul
        v-if="!$isLoading && $categories.length"
        class="row"
      >
        <li
          v-for="category in $categories"
          :key="category.id"
          class="col categories__item"
        >
          <div>
            <span class="bold">Назва категорії: </span>
            {{ category.title }}
          </div>
          <br-button
            type="text"
            @click="selectedCategory(category)"
          >
            Редагувати
          </br-button>

          <br-button
            type="text"
            @click="fxRemoveCategory({
              id: category.id, etag: category.etag
            })"
          >
            Видалити
          </br-button>
        </li>
      </ul>
    </br-loader>
  </div>
</template>

<style lang="scss" scoped>
.categories__item {
  @include col(5);
  border: 1px solid $--divider;
  padding-top: 15px;
  padding-bottom: 15px;
  margin: 15px;
}

.filter__control {
  border: 1px solid $--divider;
  padding-top: 15px;
  padding-bottom: 15px;
  margin: 15px;
  @include col(5);
}
</style>
