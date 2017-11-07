define([], function () {
    requirejs.config({
        baseUrl: '/js/lib',
        noGlobal: true,
        paths: {
            'hxxUIs' : 'components/templates',
            text: 'require/text',
            i18n: 'require/i18n',
            domReady: 'require/domReady',
            jquery: 'jq/jquery.min',
            'jquery.validate.min': 'jqValidation/jquery.validate',
            'jqValidate': 'jqValidation/additional-methods.min',
            'jqUI': 'jq/jquery-ui.min',
            bootstrap: 'bootstrap/bootstrap.min',
            ko: 'ko/knockout-hxx',
            koCore: 'ko/knockout-3.4.0',
            moment: 'moment/moment'
        },
        shim: {
            'jquery.validate.min': ['jquery'],
            'jqValidate': ['jquery', 'jquery.validate.min'],
            'jqUI': ['jquery'],
            bootstrap: ['jquery'],
            ko: ['jquery','koCore']
        },
        config: {
        }
    });
    
    require(['i18n!/nls/ResourceMessage.js'],function(nls){
        window.nlsStrings = nls;
        window.i18n = {};
        window.i18n.__ = function(key,params){
            if(key.indexOf('map:') == 0){
                return window.i18n.__map(key.replace('map:',''));
            }else if(key.indexOf('array:') == 0){
                return window.i18n.__array(key.replace('array:',''));
            }             
            else{
                 var text = window.nlsStrings[key];
                 if(text){
                     if(params){
                         //TODO: replace the place holders
                     }
                 }
                 else{
                     text = key.replace(/_/g,' ');
                 }
                 
                 return text;
            }
        };
    
        window.i18n.__array = function(key){
            var values = [];
            
            var codes = i18n.__(key+'_seq');
            //console.log('key=',key,'codes=',codes);
            
            for(var i = 0; i < codes.length; i++){
                values.push(i18n.__(key)[codes[i]]);             
            }
            console.log('key=',key,'values=',values);
            return values;
        }
        
        window.i18n.__map = function(key){
            var options = [];
            
            var codes = i18n.__(key+'_seq');
            //console.log('key=',key,'codes=',codes);
            
            for(var i = 0; i < codes.length; i++){
                options.push({value:codes[i],text:i18n.__(key)[codes[i]]});             
            }
            //console.log('key=',key,'options=',options);
            return options;
        }
        
        console.log("i18n welcome:",i18n.__('welcome'));        
    });    
});