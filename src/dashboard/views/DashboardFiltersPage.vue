<script lang="ts">
import createComponent from "@/core/component";

import DashboardFilterGroupList from "@/dashboard/modules/filters/shared/DashboardFilterGroupList.vue";
import DashboardFiltersList from "@/dashboard/modules/filters/shared/DashboardFiltersList.vue";
import {
  changedFilterGroup, $filterGroupModel, fxCreateFilterGroup, $selectedFilterGroup,
  fxEditFilterGroup,
} from "@/dashboard/modules/filters";
import { BrInput, BrButton } from "@/shared";


const store = {
  $filterGroupModel,
  $selectedFilterGroup,
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
    fxEditFilterGroup,
    fxCreateFilterGroup,
    changedFilterGroup,
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

    <dashboard-filter-group-list />
    <dashboard-filters-list />
  </div>
</template>

<style lang="scss" scoped>
.filter__control {
  margin-top: 15px;
}
</style>
