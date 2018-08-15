const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
    let error = '';
    if (req.query.error) {
        error = req.query.error; 
    }
    res.render('category/add', { 
        error 
    });
};

module.exports.addPost = (req, res) => {
    let category = req.body;

    if (!category.name) {
        res.redirect('add/?error=' + encodeURIComponent('Category is reqiured!'));
        return;
    }

    category.creator = req.user.id;

    Category.create(category).then((category) => {
        category.save().then(() => {
            req.user.createdCategories.push(category._id);
            req.user.save().then(() => {
                res.redirect('/?success=' + encodeURIComponent('Category was create successfully!'));
            });
        });
    }).catch(err => {
        if (err) {
            return console.log(err);
        }
    });
};

module.exports.productByCategory = (req, res) => {
    let categoryName = req.params.category;

    Category.findOne({name: categoryName}).populate('products').then((category) => {
        if (!category) {
            res.sendStatus(404);
            return;
        }

        res.render('category/products', {category: category});
    }).catch(err => {
        if (err) {
            return console.log(err);
        }
    });
};