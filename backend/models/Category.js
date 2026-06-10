const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nameEN: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    desc: {
        type: String,
        trim: true,
        default: ""
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("Category", categorySchema);