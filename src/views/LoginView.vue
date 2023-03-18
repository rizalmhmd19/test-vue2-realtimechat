<template>
    <div class="container">
    <div class="row">
      <div class="col-md-9 col-lg-6 col-sm-9 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Join Chatroom</h5>
            <form class="form-signin" @submit="onSubmit" @reset="onReset">
              <b-alert v-if="this.showAlert==true" show variant="danger">{{this.errorText}}</b-alert>
              <div class="form-label-group">
                <input type="text" id="inputUsername" v-model="form.username" class="form-control" placeholder="Username" required autofocus>
              </div>

              <div class="form-label-group">
                <input type="text" id="inputRoom" v-model="form.room_id" class="form-control" placeholder="RoomID" required>
              </div>
              
              <div class="form-label-group">
              <button class="btn btn-lg text-uppercase btn-block" type="submit">Join</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ADD_TO_ROOM} from "../../url";
import axios from "axios";

export default {
  data() {
    return {
      socket: {},
      form: {
        username: '',
        room_id: ''
      },
      showAlert: false,
      errorText: ""
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.joinRoom()
    },
    onReset(){
      this.form.username = ''
      this.form.room_id = ''
    },
    checkUserLogin(){
      let username = localStorage.getItem("username");
      let room_id = localStorage.getItem("room_id")
      if(username || room_id){
        window.location.href = "/chats"
      }
    },
    joinRoom(){
      axios.post(ADD_TO_ROOM,{
        "username": this.form.username,
        "room": this.form.room_id
      }).then(response => {
          let data = response.data;
          localStorage.setItem("username", data.username)
          localStorage.setItem("room_id", data.room)
          localStorage.setItem("id", data.id)
          window.location.href = "/chats"
        }).catch(err => {
          this.showAlert = true
          this.errorText = err.response.data.message
          this.onReset()
        });
    }
  },
  mounted(){
    this.onReset()
    this.checkUserLogin()
  }
}
</script>
<style>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}

body {
  background: #5DB075;
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-label-group {
  margin-bottom: 20px;
}

.form-label-group > button {
  width: 100%;
  background-color: #5DB075;
  color: white;
}

.form-label-group > button:hover {
  background-color: #286138;
  color: white;
}

.form-label-group > input {
  font-size: 120%;
  background-color: #F6F6F6;
  border-radius: 1rem;
  padding: .8rem;
}

.form-label-group > input ::placeholder {
  color: #BDBDBD;
  opacity: 1;
}

input:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #BDBDBD;
}

input::-ms-input-placeholder { /* Microsoft Edge */
  color: #BDBDBD;
}
</style>