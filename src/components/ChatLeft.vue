<template>
  <li class="chat-left">
      <div class="chat-avatar">
          <div class="chat-name">{{name}}</div>
      </div>
      <div class="chat-text">{{chat}}</div>
      <div class="chat-hour">{{time}}</div>
  </li>
</template>

<script>
export default {
  name : "ChatLeft",
  props : {
    name : String,
    chat : String,
    time : String
  }
}
</script>