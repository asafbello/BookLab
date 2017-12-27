<template>
<section class="shelf-cmp">
  <div>
  <div class="books">
         <el-card v-for="book in shelf" :key="book.id">
            <router-link :to="'/book/' + book.googleBookId">
        <div class="a-book">
          <img :src="book.img"  class="image" >
     <h2>{{book.title}}</h2>
        </div>
             </router-link>
        </el-card>
  </div>
  </div>
   <transition name="fade" mode="out-in" >
          <div class="shelf" v-if="show" >
              <div class="bottom-shelf"></div>
              <div class="bottom-shelf-edge"></div>
          </div>
            </transition>
</section>
</template>

<script>
export default {
  name: "ShelfCmp",
  props: ["shelf"],
  methods: {},
  data() {
    return {
      show: false
    };
  },
  created() {
    setTimeout(() => {
      this.show = true;
    }, 0);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  height: 0;
  padding: 0 10px;
  opacity: 0;
}
.a-book {
  display: flex;
  flex-direction: column;
  height: 15vw;
  margin: 3vw;
}
.a-book img {
  height: 100%;
  width: 10vw;
  transform: rotateY(30deg), rotateZ(30deg);
}
.a-book span {
  width: 10vw;
}
.shelf-cmp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.books {
  display: flex;
  flex-direction: row;
}
.shelf {
  display: block;
  z-index: -1;
}
.bottom-shelf {
  width: 80vw;
  border-bottom: 25px solid #a1a194;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
}

.bottom-shelf-edge {
  width: 100%;
  height: 25px;
  background: #5b605f;
}
</style>


