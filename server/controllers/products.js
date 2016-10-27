var mongoose = require('mongoose');
var Product = mongoose.model('Product');

function ProductsController(){
	var _this = this;

	this.index = function(req, res){
		Product.find({}, function(err, result){
			if (err){ console.log(err); }
			res.json(result);
		})
	}
	this.show = function(req, res){
		res.json({placeholder:'show'})
	}
	this.create = function(req, res){
		var product = new Product(req.body);
		product.save(function(err, newproduct){
			if (err){
				console.log(err);
				res.json(err);
			}
			else{
				console.log('Success!', newproduct);
				res.json(newproduct);
			}
		});
	}
	this.update = function(req, res){
		res.json({placeholder:'update'})
	}
	this.delete = function(req, res){
		Product.remove({ _id: req.params.id }, function(err, result){
			if (err){
				console.log(err);
				res.json(err);
			}
			else{
				_this.index(req, res);
			}
		})
	}

}
module.exports = new ProductsController();