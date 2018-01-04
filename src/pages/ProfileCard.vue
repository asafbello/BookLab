<template v-if="profile">
    <el-card :body-style="{ padding: '0px' }" class="left-panel">
        <img :src="proflie.avatar" class="profile-img">
            <div style="padding: 14px;" class="left-panel-content">
              <span>{{proflie.username}}</span>
              <div class="bottom clearfix">
                <time class="time">Joined at: {{proflie.joinedAt }}</time> <br>
                <div class="profile-btns">
                <el-button type="text" v-if="isUser" class="button" @click.native="deleteUser">Delete Profile</el-button>
                <el-button type="text" v-if="isUser" class="button"  @click.native="editProfile">Edit Profile</el-button>
                </div>
              </div>
            </div>
          </el-card>
</template>

<script>
export default {
    props:['proflie','isUser'],
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
  flex-direction: column;
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
