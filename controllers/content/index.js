var express = require('express');
var app = module.exports = express();
app.set('views', __dirname + '/views');


app.get('/', function(request, response) {
	response.render('index', {
	});
});
