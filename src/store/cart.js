export default {
  namespaced: true,
  state: {
    lines: [],
  },
  getters: {
    itemCount: (state) =>
      state.lines.reduce((total, line) => total + line.quantity, 0),
    totalPrice: (state) =>
      state.lines.reduce(
        (total, line) => total + line.quantity * line.product.price,
        0
      ),
  },
  mutations: {
    addProduct(state, product) {
      let line = state.lines.find((line) => line.product.id == product.id);
      if (line != null) {
        line.quantity++;
      } else {
        state.lines.push({ product: product, quantity: 1 });
      }
    },
    changeQuality(_, update) {
      update.line.quantity = update.quantity;
    },
    removeProduct(state, lineToRemove) {
      let index = state.lines.findIndex((line) => line == lineToRemove);
      console.log(index)
      if (index > -1) {
        state.lines.splice(index, 1);
      }
    },
    setCartData(state, data) {
      state.lines = data;
    },
  },
  actions: {
    loadCartDate(context) {
      let data = localStorage.getItem("cart");
      if (data != null) {
        context.commit("setCartData", JSON.parse(data));
      }
    
    },
    storeCartData(context) {
      localStorage.setItem("cart", JSON.stringify(context.state.lines));
    },
    clearCartData(ctx) {
      ctx.commit("setCartData", []);
    },
    initializeCart(ctx, store) {
      ctx.dispatch("loadCartDate");
      store.watch(
        (state) => state.cart.lines,
        () => ctx.dispatch("storeCartData"),
        { deep: true }
      );
    },
  },
};
