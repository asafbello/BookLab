<template v-if="profiles">
  <section>
    <ul >
      <li v-for="profile in profiles" :key="profile._id">
          <el-card :body-style="{ padding: '0px' }">
       <router-link :to="'/user/' + profile._id">
          <img :src="profile.avatar" /></router-link>  
          <span>{{profile.name}}</span>
          </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["profiles"],
  data() {
    return {
      hover: false
    };
  },
  methods: {
  }
};
</script>


<style scoped>
    ul {
      display: flex;
      margin: 1vw;
    }
    li {
      display: flex;
      flex-direction: column;
      /* /* height: 5vw; */
      padding: 1vh 0 0 2vh;
      transition: all .5s ease;
      padding: 1vw;
      border-radius: .75em;
             
    }
    li:hover {
    box-shadow: 7px 4px 4px 0 rgba(7, 19, 26, 0.12), 0 4px 12px 0 rgba(2, 23, 36, 0.12);
    transform: translateY(-1px);
    }

    li img {
      max-height: 10vh;
      padding: 0;
      display: block;
      max-width: 100%;
      background: gray;
    }
    li span {
      visibility: hidden;
      width: 100%;
      color: rgba(255, 255, 255, 0);
      display: block;
      position: relative;
      /* top: -40%; */
      cursor: pointer;
}
    li:hover span {
      color: var(--main-color);
     visibility:visible;
}
</style>

