var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var OrderSchema = new Schema({
	_user: {
		type: ObjectId, 
		ref: 'User'
	},
	_product: {
		type: Schema.Types.ObjectId, 
		ref: 'Product',
	},
	quantity: {
		type: Number,
		required: [true, "Order quantity is required"]
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

OrderSchema.statics.removeOrdersByUserId = function(useId, callback) {
  // Still need to add pending quantities back to orders...
  this.remove({ _user: userId}, function(err){
    return callback(err);
  })
};

OrderSchema.statics.removeOrdersByProductId = function(productId, callback) {
  // Still need to add pending quantities back to orders...
  this.remove({ _product: productId}, function(err){
    return callback(err);
  })
};

var Order = mongoose.model('Order', OrderSchema);