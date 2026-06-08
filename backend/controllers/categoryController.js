const Category = require("../models/Category");
const MenuItem = require("../models/MenuItems");

const createCategory = async (req, res) => {

    try {

        const { name, desc } = req.body;

        const exists = await Category.findOne({ name });

        if (exists) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        const category = await Category.create({ name, desc });

        res.status(201).json(category);

    } catch (error) {

        res.status(500).json({
            message: "Failed to create category"
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, desc } = req.body;

        const existing = await Category.findOne({ name, _id: { $ne: id } });
        if (existing) {
            return res.status(400).json({
                message: "Another category with that name already exists"
            });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, desc },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json(updatedCategory);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update category"
        });
    }
};

const getCategories = async (req, res) => {

    try {

        const categories = await Category.find();

        res.json(categories);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch categories"
        });
    }
};

const deleteCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        await MenuItem.deleteMany({ category: id });

        res.status(200).json({
            message: "Category and related items deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete category"
        });
    }
};


module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};