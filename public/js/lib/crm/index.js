require(['./../framework'], function () {
    require(['jquery', 'i18n!/nls/ResourceMessage.js','components/formFields', 'components/pub-sub'],
        function($, nlsStrings) {
            $('.menuitem').click(function(evt){
                //load the target page when the menuitem is clicked                
                var href = this.href;
                
                $.getScript(href);
                
                //$.get(href,null, function(result) {
                //    $('#main').html(result);                        
                //}).error(function() {     
                //    console.error('index error:',arguments);
                //    $('#main').html("<b>"+nlsStrings['server_error']+"<b>");
                //});
                
                //$('.menuitem').css({'font-weight':'normal','font-size':'1em'});                
                //$(this).css({'font-weight':'bold','font-size':'1.5em'});
                $('.menuitem').removeClass('menuitem_active');
                $(this).addClass('menuitem_active');

                return false;
            });           
        });
});