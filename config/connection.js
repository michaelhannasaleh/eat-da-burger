var mysql = require('mysql');
var connection;

if(process.env.JAWSDB_URL) { 
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else{
	var connection = mysql.createConnection({
  			host     : 'localhost',
  			user     : 'root',
  			password : '',
  			database : 'burgers_db'
	});
}



connection.connect(function(err){
	if(err){
		console.log('error connection: ' + err.stack);
	}
	console.log('connected to mysql as id ' + connection.threadId);
});

module.exports = connection;
