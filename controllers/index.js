const homeController = require('./home');
const prodcutsController = require('./product');
const categoryController = require('./category');
const userController = require('./user');

module.exports = { 
    home: homeController, 
    product: prodcutsController,
    category: categoryController,
    user: userController
};