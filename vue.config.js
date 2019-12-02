
const path = require("path");

const productionGzipExtensions = ["js", "css"];

module.exports = {
  publicPath: "/",
  chainWebpack(config) {
    const EXCLUDED_RE = /\.pure\.svg$/;

    config.module.rule("svg").test(filename => EXCLUDED_RE.test(filename));

    config.plugin("preload").tap((options) => {
      options[0].fileBlackList = options[0].fileBlackList || [];
      options[0].fileBlackList.push(/\.js$/);
      return options;
    });

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

  configureWebpack: {
    name: "Braces",
  },
};
