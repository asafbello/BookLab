<template v-if="profiles">
  <section  class="profile">
    <!-- <ul >
      <li v-for="(profile, index)  in profiles" :key="index">
          <el-card :body-style="{ padding: '0px' }">
       <router-link :to="'/user/' + profile._id">
          <img :src="profile.avatar" /></router-link>  
          <p>{{profile.name}}</p>
          </el-card>
      </li>
    </ul> -->
   
      <div class="card" v-for="(profile, index)  in profiles.slice(0, screenWidth)" :key="index">
          <el-card :body-style="{ padding: '0px' }">
              <router-link :to="'/user/' + profile._id"><img :src="profile.avatar" class="wl-modal-image"></router-link> 
            <div style="padding: 0;padding-bottom:  0;">
              <div class="bottom clearfix">
               <p>{{profile.name}}</p>
              </div>
            </div>
          </el-card>
     
      </div>
  </section>
</template>

<script>
export default {
  props: ["profiles"],
  computed: {
    screenWidth() {
        if (window.innerWidth > 768) {
          this.quantity = 10;
        } else {
          return 3;
        }

    }
  },

  data() {
    return {
      // quantity: '',
      hover: false
    };
  },
  methods: {}
};
</script>


<style scoped>
.profile {
  display: flex;
  width: 95%;
  flex-flow: row wrap;
}

.card {
  width: 7%;
  min-width: 80px;
  transition: all 0.5s ease;
  padding: 1vw;
  border-radius: 0.75em;
}

.card img {
  width: 100%;
}

.card:hover {
  box-shadow: 7px 4px 4px 0 rgba(7, 19, 26, 0.12),
    0 4px 12px 0 rgba(2, 23, 36, 0.12);
  transform: translateY(-1px);
}

.card p {
  overflow-wrap: break-word;
  margin: 0;
  visibility: hidden;
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0);
  display: inline;
  position: relative;
  cursor: pointer;
}

.card:hover p {
  color: #999;
  visibility: visible;
}
/* ul {
      display: flex;
      flex-direction: row;
      margin: 1vw;
    }
    li {
      width: 7vw;
      display: block;
      padding: 1vh 0 0 2vh;
      transition: all .5s ease;
      padding: 1vw;
      border-radius: .75em;
             
    } 
    li:hover {
    box-shadow: 7px 4px 4px 0 rgba(7, 19, 26, 0.12), 0 4px 12px 0 rgba(2, 23, 36, 0.12);
    transform: translateY(-1px);
    }

    /* li img {
      max-height: 10vh;
      padding: 0;
      display: block;
      max-width: 100%;
      background: gray;
    }
    
    li p {
      overflow-wrap: break-word;
      padding: 1vw;
      margin: 0;
      visibility: hidden;
      font-size: .9em;
      width: 100%;
      color: rgba(255, 255, 255, 0);
      display: inline;
      position: relative;
      cursor: pointer;
} */
/* li:hover p {
  color: var(--main-color);
  visibility: visible;
} */

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

.wl-modal-image {
  width: 100%;
  display: block;
  margin: auto;
}

@media screen and (max-width: 768px) {
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
    margin: auto;
  }

  .klub-modal {
    background: white;
    padding: 2%;
    margin: 5vw;
    margin-bottom: 2vw;
    display: flex;
    flex-flow: row wrap;
  }

  .profile {
    justify-content: space-around;
    margin: auto
  }
}
</style>

