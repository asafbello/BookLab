<template>
    <form class="modal-header" @keypress.native="closeOnEsc">
        <h1 class="book-details">{{currBook.title}} <span class="review-author">/ {{currBook.author}}</span></h1>
        <el-rate class="rating"
            v-model="ratingVal"
            :texts="['Nah', 'Disappointed', 'Niceee', 'Great', 'Masterpiece!']"
            show-text>
            <span>Your rating</span>
       </el-rate>
            <p>So, what d'you think?</p>
            <textarea rows="10" cols="50" placeholder="Enter review(optional)"></textarea>
            <p>Dates read: </p>
            <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                v-model="value7"
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
               <el-button @click.native="AddUserReview" type="success">Save</el-button>
               <el-button @click.native="closeModal" type="info">Cancel</el-button>
    </form>
</template>

<script>

import { GET_BOOK } from '../store/modules/BookModule.js'

export default {
  props: ['currBook'],
  data() {
    return {
      ratingVal: null,
      showModal: false,
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
      value7: ""
    };
  },
  methods:{
    closeModal() {
      this.$emit('closeFromCancel');
    },
    AddUserReview() {
      this.currBook.rate = this.ratingVal;
    },
    closeOnEsc() {
      this.$emit('closeModalOnEsc');
    }
  },
  created() {

  }
};
</script>

<style scoped>

.review-author {
  font-size: 16px;  
}

textarea {
  resize: none;
}
</style>