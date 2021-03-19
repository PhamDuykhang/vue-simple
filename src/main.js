import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueLogger from 'vuejs-logger';
import router  from './router'  
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Vuelidate from 'vuelidate'

const currency  = function(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
const isProduction = process.env.NODE_ENV === 'production';
 


Vue.use(Vuelidate)

Vue.filter("currency",currency)

Vue.config.productionTip = false;

const loggerOptions = {
  isEnabled: true,
  logLevel : isProduction ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
};

Vue.use(VueLogger,loggerOptions)
new Vue({
  render: (h) => h(App),
  store,
  router
}).$mount("#app");
