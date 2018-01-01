<template>
    <div>
      <section class="search-book">
        <div>
            <el-input  @keyup.native="searchForBook()" 
               suffix-icon="el-icon-search" 
               :placeholder="'search and add '+ select" 
               v-model="input5" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="Select">
                    <el-option label="book" value="book"></el-option>
                    <el-option label="author" value="author"></el-option>
              </el-select>
              </el-input>
            </div>
          <el-button  v-if="!input5"  @click.native="searchForBook()" type="primary" icon="el-icon-search">Search</el-button>
          <el-button  v-else @click.native="clearSearch()" type="primary" icon="el-icon-search">Clear</el-button>
        </section>
        <!-- CMPS -->
          <book-search-res :searchRes="bookSearchRes" v-loading="searching"
                            element-loading-text="Getting Your Books..."
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.342)"></book-search-res>
          <profiles-prev :profiles="profilesToDisplay"></profiles-prev>
          <shelf-cmp v-if="booksToDisplay" :shelf="booksToDisplay"  v-loading="loading"></shelf-cmp>
        <!-- CMPS -->
   </div>
</template>

<script>
import _ from "lodash";
import { LOAD_BOOKS, ADD_BOOK } from "../store/modules/BookModule.js";
import { LOAD_PROFILES } from "../store/modules/ProfileModule.js";
import { mapGetters } from "vuex";

import APIService from "../services/APIService.js";

import ShelfCmp from "./ShelfCmp";
import ProfilesPrev from "../pages/ProfilesPrev";
import BookSearchRes from "../pages/BookSearchRes";

export default {
  name: "HomePage",
  data() {
    return {
      select: "book",
      input5: null,
      books: [],
      bookSearchRes: [],
      loading: true,
      searchMode: "Clear",
      searching: false
    };
  },
  methods: {
    searchForBook: _.debounce(function() {
      if (this.input5 === "") {
        this.bookSearchRes = null;
        return;
      } else {
        this.searching = true;
        var self = this;
        APIService.searchBook(this.input5, this.select)
          .then(function(books) {
            self.bookSearchRes = books;
            this.searching = false;
          })
          .catch(err => (this.searching = false));
      }
    }, 300),
    addToShlef(bookFromGoogleId) {
      this.bookSearchRes = null;
      //   var user = this.loggedinUser
      //   user.shelf.push(bookFromGoogleId)
      //   .dispatch({ type: UPDATE_USER , user})
      //       .then(user =>console.log(user))
      //       .catch(user => console.log(user))
    },
    clearSearch() {
      this.input5 = "";
      this.bookSearchRes = [];
      // this.searchMode = 'Search'
    }
  },
  created() {
    // GET BOOKS
    var shelf = [
      "c_KYSDoCYQ4C",
      "DKcWE3WXoj8C",
      "kUeDc_wYSnoC",
      "pj16s_fnr08C",
      "twHgJGtm3o4C"
    ];
    this.$store
      .dispatch({ type: LOAD_BOOKS, shelf })
      .then(books => {
        console.log("we have books :)");
        this.loading = false;
      })
      .catch(err => {
        console.log("err", err);
      });
    //GET PROFILES
    this.$store
      .dispatch({ type: LOAD_PROFILES })
      .then(_ => {
        console.log("Getting profiles", _);
      })
      .catch(err => {
        console.log("err", err);
      });
  },
  computed: {
    //MAP GAETEERS
      ...mapGetters(['booksToDisplay', 'isUser', 'loggedInUser', 'profilesToDisplay']), 
  },
  watcher: {},
  components: {
    ShelfCmp,
    ProfilesPrev,
    BookSearchRes
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

.page-entry {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
</style>
