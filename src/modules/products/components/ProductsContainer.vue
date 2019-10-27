<script lang="ts">
import { PropType } from "vue";
import orderBy from "lodash.orderby";

import createComponent from "@/core/component";
import { Category } from "@/services/categories.service";
import { Options } from "@/services/products.service";
import { BrButton, BrLoader } from "@/shared";
import { unlockBody, lockBody } from "@/lib/body-lock";

import {
  $filters, $filterItems, $isFiltersPending, $isProductsPending, $products,
  $selectedFilters, $productsTotal,
  LIMIT,
} from "../model";

import Filters from "./Filters.vue";
import ProductCard from "./ProductCard.vue";
import ProductsHeader from "./ProductsHeader.vue";
import Pagination from "@/ui/Pagination.vue";

const store = {
  $filters,
  $filterItems,
  $selectedFilters,

  $isFiltersPending,
  $isProductsPending,

  $products,
  $productsTotal,
};

export default createComponent({
  name: "ProductsContainer",

  components: {
    BrButton,
    BrLoader,
    Filters,

    ProductCard,
    ProductsHeader,
    Pagination,
  },

  props: {
    currentCategory: {
      type: Object as PropType<Category>,
      required: true,
    },
  },

  data: () => ({
    isOpened: false,
  }),

  computed: {
    limit(): number {
      return LIMIT;
    },
    filters() {
      return this.$filters[this.currentCategory.id];
    },
    stats(): { offset: number; sortBy: string; from: number; to: number } {
      const { offset, sortBy } = this.$selectedFilters.metadata;

      return {
        offset,
        sortBy,
        from: offset + 1,
        to: this.$productsTotal < offset + this.limit ? this.$productsTotal : offset + this.limit,
      };
    },
    products() {
      return orderBy(
        this.$products,
        [this.$products, "price"],
        this.$selectedFilters.metadata.sortBy !== "desc" ? ["desc", "asc"] : ["asc", "desc"],
      );
    },
    withFilters(): boolean {
      return !this.$isFiltersPending && (this.filters && !!Object.keys(this.filters).length);
    },
  },

  methods: {
    handleToggle() {
      this.isOpened = !this.isOpened;

      // eslint-disable-next-line no-unused-expressions
      this.isOpened ? lockBody() : unlockBody();
    },
    handleOffset(offset: number) {
      const query = {
        ...this.$selectedFilters.metadata,
        offset,
      } as { [key: string]: any };

      this.$router.push({
        name: "ProductsPage",
        params: { category: this.currentCategory.path },
        query,
      });
    },
    handleSort(sortBy: "asc" | "desc") {
      const query = {
        ...this.$selectedFilters.metadata,
        sortBy,
      } as { [key: string]: any };

      this.$router.push({
        name: "ProductsPage",
        params: { category: this.currentCategory.path },
        query,
      });
    },
    handleUpdateRoute(queries: Options) {
      const query = {
        ...queries.metadata,
        filters: queries.filters,
      } as { [key: string]: any };

      this.$router.push({
        name: "ProductsPage",
        params: { category: this.currentCategory.path },
        query,
      });
    },
  },
}, store);
</script>

<template>
  <div class="container products-container">
    <div
      v-if="withFilters"
      class="products-container__filter-btn"
    >
      <br-button
        type="primary"
        fullwidth
        @click="handleToggle"
      >
        Фільтр
      </br-button>
    </div>

    <products-header
      :to="stats.to"
      :from="stats.from"
      :sort-by="stats.sortBy"
      :total="$productsTotal"
      :loading="$isProductsPending"
      @sort="handleSort"
    />

    <div class="row">
      <div
        v-if="withFilters"
        class="col products-container__filters"
      >
        <br-loader style="padding-top: 25px; border-right: 1px solid #e9eced;">
          <template v-if="!$isFiltersPending">
            <transition
              name="slide-top"
              mode="out-in"
            >
              <filters
                v-show="isOpened"
                v-if="filters"
                :filters="filters"
                :filter-items="$filterItems"
                @toggle="handleToggle"
                @update-route="handleUpdateRoute"
              />
            </transition>
          </template>
        </br-loader>
      </div>

      <div
        class="col products-container__wrapper"
        :class="{ 'without-aside': !withFilters }"
      >
        <br-loader>
          <template v-if="!$isProductsPending">
            <ul class="row products-container__list">
              <li
                v-for="product in products"
                :key="product.id"
                class="col products-container__item"
              >
                <product-card :product="product" />
              </li>
            </ul>

            <pagination
              v-if="products.length"
              :offset="stats.offset"
              :total="$productsTotal"
              :current-category="currentCategory"
              align="center"
              @update-offset="handleOffset"
            />
          </template>
        </br-loader>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-container {
  border-bottom: 1px solid $--divider;
  margin-bottom: 70px;
  padding-bottom: 25px;
}

.products-container__filter-btn {
  margin-top: 25px;
  margin-bottom: 25px;
  @include medium {
    display: none;
  }
}

.products-container__filters {
  @include medium {
    @include col(4);
  }

  @include large {
    @include col(3);
  }

  @include extra {
    @include col(2);
  }
}

.products-container__wrapper {
  padding-top: 25px;

  @include medium {
    @include col(8);
  }

  @include large {
    @include col(9);
  }

  @include extra {
    @include col(10);
  }

  &.without-aside {
    @include medium {
      @include col(12);
    }

    @include large {
      @include col(12);
    }

    @include extra {
      @include col(12);
    }

    .products-container__item {
      @include small {
        @include col(6);
      }

      @include medium {
        @include col(4, 12);
      }

      @include large {
        @include col(3, 12);
      }

      @include extra {
        @include col(2, 12);
      }
    }
  }
}

.products-container__item {
  margin-bottom: 25px;

  @include small {
    @include col(6);
  }

  @include medium {
    @include col(4, 8);
    margin-bottom: 52px;
  }

  @include large {
    @include col(3, 9);
  }

  @include extra {
    @include col(2, 10);
  }
}
</style>
