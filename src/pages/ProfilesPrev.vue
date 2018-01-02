<template v-if="profiles">
  <section>
    <ul >
      <li v-for="profile in profiles" :key="profile._id">
          <el-card :body-style="{ padding: '0px' }">
       <router-link :to="'/user/' + profile._id">
          <img :src="profile.avatar" /></router-link>  
          <p>{{profile.name}}</p>
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
      flex-direction: row;
      margin: 1vw;
    }
    li {
      width: 7vw;
      display: block;
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
      /* top: -40%; */
      cursor: pointer;
}
    li:hover p {
      color: var(--main-color);
     visibility:visible;
}
@media screen and (max-width: 650px) {

}
</style>

