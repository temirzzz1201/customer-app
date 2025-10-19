import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";
import "./style.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { router } from "./router";

const pinia = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount("#app");
