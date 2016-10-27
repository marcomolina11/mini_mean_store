app.factory('userFactory', ['$http', function($http){
	var users = [];

	var UserFactory = function(){
		var _this = this;

		this.index = function(callback){
			$http.get('/users').then(function(returned_data){
				users = returned_data.data;
				callback(users);
			});
		};
		this.create = function(newUser, callback){
			$http.post('/users', newUser).then(function(returned_data){
				callback(returned_data);
			})
		}
		this.delete = function(id, callback){
			$http.delete(`/users/${id}`).then(function(returned_data){
				users = returned_data.data;
				callback(returned_data.data);
			})
		}
	}
	console.log(new UserFactory());
	return new UserFactory;
}]);