<template>
  <div>
    <div
      v-for="product in products"
      :key="product.id"
      class="card m-1 p-1 bg-light"
    >
      <h4>
        {{ product.name }}
        <span class="badge badge-pill badge-primary float-right">
          {{ product.price | currency }}
        </span>
      </h4>
      <div class="card-text bg-white p-1">
        {{ product.description }}
        <button
          class="btn btn-success btn-sm float-right"
          v-on:click="handleProductAdd(product)"
        >
          Add to cart
        </button>
      </div>
    </div>
    <pagecontroll />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import pagecontroll from "./pagecontroll.vue";
export default {
  components: { pagecontroll },
  computed: {
    ...mapGetters({ products: "processedProducts" }),
  },
  methods: {
    ...mapMutations({addProduct:'cart/addProduct'}),
    handleProductAdd(product) {
  
      this.addProduct(product)
      this.$router.push("/cart");
    },
  },
};
</script>
