'use strict';

const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

exports.addTransaction = function (req, res) {
    var newTransaction = new Transaction(req.body);
    newTransaction.save({}, function (err, transaction) {
        if (err)
            res.send(err);
        res.json(transaction);      
    });
};

exports.showAllTransactions = function (req, res) {
    Transaction.find({}, function (err, transaction) {
        if (err)
            res.send(err);
        
            res.json(transaction);
    });
};

//showTransaction = function (res, req) {
//    Transaction.findById(transactionId)
//}