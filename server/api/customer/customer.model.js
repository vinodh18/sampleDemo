'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name		: {type: String, required: true},
  username  : {type: String},
  phone		: {type: Number},
  email		: {type: String},
  city		: {type: String},
  gender	: {type: String, enum:['M', 'F'], required: true},
  password  : {type: String, required: true},
  address	: {type: String}
});

module.exports = mongoose.model('Customer', CustomerSchema);