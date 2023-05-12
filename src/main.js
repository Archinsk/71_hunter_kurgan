import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "./default-bootstrap-4.6.2.scss";
import "bootstrap";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
