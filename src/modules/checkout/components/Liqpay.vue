<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Liqpay",

  props: {
    data: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
  },

  mounted() {
    const btn = this.$refs.btn as HTMLElement;
    btn.click();
  },
});
</script>

<template>
  <form
    method="POST"
    action="https://www.liqpay.ua/api/3/checkout"
    accept-charset="utf-8"
    class="form"
  >
    <input
      type="hidden"
      name="data"
      :value="data"
    >
    <input
      type="hidden"
      name="signature"
      :value="signature"
    >
    <input
      ref="btn"
      type="image"
      src="//static.liqpay.ua/buttons/p1ru.radius.png"
    >
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: center;
}
</style>
