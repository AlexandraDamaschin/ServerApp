'use strict'
//Sophia Price S00160641
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../config/database');

// From http://mongoosejs.com/docs/schematypes.html
//var ObjectId = mongoose.Schema.Types.ObjectId;
//var Product = new Schema({ _id: ObjectId });

// Transaction Schema
const TransactionSchema = new Schema({
    userName: {
        type: String,
        required: 'Enter Usename'
    },
    time: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: 'Enter Total Amount'
    },
    products: [{
        id: {
            type: [Schema.Types.ObjectId],
            required: 'Enter the Products'
        },
        price: {
            type: Number,
            required: true
        }
    }]
});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);