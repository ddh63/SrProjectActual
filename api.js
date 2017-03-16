module.exports = function(app, pool) {

	app.post('/api/login', function(req, res) {
		var user = req.body.username;
		var pass = req.body.password;
		pool.getConnection(function(err, conn) {
			if (err) throw err;
			var query = 'select * from users where username='+conn.escape(user)+' LIMIT 1';
			console.log("Query: "+query);
			conn.query(query, function(err, res) {
				if (err) throw err;
				console.log(res[0].password);
			});
			conn.release();
		});
	});

	app.get('/api/getAllMovies', function(req, res) {
		/*
			No Longer Works.
			Just an example on how to connect to database currently.

	  pool.getConnection(function(err, connection) {
	    connection.query('select * from movies', function(err, result) {
	      res.json(result);
	    });
	    connection.release();
	  });
		*/
	});
	
}