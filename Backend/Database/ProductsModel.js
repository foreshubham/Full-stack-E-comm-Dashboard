const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : String,
    price : Number,
    quantity: Number,
    catogery: String,
    userId: String,
    brand : String,
    color : String
});

module.exports = mongoose.model("Products",productSchema);