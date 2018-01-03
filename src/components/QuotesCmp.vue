<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="(quote, idx) in quotes" :key="idx">
      <h2>{{ quote.q }}</h2>
      <h4>{{ quote.author }}</h4>
    </el-carousel-item>
  </el-carousel>
</template>

<script>

import QuotesService from '../services/QuotesService.js'

export default {

  data() {
    return {
        quotes: []
    };
  },
  created() {
      this.quotes = QuotesService.getQuotes();
  }
};

</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>