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
router.get('*', function (req, res) {
    var reqDatas;
    if(req.baseUrl === ''){
        req.baseUrl = '/';
    }

    if(appPageDatas[req.baseUrl] === undefined){
        res.status(404).send('Page ' + req.baseUrl + ' not found');
    }
    else reqDatas = appPageDatas[req.baseUrl];

    try{
        res.render(reqDatas.template,
        {
            "content": './pages/' + reqDatas.content,
            "title":"PWA 4 Gamer", 
            "menuItems" : [{Title :'Accueil' }, {Title: 'Equipe'}]
        });
    }
    catch(err){
        res.status(500).send('Oupss... ' + req.baseUrl + ' on error !');
    }
})

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router;
