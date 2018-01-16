<template>
    <section>
      <profiles-prev :isMultiLine="true" :profiles="profilesToDisplay"></profiles-prev>
      <hr>
    </section>
</template>

<script>
import ProfilesPrev from '../pages/ProfilesPrev.vue';
import { mapGetters } from 'vuex';
import {LOAD_ALL_PROFILES} from '../store/modules/ProfileModule.js'

export default {
  components: {
    ProfilesPrev
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
  },
  created() {
    //GET PROFILES
    this.$store
      .dispatch({ type: LOAD_ALL_PROFILES })
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
