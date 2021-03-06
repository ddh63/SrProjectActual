var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(session({
  secret: 'supersecret',
  resave: true,
  saveUninitialized: true
}));

var sess;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var api = require('./api')(app);

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
