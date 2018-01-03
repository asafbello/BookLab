<template>
    <section class="bg-modal" @keyup.esc="closeOnEsc">
      <div class="modal-content">
            <!-- <div class="card-book" v-for="(book, index) in list" :key="index">  -->
                    <el-card class="card-book" v-for="(book, index) in list" :key="index">
                        <img @click="goTobookDetails(book.forigenId)" 
                              :src="book.img" class="wl-modal-image">
                        <div>
                            <span>{{book.title}}</span>
                                <p>By {{book.author}}</p>
                                <el-button v-if="theUserHimself" 
                                            type="text" class="button" 
                                            @click.native="removeFromList(list,book)">
                                            Remove</el-button>  
                        </div>
                        </el-card>                  
            <!-- </div> -->
            </div>
              <el-button class="modal-btn" type="default" 
                            @click.native="closeModal">
                            Close</el-button>
    </section>
</template>

<script>

import { REMOVE_FROM_WISH_LIST, REMOVE_FROM_READ_LIST } from "../store/modules/ProfileModule.js";


export default {
  props: ['list','theUserHimself'],
  data() {
    return {
      showDeleted: true
    }
  },

  methods: {
    closeModal() {
      this.$emit("closeFromCancel");
    },
    goTobookDetails(id) {
      this.$router.push(`/book/${id}`);
    },

    removeFromList(list,book) {
      var self = this
      if(list ===  this.$store.state.profile.currProfile.wishList ) {
            this.$store.dispatch({
                  type: REMOVE_FROM_WISH_LIST,
                  id: this.$store.state.user.loggedinUser._id,
                  bookId: book._id
          })
          .then(res => {
            self.$message({
                   message: 'Your book removed from wish list.',type: 'warning'});
            self.$emit("closeFromCancel")
            })
          .catch(err => {throw err})
      } else{
            this.$store.dispatch({
                  type: REMOVE_FROM_READ_LIST,
                  id: this.$store.state.user.loggedinUser._id,
                   bookId: book._id
          })
          .then(res => {
             self.$message({
                   message: 'Your book removed from read list.',type: 'warning'});
            self.$emit("closeFromCancel")
            })
          .catch(err => {throw err})
      }
    },

  },

  computed: {
  }
};
</script>

<style scoped>
.bg-modal{
  z-index: 1;
}
.card-book{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 2vh;
  padding: 0
}

.modal-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.wl-modal-image {
  width: 100%;
  display: block;
  transition: all .5s ease;

}
.wl-modal-image:hover{
    box-shadow: 7px 4px 4px 0 rgba(7, 19, 26, 0.12), 0 4px 12px 0 rgba(2, 23, 36, 0.12);
    transform: translateY(-1px);
    cursor: pointer;
}


@media screen and (max-width: 768px) {
  .card-book {
    height: 30vh;
  }
  .card-book img{
    width: 17vw;
  }
}
</style>