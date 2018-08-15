const Product = require('../models/Product');
const User = require('../models/User');

module.exports.index = (req, res) => {
    let queryData = req.query;
    Product.find({ buyer: null }).populate('category').then((products) => {
        for (let product of products) {
            var creatorID = product.creator._id;
        }
       
        if (!creatorID) {
            if (queryData.query) {
                products = products.filter( p => p.name.toLowerCase().includes(queryData.query.toLowerCase()));
            }
                
            let data = { products: products };
    
            if (req.query.error) {
                data.error = req.query.error; 
            } else if (req.query.success) {
                data.success = req.query.success;
            }
            return res.render('home/index', data);
        }

        User.findById(creatorID).then(user => {
            let creator = user.username;

            if (queryData.query) {
                products = products.filter( p => p.name.toLowerCase().includes(queryData.query.toLowerCase()));
            }
                
            let data = {
                products,
                creator
            };
    
            if (req.query.error) {
                data.error = req.query.error; 
            } else if (req.query.success) {
                data.success = req.query.success;
            }
            res.render('home/index', data);
        });
    }).catch(err => {
        if (err) {
            return console.log(err);
        }
    });
};