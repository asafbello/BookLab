<template v-if="profiles">
  <section>
    <ul >
      <li v-for="profile in profiles" :key="profile._id">
       <router-link :to="'/user/' + profile._id">
          <img :src="profile.avatar" /></router-link>  
          <span>{{profile.name}}</span>
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
      height: 5vw;
      margin: 1vh;
      transition: all .5s ease;
      border-width: 0;
      background: white;
      padding: 1vw;
      border-radius: .75em;
             
    }
    li:hover {
    box-shadow: 7px 4px 4px 0 rgba(7, 19, 26, 0.12), 0 4px 12px 0 rgba(2, 23, 36, 0.12);
    transform: translateY(-1px);
    }

    li img {
      display: block;
      height: 5vw;
      border-radius: 2em;
    }
    li span {
      visibility: hidden;
      background-color: rgba(255, 255, 255, 0);
      width: 100%;
      color: rgb(19, 19, 19);
      display: inline;
      position: relative;
      top: -40%;
      cursor: pointer;
}
    li:hover span {
      color: rgb(255, 255, 255);
     visibility:visible;
    background-color: rgba(0, 0, 0, 0.527);
}
</style>

