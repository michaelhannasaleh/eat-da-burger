var express = require('express');
var router = express.Router();
var burger = require('./../models/burger.js');


router.get('/', function(req, res){
	res.redirect('/index');
});

router.get('/index', function(req, res){
	burger.all(function(data){
		var hbsObject = { burgers: data };
		//*console.log(hbsObject)
		res.render('index', hbsObject);
	});
});

router.post('/index/create', function(req, res){
	burger.create(['burger_name', 'devoured', 'date'], [req.body.burger_name, '0', 'CURRENT_TIMESTAMP'], function(data){
		//*console.log("Create burger :\n");
		//console.log(data);*
		res.redirect('/index');
	});

});

/*UPDATE burgers SET devoured=1 WHERE id = 1*/
router.put('/index/update/:id', function(req, res){
	//req.params.id coming from form action="index/update/{{this.id}}?_method=PUT" method="POST">
	var condition = ' WHERE id = ' + req.params.id;
	//req.body.devour coming from <input name="devour" value="1">
	burger.update({devoured: req.body.devour}, condition, function(){
		/*console.log('Burger ' + req.params.id + ' updated!');*/
		res.redirect('/index');
	});
});

/*==================================END EXPRESS ROUTES====================================*/


//export router to be required in server.js
module.exports = router;