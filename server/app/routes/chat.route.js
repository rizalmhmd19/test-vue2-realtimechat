module.exports = app => {
  const chats = require("../controllers/chat.controller.js");

  var router = require("express").Router();

  router.post("/", chats.create);

  router.get("/:room", chats.findAll);

  router.delete("/", chats.deleteAll);

  router.get("/", chats.findAll);

  app.use('/api/chat', router);
}