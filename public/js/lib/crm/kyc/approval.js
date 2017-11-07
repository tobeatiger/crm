$('#main .dynamic_section').css({display:'none'});
var kyc_approval = $('#main .kyc_approval')[0];

if(kyc_approval){
    $(kyc_approval).css({display:'block'});
}
else{
    $('#main').append("<div class='kyc_approval dynamic_section'></div>");
    
    $.get('/kyc/approval',null, function(searchView) {
    
        $('#main .kyc_approval').html(searchView);
        
    }).error(function() {     
        console.error('index error:',arguments);
        //$('#main').html("<b>"+nlsStrings['server_error']+"<b>");
    });
}