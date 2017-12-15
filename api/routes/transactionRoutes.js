'use strict';
//Sophia Price S00160641
module.exports = function(app) {
    var transactions = require('../controllers/transactionController');

    // transactions Routes
    app.route('/confirmation')
        .post(transactions.addTransaction)
        .get(transactions.showAllTransactions);
}