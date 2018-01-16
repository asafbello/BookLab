import moment from 'moment';
import ioClient from 'socket.io-client'
let BASE_URL = 'http://localhost:3003';

if (process.env.NODE_ENV !== 'development'){
    BASE_URL = '/'
}

var socket = null;
var nickName = lorem()
function lorem(size = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

const connectSocket = () => {
    socket = ioClient(BASE_URL);
    socket.on('chat newMsg', function (msg) {
        if (nickName === msg.from) {msgs[msgs.length - 1].processed = true}
        else {
            msgs.push(msg)            
          }
    });
    socket.on('user typing', function (user) {
        // EventBusService.$emit('typing',user)
        console.log('typing',user)
        setTimeout(()=>{  
            // EventBusService.$emit('typing',null)
            console.log('typing',null)
        }, 1500);
    });
    socket.on('users count', function (usersAmount) {
        usersOnlineCount.online = usersAmount
    });

}
connectSocket()

const msgs = [];
const usersOnlineCount = {online:1}

const getMsgs = () => {
    return msgs;
}
const getUsersOnlineCount = () => {
    return usersOnlineCount;
}

const send = (msg) => {
    msgs.push(msg);
    socket.emit('chat msg', msg);
}

function typing(nickName) {
    if (!nickName) nickName="somone"
    socket.emit('is typing', nickName);
}

export default {
    getMsgs,
    getUsersOnlineCount,
    send,
    nickName,
    typing,
}
