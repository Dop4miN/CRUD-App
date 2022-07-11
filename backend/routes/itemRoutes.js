const express = require("express");
const router = express.Router();
const {
  getItems,
  postItem,
  putItem,
  deleteItem,
} = require("../controllers/itemController");

router.route("/").get(getItems).post(postItem);
router.route("/:id").put(putItem).delete(deleteItem);

module.exports = router;
