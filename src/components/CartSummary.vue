<template>
  <div class="float-right">
    <small
      >Your cart:
      <span v-if="itemCount > 0">
        {{ itemCount }} itemt(s) {{ totalPrice | currency }}
      </span>
      <span v-else>Empty</span>
    </small>
    <router-link
      to="cart"
      class="btn btn-sm bg-dark text-white"
      v-bind:disable="itemCount == 0"
    >
      <i class="fa fa-shopping-cart"></i>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      itemCount: "cart/itemCount",
      totalPrice: "cart/totalPrice",
    }),
  },
};
</script>
