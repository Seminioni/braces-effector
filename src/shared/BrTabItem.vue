<script lang="ts">
import createComponent from "@/core/component";

export default createComponent({
  name: "BrTabItem",

  props: {
    label: {
      type: String,
      required: true,
    },
  },

  computed: {
    isActive(): boolean {
      const { value } = this.$parent.$props;
      return this.label === value;
    },
  },
});
</script>

<template>
  <div
    v-show="isActive"
    class="tab-item"
  >
    <slot />
  </div>
</template>
