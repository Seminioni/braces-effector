
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

  configureWebpack: {
    name: "Braces",

    plugins: process.env.NODE_ENV !== "production" ? [] : [
      new CompressionWebpackPlugin({
        compressionOptions: {
          asset: "[path].gz[query]",
        },
        algorithm: "gzip",
        test: new RegExp(`\\.(${productionGzipExtensions.join("|")})$`),
        threshold: 10240,
        minRatio: 0.8,
      }),
      new BrotliPlugin({
        asset: "[path].br[query]",
        test: new RegExp(`\\.(${productionGzipExtensions.join("|")})$`),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
};
