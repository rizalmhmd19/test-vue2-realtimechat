<template>
  <div class="container-fluid">
        <div class="row gutters">

            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                <div class="card m-0">

                    <div class="row no-gutters">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="room-active">
                                <span class="name">{{room_id}}</span>
                                <button @click="onExit()" class="btn btn-exit btn-light">Exit</button>
                            </div>
                            
                            <div class="chat-container">
                                <div class="chatContainerScroll" id="chatContainerScroll">
                                    <div class="chat-box" id="chat-box" v-for="chat in chatsCompt" :key="chat.id">
                                        <chat-left v-if="chat.username != username" :name="`${chat?.username}`" :chat="`${chat?.text_chat}`" :time="`${convertDate(chat?.createdAt)}`"/>
                                        <chat-right v-if="chat.username == username" :chat="`${chat?.text_chat}`" :time="`${convertDate(chat?.createdAt)}`"/>
                                        
                                    </div>
                                </div>
                                <div class="form-group mt-3 mb-0">
                                    <textarea @keypress.enter.exact.prevent="onSend" v-model="chat_text" class="form-control" rows="3" autofocus placeholder="Type your message here..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</div>
</template>

<script>
import ChatLeft from '@/components/ChatLeft.vue'
import ChatRight from '@/components/ChatRight.vue'
import axios from 'axios'
import {GET_ALL_CHATS,ADD_CHAT,DELETE_FROM_ROOM} from '@/../url';
import io from "socket.io-client"
export default {
  components : {
    ChatLeft,
    ChatRight
  },
  data() {
    return {
        socket: {},
        username: '',
        room_id: '',
        chats: [],
        chat_text: ''
    }
  },
  methods: {
    onSend(){
        axios.post(ADD_CHAT,{
            "username": this.username,
            "chat": this.chat_text,
            "room": this.room_id
        }).then(response => {
            let data = response.data
            this.socket.emit("message_server",data.room)
            this.chat_text = ''
        }).catch(err => {
            console.log(err)
        })
    },
    async getChatsRoom(){
        await axios.get(GET_ALL_CHATS(this.room_id))
         .then(response => {
            this.chats = response.data
         }).catch(err =>{
            console.log(err)
         })
    },
    convertDate(date){
        var d = new Date(date),
         h = (d.getHours()<10?'0':'') + d.getHours(),
         m = (d.getMinutes()<10?'0':'') + d.getMinutes();
        var c = h + ':' + m;
        return c
    },
    joinRoom(room){
        this.socket.emit("joinRoom",room)
    },
    checkSession(){
        this.username = localStorage.getItem("username")
        this.room_id = localStorage.getItem("room_id")
        if (this.username == undefined && this.room_id == undefined) {
            window.location.href = "/"
        }
    },
    onExit(){
        let id = localStorage.getItem("id")
        axios.delete(DELETE_FROM_ROOM(id))
        .then(res => {
            localStorage.clear()
            window.location.href = "/"
        }).catch(err => {
            console.log(err)
        })
    }
  },
  computed: {
    chatsCompt(){
        return this.chats
    }
  },
  beforeMount(){
    this.checkSession()
    this.joinRoom(this.room_id)
    this.getChatsRoom()
  },
  created(){
    this.socket = io("http://localhost:3020")
  },
  mounted(){
    this.socket.on("message", () => {
       this.getChatsRoom()
    });
  }
}
</script>

<style>
body {
  background: #f4f5fa;
}

.room-active {
    width: 100%;
    padding: 0 15px;
    min-height: 64px;
    line-height: 64px;
    border-bottom: 1px solid #e6ecf3;
    -webkit-border-radius: 0 3px 0 0;
    -moz-border-radius: 0 3px 0 0;
    border-radius: 0 3px 0 0;
    position: relative;
}

.btn-exit {
    position: absolute;
    display: block;
    left: 0;
    top: 10px;
    color: #5DB075;
    background: transparent;
}

.room-active span {
    line-height: 100%;
}

.room-active span.name {
    font-weight: 700;
}
.chat-container {
    position: relative;
    padding: 1rem;
}

.chatContainerScroll {
  overflow-y: auto;
  height: 700px;
  display: flex;
  flex-direction: column-reverse;
}

.chat-container li.chat-left,
.chat-container li.chat-right {
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-bottom: 40px;
}

.chat-container li img {
    width: 48px;
    height: 48px;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
}

.chat-container li .chat-avatar {
    margin-right: 20px;
}

.chat-container li.chat-right {
    justify-content: flex-end;
}

.chat-container li.chat-right > .chat-avatar {
    margin-left: 20px;
    margin-right: 0;
}

.chat-container li .chat-name {
    font-size: .75rem;
    color: #999999;
    text-align: center;
}

.chat-container li .chat-text {
    padding: .4rem 1rem;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: #ffffff;
    font-weight: 300;
    line-height: 150%;
    position: relative;
}

.chat-container li .chat-text:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 10px;
    left: -20px;
    border: 10px solid;
    border-color: transparent #ffffff transparent transparent;
}

.chat-container li.chat-right > .chat-text {
    text-align: right;
    margin-right: 20px;
}

.chat-container li.chat-right > .chat-text:before {
    right: -20px;
    border-color: transparent transparent transparent #5DB075;
    left: inherit;
}

.chat-container li .chat-hour {
    padding: 0;
    margin-bottom: 10px;
    font-size: .75rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 0 0 15px;
}

.chat-container li .chat-hour > span {
    font-size: 16px;
    color: #9ec94a;
}

.chat-container li.chat-right > .chat-hour {
    margin: 0 15px 0 0;
}

.chat-form {
    padding: 15px;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    border-top: 1px solid white;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.card {
    border: 0;
    background: #f4f5fb;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    margin-bottom: 2rem;
    box-shadow: none;
}
.chat-right > .chat-text {
  background: #5DB075 !important;
  color: #FFFFFF;
}
.chat-text {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
