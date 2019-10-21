<script lang="ts">
import Vue, { PropType } from "vue";

import { FullProductModel, ProductMetadata } from "@/services/cart.service";
import { updatedQuantity } from "@/modules/cart";
import { $isMobile } from "@/core/session";

import { BrInputNumber, BrButton } from "@/shared";
import currency from "@/lib/currency";

export default Vue.extend({
  name: "CartItem",

  filters: { currency },

  effector() {
    return {
      $isMobile,
    };
  },

  components: {
    BrInputNumber,
    BrButton,
  },

  props: {
    ctx: {
      type: Object as PropType<ProductMetadata>,
      required: true,
    },
    product: {
      type: Object as PropType<FullProductModel>,
      required: true,
    },
  },

  data: () => ({
    $isMobile: {} as State<typeof $isMobile>,
  }),

  methods: {
    updatedQuantity,
    handleDelete() {
      updatedQuantity({
        productCtx: this.ctx,
        quantity: 0,
      });

      if (this.$isMobile) {
        this.$scrollTo("body");
      }
    },
  },
});
</script>

<template>
  <tr class="cart-page__table-row">
    <td class="cart-page__left">
      <figure class="cart-page__image-container">
        <div class="cart-page__image">
          <img
            :src="product.thumbnail"
            :alt="product.title"
          >
        </div>

        <figcaption class="cart-page__description">
          <router-link
            :to="product.categoryProductUrl"
            class="cart-page__title bold"
          >
            {{ product.title }}
          </router-link>
          <p class="cart-page__code body-text-14">
            Код товару: {{ product.code }}
          </p>
        </figcaption>
      </figure>
    </td>

    <td class="cart-page__middle">
      <br-input-number
        :value="product.quantity"
        class="fullwidth cart-page__quantity"
        @input="updatedQuantity({
          productCtx: ctx,
          quantity: $event,
        })"
      />
    </td>

    <td class="cart-page__right">
      <p class="cart-page__price body-text-16 bold">
        {{ product.totalAmount | currency }}
      </p>
      <br-button
        type="text"
        @click="handleDelete"
      >
        Видалити
      </br-button>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.cart-page__table-row, td {
  display: block;

  td {

    @include medium {
      padding: 26px 0;
      display: table-cell;
    }
  }
}

.cart-page__table-row {
  border: 1px solid $--divider;
  padding: 20px 10px 0;
  margin-bottom: 10px;

  @include medium {
    display: table-row;
    padding: 0;
    margin: 0;
    border: none;
    border-bottom: 1px solid $--divider;
  }
}

.cart-page__image-container {
  @include medium {
    display: flex;
    align-items: flex-start;
  }
}

.cart-page__image {
  width: 150px;
  height: 150px;
  margin: 0 auto 26px auto;
  position: relative;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @include medium {
    margin-right: 15px;
  }

  @include large {
    margin-right: 35px;
  }
}

.cart-page__title {
  &:hover {
    text-decoration: underline;
  }
}

.cart-page__description {
  @include medium {
    flex: 1 0;
  }
}

.cart-page__code {
  margin: 15px 0;
  color: $--secondary-text;
}

.cart-page__middle {
  margin-bottom: 25px;

  @include medium {
    margin: 0;
    vertical-align: top;
    text-align: right;
  }
}

.cart-page__quantity {
  @include medium {
    margin-top: 0;
  }
}

.cart-page__right {
  @include medium {
    vertical-align: top;
    text-align: right;
  }
}
</style>
