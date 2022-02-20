const items = {};

module.exports.getItems = (req, res) => {
  res.json(items);
};

module.exports.createItem = (req, res) => {
  items[req.body.id] = {
    text: req.body.text,
    check: req.body.check,
  };
  res.sendStatus(201);
};

module.exports.editItem = (req, res) => {
  items[req.params.id] = {
    text: req.body.text,
    check: req.body.check,
  };
  res.sendStatus(200);
};

module.exports.deleteItem = (req, res) => {
  delete items[req.params.id];
  res.sendStatus(200);
};