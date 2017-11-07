var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('Business Client Profile');
    res.redirect('/bp/create');
});

router.get('/:action', function(req, res, next) {
    console.log("Get BP page for: %s", req.params.action);
    if(req.params.action == 'create') {
        res.render('bp/create', {title: 'Business Client Profile'});
    }
});

module.exports = router;