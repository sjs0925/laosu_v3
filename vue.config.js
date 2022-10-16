// import IconsResolver from "unplugin-icons/resolver";

const { defineConfig } = require("@vue/cli-service");

const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");

const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  lintOnSave: true,
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // IconsResolver({
          //   prefix: "Icon",
          // }),
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // IconsResolver({
          //   prefix: "Icon",
          // }),
        ],
      }),
    ],
  },
  css: {
    // css预设器配置项
    loaderOptions: {
      sass: {
        additionalData: `@import '@/style/laosu.scss';`,
      },
    },
  },
});
