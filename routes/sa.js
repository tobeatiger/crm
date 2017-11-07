var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('System Administration');
    res.redirect('/sa/main');
});

router.get('/:page', function(req, res, next) {
    console.log("Get SA Page: %s", req.params.page);
    res.render('sa/' + req.params.page, {title: 'System Administration'});
});

module.exports = router;