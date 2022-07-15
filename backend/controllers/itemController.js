const Item = require("../models/itemModel");
const asyncHandler = require("express-async-handler");

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.status(200).json(items);
});

const postItem = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const item = await Item.create({
    text: req.body.text,
  });
  res.status(200).json(item);
});

const putItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedItem);
});

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  await item.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getItems,
  postItem,
  putItem,
  deleteItem,
};
