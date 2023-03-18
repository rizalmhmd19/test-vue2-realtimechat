const dbConfig = require("../../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.chats = require("./chat.model.js")(mongoose)
db.user_room = require("./user_room.model.js")(mongoose)


module.exports = db;