<script lang="ts">
import Vue from "vue";

import { CheckoutProduct } from "@/modules/checkout";
import { $fullProductsModel, $productsContextInCart, $totalAmount } from "@/modules/cart";

import declOfNum from "@/lib/decl-of-num";
import currency from "@/lib/currency";

export default Vue.extend({
  name: "CheckoutPage",

  filters: { declOfNum, currency },

  metaInfo() {
    return {
      title: "Braces — Підтвердження",
    };
  },

  effector() {
    return {
      $fullProductsModel,
      $totalAmount,
      $productsContextInCart,
    };
  },

  components: {
    CheckoutProduct,
  },
});
</script>

<template>
  <div class="page checkout-page">
    <div class="container">
      <div class="row justify-center">
        <div class="col checkout-page__container">
          <div class="row">
            <div class="col checkout-page__item checkout-page__form">
              <footer class="checkout-page__footer">
                &copy; Braces {{ new Date().getFullYear() }}
              </footer>
            </div>
            <div class="col checkout-page__item checkout-page__products">
              <p class="checkout-page__title">
                Кошик
                {{
                  Object.values($fullProductsModel).length
                    | declOfNum(['товар', 'товари', 'товарів'])
                }}
              </p>
              <ul class="checkout-page__product-list">
                <checkout-product
                  v-for="ctx in $productsContextInCart"
                  :key="ctx.id"
                  :product="$fullProductsModel[ctx.productId]"
                />
              </ul>

              <footer class="checkout-page__total">
                <span class="body-text-14">
                  Вартість доставки
                </span>
                <span class="body-text-14 text-align-right">
                  50 грн.
                </span>
                <span class="body-text-14 bold">
                  Всього
                </span>
                <span class="body-text-14 bold text-align-right">
                  {{ $totalAmount | currency }}
                </span>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.checkout-page__container {
  @include medium {
    @include col(10);
  }
}
.checkout-page__item {
  padding-top: 50px;
}

.checkout-page__form, .checkout-page__products {
  @include large {
    @include col(5, 10)
  }
}

.checkout-page__form {
  order: 2;
  display: flex;
  flex-direction: column;

  @include large {
    order: 0;
    border-right: 1px solid $--divider;
  }
}

.checkout-page__footer {
  margin-top: auto;
}

.checkout-page__products {
  @include large {
    padding-left: 50px;
  }

  @include extra {
    padding-left: 75px;
  }
}

.checkout-page__title {
  @include headline-2;
  padding-bottom: 16px;
  border-bottom: 1px solid $--divider;
  margin-bottom: 18px;
}

.checkout-page__product-list {
  border-bottom: 1px solid $--divider;
}

.checkout-page__total {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;

  > span {
    margin: 5px 0;
    flex: 1 0 50%;
  }
}
</style>
