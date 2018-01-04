
<template v-if="searchRes">
        <el-row class="card-wrapper">
          <transition-group name="list">
            <el-col v-for="(book,index) in searchRes" :key="book.id" class="card-book list-item">
              <el-card :body-style="{ padding: '0px' }" class="card-container">
                 <router-link :to="'/book/' + book.id">
                    <img :src="book.volumeInfo.imageLinks.thumbnail" class="image">
                 </router-link>
                  <div>
                      <div class="bottom clearfix">
                      <span><i class="fa fa-book" aria-hidden="true"></i> {{book.volumeInfo.title}}</span>
                        <p class="time" v-if="book.volumeInfo.authors">author: {{book.volumeInfo.authors[0]}}</p>
                        <router-link :to="'/book/' + book.id">
                          <el-button type="text" class="button"><i class="el-icon-info"></i>Book Page</el-button>
                        </router-link>
                      </div>
                </div>
              </el-card>
            </el-col>
      </transition-group>
          </el-row>
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
.bottom{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bottom *{
padding: .5vw;
}
  .time {
    font-size: .6em;
    color: #999;
  }

  .button {
    font-size: 1em;
  }

  .image {
    width: 100%;
    display: block;
  }

  .card-wrapper{
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: space-between;
    justify-content: center;
      top: -4.3vw;
      margin: 0 auto;
      background: rgba(0, 0, 0, 0.288);
      border-radius: 2em;
      border: .1vw solid rgba(255, 255, 255, 0.397);
      border-top: none;
  }

  .card-book{
    width: 15vw;
    transition: all .5s ease;
    margin: 1vw;
  }
  .card-book:hover{
    box-shadow: 0 4px 12px 0 rgba(2, 23, 36, 0.12);
    transform: translateY(-1px);
    /* cursor: pointer; */
  }
  .card-container{
    height: 40vw;
    font-size: .9em;
  }

.list-enter-active, .list-leave-active {
    transition: all .5s;
}
.list-enter, {
  opacity: 0;
  transform: translateY(90px);
}
.list-leave-to{
  opacity: 0;
 transform: translateY(180px);
}
@media screen and (max-width: 768px) {
 .card-wrapper{
    width: 100%;
 }
   .card-book{
     width: 10vw;
     font-size: .5em;
   }
}
@media screen and (max-width: 500px) {
 .card-wrapper{
    top:5vw;
    padding: 0;
    margin: 0;
 }
}

</style>