
module.exports = {
  chainWebpack(config) {
    const EXCLUDED_RE = /\.pure\.svg$/;

    config.module.rule("svg").test(filename => EXCLUDED_RE.test(filename));

    config.module
      .rule("svg-component")
      .test(filename => filename.endsWith(".svg") && !EXCLUDED_RE.test(filename))
      .use("vue")
      .loader("vue-loader")
      .end()
      .use("svg-to-vue-component")
      .loader("svg-to-vue-component/loader");
  },

  css: {
    loaderOptions: {
      scss: {
        data: `
          @import "@/assets/scss/_vars.scss";
          @import "@/assets/scss/_mixins.scss";
        `,
      },
    },
  },
};
