<script lang="ts">
import createComponent from "@/core/component";
import minIcon from "@/assets/vector/min.svg";
import maxIcon from "@/assets/vector/plus.svg";

export default createComponent({
  name: "BrInputNumber",

  components: {
    minIcon,
    maxIcon,
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 9999,
    },
  },

  methods: {
    increase() {
      if (this.value < this.max) {
        const value = this.value + 1;
        this.$emit("input", value);
      }
    },
    decrease() {
      if (this.value > this.min) {
        const value = this.value - 1;
        this.$emit("input", value);
      }
    },
  },
});
</script>

<template>
  <div class="number">
    <button
      class="number__button minus"
      :disabled="value === min || $attrs.disabled"
      @click="decrease"
    >
      <minIcon />
    </button>
    <span class="number__count">
      {{ value }}
    </span>
    <button
      class="number__button plus"
      :disabled="value === max || $attrs.disabled"
      @click="increase"
    >
      <maxIcon />
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .number {
    border: 1px solid #e5e5e5;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 18px;
    border-radius: 23px;
    margin: 5px 0;
    min-width: 96px;

    &:focus-within {
      @include focus;
    }
  }
  .number__count {
    margin: 0 13px;
    font-size: 14px;
    line-height: 16px;
    color: #0d0e10;
  }
  .number__button {

    &:focus {
      @include focus;
    }

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 20px !important;
    height: 20px !important;

    &[disabled] {
      opacity: 0.5;
      cursor: default;
    }
  }
</style>
