app.controller('usersController', ['$scope', 'userFactory', function($scope, userFactory){
	$scope.users = [];

	var index = function(){
		userFactory.index(function(returnedData){
			$scope.users = returnedData;
		});
	};
	index();

	$scope.create = function(){
		userFactory.create($scope.newUser, function(returnedData){
			if (returnedData.data.errors){
				$scope.errors = returnedData.data.errors;
			}
			else if (returnedData.data.code){
				$scope.errors = { name: {message: "This customer already exists"}}
			}
			else{
				console.log(returnedData.data.name)
			}
			$scope.newUser = {};
			index();
		});
	};
	$scope.delete = function(id){
		userFactory.delete(id, function(returnedData){
			$scope.users = returnedData;
		});
	};
}])