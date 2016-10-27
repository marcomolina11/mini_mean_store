var mongoose = require('mongoose');
var users = require('../controllers/users.js');
var products = require('../controllers/products.js');

module.exports = function(app){
	// USERS //
	//index
	app.get('/users', users.index);
	//show 
	app.get('/users/:id', users.show);
	//create
	app.post('/users', users.create);
	//update
	app.put('/users/:id', users.update);
	//delete
	app.delete('/users/:id', users.delete);

	// PRODUCTS //
	//index
	app.get('/products', products.index);
	//show 
	app.get('/products/:id', products.show);
	//create
	app.post('/products', products.create);
	//update
	app.put('/products/:id', products.update);
	//delete
	app.delete('/products/:id', products.delete);

};