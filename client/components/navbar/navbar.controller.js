'use strict';

angular.module('softwareTestApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }]
     $scope.customer = [{
      'title': 'customer',
      'link': '/customer'
    }];;

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    $scope.isCustomer = function(route) {
      return route === $location.path();
    };
  });