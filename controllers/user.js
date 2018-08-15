const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const encryption = require('../utilities/encryption');

module.exports.registerGet = (req, res) => {
    res.render('user/register');
};

module.exports.registerPost = (req, res) => {
    let user = req.body;

    if (user.password && user.password !== user.confirmedPassword) {
        user.error = "Password don't match.";
        res.render('user/register', user);
        return;
    }

    let salt = encryption.generateSalt();
    user.salt = salt;

    if (user.password) {
        let hashedPassword = encryption.generateHashedPassword(salt, user.password);
        user.password = hashedPassword;
    }

    User.create(user).then(user => {
        req.logIn(user, (error, user) => {
            if (error) {
                res.render('user/register', { error: 'Authentication not working!' });
                return;
            }

            res.redirect('/');
        });
    }).catch(error => {
        user.error = error;
        res.render('user/register', user);
    });
};

module.exports.loginGet = (req, res) => {
    res.render('user/login');
};

module.exports.loginPost = (req, res) => {
    let userToLogin = req.body;

    User.findOne({ username: userToLogin.username }).then(user => {
        if (!user || !user.authenticate(userToLogin.password)) {
            res.render('user/login', { error: 'Invalid Credentials!' });
        } else {
            req.logIn(user, (error, user) => {
                if (error) {
                    return res.render('user/login', { error: 'Authentication not working!'});
                }

                res.redirect('/');
            });
        }
    }).catch(err => {
        if (err) {
            return console.log(err);
        }
    });
};

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports.profileGet = (req, res) => {
    const userId = req.user._id;

    User.findById(userId).then(users => {
        const categoryId = users.createdCategories;
        Category.find({ _id: categoryId }).then(categories => {
            const productId = users.createdProducts;
            Product.find({ _id: productId }).then(products => {
                const bougthProductsId = users.bougthProducts;
                Product.find({ _id: bougthProductsId }).then(bougthProducts => {
                    let male;
                    let female;
                    if (users.gender === 'Male') {
                        male = 'Male';
                        female = null;
                    } else if (users.gender === 'Female') {
                        female = 'Female';
                        male = null;
                    }
                    res.render('user/profile', {
                        users,
                        male,
                        female,
                        products,
                        categories,
                        bougthProducts
                    });
                }).catch(err => {
                    return console.log(err);
                });
            });
        });
    }).catch(err => {
        return console.log(err);
    });
};