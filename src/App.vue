<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",

  methods: {
    ...mapActions({getData:"getData",initializeCart:'cart/initializeCart'}),
  },
  created() {
    this.getData();
    this.initializeCart(this.$store)
  },
};
</script>
<style scoped></style>
