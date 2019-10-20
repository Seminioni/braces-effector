<script>
import Vue from "vue";

export default Vue.extend({
  name: "ProgressBar",

  data: () => ({
    percent: 0,
    duration: 3000,
    show: false,
    canSuccess: true,
    timer: null,
    height: "3px",
    color: "#0070c8",
    failedColor: "#e9252c",
  }),

  computed: {
    computedStyles() {
      return {
        width: `${this.percent}%`,
        height: this.height,
        "background-color": this.canSuccess ? this.color : this.failedColor,
        opacity: this.show ? 1 : 0,
      };
    },
  },

  methods: {
    start() {
      this.show = true;
      this.canSuccess = true;

      if (this.timer) {
        clearInterval(this.timer);
        this.percent = 0;
      }

      const cut = 10000 / Math.floor(this.duration);
      this.timer = setInterval(() => {
        this.increase(cut * Math.random());

        if (this.percent > 95) {
          this.finish();
        }
      }, 100);
    },
    finish() {
      this.percent = 100;
      this.hide();
    },
    set(n) {
      this.show = true;
      this.canSuccess = true;
      this.percent = Math.floor(n);
    },
    get() {
      return Math.floor(this.percent);
    },
    increase(n) {
      this.percent = this.percent + Math.floor(n);
    },
    decrease(n) {
      this.percent = this.percent - Math.floor(n);
    },
    pause() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
    hide() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = null;

      setTimeout(async () => {
        this.show = false;

        await this.$nextTick();

        setTimeout(() => {
          this.percent = 0;
        }, 200);
      }, 500);
    },
    fail() {
      this.canSuccess = false;
    },
  },
});
</script>

<template>
  <div
    class="progress"
    :style="computedStyles"
  />
</template>

<style lang="scss" scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  background-color: $--primary;
  z-index: 999999;
}
</style>
