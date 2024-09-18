import { createApp } from "vue";
import { Quasar } from "quasar";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/dist/quasar.css";

const pinia = createPinia();
const myApp = createApp(App).use(pinia);

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
