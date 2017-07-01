var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  if(req.xhr) console.log('Ajax call for URL '+req.baseUrl);
  next()
})

var appPageDatas = {
    '/':{
        'template': 'index',
        'content': 'hp'
    },
    '/team':{
        'template': 'index',
        'content': 'teamlist'
    }
};

var contentDatas = {

    'teamlist':{
        title:'Curent Team Members',
        members:[
            {
                'picture': 'https://pbs.twimg.com/profile_images/880534985966575616/0PrRLEiV_400x400.jpg',
                'desc': 'Vestibulum eget diam dictum, <b>euismod tortor</b> at, maximus elit. Etiam tincidunt quam ligula, eu ultrices massa sollicitudin at. Mauris in lectus magna. Nulla mollis mi enim, at aliquet quam facilisis id. Pellentesque egestas odio nec urna consectetur, eget consectetur tortor mattis. Duis eu euismod eros. Vestibulum nec nulla magna. Integer interdum, enim id dictum lacinia, sem arcu semper ligula, nec dignissim est neque ac ipsum. Vestibulum aliquet pellentesque arcu, id commodo leo varius ut. Donec congue turpis quis ligula iaculis maximus ac et mi. Donec vel venenatis erat.'
            },
            {
                'picture': 'https://pbs.twimg.com/profile_images/778070932787171328/XoPe_izq_400x400.jpg',
                'desc': 'Vestibulum eget diam dictum, <b>euismod tortor</b> at, maximus elit. Etiam tincidunt quam ligula, eu ultrices massa sollicitudin at. Mauris in lectus magna. Nulla mollis mi enim, at aliquet quam facilisis id. Pellentesque egestas odio nec urna consectetur, eget consectetur tortor mattis. Duis eu euismod eros. Vestibulum nec nulla magna. Integer interdum, enim id dictum lacinia, sem arcu semper ligula, nec dignissim est neque ac ipsum. Vestibulum aliquet pellentesque arcu, id commodo leo varius ut. Donec congue turpis quis ligula iaculis maximus ac et mi. Donec vel venenatis erat.'
            }
        ]
    }
}



// define the home page route
router.get('*', function (req, res) {
    var isAjaxRequest = req.xhr;

    var reqDatas;
    var model = {
        "title":"PWA 4 Gamer", 
        "nav" : {
            "menuItems" : [
                {
                    "title" :'Accueil',
                    "href" : '/'
                },
                {
                    "title": 'Equipe',
                    "href" : '/team'
                }
            ]
        }
    };
    if(req.baseUrl === ''){
        req.baseUrl = '/';
    }

    if(appPageDatas[req.baseUrl] === undefined){
        res.status(404).send('Page ' + req.baseUrl + ' not found');
    }
    else reqDatas = appPageDatas[req.baseUrl];

    if(contentDatas[reqDatas.content] !== undefined){
        model['contentModel'] = contentDatas[reqDatas.content];
    }
    else model['contentModel'] = {};

    model["content"] = './pages/' + reqDatas.content;

    try{
        if(isAjaxRequest){
            res.render(model["content"], model['contentModel']);
        }
        else{
            res.render(reqDatas.template, model);
        }
    }
    catch(err){
        res.status(500).send('Oupss... ' + req.baseUrl + ' on error ! <br/>'
         + err.message + ' <br> ' + err.stack);
    }
})

module.exports = router;
