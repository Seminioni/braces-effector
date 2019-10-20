<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Navigation",

  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template functional>
  <transition
    name="blur"
    mode="out-in"
  >
    <nav
      v-show="props.isVisible"
      class="navigation"
      tabindex="0"
      @click="listeners.toggle"
    >
      <transition
        name="slide"
        mode="out-in"
      >
        <section
          v-show="props.isVisible"
          class="navigaton__bar"
          @click.stop
        >
          <h3 class="bold navigation__title">
            Каталог товарів
          </h3>
          <div class="navigation__container">
            <slot />
          </div>

          <address class="navigation__contacts">
            <ul class="navigation__contacts-list">
              <li class="navigation__contacts-item">
                <a
                  href="tel:+380733183150"
                  class="body-text-14 navigation__contacts-link navigation__contacts-link--phone"
                >
                  +380 73 318 31 50
                </a>
              </li>
            </ul>
          </address>
        </section>
      </transition>
    </nav>
  </transition>
</template>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  backdrop-filter: blur(7px);
  background: rgba($color: $--primary-text, $alpha: 0.3);
  will-change: auto;
}

.navigaton__bar {
  background: #fff;
  height: 100vh;
  width: 250px;

  position: fixed;
  top: 0;
  right: 0;

  padding: 20px 20px 26px 20px;
  display: flex;
  flex-direction: column;

  will-change: transform;

  @include medium {
    width: 320px;
  }
}

.navigation__container {
  border-bottom: 3px solid $--primary;
  flex: 1 0;
  overflow-y: auto;
}

.navigation__title {
  text-transform: uppercase;
  margin-bottom: 20px;
}

.navigation__contacts {
  font-style: normal;
  margin: 20px 0 65px 0;
}

.navigation__contacts-link {
  display: block;
  padding: 5px 0 5px 30px;
}

.navigation__contacts-link--phone {
  background: url('~@/assets/vector/phone.pure.svg') center left no-repeat;
  background-size: 21px 18px;
}

.blur-enter-active, .blur-leave-active {
  transition: backdrop-filter .3s, background .3s;
}
.blur-enter, .blur-leave-to {
  backdrop-filter: blur(0);
  background: rgba($color: $--primary-text, $alpha: 0);
}

.slide-enter-active, .slide-leave-active {
  transition: transform .3s;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
</style>
