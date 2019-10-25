<script lang="ts">
import { PropType } from "vue";

import createComponent from "@/core/component";
import closeIcon from "@/assets/vector/close.svg";
import {
  BrCheckboxGroup, BrCheckbox, BrButton, BrLoader,
} from "@/shared";
import { Dictionary } from "@/lib/types";
import { FilterView, Filter } from "@/services/products.service";

import { $selectedFilters } from "../model";

const store = {
  $selectedFilters,
};

export default createComponent({
  name: "Filters",

  components: {
    closeIcon,
    BrCheckboxGroup,
    BrCheckbox,
    BrButton,
  },

  props: {
    filters: {
      type: Object as PropType<Dictionary<FilterView>>,
      required: true,
    },
    filterItems: {
      type: Object as PropType<Dictionary<Filter>>,
      required: true,
    },
  },

  methods: {
    handleRemoveFilter(id: string) {
      this.$emit("update-route", {
        ...this.$selectedFilters,
        filters: this.$selectedFilters.filters!.filter(filterId => filterId !== id),
      });
    },
    handleCheckbox(filters: string[]) {
      this.$emit("update-route", {
        ...this.$selectedFilters,
        filters,
      });
    },
  },
}, store);
</script>

<template>
  <aside class="filters">
    <div class="filters__topbar">
      <button
        class="filters__close"
        @click="$emit('toggle')"
      >
        <close-icon fill="#fff" />
      </button>
    </div>

    <div class="filters__body">
      <ul class="filters__list">
        <li
          v-if="$selectedFilters.filters.length"
          class="filters__item"
        >
          <h3 class="filters__title bold">
            Фільтри
          </h3>

          <ul class="selected-filters__list">
            <li
              v-for="filterId in $selectedFilters.filters"
              :key="filterId"
              class="selected-filters__item"
            >
              <br-button
                type="text"
                class="selected-filters__btn body-text-14"
                @click="handleRemoveFilter(filterId)"
              >
                {{ filterItems[filterId].title }}

                <close-icon
                  width="15"
                  fill="#0070c8"
                />
              </br-button>
            </li>
          </ul>
        </li>
        <li
          v-for="filter in filters.filterDescription"
          :key="filter.filterGroup.id"
          class="filters__item"
        >
          <h3 class="filters__title bold">
            {{ filter.filterGroup.title }}
          </h3>

          <br-checkbox-group
            :checked="$selectedFilters.filters"
            :group-name="filter.filterGroup.id"
            @change="handleCheckbox"
          >
            <br-checkbox
              v-for="filterId in filter.filters"
              :key="filterId"
              :value="filterItems[filterId].id"
            >
              {{ filterItems[filterId].title }}
            </br-checkbox>
          </br-checkbox-group>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.filters {
  width: 100%;
  height: 100vh;
  background: #fff;

  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  z-index: 999;

  @include medium {
    display: block !important;
    position: static;
    height: auto;
  }
}

.filters__topbar {
  background: rgba(0,0,0,0.8);
  height: 46px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  margin-bottom: 14px;

  @include medium {
    display: none;
  }
}

.filters__body {
  padding: 0 15px;
  flex: 1 0;
  overflow-y: auto;
  padding-bottom: 57px;

  @include medium {
    padding: 0;
    padding-bottom: 0;
    flex: none;
  }
}

.filters__close {
  font-size: 0;
  padding: 5px;
}

.filters__item {
  &:not(:first-child) {
    border-top: 1px solid $--divider;
    padding-top: 25px;
  }
  padding-bottom: 25px;
  padding-right: 10px;
}

.filters__title {
  margin-bottom: 5px;
}

.selected-filters__list {
  display: flex;
  flex-wrap: wrap;
}

.selected-filters__btn {
  margin: 0;
  /deep/ span {
    text-decoration: none !important;
    color: $--primary;
    display: flex;
    align-items: center;
  }
}
</style>
