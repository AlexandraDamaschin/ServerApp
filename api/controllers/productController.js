'use strict';

const mongoose = require('mongoose');
const ProductModel = mongoose.model('Products');
//const ProductModel= require('../models/productModel');

// Returns all products 
exports.list_all_products = function (req, res) {
    ProductModel.find({}, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

// Creates a product
exports.create_a_product = function (req, res) {
    var new_product = new ProductModel(req.body);
    new_product.save({}, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

// Returns a product based on productId
exports.read_a_product = function (req, res) {
    ProductModel.find({_id: req.params.productId}, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

// Updates an existing product based on productId
exports.update_a_product = function (req, res) {
    ProductModel.findOneAndUpdate({_id: req.params.productId}, req.body,
        { new: true }, function (err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
};

// Delete a product based on productId
exports.delete_a_product = function (req, res) {
    ProductModel.findOneAndRemove({_id: req.params.productId},
         function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};