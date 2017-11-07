$('#main .dynamic_section').css({display:'none'});
var kyc_visitation = $('#main .kyc_visitation')[0];

if(kyc_visitation){
    $(kyc_visitation).css({display:'block'});
}
else{
    $('#main').append("<div class='kyc_visitation dynamic_section'></div>");
    
    $.get('/kyc/visitation',null, function(searchView) {
    
        $('#main .kyc_visitation').html(searchView);
        
    }).error(function() {     
        console.error('index error:',arguments);
        //$('#main').html("<b>"+nlsStrings['server_error']+"<b>");
    });
}
