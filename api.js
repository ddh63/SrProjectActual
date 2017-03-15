module.exports = function(app, pool) {

	app.get('/api/getAllMovies', function(req, res) {
	  pool.getConnection(function(err, connection) {
	    connection.query('select * from movies', function(err, result) {
	      res.json(result);
	    });
	    connection.release();
	  });
	});
	
}