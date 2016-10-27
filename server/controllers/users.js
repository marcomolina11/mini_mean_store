var mongoose = require('mongoose');
var User = mongoose.model('User');

function UsersController(){
	var _this = this;

	this.index = function(req, res){
		User.find({}, function(err, result){
			if (err){ console.log(err); }
			res.json(result);
		})
	}
	this.show = function(req, res){
		res.json({placeholder:'show'})
	}
	this.create = function(req, res){
		var user = new User(req.body);
		user.save(function(err, newuser){
			if (err){
				console.log(err);
				res.json(err);
			}
			else{
				console.log('Success!', newuser);
				res.json(newuser);
			}
		});
	}
	this.update = function(req, res){
		res.json({placeholder:'update'})
	}
	this.delete = function(req, res){
		User.remove({ _id: req.params.id }, function(err, result){
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
module.exports = new UsersController();