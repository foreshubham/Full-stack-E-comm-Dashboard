const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    mobile : Number,
    password : String
});

module.exports = mongoose.model("users",userSchema);

// Here we define the models for the data which is going to store or use in our applicaiton.