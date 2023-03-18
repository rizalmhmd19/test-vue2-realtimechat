const express = require("express")
const cors = require("cors")
const http = require("http")
const app = express()
const server = http.createServer(app)

var corsOptions = {
  origin : "http://localhost:8080"
};

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.disable('etag');
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./app/routes/chat.route")(app);
require("./app/routes/room.route")(app);
require("./app/controllers/socketio.controller")(server);

const PORT = process.env.PORT || 3020
server.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`)
})