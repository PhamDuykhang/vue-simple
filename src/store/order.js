import axios from "axios";
import Vue from "vue";

const ORDER_URL = "http://localhost:3500/orders";

export default {
  state: {
    orders: [],
  },
  mutations: {
    setOrders(state, data) {
      state.orders = data;
    },
    changeOrderToShip(state, order) {
      Vue.set(
        order,
        "shipped",
        order.shipped == null || !order.shipped ? true : false
      );
    },
  },
  actions: {
    async storeOrder(ctx, order) {
      order.cartLines = ctx.rootState.cart.lines
      console.log('calling post order with information ', order)
      return (await axios.post(ORDER_URL, order)).data.id;
    },
    async getOrders(context) {
      Vue.$log.info("stating get order")
      let res = await context.rootGetters.authenticatedAxios.get(ORDER_URL)
      console.log(res.data)
      context.commit(
        "setOrders",
        res.data
      );
    },
    async updateOrder(context, order) {
      context.commit("changeOrderToShip", order);
      await context.rootGetters.authenticatedAxios.put(
        `${ORDER_URL}/${order.id}`,
        order
      );
    },
  },
};
