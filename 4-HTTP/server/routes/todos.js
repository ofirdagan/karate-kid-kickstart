const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const jsonParser = bodyParser.json();

let idIndex = 1;
const toDoList = {
};

router.get("/", (req, res) => {
  res.send(toDoList);
});

router.post("/", jsonParser, async (req, res) => {
  toDoList[idIndex] = { title: req.body.title };
  res.status(200).send({ id: idIndex });
  idIndex++;
});

router.patch("/:id", jsonParser, async (req, res) => {
  const taskId = req.params.id;
  if (toDoList[taskId]) {
    toDoList[taskId].title = req.body.title;
    res.sendStatus(200);
    return;
  }
  res.send("task not found").status(400);
  
});

router.delete("/:id", async (req, res) => {
  const taskId = req.params.id;
  if (toDoList[taskId]) {
    delete toDoList[taskId];
  }
  res.sendStatus(200);
});
module.exports = router;
