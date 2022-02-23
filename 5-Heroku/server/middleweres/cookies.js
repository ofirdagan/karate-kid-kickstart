
const {v1:uuidv1} = require('uuid');
const ToDoModel = require('../models')


const checkCookies = function(req, res, next) {
    if (!req.cookies) {
        const userId = uuidv1();
        res.cookie("userId", userId);
        createNewUser(userId);
        res.sendStatus(200);
    }
    next();
}
const createNewUser = async function(userId) {
    const toDo = { _id: userId, tasks: {} };
    const task = new ToDoModel(toDo);
    await task.save();
}

module.exports = {checkCookies}