import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/style/index.scss";
import "element-plus/dist/index.css";
import laosuArray from "@/util/array";
laosuArray();
const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
