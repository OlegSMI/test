import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { init } from "@tma.js/sdk";
import { postEvent } from "@tma.js/sdk";
import eruda from "eruda";

if (process.env.NODE_ENV === "development") {
  eruda.init();
}
init({
  cssVars: true,
});
postEvent("web_app_set_header_color", { color_key: "bg_color" });
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
