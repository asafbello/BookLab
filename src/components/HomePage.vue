<template>
<div>
  <section class="search-book">
    <div>
    <el-input  @keyup.native="searchForBook()" :placeholder="'search and add '+ select" v-model="input5" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="Select">
        <el-option label="book" value="book"></el-option>
        <el-option label="author" value="author"></el-option>
      </el-select>
      </el-input>
    </div>
      <el-button @click.native="searchForBook()" type="primary" icon="el-icon-search">Search</el-button>
    </section>
    <section class="answers">
        <div class="books-res" v-for="book in bookSearchRes">
          <el-tooltip :content="book.volumeInfo.description" placement="bottom" effect="light">
                <el-button>{{book.volumeInfo.title}}</el-button>
          </el-tooltip>
                <!-- <img :src="book.volumeInfo.imageLinks.thumbnail" /> -->
            <router-link :to="'/book/' + book.id"> <el-button type="primary" size="mini">To Book Page</el-button></router-link>
            <el-badge :value="booksToDisplay.length" class="item">
              <el-button @click.native="addToShlef(book)" size="mini"><i class="fa fa-book" aria-hidden="true"></i></el-button>
            </el-badge>
        </div>
      </section>
      <shelf-cmp :shelf="booksToDisplay"></shelf-cmp>
</div>
</template>

<script>
import { LOAD_BOOKS, ADD_BOOK } from "../store/modules/BookModule.js";
import APIService from "../services/APIService.js";
import ShelfCmp from "./ShelfCmp";
import _ from "lodash";

export default {
  name: "HomePage",
  data() {
    return {
      select: "book",
      input5: null,
      books: [],
      bookSearchRes: []
    };
  },
  methods: {
    searchForBook: _.debounce(() => {
         APIService.searchBook(this.input5, this.select)
        .then(books => {
          this.bookSearchRes = books;
          console.log(books);
        })
        .catch(err => console.log("err", err));
        }, 300),
    // searchForBook() {
    //   APIService.searchBook(this.input5, this.select)
    //     .then(books => {
    //       this.bookSearchRes = books;
    //       console.log(books);
    //     })
    //     .catch(err => console.log("err", err));
    // },
    addToShlef(bookFromGoogleId) {
      //   var user = this.loggedinUser
      //   user.shelf.push(bookFromGoogleId)
      //   .dispatch({ type: UPDATE_USER , user})
      //       .then(user =>console.log(user))
      //       .catch(user => console.log(user))
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
    isUser() {
      return this.$store.getters.isUser;
    },
    loggedInUser() {
      return this.$store.state.user.loggedinUser;
    }
  },
  components: {
    ShelfCmp
  }
};
</script>

<style scoped>
.search-book {
  padding: 2vw 3vw 0 3vw;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
}
.input-with-select {
  width: 70vw;
}
.answers {
  display: block;
  position: absolute;
  z-index: 99;
  left: 15%;
  /* right:15%; */
  margin-left: auto;
  margin-right: auto;
}
.books-res {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1vw rgb(211, 211, 211) dashed;
  background-color: rgba(0, 0, 0, 0.342);
  width: 70vw;
  font-size: 0.8em;
  margin: 0.3vw;
}
.books-res * {
  padding: 0.3vw;
}
</style>
