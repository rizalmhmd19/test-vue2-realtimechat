const db = require("../models")
const Chat = db.chats;

exports.create = (req, res) => {
  if(!req.body.username|| !req.body.chat|| !req.body.room||req.body.username == ""|| req.body.chat == ""|| req.body.room == ""){
    res.status(400).send({message: "Content can not be empty!"});
    return
  }

  const chat = new Chat({
    username: req.body.username,
    text_chat: req.body.chat,
    room: req.body.room
  });

  chat
    .save(chat)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while saving chat."
      });
    });
};

exports.findAll = (req, res) => {
  const room = req.params.room;
  var condition = room ? {room: room}:{};

  Chat.find(condition)
    .sort({"createdAt": -1})
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting data."
      });
    });
};

exports.deleteAll = (req, res) => {
  Chat.deleteMany({})
    .then(data => {
      res.status(200).send({
        message: `${data.deletedCount} Chats were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all chats."
      });
    });
};