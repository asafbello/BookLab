<template>
    <div class="bg-modal" @keypress.native="closeOnEsc">
      <div class="modal-content">
        <!-- <h1> list</h1> -->
    <div class="klub-modal">
<el-row class="modal-row" v-for="(book, index) in list" :key="index"> 
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-card :body-style="{ padding: '0px' }">
            <img @click="goTobookDetails(book.forigenId)" :src="book.img" class="wl-modal-image">
            <div style="padding: 14px;padding-bottom:  0;">
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
  props: ["list"],
  methods: {
    closeModal() {
      this.$emit("closeFromCancel");
    },
    goTobookDetails(id) {
      this.$router.push(`/book/${id}`);
    }
  }
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.el-card {
  padding: 4px;
}

.modal-btn {
  /* width: 10%; */
  margin: auto;
}

.bottom clearfix > p {
  padding-top: unset;
}

.modal-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* height: 20%; */
  width: 20%;
  border-radius: 10px;
}

.wl-modal-image {
  width: 100%;
  display: block;
}

.klub-modal {
  background: white;
  padding: 2%;
  margin: 5vw;
  margin-bottom: 2vw;
  display: flex;
  flex-flow: row wrap;
}

@media screen and (max-width: 768px) {
  .modal-row {
    width: 45%;
    /* justify-content: space-around; */
  }
}
</style>