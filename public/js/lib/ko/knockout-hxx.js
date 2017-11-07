define(['koCore', 'jquery', 'moment',
    'text!hxxUIs/radio.html', 'text!hxxUIs/input.html', 'text!hxxUIs/button.html', 'text!hxxUIs/textarea.html',
    'components/pub-sub', 'components/combobox'],
    function (ko,$,moment,radioUI,inputUI,buttonUI,textareaUI) {

    ko.bindingHandlers.hxxDate = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            try {
                var value = ko.unwrap(valueAccessor());
                if(!value) {
                    if($(element).is('input')) {
                        $(element).val('');
                    } else {
                        $(element).html('');
                    }
                } else if(moment.isMoment(value)) {
                    if($(element).is('input')) {
                        $(element).val(value.format('YYYY-MM-DD'));
                    } else {
                        $(element).html(value.format('YYYY-MM-DD'));
                    }
                } else {
                    if($(element).is('input')) {
                        $(element).val(moment(value).format('YYYY-MM-DD'));
                    } else {
                        $(element).html(moment(value).format('YYYY-MM-DD'));
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    ko.bindingHandlers.hxxData = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            try {
                var value = ko.unwrap(valueAccessor());
                for(var key in value) {
                    if(value[key]) {
                        $(element).data(key, value[key]);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    ko.bindingHandlers.hxxFormField = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            try {
                var elt$ = $(element);
                elt$.addClass('formField');
                var value = ko.unwrap(valueAccessor());
                // @format
                // value: {
                //     fieldType: 'text',
                //     fieldName: 'clientId',
                //     rules: {
                //         required: true
                //     },
                //     value: 'IP000000001'
                //     ......
                // }
                if(value && typeof value === 'object') {
                    if(!value.fieldType) {
                        value.fieldType = 'text';
                    }
                    if(value.fieldType === 'text' || value.fieldType === 'password') {
                        elt$.append(inputUI);
                    } else if(value.fieldType === 'select') {
                        elt$.hxxCombobox({
                            data:value,
                            _duringBinding:true
                        });
                    } else if(value.fieldType === 'textarea') {
                        elt$.append(textareaUI);
                    } else if(value.fieldType === 'radio') {
                        elt$.append(radioUI);
                    } else if(value.fieldType === 'button') {
                        elt$.append(buttonUI);
                        elt$.find('button.hxx-btn-input').click(function () {
                            if($(this).attr('channel') && !$(this).hasClass('disabled')) {
                                $.publish($(this).attr('channel'));
                            }
                        });
                    } else if(value.fieldType === 'template') {
                        elt$.html(value.template);
                    }
                    //<!-- ko if: $data.fieldType == 'multiSelect' -->
                    //(TODO - multi select input: drop down with check box list)
                    //<!-- /ko -->
                    //<!-- ko if: $data.fieldType == 'multiSelectPanel' -->
                    //(TODO - multi select input: no drop down, a container with checkboxes list)
                    //<!-- /ko -->
                } else {
                    elt$.text(value);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    return ko;
});