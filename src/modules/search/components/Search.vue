<script lang="ts">
import Vue from "vue";
import { createStoreObject } from "effector";

import { Product } from "@/services/products.service";
import { unlockBody, lockBody } from "@/lib/body-lock";
import { $isMobile } from "@/core/session";
import { $results, $isLoading, handleChange } from "../model";

import SearchTextfield from "./SearchTextfield.vue";
import SearchModal from "./SearchModal.vue";

const store = createStoreObject({
  $isMobile,
  $results,
  $isLoading,
});

export default Vue.extend({
  name: "Search",

  effector() {
    return store;
  },

  components: {
    SearchTextfield,
    SearchModal,
  },

  data: () => ({
    isOpened: false,
    query: "",
    state: {} as State<typeof store>,
  }),

  computed: {
    results(): Product[] {
      return this.state.$results
        .filter(p => p.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1);
    },
  },

  watch: {
    query: "handleChange",
  },

  methods: {
    handleChange,
    handleToggle() {
      if (!this.state.$isMobile) {
        return;
      }

      this.isOpened = !this.isOpened;

      // eslint-disable-next-line no-unused-expressions
      this.isOpened ? lockBody() : unlockBody();
    },
  },
});
</script>

<template>
  <div class="search">
    <search-textfield
      v-model="query"
      :readonly="state.$isMobile"
      :loading="state.$isLoading"
      :autocomplete="!state.$isMobile"
      :results="results"
      @toggle="handleToggle"
    />

    <transition
      name="slide-top"
      mode="out-in"
    >
      <search-modal
        v-if="state.$isMobile && isOpened"
        v-model="query"
        :results="results"
        :loading="state.$isLoading"
        @toggle="handleToggle"
      />
    </transition>
  </div>
</template>
