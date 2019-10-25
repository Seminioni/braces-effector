<script lang="ts">
import createComponent from "@/core/component";
import { CategoriesList } from "@/modules/categories";
import { BrCollapse, BrCollapseItem } from "@/shared";

const partners = [
  { src: "https://32smile.com.ua/media/brands/logo_edel_white.png", alt: "#" },
  { src: "https://www.jetpik.by/wp-content/themes/minera/images/lg.png", alt: "#" },
  { src: "https://32smile.com.ua/media/brands/logo_edel_white.png", alt: "#" },
  { src: "https://www.jetpik.by/wp-content/themes/minera/images/lg.png", alt: "#" },
  { src: "https://32smile.com.ua/media/brands/logo_edel_white.png", alt: "#" },
  { src: "https://www.jetpik.by/wp-content/themes/minera/images/lg.png", alt: "#" },
];

export default createComponent({
  name: "HomePage",

  metaInfo() {
    return {
      title: "Braces — Головна",
    };
  },

  components: {
    CategoriesList,
    BrCollapse,
    BrCollapseItem,
  },

  data: () => ({
    tabs: ["about"],
  }),

  computed: {
    partners() {
      return partners;
    },
  },
});
</script>

<template>
  <div class="page">
    <section class="banner">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="banner__title">
              Жуй сразу <br> здоровими зубами
            </h1>
          </div>
        </div>
      </div>
    </section>

    <categories-list />

    <section class="partners">
      <div class="container">
        <h4 class="body-text-14 section__title">
          наші партнери
        </h4>

        <ul class="row partners__list">
          <li
            v-for="(partner, key) in partners"
            :key="key"
            class="col partners__item"
          >
            <div class="partners__img">
              <img
                :src="partner.src"
                :alt="partner.alt"
              >
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section>
      <br-collapse v-model="tabs">
        <br-collapse-item name="about">
          <h4
            slot="title"
            class="body-text-14 section__title"
          >
            більше про нас
          </h4>
          <p
            class="body-text-14"
            style="text-align: center; padding-bottom: 45px;"
          >
            Braces — проект, що покликаний допомогти людям
            з брекетами піклуватись про здоров'я порожнини рота.
            Ідея створення інтернет-магазину виникла на підставі
            особистого досвіду носіння ортодонтичних конструкцій.
            Вам бiльше не потрiбно проводити багато часу на рiзних сайтах
            та в аптеках в пошуках якiсних товарiв. Все необхiдне  ви можете придбати тут.
            Можливо, вам буде цiкаво дізнатися про досвід
            творців сайту, -тодi запрошуємо вас до блогу.
            Але досить про нас. Розкажіть про свої потреби і
            ми допоможемо підібрати якісні аксесуари для догляду за вашими брекетами.
          </p>
        </br-collapse-item>
      </br-collapse>
    </section>
  </div>
</template>

<style lang="scss" scoped>

.banner {
  background: url('~@/assets/banner.jpg') center center no-repeat;
  background-size: cover;

  height: 155px;

  display: flex;
  align-items: center;

  @include medium {
    height: 310px;
  }
}

.banner__title {
  font-weight: 200;
  color: #fff;

  font-size: 30px;

  @include medium {
    font-size: 48px;
  }
}

.partners {
  padding-top: 40px;
  padding-bottom: 70px;
  border-top: 1px solid $--divider;
}

.section__title {
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
}

.partners__item {
  margin-top: 35px;

  @include small {
    @include col(6);
  }

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

.partners__img {
  background: rgba(241,241,241,0.6);
  display: flex;
  height: 70px;

  > img {
    display: block;
    margin: auto;
    max-width: 100px;
  }
}
</style>
