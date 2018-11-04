'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let newAuthor = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: false},
    bio: {type: String, required: false}
});

module.exports = mongoose.model('Author', newAuthor);