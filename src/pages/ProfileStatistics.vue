<template v-if="profile">
    <div class="statistics">
        <div class="statistics-item">
            <div class="icon-count">
                <img class="icon" src="https://png.icons8.com/dusk/64/open-book.png" 
                                title="Open Book" width="64" height="64">
                <!-- <p>Pages read </p> -->
                <p class="stat-txt">You've read {{pagesRead}} pages</p>
            </div>
        </div>
        <div class="statistics-item">
            <div class="icon-count">
                <img @click="openModal(profile.readList)"
                        class="icon clickable" src="https://png.icons8.com/nolan/64/checkmark.png"
                        title="Checkmark" width="64" height="64">
                <!-- <p>Books read </p> -->
                <p class="stat-txt">From {{profile.readList.length}} books</p>
            </div>
        </div>
        <div class="statistics-item">
            <div class="icon-count">
        <img @click="openModal(profile.wishList)" 
                class="icon clickable" src="https://png.icons8.com/dusk/64/book-shelf.png"
                title="Book Shelf" width="64" height="64">
                <!-- <p>Books in wish list</p> -->
                <p class="stat-txt">Your wish list</p>
        </div>
        </div>
            <profile-book-list-modal v-if="showModal" 
                        :list="modalList" :theUserHimself="isUser"
                        @closeFromCancel="closeModal">

    </profile-book-list-modal>
    </div> 
</template>
    
<script>
import ProfileBookListModal from "../components/ProfileBookListModal";
export default {
  props: ["profile", "isUser"],
  components: { ProfileBookListModal },
  data() {
    return {
      showModal: false,
      modalList: ""
    };
  },
  computed: {
    pagesRead() {
      console.log("inside  the reducer");
      var pagesCount = this.$store.state.profile.currProfile.readList.reduce(
        (acu, curr) => {
          if (curr.pages) return acu + curr.pages;
          return acu + curr.review.pages;
        },
        0
      );
      // if (!pagesCount) return 0;
      console.log("inside pageread after first return statement");
      return pagesCount;
    }
  },
  methods: {
    openModal(list) {
      console.log(list);
      document.addEventListener("keyup", evt => {
        if (evt.keyCode === 27) {
          this.showModal = false;
        }
      });
      this.modalList = list;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>
<style scoped>

.statistics-item {
  display: flex;
  flex-direction: column;
  /* color: #999; */
  color: white;
}
.statistics {
  display: flex;
  width: 100%;
  align-self: flex-start;
  justify-content: space-around;
  margin-top: 1%;
}

.stat-txt {
  color: black;
}

.clickable {
  cursor: pointer;
}
@media screen and (max-width: 768px) {
}
</style>
