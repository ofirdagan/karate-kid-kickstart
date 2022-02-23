const express = require("express");
const toDoRouter = require("./routes/todos");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://chanam:cm%40mondb22@cluster0.ifmbl.mongodb.net/ToDo's?retryWrites=true&w=majority",
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
