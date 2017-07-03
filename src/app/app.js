if(typeof window.PWA === 'undefined'){
    window.PWA= {};
}

//var controller = module.exports;

window.PWA['App'] = class App{
    constructor(){
        var me = this;
        console.log('App start !');

        this.appLoader = document.getElementById("appLoader");
        
        this.appLoader.setAttribute("style", "display:none;");

        this.links = document.getElementsByTagName('a');
        for (var i = 0; i < this.links.length; i++) {
            this.links[i].addEventListener("click", function(evt){
                var url = this.getAttribute('href');
                evt.preventDefault();
                me.getPartialPage(url);
            });
        }
        
        window.history.replaceState(
            {
                'getfromxhr': false,
                'url': document.location.pathname
            }, 
            'title to dynamise', 
            document.location.pathname
        );
            
        window.onpopstate = function(evt){
            console.log("restore page : " + 
                            document.location + ", état: " + 
                            JSON.stringify(evt.state));

            me.getPartialPage(evt.state.url);
        }
    }
    getPartialPage(url){
        var res = module.exports.handle(url);
        
        PWA.Core.Http.req('GET', ''+(res.model.content.substring(2))+'.ejs')
            .then(function(response){
                console.log('Http request '+url+' <br/> '+ response);
                
                var html = ejs.render(response, res.model.contentModel);

                window.history.pushState(
                    {
                        'getfromxhr': true,
                        'url': url
                    }, 
                    'title to dynamise', 
                    url);
                document.getElementsByTagName("section")[0].innerHTML = html;
            }, function (error) {
                console.error("Failed!", error);
            }
        );        
    }
};