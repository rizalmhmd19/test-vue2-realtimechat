const db = require("../models")
const Room = db.user_room;

exports.create = (req, res) => {
  if(req.body.username == "" || req.body.room == "" ||!req.body.username||!req.body.room){
    res.status(400).send({message: "Content can not be empty!"});
    return
  }

  const username = req.body.username;
  const room = req.body.room;
  
  var condition = username ? {username: username, room:room}:{};

  Room.find(condition)
    .then(data => {
      if(data.length > 0){
        res.status(400).send({
          message:
            "Username is exist in this room."
        });
      }else{
        const dataSave = new Room({
          username: req.body.username,
          room: req.body.room
        });
      
        dataSave
          .save(dataSave)
          .then(data => {
            res.status(200).send(data)
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while saving chat."
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting data."
      });
    });
};

exports.findAll = (req, res) => {
  const username = req.query.username;
  const room = req.query.room;
  
  var condition = username ? {username: username, room:room}:{};

  Room.find(condition)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting data."
      });
    });
};

exports.delete = (req,res) => {
  const id = req.params.id;

  Room.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User from room with id=${id}. Maybe User was not found!`
        });
      } else {
        res.status(200).send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
}

exports.deleteAll = (req, res) => {
  Room.deleteMany({})
    .then(data => {
      res.status(200).send({
        message: `${data.deletedCount} Rooms were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all chats."
      });
    });
};