<template>
<div>
  <h2>{{quote.q}}</h2>
  <h4>{{quote.author}}</h4>
</div>
</template>

<script>

import QuotesService from '../services/QuotesService.js'

export default {

  data() {
    return {
        quote: ''
    };
  },
  created() {
      this.quote = QuotesService.getQuote();
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