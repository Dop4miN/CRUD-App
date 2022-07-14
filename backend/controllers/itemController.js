const Item = require("../model/itemModel");

const getItems = async (req, res) => {
  const items = await Item.find();
  res.status(200).json(items);
};

const postItem = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const item = await Item.create({
    text: req.body.text,
  });
  res.status(200).json(item);
};

const putItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedItem);
};

const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  await item.remove();
  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getItems,
  postItem,
  putItem,
  deleteItem,
};
