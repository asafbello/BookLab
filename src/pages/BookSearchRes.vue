

<template v-if="searchRes">
    <ul class="card">
          <!-- <transition-group name="list"> -->
            <li v-for="(book,index) in searchRes" :key="book.id" class="wrapper"
                                     :style="{ 'background-image': 'url(' + book.volumeInfo.imageLinks.thumbnail + ')' }">
              <div class="bg-gradinet">
                  <router-link :to="'/book/' + book.id">
                      <div class="date">
                        <span v-if="book.volumeInfo.pageCount">pages:  <i class="fa fa-book" aria-hidden="true"></i>&nbsp{{book.volumeInfo.pageCount}}</span>
                      </div>
                      <div class="data">
                      <div class="content" >
                            <span class="author" v-if="book.volumeInfo.authors">author: {{book.volumeInfo.authors[0]}}                                                                 </span>
                            <h1 class="title">{{ book.volumeInfo.title}} </h1>
                            <br>
                            <button class="button"><i class="el-icon-info"></i>To Book Page</button>
                      </div>
                      </div>
                  </router-link>
                </div>
            </li>
      <!-- </transition-group> -->
    </ul>
</template>

<script>
export default {
  props: ["searchRes"],
  data() {
    return {};
  },
  methods: {

  },
};
</script>


<style scoped> 

.bg-gradinet{
  background: linear-gradient(to bottom, rgba(19,19,19,0.76) 0%,rgba(28,28,28,0.76) 9%,rgba(42,42,42,0.76) 23%,rgba(43,43,43,0.76) 24%,rgba(17,17,17,0.76) 40%,rgba(0,0,0,0.76) 49%,rgba(44,44,44,0.76) 50%,rgba(71,71,71,0.76) 61%,rgba(102,102,102,0.76) 75%,rgba(89,89,89,0.76) 88%,rgba(76,76,76,0.76) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#c2131313', endColorstr='#c24c4c4c',GradientType=0 ); /* IE6-9 */
height: 100%;
}
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
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  left: 2vw;
  width: 95%;
  top: -4.8vw;
  background: rgba(0, 0, 0, 0.288);
  border: .1vw solid rgb(119, 119, 119);
}
.wrapper {
    background-color: rgba(155, 155, 155, 0.842);
    min-height: 24vw;
    width: 17vw;
    position: relative;
    overflow: hidden;
    margin: .5vw;
    background-repeat: no-repeat;
    background-position: center ; 
     background-size: cover;
       outline: .1vw solid gray;
}
.data:hover {
    transform: translateY(0);
    background: rgba(0, 0, 0, 0.719);
  }

.data {
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(2.7vw);
  transition: transform 0.4s;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.76) 24%,rgba(0,0,0,0.65) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 ); /* IE6-9 */
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
    justify-content: center;
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
  /* background-color: #1f315b73; */
  color: rgb(240, 240, 240);
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
    /* background-color: rgba(0, 0, 0, 0.212); */
    color: white;
    box-shadow: 0 5px 30px 10px rgba(black, 0.3);
  }
.button {
    display: block;
    text-align: center;
    font-size: .8em;
    color: #3a6adb;
    line-height: 1;
    position: relative;
    border: none;
    background: rgb(185, 185, 185);
    padding: .1vw;
    /* font-weight: 500; */
  }
@media screen and (max-width: 700px) {
    .content {
    padding: 0;
    background-color: transparent;
    }
    .data{
    transform: translateY(0);
     background: rgba(0, 0, 0, 0.719);
    }
    h1{
      font-size: .7em;
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
</style>