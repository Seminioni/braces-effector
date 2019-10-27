<script lang="ts">
import createComponent from "@/core/component";

import {
  $isFiltersLoading, $filters, selectedFilterGroup,
  fxRemoveFilter,
  $selectedFilterGroup,
} from "..";

import { BrLoader, BrButton } from "@/shared";

const store = {
  $isFiltersLoading,
  $filters,
  $selectedFilterGroup,
};

export default createComponent({
  name: "DashboardFiltersList",

  components: {
    BrLoader,
    BrButton,
  },

  methods: {
    selectedFilterGroup,
    fxRemoveFilter,
  },
}, store);
</script>

<template>
  <div class="filter-groups">
    <h2
      class="bold"
      style="margin-top: 15px;"
    >
      Фильтри
    </h2>

    <br-loader>
      <ul
        v-if="!$isFiltersLoading && $filters.length"
        class="row"
      >
        <li
          v-for="filter in $filters"
          :key="filter.id"
          class="col filter-groups__item"
        >
          <div>
            <span class="bold">Назва фільтру: </span>
            {{ filter.title }}
          </div>

          <br-button
            type="text"
            @click="selectedFilterGroup(filter)"
          >
            Редагувати
          </br-button>

          <br-button
            type="text"
            @click="fxRemoveFilter({ etag: filter.etag, id: filter.id })"
          >
            Видалити
          </br-button>
        </li>
      </ul>
    </br-loader>
  </div>
</template>

<style lang="scss" scoped>
.filter-groups__item {
  border: 1px solid $--divider;
  padding-top: 15px;
  padding-bottom: 15px;
  margin: 15px;

  @include col(5);
}
</style>
