<script lang="ts">
import Vue, { PropType } from "vue";

import BrLoader from "./BrLoader.vue";

type Type = "default" | "primary" | "text" | "transparent";

export default Vue.extend({
  name: "BrButton",

  components: {
    BrLoader,
  },

  inheritAttrs: false,

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<Type>,
      default: "default",
    },
  },

  computed: {
    tag(): string {
      return this.$attrs.to ? "router-link" : "button";
    },
    isWhiteLoader(): string {
      return this.type === "primary" ? "#fff" : "#0070c8";
    },
  },
});
</script>

<template>
  <component
    :is="tag"
    :class="[type]"
    :disabled="isLoading || $attrs.disabled"
    v-bind="$attrs"
    class="action"
    v-on="$listeners"
  >
    <span v-show="!isLoading">
      <slot />
    </span>

    <br-loader
      v-if="isLoading"
      size="small"
      :color="isWhiteLoader"
    />
  </component>
</template>

<style lang="scss" scoped>
.action {
  border-radius: 23px;
  padding: 0 24px 1px 24px;
  position: relative;
  height: 46px;
  min-width: 110px;
  margin: 5px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;

  background: #f3f3f3;
  font-size: 12px;
  color: $--primary-text;
  font-weight: 500;

  &[disabled] {
    color: $--primary-text;
    cursor: default;
    background: #d0d0d0;
  }

  &[fullwidth] {
    width: 100%;
  }

  &.primary {
    background: $--primary;
    letter-spacing: 0.3px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;

    &[disabled] {
      opacity: 0.6;
    }
  }

  &:focus {
    @include focus;
  }

  &.text {
    background: none;
    padding: 0;
    min-width: auto;
    height: auto;
    font-size: 12px;
    color: $--secondary-text;
    border-radius: 0;
    padding: 3px;

    span {
      text-decoration: underline;
    }

    &:hover {
      span {
        text-decoration: none;
      }
    }
  }

  &.transparent {
    background: transparent;
    border: 1px solid $--primary-text;
    height: 36px;
    min-width: 130px;

    > span {
      font-weight: 600;
      white-space: nowrap;
    }

    &:not([disabled]) {
      &:hover {
        background: $--primary;
        color: #fff;
        border-color: $--primary;
      }
    }

  }

  &.circle {
    width: 35px;
    min-width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid $--primary-text;
    padding: 0;

    &[disabled] {
      border-width: 1px;
      cursor: default;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
