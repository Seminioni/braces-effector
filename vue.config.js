
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const PrerenderSPAPlugin = require("prerender-spa-plugin");

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;


const productionGzipExtensions = ["js", "css"];

module.exports = {
  publicPath: "/",
  assetsDir: "public",
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
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "dist"),
        indexPath: path.join(__dirname, "dist", "index.html"),
        routes: ["/", "/help", "/help/delivery", "/help/payment"],

        postProcess(renderedRoute) {
          renderedRoute.route = renderedRoute.originalRoute;
          renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join("><");

          if (renderedRoute.route.endsWith(".html")) {
            renderedRoute.outputPath = path.join(__dirname, "dist", renderedRoute.route);
          }

          return renderedRoute;
        },

        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          keepClosingSlash: true,
          sortAttributes: true,
        },

        // server: {
        //   port: 8001,
        // },

        // renderer: new Renderer({
        //   maxConcurrentRoutes: 4,
        //   headless: true,
        //   renderAfterDocumentEvent: "render-event",
        //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
        // }),
      }),

    ],
  },
};
