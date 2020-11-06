/**
 * @type { import("@vue/cli-service").ProjectOptions}
 */
module.exports = {
  devServer: {
    // this is necessary becaue OpenID Connect must redirect to https:// URL eg. after logout
    https: true,
    /**
     * Suppress /sockjs-node CORS errors that appear when running `yarn serve` on https://
     * https://stackoverflow.com/a/44748420/10706046
     */
    // headers: {
    //   "Access-Control-Allow-Origin": "https://localhost:8080",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Headers":
    //     "X-Requested-With, content-type, Authorization",
    // },
    //fix CORS errors for dev server socket (removing this will break hot reloading)
    host: "localhost",
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/style/index.scss";`,
      },
    },
  },
  configureWebpack: {
    /**
     * Source maps are NOT enabled by default
     * If you don't set this, errors in browser will be thrown from a minified .js file rather than real code
     */
    devtool: "source-map",
  },
};
