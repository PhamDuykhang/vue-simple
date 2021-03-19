<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-dark text-white">
        <a class="navbar-brand">SPORTS STORE</a>
        <cart-summary />
      </div>
    </div>
    <div class="row">
      <div class="col-3 bg-info p-2">
        <categoriescontrol class="mb-5" />
        <button class="btn btn-block btn-warning mt-5" v-on:click="setShowSearch(true)">Search</button>
      </div>
      <div class="col-9 bg-success p-2">
        <search />
        <productlist />
      </div>
    </div>
  </div>
</template>s

<script>
import { mapMutations } from 'vuex';
import CartSummary from "./CartSummary.vue";
import Categoriescontrol from "./categoriescontrol.vue";
import Productlist from "./productlist.vue";
import Search from "./Search.vue";

export default {
  components: {
    Productlist,
    Categoriescontrol,
    CartSummary,
    Search,
  },
  methods:{
    ...mapMutations(['setShowSearch'])
  }
};
</script>
