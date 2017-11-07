var ipBasicFields = function () {
    var fullConfig = {
        top_info: {
            formFields: [
                {fieldDesc:'i18n:Client ID',fieldType:'text',fieldName:'clientId',readonly:true,_fieldWidth:6,_labelWidth:4,_blockWidth:4},
                {fieldDesc:'i18n:CIN',fieldType:'text',fieldName:'cin',_fieldWidth:5,_labelWidth:4},
                {fieldDesc:'i18n:Client Name',fieldType:'text',fieldName:'clientName',rules:{required:true},_fieldWidth:6,_labelWidth:4,_blockWidth:4},
                {fieldDesc:'i18n:Client Status',fieldType:'select',fieldName:'clientStatus',rules:{required:true},options:'i18n:map:client_status_code',_fieldWidth:5,_labelWidth:4},
                {fieldDesc:'i18n:Gender',fieldType:'radio',fieldName:'gender',values:'i18n:array:gender_code',rules:{required: true},_fieldWidth:6,_labelWidth:4,_blockWidth:4}
            ],
            key: 'clientId',
            _blockWidth: 5
        }
    }    
    return fullConfig
};

var exports = exports ? exports : null;
var window = window ? window : null;
if(exports && !window) {
    //for server side to use
    exports.getIPBasicFields = ipBasicFields;
    exports.message = 'IP Basic Layout configurations...'; //for debug only
} else {
    //for client side to use
    define([], function () {
        return {
            getIPBasicFields: ipBasicFields,
            message: 'IP Basic Layout configurations...'  //for debug only
        }
    });
}