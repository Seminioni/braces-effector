<script lang="ts">
import createComponent from "@/core/component";
import { BrTab } from "@/shared";

const pages = [
  { label: "Замовлення", to: "/dashboard/orders" },
  { label: "Фільтри", to: "/dashboard/filters" },
  { label: "Зображення", to: "/dashboard/images" },
  { label: "Категорії", to: "/dashboard/categories" },
  { label: "Товари", to: "/dashboard/products" },
  { label: "Новий продукт", to: "/dashboard/products/new", hidden: true },
  { label: "Редагувати продукт", to: "/dashboard/products/edit", hidden: true },
];

export default createComponent({
  name: "DashboardPage",

  components: {
    BrTab,
  },

  computed: {
    pages() {
      return pages;
    },
  },
});
</script>

<template>
  <div class="page dashboard">
    <h1 class="dashboard__title bold">
      Панель адміністратора
    </h1>
    <div class="container">
      <br-tab
        :nav-items="pages"
        type="router"
      >
        <router-view />
      </br-tab>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard__title {
  text-align: center;
  margin: 44px 0;
}
</style>
