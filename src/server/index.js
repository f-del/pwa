var requirejs = require('requirejs');

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '..',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    // paths: {
    //     app: '../app'
    // },
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(['express', 'server/router'],
    function   (express,   router) {

    var app = express();
    app.set ('views', __dirname + '/../views');
    app.set ('view engine', 'ejs');
    app.set('view cache', false);
    app.use(express.static(__dirname + '/../public'));
    app.use(express.static(__dirname + '/../views'));
    app.use(express.static(__dirname + '/../app'));
    
    app.use('/lib', express.static(__dirname + '/../lib'));
    app.use('/controller', express.static(__dirname + '/../controller'));

    app.use('*', router);

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });

    }
);