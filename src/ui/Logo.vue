<script lang="ts">
import createComponent from "@/core/component";

export default createComponent({
  name: "Logo",
});
</script>

<template functional>
  <RouterLink
    :to="{ name: 'HomePage' }"
    class="logo"
    :class="data.staticClass"
  >
    <picture>
      <source
        :srcset="require('@/assets/vector/logo-with-title.pure.svg')"
        media="(min-width: 768px)"
      >
      <img
        :src="require('@/assets/vector/logo.pure.svg')"
        alt="Braces"
      >
    </picture>
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;

  img {
    display: block;
    max-width: 100%;
  }
}
</style>
