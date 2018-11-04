'use strict';

const mongoose = require('mongoose');

const author = require('./author');
const productDetails = require('./productDetails');

const Schema = mongoose.Schema;
let newBook = new Schema({
    title: {type: String, required: true},
    subTitle: {type: String, required: false},
    author: author.schema,
    description: {type: String, required: false},
    parentTheme: {type: String, required: false},
    theme: {type: String, required: false},
    productDetails: productDetails.schema
});

module.exports = mongoose.model('Book', newBook);
