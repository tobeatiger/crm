require(['./../framework'], function () {
    require(['jquery', 'crm/xp-basic', 'bootstrap', 'components/tabs', 'components/formFields', 'components/table'],
        function($, basicInfo) {

            //create form fields for top info container
            $('.topInfoContainer').hxxFormFields({
                fields: [
                    {fieldDesc:'Client ID:',fieldType:'text',fieldName:'clientId',value:'XP000000001',readonly:true,_fieldWidth:6,_labelWidth:4,_blockWidth:4},
                    {fieldDesc:'CIN:',fieldType:'text',fieldName:'cin',_fieldWidth:5,_labelWidth:4},
                    {fieldDesc:'Client Name:',fieldType:'text',fieldName:'clientName',rules:{
                        required:true
                    },_fieldWidth:6,_labelWidth:4,_blockWidth:4},
                    {fieldDesc:'Client Status:',fieldType:'select',fieldName:'clientStatus',rules:{
                        required:true
                    },value:'IA',disabled:false,options:[
                        {text:"Active",value:"A"},
                        {text:"Pending Approval",value:"PA"},
                        {text:"Inactive",value:"IA"}
                    ],_fieldWidth:5,_labelWidth:4},
                    {fieldDesc:'Gender:',fieldType:'radio',fieldName:'gender',values:['male','female'],rules:{
                        required: true
                    },/*value:'male',*/readonly:true,_fieldWidth:6,_labelWidth:4,_blockWidth:4},
                    {fieldDesc:'Password:',fieldType:'password',fieldName:'password',rules:{
                        required:true,
                        minlength:8
                    },_fieldWidth:5,_labelWidth:4},
                    //{fieldType:'_placeholder',_blockWidth:4},
                    {fieldDesc:'',fieldType:'button',value:'I am a button!',disabled:false,channel:'/i/am/a/button/click',_blockWidth:3,_fieldWidth:12}
                ],
                _blockWidth: 5
            });

            //create tabs
            var tabs$ = $('.detailInfoContainer').hxxTabs({
                tabs: [
                    {title: 'Basic Info', id: 'basic_info', template:
                        '<form id="xp_basic_form">' +
                        '<div class="mainInfoBlock" id="basic_info_main"></div>' +
                        '<div class="accordionContainer" id="basic_info_accordion"></div>' +
                        '</form>'
                    },
                    {title: 'Personal Details', id: 'personal_details', template: '<div>Personal Details testing...</div>'},
                    {title: 'Contact', id: 'contact', template: '<div>Contact testing...</div>'}
                ],
                context: 'XP123456',
                paneHeight: '350px'
            });

            //create basic info
            basicInfo(tabs$);
    });
});