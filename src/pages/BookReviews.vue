<template v-if="reviews">
  <section>
    <h1 class="reviews-title">Latest readers reviews</h1>
    <ul >
      <li v-for="review in reviews"> 
          <div class="wrapper">
            <blockquote>
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
            <p class="author">
            &ndash;
            <strong>Doge</strong>,
            <router-link :to="'/user/' + review.byUserId">avi</router-link></p>
            </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["reviews"],
  data() {
    return {
      hover: false
    };
  },
  methods: {
  }
};
</script>

<style scoped>

.reviews-title {
    margin-bottom: 2vw;
    border-bottom: 1px solid var(--main-color);
}

.wrapper {
 width: 600px;
 margin: 24px auto;
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

.testimonialArrow {
    width: 0; 
    height: 0; 
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid rgb(255, 255, 255);
    margin-left: 48px;
}
p.author {
    background-color: transparent;
    font-weight: 500;
    font-size: 22px;
    line-height:22px;
    margin: 13px 0 0 18px;
}
strong {
 color: rgb(68, 68, 68);
}

a {
 color: rgb(64, 131, 169);
 text-decoration: none;
}

</style>