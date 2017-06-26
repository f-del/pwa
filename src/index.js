var express = require('express');
var app = express();

app.set ('views', __dirname + '/views');
app.set ('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  //res.send('Hello World!');
//res.send('Hello World! '+__dirname);

  res.render('index.ejs',{"title":"PWA 4 Gamer"});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});