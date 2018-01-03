<template>
    <form class="modal-header" @keypress.native="closeOnEsc">
        <h1 class="book-details">{{currBook.title}} <span class="review-author">/ {{currBook.author}}</span></h1>
      <div><el-rate class="rating"
            v-model="ratingVal"
            :texts="['Nah', 'Disappointed', 'Nice', 'Great', 'Masterpiece!']">
       </el-rate></div>
            <p>So, what d'you think?</p>
            <textarea rows="10" cols="50" placeholder="Enter review(optional)" v-model="txtRate"></textarea>
            <p>Dates read: </p>
            <div class="block">
                <span class="demonstration"></span>
                <el-date-picker 
                class="picker"
                v-model="readDates"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                :picker-options="pickerOptions2">
                </el-date-picker>
             </div>
             <br>
               <el-button @click.native="addUserReview" type="success" class="add-btn">Add Your Review</el-button>
               <el-button @click.native="closeModal" type="info">Cancel</el-button>
    </form>
</template>

<script>
import { GET_BOOK } from "../store/modules/BookModule.js";
import state from "../store/modules/UserModule.js";

export default {
  props: ["currBook"],
  computed: {},
  data() {
    return {
      ratingVal: null,
      txtRate: "",
      pickerOptions2: {
        shortcuts: [
          {
            text: "Last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last 3 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value6: "",
      readDates: ""
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeFromCancel");
    },
    addUserReview() {
      var reviewUser = {
        createdAt: Date.now(),
        foreignId: this.currBook.foreignId,
        review: {
          book: this.currBook.title,
          author: this.currBook.author,
          pages: this.currBook.pages,
          img: this.currBook.img,
          id: this.currBook._id,
          txt: this.txtRate,
          rate: this.ratingVal,
          readDates: this.readDates
        }
      };
      var reviewBook = {
        userName: this.$store.state.user.loggedinUser.username,
        userAvatar: this.$store.state.user.loggedinUser.avatar,
        byUserId: this.$store.state.user.loggedinUser._id,
        createdAt: Date.now(),
        review: {
          txt: this.txtRate,
          rate: this.ratingVal,
          readDates: this.readDates
        },
         bookName: this.currBook.title,
         foreignId: this.currBook.foreignId
      };
      this.$emit("addUserReview", reviewBook, reviewUser);
    },
    closeOnEsc() {
      this.$emit("closeModalOnEsc");
    }
  }
};
</script>

<style scoped>

.review-author {
  font-size: 16px;
}

textarea {
  resize: none;
  padding-left: 8px;
  width: 100%;
  height: 100%;
}

.picker {
  cursor: pointer;
}

.add-btn {
  margin-bottom: 2vw;
}

@media screen and (max-width: 768px) {
  .modal-header {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    margin-left: 3vw;
    margin-right: 3vw;
  }

  textarea {
    display: flex;
    max-width: 100%;
  }

  .block {
    display: flex;
    max-width: 100%;
  }

  .picker {
    display: flex;
    max-width: 100%;
    width: 70vw;
  }

  .cancel-btn {
    margin-top: 2vw;
  }
  
}
</style>