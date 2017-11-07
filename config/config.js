/*
 * Copyright? HXX Development. All Rights Reserved
 *
 * Amendment History:
 * Amend On     Amend By        Description
 * ===========  ============    ===============================================
 *
 *
 *
 */
var mongoose = require('mongoose');
    //mongoose.connect('mongodb://crm:Security@localhost:27017/crm');
    mongoose.connect('mongodb://localhost:27017/crm');

exports.mongoose = mongoose;
