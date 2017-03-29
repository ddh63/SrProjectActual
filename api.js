module.exports = function(app, pool) {
	var mysql = require('mysql');
	var validator = require('validator');
	var bcrypt = require('bcrypt');
	const saltRounds = 10;

	var pool = mysql.createPool({
	  connectionLimit: 10,
	  host: 'localhost',
	  user: 'root',
	  password: 'localpassword',
	  database: 'streamingsite'
	});

	app.post('/api/login', function(req, res) {
		var user = req.body.user;
		var pass = req.body.pass;
		pool.getConnection(function(err, conn) {
			if (err) throw err;

			var query = 'select * from users where username='+conn.escape(user)+' limit 1';

			conn.query(query, function(err, result) {
				if (err) throw err;

				if (result.length) {
					bcrypt.compare(pass, result[0].password, function(err, passresult) {
						if (passresult) {
							sess = req.session;
							sess.username = user;
							res.send('');
						}
						else {
							res.send('<h4>Incorrect password</h4>');
						}
					});
				}
				else {
					res.send('<h4>Invalid username</h4>');
				}

			});

			conn.release();
		});
	});

	app.post('/api/register', function(req, res) {
		var user = req.body.user;
		var email = req.body.email;
		var pass = req.body.pass;
		var conpass = req.body.confirmpass;

		if (pass.length < 6 || pass.length > 72) {
			res.send('<h4>Password must be 6 to 72 characters long</h4>');
		}
		else {
		var validEmail = validator.isEmail(email);

			if (validEmail && (pass == conpass)) {
				var available = false;
				pool.getConnection(function(err, conn) {
					if (err) throw err;

					var query = 'select * from users where username='+conn.escape(user)+' or email='+conn.escape(email)+' limit 1';
					conn.query(query, function(err, result) {
						if (err) throw err;
						if (!result.length) {
							bcrypt.hash(pass, saltRounds, function(err, hash) {
								var insertquery = 'insert into users(username, email, password) values ('+conn.escape(user)+','+conn.escape(email)+','+conn.escape(hash)+')';
								conn.query(insertquery, function(err, insresult) {
									if (err) throw err;
									sess = req.session;
									sess.username = user;
									res.send('');
								});
							});
						}
						else {
							res.send('<h4>Username/Email already taken</h4>');
						}
					});
					conn.release();
				});
			}
			else {
				if (!validEmail && (pass != conpass))
					res.send('<h4>Invalid email</h4><br /><h4>Passwords do not match</h4>');
				else if (!validEmail)
					res.send('<h4>Invalid email</h4>');
				else
					res.send('<h4>Passwords do not match</h4>');
			}
		}
	});

	app.get('/api/logout', function(req, res) {
		req.session.destroy(function(err) {
			if (err)
				throw err;
			else {
				sess = req.session;
				res.redirect('/');
			}
		});
	});

	app.get('/api/isLoggedIn', function(req, res) {
		if (typeof sess == 'object' && sess.username)
			res.json({'user': sess.username})
		else
			res.json({'user': null});
	});

	app.post('/api/getNewestReleases', function(req, res) {
		pool.getConnection(function(err, conn) {
			var query;

			// Change these when tv table is made and movie table is filled up more
			if (req.body.releasetype == 'movies')
				query = 'select * from movies order by id desc limit 2';
			else if (req.body.releasetype == 'tv')
				query = 'select * from movies limit 2';

			conn.query(query, function(err, result) {
				if (err) throw err;
				res.json(result);
			});
			conn.release();
		});
	});

	app.get('/api/getGenres', function(req, res) {
		pool.getConnection(function(err, conn) {
			conn.query('select * from genres', function(err, result) {
				if (err) throw err;
				res.json(result);
			});
			conn.release();
		});
	});

	app.get('/api/getAllMovies', function(req, res) {
	  pool.getConnection(function(err, conn) {
	    conn.query('select * from movies', function(err, result) {
	      if (err) throw err;
	      res.json(result);
	    });
	    conn.release();
	  });
	});

	app.get('/api/getSingleMovie', function(req, res) {
		pool.getConnection(function(err, conn) {
			conn.query('select * from movies where id='+conn.escape(req.query.id), function(err, result) {
				if (err) throw err;
				res.json(result);
			});
			conn.release();
		});
	});
	
	app.post('/api/getSearch', function(req, res) {
		var searchValue = req.body.search;

		pool.getConnection(function(err, conn) {
			conn.query('select * from movies where title like ' + conn.escape('%'+searchValue+'%'), function(err, result) {
				if (err) throw err;
				res.json(result);
			});
			conn.release();
		});
		
	});

}