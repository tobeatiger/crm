define(['jquery', 'text!./templates/tabs.html', 'ko'], function ($, template, ko) {

    $.fn.hxxTabs = function (params) {
        var container$ = this.addClass('hxx-tabs');
        container$._settings = $.extend(true, {
            tabs: [
                {title: 'Test1', id: 'test1', template: '<div>My testing1...</div>'},
                {title: 'Test2', id: 'test2', template: '<div>My testing2...</div>'},
                {title: 'Test3', id: 'test3', template: '<div>My testing3...</div>'}
            ],
            context: 'application',
            paneHeight: '300px'
        }, params);

        var viewModel = new function () {
            this.tabs = ko.observableArray(container$._settings.tabs);
            this.context = container$._settings.context;
            this.clickTab = function (data, e) {
                e.preventDefault();
                $(e.target).tab('show');
            },
            this.paneHeight = container$._settings.paneHeight;
        }();

        container$.bind('shown.bs.tab', '> .hxx-nav-tabs li a', function (e) {
            //e.target // newly activated tab
            //e.relatedTarget // previous active tab
            console.log($(e.target).text() + ' shows');
        });

        container$.append(template);
        ko.applyBindings(viewModel, container$[0]);

        container$.find('.hxx-nav-tabs li:nth-child(1)').addClass('active');
        container$.find('.hxx-tab-content .hxx-tab-pane:nth-child(1)').addClass('active');

        container$.updateContent = function (dataId, template) {
            container$.find('#'+container$._settings.context+'_'+dataId).html(template);
            return container$;
        };

        return container$;
    };

    return $;
});