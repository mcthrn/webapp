import Vue from "vue";
import VueRouter from "vue-router";
import category from "../views/category.vue";
import product from "../views/product.vue";
import categoryDetails from "../views/categoryDetails.vue";
import productDetails from "../views/productDetails.vue";
import dashboard from "../views/dashboard.vue";
import table from "../views/table.vue";

import test from "../views/test.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/category",
    name: "category",
    component: category,
  },
  {
    path: "/categoryDetails/:c_id",
    name: "categoryDetails",
    component: categoryDetails,
  },
  {
    path: "/product",
    name: "product",
    component: product,
  },
  {
    path: "/test",
    name: "test",
    component: test,
  },
  {
    path: "/productDetails/:p_id",
    name: "productDetails",
    component: productDetails,
  },
  {
    path: "/table",
    name: "table",
    component: table,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
