/*
 * Copyright@HXXDevelopment. All Rights Reserved
 *
 * Amendment History:
 * Amend On     Amend By        Description
 * ===========  ============    ===============================================
 * 20160109      Pao             Remove server-side i18n
 *
 *
 */
var express = require('express'),
    crypto = require('crypto');
    
var RestResult = require('./RestResult');

var ActiveLogModel = require('../models/base/ActiveLogModel').ActiveLogModel;
var UserModel = require('../models/base/UserModel').UserModel;

var router = express.Router();
    router.baseUrl = 'base';

    router.get('/', function(req, res, next) {
        res.render(router.baseUrl + '/main', { title: 'CRM', user: req.session.user, message: 'HXX Dev - CRM', expires: req.session.cookie.expires });
    });

    router.get('/login', function(req, res, next) {       
        res.render(router.baseUrl + '/login', { title: 'CRM', message: 'Please login...' });
    });

    router.post('/login', function(req, res, next) {

        var restResult = new RestResult();
        global.logger.info('login User Name: %s', req.body.userid);

        ActiveLogModel.insert({userId: req.body.userid, message: 'User login: [' + req.body.userid + ']'});
        UserModel.findByKey(req.body.userid, function(err,user){

            if (err) {
                console.error('base[/login]',err);
                restResult.errorCode = 'server_error'; //the i18n key               
            } else if (user) {

                var md5 = crypto.createHash('md5');
                    md5.update(req.body.password);
                var passHash = md5.digest('hex');

                if (user.password === passHash) {

                    UserModel.updateLastLoginTime(user, function(err, user){
                        console.log('Updated User: %s', user.userId);
                    });

                    req.session.user = {id: user.userId, name: user.userName};
                    
                    var originalUrl = req.session.originalUrl;
                    if (originalUrl) {
                        restResult.redirectUrl = originalUrl;
                    } else {
                        restResult.redirectUrl = 'index';
                    }                    
                } else {             
                    restResult.errorCode = 'invalid_password';
                }
            } else {
                restResult.errorCode = 'invalid_user_name';
            }
           
            if(restResult.errorCode){
                req.session.user = null;                
            }
            else{
                req.session.user = user;  
                restResult.returnValue.id = user._id;
            }
            
            res.send(restResult);
        });
     });

    router.get('/index', function(req, res, next) {
        var restResult = new RestResult();        
        if(req.session.user == null){
             res.redirect('/login');
        }
        res.render('base/index', {loginUser:req.session.user,currentDate:new Date()});
    });

module.exports = router;
