var exports = module.exports = {};

function init(){
	var mysql = require("mysql");
	var pool = mysql.createPool({
		host: "localhost", //'us-cdbr-azure-east-b.cloudapp.net', //localhost',
		user: "root", //'be028fe618e79d', //'root', 
		//password: '7c47d0b9',
		database: 'soukdb',
		connectionLimit: 10,
		supportBigNumbers: true
	});
	function query(res, sqlCommand, params, callback){
		pool.getConnection(function(err, connection) {
			if (err) { 
				if (res){
					res.statusCode = 503;
		            res.send({
		                result: 'error',
		                err:    err.code
		            });
	        	} else {
	        		callback && callback(null, err);
	        	}
				return "error";     	
			}

			connection.query(sqlCommand, params, function(err, results) {
				connection.release();
				if(err) { 
					if (res){
						res.statusCode = 500;
			            res.send({
			                result: 'error',
			                err:    err.code
			            });
		        	} else {
	        			callback && callback(results, err);
	        		}
		            return "error";
				}

				callback && callback(results, err);
			});
		});
	}
	exports.query = query;
};
exports.init = init;
