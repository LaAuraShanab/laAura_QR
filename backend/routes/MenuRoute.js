const express = require("express");

const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
    createMenuItem,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem,
    getMenuByCategory,
} = require("../controllers/MenuController");

router.get("/", getMenuItems);
router.get("/category/:categoryId", getMenuByCategory);
router.post("/",protect, createMenuItem);
router.put("/:id",protect, updateMenuItem);
router.delete("/:id",protect, deleteMenuItem);

module.exports = router;