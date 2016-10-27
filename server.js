var express = require('express'),
app = express(),
path = require('path'),
bodyParser = require('body-parser'),
port = process.env.PORT || 8000;

process.env['APPROOT'] = __dirname;

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(process.env['APPROOT'], './client')));
app.use(express.static(path.join(process.env['APPROOT'], './bower_components')));

// DATABASE
require(path.join(process.env['APPROOT'], 'server/config/mongoose.js'));

// ROUTES 
require(path.join(process.env['APPROOT'], 'server/config/routes.js'))(app);

app.listen(port, function(){
	console.log("server running on port", port);
});