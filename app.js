const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./app/models");
db.sequelize.sync();
app.get("/", (req, res) => {
  res.json({ message: "Hello World!!" });
});
require("./app/routes/books.routes")(app);
module.exports =app;