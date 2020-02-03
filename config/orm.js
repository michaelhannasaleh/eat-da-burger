var connection = require('./connection.js');

function objtoSql(ob){
	var arr = [];
	for(var key in ob){
		if(ob.hasOwnProperty(key)){
			arr.push(key + '=' + ob[key]);
		}
	}
	return arr.toString();
}

var orm = {
	
	selectAll: function(table, cb){
		var queryString = 'SELECT * FROM ' + table;
		connection.query(queryString, function(err, result){
			if (err) throw err;
 			cb(result);
		});	
	},
	
	insertOne: function(table, cols, vals, cb){
		var queryString = 'INSERT INTO ' + table;
		queryString += ' (' + cols.toString(' ') + ')';
		queryString += ' VALUES (?, 0, CURRENT_TIMESTAMP)';
		
		connection.query(queryString, vals, function(err, result){
			if(err) throw err;
			
			cb(result);
		});
	},

	
	updateOne: function(table, objColVals, condition, cb){
		var queryString = 'UPDATE ' + table;

		queryString += ' SET ';
		queryString += objtoSql(objColVals);
		queryString += condition;
		

		connection.query(queryString, function(err, result){
			if(err) throw err;
			
			cb(result);
		});
	}
};

module.exports = orm;