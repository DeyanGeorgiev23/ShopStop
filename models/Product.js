const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, require: true },
    description: { type: mongoose.SchemaTypes.String },
    price: { type: mongoose.SchemaTypes.Number, default: 0 },
    image: { type: mongoose.SchemaTypes.String, default: '' },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    buyer: { type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category', required: true }
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product;