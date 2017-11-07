define(['jquery', 'components/accordion', 'components/formFields', 'components/table', 'components/formMgr'],
    function ($, template, ko) {

    //TODO - ajax to get data
    return function (tabs$) {

        tabs$.find('#basic_info_main').hxxFormFields({
            fields: [
                {fieldDesc:'Email Addr:', fieldName:'email', rules: {
                    required: true,
                    email: true
                }, _fieldWidth:8},
                {fieldDesc:'Main Info 2:', fieldName:'mainInfo2', _fieldWidth:8}
            ]
        });
        var tab1Accordion1$ = tabs$.find('#basic_info_accordion').hxxAccordion({
            context: 'XP123456' + '_' + 'tab1_acc1',
            items: [
                {title: 'Section 1', id: 'item1', template: '<div class="accordionContent" id="tab1_acc1_section1"></div>'},
                {title: 'Section 2', id: 'item2', template: '<div class="accordionContent" id="tab1_acc1_section2"></div>'},
                {title: 'Section 3', id: 'item3', template: '<div class="accordionContent tableContainer" id="tab1_acc1_section3"></div>'}
            ]
        }).find('#tab1_acc1_section1').hxxFormFields({
            fields: [
                {fieldDesc: 'Field Name 1:',fieldName:'fn1',fieldType:'textarea',value:'Some initial text...',readonly:'readonly',_rowSpan:2,_blockWidth:6,_fieldWidth:9,_floating:'left'},
                {fieldDesc: 'Field Name 2 Long:',fieldName:'fn2'},
                {fieldDesc: 'Field Name 3:',fieldName:'fn3'},
                {fieldDesc: 'Field Name 4:',fieldName:'fn4'},
                {fieldDesc: 'Field Name 5 Long:',fieldName:'fn5'},
                {fieldDesc: 'Field Name 6:',fieldName:'fn6',_blockWidth:6,_fieldWidth:9,_floating:'left'},
                {fieldDesc: 'Field Name 7 Long:',fieldName:'fn7'},
                {fieldDesc: 'Field Name 8:',fieldName:'fn8'}
            ]
        }).end().find('#tab1_acc1_section2').hxxFormFields({
            fields: [
                {fieldDesc: 'Field Name 11:',fieldName:'fn11',rules:{
                    required:true
                },_fieldWidth:9},
                {fieldDesc: 'Comments 12:',fieldName:'comments12',rules:{
                    required:true
                },_fieldWidth:9,fieldType:'textarea',_rowSpan:4,_floating:'right'},
                {fieldDesc: 'Field Name 13:',fieldName:'fn13',_fieldWidth:9},
                {fieldDesc: 'Field Name 14:',fieldName:'fn14',_fieldWidth:9},
                {fieldDesc: 'Field Name 15:',fieldName:'fn15',_fieldWidth:9},
                {fieldDesc: 'Field Name 16:',fieldName:'fn16',_fieldWidth:9},
                {fieldDesc: 'Comments 17:',fieldName:'fn17',_fieldWidth:9,fieldType:'textarea',_rowSpan:2,_floating:'right'},
                {fieldDesc: 'Field Name 18:',fieldName:'fn18',_fieldWidth:9}
            ],
            _blockWidth:6
        }).end();

        var table$ = tab1Accordion1$.find('#tab1_acc1_section3').hxxTable({
            columns: [
                {title:'Column A',width:'20%',value:'fieldA'},
                {title:'Column B',width:'40%',hxxFormField:{fieldType:'text',fieldName:'fieldB',value:'fieldB',rules:{required:true}}},
                {title:'Column C',width:'40%',hxxFormField:{fieldType:'select',fieldName:'fieldC',value:'fieldC',options:[
                    {text:'Select 1 Text',value:'S1'},
                    {text:'Select 2 Text',value:'S2'},
                    {text:'Select 3 Text',value:'S3'}
                ]}}
            ],
            rows: [
                {fieldA:'Test value A1',fieldB:'Test value B1',fieldC:'S1'},
                {fieldA:'Test value A2',fieldB:'Test value B2',fieldC:'S2'},
                {fieldA:'Test value A3',fieldB:'Test value B3',fieldC:'S3'}
            ],
            hasEditButtons: true
        });

        //validation & data submission logic here
        $.hxxConfigFormValidation($("#xp_top_form"));
        $.hxxConfigFormValidation($("#xp_basic_form"));
        $("#btn_submit").click(function(e) {
            var validated = true;
            if($("#xp_top_form").valid()) {
                // the form is valid, do something
                //$.hxxGetFormData(...); //TODO
                console.log('Valid xp_top_form...');
            } else {
                validated = false;
            }
            if($("#xp_basic_form").valid()) {
                // the form is valid, do something
                //$.hxxGetFormData(...); //TODO
                console.log('Valid xp_basic_form...');
            } else {
                console.log(table$.getRows());
                validated = false;
            }
            if(validated) {
                //TODO - ajax submit here
            }
        });
    };
});