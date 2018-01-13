<template>
<section class="shelf-cmp">
  <ul class="card">
        <li v-for="book in shelf" :key="book.forigenId" class="wrapper" :style="{ 'background-image': 'url(' + book.img + ')' }">
                <!-- <img :src="book.img"  class="bg-image" v-on:load="isLoading"> -->
          <router-link :to="'/book/' + book.forigenId">
              <div class="date">
                <span ><i class="fa fa-comment" aria-hidden="true"></i> {{book.reviews.length}}</span>
                <span ><i class="fa fa-heart-o" aria-hidden="true"></i> {{book.title.length}}</span>
              </div>
            <div class="data">
                <div class="content">
                <span class="author"> <p>{{ book.author }}</p><p>  <i class="fa fa-book" aria-hidden="true"></i></p> </span>
                    <h1 class="title">{{ book.title }} </h1>
                      <!-- <p class="text" v-html="book.desc"></p> -->
                      <p class="button">Read more</p>
                </div>
            </div>
          </router-link>
        </li>
  </ul>
          <!-- <div class="shelf animated  swing" v-if="show">
              <div class="bottom-shelf"></div>
              <div class="bottom-shelf-edge"></div>
          </div> -->
</section>
</template>

<script>
      // <router-link :to="'/book/' + book.forigenId">
      //           <li v-for="book in shelf" :key="book.forigenId" class="book-card">
      //                 <h3 class="book-title">
      //                  {{ book.title }}
      //                   </h3>
      //                 <p v-loading="loading"><img :src="book.img"  class="image" v-on:load="isLoading"></p>
      //           </li>
      //   </router-link>
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
a {
  text-decoration: none;
  color: rgb(22, 22, 22);
}
h1 {
  font-weight: 1em;
  font-size: 1.2em;
}

.card {
  display: flex;  
  flex-wrap: wrap;
  justify-content: center;
  /* align-content: left; */
}
.wrapper {
    background-color: rgba(245, 245, 245, 0.842);
    min-height: 24vw;
    width: 17vw;
    position: relative;
    overflow: hidden;
    margin: .5vw;
    background-repeat: no-repeat;
    background-position: center ; 
     /* background-size: cover; */
}
.data:hover {
        transform: translateY(0);
  }

.data {
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(3vw);
  transition: transform 0.3s;
}
  .content {
    padding: 0 1em;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
  align-content: center;
  justify-content: space-around;
}
.author {
    font-size: .6em;
    display: flex;
    justify-content: space-between;
  }
  .title {
    margin-top: .1em;
  }
  .text {
    margin: 0;
  }
.date {
  display: flex;
  justify-content: space-around;
  width: 100%;
    background-color: #1f315b;
    color: rgb(197, 197, 197);
    padding: 0.3em 0 ;
}
.date:hover{
  color: white;
}
.date span {
      display: block;
      /* text-align: center; */
    }
  .content {
    background-color: rgb(252, 252, 252);
    box-shadow: 0 5px 30px 10px rgba(black, 0.3);
  }
.button {
    display: block;
    text-align: center;
    font-size: .8em;
    color: #3a6adb;
    line-height: 1;
    position: relative;
    /* font-weight: 500; */
  }
@media screen and (max-width: 700px) {
    .content {
    padding: 0;
    background-color: transparent;
    }
    .data{
    transform: translateY(0);
    }
    h1{
      font-size: 1em;
      background-color: rgba(0, 0, 0, 0.295);
      color: white;
    }
    .author {
    font-size: .3em;
    padding: 0 .1vw;
    display: flex;
    justify-content: space-between;
  }
}
</style>


