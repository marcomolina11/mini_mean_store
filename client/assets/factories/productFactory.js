app.factory('productFactory', ['$http', function($http){
	var products = [];

	var ProductFactory = function(){
		var _this = this;

		this.index = function(callback){
			$http.get('/products').then(function(returned_data){
				products = returned_data.data;
				callback(products);
			});
		};
		this.create = function(newUser, callback){
			$http.post('/products', newUser).then(function(returned_data){
				callback(returned_data);
			});
		};
		this.delete = function(id, callback){
			$http.delete(`/products/${id}`).then(function(returned_data){
				products = returned_data.data;
				callback(returned_data.data);
			});
		};
	}
	console.log(new ProductFactory());
	return new ProductFactory;
}]);