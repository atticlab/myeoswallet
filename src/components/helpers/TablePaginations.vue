<template>
  <div id="main">
    <ul class="pagination">
      <li :class="{ disabled: currentPage === 1 }" @click="prevPage">
        <a @click.prevent href="#"><font-awesome-icon icon="angle-left"/></a>
      </li>

      <li v-for="n in pager"
          @click.prevent="setCurrentPage(n)"
          :key="n"
          :class="{active: localCurrentPage === n}">
        <a @click.prevent href="#">{{ n }}</a>
      </li>

      <li :class="{ disabled: currentPage === totalPages}" @click="nextPage">
        <a @click.prevent href="#"><font-awesome-icon icon="angle-right"/></a>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'TablePaginations',
  data() {
    return {
      localCurrentPage: this.currentPage,
    };
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
  },
  watch: {
    localCurrentPage() {
      this.$emit('changeCurrentPageEvent', this.localCurrentPage);
    },
  },
  computed: {
    totalPages() {
      return Math.max(Math.ceil(this.totalItems / this.itemsPerPage), 1);
    },
    pager() {
      return _.range(1, this.totalPages + 1);
    },
  },
  methods: {
    nextPage() {
      if (this.localCurrentPage < this.totalPages - 1) {
        this.localCurrentPage += 1;
      }
    },
    prevPage() {
      if (this.localCurrentPage > 1) {
        this.localCurrentPage -= 1;
      }
    },
    setCurrentPage(n) {
      this.localCurrentPage = n;
    },
  },
};
</script>

<style scoped>
  .pagination li {
    display: inline-block;
    padding: 8px;
  }
</style>

<style>
  .md-theme-default li.active a {
    color: white;
  }
</style>
