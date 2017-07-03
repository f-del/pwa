var express = require('express');
var appRoute = require('./router.js');

var app = express();
app.set ('views', __dirname + '/views');
app.set ('view engine', 'ejs');
app.set('view cache', false);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.use('*', appRoute);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});