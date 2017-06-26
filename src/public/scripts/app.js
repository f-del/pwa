class App{
    constructor(){
        console.log('App start !');

        this.appLoader = document.getElementById("appLoader");
        
        this.appLoader.setAttribute("style", "display:none;");
    }
};

if(typeof window.PWA === 'undefined'){
    window.PWA= {};
}

window.PWA.app = new App();