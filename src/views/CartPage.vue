<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CartPage",
});
</script>

<template>
  <div class="page cart-page">
    <div class="container">
      <h1 class="cart-page__title bold">
        Кошик
      </h1>


      <div class="row">
        <div class="col">
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
              <tr data-label="Товар">
                <td>
                  <!--                  prodcut-->
                </td>
                <td>
                  <!--                  count-->
                </td>
                <td>
                  <!--                  price-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-align-left {
  text-align: left;
}

.text-align-right {
  text-align: right;
}

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

  tr, td {
    display: block;

    @include large {
      display: table-row;
    }
  }

  thead {
    border: none;
    padding: 0;
    margin: -1px;
    @include visually-hidden;

    th {
      padding-bottom: 10px;
    }

    @include large {
      border-bottom: 1px solid $--divider;

      position: static;
      overflow: visible;
      clip: auto;
      width: auto;
      height: auto;
    }
  }

}
</style>
