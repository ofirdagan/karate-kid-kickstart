const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MONGO_URI =
  "mongodb+srv://mongo:1J6rVJPjdrskmtS8@mychecklistcluster.z23uf.mongodb.net/MyChecklist";

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

function dbUpdateCallback(res, successStatus) {
  return function (error, doc) {
    if (error) {
      console.log(error);
      res.status(500).send("Database error!");
    } else {
      res.sendStatus(201);
    }
  };
}

module.exports.getItems = (req, res) => {
  Todo.find({ user_id: 0 }, function (err, docs) {
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
    user_id: 0,
    id: req.body.id,
    text: req.body.text,
    check: req.body.check,
  });

  todo.save(dbUpdateCallback(res, 201));
};

module.exports.editItem = (req, res) => {
  const query = { user_id: 0, id: req.params.id };
  const item = {
    user_id: 0,
    id: req.params.id,
    text: req.body.text,
    check: req.body.check,
  };

  Todo.findOneAndUpdate(query, item, dbUpdateCallback(res, 200));
};

module.exports.deleteItem = (req, res) => {
  const query = { user_id: 0, id: req.params.id };
  Todo.deleteOne(query, dbUpdateCallback(res, 200));
};
