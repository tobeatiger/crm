/*
 * Copyright© HXX Development. All Rights Reserved
 *
 * Amendment History:
 * Amend On     Amend By        Description
 * ===========  ============    ===============================================
 * 20160109      Pao             Remove server-side i18n
 * 20160111      Pao             Use log4js instead of morgan logger
 *
 */
var express = require('express'),
    //logger = require('morgan'),
    path = require('path'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    i18n = require('i18n'),
    log4js = require('log4js'),
    underscore = require('underscore'),
    underscore_string = require('underscore.string'),
    moment = require('moment');

var app = express();
    
var baseRoutes = require('./routes/base');
var saRoutes = require('./routes/sa');
var ipRoutes = require('./routes/ip');
var bpRoutes = require('./routes/bp');
var xpRoutes = require('./routes/xp'); //for Demo only
    
    log4js.configure({
        appenders:[
            {type:'console',category:'crm'}
            ,{
                type:'file'
                ,filename:'logs/crm_log4js.log'
                ,category:'crm'
                ,maxLogSize: 1024*20
                ,backups: 3
              }
            ,{
                type:'file'
                ,filename:'logs/http_log4js.log'
                ,category:'http'
                ,maxLogSize: 1024*20
                ,backups: 3
              }  
        ]
    });
    global.logger = log4js.getLogger('crm');
    
    app.use(log4js.connectLogger(log4js.getLogger('http'),{level:'auto'})); 
    logger.info('######################Testing################################');
    
    i18n.configure({
      locales: ['zh','en'],
      //defaultLocale:'zh',
      updateFiles: false,
      objectNotation:true,
      directory: __dirname + '/public/nls'
    });
    app.use(i18n.init);
    app.locals.i18n = i18n;
    logger.info("i18n:",i18n.__('welcome'));

    app.locals._ =  underscore;
    app.locals._.str = underscore_string;
    app.locals.moment = moment;
    
    
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.set('view options', { pretty: true });
    app.set('trust proxy', 1);

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    //app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(session({
        secret: 'hxxdev-crm',
        name: "crm",
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1800000}
    }));

var baseUrl = baseRoutes.baseUrl;

    app.all('/*', function(req, res, next) {
        i18n.setLocale(req.getLocale());
        
        console.log('Request URL: %s', req.originalUrl);

        // TODO: Filter the pubicEvent
        if (req.originalUrl == '/login' ) {
            console.log('Public Event...: %s', req.method);
            req.session.redirect = true;
            next();
        } else {
            console.log('Limited Event...: %s', req.method);
            req.session.redirect = false;

            var user = req.session.user;
            if (user) {
                req.session.touch();
                next();
            } else {
                req.session.originalUrl = req.originalUrl;
                res.redirect('/login');
            }
        }
    });

    app.use('/', baseRoutes);
    app.use('/sa', saRoutes);
    app.use('/kyc', require('./routes/kyc'));
    app.use('/ip', ipRoutes);
    app.use('/bp', bpRoutes);
    app.use('/xp', xpRoutes); //for Demo only
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {

        if (req.session.redirect) {
            res.redirect('/');
        }
        console.log('Unknow URL: %s', req.originalUrl);
        var err = new Error('Page Not Found...');
            err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {

            res.status(err.status || 500);
            res.render(baseUrl + '/error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {

        res.status(err.status || 500);
        res.render(baseUrl + '/error', {
            message: err.message,
            error: {}
        });
    });

module.exports = app;
