var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var ProductSchema = new mongoose.Schema({
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
		required: [true, "Initial quantity is required"]
	}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
});

var Product = mongoose.model('Product', ProductSchema);