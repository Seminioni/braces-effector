import Vue from "vue";
import DispatchPayload from "./types";

export default Vue.extend({
  methods: {
    dispatch({ componentName, eventName, params }: DispatchPayload) {
      let parent = this.$parent || this.$root;
      let { name } = parent.$options;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          // eslint-disable-next-line prefer-destructuring
          name = parent.$options.name;
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName, ...params]);
      }
    },
  },
});
