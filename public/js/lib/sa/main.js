requirejs.config({
    baseUrl: '/js/lib',
    noGlobal: true,
    paths: {
        text: 'text',
        jquery: 'jq/jquery.min',
        jquery.validate.min: 'jqValidation/jquery.validate.min',
        jqValidate: 'jqValidation/additional-methods.min',
        jqUI: 'jq/jquery-ui.min',
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

require(['jquery', 'bootstrap'], function($, bootstrap) {

});