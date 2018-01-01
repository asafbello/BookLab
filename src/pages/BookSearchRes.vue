
<template v-if="searchRes">
   <section class="answers">
      <transition-group name="list-complete">
        <div class="books-res list-complete-item" v-for="book in searchRes"
                 :key="book.id">
            <el-tooltip :content="book.volumeInfo.description" placement="bottom" effect="light">
                    <el-button >{{book.volumeInfo.title}}</el-button>
            </el-tooltip>
            <router-link :to="'/book/' + book.id"> <el-button type="primary" size="mini">To Book Page</el-button>
            </router-link>
            <el-badge value="3" class="item">
            <el-button size="mini"><i class="fa fa-book" aria-hidden="true"></i></el-button>
            </el-badge>
        </div>
     </transition-group>
  </section>
</template>

<script>
export default {
  props: ["searchRes"],
  data() {
    return {};
  },
  methods: {}
};
</script>


<style scoped>
.answers {
  display: block;
  position: absolute;
  z-index: 99;
  left: 15%;
  /* right:15%; */
  margin-left: auto;
  margin-right: auto;
}
.books-res {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1vw rgb(211, 211, 211) dashed;
  background-color: rgba(0, 0, 0, 0.342);
  width: 70vw;
  font-size: 0.8em;
  margin: 0.3vw;
}
.books-res * {
  padding: 0.3vw;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  /* margin-right: 10px; */
}
.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(90px);
}
.list-complete-leave-active {
  position: absolute;
  transform: translateY(0px); 
}

</style>