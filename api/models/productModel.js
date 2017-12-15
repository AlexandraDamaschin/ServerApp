'use strict';
 // Daniel O'Regan S00112276
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    productId: {
        type: String,
        Required: [true]
    },
    name: {
        type: String,
        Required: [true]
    },
    desc: {
        type: String,
        Required: [true]        
    },
    category: {
        type: String,
        Required: [true]        
    },
    department: {
        type: String,
        Required: [true]        
    },
    price: {
        type: Number,        
        Required: [true]   
    },
    stock: {
        type: Number,
        Required: [true]   
    },
    reviews: {
        type: [String],
        Required: [true]
    },
    images: {
        type: [String],
        Required: [true]
    },
    sizes: {
        type: [Number],
        Required: [true]
    }
});

var Products = mongoose.model('Products', ProductSchema);
module.exports = Products;