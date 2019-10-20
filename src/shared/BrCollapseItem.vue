<script lang="ts">
import Vue from "vue";

import Dispatch from "./dispatch";
import plusIcon from "@/assets/vector/plus.svg";

export default Dispatch.extend({
  name: "BrCollapseItem",

  components: {
    plusIcon,
  },

  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    container: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    parent: null as null | Vue,
  }),

  computed: {
    isActive(): boolean {
      if (!this.parent) {
        return false;
      }

      const { activeNames } = this.parent.$data;

      return activeNames.indexOf(this.name) > -1;
    },
  },

  created() {
    let parent = this.$parent;

    while (parent) {
      if (parent.$options.name !== "BrCollapse") {
        parent = parent.$parent;
      } else {
        this.parent = parent;
        break;
      }
    }
  },

  mounted() {
    const body = this.$refs.body as HTMLElement;

    body.style.height = `${body.scrollHeight}px`;
  },

  methods: {
    handleClick() {
      this.dispatch({ componentName: "BrCollapse", eventName: "item-click", params: [this.name] });
    },
    beforeEnter(el: HTMLElement) {
      el.style.height = "0";
    },
    enter(el: HTMLElement) {
      el.style.height = `${el.scrollHeight}px`;
    },
    beforeLeave(el: HTMLElement) {
      el.style.height = `${el.scrollHeight}px`;
    },
    leave(el: HTMLElement) {
      el.style.height = "0";
    },
  },
});
</script>

<template>
  <div
    role="tab"
    class="collapse__item"
  >
    <header class="collapse__header">
      <div :class="{ container: container }">
        <div
          v-if="$slots.title"
          class="collapse__title"
          tabindex="0"
          @click="handleClick"
          @keyup.enter="handleClick"
          @keyup.space="handleClick"
        >
          <slot name="title" />

          <div
            class="collapse__icon"
            :class="{ opened: isActive }"
          >
            <plus-icon />
          </div>
        </div>
      </div>
    </header>

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div
        v-show="isActive"
        ref="body"
        class="collapse__body"
      >
        <div :class="{ container }">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.collapse__item {
  border-top: 1px solid $--divider;
}

.collapse__title {
  cursor: pointer;
  position: relative;
  padding: 30px 0;

  &:focus {
    @include focus;
  }
}

.collapse__icon {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  transition: transform .2s ease-in-out;

  &.opened {
    transform: translateY(-50%) rotate(45deg);
  }

}

.collapse__body {
  overflow: hidden;
  transition: height .2s linear;
}
</style>
