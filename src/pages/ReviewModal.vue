<template>
    <form class="modal-header">
        <h1 class="book-details">{{googleBook.title}} <span>/ {{googleBook.author}}</span></h1>
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
               <el-button type="success">Save</el-button>
               <el-button type="info">Cancel</el-button>
    </form>
</template>

<script>
export default {
  data() {
    return {
      ratingVal: null,
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
  created() {
    var googleBookId = this.$route.params.googleBookId;
    this.$store.dispatch({
      type: GET_BOOK,
      googleBookId: googleBookId
    });
  },
  computed: {
    googleBook() {
      return this.$store.state.book.currGoogleBook;
    }
  }
};
</script>

<style scoped>

</style>