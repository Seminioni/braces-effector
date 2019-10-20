<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BrBadge",

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<template functional>
  <span
    class="badge"
    :class="data.staticClass"
  >
    <div class="badge__relative">
      <slot />
      <span
        v-if="props.count"
        class="badge__count"
      >
        {{ props.count }}
      </span>
    </div>

  </span>
</template>

<style lang="scss" scoped>
  .badge {
    display: inline-block;
  }

  .badge__relative {
    position: relative;
  }

  .badge__count {
    position: absolute;
    right: 5px;
    top: 1px;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: $--primary;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 9px;
    line-height: 11px;
    font-weight: 700;
  }
</style>
