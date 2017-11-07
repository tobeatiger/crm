/*
 * Copyright© HXX Development. All Rights Reserved
 *
 * Amendment History:
 * Amend On     Amend By        Description
 * ===========  ============    ===============================================
 * 20160117     Pao             Add search
 *
 *
 */
var baseModel = require('../base/BaseModel');
var util = require('util');

var ObjectId = baseModel.ObjectId;

var ipBasicLayout = require('../../public/js/lib/crm/config/ipBasicLayout');
var ipBasicFields = ipBasicLayout.getIPBasicFields({});
var key = ipBasicFields.top_info.key;
var fields = ipBasicFields.top_info.formFields;
    fields.basic = {}; //TODO

var IPBasicSchema = new baseModel.Schema(function () {
        var result = {}, aField;
        for(var i = 0; i < fields.length; i++) {
            aField = fields[i];
            result[aField.fieldName] = (aField.fieldType == 'date') ? Date : (aField.fieldType == 'number') ? Number : String; //TODO for other types
        }
        result.createTime = Date;
        return result;
    } ());

    IPBasicSchema.index({key: 1}, {background: true});

var IPBasicModel = baseModel.mongoose.model('IPModel', IPBasicSchema, 'ip_basic');

    // Find All
    IPBasicModel.findAll = function(callback){
        global.logger.debug('IP[IPBasicModel] - Find IP Basic: All.')
        this.find(function(err, ipBasics){
            if (callback != null && typeof callback === 'function') {
                callback(err, ipBasics);
            }
        });
    }
    IPBasicModel.insert = function(data, callback) {

        global.logger.debug('IP[IPBasicModel] - Saving IP Record: %s', data[key]);
        console.log(key);
        if(data[key]) {
            //validation todo
            callback({key:key,data:data});
        } else {

            data.createTime = Date.now();
            IPBasicModel._genKey(function (err, id) {

                data[key] = id;
                new IPBasicModel(data).save(function (err) {
                    if (err) {
                        global.logger.error(err);
                    } else {
                        if (callback != null && typeof callback === 'function') {
                            callback({key:key,data:data});
                        }
                    }
                });
            });
        }
    };

    IPBasicModel._genKey = function (callback) {

        var result = '';
        var prefix = 'IP';
        var format = '000000000';
        var enqFields = {};
            enqFields[key] = 1;
        var enqOptions = {};
            enqOptions['limit'] = 1;
            enqOptions['sort'] = {};
            enqOptions['sort'][key] = -1;
        this.find({}, enqFields, enqOptions, function(err, ipBasics) {

            if (err) {
                global.logger.error('IP[IPBasicModel] - Generate IP Key Error: %s.', err);
            } else {

                var number = format + 1;
                if (ipBasics.length == 1) {
                    number = format + (parseInt(ipBasics[0][key].substring(prefix.length)) + 1);
                }

                result = prefix + number.substring(number.length - format.length);
            }

            if (callback != null && typeof callback === 'function') {
                callback(err, result);
            }
        });
    };
    
    //search the basic info for KYC blotter
    IPBasicModel.search = function(params, callback) {
       this.find(params, null,function(err, clients){            
            callback(clients);
        });
    };
exports.IPBasicModel  = IPBasicModel;