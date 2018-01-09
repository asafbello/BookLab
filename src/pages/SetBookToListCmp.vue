<template v-if="book">
  <section class="select-menu">
              <el-select v-model="readState" placeholder="Mark Book" @change="setBookToList">
                  <el-option v-for="list in listOptions"
                                :key="list.value"
                                :label="list.label"
                                :value="list.value"></el-option>
              </el-select>
  </section>
</template>

<script>
import {
  ADD_TO_WISH_LIST,
  ADD_TO_READ_LIST,
  ADD_TO_READING_LIST
} from "../store/modules/UserModule.js";
export default {
  props: ["book"],
  data() {
    return {
      isReadList: null,
      readState: null,
      listOptions: [
        {
          value: "Read",
          label: "Read"
        },
        {
          value: "Currently Reading",
          label: "Currently Reading"
        },
        {
          value: "Wish List",
          label: "Wish List"
        }
      ]
    };
  },
  created(){
      var user = this.$store.state.user.loggedinUser; 
      var bookId = this.$route.params.googleBookId; 

      var wishList = user.wishList.filter(book => {
        return book.forigenId === bookId
      })
      var readList = user.readList.filter(book => {
        return book.forigenId === bookId
      })
      console.log(wishList,user,bookId,'wish list')
      if(wishList.length > 0) this.readState = 'Wish List'
      else if(readList .length > 0) this.readState = 'Read'
      else this.readStat = null
  },
  computed: {
  },
  methods: {
    setBookToList() {
      var self = this;
      var book = this.book;
      this.isReadList = this.readState;
      if (!this.$store.getters.isUser) {
        this.$message.error("Oops, Please log in to add to a shelf");
      } else {
        if (this.readState === "Wish List") {
          console.log("wishList");
          this.$store
            .dispatch({
              type: ADD_TO_WISH_LIST,
              id: this.$store.state.user.loggedinUser._id,
              book
            })
            .then(_ =>
              this.$message({
                message: "This Book Was Added To Your Wish List",
                type: "success"
              }),
              self.readState = 'Wish List'
            )
            .catch(
              err =>
                this.$message({
                  message: "Oops, Something went wrong",
                  type: "error"
                }),
            );
        } else if (this.readState === "Read") {
          this.$store
            .dispatch({
              type: ADD_TO_READ_LIST,
              id: this.$store.state.user.loggedinUser._id,
              book
            })
            .then(_ =>
              this.$message({
                message: "This Book Was Added To Your Read List",
                type: "success"
              }),
              self.readState = 'Read'
            )
            .catch(
              err =>
                this.$message({
                  message: "Oops, Something went wrong",
                  type: "error"
                }),
            );
        } else {
            console.log('Reading')
          this.$store   
            .dispatch({
              type: ADD_TO_READING_LIST,
              id: this.$store.state.user.loggedinUser._id,
              book
            })
            .then(_ =>
              this.$message({
                message: "This Book Was Added To Your Reading List",
                type: "success"
              }),
              self.readState = 'Currently Reading'
            )
            .catch(
              err =>
                this.$message({
                  message: "Oops, Something went wrong",
                  type: "error"
                }),
            );
        }
      }
    }
  }
};
</script>

<style scoped>
.select-menu {
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  margin: auto;
  margin-top: 5%;
}
@media screen and (max-width: 768px) {
}
</style>