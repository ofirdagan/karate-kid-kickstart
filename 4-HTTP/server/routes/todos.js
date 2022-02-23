const express = require("express");
const bodyParser = require("body-parser");
const { v1:uuidv1, v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const router = express.Router();
const jsonParser = bodyParser.json();

router.use(cookieParser());

const toDoList = {};
router.get('/cookies',(req, res) =>{
  const userId = uuidv1();
  res.cookie("userId",userId);
  res.send("cookie setup");

})

router.get("/", (req, res) => {
  res.send(toDoList);
});

router.post("/", jsonParser, async (req, res) => {
  const id = uuidv4();
  toDoList[id] = { title: req.body.title };
  res.status(200).send({ id: id });
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
