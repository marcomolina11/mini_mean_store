app.controller('productsController', ['$scope', 'productFactory', function($scope, productFactory){
	$scope.products = [];

	var index = function(){
		productFactory.index(function(returnedData){
			$scope.products = returnedData;
		});
	};
	index();
	$scope.create = function(){
		productFactory.create($scope.newProduct, function(returnedData){
			if (returnedData.data.errors){
				$scope.errors = returnedData.data.errors;
			}
			else{
				console.log(returnedData.data.name)
			}
			$scope.newProduct = {};
			index();
		});
	};
	$scope.delete = function(id){
		productFactory.delete(id, function(returnedData){
			$scope.products = returnedData;
		});
	};
}])