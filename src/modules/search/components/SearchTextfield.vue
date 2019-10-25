<script lang="ts">
import { PropType } from "vue";

import createComponent from "@/core/component";
import { BrLoader } from "@/shared";
import { Product } from "@/services/products.service";

export default createComponent({
  name: "SearchTextfield",

  components: {
    BrLoader,
  },

  inheritAttrs: false,

  model: {
    prop: "query",
    event: "input",
  },

  props: {
    query: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
    results: {
      type: Array as PropType<Product[]>,
      default: () => [],
    },
  },

  data: () => ({
    isFocused: false,
  }),

  computed: {
    isResultShown(): boolean {
      return this.isFocused && !!this.results.length && this.autocomplete && !!this.query.length;
    },
  },
  methods: {
    handleClick(ev: any) {
      this.$emit("input", ev.target.textContent.trim());
      this.isFocused = false;
    },
  },
});
</script>

<template>
  <div
    class="search-textfield"
    :class="{ autocomplete }"
    tabindex="-1"
    @focus="isFocused = true"
    @blur="isFocused = false"
    @click="$emit('toggle')"
  >
    <div
      class="search-textfield__input-wrapper"
      :class="{ pulse: loading, 'with-result': isResultShown }"
    >
      <input
        v-bind="$attrs"
        type="text"
        class="search-textfield__input"
        :class="{ autocomplete }"
        placeholder="Пошук..."
        :value="query"
        @input="$emit('input', $event.target.value)"
        @focus="isFocused = true"
      >
      <br-loader
        v-if="loading && autocomplete"
        class="search-textfield__loader"
      />
    </div>


    <ul
      v-if="isResultShown"
      class="search-modal__results-list"
    >
      <li
        v-for="product in results"
        :key="product.id"
        class="search-modal__results-item"
        @click.capture="handleClick"
      >
        <router-link
          :to="product.categoryProductUrl"
          class="body-text-14 search-modal__results-link"
        >
          {{ product.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.search-textfield {
  position: relative;

  &:focus {
    outline: none;
  }

  &.autocomplete {
    min-height: 42px;
    border-radius: 32px;

    .search-textfield__input-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      z-index: 999;
      border-top-left-radius: 52px;
      border-top-right-radius: 52px;
    }
  }
}

.search-textfield__input-wrapper {
  background: #fff;
  position: relative;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;

    background: url('~@/assets/vector/search.pure.svg');
    background-size: 100%;

    width: 19px;
    height: 18px;

    transform: translateY(-50%);

    z-index: 9;
  }


  &.pulse {
    &::before {
      animation: pulse 1s linear infinite alternate;
    }
  }
}

.search-textfield__loader {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
}

.search-textfield__input {
  width: 100%;
  border: none;
  box-shadow: none;

  background: $--light-background;
  padding: 9px 45px 9px 20px;
  border-radius: 32px;

  font-size: 16px;

  @include placeholder {
    font-size: 16px;
    color: $--secondary-text;

    @include large {
      font-size: 13px;
      line-height: 1.23;
    }
  }

  &:focus {
    outline: none;
  }

  &:not(.autocomplete) {
    &:focus {
      @include focus;
    }
  }

  @include large {
    font-size: 13px;
    padding: 11px 45px 12px 20px;
  }
}


.with-result {
  input {
    border-bottom: 1px solid $--divider;
    background: #fff;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.search-modal__results-list {
  padding-top: 42px;

  max-height: 320px;
  background: #fff;
  width: 100%;

  overflow-y: auto;

  position: absolute;
  left: 0;
  top: 0;
  border-radius: 32px;
  z-index: 9;
  @include focus;
}

.search-modal__results-item {
  margin: 10px 0;
}

.search-modal__results-link {
  display: block;
  padding: 6px 20px;

  &:hover {
    background: #eee;
  }
}

@keyframes pulse {
  from {
    transform: translateY(-50%) scale(0.8);
  } to {
    transform: translateY(-50%) scale(0.5);
  }
}
</style>
