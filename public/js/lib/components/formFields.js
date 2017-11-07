define(['jquery', 'text!./templates/formFields.html', 'ko', 'components/pub-sub', 'components/combobox', 'jqValidate'], function ($, template, ko) {

    $.fn.hxxFormFields = function (params) {
        var container$ = this.addClass('hxx-form-fields');
        container$._settings = $.extend(true, {
            fields: [
                {fieldDesc: 'Client ID:',fieldType:'text'}
            ],
            _blockWidth: 3
        }, params);

        $.each(container$._settings.fields, function (index, item) {
            //Pao 20160117: i18n for field label,option,raido
            if(item.fieldDesc && item.fieldDesc.indexOf('i18n:') == 0){
                //console.log('@@fieldDesc=',item.fieldDesc);
                item.fieldDesc = i18n.__(item.fieldDesc.replace('i18n:',''));
            }
            if(item.options && item.options.indexOf('i18n:') == 0){
                //console.log('@@options=',item.options);
                item.options = i18n.__(item.options.replace('i18n:',''));
            }
            if(item.values && item.values.indexOf('i18n:') == 0){
                //console.log('@@values=',item.values);
                item.values = i18n.__(item.values.replace('i18n:',''));
            }
            
            item.blockGridAllc = ko.pureComputed(function() {
                return item._blockWidth ? 'hxx-grid-'+item._blockWidth : 'hxx-grid-'+container$._settings._blockWidth;
            });
            item.blockWoGridAllc = ko.pureComputed(function() {
                return item.blockGridAllc().replace('hxx-','hxx-wo-');
            });
            item.blockCss = ko.pureComputed(function() {
                var result = item.blockGridAllc();
                if(!item._floating) {
                    if(item._rowSpan > 1) {
                        item._floating = 'left'; //default floating if not indicated
                    }
                }
                if(item._floating) {
                    result += (' '+item._floating+'Floating');
                }
                return result;
            });
            item.fieldLabelGridAllc = ko.pureComputed(function() {
                return item._labelWidth ? 'hxx-grid-'+item._labelWidth :
                    (item._fieldWidth ? 'hxx-grid-'+(12-item._fieldWidth) : 'hxx-grid-6');
            });
            item.fieldLabelCss = ko.pureComputed(function() {
                var result = item.fieldLabelGridAllc();
                if(item.rules && item.rules.required) {
                    result += ' mandatory';
                }
                return result;
            });
            item.fieldGridAllc = ko.pureComputed(function() {
                return item._fieldWidth ? 'hxx-grid-'+item._fieldWidth : 'hxx-grid-6';
            });
        });

        container$.append(template);
        ko.applyBindings(container$._settings, container$[0]);

        return container$;
    };

    return $;
});