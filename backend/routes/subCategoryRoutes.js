const express = require("express");

const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
    createSubCategory,
    getSubCategories,
    getSubCategoriesByCategory,
    updateSubCategory,
    deleteSubCategory
} = require("../controllers/subCategoryController");

router.post("/", protect, createSubCategory);

router.get("/",  getSubCategories);

router.get(
    "/category/:categoryId",
    getSubCategoriesByCategory
);

router.put("/:id", protect, updateSubCategory);

router.delete("/:id", protect, deleteSubCategory);

module.exports = router;