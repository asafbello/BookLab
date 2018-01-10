<template v-if="profiles">
  <section class="profile-prev">
    <div  class="profile">
      <div class="image-profile"  v-for="(profile, index)  in profiles" :key="index">
              <router-link :to="'/user/' + profile._id">  
                      <img :src="profile.avatar" class="squere-photo">
                </router-link> 
               <p class="profile-txt">{{profile.name}}</p>
            <!-- <div style="padding: 0;padding-bottom:  0;">
              <div class="bottom clearfix">
              </div>
            </div> -->
          </div>
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
.rofile-prev{
  display: block;
}
.profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.image-profile{
  border: .1vw solid rgba(0, 0, 0, 0.205);
  max-width: 10%;;
  height: 10vw;
  overflow: hidden;
  margin: .5vw ;

}
.squere-photo{
   /* background-color: whitesmoke; */
   display: block;
    padding-bottom: .5vw;
    height: 75%;
}
.profile-txt{
  background-color: whitesmoke;
  color: #141414;
  padding: 0;
  margin: 0;
  font-size: .9em;
}
@media screen and (max-width: 768px) {
  .profile-txt{
    font-size: .5em;
  }
}
</style>

