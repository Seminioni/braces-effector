<script lang="ts">
import Vue from "vue";

import declOfNum from "@/lib/decl-of-num";

export default Vue.extend({
  name: "ProductsHeader",

  filters: { declOfNum },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    from: {
      type: Number,
      required: true,
    },
    to: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    sortBy: {
      type: String,
      required: true,
    },
  },
});
</script>

<template functional>
  <header class="products-container__header">
    <div
      v-if="!props.loading"
      class="body-text-14 products-container__header-stats"
    >
      {{ props.from }} — {{ props.to }}
      з {{ props.total | declOfNum(['товар', 'товари', 'товарів']) }}
    </div>

    <div class="products__header-sort">
      <span class="body-text-14 bold products-header__sort-title">
        Сортування
      </span>
      <div class="products-header__select-wrap">
        <select
          class="products-header__select"
          @change="({ target }) => listeners['sort'](target.value)"
        >
          <option
            value="asc"
            :selected="props.sortBy === 'asc'"
          >
            Від дешевих до дорогих
          </option>
          <option
            :selected="props.sortBy === 'desc'"
            value="desc"
          >
            Від дорогих до дешевих
          </option>
        </select>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.products-container__header {
  padding: 15px 0;

  @include small {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @include medium {
    border-bottom: 1px solid $--divider;
  }
}


.products__header-sort {

  @include small {
    margin-left: auto;
    transform: translateX(15px);
  }
}

.products-header__select-wrap {
  position: relative;
  display: inline-block;
  margin-left: 15px;

  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    background: linear-gradient(90deg,hsla(0,0%,100%,0),#fff,#fff);
    width: 20px;
    height: 100%;
    display: block;
    pointer-events: none;
  }
}

.products-header__select {
  appearance: none;
  width: 100%;
  border: none;
  background: none;
  font-size: 14px;
  color: $--secondary-text;
  letter-spacing: 0.1px;
  line-height: 18px;
  outline: none;
  text-align: right;

  @include small {
    width: 115px;
  }
}
</style>
