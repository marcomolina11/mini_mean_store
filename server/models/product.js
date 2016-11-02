var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name is required"]
	},
	image: {
		type: String,
	},
	description: {
		type: String,
		required: [true, "Description is required"]
	},
	quantity: {
		type: Number,
		default: 50,
	},
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

ProductSchema.statics.isQuantityAvailable = function(productId, quantityRequested, callback) {
  this.findById(productId, function(err, product){
    if (err) { return callback(err); }
    var result = (product.quantity >= quantityRequested);
    return callback(result, product);
  })
};

ProductSchema.methods.decrementQuantity = function(quantity, callback) {
  this.quantity -= quantity;
  this.save(function(err){
    callback(err);
  });
};

ProductSchema.methods.incrementQuantity = function(quantity, callback){
	this.quantity += quantity;
	this.save(function(err){
		callback(err);
	});
};

var Product = mongoose.model('Product', ProductSchema);