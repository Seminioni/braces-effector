<script lang="ts">
import Vue from "vue";
import Dispatch from "./dispatch";

export default Dispatch.extend({
  name: "BrCheckbox",

  model: {
    prop: "checked",
    event: "change",
  },

  props: {
    value: {
      type: [String, Boolean],
      default: "",
    },
    checked: {
      type: [String, Boolean],
      default: "",
    },
  },

  data: () => ({
    checkboxGroup: null as Vue | null,
  }),

  computed: {
    isChecked(): boolean {
      const value = !this.checkboxGroup ? this.checked : this.$parent.$props.checked;

      if (!this.checkboxGroup) {
        return this.checked === this.value;
      }
      const parentChecked: any[] = this.$parent.$props.checked;
      return parentChecked.some(i => i === this.value);
    },
    name(): string {
      return !this.checkboxGroup ? this.$attrs.name : this.$parent.$props.groupName;
    },
  },

  created() {
    let parent = this.$parent;

    while (parent) {
      if (parent.$options.name !== "BrCheckboxGroup") {
        parent = parent.$parent;
      } else {
        this.checkboxGroup = parent;
        break;
      }
    }
  },

  methods: {
    handleChange() {
      if (!this.checkboxGroup) {
        this.$emit("change", this.isChecked ? "" : this.value);
      } else {
        const parentChecked: any[] = this.$parent.$props.checked;
        this.dispatch({
          componentName: "BrCheckboxGroup",
          eventName: "change",
          params: [this.isChecked
            ? parentChecked.filter(i => i !== this.value)
            : [...parentChecked, this.value],
          ],
        });
      }
    },
  },
});
</script>

<template>
  <label
    class="br-checkbox clearfix"
  >
    <input
      type="checkbox"
      :value="value"
      :checked="isChecked"
      @change="handleChange"
    >
    <div
      tabindex="0"
      class="br-checkbox__control"
    />
    <span class="br-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<style lang="scss" scoped>
.clearfix {
  &::before, &::after {
    content: "";
    clear: both;
    display: table;
  }
}

.br-checkbox {
  cursor: pointer;
  display: inline-flex;
  width: 100%;

  input {
    @include visually-hidden;

    &:checked + .br-checkbox__control {
      background-color: $--primary;
      background-image: url();
      opacity: 1;
      border-color: $--primary;

      &::before {
        display: block;
      }


      &:focus {
        @include focus;
      }
    }
  }
}

.br-checkbox__control {
  width: 18px;
  height: 18px;
  border: 1px solid #979797;
  border-radius: 2px;
  opacity: 0.58;
  position: relative;
  margin-right: 9px;
  float: left;

  &::before {
    content: '';
    position: absolute;
    display: none;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 11px;
    height: 8px;
    background: url("~@/assets/vector/check.pure.svg");
  }


  &:focus {
    @include focus;
  }
}

.br-checkbox__label {
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.1px;
  color: $--primary-text;
}
</style>
