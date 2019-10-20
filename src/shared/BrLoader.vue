<script lang="ts">
import Vue, { PropType } from "vue";

type Size = "small" | "medium" | "large";

export default Vue.extend({
  name: "BrLoader",

  props: {
    size: {
      type: String as PropType<Size>,
      default: "small",
    },
    color: {
      type: String,
      default: "#0070c8",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div class="loader-container">
    <slot />
    <div
      v-if="!$slots.default || visible"
      class="loader"
      :class="[size]"
    >
      <svg
        class="circular"
        viewBox="25 25 50 50"
      >
        <circle
          class="path"
          :style="{ stroke: color }"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="2"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.loader {
  position: relative;
  margin: 0 auto;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  &.small {
    width: 30px;
  }

  &.medium {
    width: 60px;
  }

  &.large {
    width: 80px;
  }
}

.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
  stroke: $--primary;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
