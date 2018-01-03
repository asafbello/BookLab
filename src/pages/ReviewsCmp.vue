<template>
  <section>
    <el-carousel class="carousel">
      <el-carousel-item  v-for="(review, index) in reviews" :key="index">
          <div class="reveiw-flex">
               <div class="img-wrraper"> <img :src="review.userAvatar" class="avatar"/></div>
            <blockquote>
            <router-link :to="'/user/' + review.byUserId">
                        {{review.userName}} said: </router-link>
                         &ldquo;{{review.review.txt}}&rdquo; ,
                        <p>about: <span class="book-name">
                        <router-link :to="'/book/' + review.foreignId">{{review.bookName}}
                        </router-link></span></p>
            <el-rate
                v-model="review.review.rate"
                disabled
                show-score
                text-color="#ff9900 "
                score-template="{value} stars">
            </el-rate>
            <p>{{review.createdAt | dateFrom}}</p>
            </blockquote>
            </div>
        </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script>
export default {
  props: ["reviews"],
  data() {
    return {
      hover: false
    };
    computed:{
    }
  },
};
</script>

<style scoped>
.carousel{
    height: 100%;
}
blockquote {
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
    font-family: Georgia, serif;
    font-size: 1.2em;
    line-height: 1.4;
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
.avatar{
    width: 7vw;
    display: block;
    border-radius: 2em;
    border: .1vw solid rgba(182, 182, 182, 0.363)
}
.book-name a{
color: var(--secondary-color)
}
.reveiw-flex{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}


.reveiw-flex *{
    padding: .5vw;
    margin: 0;
}
.img-wrraper{
    background: rgb(245, 245, 245);;
    margin-bottom: .5vw;
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
  .review-wrapper {
    width: 22em;
  }
}

</style>