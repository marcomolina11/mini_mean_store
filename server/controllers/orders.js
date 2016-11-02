var mongoose = require('mongoose');
var Order = mongoose.Schema('Order');
var Product = mongoose.Schema('Product');

function OrdersController(){
	var _this = this;

	this.index = function(req, res){
		Order.find({})
    		.populate('_user _product')
    		.exec(function(err, result){
		    	if (err){
		    		console.log(err);
		    		res.json(false);
		    	}
		    	else {
		    		res.json(result);
		    	}
    	});
	}
	this.show = function(req, res){
		Order.findById(req.params.id, function(err, result){
  			if (err){
  				res.json(err);
  			}
  			else {
  				res.json(result);
  			}
  		})
	}
	this.create = function(req, res){
	    var quantity = req.body.quantity,
	        _user = req.params.userId,
	        _product = req.params.productId;

	    // Make sure order quantity is at least 1
	    if (quantity < 1) { return res.json(false); }

	    // Only create an order if the quantity requested is available.
	    Product.isQuantityAvailable(_product, quantity, function(result, product){
	      	// If there are enough products available, decrementQuantity
	      	if (result) {
		        product.decrementQuantity(quantity, function(err){
		          	if(err){ return res.json(err); }
		          	// If here, product quantity has been decremented, can add order
		          	Order.create({ quantity: quantity, _user: _user, _product: _product}, function(err, neworder){
			            if (err) { 
			            	console.log(err);
			            	return res.json(err); 
			            }
			            else{
			            	console.log('Success!', neworder);
			            	return res.json(neworder);
			        	}
		          	})
		        })
	      	} 
	      	else {
	        	return res.json(false);
	      	}
	    })
	}
	this.update = function(req, res){
		res.json({placeholder:'update'})
	}
	this.delete = function(req, res){
		Order.findById(req.params.id, function(err, order){
			if (err){ 
				return console.log(err); 
			}
			else{
				var quantity = order.quantity;
				var _product = order._product;
				Product.findById(_product, function(err, product){
					if (err){ 
						return console.log(err);
					}
					else{
						product.incrementQuantity(quantity, function(err){
							if (err){ return res.json(err); }
							Order.remove({ _id: req.params.id}, function(err){
					  			if (err){
					  				return res.json(err);
					  			}
					  			else {
					  				return res.json(true);
					  			}
  							})
						})
					}
				})
			}

		})
	}
	this.recent = function(req, res){
		Order.find({})
      		.sort('-created_at')
      		.limit(3)
      		.populate('_customer _product')
      		.exec(function(err, results){
        		res.json(results)
      	})
	}
}
module.exports = new OrdersController();


