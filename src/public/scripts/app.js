if(typeof window.PWA === 'undefined'){
    window.PWA= {};
}
window.PWA['App'] = class App{
    constructor(){
        console.log('App start !');

        this.appLoader = document.getElementById("appLoader");
        
        this.appLoader.setAttribute("style", "display:none;");

        this.links = document.getElementsByTagName('a');
        for (var i = 0; i < this.links.length; i++) {
            this.links[i].addEventListener("click", function(evt){
                evt.preventDefault();
                var url = this.getAttribute('href');
                
                PWA.Core.Http.req('GET', url)
                    .then(function(response){
                        console.log('Http request '+url+' <br/> '+ response);
                    }, function (error) {
                        console.error("Failed!", error);
                    }
                );
            });
        }
    }
};