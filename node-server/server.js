var express = require('express'), path = require('path'), redis = require("redis"), favicon = require('serve-favicon');
var app = express();
app.use(favicon(__dirname + '/../src/favicon.ico'));
var staticRoot = __dirname + '/../dist/';

process.env.NODE_CONFIG_DIR = __dirname + '/config';
var config = require('config');

var redisServer = config.get('redis.server');
var redisPort = config.get('redis.port');
var redisPassword = config.get('redis.password');

var redisClient = redis.createClient(redisPort, redisServer, {no_ready_check: true});
if (redisPassword) {
  redisClient.auth(redisPassword, function () {
    console.log('Redis redisClient connected');
  });
}

var port = config.get('port');

app.set('port', (process.env.PORT || port));

var allowCrossDomain = function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
app.use(express.static(staticRoot));

var server = require('http').createServer(app);

server.listen(app.get('port'), function () {
  console.log('app running on port', app.get('port'));
});


app.get('/positions', function (req, res) {
  redisClient.lrange('visualizing', 0, -1, function (err, reply) {
    res.send(JSON.stringify(reply));
  });
});


app.delete('/positions', function (req, res) {
  redisClient.del('visualizing', function (err, reply) {
    res.send(JSON.stringify(reply));
  });
});
