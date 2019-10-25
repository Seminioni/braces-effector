<script lang="ts">
import createComponent from "@/core/component";
import { lockBody, unlockBody } from "@/lib/body-lock";
import { $categories } from "@/modules/categories";
import { $isMobile } from "@/core/session";
import { fxFetchCartContext } from "@/modules/cart/events";
import { BrLoader } from "@/shared";
import BottomBar from "@/ui/BottomBar.vue";
import Navigation from "@/ui/Navigation.vue";

const simpleLayoutPages = ["CheckoutPage", "CheckoutSuccessPage"];
const store = { $isMobile, $categories };

export default createComponent({
  name: "App",

  components: {
    BottomBar,
    Navigation,
    MainHeader: () => import("@/ui/MainHeader.vue"),
    SimpleHeader: () => import("@/ui/SimpleHeader.vue"),
    MainFooter: () => import("@/ui/MainFooter.vue"),
    BrLoader,
  },

  data: () => ({
    isOpened: false,
  }),

  computed: {
    pages() {
      return Object.freeze(simpleLayoutPages);
    },
    headerType(): string {
      const { name } = this.$route;

      return this.pages.includes(name!) ? "SimpleHeader" : "MainHeader";
    },
  },

  methods: {
    handleToggle() {
      this.isOpened = !this.isOpened;

      // eslint-disable-next-line no-unused-expressions
      this.isOpened ? lockBody() : unlockBody();
    },
  },
}, store);
</script>

<template>
  <div
    id="app"
    :class="{ 'is-mobile': $isMobile }"
  >
    <header class="header">
      <component
        :is="headerType"
        @toggle="handleToggle"
      />
    </header>

    <main>
      <router-view />
    </main>

    <main-footer v-if="headerType === 'MainHeader'" />

    <bottom-bar
      v-if="$isMobile"
      @toggle="handleToggle"
    />

    <navigation
      :is-visible="isOpened"
      @toggle="handleToggle"
    >
      <br-loader>
        <ul class="categories__list">
          <li
            v-for="category in $categories"
            :key="category.id"
            class="categories__item"
            @click="handleToggle"
          >
            <router-link
              :to="{
                name: 'ProductsPage',
                params: { category: category.path },
              }"
              exact
              class="body-text-14 categories__link"
              :style="`background-image: url(${category.smallIcon})`"
            >
              {{ category.title }}
            </router-link>
          </li>
        </ul>
      </br-loader>
    </navigation>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background: #fff;
  border-bottom: 1px solid $--divider;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: $--header-height;
  display: flex;
  align-items: center;
  z-index: 99;
}

.categories__item {
  margin-bottom: 20px;
}

.categories__link {
  display: block;
  padding: 5px 0 5px 40px;
  background: center left no-repeat;
  background-size: 24px;

  &.router-link-exact-active.router-link-active {
    color: $--primary;
  }
}
</style>

<style lang="scss">
@import "~modern-css-reset/dist/reset.min.css";
@import "./assets/scss/_typography.scss";

*,
*::before,
*::after {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[v-cloak] {
  display: none;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  width: 100%;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: $--header-height;

  &.is-mobile {
    padding-bottom: $--bottom-bar-height;
  }
}

main {
  flex: 1 0;
}

button {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  &:focus {
    @include focus;
  }
}

.container {
  width: 100%;
  padding: 0 $--gutter / 2;
  margin: 0 auto;

  @include small {
    max-width: 531px;
  }

  @include medium {
    max-width: 720px;
  }

  @include large {
    max-width: 941px;
  }

  @include extra {
    max-width: 1200px;
  }
}

.row {
  @include row;
}

.col {
  width: 100%;
  padding-left: $--gutter / 2;
  padding-right: $--gutter / 2;
}

.align-center {
  align-items: center;
}

.align-start {
  align-items: flex-start;
}

.justify-start {
  justify-content: flex-start;
}

.justify-center {
  justify-content: center;
}

.justify-end {
  justify-content: flex-end;
}

.text-align-left {
  text-align: left;
}

.text-align-right {
  text-align: right;
}

.slide-top-enter-active {
  transition: all .3s ease;
}

.slide-top-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-top-enter, .slide-top-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.fullwidth {
  width: 100%;
  margin-bottom: 26px;
  @include small {
    width: auto;
  }
}
</style>
