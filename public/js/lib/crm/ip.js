require(['./../framework'], function () {
    require(['jquery', 'crm/ip-basic', 'crm/config/ipBasicLayout', 'bootstrap', 'components/tabs', 'components/formFields', 'components/table','components/formMgr'],
        function($, basicInfo, ipBasicLayout) {

            console.log($('.contentBlock').attr('data-context'));
            console.log($('.contentBlock').attr('data-action'));

            var basicFields = ipBasicLayout.getIPBasicFields();
            if(basicFields.top_info) {
                $('.topInfoContainer').hxxFormFields({
                    fields: basicFields.top_info.formFields,
                    _blockWidth: basicFields.top_info._blockWidth
                });
            }

            $.hxxConfigFormValidation($("#ip_top_form"));
            //$.hxxConfigFormValidation($("#ip_basic_form"));
            $("#btn_submit").click(function(e) {
                var validated = true;
                if($("#ip_top_form").valid()) {
                    console.log('Valid ip_top_form...');
                } else {
                    validated = false;
                }
                //if($("#ip_basic_form").valid()) {
                //    console.log('Valid ip_basic_form...');
                //} else {
                //    console.log(table$.getRows());
                //    validated = false;
                //}
                if(validated) {
                    var topInfoData = $.hxxGetFormData($("#ip_top_form"));
                    $.ajax({
                        url: '/ip/create/data',
                        method: 'post',
                        data: topInfoData
                    }).done(function (result) {
                        result = result.returnValue;
                        $("#ip_top_form").find('input[name="' + result.key + '"]').val(result.data[result.key]);
                        alert('Individual Client "' + result.data[result.key] + '" successfully created!');
                    });
                }
            });
    });
});