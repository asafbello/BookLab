<template v-if="book">
  <section class="select-menu">
    <img class="img-icon-select"
                        src="https://png.icons8.com/office/100/000000/book-shelf.png">
              <el-select v-if="!isReadList" v-model="readState" placeholder="Mark Book"  @change="setBookToList">
                  <el-option v-for="list in listOptions"
                                :key="list.value"
                                :label="list.label"
                                :value="list.value"></el-option>
              </el-select>
              <h3 v-if="!!isReadList">{{isReadList}}</h3>
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
          value: "Reading",
          label: "Currently Reading"
        },
        {
          value: "Wish List",
          label: "Wish List"
        }
      ]
    };
  },
  computed: {},
  methods: {
    setBookToList() {
      var self = this;
      var book = this.book;
      this.isReadList = this.readState;
      if (!this.$store.getters.isUser) {
        this.$message.error("Oops, Please log in to add to a shelf");
      } else {
        if (this.readState === "wishList") {
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
              })
            )
            .catch(
              err =>
                this.$message({
                  message: "Oops, Something went wrong",
                  type: "error"
                }),
              (self.readState = null)
            );
        } else if (this.readState === "read") {
             console.log("read");
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
              })
            )
            .catch(
              err =>
                this.$message({
                  message: "Oops, Something went wrong",
                  type: "error"
                }),
              (self.readState = null)
            );
        } else {
            console.log('reading')
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
              })
            )
            .catch(
              err =>
                this.$message({
                  message: "Oops, Something went wrong",
                  type: "error"
                }),
              (self.readState = null)
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