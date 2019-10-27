<script lang="ts">
import createComponent from "@/core/component";

import {
  $isFIlterGroupsLoading, $filterGroups, selectedFilterGroup,
  fxRemoveFilterGroup,
  $selectedFilterGroup,
} from "..";

import { BrLoader, BrButton } from "@/shared";

const store = {
  $isFIlterGroupsLoading,
  $filterGroups,
  $selectedFilterGroup,
};

export default createComponent({
  name: "DashboardFilterGroupList",

  components: {
    BrLoader,
    BrButton,
  },

  methods: {
    selectedFilterGroup,
    fxRemoveFilterGroup,
  },
}, store);
</script>

<template>
  <div class="filter-groups">
    <h2
      class="bold"
      style="margin-top: 15px;"
    >
      Фильтр-групи
    </h2>

    <br-loader>
      <ul
        v-if="!$isFIlterGroupsLoading && $filterGroups.length"
        class="row"
      >
        <li
          v-for="group in $filterGroups"
          :key="group.id"
          class="col filter-groups__item"
        >
          <div>
            <span class="bold">Назва групи: </span>
            {{ group.title }}
          </div>

          <br-button
            type="text"
            @click="selectedFilterGroup(group)"
          >
            Редагувати
          </br-button>

          <br-button
            type="text"
            @click="fxRemoveFilterGroup({ etag: group.etag, id: group.id })"
          >
            Видалити
          </br-button>
        </li>
      </ul>
    </br-loader>
    this is list
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
