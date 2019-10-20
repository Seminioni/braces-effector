<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "BrCollapse",

  props: {
    value: {
      type: Array as PropType<string[] | number[]>,
      default: () => [],
    },
  },

  data: () => ({
    activeNames: [] as (string | number)[],
  }),

  created() {
    this.activeNames = [...this.activeNames, ...this.value];
    this.$on("item-click", this.handleItemClick);
  },

  methods: {
    handleItemClick(item: string | number) {
      const activeNames = this.activeNames.slice(0);
      const idx = activeNames.indexOf(item);

      if (idx > -1) {
        activeNames.splice(idx, 1);
      } else {
        activeNames.push(item);
      }
      this.activeNames = activeNames;
    },
  },
});
</script>

<template>
  <div
    class="collapse"
    role="tablist"
    aria-multiselectable="true"
  >
    <slot />
  </div>
</template>
