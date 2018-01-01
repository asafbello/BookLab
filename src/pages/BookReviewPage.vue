<template>
 <div class="review-card">
    <el-card :body-style="{ padding: '0px' }" class="review-cards">
      <img :src="currBook.review.img" class="image">
      <div style="padding: 14px;" class="left-panel-content">
        <span>{{ currBook.review.title}}</span>
        <div class="bottom clearfix">
          <time class="time">Book by: {{ currBook.review.author }}</time> <br>
          <time class="time">My rate: {{ currBook.review.rate }}</time> <br>
          <p> {{ currBook.review.txt }}</p>
          <el-button type="text" class="button"  @click="goBack" >Go back to profile </el-button>

        </div>
      </div>
    </el-card>
</div>

</template>
<script>
import { SIGNOUT } from "../store/modules/UserModule.js";

export default {
  name: "BookReviewPage",
  data() {
    return {
      bookId: ""
    };
  },
  computed: {
    currBook() {
      return this.$store.state.user.loggedinUser.reviews.find(review => {
        return review.review.id === this.bookId;
      });
    }
  },
  created() {
    this.bookId = this.$route.params.id;
  },
  methods: {
      goBack() {
            this.$router.push( `/user/MyProfile`)
      }
  }
};
</script>

<style>
.review-card {
  width: 70%;
  margin: auto;
  margin-top: 5%;
}

</style>

