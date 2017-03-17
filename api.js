module.exports = function(app, pool) {
	var mysql = require('mysql');
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

	app.post('/api/register', function(req, res) {
		var user = req.body.username;
		var email = req.body.email;
		var pass = req.body.password;
		var conpass = req.body.confirmpassword;

		if (pass == conpass) {
			console.log("we good");
		
			var hashedPass = '';
			bcrypt.hash(pass, saltRounds, function(err, hash) {
				hashedPass = hash;
			});

			res.redirect('/');
		}
		
	});

	app.get('/api/logout', function(req, res) {
		req.session.destroy(function(err) {
			if (err)
				console.log(err);
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