/*
 * Copyright© HXX Development. All Rights Reserved
 *
 * Amendment History:
 * Amend On     Amend By        Description
 * ===========  ============    ===============================================
 *
 *
 *
 */
var mongoose = require('../../config/config').mongoose;
var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('mongoose opened!');
    });

/*
    ***Model.findAll(callback)
    ***Model.findByKey(key1...keyn, callback)
    ***Model.findBy***(***, callback)
    ***Model.insert(doc, callback)
    ***Model.update(doc, callback)
    ***Model.updateByKey(key1...keyn, doc, callback)
    ***Model.update***(key1...keyn, ***, callback)
    ***Model.delete(doc, callback)
    ***Model.deleteByKey(key1...keyn, callback)
*/

exports.mongoose = mongoose;
exports.Schema = mongoose.Schema;
exports.ObjectId = mongoose.Schema.Types.ObjectId;
exports.Mixed = mongoose.Schema.Types.Mixed;