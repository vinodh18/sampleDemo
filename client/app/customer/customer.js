'use strict';

angular.module('softwareTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customer', {
        url: '/customer',
        templateUrl: 'app/customer/customer.html',
        controller: 'CustomerCtrl'
      })
       .state('create', {
        url: '/customer/create',
        templateUrl: 'app/customer/create_customer.html',
        controller: 'CustomerCtrl'
      })
       .state('edit', {
        url: '/:customerId/edit',
        templateUrl: 'app/customer/edit_customer.html',
        controller: 'CustomerCtrl'
      });
  });