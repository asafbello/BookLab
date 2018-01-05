<template class="container">
  <section>
      <footer class="footer">
        <div class="links">
          This app powered by
        <a class="nav-link" href="https://nemo369.github.io/naaman/" target="_blank"> Naaman,</a>
        <a class="nav-link" href="https://github.com/asafbello" target="_blank"> Asaf</a>  and 
        <a class="nav-link" href="https://charlesmarlow.github.io/proj-gallery/" target="_blank"> Nadav </a>
        <span> - click for more</span>
        </div>
        <div class="chat">
          <span class="chat-btn" @click="toggleChat">
            <el-badge is-dot class="item"></el-badge><i class="fa fa-comment dot" aria-hidden="true"></i>
          </span>
        </div>
        </footer>
        <section class="chat-room" v-if="isChating">
          <button @click="toggleChat" class="close-btn">X</button>
        <chat></chat>
        </section>
      </section>
</template>
<script>
import Chat from './Chat'
export default {
   components: {Chat},
  data() {
    return {
      isChating: false
    };
  },
  methods: {
    toggleChat(){
      this.isChating = !this.isChating
    },
    startChat(){
      console.log('chating...')
    }
  },
  computed: {
  }
};

</script>

<style scoped> 
.links {
  display: inline-block;
}

.footer {
  background-color: rgba(88, 88, 88, 0.849);
   color: lightgrey;
  padding: 0 1vw;
  display: flex;
  justify-content: space-between;
  position: fixed;
  height: 5vh;
  z-index: 99;
}
.nav-link {
  color: lightgrey; 
  text-decoration: none;
}

.nav-link:hover {
  color: white;
}
.chat{
  /* margin-bottom: 12vh; */
  font-size: 2.4em;
  position: relative;
  bottom: 3vh;
}

.chat-room{
  width: 25vw;
  z-index: 98;
  position: fixed;
  height: 90%;
  right: 0;
  bottom: 0vw;
  background-color: rgba(235, 235, 235, 0.945);
  border: .1vw solid black;
}
.close-btn{
  float: right;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.062);
  border: none;
  border-radius: 50%;
  margin: .4vw;
}
.close-btn:hover{
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.103);
  color: white;
}
.chat-btn{
  display: flex;
  flex-direction:row-reverse;
  /* align-items: center; */
}
.chat-btn:hover{
  color: white;
}


/* @media screen and (max-width: 768px) {
  .container {
      margin-bottom: 2vw;
  }

  .el-footer {
    display: flex;
    justify-content: center;
  }

  .chat-btn {
    position: absolute;
    right: 0;
  }
} */

</style>

