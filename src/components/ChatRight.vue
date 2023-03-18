<template>
  <li class="chat-right">
      <div class="chat-hour">{{time}}</div>
      <div class="chat-text">{{chat}}</div>
  </li>
</template>

<script>
export default {
  name : "ChatRight",
  props : {
    chat : String,
    time : String
  }
}
</script>