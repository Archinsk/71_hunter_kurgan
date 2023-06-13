import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/settings",
    name: "SettingsView",
    component: () => import("../views/SettingsView"),
  },
  {
    path: "/service-info/:serviceId",
    name: "ServiceInfoView",
    component: () => import("../views/ServiceInfoView"),
  },
  {
    path: "/service-form/:serviceId/:appId",
    name: "ServiceFormView",
    component: () => import("../views/ServiceFormView"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
