'use strict';
 // Daniel O'Regan S00112276
module.exports = function (app) {
    const productList = require('../controllers/productController');

    // productListRoutes
    app.route('/products')
        .get(productList.list_all_products)
        .post(productList.create_a_product);

    app.route('/products/:productId')
        .get(productList.read_a_product)
        .put(productList.update_a_product)
        .delete(productList.delete_a_product);
};