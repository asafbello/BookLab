<template>
  <section class="reviews-header">
    <!-- <h1 class="reviews-title">Latest readers reviews</h1> -->
    <!-- <ul>
      <li class="review" v-for="(review, index) in reviews" :key="index"> 
          <div class=".eview-wrapper ">
            <blockquote>
            <router-link :to="'/user/' + review.byUserId">{{review.userName}} said: </router-link>
            &ldquo;{{review.review.txt}}&rdquo;
            <el-rate
                v-model="review.review.rate"
                disabled
                show-score
                text-color="#ff9900 "
                score-template="{value} stars">
            </el-rate>
            </blockquote>
            <div class="testimonialArrow"></div>
            <p class="author"></p>
       
            </div>
      </li>
    </ul> -->
  
      <div class="review" v-for="(review, index) in reviews" :key="index"> 
          <div class=".eview-wrapper ">
            <blockquote>
            <router-link :to="'/user/' + review.byUserId">{{review.userName}} said: </router-link>
           <p> &ldquo;{{review.review.txt}}&rdquo;</p>
            <el-rate
                v-model="review.review.rate"
                disabled
                show-score
                text-color="#ff9900 "
                score-template="{value} stars">
            </el-rate>
            </blockquote>
            <div class="testimonialArrow"></div>
            <p class="author"></p>
            </div>
      </div>
  
  </section>
</template>

<script>
export default {
  props: ["reviews"],
  data() {
    return {
      hover: false
    };
  }
  // computed: {
  //   loggedinUser() {
  //     return this.$store.state.user.currProfile;
  //   }
  // },
};
</script>

<style scoped>
p {
word-wrap:break-word;
margin-top: 0;
margin-bottom: 0.5%;

}

.reviews-header {
  display: flex;
  flex-flow: row wrap;
  padding: 1%;
  justify-content: space-around;
}

.review {
  width: 100%;
  margin: 2%;
  /* justify-content: space-around; */
  
}

blockquote {
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  font-family: Georgia, serif;
  font-size: 22px;
  line-height: 1.4;
  margin: 0;
  padding: 17px;
}

p.author {
  background-color: transparent;
  font-weight: 500;
  font-size: 22px;
  line-height: 22px;
  margin: 13px 0 0 18px;
}
strong {
  color: rgb(68, 68, 68);
}

a {
  color: rgb(64, 131, 169);
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  .reviews-header {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    margin-left: 3vw;
    margin-right: 3vw;
  }
  .wrapper {
    width: 22em;
  }

  .review {
  width: 100%;
  margin: 1%;
}
}
</style>