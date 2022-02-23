const express = require("express");
const toDoRouter = require("./routes/todos");
const cors = require("cors");
const mongoose = require("mongoose");
const { process } = require("ipaddr.js");

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("connection started");
});
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/todos", toDoRouter);

app.listen(3000);
