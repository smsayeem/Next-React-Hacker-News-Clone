// service worker
// https://developers.google.com/web/fundamentals/primers/service-workers
// it will give us native app experience. if the device not connected to the interenet still user can able to browse the app past visited link I think.
// plugin npm i sw-precache-webpack-plugin
// we need to configure webpack manually after this under next.config.js

const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
  webpack: config => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: "networkFirst",
            urlPattern: /^https?.*/
          }
        ]
      })
    );

    return config;
  }
};
