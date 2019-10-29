<script lang="ts">
import createComponent from "@/core/component";

import {
  $isFiltersLoading, $filters,
  fxRemoveFilter, selectedFilter,
} from "..";
import { $filterGroups } from "../filter-group";

import { BrLoader, BrButton } from "@/shared";

const store = {
  $isFiltersLoading,
  $filters,
  $filterGroups,
};

export default createComponent({
  name: "DashboardFiltersList",

  components: {
    BrLoader,
    BrButton,
  },

  methods: {
    selectedFilter,
    filterGroup(id: string) {
      return this.$filterGroups.find(f => f.id === id);
    },
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

          <div>
            <span class="bold">Фільтр-група: </span>
            {{ filterGroup(filter.filterGroupId).title }}
          </div>

          <br-button
            type="text"
            @click="selectedFilter(filter)"
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
