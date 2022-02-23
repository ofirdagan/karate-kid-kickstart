const express = require("express");
const toDoRouter = require("./routes/todos");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config('5-Heroku/server/.env');

mongoose.connect(
  process.env.MONGODB_URL,
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
