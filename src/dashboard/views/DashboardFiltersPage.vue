<script lang="ts">
import createComponent from "@/core/component";

import DashboardFilterGroupList from "@/dashboard/modules/filters/shared/DashboardFilterGroupList.vue";
import DashboardFiltersList from "@/dashboard/modules/filters/shared/DashboardFiltersList.vue";
import {
  changedFilterGroup, $filterGroupModel, fxCreateFilterGroup, $selectedFilterGroup,
  fxEditFilterGroup, $filterGroups,
} from "@/dashboard/modules/filters/filter-group";
import {
  changedFilter, $filterModel, fxCreateFilter, $selectedFilter,
  $isFiltersLoading, fxEditFilter,
} from "@/dashboard/modules/filters";
import { BrInput, BrButton } from "@/shared";


const store = {
  $isFiltersLoading,
  $filterModel,
  $filterGroups,
  $filterGroupModel,
  $selectedFilterGroup,
  $selectedFilter,
  $isLoadingGroup: fxCreateFilterGroup.pending,
};

export default createComponent({
  name: "DashboardFiltersPage",

  components: {
    DashboardFilterGroupList,
    DashboardFiltersList,
    BrInput,
    BrButton,
  },

  methods: {
    fxEditFilter,
    fxEditFilterGroup,
    fxCreateFilterGroup,
    fxCreateFilter,
    changedFilterGroup,
    changedFilter,
  },
}, store);
</script>

<template>
  <div class="page filters">
    <div>
      <h2
        class="bold"
        style="margin-top: 15px;"
      >
        {{ !$selectedFilterGroup ? 'Створити' : 'Редагувати' }} фільтр-групу
      </h2>

      <div class="filter__control">
        <br-input
          :value="$filterGroupModel"
          @input="changedFilterGroup"
        >
          Назва фільтр-групи
        </br-input>

        <br-button
          type="primary"
          :is-loading="$isLoadingGroup"
          @click="!$selectedFilterGroup ? fxCreateFilterGroup($filterGroupModel) : fxEditFilterGroup({
            etag: $selectedFilterGroup.etag,
            id: $selectedFilterGroup.id,
            model: $filterGroupModel,
          })"
        >
          Зберегти
        </br-button>
      </div>
    </div>

    <div>
      <h2
        class="bold"
        style="margin-top: 15px;"
      >
        {{ !$selectedFilter ? 'Створити' : 'Редагувати' }} фільтр
      </h2>

      <div class="filter__control">
        <br-input
          :value="$filterModel.title"
          @input="changedFilter({
            key: 'title',
            value: $event
          })"
        >
          Назва фільтру
        </br-input>
        <div>
          <select
            :value="$filterModel.filterGroupId"
            @change="changedFilter({
              key: 'filterGroupId',
              value: $event.target.value
            })"
          >
            <option
              value=""
              selected
              disabled
            >
              Оберіть фільтр-групу
            </option>
            <option
              v-for="item in $filterGroups"
              :key="item.id"
              :value="item.id"
            >
              {{ item.title }}
            </option>
          </select>
        </div>

        <br-button
          type="primary"
          :is-loading="$isFiltersLoading"
          @click="!$selectedFilter ? fxCreateFilter($filterModel) : fxEditFilter({
            etag: $selectedFilter.etag,
            id: $selectedFilter.id,
            model: $filterModel,
          })"
        >
          Зберегти
        </br-button>
      </div>
    </div>

    <dashboard-filter-group-list />
    <dashboard-filters-list />
  </div>
</template>

<style lang="scss" scoped>
.filter__control {
  margin-top: 15px;
}
</style>
