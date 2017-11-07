var express = require('express');
var router = express.Router();
var RestResult = require('./RestResult');

var IPBasicModel = require('../models/crm/IPBasicModel').IPBasicModel;
//IPBasicModel.getByKey('IP000000001', function(err, ipBasic) {
//    logger.debug(ipBasic);
//});

router.get('/', function(req, res, next) {
    console.log('[IP] - Individual Client Profile');
    res.redirect('/ip/create');
});

//search ip
router.post('/search', function(req, res, next) {
  //logger.info('ip/search:',req.body);
  var params = req.body;
  for(var e in params){
    //wildcard search
    params[e] = {$regex:params[e],$options:'i'};    
  }  
  IPBasicModel.search(params,function(clients){
      //logger.info('ip/search - clients:',clients);      
      res.render('ip/searchList', {clients: clients});  
  });  
});

router.get('/create', function(req, res, next) {
    res.render('ip/detail', {title: 'Individual Client Profile', context: '', action: 'create'});
});

router.post('/create/data', function(req, res, next) {
    //validations todo
    var restResult = new RestResult();
    IPBasicModel.insert(req.body, function (result) {
        console.log('[IP] - record inserted into DB: ' + result.key);
        restResult.redirectUrl = '/ip/update/' + result.key;
        restResult.returnValue = result;
        res.send(restResult);
    });
});

router.get('/update/:clientId', function(req, res, next) {
    res.render('ip/ipMaint', {title: 'Individual Client Profile', context: req.params.clientId, action: 'update'});
});

router.get('/enquiry/:clientId', function(req, res, next) {
    res.render('ip/ipMaint', {title: 'Individual Client Profile', context: req.params.clientId, action: 'enquiry'});
});

router.get('/query/data/:clientId', function(req, res, next) {
    var restResult = new RestResult();
    IPBasicModel.getByKey(req.params.clientId, function (err, ipBasic) {
        restResult.returnValue = ipBasic;
        res.send(restResult);
    });
});

module.exports = router;