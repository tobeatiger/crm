define(['jquery', 'text!./templates/combobox.html', 'ko'], function ($, template, ko) {

    $.fn.hxxCombobox = function (params) {
        var container$ = this.addClass('hxx-combobox');
        container$._settings = $.extend(true, {
            data: {},
            _duringBinding: false
        }, params);

        if(!container$._settings.data) {
            container$._settings.data = {};
        }

        //init drop down list value description
        if(container$._settings.data.options && container$._settings.data.value && container$._settings.data.value !== '') {
            $.each(container$._settings.data.options, function (idx, option) {
                if(container$._settings.data.value === option.value) {
                    container$._settings.data.text = option.text;
                    return false;
                }
            });
        }

        container$.append(template);
        if(!container$._settings._duringBinding) {
            ko.applyBindings(container$._settings.data, container$.find('.hxx-input-group')[0]);
        } else {
            if(container$._settings.data.text) {
                container$.find('.hxx-dropdown-display-input').val(container$._settings.data.text);
            }
        }

        //drop down widget
        container$.find('.hxx-dropdown').each(function () {
            var dropDown$ = $(this),widgetWidth = dropDown$[0].clientWidth;
            dropDown$.find('.hxx-dropdown-display-input').on('keypress', function () {
                return false; //not allow manually input
            }).on('keydown', function () {
                return false; //not allow backspace, delete...
            });
            dropDown$.find('.hxx-btn').click(function (e) {
                var target$ = dropDown$.find('.hxx-dropdown-input');
                if(target$.attr('readonly') || target$.attr('disabled')) {
                    return false;
                }
            });
            dropDown$.find('.hxx-dropdown-menu').css('width', widgetWidth ? widgetWidth : 'auto').on('click', 'a', function (e) {
                e.preventDefault();
                var target$ = $(e.target);
                dropDown$.find('.hxx-dropdown-display-input').val(target$.text());
                dropDown$.find('.hxx-dropdown-input').val(target$.attr('data-value')).trigger('change').valid();
            });
        });

        return container$;
    };

    return $;
});