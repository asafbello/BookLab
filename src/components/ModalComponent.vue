<template>
    <div class="bg-modal" @keypress.native="closeOnEsc">
      <div class="modal-content">
        <!-- <h1> list</h1> -->
    <div class="klub-modal">
<el-row class="modal-row" v-for="(book, index) in list" :key="index"> 
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-card :body-style="{ padding: '0px' }">
            <img :src="book.img" class="wl-modal-image">
            <div style="padding: 14px;">
              <span>{{book.title}}</span>
              <div class="bottom clearfix">
               <p>By {{book.author}}</p>
               <!-- <p> {{book.raview.rate}}</p> -->
                <el-button type="text" class="button">Book details</el-button>
              </div>
            </div>
          </el-card>
</el-row>
    </div>
            <el-button class="modal-btn" type="default"  v-on:keyup.esc="showWishList" @click="closeModal">Close</el-button>
    </div>
</div>
</template>

<script>

export default {
    props: ['list'],
 methods: {
    closeModal() {
      this.$emit("closeFromCancel");
    },
}
}

</script>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-btn {
  width: 10%;
  margin: auto;
}

.bottom clearfix > p {
  padding-top: unset;
}

.modal-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 20%;
}

.wl-modal-image {
  width: 100%;
  display: block;
}

.klub-modal {
  background: white;
  padding: 2%;
  margin: 5vw;
  display: flex;
  flex-flow: row wrap;
}
</style>