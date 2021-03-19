import VueRouter from "vue-router";
import Vue from "vue";
import store from "../components/store.vue";
import shoppingCart from "../components/Cart.vue";
import CheckOut from "../components/CheckOut.vue";
import Thank from "../components/OrderThank.vue";
import Authentication from "../components/admin/Authentication.vue";
import Admin from "../components/admin/Admin.vue";
import ProductAdmin from "../components/admin/ProductAdmin.vue";
import OrderAdmin from "../components/admin/OrderAdmin.vue";
import ProductEditor from "../components/admin/ProductEdit.vue";
import storeState from "../store";

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
      
        {path:"products/:op(create|edit)/:id",component:ProductEditor},
        {path:"products",component:ProductAdmin},
        {path:"orders",component:OrderAdmin},
        {path:"",redirect:"/admin/products"}
      ]
    },
    { path: "*", redirect: "/" },
  ],
});
