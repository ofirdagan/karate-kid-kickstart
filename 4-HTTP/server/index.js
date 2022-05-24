const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

let list = [];

app.get("/todos", (req, res) => {
  res.send(list);
});

app.post("/todo", (req, res) => {
  list.push(req.body);
  res.send(list);
});

app.put("/todo/:id", (req, res) => {
  list = list.map((todo) => {
    return todo.id === req.params.id ? req.body.data : todo;
  });
  res.send(list);
});

app.delete("/todo/:id", (req, res) => {
  list = list.filter(({ id }) => id !== req.params.id);
  res.send(list);
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
