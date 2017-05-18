'use strict';

angular.module('softwareTestApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'restangular',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
    $urlRouterProvider
      .otherwise('/');

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({
        id: "_id"
    });

     RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
         var customersPattern = /\/api\/customers\/(.+)/g;

        var extractedData = {};

        if(url === '/api/customers') {
              if (operation === "getList") {
                  // .. and handle the data and meta data
                  extractedData = data.response.customers;
                  extractedData.total = data.response.total;
              } else if (operation === "get") {
                  extractedData = data.response.customer;
              }
              extractedData.meta = data.meta;
              if(data.response){
                  extractedData.response = data.response;
              }
              return extractedData;
          }
          
         if (customersPattern.test(url)) {
            if (operation === "get") {                
                extractedData = data;                
            }
            extractedData.meta = data.meta;
            return extractedData;
        } 
     });
    $locationProvider.html5Mode(true);
  });
