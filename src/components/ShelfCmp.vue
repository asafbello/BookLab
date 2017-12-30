<template>
<section class="shelf-cmp">
  <div class="books">
      <el-carousel :interval="6000" type="card">
            <el-carousel-item v-for="book in shelf" :key="book.forigenId">
              <router-link :to="'/book/' + book.forigenId">
                   <h3>
                     <i class="fa fa-book" aria-hidden="true"></i> {{ book.title }}
                    </h3>
                  <p v-loading="loading"><img :src="book.img"  class="image" v-on:load="isLoading"></p>
               </router-link>
            </el-carousel-item>
      </el-carousel>
  </div>
          <div class="shelf animated  swing" v-if="show">
              <div class="bottom-shelf"></div>
              <div class="bottom-shelf-edge"></div>
          </div>
</section>
</template>

<script>
export default {
  name: "ShelfCmp",
  props: ["shelf"],
  methods: {
    isLoading() {
      this.loading = false;
    }
  },
  data() {
    return {
      show: false,
      loading: true
    };
  },
  created() {
    setTimeout(() => {
      this.show = true;
    }, 0.5);
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: var(--special-btn);
  font-size: 1.3em;
  opacity: 0.75;
  /* line-height: 200px; */
  margin: 0;
  padding: 1vw;
}
.el-carousel__item a {
  text-decoration: none;
  color: var(--special-btn);
}
.el-carousel__item a:hover {
  text-decoration: underline;
}
img {
  /* width: 95%; */
  height: 150%;
}
.el-carousel__item:nth-child(2n) {
  background-color: var(--seconed-color);
  opacity: 0.95;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: var(--main-color);
  opacity: 0.95;
}
.shelf-cmp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.books {
  margin-top: 2vh;
  width: 100%;
  max-width: 800px;
}
</style>


