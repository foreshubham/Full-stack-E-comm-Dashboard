const express = require('express');
const cors = require('cors');
require('./Database/config');
const Product = require("./Database/ProductsModel")
const User = require("./Database/User");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {

    let user = new User(req.body);
    let result = await user.save();

    // This is for removing password while saving the data in db the password will not going to show in localstorge
    result = result.toObject();
    delete result.password;

    res.send(result)

});


// Login Route

app.post('/login', async (req, res) => {

    // To check the both fields are field or not.
    console.log(req.body);

    if (req.body.password && req.body.email) {

        let user = await User.findOne(req.body).select("-password"); //we use select to remove the password from the result

        if (user) {
            res.send(user);
        }
        else {
            res.send("No user found")
        }
    } else {
        res.send("No user found")
    }


})

// Add-Product Route
app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);

});


// Product Listing Route

app.get("/products", async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No Proudcts FOund" })
    }

})

// Delete Product Route

app.delete("/product/:id", async (req, res) => {
    // res.send(req.params.id);
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result)
});


// Single Product Details Fetch API

app.get("/products-details/:id", async (req, res) => {

    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "NO result fond" })
    }

});

app.listen(5022);