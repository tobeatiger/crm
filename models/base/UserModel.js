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

var UserSchema = new baseModel.Schema({
    userId: String,
    userName: String,
    password: String,
    mobile: String,
    roles: Array,
    lastLoginTime: Date,
    createTime: {type:Date, default:Date.now}
});
    UserSchema.index({userId: 1}, {background: true});

var UserModel = baseModel.mongoose.model('UserModel', UserSchema, 'user');

    // Find All
    UserModel.findAll = function(callback){
        console.log('Find User: All.')
        this.find(function(err, users){
            if (callback != null && typeof callback === 'function') {
                callback(err, users);
            }
        });
    }

    // Find By User Id
    UserModel.findByKey = function (userId, callback) {
        console.log('Find User: By User ID - [%s]', userId);
        this.findOne({userId: userId}, function(err, user){
            if (callback != null && typeof callback === 'function') {
                callback(err, user);
            }
        });
    }

    // Update Last Login Time
    UserModel.updateLastLoginTime = function(userId, callback) {
        console.log('Update User: By User ID - [%s] for (Last Login Time).', userId);
        this.update({userId: userId}, {$set: {lastLoginTime: Date.now()}}, function(err, result) {
            if (callback != null && typeof callback === 'function') {
                callback(err, userId, result);
            }
        });
    }

exports.UserModel  = UserModel;