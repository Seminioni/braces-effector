<script lang="ts">
import Vue from "vue";

export default Vue.extend({
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
