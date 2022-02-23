const express = require("express");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const ToDoModel = require("../models.js");
const router = express.Router();

router.use(cookieParser());
router.use(express.json());

let isNewUser = false;
let _id = "";
router.get("/cookies", (req, res) => {
  if (!req.cookies) {
    const userId = uuidv1();
    res.cookie("userId", userId);
    res.send("cookie setup");
    isNewUser = true;
    return;
  }
  res.sendStatus(200);
});
router.get("/", async (req, res) => {
  if (!req.cookies.userId) {
    res.send("user not found");
    return;
  }
  _id = req.cookies.userId;
  const toDoList = await ToDoModel.findById(_id).clone();
  res.send(toDoList.tasks);
});

router.post("/", async (req, res) => {
  const userId = req.cookies.userId;
  const taskId = uuidv4();
  const taskTitle = req.body;
  if (isNewUser) {
    const toDo = { _id: userId, tasks: { [taskId]: taskTitle } };
    const task = new ToDoModel(toDo);
    await task.save();
    res.status(200).send({ id: taskId });
    isNewUser = false;
    return;
  }
  const toDoList = await ToDoModel.findById(_id).clone();
  toDoList.tasks[taskId] = taskTitle;
  await ToDoModel.findOneAndUpdate(
    { _id: userId },
    { $set: { tasks: toDoList.tasks } }
  ).clone();
  res.send({ id: taskId });
});

router.patch("/:id", async (req, res) => {
  const taskId = req.params.id;
  const tasksList = await ToDoModel.findById(_id).clone();
  if (!tasksList.tasks[taskId]) {
    res.sendStatus(400);
    return;
  }
  tasksList.tasks[taskId].title = req.body.title;
  await ToDoModel.findByIdAndUpdate(_id, {
    $set: { tasks: tasksList.tasks },
  });
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const taskId = req.params.id;
  const tasksList = await ToDoModel.findById(_id).clone();
  if (!tasksList.tasks[taskId]) {
    res.sendStatus(200);
    return;
  }
  delete tasksList.tasks[taskId];
  await ToDoModel.findByIdAndUpdate(_id, { $set: { tasks: tasksList.tasks } });
  res.sendStatus(200);
});
module.exports = router;
