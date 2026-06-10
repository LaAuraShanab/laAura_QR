const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");
router.post("/", protect, createCategory);
router.get("/", getCategories);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;