import axios from "axios";
import Vue from "vue";

import Vuex from "vuex";
import auth from "./auth";
import cartModule from "./cart";
import orderModule from "./order";

Vue.use(Vuex);
const baseURL = "/api";
const productURL = `${baseURL}/products`;
const categoriesURL = `${baseURL}/categories`;

export default new Vuex.Store({
  strict: false,
  namespace: true,
  modules: {
    cart: cartModule,
    order: orderModule,
    auth: auth,
  },
  state: {
    // products: [],
    categoriesData: [],
    // productTotal: 0,
    currentPage: 1,
    pageSize: 4,
    currentCategory: "ALL",
    pages: [],
    serverPageCount: 0,
    searchTerms: "",
    showSearch: false,
  },
  getters: {
    processedProducts: function(state) {
      return state.pages[state.currentPage];
    },
    pageCount: (state) => {
      return state.serverPageCount;
    },
    productID(state){
      return function (id){
        return state.pages[state.currentPage].find(p => p.id == id);
      }
    },

    // productsFilteredByCategory: (state) =>
    //   state.products.filter(
    //     (p) =>
    //       state.currentCategory == "All" || p.category == state.currentCategory
    //   ),
    categories: (state) => ["All", ...state.categoriesData],
  },
  mutations: {
    _setCurrentPage: function(state, page) {
      state.currentPage = page;
    },
    _setPageSize: function(state, size) {
      state.currentPage = 1;
      state.pageSize = size;
    },
    _setCurrentCategory(state, cat) {
      state.currentCategory = cat;
      state.currentPage = 1;
    },
    // setData(state, data) {
    //   state.products = data.productData;
    //   state.productTotal = data.productData.length;
    //   state.categoriesData = data.catData.sort();
    // },
    addPage(state, page) {
      for (let i = 0; i < page.pageCount; i++) {
        Vue.set(
          state.pages,
          page.number + i,
          page.data.slice(
            i * state.pageSize,
            i * state.pageSize + state.pageSize
          )
        );
      }
    },
    _adProduct(state,product){
       state.pages[state.currentPage].unshift(product)
    },
    _updateProduct(state, product) {
      let page = state.pages[state.currentPage];
      let index = page.findIndex(p => p.id == product.id);
      Vue.set(page, index, product);
    },

    clearPage(state) {
      return state.pages.splice(0, state.pages.length);
    },
    setCategories(s, c) {
      s.categoriesData = c;
    },
    setPageCount(s, c) {
      s.serverPageCount = Math.ceil(Number(c) / s.pageSize);
    },
    setShowSearch(s, show) {
      s.showSearch = show;
    },
    setSearchTerm(s, t) {
      s.searchTerms = t;
      s.currentPage = 1;
    },
  },
  actions: {
    async getData(context) {
      await context.dispatch("getPage", 2);
      context.commit("setCategories", (await axios.get(categoriesURL)).data);
    },
    async getPage(context, getPageCount = 1) {
      let url = `${productURL}?_page=${
        context.state.currentPage
      }&_limit=${context.state.pageSize * getPageCount}`;
      if (context.state.currentCategory != "ALL") {
        url += `&category=${context.state.currentCategory}`;
      }
      if (context.state.searchTerms != "") {
        url += `&q=${context.state.searchTerms}`;
      }
      let response = await await axios.get(url);
      context.commit("setPageCount", response.headers["x-total-count"]);
      context.commit("addPage", {
        number: context.state.currentPage,
        data: response.data,
        pageCount: getPageCount,
      });
    },
    setCurrentPage(ctx, page) {
      ctx.commit("_setCurrentPage", page);
      if (!ctx.state.pages[page]) {
        ctx.dispatch("getPage");
      }
    },
    async productById({ getters }, id) {
      let data = getters.processedProducts.find((p) => p.id == id);
      return data;
    },
    async updateProduct(context, product) {
      await context.getters.authenticatedAxios.put(
        `${productURL}/${product.id}`,
        product
      );
      context.commit("_updateProduct", product);
    },
    async removeProduct(context, product) {
      await context.getters.authenticatedAxios.delete(
        `${productURL}/${product.id}`,
      );
      context.commit("clearPage");
      context.dispatch("getPage",1);
    },
    setPageSize(ctx, size) {
      ctx.commit("clearPage");
      ctx.commit("_setPageSize", size);
      ctx.dispatch("getPage", 2);
    },
    setCurrentCategory(context, category) {
      context.commit("clearPage");
      context.commit("_setCurrentCategory", category);
      context.dispatch("getPage", 2);
    },
    search(ctx, term) {
      ctx.commit("setSearchTerm", term);
      ctx.commit("clearPage");
      ctx.dispatch("getPage", 2);
    },
    clearSearch(ctx) {
      ctx.commit("setSearchTerm", "");
      ctx.commit("clearPage");
      ctx.dispatch("getPage", 2);
    },
  },
});
