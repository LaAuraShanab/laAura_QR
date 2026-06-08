const mongoose = require("mongoose");
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    nameEN: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("MenuItem", menuItemSchema);