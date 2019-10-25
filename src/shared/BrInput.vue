<script lang="ts">
import createComponent from "@/core/component";

export default createComponent({
  name: "BrInput",

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
  },

  async mounted() {
    await this.$nextTick();
  },
});
</script>

<template>
  <div class="textfield">
    <label class="textfield__container">
      <span class="textfield__label body-text-14">
        <slot />
      </span>

      <input
        v-bind="$attrs"
        :type="type"
        :value="value"
        class="textfield__control"
        @input="({ target }) => $emit('input', target.value)"
      >
    </label>

    <div
      v-if="$slots.error"
      class="textfield__error"
    >
      <span class="body-text-14 textfield__error-message">
        <slot name="error" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.textfield {
  margin-bottom: 10px;
}

.textfield__label {
  display: block;
  color: $--secondary-text;
  margin-bottom: 6px;
}

.textfield__control {
  border: 1px solid rgba($color: $--textfield-divider, $alpha: 0.36);
  border-radius: 2px;
  background-color: rgba(216,216,216,0.15);
  height: 52px;
  padding: 0 23px;
  transition: background .2s linear;
  width: 100%;
  appearance: none;

  &:focus {
    @include focus;
  }

  &:not(.has-error) {
    &:hover {
      background: #fff;
    }
    &:focus {
      border-color: $--primary;
    }
  }

  &.has-error {
    border-color: $--error;
    background: rgba($color: $--error, $alpha: 0.05);
  }
}

.textfield__error {
  display: flex;
  align-items: center;
  margin-top: 6px;

  &::before {
    content: "";
    width: 18px;
    height: 18px;
    display: block;
    background: url("~@/assets/vector/error.pure.svg") center center no-repeat;
    background-size: 100%;
    margin-right: 6px;
  }
}

.textfield__error-message {
  color: $--error;
  line-height: 1;
}
</style>
