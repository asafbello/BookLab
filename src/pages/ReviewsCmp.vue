<template>
  <section>
    <el-carousel class="carousel">
      <el-carousel-item  v-for="(review, index) in reviews" :key="index">
          <div class="review-flex">
                <img :src="review.userAvatar" class="avatar"/>
            <blockquote height="100%">
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
            <p>{{review.createdAt | toDate}}</p>
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
    computed: {
    }
  }
};
</script>

<style scoped>
.carousel {
  height: 100%;
}

.review-flex {
  background-color: #ffffffde;
  width: 95vw;
  margin: auto;
}

blockquote {
  background-color: rgb(255, 255, 255, 0);
  border-radius: 6px;
  font-family: Georgia, serif;
  font-size: 1.2em;
  line-height: 1.4;
}

.el-carousel__item.is-animating {
  height: 100%;
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
.avatar {
  width: 10vw;
  display: block;
  border-radius: 2em;
  border: 0.1vw solid rgba(182, 182, 182, 0.363);
  box-shadow: 7px 4px 4px 0 rgba(7, 19, 26, 0.12),
    0 4px 12px 0 rgba(2, 23, 36, 0.12);
}
.book-name a {
  color: var(--secondary-color);
}
.review-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.review-flex * {
  padding: 0.5vw;
  margin: 0;
}
/* .img-wrraper{
    background: rgb(245, 245, 245);;
    margin-bottom: .5vw;
} */
@media screen and (max-width: 768px) {
  .reviews-header {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    margin-left: 3vw;
    margin-right: 3vw;
  }
  
  -wrapper {
    width: 22em;
  }

  .review-flex {
      width: 95%;
      margin: auto;
  }

  .avatar {
      width: 20vw;
  }
}
</style>