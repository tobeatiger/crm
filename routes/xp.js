var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('Business Client Profile');
    res.redirect('/xp/create');
});

router.get('/:action', function(req, res, next) {
    console.log("Get BP page for: %s", req.params.action);
    if(req.params.action == 'create') {
        res.render('xp/create', {title: 'XXX Profile'});
    }
});

module.exports = router;