'use strict';

module.exports = function(app) {
    var transactions = require('../controllers/transactionController');

    // transactions Routes
    app.route('/confirmation')
        .post(transactions.addTransaction)
        .get(transactions.showAllTransactions);
}