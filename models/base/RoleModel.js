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

var RoleSchema = new baseModel.Schema({
    roleId: String,
    roleName: String,
    createTime: {type:Date, default:Date.now}
});
    RoleSchema.index({roleId: 1}, {background: true});

var RoleModel = baseModel.mongoose.model('RoleModel', RoleSchema, 'role');

    // Find All
    RoleModel.findAll = function(callback){
        console.log('Find Role: All.')
        this.find(function(err, activeLogs){
            if (callback != null && typeof callback === 'function') {
                callback(err, activeLogs);
            }
        });
    }

    // Find By Role Id
    RoleModel.findByKey = function (roleId, callback) {
        console.log('Find Role: By Role ID - [%s]', roleId);
        this.findOne({roleId: roleId}, function(err, role){
            if (callback != null && typeof callback === 'function') {
                callback(err, role);
            }
        });
    }

exports.RoleModel  = RoleModel;