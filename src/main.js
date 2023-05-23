import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSwal from "vue-swal";

// moment
import "@/api/moment.js";

// css
require("@/assets/css/main.css");
require("@/assets/css/variables.css");

// fonts
import "@/assets/css/fonts.css";

//API
import "@/api/fontawesomeVue.js";

Vue.use(VueSwal);

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
