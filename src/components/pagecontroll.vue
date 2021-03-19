<template>
  <div class="row mt-2">
    <div class="col-3 form-group">
      <select class="from-control" v-on:change.stop="changePageSize">
        <option value="4">4 per page</option>
        <option value="8">8 per page</option>
        <option value="12">12 per page</option>
      </select>
    </div>
    <div class="text-right col">
      <!-- <div class="bnt-group mx-2">
        <button
          v-for="i in pageNumbers"
          :key="i"
          v-bind:class="{
            'btn-primary': i === currentPage,
            'btn-secondary': i !== currentPage,
          }"
          v-on:click="setCurrentPage(i)"
          class="btn"
        >
          {{ i }}
        </button>

      </div> -->

      <button
        class="btn btn-secondary mx-1"
        v-bind:disabled="currentPage == 1"
        v-on:click="setCurrentPage(currentPage - 1)"
      >
        Previous
      </button>
      <span v-if="currentPage > 4">
        <button
          class="btn btn-secondary mx-1"
          v-bind:disable="currentPage == 1"
          v-on:click="setCurrentPage(1)"
        >
          <span class="h4">...</span>
        </button>
      </span>
      <span class="mx-1">
        <button
          v-for="i in pageNumbers"
          :key="i"
          v-bind:class="{
            'btn-primary': i === currentPage,
            'btn-secondary': i !== currentPage,
          }"
          v-on:click="setCurrentPage(i)"
          class="btn"
        >
          {{ i }}
        </button>
      </span>
      <span v-if="currentPage <= pageCount - 4">
        <span class="h4">...</span>
        <button
          class="btn btn-secondary mx-1"
          v-on:click="setCurrentPage(pageCount - 1)"
        >
          {{ pageCount }}
        </button>
      </span>
      <button
        v-bind:disabled="currentPage == pageCount"
        v-on:click="setCurrentPage(currentPage + 1)"
        class="btn btn-secondary mx-1"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["currentPage"]),
    ...mapGetters(["pageCount"]),
    pageNumbers: function() {
      if (this.pageCount < 4) {
        return [...Array(this.pageCount + 1).keys()].splice(1);
      } else if (this.currentPage <= 4) { 
        return [1, 2, 3, 4, 5];
      } else if (this.currentPage > this.pageCount - 4) {
        return [...Array(5).keys].reverse().map((v) => this.pageCount - v);
      } else {
        return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
      }
    },
  },
  methods: {
    ...mapActions(["setCurrentPage", "setPageSize"]),
    changePageSize: function($event) {
      this.setPageSize(Number($event.target.value));
    },
  },
};
</script>
