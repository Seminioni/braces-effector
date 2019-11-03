<script lang="ts">
import { PropType } from "vue";

import createComponent from "@/core/component";

import BrButton from "./BrButton.vue";

export default createComponent({
  name: "BrTab",

  components: {
    BrButton,
  },

  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<"tabs" | "router">,
      default: "tabs",
    },
    navItems: {
      type: Array as PropType<{ label: string; to: string }[]>,
      default: () => [],
    },
  },

  data: () => ({
    navs: [] as string[],
  }),

  computed: {
    items(): string[] | { label: string; to: string }[] {
      return this.type === "tabs" ? this.navs : this.navItems;
    },
    selected() {
      return this.navItems.find(i => i.to === this.$route.path);
    },
  },

  watch: {
    value(value: string) {
      this.$emit("change", value);
    },
  },

  async created() {
    await this.$nextTick();
    if (this.$slots.default) {
      const paneSlots = this.$slots.default
        .filter(
          // @ts-ignore
          vnode => vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === "BrTabItem",
        );
      this.navs = paneSlots
        .map(({ componentOptions }) => (componentOptions!.propsData! as any).label);
    }
  },

  methods: {
    handleClick(currentTab: string) {
      this.$emit("input", currentTab);
    },
    handleChange(currentTab: string) {
      if (this.type === "router") {
        this.$router.push(currentTab);
      }

      this.$emit("input", currentTab);
    },
  },
});
</script>

<template>
  <div class="tab">
    <header class="tab__header">
      <ul
        ref="tabList"
        class="tab__list"
      >
        <li
          v-for="(item, key) in items"
          :key="key"
          class="tab__item"
          :class="{ active: type !== 'router' ? item === value : item.to === $route.path }"
          @click="handleClick(item)"
        >
          <template v-if="!item.hidden">
            <br-button
              v-if="type !== 'router'"
              class="tab__button"
              type="text"
            >
              {{ item }}
            </br-button>
            <br-button
              v-else
              class="tab__button"
              type="text"
              :to="item.to"
            >
              {{ item.label }}
            </br-button>
          </template>
        </li>
      </ul>

      <div class="tab__select-wrap">
        <select
          :value="value"
          class="tab__select"
          @change="({ target }) => handleChange(target.value)"
        >
          <option
            value=""
            selected
            disabled
          >
            {{ selected.label }}
          </option>
          <option
            v-for="(item, key) in items"
            :key="key"
            :selected="item.to === $route.path && 'selected'"
            :value="item.to"
          >
            {{ item.label }}
          </option>
        </select>

        <div class="tab__select-arrow">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </header>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tab__header {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: auto;

  @include small {
    border-bottom: 1px solid $--divider;
  }
}

.tab__list {
  display: none;
  position: relative;
  padding-top: 5px;
  width: 100%;
  justify-content: center;

  @include small {
    display: flex;
  }
}

.tab__select-wrap {
  position: relative;
  width: 100%;
  margin-bottom: 25px;


  @include small {
    display: none;
  }
}

.tab__select {
  display: block;
  appearance: none;
  width: 100%;
  background: #fff;
  border: 1px solid $--divider;
  border-radius: 3px;
  text-align: center;
  padding: 10px 20px;

  option {
    text-align: center;
  }

  &:focus {
    outline: none;
  }
}

.tab__select-arrow {
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  padding: 0 10px;

  svg {
    width: 20px;
    height: 20px;
  }

  @include small {
    display: none;
  }
}

.tab__item {
  &:not(:last-child) {
    margin-right: 33px;
  }

  border-bottom: 4px solid transparent;
  transition: border-color .2s linear;

  &.active {
    border-color: $--primary;
  }
}

select option[disabled] {
  display: none;
}
</style>


<style lang="scss">
.tab__button {
  &.action.text {
    span {
      text-decoration: none;
    }
    font-size: 14px;
    padding: 12px 0;
    margin-bottom: 3px;
  }
}
</style>
