const MenuItem = require("../models/MenuItems");
const Category = require("../models/Category");

const createMenuItem = async (req, res) => {

    try {

        const {
            name,
            nameEN,
            description,
            price,
            category,
            imageUrl
        } = req.body;

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(400).json({
                message: "Invalid category"
            });
        }
        const menuItem = await MenuItem.create({
            name,
            nameEN,
            description,
            price,
            category,
            imageUrl
        });

        res.status(201).json(menuItem);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create menu item"
        });
    }
};

const getMenuItems = async (req, res) => {

    try {

        const items = await MenuItem.find()
            .populate("category");

        res.status(200).json(items);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch menu items"
        });
    }
};

const updateMenuItem = async (req, res) => {

    try {

        const { id } = req.params;

        const updatedItem = await MenuItem.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json(updatedItem);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update menu item"
        });
    }
};

const deleteMenuItem = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedItem = await MenuItem.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            message: "Menu item deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete menu item"
        });
    }
};

const getMenuByCategory = async (req, res) => {

    try {

        const { categoryId } = req.params;

        const items = await MenuItem.find({
            category: categoryId,
            available: true
        }).populate("category");

        res.json(items);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching items"
        });
    }
};

module.exports = {
    createMenuItem,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem,
    getMenuByCategory,
};