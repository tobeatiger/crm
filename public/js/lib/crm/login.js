require(['./../framework'], function () {
    require(['jquery', 'components/formFields', 'components/pub-sub'],
        function($) {
            
            $('#title').text(i18n.__('welcome'));
            
            $('.loginForm').hxxFormFields({
                fields: [
                    {fieldDesc:'i18n:User Name',fieldType:'text',value:'admin',fieldName:'userid',_fieldWidth:2,_labelWidth:1},
                    {fieldDesc:'i18n:Password',fieldType:'password',value:'password01',fieldName:'password',_fieldWidth:2,_labelWidth:1},
                    {fieldDesc:'',fieldType:'button',value:i18n.__('Login'),channel:'/login/submit',_fieldWidth:2,_labelWidth:1}
                ],
                _blockWidth: 12
            });
            
            $.subscribe('/login/submit', function () {

                var data = {};
                $('.loginForm input').each(function(index,field){
                   data[field.name] = field.value;
                });

                $.post("/login", data, function(result) {
                    if(result.errorCode == 0){
                      window.location="/index";
                    } else {
                      $('#message').text(nlsStrings[result.errorCode]);
                    }
                }).success(function() {
                }).error(function() {
                    $('#message').text(nlsStrings['server_error']);
                })
                .complete(function() {});
            });
        });
});