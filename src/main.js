import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/style/index.scss";
import "element-plus/dist/index.css";
/**黑暗模式样式 */
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

/**自定义数组方法 */
import laosuArray from "@/util/array";
/**公共方法 */
import publicMethods from "@/util/publicMethods";

laosuArray();

const app = createApp(App);
app.config.globalProperties.publicMethods = publicMethods
app.use(store);
app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
