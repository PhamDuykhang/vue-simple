<template>
  <div class="container-fluid">
    <div class="row my-2" v-for="c in categories" :key="c">
      <button
        v-on:click="setCurrentCategory(c)"
        class="btn btn-block"
        :class="c == currentCategory ? 'btn-primary' : 'btn-secondary'"
      >
        {{ c }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentCategory"]),
    ...mapGetters(["categories"]),
  },
  methods: {
    ...mapActions(["setCurrentCategory"]),
  },
};  
</script>
