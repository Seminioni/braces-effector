<script lang="ts">
import Vue from "vue";
import Dispatch from "./dispatch";

export default Dispatch.extend({
  name: "BrRadio",

  inheritAttrs: false,

  model: {
    prop: "checked",
    event: "change",
  },

  props: {
    checked: {
      type: [String, Boolean, Number],
      default: "",
    },
    value: {
      type: [String, Boolean, Number],
      default: "",
    },
  },

  data: () => ({
    radioGroup: null as Vue | null,
  }),

  computed: {
    isChecked(): boolean {
      const value = !this.radioGroup ? this.checked : this.$parent.$props.checked;
      return value === this.value;
    },
    name(): string {
      return !this.radioGroup ? this.$attrs.name : this.$parent.$props.groupName;
    },
  },

  created() {
    let parent = this.$parent;

    while (parent) {
      if (parent.$options.name !== "BrRadioGroup") {
        parent = parent.$parent;
      } else {
        this.radioGroup = parent;
        break;
      }
    }
  },

  methods: {
    handleChange() {
      if (!this.radioGroup) {
        this.$emit("change", this.value);
      } else {
        this.dispatch({
          componentName: "BrRadioGroup",
          eventName: "change",
          params: [this.value],
        });
      }
    },
  },
});
</script>


<template>
  <label class="radio">
    <input
      v-bind="$attrs"
      :name="name"
      :checked="isChecked"
      type="radio"
      class="radio__input"
      @change="handleChange"
    >

    <span
      class="radio__control"
      aria-hidden="true"
    />

    <span class="radio__label">
      <slot />
    </span>
  </label>
</template>

<style lang="scss" scoped>
.radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin: 5px;
}

.radio__input {
  @include visually-hidden;

  &:checked + .radio__control {
    background: $--primary;
    border-color: $--primary;

    &::after {
      display: block;
    }
  }

  &:focus + .radio__control {
    @include focus;
  }

  &:disabled + .radio__control {
    opacity: 0.5;
  }
}

.radio__control {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid #979797;
  border-radius: 50%;
  position: relative;
  margin-right: 10px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: #fff;
    border-radius: 50%;

    width: 10px;
    height: 10px;
    display: none;
  }
}

.radio__label {
  color: $--primary-text;
  font-size: 14px;
  line-height: 1.4;
}
</style>
