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
var baseModel = require('./BaseModel');
var ObjectId = baseModel.ObjectId;
var util = require('util');

var ActiveLogScheme = new baseModel.Schema({
    userId: String,
    message: String,
    time: {type:Date, default:Date.now}
});
    ActiveLogScheme.index({time: 1}, {background: true});

var ActiveLogModel = baseModel.mongoose.model('ActiveLogModel', ActiveLogScheme, 'active_log');

    // Find All
    ActiveLogModel.findAll = function(callback){
        console.log('Find Active Log: All.')
        this.find(function(err, activeLogs){
            if (callback != null && typeof callback === 'function') {
                callback(err, activeLogs);
            }
        });
    }

    // Find By User Id
    ActiveLogModel.findByUserId = function(userId, callback){
        console.log('Find Active Log: By User ID - [%s]', userId);
        this.find({userId: userId}, function(err, activeLogs){
            if (callback != null && typeof callback === 'function') {
                callback(err, activeLogs);
            }
        });
    }

    // Insert
    ActiveLogModel.insert = function (activeLog, callback) {
        console.log('Insert Active Log: [%s].', util.inspect(activeLog));
        new ActiveLogModel(activeLog).save(function(err){
            if (callback != null && typeof callback === 'function') {
                callback(err);
            }
        });
    }

exports.ActiveLogModel  = ActiveLogModel;