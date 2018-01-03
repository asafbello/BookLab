<template>
  <el-container>
    <el-footer class="footer">
      <div class="links">
        An app powered by
      <a class="nav-link" href="https://nemo369.github.io/naaman/" target="_blank"> Naaman,</a>
      <a class="nav-link" href="https://github.com/asafbello" target="_blank"> Asaf</a>  and 
      <a class="nav-link" href="https://charlesmarlow.github.io/proj-gallery/" target="_blank"> Nadav </a>
      <span>&copy</span>
      </div>
      
      <span class="chat-btn"><i class="fa fa-comment" aria-hidden="true"></i></span>

      </el-footer>
  </el-container>
</template>
<script>

export default {
  data() {
    return {

    };
  },
  methods: {
  },
  computed: {
  }
};

</script>

<style scoped> 

.nav-link {
  color: white; 
  text-decoration: none;
}

.links {
  display: inline-block;
}

.el-footer {
  padding: 0px 0px;
}

.el-container {
  margin-left: 1vw;
  margin-right: 1vw;
  margin-bottom: 1vw;
}

.img-wrapper {
  width: 13vw;
  max-width: 150px;
}

.nav-link {
  color: lightgrey; 
  text-decoration: none;
}

.nav-link:hover {
  color: white;
}

.footer {
  color: lightgrey;
}

.chat-btn {
  float: right;
  margin-right: 2.5vw;
  font-size: 2em;

}

@media screen and (max-width: 768px) {
  .el-container {
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
}

</style>

