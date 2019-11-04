<script lang="ts">
import { PropType } from "vue";
import { Product, ProductModel } from "../services/products.service";
import createComponent from "@/core/component";

import { $filters } from "@/dashboard/modules/filters";
import { $categories } from "@/dashboard/modules/categories";
import {
  updatedModel, updateFilter, $model, fxCreateProduct, $selectedFilters,
  fxFetchFiltersByProduct, reset, fxEditProduct,
} from "@/dashboard/modules/products";
import Editor from "@/dashboard/modules/products/components/Editor.vue";
import { BrButton, BrInput } from "@/shared";
import { SelectedFilter } from "../services/types";

const store = {
  $filters,
  $categories,
  $selectedFilters,
  $isLoading: fxCreateProduct.pending,
  $model,
};
export default createComponent({
  name: "CreateNewProductPage",

  components: {
    BrButton,
    BrInput,
    Editor,
  },

  props: {
    id: {
      type: String,
      default: null,
    },
    product: {
      type: Object as PropType<Product>,
      default: null,
    },
  },

  data: () => ({
    selectedFilters: [] as SelectedFilter[],
  }),

  async created() {
    await this.$nextTick();
    if (this.product) {
      await this.fxFetchFiltersByProduct(this.product.id);

      this.selectedFilters = [...this.$selectedFilters];

      Object.entries(this.product)
        .forEach(([key, value]) => {
          this.updatedModel({
            key: key as keyof ProductModel,
            value,
          });
        });
    }
  },

  destroyed() {
    this.reset();
  },

  watch: {
    selectedFilters(value: SelectedFilter[]) {
      if (!this.product.id) {
        this.updateFilter(value);
      }
    },
  },

  methods: {
    reset,
    fxFetchFiltersByProduct,
    fxEditProduct,
    updatedModel,
    updateFilter,
    fxCreateProduct,
    async handleSubmit() {
      if (!this.product) {
        await this.fxCreateProduct(this.$model);
      } else {
        await this.fxEditProduct({
          model: this.$model,
          etag: this.product.etag,
          id: this.product.id,
          filters: this.selectedFilters,
        });
      }
      this.$router.push({
        name: "DashboardProductsPage",
      });
    },
    handleAddImage() {
      const images = [...this.$model.images];
      images.push({ imageUrl: "", alt: "" });
      this.updatedModel({
        key: "images",
        value: images,
      });
    },

    handleChangeImage(imageUrl: string, idx: number) {
      const images = [...this.$model.images];
      images[idx] = { ...images[idx], imageUrl };
      this.updatedModel({
        key: "images",
        value: images,
      });
    },

    handleRemoveImage(idx: number) {
      this.updatedModel({
        key: "images",
        value: this.$model.images.filter((_, i) => i !== idx),
      });
    },
  },

}, store);
</script>

<template>
  <div class="row">
    <div class="col filter__control">
      <br-input
        :value="$model.title"
        @input="updatedModel({
          key: 'title',
          value: $event
        })"
      >
        Назва
      </br-input>
    </div>
    <div class="col filter__control">
      <br-input
        type="number"
        :value="'' + $model.price"
        @input="updatedModel({
          key: 'price',
          value: $event
        })"
      >
        Ціна ( грн )
      </br-input>
    </div>
    <div class="col filter__control">
      <br-input
        :value="$model.code"
        @input="updatedModel({
          key: 'code',
          value: $event
        })"
      >
        Код товару
      </br-input>
    </div>
    <div class="col filter__control">
      <br-input
        :value="$model.thumbnail"
        @input="updatedModel({
          key: 'thumbnail',
          value: $event
        })"
      >
        Прев'ю ( url )
      </br-input>
    </div>

    <div class="col filter__control">
      <br-input
        :value="$model.brand"
        @input="updatedModel({
          key: 'brand',
          value: $event
        })"
      >
        Бренд
      </br-input>
    </div>
    <div class="col filter__control">
      <select
        :value="$model.categoryId"
        @input="updatedModel({
          key: 'categoryId',
          value: $event.target.value
        })"
      >
        <option
          selected
          disabled
        >
          Оберіть категорію
        </option>
        <option
          v-for="item in $categories"
          :key="item.id"
          :value="item.id"
        >
          {{ item.title }}
        </option>
      </select>

      <select
        v-model="selectedFilters"
        multiple
        style="height: 200px;"
      >
        <option
          v-for="item in $filters"
          :key="item.id"
          :value="({ id: item.id, etag: item.etag })"
        >
          {{ item.title }}
        </option>
      </select>
    </div>
    <div
      v-for="(image, key) in $model.images"
      :key="key"
      class="col"
    >
      <br-input
        :value="image.imageUrl"
        type="text"
        @input="handleChangeImage($event, key)"
      />
      <br-button
        type="text"
        @click="handleRemoveImage(key)"
      >
        Видалити
      </br-button>
    </div>

    <br-button
      @click="handleAddImage"
    >
      Додати зображення
    </br-button>
    <div class="col">
      <Editor
        v-if="!id || id && $model.description"
        v-model="$model.description"
      />
    </div>
    <div class="col">
      <br-button
        type="primary"
        :is-loading="$isLoading"
        @click="handleSubmit"
      >
        Зберегти
      </br-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  justify-content: center;
}
.filter__control {
  @include col(5);
  min-width: 45%;
  flex: 1 0;
  border: 1px solid $--divider;
  padding-top: 15px;
  padding-bottom: 15px;
  margin: 15px;
}
</style>
