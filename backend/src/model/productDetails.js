'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let newProductDetails = new Schema({
    Hardcover: {type: Array, required: false},
    Publisher: {type: Array, required: false},
    PublicationDate: {type: Array, required: false},
    Language: {type: Array, required: false},
    ISBN10: {type: Array, required: false},
    ISBN13: {type: Array, required: false},
    ProductDimensions: {type: Array, required: false},
    ShippingWeight: {type: Array, required: false}
});

module.exports = mongoose.model('ProductDetails', newProductDetails);