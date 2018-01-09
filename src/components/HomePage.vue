<template>
    <div class="page-header">
      <section class="search-book">
        <div class="welcome-user">
                    <h2> Welcome to BookLub</h2>
                    <h1>Where Readers Meet Online</h1>
        </div>
            <div class="search-bar">
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
          </div>
        <div id="changing-imgs" class="shadow">
          <transition  name="fadeImgs">
            <img  v-if="imageNum === 0" src="../assets/img/authors/0.png" class="img-0">
          </transition>
          <transition  name="fadeImgs">          
            <img  v-if="imageNum === 1" src="../assets/img/authors/1.png" class="img-1">
          </transition>
          <transition  name="fadeImgs">
           <img v-if="imageNum === 2" src="../assets/img/authors/2.png" class="img-2">
          </transition> 
          <transition  name="fadeImgs">
            <img v-if="imageNum === 3" src="../assets/img/authors/3.png" class="img-3">
          </transition>
          <transition  name="fadeImgs">
            <img v-if="imageNum === 4" src="../assets/img/authors/4.png" class="img-4">
          </transition>     
          <transition  name="fadeImgs">
            <img v-if="imageNum === 5" src="../assets/img/authors/5.png" class="img-5">
          </transition>     
        </div>
        </section>
        <!-- CMPS -->
          <book-search-res :searchRes="bookSearchRes" v-loading="searching"
                            element-loading-text="Getting Your Books..."
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.342)">
          </book-search-res>
          <p class="txt-title"><i class="fa fa-user" aria-hidden="true"></i>Top Readers</p>
          <profiles-prev :profiles="profilesToDisplay"></profiles-prev>
                    <p class="txt-title"><i class="fa fa-book" aria-hidden="true"></i> Featured Books</p>
          <shelf-cmp v-if="booksToDisplay" :shelf="booksToDisplay"  v-loading="loading"></shelf-cmp>
        <div class="space"></div>
      <p class="txt-title"><i class="fa fa-comments" aria-hidden="true"></i>What Readers Think</p>
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
      recentReviews: null,
      imageNum: 0
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
    this.$store
      .dispatch({ type: LOAD_BOOKS })
      .then(books => {
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
      .then(reviews => (this.recentReviews = reviews))
      .catch(err => console.log(err));

    // CHANGE IMAGES
    setInterval(() => {
      if (this.imageNum === 5) this.imageNum = 0;
      else this.imageNum++;
    }, 2500);
  },

  computed: {
    //MAP GAETEERS
    ...mapGetters([
      "booksToDisplay",
      "isUser",
      "loggedInUser",
      "profilesToDisplay"
    ]),
    imageSrc() {
      return `../assets/img/bookCovers/${this.imageNum}.png`;
    }
  },
  destroyed: {

  },
  watcher: {},
  components: {
    ShelfCmp,
    ProfilesPrev,
    BookSearchRes,
    ReviewsCmp
    // QuotesCmp
  }
};
</script>

<style scoped>

/* Fade images */
.fadeImgs-enter-active,
.fadeImgs-leave-active {
  transition: opacity 0.5s;
}
.fadeImgs-enter,
.fadeImgs-leave-to {
  opacity: 0;
}

.img-5 {
  margin-left: 5.6vw;
}

.img-4 {
  margin-left: 4vw;
  /* margin-top: 2vh; */
}

.search-book {
  background: linear-gradient(0deg, #7a7993 1%, #1f315b 100%);
  padding: 2vw 3vw 5vw 3vw;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  height: 40vh;
}
.welcome-user {
  color: rgb(226, 226, 226);
  display: flex;
  padding-left: 35vw;
  margin: 4vw;
  flex-direction: column;
  align-content: flex-end;
  justify-content: flex-end;
  text-align: right;
}

.welcome-user h2 {
  font-size: 2em;
  letter-spacing: -1px;
  text-shadow: 1px 1px 0 #000;
  line-height: 50px;
}
.welcome-user h1 {
  padding: 1vw 0 0 0;
  color: #fff;
  font-family: "Righteous";
  font-size: 2em;
  font-weight: normal;
  /* line-height: 60px; */
  text-transform: uppercase;
  text-shadow: 2px 2px 0 #000;
}
.input-with-select {
  width: 65vw;
  z-index: 1;
}

.el-card {
  background: transparent;
  border: none;
}

.page-entry {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.txt-title {
  font-size: 1.8em;
  display: flex;
  justify-content: center;
  background: #ffffffde;
  color: #535a7b;
  width: 33vw;
  display: flex;
  margin: auto;
  margin-top: 6vh; 
  margin-bottom: 1vh;
}

.profile {
  justify-content: space-between;
  background-color: #ffffffde;
  margin-left: 2vw;
  margin-right: 2vw;
  margin-bottom: 1vh;
  /* margin-top: 3vh; */
}

.fa {
  margin-right: 1vw;
}

.el-button {
  z-index: 1;
}

@media screen and (max-width: 500px) {
  .search-book {
    background: inherit;
    height: 5vh;
  }
  .welcome-user {
    visibility: hidden;
  }

  .txt-title {
    margin: 0 0 0 0;
    padding: 1vh 0 0 2vw;
    color: white;
    text-align: left;
    font-size: 1.1em;
  }
}
</style>
