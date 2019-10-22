<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CheckoutPlaceholder",

  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<template functional>
  <div class="info-placeholder">
    <span class="info-placeholder__title">
      {{ props.title }}
    </span>

    <span class="info-placeholder__content">
      <slot />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.info-placeholder {
  color: rgba($color: #111213, $alpha: 0.35);
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.24px;
  padding-top: 18px;
  display: flex;

  @include medium {
    padding-left: 35px;
  }

  @include large {
    padding-left: 75px;
  }
}

.info-placeholder__content {
  margin-left: 26px;
}

.info-placeholder__title {
  width: 100px;
}

.info-placeholder__content > p {
  text-overflow: ellipsis;
  overflow: hidden;

  max-width: 165px;

  @include large {
    max-width: 120px;
  }

  @include extra {
    max-width: none;
  }
}
</style>
