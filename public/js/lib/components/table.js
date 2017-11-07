define(['jquery', 'text!./templates/table.html', 'ko'], function ($, template, ko) {

    function _constructFormFields (rows, colsDef) {
        if(rows && rows.length) {
            var colDef,hxxFormField;
            for(var i=0;i<colsDef.length;i++) {
                colDef = colsDef[i];
                hxxFormField = colDef.hxxFormField;
                if(!hxxFormField) {
                    continue;
                }
                for(var j=0;j<rows.length;j++) {
                    rows[j]['hxxFormField_'+hxxFormField.value] = $.extend(true, {}, hxxFormField, {
                        value: rows[j][hxxFormField.value] ? rows[j][hxxFormField.value] : ''
                    });
                }
            }
        }
        return rows;
    }

    Array.prototype.swap = function(indexA, indexB) {
        if(indexA < this.length && indexB < this.length) {
            var temp = this[indexA];
            this[indexA] = this[indexB];
            this[indexB] = temp;
        }
    };

    $.fn.hxxTable = function (params) {
        var container$ = this.addClass('hxx-table');
        container$._settings = $.extend(true, {
            columns: [
                //{title:'Col A',width:'30%',value:'fieldA'},
                //{title:'Col B',width:'30%',hxxFormField:{fieldType:'text',fieldName:'fieldB',value:'fieldB',rules:{required:true}}},
                //{title:'Col C',width:'30%',hxxFormField:{fieldType:'select',fieldName:'fieldC',value:'fieldC',options:[
                //    {text:'Select 1 Text',value:'S1'},
                //    {text:'Select 2 Text',value:'S2'},
                //    {text:'Select 3 Text',value:'S3'}
                //]}}
            ],
            rows: [
                //{fieldA:'Test value A1',fieldB:'Test value B1',fieldC:'S1'},
                //{fieldA:'Test value A2',fieldB:'Test value B2',fieldC:'S2'},
                //{fieldA:'Test value A3',fieldB:'Test value B3',fieldC:'S3'}
            ],
            hasEditButtons: false,
            hasDeleteCol: false
        }, params, {
            _clickRow: function (data, e) {
                container$.find('.hxx-table-row').removeClass('selected');
                container$._selectedIndex = parseInt($(e.target).closest('.hxx-table-row').addClass('selected').attr('data-index'));
            },
            _removeRow: function (data, e) {
                e.stopPropagation();
                var row$ = $(e.target).closest('.hxx-table-row');
                var index = parseInt(row$.attr('data-index'));
                if (index > -1) {
                    container$._settings._koRows.splice(index, 1);
                }
                if(container$._selectedIndex == index) {
                    delete container$._selectedIndex;
                } else {
                    container$._selectedIndex = parseInt(container$.find('.hxx-table-row.selected').attr('data-index'));
                }
            }
        });

        container$._settings.hasDeleteCol = container$._settings.hasEditButtons ? true : container$._settings.hasDeleteCol;

        container$._settings._koRows = ko.observableArray([]);
        container$._settings.rows = _constructFormFields(container$._settings.rows, container$._settings.columns);
        container$._settings._koRows(container$._settings.rows);
        container$.append(template);

        var colDef;
        var tdPlaceHolder$ = container$.find('.hxx-td-place-holder');
        for(var i=0;i<container$._settings.columns.length;i++) {
            colDef = container$._settings.columns[i];
            if(colDef.hxxFormField) {
                tdPlaceHolder$.before(
                    '<!-- ko with: $data[\'hxxFormField_' + colDef.hxxFormField.value + '\'] -->' +
                    '<td data-bind="hxxFormField:$data"></td>' +
                    '<!-- /ko -->'
                );
            } else {
                tdPlaceHolder$.before('<td data-bind="text:$data[\'' + colDef.value + '\']"></td>');
            }
        }
        tdPlaceHolder$.remove();

        container$.find('.hxx-table-tbody').on('change', 'input[name],textarea[name]', function (e) {
            var target$ = $(e.target);
            var rowData = target$.closest('.hxx-table-row').data('rowData');
            rowData[target$.attr('name')] = target$.val();
        });

        if(container$._settings.hasEditButtons) {
            container$.find('.hxx-table-btn-group .btnAdd').click(function (e) {
                e.stopPropagation();
                container$.addRow();
            });
            container$.find('.hxx-table-btn-group .btnInsert').click(function (e) {
                e.stopPropagation();
                if(container$._selectedIndex !== undefined) {
                    container$._settings._koRows.splice(container$._selectedIndex, 0, _constructFormFields([{}], container$._settings.columns)[0]);
                }
                container$._selectedIndex += 1;
            });
            container$.find('.hxx-table-btn-group .btnMoveUp').click(function (e) {
                e.stopPropagation();
                if(container$._selectedIndex !== undefined && container$._selectedIndex > 0) {
                    container$._settings._koRows().swap(container$._selectedIndex, container$._selectedIndex - 1);
                    container$._settings._koRows(container$._settings._koRows());
                    container$._selectedIndex -= 1;
                }
            });
            container$.find('.hxx-table-btn-group .btnMoveDown').click(function (e) {
                e.stopPropagation();
                if(container$._selectedIndex !== undefined && container$._selectedIndex < (container$._settings._koRows().length - 1)) {
                    container$._settings._koRows().swap(container$._selectedIndex, container$._selectedIndex + 1);
                    container$._settings._koRows(container$._settings._koRows());
                    container$._selectedIndex += 1;
                }
            });
        }

        ko.applyBindings(container$._settings, container$[0]);

        container$.getRows = function () {
            var rows = $.extend(true, [], container$._settings._koRows()); //deep copy to make sure no impact to the existing binding
            for(var i=0;i<rows.length;i++) {
                for(var key in rows[i]) {
                    if(key.indexOf('hxxFormField_') == 0) {
                        delete rows[i][key]; //remove temporary conversion data
                    }
                }
            }
            return rows;
        };

        container$.addRow = function (row) {
            var row = row ? row : {};
            container$._settings._koRows.push(_constructFormFields([row], container$._settings.columns)[0]);
        };

        container$.insertRow = function (row) {
            //TODO
        };

        return container$;
    };

    return $;
});