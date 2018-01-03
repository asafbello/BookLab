<template>
    <div class="page-header">
        <div id="changing-imgs" class="shadow">
        <img src="../assets/img/bookCovers/0.png" class="img-0">
        <img src="../assets/img/bookCovers/1.png" class="img-1">
        <img src="../assets/img/bookCovers/2.png" class="img-2">
        </div>
      <section class="search-book">
                <el-input  @keyup.native="searchForBook()" 
                  suffix-icon="el-icon-search" 
                  :placeholder="'search and add '+ select" 
                  v-model="input5" class="input-with-select">
                  <el-select v-model="select" slot="prepend" placeholder="Select">
                        <el-option label="book" value="book"></el-option>
                        <el-option label="author" value="author"></el-option>
                  </el-select>
                  </el-input>
              <el-button  v-if="!input5"  @click.native="searchForBook()" type="primary" icon="el-icon-search">Search</el-button>
              <el-button  v-else @click.native="clearSearch()" type="primary" icon="el-icon-search">Clear</el-button>
        </section>
        <!-- CMPS -->
          <book-search-res :searchRes="bookSearchRes" v-loading="searching"
                            element-loading-text="Getting Your Books..."
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.342)">
          </book-search-res>
          <p class="txt-title"><i class="fa fa-user" aria-hidden="true"></i> Recently Joined Readers:</p>
          <profiles-prev :profiles="profilesToDisplay"></profiles-prev>
                    <p class="txt-title"><i class="fa fa-book" aria-hidden="true"></i> Latest Books In BookLub:</p>
          <shelf-cmp v-if="booksToDisplay" :shelf="booksToDisplay"  v-loading="loading"></shelf-cmp>
        <div class="space"></div>
      <p class="txt-title"><i class="el-icon-tickets"></i> Latest Reviews In BookLub:</p>
          <div class="space"></div>
        <reviews-cmp :reviews="recentReviews"></reviews-cmp>
        <!-- <quotes-cmp></quotes-cmp> -->
        <!-- CMPS -->
   </div>
</template>

<script>
import _ from "lodash";
import { LOAD_BOOKS, ADD_BOOK } from "../store/modules/BookModule.js";
import { LOAD_PROFILES } from "../store/modules/ProfileModule.js";
import { mapGetters } from "vuex";

import APIService from "../services/APIService.js";
import ReviewService from "../services/ReviewService.js";

import ShelfCmp from "./ShelfCmp";
import ProfilesPrev from "../pages/ProfilesPrev";
import BookSearchRes from "../pages/BookSearchRes";
import ReviewsCmp from "../pages/ReviewsCmp";
import QuotesCmp from "../components/QuotesCmp";

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
      searching: false,
      recentReviews:null
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
    console.log(this.$filters)
    // GET BOOKS
    this.$store
      .dispatch({ type: LOAD_BOOKS })
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
    // GET REVIEWS
  ReviewService.getReviews()
        .then(reviews => this.recentReviews = reviews)
        .catch(err => console.log(err))
  },
  computed: {
    //MAP GAETEERS
      ...mapGetters(['booksToDisplay', 'isUser', 'loggedInUser', 'profilesToDisplay']), 
  },
  watcher: {},
  components: {
    ShelfCmp,
    ProfilesPrev,
    BookSearchRes,
    ReviewsCmp,
    // QuotesCmp
  }
};
</script>

<style scoped>

.search-book {
  background: linear-gradient(45deg, #7a7993 1%,#1f315b 100%); 
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7a7993', endColorstr='#1f315b',GradientType=1 );
  padding: 2vw 3vw 5vw 3vw;
  display: flex;
  flex-direction: row;
  /* flex: 1; */
  justify-content: center;
  align-items: flex-end;
  height: 40vh;
}
.input-with-select {
  width: 70vw;
}

.page-entry {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.txt-title{
  margin: 0 0 0 0 ;
  padding: 1vh 0 0 2vw;
  color: var(--main-color);
  text-align: left;
  /* text-decoration: underline */

}

body::after {
  background: url('../assets/img/home.jpeg');
  background-repeat: no-repeat;
  content: "";
  opacity: 0.45;
  background-size: cover;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
}

/* .page-header {
  background-image: url('../assets/img/home.jpeg');
  background-repeat: no-repeat;
  opacity: 0.85;
  z-index: -1;   */
  /* background-size: cover;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  content: "";
  left: 0; */
  
  /* } */
/* body::after {
  background: url('../assets/img/home.jpeg');
  background-repeat: no-repeat;
  content: "";
  opacity: 0.45;
  background-size: cover;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
} */

.space{
  margin: 5vh;
}
</style>
