<script lang="ts">
import createComponent from "@/core/component";
import { Product } from "@/services/products.service";
import { unlockBody, lockBody } from "@/lib/body-lock";
import { $isMobile } from "@/core/session";

import { $results, $isLoading, handleChange } from "../model";

import SearchTextfield from "./SearchTextfield.vue";
import SearchModal from "./SearchModal.vue";

const store = {
  $isMobile,
  $results,
  $isLoading,
};

export default createComponent({
  name: "Search",

  components: {
    SearchTextfield,
    SearchModal,
  },

  data: () => ({
    isOpened: false,
    query: "",
  }),

  computed: {
    results(): Product[] {
      return this.$results
        .filter(p => p.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1);
    },
  },

  watch: {
    query: "handleChange",
  },

  methods: {
    handleChange,
    handleToggle() {
      if (!this.$isMobile) {
        return;
      }

      this.isOpened = !this.isOpened;

      // eslint-disable-next-line no-unused-expressions
      this.isOpened ? lockBody() : unlockBody();
    },
  },
}, store);
</script>

<template>
  <div class="search">
    <search-textfield
      v-model="query"
      :readonly="$isMobile"
      :loading="$isLoading"
      :autocomplete="!$isMobile"
      :results="results"
      @toggle="handleToggle"
    />

    <transition
      name="slide-top"
      mode="out-in"
    >
      <search-modal
        v-if="$isMobile && isOpened"
        v-model="query"
        :results="results"
        :loading="$isLoading"
        @toggle="handleToggle"
      />
    </transition>
  </div>
</template>
