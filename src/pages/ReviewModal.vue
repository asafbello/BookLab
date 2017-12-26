<template>
    <form class="modal-header">
        <h1>{{googleBook.title}}</h1>
        <h2>{{googleBook.author}}</h2>
        <el-rate
            v-model="ratingVal"
            :texts="['Nah', 'Disappointed', 'Niceee', 'Great', 'Masterpiece!']"
            show-text>
            <span>Your rating</span>
            <p>So, what d'you think?</p>
            <textarea placeholder="Enter review(optional)"></textarea>
       </el-rate>
            <p>Dates read: </p>
            <div class="block">
                <span class="demonstration">With quick options</span>
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
    </form>
</template>

<script>
export default {
  data() {
    return {
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
    googleBook(){
      return this.$store.state.book.currGoogleBook
    }
  },
};
</script>

<style scoped>

</style>