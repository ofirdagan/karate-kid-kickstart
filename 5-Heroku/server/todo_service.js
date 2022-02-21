const mongoose = require("mongoose");
const uuid = require("uuid");
require('dotenv').config();

const Schema = mongoose.Schema;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MobgoDB is connected!");
});

const TodoSchema = new Schema({
  user_id: String,
  id: String,
  text: String,
  check: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

function dbUpdateCallback(req, res, successStatus) {
  return function (error, doc) {
    if (error) {
      console.log(error);
      res.status(500).send("Database error!");
    } else {
      res.sendStatus(successStatus);
    }
  };
}

module.exports.getItems = (req, res) => {
  let userId;

  if (req.cookies === undefined ||
    req.cookies.userId === undefined) {
    userId = uuid.v4();
    res.cookie('userId', userId, { maxAge: 900000 });
  } else {
    userId = req.cookies.userId;
  }

  Todo.find({ user_id: userId }, function (err, docs) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      var items = {};

      docs.forEach(function (doc) {
        items[doc.id] = {
          text: doc.text,
          check: doc.check,
        };
      });

      res.send(items);
    }
  });
};

module.exports.createItem = (req, res) => {
  const todo = new Todo({
    user_id: req.cookies.userId,
    id: req.body.id,
    text: req.body.text,
    check: req.body.check,
  });

  todo.save(dbUpdateCallback(req, res, 201));
};

module.exports.editItem = (req, res) => {
  const query = { user_id: req.cookies.userId, id: req.params.id };
  const item = {
    user_id: req.cookies.userId,
    id: req.params.id,
    text: req.body.text,
    check: req.body.check,
  };

  Todo.findOneAndUpdate(query, item, dbUpdateCallback(req, res, 200));
};

module.exports.deleteItem = (req, res) => {
  const query = { user_id: req.cookies.userId, id: req.params.id };
  Todo.deleteOne(query, dbUpdateCallback(req, res, 200));
};
