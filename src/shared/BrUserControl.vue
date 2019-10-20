<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BrUserControl",

  components: {
    cartIcon: () => import("@/assets/vector/cart.svg"),
    menuIcon: () => import("@/assets/vector/menu.svg"),
  },

  inheritAttrs: false,

  props: {
    icon: {
      type: String,
      default: "",
    },
    customTag: {
      type: String,
      default: null,
    },
  },

  computed: {
    tag(): string {
      return this.customTag || (this.$attrs.to ? "router-link" : "button");
    },
  },
});
</script>

<template>
  <component
    :is="tag"
    v-bind="$attrs"
    class="user-control"
    v-on="$listeners"
  >
    <div class="user-control__container">
      <div
        v-if="icon"
        class="user-control__icon"
      >
        <component :is="icon + 'Icon'" />
      </div>
      <span
        v-if="$slots.default"
        class="user-control__label"
      >
        <slot />
      </span>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.user-control {
  padding: 5px;
  display: block;
  color: $--primary-text;
  line-height: 1.27;
  margin: 0 2px;
}

.user-control__container {
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7px;
}

.user-control__label {
  font-size: 11px;
  height: 15px;
  display: inline-block;
  margin-top: auto;
}
</style>
