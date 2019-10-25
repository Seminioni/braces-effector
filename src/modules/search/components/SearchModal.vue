<script lang="ts">
import Vue, { PropType } from "vue";
import createComponent from "@/core/component";
import { Product } from "@/services/products.service";
import closeIcon from "@/assets/vector/close.svg";

import { reset } from "../model";

import SearchTextfield from "./SearchTextfield.vue";

export default createComponent({
  name: "SearchModal",

  components: {
    SearchTextfield,
    closeIcon,
  },

  model: {
    prop: "query",
    event: "input",
  },

  props: {
    results: {
      type: Array as PropType<Product[]>,
      default: () => [],
    },
    query: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  destroyed() {
    this.$emit("input", "");
    this.reset();
  },

  mounted() {
    const search = (this.$refs.search as Vue).$el;
    search.querySelector("input")!.focus();
  },

  methods: {
    reset,
  },
});
</script>

<template>
  <div class="search-modal">
    <div class="search-modal__topbar">
      <button
        class="search-modal__close"
        @click="$emit('toggle')"
      >
        <close-icon fill="#fff" />
      </button>
    </div>

    <div class="search-modal__body">
      <header class="search-modal__header">
        <search-textfield
          ref="search"
          :query="query"
          :loading="loading"
          @input="$emit('input', $event)"
        />
      </header>

      <ul class="search-modal__results-list">
        <li
          v-for="product in results"
          :key="product.id"
          class="search-modal__results-item"
          @click="$emit('toggle')"
        >
          <router-link
            :to="product.categoryProductUrl"
            class="body-text-14 search-modal__results-link"
          >
            {{ product.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-modal {
  width: 100%;
  height: 100vh;
  background: #fff;

  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  z-index: 999;
}

.search-modal__topbar {
  background: rgba(0,0,0,0.8);
  height: 46px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  margin-bottom: 14px;
}

.search-modal__close {
  font-size: 0;
  padding: 5px;
}

.search-modal__body {
  padding: 0 14px;
  flex: 1 0;
  height: 100%;
  padding-bottom: 55px;

  display: flex;
  flex-direction: column;
}

.search-modal__header {
  margin-bottom: 20px;
}

.search-modal__results-list {
  padding: 0 20px;
  flex: 1 0;
  overflow-y: auto;
}

.search-modal__results-item {
  margin-bottom: 18px;
}
</style>
