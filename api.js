module.exports = function(app, pool) {

	app.post('/api/login', function(req, res) {
		var user = req.body.username;
		var pass = req.body.password;

		pool.getConnection(function(err, conn) {
			if (err) throw err;

			var query = 'select * from users where username='+conn.escape(user)+' LIMIT 1';

			conn.query(query, function(err, result) {
				if (err) throw err;

				if (result.length) {
					sess = req.session;
					sess.username = user;
					res.redirect('/');
				}
				else {
					res.redirect('../login');
				}

			});

			conn.release();
		});

	});

	app.get('/api/isLoggedIn', function(req, res) {
		if (typeof sess == 'object' && sess.username)
			res.json({'user': sess.username})
		else
			res.json({'user': ''});
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