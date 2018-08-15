const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Product' }]
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;