<script lang="ts">
import createComponent from "@/core/component";

export default createComponent({
  name: "BrCheckboxGroup",

  inheritAttrs: false,

  model: {
    prop: "checked",
    event: "change",
  },

  props: {
    checked: {
      type: Array,
      default: () => [],
    },
    groupName: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  render(h) {
    return h("div", [this.$slots.default]);
  },
});
</script>
