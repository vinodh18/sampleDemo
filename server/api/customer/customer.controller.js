'use strict';

var _ = require('lodash');
var Customer = require('./customer.model');
var config = require('../../config/environment');
var sendRsp = require('../utils').sendRsp;
var log = require('../libs/log')(module);
var util = require('util');
var globalLimit = config.globalRowsLimit;
var ObjectId = require('mongoose').Types.ObjectId;
var request     = require('request');
var express = require('express');
var expressValidator = require('express-validator');

// Get list of customers
exports.index = function(req, res) {
  Customer.find(function(err, customers){
    if(err){
      sendRsp(res, 400, 'Customers Not Found');
    }else{
      sendRsp(res, 200, "Customers", {customers: customers});
    }
  })
};

// Get a single customer
exports.show = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.status(404).send('Not Found'); }
    return res.json(customer);
  });
};

// Creates a new customer in the DB.
exports.create = function(req, res) {

  req.checkBody('name', 'Missing params').notEmpty();
  req.checkBody('gender', 'Missing params').notEmpty();
  req.checkBody('password', 'Missing params').notEmpty();
    
    if(req.body.password.length <= 6){
      sendRsp(res, 400, "The password must be at least 7 characters ");
      return;
    }

  var error = req.validationErrors();
  if(error){
    sendRsp(res, 400, 'Missing params', util.inspect(error))
    return;
  }

  var newcustomer= new Customer({
    name    : req.body.name,
    username: req.body.username,
    email   : req.body.email,
    phone   : req.body.phone,
    city    : req.body.city,
    gender  : req.body.gender,
    password: req.body.password,
    address : req.body.address
  })
  newcustomer.save(function(err, customer){
    console.log("err...", err);
    if(customer){
     sendRsp(res, 201, "Customer Created", {customer: customer});
    }else if(err.name === "ValidationError"){
       sendRsp(res, 400, "validation Error");
      }else{
      if(!err){
        sendRsp(res, 500, "server Error");
      }
    }
  })
 
};

// Updates an existing customer in the DB.
exports.update = function(req, res) {
  var id = req.params.id;

  req.checkBody('name', 'Missing params').notEmpty();
  req.checkBody('gender', 'Missing params').notEmpty();
  req.checkBody('password', 'Missing params').notEmpty();
    
    if(req.body.password.length <= 6){
      sendRsp(res, 400, "The password must be at least 7 characters ");
      return;
    }

  var error = req.validationErrors();
  if(error){
    sendRsp(res, 400, 'Missing params', util.inspect(error))
    return;
  }

  Customer.findById(id, function(err, customer){
    if(err){
      sendRsp(res, 400, ' Not Found');
    }
    console.log("customers", customer);
    customer.name     = req.body.name;
    customer.username = req.body.username;
    customer.email    = req.body.email;
    customer.phone    = req.body.phone;
    customer.city     = req.body.city;
    customer.gender   = req.body.gender;
    customer.password = req.body.password;
    customer.address  = req.body.address;

    customer.save(function(err, customer){
      if(!err){
        sendRsp(res, 200, 'Customer Updated', {customer: customer});
      }else if(err.name === "ValidationError"){
       sendRsp(res, 400, "validation Error");
      }else{
      if(!err){
        sendRsp(res, 500, "server Error");
      }
    }
    });
  })
 
};

// Deletes a customer from the DB.
exports.destroy = function(req, res) {
  var id= req.params.id;

  Customer.findById(id, function(err, customer){
    if(err){
      sendRsp(res, 400, "Customer Not Found");
    }
      customer.remove(function(err, cus){
        if(err){
          sendRsp(res, 400, "Customer Not Found")
        }else{
          sendRsp(res, 200, "Customer Reoved")
        }
      })
   
  })
};

function handleError(res, err) {
  return res.status(500).send(err);
}