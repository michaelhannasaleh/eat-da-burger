var express = require('express');
var router = express.Router();
var burger = require('./../models/burger.js');


router.get('/', function(req, res){
	res.redirect('/index');
});

router.get('/index', function(req, res){
	burger.all(function(data){
		var hbsObject = { burgers: data };
		res.render('index', hbsObject);
	});
});

router.post('/index/create', function(req, res){
	burger.create(['burger_name', 'devoured', 'date'], [req.body.burger_name, '0', 'CURRENT_TIMESTAMP'], function(data){
		res.redirect('/index');
	});

});

router.put('/index/update/:id', function(req, res){
	var condition = ' WHERE id = ' + req.params.id;
	burger.update({devoured: req.body.devour}, condition, function(){
		res.redirect('/index');
	});
});

module.exports = router;