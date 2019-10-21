<script lang="ts">
import Vue, { PropType } from "vue";
// @ts-ignore
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

import {
  BrInputNumber, BrButton, BrCollapse, BrCollapseItem,
} from "@/shared";

import currency from "@/lib/currency";
import Breadcrumbs from "@/ui/Breadcrumbs.vue";
import { Category } from "@/services/categories.service";
import { $productsAsDictionary } from "@/modules/products";
import {
  $productsContextInCart,
  updatedQuantity,
  addedItemToCart,
  fxAddItemToCart,
} from "@/modules/cart";
import { Product } from "@/services/products.service";

export default Vue.extend({
  name: "ProductPage",

  filters: { currency },

  metaInfo() {
    return {
      title: `Braces — ${this.$products[this.id].title}`,
    };
  },

  effector() {
    return {
      $productsContextInCart,
      $products: $productsAsDictionary,
      $isLoading: fxAddItemToCart.pending,
    };
  },

  components: {
    Hooper,
    Slide,
    Breadcrumbs,

    BrInputNumber,
    BrButton,
    BrCollapse,
    BrCollapseItem,
  },

  props: {
    currentCategory: {
      type: Object as PropType<Category>,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    $products: {} as State<typeof $productsAsDictionary>,
    $productsContextInCart: {} as State<typeof $productsContextInCart>,
    quantity: 1,
    openTab: ["characters"],
  }),

  computed: {
    product(): Product {
      return this.$products[this.id];
    },
    breadcrumbs(): { label: string; path: string }[] {
      return [
        { label: "Головна", path: "/" },
        {
          label: this.currentCategory.title,
          path: `/products/${this.currentCategory.path}`,
        },
        { label: this.$products[this.id].title, path: "" },
      ];
    },
  },

  methods: {
    addedItemToCart,
    updatedQuantity,
    async handleChange(quantity: number) {
      if (!this.$productsContextInCart[this.id]) {
        this.quantity = quantity;
        return;
      }

      // @ts-ignore
      this.updatedQuantity({
        productCtx: this.$productsContextInCart[this.id],
        quantity,
      });
    },
  },
});
</script>

<template>
  <!--  eslint-disable vue/no-v-html -->
  <div class="page product-page">
    <breadcrumbs :breadcrumbs="breadcrumbs" />

    <section class="container">
      <div class="row">
        <div class="col product-page__slider">
          <hooper
            group="main"
            class="product-page__main-slider"
          >
            <slide
              v-for="(image, key) in product.images"
              :key="key"
            >
              <div class="product-page__image product-page__image--main">
                <img
                  :src="image.imageUrl"
                  :alt="image.alt"
                >
              </div>
            </slide>
          </hooper>

          <hooper
            group="main"
            class="product-page__preview-slider"
            :items-to-show="3"
            :center-mode="true"
          >
            <slide
              v-for="(image, key) in product.images"
              :key="key"
            >
              <div class="product-page__image product-page__image--preview">
                <img
                  :src="image.imageUrl"
                  :alt="image.alt"
                >
              </div>
            </slide>
          </hooper>
        </div>
        <div class="col product-page__descr">
          <h1 class="product-page__title bold">
            {{ product.title }}
          </h1>

          <div class="body-text-14 product-page__metadata bold">
            <div class="product-page__metadata-item">
              Виробник: <span>{{ product.brand }}</span>
            </div>
            <div class="product-page__metadata-item">
              Код товару: <span>{{ product.code }}</span>
            </div>
          </div>

          <div class="product-page__price">
            {{ product.price | currency }}
          </div>

          <div class="product-page__quantity">
            <div class="body-text-neutral">
              Кількість
            </div>
            <br-input-number
              :value="!$productsContextInCart[id] ? quantity : $productsContextInCart[id].quantity"
              class="fullwidth"
              :disabled="$isLoading"
              @input="handleChange"
            />
          </div>

          <div class="product-page__controls">
            <br-button
              v-if="!$productsContextInCart[id]"
              class="fullwidth"
              type="primary"
              :is-loading="$isLoading"
              @click="addedItemToCart({ ...product, quantity })"
            >
              Додати у кошик
            </br-button>
            <br-button
              v-else
              class="fullwidth"
              @click="updatedQuantity({
                productCtx: $productsContextInCart[id],
                quantity: 0
              })"
            >
              Видалити
            </br-button>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col product-page__tabs">
            <br-collapse
              v-model="openTab"
            >
              <br-collapse-item
                name="characters"
                :container="false"
              >
                <h3
                  slot="title"
                  class="body-text-14 bold product-page__tab-title"
                >
                  Характеристики
                </h3>

                <div
                  class="product-page__description body-text-14"
                  v-html="product.description"
                />
              </br-collapse-item>
            </br-collapse>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.product-page__slider {
  @include small {
    @include col(10);
    margin-left: auto;
    margin-right: auto;
  }

  @include large {
    @include col(6);
  }
}

.product-page__descr {
  @include large {
    @include col(6);
    padding-left: 50px;
  }

  @include extra {
    padding-left: 120px;
  }
}

.product-page__main-slider, .product-page__image--main {
  height: 250px;

  &:focus {
    @include focus;
  }

  @include large {
    height: 440px;
  }
  @include extra {
    height: 450px;
  }
}

.product-page__preview-slider {
  display: none;

  @include medium {
    display: block;
    margin-bottom: 72px;
    &:focus {
      @include focus;
    }

    .is-current {
      border-bottom: 4px solid $--primary;
    }
  }

  @include large {
    height: 135px;
  }
  @include extra {
    height: 145px;
  }
}

.product-page__image--main {
  img {
    max-height: 250px;
    max-width: 250px;

    @include large {
      max-height: 440px;
      max-width: 440px;
    }
    @include extra {
      max-height: 450px;
      max-width: 450px;
    }
  }
}

.product-page__image--preview {
  img {
    @include large {
      max-height: 130px;
      max-width: 130px;
    }
    @include extra {
      max-height: 140px;
      max-width: 140px;
    }
  }
}

.product-page__image {
  display: flex;
  justify-content: center;

  > img {
    margin: 0 auto;
    display: block;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
}

.product-page__title {
  margin-top: 25px;
  @include headline-2;
  margin-bottom: 11px;
}

.product-page__metadata {
  color: $--secondary-text;
  display: flex;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.product-page__metadata-item {
  &:not(:last-child) {
    margin-right: 5px;
  }

  color: $--primary-text;

  > span {
    color: $--secondary-text;
    font-weight: normal;
  }
}

.product-page__brand {
  text-decoration: underline;
  margin-right: 10px;
}

.product-page__price {
  margin: 25px 0;
  @include headline-1;
  font-weight: normal;
}

.product-page__controls {
  margin: 20px 0 45px 0;

  @include medium {
    margin-top: 36px;
  }
}

.product-page__tab-title {
  text-transform: uppercase;
}
.product-page__tabs {
  margin-bottom: 60px;
  @include large {
    @include col(8);
    margin-left: auto;
    margin-right: auto;
  }
}
</style>


<style lang="scss">
  .product-page__description {
    border-top: 1px solid $--divider;
    h2 {
      margin: 20px 0 10px 0;
    }

    p {
      margin: 10px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      tr {
        &:not(:last-child) {
          border-bottom: 1px solid $--divider;
        }
      }

      td {
        font-size: 14px;
        color: $--primary-text;
        padding: 11px 0;

        p {
          margin: 0;
        }

        &:not(:last-child) {
          border-right: 1px solid $--divider;
        }

        &:not(:first-child) {
          padding-left: 11px;
        }
      }
    }
  }
</style>
