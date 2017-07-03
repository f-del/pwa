var express = require('express')
var router = express.Router()

var controller = require('./controller/controllerBase.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  if(req.xhr) console.log('Ajax call for URL '+req.baseUrl);
  next()
})


// define the home page route
router.get('*', function (req, res) {
    var isAjaxRequest = req.xhr;
    
    if(req.baseUrl === ''){
        req.baseUrl = '/';
    }
    
    var ctrlRes = controller.handle(req.baseUrl, isAjaxRequest);
    if(ctrlRes.status === "404"){
        res.status(404).send('Page ' + req.baseUrl + ' not found');
    }
    else{
        try{
            res.render(ctrlRes.template, ctrlRes.model);
        }
        catch(err){
            res.status(500).send('Oupss... ' + req.baseUrl + ' on error ! <br/>'
            + err.message + ' <br> ' + err.stack);
        }
    }
})

module.exports = router;
