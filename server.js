var path = require('path');
var express = require('express');
var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'localpassword',
  database: 'movies'
});

var app = express();
var PORT = process.env.PORT || 8080;

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);
  
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/getAllMovies', function(req, res) {
  pool.getConnection(function(err, connection) {
    connection.query('select * from movies', function(err, result) {
      res.json(result);
    });
    connection.release();
  });
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
