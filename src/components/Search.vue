<template>
  <div v-if="showSearch" class="row my-2">
    <label class="col-2 col-form-label text-right" for="search">Search:</label>
    <input
      class="col from-control"
      name="search"
      id="search"
      :value="searchTerm"
      v-on:change="doSearch"
      placeholder="Enter your search term..."
    />
    <button
      class="col-1 btn btn-sm btn-secondary mx-4"
      v-on:click="handleClose"
    >
      Close
    </button>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({ showSearch: "showSearch", searchTerm: "searchTerm" }),
  },
  methods: {
    ...mapMutations(["setShowSearch"]),
    ...mapActions(["clearSearchTerm", "search"]),
    handleClose() {
      this.clearSearchTerm();
      this.setShowSearch(false);
    },
    doSearch($event) {
      this.search($event.target.value);
    },
  },
};
</script>
