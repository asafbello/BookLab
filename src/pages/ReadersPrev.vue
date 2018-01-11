<template>
    <section>
    <profiles-cloud :profiles="profilesToDisplay"></profiles-cloud>
    </section>
</template>

<script>
import ProfilesCloud from '../components/ProfileCloud.vue';
import { mapGetters } from 'vuex';
import {LOAD_PROFILES} from '../store/modules/ProfileModule.js'

export default {
  components: {
    ProfilesCloud
  },
  computed: {
    ...mapGetters([
      "currBook",
      "isUser",
      "loggedInUser",
      "bookRate",
      "profilesFromBook",
      "profilesToDisplay"
    ]),
    prorfilesByReview() {
        console.log(this.profilesToDisplay, 'inside the computed');
        var profileSizes = this.profilesToDisplay.map(profileSize => {
            let i = 2; 
            return profileSize.reviews.length;
        })
        ret
    }
  },
  created() {
    //GET PROFILES
    this.$store
      .dispatch({ type: LOAD_PROFILES })
      .then(_ => {
        this.prorfilesByReview  
        console.log("Getting profiles");
      })
      .catch(err => {
        console.log("err", err);
      });
  },
};
</script>
<style scoped>

</style>
