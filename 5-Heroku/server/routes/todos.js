const express = require("express");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const ToDoModel = require("../models.js");
const {checkCookies} = require("../middleweres/cookies");
const router = express.Router();

router.use(cookieParser());
router.use(express.json());
router.use(checkCookies);


router.get("/", async (req, res) => {
  const _id = req.cookies.userId;
  console.log(_id);
  const toDoList = await ToDoModel.findById(_id).clone();
  res.send(toDoList.tasks);
});

router.post("/", async (req, res) => {
  const userId = req.cookies.userId;
  const taskId = uuidv4();
  const taskTitle = req.body;
  const toDoList = await ToDoModel.findById(userId).clone();
  toDoList.tasks[taskId] = taskTitle;
  await ToDoModel.findOneAndUpdate(
    { _id: userId },
    { $set: { tasks: toDoList.tasks } }
  ).clone();
  res.send({ id: taskId });
});

router.patch("/:id", async (req, res) => {
  const userId = req.cookies.userId;
  const taskId = req.params.id;
  const tasksList = await ToDoModel.findById(userId).clone();
  if (!tasksList.tasks[taskId]) {
    res.sendStatus(400);
    return;
  }
  tasksList.tasks[taskId].title = req.body.title;
  await ToDoModel.findByIdAndUpdate(userId, {
    $set: { tasks: tasksList.tasks },
  });
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const userId = req.cookies.userId;
  const taskId = req.params.id;
  const tasksList = await ToDoModel.findById(userId).clone();
  if (!tasksList.tasks[taskId]) {
    res.sendStatus(200);
    return;
  }
  delete tasksList.tasks[taskId];
  await ToDoModel.findByIdAndUpdate(userId, { $set: { tasks: tasksList.tasks } });
  res.sendStatus(200);
});
module.exports = router;
