define(['jquery', 'text!./templates/accordion.html', 'ko'], function ($, template, ko) {

    $.fn.hxxAccordion = function (params) {
        var container$ = this.addClass('hxx-accordions');
        container$._settings = $.extend(true, {
            items: [
                {title: 'Header 1', id: 'item1', template: '<div>My testing pane 1...</div>'},
                {title: 'Header 2', id: 'item2', template: '<div>My testing pane 2...</div>'},
                {title: 'Header 3', id: 'item3', template: '<div>My testing pane 3...</div>'}
            ],
            context: 'application'
        }, params);

        container$.append(template);
        ko.applyBindings(container$._settings, container$[0]);

        container$.updateContent = function (dataId, template) {
            container$.find('#'+container$._settings.context+'_'+dataId+'_collapse').find('.hxx-panel-body').html(template);
            return container$;
        };

        return container$;
    };

    return $;
});