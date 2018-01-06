<template>
  <section class="chat-bar">
      <div class="chat-header">
        <h3>BookLab CHAT</h3>
          <div class="name">
                    <span v-if="userTyping">{{userTyping.name}} is typing...</span>
                    <span class="status">{{online.online}} are online</span>
                  </div>
        </div>
        <div class="chat-body">
                <div v-for="(msg,index) in msgs" class="message"  :key="index">
                    <span>  {{msg.txt}} </span>
                    <span>{{msg.from}}</span>
                        <svg v-if="!msg.processed" xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>
                </div>
                <div>
                <input v-model="newMsg.txt" @keyup="isTyping"
                    class="input-msg" name="input" placeholder="lets snd msgs"
                    autocomplete="off" autofocus />
                </div>
            <button @click="send">SEND</button>
        </div>
  </section>
</template>

<script>
import msgService from "../services/MsgService.js";

export default {
  data() {
    return {
      msgs: [],
      nickName: null,
      newMsg: null,
      online: {},
      userTyping: null
    };
  },
  created() {
    console.log('logged in to chat')
    this.nickName = msgService.nickName;
    // this.nickName = this.$store.loggedInUser.userName

    this.newMsg = this.createEmptyMsg();
    this.msgs = msgService.getMsgs();
    this.online = msgService.getUsersOnlineCount()
    // msgService.connect
  },
  computed: {},
  methods: {
    isTyping() {
      msgService.typing(this.nickName);
    },
    createEmptyMsg() {
      return { txt: "", processed: false, from: this.nickName };
    },
    msgClass(msg) {
      return msg.from !== this.nickName ? "received" : "sent";
    },
    send() {
      if (!this.newMsg.txt) return;
      msgService.send(this.newMsg);
      this.newMsg = this.createEmptyMsg();
    }
  }
};
</script>

<style scoped>
.chat-bar{
    height: 93%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: rgb(19, 19, 19);

}
.chat-header{
    padding: 1vw 0;
}
.chat-body{
 text-align: left;
}
.chat-body button{
    width: 100%;
    margin: 1vw 0;
}

</style>
