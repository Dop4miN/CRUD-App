const getItems = (req, res) => {
  res.status(200).json({ message: "get items" });
};

const postItem = (req, res) => {
  res.status(200).json({ message: "set item" });
};

const putItem = (req, res) => {
  res.status(200).json({ message: `update item ${req.params.id}` });
};

const deleteItem = (req, res) => {
  res.status(200).json({ message: `delete item ${req.params.id}` });
};

module.exports = {
  getItems,
  postItem,
  putItem,
  deleteItem,
};
