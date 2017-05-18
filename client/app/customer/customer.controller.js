'use strict';

angular.module('softwareTestApp')
  .controller('CustomerCtrl', function ($scope, Restangular, $stateParams) {
    
    $scope.initCustomer = function(){
    	var basecustomer = Restangular.all('customers');
    	basecustomer.getList().then(function(customers){
    		$scope.customer = customers;
    		$scope.total = $scope.customer.length;
    	})
    }

    $scope.initCreateCustomer = function(){
    	$scope.customer = {};

    	$scope.addcustomer = function(){
    	var basecustomer = Restangular.all('customers');
    	basecustomer.post($scope.customer).then(function(data){
    		
    		if(data.meta.status ==201){
    				$scope.alerts = [];
    				$scope.alerts.push({type: 'success', msg: data.meta.msg})
    			}else{
    				$scope.alerts = [];
    				$scope.alerts.push({type: 'danger', msg: data.meta.msg});
    			}
    		})
   		 }
    };

    $scope.deleteCustomer = function(row){
			var id = row;			
			var baseCustomer = Restangular.one('customers', id);
				baseCustomer.remove().then(function(rsp){
				console.log("rsp", rsp);
				if(rsp.meta.status == 200){
					$scope.alerts = [];
					$scope.alerts.push({type: 'success', msg: rsp.meta.msg});
					$scope.initCustomer();
				}else{
					$scope.alerts = [];
					$scope.alerts.push({type: 'danger', msg: rsp.meta.msg});
				}
			});
		};

    $scope.initEditCustomer = function(){
        var customerId = $stateParams.customerId;
        
        $scope.getCustomer = function(customerId) {
                var baseCustomer = Restangular.one('customers', customerId);
                baseCustomer.get().then(function(customer){
                    console.log('customer', customer);
                    $scope.customer = customer;
                     console.log("$scope.customer", $scope.customer);
                },function(rsp) {
                    console.log(rsp);
                });
            };

        $scope.updateCustomer = function() {

                var editUser = Restangular.copy($scope.customer);               
                editUser.put().then(function(data) {                    
                    $scope.data = data;
                    if (data.meta.status == 200) {
                            $scope.alerts = [];
                            $scope.alerts.push({
                                type : 'success',
                                msg : data.meta.msg
                            });
                    } else {
                        $scope.alerts = [];
                        $scope.alerts.push({
                            type : 'danger',
                            msg : data.meta.msg
                        });
                    }
                }, function(response) {
                    console.log(response);
                    $scope.alerts = [];
                    $scope.alerts.push({type: 'danger',
                        msg: "Unable to update!"});
                });
            };

            $scope.getCustomer(customerId);
         }

  });
