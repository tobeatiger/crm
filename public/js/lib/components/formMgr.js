define(['jquery','jqValidate','jqUI'], function ($) {

    //validation setup
    $.validator.setDefaults({
        ignore: [],
        submitHandler: function() {
        },
        showErrors: function(map, list) {
            var focused = document.activeElement;
            if (focused && $(focused).is('a,input,textarea')) {
                //radio input
                if($(focused).is('input') && $(focused).attr('type') == 'radio') {
                    focused = $(focused).closest('.formField')[0];
                }
                //drop down list
                if($(focused).is('a')) {
                    focused = $(focused).closest('.formField').find('.hxx-dropdown-display-input')[0];
                }
                $(this.currentForm).tooltip('close', {
                    currentTarget: focused
                }, true)
            }
            $(focused).removeAttr('title').removeClass('ui-state-highlight');
            //this.currentElements.removeAttr('title').removeClass('ui-state-highlight');
            $.each(list, function(index, error) {
                if($(error.element).attr('type') == 'radio') {
                    //radio input
                    $(error.element).closest('.formField').attr('title', error.message).addClass('ui-state-highlight');
                } else if($(error.element).hasClass('hxx-dropdown-input')) {
                    //drop down list
                    $(error.element).prev('input').attr('title', error.message).addClass('ui-state-highlight');
                } else {
                    $(error.element).attr('title', error.message).addClass('ui-state-highlight');
                }
            });
            if (focused && $(focused).is('input, textarea')) {
                $(this.currentForm).tooltip('open', {
                    target: focused
                });
            }
        }
    });

    $.hxxInitFormTooltip = function (form$) {
        if(form$.length) {
            form$.tooltip({
            	show: false,
            	hide: false,
                position: {
                    my: 'center bottom-10',
                    at: 'center top',
                    using: function(position,feedback) {
                        $(this).css(position);
                        $('<div>')
                          .addClass('arrow')
                          .addClass(feedback.vertical)
                          .addClass(feedback.horizontal)
                          .appendTo(this);
                    }
                },
                items: '.formField [title]'
            });
        }
    };

    $.hxxConfigFormValidation = function (form$) {
        if(form$ && form$.length === 1) {
            $.hxxInitFormTooltip(form$);
            form$.validate(function() {
                var result = {
                    rules: {}
                };
                form$.find('input[name],textarea[name]').each(function() {
                    var fieldName = $(this).attr('name');
                    var rules = $(this).data('rules');
                    if(fieldName && $.trim(fieldName) !== '' && rules) {
                        result.rules[fieldName] = rules;
                    }
                });
                return result;
            }());
        }
    };

    $.hxxGetFormData = function (form$) {
        var data = {};
        if(form$ && form$.length === 1) {
            form$.find('.formField input[name],.formField textarea[name]').each(function () {
                var field$ = $(this);
                if(data[field$.attr('name')] === undefined) {
                    data[field$.attr('name')] = field$.val();
                } else if (field$.attr('type') == 'radio') {
                    if(field$.is(':checked')) {
                        data[field$.attr('name')] = field$.val();
                    }
                } else {
                    if(data[field$.attr('name')] instanceof Array) {
                        data[field$.attr('name')].push(field$.val());
                    } else {
                        data[field$.attr('name')] = [data[field$.attr('name')], field$.val()]
                    }
                }
            });
        }
        return data;
    };

    return $;
});