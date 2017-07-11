
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define("controller/controllerBase", 
        ["service/page"], 
        function(servicePage) {
    
    

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


    //The value returned from the function is
    //used as the module export visible to Node.
    return {
        handle: function(url, isAjax){
            var res = {
                status: 200,
            };
            var reqDatas;

            var page = servicePage.get(url);

            if(page === undefined){
                res.status = '404';
            }
            else{
                reqDatas = page;
            
                if(contentDatas[reqDatas.content] !== undefined){
                    model['contentModel'] = contentDatas[reqDatas.content];
                }
                else model['contentModel'] = {};

                model["content"] = './pages/' + reqDatas.content;
                
                if(isAjax){
                    res.template = model["content"];
                    res.model = model['contentModel'];
                }
                else{
                    res.template = reqDatas.template;
                    res.model = model;            
                }

            } 
            
            return res;
        }
    };
});