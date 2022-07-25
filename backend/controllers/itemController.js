const Item = require("../models/itemModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.user.id });

  res.status(200).json(items);
});

const postItem = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const item = await Item.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(item);
});

const putItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (item.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
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

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (item.user.toString() != req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
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
