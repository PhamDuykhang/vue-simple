
const Authentication =() =>
    import(/*webpackChunkName:"admin" */ "../component/admin/Authentication")

const Admin =() =>
    import(/*webpackChunkName:"admin" */ "../component/admin/Admin")
const ProductAdmin =() =>
    import(/*webpackChunkName:"admin" */ "../component/admin/ProductAdmin")
const OrderAdmin =() =>
    import(/*webpackChunkName:"admin" */ "../component/admin/OrderAdmin")
const ProductEditor =() =>
    import(/*webpackChunkName:"admin" */ "../component/admin/ProductEdit")



import store from "../../components/store.vue";
import shoppingCart from "../../components/Cart.vue";
import CheckOut from "../../components/CheckOut.vue";
import Thank from "../../components/OrderThank.vue";
import Authentication from "../admin/Authentication.vue";
import Admin from "../admin/Admin.vue";
import ProductAdmin from "../admin/ProductAdmin.vue";
import OrderAdmin from "../admin/OrderAdmin.vue";
import ProductEditor from "../admin/ProductEdit.vue";
import storeState from "../store";

import Vue from "vue"
import dataStore from "../../store"
import VueRouter from "vue-router";
Vue.use(VueRouter)


Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: store },
    { path: "/cart", component: shoppingCart },
    { path: "/checkout", component: CheckOut },
    { path: "/thank/:id", component: Thank },
    { path: "/login", component: Authentication },
    {
      path: "/admin",
      component: Admin,
      beforeEnter(to, from, next) {
        
        if (storeState.state.auth.authenticated) {
          next();
        } else {
          next("/login");
        }
      },
      children:[
      
        {path:"products/:op(create|edit)/:id(\\d+)?",component:ProductEditor},
        {path:"products",component:ProductAdmin},
        {path:"orders",component:OrderAdmin},
        {path:"",redirect:"/admin/products"}
      ]
    },
    { path: "*", redirect: "/" },
  ],
});
