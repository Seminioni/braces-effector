<script lang="ts">
import Vue, { PropType } from "vue";

import { Category } from "@/services/categories.service";
import { LIMIT } from "../model";

import arrowIcon from "@/assets/vector/arrow_down.svg";
import { BrButton } from "@/shared";

export default Vue.extend({
  name: "Pagination",

  components: {
    BrButton,
    arrowIcon,
  },

  props: {
    align: {
      type: String,
      default: "left",
    },
    limit: {
      type: Number,
      default: LIMIT,
    },
    total: {
      type: Number,
      required: true,
    },
    offset: {
      type: Number,
      required: true,
    },
    currentCategory: {
      type: Object as PropType<Category>,
      required: true,
    },
  },

  computed: {
    pages() {
      return Math.ceil(this.total / this.limit);
    },
  },

  methods: {
    handleOffset(offset: number, ev?: Event) {
      if (ev) {
        ev.preventDefault();
      }

      this.$scrollTo("body");
      this.$emit("update-offset", offset);
    },
  },
});
</script>

<template>
  <div
    class="pagination"
    :class="[`justify-${align}`]"
  >
    <div class="pagination__container">
      <br-button
        type="circle"
        class="pagination__btn pagination__btn--prev"
        :disabled="offset === 0"
        @click="handleOffset(offset - limit)"
      >
        <arrow-icon />
      </br-button>

      <ul class="pagination__list">
        <li
          v-for="page in pages"
          :key="page"
          class="pagination__item"
          @click.capture="handleOffset((page - 1) * limit, $event)"
        >
          <router-link
            :to="`/products/${currentCategory.path}?offset=${(page - 1) * limit}&limit=${limit}`"
            class="body-text-18 pagination__link pagination__link--active bold"
          >
            1
          </router-link>
        </li>
      </ul>

      <br-button
        type="circle"
        class="pagination__btn pagination__btn--next"
        :disabled="(offset * limit) >= total"
      >
        <arrow-icon />
      </br-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination__container, .pagination {
  display: flex;
  align-items: center;
}

.pagination__list {
  display: flex;
  margin: 0 10px;
}

.pagination__item {
  margin: 0 10px;
}

.pagination__link {
  border-bottom: 4px solid transparent;
  padding: 2px 12px;
  display: block;
}

.pagination__link--active {
  border-color: $--primary;
}

.pagination__btn--prev {
  svg {
    transform: rotate(90deg);
  }
}

.pagination__btn--next {
  svg {
    transform: rotate(-90deg);
  }
}
</style>
