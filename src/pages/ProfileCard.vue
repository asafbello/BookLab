<template v-if="profile">
    <el-card :body-style="{ padding: '0px' }" class="left-panel">
        <img :src="profile.avatar" class="profile-img">
            <div style="padding: 14px;" class="left-panel-content">
              <span>{{profile.username}}</span>
              <div class="bottom clearfix">
                <time class="time">Joined: {{profile.joinedAtNaaman | toDate }}</time> <br>
                <div class="profile-btns">
                  <!-- <el-button type="text" v-if="isUser" class="button" @click.native="deleteUser">Delete Profile</el-button> -->
                  <i v-if="isUser"  @click="deleteUser" class="fa fa-trash-o" aria-hidden="true"></i>
                  <!-- <el-button type="text" v-if="isUser" class="button"  @click.native="editProfile">Edit Profile</el-button> -->
                  <i  v-if="isUser"  @click="editProfile" class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </el-card>
</template>

<script>
export default {
    props:['profile','isUser'],
    methods:{
      deleteUser(){
        this.$emit('delete')
      },
      editProfile(){
        this.$emit('edit')
      },
    }
  
}
</script>
<style scoped>
.left-panel {
  width: 15%;
  margin-top: 6%;
  margin-left: 3%;
  align-self: flex-start;
}

.left-panel {
  margin-top: 2%;
}

.left-panel-content {
  display: flex;
  flex-flow: column;
}

.left-panel-content > * {
  margin-bottom: 5px;
}

.left-panel > * {
  margin-bottom: 10px;
}
.profile-btns {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 1.4em;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix {
  display: flex;
  flex-direction: column;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.profile-img {
  width: 100%;
}

@media screen and (max-width: 768px) {
      .left-panel {
    width: 95%;
    height: 25%;
    margin-top: 6%;
    margin: auto;
  }
    .profile-img {
    margin-top: 2%;
    width: 40%;
  }

  .profile-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
