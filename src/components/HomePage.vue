<template>
<div>
  <section class="search-book">
    <div>
    <el-input :placeholder="'search and add '+ select" v-model="input5" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="Select">
        <el-option label="book" value="book"></el-option>
        <el-option label="author" value="author"></el-option>
      </el-select>
      </el-input>
    </div>
      <el-button type="primary" icon="el-icon-search">Search</el-button>
    </section>
</div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      select: 'book',
      input5: null
    }
  }
}
</script>

<style scoped>
  .search-book{
    padding: 2vw 3vw;
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;
  }
  .input-with-select{
    width: 70vw;
  }
  .el-icon-search{
    color: red;
  }
</style>
