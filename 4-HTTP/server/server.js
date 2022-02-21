const express = require("express");
const toDoRouter = require("./routes/todos");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/todos", toDoRouter);

app.listen(3000);
