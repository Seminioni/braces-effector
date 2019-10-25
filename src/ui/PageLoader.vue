<script lang="ts">
import createComponent from "@/core/component";

import { BrLoader } from "@/shared";

export default createComponent({
  name: "PageLoader",

  components: {
    BrLoader,
  },
});
</script>

<template>
  <div class="page-loader">
    <br-loader
      size="medium"
      :visible="true"
    />
  </div>
</template>

<style lang="scss" scoped>
.page-loader {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background: #fff;
}
</style>
