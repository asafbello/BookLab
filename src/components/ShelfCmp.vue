<template>
<section class="shelf-cmp">
  <div>
  <ul class="books">
         <li v-for="book in shelf" :key="book.id">
        <div class="a-book">
          <router-link :to="'/book/' + book.id">
          <img :src="book.volumeInfo.imageLinks.medium" alt="">
          </router-link>
          <span>{{book.volumeInfo.title}}</span>
        </div>
        </li>
    
  </ul>
  </div>
          <div class="shelf">
              <div class="bottom-shelf"></div>
              <div class="bottom-shelf-edge"></div>
    </div>
</section>
</template>

<script>
export default {
  name: "ShelfCmp",
  props: ["shelf"]
};
</script>

<style scoped>
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


