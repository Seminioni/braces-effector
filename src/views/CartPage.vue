<script lang="ts">
import Vue from "vue";

import { BrButton, BrLoader } from "@/shared";
import {
  CartItem, $productsContextInCart, $totalAmount,
  $fullProductsModel,
  $isLoading,
} from "@/modules/cart";

import currency from "@/lib/currency";

export default Vue.extend({
  name: "CartPage",

  filters: { currency },

  metaInfo() {
    return {
      title: "Braces — Кошик",
    };
  },

  effector() {
    return {
      $isLoading,
      $productsContextInCart,
      $fullProductsModel,
      $totalAmount,
    };
  },

  components: {
    CartItem,
    BrButton,
    BrLoader,
  },
});
</script>

<template>
  <div class="page cart-page">
    <div class="container">
      <h1 class="cart-page__title bold">
        Кошик
      </h1>


      <div class="row">
        <br-loader class="col cart-page__container">
          <template v-if="!$isLoading">
            <div>
              <div
                v-if="Object.keys($productsContextInCart).length"
                class="cart-page__table-container"
              >
                <table class="cart-page__table">
                  <thead>
                    <th
                      scope="col"
                      class="text-align-left"
                    >
                      <span class="cart-page__table-title body-text-neutral">
                        Товар
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="text-align-right"
                    >
                      <span class="cart-page__table-title body-text-neutral">
                        Кількість
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="text-align-right"
                    >
                      <span class="cart-page__table-title body-text-neutral">
                        Ціна
                      </span>
                    </th>
                  </thead>

                  <tbody>
                    <cart-item
                      v-for="productCtx in $productsContextInCart"
                      :key="productCtx.id"
                      :ctx="productCtx"
                      :product="$fullProductsModel[productCtx.productId]"
                    />
                  </tbody>
                </table>

                <footer class="cart-page__footer">
                  <div class="cart-page__total body-text-14">
                    <span>
                      Всього:
                    </span>
                    <span class="cart-page__total-count bold">
                      {{ $totalAmount | currency }}
                    </span>
                  </div>

                  <br-button
                    type="primary"
                    :to="{ name: 'CheckoutPage' }"
                    style="width: 100%;"
                  >
                    Оформити замовлення
                  </br-button>
                </footer>
              </div>
              <div
                v-else
                class="cart-page__empty"
              >
                <p class="body-text-16 bold">
                  Ваш кошик пустий 😕
                </p>
                <p class="body-text-14 cart-page__sub-title">
                  Додай сюди щось!
                </p>

                <br-button
                  type="primary"
                  :to="{ name: 'HomePage' }"
                >
                  До категорій
                </br-button>
              </div>
            </div>
          </template>
        </br-loader>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-page__title {
  text-align: center;
  margin: 24px 0;

  @include medium {
    margin: 44px 0;
  }
}

.cart-page__table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

  thead {
    border: none;
    padding: 0;
    margin: -1px;
    @include visually-hidden;

    th {
      padding-bottom: 10px;

      @include medium {
        &:nth-child(1) {
          width: 58%;
        }
        &:nth-child(2) {
          width: 25%;
        }
        &:nth-child(3) {
          width: 17%;
        }
      }
    }

    @include medium {
      border-bottom: 1px solid $--divider;

      position: static;
      overflow: visible;
      clip: auto;
      width: auto;
      height: auto;
    }
  }
}

.cart-page__empty {
  text-align: center;
  width: 100%;
  padding-bottom: 70px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.cart-page__sub-title {
  color: $--secondary-text;
  margin-bottom: 30px;
}

.cart-page__container, .cart-page__table-container {
  display: flex;
  flex-direction: column;
}

.cart-page__footer {
  background: #f1f1f1;
  padding: 29px 20px;
  margin: 24px 0;
  width: 100%;

  @include small {
    padding-left: 34px;
    padding-right: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @include medium {
    max-width: 366px;
    align-self: flex-end;
  }
}

.cart-page__total {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
