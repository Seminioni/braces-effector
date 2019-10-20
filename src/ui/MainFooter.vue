<script lang="ts">
import Vue, { CreateElement, RenderContext } from "vue";

const Column = {
  name: "FooterColumn",
  functional: true,

  render(h: CreateElement, { slots, props, data }: RenderContext) {
    const headline = h("h3", { staticClass: "headline-14px footer__title" }, [props.title]);
    const list = h("ul", { staticClass: "footer__list" }, [slots().default]);
    return h("section", { staticClass: `col footer__column ${data.staticClass}` }, [headline, list]);
  },
};

export default Vue.extend({
  name: "MainFooter",

  components: {
    Column,
  },
});
</script>


<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container">
        <div class="row">
          <Column title="Соціальні мережі">
            <li class="footer__item">
              <a
                href="https://www.facebook.com"
                class="footer__link"
              >
                Facebook
              </a>
            </li>
            <li class="footer__item">
              <a
                href="https://www.instagram.com"
                class="footer__link"
              >
                Instagram
              </a>
            </li>
          </Column>

          <Column title="Аккаунт">
            <li class="footer__item">
              <RouterLink
                to="/profile"
                class="footer__link"
              >
                Особисті дані
              </RouterLink>
            </li>
            <li class="footer__item">
              <RouterLink
                to="/profile/orders"
                class="footer__link"
              >
                Мої замовлення
              </RouterLink>
            </li>
          </Column>

          <Column title="Контакти">
            <li class="footer__item">
              <a
                href="mailto:me@lorem.com"
                class="footer__link"
              >
                <span class="footer__link-title">
                  me@lorem.com
                </span>
              </a>
            </li>
            <li class="footer__item">
              <a
                href="tel:+380739999999"
                class="footer__link"
              >
                <span class="footer__link-title">
                  0 (73) 208 09 53
                </span>
              </a>
            </li>
          </Column>

          <Column
            title="Допомога"
            class="help"
          >
            <li class="footer__item">
              <RouterLink
                to="/help/delivery"
                class="footer__link"
              >
                Доставка та оплата
              </RouterLink>
            </li>
          </Column>
        </div>
      </div>
    </div>
    <div class="footer__copyright">
      <span class="body-text-13px">
        &copy; Braces {{ new Date().getFullYear() }}
      </span>
    </div>
  </footer>
</template>


<style lang="scss" scoped>
.footer__top {
  background-color: #EEEEEE;
  padding-top: 26px;
}

.footer__column {
    margin-bottom: 26px;

  @include small {
    @include col(6);
  }

  @include medium {
    @include col(3);
  }
}

.footer__title {
  margin-bottom: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.footer__item {
  line-height: 28px;
}


.footer__link-value {
  display: none;
}

.footer__link {
  color: $--secondary-text;
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 0.3px;

  &:hover {
    text-decoration: underline;
  }
}

.footer__copyright {
  background: #dbdbdb;
  text-align: center;
  color: $--secondary-text;
  padding: 12px 0;
}

.help {
  @include medium {
    margin-left: auto;
  }
}
</style>
