const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const MenuItem = require("../models/MenuItems");

const createSubCategory = async (req, res) => {

    try {

        const { name,nameEN, category } = req.body;

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(400).json({
                message: "Category not found"
            });
        }

        const subCategory = await SubCategory.create({
            name,
            nameEN,
            category
        });

        res.status(201).json(subCategory);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create subcategory"
        });
    }
};

const getSubCategories = async (req, res) => {

    try {

        const subCategories = await SubCategory
            .find()
            .populate("category");
        if (subCategories.length === 0) {
            return res.status(200).json({
                message: "No subcategories found"
            });
        }
        else {
        res.json(subCategories);
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch subcategories"
        });
    }
};

const getSubCategoriesByCategory = async (req, res) => {

    try {

        const { categoryId } = req.params;

        const subCategories = await SubCategory.find({
            category: categoryId
        });

        res.json(subCategories);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch subcategories"
        });
    }
};

const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

        if (!deletedSubCategory) {
            return res.status(404).json({
                message: "Subcategory not found"
            });
        }

        await MenuItem.deleteMany({ subCategory: id });

        res.status(200).json({
            message: "Subcategory and related menu items deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete subcategory"
        });
    }
};

module.exports = {
    createSubCategory,
    getSubCategories,
    getSubCategoriesByCategory,
    deleteSubCategory
};