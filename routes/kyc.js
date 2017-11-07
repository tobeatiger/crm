var express = require('express');
var router = module.exports = express.Router();

//render the KYC search page
router.get('/search', function(req, res, next) {
  res.render('kyc/search', { title: 'CRM - Search KYC Profile' });  
});

//render the KYC approval search page
router.get('/approval', function(req, res, next) {
  res.render('kyc/approval', { title: 'CRM - KYC Approval' });
});

//render the KYC visitation search page
router.get('/visitation', function(req, res, next) {
  res.render('kyc/visitation', { title: 'CRM - KYC Visitation' });
});


