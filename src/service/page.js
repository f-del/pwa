if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define("service/page",
        function() {

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
            return {
                get: function(url){
                    return appPageDatas[url];
                }
            }
        }
);