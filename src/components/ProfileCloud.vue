<template v-if="profiles">
  <section>
      <ul class="loop">
        <li :style="{margin: 'auto'}" v-for="(profile, index)  in profiles" :key="index">
            <div :style="{ margin: 'auto', width: (profile.reviews.length + 1) * 4 + 'vw' }">
                <router-link :to="'/user/' + profile._id">  
                    <img :src="profile.avatar" class="squere-photo">
                    <p class="profile-txt">{{profile.name}}</p>
                </router-link> 
            </div>
        </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["profiles"],
  computed: {
  },

  data() {
    return {
      hover: false
    };
  },
  methods: {}
};
</script>


<style scoped>

.loop {
    display: flex;
    flex-direction: row ;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 2vh;
    
}
.rofile-prev {
  display: block;
}
.profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.image-profile {
  border: 0.1vw solid rgba(0, 0, 0, 0.205);
  /* width: 100%; */
  /* max-width: 10%;; */
  height: 10vw;
  overflow: hidden;
  margin: 0.5vw;
}
.squere-photo {
  /* background-color: whitesmoke; */
  display: block;
  padding-bottom: 0.5vw;
  /* height: 100%; */
  width: 100%;
  margin: 0;
}

.profile-txt {
  background-color: whitesmoke;
  color: #141414;
  padding: 0;
  margin: 0;
  font-size: 0.9em;
  width: 100%;
}
@media screen and (max-width: 768px) {
  .profile-txt {
    font-size: 0.5em;
  }
}
</style>

