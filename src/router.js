var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

var appPageDatas = {
    '/':{
        'template': 'index',
        'content': 'hp'
    }
};


// define the home page route
router.get('/', function (req, res) {
    res.render(appPageDatas['/'].template,
    {
        "content": './pages/'+appPageDatas['/'].content,
        "title":"PWA 4 Gamer", 
        "menuItems" : [{Title :'Accueil' }, {Title: 'Equipe'}]
    });
})

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router;
