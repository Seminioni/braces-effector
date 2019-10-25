<script lang="ts">
import { PropType } from "vue";

import createComponent from "@/core/component";

export default createComponent({
  name: "Breadcrumbs",

  props: {
    breadcrumbs: {
      type: Array as PropType<{ label: string; path: string }[]>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="breadcrumbs container">
    <ul class="breadcrumbs__list">
      <li
        v-for="(item, key) in breadcrumbs"
        :key="key"
        class="breadcrumbs__item"
      >
        <component
          :is="item.path ? 'router-link' : 'span'"
          :to="item.path"
          class="body-text-neutral bold breadcrumbs__link"
        >
          {{ item.label }}
        </component>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
}

.breadcrumbs__item {
  display: flex;
  align-items: center;

  &:not(:first-child) {
    &::before {
      content: "";
      width: 10px;
      height: 10px;
      background: url("~@/assets/vector/arrow_down.pure.svg") center center no-repeat;
      background-size: 15px;
      display: inline-block;
      transform: rotate(-90deg) translateY(2px);
      margin: 0 7px 0 5px;
    }
  }
}

.breadcrumbs__link {
  padding: 11px 0;
  display: block;
}

a.breadcrumbs__link {
  color: $--primary-text;

  &:hover {
    color: $--primary;
  }
}
</style>
