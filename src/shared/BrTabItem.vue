<script lang="ts">
import Vue from "vue";

export default Vue.extend({
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
