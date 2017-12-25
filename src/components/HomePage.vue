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
      <el-button @click="search" type="primary" icon="el-icon-search">Search</el-button>
    </section>
    <section class="answers">
        <div class="books-res" v-for="book in bookSearchRes">
                <router-link :to="'/book/' + book.id">
                    <p> {{book.title}}  </p>
                      <img :src="book.thumbnail">
                </router-link>
        </div>
      </section>
</div>
</template>

<script>
import { LOAD_BOOKS } from "../store/modules/BookModule.js";
import APIService from "../services/APIService.js";
export default {
  name: "HomePage",
  data() {
    return {
      select: "book",
      input5: null,
      books: [],
      bookSearchRes:[]
    };
  },
  methods: {
    search() {
      APIService.searchBook(this.input5, this.select)
        .then(books => this.bookSearchRes = books)  
        .created(err => console.log("err", err))
    }
  },
  created() {
    this.$store
      .dispatch({ type: LOAD_BOOKS })
      .then(books => {
        console.log("we have books :)");
      })
      .catch(err => {
        console.log("err", err);
      });
  },
  computed: {
    booksToDisplay() {
      return this.$store.getters.booksToDisplay;
    },
    // isUser() {
    //   return this.$store.getters.isUser;
    // }
  }
};
</script>

<style scoped>
.search-book {
  padding: 2vw 3vw;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
}
.input-with-select {
  width: 70vw;
}
.answers{
  display: flex;
  flex-direction: column;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.342);
  align-items: center;
  
}
.books-res{
  display: flex;
  border: 1px white dashed;
}
.books-res img{
  height: 5vw;
}
</style>
