const express = require("express");

const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
    createMenuItem,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem,
    getMenuByCategory,
    getMenuTree,
} = require("../controllers/MenuController");

router.get("/", getMenuItems);
router.get("/category/:categoryId", getMenuByCategory);
router.get("/tree", getMenuTree);
router.post("/",protect, createMenuItem);
router.put("/:id",protect, updateMenuItem);
router.delete("/:id",protect, deleteMenuItem);

module.exports = router;