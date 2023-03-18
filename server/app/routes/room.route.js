module.exports = app => {
  const rooms = require("../controllers/room.controller.js");

  var router = require("express").Router();

  router.post("/", rooms.create);

  router.get("/", rooms.findAll);

  router.delete("/:id", rooms.delete);

  router.delete("/", rooms.deleteAll);

  app.use('/api/room', router);
}